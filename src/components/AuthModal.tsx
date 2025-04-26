
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";

const MotionDiv = motion.div;

const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { signIn, signUp } = useAuth();

  // Listen for custom events to open the modal
  useEffect(() => {
    const handleOpenModal = (e: CustomEvent) => {
      setActiveTab(e.detail?.type || "login");
      setIsOpen(true);
      // Reset states
      setIsSubmitting(false);
      setIsSuccess(false);
    };

    window.addEventListener('open-auth-modal', handleOpenModal as EventListener);
    
    return () => {
      window.removeEventListener('open-auth-modal', handleOpenModal as EventListener);
    };
  }, []);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...registerData, [e.target.name]: e.target.value };
    setRegisterData(newData);
    
    if (e.target.name === "confirmPassword" || e.target.name === "password") {
      setPasswordsMatch(
        newData.password === newData.confirmPassword || newData.confirmPassword === ""
      );
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await signIn(loginData.email, loginData.password);
      setIsSuccess(true);
      
      // Close modal after success animation completes
      setTimeout(() => {
        setIsOpen(false);
        // Reset form
        setLoginData({ email: "", password: "" });
      }, 1500);
    } catch (error) {
      // Error is handled in the auth context
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch) {
      return;
    }

    try {
      setIsSubmitting(true);
      await signUp(registerData.email, registerData.password, registerData.username);
      setIsSuccess(true);
      
      // Close modal after success animation completes
      setTimeout(() => {
        setIsOpen(false);
        // Reset form
        setRegisterData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }, 1500);
    } catch (error) {
      // Error is handled in the auth context
      setIsSubmitting(false);
    }
  };

  // Input field animation variants
  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1, 
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.4 }
    })
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900 animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {activeTab === "login" ? "Welcome Back" : "Join EchoWeb"}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {activeTab === "login"
              ? "Enter your credentials to access your account"
              : "Create an account to get started"}
          </DialogDescription>
        </DialogHeader>
        
        {isSuccess ? (
          <MotionDiv
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-8"
          >
            <MotionDiv
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 0.5 }}
              className="text-green-500 mb-4"
            >
              <CheckCircle size={56} />
            </MotionDiv>
            <h3 className="text-xl font-semibold mb-2">
              {activeTab === "login" ? "Login Successful!" : "Registration Complete!"}
            </h3>
            <p className="text-center text-muted-foreground">
              {activeTab === "login" 
                ? "Welcome back to EchoWeb." 
                : "Your account has been created successfully."}
            </p>
          </MotionDiv>
        ) : (
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")} className="mt-5">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <MotionDiv 
                  className="space-y-2"
                  custom={0}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </MotionDiv>
                
                <MotionDiv 
                  className="space-y-2"
                  custom={1}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </MotionDiv>
                
                <MotionDiv 
                  custom={2}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : "Login"}
                  </Button>
                </MotionDiv>
              </form>
            </TabsContent>
            
            <TabsContent value="register" className="mt-6">
              <form onSubmit={handleRegister} className="space-y-4">
                <MotionDiv 
                  className="space-y-2"
                  custom={0}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Label htmlFor="register-username">Username</Label>
                  <Input
                    id="register-username"
                    name="username"
                    type="text"
                    placeholder="johndoe"
                    value={registerData.username}
                    onChange={handleRegisterChange}
                    required
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </MotionDiv>
                
                <MotionDiv 
                  className="space-y-2"
                  custom={1}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </MotionDiv>
                
                <MotionDiv 
                  className="space-y-2"
                  custom={2}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    name="password"
                    type="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </MotionDiv>
                
                <MotionDiv 
                  className="space-y-2"
                  custom={3}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Label htmlFor="register-confirm-password">
                    Confirm Password
                    {!passwordsMatch && (
                      <span className="ml-2 text-sm text-red-500">Passwords do not match</span>
                    )}
                  </Label>
                  <Input
                    id="register-confirm-password"
                    name="confirmPassword"
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                    className={`w-full ${!passwordsMatch ? "border-red-500" : ""}`}
                    disabled={isSubmitting}
                  />
                </MotionDiv>
                
                <MotionDiv 
                  custom={4}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transition-all duration-300"
                    disabled={!passwordsMatch || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registering...
                      </>
                    ) : "Register"}
                  </Button>
                </MotionDiv>
              </form>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
