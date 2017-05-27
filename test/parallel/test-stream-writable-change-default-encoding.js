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

(function defaultCondingIsUtf8() {
  var m = new MyWritable(function (isBuffer, type, enc) {
    assert.strictEqual(enc, 'utf8');
  }, { decodeStrings: false });
  m.write('foo');
  m.end();
})();

(function changeDefaultEncodingToAscii() {
  var m = new MyWritable(function (isBuffer, type, enc) {
    assert.strictEqual(enc, 'ascii');
  }, { decodeStrings: false });
  m.setDefaultEncoding('ascii');
  m.write('bar');
  m.end();
})();

assert.throws(function changeDefaultEncodingToInvalidValue() {
  var m = new MyWritable(function (isBuffer, type, enc) {}, { decodeStrings: false });
  m.setDefaultEncoding({});
  m.write('bar');
  m.end();
}, TypeError);

(function checkVairableCaseEncoding() {
  var m = new MyWritable(function (isBuffer, type, enc) {
    assert.strictEqual(enc, 'ascii');
  }, { decodeStrings: false });
  m.setDefaultEncoding('AsCii');
  m.write('bar');
  m.end();
})();

return module.exports;});
