
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MoodTracker from '@/components/MoodTracker';

const Mood = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Mood Tracker</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track your emotional journey day by day. Recognize patterns and gain insights into what affects your wellbeing.
            </p>
          </div>
          
          <MoodTracker />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Mood;
