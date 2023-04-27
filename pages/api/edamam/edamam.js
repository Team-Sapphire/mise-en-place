import axios from 'axios';

export default function handler(req, res) {
  const options = {
    urlStart: `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}`
  };
  axios.get(options.urlStart + req.query.query)
  .then(response => {
    res.send(response.data.hits);
  }).catch(err => {
    console.log('eeeeeeeeeeerrrrrrrrrrrroooooooorrrrrr pulling from api');
  });
};