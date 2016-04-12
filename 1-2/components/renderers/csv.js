var _ = require('lodash');
var moment = require('moment');

function Csv(options) {
  var delimiter = options.delimiter;
  var properties = options.properties;
  var dates = options.dates;

  this.render = function (data, callback) {
    var outs = [properties.join(delimiter)];
    var current;
    data.forEach(function (e) {
      current = [];
      properties.forEach(function (p) {
        var v = _.get(e, p);
        if (v && (dates.indexOf(p) >= 0)) {
          v = moment.unix(v);
          v = v.format('DD.MM.YYYY hh:mm:ss');
        }
        current.push(JSON.stringify(v || ''));
      });
      outs.push(current.join(delimiter));
    });

    var result = outs.join('\n');
    return callback(undefined, result);
  };
}

module.exports = Csv;
