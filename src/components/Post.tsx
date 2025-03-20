
import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from "@/hooks/use-toast";

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
  const [showShareDialog, setShowShareDialog] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
      toast({
        title: "Post liked!",
        description: `You liked ${username}'s post`,
        duration: 2000,
      });
    }
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
    toast({
      title: saved ? "Post removed from saved" : "Post saved!",
      description: saved ? "Post removed from your saved items" : "Post added to your saved items",
      duration: 2000,
    });
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      console.log(`New comment on post ${id}: ${comment}`);
      toast({
        title: "Comment posted!",
        description: "Your comment has been added",
        duration: 2000,
      });
      setComment('');
    }
  };

  const handleShare = () => {
    setShowShareDialog(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://example.com/p/${id}`);
    setShowShareDialog(false);
    toast({
      title: "Link copied!",
      description: "Post link copied to clipboard",
      duration: 2000,
    });
  };

  const handleReport = () => {
    toast({
      title: "Post reported",
      description: "Thank you for your feedback",
      duration: 2000,
    });
  };

  // Sample comments data
  const sampleComments = [
    { id: 1, username: 'johndoe', avatar: 'https://picsum.photos/200?random=1', text: 'Amazing shot! 📸', timeAgo: '15m' },
    { id: 2, username: 'sarahjane', avatar: 'https://picsum.photos/200?random=2', text: 'Love the colors in this!', timeAgo: '45m' },
    { id: 3, username: 'mikebrown', avatar: 'https://picsum.photos/200?random=3', text: 'Where was this taken?', timeAgo: '1h' },
  ];

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded-full hover:bg-secondary transition-smooth">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(`https://example.com/p/${id}`)}>
              Copy link
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSave}>
              {saved ? 'Unsave' : 'Save'}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={handleReport}>
              Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
                className={cn(
                  "h-6 w-6 transition-smooth", 
                  liked ? "fill-red-500 text-red-500 like-animation" : ""
                )} 
              />
            </button>
            <button 
              className="p-1 rounded-full hover:bg-secondary transition-smooth"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-6 w-6" />
            </button>
            <button 
              className="p-1 rounded-full hover:bg-secondary transition-smooth"
              onClick={handleShare}
            >
              <Share2 className="h-6 w-6" />
            </button>
          </div>
          <button 
            className="p-1 rounded-full hover:bg-secondary transition-smooth"
            onClick={handleSave}
          >
            <Bookmark 
              className={cn(
                "h-6 w-6 transition-smooth", 
                saved ? "fill-current" : ""
              )} 
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
          <div className="max-h-40 overflow-y-auto mb-4">
            {sampleComments.map(comment => (
              <div key={comment.id} className="flex items-start space-x-2 mb-3">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={comment.avatar} 
                    alt={comment.username}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{comment.username}</span>
                    <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                  </div>
                  <p className="text-sm">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
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

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share this post</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <button 
              onClick={handleCopyLink}
              className="flex items-center p-3 hover:bg-secondary rounded-md transition-smooth"
            >
              <span className="flex-1 text-left">Copy link</span>
            </button>
            
            <button 
              onClick={() => {
                window.open(`https://twitter.com/intent/tweet?url=https://example.com/p/${id}`, '_blank');
                setShowShareDialog(false);
              }}
              className="flex items-center p-3 hover:bg-secondary rounded-md transition-smooth"
            >
              <span className="flex-1 text-left">Share to Twitter</span>
            </button>
            
            <button 
              onClick={() => {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=https://example.com/p/${id}`, '_blank');
                setShowShareDialog(false);
              }}
              className="flex items-center p-3 hover:bg-secondary rounded-md transition-smooth"
            >
              <span className="flex-1 text-left">Share to Facebook</span>
            </button>
            
            <button 
              onClick={() => {
                window.open(`https://api.whatsapp.com/send?text=Check this out: https://example.com/p/${id}`, '_blank');
                setShowShareDialog(false);
              }}
              className="flex items-center p-3 hover:bg-secondary rounded-md transition-smooth"
            >
              <span className="flex-1 text-left">Share via WhatsApp</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Post;
