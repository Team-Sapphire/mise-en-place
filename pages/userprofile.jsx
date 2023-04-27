import Link from 'next/link';
import Header from '../src/components/header/Header';
import User from '../src/components/profile/User'
import AddPreferences from '../src/components/profile/AddPreferences';

let UserProfile = () => (
  <>
    <Header className='col-span-5 col-start-1' />
    <User />
    <AddPreferences />
  </>
);

export default UserProfile;