import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import Suggestion from './Suggestion';

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
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
    <div className='mt-5 ml-10 '>
      <div className='flex justify-between text-md mb-5'>
        <h3 className='text-md font-bold text-gray-400'>Suggestions for you</h3>
        <button className='text-gray-400 font-semibold'>See All</button>
      </div>

      {suggestions.map((profile) => {
        return (
          <Suggestion
            key={profile.userId}
            img={profile.avatar}
            email={profile.email}
            username={profile.username}
          />
        );
      })}
    </div>
  );
};

export default Suggestions;
