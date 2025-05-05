
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutUs = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn about our mission, vision, and the team behind PeaceSync.
            </p>
          </div>
          
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-lg">
                At PeaceSync, our mission is to empower individuals on their journey toward mental wellness by providing accessible tools for self-reflection, emotional awareness, and community support. We believe that everyone deserves access to resources that nurture their mental and emotional wellbeing.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-lg mb-4">
                PeaceSync was founded in 2023 by a team of mental health advocates, technology enthusiasts, and wellness practitioners who recognized the need for accessible digital tools to support mental wellbeing in our increasingly connected world.
              </p>
              <p className="text-lg">
                Having experienced the challenges of maintaining mental wellness firsthand, our founders envisioned a platform that combines personal tracking tools with community support — creating a holistic approach to emotional health that acknowledges both the individual journey and the power of shared experiences.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-medium mb-3">Self-Reflection</h3>
                  <p>
                    We provide tools like personalized journaling to help users process thoughts and emotions in a safe, private space.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-medium mb-3">Awareness</h3>
                  <p>
                    Our mood tracking features help users recognize patterns in their emotional wellbeing and identify triggers.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-medium mb-3">Community</h3>
                  <p>
                    We foster a supportive environment where users can share experiences and wisdom while maintaining personal boundaries.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium">Accessibility</h3>
                  <p>We strive to make mental wellness tools available to everyone, regardless of background or circumstances.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium">Privacy</h3>
                  <p>We respect user privacy and maintain the highest standards of data protection and security.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium">Inclusivity</h3>
                  <p>We recognize and celebrate the diversity of human experiences and perspectives.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium">Evidence-Based</h3>
                  <p>Our features are informed by current research in psychology, mindfulness, and digital wellness.</p>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
