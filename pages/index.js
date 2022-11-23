import Head from 'next/head';
import Header from './components/Header';
import Feed from './components/Feed';
import Modal from './components/Modal';
import { useSelector } from 'react-redux';
import { selectModalStatus } from '../features/modalSlice';

export default function Home() {
  const modalStatus = useSelector(selectModalStatus);
  return (
    <div className='bg-gray-100 h-screen overflow-y-scroll scrollbar-hide'>
      <Head>
        <title>Insta Clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Feed />
      {modalStatus && <Modal />}
    </div>
  );
}
