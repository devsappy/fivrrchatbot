import os
import sys
import json
import uuid
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import logging
from chatbot.chatbot import get_optimized_chatbot

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting the chatbot server")
    chatbot = get_optimized_chatbot()
    app.state.chatbot = chatbot
    yield
    logger.info("Shutting down the chatbot server")


chatbot_app = FastAPI(
    lifespan=lifespan,
    docs_url=None,  # Disable default docs to add authentication
    redoc_url=None,  # Disable redoc as well
    openapi_url=None,  # Disable default openapi.json to add authentication
)

allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "")
ALLOWED_ORIGINS = ["http://localhost:3000"]

if allowed_origins_env:
    try:
        ALLOWED_ORIGINS = json.loads(allowed_origins_env)
        logger.info(f"Parsed ALLOWED_ORIGINS as JSON: {ALLOWED_ORIGINS}")
    except json.JSONDecodeError:
        # If not JSON, try comma-separated format
        ALLOWED_ORIGINS = [
            origin.strip()
            for origin in allowed_origins_env.split(",")
            if origin.strip()
        ]
        logger.info(f"Parsed ALLOWED_ORIGINS as comma-separated: {ALLOWED_ORIGINS}")


all_origins = list(set(ALLOWED_ORIGINS))

# Log CORS configuration for debugging
logger.info(f"CORS Configuration - Allowed Origins: {all_origins}")

chatbot_app.add_middleware(
    CORSMiddleware,
    allow_origins=all_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    session_id: str | None = Field(None, max_length=100)


class ChatResponse(BaseModel):
    response: str
    session_id: str | None = None
    status: str = "success"


from auth_router import router as auth_router
from websites_router import router as websites_router

chatbot_app.include_router(auth_router)
chatbot_app.include_router(websites_router)


@chatbot_app.get("/")
async def root():
    return {"message": "Chatterify API is running", "status": "healthy"}



@chatbot_app.get("/health")

async def health(request: Request):
    return {"status": "healthy", "service": "chatbot", "port": "5137"}


@chatbot_app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest, http_request: Request):
    session_id = None
    try:
        # Generate session ID if not provided
        session_id = request.session_id
        if not session_id:
            session_id = str(uuid.uuid4())
            logger.info(f"Created new session: {session_id}")

        logger.info(
            f"""Received chat message for session {session_id} from\
 origin {http_request.headers.get("origin", "unknown")}: {request.message[:50]}..."""
        )

        # Get chatbot instance
        chatbot = http_request.app.state.chatbot

        if chatbot is None:
            logger.error(
                "Chatbot initialization failed - likely missing OpenAI API key"
            )
            return ChatResponse(
                response="""I apologize, but the chat service is temporarily unavailable due to a\
 configuration issue. Please contact support or explore our GEO services on the main website.""",
                session_id=session_id,
                status="error",
            )

        # Generate response
        response = await chatbot.generate_response(
            user_input=request.message, session_id=session_id
        )

        return ChatResponse(response=response, session_id=session_id, status="success")

    except Exception as e:
        error_msg = str(e)
        logger.error(f"Chat endpoint error: {error_msg}")

        # Log additional debugging information
        logger.error(f"Request origin: {http_request.headers.get('origin', 'unknown')}")
        logger.error(
            f"Session ID: {session_id if 'session_id' in locals() else 'not set'}"
        )

        # Return a user-friendly error response instead of raising HTTPException
        # This prevents CORS issues on error responses
        return ChatResponse(
            response="""I apologize, but I encountered an error processing your message. Please try\
 again or contact support if the issue persists.""",
            session_id=session_id if "session_id" in locals() else None,
            status="error",
        )
