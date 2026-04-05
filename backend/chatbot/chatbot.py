import os
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

            # Determine response style and length based on question type
            question_lower = user_input.lower()

            # Categories for response style
            is_factual = any(
                word in question_lower
                for word in [
                    "price",
                    "cost",
                    "how much",
                    "when",
                    "how long",
                    "what time",
                ]
            )
            is_definition = any(
                phrase in question_lower
                for phrase in ["what is", "define", "meaning of", "explain"]
            )
            is_business_specific = any(
                word in question_lower
                for word in [
                    "my business",
                    "restaurant",
                    "shop",
                    "store",
                    "clinic",
                    "firm",
                    "company",
                    "startup",
                    "agency",
                    "practice",
                    "salon",
                    "gym",
                ]
            )
            is_feature_list = any(
                word in question_lower
                for word in ["features", "services", "benefits", "plans", "options"]
            )

            # Set max tokens based on question type
            if is_factual or is_definition:
                _max_tokens = 150  # Direct answer with context
            elif is_feature_list:
                _max_tokens = 200  # Bullet list with explanations
            elif is_business_specific:
                _max_tokens = 200  # Detailed, personalized response
            else:
                _max_tokens = 180  # Default: conversational with context

            # Build system message with context-aware tone
            if is_factual:
                tone_instruction = "Be direct and factual, but provide context. 1-2 sentences with helpful follow-up."  # noqa: E501
            elif is_definition:
                tone_instruction = "Provide a clear 1-2 sentence definition, then briefly mention the key benefit."  # noqa: E501
            elif is_business_specific:
                tone_instruction = "Be enthusiastic and specific to their business type. 2-3 sentences with concrete examples."  # noqa: E501
            elif is_feature_list:
                tone_instruction = "Use brief bullet points with context."
            else:
                tone_instruction = "Be conversational and helpful. 2-4 sentences providing complete context."  # noqa: E501

            system_message = f"""You are the IT Solutions Assistant for the business CHATTERIFY- a helpful guide who assists users with our company's technology services.

STRICT TOPIC BOUNDARIES - MUST FOLLOW:
You CAN ONLY discuss topics related to:
- AI Chatbots and conversational AI solutions
- Voice Agents and voice AI technology but don't go into depth
- Agentic AI solutions and automation
- Business process automation
- Backend systems development
- Website development and design
- Website hosting services
- Landing page creation
- SEO services for websites
- Technical services, pricing, and process

You MUST REFUSE to discuss:
- Political or controversial topics
- Personal advice (relationships, health, career)
- Entertainment, sports, pop culture
- Medical, legal, or financial advice
- Competitor services or products
- Topics unrelated to our IT services
- Any technicalities or coding questions like how to make a chatbot or how to design a website etc 

RESPONSE TO OFF-TOPIC QUESTIONS:
For unrelated questions: "I specialize in IT solutions including chatbots, voice agents, websites, automation, and backend systems. How can I help you with our technology services today?"

CORE PRINCIPLES:
- Be conversational, friendly, and helpful
- Provide complete context in your answers
- Most responses should be 2-4 sentences (not one-word or robotic answers)
- Always guide users on next steps when relevant
- Explain processes clearly with step-by-step instructions when asked "how"
- Be enthusiastic about helping with their project
- If the conversation is going to a different direction then guide them to our services and how it can help them  

TONE INSTRUCTION: {tone_instruction}

RESPONSE GUIDELINES:
- Benefits/Results: Explain what improves and why it matters (2-3 sentences)
- Pricing: State the price AND briefly what's included (2 sentences)
- Services: brief explanation + what's included (2-3 sentences)
- Timeline: Direct answer + what they can expect (2 sentences)
- Vague questions ("what do you do"): Provide general overview of services
- "How to" questions: Provide clear step-by-step guidance
- Technical questions: Explain in simple terms, avoid jargon
- Dont say "I don't know" rather explain it wisely with whatever knowledge you have and for further in-depth question ask them to contact the team 

IMPORTANT PHRASING:
- Offer to clarify or provide more details
- Ask about their specific needs when appropriate
- Guide them to the next step (consultation, quote, etc.)

Relevant Knowledge Context:
"""  # noqa: E501
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
                max_tokens=500,
                temperature=0.3,
            )

            assistant_response = response.choices[0].message.content or ""

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
