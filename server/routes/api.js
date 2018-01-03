const express = require('express');
const router = express.Router();

const database = require('../database-config');
const ObjectId = require('mongodb').ObjectID;

/* GET api listing. */
var db, Contributions;
database.connect((err, _db) => {
  if (err) return console.log(err);
  db = _db.db('ekzlib-db');
  Contributions = db.collection('contributions');
});

router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/contributions', (req, res) => {
  Contributions.find().toArray((err, results) => {
    res.status(200).json(results);
  });
});

router.post('/contributions', (req, res) => {
  Contributions.save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('Saved to database: ' + JSON.stringify(req.body));
    return res.status(200).json(req.body);
  });
});

router.get('/contributions/:cid', (req, res) => {
  // console.log(req.params.cid);
  Contributions.findOne({ _id: new ObjectId(req.params.cid) }, function (err, contrib) {
    if (err)
      return res.send(err);
    res.json(contrib);
  });
});

router.delete('/contributions/:cid', (req, res) => {
  Contributions.remove({
    _id: new ObjectId(req.params.cid)
  }, (err, contrib) => {
    if (err) return res.send(err);
    return res.send('ok');
  });
});

module.exports = router;
