define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/
require('readable-stream/common');
var assert = require('assert');

var stream = require('readable-stream/../');
var util = require('util');

function MyWritable(fn, options) {
  stream.Writable.call(this, options);
  this.fn = fn;
}

util.inherits(MyWritable, stream.Writable);

MyWritable.prototype._write = function (chunk, encoding, callback) {
  this.fn(Buffer.isBuffer(chunk), typeof chunk, encoding);
  callback();
};

{
  var m = new MyWritable(function (isBuffer, type, enc) {
    assert(isBuffer);
    assert.strictEqual(type, 'object');
    assert.strictEqual(enc, 'buffer');
  }, { decodeStrings: true });
  m.write('some-text', 'utf8');
  m.end();
}

{
  var _m = new MyWritable(function (isBuffer, type, enc) {
    assert(!isBuffer);
    assert.strictEqual(type, 'string');
    assert.strictEqual(enc, 'utf8');
  }, { decodeStrings: false });
  _m.write('some-text', 'utf8');
  _m.end();
}

require = requireOrig;});
