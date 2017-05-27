define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
/*<replacement>*/
var bufferShim = require('readable-stream/lib/buffer-shims');
/*</replacement>*/
require('readable-stream/common');
var assert = require('assert/');

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

return module.exports;});
