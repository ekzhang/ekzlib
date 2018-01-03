const express = require('express');
const router = express.Router();

const database = require('../database-config');

/* GET api listing. */
var db;
database.connect((err, _db) => {
  if (err) return console.log(err);
  db = _db.db('ekzlib-db');
});

router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/contributions', (req, res) => {
  db.collection('contributions').find().toArray((err, results) => {
    res.status(200).json(results);
  });
});

router.post('/contributions', (req, res) => {
  db.collection('contributions').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('Saved to database: ' + JSON.stringify(req.body));
    return res.status(200).json(req.body);
  });
});

module.exports = router;
