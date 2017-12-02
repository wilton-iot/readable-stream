define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/

var common = require('readable-stream/common');
var assert = require('assert');
var stream = require('readable-stream/../');

var r = new stream.Readable({
  read: function () {}
});

// readableListening state should start in `false`.
assert.strictEqual(r._readableState.readableListening, false);

r.on('readable', common.mustCall(function () {
  // Inside the readable event this state should be true.
  assert.strictEqual(r._readableState.readableListening, true);
}));

r.push(bufferShim.from('Testing readableListening state'));

var r2 = new stream.Readable({
  read: function () {}
});

// readableListening state should start in `false`.
assert.strictEqual(r2._readableState.readableListening, false);

r2.on('data', common.mustCall(function (chunk) {
  // readableListening should be false because we don't have
  // a `readable` listener
  assert.strictEqual(r2._readableState.readableListening, false);
}));

r2.push(bufferShim.from('Testing readableListening state'));

require = requireOrig;});
