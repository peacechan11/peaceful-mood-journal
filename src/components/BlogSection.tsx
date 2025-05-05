
import { useState } from 'react';
import { motion } from 'framer-motion';
import BlogPost, { BlogPostType } from './ui/BlogPost';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Tag as TagIcon, X, Plus, Eye, Check, MessageCircle } from 'lucide-react';

// Updated blog post types to include author ID and status
const samplePosts: (BlogPostType & { authorId: string, status: 'pending' | 'approved' | 'rejected' })[] = [
  {
    id: '1',
    title: 'Finding Peace Through Mindfulness Meditation',
    excerpt: 'Discover how daily mindfulness practice can transform your mental well-being and bring a sense of calm to your busy life.',
    content: "In our increasingly busy and digitally connected world, finding moments of peace can seem like an impossible task. The constant notifications, endless to-do lists, and societal pressures often leave us feeling overwhelmed and disconnected from ourselves.\n\nMindfulness meditation offers a powerful antidote to this modern condition. By deliberately paying attention to the present moment without judgment, we can cultivate a sense of inner calm that persists even in challenging circumstances.\n\nMy journey with mindfulness began three years ago during a particularly stressful period in my life. Work deadlines were piling up, family responsibilities were increasing, and I found myself constantly anxious about the future. A friend suggested I try mindfulness meditation, and though skeptical at first, I decided to give it a chance.\n\nI started with just five minutes each morning, focusing on my breath and gently bringing my attention back whenever my mind wandered. Those five minutes gradually extended to ten, then fifteen, and now I practice for twenty minutes daily. The transformation has been profound.\n\nMindfulness has taught me to observe my thoughts without becoming entangled in them. I've learned to recognize when I'm catastrophizing about the future or ruminating about the past, and to gently redirect my attention to the present moment. This simple but powerful practice has reduced my anxiety, improved my sleep, and enhanced my relationships.\n\nIf you're new to mindfulness, here are a few tips to get started:\n\n1. Start small – even just 2-3 minutes daily is beneficial\n2. Use guided meditations (many free apps are available)\n3. Be patient with yourself when your mind wanders\n4. Try to practice at the same time each day to build a habit\n5. Remember that mindfulness is a skill that improves with practice\n\nHave you tried mindfulness meditation? I'd love to hear about your experiences in the comments below.",
    author: {
      name: 'Samantha Lee',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    date: new Date('2023-06-15'),
    tags: ['meditation', 'mindfulness', 'mental health'],
    likes: 42,
    comments: 12,
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
    authorId: 'user1',
    status: 'approved',
  },
  {
    id: '2',
    title: 'The Power of Gratitude Journaling',
    excerpt: "Learn how the simple practice of writing down things you're grateful for can shift your perspective and improve your mental health.",
    content: "When I first heard about gratitude journaling, I dismissed it as another feel-good practice that couldn't possibly make a meaningful difference in my life. I was going through a difficult time – dealing with burnout at work and feeling increasingly disconnected from my sense of purpose. A therapist suggested I try keeping a gratitude journal, writing down three things I was thankful for each day.\n\nWith nothing to lose, I decided to give it a try. The first few days were challenging. Finding three things to be grateful for felt forced and artificial. But as I continued the practice, something interesting happened – I started noticing positive aspects of my day that I would have previously overlooked. The warm sun on my face during my walk to work. A kind email from a colleague. The reliability of my morning coffee ritual.\n\nResearch supports what I discovered through experience: gratitude journaling works. Studies show that regularly practicing gratitude can increase happiness, reduce depression, improve sleep, strengthen relationships, and even boost immune function. The psychological explanation is compelling – by intentionally focusing on the good in our lives, we begin to retrain our brains away from their natural negativity bias.\n\nAfter six months of consistent practice, I can attest to the transformative power of this simple habit. I'm more resilient in the face of challenges, quicker to notice beauty in ordinary moments, and generally more satisfied with my life – not because my circumstances have dramatically changed, but because my perspective has.\n\nIf you'd like to start your own gratitude practice, here are some tips:\n\n1. Keep it simple – a notebook or the notes app on your phone works perfectly\n2. Be specific about what you're grateful for and why\n3. Try to find fresh things to appreciate each day\n4. Don't worry about grammar or writing style – this is just for you\n5. If you miss a day, simply resume the next day without self-criticism\n\nHave you tried gratitude journaling? I'd love to hear how it's worked for you in the comments.",
    author: {
      name: 'Marcus Johnson',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    date: new Date('2023-06-10'),
    tags: ['gratitude', 'journaling', 'positive psychology'],
    likes: 37,
    comments: 8,
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    authorId: 'user2',
    status: 'approved',
  },
  {
    id: '3',
    title: 'Benefits of Cold Water Immersion',
    excerpt: "Exploring the mental and physical benefits of cold water exposure therapy.",
    content: "Cold water immersion is gaining popularity as a wellness practice with numerous benefits. From reduced inflammation to improved mental resilience, the science behind this ancient practice is fascinating. My personal journey with cold showers and ice baths has transformed my approach to stress management and recovery.",
    author: {
      name: 'Alex Rivera',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    date: new Date('2023-06-20'),
    tags: ['wellness', 'cold therapy', 'mental resilience'],
    likes: 24,
    comments: 5,
    image: 'https://images.unsplash.com/photo-1560090995-01632a28895b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    authorId: 'user3',
    status: 'pending',
  },
];

// Mock user data with correctly typed role property
const currentUserMock = {
  id: 'user1',
  name: 'Samantha Lee',
  role: 'moderator' as const // Explicitly type as "moderator" | "user"
};

interface BlogSectionProps {
  currentUser?: {
    id: string;
    name: string;
    role: 'moderator' | 'user'; // Make sure the interface defines the correct type
  };
}

const BlogSection = ({ currentUser = currentUserMock }: BlogSectionProps) => {
  const [posts, setPosts] = useState<(BlogPostType & { 
    authorId: string, 
    status: 'pending' | 'approved' | 'rejected' 
  })[]>(samplePosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [moderationView, setModerationView] = useState<boolean>(false);
  
  // Extract all unique tags from posts
  const allTags = [...new Set(posts.flatMap(post => post.tags))];

  const filteredPosts = posts.filter(post => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by selected tags
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => post.tags.includes(tag));
    
    // Filter based on user role and moderation view
    const viewableByUser = currentUser.role === 'moderator' 
      ? true 
      : post.authorId === currentUser.id || post.status === 'approved';

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

  const handleModerationAction = (postId: string, action: 'approve' | 'reject') => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, status: action === 'approve' ? 'approved' : 'rejected' } 
        : post
    ));
  };

  const handleCreatePost = () => {
    // In a real app, this would open a form or redirect to create post page
    alert('Create post functionality would open here');
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
          
          {currentUser && (
            <Button onClick={handleCreatePost} size="sm" className="whitespace-nowrap">
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

      {allTags.length > 0 && (
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

      {filteredPosts.length > 0 ? (
        <motion.div className="space-y-8">
          {filteredPosts.map((post) => (
            <div key={post.id} className="relative">
              <BlogPost 
                post={post} 
                className={post.status === 'pending' ? "border-amber-300 border-2" : ""}
              />
              
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
      ) : (
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
      )}
    </div>
  );
};

export default BlogSection;
