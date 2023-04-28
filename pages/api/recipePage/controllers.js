import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL);

const getRecipe = (id) => {
  return sql`select instructions from recipes where recipe_id = ${id}`;
};

const insertInstructions = (recipe) => {
  return sql`
    update recipes
   set instructions = ${recipe.instructions} where recipe_id = ${recipe.recipe_id}`;
};

const editInstructions = (recipe_id, kroger_id) => {
  return sql`insert into userrecipes (user_id, recipe_id, favorite) values (select id from users where kroger_id = ${kroger_id}, ${recipe_id}, ${false})
  `;
};

const addEditedRecipe = (recipe) => {
  return sql` INSERT INTO recipes (name, recipe_id, ingredients, instructions, restrictions, photos, calorie_count, nutrition, cook_time, yield)
  VALUES ('${recipe.name}','${recipe.recipe_id}','${recipe.ingredients}','${recipe.instructions}','${recipe.restrictions}','${recipe.photos}', '${recipe.calorie_count}', '${recipe.nutrition}', '${recipe.cook_time}', '${recipe.yield}')
  RETURNING id;`;
};
const getUserServe = (user_id) => {
  return sql`select preferences from users where kroger_id = ${user_id}`;
};

export {
  getRecipe,
  insertInstructions,
  addEditedRecipe,
  editInstructions,
  getUserServe,
};
