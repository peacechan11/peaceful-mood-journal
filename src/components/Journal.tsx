
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, PlusCircle, X, Tag as TagIcon, Save, Loader2 } from 'lucide-react';
import JournalEntry, { JournalEntryType } from './ui/JournalEntry';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntryType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // New entry state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [entryTitle, setEntryTitle] = useState('');
  const [entryContent, setEntryContent] = useState('');
  const [entryTags, setEntryTags] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [editingEntry, setEditingEntry] = useState<JournalEntryType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchJournalEntries();
    } else {
      setEntries([]);
      setIsLoading(false);
    }
  }, [user]);

  const fetchJournalEntries = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const journalEntries = data.map(entry => ({
        id: entry.id,
        title: entry.title,
        content: entry.content,
        date: new Date(entry.created_at),
        tags: entry.tags || [],
        isPrivate: entry.is_private,
        mood: entry.mood && entry.mood_emoji ? {
          name: entry.mood,
          emoji: entry.mood_emoji,
        } : undefined,
      }));

      setEntries(journalEntries);

      // Extract all unique tags
      const allTags = journalEntries.flatMap(entry => entry.tags);
      setTags([...new Set(allTags)]);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      toast.error('Failed to load journal entries');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = searchTerm === '' || 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => entry.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  const openNewEntryDialog = () => {
    setEditingEntry(null);
    setEntryTitle('');
    setEntryContent('');
    setEntryTags('');
    setIsPrivate(true);
    setIsDialogOpen(true);
  };

  const handleEditEntry = (entry: JournalEntryType) => {
    setEditingEntry(entry);
    setEntryTitle(entry.title);
    setEntryContent(entry.content);
    setEntryTags(entry.tags.join(', '));
    setIsPrivate(entry.isPrivate);
    setIsDialogOpen(true);
  };

  const handleDeleteEntry = async (id: string) => {
    if (!user) {
      toast.error('You must be signed in to delete entries');
      return;
    }

    if (!confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEntries(prev => prev.filter(entry => entry.id !== id));
      toast.success('Entry deleted successfully');
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast.error('Failed to delete entry');
    }
  };

  const handleTogglePrivacy = async (id: string, isPrivate: boolean) => {
    if (!user) {
      toast.error('You must be signed in to update entries');
      return;
    }

    try {
      const { error } = await supabase
        .from('journal_entries')
        .update({ is_private: isPrivate })
        .eq('id', id);

      if (error) throw error;

      setEntries(prev => 
        prev.map(entry => 
          entry.id === id ? { ...entry, isPrivate } : entry
        )
      );
      toast.success(`Entry is now ${isPrivate ? 'private' : 'public'}`);
    } catch (error) {
      console.error('Error updating entry privacy:', error);
      toast.error('Failed to update entry privacy');
    }
  };

  const handleSaveEntry = async () => {
    if (!user) {
      toast.error('You must be signed in to save entries');
      return;
    }

    if (!entryTitle.trim() || !entryContent.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Process tags
      const processedTags = entryTags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      if (editingEntry) {
        // Update existing entry
        const { error } = await supabase
          .from('journal_entries')
          .update({
            title: entryTitle,
            content: entryContent,
            tags: processedTags,
            is_private: isPrivate,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingEntry.id);

        if (error) throw error;

        // Update local state
        setEntries(prev => 
          prev.map(entry => 
            entry.id === editingEntry.id ? {
              ...entry,
              title: entryTitle,
              content: entryContent,
              tags: processedTags,
              isPrivate,
            } : entry
          )
        );
        
        toast.success('Entry updated successfully');
      } else {
        // Create new entry
        const { data, error } = await supabase
          .from('journal_entries')
          .insert({
            user_id: user.id,
            title: entryTitle,
            content: entryContent,
            tags: processedTags,
            is_private: isPrivate,
          })
          .select();

        if (error) throw error;

        if (data && data[0]) {
          // Add new entry to local state
          const newEntry: JournalEntryType = {
            id: data[0].id,
            title: entryTitle,
            content: entryContent,
            date: new Date(),
            tags: processedTags,
            isPrivate,
          };
  
          setEntries(prev => [newEntry, ...prev]);
          
          // Update tags list if new tags were added
          const newTags = processedTags.filter(tag => !tags.includes(tag));
          if (newTags.length > 0) {
            setTags(prev => [...prev, ...newTags]);
          }
        }
        
        toast.success('New entry created successfully');
      }
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving journal entry:', error);
      toast.error('Failed to save entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium">Your Journal</h2>
        <Button 
          onClick={openNewEntryDialog}
          className="bg-peace-500 hover:bg-peace-600"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          New Entry
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-border shadow-sm p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search entries..."
              className="pl-9"
            />
          </div>
          <div className="flex gap-2 flex-wrap md:flex-nowrap">
            {selectedTags.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearFilters}
                className="flex items-center h-10"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {tags.length > 0 && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <TagIcon className="h-4 w-4 text-muted-foreground" />
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagSelect(tag)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-peace-100 text-peace-800 dark:bg-peace-900 dark:text-peace-200'
                    : 'bg-accent hover:bg-peace-50 text-muted-foreground dark:hover:bg-gray-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredEntries.length > 0 ? (
        <motion.div className="space-y-6">
          {filteredEntries.map((entry) => (
            <JournalEntry
              key={entry.id}
              entry={entry}
              onEdit={handleEditEntry}
              onDelete={handleDeleteEntry}
              onTogglePrivacy={handleTogglePrivacy}
            />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12 border border-dashed border-border rounded-xl">
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-accent mb-4">
            <PlusCircle className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No entries found</h3>
          <p className="text-muted-foreground mt-1 max-w-sm mx-auto">
            {searchTerm || selectedTags.length > 0
              ? "Try adjusting your search or filters to find what you're looking for."
              : "Start your journaling journey by creating your first entry."}
          </p>
          {searchTerm || selectedTags.length > 0 ? (
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="mt-4"
            >
              Clear Filters
            </Button>
          ) : (
            <Button 
              onClick={openNewEntryDialog}
              className="mt-4 bg-peace-500 hover:bg-peace-600"
            >
              Create Entry
            </Button>
          )}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingEntry ? 'Edit Entry' : 'New Journal Entry'}</DialogTitle>
            <DialogDescription>
              {editingEntry 
                ? 'Update your journal entry below.'
                : 'Express your thoughts, feelings, and experiences.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                value={entryTitle}
                onChange={(e) => setEntryTitle(e.target.value)}
                placeholder="Give your entry a title"
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
                Content <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="content"
                value={entryContent}
                onChange={(e) => setEntryContent(e.target.value)}
                placeholder="What's on your mind?"
                rows={8}
                className="resize-none"
              />
            </div>
            
            <div>
              <label htmlFor="tags" className="block text-sm font-medium mb-1">
                Tags (comma separated)
              </label>
              <Input
                id="tags"
                value={entryTags}
                onChange={(e) => setEntryTags(e.target.value)}
                placeholder="mindfulness, gratitude, goals"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                id="private"
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="rounded border-gray-300 text-peace-600 focus:ring-peace-500"
              />
              <label htmlFor="private" className="text-sm font-medium">
                Make this entry private
              </label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveEntry} 
              disabled={isSubmitting}
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Journal;
