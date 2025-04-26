import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, MenuIcon, XIcon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
const MotionDiv = motion.div;
const MotionLink = motion(Link);
const MotionButton = motion(Button);
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    theme,
    setTheme
  } = useTheme();
  const {
    user,
    signOut
  } = useAuth();
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Animation variants
  const navItemVariants = {
    hidden: {
      opacity: 0,
      y: -5
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.3
      }
    })
  };
  const mobileMenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  const mobileItemVariants = {
    closed: {
      opacity: 0,
      y: -10
    },
    open: {
      opacity: 1,
      y: 0
    }
  };
  const navLinks = [{
    path: "/",
    label: "Home"
  }, {
    path: "/about",
    label: "About"
  }, {
    path: "/comments",
    label: "Comments"
  }];
  return <MotionDiv initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.5,
    ease: "easeOut"
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-lg" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <MotionLink to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent" whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            EchoWeb
          </MotionLink>
          
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, i) => <MotionLink key={link.path} to={link.path} className={`text-sm font-medium transition-colors relative
                  ${location.pathname === link.path ? "text-purple-600" : "hover:text-purple-600"}`} custom={i} variants={navItemVariants} initial="hidden" animate="visible" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.95
          }}>
                {link.label}
                {location.pathname === link.path && <motion.div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600" layoutId="navbar-indicator" />}
              </MotionLink>)}
            
            <motion.div initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: 0.3
          }}>
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="ml-2 transition-all duration-500">
                {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </motion.div>
            
            {user ? <motion.div initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.4
          }}>
                <Button variant="outline" onClick={signOut} className="bg-gray-900 hover:bg-gray-800">
                  Sign out
                </Button>
              </motion.div> : <>
                <motion.div initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.4
            }}>
                  <Button variant="outline" onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', {
                detail: {
                  type: 'login'
                }
              }))}>
                    Log in
                  </Button>
                </motion.div>
                <motion.div initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.5
            }}>
                  <MotionButton className="bg-purple-600 hover:bg-purple-700" onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', {
                detail: {
                  type: 'register'
                }
              }))} whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                    Sign up
                  </MotionButton>
                </motion.div>
              </>}
          </div>
          
          <div className="md:hidden">
            <MotionButton variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} whileTap={{
            scale: 0.9
          }} className="transition-transform duration-200">
              {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </MotionButton>
          </div>
        </div>
      </div>
      
      {/* Mobile menu with animations */}
      <MotionDiv className="md:hidden overflow-hidden bg-white dark:bg-gray-900" initial="closed" animate={isMenuOpen ? "open" : "closed"} variants={mobileMenuVariants}>
        <div className="px-4 py-5 shadow-lg">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link, i) => <MotionLink key={link.path} to={link.path} className={`text-sm font-medium transition-colors ${location.pathname === link.path ? "text-purple-600" : "hover:text-purple-600"}`} variants={mobileItemVariants} whileTap={{
            scale: 0.95
          }}>
                {link.label}
              </MotionLink>)}
            <div className="pt-2 flex items-center justify-between">
              {user ? <MotionDiv variants={mobileItemVariants} className="w-full">
                  <Button variant="outline" className="w-full" onClick={signOut}>
                    Sign out
                  </Button>
                </MotionDiv> : <>
                  <MotionDiv variants={mobileItemVariants} className="w-1/2 mr-2">
                    <Button variant="outline" className="w-full" onClick={() => {
                  setIsMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('open-auth-modal', {
                    detail: {
                      type: 'login'
                    }
                  }));
                }}>
                      Log in
                    </Button>
                  </MotionDiv>
                  <MotionDiv variants={mobileItemVariants} className="w-1/2">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => {
                  setIsMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('open-auth-modal', {
                    detail: {
                      type: 'register'
                    }
                  }));
                }}>
                      Sign up
                    </Button>
                  </MotionDiv>
                </>}
            </div>
            <MotionDiv variants={mobileItemVariants} className="flex items-center justify-center pt-2">
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                <span className="ml-2">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </Button>
            </MotionDiv>
          </div>
        </div>
      </MotionDiv>
    </MotionDiv>;
};
export default Navbar;