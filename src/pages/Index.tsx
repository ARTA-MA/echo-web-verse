
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDownIcon, ArrowRightIcon, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

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
      window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { type: 'register' } }));
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section with Enhanced Parallax Effect */}
      <div
        ref={heroRef}
        className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
        style={{ 
          backgroundImage: "linear-gradient(180deg, rgba(107,33,168,0.1) 0%, rgba(255,255,255,0) 100%)",
        }}
      >
        {/* Enhanced Background elements with parallax effect */}
        <MotionDiv 
          className="absolute inset-0 z-0"
          style={{ 
            opacity: 1 - scrollY / 700,
          }}
          animate={{
            backgroundPosition: `${scrollY * 0.05}px ${scrollY * 0.05}px`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-transparent dark:from-purple-900/10 dark:to-transparent"></div>
        </MotionDiv>
        
        <MotionDiv 
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 bg-purple-600"
          animate={{ 
            x: -scrollY * 0.3,
            y: scrollY * 0.2,
            scale: 1 - scrollY * 0.0005,
          }}
          transition={{ type: "spring", stiffness: 10 }}
        />
        
        <MotionDiv 
          className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-10 bg-indigo-600"
          animate={{ 
            x: scrollY * 0.3,
            y: -scrollY * 0.2,
            scale: 1 - scrollY * 0.0005,
          }}
          transition={{ type: "spring", stiffness: 10 }}
        />

        {/* Animated particles */}
        <div className="particle-container absolute inset-0 z-0 overflow-hidden opacity-60">
          {Array.from({ length: 15 }).map((_, i) => (
            <MotionDiv
              key={i}
              className="absolute rounded-full bg-purple-400 dark:bg-purple-600"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * -100 - 50],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
        
        {/* Hero content with enhanced animations */}
        <div className="container relative z-10 mx-auto px-4 text-center mt-16 md:mt-24">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome {user ? username : ""} to EchoWeb
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
                className="btn-primary group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Get Started <ArrowRightIcon className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
              </MotionButton>
              
              <MotionButton 
                variant="outline" 
                className="hover-scale"
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
          
          <MotionDiv
            className="mt-16"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDownIcon
              className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
            />
          </MotionDiv>
        </div>
      </div>

      {/* Features Section with animations */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
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
              Explore the powerful features that make EchoWeb stand out from traditional websites.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Responsive Design",
                description: "Perfectly adapts to any screen size with mobile-first approach",
                icon: "📱"
              },
              {
                title: "Interactive Elements",
                description: "Micro-interactions and hover effects that improve user engagement",
                icon: "✨"
              },
              {
                title: "Dark & Light Mode",
                description: "Switch between themes with smooth transitions for better viewing",
                icon: "🌓"
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
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with enhanced gradient and animations */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-800"></div>
        <MotionDiv
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
            backgroundSize: "30px 30px",
          }}
        ></MotionDiv>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience EchoWeb?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join our community and start building amazing web experiences today.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <MotionButton 
                size="lg"
                onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { type: 'register' } }))}
                className="bg-white text-purple-700 hover:bg-gray-100"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px 0 rgba(255,255,255,0.5)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Create Account
              </MotionButton>
              
              <MotionButton
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px 0 rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { type: 'login' } }))}
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
