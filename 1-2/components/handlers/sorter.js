function Sorter() {
  this.handle = function (data, callback) {
    return callback(undefined, data);
  };
}

module.exports = Sorter;
