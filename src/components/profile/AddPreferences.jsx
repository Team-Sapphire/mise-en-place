import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DietPreferencesForm from './DietPreferencesForm';
import HealthPreferencesForm from './HealthPreferencesForm';
import CuisinePreferencesForm from './CuisinePreferencesForm';
import ExcludedForm from './ExcludedForm';
import QuantitiesForm from './QuantitiesForm';

const dietParams = [
  'balanced',
  'high-fiber',
  'high-protein',
  'low-carb',
  'low-fat',
  'low-sodium'
];

const healthParams = [
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
];

const cuisineTypeParams = [
  'american',
  'asian',
  'british',
  'caribbean',
  'central europe',
  'chinese',
  'eastern europe',
  'french',
  'greek',
  'indian',
  'italian',
  'japanese',
  'korean',
  'kosher',
  'mediterranean',
  'mexican',
  'middle eastern',
  'nordic',
  'south american',
  'south east asian',
  'world'
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const handle13 = (e) => {
  e.key === 'Enter' && e.preventDefault();
};

const AddPreferences = () => {
  const [query, setQuery] = useState('');
  const [allPreferences, setAllPreferences] = useState({
    diet: [],
    health: [],
    cuisineType: [],
    excluded: []
  });

  const formatParams = (param, values) => {
    let result = '';
    if (!values.length) {
      return '';
    }
    for (let i = 0; i < values.length; i++) {
      result += `&${param}=${values[i]}`
    }
    console.log('result from formatting', result);
    setQuery(`${query}${result}`)
    console.log('query after setQuery', query);
  };

  useEffect(() => {console.log('query in useEffect', query)}, [query]);

  const getRecipes = () => {
    axios.get('/api/edamam/edamam', {
      params: {
        query: query
      }
    })
    .then(result => console.log(result))
    // .catch(err => console.log(err))
  };

  return (
    <>
      <h2>Diet Preferences</h2>
      <DietPreferencesForm params={dietParams} random={getRandomInt} handle13={handle13} format={formatParams} />
      <h2>Health Preferences</h2>
      <HealthPreferencesForm params={healthParams} random={getRandomInt} handle13={handle13} format={formatParams} />
      <h2>Cuisine Preferences</h2>
      <CuisinePreferencesForm params={cuisineTypeParams} random={getRandomInt} handle13={handle13} format={formatParams} />
      <h2>Dislikes and Exclusions</h2>
      <ExcludedForm random={getRandomInt} handle13={handle13} format={formatParams} />
      <h2>Personalize your meal plan quantities</h2>
      <QuantitiesForm handle13={handle13} />
      <button className='btn btn-outline btn-warning hover:scale-105 ease-in-out duration-300' onClick={getRecipes}></button>
    </>
  );
};

export default AddPreferences;