
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Book, Users, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Index = () => {
  const features = [
    {
      title: 'Track Your Mood',
      description: 'Record your daily emotions and identify patterns over time with intuitive visualizations.',
      icon: Heart,
      color: 'bg-lavender-400',
      link: '/mood',
    },
    {
      title: 'Private Journaling',
      description: 'Write securely encrypted journal entries with rich text and media attachments.',
      icon: Book,
      color: 'bg-serenity-400',
      link: '/journal',
    },
    {
      title: 'Community Support',
      description: 'Connect with others, share experiences, and find support in our moderated community.',
      icon: Users,
      color: 'bg-calm-400',
      link: '/blog',
    },
    {
      title: 'Privacy First',
      description: 'Your data is encrypted and secure. We prioritize your privacy above all else.',
      icon: Shield,
      color: 'bg-peace-400',
      link: '/privacy', // Changed from '/' to '/privacy'
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
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-tranquil dark:bg-gradient-to-br dark:from-gray-900 dark:via-lavender-900/20 dark:to-serenity-900/20 -z-10" />
          
          {/* Animated wave background */}
          <div className="absolute inset-0 -z-5 overflow-hidden">
            <div className="waves h-full w-full">
              <svg 
                className="waves-svg w-full h-[40%] min-h-[200px]"
                xmlns="http://www.w3.org/2000/svg" 
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28" 
                preserveAspectRatio="none"
              >
                <defs>
                  <path 
                    id="gentle-wave" 
                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" 
                    fill="none"
                  />
                </defs>
                <g className="parallax">
                  <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(147, 51, 234, 0.05)" className="animate-gentle-wave-1" />
                  <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(139, 92, 246, 0.07)" className="animate-gentle-wave-2" />
                  <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(20, 184, 166, 0.05)" className="animate-gentle-wave-3" />
                </g>
              </svg>
            </div>

            <div className="absolute top-0 right-0 -z-10 h-80 w-80 rounded-full bg-lavender-200/20 dark:bg-lavender-900/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 -z-10 h-64 w-64 rounded-full bg-serenity-200/20 dark:bg-serenity-900/20 blur-3xl" />
          </div>
          
          <div className="container-tight relative">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-glass mx-auto max-w-3xl border border-white/20 dark:border-white/5"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  <span className="bg-gradient-peaceful bg-clip-text text-transparent">
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
                    className="bg-peace-500 hover:bg-peace-600 text-white shadow-peace"
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
                    className="border-peace-200 dark:border-peace-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm"
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
        <section className="py-16 md:py-24 bg-white/70 dark:bg-gray-950/70 backdrop-blur-sm">
          <div className="container-tight">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-gradient-peaceful bg-clip-text text-transparent">
                    Features Designed for Your Wellbeing
                  </span>
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
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-subtle hover:shadow-peace transition-all duration-500 border border-white/50 dark:border-white/5 group"
                  custom={i}
                  initial="initial"
                  animate="animate"
                  variants={fadeIn}
                >
                  <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 shadow-inner-glow`}>
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
        <section className="py-16 md:py-24 bg-gradient-to-b from-white/80 to-lavender-50/80 dark:from-gray-900/80 dark:to-gray-950/80 backdrop-blur-sm">
          <div className="container-tight">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-gradient-peaceful bg-clip-text text-transparent">
                    What Our Community Says
                  </span>
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
                  className="glass-card rounded-xl p-6 shadow-glass-sm relative"
                  custom={i}
                  initial="initial"
                  animate="animate"
                  variants={fadeIn}
                >
                  <div className="absolute -top-5 left-6 text-4xl text-peace-300 dark:text-peace-600">
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
                        className="h-10 w-10 rounded-full ring-2 ring-peace-200 dark:ring-peace-800"
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
            <div className="bg-gradient-peaceful rounded-2xl p-8 md:p-12 text-white shadow-peace">
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
                    className="bg-white text-peace-600 hover:bg-white/90 hover:text-peace-700 shadow-glow"
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
