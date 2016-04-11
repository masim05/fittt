var handlers = {
  sorter: require('./handlers/sorter'),
  aggregator: require('./handlers/aggregator')
};

var renderers = {
  csv: require('./renderers/csv'),
  sql: require('./renderers/sql')
};

const DEFAULTS = {
  SORTING: {
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
    var aggregationInProgress;
    switch (form.operation) {
      case 'sorting':
        handler = {
          ctor: handlers.sorter,
          options: {
            field: (form.field || DEFAULTS.SORTING.FIELD),
            order: (form.order || DEFAULTS.SORTING.ORDER)
          }
        };
        break;

      case 'aggregation':
        aggregationInProgress = true;
        handler = {
          ctor: handlers.aggregator,
          options: {
            groupBy: (form.groupBy || DEFAULTS.AGGREGATION.GROUPBY),
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
            tablename: (form.tablename || DEFAULTS.SQL.TABLENAME),
            mapping: aggregationInProgress ? {
              domain: 'domain',
              articles: 'articles',
              scores: 'scores'
            } : {
              'data.id': 'id',
              'data.score': 'score',
              'data.title': 'title',
              'data.created_utc': 'created_utc'
            }
          }
        };
        break;

      case 'csv':
        renderer = {
          ctor: renderers.csv,
          options: {
            delimiter: (form.delimiter || DEFAULTS.CSV.DELIMITER),
            properties: aggregationInProgress ? [
              'domain',
              'articles',
              'scores'
            ] : [
              'data.id',
              'data.score',
              'data.title',
              'data.created_utc'
            ]
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
