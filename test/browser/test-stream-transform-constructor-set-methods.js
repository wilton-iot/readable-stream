define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
'use strict';
//var common = require('readable-stream/common');

var Transform = require('readable-stream').Transform;
module.exports = function (t) {
  t.test('transform constructor set methods', function (t) {
    var _transformCalled = false;
    function _transform(d, e, n) {
      _transformCalled = true;
      n();
    }

    var _flushCalled = false;
    function _flush(n) {
      _flushCalled = true;
      n();
    }

    var tr = new Transform({
      transform: _transform,
      flush: _flush
    });

    tr.on('end', function() {
      t.equal(tr._transform, _transform);
      t.equal(tr._flush, _flush);
      t.ok(_transformCalled);
      t.ok(_flushCalled);
      t.end();
    });

    tr.end(new Buffer('blerg'));
    tr.resume();

  });
}

require = requireOrig;});
