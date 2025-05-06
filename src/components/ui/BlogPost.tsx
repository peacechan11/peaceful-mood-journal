
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { MessageCircle, Heart, Share2, Calendar, User, Tag as TagIcon, Edit, Trash2, Link, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';

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
  hasReacted?: boolean;
}

interface ReactorType {
  username: string;
  reaction_type: string;
}

interface BlogPostProps {
  post: BlogPostType;
  className?: string;
  isExpanded?: boolean;
  onEdit?: (post: BlogPostType) => void;
  onDelete?: (postId: string) => void;
  onReaction?: (postId: string, hasReacted: boolean) => Promise<void>;
  onCommentClick?: (postId: string) => void;
  isLoggedIn?: boolean;
}

const BlogPost = ({ 
  post, 
  className, 
  isExpanded = false, 
  onEdit, 
  onDelete,
  onReaction,
  onCommentClick,
  isLoggedIn = false
}: BlogPostProps) => {
  const [liked, setLiked] = useState(post.hasReacted || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isFullView, setIsFullView] = useState(isExpanded);
  const [copied, setCopied] = useState(false);
  const [reactors, setReactors] = useState<ReactorType[]>([]);
  const [loadingReactors, setLoadingReactors] = useState(false);
  
  const { userRole } = useAuth();
  const isModerator = userRole === 'moderator';

  const fetchReactors = async () => {
    setLoadingReactors(true);
    try {
      const { data, error } = await supabase
        .from('reactions_with_users')
        .select('username, reaction_type')
        .eq('post_id', post.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setReactors(data || []);
    } catch (error) {
      console.error('Error fetching reactors:', error);
    } finally {
      setLoadingReactors(false);
    }
  };

  const handleReaction = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like posts",
        variant: "destructive"
      });
      return;
    }
    
    if (onReaction) {
      try {
        await onReaction(post.id, !liked);
        if (liked) {
          setLikeCount(prev => prev - 1);
        } else {
          setLikeCount(prev => prev + 1);
        }
        setLiked(!liked);
      } catch (error) {
        console.error('Error handling reaction:', error);
        toast({
          title: "Error",
          description: "Failed to process your reaction",
          variant: "destructive"
        });
      }
    } else {
      if (liked) {
        setLikeCount(prev => prev - 1);
      } else {
        setLikeCount(prev => prev + 1);
      }
      setLiked(!liked);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/blog/${post.id}`;
    
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Post link has been copied to clipboard"
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast({
        title: "Copy failed",
        description: "Could not copy link to clipboard",
        variant: "destructive"
      });
    }
  };

  const handleEdit = () => {
    if (onEdit) onEdit(post);
    else alert(`Edit post: ${post.title}`);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(post.id);
    else alert(`Delete post: ${post.title}`);
  };

  const handleCommentClick = () => {
    if (onCommentClick) {
      onCommentClick(post.id);
    }
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
        
        {!isFullView && !isExpanded && (
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
              onClick={handleReaction}
              className={`flex items-center space-x-1 text-sm ${
                liked ? 'text-red-500' : 'text-muted-foreground hover:text-foreground'
              }`}
              disabled={!isLoggedIn}
              aria-label={liked ? "Unlike post" : "Like post"}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-red-500' : ''}`} />
              {likeCount > 0 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <span 
                      className="cursor-pointer hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        fetchReactors();
                      }}
                    >{likeCount}</span>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2">
                    <h4 className="font-medium mb-2">People who reacted</h4>
                    {loadingReactors ? (
                      <div className="text-center py-2 text-sm text-muted-foreground">
                        Loading...
                      </div>
                    ) : reactors.length > 0 ? (
                      <div className="max-h-48 overflow-y-auto">
                        {reactors.map((reactor, index) => (
                          <div 
                            key={index} 
                            className="py-1 px-1 text-sm flex items-center"
                          >
                            <User className="h-3 w-3 mr-2 text-muted-foreground" />
                            <span>{reactor.username}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-2 text-sm text-muted-foreground">
                        No reactions yet
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              )}
            </button>
            
            <button
              onClick={handleCommentClick}
              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments}</span>
            </button>
            
            <button
              onClick={handleShare}
              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground"
              aria-label="Share post"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Share2 className="h-4 w-4" />
              )}
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {(onEdit && (post.authorId === useAuth().user?.id)) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleEdit} 
                className="text-muted-foreground hover:text-foreground"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {(onDelete && (post.authorId === useAuth().user?.id || isModerator)) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleDelete} 
                className="text-muted-foreground hover:text-foreground"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogPost;
