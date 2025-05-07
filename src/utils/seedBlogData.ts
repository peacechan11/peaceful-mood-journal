
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Sample author content
const SAMPLE_AUTHORS = [
  { name: 'Mindful Explorer', avatar: 'https://ui-avatars.com/api/?name=Mindful+Explorer&background=random' },
  { name: 'Peace Seeker', avatar: 'https://ui-avatars.com/api/?name=Peace+Seeker&background=random' },
  { name: 'Wellness Advocate', avatar: 'https://ui-avatars.com/api/?name=Wellness+Advocate&background=random' },
  { name: 'Calm Practitioner', avatar: 'https://ui-avatars.com/api/?name=Calm+Practitioner&background=random' },
  { name: 'Grateful Soul', avatar: 'https://ui-avatars.com/api/?name=Grateful+Soul&background=random' },
];

// Sample tags for categorization
const SAMPLE_TAGS = [
  'mindfulness', 'meditation', 'self-care', 'gratitude', 'anxiety', 
  'depression', 'wellness', 'healing', 'mental-health', 'emotional-health', 
  'breathing', 'stress-relief', 'sleep', 'journaling', 'positive-thinking'
];

// Sample blog post content
const SAMPLE_POSTS = [
  {
    title: 'Finding Peace in Daily Mindfulness Practices',
    excerpt: 'Discover how incorporating simple mindfulness practices into your daily routine can transform your mental wellbeing.',
    content: `
Many of us move through our days on autopilot, rarely taking time to truly experience the present moment. Mindfulness offers a way to break this pattern and reconnect with ourselves and our surroundings.

What is mindfulness? At its core, mindfulness is the practice of paying attention to the present moment with openness, curiosity, and acceptance. It's about noticing what's happening right now—both within yourself and in your environment—without judgment.

Here are five simple practices you can incorporate into your daily routine:

1. Mindful Morning Routine: Before reaching for your phone, take five deep breaths and set an intention for the day. Notice the sensation of water on your skin during your shower, the aroma of your morning coffee, and the flavors of your breakfast.

2. Mindful Walking: Whether walking to your car or taking a lunch break, pay attention to the physical sensations—your feet touching the ground, the rhythm of your steps, the air on your skin. Notice colors, sounds, and scents around you.

3. Mindful Breathing: Several times throughout the day, take a minute to focus on your breath. Notice the sensation of air entering and leaving your body. When your mind wanders (which it will), gently bring your attention back to your breath.

4. Mindful Listening: When conversing with others, give them your full attention. Notice when your mind starts planning what to say next or wandering off, then gently redirect your focus to the speaker.

5. Mindful Wind-Down: Before sleep, try a body scan meditation. Starting from your toes and moving upward, bring awareness to each part of your body, noticing sensations without trying to change them.

The benefits of these practices extend far beyond the moments of mindfulness themselves. Regular practice can reduce stress, improve focus, enhance emotional regulation, and increase overall well-being.

Remember, mindfulness isn't about achieving a particular state—it's about noticing whatever state you're in. There's no failing at mindfulness; every time you notice your mind has wandered, that moment of awareness is mindfulness in action.

Start small. Choose one activity to do mindfully each day. As this becomes habitual, gradually expand your practice. The journey toward mindfulness is itself a practice in patience and self-compassion.`,
    tags: ['mindfulness', 'meditation', 'self-care', 'stress-relief'],
    image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    title: 'The Science Behind Meditation and Brain Health',
    excerpt: 'Research shows that regular meditation practice can physically change your brain structure in beneficial ways.',
    content: `
In recent years, scientific research has caught up with what meditation practitioners have known for centuries: meditation is not just a spiritual practice, but a powerful tool for brain health and cognitive function.

Neuroscientists using advanced imaging techniques have been able to observe measurable changes in the brain structure and function of regular meditators. These findings are revolutionizing our understanding of neuroplasticity—the brain's ability to change and reorganize itself throughout our lives.

Here are some key scientific discoveries about meditation and brain health:

1. Increased Gray Matter: Studies show that regular meditation practice correlates with increased gray matter in areas of the brain associated with self-awareness, compassion, and introspection. One Harvard study found that just eight weeks of Mindfulness-Based Stress Reduction (MBSR) led to measurable increases in gray matter concentration in the hippocampus, which is important for learning and memory.

2. Reduced Amygdala Size: The amygdala, often called our brain's "fight or flight" center, can appear physically smaller in long-term meditators. This correlates with lower stress levels and decreased anxiety responses.

3. Strengthened Prefrontal Cortex: Meditation strengthens the prefrontal cortex—the area responsible for decision-making, concentration, and self-regulation. This helps explain why meditators often report improved focus and emotional control.

4. White Matter Connectivity: Research suggests meditation can improve the connectivity between different brain regions, enhancing communication efficiency through the white matter pathways.

5. Telomere Preservation: Some studies indicate meditation may help preserve telomeres—the protective caps at the end of chromosomes that typically shorten as we age—potentially slowing cellular aging in the brain.

6. Default Mode Network Regulation: Meditation helps regulate the Default Mode Network (DMN), the brain network active when we're lost in thought or ruminating. Overactivity in this network is associated with depression and anxiety.

7. Neurotransmitter Balance: Research indicates meditation can increase levels of GABA (gamma-aminobutyric acid), a neurotransmitter that helps regulate anxiety, and increase dopamine, associated with pleasure and satisfaction.

The most remarkable aspect of these findings is that these changes don't require decades of intensive practice. Significant brain changes have been observed in studies with participants who meditated just 20-30 minutes daily for 8 weeks.

While more research is needed to fully understand the mechanisms at work, the existing evidence presents a compelling case for meditation as a form of "mental exercise" that strengthens and reshapes our brains for better cognitive and emotional health.

Whether you're concerned about cognitive decline, struggling with stress and anxiety, or simply interested in optimizing your brain function, meditation offers a natural, accessible pathway to better brain health—backed by an increasingly robust body of scientific evidence.`,
    tags: ['meditation', 'mental-health', 'wellness', 'science'],
    image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2090&q=80',
  },
  {
    title: 'Gratitude Journaling: Transform Your Outlook in Five Minutes a Day',
    excerpt: 'The simple practice of writing down things you're grateful for can dramatically improve your mental health and happiness.',
    content: `
When we think about improving our mental health, we often imagine complex techniques or lengthy therapy sessions. But one of the most powerful tools for psychological wellbeing is also one of the simplest: gratitude journaling.

Research in positive psychology has consistently shown that regularly acknowledging and appreciating the good in your life can significantly impact your mental and physical health. The practice is straightforward: take a few minutes each day to write down things you're grateful for.

Here's why this simple habit can be so transformative:

1. Shifts Your Focus: Our brains have a natural negativity bias—we're wired to notice and dwell on problems and threats. Gratitude journaling deliberately redirects your attention to positive aspects of your life, helping to counter this bias and create a more balanced perspective.

2. Improves Mental Health: Studies show that regular gratitude practice reduces symptoms of depression and anxiety, increases feelings of happiness and well-being, and enhances resilience during difficult times.

3. Better Sleep: Writing in a gratitude journal before bed has been shown to improve sleep quality and duration. When you end your day focusing on positive thoughts rather than worries, your mind settles more easily into restful sleep.

4. Physical Benefits: Research has linked gratitude practices to reduced inflammation, improved heart health, and even a stronger immune system. The mind-body connection means that psychological benefits often translate to physical ones.

5. Stronger Relationships: Gratitude makes us more likely to notice and appreciate others' kindness, leading to stronger bonds and increased feelings of connection.

How to Start a Gratitude Journaling Practice:

- Keep It Simple: Start with just 5 minutes a day. Write down 3-5 things you're grateful for.

- Be Specific: Rather than "I'm grateful for my friend," try "I'm grateful that my friend listened to me for an hour when I was struggling today." Specific gratitude has stronger effects.

- Embrace Variety: Include both small pleasures (a delicious cup of coffee) and significant blessings (good health). Try to find new things to be grateful for each day.

- Feel It: Don't just list items mechanically. Take a moment to actually feel the gratitude as you write each entry.

- No Pressure: Some days will feel harder than others, and that's okay. On difficult days, focus on the most basic things: a bed to sleep in, food to eat, air to breathe.

- Make It a Ritual: Choose a consistent time each day for your practice. Many people prefer morning (to set a positive tone for the day) or evening (to reflect on the day's gifts).

What makes gratitude journaling so remarkable is that it's accessible to everyone, requires minimal time, and has no negative side effects. In just five minutes a day, you can embark on a practice that research suggests may be as effective as many forms of therapy for improving mood and life satisfaction.

Remember that gratitude isn't about ignoring problems or forcing positivity. It's simply about making sure that alongside life's challenges, you're also acknowledging its gifts—a balanced perspective that can transform your relationship with everyday life.`,
    tags: ['gratitude', 'journaling', 'positive-thinking', 'self-care'],
    image_url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    title: 'Breaking the Cycle: How to Recognize and Manage Anxiety Triggers',
    excerpt: 'Learn to identify what activates your anxiety and develop effective strategies to manage these triggers before they escalate.',
    content: `
Anxiety doesn't always strike without warning. For many people, specific situations, thoughts, or sensations act as triggers, setting off a cascade of anxious thoughts and feelings. Learning to identify and manage these triggers is a crucial step in breaking the cycle of anxiety.

Understanding Your Personal Triggers

Anxiety triggers vary widely from person to person. Common triggers include:

1. External factors:
- High-pressure situations (public speaking, important meetings)
- Crowded spaces
- Social events
- Specific places associated with past anxiety
- Conflict or confrontation
- Uncertainty or change

2. Internal factors:
- Physical sensations (rapid heartbeat, dizziness)
- Certain thoughts or beliefs
- Feeling out of control
- Perfectionism
- Fatigue or hunger
- Caffeine or other substances

3. Emotional factors:
- Stress
- Feelings of inadequacy
- Rejection or criticism
- Anticipation of something difficult

Identifying Your Personal Anxiety Triggers

To recognize what triggers your anxiety:

1. Keep a journal: When anxiety strikes, record the situation, your thoughts, physical sensations, and the intensity of your anxiety. Over time, patterns will emerge.

2. Ask yourself questions:
- What was happening just before I started feeling anxious?
- Where was I? Who was I with?
- What thoughts were going through my mind?
- How did my body feel?
- Did anything change in my environment?

3. Consider the less obvious: Sometimes triggers aren't obvious. A smell that reminds you subconsciously of a stressful time, or a subtle body sensation that you've learned to associate with anxiety can trigger a response without your awareness.

Strategies for Managing Anxiety Triggers

Once you've identified your triggers, you can develop strategies to manage them:

1. Gradual exposure: Safely exposing yourself to triggers in a controlled way, starting with less anxiety-provoking situations and gradually working up to more challenging ones, can help desensitize you over time.

2. Prepare for unavoidable triggers: For triggers you can't avoid, preparation is key. If you know a certain situation triggers anxiety, plan coping strategies in advance.

3. Challenge anxious thoughts: When triggered, practice questioning anxiety-provoking thoughts. Ask: "What's the evidence for and against this thought?" and "What would I tell a friend who had this thought?"

4. Use grounding techniques: When triggered, use the 5-4-3-2-1 technique: Acknowledge 5 things you see, 4 things you can touch, 3 things you hear, 2 things you smell, and 1 thing you taste.

5. Practice relaxation skills: Deep breathing, progressive muscle relaxation, and meditation can help manage the physical response to triggers.

6. Create a trigger action plan: For each identified trigger, create a specific plan of action. For example, "When I feel overwhelmed in crowds, I will step outside for five minutes of deep breathing."

7. Seek professional help: A therapist can help you identify triggers and develop personalized strategies, particularly through approaches like Cognitive Behavioral Therapy (CBT).

Breaking Patterns Through Awareness

The key to managing anxiety triggers is breaking the automatic pattern of response. By inserting awareness and choice between the trigger and your reaction, you gain more control over your anxiety response.

Remember that avoiding triggers entirely often reinforces anxiety in the long run. While avoidance might provide short-term relief, gradual exposure within your comfort zone, combined with good coping skills, is usually more effective for long-term anxiety management.

With practice and patience, you can learn to recognize your triggers earlier in the cycle and implement strategies before anxiety escalates, giving you more freedom and control in your daily life.`,
    tags: ['anxiety', 'mental-health', 'self-care', 'wellness'],
    image_url: 'https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  },
  {
    title: 'The Power of Deep Breathing: A Simple Technique for Immediate Stress Relief',
    excerpt: 'Discover how controlled breathing exercises can instantly reduce stress and anxiety by activating your body's relaxation response.',
    content: `
In moments of stress or anxiety, your breath is always with you—a powerful, built-in tool for regulating your nervous system and returning to a state of calm. Deep breathing techniques have been practiced for thousands of years across various cultures and spiritual traditions, and modern science now confirms their effectiveness for stress management.

The Science Behind Deep Breathing

When you're stressed, your body activates the sympathetic nervous system—your "fight or flight" response. This triggers a cascade of physiological changes: your heart rate increases, breathing becomes shallow, muscles tense, and stress hormones like cortisol flood your system.

Deep, controlled breathing counteracts this by activating the parasympathetic nervous system—your body's "rest and digest" mode. This triggers a relaxation response that:

- Lowers heart rate and blood pressure
- Reduces stress hormone levels
- Increases oxygen flow to your brain and muscles
- Relaxes tense muscles
- Improves focus and clarity
- Signals to your brain that you're safe

The remarkable thing about deep breathing is that it creates a positive feedback loop between your body and mind. By consciously changing your breathing pattern, you send signals to your brain that you're safe, which then sends signals to your body to relax, which further reinforces the message to your brain that there's no danger.

Simple Deep Breathing Techniques

1. Box Breathing (4-4-4-4)
- Inhale slowly through your nose for a count of 4
- Hold your breath for a count of 4
- Exhale slowly through your mouth for a count of 4
- Hold the empty breath for a count of 4
- Repeat for 5 cycles

2. 4-7-8 Breathing
- Inhale quietly through your nose for a count of 4
- Hold your breath for a count of 7
- Exhale completely through your mouth, making a whoosh sound, for a count of 8
- Repeat for 4 cycles

3. Diaphragmatic (Belly) Breathing
- Place one hand on your chest and the other on your abdomen
- Breathe in slowly through your nose, feeling your abdomen (not your chest) rise
- Exhale slowly through pursed lips, feeling your abdomen fall
- Focus on the movement of your abdomen throughout
- Continue for 5-10 minutes

4. Coherent Breathing
- Breathe at a rate of 5 breaths per minute (inhaling and exhaling each for about 6 seconds)
- Focus on smooth, even breaths without holding between inhale and exhale
- Continue for 5-10 minutes

Incorporating Deep Breathing Into Daily Life

For immediate stress relief:
- Use deep breathing whenever you feel stress rising
- Practice during short breaks throughout your day
- Try deep breathing before stressful events like meetings or difficult conversations

For long-term benefits:
- Practice for 5-10 minutes each morning to set a calm tone for the day
- Incorporate deep breathing into your bedtime routine to improve sleep
- Combine with simple mindfulness by focusing entirely on the sensations of your breath

The beauty of deep breathing is its simplicity and accessibility. You don't need any special equipment or significant time investment—just a moment to turn your attention to your breath. With regular practice, you'll likely find that you can more quickly activate your body's relaxation response when needed, building resilience to stress and creating more space between stimulus and response in challenging situations.

Remember that while deep breathing is a powerful tool, it's not a substitute for professional help if you're experiencing severe anxiety or stress. Consider it one important component in your overall mental health toolkit.`,
    tags: ['breathing', 'stress-relief', 'meditation', 'anxiety'],
    image_url: 'https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    title: 'Understanding the Connection Between Sleep and Mental Health',
    excerpt: 'The bidirectional relationship between sleep and psychological wellbeing, and how improving one can significantly benefit the other.',
    content: `
Sleep and mental health are inextricably linked, with each profoundly affecting the other. This bidirectional relationship means that poor sleep can worsen mental health problems, while mental health issues can make it harder to sleep well. Understanding this connection can help you break negative cycles and improve both your sleep and psychological wellbeing.

The Impact of Sleep on Mental Health

When we don't get adequate quality sleep, our mental health suffers in numerous ways:

1. Emotional Regulation: Sleep deprivation reduces our ability to regulate emotions, making us more reactive to negative stimuli and less responsive to positive experiences. This can manifest as irritability, mood swings, or amplified emotional responses.

2. Cognitive Function: Poor sleep impairs attention, concentration, problem-solving abilities, and creativity—all essential components of good mental health and daily functioning.

3. Stress Response: Inadequate sleep increases levels of stress hormones like cortisol, priming our bodies to remain in a heightened state of alert and tension.

4. Depression Risk: Those who consistently experience insomnia have a tenfold greater risk of developing depression compared to those who sleep well.

5. Anxiety Intensification: Sleep problems can trigger or worsen anxiety, creating a cycle where anxiety causes sleep problems, which then increase anxiety further.

6. Risk Assessment: Sleep deprivation affects the prefrontal cortex, which helps us assess risks and make decisions, potentially leading to poor judgment and increased impulsivity.

How Mental Health Affects Sleep

Conversely, mental health conditions often disrupt normal sleep patterns:

1. Depression commonly causes early morning awakening, reduced REM latency (entering dream sleep too quickly), and insomnia or hypersomnia (sleeping too little or too much).

2. Anxiety frequently leads to difficulty falling asleep, as racing thoughts and worry keep the mind active when it should be winding down.

3. PTSD can cause intense nightmares and hypervigilance that make restful sleep difficult to achieve.

4. Bipolar disorder typically features insomnia during manic phases and hypersomnia during depressive episodes.

5. Even subclinical worry and rumination can delay sleep onset and reduce sleep quality.

Breaking the Cycle: Improving Both Sleep and Mental Health

Because of the interconnected nature of sleep and mental health, improvements in one area often benefit the other. Here are strategies that target both:

1. Sleep Hygiene Practices:
- Maintain consistent sleep-wake times, even on weekends
- Create a restful sleeping environment (dark, quiet, cool)
- Limit screen time before bed (blue light affects melatonin production)
- Establish a calming bedtime routine
- Avoid caffeine, alcohol, and large meals close to bedtime

2. Cognitive Behavioral Strategies:
- Challenge catastrophic thinking about sleep ("If I don't sleep well, tomorrow will be terrible")
- Practice stimulus control (only get into bed when sleepy; if you can't sleep after 20 minutes, get up and do something calming)
- Try sleep restriction therapy (temporarily reducing time in bed to build sleep pressure)

3. Stress-Reduction Techniques:
- Regular meditation practice
- Progressive muscle relaxation before bed
- Journaling to "download" worries before sleep
- Breathing exercises when anxious feelings arise

4. Physical Activity:
- Regular exercise (though not too close to bedtime) benefits both sleep and mental health
- Spending time outdoors during daylight hours helps regulate circadian rhythm

5. Professional Support:
- Cognitive Behavioral Therapy for Insomnia (CBT-I) is highly effective for persistent sleep problems
- Addressing underlying mental health conditions through therapy and/or medication can improve sleep
- For some conditions, treating sleep issues may be a crucial component of mental health treatment

Breaking the negative cycle between poor sleep and mental health challenges requires patience and consistency. Improvements may not happen overnight, but even small changes in sleep habits can create positive ripple effects for mental wellbeing.

If you're struggling with persistent sleep problems alongside mental health concerns, consider speaking with a healthcare provider who can help determine which issue to address first or whether to tackle both simultaneously. With the right approach, better sleep and improved mental health are achievable goals that reinforce each other in creating overall wellbeing.`,
    tags: ['sleep', 'mental-health', 'wellness', 'self-care'],
    image_url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2060&q=80',
  },
];

// Function to get a random element from an array
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Function to generate a random number of items from an array (1 to max)
const getRandomItems = <T>(array: T[], max = 3): T[] => {
  const count = Math.floor(Math.random() * max) + 1;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Function to create a seed post with author
const createSeedPost = async (post: any, authorId: string) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        tags: post.tags,
        image_url: post.image_url,
        author_id: authorId,
        status: 'approved', // Pre-approve seed content
      })
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error creating seed post:', error);
    throw error;
  }
};

