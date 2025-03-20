
import React from 'react';
import { cn } from '@/lib/utils';

interface StoryProps {
  image: string;
  username: string;
  seen?: boolean;
  isAddNew?: boolean;
  onClick?: () => void;
}

const Story = ({ image, username, seen = false, isAddNew = false, onClick }: StoryProps) => {
  return (
    <button 
      onClick={onClick}
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
  );
};

export default Story;
