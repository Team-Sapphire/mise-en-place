import axios from 'axios';

export default function handler(req, res) {
  let words = 'chicken'
      axios.get(`https://api.edamam.com/search?q=${words}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}&from=0&to=4`)
      .then(response => {
        res.send(response.data.hits);
      }).catch(err => {
        console.log('eeeeeeeeeeerrrrrrrrrrrroooooooorrrrrr pulling from api');
      })
};