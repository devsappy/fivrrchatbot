import os
from typing import Any

import httpx
from fastapi import APIRouter, HTTPException, Request, Response, status
from pydantic import BaseModel, ConfigDict, Field

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL", "").rstrip("/")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "")
AUTH_COOKIE_NAME = os.getenv("AUTH_COOKIE_NAME", "chatterify_auth_token")
AUTH_COOKIE_MAX_AGE = int(os.getenv("AUTH_COOKIE_MAX_AGE", str(60 * 60 * 24 * 7)))
AUTH_COOKIE_SECURE = os.getenv("AUTH_COOKIE_SECURE", "false").lower() == "true"


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


def set_auth_cookie(response: Response, access_token: str) -> None:
    response.set_cookie(
        key=AUTH_COOKIE_NAME,
        value=access_token,
        max_age=AUTH_COOKIE_MAX_AGE,
        httponly=True,
        secure=AUTH_COOKIE_SECURE,
        samesite="lax",
        path="/",
    )


def clear_auth_cookie(response: Response) -> None:
    response.delete_cookie(
        key=AUTH_COOKIE_NAME,
        httponly=True,
        secure=AUTH_COOKIE_SECURE,
        samesite="lax",
        path="/",
    )


@router.post("/api/auth/login", response_model=AuthResponse)
async def login(payload: LoginRequest, response: Response):
    auth_payload = await supabase_auth_request(
        "POST",
        "/auth/v1/token?grant_type=password",
        json_body={"email": payload.email, "password": payload.password},
    )
    access_token = auth_payload.get("access_token")
    user = auth_payload.get("user")

    if not access_token or not user:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Supabase did not return a valid session.",
        )

    set_auth_cookie(response, access_token)

    return AuthResponse(
        user=AuthUser.model_validate(user),
        message="Logged in successfully.",
        authenticated=True,
    )


@router.post("/api/auth/signup", response_model=AuthResponse)
async def signup(payload: SignupRequest, response: Response):
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
    authenticated = bool(access_token)

    if access_token:
        set_auth_cookie(response, access_token)

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


@router.post("/api/auth/logout", response_model=AuthResponse)
async def logout(response: Response):
    clear_auth_cookie(response)
    return AuthResponse(
        user=None,
        message="Logged out successfully.",
        authenticated=False,
    )
