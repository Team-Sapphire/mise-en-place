import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL);

const getInstructions = (id) => {
  return sql.unsafe`select * from recipes`;
  // where recipe_id = ${id};
};

// const insertInstructions = () => {
//   return sql`
//     insert into recipes
//    (username, first_name, last_name, email, allergies, preferences)
//     values
//     (marylamb, Mary, Lamb, marylamb@lambchop.com, ${{}}, ${{}})`;
// };

export { getInstructions };
