
import { useState } from 'react';
import { format } from 'date-fns';
import { Edit, Trash2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

export interface BlogCommentType {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt?: Date;
}

interface BlogCommentProps {
  comment: BlogCommentType;
  onEdit: (commentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
  currentUserId?: string;
  isUserModerator?: boolean;
}

const BlogComment = ({
  comment,
  onEdit,
  onDelete,
  currentUserId,
  isUserModerator
}: BlogCommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isAuthor = currentUserId === comment.author.id;
  const canModify = isAuthor || isUserModerator;

  const handleSaveEdit = async () => {
    if (editedContent.trim() === '') {
      toast({
        title: "Error",
        description: "Comment cannot be empty",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onEdit(comment.id, editedContent);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Comment updated successfully"
      });
    } catch (error) {
      console.error('Error updating comment:', error);
      toast({
        title: "Error",
        description: "Failed to update comment",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this comment?')) {
      try {
        await onDelete(comment.id);
        toast({
          title: "Success",
          description: "Comment deleted successfully"
        });
      } catch (error) {
        console.error('Error deleting comment:', error);
        toast({
          title: "Error",
          description: "Failed to delete comment",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="border-b border-border py-4 last:border-0">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center overflow-hidden">
          {comment.author.avatar ? (
            <img 
              src={comment.author.avatar} 
              alt={comment.author.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        <div>
          <div className="font-medium text-sm">{comment.author.name}</div>
          <div className="text-xs text-muted-foreground">
            {format(new Date(comment.createdAt), 'MMM d, yyyy • h:mm a')}
            {comment.updatedAt && comment.updatedAt > comment.createdAt && (
              <span className="italic ml-1">(edited)</span>
            )}
          </div>
        </div>
        
        {canModify && !isEditing && (
          <div className="ml-auto flex gap-1">
            {isAuthor && (
              <Button 
                onClick={() => setIsEditing(true)} 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2"
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
            )}
            <Button 
              onClick={handleDelete} 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
      
      {isEditing ? (
        <div className="mt-2">
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="min-h-[80px] text-sm"
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setIsEditing(false);
                setEditedContent(comment.content);
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={handleSaveEdit}
              disabled={isSubmitting || editedContent.trim() === comment.content.trim()}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-sm whitespace-pre-wrap mt-1">{comment.content}</div>
      )}
    </div>
  );
};

export default BlogComment;
