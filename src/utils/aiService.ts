
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
      toast.warning("Chatbot is using fallback responses. To use Gemini AI, add your API key.", {
        id: "gemini-api-key-missing",
        duration: 5000,
      });
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

// Enhanced fallback responses with more options
export const getFallbackResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase().trim();
  
  // Quick replies for common messages
  if (lowerMessage.length === 0 || lowerMessage === "hi" || lowerMessage === "hello" || lowerMessage === "hey") {
    return "Hello! I'm PeaceSync's assistant. How can I help with your mental wellbeing today?";
  }
  
  // Anxiety patterns
  if (lowerMessage.includes('anxi') || lowerMessage.includes('worry') || lowerMessage.includes('stress') || lowerMessage.includes('nervous')) {
    return "For anxiety, try taking slow, deep breaths for 2 minutes. Inhale for 4 counts, hold for 4, exhale for 6. Remember that anxiety is temporary and will pass.";
  }
  
  // Depression patterns
  if (lowerMessage.includes('depress') || lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('hopeless')) {
    return "I'm sorry you're feeling down. Remember that small steps matter - try to do one tiny enjoyable activity today. Even just stepping outside for 5 minutes can help shift your perspective.";
  }
  
  // Sleep patterns
  if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired') || lowerMessage.includes('rest')) {
    return "For better sleep, try establishing a consistent bedtime routine. Avoid screens an hour before bed, keep your room cool and dark, and consider a relaxation technique like progressive muscle relaxation.";
  }
  
  // Meditation patterns
  if (lowerMessage.includes('meditat') || lowerMessage.includes('mindful') || lowerMessage.includes('calm') || lowerMessage.includes('breath')) {
    return "To start meditation, try sitting comfortably for just 2 minutes. Focus on your breath, and when your mind wanders, gently bring attention back to breathing. Consistency is more important than duration.";
  }
  
  // Help or information requests
  if (lowerMessage.includes('help') || lowerMessage.includes('what can you') || lowerMessage.includes('how do you')) {
    return "I can help with topics like anxiety, depression, sleep, meditation, and general mental wellbeing. What would you like to know more about?";
  }
  
  // For messages we don't specifically recognize
  const generalResponses = [
    "I'm here to support your mental wellbeing. Would you like some tips on stress management, mindfulness, or sleep improvement?",
    "That's an interesting thought. How have you been feeling about your mental health lately?",
    "I understand. Remember that taking care of your mental health is just as important as physical health. What specific area would you like support with?",
    "Thanks for sharing. Would it help to talk about some practical techniques for improving your mood or reducing stress?",
    "I'm listening. Sometimes just expressing your thoughts can be helpful. Is there a particular concern you'd like to explore further?"
  ];
  
  // Return a random general response
  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
};
