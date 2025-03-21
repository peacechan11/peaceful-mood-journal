
import { useState } from 'react';
import { motion } from 'framer-motion';
import BlogPost, { BlogPostType } from './ui/BlogPost';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Tag as TagIcon, X } from 'lucide-react';

// Sample blog posts data
const samplePosts: BlogPostType[] = [
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
  },
];

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPostType[]>(samplePosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract all unique tags from posts
  const allTags = [...new Set(posts.flatMap(post => post.tags))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => post.tags.includes(tag));
    
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

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h2 className="text-2xl font-medium">Community Stories</h2>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts..."
            className="pl-9"
          />
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
            <BlogPost key={post.id} post={post} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12 border border-dashed border-border rounded-xl">
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-accent mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No posts found</h3>
          <p className="text-muted-foreground mt-1 max-w-sm mx-auto">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogSection;
