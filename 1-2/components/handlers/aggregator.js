var _ = require('lodash');

function Arrgegator() {
  this.handle = function (data, callback) {
    var output = {};
    data.reduce(function (previous, current) {
      var r = output[current.domain];
      if (!r) {
        r = output[current.domain] = {
          domain: current.domain,
          articles: 0,
          scores: 0
        }
      }
      r.articles++;
      r.scores += current.score;
    });

    var results = _.values(output);

    return callback(undefined, results);
  };
}

module.exports = Arrgegator;
