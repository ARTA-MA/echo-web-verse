import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDownIcon, ArrowRightIcon, Smartphone, Sparkles, Sun } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import BackgroundAnimation from "@/components/BackgroundAnimation";

const MotionDiv = motion.div;
const MotionButton = motion(Button);

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const { user } = useAuth();
  const username = user?.user_metadata?.username || "Guest";

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCTAClick = () => {
    if (!user) {
      window.dispatchEvent(new CustomEvent('open-auth-modal', {
        detail: { type: 'register' }
      }));
    }
  };

  const scrollToFeatures = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <BackgroundAnimation />
      
      {/* Hero Section with Enhanced Parallax Effect */}
      <div ref={heroRef} className="relative flex flex-col items-center justify-center min-h-screen">
        {/* Enhanced Background elements with parallax effect */}
        <MotionDiv
          className="absolute inset-0 z-0"
          style={{ opacity: 1 - scrollY / 700 }}
          animate={{ backgroundPosition: `${scrollY * 0.05}px ${scrollY * 0.05}px` }}
        />
        
        {/* Hero content with enhanced animations */}
        <div className="container relative z-10 mx-auto px-4 text-center mt-16 md:mt-24">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome {user ? username : ""} to Arta's Website
              </span>
            </h1>
            
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                Experience the next generation of dynamic web interfaces with parallax scrolling, 
                smooth animations, and interactive elements.
              </p>
            </MotionDiv>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MotionButton
                onClick={handleCTAClick}
                className="btn-primary group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span className="relative z-10">Get Started</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <ArrowRightIcon className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
              </MotionButton>
              
              <MotionButton
                variant="outline"
                className="hover-scale relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Learn More
              </MotionButton>
            </div>
          </MotionDiv>
          
          <MotionButton
            onClick={scrollToFeatures}
            variant="ghost"
            className="mt-16"
            whileHover={{ scale: 1.1 }}
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowDownIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </MotionButton>
        </div>
      </div>

      {/* Features Section with animations */}
      <section className="py-24 relative">
        <BackgroundAnimation className="opacity-50" />
        <div className="container mx-auto px-4">
          <MotionDiv
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Feature Highlights
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore the powerful features that make our platform stand out.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Responsive Design",
                description: "Perfectly adapts to any screen size with mobile-first approach",
                icon: <Smartphone className="w-8 h-8 text-purple-600" />
              },
              {
                title: "Interactive Elements",
                description: "Micro-interactions and hover effects that improve user engagement",
                icon: <Sparkles className="w-8 h-8 text-purple-600" />
              },
              {
                title: "Dark & Light Mode",
                description: "Switch between themes with smooth transitions for better viewing",
                icon: <Sun className="w-8 h-8 text-purple-600" />
              }
            ].map((feature, index) => (
              <MotionDiv
                key={index}
                className="glass-card p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with enhanced gradient and animations */}
      <section className="py-24 relative overflow-hidden">
        <BackgroundAnimation className="opacity-30" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="glass-card p-12 backdrop-blur-lg"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience More?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join our community and start building amazing web experiences today.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <MotionButton
                size="lg"
                onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', {
                  detail: { type: 'register' }
                }))}
                className="bg-purple-600 text-white hover:bg-purple-700"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px 0 rgba(139, 92, 246, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Create Account
              </MotionButton>
              
              <MotionButton
                variant="outline"
                size="lg"
                onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', {
                  detail: { type: 'login' }
                }))}
                className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px 0 rgba(139, 92, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </MotionButton>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
};

export default Index;
