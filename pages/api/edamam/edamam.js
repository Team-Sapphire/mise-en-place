import axios from 'axios';

export default function handler(req, res) {
  let words = 'chicken'
      axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}&diet=high-fiber&health=alcohol-free&cuisineType=Eastern%20Europe&mealType=Dinner&dishType=Bread&imageSize=LARGE&field=label`)
      .then(response => {
        res.send(response.data.hits);
      }).catch(err => {
        console.log('eeeeeeeeeeerrrrrrrrrrrroooooooorrrrrr pulling from api');
      })
};