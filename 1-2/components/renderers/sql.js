var squel = require('squel');
var _ = require('lodash');

function Sql(options) {
  var tablename = options.tablename;
  var mapping = options.mapping;

  this.render = function (data, callback) {
    var output = [];

    data.forEach(function (e) {
      var query = squel.insert().into(tablename);

      for (var k in mapping) {
        var v = _.get(e, k);
        if (!v) {
          continue;
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
