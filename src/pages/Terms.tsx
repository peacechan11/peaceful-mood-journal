
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using PeaceSync.
            </p>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section>
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using PeaceSync, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
              </p>
            </section>
            
            <section>
              <h2>2. User Accounts</h2>
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
              </p>
            </section>
            
            <section>
              <h2>3. Content</h2>
              <p>
                Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material. You are responsible for the content that you post to the service, including its legality, reliability, and appropriateness.
              </p>
              <p>
                When you post content to the Community section, you grant PeaceSync a non-exclusive license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the service.
              </p>
            </section>
            
            <section>
              <h2>4. Prohibited Uses</h2>
              <p>You agree not to use the service:</p>
              <ul>
                <li>In any way that violates any applicable national or international law or regulation</li>
                <li>To harass, abuse, or harm another person</li>
                <li>To impersonate or attempt to impersonate another user or person</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use of the service</li>
              </ul>
            </section>
            
            <section>
              <h2>5. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p>
                Upon termination, your right to use the service will immediately cease. If you wish to terminate your account, you may simply discontinue using the service.
              </p>
            </section>
            
            <section>
              <h2>6. Changes</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
              </p>
            </section>
            
            <section>
              <h2>7. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at terms@peacesync.com.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
