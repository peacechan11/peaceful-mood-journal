
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, PlusCircle, Save, Loader2 } from 'lucide-react';
import MoodSelector, { Mood } from './ui/MoodSelector';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface MoodEntry {
  id: string;
  mood: Mood;
  date: Date;
  notes: string;
}

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [notes, setNotes] = useState('');
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchMoodEntries();
    } else {
      setEntries([]);
      setIsLoading(false);
    }
  }, [user]);

  const fetchMoodEntries = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      const moodEntries = data.map(entry => ({
        id: entry.id,
        mood: {
          id: 0, // We'll match this by name and emoji instead
          name: entry.mood,
          emoji: entry.emoji,
          color: entry.color,
        },
        date: new Date(entry.created_at),
        notes: entry.notes || '',
      }));

      setEntries(moodEntries);
    } catch (error) {
      console.error('Error fetching mood entries:', error);
      toast.error('Failed to load mood entries');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('You must be signed in to save your mood');
      return;
    }

    if (!selectedMood) {
      toast.error('Please select a mood.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .insert({
          user_id: user.id,
          mood: selectedMood.name,
          emoji: selectedMood.emoji,
          color: selectedMood.color,
          notes: notes.trim(),
        })
        .select();

      if (error) throw error;

      if (data && data[0]) {
        const newEntry: MoodEntry = {
          id: data[0].id,
          mood: selectedMood,
          date: new Date(),
          notes: notes.trim(),
        };

        setEntries([newEntry, ...entries]);
      }

      setSelectedMood(null);
      setNotes('');
      toast.success('Mood saved successfully!');
    } catch (error) {
      console.error('Error saving mood entry:', error);
      toast.error('Failed to save your mood');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-border p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium">Today's Mood</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{format(new Date(), 'EEEE, MMMM d, yyyy')}</span>
              <Clock className="h-4 w-4 ml-3 mr-1" />
              <span>{format(new Date(), 'h:mm a')}</span>
            </div>
          </div>
        </div>

        <MoodSelector onMoodSelect={handleMoodSelect} initialMood={selectedMood} />

        <div className="mt-8">
          <label htmlFor="notes" className="block text-sm font-medium mb-2">
            Notes (Optional)
          </label>
          <Textarea
            id="notes"
            placeholder="How are you feeling today? What's on your mind?"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full resize-none focus-visible:ring-peace-500"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button 
            onClick={handleSave} 
            disabled={!selectedMood || isSubmitting}
            className="bg-peace-500 hover:bg-peace-600"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-20 border-t-white rounded-full" />
                Saving...
              </div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Entry
              </>
            )}
          </Button>
        </div>
      </motion.div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Recent Entries</h3>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : entries.length > 0 ? (
          <div className="space-y-4">
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-border p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start">
                  <div className={`${entry.mood.color} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-2xl">{entry.mood.emoji}</span>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h4 className="font-medium">{entry.mood.name}</h4>
                      <span className="text-sm text-muted-foreground">
                        {format(entry.date, 'MMM d, yyyy • h:mm a')}
                      </span>
                    </div>
                    {entry.notes && (
                      <p className="mt-2 text-muted-foreground">{entry.notes}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-border rounded-xl">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-accent mb-4">
              <PlusCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No entries yet</h3>
            <p className="text-muted-foreground mt-1 max-w-sm mx-auto">
              Track your first mood by selecting an emoji above and saving your entry.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;
