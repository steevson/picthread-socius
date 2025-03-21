
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Facebook } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface RegisterFormData {
  email: string;
  fullName: string;
  username: string;
  password: string;
  profilePic?: File | null;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    fullName: '',
    username: '',
    password: '',
    profilePic: null,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        profilePic: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      // Simulating API call for now
      setTimeout(() => {
        // For demo purposes, always succeed and set auth
        localStorage.setItem('user', JSON.stringify({ 
          email: formData.email,
          username: formData.username,
          fullName: formData.fullName
        }));
        
        toast({
          title: "Registration successful",
          description: "Your account has been created.",
        });
        navigate('/');
        setIsLoading(false);
      }, 1500);
      
      // Uncomment for real API integration
      /*
      // Create FormData object for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('full_name', formData.fullName);
      formDataToSend.append('username', formData.username);
      formDataToSend.append('password', formData.password);
      
      if (formData.profilePic) {
        formDataToSend.append('profile_picture', formData.profilePic);
      }

      const response = await fetch('/api/register/', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || ['Registration failed. Please try again.']);
        setIsLoading(false);
        return;
      }

      // Set auth state if registration successful
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect to home
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
          <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Sign up to see photos and videos from your friends
          </p>
        </div>
        
        <div className="grid gap-6">
          <Button variant="outline" type="button" className="flex items-center justify-center gap-2">
            <Facebook className="h-4 w-4" />
            <span>Sign up with Facebook</span>
          </Button>
          
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
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="profilePic" className="text-sm font-medium">
                  Profile Picture (Optional)
                </Label>
                <Input
                  id="profilePic"
                  type="file"
                  name="profilePic"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="cursor-pointer"
                />
                {formData.profilePic && (
                  <p className="text-sm text-muted-foreground">{formData.profilePic.name}</p>
                )}
              </div>
              
              <div className="text-xs text-muted-foreground">
                <p>
                  By signing up, you agree to our{" "}
                  <a href="#" className="underline">Terms</a>,{" "}
                  <a href="#" className="underline">Privacy Policy</a> and{" "}
                  <a href="#" className="underline">Cookies Policy</a>.
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing up...' : 'Sign Up'}
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Have an account?{" "}
          <Link to="/login" className="underline font-medium text-primary hover:text-primary/90">
            Log in
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

export default Register;
