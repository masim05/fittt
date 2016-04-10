var _ = require('lodash');

const PROPERTIES = [
  'data.id',
  'data.score',
  'data.title',
  'data.created_utc'
];

function Csv(options) {
  var delimiter = options.delimiter;

  this.render = function (data, callback) {
    var outs = [PROPERTIES.join(delimiter)];
    var current;
    data.forEach(function (e) {
      current = [];
      PROPERTIES.forEach(function (p) {
        current.push(JSON.stringify(_.get(e, p) || ''));
      });
      outs.push(current.join(delimiter));
    });

    var result = outs.join('\n');
    return callback(undefined, result);
  };
}

module.exports = Csv;
