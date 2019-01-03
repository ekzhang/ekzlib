const password = "ekzlib-admin";

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
  if (req.query.password === password) {
    Contributions.find().toArray((err, results) => {
      res.status(200).json(results);
    });
  }
  else {
    return res.status(403).send('Incorrect password.');
  }
});

router.post('/contributions', (req, res) => {
  const obj = req.body;
  if (obj.sender && obj.file && obj.file.title && obj.file.name && obj.file.contents) {
    Contributions.insertOne({
      sender: obj.sender,
      file: {
        title: obj.file.title,
        name: obj.file.name,
        contents: obj.file.contents
      },
      createdAt: new Date()
    }, (err, result) => {
      if (err) return console.log(err);
      // console.log('Saved to database: ' + JSON.stringify(obj));
      return res.status(200).json(obj);
    });
  }
  else {
    return res.status(400).send('Bad request.');
  }
});

router.get('/contributions/:cid', (req, res) => {
  // console.log(req.params.cid);
  if (!ObjectId.isValid(req.params.cid)) {
    return res.status(400).send('Bad request.');
  }
  Contributions.findOne({ _id: new ObjectId(req.params.cid) }, function (err, contrib) {
    if (err)
      return res.send(err);
    res.json(contrib);
  });
});

router.delete('/contributions/:cid', (req, res) => {
  if (req.query.password === password) {
    if (!ObjectId.isValid(req.params.cid)) {
      return res.status(400).send('Bad request.');
    }
    Contributions.deleteOne({
      _id: new ObjectId(req.params.cid)
    }, (err, contrib) => {
      if (err) return res.send(err);
      return res.send('ok');
    });
  }
  else {
    return res.status(403).send('Incorrect password.');
  }
});

module.exports = router;
