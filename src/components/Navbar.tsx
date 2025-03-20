
import React, { useState } from 'react';
import { Bell, Camera, Home, Menu, MessageSquare, Plus, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import NotificationPanel from './NotificationPanel';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold tracking-tight">InstaClone</h1>
        </div>

        {/* Search - Hide on mobile */}
        <div className="hidden md:flex items-center max-w-sm flex-1 mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-full rounded-full bg-secondary text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-1 md:space-x-2">
          <button className="p-2 rounded-full hover:bg-secondary transition-smooth">
            <Home className="h-5 w-5" />
          </button>
          
          <button className="p-2 rounded-full hover:bg-secondary transition-smooth">
            <MessageSquare className="h-5 w-5" />
          </button>
          
          <button className="p-2 rounded-full hover:bg-secondary transition-smooth">
            <Plus className="h-5 w-5" />
          </button>
          
          <button className="p-2 rounded-full hover:bg-secondary transition-smooth">
            <Camera className="h-5 w-5" />
          </button>
          
          <button 
            className={cn(
              "p-2 rounded-full hover:bg-secondary transition-smooth relative",
              showNotifications && "bg-secondary"
            )}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="p-2 rounded-full hover:bg-secondary transition-smooth">
            <User className="h-5 w-5" />
          </button>
          
          {isMobile && (
            <button className="p-2 md:hidden rounded-full hover:bg-secondary transition-smooth">
              <Menu className="h-5 w-5" />
            </button>
          )}
        </nav>
      </div>
      
      {showNotifications && (
        <div className="fixed top-14 right-0 md:right-4 w-full md:w-80 h-[calc(100vh-3.5rem)] z-50 animate-slide-in">
          <NotificationPanel onClose={() => setShowNotifications(false)} />
        </div>
      )}
    </header>
  );
};

export default Navbar;
