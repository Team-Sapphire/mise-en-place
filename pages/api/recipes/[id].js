import { get, saveUserRecipes } from "../../../src/database/recipes";

export default async function handler(req, res) {
  if (req.method === "GET") {
    console.log(req.query);
    req.body = {};
    req.body.kroger_id = req.query.id;
    await get(req, res);
  }

  // console.log('hit the request!!!!!!!!!!!', req)
  if (req.method === "POST") {
    // console.log('body',req.body);
    // req.body = {};
    // req.body.user_id = req.query.id;
    // console.log('req.query.id', req.query.id)
    await saveUserRecipes(req, res);
  }
}