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


    if (req.body.product_id === undefined) {
      res.status(404).send('Must provide a "product_id" parameter')
    }

    let body = req.body.body
    body = body.replace("'", "''")

    let instant = instantToString(Date.now())


    let queryStr = `INSERT INTO questions (product_id, question_body, instant, asker_name, asker_email, reported, helpful)
      VALUES (${req.body.product_id},'${body}','${instant}','${req.body.name}','${req.body.email}',false,0);
    `
    client.query(queryStr)
      .then((data) => {
        res.status(201).send('Status: 201 CREATED')
      }
    )

  },

}

