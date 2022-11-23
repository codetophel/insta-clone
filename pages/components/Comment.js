import React from 'react';
import Moment from 'react-moment';

const Comment = ({ img, username, comment, timestamp }) => {
  return (
    <div className='flex items-center space-x-2 mb-3'>
      <img className='h-7 rounded-full' src={img} alt='' />
      <p className='text-sm flex-1'>
        <span className='font-bold'>{username}</span> {comment}
      </p>
      <Moment className='pr-3 text-xs' fromNow>
        {timestamp?.toDate()}
      </Moment>
    </div>
  );
};

export default Comment;
