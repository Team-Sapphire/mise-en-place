const client = require('./connection.js').client


module.exports = {
  get: (req, res) => {
    let user_id = req.body.user_id

    let queryString =
    `select * from users\
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

    let queryStr = `INSERT INTO users (username, first_name, last_name, email, allergies, preferences)
      VALUES ('${req.body.username}','${req.body.first_name}','${req.body.last_name}','${req.body.email}','${req.body.allergies}','${req.body.preferences}');
    `
    client.query(queryStr)
      .then((data) => {
        res.status(201).send('Status: 201 CREATED')
      }
    )

  },

}

