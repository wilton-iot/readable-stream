define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/
require('readable-stream/common');
var assert = require('assert');

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

require = requireOrig;});
