import { faker } from '@faker-js/faker';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Story from './Story';

const Stories = () => {
  const [suggestions, setSuggestions] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className='flex items-center space-x-2 mt-2 p-6 bg-white border-gray-200 border rounded-lg overflow-x-scroll scrollbar-thin scrollbar-thin-black'>
      {session && (
        <Story
          key={session.user.uid}
          username={session.user.username}
          avatar={session.user.image}
        />
      )}

      {suggestions.map((profile) => {
        return (
          <Story
            key={profile.userId}
            username={profile.username}
            avatar={profile.avatar}
          />
        );
      })}
    </div>
  );
};

export default Stories;
