define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/

var common = require('readable-stream/common');
var stream = require('readable-stream/../');
var assert = require('assert');

var transform = new stream.Transform({
  transform: _transform,
  highWaterMark: 1
});

function _transform(chunk, encoding, cb) {
  assert.strictEqual(transform._writableState.needDrain, true);
  cb();
}

assert.strictEqual(transform._writableState.needDrain, false);

transform.write('asdasd', common.mustCall(function () {
  assert.strictEqual(transform._writableState.needDrain, false);
}));

assert.strictEqual(transform._writableState.needDrain, true);

require = requireOrig;});
