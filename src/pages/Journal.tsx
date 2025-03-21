
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Journal from '@/components/Journal';

const JournalPage = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Personal Journal</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your secure space for self-reflection and personal growth. Write freely and capture your thoughts and experiences.
            </p>
          </div>
          
          <Journal />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JournalPage;
