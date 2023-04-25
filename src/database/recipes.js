const client = require('./connection.js').client


module.exports = {
  getAllByUser: (req, res) => {
    let user_id = req.body.user_id

    let queryString =
    `select * from userrecipes\
     where id=${user_id}
    `

    client.query(queryString)
      .then((data) => {
        res.send(data)
      })
      .catch((err) => {
        console.log('err', err.message)
      })

  },


  getAll: (req, res) => {

    let queryString =
    `select * from recipes
    `

    client.query(queryString)
      .then((data) => {
        res.send(data)
      })
      .catch((err) => {
        console.log('err', err.message)
      })

  },

  // User saves new recipe to profile
  saveUserRecipe: function (req, res) {

    let queryStrRecipes =
    ` INSERT INTO recipes (name, recipe_id, ingredients, instructions, restrictions, photos, calorie_count)
      VALUES ('${req.body.name}','${req.body.recipe_id}','${req.body.ingredients}','${req.body.instructions}','${req.body.restrictions}','${req.body.photos}', '${req.body.calorie_count}')
      RETURNING id;
    `

    let queryStrUserRecipes =
    `INSERT INTO userrecipes (user_id, recipe_id, favorite)
    VALUES ('${req.body.username}','${req.body.first_name}','${req.body.last_name}','${req.body.email}','${req.body.allergies}','${req.body.preferences}');
    `

    client.query(queryStrRecipes)
      .then((data) => {
        let recipe_id = data.rows[0].id

        client.query(queryStrUserRecipes)
          .catch((err) => {
            console.log('Error saving to userrecipes database', err.message)
          })

      }
    )
    .then((data) => {
      res.status(201).send('Status: 201 CREATED')
    })
    .catch((err) => {
      console.log('Error saving to recipes database', err.message)
    })

  },


  favorite: function (req, res) {

    if (req.params.userrecipe_id === undefined) {
      res.status(404).send('Must provide a "userrecipe_id" parameter')
    }

    let queryStr =
    `UPDATE userrecipes SET favorite = 'true' WHERE id = ${req.params.userrecipe_id};
    `


    client.query(queryStr)
      .then((data) => {
        res.status(201).send('Status: 201 UPDATED')
      })
      .catch((err) => {
        console.log('Error saving favorite information')
      })

  },



}

