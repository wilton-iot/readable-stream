define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
'use strict';
//var common = require('readable-stream/common');

var stream = require('readable-stream/');
module.exports = function (t) {
  t.test('is paused', function (t) {
    var readable = new stream.Readable();

    // _read is a noop, here.
    readable._read = Function();

    // default state of a stream is not "paused"
    t.notOk(readable.isPaused());

    // make the stream start flowing...
    readable.on('data', Function());

    // still not paused.
    t.notOk(readable.isPaused());

    readable.pause();
    t.ok(readable.isPaused());
    readable.resume();
    t.notOk(readable.isPaused());
    t.end();
  });
}

return module.exports;});
