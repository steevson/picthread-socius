
import React from 'react';
import Layout from '@/components/Layout';
import StoryList from '@/components/StoryList';
import PostList from '@/components/PostList';
import { Button } from '@/components/ui/button';
import { Tag, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
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
                        <p className="text-sm font-medium">user_${i}</p>
                        <p className="text-xs text-muted-foreground">Suggested for you</p>
                      </div>
                    </div>
                    <button className="text-xs font-medium text-sky-500">Follow</button>
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
