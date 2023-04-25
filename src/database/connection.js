const {Client} = require('pg')
const fs = require('fs')

// Create postgreSQL connection

// postgres://stperk21:TDqvh8AbonH4@ep-bitter-recipe-726791.us-east-2.aws.neon.tech/neondb
const client = new Client({

  connectionString: 'postgres://stperk21:TDqvh8AbonH4@ep-bitter-recipe-726791.us-east-2.aws.neon.tech/neondb',
  ssl: {
    rejectUnauthorized: false,
    // ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
    ca: fs.readFileSync('./keysAndCerts/RootCA.crt').toString()
  },

})

client.connect();



module.exports.client = client;
