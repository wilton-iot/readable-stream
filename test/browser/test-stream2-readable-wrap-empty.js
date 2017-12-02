define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
'use strict';
//var common = require('readable-stream/common');

var Readable = require('readable-stream').Readable;
var EE = require('events').EventEmitter;
module.exports = function (t) {
  t.test('wrap empty', function (t) {
    t.plan(1);
    var oldStream = new EE();
    oldStream.pause = function() {};
    oldStream.resume = function() {};

    var newStream = new Readable().wrap(oldStream);

    newStream
      .on('readable', function() {})
      .on('end', function() {
        t.ok(true, 'ended');
      });

    oldStream.emit('end');

  })
}

require = requireOrig;});
