
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Maximize2, Minimize2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

// Define types for messages
type MessageRole = 'user' | 'assistant';

interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}

// Predefined responses for the chatbot
const responses = {
  greeting: [
    "Hello! I'm PeaceSync's AI assistant. How can I help with your mental wellbeing today?",
    "Hi there! I'm here to support your mental health journey. What's on your mind?",
    "Welcome to PeaceSync! I'm your AI wellbeing companion. How are you feeling today?"
  ],
  anxiety: [
    "I understand anxiety can be challenging. Try taking slow, deep breaths for 2 minutes. Inhale for 4 counts, hold for 4, exhale for 6.",
    "When you're feeling anxious, grounding techniques can help. Try naming 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
    "Anxiety often involves worrying about the future. Try focusing on the present moment by paying attention to your immediate surroundings and sensations."
  ],
  depression: [
    "I'm sorry you're feeling down. Remember that small steps matter - try to do one tiny enjoyable activity today, even something as simple as stepping outside for 5 minutes.",
    "Depression can make everything feel difficult. Be gentle with yourself and acknowledge your feelings without judgment. Would you like to try a simple mood-boosting exercise?",
    "When feeling depressed, our thoughts often become negative. Try challenging these thoughts by asking: 'Is there another way to look at this situation?'"
  ],
  sleep: [
    "For better sleep, try establishing a consistent bedtime routine. Avoid screens an hour before bed, and keep your bedroom cool, dark, and quiet.",
    "If racing thoughts keep you awake, try the 4-7-8 breathing technique: inhale for 4 seconds, hold for 7, exhale for 8. This can help calm your mind.",
    "Consider writing down your worries before bed to 'transfer' them out of your mind and onto paper, which can help quiet your thoughts."
  ],
  meditation: [
    "To start meditation, try sitting comfortably for just 2 minutes. Focus on your breath, and when your mind wanders, gently bring attention back to breathing.",
    "Body scan meditation can help with awareness. Starting at your toes, slowly bring attention to each part of your body, noticing sensations without judgment.",
    "For beginners, guided meditations can be helpful. There are many free resources available online or through meditation apps."
  ],
  gratitude: [
    "Practicing gratitude can significantly improve mental wellbeing. Try writing down 3 things you're grateful for each day, no matter how small.",
    "To deepen your gratitude practice, try to be specific about why you're grateful for something, and how it affects your life.",
    "Research shows that expressing gratitude to others can strengthen relationships and boost happiness. Consider sending a thank-you message to someone today."
  ],
  default: [
    "I'm here to support you on your mental health journey. Would you like some tips on stress management, mindfulness, or sleep improvement?",
    "Thank you for sharing. While I'm an AI and not a replacement for professional help, I can offer some general wellness suggestions. What area would you like to focus on?",
    "I'm designed to offer mental wellbeing support. For more personalized advice, consider connecting with a mental health professional. How else can I assist you today?"
  ],
  help: [
    "I can help with topics like anxiety, depression, sleep, meditation, gratitude, and general mental wellbeing. What would you like to know more about?",
    "You can ask me for coping strategies, wellness tips, or information about mental health practices. How can I support you today?",
    "I'm here to provide information and suggestions for mental wellbeing. Just let me know what you're interested in or struggling with."
  ]
};

// Helper function to get appropriate response based on message content
const getResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
  } else if (lowerMessage.includes('anxiety') || lowerMessage.includes('anxious') || lowerMessage.includes('worry')) {
    return responses.anxiety[Math.floor(Math.random() * responses.anxiety.length)];
  } else if (lowerMessage.includes('depress') || lowerMessage.includes('sad') || lowerMessage.includes('down')) {
    return responses.depression[Math.floor(Math.random() * responses.depression.length)];
  } else if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) {
    return responses.sleep[Math.floor(Math.random() * responses.sleep.length)];
  } else if (lowerMessage.includes('meditat') || lowerMessage.includes('mindful')) {
    return responses.meditation[Math.floor(Math.random() * responses.meditation.length)];
  } else if (lowerMessage.includes('gratitude') || lowerMessage.includes('thankful') || lowerMessage.includes('grateful')) {
    return responses.gratitude[Math.floor(Math.random() * responses.gratitude.length)];
  } else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
    return responses.help[Math.floor(Math.random() * responses.help.length)];
  } else {
    return responses.default[Math.floor(Math.random() * responses.default.length)];
  }
};

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

  const handleSendMessage = () => {
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

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getResponse(userMessage.content),
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
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
