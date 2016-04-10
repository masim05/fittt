var assert = require('assertthat');
var Fetcher = require('../../components/fetcher');
var orchestrator = require('../../components/orchestrator');

describe('Units', function () {
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

  describe('Orchestrator', function () {
    it('should perform the work somehow', function (done) {
      this.timeout(8000);
      var form = {
        uri: 'https://www.reddit.com/r/javascript/.json'
      };
      orchestrator(form, function (error) {
        //console.log(arguments);
        done(error);
      });
    });
  });
});