define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/
require('readable-stream/common');
var assert = require('assert');

var Transform = require('readable-stream/../').Transform;

var parser = new Transform({ readableObjectMode: true });

assert(parser._readableState.objectMode);
assert(!parser._writableState.objectMode);
assert.strictEqual(parser._readableState.highWaterMark, 16);
assert.strictEqual(parser._writableState.highWaterMark, 16 * 1024);

parser._transform = function (chunk, enc, callback) {
  callback(null, { val: chunk[0] });
};

var parsed = void 0;

parser.on('data', function (obj) {
  parsed = obj;
});

parser.end(bufferShim.from([42]));

process.on('exit', function () {
  assert.strictEqual(parsed.val, 42);
});

var serializer = new Transform({ writableObjectMode: true });

assert(!serializer._readableState.objectMode);
assert(serializer._writableState.objectMode);
assert.strictEqual(serializer._readableState.highWaterMark, 16 * 1024);
assert.strictEqual(serializer._writableState.highWaterMark, 16);

serializer._transform = function (obj, _, callback) {
  callback(null, bufferShim.from([obj.val]));
};

var serialized = void 0;

serializer.on('data', function (chunk) {
  serialized = chunk;
});

serializer.write({ val: 42 });

process.on('exit', function () {
  assert.strictEqual(serialized[0], 42);
});

require = requireOrig;});
