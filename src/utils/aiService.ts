
import { toast } from "sonner";

// Gemini AI API endpoint
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// This is a placeholder API key - users need to replace it with their own valid key
// from https://aistudio.google.com/app/apikey
const GEMINI_API_KEY = "AIzaSyDwWNPX4mCxq5GqzbcC5UB7-7eGt20OhrY";

// Timeout for AI API calls (in milliseconds)
const API_TIMEOUT = 15000; // 15 seconds timeout

export async function getAIResponse(message: string): Promise<string> {
  try {
    // Verify API key is available and not the placeholder
    if (!GEMINI_API_KEY ||
        GEMINI_API_KEY === "AIzaSyDwWNPX4mCxq5GqzbcC5UB7-7eGt20OhrY") {
      console.warn("Missing or invalid Gemini API key");
      return getFallbackResponse(message);
    }

    // Create a timeout promise to cancel the request if it takes too long
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Request timed out")), API_TIMEOUT);
    });
    
    // Create the actual fetch promise with proper headers and URL
    const fetchPromise = fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a mental health assistant for PeaceSync. 
                       Provide helpful, empathetic, and brief responses (under 150 words) to user queries about mental wellbeing.
                       User message: ${message}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 300,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });
    
    // Race between the timeout and the fetch
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("AI API Error:", errorData);
      throw new Error(`API responded with status ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    // Extract text from Gemini API response format
    if (data.candidates && data.candidates[0] && data.candidates[0].content && 
        data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text;
    }
    
    // If we get here, the response didn't match expected formats
    console.error("Unexpected API response format:", data);
    throw new Error("Unexpected response format");
  } catch (error) {
    console.error("Error getting AI response:", error);
    toast.error("Could not connect to AI service. Using fallback responses.", {
      id: "ai-connection-error",
      duration: 3000,
    });
    return getFallbackResponse(message);
  }
}

// Enhanced fallback responses with extensive options for various mental health topics
export const getFallbackResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase().trim();
  
  // Greeting patterns
  if (lowerMessage.length === 0 || /^(hi|hello|hey|greetings|howdy)$/i.test(lowerMessage)) {
    const greetings = [
      "Hello! I'm PeaceSync's assistant. How can I help with your mental wellbeing today?",
      "Hi there! I'm here to support your mental health journey. What would you like to talk about?",
      "Welcome to PeaceSync. I'm your mental wellness companion. How are you feeling today?",
      "Hello! I'm your mental wellness assistant. Would you like tips on mindfulness, stress management, or something else?",
      "Hi! I'm here to provide mental health guidance and support. What's on your mind today?"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Anxiety patterns
  if (lowerMessage.includes('anxi') || lowerMessage.includes('worry') || lowerMessage.includes('stress') || 
      lowerMessage.includes('nervous') || lowerMessage.includes('panic') || lowerMessage.includes('overwhelm')) {
    const anxietyResponses = [
      "For anxiety, try taking slow, deep breaths for 2 minutes. Inhale for 4 counts, hold for 4, exhale for 6. Remember that anxiety is temporary and will pass.",
      "When feeling anxious, try grounding yourself with the 5-4-3-2-1 technique: identify 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste.",
      "Anxiety often comes from worrying about the future. Try bringing your attention to the present moment by focusing on your immediate surroundings and sensations.",
      "For immediate anxiety relief, try progressive muscle relaxation: tense and then release each muscle group in your body, starting from your toes and working up to your head.",
      "When anxiety strikes, try the 3-3-3 rule: name 3 things you see, 3 sounds you hear, and move 3 parts of your body. This can help break the cycle of anxious thoughts.",
      "Remind yourself that anxiety is your body's natural response to perceived threats. Accept the feeling without judgment, and remember that it will eventually subside.",
      "For anxiety management, consider limiting caffeine and alcohol, which can trigger or worsen symptoms. Regular exercise and adequate sleep are also important."
    ];
    return anxietyResponses[Math.floor(Math.random() * anxietyResponses.length)];
  }
  
  // Depression patterns
  if (lowerMessage.includes('depress') || lowerMessage.includes('sad') || lowerMessage.includes('down') || 
      lowerMessage.includes('hopeless') || lowerMessage.includes('unmotivated') || lowerMessage.includes('empty')) {
    const depressionResponses = [
      "I'm sorry you're feeling down. Remember that small steps matter - try to do one tiny enjoyable activity today. Even just stepping outside for 5 minutes can help shift your perspective.",
      "Depression can make everything feel overwhelming. Break tasks into the smallest possible steps and celebrate completing each one, no matter how small it seems.",
      "When feeling depressed, be gentle with yourself. Self-compassion is crucial - speak to yourself as you would to a friend going through a difficult time.",
      "Sometimes depression lies to us about our worth and capabilities. Try to notice these negative thoughts and gently challenge them with evidence from your life.",
      "Physical movement, even just a short walk, can help with depression by releasing endorphins. Start with just 5 minutes if that's all you can manage.",
      "Depression often makes us isolate, but connection is vital. Reaching out to just one trusted person can make a difference, even with a simple text.",
      "When depressed, our basic needs often get neglected. Focus on simple self-care: drinking enough water, eating regularly, and maintaining basic hygiene."
    ];
    return depressionResponses[Math.floor(Math.random() * depressionResponses.length)];
  }
  
  // Sleep issues
  if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired') || 
      lowerMessage.includes('rest') || lowerMessage.includes('bed') || lowerMessage.includes('night') || 
      lowerMessage.includes('awake')) {
    const sleepResponses = [
      "For better sleep, try establishing a consistent bedtime routine. Avoid screens an hour before bed, keep your room cool and dark, and consider a relaxation technique like progressive muscle relaxation.",
      "If racing thoughts keep you awake, try the 'cognitive shuffling' technique: pick a random letter and list words that begin with it. This occupies your mind without being too stimulating.",
      "The 4-7-8 breathing method can help induce sleep: inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat 3-4 times when in bed.",
      "Consider limiting caffeine after noon and avoiding alcohol before bed. Both can significantly disrupt sleep quality, even if they don't prevent falling asleep.",
      "If you can't sleep after 20 minutes, get up and do something calming in dim light until you feel sleepy again. This helps break the association between bed and wakefulness.",
      "Creating a consistent sleep schedule, even on weekends, helps regulate your body's internal clock and can improve sleep quality over time.",
      "Consider your sleep environment: a cool room temperature (around 65°F/18°C), comfortable bedding, and minimal noise create optimal conditions for rest."
    ];
    return sleepResponses[Math.floor(Math.random() * sleepResponses.length)];
  }
  
  // Meditation and mindfulness
  if (lowerMessage.includes('meditat') || lowerMessage.includes('mindful') || lowerMessage.includes('calm') || 
      lowerMessage.includes('breath') || lowerMessage.includes('present') || lowerMessage.includes('focus')) {
    const mindfulnessResponses = [
      "To start meditation, try sitting comfortably for just 2 minutes. Focus on your breath, and when your mind wanders, gently bring attention back to breathing. Consistency is more important than duration.",
      "A simple mindfulness practice: pause and notice 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
      "Body scan meditation can help release tension: start at your toes and slowly move attention up through your body, noticing sensations without trying to change them.",
      "Mindfulness isn't about emptying your mind but noticing thoughts without attachment. Picture them as leaves floating down a stream, passing by without needing your engagement.",
      "For an informal mindfulness practice, choose a routine activity like washing dishes and fully engage with the sensory experience - the temperature, texture, sounds, and movements.",
      "Walking meditation is great for those who find sitting difficult. Walk slowly, noticing the sensation of each foot touching and lifting from the ground.",
      "The RAIN technique can help process difficult emotions mindfully: Recognize the emotion, Allow it to be there, Investigate with curiosity, and Nurture yourself with compassion."
    ];
    return mindfulnessResponses[Math.floor(Math.random() * mindfulnessResponses.length)];
  }
  
  // Self-care and wellness
  if (lowerMessage.includes('self-care') || lowerMessage.includes('selfcare') || lowerMessage.includes('wellness') || 
      lowerMessage.includes('health') || lowerMessage.includes('habit') || lowerMessage.includes('routine')) {
    const selfCareResponses = [
      "Self-care isn't selfish - it's necessary. Start with small daily acts: a 10-minute walk, a nutritious meal, or 5 minutes of quiet reflection.",
      "Create a personalized self-care menu with quick (5 min), medium (30 min), and extended (2+ hours) activities you enjoy. When you need self-care, you'll have options ready.",
      "Physical self-care fundamentals: aim for 7-9 hours of sleep, stay hydrated, include protein and vegetables in your meals, and move your body in ways that feel good.",
      "Emotional self-care involves setting boundaries. Practice saying 'no' to requests that drain you, and remember that 'No' is a complete sentence.",
      "Digital detoxes can be powerful self-care. Try designating specific times to be device-free, particularly the first and last hour of your day.",
      "Nature exposure is a science-backed wellness practice. Even 20 minutes in a park or garden can reduce stress hormones and improve mood.",
      "Social wellness matters too. Schedule regular connections with supportive people - even brief check-ins can nurture important relationships."
    ];
    return selfCareResponses[Math.floor(Math.random() * selfCareResponses.length)];
  }
  
  // Stress management
  if (lowerMessage.includes('stress') || lowerMessage.includes('pressure') || lowerMessage.includes('burnout') || 
      lowerMessage.includes('overwhelm') || lowerMessage.includes('cope') || lowerMessage.includes('tension')) {
    const stressResponses = [
      "When stressed, try box breathing: inhale for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat for 2-3 minutes to activate your parasympathetic nervous system.",
      "For immediate stress relief, place one hand on your heart and one on your belly. Take slow, deep breaths and mentally repeat a calming phrase like 'I am safe' or 'This will pass.'",
      "Chronic stress affects your whole body. Prioritize stress-reduction activities like regular exercise, adequate sleep, and time with supportive people.",
      "When feeling overwhelmed, try the 'five things' method: identify five tasks that need attention, complete them one by one, then reassess. This breaks the paralysis of stress.",
      "Physical tension often accompanies stress. Try progressive relaxation: tense then relax each muscle group, starting with your feet and moving upward.",
      "Journaling can help manage stress - try writing about your stressors for 10 minutes, then write potential solutions or coping strategies for another 5 minutes.",
      "Remember that saying 'no' is a stress management strategy. Evaluate your commitments and consider what you can delegate or eliminate."
    ];
    return stressResponses[Math.floor(Math.random() * stressResponses.length)];
  }
  
  // Emotional regulation
  if (lowerMessage.includes('emotion') || lowerMessage.includes('feeling') || lowerMessage.includes('mood') || 
      lowerMessage.includes('anger') || lowerMessage.includes('sad') || lowerMessage.includes('upset') || 
      lowerMessage.includes('regulate')) {
    const emotionResponses = [
      "For intense emotions, try the STOP skill: Stop, Take a breath, Observe what you're feeling without judgment, and Proceed with awareness.",
      "Name your emotions specifically - instead of 'bad,' try identifying if you're disappointed, frustrated, hurt, etc. Naming emotions helps reduce their intensity.",
      "Our bodies hold emotions. If you're feeling strong feelings, try shaking your hands and arms vigorously for 30 seconds to release physical tension.",
      "The 90-second rule can help with difficult emotions: the physiological response to an emotion typically lasts about 90 seconds. If you can observe it without feeding it with thoughts, it will begin to subside.",
      "For emotional balance, consider keeping a mood journal. Track your emotions throughout the day and note what events or thoughts preceded them to identify patterns.",
      "When emotions are overwhelming, try the 5-4-3-2-1 grounding technique: acknowledge 5 things you see, 4 things you can touch, 3 things you hear, 2 things you smell, and 1 thing you taste.",
      "Remember that all emotions are valid and serve a purpose, even uncomfortable ones. Try approaching them with curiosity rather than judgment."
    ];
    return emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
  }
  
  // Social connection
  if (lowerMessage.includes('friend') || lowerMessage.includes('relation') || lowerMessage.includes('social') || 
      lowerMessage.includes('connect') || lowerMessage.includes('talk') || lowerMessage.includes('lonely') || 
      lowerMessage.includes('isolat')) {
    const socialResponses = [
      "Social connections are vital for mental health. Start small if socializing feels overwhelming - text one person, join an online community, or attend a structured activity where interaction happens naturally.",
      "Quality matters more than quantity with social connections. Focus on nurturing a few meaningful relationships rather than maintaining many superficial ones.",
      "If you're feeling isolated, consider volunteering. It provides social contact in a structured environment and helps shift focus away from personal concerns.",
      "Online communities can provide valuable support, especially for specific challenges. Look for moderated groups focused on positive coping and mutual support.",
      "Making friends as an adult can be challenging. Regular participation in activities you enjoy increases the chance of forming connections with like-minded people.",
      "For social anxiety, prepare a few open-ended questions before social events. People generally enjoy talking about themselves, and having conversation starters ready can ease anxiety.",
      "Remember that social skills are just that - skills that improve with practice. Each interaction is an opportunity to learn, regardless of how it goes."
    ];
    return socialResponses[Math.floor(Math.random() * socialResponses.length)];
  }
  
  // Gratitude and positive psychology
  if (lowerMessage.includes('gratitude') || lowerMessage.includes('positive') || lowerMessage.includes('happy') || 
      lowerMessage.includes('joy') || lowerMessage.includes('thank') || lowerMessage.includes('appreciate')) {
    const gratitudeResponses = [
      "Practicing gratitude rewires your brain for more positivity. Try writing down three specific things you're grateful for each day, focusing on different areas each time.",
      "For an instant mood boost, recall in detail a positive memory or experience. Visualize it vividly, remembering sights, sounds, and sensations associated with that moment.",
      "Try 'savoring' - the practice of fully attending to positive experiences. When something good happens, pause to notice and extend the positive feelings it generates.",
      "Gratitude can be practiced anywhere. Try looking around right now and finding three things to appreciate, no matter how small they might seem.",
      "The 'three good things' exercise has strong research support: each night, write down three things that went well today and why they happened.",
      "Try sending a genuine thank-you message to someone who has positively impacted your life. Expressing gratitude benefits both the sender and receiver.",
      "Reframe challenges by asking 'What is this teaching me?' or 'How might this be beneficial in the long run?' Finding meaning in difficulty builds resilience."
    ];
    return gratitudeResponses[Math.floor(Math.random() * gratitudeResponses.length)];
  }
  
  // Crisis and emergency
  if (lowerMessage.includes('suicid') || lowerMessage.includes('kill myself') || lowerMessage.includes('end my life') || 
      lowerMessage.includes('die') || lowerMessage.includes('harm') || lowerMessage.includes('emergency') || 
      lowerMessage.includes('crisis')) {
    return "If you're having thoughts of harming yourself, please reach out immediately to a crisis hotline like the National Suicide Prevention Lifeline at 988 (call or text) or chat at 988lifeline.org. They provide free, confidential support 24/7. If you're in immediate danger, please call emergency services (911 in the US). Remember that you matter and support is available.";
  }
  
  // Professional help
  if (lowerMessage.includes('therapist') || lowerMessage.includes('psychiatrist') || lowerMessage.includes('counselor') || 
      lowerMessage.includes('professional') || lowerMessage.includes('therapy') || lowerMessage.includes('medication') || 
      lowerMessage.includes('doctor')) {
    const professionalResponses = [
      "Working with a mental health professional can be life-changing. If you're considering therapy, Psychology Today's therapist finder can help locate providers in your area with filters for specialty, insurance, and more.",
      "Different therapy approaches work for different people. Common effective types include Cognitive Behavioral Therapy (CBT), Acceptance and Commitment Therapy (ACT), and psychodynamic therapy.",
      "If cost is a barrier to mental healthcare, consider community mental health centers, therapists who offer sliding scale fees, or online therapy platforms which can be more affordable.",
      "A good therapeutic relationship is key to effective therapy. It's okay to meet with several therapists initially to find someone you feel comfortable with.",
      "Medication can be an important part of mental health treatment for many conditions. Psychiatrists and some primary care doctors can help determine if this might be helpful for you.",
      "Employee Assistance Programs (EAPs) often provide a number of free counseling sessions. Check if your employer offers this benefit.",
      "If you're a student, your school likely offers free or low-cost counseling services. These are confidential and separate from your academic records."
    ];
    return professionalResponses[Math.floor(Math.random() * professionalResponses.length)];
  }
  
  // Help or information requests
  if (lowerMessage.includes('help') || lowerMessage.includes('what can you') || lowerMessage.includes('how do you') || 
      lowerMessage.includes('about you')) {
    const helpResponses = [
      "I can help with topics like anxiety, depression, sleep, meditation, stress management, emotional regulation, and general mental wellbeing. What would you like to know more about?",
      "I'm your mental wellness assistant at PeaceSync. I can provide support for common mental health challenges, self-care techniques, mindfulness practices, and more. How can I assist you today?",
      "I'm designed to offer mental health support through evidence-based strategies for managing stress, anxiety, low mood, sleep difficulties, and fostering wellness. What are you looking for help with?",
      "I can suggest coping strategies, relaxation techniques, and mental wellness tips. While I'm not a replacement for professional help, I can provide guidance on common mental health concerns.",
      "I'm here to support your mental wellbeing journey with practical tips and evidence-based approaches. I can help with stress reduction, emotional management, sleep improvement, and mindfulness practices."
    ];
    return helpResponses[Math.floor(Math.random() * helpResponses.length)];
  }
  
  // For messages we don't specifically recognize
  const generalResponses = [
    "I'm here to support your mental wellbeing. Would you like some tips on stress management, mindfulness, or sleep improvement?",
    "That's an interesting thought. How have you been feeling about your mental health lately?",
    "I understand. Remember that taking care of your mental health is just as important as physical health. What specific area would you like support with?",
    "Thanks for sharing. Would it help to talk about some practical techniques for improving your mood or reducing stress?",
    "I'm listening. Sometimes just expressing your thoughts can be helpful. Is there a particular concern you'd like to explore further?",
    "Mental wellbeing is a journey, not a destination. What aspect of your mental health would you like to focus on today?",
    "Everyone's mental health needs are unique. Could you tell me more about what you're looking for support with?",
    "I'm here to help. Would you like to explore strategies for anxiety, depression, stress management, or another area of mental wellness?",
    "Small steps can make a big difference in mental health. Is there a particular area you'd like to start working on?",
    "Your mental wellbeing matters. What kind of support or information would be most helpful for you right now?"
  ];
  
  // Return a random general response
  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
};

