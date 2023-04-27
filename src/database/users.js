const client = require("./connection.js").client;

module.exports = {
  get: (req, res) => {
    let kroger_id = req.body.kroger_id;

    let queryString = `select * from users\
     where kroger_id='${kroger_id}'
    `;

    return client
      .query(queryString)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log("err", err.message);
      });
  },

  getAll: (req, res) => {
    let queryString = `select * from users
    `;

    client
      .query(queryString)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log("err", err.message);
      });
  },

  post: function (req, res) {
    let columns = `kroger_id,
    username,
    tenant,
    email,
    allergies,
    preferences
    `;

    let values = `'${req.body.kroger_id}',
    '${req.body.username}',
    '${req.body.tenant}',
    '${req.body.email}',
    '${req.body.allergies}',
    '${req.body.preferences}'`;

    let queryStr = `
    INSERT INTO users (
      ${columns}
    )

    VALUES (
      ${values}
    )

    ON CONFLICT (kroger_id) DO UPDATE SET (
      ${columns}
    ) = (
      ${values}
    )

    WHERE users.kroger_id = '${req.body.kroger_id}';
    `;

    client
      .query(queryStr)
      .then((data) => {
        res.status(201).send("Status: 201 CREATED");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  },
};
