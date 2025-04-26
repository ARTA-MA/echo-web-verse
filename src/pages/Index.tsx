
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDownIcon, ArrowRightIcon, CheckCircle } from "lucide-react";

// Importing motion as a workaround since it's not installed
const MotionDiv = ({ children, ...props }: any) => <div {...props}>{children}</div>;
const MotionButton = ({ children, ...props }: any) => <Button {...props}>{children}</Button>;

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Would come from auth context in real app
  const [username, setUsername] = useState("Guest"); // Would come from auth context in real app

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
    if (!isLoggedIn) {
      window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { type: 'register' } }));
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section with Parallax Effect */}
      <div
        ref={heroRef}
        className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
        style={{ 
          backgroundImage: "linear-gradient(180deg, rgba(107,33,168,0.1) 0%, rgba(255,255,255,0) 100%)",
        }}
      >
        {/* Background elements with parallax effect */}
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            transform: `translateY(${scrollY * 0.5}px)`,
            opacity: 1 - scrollY / 700,
            backgroundImage: "radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 0%, rgba(255, 255, 255, 0) 70%)",
          }}
        />
        
        <div 
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 bg-purple-600"
          style={{ 
            transform: `translate(${-scrollY * 0.3}px, ${scrollY * 0.2}px)`,
          }}
        />
        
        <div 
          className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-10 bg-indigo-600"
          style={{ 
            transform: `translate(${scrollY * 0.3}px, ${-scrollY * 0.2}px)`,
          }}
        />
        
        {/* Hero content */}
        <div className="container relative z-10 mx-auto px-4 text-center mt-16 md:mt-24">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome {isLoggedIn ? username : ""} to EchoWeb
              </span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Experience the next generation of dynamic web interfaces with parallax scrolling, 
              smooth animations, and interactive elements.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MotionButton
                onClick={handleCTAClick}
                className="btn-primary group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started <ArrowRightIcon className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
              </MotionButton>
              
              <Button variant="outline" className="hover-scale">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="mt-16 animate-float">
            <ArrowDownIcon
              className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Feature Highlights
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore the powerful features that make EchoWeb stand out from traditional websites.
            </p>
          </div>

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
              <div 
                key={index}
                className="glass-card p-6 hover-scale"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience EchoWeb?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join our community and start building amazing web experiences today.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg"
              onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { type: 'register' } }))}
              className="bg-white text-purple-700 hover:bg-gray-100 hover-scale"
            >
              Create Account
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 hover-scale"
              onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { type: 'login' } }))}
            >
              Login
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
