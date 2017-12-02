define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
'use strict';
//var common = require('readable-stream/common');

var Readable = require('readable-stream').Readable;
var inherits = require('inherits');
var nextTick = require("process-nextick-args");

module.exports = function (t) {
  t.test('push strings', function (t) {
    t.plan(2);
    inherits(MyStream, Readable);
    function MyStream(options) {
      Readable.call(this, options);
      this._chunks = 3;
    }

    MyStream.prototype._read = function(n) {
      switch (this._chunks--) {
        case 0:
          return this.push(null);
        case 1:
          return setTimeout(function() {
            this.push('last chunk');
          }.bind(this), 100);
        case 2:
          return this.push('second to last chunk');
        case 3:
          return nextTick(function() {
            this.push('first chunk');
          }.bind(this));
        default:
          throw new Error('?');
      }
    };
    var expect = [ 'first chunksecond to last chunk', 'last chunk' ];

    var ms = new MyStream();
    var results = [];
    ms.on('readable', function() {
      var chunk;
      while (null !== (chunk = ms.read()))
        results.push(chunk + '');
    });

    ms.on('end', function() {
      t.equal(ms._chunks, -1);
      t.deepEqual(results, expect);
    });
  });
}

require = requireOrig;});
