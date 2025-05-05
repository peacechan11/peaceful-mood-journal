
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy = () => {
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
            <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-lavender-100 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn how we collect, use, and protect your information at PeaceSync.
            </p>
          </div>
          
          <Card className="shadow-md border-peace-100/50 dark:border-peace-700/30">
            <CardContent className="pt-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
                  <p className="text-muted-foreground">
                    At PeaceSync, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this policy carefully to understand our practices regarding your personal data.
                  </p>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
                  <p className="text-muted-foreground mb-4">
                    We collect several types of information to provide and improve our service to you:
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium mr-2">•</span>
                        <span><strong>Personal Information</strong>: Email address, name, and other details you provide when registering.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium mr-2">•</span>
                        <span><strong>Content</strong>: Journal entries, mood tracking data, and community posts you create.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium mr-2">•</span>
                        <span><strong>Usage Data</strong>: Information about how you use our platform, including access times and pages viewed.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium mr-2">•</span>
                        <span><strong>Technical Data</strong>: IP address, browser type, device information, and cookies.</span>
                      </li>
                    </ul>
                  </div>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
                  <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="font-medium mb-2">Service Improvement</p>
                      <p className="text-sm text-muted-foreground">Provide, maintain, and improve our services</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="font-medium mb-2">Personalization</p>
                      <p className="text-sm text-muted-foreground">Tailor your experience to your preferences</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="font-medium mb-2">Communication</p>
                      <p className="text-sm text-muted-foreground">Keep you updated about changes and features</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="font-medium mb-2">Analysis & Security</p>
                      <p className="text-sm text-muted-foreground">Analyze usage patterns and protect against misuse</p>
                    </div>
                  </div>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
                  <div className="bg-peace-50/50 dark:bg-peace-900/20 border border-peace-200/50 dark:border-peace-700/30 rounded-lg p-5">
                    <p className="text-muted-foreground">
                      We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
                    </p>
                  </div>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Your Data Rights</h2>
                  <p className="text-muted-foreground mb-4">You have the right to:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-peace-100 text-peace-600 text-xs font-medium mr-2">✓</span>
                      <span>Access the personal information we hold about you</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-peace-100 text-peace-600 text-xs font-medium mr-2">✓</span>
                      <span>Correct inaccuracies in your personal information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-peace-100 text-peace-600 text-xs font-medium mr-2">✓</span>
                      <span>Request deletion of your personal information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-peace-100 text-peace-600 text-xs font-medium mr-2">✓</span>
                      <span>Object to processing of your personal information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-peace-100 text-peace-600 text-xs font-medium mr-2">✓</span>
                      <span>Request restriction of processing your personal information</span>
                    </li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                  <div className="bg-muted rounded-lg p-6 flex flex-col items-center">
                    <p className="text-center text-muted-foreground mb-4">
                      If you have any questions about this Privacy Policy, please contact us at:
                    </p>
                    <a href="mailto:privacy@peacesync.com" className="text-primary font-medium hover:underline">
                      privacy@peacesync.com
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

export default Privacy;