// Function to add reactions to a post
const addReactionsToPost = async (postId: string, userIds: string[], count: number) => {
  try {
    const reactions = [];
    
    // Use only available userIds, don't exceed what we have
    const usersToUse = Math.min(count, userIds.length);
    
    for (let i = 0; i < usersToUse; i++) {
      reactions.push({
        post_id: postId,
        user_id: userIds[i],
        reaction_type: 'like'
      });
    }
    
    if (reactions.length > 0) {
      const { error } = await supabase
        .from('blog_reactions')
        .insert(reactions);
        
      if (error) throw error;
    }
  } catch (error) {
    console.error('Error adding reactions:', error);
    throw error;
  }
};

// Function to add comments to a post
const addCommentsToPost = async (postId: string, userIds: string[], count: number) => {
  try {
    const comments = [];
    const sampleComments = [
      "This really resonated with me. Thank you for sharing!",
      "I've been practicing this technique for a few weeks and it's made a huge difference.",
      "Great insight. I never thought about it this way before.",
      "Do you have any additional resources you'd recommend on this topic?",
      "I'd love to hear more about how this has impacted your daily routine.",
      "This is exactly what I needed to read today. Thank you.",
      "I've bookmarked this to come back to when I need a reminder.",
      "The way you explained this makes it so much more accessible.",
      "Have you found this practice to be sustainable long-term?",
      "This changed my perspective completely. Very grateful for this post."
    ];
    
    // Use only available userIds, don't exceed what we have
    const usersToUse = Math.min(count, userIds.length);
    
    for (let i = 0; i < usersToUse; i++) {
      comments.push({
        post_id: postId,
        author_id: userIds[i],
        content: getRandomElement(sampleComments)
      });
    }
    
    if (comments.length > 0) {
      const { error } = await supabase
        .from('blog_comments')
        .insert(comments);
        
      if (error) throw error;
    }
  } catch (error) {
    console.error('Error adding comments:', error);
    throw error;
  }
};

