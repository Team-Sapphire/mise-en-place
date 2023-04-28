import axios from 'axios'

export default async function handler(req, res) {

  const clientId = process.env.KROGER_ID;
  const clientSecret = process.env.KROGER_SECRET;

  if (req.method === 'GET' ) {
    const encoded = Buffer.from(`${clientId}:${clientSecret}`, `ascii`);
    const authorization = "Basic " + encoded.toString("base64");

    let tokenUrl = `https://api-ce.kroger.com/v1/connect/oauth2/token`;
    let tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret + '&scope=product.compact',
      headers: {
        "User-Agent": "",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    // Return json object
    tokenResponse.json().then((response) => {
      res.json(response);
    });
  }
};