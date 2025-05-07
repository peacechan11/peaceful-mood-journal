import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Maximize2, Minimize2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { getAIResponse, getFallbackResponse } from '@/utils/aiService';

// Define types for messages
type MessageRole = 'user' | 'assistant';

interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm PeaceSync's AI assistant. How can I help with your mental wellbeing today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [useAI, setUseAI] = useState(true);
  const [consecutiveErrors, setConsecutiveErrors] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus textarea when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Reset AI mode after cooldown period
  useEffect(() => {
    if (!useAI) {
      const timer = setTimeout(() => {
        setUseAI(true);
        setConsecutiveErrors(0);
      }, 60000); // 1 minute cooldown before trying AI again
      
      return () => clearTimeout(timer);
    }
  }, [useAI]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    try {
      // Get AI response with fallback to predefined responses
      let responseContent;
      
      if (useAI && consecutiveErrors < 2) {
        try {
          // Attempt to get a response from the AI service
          responseContent = await getAIResponse(userMessage.content);
          
          // If we got an empty response, use fallback
          if (!responseContent || responseContent.trim() === '') {
            throw new Error('Empty response from AI service');
          }
          
          // Reset consecutive errors since we got a successful response
          setConsecutiveErrors(0);
        } catch (error) {
          console.warn('AI service failed, using fallback response', error);
          
          // Increment consecutive errors
          setConsecutiveErrors(prev => prev + 1);
          
          // Use fallback response
          responseContent = getFallbackResponse(userMessage.content);
          
          // If we've had multiple consecutive errors, switch to fallback mode
          if (consecutiveErrors >= 1) {
            setUseAI(false);
          }
        }
      } else {
        // Use fallback responses directly
        responseContent = getFallbackResponse(userMessage.content);
      }

      // Simulate a small delay for a more natural conversation flow
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: responseContent,
          role: 'assistant',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 600 + Math.random() * 400); // Slight random delay for natural feel
      
    } catch (error) {
      console.error('Error in chat processing:', error);
      
      // Add an error message if something goes wrong
      setTimeout(() => {
        const errorResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: "I'm sorry, I'm having trouble responding right now. Please try again later.",
          role: 'assistant',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, errorResponse]);
        setIsTyping(false);
      }, 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsMinimized(true);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    toast("Support chat minimized. Click the chat icon to reopen.");
  };

  return (
    <>
      {/* Chat bubble button */}
      {!isOpen && (
        <motion.div
          className="fixed right-4 bottom-4 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={toggleChat}
            className="h-14 w-14 rounded-full bg-peace-500 hover:bg-peace-600 shadow-lg"
          >
            <MessageSquare className="h-6 w-6 text-white" />
          </Button>
        </motion.div>
      )}

      {/* Chat interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-4 bottom-4 z-50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className={`shadow-lg border-peace-200 overflow-hidden flex flex-col ${
              isMinimized ? 'w-64 h-16' : 'w-80 sm:w-96 h-[30rem]'
            }`}>
              {/* Chat header */}
              <div className="bg-peace-500 text-white p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-white/20">
                    <MessageSquare className="h-4 w-4" />
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-sm">PeaceSync Assistant</h3>
                    <p className="text-xs text-white/70">AI Support</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-white hover:text-white hover:bg-white/10 rounded-full"
                    onClick={toggleChat}
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-white hover:text-white hover:bg-white/10 rounded-full"
                    onClick={closeChat}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Chat body (only visible when not minimized) */}
              {!isMinimized && (
                <>
                  <div className="flex-1 p-4 overflow-y-auto bg-white dark:bg-gray-950">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`mb-4 flex ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === 'user'
                              ? 'bg-peace-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-foreground'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {new Intl.DateTimeFormat('en-US', {
                              hour: 'numeric',
                              minute: 'numeric',
                            }).format(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="mb-4 flex justify-start">
                        <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 dark:bg-gray-800">
                          <div className="flex space-x-1 items-center">
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Chat input */}
                  <div className="p-3 border-t border-border bg-background">
                    <div className="flex gap-2">
                      <Textarea
                        ref={textareaRef}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        className="min-h-10 max-h-32 resize-none"
                        disabled={isTyping}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || isTyping}
                        className="h-10 bg-peace-500 hover:bg-peace-600 text-white"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-center mt-2 text-muted-foreground">
                      This is an AI assistant. For emergencies, please contact professional help.
                    </p>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
