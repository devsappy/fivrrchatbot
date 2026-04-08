import os
from typing import Any

import httpx
from fastapi import APIRouter, HTTPException, Request, Response, status
from pydantic import BaseModel, ConfigDict, Field
from slowapi import Limiter
from slowapi.util import get_remote_address

router = APIRouter()

# Rate limiter — keyed by client IP address
limiter = Limiter(key_func=get_remote_address)

SUPABASE_URL = os.getenv("SUPABASE_URL", "").rstrip("/")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "")
AUTH_COOKIE_NAME = os.getenv("AUTH_COOKIE_NAME", "chatterify_auth_token")
AUTH_REFRESH_COOKIE_NAME = os.getenv("AUTH_REFRESH_COOKIE_NAME", "chatterify_refresh_token")
AUTH_COOKIE_MAX_AGE = int(os.getenv("AUTH_COOKIE_MAX_AGE", str(60 * 60 * 24 * 7)))
AUTH_COOKIE_SECURE = os.getenv("AUTH_COOKIE_SECURE", "true").lower() == "true"


class LoginRequest(BaseModel):
    email: str = Field(..., min_length=3, max_length=255)
    password: str = Field(..., min_length=6, max_length=128)


class SignupRequest(LoginRequest):
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)


class AuthUser(BaseModel):
    model_config = ConfigDict(extra="allow")

    id: str
    email: str
    user_metadata: dict[str, Any] = Field(default_factory=dict)


class AuthResponse(BaseModel):
    user: AuthUser | None = None
    message: str
    authenticated: bool
    requires_email_confirmation: bool = False


def get_supabase_headers() -> dict[str, str]:
    if not SUPABASE_URL or not SUPABASE_ANON_KEY:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(
                "Supabase auth is not configured. Set SUPABASE_URL and "
                "SUPABASE_ANON_KEY in the backend environment."
            ),
        )

    return {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json",
    }


async def supabase_auth_request(
    method: str,
    path: str,
    *,
    json_body: dict[str, Any] | None = None,
    access_token: str | None = None,
) -> dict[str, Any]:
    headers = get_supabase_headers()

    if access_token:
        headers["Authorization"] = f"Bearer {access_token}"

    async with httpx.AsyncClient(timeout=20.0) as client:
        response = await client.request(
            method,
            f"{SUPABASE_URL}{path}",
            headers=headers,
            json=json_body,
        )

    payload = response.json() if response.content else {}

    if response.is_success:
        return payload

    message = (
        payload.get("msg")
        or payload.get("error_description")
        or payload.get("error")
        or "Authentication request failed."
    )
    raise HTTPException(status_code=response.status_code, detail=message)


AUTH_COOKIE_DOMAIN = os.getenv("AUTH_COOKIE_DOMAIN", None)


def _cookie_kwargs(name: str, value: str, max_age: int) -> dict:
    kwargs = dict(
        key=name,
        value=value,
        max_age=max_age,
        httponly=True,
        secure=AUTH_COOKIE_SECURE,
        samesite="none",
        path="/",
    )
    if AUTH_COOKIE_DOMAIN:
        kwargs["domain"] = AUTH_COOKIE_DOMAIN
    return kwargs


def set_auth_cookie(response: Response, access_token: str) -> None:
    # SameSite=None is required for cross-domain cookies (frontend on Vercel,
    # backend on Render). Secure=True is mandatory when SameSite=None.
    response.set_cookie(**_cookie_kwargs(AUTH_COOKIE_NAME, access_token, AUTH_COOKIE_MAX_AGE))


def set_refresh_cookie(response: Response, refresh_token: str) -> None:
    response.set_cookie(**_cookie_kwargs(AUTH_REFRESH_COOKIE_NAME, refresh_token, AUTH_COOKIE_MAX_AGE))


def clear_auth_cookie(response: Response) -> None:
    kwargs = dict(
        key=AUTH_COOKIE_NAME,
        httponly=True,
        secure=AUTH_COOKIE_SECURE,
        samesite="none",
        path="/",
    )
    if AUTH_COOKIE_DOMAIN:
        kwargs["domain"] = AUTH_COOKIE_DOMAIN
    response.delete_cookie(**kwargs)


def clear_refresh_cookie(response: Response) -> None:
    kwargs = dict(
        key=AUTH_REFRESH_COOKIE_NAME,
        httponly=True,
        secure=AUTH_COOKIE_SECURE,
        samesite="none",
        path="/",
    )
    if AUTH_COOKIE_DOMAIN:
        kwargs["domain"] = AUTH_COOKIE_DOMAIN
    response.delete_cookie(**kwargs)


