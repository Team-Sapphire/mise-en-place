import Link from 'next/link'
import Ingredient from './components/cart/ingredient.js'

const ingredients = [{name: 'apples', needed: 2}, {name: 'apples', needed: 2}, {name: 'apples', needed: 2}, {name: 'apples', needed: 2}, {name: 'apples', needed: 2}, {name: 'apples', needed: 2}, {name: 'apples', needed: 2}, {name: 'apples', needed: 2}];

let Cart = () => {
  return (
    <div className='m-20' style={{display: 'grid', gridTemplateRows: '33% 33% 33%', gridTemplateColumns: '75% 25%'}}>
      <div>
        Logo
        <div>
          <div className='mt-20'>
          Additonal Ingredients Required
          </div>
          {ingredients.map((ingredient, index) => {
            return (
              <Ingredient key={index + ingredient.name} ingredient={ingredient} />
            );
          })}
        </div>
        <div>Send to Kroger</div>
      </div>
      <div>User Profile</div>
    </div>
  );
}

export default Cart;