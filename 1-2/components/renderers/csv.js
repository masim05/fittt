var _ = require('lodash');

function Csv(options) {
  var delimiter = options.delimiter;
  var properties = options.properties;

  this.render = function (data, callback) {
    var outs = [properties.join(delimiter)];
    var current;
    data.forEach(function (e) {
      current = [];
      properties.forEach(function (p) {
        current.push(JSON.stringify(_.get(e, p) || ''));
      });
      outs.push(current.join(delimiter));
    });

    var result = outs.join('\n');
    return callback(undefined, result);
  };
}

module.exports = Csv;
