
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface StoryItem {
  id: number;
  image: string;
  timeAgo: string;
}

interface StoryProps {
  image: string;
  username: string;
  seen?: boolean;
  isAddNew?: boolean;
  onClick?: () => void;
  stories?: StoryItem[];
}

const Story = ({ 
  image, 
  username, 
  seen = false, 
  isAddNew = false, 
  onClick,
  stories = [{ id: 1, image, timeAgo: 'now' }] 
}: StoryProps) => {
  const [storyOpen, setStoryOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progressValues, setProgressValues] = useState<number[]>(stories.map(() => 0));
  const [isPlaying, setIsPlaying] = useState(true);

  const handleStoryClick = () => {
    if (isAddNew) {
      if (onClick) onClick();
    } else {
      setStoryOpen(true);
      setCurrentStoryIndex(0);
      startStoryProgress();
    }
  };

  const startStoryProgress = () => {
    setIsPlaying(true);
    setProgressValues(prev => {
      const newValues = [...prev];
      newValues[currentStoryIndex] = 0;
      return newValues;
    });
  };

  const nextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      startStoryProgress();
    } else {
      setStoryOpen(false);
    }
  };

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      startStoryProgress();
    }
  };

  React.useEffect(() => {
    if (!storyOpen || !isPlaying) return;
    
    const interval = setInterval(() => {
      setProgressValues(prev => {
        const newValues = [...prev];
        if (newValues[currentStoryIndex] < 100) {
          newValues[currentStoryIndex] += 1;
        } else {
          clearInterval(interval);
          setTimeout(() => nextStory(), 300);
        }
        return newValues;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, [storyOpen, currentStoryIndex, isPlaying]);

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleResume = () => {
    setIsPlaying(true);
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
        <DialogContent className="sm:max-w-md md:max-w-xl p-0 bg-black overflow-hidden">
          <div className="relative h-[80vh]">
            {/* Progress bars */}
            <div className="absolute top-0 left-0 right-0 z-10 flex px-2 pt-2 gap-1">
              {stories.map((_, index) => (
                <Progress 
                  key={index} 
                  value={progressValues[index]} 
                  className="h-1 flex-1" 
                />
              ))}
            </div>
            
            {/* Header */}
            <DialogHeader className="absolute top-0 left-0 right-0 z-10 px-4 pt-6">
              <DialogTitle className="flex items-center space-x-2 text-white">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img src={image} alt={username} className="w-full h-full object-cover" />
                </div>
                <span>{username}</span>
                <span className="text-xs text-gray-300 font-normal">
                  {stories[currentStoryIndex]?.timeAgo || 'now'}
                </span>
              </DialogTitle>
              <button 
                onClick={() => setStoryOpen(false)}
                className="absolute right-4 top-6 rounded-sm opacity-70 text-white hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </DialogHeader>
            
            {/* Story Content */}
            <div 
              className="h-full w-full flex items-center justify-center"
              onTouchStart={handlePause}
              onTouchEnd={handleResume}
              onMouseDown={handlePause}
              onMouseUp={handleResume}
            >
              <img 
                src={stories[currentStoryIndex]?.image || image} 
                alt={`${username}'s story`} 
                className="h-full w-full object-contain"
              />
            </div>
            
            {/* Navigation buttons */}
            <button 
              onClick={prevStory}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-black/30 flex items-center justify-center text-white"
              style={{ display: currentStoryIndex === 0 ? 'none' : 'flex' }}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextStory}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-black/30 flex items-center justify-center text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            
            {/* Left/Right click areas for navigation */}
            <div 
              className="absolute top-0 left-0 w-1/2 h-full cursor-pointer" 
              onClick={prevStory}
            />
            <div 
              className="absolute top-0 right-0 w-1/2 h-full cursor-pointer" 
              onClick={nextStory}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Story;
