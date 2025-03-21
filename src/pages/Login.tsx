
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      // Simulating API call for now
      setTimeout(() => {
        // For demo purposes, always succeed
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        navigate('/');
        setIsLoading(false);
      }, 1500);
      
      // Uncomment for real API integration
      /*
      const response = await fetch('/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || ['Login failed. Please check your credentials.']);
        setIsLoading(false);
        return;
      }

      // If login successful, redirect to home
      navigate('/');
      */
    } catch (error) {
      setErrors(['Network error. Please try again later.']);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        
        <div className="grid gap-6">
          <form onSubmit={handleSubmit}>
            {errors.length > 0 && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-4">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </Button>
            </div>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <Button variant="outline" type="button" className="flex items-center justify-center gap-2">
            <Facebook className="h-4 w-4" />
            <span>Login with Facebook</span>
          </Button>
          
          <div className="text-center text-sm">
            <Link 
              to="/reset-password" 
              className="underline text-sm text-muted-foreground hover:text-foreground"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="underline font-medium text-primary hover:text-primary/90">
            Sign up
          </Link>
        </p>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground mb-4">Get the app.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://apps.apple.com/app/instagram/id389801252" className="h-10 w-32">
            <img src="https://picsum.photos/128/40?random=appstore" alt="App Store" className="h-full w-full object-cover rounded" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.instagram.android" className="h-10 w-32">
            <img src="https://picsum.photos/128/40?random=googleplay" alt="Google Play" className="h-full w-full object-cover rounded" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
