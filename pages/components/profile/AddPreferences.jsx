import React, { useState, useEffect } from 'react';
import PreferencesForm from './PreferencesForm';
import DropdownMenu from './DropdownMenu';

const healthParams = [
  'balanced',
  'high-fiber',
  'high-protein',
  'low-carb',
  'low-fat',
  'low-sodium',
  'alcohol-cocktail',
  'alcohol-free',
  'celery-free',
  'crustacean-free',
  'dairy-free',
  'DASH',
  'egg-free',
  'fish-free',
  'fodmap-free',
  'gluten-free',
  'immuno-supportive',
  'keto-friendly',
  'kidney-friendly',
  'kosher',
  'low-potassium',
  'low-sugar',
  'lupine-free',
  'Mediterranean',
  'mollusk-free',
  'mustard-free',
  'No-oil-added',
  'paleo',
  'peanut-free',
  'pecatarian',
  'pork-free',
  'red-meat-free',
  'sesame-free',
  'shellfish-free',
  'soy-free',
  'sugar-conscious',
  'sulfite-free',
  'tree-nut-free',
  'vegan',
  'vegetarian',
  'wheat-free'
]

  // const healthLabels = [
  //   'Balanced',
  //   'High-Fiber',
  //   'High-Protein',
  //   'Low-Carb',
  //   'Low-Fat',
  //   'Low-Sodium',
  //   'Alcohol-Cocktail',
  //   'Alcohol-Free',
  //   'Celery-Free',
  //   'Crustcean-Free',
  //   'Dairy-Free',
  //   'DASH',
  //   'Egg-Free',
  //   'Fish-Free',
  //   'FODMAP-Free',
  //   'Gluten-Free',
  //   'Immuno-Supportive',
  //   'Keto-Friendly',
  //   'Kidney-Friendly',
  //   'Kosher',
  //   'Low Potassium',
  //   'Low Sugar',
  //   'Lupine-Free',
  //   'Mediterranean',
  //   'Mollusk-Free',
  //   'Mustard-Free',
  //   'No oil added',
  //   'Paleo',
  //   'Peanut-Free',
  //   'Pescatarian',
  //   'Pork-Free',
  //   'Red-Meat-Free',
  //   'Sesame-Free',
  //   'Shellfish-Free',
  //   'Soy-Free',
  //   'Sugar-Conscious',
  //   'Sulfite-Free',
  //   'Tree-Nut-Free',
  //   'Vegan',
  //   'Vegetarian',
  //   'Wheat-Free'
  // ]

const AddPreferences = () => {
  const [formChildren, setFormChildren] = useState([<DropdownMenu options={healthParams} />]);

  const handleAddAnotherPreferenceClick = () => {
    event.preventDefault();
    setFormChildren(formChildren.concat(<DropdownMenu options={healthParams} />))
  };

  return (
    <PreferencesForm formChildren={formChildren} addDropdown={handleAddAnotherPreferenceClick} />
  )
};

export default AddPreferences;


// import CustomPreference from './CustomPreference';
// const [customFormChildren, setCustomFormChildren] = useState([<CustomPreference preferences={preferences} />]);

// customFormChildren={customFormChildren}
// addCustomInput={handleAddAnotherCustomPreferenceClick}

// const handleAddAnotherCustomPreferenceClick = () => {
//   event.preventDefault();
//   setCustomFormChildren(customFormChildren.concat(<CustomPreference preferences={preferences} />))
// }