
import { toast } from "sonner";

const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";

// This free model doesn't require an API key for limited usage
// For production, you'd want to use a proper API key or move this to a backend function

export async function getAIResponse(message: string): Promise<string> {
  try {
    const response = await fetch(HUGGING_FACE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: message,
        options: {
          wait_for_model: true,
          use_cache: true,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("AI API Error:", errorData);
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    
    // The response format varies by model, but most conversational models return
    // either a string directly or an object with a 'generated_text' property
    if (typeof data === 'string') {
      return data;
    } else if (Array.isArray(data) && data[0]?.generated_text) {
      return data[0].generated_text;
    } else if (data.generated_text) {
      return data.generated_text;
    }
    
    return "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Error getting AI response:", error);
    return "I'm experiencing technical difficulties. Please try again later.";
  }
}

// Fallback responses to use when the AI service is unavailable or rate limited
export const getFallbackResponse = (message: string): string => {
  // Re-use our existing response logic as fallback
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm PeaceSync's assistant. How can I help with your mental wellbeing today?";
  } else if (lowerMessage.includes('anxiety') || lowerMessage.includes('anxious') || lowerMessage.includes('worry')) {
    return "For anxiety, try taking slow, deep breaths for 2 minutes. Inhale for 4 counts, hold for 4, exhale for 6.";
  } else if (lowerMessage.includes('depress') || lowerMessage.includes('sad') || lowerMessage.includes('down')) {
    return "I'm sorry you're feeling down. Remember that small steps matter - try to do one tiny enjoyable activity today.";
  } else if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) {
    return "For better sleep, try establishing a consistent bedtime routine. Avoid screens an hour before bed.";
  } else if (lowerMessage.includes('meditat') || lowerMessage.includes('mindful')) {
    return "To start meditation, try sitting comfortably for just 2 minutes. Focus on your breath, and when your mind wanders, gently bring attention back to breathing.";
  } else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
    return "I can help with topics like anxiety, depression, sleep, meditation, and general mental wellbeing. What would you like to know more about?";
  } else {
    return "I'm here to support your mental wellbeing. Would you like some tips on stress management, mindfulness, or sleep improvement?";
  }
};
