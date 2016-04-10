var handlers = {
  sorter: require('./handlers/sorter'),
  aggregator: require('./handlers/aggregator')
};

var renderers = {
  csv: require('./renderers/csv'),
  sql: require('./renderers/sql')
};

function Selector() {
  this.select = function (form, callback) {
    return callback(
      undefined,
      {
        handler: {
          ctor: handlers.sorter,
          options: {
            field: 'score',
            order: 'asc'
          }
        },
        renderer: {
          ctor: renderers.csv,
          options: {
            delimiter: ','
          }
        }
      }
    );
  };
}

module.exports = Selector;