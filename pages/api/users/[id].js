import { get } from "../../../src/database/users";

export default async function handler(req, res) {
  console.log(req.query);
  req.body = {};
  req.body.kroger_id = req.query.id;
  await get(req, res);
}
