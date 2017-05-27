define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
/*<replacement>*/
var bufferShim = require('readable-stream/lib/buffer-shims');
/*</replacement>*/

require('readable-stream/common');

var assert = require('assert/');
var stream = require('readable-stream/../');

var writable = new stream.Writable();

function testStates(ending, finished, ended) {
  assert.strictEqual(writable._writableState.ending, ending);
  assert.strictEqual(writable._writableState.finished, finished);
  assert.strictEqual(writable._writableState.ended, ended);
}

writable._write = function (chunk, encoding, cb) {
  // ending, finished, ended start in false.
  testStates(false, false, false);
  cb();
};

writable.on('finish', function () {
  // ending, finished, ended = true.
  testStates(true, true, true);
});

writable.end('testing function end()', function () {
  // ending, finished, ended = true.
  testStates(true, true, true);
});

// ending, ended = true.
// finished = false.
testStates(true, false, true);

return module.exports;});
