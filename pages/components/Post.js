import React, { useEffect, useState } from 'react';
import {
  BookmarkBorderRounded,
  FavoriteBorder,
  FavoriteRounded,
  MapsUgcRounded,
  MoreHoriz,
  SendRounded,
  SentimentDissatisfiedRounded,
} from '@mui/icons-material';
import { useSession } from 'next-auth/react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../db/firebase';
import Comment from './Comment';

const Post = ({ id, username, userImg, caption, img }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasliked, setHasliked] = useState(false);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'posts', id, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db, id]);

  useEffect(() => {
    //updates the likes db with each likes using id
    onSnapshot(query(collection(db, 'posts', id, 'likes')), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db, id]);

  // to check a liked post and toggle if clicked
  useEffect(() => {
    setHasliked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  const likePost = async () => {
    if (hasliked) {
      // delete username if user has liked the post already and unlike
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
    } else {
      //adding like details to db
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment('');

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

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
      {session && (
        <div className='flex justify-between px-4 pt-4'>
          <div className='flex space-x-4'>
            {hasliked ? (
              <FavoriteRounded
                onClick={likePost}
                className='btn text-red-500'
              />
            ) : (
              <FavoriteBorder onClick={likePost} className='btn' />
            )}
            <MapsUgcRounded className='btn' />
            <SendRounded className='rotate-[-45deg] btn' />
          </div>
          <BookmarkBorderRounded className='btn' />
        </div>
      )}

      {/* caption */}
      <p className='truncate p-5'>
        <span className='font-bold mr-1'>{username} </span>
        {caption}{' '}
      </p>

      {/* comments */}

      {comments.length > 0 && (
        <div className='ml-5 h-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-black'>
          {comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                id={comment.id}
                img={comment.data().userImage}
                comment={comment.data().comment}
                username={comment.data().username}
                timestamp={comment.data().timestamp}
              />
            );
          })}
        </div>
      )}

      {/* input box */}

      {session && (
        <form className='flex items-center p-4 border-t'>
          <SentimentDissatisfiedRounded className='h-7' />
          <input
            type='text'
            placeholder='Add a comment...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='border-none flex-1 focus:ring-0 outline-none'
          />
          <button
            type='submit'
            onClick={sendComment}
            disabled={!comment.trim()}
            className='text-blue-400 font-semi-bold'
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
