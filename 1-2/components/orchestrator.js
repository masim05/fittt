var Fetcher = require('./fetcher');
var Selector = require('./selector');

var Steppy = require('twostep').Steppy;

function orchestrate(form, callback) {

  Steppy(
    function () {
      // Fetch json from reddit.com
      var f = new Fetcher(form.uri);
      f.fetch(this.slot());
    },
    function (error, fetched) {
      // Select correct handler and renderer
      // XXX one can perform selection in parallel with
      // fetching, it should increase performance
      var s = new Selector();
      s.select(form, this.slot());
      this.pass(fetched.body);
    },
    function (error, selected, body) {
      // Process the data
      var h = new selected.handler.ctor(selected.handler.options);
      this.pass(selected.renderer);
      h.handle(body, this.slot());
    },
    function (error, renderer, data) {
      // Render the data
      var r = new renderer.ctor();
      r.render(data, this.slot());
    },
    function (error, output) {
      // Return output
      callback(undefined, output);
    },
    callback
  );
}

module.exports = orchestrate;
