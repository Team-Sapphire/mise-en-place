const client = require('./connection.js').client


module.exports = {
  getAllByUser: (req, res) => {
    let kroger_id = req.query.id

    let queryString =
    `SELECT
      users.id as "user_id",
      recipes.recipe_id,
      recipes."name" as "label",
      recipes.ingredients as "ingredientLines",
      recipes.instructions,
      recipes.restrictions as "healthLabels",
      recipes.photos as "image",
      recipes.calorie_count,
      recipes.nutrition,
      recipes.cook_time,
      recipes.yield

    FROM userrecipes
      JOIN users on users.id = userrecipes.user_id
      JOIN recipes on recipes.id = userrecipes.recipe_id
      WHERE users.kroger_id='${kroger_id}'

    LIMIT 1000
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

  // User saves new recipe
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

  saveUserRecipes: function (req, res) {
    // console.log('save user recipes', req.body.length)

    let user_id = req.query.id;
    let recipes = req.body
    let queryStr = ''
    // console.log('user id', user_id)

    // Create a giant string
    for (let i = 0; i < recipes.length; i++) {


      let recipe_id = recipes[i].recipe.uri.split('recipe_')[1]
      let name = recipes[i].recipe.label
      let ingredientLines = JSON.stringify(recipes[i].recipe.ingredientLines)
        .replaceAll("[", "{")
        .replaceAll("]", "}")
      let instructions = '{}'

      let restrictions = JSON.stringify(recipes[i].recipe.healthLabels)
        .replaceAll("[", "{")
        .replaceAll("]", "}")
        .replaceAll(".nn", ".")
      // let photos = JSON.stringify(recipes[i].recipe.images)
      // let photos = '{}'
      let photos = JSON.stringify({ 0: recipes[i].recipe.image })
      let calorie_count = Math.round(recipes[i].recipe.calories)
      let nutrition = JSON.stringify(recipes[i].recipe.totalNutrients)
      let cook_time = Math.round(+recipes[i].recipe.totalTime)
      let recipe_yield = Math.round(+recipes[i].recipe.yield)


      console.log('recipe id', recipe_id)
      let columns = `
        recipe_id,
        name,
        ingredients,
        instructions,
        restrictions,
        photos,
        calorie_count,
        nutrition,
        cook_time,
        yield
      `
      let values = `
        '${recipe_id}',
        '${name}',
        '${ingredientLines}',
        '${instructions}',
        '${restrictions}',
        '${photos}',
        '${calorie_count}',
        '${nutrition}',
        '${cook_time}',
        '${recipe_yield}'
      `
      let queryStrRecipes =
      ` INSERT INTO recipes (
          ${columns}
        ) VALUES (
          ${values}
        )

        ON CONFLICT (recipe_id) DO UPDATE SET (
          ${columns}
        ) = (
          ${values}
        )

        WHERE recipes.recipe_id = '${recipe_id}'
        RETURNING id;
      `

      // console.log('query string recipes', queryStrRecipes)



      client.query(queryStrRecipes)
        .then((data) => {
          let recipe_id = data.rows[0].id

          let queryStrUserRecipes =
          `INSERT INTO userrecipes (user_id, recipe_id, favorite)
          VALUES ('${user_id}','${recipe_id}',false);
          `
          // console.log('query string userrecipes', queryStrUserRecipes)

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
    }


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

