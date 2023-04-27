import Link from 'next/link';
import Header from './components/header/Header';
import User from './components/profile/User'
import AddPreferences from './components/profile/AddPreferences';

let UserProfile = () => (
  <>
    <Header className='col-span-5 col-start-1' />
    <User />
    <AddPreferences />
  </>
);

export default UserProfile;