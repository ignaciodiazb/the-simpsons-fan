const { MongoClient } = require('mongodb');
require('dotenv').config();

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(process.env.DATABASE_URI)
      .then((client) => {
        console.log('successfully connected to the database');
        dbConnection = client.db(process.env.DATABASE_NAME);
        return cb();
      })
      .catch((err) => {
        console.error(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
