import { getProviders, signIn as signIntoBrowser } from 'next-auth/react';

export default function SignIn({ providers }) {
  return (
    <>
      <div className='justify-center bg-white shadow-md flex flex-col items-center h-[400px] w-[400px] mx-auto mt-[25%] xs:h-[150px] xs:w-[150px] lg:mt-[10%]'>
        <div>
          <img
            src='https://cdn.cdnlogo.com/logos/i/91/instagram.svg'
            className=' w-[200px] mb-5 object-contain'
          />
        </div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() => signIntoBrowser(provider.id, { callbackUrl: '/' })}
              className='bg-blue-500 p-3 rounded-lg text-white '
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
