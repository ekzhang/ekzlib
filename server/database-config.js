const MongoClient = require('mongodb').MongoClient;

const DATABASE_URI = 'mongodb://admin:bUW-5PR-pXm-xKC@ds239557.mlab.com:39557/ekzlib-db';
var connect = function(callback) {
  MongoClient.connect(DATABASE_URI, { useNewUrlParser: true }, callback);
}

connect((err, database) => {
  let db = database.db('ekzlib-db');
  // db.collection('contributions').drop();
  db.createCollection('contributions');
});

module.exports.connect = connect;
