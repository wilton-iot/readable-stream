define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
'use strict';
//var common = require('readable-stream/common');

var Duplex = require('readable-stream/').Transform;

var stream = new Duplex({ objectMode: true });
module.exports = function (t) {
  t.test('duplex', function (t) {
    t.plan(4);
    t.ok(stream._readableState.objectMode);
    t.ok(stream._writableState.objectMode);

    var written;
    var read;

    stream._write = function(obj, _, cb) {
      written = obj;
      cb();
    };

    stream._read = function() {};

    stream.on('data', function(obj) {
      read = obj;
    });

    stream.push({ val: 1 });
    stream.end({ val: 2 });

    stream.on('end', function() {
      t.equal(read.val, 1);
      t.equal(written.val, 2);
    });
  });
}

return module.exports;});
