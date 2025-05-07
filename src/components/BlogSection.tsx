import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogPost, { BlogPostType } from './ui/BlogPost';
import BlogComments from './ui/BlogComments';
import SampleBlogPosts from './ui/SampleBlogPosts';
import { BlogCommentType } from './ui/BlogComment';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Tag as TagIcon, X, Plus, Eye, Check, MessageCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface BlogSectionProps {
  currentUser?: {
    id: string;
    name: string;
    role: 'moderator' | 'user';
  };
  forceSamplePosts?: boolean;
  showBothSampleAndRealPosts?: boolean;
}

const BlogSection = ({ currentUser, forceSamplePosts = false, showBothSampleAndRealPosts = false }: BlogSectionProps) => {
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [moderationView, setModerationView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [showSamplePosts, setShowSamplePosts] = useState(forceSamplePosts);
  const { user } = useAuth();
  
  // New state for comments and selected post for comments
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [comments, setComments] = useState<BlogCommentType[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [userReactions, setUserReactions] = useState<Record<string, boolean>>({});
  
  // New post state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postExcerpt, setPostExcerpt] = useState('');
  const [postTags, setPostTags] = useState('');
  const [editingPost, setEditingPost] = useState<BlogPostType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setShowSamplePosts(forceSamplePosts);
    if (!forceSamplePosts || showBothSampleAndRealPosts) {
      fetchPosts();
    } else {
      setIsLoading(false);
    }
    
    if (user) {
      fetchUserReactions();
    }
  }, [currentUser, moderationView, user, forceSamplePosts, showBothSampleAndRealPosts]);
  
  useEffect(() => {
    if (activePostId) {
      fetchComments(activePostId);
    }
  }, [activePostId]);

  const fetchUserReactions = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('blog_reactions')
        .select('post_id')
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      const reactions: Record<string, boolean> = {};
      data.forEach(item => {
        reactions[item.post_id] = true;
      });
      
      setUserReactions(reactions);
    } catch (error) {
      console.error('Error fetching user reactions:', error);
    }
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      // Fetch posts from Supabase
      let query = supabase
        .from('blog_posts')
        .select(`
          id, 
          title, 
          content, 
          excerpt, 
          status, 
          image_url, 
          tags, 
          created_at,
          author_id,
          profiles:author_id (username)
        `)
        .order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;

      // Extract all unique tags
      const tags = data.flatMap(post => post.tags || []);
      setAllTags([...new Set(tags)]);

      // Count comments for each post
      const commentCounts = await Promise.all(data.map(async post => {
        const { count, error: countError } = await supabase
          .from('blog_comments')
          .select('id', { count: 'exact', head: true })
          .eq('post_id', post.id);
          
        return { postId: post.id, count: countError ? 0 : (count || 0) };
      }));
      
      const commentCountMap = Object.fromEntries(
        commentCounts.map(({ postId, count }) => [postId, count])
      );
      
      // Count reactions for each post
      const reactionCounts = await Promise.all(data.map(async post => {
        const { count, error: countError } = await supabase
          .from('blog_reactions')
          .select('id', { count: 'exact', head: true })
          .eq('post_id', post.id);
          
        return { postId: post.id, count: countError ? 0 : (count || 0) };
      }));
      
      const reactionCountMap = Object.fromEntries(
        reactionCounts.map(({ postId, count }) => [postId, count])
      );

      // Transform data to match the BlogPostType
      const transformedPosts: BlogPostType[] = data.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || post.content.substring(0, 150) + '...',
        author: {
          name: post.profiles?.username || 'Anonymous',
          avatar: `https://ui-avatars.com/api/?name=${post.profiles?.username || 'Anon'}&background=random`,
        },
        date: new Date(post.created_at),
        tags: post.tags || [],
        likes: reactionCountMap[post.id] || 0,
        comments: commentCountMap[post.id] || 0,
        image: post.image_url,
        authorId: post.author_id,
        status: post.status as 'pending' | 'approved' | 'rejected',
        hasReacted: user ? !!userReactions[post.id] : false
      }));

      setPosts(transformedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to load posts",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchComments = async (postId: string) => {
    setIsLoadingComments(true);
    try {
      // First get the comments
      const { data, error } = await supabase
        .from('blog_comments')
        .select(`
          id,
          content,
          created_at,
          updated_at,
          author_id
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      
      // For each comment, fetch the author information separately
      const commentsWithAuthors = await Promise.all(
        data.map(async (comment) => {
          // Get author information
          const { data: authorData } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', comment.author_id)
            .single();
          
          return {
            id: comment.id,
            content: comment.content,
            author: {
              id: comment.author_id,
              name: authorData?.username || 'Anonymous',
              avatar: `https://ui-avatars.com/api/?name=${authorData?.username || 'Anon'}&background=random`
            },
            createdAt: new Date(comment.created_at),
            updatedAt: comment.updated_at ? new Date(comment.updated_at) : undefined
          };
        })
      );
      
      setComments(commentsWithAuthors);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: "Error",
        description: "Failed to load comments",
        variant: "destructive"
      });
    } finally {
      setIsLoadingComments(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by selected tags
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => post.tags.includes(tag));
    
    // Filter based on user role and moderation view
    const viewableByUser = currentUser?.role === 'moderator' 
      ? true 
      : post.authorId === currentUser?.id || post.status === 'approved';

    // If in moderation view (moderators only), only show pending posts
    const matchesModeration = moderationView 
      ? post.status === 'pending'
      : post.status !== 'rejected';  // Normal view - don't show rejected posts
    
    return matchesSearch && matchesTags && viewableByUser && matchesModeration;
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

  const handleModerationAction = async (postId: string, action: 'approve' | 'reject') => {
    if (!currentUser || currentUser.role !== 'moderator') {
      toast({
        title: "Error",
        description: "Only moderators can perform this action",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ status: action === 'approve' ? 'approved' : 'rejected' })
        .eq('id', postId);

      if (error) throw error;

      // Update local state
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, status: action === 'approve' ? 'approved' : 'rejected' } 
          : post
      ));

      toast({
        title: "Success",
        description: `Post ${action === 'approve' ? 'approved' : 'rejected'} successfully`
      });
    } catch (error) {
      console.error(`Error ${action}ing post:`, error);
      toast({
        title: "Error",
        description: `Failed to ${action} post`,
        variant: "destructive"
      });
    }
  };

  const openNewPostDialog = () => {
    setEditingPost(null);
    setPostTitle('');
    setPostContent('');
    setPostExcerpt('');
    setPostTags('');
    setIsDialogOpen(true);
  };

  const handleEditPost = (post: BlogPostType) => {
    setEditingPost(post);
    setPostTitle(post.title);
    setPostContent(post.content);
    setPostExcerpt(post.excerpt);
    setPostTags(post.tags.join(', '));
    setIsDialogOpen(true);
  };

  const handleDeletePost = async (postId: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to delete posts",
        variant: "destructive"
      });
      return;
    }

    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      // Update local state
      setPosts(prev => prev.filter(post => post.id !== postId));
      
      if (activePostId === postId) {
        setActivePostId(null);
        setComments([]);
      }
      
      toast({
        title: "Success",
        description: "Post deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive"
      });
    }
  };
  
  const handleReaction = async (postId: string, isAdding: boolean) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to react to posts",
        variant: "destructive"
      });
      return;
    }
    
    try {
      if (isAdding) {
        const { error } = await supabase
          .from('blog_reactions')
          .insert({
            post_id: postId,
            user_id: user.id
          });
          
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_reactions')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
          
        if (error) throw error;
      }
      
      // Update local state
      setUserReactions(prev => ({
        ...prev,
        [postId]: isAdding
      }));
      
    } catch (error) {
      console.error('Error handling reaction:', error);
      throw error;
    }
  };

  const handleSavePost = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save posts",
        variant: "destructive"
      });
      return;
    }

    if (!postTitle.trim() || !postContent.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Process tags
      const processedTags = postTags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const excerpt = postExcerpt.trim() || postContent.substring(0, 150) + '...';

      if (editingPost) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title: postTitle,
            content: postContent,
            excerpt,
            tags: processedTags,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingPost.id);

        if (error) throw error;

        // Update local state
        setPosts(prev => prev.map(post => 
          post.id === editingPost.id 
            ? { 
                ...post, 
                title: postTitle,
                content: postContent,
                excerpt,
                tags: processedTags,
                date: new Date(),
              } 
            : post
        ));

        toast({
          title: "Success",
          description: "Post updated successfully"
        });
      } else {
        // Create new post
        const { data, error } = await supabase
          .from('blog_posts')
          .insert({
            title: postTitle,
            content: postContent,
            excerpt,
            tags: processedTags,
            author_id: user.id,
            status: currentUser?.role === 'moderator' ? 'approved' : 'pending',
          })
          .select();

        if (error) throw error;

        if (data && data[0]) {
          // Add new post to local state
          const newPost: BlogPostType = {
            id: data[0].id,
            title: postTitle,
            content: postContent,
            excerpt,
            author: {
              name: currentUser?.name || user.email?.split('@')[0] || 'User',
              avatar: `https://ui-avatars.com/api/?name=${currentUser?.name || 'User'}&background=random`,
            },
            date: new Date(),
            tags: processedTags,
            likes: 0,
            comments: 0,
            authorId: user.id,
            status: currentUser?.role === 'moderator' ? 'approved' : 'pending',
          };

          setPosts(prev => [newPost, ...prev]);
        }

        toast({
          title: "Success",
          description: currentUser?.role === 'moderator' 
            ? 'Post published successfully' 
            : 'Post submitted for review'
        });
      }

      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: "Failed to save post",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCommentClick = (postId: string) => {
    if (activePostId === postId) {
      // If clicking the same post, close comments
      setActivePostId(null);
      setComments([]);
    } else {
      // Open comments for the selected post
      setActivePostId(postId);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      );
    }

    // Show both sample and real posts
    if (showBothSampleAndRealPosts) {
      return (
        <motion.div>
          <SampleBlogPosts 
            currentUser={currentUser}
            onCommentClick={handleCommentClick}
          />
          
          <Separator className="my-10" />
          
          {renderRealPosts()}
        </motion.div>
      );
    }

    // Only show sample posts
    if (forceSamplePosts) {
      return (
        <motion.div>
          <SampleBlogPosts 
            currentUser={currentUser}
            onCommentClick={handleCommentClick}
          />
        </motion.div>
      );
    }

    // Only show real posts
    return renderRealPosts();
  };

  const renderRealPosts = () => {
    if (filteredPosts.length > 0) {
      return (
        <motion.div className="space-y-8">
          {filteredPosts.map((post) => (
            <div key={post.id} className="relative">
              <BlogPost 
                post={post} 
                className={post.status === 'pending' ? "border-amber-300 border-2" : ""}
                isExpanded={activePostId === post.id}
                onEdit={post.authorId === currentUser?.id ? handleEditPost : undefined}
                onDelete={
                  (currentUser?.role === 'moderator' || post.authorId === currentUser?.id) 
                    ? handleDeletePost 
                    : undefined
                }
                onReaction={handleReaction}
                onCommentClick={handleCommentClick}
                isLoggedIn={!!user}
              />
              
              {/* Display comments when the post is active */}
              {activePostId === post.id && (
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-border shadow-sm overflow-hidden mt-4 p-6">
                  <BlogComments 
                    postId={post.id}
                    comments={comments}
                    onCommentsChange={() => fetchComments(post.id)}
                    isLoading={isLoadingComments}
                  />
                </div>
              )}
              
              {/* Moderation controls for pending posts - only visible to moderators */}
              {currentUser?.role === 'moderator' && post.status === 'pending' && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button 
                    onClick={() => handleModerationAction(post.id, 'approve')}
                    variant="outline"
                    size="sm"
                    className="bg-green-50 border-green-200 hover:bg-green-100 hover:text-green-800"
                  >
                    <Check className="h-4 w-4 mr-1 text-green-600" />
                    Approve
                  </Button>
                  <Button 
                    onClick={() => handleModerationAction(post.id, 'reject')}
                    variant="outline"
                    size="sm"
                    className="bg-red-50 border-red-200 hover:bg-red-100 hover:text-red-800"
                  >
                    <X className="h-4 w-4 mr-1 text-red-600" />
                    Reject
                  </Button>
                </div>
              )}

              {/* Owner indicator */}
              {post.authorId === currentUser?.id && (
                <div className="absolute top-4 right-4 bg-peace-100 text-peace-800 rounded-full px-2 py-1 text-xs font-medium">
                  Your Post
                </div>
              )}
            </div>
          ))}
        </motion.div>
      );
    }

    return (
      <div className="text-center py-12 border border-dashed border-border rounded-xl">
        <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-accent mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No posts found</h3>
        <p className="text-muted-foreground mt-1 max-w-sm mx-auto">
          {moderationView 
            ? "No posts pending review at the moment."
            : "Try adjusting your search or filters to find what you're looking for."}
        </p>
        {(searchTerm || selectedTags.length > 0) && (
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="mt-4"
          >
            Clear Filters
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h2 className="text-2xl font-medium">Community Stories</h2>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts..."
              className="pl-9"
            />
          </div>
          
          {user && (
            <Button onClick={openNewPostDialog} size="sm" className="whitespace-nowrap">
              <Plus className="h-4 w-4 mr-1" />
              New Post
            </Button>
          )}

          {currentUser?.role === 'moderator' && (
            <Button 
              onClick={() => setModerationView(!moderationView)} 
              variant={moderationView ? "default" : "outline"} 
              size="sm"
              className="whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              {moderationView ? 'Pending Review' : 'Moderation'}
            </Button>
          )}
        </div>
      </div>

      {allTags.length > 0 && !showSamplePosts && (
        <div className="mb-8 flex items-center gap-2 flex-wrap">
          <TagIcon className="h-4 w-4 text-muted-foreground" />
          {allTags.map((tag) => (
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
          
          {(searchTerm || selectedTags.length > 0) && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="ml-auto"
            >
              <X className="h-4 w-4 mr-1" />
              Clear Filters
            </Button>
          )}
        </div>
      )}

      {renderContent()}

      {/* Dialog for creating/editing posts */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
            <DialogDescription>
              {editingPost 
                ? 'Update your blog post below.'
                : 'Share your thoughts, experiences, and insights with the community.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="Give your post a title"
              />
            </div>
            
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
                Excerpt (optional)
              </label>
              <Input
                id="excerpt"
                value={postExcerpt}
                onChange={(e) => setPostExcerpt(e.target.value)}
                placeholder="A short summary of your post"
              />
              <p className="text-xs text-muted-foreground mt-1">
                If left blank, we'll create one from your content.
              </p>
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
                Content <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="content"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Write your post content here..."
                rows={12}
                className="resize-none"
              />
            </div>
            
            <div>
              <label htmlFor="tags" className="block text-sm font-medium mb-1">
                Tags (comma separated)
              </label>
              <Input
                id="tags"
                value={postTags}
                onChange={(e) => setPostTags(e.target.value)}
                placeholder="mindfulness, gratitude, meditation"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSavePost} 
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
                  {editingPost ? 'Update Post' : currentUser?.role === 'moderator' ? 'Publish Post' : 'Submit for Review'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogSection;
