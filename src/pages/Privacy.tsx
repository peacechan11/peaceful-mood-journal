
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn how we collect, use, and protect your information at PeaceSync.
            </p>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section>
              <h2>Introduction</h2>
              <p>
                At PeaceSync, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this policy carefully to understand our practices regarding your personal data.
              </p>
            </section>
            
            <section>
              <h2>Information We Collect</h2>
              <p>
                We collect several types of information to provide and improve our service to you:
              </p>
              <ul>
                <li><strong>Personal Information</strong>: Email address, name, and other details you provide when registering.</li>
                <li><strong>Content</strong>: Journal entries, mood tracking data, and community posts you create.</li>
                <li><strong>Usage Data</strong>: Information about how you use our platform, including access times and pages viewed.</li>
                <li><strong>Technical Data</strong>: IP address, browser type, device information, and cookies.</li>
              </ul>
            </section>
            
            <section>
              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Personalize your experience</li>
                <li>Communicate with you about updates or changes</li>
                <li>Analyze usage patterns to enhance our platform</li>
                <li>Protect against unauthorized access and misuse</li>
              </ul>
            </section>
            
            <section>
              <h2>Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
              </p>
            </section>
            
            <section>
              <h2>Your Data Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccuracies in your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing your personal information</li>
              </ul>
            </section>
            
            <section>
              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@peacesync.com.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
