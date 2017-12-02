define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
'use strict';
//var common = require('readable-stream/common');
var stream = require('readable-stream');
var inherits = require('inherits');
module.exports = function (t) {
  t.test('pipe event', function (t) {
    t.plan(1);
    function Writable() {
      this.writable = true;
      stream.Stream.call(this);
    }
    inherits(Writable, stream.Stream);

    function Readable() {
      this.readable = true;
      stream.Stream.call(this);
    }
    inherits(Readable, stream.Stream);

    var passed = false;

    var w = new Writable();
    w.on('pipe', function(src) {
      passed = true;
    });

    var r = new Readable();
    r._read = function() {}
    r.pipe(w);

    t.ok(passed);
  });
}

require = requireOrig;});
