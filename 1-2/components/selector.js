var handlers = {
  sorter: require('./handlers/sorter'),
  aggregator: require('./handlers/aggregator')
};

var renderers = {
  csv: require('./renderers/csv'),
  sql: require('./renderers/sql')
};

const DEFAULTS = {
  SORITNG: {
    FIELD: 'data.score',
    ORDER: 'asc'
  },
  AGGREGATION: {
    GROUPBY: 'data.domain',
    ORDER: 'desc',
    ADD: 'data.score'
  },
  SQL: {
    TABLENAME: 'data'
  },
  CSV: {
    DELIMITER: ','
  }
};

function Selector() {
  this.select = function (form, callback) {
    var handler, renderer;
    switch (form.operation) {
      case 'sorting':
        handler = {
          ctor: handlers.sorter,
          options: {
            field: (form.field || DEFAULTS.SORITNG.FIELD),
            order: (form.order || DEFAULTS.SORITNG.ORDER)
          }
        };
        break;

      case 'aggregation':
        handler = {
          ctor: handlers.aggregator,
          options: {
            field: (form.groupBy || DEFAULTS.AGGREGATION.GROUPBY),
            add: (form.add || DEFAULTS.AGGREGATION.ADD),
            order: (form.order || DEFAULTS.AGGREGATION.ORDER)
          }
        };
        break;

      default:
        return callback(new Error('Invalid operation.'));

    }

    switch (form.format) {
      case 'sql':
        renderer = {
          ctor: renderers.sql,
          options: {
            tablename: (form.tablename || DEFAULTS.SQL.TABLENAME)
          }
        };
        break;

      case 'csv':
        renderer = {
          ctor: renderers.csv,
          options: {
            delimiter: (form.delimiter || DEFAULTS.CSV.DELIMITER)
          }
        };
        break;

      default:
        return callback(new Error('Invalid format.'));

    }

    return callback(
      undefined,
      {
        handler: handler,
        renderer: renderer
      }
    );
  };
}

module.exports = Selector;
