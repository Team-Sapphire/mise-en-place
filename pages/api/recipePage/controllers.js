import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL);

const getInstructions = (id) => {
  return sql.unsafe`select * from recipes`;
  // where recipe_id = ${id};
};

const insertInstructions = (recipe) => {
  return sql`
    insert into recipes
   (name, recipe_id, ingredients, instructions, restrictions, photos, calorie_count, nutrition, cook_time)
    values
    (${recipe.name}, ${recipe.recipe_id}, ${recipe.ingredients}, ${recipe.instructions}, ${recipe.restrictions}, ${recipe.photos}, ${recipe.calorie_count}, ${recipe.nutrition}, ${recipe.cook_time})`;
};

export { getInstructions, insertInstructions };
