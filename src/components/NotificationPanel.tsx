
import React from 'react';
import { X } from 'lucide-react';

interface NotificationPanelProps {
  onClose: () => void;
}

// Sample notification data
const NOTIFICATIONS = [
  {
    id: 1,
    username: 'emma_wilson',
    userImage: 'https://source.unsplash.com/random/300x300/?portrait&sig=2',
    action: 'liked your photo',
    timeAgo: '2m',
    postImage: 'https://source.unsplash.com/random/150x150/?travel&sig=1',
    isNew: true
  },
  {
    id: 2,
    username: 'john.doe',
    userImage: 'https://source.unsplash.com/random/300x300/?portrait&sig=3',
    action: 'started following you',
    timeAgo: '10m',
    isNew: true
  },
  {
    id: 3,
    username: 'sarah_95',
    userImage: 'https://source.unsplash.com/random/300x300/?portrait&sig=4',
    action: 'commented: "Beautiful shot!"',
    timeAgo: '32m',
    postImage: 'https://source.unsplash.com/random/150x150/?nature&sig=3',
    isNew: true
  },
  {
    id: 4,
    username: 'alex_design',
    userImage: 'https://source.unsplash.com/random/300x300/?portrait&sig=5',
    action: 'mentioned you in a comment',
    timeAgo: '1h',
    postImage: 'https://source.unsplash.com/random/150x150/?city&sig=4'
  },
  {
    id: 5,
    username: 'maria.j',
    userImage: 'https://source.unsplash.com/random/300x300/?portrait&sig=6',
    action: 'liked your comment',
    timeAgo: '3h',
  },
  {
    id: 6,
    username: 'thomas_k',
    userImage: 'https://source.unsplash.com/random/300x300/?portrait&sig=7',
    action: 'started following you',
    timeAgo: '5h',
  },
  {
    id: 7,
    username: 'jessica_t',
    userImage: 'https://source.unsplash.com/random/300x300/?portrait&sig=10',
    action: 'shared your post',
    timeAgo: '8h',
    postImage: 'https://source.unsplash.com/random/150x150/?food&sig=2'
  }
];

const NotificationPanel = ({ onClose }: NotificationPanelProps) => {
  return (
    <div className="h-full glassmorphism shadow-lg overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold text-lg">Notifications</h2>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-secondary transition-smooth"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {NOTIFICATIONS.map((notification) => (
          <div 
            key={notification.id} 
            className={`flex items-start p-3 rounded-lg transition-smooth hover:bg-secondary/50 cursor-pointer ${notification.isNew ? 'bg-secondary/30' : ''}`}
          >
            <div className="flex-shrink-0 mr-3">
              <img 
                src={notification.userImage} 
                alt={notification.username} 
                className="w-10 h-10 rounded-full object-cover"
                loading="lazy"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{notification.username}</span>
                    {' '}
                    <span>{notification.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{notification.timeAgo}</p>
                </div>
                
                {notification.postImage && (
                  <div className="ml-2 flex-shrink-0">
                    <img 
                      src={notification.postImage} 
                      alt="Post" 
                      className="w-10 h-10 object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
            
            {notification.isNew && (
              <div className="w-2 h-2 bg-sky-500 rounded-full flex-shrink-0 ml-2 mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;
