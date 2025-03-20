
import React from 'react';
import Post from './Post';

// Sample data
const POSTS = [
  {
    id: 1,
    username: 'alex_design',
    userImage: 'https://source.unsplash.com/random/300x300/?portrait&sig=5',
    image: 'https://source.unsplash.com/random/1080x1080/?travel&sig=1',
    caption: 'Amazing sunset at the beach today! 🌅 #travel #sunset #beach',
    likes: 543,
    comments: 32,
    timeAgo: '2 hours ago'
  },
  {
    id: 2,
    username: 'john.doe',
    userImage: 'https://source.unsplash.com/random/300x300/?portrait&sig=3',
    image: 'https://source.unsplash.com/random/1080x1080/?food&sig=2',
    caption: 'Homemade pasta for dinner tonight! Recipe in bio.',
    likes: 289,
    comments: 14,
    timeAgo: '5 hours ago'
  },
  {
    id: 3,
    username: 'emma_wilson',
    userImage: 'https://source.unsplash.com/random/300x300/?portrait&sig=2',
    image: 'https://source.unsplash.com/random/1080x1080/?nature&sig=3',
    caption: 'Morning hike through the mountains. Nature always heals.',
    likes: 892,
    comments: 57,
    timeAgo: '8 hours ago'
  },
  {
    id: 4,
    username: 'maria.j',
    userImage: 'https://source.unsplash.com/random/300x300/?portrait&sig=6',
    image: 'https://source.unsplash.com/random/1080x1080/?city&sig=4',
    caption: 'City lights and city nights. Downtown adventures.',
    likes: 1243,
    comments: 86,
    timeAgo: '12 hours ago'
  }
];

const PostList = () => {
  return (
    <div className="flex flex-col items-center max-w-md mx-auto">
      {POSTS.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImage={post.userImage}
          image={post.image}
          caption={post.caption}
          likes={post.likes}
          comments={post.comments}
          timeAgo={post.timeAgo}
        />
      ))}
    </div>
  );
};

export default PostList;
