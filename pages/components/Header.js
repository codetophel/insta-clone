import {
  Search,
  Group,
  FavoriteBorder,
  AddCircleOutline,
  Send,
  AddBoxOutlined,
} from '@mui/icons-material';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { openModal } from '../../features/modalSlice';

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch(openModal);

  return (
    <div className='shadow-sm border-b bg-white sticky top-0 z-50 pb-3'>
      {/* left */}
      <div className='flex justify-between pt-5 max-w-6xl mx-5 lg:mx-auto'>
        <div
          onClick={() => router.push('/')}
          className='relative hidden lg:inline-grid cursor-pointer'
        >
          <img
            src='https://cdn.cdnlogo.com/logos/i/91/instagram.svg'
            className='h-10 w-15 object-contain'
          />
        </div>

        <div
          onClick={() => router.push('/')}
          className='relative w-10 h-10 lg:hidden flex-shrink-0 cursor-pointer'
        >
          <img
            src='https://cdn.cdnlogo.com/logos/i/21/instagram-glyph.svg'
            className='object-contain'
          />
        </div>

        {/* middle - search */}
        <div className='hidden md:block relative rounded-md max-w-xs'>
          <div className='absolute pl-3 flex items-center pointer-events-none  '>
            <Search className='h-6 w-6 mt-2 text-gray-500 ' />
          </div>
          <input
            className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded md focus:ring-black focus:border-black'
            type='text'
            placeholder='Search...'
          />
        </div>

        {/* right */}
        <div className='flex'>
          {/* <Home onClick={() => router.push('/')} className='navBtn' /> */}
          {session ? (
            <>
              <AddBoxOutlined
                className='h-10 w-10 md:hidden cursor-pointer'
                onClick={() => dispatch(openModal())}
              />
              <div className='relative'>
                <Send className='navBtn rotate-[-60deg]' />
                <div className='absolute -top-0 -right-0 bg-red-500 rounded-full flex items-center justify-center text-xs w-5 h-5 text-white animate-pulse xs:hidden sm:hidden md:block md:text-center'>
                  3
                </div>
              </div>
              <AddCircleOutline
                onClick={() => dispatch(openModal())}
                className='navBtn'
              />
              <Group className='navBtn' />
              <FavoriteBorder className='navBtn' />

              <img
                onClick={signOut}
                src={session.user.image}
                className='ml-5 h-10 w-10 rounded-full'
              />
            </>
          ) : (
            <button
              className='!text-black  bg-white hover:bg-gray-100 border-2 rounded-md shadow-md px-4'
              onClick={signIn}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
