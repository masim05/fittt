function Arrgegator() {
  this.handle = function (data, callback) {
    return callback(undefined, data);
  };
}

module.exports = Arrgegator;
