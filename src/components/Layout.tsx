
import React from 'react';
import Navbar from './Navbar';
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className={cn("flex-1 container mx-auto px-4 py-4 md:px-6 animate-fade-in", className)}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
