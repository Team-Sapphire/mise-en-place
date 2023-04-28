import Link from 'next/link';
import Header from '../src/components/header/Header';
import User from '../src/components/profile/User'
import AddPreferences from '../src/components/profile/AddPreferences';

let UserProfile = () => (
  <div className='h-full overflow-scroll'>
    <Header className='col-span-5 col-start-1 mb-3' />
    <AddPreferences />
  </div>
);

export default UserProfile;