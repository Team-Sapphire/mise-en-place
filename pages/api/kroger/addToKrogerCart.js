
export default function handler(req, res) {
  if (req.method === 'PUT') {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.kroger.com/v1/cart/add",
      "method": "PUT",
      "headers": {
        "Accept": "application/json",
        "Authorization": "Bearer {{TOKEN}}",
      },
      "processData": false,
      "data": "{\n  \"items\": [\n     {\n       \"upc\": \"0001200016268\",\n       \"quantity\": \2,\n       \"modality\": \"PICKUP\"\\n      }\n    ]\n }"
    }
  }

  if (req.method === 'GET') {

  }
}