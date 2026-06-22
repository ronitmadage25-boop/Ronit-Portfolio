"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, ChevronRight, Terminal } from "lucide-react";
import { matchQuery, generateResponse } from "@/lib/aiKnowledgeBase";
import { useTheme } from "@/contexts/ThemeContext";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const quickActions = [
  { label: "About", query: "Who is Ronit?" },
  { label: "Skills", query: "What technologies does Ronit know?" },
  { label: "Projects", query: "Show me Ronit's projects" },
  { label: "Experience", query: "Tell me about Ronit's experience" },
  { label: "Resume", query: "Show me Ronit's resume" },
  { label: "Contact", query: "How can I contact Ronit?" }
];

export default function RonitAI() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Lock/unlock body scroll when chat opens/closes
  useEffect(() => {
    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Unlock body scroll
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat opens for the first time
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: "ai",
        content: `Hello! I am **${theme.ai.systemName}** 🤖\n\nI can answer questions about Ronit's education, technical skills, projects, internship experience, achievements, and career goals.\n\n**Try asking:**\n• Where is Ronit pursuing engineering?\n• Tell me about CompressX\n• What technologies does Ronit know?\n• Show Ronit's projects\n• How can I contact Ronit?`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, theme.ai.systemName]);

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Generate AI response
    const queryType = matchQuery(text);
    const response = generateResponse(queryType);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "ai",
      content: response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsThinking(false);

    // Handle special commands
    if (queryType === 'resume') {
      setTimeout(() => {
        window.open('/Ronit_Madage_Resume.pdf', '_blank');
      }, 500);
    } else if (queryType === 'contact') {
      setTimeout(() => {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else if (queryType === 'projects') {
      setTimeout(() => {
        document.querySelector('#impact')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else if (queryType === 'skills') {
      setTimeout(() => {
        document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else if (queryType === 'experience') {
      setTimeout(() => {
        document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (content: string) => {
    // Convert markdown-style bold to HTML with theme colors
    let formatted = content
      .replace(/\*\*(.*?)\*\*/g, `<strong class="font-bold" style="color: ${theme.colors.text}">$1</strong>`)
      .replace(/\*(.*?)\*/g, `<em style="color: ${theme.colors.primary}">$1</em>`)
      .replace(/\[(.*?)\]\((.*?)\)/g, `<a href="$2" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-80" style="color: ${theme.colors.primary}">$1</a>`);
    
    return formatted;
  };

  // Get appropriate icon based on theme
  const getAIIcon = () => {
    if (theme.id === 'terminal' || theme.id === 'matrix') {
      return <Terminal className="h-5 w-5" style={{ color: theme.colors.primary }} />;
    }
    return <Sparkles className="h-5 w-5 animate-pulse" style={{ color: theme.colors.primary }} />;
  };

  return (
    <>
      {/* Floating AI Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 group"
          >
            <div className="relative">
              {/* Pulse effect */}
              {theme.effects.glow && (
                <div 
                  className="absolute inset-0 rounded-full opacity-75 blur-lg animate-pulse"
                  style={{
                    background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`
                  }}
                />
              )}
              
              {/* Main button */}
              <div 
                className="relative flex items-center gap-3 rounded-full border backdrop-blur-xl px-6 py-4 transition-all hover:scale-105"
                style={{
                  borderColor: theme.colors.cardBorder,
                  background: theme.colors.cardBackground,
                  boxShadow: theme.effects.glow ? theme.effects.shadow : 'none',
                }}
              >
                {getAIIcon()}
                <span 
                  className="font-mono text-sm font-bold tracking-wider"
                  style={{ 
                    color: theme.colors.text,
                    fontFamily: theme.typography.fontFamily
                  }}
                >
                  {theme.ai.systemName}
                </span>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />

            {/* Chat Panel */}
            <motion.div
              initial={{ opacity: 0, x: 400, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 400, y: 50 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed bottom-6 right-6 z-50 flex h-[600px] w-full max-w-md flex-col overflow-hidden rounded-3xl border backdrop-blur-2xl shadow-2xl"
              style={{
                borderColor: theme.colors.cardBorder,
                background: theme.colors.cardBackground,
                boxShadow: theme.effects.shadow,
              }}
            >
              {/* Header */}
              <div 
                className="relative border-b px-6 py-4"
                style={{
                  borderColor: theme.colors.cardBorder,
                  background: theme.effects.glassmorphism 
                    ? `linear-gradient(to right, ${theme.colors.primary}10, ${theme.colors.secondary}10)`
                    : `${theme.colors.primary}10`,
                }}
              >
                <div 
                  className="absolute inset-0 blur-xl"
                  style={{
                    background: `linear-gradient(to right, ${theme.colors.primary}05, ${theme.colors.secondary}05)`
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {theme.effects.glow && (
                        <div 
                          className="absolute inset-0 rounded-full blur-md opacity-50 animate-pulse"
                          style={{ background: theme.colors.primary }}
                        />
                      )}
                      {getAIIcon()}
                    </div>
                    <div>
                      <h3 
                        className="text-lg font-bold tracking-wider"
                        style={{
                          color: theme.colors.text,
                          fontFamily: theme.typography.fontFamily,
                        }}
                      >
                        {theme.ai.systemName}
                      </h3>
                      <p className="text-xs" style={{ color: theme.colors.textMuted }}>
                        {theme.ai.persona}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg border p-2 transition-all hover:scale-105"
                    style={{
                      borderColor: theme.colors.cardBorder,
                      background: `${theme.colors.cardBackground}80`,
                    }}
                  >
                    <X className="h-4 w-4" style={{ color: theme.colors.textSecondary }} />
                  </button>
                </div>
              </div>

              {/* Messages Area - Scrollable */}
              <div 
                className="chat-messages-scroll flex-1 space-y-4 overflow-y-auto overflow-x-hidden p-6 scroll-smooth" 
                style={{ overscrollBehavior: "contain" }}
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        message.type === 'user' ? '' : 'border'
                      }`}
                      style={{
                        background: message.type === 'user'
                          ? `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`
                          : theme.colors.cardBackground,
                        borderColor: message.type === 'ai' ? theme.colors.cardBorder : 'transparent',
                        color: theme.colors.text,
                      }}
                    >
                      <div
                        className="text-sm leading-relaxed whitespace-pre-line"
                        style={{
                          fontFamily: theme.id === 'terminal' || theme.id === 'matrix' 
                            ? theme.typography.fontFamily 
                            : 'inherit'
                        }}
                        dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                      />
                    </div>
                  </motion.div>
                ))}

                {/* Thinking Indicator */}
                {isThinking && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div 
                      className="flex items-center gap-2 rounded-2xl border px-4 py-3"
                      style={{
                        borderColor: theme.colors.cardBorder,
                        background: theme.colors.cardBackground,
                      }}
                    >
                      <div className="flex gap-1">
                        <div 
                          className="h-2 w-2 rounded-full animate-bounce" 
                          style={{ 
                            background: theme.colors.primary,
                            animationDelay: '0ms' 
                          }} 
                        />
                        <div 
                          className="h-2 w-2 rounded-full animate-bounce" 
                          style={{ 
                            background: theme.colors.primary,
                            animationDelay: '150ms' 
                          }} 
                        />
                        <div 
                          className="h-2 w-2 rounded-full animate-bounce" 
                          style={{ 
                            background: theme.colors.primary,
                            animationDelay: '300ms' 
                          }} 
                        />
                      </div>
                      <span className="text-xs" style={{ color: theme.colors.textMuted }}>
                        {theme.ai.systemName} is thinking...
                      </span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div 
                className="border-t px-4 py-3"
                style={{
                  borderColor: theme.colors.cardBorder,
                  background: `${theme.colors.cardBackground}80`,
                }}
              >
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleQuickAction(action.query)}
                      className="group flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs transition-all hover:scale-105"
                      style={{
                        borderColor: theme.colors.cardBorder,
                        background: theme.colors.cardBackground,
                        color: theme.colors.textSecondary,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = theme.colors.primary;
                        e.currentTarget.style.background = `${theme.colors.primary}10`;
                        e.currentTarget.style.color = theme.colors.primary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = theme.colors.cardBorder;
                        e.currentTarget.style.background = theme.colors.cardBackground;
                        e.currentTarget.style.color = theme.colors.textSecondary;
                      }}
                    >
                      {action.label}
                      <ChevronRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div 
                className="border-t p-4"
                style={{
                  borderColor: theme.colors.cardBorder,
                  background: `${theme.colors.cardBackground}80`,
                }}
              >
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about Ronit..."
                    className="flex-1 rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2"
                    style={{
                      borderColor: theme.colors.cardBorder,
                      background: theme.colors.cardBackground,
                      color: theme.colors.text,
                      fontFamily: theme.id === 'terminal' || theme.id === 'matrix' 
                        ? theme.typography.fontFamily 
                        : 'inherit',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = theme.colors.primary;
                      e.target.style.boxShadow = `0 0 0 2px ${theme.colors.primary}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = theme.colors.cardBorder;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || isThinking}
                    className="rounded-xl p-3 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    style={{
                      background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`,
                    }}
                  >
                    <Send className="h-5 w-5" style={{ color: '#FFFFFF' }} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
