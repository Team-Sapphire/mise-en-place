import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DietPreferencesForm from './DietPreferencesForm';
import HealthPreferencesForm from './HealthPreferencesForm';
import CuisinePreferencesForm from './CuisinePreferencesForm';
import ExcludedForm from './ExcludedForm';
import QuantitiesForm from './QuantitiesForm';
import { useUser } from "@auth0/nextjs-auth0/client";


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
    excluded: [],
    people: 1,
    meals: 1
  });
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    console.log('useEff for allPrefs', allPreferences);
  }, [allPreferences]);

  const generatePart = (param, array) => {
    let result = '';
    console.log(param);
    for (let i = 0; i < array.length; i++) {
      result += `&${param}=${array[i]}`
    }
    // setQuery(...query, result);
    return result;
  };

  const getRecipes = (query) => {
    let thingy = query;
    console.log(query, 'this is the query');
    console.log('query from inside getRecipes', query);
    axios.get('/api/edamam/edamam', {
      params: {
        query: query
      }
    })
    .then(result => {
      result.data
      console.log('look at this edamam data!',result.data)
      console.log('user', user.sub.slice(14))
      axios.post("/api/users/" + user.sub.slice(14), allPreferences)
        .then(res => {
          let id = res.data.rows[0].id
          return id
        })
        .then( (id) => {
          console.log('got the id!', id)
          axios.post(`/api/recipes/${id}`, result.data)
            .then(res => console.log('written to database!'))
            .catch (err => console.log('error posting recipes to database', err))
    })})
  };

  const formatQuery = () => {
    let result = '';
    let dietPart = '';
    let healthPart = '';
    let cuisinePart = '';
    let excludedPart = '';
    if (allPreferences.diet.length) {
      dietPart = generatePart('diet', allPreferences.diet);
    }
    if (allPreferences.health.length) {
      healthPart = generatePart('health', allPreferences.health);
    }
    if (allPreferences.cuisineType.length) {
      cuisinePart = generatePart('cuisineType', allPreferences.cuisineType);
    }
    if (allPreferences.excluded.length) {
      excludedPart = generatePart('excluded', allPreferences.excluded);
    }
    getRecipes(`${dietPart}${healthPart}${cuisinePart}${excludedPart}`);
  };

  // useEffect(() => {console.log('query in useEffect', query)}, [query]);


  const trackChanges = (event, array, set) => {
    set((array) => [...array, event.target.value]);
  };


  // const submitPreferences = () => {
  //   console.log('clicked');
  //   // getRecipes();
  // };

  return (
    <>

      <h2>Diet Preferences</h2>
      <DietPreferencesForm params={dietParams} random={getRandomInt} handle13={handle13} format={formatQuery} setAllPreferences={setAllPreferences} allPreferences={allPreferences} trackChanges={trackChanges} />

      <h2>Health Preferences</h2>

      <HealthPreferencesForm params={healthParams} random={getRandomInt} handle13={handle13} format={formatQuery} setAllPreferences={setAllPreferences} allPreferences={allPreferences} trackChanges={trackChanges} />

      <h2>Cuisine Preferences</h2>

      <CuisinePreferencesForm params={cuisineTypeParams} random={getRandomInt} handle13={handle13} format={formatQuery} setAllPreferences={setAllPreferences} allPreferences={allPreferences} trackChanges={trackChanges} />

      <h2>Dislikes and Exclusions</h2>

      <ExcludedForm random={getRandomInt} handle13={handle13} format={formatQuery} setAllPreferences={setAllPreferences} trackChanges={trackChanges} />

      <h2>Personalize your meal plan quantities</h2>

      <QuantitiesForm handle13={handle13} setAllPreferences={setAllPreferences} allPreferences={allPreferences} />

      <button className='duration-300 ease-in-out btn btn-outline btn-warning hover:scale-105' onClick={formatQuery}>Submit Preferences</button>
    </>
  );
};

export default AddPreferences;

      // form onSubmit={submitPreferences}