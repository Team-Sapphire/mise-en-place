import axios from 'axios'

export default async function handler(req, res) {

  if (req.method === 'POST' ) {
    var ingredient = req.body.ingredient;
    var token = req.body.pToken;
    let productsUrl = `https://api-ce.kroger.com/v1/products?filter.term=${ingredient}`;
    let productsResponse = await fetch(productsUrl, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `bearer ${process.env.KROGER_PRODUCT_TOKEN}`,
        "Content-Type": "application/json; charset=utf-8"
      }
    });

    // Return json object
    productsResponse.json().then((response) => {
      res.json(response);
    });
  }
};