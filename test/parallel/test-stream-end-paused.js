define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/
var common = require('readable-stream/common');
var assert = require('assert');

// Make sure we don't miss the end event for paused 0-length streams

var Readable = require('readable-stream/../').Readable;
var stream = new Readable();
var calledRead = false;
stream._read = function () {
  assert(!calledRead);
  calledRead = true;
  this.push(null);
};

stream.on('data', function () {
  throw new Error('should not ever get data');
});
stream.pause();

setTimeout(common.mustCall(function () {
  stream.on('end', common.mustCall(function () {}));
  stream.resume();
}), 1);

process.on('exit', function () {
  assert(calledRead);
  console.log('ok');
});

require = requireOrig;});
