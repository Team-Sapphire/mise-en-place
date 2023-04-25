const axios = require("axios");

const getRecipe = (req, res) => {
  //console.log(req.query.id);
  axios
    .get(`https://api.edamam.com/api/recipes/v2/${req.query.id}`, {
      params: {
        type: "public",
        app_id: process.env.EDAMAM_API_ID,
        app_key: process.env.EDAMAM_API_KEY,
      },
    })
    .then((data) => {
      // console.log(data);
      res.status(200).json({ recipe: data.data });
    })
    .catch((err) => {
      console.log(err);
      res.send(404);
    });
};

export default getRecipe;
