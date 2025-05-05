
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { MessageCircle, Heart, Share2, Calendar, User, Tag as TagIcon, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface BlogPostType {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  date: Date;
  tags: string[];
  likes: number;
  comments: number;
  image?: string;
  authorId?: string;
  status?: 'pending' | 'approved' | 'rejected';
}

interface BlogPostProps {
  post: BlogPostType;
  className?: string;
  isExpanded?: boolean;
  onEdit?: (post: BlogPostType) => void;
  onDelete?: (postId: string) => void;
}

const BlogPost = ({ post, className, isExpanded = false, onEdit, onDelete }: BlogPostProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isFullView, setIsFullView] = useState(isExpanded);

  const toggleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleShare = () => {
    // In a real app, this would implement sharing functionality
    alert(`Sharing post: ${post.title}`);
  };

  const handleEdit = () => {
    if (onEdit) onEdit(post);
    else alert(`Edit post: ${post.title}`);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(post.id);
    else alert(`Delete post: ${post.title}`);
  };

  return (
    <motion.article
      className={cn(
        'bg-white dark:bg-gray-900 rounded-xl border border-border shadow-sm overflow-hidden',
        post.status === 'pending' && 'border-amber-300',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      {post.status === 'pending' && (
        <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 px-6 py-2 text-sm font-medium flex items-center">
          <span>This post is pending review by a moderator</span>
        </div>
      )}
      
      {post.image && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <User className="h-3.5 w-3.5 mr-1" />
            <span className="font-medium text-foreground">{post.author.name}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
          </div>
        </div>
        
        <h2 className="text-xl md:text-2xl font-medium mb-3">{post.title}</h2>
        
        <div className="text-muted-foreground">
          {isFullView ? (
            <div className="whitespace-pre-line">{post.content}</div>
          ) : (
            <div>{post.excerpt}</div>
          )}
        </div>
        
        {!isFullView && (
          <button
            onClick={() => setIsFullView(true)}
            className="mt-2 text-sm text-peace-600 hover:text-peace-700 font-medium"
          >
            Read more
          </button>
        )}
        
        {post.tags.length > 0 && (
          <div className="mt-4 flex items-center flex-wrap gap-2">
            <TagIcon className="h-3.5 w-3.5 text-muted-foreground" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs py-1 px-2 bg-accent rounded-full text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLike}
              className={`flex items-center space-x-1 text-sm ${
                liked ? 'text-red-500' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-red-500' : ''}`} />
              <span>{likeCount}</span>
            </button>
            
            <button
              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments}</span>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {onEdit && (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleEdit} 
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleDelete} 
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
            <button
              onClick={handleShare}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogPost;
