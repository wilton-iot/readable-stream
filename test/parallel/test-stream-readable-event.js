define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
/*<replacement>*/
var bufferShim = require('readable-stream/lib/buffer-shims');
/*</replacement>*/
var common = require('readable-stream/common');
var assert = require('assert/');

var Readable = require('readable-stream/../').Readable;

{
  // First test, not reading when the readable is added.
  // make sure that on('readable', ...) triggers a readable event.
  var r = new Readable({
    highWaterMark: 3
  });

  r._read = common.mustNotCall();

  // This triggers a 'readable' event, which is lost.
  r.push(bufferShim.from('blerg'));

  setTimeout(function () {
    // we're testing what we think we are
    assert(!r._readableState.reading);
    r.on('readable', common.mustCall(function () {}));
  }, 1);
}

{
  // second test, make sure that readable is re-emitted if there's
  // already a length, while it IS reading.

  var _r = new Readable({
    highWaterMark: 3
  });

  _r._read = common.mustCall(function (n) {});

  // This triggers a 'readable' event, which is lost.
  _r.push(bufferShim.from('bl'));

  setTimeout(function () {
    // assert we're testing what we think we are
    assert(_r._readableState.reading);
    _r.on('readable', common.mustCall(function () {}));
  }, 1);
}

{
  // Third test, not reading when the stream has not passed
  // the highWaterMark but *has* reached EOF.
  var _r2 = new Readable({
    highWaterMark: 30
  });

  _r2._read = common.mustNotCall();

  // This triggers a 'readable' event, which is lost.
  _r2.push(bufferShim.from('blerg'));
  _r2.push(null);

  setTimeout(function () {
    // assert we're testing what we think we are
    assert(!_r2._readableState.reading);
    _r2.on('readable', common.mustCall(function () {}));
  }, 1);
}

return module.exports;});
