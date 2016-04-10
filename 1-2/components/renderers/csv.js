function Csv() {
  this.render = function (data, callback) {
    return callback(undefined, data);
  };
}

module.exports = Csv;
