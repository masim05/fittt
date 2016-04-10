var request = require('request');

function Fetcher(_uri) {
  var uri = _uri;

  this.fetch = function (callback) {
    request.get(uri, callback);
  };
}

module.exports = Fetcher;