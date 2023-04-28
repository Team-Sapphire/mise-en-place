import { addEditedRecipe, editInstructions } from "./controllers.js";

const instructionEdit = (req, res) => {
  if (req.method === "POST") {
    return addEditedRecipe(req.body.recipe)
      .then((data) => {
        // editInstructions(data, req.body.user.id);
        console.log(data);
        res.status(201).end();
      })
      .catch((err) => {
        console.log(err);
      });
    res.status(201).end();
  }
};

export default instructionEdit;
