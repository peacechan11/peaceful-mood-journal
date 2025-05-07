
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogSection from '@/components/BlogSection';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { seedBlogData } from '@/utils/seedBlogData';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const Blog = () => {
  const { user, userRole } = useAuth();
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeedData = async () => {
    setIsSeeding(true);
    try {
      await seedBlogData();
    } finally {
      setIsSeeding(false);
    }
  };

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
            
            {userRole === 'moderator' && (
              <div className="mt-4">
                <Button 
                  onClick={handleSeedData} 
                  disabled={isSeeding}
                  variant="outline"
                  size="sm"
                >
                  {isSeeding ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Seeding Data...
                    </>
                  ) : (
                    'Seed Sample Blog Posts'
                  )}
                </Button>
              </div>
            )}
          </div>
          
          <BlogSection 
            currentUser={user ? {
              id: user.id,
              name: user.user_metadata.username || user.email?.split('@')[0] || 'User',
              role: userRole || 'user'
            } : undefined} 
          />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
