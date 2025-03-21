
import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Edit, Trash2, Lock, Unlock, Calendar, Tag as TagIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface JournalEntryType {
  id: string;
  title: string;
  content: string;
  date: Date;
  tags: string[];
  isPrivate: boolean;
  mood?: {
    name: string;
    emoji: string;
  };
}

interface JournalEntryProps {
  entry: JournalEntryType;
  onEdit?: (entry: JournalEntryType) => void;
  onDelete?: (id: string) => void;
  onTogglePrivacy?: (id: string, isPrivate: boolean) => void;
  className?: string;
}

const JournalEntry = ({
  entry,
  onEdit,
  onDelete,
  onTogglePrivacy,
  className,
}: JournalEntryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEdit = () => {
    if (onEdit) onEdit(entry);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(entry.id);
  };

  const handleTogglePrivacy = () => {
    if (onTogglePrivacy) onTogglePrivacy(entry.id, !entry.isPrivate);
  };

  const variants = {
    collapsed: { height: '8rem' },
    expanded: { height: 'auto' },
  };

  return (
    <motion.div
      className={cn(
        'bg-white dark:bg-gray-900 rounded-xl border border-border shadow-sm overflow-hidden',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-lg">{entry.title}</h3>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <button
              onClick={handleTogglePrivacy}
              className="p-1.5 rounded-full hover:bg-accent transition-colors"
              aria-label={entry.isPrivate ? 'Make public' : 'Make private'}
            >
              {entry.isPrivate ? (
                <Lock className="h-4 w-4" />
              ) : (
                <Unlock className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={handleEdit}
              className="p-1.5 rounded-full hover:bg-accent transition-colors"
              aria-label="Edit entry"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-full hover:bg-accent transition-colors"
              aria-label="Delete entry"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          <span>{format(new Date(entry.date), 'MMM d, yyyy')}</span>
          
          {entry.mood && (
            <div className="ml-3 flex items-center">
              <span className="mr-1.5">{entry.mood.emoji}</span>
              <span>{entry.mood.name}</span>
            </div>
          )}
        </div>
        
        <motion.div
          className="mt-3 text-muted-foreground relative overflow-hidden"
          variants={variants}
          initial={isExpanded ? 'expanded' : 'collapsed'}
          animate={isExpanded ? 'expanded' : 'collapsed'}
          transition={{ duration: 0.3 }}
        >
          <div className="whitespace-pre-line">{entry.content}</div>
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
          )}
        </motion.div>
        
        <button
          onClick={toggleExpand}
          className="mt-2 text-sm text-peace-600 hover:text-peace-700 font-medium"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
        
        {entry.tags.length > 0 && (
          <div className="mt-4 flex items-center flex-wrap gap-2">
            <TagIcon className="h-3.5 w-3.5 text-muted-foreground" />
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs py-1 px-2 bg-accent rounded-full text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default JournalEntry;
