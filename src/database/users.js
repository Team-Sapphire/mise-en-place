const client = require('./connection.js').client


module.exports = {
  get: (req, res) => {
    let kroger_id = req.body.kroger_id

    let queryString =
    `select * from users\
     where kroger_id='${kroger_id}'
    `

    return client.query(queryString)
      .then((data) => {
        res.send(data)
      })
      .catch((err) => {
        console.log('err', err.message)
      })

  },


  getAll: (req, res) => {

    let queryString =
    `select * from users
    `

    client.query(queryString)
      .then((data) => {
        res.send(data)
      })
      .catch((err) => {
        console.log('err', err.message)
      })

  },


  post: function (req, res) {
    let queryFindUserByKrogerID = `
      SELECT * FROM users WHERE kroger_id === ${req.body.kroger_id} RETURNING id
    `
    client.query()


    let queryStr = `
    INSERT INTO users (
      kroger_id,
      username,
      tenant,
      email,
      allergies,
      preferences
    )
      VALUES (
        '${req.body.kroger_id}',
        '${req.body.username}',
        '${req.body.tenant}',
        '${req.body.email}',
        '${req.body.allergies}',
        '${req.body.preferences}'
        );
    `
    client.query(queryStr)
      .then((data) => {
        res.status(201).send('Status: 201 CREATED')
      }
    )

  },

}

