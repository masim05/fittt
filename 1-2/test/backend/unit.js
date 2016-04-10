var assert = require('assertthat');
var Fetcher = require('../../components/fetcher');
var Selector = require('../../components/selector');
var Sorter = require('../../components/handlers/sorter');
var Aggregator = require('../../components/handlers/aggregator');
var Csv = require('../../components/renderers/csv');
var Sql = require('../../components/renderers/sql');
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

  describe('Selector', function () {
    it('should select sotring with sql', function (done) {
      var selector = new Selector();
      var form = {
        uri: 'https://www.reddit.com/r/javascript/.json',
        operation: 'sorting',
        format: 'sql'
      };
      selector.select(form, function (error, results) {
        if (error) {
          throw error;
        }

        assert.that(new results.handler.ctor() instanceof Sorter).is.true();
        assert.that(new results.renderer.ctor() instanceof Sql).is.true();

        done();
      });
    });

    it('should select aggregation with csv', function (done) {
      var selector = new Selector();
      var form = {
        uri: 'https://www.reddit.com/r/javascript/.json',
        operation: 'aggregation',
        format: 'csv'
      };
      selector.select(form, function (error, results) {
        if (error) {
          throw error;
        }

        assert.that(new results.handler.ctor() instanceof Aggregator).is.true();
        assert.that(new results.renderer.ctor() instanceof Csv).is.true();

        done();
      });
    });
  });

  describe('Orchestrator', function () {
    it('should perform the work somehow', function (done) {
      this.timeout(8000);
      var form = {
        uri: 'https://www.reddit.com/r/javascript/.json',
        operation: 'aggregation',
        format: 'sql'
      };
      orchestrator(form, function (error) {
        //console.log(arguments);
        done(error);
      });
    });
  });
});