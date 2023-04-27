import NextCors from 'nextjs-cors';

export default async function handler(req, res) {

  if (req.method === 'POST' ) {
    await NextCors (req, res, {
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200,
    });
    var token = req.body['mise/token'];
    var cart = req.body;
    console.log(cart);
    var addToCart = [];
    for (var i = 0; i < cart.length; i++) {
      var item = {};
      item.quantity = 1;
      item.upc = cart[i].upc;
      addToCart.push(item);
    }

    console.log(addToCart);
    let cartUrl = `https://api.kroger.com/v1/cart/add`;
    let cartResponse = await fetch(cartUrl, {
      method: "PUT",
      cache: "no-cache",
      headers: {
        Authorization: `bearer ${process.env.KROGER_CART_TOKEN}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({"items": addToCart})
    });

    // Return json object
    cartResponse.json().then((response) => {
      res.json(response);
    });
  }
}