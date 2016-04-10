var assert = require('assertthat');
var Fetcher = require('../../components/fetcher');

describe('Fetcher', function () {
  it('should fetch https://www.reddit.com/r/javascript/.json', function (done) {

    var fetcher = new Fetcher('https://www.reddit.com/r/javascript/.json');
    fetcher.fetch(function (error, results) {
      assert.that(error).is.falsy();
      assert.that(results.response.statusCode).is.equalTo(200);
      assert.that(results.body).is.not.falsy();

      done();
    });
  });
});