var request = require('request');

function Fetcher(_uri) {
  var uri = _uri;

  this.fetch = function (callback) {
    request.get(uri, {json: true}, function (error, response, body) {
      return callback(
        error,
        {
          response: response,
          body: body
        }
      );

    });
  };
}

module.exports = Fetcher;