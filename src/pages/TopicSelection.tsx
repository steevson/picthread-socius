
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Check, X, Tag, ChevronLeft } from 'lucide-react';

// Sample topics data
const TOPICS = [
  { id: 1, name: 'Photography', icon: '📷' },
  { id: 2, name: 'Art', icon: '🎨' },
  { id: 3, name: 'Music', icon: '🎵' },
  { id: 4, name: 'Fashion', icon: '👗' },
  { id: 5, name: 'Travel', icon: '✈️' },
  { id: 6, name: 'Food', icon: '🍔' },
  { id: 7, name: 'Fitness', icon: '💪' },
  { id: 8, name: 'Technology', icon: '💻' },
  { id: 9, name: 'Beauty', icon: '💄' },
  { id: 10, name: 'Nature', icon: '🌲' },
  { id: 11, name: 'Pets', icon: '🐶' },
  { id: 12, name: 'Sports', icon: '⚽' },
  { id: 13, name: 'DIY', icon: '🔨' },
  { id: 14, name: 'Books', icon: '📚' },
  { id: 15, name: 'Gaming', icon: '🎮' },
  { id: 16, name: 'Science', icon: '🔬' },
  { id: 17, name: 'Movies', icon: '🎬' },
  { id: 18, name: 'Finance', icon: '💰' },
  { id: 19, name: 'Education', icon: '🎓' },
  { id: 20, name: 'Design', icon: '✏️' },
];

const TopicSelection = () => {
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleTopic = (topicId: number) => {
    setSelectedTopics(prev => {
      if (prev.includes(topicId)) {
        return prev.filter(id => id !== topicId);
      } else {
        return [...prev, topicId];
      }
    });
  };

  const handleSave = () => {
    if (selectedTopics.length === 0) {
      toast({
        title: "No topics selected",
        description: "Please select at least one topic you're interested in",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Topics saved!",
        description: `You've selected ${selectedTopics.length} topic${selectedTopics.length > 1 ? 's' : ''}`,
      });
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  const clearAll = () => {
    setSelectedTopics([]);
  };

  return (
    <Layout className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-950 p-6 rounded-xl border border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Select Your Interests</h1>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            disabled={selectedTopics.length === 0}
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Select topics you're interested in to personalize your experience.
          <span className="block mt-1 text-sm">Selected: {selectedTopics.length} / {TOPICS.length}</span>
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
          {TOPICS.map(topic => (
            <button
              key={topic.id}
              onClick={() => toggleTopic(topic.id)}
              className={`flex items-center p-3 rounded-lg border transition-all ${
                selectedTopics.includes(topic.id) 
                  ? 'bg-primary/10 border-primary' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <span className="text-lg mr-2">{topic.icon}</span>
              <span className="flex-1 text-left">{topic.name}</span>
              {selectedTopics.includes(topic.id) && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </button>
          ))}
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            disabled={isLoading || selectedTopics.length === 0}
          >
            {isLoading ? 'Saving...' : 'Save Preferences'}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default TopicSelection;
