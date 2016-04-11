var assert = require('assertthat');
var request = require('request').defaults({
  baseUrl: 'http://localhost:3000/'
});

var Fetcher = require('../../components/fetcher');
var orchestrator = require('../../components/orchestrator');

describe('Backend', function () {
  it('should return 200 OK at the /', function (done) {

    request.get('/', function (error, response) {

      if (error) {
        throw error;
      }

      assert.that(response.statusCode).is.equalTo(200);

      done();
    });
  });

  it('should return 200 OK on sorting request', function (done) {

    request.post(
      '/',
      {
        form: {
          uri: 'https://www.reddit.com/r/javascript/.json',
          operation: 'sorting',
          sort_field: 'date',
          sort_order: 'desc',
          output_format: 'csv',
          output_delimiter: 'comma'
        }
      },
      function (error, response) {

        if (error) {
          throw error;
        }

        assert.that(response.statusCode).is.equalTo(200);

        done();
      });
  });

  describe('Fetcher', function () {
    it('should fetch https://www.reddit.com/r/javascript/.json', function (done) {
      this.timeout(8000);

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
    it('should sort to csv', function (done) {
      this.timeout(8000);

      var form = {
        uri: 'https://www.reddit.com/r/javascript/.json',
        operation: 'sorting',
        field: 'data.score',
        format: 'csv'
      };
      orchestrator(form, function (error, results) {
        //console.log(results);
        done(error);
      });
    });

    it('should sort to sql', function (done) {
      this.timeout(8000);

      var form = {
        uri: 'https://www.reddit.com/r/javascript/.json',
        operation: 'sorting',
        field: 'data.score',
        format: 'sql'
      };
      orchestrator(form, function (error, results) {
        //console.log(results);
        done(error);
      });
    });

    it('should aggregate to csv', function (done) {
      this.timeout(8000);

      var form = {
        uri: 'https://www.reddit.com/r/javascript/.json',
        operation: 'aggregation',
        groupBy: 'data.domain',
        add: 'data.score',
        format: 'csv'
      };
      orchestrator(form, function (error, results) {
        //console.log(results);
        done(error);
      });
    });

    it('should aggregate to sql', function (done) {
      this.timeout(8000);

      var form = {
        uri: 'https://www.reddit.com/r/javascript/.json',
        operation: 'aggregation',
        format: 'sql'
      };
      orchestrator(form, function (error, results) {
        //console.log(results);
        done(error);
      });
    });
  });
});