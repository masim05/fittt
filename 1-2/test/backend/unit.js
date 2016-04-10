var assert = require('assertthat');
var Fetcher = require('../../components/fetcher');

describe('Fetcher', function () {
  it('should fetch https://www.reddit.com/r/javascript/.json', function (done) {

    var fetcher = new Fetcher('https://www.reddit.com/r/javascript/.json');
    fetcher.fetch(function (error, response, body) {
      assert.that(error).is.falsy();
      assert.that(response.statusCode).is.equalTo(200);
      assert.that(body).is.not.falsy();

      done();
    });
  });
});