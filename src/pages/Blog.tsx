
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogSection from '@/components/BlogSection';

// Mock user data - in a real app, this would come from authentication context
const currentUserMock = {
  id: 'user1',
  name: 'Samantha Lee',
  role: 'moderator' as const // or 'user'
};

const Blog = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Community Blog</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore stories, insights, and experiences from our community. Find inspiration and connection through shared journeys.
            </p>
          </div>
          
          <BlogSection currentUser={currentUserMock} />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
