import { getUserServe } from "./controllers.js";

const getUserServings = (req, res) => {
  if (req.method === "GET") {
    console.log(req.query);
    return getUserServe(req.query.id)
      .then((data) => {
        console.log(data);
        res.status(201).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
    res.status(201).end();
  }
};

export default getUserServings;
