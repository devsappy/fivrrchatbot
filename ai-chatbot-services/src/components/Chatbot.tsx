import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGroq, ChatMessage } from '../services/groqApi';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Debug: Log when component mounts
  useEffect(() => {
    console.log('Chatbot component mounted successfully');
    return () => console.log('Chatbot component unmounted');
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRefreshChat = () => {
    setMessages([
      {
        id: '1',
        text: 'Hello! How can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
    setIsTyping(false);
    setInputMessage('');
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const conversationHistory: ChatMessage[] = messages.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }));

      conversationHistory.push({
        role: 'user',
        content: inputMessage,
      });

      const botResponse = await sendMessageToGroq(conversationHistory);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Minimalistic Black and White Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 hover:scale-105 transition-all duration-200 flex items-center justify-center"
          aria-label="Open chat"
          style={{
            zIndex: 999999,
            position: 'fixed',
            display: 'flex'
          }}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* Minimal Chat Window with Animation */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[360px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-chatOpen"
          style={{ zIndex: 999999 }}>
          {/* Simple Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Chat</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefreshChat}
                className="w-8 h-8 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors"
                aria-label="New chat"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Clean Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Minimal Input */}
          <div className="px-6 py-4 border-t border-gray-100">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 px-4 py-2 bg-gray-50 rounded-full text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-200 transition-all"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  inputMessage.trim()
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;