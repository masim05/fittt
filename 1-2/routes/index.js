var express = require('express');
var router = express.Router();
var orchestrate = require('../components/orchestrator');

router.get('/', function (req, res) {
  var page = {
    html_title: 'FITTT-1-2',
    title: 'Process reddit.com data',
    message: 'Fill the form below:'
  };
  res.render('index', page);
});

router.post('/', function (req, res, next) {
  orchestrate(req.body, function (error, results) {
    if (error) {
      return next(error);
    }

    var page = {
      html_title: 'FITTT-1-2',
      title: 'Process reddit.com data',
      message: 'Fill the form below:',
      results: {
        message: 'Results:',
        raw: results.replace(/\n/g, '<br/>')
      }
    };
    res.render('index', page);
  });
});

module.exports = router;
