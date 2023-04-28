import NextCors from 'nextjs-cors';

export default async function handler(req, res) {

  if (req.method === 'POST' ) {
    await NextCors (req, res, {
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200,
    });

    if (req.body.token === undefined) {
      var token = process.env.KROGER_CART_TOKEN;
    } else {
      console.log('If you see this I think it works')
      var token = req.body.token;
    }

    var cart = req.body.cart;
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
        Authorization: `bearer ${token}`,
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