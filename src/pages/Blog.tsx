
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogSection from '@/components/BlogSection';
import BlogTable from '@/components/BlogTable';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Blog = () => {
  const { user, userRole } = useAuth();

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
          
          <Tabs defaultValue="posts">
            <TabsList className="mb-8">
              <TabsTrigger value="posts">All Posts</TabsTrigger>
              {userRole === 'moderator' && (
                <TabsTrigger value="manage">Manage Posts</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="posts">
              <BlogSection 
                currentUser={user ? {
                  id: user.id,
                  name: user.user_metadata.username || user.email?.split('@')[0] || 'User',
                  role: userRole || 'user'
                } : undefined} 
                showBothSampleAndRealPosts={true}
                sortByDateDesc={true}
              />
            </TabsContent>
            
            {userRole === 'moderator' && (
              <TabsContent value="manage">
                <BlogTable />
              </TabsContent>
            )}
          </Tabs>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
