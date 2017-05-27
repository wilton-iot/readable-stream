define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
/*<replacement>*/
var bufferShim = require('readable-stream/lib/buffer-shims');
/*</replacement>*/
require('readable-stream/common');
var assert = require('assert/');

var Readable = require('readable-stream/../').Readable;

var _readCalled = false;
function _read(n) {
  _readCalled = true;
  this.push(null);
}

var r = new Readable({ read: _read });
r.resume();

process.on('exit', function () {
  assert.strictEqual(r._read, _read);
  assert(_readCalled);
});

return module.exports;});
