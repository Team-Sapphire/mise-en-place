import { getRecipe, insertInstructions } from "./controllers.js";

const dbInstructions = (req, res) => {
  if (req.method === "POST") {
    return insertInstructions(req.body)
      .then((data) => {
        res.status(201).end();
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (req.method === "GET") {
    console.log(req.query.id);
    return getRecipe(req.query.id)
      .then((data) => {
        res.status(200).json({ data: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export default dbInstructions;
