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

export { getRecipe, insertInstructions };
