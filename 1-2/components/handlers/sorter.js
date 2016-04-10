var _ = require('lodash');

function Sorter(options) {
  this.handle = function (_data, callback) {
    // do not modify input
    var data = _.cloneDeep(_data);
    data.sort(getComparator(options));
    return callback(undefined, data);
  };
}

function getComparator(options) {
  var asc = (options.order.toLowerCase() === 'asc');

  return function (_a, _b) {
    var a = _.get(_a, options.field);
    var b = _.get(_b, options.field);

    if ((typeof a === 'number') && (typeof b === 'number')) {
      return asc ? a - b : b - a;
    } else {
      a = a.toString();
      b = b.toString();

      if (a < b) {
        return asc ? -1 : 1;
      } else if (a > b) {
        return asc ? 1 : -1;
      } else {
        return 0;
      }
    }
  };
}

module.exports = Sorter;
