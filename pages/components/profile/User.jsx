import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const User = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // if (!isAuthenticated) {
  //   return
  // }

  if (isAuthenticated) {
    return (
      <div>
        <h3>{user.name}</h3>
        <img src={user.picture} alt={user.name} />
        <h3>{user.email}</h3>
    </div>
    )
  }
};

export default User;