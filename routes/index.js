var express = require('express');
var router = express.Router();
var mongo = require('mongodb');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', param1: "Fish" });
});

/* GET Userlist page. */
router.get('/teams', function(req, res) {
    var db = req.db;
    var collection = db.get('team');
    collection.find({},{},function(e,docs){
        res.render('teamlist', {
            "teamlist" : docs
        });
    });
});

module.exports = router;
