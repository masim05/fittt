var squel = require('squel');
var _ = require('lodash');
var mapping = {
  'data.id': 'id',
  'data.score': 'score',
  'data.title': 'title',
  'data.created_utc': 'created_utc'
};

function Sql(options) {
  var tablename = options.tablename;

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
