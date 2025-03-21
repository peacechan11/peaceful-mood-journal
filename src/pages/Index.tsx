
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Book, Users, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Index = () => {
  const features = [
    {
      title: 'Track Your Mood',
      description: 'Record your daily emotions and identify patterns over time with intuitive visualizations.',
      icon: BarChart2,
      color: 'bg-blue-500',
      link: '/mood',
    },
    {
      title: 'Private Journaling',
      description: 'Write securely encrypted journal entries with rich text and media attachments.',
      icon: Book,
      color: 'bg-purple-500',
      link: '/journal',
    },
    {
      title: 'Community Support',
      description: 'Connect with others, share experiences, and find support in our moderated community.',
      icon: Users,
      color: 'bg-orange-500',
      link: '/blog',
    },
    {
      title: 'Privacy First',
      description: 'Your data is encrypted and secure. We prioritize your privacy above all else.',
      icon: Shield,
      color: 'bg-green-500',
      link: '/',
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-peace-50 to-serenity-50 dark:from-gray-900 dark:to-gray-800 -z-10" />
          <div className="absolute inset-0 -z-10">
            <svg
              className="absolute right-0 top-0 h-full w-full opacity-20 dark:opacity-10"
              viewBox="0 0 800 800"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="grain" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feBlend in="SourceGraphic" in2="blur" mode="overlay" result="blend" />
                </filter>
              </defs>
              <rect width="100%" height="100%" filter="url(#grain)" />
            </svg>
          </div>
          
          <div className="container-tight">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  <span className="bg-gradient-to-r from-peace-600 to-serenity-600 bg-clip-text text-transparent">
                    Peace
                  </span>
                  <span className="text-foreground">Sync</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  Your personal space for mindfulness, self-reflection, and community support. Track your emotional journey and connect with others walking the same path.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-peace-500 hover:bg-peace-600 text-white"
                    asChild
                  >
                    <Link to="/mood">
                      Start Tracking
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    asChild
                  >
                    <Link to="/journal">
                      Try Journaling
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container-tight">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Features Designed for Your Wellbeing
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  PeaceSync combines powerful tools to help you track, understand, and improve your emotional health.
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow group"
                  custom={i}
                  initial="initial"
                  animate="animate"
                  variants={fadeIn}
                >
                  <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Link
                    to={feature.link}
                    className="text-peace-600 hover:text-peace-700 font-medium flex items-center text-sm"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-peace-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container-tight">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What Our Community Says
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Hear from people who have transformed their relationship with emotions and mental wellbeing.
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-border relative"
                  custom={i}
                  initial="initial"
                  animate="animate"
                  variants={fadeIn}
                >
                  <div className="absolute -top-5 left-6 text-4xl">
                    "
                  </div>
                  <p className="text-muted-foreground pt-4 mb-6">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-10 w-10 rounded-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container-tight">
            <div className="bg-gradient-to-r from-peace-500 to-serenity-500 rounded-xl p-8 md:p-12 text-white shadow-lg">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Begin Your Journey Today
                  </h2>
                  <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                    Take the first step toward better emotional awareness and mental wellbeing. It's free to get started.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-white text-peace-600 hover:bg-white/90 hover:text-peace-700"
                    asChild
                  >
                    <Link to="/mood">
                      Start Tracking Your Mood
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

const testimonials = [
  {
    text: "Tracking my mood daily has helped me identify patterns I never noticed before. I can now anticipate emotional dips and take proactive steps.",
    name: "Alex Chen",
    role: "Teacher",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    text: "The journaling feature has become my safe space. I process my thoughts here first, and it's made a huge difference in my emotional regulation.",
    name: "Maya Johnson",
    role: "Graphic Designer",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    text: "Finding others who understand what I'm going through has been invaluable. The community here is supportive without being intrusive.",
    name: "Jordan Smith",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/150?img=7",
  },
];

export default Index;
