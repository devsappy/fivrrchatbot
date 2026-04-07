import uvicorn
from dotenv import load_dotenv

load_dotenv()

from auth_router import router as auth_router
from chatbot.chatbot_server import chatbot_app

chatbot_app.include_router(auth_router)


def main():
    uvicorn.run(chatbot_app, host="0.0.0.0", port=5137, log_level="info")


if __name__ == "__main__":
    main()
