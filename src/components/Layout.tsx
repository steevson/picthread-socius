
import React from 'react';
import Navbar from './Navbar';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  const { toast } = useToast();

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      toast({
        title: "Light mode activated",
        duration: 1500,
      });
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      toast({
        title: "Dark mode activated",
        duration: 1500,
      });
    }
    setIsDarkMode(!isDarkMode);
  };

  // Initialize theme based on local storage or system preference
  React.useEffect(() => {
    // Check if dark mode should be enabled
    if (
      localStorage.theme === 'dark' ||
      (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className={cn("flex-1 container mx-auto px-4 py-4 md:px-6 animate-fade-in", className)}>
        <div className="fixed bottom-5 right-5 z-50">
          <Button 
            size="icon" 
            variant="outline" 
            className="rounded-full w-10 h-10 bg-background/80 backdrop-blur-sm"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
