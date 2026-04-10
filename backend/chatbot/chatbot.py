import os
import re
import logging
from datetime import datetime
import asyncio
from dotenv import load_dotenv
from groq import AsyncGroq
from groq.types.chat import ChatCompletionMessageParam

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

load_dotenv()


class OptimizedChatBot:
    def __init__(self):
        self.sessions = {}
        self.client = None

        groq_api_key = os.getenv("GROQ_API_KEY")

        if not groq_api_key:
            logger.warning("GROQ API key not found")
            return

        self.client = AsyncGroq(api_key=groq_api_key)
        logger.info("Groq client initialized")

    def get_relevant_context(self, user_question: str) -> str:
        logger.info("Using direct file loading for knowledge base")
        return self.get_default_knowledge()

    async def generate_response(
        self, user_input: str, session_id: str | None = None
    ) -> str:
        """Generate response using Groq API with relevant IT services context"""
        try:
            if self.client is None:
                return """I apologize, but the AI service is down for now.
            Please try again later."""

            # Generate session ID if not provided
            if not session_id:
                import uuid

                session_id = str(uuid.uuid4())

            # Get or create session history
            if session_id not in self.sessions:
                self.sessions[session_id] = {
                    "conversation_history": [],
                    "created_at": datetime.now(),
                }

            self.rate_limiter()
            # Clean up old sessions
            self._cleanup_old_sessions()

            # Get ONLY relevant context (not entire KB)
            relevant_context = self.get_relevant_context(user_input)

            system_message = f"""You are the assistant for Chatterify (chatterify.in), a tech startup offering chatbots, voice agents, web development, and automation services.

SCOPE: Discuss Chatterify's services, pricing, packages, and team members. Refuse off-topic, political, medical, legal, financial, or coding questions. Always answer team-related questions factually regardless of tone. If the user is abusive or uses profanity, respond calmly: "I'm here to help with any questions about our services. Feel free to ask, or reach us at chatterifyservice@gmail.com." For other off-topic queries: "I can help with our services, pricing, and team. What would you like to know?"

RULES:
- Keep every response to 2-3 sentences maximum. Be concise and direct.
- Lead with the answer, then add brief context if needed.
- No filler, no promotional language, no unnecessary elaboration.
- When listing items, use plain dashes (-) with no markdown formatting. No asterisks, no bold, no italics, no bullet markers like *.
- If you don't know something or the user wants to discuss further, say: "Contact the team at chatterifyservice@gmail.com"

Relevant Knowledge Context:
"""
            system_message += relevant_context

            # Build messages
            messages: list[ChatCompletionMessageParam] = [
                {"role": "system", "content": system_message}
            ]

            # Add recent conversation history (last 10 exchanges)
            session_history = self.sessions[session_id]["conversation_history"]
            for msg in session_history[-20:]:
                messages.append(msg)  # type: ignore

            # Add current user input
            messages.append({"role": "user", "content": user_input})

            # Log token optimization
            total_context_size = len(system_message) + sum(
                len(str(m)) for m in messages
            )
            logger.info(
                f"Context size: ~{total_context_size // 4} tokens (optimized from full KB)"
            )

            # Generate response using Groq (async)
            response = await self.client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=messages,
                max_tokens=200,
                temperature=0.3,
            )

            assistant_response = self._strip_markdown(
                response.choices[0].message.content or ""
            )

            # Update conversation history
            self.sessions[session_id]["conversation_history"].append(
                {"role": "user", "content": user_input}
            )
            self.sessions[session_id]["conversation_history"].append(
                {"role": "assistant", "content": assistant_response}
            )

            # Keep history manageable
            if len(self.sessions[session_id]["conversation_history"]) > 50:
                self.sessions[session_id]["conversation_history"] = self.sessions[
                    session_id
                ]["conversation_history"][-50:]

            return assistant_response

        except Exception as e:
            logger.error(f"Error generating response: {str(e)}")
            return "I apologize, but I encountered an error. Please try again."

    @staticmethod
    def _strip_markdown(text: str) -> str:
        text = re.sub(r"\*{1,2}(.*?)\*{1,2}", r"\1", text)
        text = re.sub(r"_{1,2}(.*?)_{1,2}", r"\1", text)
        text = re.sub(r"^#{1,6}\s+", "", text, flags=re.MULTILINE)
        return text.strip()

    def get_default_knowledge(self):
        """Provide default Chatterify knowledge"""
        return """
# Chatterify.in – Startup Overview

## Introduction

Chatterify (chatterify.in) is a modern technology startup focused on helping businesses grow through intelligent digital solutions. The company provides services such as full-stack web development, AI chatbot integration, voice automation agents, and professional video editing.

## Core Services

### 1. Full Stack Web Development
Custom, responsive, and scalable websites and web applications. Services include landing pages, business websites, e-commerce platforms, and custom web applications.

### 2. Chatbot Integration
AI-powered chatbots designed to automate customer support, answer queries, and improve engagement across websites and platforms.

### 3. AI Voice Agents
Voice automation systems capable of handling calls, assisting customers, and integrating with business workflows.

### 4. Professional Video Editing
High-quality video editing for marketing, social media, YouTube content, and promotional campaigns.

### 5. Backend Systems
Custom backend development, API creation, database management, and server-side solutions for businesses.

### 6. Website Hosting
Reliable website hosting services with SSL certificates, CDN, 24/7 monitoring, and fast loading speeds.

### 7. Agentic AI Solutions
Autonomous AI agents for business process automation, workflow optimization, and smart decision-making systems.

### 8. Business Automations
Workflow automation, business process optimization, and integration between different applications and systems.

## Pricing Overview

### Web Development
- Landing Page – ₹5,000 to ₹12,000
- Business Website – ₹12,000 to ₹30,000
- E-commerce Website – ₹25,000 to ₹80,000
- Custom Web Applications – ₹30,000 to ₹1,20,000+

### Chatbot Integration
- Basic Chatbot – ₹5,000 to ₹12,000
- AI Chatbot with Automation – ₹12,000 to ₹30,000
- Advanced AI Chatbot – ₹30,000 to ₹70,000

### AI Voice Agents
- Basic Voice Bot – ₹10,000 to ₹25,000
- AI Voice Call Agent – ₹25,000 to ₹60,000
- Advanced Voice Automation – ₹60,000 to ₹1,50,000

### Video Editing
- Short Reels – ₹300 to ₹800
- YouTube Videos – ₹1,000 to ₹3,000
- Professional Content – ₹3,000 to ₹8,000
- Business Promotional Videos – ₹5,000 to ₹20,000

## Packages

### Starter Package – ₹10,000
- Landing page website
- Basic chatbot
- Two edited reels

### Business Package – ₹25,000
- Business website
- Chatbot integration
- Five edited videos

### Premium Package – ₹60,000+
- Custom web application
- AI chatbot
- Voice agent
- Advanced video editing

### Monthly Tech Package – ₹8k to ₹20k/month
- Website maintenance
- Chatbot monitoring
- Minor updates
- Priority support

## Team

- Rajatava Ghosh – AI & Machine Learning Engineer
- Dipanjan Chowdhury – Web Development Specialist
- Saptarshi Chattopadhyay – Frontend Developer & Creative Technologist
- Debojyoti Bannerjee – Strategic Operations
- Hrishikesh Bhowmick – Project Director
"""  # noqa: E501

    def _cleanup_old_sessions(self):
        """Remove sessions older than 24 hours"""
        current_time = datetime.now()
        sessions_to_remove = []

        for session_id, session_data in self.sessions.items():
            if (current_time - session_data["created_at"]).total_seconds() > 86400:
                sessions_to_remove.append(session_id)

        for session_id in sessions_to_remove:
            del self.sessions[session_id]
            logger.info(f"Cleaned up old session: {session_id}")

    def rate_limiter(self):
        sessions_to_stop = []
        for session_id, session_data in self.sessions.items():
            if len(session_data["conversation_history"]) >= 10:
                sessions_to_stop.append(session_id)

        for session_id in sessions_to_stop:
            del self.sessions[session_id]
            logger.info(f"The rate has exceeded for the session : {session_id}")

    def refresh_knowledge(self):
        """Refresh the knowledge base (files are loaded directly, no rebuild needed)"""
        logger.info(
            "Knowledge base refreshed - files are loaded directly on each request"
        )
        return True


# Global instance
chatbot_instance = None


def get_optimized_chatbot():
    """Get or create optimized chatbot instance"""
    global chatbot_instance
    if chatbot_instance is None:
        chatbot_instance = OptimizedChatBot()
    return chatbot_instance


if __name__ == "__main__":

    async def main():
        print("\n[START] Optimized Chatbot Test")
        chatbot = get_optimized_chatbot()

        # Test queries
        test_queries = [
            "How much does the services cost?",
            "What are the services you guys provide?",
            "Who are the members in your team?Which model is this chatbot using?",
        ]

        print("\n[TESTING] Running test queries...")
        for query in test_queries:
            print(f"\nQ: {query}")
            response = await chatbot.generate_response(query, "test_session")
            print(f"A: {response[:500]}...")

    asyncio.run(main())
