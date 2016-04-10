function Sql() {
  this.render = function (data, callback) {
    return callback(undefined, data);
  };
}

module.exports = Sql;
