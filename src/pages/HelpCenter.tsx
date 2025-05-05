
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HelpCenter = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <motion.div
          className="container-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions and learn how to make the most of PeaceSync.
            </p>
          </div>
          
          <div className="space-y-8">
            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">How do I get started with PeaceSync?</h3>
                  <p className="text-muted-foreground">
                    Create an account to access all features. After signing in, explore the Mood Tracker to record your daily emotions, use the Journal for personal reflections, and visit the Community section to connect with others.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Is my information private?</h3>
                  <p className="text-muted-foreground">
                    Yes! Your journal entries and mood tracking data are completely private. Only you can see them. The only public content is what you choose to share in the Community section.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">How can I use the breathing exercises?</h3>
                  <p className="text-muted-foreground">
                    The breathing exercise feature is accessible from any page. Click on the floating button in the bottom right corner to start a guided breathing session whenever you need a moment of calm.
                  </p>
                </div>
              </div>
            </section>
            
            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
              <p className="mb-6 text-muted-foreground">
                Need additional help? Our support team is ready to assist you with any questions or issues.
              </p>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </section>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HelpCenter;
