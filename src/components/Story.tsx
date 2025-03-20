import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from 'lucide-react';

interface StoryProps {
  image: string;
  username: string;
  seen?: boolean;
  isAddNew?: boolean;
  onClick?: () => void;
}

const Story = ({ image, username, seen = false, isAddNew = false, onClick }: StoryProps) => {
  const [storyOpen, setStoryOpen] = useState(false);

  const handleStoryClick = () => {
    if (isAddNew) {
      if (onClick) onClick();
    } else {
      setStoryOpen(true);
    }
  };

  return (
    <>
      <button 
        onClick={handleStoryClick}
        className="flex flex-col items-center space-y-1 transition-smooth hover-scale"
      >
        <div className={cn(
          "relative w-16 h-16 rounded-full flex items-center justify-center",
          !seen && !isAddNew && "bg-gradient-to-tr from-amber-500 to-fuchsia-500 p-[2px]"
        )}>
          <div className="w-full h-full rounded-full overflow-hidden bg-secondary flex items-center justify-center">
            {isAddNew ? (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <span className="text-2xl font-light">+</span>
              </div>
            ) : (
              <img 
                src={image} 
                alt={username} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </div>
        </div>
        <span className="text-xs truncate w-16 text-center">{username}</span>
      </button>

      <Dialog open={storyOpen} onOpenChange={setStoryOpen}>
        <DialogContent className="sm:max-w-md md:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src={image} alt={username} className="w-full h-full object-cover" />
              </div>
              <span>{username}</span>
            </DialogTitle>
            <button 
              onClick={() => setStoryOpen(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 text-muted-foreground hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogHeader>
          <div className="aspect-[9/16] overflow-hidden bg-black flex items-center justify-center">
            <img 
              src={image} 
              alt={`${username}'s story`} 
              className="w-full h-full object-cover"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Story;
