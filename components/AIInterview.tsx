"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, MicOff, Volume2, VolumeX, RotateCcw, StopCircle, Send } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { matchQuery, generateResponse } from '@/lib/aiKnowledgeBase';

interface Message {
  id: string;
  type: 'interviewer' | 'ronit';
  content: string;
  timestamp: Date;
}

interface AIInterviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIInterview({ isOpen, onClose }: AIInterviewProps) {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'ronit',
        content: "Hello! I'm Ronit's AI Digital Twin. I can answer any questions about my education, projects, technical skills, internship experience, achievements, and career goals. Feel free to ask me anything as if you're interviewing me directly!",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      
      // Speak welcome if not muted
      if (!isMuted) {
        speakText(welcomeMessage.content);
      }
    }
  }, [isOpen]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
          // Auto-submit after speech
          handleSendMessage(transcript);
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      stopSpeaking();
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;

    // Stop any ongoing speech
    stopSpeaking();

    // Remove markdown formatting for speech
    const cleanText = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
      .replace(/[#•]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const replaySpeech = () => {
    if (messages.length > 0) {
      const lastRonitMessage = [...messages].reverse().find(m => m.type === 'ronit');
      if (lastRonitMessage) {
        speakText(lastRonitMessage.content);
      }
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text) return;

    // Add interviewer message
    const interviewerMessage: Message = {
      id: Date.now().toString(),
      type: 'interviewer',
      content: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, interviewerMessage]);
    setInput('');
    setIsThinking(true);

    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate response (first-person perspective)
    const queryType = matchQuery(text);
    let response = generateResponse(queryType);
    
    // Convert to first-person
    response = response
      .replace(/Ronit Madage/g, 'I')
      .replace(/Ronit/g, 'I')
      .replace(/his /g, 'my ')
      .replace(/His /g, 'My ')
      .replace(/he /g, 'I ')
      .replace(/He /g, 'I ')
      .replace(/him/g, 'me')
      .replace(/\bI is\b/g, 'I am')
      .replace(/\bI has\b/g, 'I have');

    const ronitMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ronit',
      content: response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, ronitMessage]);
    setIsThinking(false);

    // Speak response if not muted
    if (!isMuted) {
      speakText(response);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (content: string) => {
    let formatted = content
      .replace(/\*\*(.*?)\*\*/g, `<strong class="font-bold" style="color: ${theme.colors.text}">$1</strong>`)
      .replace(/\*(.*?)\*/g, `<em style="color: ${theme.colors.primary}">$1</em>`)
      .replace(/\[(.*?)\]\((.*?)\)/g, `<a href="$2" target="_blank" rel="noopener noreferrer" class="underline" style="color: ${theme.colors.primary}">$1</a>`);
    return formatted;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-[90] flex flex-col overflow-hidden rounded-3xl border shadow-2xl"
            style={{
              borderColor: theme.colors.cardBorder,
              background: theme.colors.background,
            }}
          >
            {/* Header */}
            <div 
              className="relative border-b px-6 py-5"
              style={{
                borderColor: theme.colors.cardBorder,
                background: `linear-gradient(to right, ${theme.colors.primary}15, ${theme.colors.secondary}15)`,
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                    🎤 RONIT DIGITAL TWIN
                  </h2>
                  <p className="mt-1 text-sm" style={{ color: theme.colors.textMuted }}>
                    Talk directly with Ronit's AI Twin
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {/* Voice Controls */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="rounded-lg border p-2 transition-all hover:scale-105"
                    style={{
                      borderColor: theme.colors.cardBorder,
                      background: theme.colors.cardBackground,
                      color: isMuted ? theme.colors.textMuted : theme.colors.primary,
                    }}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>

                  {isSpeaking && (
                    <button
                      onClick={stopSpeaking}
                      className="rounded-lg border p-2 transition-all hover:scale-105"
                      style={{
                        borderColor: theme.colors.cardBorder,
                        background: theme.colors.cardBackground,
                        color: theme.colors.accent,
                      }}
                      title="Stop Speaking"
                    >
                      <StopCircle className="h-5 w-5" />
                    </button>
                  )}

                  <button
                    onClick={replaySpeech}
                    disabled={messages.length <= 1}
                    className="rounded-lg border p-2 transition-all hover:scale-105 disabled:opacity-30"
                    style={{
                      borderColor: theme.colors.cardBorder,
                      background: theme.colors.cardBackground,
                      color: theme.colors.primary,
                    }}
                    title="Replay Last Response"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>

                  <button
                    onClick={onClose}
                    className="rounded-lg border p-2 transition-all hover:scale-105"
                    style={{
                      borderColor: theme.colors.cardBorder,
                      background: theme.colors.cardBackground,
                      color: theme.colors.textSecondary,
                    }}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="chat-messages-scroll flex-1 space-y-4 overflow-y-auto p-6" style={{ overscrollBehavior: 'contain' }}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex ${message.type === 'interviewer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex max-w-[80%] items-start gap-3">
                    {message.type === 'ronit' && (
                      <div 
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg font-bold"
                        style={{
                          borderColor: theme.colors.primary,
                          background: `${theme.colors.primary}20`,
                          color: theme.colors.primary,
                        }}
                      >
                        R
                      </div>
                    )}
                    <div
                      className="rounded-2xl px-5 py-4"
                      style={{
                        background: message.type === 'interviewer'
                          ? `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`
                          : theme.colors.cardBackground,
                        borderColor: message.type === 'ronit' ? theme.colors.cardBorder : 'transparent',
                        border: message.type === 'ronit' ? '1px solid' : 'none',
                        color: theme.colors.text,
                      }}
                    >
                      <div
                        className="text-sm leading-relaxed whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Thinking Indicator */}
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg font-bold"
                      style={{
                        borderColor: theme.colors.primary,
                        background: `${theme.colors.primary}20`,
                        color: theme.colors.primary,
                      }}
                    >
                      R
                    </div>
                    <div 
                      className="flex items-center gap-2 rounded-2xl border px-5 py-4"
                      style={{
                        borderColor: theme.colors.cardBorder,
                        background: theme.colors.cardBackground,
                      }}
                    >
                      <div className="flex gap-1">
                        <div className="h-2 w-2 animate-bounce rounded-full" style={{ background: theme.colors.primary, animationDelay: '0ms' }} />
                        <div className="h-2 w-2 animate-bounce rounded-full" style={{ background: theme.colors.primary, animationDelay: '150ms' }} />
                        <div className="h-2 w-2 animate-bounce rounded-full" style={{ background: theme.colors.primary, animationDelay: '300ms' }} />
                      </div>
                      <span className="text-xs" style={{ color: theme.colors.textMuted }}>
                        Thinking...
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Listening Indicator */}
              {isListening && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-center"
                >
                  <div 
                    className="flex items-center gap-3 rounded-full border px-6 py-3"
                    style={{
                      borderColor: theme.colors.primary,
                      background: `${theme.colors.primary}10`,
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Mic className="h-5 w-5" style={{ color: theme.colors.primary }} />
                    </motion.div>
                    <span className="text-sm font-medium" style={{ color: theme.colors.primary }}>
                      Listening...
                    </span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div 
              className="border-t p-6"
              style={{
                borderColor: theme.colors.cardBorder,
                background: theme.colors.cardBackground,
              }}
            >
              <div className="flex gap-3">
                {/* Voice Input Button */}
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isThinking}
                  className="rounded-xl p-4 transition-all hover:scale-105 disabled:opacity-50"
                  style={{
                    background: isListening 
                      ? `linear-gradient(to right, ${theme.colors.accent}, ${theme.colors.secondary})`
                      : `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`,
                  }}
                >
                  {isListening ? (
                    <MicOff className="h-5 w-5 text-white" />
                  ) : (
                    <Mic className="h-5 w-5 text-white" />
                  )}
                </button>

                {/* Text Input */}
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  disabled={isListening || isThinking}
                  className="flex-1 rounded-xl border px-5 py-4 text-sm focus:outline-none focus:ring-2 disabled:opacity-50"
                  style={{
                    borderColor: theme.colors.cardBorder,
                    background: theme.colors.background,
                    color: theme.colors.text,
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

                {/* Send Button */}
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isThinking || isListening}
                  className="rounded-xl p-4 transition-all hover:scale-105 disabled:opacity-50"
                  style={{
                    background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`,
                  }}
                >
                  <Send className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Suggested Questions */}
              <div className="mt-4 flex flex-wrap gap-2">
                {['Tell me about yourself', 'What projects have you built?', 'What are your skills?', 'Why hire you?'].map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSendMessage(question)}
                    disabled={isThinking || isListening}
                    className="rounded-lg border px-3 py-1.5 text-xs transition-all hover:scale-105 disabled:opacity-50"
                    style={{
                      borderColor: theme.colors.cardBorder,
                      background: theme.colors.background,
                      color: theme.colors.textSecondary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = theme.colors.primary;
                      e.currentTarget.style.color = theme.colors.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = theme.colors.cardBorder;
                      e.currentTarget.style.color = theme.colors.textSecondary;
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
