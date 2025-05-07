import { useState } from 'react';
import BlogPost, { BlogPostType } from './BlogPost';

// Sample data for blog posts (not stored in database)
const sampleBlogPosts: BlogPostType[] = [
  {
    id: "sample-1",
    title: "Finding Inner Peace Through Mindfulness",
    content: "Mindfulness is the practice of being fully present and engaged in the moment, aware of your thoughts and feelings without distraction or judgment. It's about training your brain to stay focused on what's happening right now, rather than rehashing past events or worrying about the future.\n\nResearch has shown that practicing mindfulness can reduce stress, improve attention, boost the immune system, reduce emotional reactivity, and promote a general sense of health and well-being. By focusing on the present moment, you can appreciate the world around you more fully and create space for greater clarity and understanding.\n\nTo practice mindfulness, try setting aside 5-10 minutes each day to sit quietly and focus on your breathing. When your mind wanders (which it will), gently bring your attention back to your breath. Over time, this simple practice can lead to profound changes in how you experience life.",
    excerpt: "Discover how the practice of mindfulness can transform your daily life and lead to greater peace and well-being.",
    author: {
      name: "Sarah Johnson",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=random",
    },
    date: new Date("2025-04-29"),
    tags: ["mindfulness", "mental health", "meditation"],
    likes: 127,
    comments: 23,
  },
  {
    id: "sample-2",
    title: "The Power of Gratitude Journaling",
    content: "Gratitude journaling is a simple yet powerful practice that involves regularly recording things you are thankful for. This practice shifts your focus from what's lacking to the abundance that already exists in your life.\n\nNeuroscientists have found that expressing gratitude releases dopamine and serotonin, two crucial neurotransmitters responsible for our 'feel good' emotions. This not only makes us feel better immediately but can also improve our mood long-term when practiced regularly.\n\nTo start your gratitude journal, set aside a few minutes each day to write down three to five things you're grateful for. These can be big things like good health or small pleasures like a delicious meal. The key is consistency and authenticity in your practice.",
    excerpt: "Learn how keeping a gratitude journal can transform your mindset and increase your overall happiness.",
    author: {
      name: "Michael Chen",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=random",
    },
    date: new Date("2025-04-27"),
    tags: ["gratitude", "journaling", "positive psychology"],
    likes: 85,
    comments: 14,
  },
  {
    id: "sample-3",
    title: "Building Resilience in Challenging Times",
    content: "Resilience is our ability to bounce back from adversity and grow from challenges. It's not about avoiding difficulties but developing the strength to navigate through them effectively.\n\nResearch shows that resilient people share certain characteristics: they maintain a positive outlook, develop strong social connections, accept change as part of life, and take decisive actions in difficult situations. The good news is that resilience isn't something you're either born with or not—it's a skill that can be developed.\n\nTo build resilience, try these strategies: cultivate a supportive network, practice self-compassion, maintain perspective during challenges, establish achievable goals, and take care of your physical and mental health. Remember that building resilience is a journey, not a destination.",
    excerpt: "Explore practical strategies to strengthen your resilience and navigate life's inevitable challenges with greater ease.",
    author: {
      name: "Elena Rodriguez",
      avatar: "https://ui-avatars.com/api/?name=Elena+Rodriguez&background=random",
    },
    date: new Date("2025-04-25"),
    tags: ["resilience", "mental strength", "personal growth"],
    likes: 93,
    comments: 17,
  },
  {
    id: "sample-4",
    title: "The Science Behind Effective Breathing Techniques",
    content: "Your breath is a powerful tool that can influence your physical and mental state in remarkable ways. Controlled breathing practices have been used for thousands of years in traditions like yoga and meditation, and modern science now validates their effectiveness.\n\nWhen you practice deep, diaphragmatic breathing, you activate your parasympathetic nervous system—the \"rest and digest\" mode that counteracts stress. This leads to lowered heart rate, reduced blood pressure, and decreased levels of stress hormones like cortisol.\n\nTry this simple 4-7-8 technique: inhale through your nose for 4 seconds, hold your breath for 7 seconds, and exhale completely through your mouth for 8 seconds. Practice this cycle 3-4 times whenever you feel stressed or before bed to promote relaxation and better sleep.",
    excerpt: "Understand the physiological benefits of proper breathing techniques and learn simple exercises to reduce stress and anxiety.",
    author: {
      name: "Dr. James Wilson",
      avatar: "https://ui-avatars.com/api/?name=James+Wilson&background=random",
    },
    date: new Date("2025-04-22"),
    tags: ["breathing techniques", "stress reduction", "health"],
    likes: 76,
    comments: 12,
  },
  {
    id: "sample-5",
    title: "Cultivating Compassion in Daily Life",
    content: "Compassion—the ability to notice suffering and feel moved to help alleviate it—is not just a nice quality to have; it's essential for our collective well-being and personal happiness.\n\nResearch in positive psychology shows that practicing compassion leads to greater happiness, stronger immune systems, reduced inflammation, and improved relationships. When we extend kindness to others, our brains release oxytocin, often called the \"love hormone,\" which creates feelings of warmth and connection.\n\nTo cultivate compassion, start with self-compassion. Treat yourself with the same kindness you would offer a good friend. Then extend that compassion outward: practice random acts of kindness, volunteer for causes that matter to you, and try to understand others' perspectives even when you disagree. Small, consistent acts of compassion create ripples that extend far beyond our immediate interactions.",
    excerpt: "Discover how practicing compassion towards yourself and others can transform your relationships and enhance your well-being.",
    author: {
      name: "Sophia Lee",
      avatar: "https://ui-avatars.com/api/?name=Sophia+Lee&background=random",
    },
    date: new Date("2025-04-20"),
    tags: ["compassion", "kindness", "relationships"],
    likes: 112,
    comments: 19,
  },
  {
    id: "sample-6",
    title: "The Art of Setting Meaningful Goals",
    content: "Goal setting is more than just deciding what you want to achieve; it's about creating a roadmap for personal growth and fulfillment. The most effective goals are those aligned with your core values and authentic desires.\n\nPsychologists suggest that successful goal setting follows the SMART criteria: Specific, Measurable, Achievable, Relevant, and Time-bound. But beyond these practical considerations, truly meaningful goals connect to your deeper purpose and bring genuine satisfaction when achieved.\n\nTry this approach: instead of focusing solely on outcome goals (what you want to have), incorporate process goals (what you want to do regularly) and identity goals (who you want to become). Balance ambitious aspirations with realistic expectations, and remember to celebrate progress along the way. The journey toward your goals often proves as rewarding as reaching the destination.",
    excerpt: "Learn how to set goals that align with your values and lead to authentic fulfillment rather than temporary satisfaction.",
    author: {
      name: "Daniel Morgan",
      avatar: "https://ui-avatars.com/api/?name=Daniel+Morgan&background=random",
    },
    date: new Date("2025-04-18"),
    tags: ["goal setting", "personal development", "motivation"],
    likes: 64,
    comments: 9,
  },
  {
    id: "sample-7",
    title: "Understanding the Connection Between Nature and Well-being",
    content: "Humans have an innate affinity for nature—a concept known as biophilia. This connection isn't just poetic; it's biological. Countless studies show that regular contact with natural environments significantly improves physical and mental health.\n\nSpending time in nature reduces stress hormones, lowers blood pressure, boosts immune function, and improves mood. Even brief exposure to natural settings or viewing nature scenes can enhance cognitive function and creativity.\n\nTo harness these benefits, try incorporating nature into your daily routine. Take short walks in local parks, bring plants into your home or workspace, sit by a window with a natural view during breaks, or simply spend a few minutes each day observing the sky, trees, or animals outside. The healing power of nature is accessible even in urban environments if we intentionally seek it out.",
    excerpt: "Explore the scientific evidence behind nature's healing effects on the mind and body, and discover simple ways to reconnect with the natural world.",
    author: {
      name: "Olivia Patel",
      avatar: "https://ui-avatars.com/api/?name=Olivia+Patel&background=random",
    },
    date: new Date("2025-04-16"),
    tags: ["nature", "ecotherapy", "well-being"],
    likes: 88,
    comments: 15,
  },
  {
    id: "sample-8",
    title: "Effective Communication in Relationships",
    content: "Communication is the foundation of healthy relationships, yet it's something many of us struggle with. Effective communication involves not just expressing yourself clearly but listening deeply to understand others.\n\nRelationship experts highlight several key components of healthy communication: using \"I\" statements to express feelings without blame, practicing active listening without interrupting, being aware of non-verbal cues, and checking understanding before responding.\n\nWhen conflicts arise, remember that the goal isn't to win but to understand and connect. Take time-outs when emotions run high, and approach difficult conversations with curiosity rather than defensiveness. By developing these skills, you create space for deeper understanding and stronger bonds in all your relationships.",
    excerpt: "Learn the principles of effective communication that can transform your personal and professional relationships.",
    author: {
      name: "Thomas Rivera",
      avatar: "https://ui-avatars.com/api/?name=Thomas+Rivera&background=random",
    },
    date: new Date("2025-04-14"),
    tags: ["communication", "relationships", "conflict resolution"],
    likes: 97,
    comments: 21,
  },
  {
    id: "sample-9",
    title: "The Transformative Power of Regular Exercise",
    content: "Exercise is not just about physical fitness—it's a powerful tool for overall well-being. Regular physical activity impacts nearly every system in your body and can significantly improve mental health.\n\nResearch consistently shows that exercise reduces symptoms of depression and anxiety, improves sleep quality, enhances cognitive function, and boosts self-esteem. It does this through multiple mechanisms: releasing endorphins and other beneficial neurochemicals, reducing inflammation, improving neural growth, and creating a sense of accomplishment.\n\nThe good news is you don't need intense workouts to reap these benefits. Even moderate activities like brisk walking for 30 minutes several times a week can make a significant difference. The key is finding activities you enjoy, starting where you are, and building consistency over time. Remember that any movement is better than none, and the mental health benefits often appear before physical changes become visible.",
    excerpt: "Discover how regular physical activity affects your brain chemistry and can be a powerful tool for managing stress and improving mood.",
    author: {
      name: "Aisha Williams",
      avatar: "https://ui-avatars.com/api/?name=Aisha+Williams&background=random",
    },
    date: new Date("2025-04-12"),
    tags: ["exercise", "mental health", "wellness"],
    likes: 103,
    comments: 18,
  },
  {
    id: "sample-10",
    title: "Practicing Mindful Eating for Better Health",
    content: "Mindful eating is the practice of paying full attention to the experience of eating and drinking, both inside and outside the body. It involves observing how the food looks, smells, and tastes, as well as your body's hunger and fullness cues.\n\nThis approach contrasts sharply with our modern eating habits, which often involve multitasking, rushed meals, and emotional eating. By slowing down and becoming more aware, mindful eating can transform your relationship with food.\n\nResearch shows that mindful eating can help with weight management, reduce binge eating, improve digestion, and increase enjoyment of meals. To practice, try removing distractions during mealtimes, eating slowly, savoring each bite, and checking in with your hunger levels throughout the meal. This isn't about strict rules but about bringing awareness and intention to nourishing your body.",
    excerpt: "Learn how paying attention to your eating habits can transform your relationship with food and improve overall well-being.",
    author: {
      name: "Robert Kim",
      avatar: "https://ui-avatars.com/api/?name=Robert+Kim&background=random",
    },
    date: new Date("2025-04-10"),
    tags: ["mindful eating", "nutrition", "health"],
    likes: 79,
    comments: 13,
  },
  {
    id: "sample-11",
    title: "The Importance of Quality Sleep",
    content: "Sleep is not a luxury—it's a biological necessity. During sleep, your body and brain undergo crucial processes that support physical health, cognitive function, and emotional well-being.\n\nConsistent, quality sleep strengthens your immune system, regulates metabolism, consolidates memory, and clears waste products from the brain. Chronic sleep deprivation, on the other hand, is linked to serious health issues including heart disease, diabetes, obesity, depression, and impaired judgment.\n\nTo improve your sleep quality, establish a consistent sleep schedule, create a restful environment, limit screen time before bed, avoid caffeine and alcohol in the evening, and develop a relaxing bedtime routine. If you struggle with persistent sleep problems despite these measures, consider consulting a healthcare provider, as sleep disorders are common and treatable.",
    excerpt: "Understand why quality sleep is essential for your health and learn effective strategies for improving your sleep habits.",
    author: {
      name: "Jasmine Taylor",
      avatar: "https://ui-avatars.com/api/?name=Jasmine+Taylor&background=random",
    },
    date: new Date("2025-04-08"),
    tags: ["sleep", "health", "wellness"],
    likes: 118,
    comments: 22,
  },
  {
    id: "sample-12",
    title: "Finding Balance in a Digital World",
    content: "Technology has transformed our lives in countless positive ways, but our constant connectivity also presents challenges for our well-being. Digital overwhelm, social media comparison, and information overload can contribute to stress, anxiety, and disconnection from our physical lives.\n\nResearch suggests that mindful technology use—being intentional about when, why, and how we engage with digital tools—leads to greater satisfaction and productivity. This doesn't mean rejecting technology, but rather establishing a healthier relationship with it.\n\nConsider implementing these practices: designate tech-free times and zones in your home, turn off non-essential notifications, practice regular digital detoxes, be selective about social media consumption, and use technology to enhance rather than replace meaningful in-person connections. By setting boundaries around your digital life, you create space for presence, creativity, and deeper relationships.",
    excerpt: "Explore strategies for mindful technology use to reduce digital stress and create a healthier relationship with your devices.",
    author: {
      name: "Noah Bennett",
      avatar: "https://ui-avatars.com/api/?name=Noah+Bennett&background=random",
    },
    date: new Date("2025-04-06"),
    tags: ["digital wellness", "technology", "mindfulness"],
    likes: 91,
    comments: 16,
  },
  {
    id: "sample-13",
    title: "Embracing Vulnerability in Personal Growth",
    content: "Vulnerability—allowing ourselves to be truly seen, flaws and all—is often viewed as weakness. Yet research by Dr. Brené Brown and others reveals that vulnerability is actually courage in its purest form and essential for genuine connection and growth.\n\nWhen we embrace vulnerability, we open ourselves to meaningful experiences that require risk and emotional exposure: loving wholeheartedly, pursuing important goals despite possible failure, and being authentic even when it's uncomfortable. This willingness to show up without armor paradoxically creates inner strength and resilience.\n\nPracticing vulnerability might involve sharing your true feelings with someone you trust, acknowledging your mistakes, asking for help when needed, or pursuing something important without guarantees of success. Remember that vulnerability is not oversharing or lack of boundaries, but rather conscious choice to be authentic in service of connection and growth.",
    excerpt: "Discover how embracing vulnerability can lead to deeper connections, greater authenticity, and unexpected strength.",
    author: {
      name: "Gabriela Sanchez",
      avatar: "https://ui-avatars.com/api/?name=Gabriela+Sanchez&background=random",
    },
    date: new Date("2025-04-04"),
    tags: ["vulnerability", "authenticity", "personal growth"],
    likes: 86,
    comments: 14,
  },
  {
    id: "sample-14",
    title: "Creating Meaningful Morning Rituals",
    content: "How you start your morning sets the tone for your entire day. Rather than rushing straight into responsibilities or reaching for your phone, intentional morning rituals can foster clarity, purpose, and well-being.\n\nResearch on successful people across diverse fields reveals that morning routines are a common thread in their lives. These routines vary widely but share the quality of mindful intention rather than reactive autopilot.\n\nConsider incorporating these elements into your morning: begin with hydration, move your body (even briefly), practice mindfulness or reflection, connect with your goals and values, and protect your early hours from digital distractions. The specific activities matter less than the consistency and presence you bring to them. By claiming the first moments of your day for self-care and intention-setting, you create a foundation of calm and purpose that can carry through life's challenges.",
    excerpt: "Learn how creating intentional morning rituals can transform your days and help you live with greater purpose and presence.",
    author: {
      name: "Marcus Johnson",
      avatar: "https://ui-avatars.com/api/?name=Marcus+Johnson&background=random",
    },
    date: new Date("2025-04-02"),
    tags: ["morning routines", "habits", "productivity"],
    likes: 73,
    comments: 11,
  },
  {
    id: "sample-15",
    title: "The Power of Community in Healing",
    content: "Human beings are inherently social creatures. We evolved to live in community, and our physical and mental well-being is deeply connected to the quality of our social bonds. In our increasingly individualistic society, rediscovering the power of community is vital for collective healing.\n\nResearch consistently shows that strong social connections are associated with longevity, better immune function, lower rates of anxiety and depression, and greater resilience in the face of adversity. Conversely, chronic loneliness poses health risks comparable to smoking and obesity.\n\nBuilding community in modern life takes conscious effort. Consider these approaches: volunteer for causes you care about, join groups based on shared interests, create rituals of connection with friends and family, offer support to others without expectation of return, and be willing to show up authentically. In community, we find not only support during difficult times but also shared joy that amplifies life's blessings.",
    excerpt: "Explore how meaningful social connections contribute to our well-being and discover ways to build community in an increasingly isolated world.",
    author: {
      name: "Leila Hakimi",
      avatar: "https://ui-avatars.com/api/?name=Leila+Hakimi&background=random",
    },
    date: new Date("2025-03-31"),
    tags: ["community", "connection", "social health"],
    likes: 109,
    comments: 20,
  }
];

interface SampleBlogPostsProps {
  currentUser?: {
    id: string;
    name: string;
    role: string;
  };
  onCommentClick: (postId: string) => void;
}

const SampleBlogPosts = ({ currentUser, onCommentClick }: SampleBlogPostsProps) => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  
  const handleCommentClick = (postId: string) => {
    if (activePostId === postId) {
      setActivePostId(null);
    } else {
      setActivePostId(postId);
      onCommentClick(postId);
    }
  };

  return (
    <div className="space-y-8">
      {sampleBlogPosts.map((post) => (
        <BlogPost
          key={post.id}
          post={post}
          isExpanded={activePostId === post.id}
          onCommentClick={handleCommentClick}
          isLoggedIn={!!currentUser}
        />
      ))}
    </div>
  );
};

export default SampleBlogPosts;
