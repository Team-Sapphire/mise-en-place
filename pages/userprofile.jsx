import Link from 'next/link';
import Header from './components/header/Header';
import AddPreferences from './components/profile/AddPreferences.jsx';

let UserProfile = () => (
  <>
    <Header className='col-span-5 col-start-1' />
    <AddPreferences />
  </>
);

export default UserProfile;