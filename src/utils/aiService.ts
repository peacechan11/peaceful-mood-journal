
import { toast } from "sonner";

// BlenderBot endpoint from Hugging Face
const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";

// For more reliable API calls, add an API token if available
// This is optional but helps increase rate limits
// You can get a free token at https://huggingface.co/settings/tokens
const HF_API_TOKEN = ""; // Set this to your Hugging Face API token if you have one

// Timeout for AI API calls (in milliseconds)
const API_TIMEOUT = 5000;

export async function getAIResponse(message: string): Promise<string> {
  try {
    // Create a timeout promise to cancel the request if it takes too long
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Request timed out")), API_TIMEOUT);
    });
    
    // Create the actual fetch promise with proper headers
    const fetchPromise = fetch(HUGGING_FACE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(HF_API_TOKEN ? { Authorization: `Bearer ${HF_API_TOKEN}` } : {})
      },
      body: JSON.stringify({
        inputs: message,
        options: {
          wait_for_model: true,
          use_cache: true,
        }
      }),
    });
    
    // Race between the timeout and the fetch
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("AI API Error:", errorData);
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    
    if (typeof data === 'string') {
      return data;
    } else if (Array.isArray(data) && data[0]?.generated_text) {
      return data[0].generated_text;
    } else if (data.generated_text) {
      return data.generated_text;
    }
    
    // If we get here, the response didn't match expected formats
    console.error("Unexpected API response format:", data);
    throw new Error("Unexpected response format");
  } catch (error) {
    console.error("Error getting AI response:", error);
    throw error; // Let the calling code handle this
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
