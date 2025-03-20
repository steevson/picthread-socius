
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Story from './Story';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Sample data
const STORIES = [
  { id: 1, username: 'Your story', image: 'https://source.unsplash.com/random/300x300/?portrait&sig=1', isAddNew: true },
  { id: 2, username: 'emma_wilson', image: 'https://source.unsplash.com/random/300x300/?portrait&sig=2' },
  { id: 3, username: 'john.doe', image: 'https://source.unsplash.com/random/300x300/?portrait&sig=3' },
  { id: 4, username: 'sarah_95', image: 'https://source.unsplash.com/random/300x300/?portrait&sig=4', seen: true },
  { id: 5, username: 'alex_design', image: 'https://source.unsplash.com/random/300x300/?portrait&sig=5' },
  { id: 6, username: 'maria.j', image: 'https://source.unsplash.com/random/300x300/?portrait&sig=6' },
  { id: 7, username: 'thomas_k', image: 'https://source.unsplash.com/random/300x300/?portrait&sig=7' },
  { id: 8, username: 'lisa.ann', image: 'https://source.unsplash.com/random/300x300/?portrait&sig=8', seen: true },
  { id: 9, username: 'mike_sports', image: 'https://source.unsplash.com/random/300x300/?portrait&sig=9' },
  { id: 10, username: 'jessica_t', image: 'https://source.unsplash.com/random/300x300/?portrait&sig=10' },
  { id: 11, username: 'david.music', image: 'https://source.unsplash.com/random/300x300/?portrait&sig=11' },
  { id: 12, username: 'rachel_f', image: 'https://source.unsplash.com/random/300x300/?portrait&sig=12', seen: true },
];

const StoryList = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -240, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  const handleAddNewStory = () => {
    navigate('/add-post');
    toast({
      title: "Create a post",
      description: "Share a photo with your followers",
      duration: 2000,
    });
  };

  const handleStoryClick = (id: number, username: string) => {
    if (id !== 1) { // Not the "Add new" story
      console.log(`Viewing ${username}'s story`);
    }
  };

  return (
    <div className="relative w-full my-4">
      <div 
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto py-2 px-1 scroll-hidden"
      >
        {STORIES.map((story) => (
          <Story
            key={story.id}
            username={story.username}
            image={story.image}
            seen={story.seen}
            isAddNew={story.isAddNew}
            onClick={story.isAddNew ? handleAddNewStory : () => handleStoryClick(story.id, story.username)}
          />
        ))}
      </div>
      
      {/* Navigation arrows */}
      <button 
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 bg-white/90 dark:bg-gray-800/90 rounded-full p-1 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-smooth hidden md:block"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      
      <button 
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 bg-white/90 dark:bg-gray-800/90 rounded-full p-1 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-smooth hidden md:block"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default StoryList;
