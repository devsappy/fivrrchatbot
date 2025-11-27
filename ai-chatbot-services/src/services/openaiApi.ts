import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || '';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// Demo responses when API is rate limited or unavailable
const getDemoResponse = (messages: ChatMessage[]): string => {
  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || '';

  if (lastMessage.includes('hello') || lastMessage.includes('hi') || lastMessage.includes('hey')) {
    return 'Hello! Welcome to Chatterify AI Services. We specialize in creating intelligent chatbots for businesses. How can I help you today?';
  } else if (lastMessage.includes('price') || lastMessage.includes('cost') || lastMessage.includes('pricing')) {
    return 'Our pricing starts at $99/month for basic chatbot services. We also offer custom enterprise solutions tailored to your needs. Would you like to schedule a consultation to discuss your requirements?';
  } else if (lastMessage.includes('feature') || lastMessage.includes('what can') || lastMessage.includes('capabilities')) {
    return 'Our chatbots include: 24/7 availability, multi-language support, custom training on your data, analytics dashboard, seamless integration with your existing systems, and natural language understanding. Which feature interests you most?';
  } else if (lastMessage.includes('contact') || lastMessage.includes('reach') || lastMessage.includes('talk')) {
    return 'You can reach us through the Contact page on our website, or email us directly at support@chatterify.in. We typically respond within 24 hours!';
  } else if (lastMessage.includes('how') && lastMessage.includes('work')) {
    return 'Our process is simple: 1) We analyze your business needs, 2) Design a custom chatbot solution, 3) Train it on your specific data, 4) Deploy and integrate with your platforms. The whole process typically takes 2-4 weeks.';
  } else if (lastMessage.includes('demo') || lastMessage.includes('try') || lastMessage.includes('test')) {
    return 'You\'re chatting with a demo of our AI right now! For a full demo customized to your business, please visit our Contact page to schedule a personalized walkthrough.';
  } else if (lastMessage.includes('thank')) {
    return 'You\'re welcome! Is there anything else I can help you with today?';
  } else {
    return 'Thank you for your interest in Chatterify! We offer custom AI chatbot solutions for businesses of all sizes. Feel free to ask about our features, pricing, or how we can help automate your customer interactions.';
  }
};

export const sendMessageToOpenAI = async (messages: ChatMessage[]): Promise<string> => {
  try {
    const response = await axios.post<OpenAIResponse>(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant for Chatterify, a company that provides AI chatbot services. Be friendly, professional, and informative about AI chatbot solutions, features, pricing, and implementation. Keep responses concise and engaging.'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0]?.message?.content || 'I apologize, but I couldn\'t process your request at the moment.';
  } catch (error) {
    console.error('Error calling OpenAI API:', error);

    // Fall back to demo responses when API fails
    return getDemoResponse(messages);
  }
};
