import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToOpenAI, ChatMessage } from '../services/openaiApi';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navOverlayOpen, setNavOverlayOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const hidden = navOverlayOpen || previewOpen;

  useEffect(() => {
    const handleNavToggle = (e: Event) => {
      const detail = (e as CustomEvent<{ open: boolean }>).detail;
      setNavOverlayOpen(Boolean(detail?.open));
    };
    const handlePreviewToggle = (e: Event) => {
      const detail = (e as CustomEvent<{ open: boolean }>).detail;
      setPreviewOpen(Boolean(detail?.open));
    };
    window.addEventListener('mobile-nav-toggle', handleNavToggle);
    window.addEventListener('preview-modal-toggle', handlePreviewToggle);
    return () => {
      window.removeEventListener('mobile-nav-toggle', handleNavToggle);
      window.removeEventListener('preview-modal-toggle', handlePreviewToggle);
    };
  }, []);

  useEffect(() => {
    if (hidden) setIsOpen(false);
  }, [hidden]);

  const [fullyHidden, setFullyHidden] = useState(false);
  useEffect(() => {
    if (hidden) {
      const t = window.setTimeout(() => setFullyHidden(true), 320);
      return () => window.clearTimeout(t);
    }
    setFullyHidden(false);
  }, [hidden]);

  // Track visualViewport so the chat window (a) shrinks when the software
  // keyboard opens on iOS/Android and (b) hugs the bottom of the visible
  // area instead of being pushed behind the keyboard.
  const [viewport, setViewport] = useState<{ height: number; offsetTop: number }>(() => ({
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    offsetTop: 0,
  }));

  useEffect(() => {
    if (!isOpen) return;
    const vv = window.visualViewport;
    const update = () => {
      setViewport({
        height: vv?.height ?? window.innerHeight,
        offsetTop: vv?.offsetTop ?? 0,
      });
    };
    update();
    vv?.addEventListener('resize', update);
    vv?.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      vv?.removeEventListener('resize', update);
      vv?.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [isOpen]);
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

      const botResponse = await sendMessageToOpenAI(conversationHistory);

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
          className={`fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full shadow-lg shadow-black/50 hover:bg-gray-800 hover:scale-105 flex items-center justify-center ring-2 ring-white/20 hover:ring-white/40 transition-all duration-300 ease-out ${hidden ? 'opacity-0 translate-y-3 pointer-events-none' : 'opacity-100 translate-y-0'} ${fullyHidden ? 'invisible' : 'visible'}`}
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
        <div
          className="fixed left-3 right-3 sm:left-auto sm:right-6 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-chatOpen sm:w-[360px] sm:h-[500px]"
          style={{
            zIndex: 999999,
            // On mobile: anchor to bottom of the *visual* viewport (handles keyboard), cap height so it never overflows.
            // On desktop (sm+): these values are overridden by Tailwind's sm:* classes, so they're safe defaults.
            bottom: `${Math.max(12, window.innerHeight - viewport.height - viewport.offsetTop + 12)}px`,
            maxHeight: `${Math.max(320, viewport.height - 24)}px`,
            height: window.matchMedia('(min-width: 640px)').matches ? undefined : `${Math.min(560, viewport.height - 32)}px`,
          }}
        >
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
                enterKeyHint="send"
                className="flex-1 min-w-0 px-4 py-2 bg-gray-50 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-200 transition-all"
                style={{ fontSize: '16px' }}
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