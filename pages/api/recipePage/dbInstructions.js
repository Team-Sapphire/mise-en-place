import { getInstructions } from "./controllers.js";

const dbInstructions = (req, res) => {
  if (req.method === "POST") {
    res.status(201).end();
  } else if (req.method === "GET") {
    return getInstructions()
      .then((data) => {
        console.log(data);
        res.status(200).json({ data: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export default dbInstructions;
