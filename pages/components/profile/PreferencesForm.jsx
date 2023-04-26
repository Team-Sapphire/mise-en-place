import React, { useState } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';

const PreferencesForm = ({ formChildren, addDropdown }) => {
  // const { user, isAuthenticated, isLoading } = useAuth0();
  const [preferences, setPreferences] = useState([]);

  const handleAddAllClick = (event) => {
    event.preventDefault()
    for (let i = 0; i < event.target.length; i++) {
      if (event.target[i].value !== '' && !preferences.includes(event.target[i].value)) {
        console.log('pref', event.target[i].value);
        setPreferences(preferences.push(event.target[i].value))
      }
    }
    console.log('prefs array', preferences)
  };

  return (
    <form onSubmit={handleAddAllClick}>
      <h2>Dietary/Health Preferences</h2>
      {formChildren}
      <button onClick={addDropdown}>Add another preference</button>
      <br />
      <button type='submit'>Add all</button>
    </form>
  )
};

export default PreferencesForm;

// customFormChildren,
// addCustomInput

/* <h3>Can't find the preference you're looking for? Add a custom preference below:</h3>
{customFormChildren}
<button onClick={addCustomInput}>Add another custom preference</button> */

// </div>