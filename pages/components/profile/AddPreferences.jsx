import React, { useState, useEffect } from 'react';
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

const AddPreferences = () => (
  <>
    <h2>Diet Preferences</h2>
    <DietPreferencesForm params={dietParams} random={getRandomInt} handle13={handle13} />
    <h2>Health Preferences</h2>
    <HealthPreferencesForm params={healthParams} random={getRandomInt} handle13={handle13} />
    <h2>Cuisine Preferences</h2>
    <CuisinePreferencesForm params={cuisineTypeParams} random={getRandomInt} handle13={handle13} />
    <h2>Dislikes and Exclusions</h2>
    <ExcludedForm random={getRandomInt} handle13={handle13} />
    <h2>Personalize your meal plan quantities</h2>
    <QuantitiesForm handle13={handle13} />
  </>
);

export default AddPreferences;