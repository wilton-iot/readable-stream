define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
/*<replacement>*/
var bufferShim = require('readable-stream/lib/buffer-shims');
/*</replacement>*/
require('readable-stream/common');
var Readable = require('readable-stream/../').Readable;
var assert = require('assert/');

var s = new Readable({
  highWaterMark: 20,
  encoding: 'ascii'
});

var list = ['1', '2', '3', '4', '5', '6'];

s._read = function (n) {
  var one = list.shift();
  if (!one) {
    s.push(null);
  } else {
    var two = list.shift();
    s.push(one);
    s.push(two);
  }
};

s.read(0);

// ACTUALLY [1, 3, 5, 6, 4, 2]

process.on('exit', function () {
  assert.deepStrictEqual(s._readableState.buffer.join(','), '1,2,3,4,5,6');
  console.log('ok');
});

return module.exports;});
