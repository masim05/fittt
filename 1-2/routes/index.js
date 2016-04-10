var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  var page = {
    title: 'FITTT-1-2',
    message: 'Message'
  };
  res.render('index', page);
});

module.exports = router;
