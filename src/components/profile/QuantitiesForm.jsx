import React, { useState } from 'react';

const QuantitiesForm = ({ allPreferences, setAllPreferences }) => {
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [numberOfMeals, setNumberOfMeals] = useState(1);

  return (
    <>
      <label htmlFor='people'>Number of people (up to 6):</label>
      <input type='number' id='people' name='people' placeholder='1' min='1' max='6' onChange={e => {
        let num = Number(e.target.value)
        setNumberOfPeople(num)
        setAllPreferences({...allPreferences, people: num})}} />
      <label htmlFor='meals'>Number of meals per week (up to 21):</label>
      <input type='number' id='meals' name='meals' placeholder='1' min='1' max='21' onChange={e => {
        let num = Number(e.target.value)
        setNumberOfMeals(num)
        setAllPreferences({...allPreferences, meals: num})}} />
      <p>
        You will receive{numberOfMeals == 1 ?
        <span> {numberOfMeals} meal </span> :
        <span> {numberOfMeals} meals </span>}
        per week to feed{numberOfPeople == 1 ?
        <span> {numberOfPeople} person, </span> :
        <span> {numberOfPeople} people, </span>}
        or{numberOfMeals * numberOfPeople == 1 ?
        <span> {numberOfMeals * numberOfPeople} serving in total. </span> :
        <span> {numberOfMeals * numberOfPeople} servings in total. </span>}
      </p>
    </>
  )
};

export default QuantitiesForm;