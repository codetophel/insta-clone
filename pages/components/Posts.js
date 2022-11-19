import React from 'react';
import Post from './Post';

const Posts = () => {
  const posts = [
    {
      id: 1,
      username: 'nicco',
      userImg:
        'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4065648.png&w=350&h=254',
      img: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4065648.png&w=350&h=254',
      caption: 'Lets get this running',
    },
    {
      id: 2,
      username: 'jay',
      userImg:
        'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4065648.png&w=350&h=254',
      img: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4065648.png&w=350&h=254',
      caption: 'Lets get this running',
    },
    {
      id: 3,
      username: 'babi fada',
      userImg:
        'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4065648.png&w=350&h=254',
      img: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4065648.png&w=350&h=254',
      caption: 'Lets get this running',
    },
  ];
  return (
    <div>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            username={post.username}
            userImg={post.userImg}
            img={post.img}
            caption={post.caption}
          />
        );
      })}
    </div>
  );
};

export default Posts;
