import Head from 'next/head';
import Header from './components/Header';
import Feed from './components/Feed';
import { store } from './app/store';
import { Provider } from 'react-redux';

export default function Home() {
  return (
    <Provider store={store}>
      <div className='bg-gray-100 h-screen overflow-y-scroll scrollbar-hide'>
        <Head>
          <title>Insta Clone</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <Header />
        <Feed />

        {/* Modal */}
      </div>
    </Provider>
  );
}
