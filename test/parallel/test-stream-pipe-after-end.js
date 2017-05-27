define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
/*<replacement>*/
var bufferShim = require('readable-stream/lib/buffer-shims');
/*</replacement>*/
var common = require('readable-stream/common');
var assert = require('assert/');
var Readable = require('readable-stream/../lib/_stream_readable');
var Writable = require('readable-stream/../lib/_stream_writable');
var util = require('util');

util.inherits(TestReadable, Readable);
function TestReadable(opt) {
  if (!(this instanceof TestReadable)) return new TestReadable(opt);
  Readable.call(this, opt);
  this._ended = false;
}

TestReadable.prototype._read = function () {
  if (this._ended) this.emit('error', new Error('_read called twice'));
  this._ended = true;
  this.push(null);
};

util.inherits(TestWritable, Writable);
function TestWritable(opt) {
  if (!(this instanceof TestWritable)) return new TestWritable(opt);
  Writable.call(this, opt);
  this._written = [];
}

TestWritable.prototype._write = function (chunk, encoding, cb) {
  this._written.push(chunk);
  cb();
};

// this one should not emit 'end' until we read() from it later.
var ender = new TestReadable();

// what happens when you pipe() a Readable that's already ended?
var piper = new TestReadable();
// pushes EOF null, and length=0, so this will trigger 'end'
piper.read();

setTimeout(common.mustCall(function () {
  ender.on('end', common.mustCall(function () {}));
  var c = ender.read();
  assert.strictEqual(c, null);

  var w = new TestWritable();
  w.on('finish', common.mustCall(function () {}));
  piper.pipe(w);
}), 1);

return module.exports;});
