import uvicorn
from chatbot.chatbot_server import chatbot_app


def main():
    uvicorn.run(chatbot_app, host="0.0.0.0", port=5137, log_level="info")


if __name__ == "__main__":
    main()
