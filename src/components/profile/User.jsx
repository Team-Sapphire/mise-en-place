import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

const User = () => {
  const { user, error, isLoading } = useUser();

  console.log('??user??', user)

  if (isLoading) {
    return <div>Loading ...</div>;
  };

  if (user) {
    return (
      <div>
        <h3>{user.name}</h3>
        <img src={user.picture} alt={user.name} />
        <h3>{user.email}</h3>
        <h3>{user.sub}</h3>
    </div>
    );
  };
};

export default User;