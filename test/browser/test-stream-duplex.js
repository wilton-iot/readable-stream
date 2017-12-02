define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
'use strict';
//var common = require('../common');

var Duplex = require('readable-stream').Transform;

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

    stream.on('end', function() {
      t.equal(read.val, 1);
      t.equal(written.val, 2);
    });

    stream.push({ val: 1 });
    stream.end({ val: 2 });

  });
}

require = requireOrig;});
