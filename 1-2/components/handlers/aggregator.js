var _ = require('lodash');
var Sorter = require('./sorter');

function Arrgegator(options) {
  var groupBy = options.groupBy;
  if (!groupBy) {
    throw new Error('groupBy not found.');
  }
  var add = options.add;
  if (!add) {
    throw new Error('add not found.');
  }
  var order = options.order;
  if (!order) {
    throw new Error('order not found.');
  }

  this.handle = function (data, callback) {
    // Prepare aggregated data
    var output = {};
    data.forEach(function (current) {
      var d = _.get(current, groupBy);
      var c = output[d];
      if (!c) {
        c = output[d] = {
          domain: d,
          articles: 0,
          scores: 0
        }
      }
      c.articles++;
      c.scores += _.get(current, add);
    });

    // Sorter is abstract enough, so use it
    // for sorting results
    var results = _.values(output);
    var sortOptions = {
      field: 'articles',
      order: order
    };
    var sorter = new Sorter(sortOptions);
    return sorter.handle(results, callback);
  };
}

module.exports = Arrgegator;
