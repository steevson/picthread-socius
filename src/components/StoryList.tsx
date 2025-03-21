
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Story from './Story';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Define the StoryItem interface
interface StoryItem {
  id: number;
  image: string;
  timeAgo: string;
}

// Define the Story interface
interface StoryData {
  id: number;
  username: string;
  image: string;
  isAddNew?: boolean;
  seen?: boolean;
  stories?: StoryItem[];
}

// Interface for the Story component's expected structure
interface StoryWithRequiredStories {
  id: number;
  username: string;
  image: string;
  stories: StoryItem[];
}

// Sample data with multiple status items per user
const STORIES: StoryData[] = [
  { 
    id: 1, 
    username: 'Your story', 
    image: 'https://picsum.photos/200', 
    isAddNew: true,
    stories: [] // Add an empty stories array to fix the TypeScript error
  },
  { 
    id: 2, 
    username: 'emma_wilson', 
    image: 'https://picsum.photos/200',
    stories: [
      { id: 1, image: 'https://picsum.photos/200/300?random=2', timeAgo: '2h ago' },
      { id: 2, image: 'https://picsum.photos/200/300?random=22', timeAgo: '1h ago' },
      { id: 3, image: 'https://picsum.photos/200/300?random=23', timeAgo: '30m ago' }
    ]
  },
  { 
    id: 3, 
    username: 'john.doe', 
    image: 'https://picsum.photos/200',
    stories: [
      { id: 1, image: 'https://picsum.photos/200/300?random=3', timeAgo: '4h ago' },
      { id: 2, image: 'https://picsum.photos/200/300?random=33', timeAgo: '2h ago' }
    ]
  },
  { 
    id: 4, 
    username: 'sarah_95', 
    image: 'https://picsum.photos/200', 
    seen: true,
    stories: [
      { id: 1, image: 'https://picsum.photos/200/300?random=4', timeAgo: '8h ago' }
    ]
  },
  { 
    id: 5, 
    username: 'alex_design', 
    image: 'https://picsum.photos/200',
    stories: [
      { id: 1, image: 'https://picsum.photos/200/300?random=5', timeAgo: '3h ago' },
      { id: 2, image: 'https://picsum.photos/200/300?random=55', timeAgo: '1h ago' }
    ]
  },
  { 
    id: 6, 
    username: 'maria.j', 
    image: 'https://picsum.photos/200',
    stories: [
      { id: 1, image: 'https://picsum.photos/200/300?random=6', timeAgo: '5h ago' }
    ]
  },
  { 
    id: 7, 
    username: 'thomas_k', 
    image: 'https://picsum.photos/200',
    stories: [
      { id: 1, image: 'https://picsum.photos/200/300?random=7', timeAgo: '7h ago' },
      { id: 2, image: 'https://picsum.photos/200/300?random=77', timeAgo: '4h ago' },
      { id: 3, image: 'https://picsum.photos/200/300?random=78', timeAgo: '1h ago' }
    ]
  },
  { 
    id: 8, 
    username: 'lisa.ann', 
    image: 'https://picsum.photos/200', 
    seen: true,
    stories: [
      { id: 1, image: 'https://picsum.photos/200/300?random=8', timeAgo: '9h ago' }
    ]
  },
  { 
    id: 9, 
    username: 'mike_sports', 
    image: 'https://picsum.photos/200',
    stories: [
      { id: 1, image: 'https://picsum.photos/200/300?random=9', timeAgo: '2h ago' }
    ]
  },
  { 
    id: 10, 
    username: 'jessica_t', 
    image: 'https://picsum.photos/200',
    stories: [
      { id: 1, image: 'https://picsum.photos/200/300?random=10', timeAgo: '3h ago' },
      { id: 2, image: 'https://picsum.photos/200/300?random=110', timeAgo: '1h ago' }
    ]
  },
  { 
    id: 11, 
    username: 'david.music', 
    image: 'https://picsum.photos/200',
    stories: [
      { id: 1, image: 'https://picsum.photos/200/300?random=11', timeAgo: '6h ago' }
    ]
  },
  { 
    id: 12, 
    username: 'rachel_f', 
    image: 'https://picsum.photos/200', 
    seen: true,
    stories: [
      { id: 1, image: 'https://picsum.photos/200/300?random=12', timeAgo: '10h ago' }
    ]
  },
];

const StoryList = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeUserIndex, setActiveUserIndex] = useState(0);

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
    navigate('/add-status');
    toast({
      title: "Create a status",
      description: "Share a moment with your followers",
      duration: 2000,
    });
  };

  const handleStoryClick = (id: number, username: string, index: number) => {
    if (id !== 1) { // Not the "Your story" story
      console.log(`Viewing ${username}'s story`);
      setActiveUserIndex(index - 1); // -1 because we skip the "Your story" item
    }
  };

  // Filter out the "Your story" and make sure all stories have required properties
  const storiesForNavigation: StoryWithRequiredStories[] = STORIES.filter(
    (story): story is StoryWithRequiredStories => 
      !story.isAddNew && !!story.stories && story.stories.length > 0
  );

  return (
    <div className="relative w-full my-4">
      <div 
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto py-2 px-1 scroll-hidden"
      >
        {STORIES.map((story, index) => (
          <Story
            key={story.id}
            username={story.username}
            image={story.image}
            seen={story.seen}
            isAddNew={story.isAddNew}
            onClick={story.isAddNew ? handleAddNewStory : () => handleStoryClick(story.id, story.username, index)}
            stories={story.stories || []}
            allStories={storiesForNavigation}
            storyUserIndex={activeUserIndex}
            onUserChange={setActiveUserIndex}
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
