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
        assert.that(results.handler.options.field).is.not.falsy();
        assert.that(results.handler.options.order).is.not.falsy();
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

  describe('Sorter', function () {
    it('should sort by score ascending', function (done) {
      var options = {
        field: 'data.score',
        order: 'asc'
      };
      var sorter = new Sorter(options);

      var input = [
        {
          kind: 't3',
          data: {
            score: 56,
            title: 'Title for 56',
            created_utc: 1423023706.0
          }
        },
        {
          kind: 't3',
          data: {
            score: 46,
            title: 'Title for 46',
            created_utc: 1423023707.0
          }
        },
        {
          kind: 't3',
          data: {
            score: 6,
            title: 'Title for 6',
            created_utc: 1423023708.0
          }
        }
      ];

      var output = [
        {
          kind: 't3',
          data: {
            score: 6,
            title: 'Title for 6',
            created_utc: 1423023708.0
          }
        },
        {
          kind: 't3',
          data: {
            score: 46,
            title: 'Title for 46',
            created_utc: 1423023707.0
          }

        },
        {
          kind: 't3',
          data: {
            score: 56,
            title: 'Title for 56',
            created_utc: 1423023706.0
          }
        }
      ];

      sorter.handle(input, function (error, results) {
        if (error) {
          throw error;
        }

        assert.that(results).is.equalTo(output);
        done();
      });
    });

    it('should sort by title descending', function (done) {
      var options = {
        field: 'data.title',
        order: 'desc'
      };
      var sorter = new Sorter(options);

      var input = [
        {
          kind: 't3',
          data: {
            score: 5,
            title: 'Title for 5',
            created_utc: 1423023706.0
          }
        },
        {
          kind: 't3',
          data: {
            score: 4,
            title: 'Title for 4',
            created_utc: 1423023707.0
          }

        },
        {
          kind: 't3',
          data: {
            score: 6,
            title: 'Title for 6',
            created_utc: 1423023708.0
          }
        }
      ];

      var output = [
        {
          kind: 't3',
          data: {
            score: 6,
            title: 'Title for 6',
            created_utc: 1423023708.0
          }
        },
        {
          kind: 't3',
          data: {
            score: 5,
            title: 'Title for 5',
            created_utc: 1423023706.0
          }

        },
        {
          kind: 't3',
          data: {
            score: 4,
            title: 'Title for 4',
            created_utc: 1423023707.0
          }
        }
      ];

      sorter.handle(input, function (error, results) {
        if (error) {
          throw error;
        }

        assert.that(results).is.equalTo(output);
        done();
      });
    });
  });

  describe('CSV Renderer', function () {
    it('should render csv', function (done) {
      var options = {
        delimiter: ';'
      };
      var renderer = new Csv(options);

      var input = [
        {
          kind: 't3',
          data: {
            id: 'afe3ll',
            score: 5,
            title: 'Title for 5',
            created_utc: 1423023706.0
          }
        },
        {
          kind: 't3',
          data: {
            id: 'afe3ao',
            score: 4,
            title: 'Title for 4',
            created_utc: 1423023707.0
          }

        },
        {
          kind: 't3',
          data: {
            id: 'afe3lw',
            score: 6,
            title: 'Title for 6',
            created_utc: 1423023708.0
          }
        }
      ];

      var output =
        "data.id;data.score;data.title;data.created_utc\n" +
        "\"afe3ll\";5;\"Title for 5\";1423023706\n" +
        "\"afe3ao\";4;\"Title for 4\";1423023707\n" +
        "\"afe3lw\";6;\"Title for 6\";1423023708";

      renderer.render(input, function (error, results) {
        if (error) {
          throw error;
        }

        assert.that(results).is.equalTo(output);

        done();
      });
    });
  });

  describe('Orchestrator', function () {
    it('should perform the work somehow', function (done) {
      this.timeout(8000);
      var form = {
        uri: 'https://www.reddit.com/r/javascript/.json',
        operation: 'sorting',
        field: 'data.score',
        format: 'csv'
      };
      orchestrator(form, function (error) {
        //console.log(arguments);
        done(error);
      });
    });
  });
});