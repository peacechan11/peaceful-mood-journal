
import { useState } from 'react';
import { Loader2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import BlogComment, { BlogCommentType } from './BlogComment';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface BlogCommentsProps {
  postId: string;
  comments: BlogCommentType[];
  onCommentsChange: () => void;
  isLoading?: boolean;
}

const BlogComments = ({ postId, comments, onCommentsChange, isLoading = false }: BlogCommentsProps) => {
  const { user, userRole } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to comment",
        variant: "destructive"
      });
      return;
    }

    if (newComment.trim() === '') {
      toast({
        title: "Error",
        description: "Comment cannot be empty",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('blog_comments').insert({
        post_id: postId,
        author_id: user.id,
        content: newComment.trim()
      });

      if (error) throw error;
      
      setNewComment('');
      onCommentsChange();
      toast({
        title: "Success",
        description: "Comment added successfully"
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditComment = async (commentId: string, content: string) => {
    try {
      const { error } = await supabase
        .from('blog_comments')
        .update({ 
          content,
          updated_at: new Date().toISOString()
        })
        .eq('id', commentId);

      if (error) throw error;
      onCommentsChange();
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('blog_comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;
      onCommentsChange();
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  };

  return (
    <div className="border-t border-border mt-6 pt-6">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <MessageCircle className="mr-2 h-5 w-5" />
        Comments ({comments.length})
      </h3>

      {user && (
        <div className="mb-6">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="mb-2"
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmitComment} 
              disabled={isSubmitting || newComment.trim() === ''}
              className="bg-peace-500 hover:bg-peace-600"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                'Post Comment'
              )}
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-1 divide-y divide-border">
          {comments.map((comment) => (
            <BlogComment
              key={comment.id}
              comment={comment}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
              currentUserId={user?.id}
              isUserModerator={userRole === 'moderator'}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No comments yet. Be the first to share your thoughts!
        </div>
      )}
    </div>
  );
};

export default BlogComments;