@router.post("/api/auth/login", response_model=AuthResponse)
@limiter.limit("5/minute")
async def login(request: Request, payload: LoginRequest, response: Response):
    auth_payload = await supabase_auth_request(
        "POST",
        "/auth/v1/token?grant_type=password",
        json_body={"email": payload.email, "password": payload.password},
    )
    access_token = auth_payload.get("access_token")
    refresh_token = auth_payload.get("refresh_token")
    user = auth_payload.get("user")

    if not access_token or not user:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Supabase did not return a valid session.",
        )

    set_auth_cookie(response, access_token)
    if refresh_token:
        set_refresh_cookie(response, refresh_token)

    return AuthResponse(
        user=AuthUser.model_validate(user),
        message="Logged in successfully.",
        authenticated=True,
    )


@router.post("/api/auth/signup", response_model=AuthResponse)
@limiter.limit("5/minute")
async def signup(request: Request, payload: SignupRequest, response: Response):
    auth_payload = await supabase_auth_request(
        "POST",
        "/auth/v1/signup",
        json_body={
            "email": payload.email,
            "password": payload.password,
            "data": {
                "first_name": payload.first_name,
                "last_name": payload.last_name,
                "full_name": f"{payload.first_name} {payload.last_name}".strip(),
            },
        },
    )

    user = auth_payload.get("user")
    session = auth_payload.get("session") or {}
    access_token = auth_payload.get("access_token") or session.get("access_token")
    refresh_token = auth_payload.get("refresh_token") or session.get("refresh_token")
    authenticated = bool(access_token)

    if access_token:
        set_auth_cookie(response, access_token)
    if refresh_token:
        set_refresh_cookie(response, refresh_token)

    return AuthResponse(
        user=AuthUser.model_validate(user) if user else None,
        message=(
            "Account created successfully."
            if authenticated
            else "Account created. Check your email to confirm your address before logging in."
        ),
        authenticated=authenticated,
        requires_email_confirmation=not authenticated,
    )


@router.get("/api/auth/me", response_model=AuthResponse)
async def me(request: Request, response: Response):
    access_token = request.cookies.get(AUTH_COOKIE_NAME)
    if not access_token:
        return AuthResponse(
            user=None,
            message="No active session.",
            authenticated=False,
        )

    try:
        user = await supabase_auth_request(
            "GET",
            "/auth/v1/user",
            access_token=access_token,
        )
    except HTTPException as exc:
        if exc.status_code in {status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN}:
            clear_auth_cookie(response)
            return AuthResponse(
                user=None,
                message="Session expired.",
                authenticated=False,
            )
        raise

    return AuthResponse(
        user=AuthUser.model_validate(user),
        message="Session loaded.",
        authenticated=True,
    )


@router.post("/api/auth/refresh", response_model=AuthResponse)
@limiter.limit("10/minute")
async def refresh(request: Request, response: Response):
    refresh_token = request.cookies.get(AUTH_REFRESH_COOKIE_NAME)
    if not refresh_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No refresh token.")

    try:
        auth_payload = await supabase_auth_request(
            "POST",
            "/auth/v1/token?grant_type=refresh_token",
            json_body={"refresh_token": refresh_token},
        )
    except HTTPException:
        clear_auth_cookie(response)
        clear_refresh_cookie(response)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired. Please log in again.",
        )

    access_token = auth_payload.get("access_token")
    new_refresh_token = auth_payload.get("refresh_token")
    user = auth_payload.get("user")

    if not access_token or not user:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Supabase did not return a valid session.",
        )

    set_auth_cookie(response, access_token)
    if new_refresh_token:
        set_refresh_cookie(response, new_refresh_token)

    return AuthResponse(
        user=AuthUser.model_validate(user),
        message="Session refreshed.",
        authenticated=True,
    )


@router.post("/api/auth/logout", response_model=AuthResponse)
async def logout(request: Request, response: Response):
    access_token = request.cookies.get(AUTH_COOKIE_NAME)
    if access_token:
        # Best-effort: revoke the token on Supabase so it can't be reused.
        # If this fails (e.g. already expired), we still clear the local cookies.
        try:
            await supabase_auth_request(
                "POST",
                "/auth/v1/logout",
                access_token=access_token,
            )
        except HTTPException:
            pass

    clear_auth_cookie(response)
    clear_refresh_cookie(response)
    return AuthResponse(
        user=None,
        message="Logged out successfully.",
        authenticated=False,
    )
