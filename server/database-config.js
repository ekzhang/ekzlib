const MongoClient = require('mongodb').MongoClient;

const DATABASE_URI = (
  process.env.NODE_ENV === 'production'
  ? process.env.MONGODB_URI
  : 'mongodb://localhost:27017/ekzlib-db'
);

var connect = function(callback) {
  MongoClient.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true }, callback);
}

connect((err, client) => {
  let db = client.db();
  db.createCollection('contributions', (err) => {
    if (err) {
      console.log('Collection `contributions` already exists, skipping...');
    }
  });
});

module.exports.connect = connect;
