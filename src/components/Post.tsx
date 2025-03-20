
import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostProps {
  id: number;
  username: string;
  userImage: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
}

const Post = ({ id, username, userImage, image, caption, likes, comments, timeAgo }: PostProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      console.log(`New comment on post ${id}: ${comment}`);
      setComment('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-xl border border-border overflow-hidden mb-6 animate-scale">
      {/* Post header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img 
              src={userImage} 
              alt={username} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="font-medium text-sm">{username}</p>
          </div>
        </div>
        <button className="p-1 rounded-full hover:bg-secondary transition-smooth">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Post image */}
      <div className="relative aspect-square bg-secondary overflow-hidden">
        <img 
          src={image} 
          alt="Post content"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Post actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <button
              className="p-1 rounded-full hover:bg-secondary transition-smooth"
              onClick={handleLike}
            >
              <Heart 
                className={cn("h-6 w-6 transition-smooth", liked && "fill-red-500 text-red-500 like-animation")} 
              />
            </button>
            <button 
              className="p-1 rounded-full hover:bg-secondary transition-smooth"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-6 w-6" />
            </button>
            <button className="p-1 rounded-full hover:bg-secondary transition-smooth">
              <Send className="h-6 w-6" />
            </button>
          </div>
          <button 
            className="p-1 rounded-full hover:bg-secondary transition-smooth"
            onClick={handleSave}
          >
            <Bookmark 
              className={cn("h-6 w-6 transition-smooth", saved && "fill-current")} 
            />
          </button>
        </div>

        {/* Likes */}
        <p className="font-medium text-sm mb-1">{likesCount.toLocaleString()} likes</p>
        
        {/* Caption */}
        <div className="mb-2">
          <span className="font-medium text-sm mr-2">{username}</span>
          <span className="text-sm">{caption}</span>
        </div>
        
        {/* Comments link */}
        <button 
          className="text-muted-foreground text-sm mb-1"
          onClick={() => setShowComments(!showComments)}
        >
          View all {comments} comments
        </button>
        
        {/* Timestamp */}
        <p className="text-xs text-muted-foreground">{timeAgo}</p>
      </div>

      {/* Comments section (conditionally rendered) */}
      {showComments && (
        <div className="border-t p-3">
          <form onSubmit={handleSubmitComment} className="flex items-center">
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 p-2 bg-transparent text-sm focus:outline-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button 
              type="submit" 
              className={cn(
                "text-sm font-medium text-sky-500 transition-smooth",
                !comment.trim() && "opacity-50 cursor-not-allowed"
              )}
              disabled={!comment.trim()}
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
