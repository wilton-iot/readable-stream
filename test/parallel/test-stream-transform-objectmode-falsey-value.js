define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
/*<replacement>*/
var bufferShim = require('readable-stream/lib/buffer-shims');
/*</replacement>*/
var common = require('readable-stream/common');
var assert = require('assert/');

var stream = require('readable-stream/../');
var PassThrough = stream.PassThrough;

var src = new PassThrough({ objectMode: true });
var tx = new PassThrough({ objectMode: true });
var dest = new PassThrough({ objectMode: true });

var expect = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var results = [];

dest.on('data', common.mustCall(function (x) {
  results.push(x);
}, expect.length));

src.pipe(tx).pipe(dest);

var i = -1;
var int = setInterval(common.mustCall(function () {
  if (results.length === expect.length) {
    src.end();
    clearInterval(int);
    assert.deepStrictEqual(results, expect);
  } else {
    src.write(i++);
  }
}, expect.length + 1), 1);

return module.exports;});
