
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export type Mood = {
  id: number;
  name: string;
  emoji: string;
  color: string;
};

const moods: Mood[] = [
  { id: 1, name: 'Ecstatic', emoji: '😁', color: 'bg-emerald-500' },
  { id: 2, name: 'Happy', emoji: '😊', color: 'bg-green-500' },
  { id: 3, name: 'Content', emoji: '🙂', color: 'bg-lime-500' },
  { id: 4, name: 'Neutral', emoji: '😐', color: 'bg-yellow-500' },
  { id: 5, name: 'Down', emoji: '🙁', color: 'bg-amber-500' },
  { id: 6, name: 'Sad', emoji: '😔', color: 'bg-orange-500' },
  { id: 7, name: 'Upset', emoji: '😢', color: 'bg-red-500' },
];

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
  initialMood?: Mood | null;
  className?: string;
}

const MoodSelector = ({
  onMoodSelect,
  initialMood = null,
  className,
}: MoodSelectorProps) => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(initialMood);
  const [hoverMood, setHoverMood] = useState<Mood | null>(null);

  useEffect(() => {
    if (initialMood) {
      setSelectedMood(initialMood);
    }
  }, [initialMood]);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    onMoodSelect(mood);
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="flex flex-col items-center mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMood?.id || 'empty'}
            className="relative h-24 w-24 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {selectedMood ? (
              <>
                <motion.div
                  className={`absolute inset-0 rounded-full ${selectedMood.color} opacity-20`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="text-6xl">{selectedMood.emoji}</span>
              </>
            ) : (
              <div className="text-center text-muted-foreground">
                <div className="text-5xl mb-2">🤔</div>
                <p className="text-sm">How are you feeling?</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-center"
          >
            <span className="text-xl font-medium">{selectedMood.name}</span>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-7 gap-2 md:gap-4">
        {moods.map((mood) => (
          <motion.button
            key={mood.id}
            className={cn(
              "relative rounded-full aspect-square flex flex-col items-center justify-center transition-all duration-300",
              selectedMood?.id === mood.id
                ? `${mood.color} text-white ring-2 ring-offset-2 ring-${mood.color}`
                : 'bg-background hover:bg-accent border border-border'
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoverMood(mood)}
            onMouseLeave={() => setHoverMood(null)}
            onClick={() => handleMoodSelect(mood)}
          >
            <span className="text-2xl">{mood.emoji}</span>
            {hoverMood?.id === mood.id && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-background border border-border px-2 py-1 rounded-md shadow-sm z-10 whitespace-nowrap">
                {mood.name}
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
