import os
from datetime import datetime, timezone
from typing import Any

import httpx
from fastapi import APIRouter, HTTPException, Request, status
from pydantic import BaseModel, Field

from websites_router import get_user_id_from_request, supabase_request

router = APIRouter()

PAGESPEED_API_KEY = os.getenv("PAGESPEED_API_KEY", "")
SUPABASE_URL = os.getenv("SUPABASE_URL", "").rstrip("/")

INSIGHTS_CACHE_TTL = 3600  # 1 hour


def _parse_lighthouse_categories(data: dict) -> dict[str, int | None]:
    cats = data.get("lighthouseResult", {}).get("categories", {})
    score_map: dict[str, int | None] = {}
    for key in ("performance", "accessibility", "best-practices", "seo"):
        cat = cats.get(key)
        score_map[key.replace("-", "_")] = (
            int(cat["score"] * 100) if cat and cat.get("score") is not None else None
        )
    return score_map


def _generate_insights_from_audit(audits: dict, cats: dict) -> list[dict]:
    insights: list[dict] = []

    perf_score = cats.get("performance")
    if perf_score is not None and perf_score < 90:
        risky_audits = [
            a
            for a in (
                "bootup-time",
                "mainthread-work-breakdown",
                "render-blocking-resources",
            )
            if a in audits
        ]
        if risky_audits:
            insights.append(
                {
                    "title": "Optimize JavaScript Loading",
                    "desc": f"Your performance score is {perf_score}/100. Reduce main-thread work and eliminate render-blocking scripts.",
                    "tag": "Performance",
                }
            )
        else:
            insights.append(
                {
                    "title": "Improve Page Performance",
                    "desc": f"Performance scored {perf_score}/100. Opportunities exist to speed up loading.",
                    "tag": "Performance",
                }
            )

    seo_score = cats.get("seo")
    if seo_score is not None and seo_score < 90:
        missing_desc = audits.get("meta-description", {})
        if (
            missing_desc
            and missing_desc.get("score") is not None
            and missing_desc["score"] < 1
        ):
            insights.append(
                {
                    "title": "Missing Meta Descriptions",
                    "desc": "Key pages are missing meta descriptions, reducing search engine visibility.",
                    "tag": "SEO",
                }
            )
        else:
            insights.append(
                {
                    "title": "Improve SEO Score",
                    "desc": f"SEO scored {seo_score}/100. Address flagged issues to improve search rankings.",
                    "tag": "SEO",
                }
            )

    a11y_score = cats.get("accessibility")
    if a11y_score is not None and a11y_score < 90:
        insights.append(
            {
                "title": "Fix Accessibility Issues",
                "desc": f"Accessibility scored {a11y_score}/100. Improving a11y widens your audience and boosts SEO.",
                "tag": "UX",
            }
        )

    bp_score = cats.get("best_practices")
    if bp_score is not None and bp_score < 90:
        https_audit = audits.get("is-on-https", {})
        if (
            https_audit
            and https_audit.get("score") is not None
            and https_audit["score"] < 1
        ):
            insights.append(
                {
                    "title": "Enable HTTPS Redirects",
                    "desc": "Your site allows HTTP access without redirecting to HTTPS.",
                    "tag": "Security",
                }
            )
        else:
            insights.append(
                {
                    "title": "Improve Best Practices",
                    "desc": f"Best Practices scored {bp_score}/100. Review browser compatibility and security recommendations.",
                    "tag": "Security",
                }
            )

    if len(insights) < 3:
        insights.append(
            {
                "title": "Optimize Images",
                "desc": "Compress images and serve them in modern formats (WebP, AVIF) for faster loads.",
                "tag": "Performance",
            }
        )

    if len(insights) < 4:
        insights.append(
            {
                "title": "Implement Lazy Loading",
                "desc": "Defer off-screen images and iframes to reduce initial page weight.",
                "tag": "Performance",
            }
        )

    return insights[:5]


# ─── PageSpeed Insights ────────────────────────────────────────────


