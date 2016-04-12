var squel = require('squel');
var _ = require('lodash');
var moment = require('moment');

function Sql(options) {
  var tablename = options.tablename;
  var mapping = options.mapping;
  var dates = options.dates;

  this.render = function (data, callback) {
    var output = [];

    data.forEach(function (e) {
      var query = squel.insert().into(tablename);

      for (var k in mapping) {
        var v = _.get(e, k);
        if (!v) {
          continue;
        }
        if ((dates.indexOf(k) >= 0)) {
          v = moment.unix(v);
          v = v.format('DD.MM.YYYY hh:mm:ss');
        }

        query.set(mapping[k], v);
      }

      output.push(query.toString());
    });

    var results = output.join(';\n') + (output.length ? ';' : '');
    return callback(undefined, results);
  };
}

module.exports = Sql;
