import json
import os

import uvicorn
from dotenv import load_dotenv

load_dotenv()

from fastapi import Request
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded

from auth_router import limiter, router as auth_router
from chatbot.chatbot_server import chatbot_app, all_origins


def _cors_aware_rate_limit_handler(request: Request, exc: RateLimitExceeded) -> JSONResponse:
    """Rate-limit handler that preserves CORS headers so the browser shows the real error."""
    origin = request.headers.get("origin", "")
    headers: dict[str, str] = {}
    if origin in all_origins:
        headers["Access-Control-Allow-Origin"] = origin
        headers["Access-Control-Allow-Credentials"] = "true"
    retry_after = getattr(exc, "retry_after", 60)
    headers["Retry-After"] = str(retry_after)
    return JSONResponse(
        status_code=429,
        content={"detail": f"Too many attempts. Please wait {retry_after} seconds before trying again."},
        headers=headers,
    )


chatbot_app.state.limiter = limiter
chatbot_app.add_exception_handler(RateLimitExceeded, _cors_aware_rate_limit_handler)
chatbot_app.include_router(auth_router)


def main():
    uvicorn.run(chatbot_app, host="0.0.0.0", port=5137, log_level="info")


if __name__ == "__main__":
    main()
