import os
from typing import Any
from uuid import UUID

import httpx
from fastapi import APIRouter, HTTPException, Request, status
from pydantic import BaseModel, Field, HttpUrl

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL", "").rstrip("/")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
AUTH_COOKIE_NAME = os.getenv("AUTH_COOKIE_NAME", "chatterify_auth_token")


async def log_activity(
    user_id: str, type: str, title: str, description: str, metadata: dict | None = None
) -> None:
    try:
        await supabase_request(
            "POST",
            "/activity_events",
            json_body={
                "user_id": user_id,
                "type": type,
                "title": title,
                "description": description,
                "metadata": metadata or {},
            },
        )
    except Exception:
        pass


def get_supabase_service_headers() -> dict[str, str]:
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
        )
    return {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation",
    }


async def get_user_id_from_request(request: Request) -> str:
    """Validate the access token cookie and return the user's UUID."""
    access_token = request.cookies.get(AUTH_COOKIE_NAME)
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated."
        )

    headers = {
        "apikey": os.getenv("SUPABASE_ANON_KEY", ""),
        "Authorization": f"Bearer {access_token}",
    }
    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.get(f"{SUPABASE_URL}/auth/v1/user", headers=headers)

    if not resp.is_success:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session invalid or expired.",
        )

    return resp.json()["id"]


class WebsiteIn(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    url: str = Field(..., min_length=5, max_length=500)


class WebsiteOut(BaseModel):
    id: str
    user_id: str
    name: str
    url: str
    created_at: str


async def supabase_request(
    method: str,
    path: str,
    *,
    json_body: dict[str, Any] | None = None,
    params: dict[str, str] | None = None,
) -> Any:
    headers = get_supabase_service_headers()
    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.request(
            method,
            f"{SUPABASE_URL}/rest/v1{path}",
            headers=headers,
            json=json_body,
            params=params,
        )

    if resp.status_code == 204:
        return None

    payload = resp.json() if resp.content else {}

    if not resp.is_success:
        detail = (
            payload.get("message") or payload.get("error") or "Supabase request failed."
        )
        raise HTTPException(status_code=resp.status_code, detail=detail)

    return payload


@router.get("/api/websites", response_model=list[WebsiteOut])
async def list_websites(request: Request):
    user_id = await get_user_id_from_request(request)
    data = await supabase_request(
        "GET",
        "/user_websites",
        params={"user_id": f"eq.{user_id}", "order": "created_at.desc"},
    )
    return data or []


@router.post("/api/websites", response_model=WebsiteOut, status_code=201)
async def add_website(request: Request, payload: WebsiteIn):
    user_id = await get_user_id_from_request(request)
    data = await supabase_request(
        "POST",
        "/user_websites",
        json_body={"user_id": user_id, "name": payload.name, "url": payload.url},
    )
    website = data[0]
    await log_activity(
        user_id,
        "deployment",
        "New deployment",
        f"{payload.name} deployed",
        {"website_id": website["id"], "url": payload.url},
    )
    return website


@router.patch("/api/websites/{website_id}", response_model=WebsiteOut)
async def update_website(request: Request, website_id: str, payload: WebsiteIn):
    user_id = await get_user_id_from_request(request)
    data = await supabase_request(
        "PATCH",
        "/user_websites",
        json_body={"name": payload.name, "url": payload.url},
        params={"id": f"eq.{website_id}", "user_id": f"eq.{user_id}"},
    )
    if not data:
        raise HTTPException(status_code=404, detail="Website not found.")
    await log_activity(
        user_id,
        "update",
        "Site updated",
        f"Updated {payload.name}",
        {"website_id": website_id},
    )
    return data[0]


@router.delete("/api/websites/{website_id}", status_code=204)
async def delete_website(request: Request, website_id: str):
    user_id = await get_user_id_from_request(request)
    websites = await supabase_request(
        "GET",
        "/user_websites",
        params={"id": f"eq.{website_id}", "user_id": f"eq.{user_id}", "select": "name"},
    )
    name = websites[0]["name"] if websites else "Website"
    await supabase_request(
        "DELETE",
        "/user_websites",
        params={"id": f"eq.{website_id}", "user_id": f"eq.{user_id}"},
    )
    await log_activity(
        user_id,
        "delete",
        "Site removed",
        f"{name} was deleted",
        {"website_id": website_id},
    )
