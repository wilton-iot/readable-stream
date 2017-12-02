define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/
require('readable-stream/common');
var assert = require('assert');

// This test verifies that stream.unshift(bufferShim.alloc(0)) or
// stream.unshift('') does not set state.reading=false.
var Readable = require('readable-stream/../').Readable;

var r = new Readable();
var nChunks = 10;
var chunk = bufferShim.alloc(10, 'x');

r._read = function (n) {
  setImmediate(function () {
    r.push(--nChunks === 0 ? null : chunk);
  });
};

var readAll = false;
var seen = [];
r.on('readable', function () {
  var chunk = void 0;
  while (chunk = r.read()) {
    seen.push(chunk.toString());
    // simulate only reading a certain amount of the data,
    // and then putting the rest of the chunk back into the
    // stream, like a parser might do.  We just fill it with
    // 'y' so that it's easy to see which bits were touched,
    // and which were not.
    var putBack = bufferShim.alloc(readAll ? 0 : 5, 'y');
    readAll = !readAll;
    r.unshift(putBack);
  }
});

var expect = ['xxxxxxxxxx', 'yyyyy', 'xxxxxxxxxx', 'yyyyy', 'xxxxxxxxxx', 'yyyyy', 'xxxxxxxxxx', 'yyyyy', 'xxxxxxxxxx', 'yyyyy', 'xxxxxxxxxx', 'yyyyy', 'xxxxxxxxxx', 'yyyyy', 'xxxxxxxxxx', 'yyyyy', 'xxxxxxxxxx', 'yyyyy'];

r.on('end', function () {
  assert.deepStrictEqual(seen, expect);
  console.log('ok');
});

require = requireOrig;});
