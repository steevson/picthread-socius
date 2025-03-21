
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import StoryList from '@/components/StoryList';
import PostList from '@/components/PostList';
import { Button } from '@/components/ui/button';
import { Tag, LogIn, UserPlus, MessageCircle, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Sample contact list data
const CONTACTS = [
  { id: 1, username: 'emma_wilson', name: 'Emma Wilson', image: 'https://picsum.photos/200?random=101', online: true },
  { id: 2, username: 'john.doe', name: 'John Doe', image: 'https://picsum.photos/200?random=102', online: false },
  { id: 3, username: 'sarah_95', name: 'Sarah Smith', image: 'https://picsum.photos/200?random=103', online: true },
  { id: 4, username: 'alex_design', name: 'Alex Designer', image: 'https://picsum.photos/200?random=104', online: false },
  { id: 5, username: 'maria.j', name: 'Maria Johnson', image: 'https://picsum.photos/200?random=105', online: true },
];

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [following, setFollowing] = useState<number[]>([]);
  const [contactsOpen, setContactsOpen] = useState(true);
  
  const handleFollow = (userId: number, username: string) => {
    if (following.includes(userId)) {
      setFollowing(following.filter(id => id !== userId));
      toast({
        title: "Unfollowed",
        description: `You have unfollowed ${username}`,
        duration: 2000,
      });
    } else {
      setFollowing([...following, userId]);
      toast({
        title: "Following",
        description: `You are now following ${username}`,
        duration: 2000,
      });
    }
  };
  
  const handleMessageUser = (username: string) => {
    toast({
      title: "Message sent",
      description: `Opening chat with ${username}`,
      duration: 2000,
    });
  };
  
  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          <StoryList />
          <PostList />
        </div>
        
        <div className="hidden md:block md:w-1/3 p-4">
          <div className="sticky top-20">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img 
                  src="https://picsum.photos/200?random=profile" 
                  alt="Your profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">your_username</p>
                <p className="text-sm text-muted-foreground">Your Name</p>
              </div>
            </div>
            
            <div className="flex space-x-2 mb-6">
              <Button 
                variant="outline" 
                className="flex-1 flex justify-center items-center gap-2"
                onClick={() => navigate('/login')}
              >
                <LogIn className="h-4 w-4" />
                <span>Log in</span>
              </Button>
              
              <Button 
                variant="default" 
                className="flex-1 flex justify-center items-center gap-2"
                onClick={() => navigate('/register')}
              >
                <UserPlus className="h-4 w-4" />
                <span>Sign up</span>
              </Button>
            </div>
            
            {/* Contacts List */}
            <Collapsible 
              open={contactsOpen} 
              onOpenChange={setContactsOpen}
              className="mb-6 border rounded-md"
            >
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full flex justify-between items-center p-3">
                  <span className="font-medium">Contacts</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${contactsOpen ? 'transform rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-3 space-y-3 max-h-[300px] overflow-y-auto">
                  {CONTACTS.map(contact => (
                    <div key={contact.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                          <img 
                            src={contact.image} 
                            alt={contact.username} 
                            className="w-full h-full object-cover"
                          />
                          {contact.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{contact.name}</p>
                          <p className="text-xs text-muted-foreground">@{contact.username}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="p-1 w-8 h-8"
                          onClick={() => handleMessageUser(contact.username)}
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <Button 
              variant="outline" 
              className="w-full mb-6 flex justify-between"
              onClick={() => navigate('/topics')}
            >
              <span>Customize your interests</span>
              <Tag className="h-4 w-4" />
            </Button>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-muted-foreground">Suggestions For You</h3>
                <button className="text-xs font-medium">See All</button>
              </div>
              
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img 
                          src={`https://picsum.photos/200?random=${i + 50}`} 
                          alt="Suggested user" 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">user_{i}</p>
                        <p className="text-xs text-muted-foreground">Suggested for you</p>
                      </div>
                    </div>
                    <button 
                      className={`text-xs font-medium ${following.includes(i) ? 'text-gray-500' : 'text-sky-500'}`}
                      onClick={() => handleFollow(i, `user_${i}`)}
                    >
                      {following.includes(i) ? 'Following' : 'Follow'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground space-y-4">
              <div className="flex flex-wrap gap-x-2">
                <a href="#" className="hover:underline">About</a>
                <a href="#" className="hover:underline">Help</a>
                <a href="#" className="hover:underline">Press</a>
                <a href="#" className="hover:underline">API</a>
                <a href="#" className="hover:underline">Jobs</a>
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Terms</a>
                <a href="#" className="hover:underline">Locations</a>
              </div>
              <p>© 2023 INSTAGRAM FROM META</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
