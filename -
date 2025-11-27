import axios from 'axios';

const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const sendMessageToGroq = async (messages: ChatMessage[]): Promise<string> => {
  // Check if API key is configured
  if (!GROQ_API_KEY) {
    // Return a demo response when API key is not configured
    const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || '';

    if (lastMessage.includes('hello') || lastMessage.includes('hi')) {
      return 'Hello! Welcome to Chatterify AI Services. We specialize in creating intelligent chatbots for businesses. How can I help you today?';
    } else if (lastMessage.includes('price') || lastMessage.includes('cost')) {
      return 'Our pricing starts at $99/month for basic chatbot services. We also offer custom enterprise solutions. Would you like to know more about our pricing plans?';
    } else if (lastMessage.includes('feature')) {
      return 'Our chatbots include: 24/7 availability, multi-language support, custom training, analytics dashboard, and seamless integration with your existing systems.';
    } else if (lastMessage.includes('contact')) {
      return 'You can reach us through the Contact page on our website, or email us directly at support@chatterify.in';
    } else {
      return 'Thank you for your interest in our AI chatbot services! We offer custom AI solutions for businesses. Feel free to ask about our features, pricing, or how we can help your business.';
    }
  }

  try {
    const response = await axios.post<GroqResponse>(
      GROQ_API_URL,
      {
        model: 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant for a company that provides AI chatbot services. Be friendly, professional, and informative about AI chatbot solutions, features, pricing, and implementation. Keep responses concise and engaging.'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        stream: false
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0]?.message?.content || 'I apologize, but I couldn\'t process your request at the moment.';
  } catch (error) {
    console.error('Error calling Groq API:', error);

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        return 'I\'m receiving too many requests at the moment. Please try again in a few seconds.';
      } else if (error.response?.status === 401) {
        return 'There seems to be an authentication issue. Please contact support.';
      }
    }

    return 'I apologize, but I\'m having trouble connecting to my AI service. Please try again later.';
  }
};