@router.get("/api/insights/{website_id}")
async def get_insights(request: Request, website_id: str):
    user_id = await get_user_id_from_request(request)

    websites = await supabase_request(
        "GET",
        "/user_websites",
        params={
            "id": f"eq.{website_id}",
            "user_id": f"eq.{user_id}",
            "select": "id,url,name",
        },
    )
    if not websites:
        raise HTTPException(status_code=404, detail="Website not found.")

    website = websites[0]
    url = website["url"]

    cached = await supabase_request(
        "GET",
        "/website_insights",
        params={
            "website_id": f"eq.{website_id}",
            "user_id": f"eq.{user_id}",
            "order": "fetched_at.desc",
            "limit": "1",
        },
    )

    now = datetime.now(timezone.utc)
    if cached:
        fetched = datetime.fromisoformat(cached[0]["fetched_at"].replace("Z", "+00:00"))
        if (now - fetched).total_seconds() < INSIGHTS_CACHE_TTL:
            return {
                "website_id": website_id,
                "website_name": website["name"],
                "website_url": url,
                "scores": {
                    k.replace("-", "_"): v
                    for k, v in cached[0].items()
                    if k.endswith("_score")
                },
                "insights": cached[0]["insights"],
                "cached": True,
            }

    psi_url = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
    params: dict[str, str] = {
        "url": url,
        "strategy": "mobile",
        "category": ["performance", "accessibility", "best-practices", "seo"],
    }
    if PAGESPEED_API_KEY:
        params["key"] = PAGESPEED_API_KEY

    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            resp = await client.get(psi_url, params=params)
        except httpx.TimeoutException:
            raise HTTPException(
                status_code=504, detail="PageSpeed API timed out. Try again later."
            )
        except httpx.RequestError:
            raise HTTPException(
                status_code=502, detail="Could not reach PageSpeed API."
            )

    if not resp.is_success:
        detail = resp.json().get("error", {}).get("message", "PageSpeed API error")
        raise HTTPException(status_code=resp.status_code, detail=detail)

    data = resp.json()
    cats = _parse_lighthouse_categories(data)
    audits = data.get("lighthouseResult", {}).get("audits", {})
    insights = _generate_insights_from_audit(audits, cats)

    scores = {
        "performance_score": cats.get("performance"),
        "accessibility_score": cats.get("accessibility"),
        "best_practices_score": cats.get("best_practices"),
        "seo_score": cats.get("seo"),
    }

    await supabase_request(
        "DELETE",
        "/website_insights",
        params={"website_id": f"eq.{website_id}", "user_id": f"eq.{user_id}"},
    )
    await supabase_request(
        "POST",
        "/website_insights",
        json_body={
            "website_id": website_id,
            "user_id": user_id,
            **scores,
            "insights": insights,
            "raw_data": data.get("lighthouseResult", {}),
        },
    )

    return {
        "website_id": website_id,
        "website_name": website["name"],
        "website_url": url,
        "scores": {k.replace("_score", ""): v for k, v in scores.items()},
        "insights": insights,
        "cached": False,
    }


# ─── Activity Events ────────────────────────────────────────────────


class ActivityEventIn(BaseModel):
    type: str = Field(..., min_length=1, max_length=50)
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1, max_length=500)
    metadata: dict[str, Any] = Field(default_factory=dict)


@router.get("/api/activity", response_model=list[dict])
async def list_activity(request: Request, limit: int = 20):
    user_id = await get_user_id_from_request(request)
    data = await supabase_request(
        "GET",
        "/activity_events",
        params={
            "user_id": f"eq.{user_id}",
            "order": "created_at.desc",
            "limit": str(min(limit, 50)),
        },
    )
    return data or []


@router.post("/api/activity", status_code=201)
async def create_activity(request: Request, payload: ActivityEventIn):
    user_id = await get_user_id_from_request(request)
    await supabase_request(
        "POST",
        "/activity_events",
        json_body={
            "user_id": user_id,
            "type": payload.type,
            "title": payload.title,
            "description": payload.description,
            "metadata": payload.metadata,
        },
    )
    return {"status": "ok"}


# ─── Dashboard Analytics ────────────────────────────────────────────


@router.get("/api/analytics")
async def get_analytics(request: Request):
    user_id = await get_user_id_from_request(request)

    websites = (
        await supabase_request(
            "GET",
            "/user_websites",
            params={
                "user_id": f"eq.{user_id}",
                "select": "id,name,url,created_at",
                "order": "created_at.desc",
            },
        )
        or []
    )

    activity = (
        await supabase_request(
            "GET",
            "/activity_events",
            params={
                "user_id": f"eq.{user_id}",
                "order": "created_at.desc",
                "limit": "50",
            },
        )
        or []
    )

    total_websites = len(websites)

    deployments = [a for a in activity if a.get("type") == "deployment"]
    top_website_name = websites[0]["name"] if websites else None
    top_website_url = websites[0]["url"] if websites else None

    sparkline: list[int] = []
    if websites and len(websites) >= 2:
        for w in websites[:7]:
            h = hash(w["id"]) & 0xFFFFFFFF
            sparkline.append(30 + (h % 70))
    else:
        sparkline = [20, 30, 25]

    return {
        "total_websites": total_websites,
        "total_deployments": len(deployments),
        "top_website": {"name": top_website_name, "url": top_website_url}
        if top_website_name
        else None,
        "sparkline": sparkline,
    }
