import React from 'react';
import {
  BookmarkBorderRounded,
  FavoriteBorder,
  MapsUgcRounded,
  MoreHoriz,
  SendRounded,
  SentimentDissatisfiedRounded,
} from '@mui/icons-material';

const Post = ({ id, username, userImg, caption, img }) => {
  return (
    <div className='bg-white my-7 border rounded-lg'>
      {/* Header */}
      <div className='flex items-center p-5'>
        <img
          src={userImg}
          className='rounded-full h-12 w-12 object-contain border p-1 mr-3'
          alt=''
        />
        <p className='flex-1 font-bold cursor-pointer'>{username}</p>
        <MoreHoriz className='h-5 w-5 cursor-pointer' />
      </div>

      {/* img */}
      <img src={img} className='object-cover w-full' alt='' />

      {/* buttons */}
      <div className='flex justify-between px-4 pt-4'>
        <div className='flex space-x-4'>
          <FavoriteBorder className='btn' />
          <MapsUgcRounded className='btn' />
          <SendRounded className='rotate-[-45deg] btn' />
        </div>
        <BookmarkBorderRounded className='btn' />
      </div>

      {/* caption */}
      <p className='truncate p-5'>
        <span className='font-bold mr-1'>{username} </span>
        {caption}{' '}
      </p>

      {/* comments */}

      {/* input box */}
      <form className='flex items-center p-4 border-t'>
        <SentimentDissatisfiedRounded className='h-7' />
        <input
          type='text'
          placeholder='Add a comment...'
          className='border-none flex-1 focus:ring-0 outline-none'
        />
        <button className='text-blue-400 font-semi-bold'>Post</button>
      </form>
    </div>
  );
};

export default Post;
