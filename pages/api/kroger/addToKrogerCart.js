
export default async function handler(req, res) {
  if (req.method === 'POST' ) {
    var token = req.body['mise/token'];
    var cart = req.body.cart;

    for (var i = 0; i < cart.length; i++) {
      cart[i].quantity = 1;
    }

    let cartUrl = `https://api.kroger.com/v1/cart/add`;
    let cartResponse = await fetch(productsUrl, {
      method: "PUT",
      cache: "no-cache",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(cart)
    });

    // Return json object
    cartResponse.json().then((response) => {
      res.json(response);
    });
  }
}