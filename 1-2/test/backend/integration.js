var assert = require('assertthat');
var request = require('request').defaults({
  baseUrl: 'http://localhost:3000/'
});

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
});