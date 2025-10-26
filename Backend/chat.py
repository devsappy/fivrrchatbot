import os
from datetime import datetime
from dotenv import load_dotenv
from logs import get_db_logger

load_dotenv()

logger = get_db_logger()



class OptimizedGEOChatBot:
    def __init__(self):
        self.sessions = {}
        self.index = None
        self.query_engine = None
        self.client = None

        groq_api_key = (
            os.getenv("GROQ_API_KEY") 
        )

        if not groq_api_key:
            logger.warning("GROQ API key not found")
            return

        # Delay LlamaIndex initialization to avoid import issues
        self.openai_api_key = groq_api_key
        self.index_initialized = False

    def initialize_index(self):
        """Initialize or load the vector index for the knowledge base"""
        if self.index_initialized:
            return

        try:
            # Lazy import LlamaIndex to avoid startup issues
            try:
                from llama_index.core import (
                    Document,
                    Settings,
                    SimpleDirectoryReader,
                    StorageContext,
                    VectorStoreIndex,
                    load_index_from_storage,
                )
                from llama_index.core.node_parser import SentenceSplitter
                from llama_index.embeddings.openai import OpenAIEmbedding
                from llama_index.llms.openai import OpenAI as LlamaOpenAI
            except Exception as import_error:
                logger.warning(
                    f"LlamaIndex import failed (Pydantic compatibility issue): {str(import_error)}"
                )
                logger.info("Falling back to simple knowledge base without RAG")
                self.index = None
                self.query_engine = None
                return

            Settings.llm = LlamaOpenAI(
                model="gpt-4o-mini", temperature=0.3, api_key=self.openai_api_key
            )
            Settings.embed_model = OpenAIEmbedding(
                model="text-embedding-3-small", api_key=self.openai_api_key
            )

            current_dir = os.path.dirname(os.path.abspath(__file__))
            prompts_path = os.path.join(os.path.dirname(current_dir), "Prompts")
            index_storage_path = os.path.join(current_dir, "storage")

            # Try to load existing index
            if os.path.exists(index_storage_path):
                logger.info("Loading existing index from storage")
                storage_context = StorageContext.from_defaults(persist_dir=index_storage_path)
                self.index = load_index_from_storage(storage_context)
            else:
                logger.info(f"Creating new index from documents in {prompts_path}")

                reader = SimpleDirectoryReader(
                    input_dir=prompts_path, filename_as_id=True, recursive=False
                )
                documents = reader.load_data()

                if not documents:
                    logger.warning("No documents found in Prompts folder")
                    # Load default knowledge
                    documents = [Document(text=self.get_default_knowledge())]

                # Create index with sentence splitter for better chunking
                parser = SentenceSplitter(chunk_size=512, chunk_overlap=50)
                self.index = VectorStoreIndex.from_documents(
                    documents, transformations=[parser], show_progress=True
                )

                # Persist index for future use
                self.index.storage_context.persist(persist_dir=index_storage_path)
                logger.info(f"Index created and saved to {index_storage_path}")

            # Create query engine with specific settings
            self.query_engine = self.index.as_query_engine(
                similarity_top_k=2,  # Return top 3 most relevant chunks
                response_mode="no_text",  # Just retrieve, don't generate
                verbose=True,
            )

            self.index_initialized = True
            logger.info("Knowledge base index initialized successfully")

        except Exception as e:
            logger.error(f"Error initializing index: {str(e)}")
            self.index = None
            self.query_engine = None

    def get_relevant_context(self, user_question: str) -> str:
        """Retrieve only relevant context for the user's question"""
        # Initialize index on first use
        if not self.index_initialized:
            self.initialize_index()

        # If no query engine (LlamaIndex failed), load full knowledge base from files
        if not self.query_engine:
            try:
                current_dir = os.path.dirname(os.path.abspath(__file__))
                prompts_path = os.path.join(os.path.dirname(current_dir), "Prompts")
                knowledge_content = []

                # Load knowledge files directly
                for filename in ["geo_knowledge_base.md", "geo_chatbot_prompt.md"]:
                    file_path = os.path.join(prompts_path, filename)
                    if os.path.exists(file_path):
                        with open(file_path, encoding="utf-8") as f:
                            knowledge_content.append(f.read())

                if knowledge_content:
                    logger.info("Using direct file loading for knowledge base")
                    return "\n\n".join(knowledge_content)
                else:
                    return self.get_default_knowledge()
            except Exception as e:
                logger.error(f"Error loading knowledge files: {str(e)}")
                return self.get_default_knowledge()

        try:
            # Retrieve relevant nodes using RAG
            retriever = self.index.as_retriever(similarity_top_k=3)
            nodes = retriever.retrieve(user_question)

            # Combine the relevant text chunks
            context_parts = []
            for node in nodes:
                context_parts.append(node.get_content())

            relevant_context = "\n\n".join(context_parts)

            # Log token savings
            logger.info(f"Retrieved {len(nodes)} relevant chunks instead of entire KB")

            return relevant_context

        except Exception as e:
            logger.error(f"Error retrieving context: {str(e)}")
            return self.get_default_knowledge()

    def generate_response(self, user_input: str, session_id: str | None = None) -> str:
        """Generate response using OpenAI API with relevant GEO context only"""
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

            # Clean up old sessions
            self._cleanup_old_sessions()

            # Get ONLY relevant context (not entire KB)
            relevant_context = self.get_relevant_context(user_input)

            # Determine response style and length based on question type
            question_lower = user_input.lower()

            # Categories for response style
            is_factual = any(word in question_lower for word in [
                'price', 'cost', 'how much', 'when', 'how long', 'what time'
            ])
            is_definition = any(phrase in question_lower for phrase in [
                'what is geo', 'what is aeo', 'define', 'meaning of'
            ])
            is_business_specific = any(word in question_lower for word in [
                'my business', 'restaurant', 'shop', 'store', 'clinic', 'firm',
                'company', 'startup', 'agency', 'practice', 'salon', 'gym'
            ])
            is_feature_list = any(word in question_lower for word in [
                'features', 'services', 'benefits', 'plans', 'options'
            ])

            # Set max tokens based on question type
            if is_factual or is_definition:
                max_tokens = 150  # Direct answer with context
            elif is_feature_list:
                max_tokens = 200  # Bullet list with explanations
            elif is_business_specific:
                max_tokens = 200  # Detailed, personalized response
            else:
                max_tokens = 180  # Default: conversational with context
            
            # Build system message with context-aware tone
            if is_factual:
                tone_instruction = "Be direct and factual, but provide context. 1-2 sentences with helpful follow-up."
            elif is_definition:
                tone_instruction = "Provide a clear 1-2 sentence definition, then briefly mention the key benefit."
            elif is_business_specific:
                tone_instruction = "Be enthusiastic and specific to their business type. 2-3 sentences with concrete examples."
            elif is_feature_list:
                tone_instruction = "Use brief bullet points with context."
            else:
                tone_instruction = "Be conversational and helpful. 2-4 sentences providing complete context."

            system_message = f"""You are the GEO Expert Assistant - a helpful guide who educates users about AI search optimization.

STRICT TOPIC BOUNDARIES - MUST FOLLOW:
You CAN ONLY discuss topics related to:
- GEO (Generative Engine Optimization)
- AI search engines (ChatGPT, Perplexity, Google AI) and how they cite businesses
- Traditional SEO vs GEO comparison
- Business visibility in AI search results
- GEO services, plans, pricing, and process

You MUST REFUSE to discuss:
- Technical implementation: Programming, coding, APIs, databases, backend systems
- Software engineering: Bug fixes, code reviews, technical architecture
- IT support: Computer troubleshooting, software installation
- Data science/ML technical details
- Politics, religion, controversial topics
- Personal advice (relationships, health, career)
- Entertainment, sports, pop culture
- Medical, legal, or financial advice
- General business consulting unrelated to AI search visibility

RESPONSE TO OFF-TOPIC QUESTIONS:
For technical/coding questions: "I'm not able to help with technical implementation or coding questions. I specialize exclusively in GEO (Generative Engine Optimization) and AI search visibility for businesses. If you have questions about improving your company's visibility in AI search results, I'd be happy to help!"

For unrelated business questions: "That's outside my area of expertise. I focus specifically on GEO and helping businesses get cited by AI search engines. Is your business currently visible when customers ask AI about your industry?"

CORE PRINCIPLES:
- Be conversational, friendly, and helpful
- Provide complete context in your answers
- Most responses should be 2-4 sentences (not one-word or robotic answers)
- Always guide users on next steps when relevant
- You GUIDE users, you don't DO things for them
- Explain processes clearly with step-by-step instructions when asked "how"

TONE INSTRUCTION: {tone_instruction}

RESPONSE GUIDELINES:
- Benefits/Results: Explain what improves and why it matters (2-3 sentences)
- Pricing: State the price AND briefly what's included (2 sentences)
- What is GEO: Brief explanation + why it matters (2 sentences)
- Timeline: Direct answer + what they can expect (2 sentences)
- Vague questions ("how much can it help"): Ask about their industry OR provide general overview
- "How to" questions: Provide clear step-by-step guidance

IMPORTANT PHRASING:
- Never say "I can do X for you" - say "Here's how to do X"
- Never promise to perform actions - guide users to take action themselves
- Always offer to clarify or provide more details

Relevant Knowledge Context:
"""
            system_message += relevant_context

            # Build messages
            messages = [{"role": "system", "content": system_message}]

            # Add recent conversation history (last 10 exchanges)
            session_history = self.sessions[session_id]["conversation_history"]
            for msg in session_history[-20:]:
                messages.append(msg)

            # Add current user input
            messages.append({"role": "user", "content": user_input})

            # Log token optimization
            total_context_size = len(system_message) + sum(len(str(m)) for m in messages)
            logger.info(f"Context size: ~{total_context_size // 4} tokens (optimized from full KB)")

            # Generate response
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                max_tokens=500,
                temperature=0.3
            )

            assistant_response = response.choices[0].message.content

            # Update conversation history
            self.sessions[session_id]["conversation_history"].append(
                {"role": "user", "content": user_input}
            )
            self.sessions[session_id]["conversation_history"].append(
                {"role": "assistant", "content": assistant_response}
            )

            # Keep history manageable
            if len(self.sessions[session_id]["conversation_history"]) > 50:
                self.sessions[session_id]["conversation_history"] = self.sessions[session_id][
                    "conversation_history"
                ][-50:]

            return assistant_response

        except Exception as e:
            logger.error(f"Error generating response: {str(e)}")
            return "I apologize, but I encountered an error. Please try again."

    def get_default_knowledge(self):
        """Provide default GEO knowledge if files cannot be loaded"""
        return """
# GEO (Generative Engine Optimization)

## What is GEO?
GEO makes sure ChatGPT, Perplexity, and Google's AI cite YOUR company when people ask questions
 about your industry.

## Why GEO Matters
- 50% of searches will be AI-powered by 2026
- ChatGPT: 1.7 billion visits every month
- 60% of Google searches now display AI answers
- 65% of consumers use AI for product research
- 23x higher conversion rates from AI search traffic

## Our Services
- Starter Plan (FREE): AI Visibility Score Analysis, Search Query Testing, Detailed Performance Report
- Professional Plan ($299 one-time): AI Content Optimization, Key Search Results, Real-time AI Visibility Tracking
- Professional Plan - Monitoring ($249/mo or $199/mo for 3-month special): Continuous Monitoring, Weekly Reports

## Results
- 37% average improvement in AI citations
- Most clients see results within 30-45 days
"""

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

    def refresh_index(self):
        """Refresh the index if knowledge base files are updated"""
        try:
            current_dir = os.path.dirname(os.path.abspath(__file__))
            index_storage_path = os.path.join(current_dir, "storage")

            # Remove existing index
            if os.path.exists(index_storage_path):
                import shutil

                shutil.rmtree(index_storage_path)
                logger.info("Removed existing index storage")

            # Reinitialize
            self.initialize_index()
            logger.info("Index refreshed successfully")
            return True
        except Exception as e:
            logger.error(f"Error refreshing index: {str(e)}")
            return False


# Global instance
chatbot_instance = None


def get_optimized_chatbot():
    """Get or create optimized chatbot instance"""
    global chatbot_instance
    if chatbot_instance is None:
        chatbot_instance = OptimizedGEOChatBot()
    return chatbot_instance


if __name__ == "__main__":
    print("\n[START] Optimized GEO Chatbot Test")
    chatbot = get_optimized_chatbot()

    # Test queries
    test_queries = [
        "What is GEO?",
        "How much does the professional plan cost?",
        "How long before I see results?",
    ]

    print("\n[TESTING] Running test queries...")
    for query in test_queries:
        print(f"\nQ: {query}")
        response = chatbot.generate_response(query, "test_session")
        print(f"A: {response[:200]}...")

    print("\n[INFO] Check token usage - should be significantly lower than full KB approach!")