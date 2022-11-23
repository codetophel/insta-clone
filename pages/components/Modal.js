import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { CameraAltRounded } from '@mui/icons-material';
import { db, storage } from '../../db/firebase';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { closeModal } from '../../features/modalSlice';

const Modal = () => {
  const dispatch = useDispatch(closeModal);
  const { data: session } = useSession();
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);
    //create a post and add to database
    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    //get the post id from the db
    // console.log('new doc added', docRef.id);
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    //upload the image to db storage with post id
    await uploadString(imageRef, selectedFile, 'data_url').then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        console.log(downloadURL);

        //get a download url from db storage to display on feed
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        });
      }
    );

    dispatch(closeModal());
    setLoading(false);
    setSelectedFile(null);
  };

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        onClose={() => dispatch(closeModal())}
      >
        <div className='flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-6 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    onClick={() => setSelectedFile(null)}
                    className='object-contain w-full cursor-pointer'
                    alt=''
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'
                  >
                    <CameraAltRounded
                      className='h-6 w-6 text-red-600'
                      aria-hidden='true'
                    />
                  </div>
                )}
                <div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title
                      as='h2'
                      className='text-lg leading-6 font-medium text-gray-900'
                    ></Dialog.Title>
                  </div>
                  <div>
                    <input
                      ref={filePickerRef}
                      onChange={addImageToPost}
                      type='file'
                      hidden
                    />
                  </div>
                  <div className='mt-2'>
                    <input
                      type='text'
                      ref={captionRef}
                      placeholder='Please enter a caption'
                      className='border-none focus:ring-0 w-full text-center'
                    />
                  </div>
                </div>
                <div className='mt-5 sm:mt-6'>
                  <button
                    type='button'
                    disabled={!selectedFile}
                    className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300'
                    onClick={uploadPost}
                  >
                    {loading ? 'Uploading...' : 'Upload Post'}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
