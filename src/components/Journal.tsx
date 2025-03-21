
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, PlusCircle, X, Tag as TagIcon, Save } from 'lucide-react';
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

// Sample journal entries data
const sampleEntries: JournalEntryType[] = [
  {
    id: '1',
    title: 'First day of meditation',
    content: 'Today I started my meditation journey. I found it challenging to sit still for even 5 minutes, but I'm proud of myself for trying. My mind was racing with thoughts about work and upcoming deadlines, but I tried to gently bring my focus back to my breath each time I noticed my mind wandering.\n\nI felt calmer afterward and I think I'll try again tomorrow. Maybe I'll use a guided meditation app to help me get started.',
    date: new Date('2023-07-15'),
    tags: ['meditation', 'beginnings', 'mindfulness'],
    isPrivate: true,
    mood: {
      name: 'Peaceful',
      emoji: '😌',
    },
  },
  {
    id: '2',
    title: 'Reflecting on progress',
    content: 'It's been two weeks of consistent meditation practice. I can now sit for 10 minutes without feeling restless. I've noticed I'm more aware of my emotions throughout the day, and I don't react as quickly to minor annoyances.\n\nI had a difficult conversation with a colleague today that would have usually stressed me out, but I was able to stay calm and listen more effectively. Is this the meditation helping? It feels like I'm developing more space between stimulus and response.',
    date: new Date('2023-07-29'),
    tags: ['progress', 'meditation', 'work'],
    isPrivate: false,
    mood: {
      name: 'Proud',
      emoji: '😊',
    },
  },
];

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntryType[]>(sampleEntries);
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // New entry state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [entryTitle, setEntryTitle] = useState('');
  const [entryContent, setEntryContent] = useState('');
  const [entryTags, setEntryTags] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntryType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract all unique tags from entries
  useState(() => {
    const allTags = entries.flatMap(entry => entry.tags);
    setTags([...new Set(allTags)]);
  });

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
    setIsPrivate(false);
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

  const handleDeleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    toast.success('Entry deleted successfully');
  };

  const handleTogglePrivacy = (id: string, isPrivate: boolean) => {
    setEntries(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, isPrivate } : entry
      )
    );
    toast.success(`Entry is now ${isPrivate ? 'private' : 'public'}`);
  };

  const handleSaveEntry = () => {
    if (!entryTitle.trim() || !entryContent.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Process tags
    const processedTags = entryTags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    // Create new entry object
    const newEntry: JournalEntryType = {
      id: editingEntry ? editingEntry.id : Date.now().toString(),
      title: entryTitle,
      content: entryContent,
      date: editingEntry ? editingEntry.date : new Date(),
      tags: processedTags,
      isPrivate,
      mood: editingEntry?.mood,
    };

    // Simulate API call with timeout
    setTimeout(() => {
      if (editingEntry) {
        // Update existing entry
        setEntries(prev => 
          prev.map(entry => 
            entry.id === editingEntry.id ? newEntry : entry
          )
        );
        toast.success('Entry updated successfully');
      } else {
        // Add new entry
        setEntries(prev => [newEntry, ...prev]);
        toast.success('New entry created successfully');
      }
      
      setIsDialogOpen(false);
      setIsSubmitting(false);
    }, 800);
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

      {filteredEntries.length > 0 ? (
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
