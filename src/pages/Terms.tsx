
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 bg-gradient-to-b from-background to-muted/20">
        <motion.div
          className="container-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-10 text-center">
            <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-serenity-100 flex items-center justify-center">
              <FileText className="h-6 w-6 text-secondary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using PeaceSync.
            </p>
          </div>
          
          <Card className="shadow-md border-serenity-100/50 dark:border-serenity-700/30">
            <CardContent className="pt-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                  <div className="bg-muted/50 rounded-lg p-5">
                    <p className="text-muted-foreground">
                      By accessing or using PeaceSync, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                    </p>
                  </div>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">2. User Accounts</h2>
                  <p className="text-muted-foreground mb-4">
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                  </p>
                  <div className="bg-serenity-50/50 dark:bg-serenity-900/20 border border-serenity-200/50 dark:border-serenity-700/30 rounded-lg p-5">
                    <p className="text-muted-foreground">
                      You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
                    </p>
                  </div>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">3. Content</h2>
                  <p className="text-muted-foreground mb-4">
                    Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material. You are responsible for the content that you post to the service, including its legality, reliability, and appropriateness.
                  </p>
                  <div className="border-l-4 border-secondary pl-4 py-1 mb-4">
                    <p className="text-muted-foreground">
                      When you post content to the Community section, you grant PeaceSync a non-exclusive license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the service.
                    </p>
                  </div>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">4. Prohibited Uses</h2>
                  <p className="text-muted-foreground mb-4">You agree not to use the service:</p>
                  <div className="bg-muted/30 p-4 rounded-lg space-y-2 mb-4">
                    <div className="flex items-start">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive text-xs font-medium mr-2">✕</span>
                      <span>In any way that violates any applicable national or international law or regulation</span>
                    </div>
                    <div className="flex items-start">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive text-xs font-medium mr-2">✕</span>
                      <span>To harass, abuse, or harm another person</span>
                    </div>
                    <div className="flex items-start">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive text-xs font-medium mr-2">✕</span>
                      <span>To impersonate or attempt to impersonate another user or person</span>
                    </div>
                    <div className="flex items-start">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive text-xs font-medium mr-2">✕</span>
                      <span>To engage in any other conduct that restricts or inhibits anyone's use of the service</span>
                    </div>
                  </div>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Termination</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted/30 p-5 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                      </p>
                    </div>
                    <div className="bg-muted/30 p-5 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Upon termination, your right to use the service will immediately cease. If you wish to terminate your account, you may simply discontinue using the service.
                      </p>
                    </div>
                  </div>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">6. Changes</h2>
                  <div className="bg-serenity-50/50 dark:bg-serenity-900/20 border border-serenity-200/50 dark:border-serenity-700/30 rounded-lg p-5">
                    <p className="text-muted-foreground">
                      We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
                    </p>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Us</h2>
                  <div className="bg-muted rounded-lg p-6 flex flex-col items-center">
                    <p className="text-center text-muted-foreground mb-4">
                      If you have any questions about these Terms, please contact us at:
                    </p>
                    <a href="mailto:terms@peacesync.com" className="text-secondary font-medium hover:underline">
                      terms@peacesync.com
                    </a>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