/**
 * Seeds the database with sample blog posts, reactions, and comments
 */
export const seedBlogData = async () => {
  try {
    // First check if we already have seed data to avoid duplicates
    const { data: existingPosts, error: checkError } = await supabase
      .from('blog_posts')
      .select('id')
      .limit(1);
      
    if (checkError) throw checkError;
    
    // If posts already exist, don't seed again
    if (existingPosts && existingPosts.length > 0) {
      toast({
        title: "Blog data already exists",
        description: "Sample blog data is already present in the database",
      });
      return;
    }
    
    // Create a few dummy users to use as authors and commenters
    const { data: existingUsers, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .limit(10);
      
    if (userError) throw userError;
    
    if (!existingUsers || existingUsers.length === 0) {
      toast({
        title: "No users found",
        description: "Please create at least one user account before seeding blog data",
        variant: "destructive"
      });
      return;
    }
    
    // Use existing users for authors and interactions
    const userIds = existingUsers.map(user => user.id);
    
    // Create each sample post
    for (const postData of SAMPLE_POSTS) {
      // Assign a random user as the author
      const authorId = getRandomElement(userIds);
      
      // Create the post
      const post = await createSeedPost(postData, authorId);
      
      // Add some random number of reactions (0-8)
      const reactionCount = Math.floor(Math.random() * 9);
      if (reactionCount > 0) {
        // Shuffle userIds to get different users for reactions
        const shuffledUserIds = [...userIds].sort(() => 0.5 - Math.random());
        await addReactionsToPost(post.id, shuffledUserIds, reactionCount);
      }
      
      // Add some random number of comments (0-5)
      const commentCount = Math.floor(Math.random() * 6);
      if (commentCount > 0) {
        // Shuffle userIds to get different users for comments
        const shuffledUserIds = [...userIds].sort(() => 0.5 - Math.random());
        await addCommentsToPost(post.id, shuffledUserIds, commentCount);
      }
    }
    
    toast({
      title: "Blog data seeded successfully",
      description: `Added ${SAMPLE_POSTS.length} sample blog posts with comments and reactions`,
    });
  } catch (error) {
    console.error('Error seeding blog data:', error);
    toast({
      title: "Error seeding blog data",
      description: "An error occurred while adding sample blog data",
      variant: "destructive"
    });
  }
};
