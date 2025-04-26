
import { useState, useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  // Listen for custom events to open the modal
  useEffect(() => {
    const handleOpenModal = (e: CustomEvent) => {
      setActiveTab(e.detail?.type || "login");
      setIsOpen(true);
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would communicate with our backend
    console.log("Login attempt with:", loginData);
    
    toast({
      title: "Login Successful",
      description: "Welcome back to EchoWeb!",
    });
    
    setIsOpen(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch) {
      toast({
        title: "Error",
        description: "Passwords do not match!",
        variant: "destructive"
      });
      return;
    }

    // In a real implementation, this would communicate with our backend
    console.log("Registration attempt with:", registerData);
    
    toast({
      title: "Registration Successful",
      description: "Your account has been created!",
    });
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="sm:max-w-[425px] bg-white dark:bg-gray-900 animate-fade-in">
        <Dialog.Header>
          <Dialog.Title className="text-center text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {activeTab === "login" ? "Welcome Back" : "Join EchoWeb"}
          </Dialog.Title>
          <Dialog.Description className="text-center text-muted-foreground">
            {activeTab === "login"
              ? "Enter your credentials to access your account"
              : "Create an account to get started"}
          </Dialog.Description>
        </Dialog.Header>
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")} className="mt-5">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Login
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="mt-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
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
                />
              </div>
              <div className="space-y-2">
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
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
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={!passwordsMatch}
              >
                Register
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Dialog.Content>
    </Dialog>
  );
};

export default AuthModal;
