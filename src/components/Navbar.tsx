
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, MenuIcon, XIcon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 shadow-md backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
          >
            EchoWeb
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-purple-600 transition-colors">
              About
            </Link>
            <Link to="/comments" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Comments
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2"
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>
            
            <Button variant="outline" className="ml-4" onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { type: 'login' } }))}>
              Log in
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { type: 'register' } }))}>
              Sign up
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 py-5 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-purple-600 transition-colors">
              About
            </Link>
            <Link to="/comments" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Comments
            </Link>
            <div className="pt-2 flex items-center justify-between">
              <Button variant="outline" className="w-1/2 mr-2" onClick={() => {
                setIsMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { type: 'login' } }));
              }}>
                Log in
              </Button>
              <Button className="w-1/2 bg-purple-600 hover:bg-purple-700" onClick={() => {
                setIsMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { type: 'register' } }));
              }}>
                Sign up
              </Button>
            </div>
            <div className="flex items-center justify-center pt-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
                <span className="ml-2">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
