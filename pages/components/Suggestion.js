import React from 'react';

const Suggestion = ({ avatar, email, username }) => {
  return (
    <div className='flex items-center justify-between mt-3'>
      <img
        className='rounded-full w-10 h-10 border p[-2px]'
        src={avatar}
        alt=''
      />
      <div className='flex-1 ml-4'>
        <h2 className='font-semibold text-sm'>{username}</h2>
        <h3 className='text-sm text-gray-400 truncate'> Email: {email}</h3>
      </div>

      <button className='text-blue-400 text-xs font-bold'>Follow</button>
    </div>
  );
};

export default Suggestion;
