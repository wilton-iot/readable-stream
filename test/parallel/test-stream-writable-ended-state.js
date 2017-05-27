define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
/*<replacement>*/
var bufferShim = require('readable-stream/lib/buffer-shims');
/*</replacement>*/

var common = require('readable-stream/common');

var assert = require('assert/');
var stream = require('readable-stream/../');

var writable = new stream.Writable();

writable._write = function (chunk, encoding, cb) {
  assert.strictEqual(writable._writableState.ended, false);
  cb();
};

assert.strictEqual(writable._writableState.ended, false);

writable.end('testing ended state', common.mustCall(function () {
  assert.strictEqual(writable._writableState.ended, true);
}));

assert.strictEqual(writable._writableState.ended, true);

return module.exports;});
