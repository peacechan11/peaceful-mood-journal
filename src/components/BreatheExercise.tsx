
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './ui/button';

const BreatheExercise = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBreathing, setIsBreathing] = useState(false);
  
  const toggleExercise = () => {
    setIsOpen(!isOpen);
    setIsBreathing(false);
  };

  const startBreathing = () => {
    setIsBreathing(true);
  };

  const stopBreathing = () => {
    setIsBreathing(false);
  };

  return (
    <>
      <button 
        onClick={toggleExercise}
        className="fixed bottom-20 right-4 z-40 bg-peace-100 text-peace-800 dark:bg-peace-900 dark:text-peace-200 p-2 rounded-full shadow-peace hover:shadow-glow transition-all duration-300"
        aria-label="Breathing exercise"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="animate-pulse-soft"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
          <path d="M12 6v12"></path>
          <path d="M6 12h12"></path>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-medium peaceful-text-gradient">Breathing Exercise</h2>
                  <button 
                    onClick={toggleExercise}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label="Close"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Take a moment to breathe. Follow the circle's rhythm - inhale as it expands, exhale as it contracts.
                </p>
                
                <div className="relative flex items-center justify-center py-12">
                  <motion.div
                    animate={{
                      scale: isBreathing ? [1, 1.5, 1.5, 1] : 1,
                    }}
                    transition={{
                      duration: 8,
                      times: [0, 0.25, 0.75, 1],
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-peace-200 to-serenity-200 dark:from-peace-800 dark:to-serenity-800"
                  />
                  
                  <motion.div
                    animate={{
                      opacity: isBreathing ? [1, 0.7, 0.7, 1] : 1,
                    }}
                    transition={{
                      duration: 8,
                      times: [0, 0.25, 0.75, 1],
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                    className="absolute inset-0 flex items-center justify-center text-peace-800 dark:text-peace-200 font-medium"
                  >
                    {isBreathing ? "" : "Start"}
                  </motion.div>
                </div>
                
                <div className="text-center mt-6">
                  {!isBreathing ? (
                    <Button 
                      onClick={startBreathing} 
                      className="bg-peace-500 hover:bg-peace-600 text-white"
                    >
                      Begin Breathing
                    </Button>
                  ) : (
                    <Button 
                      onClick={stopBreathing}
                      variant="outline"
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="p-4 bg-peace-50 dark:bg-peace-900/40 border-t border-peace-100 dark:border-peace-800">
                <p className="text-sm text-peace-700 dark:text-peace-300">
                  Regular deep breathing exercises can help reduce anxiety, lower stress levels, and promote a sense of calm.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BreatheExercise;
