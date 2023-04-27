import { get, post } from "../../../src/database/users";

export default async function handler(req, res) {
  if (req.method === "GET") {
    console.log(req.query);
    req.body = {};
    req.body.kroger_id = req.query.id;
    await get(req, res);
  }
  if (req.method === "POST") {
    console.log(req.query);
    req.body = {};
    req.body.kroger_id = req.query.id;
    await post(req, res);
  }
}
