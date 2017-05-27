define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
/*<replacement>*/
var bufferShim = require('readable-stream/lib/buffer-shims');
/*</replacement>*/
var common = require('readable-stream/common');
var assert = require('assert/');
var stream = require('readable-stream/../');
var str = 'asdfasdfasdfasdfasdf';

var r = new stream.Readable({
  highWaterMark: 5,
  encoding: 'utf8'
});

var reads = 0;

function _read() {
  if (reads === 0) {
    setTimeout(function () {
      r.push(str);
    }, 1);
    reads++;
  } else if (reads === 1) {
    var _ret = r.push(str);
    assert.strictEqual(_ret, false);
    reads++;
  } else {
    r.push(null);
  }
}

r._read = common.mustCall(_read, 3);

r.on('end', common.mustCall(function () {}));

// push some data in to start.
// we've never gotten any read event at this point.
var ret = r.push(str);
// should be false.  > hwm
assert(!ret);
var chunk = r.read();
assert.strictEqual(chunk, str);
chunk = r.read();
assert.strictEqual(chunk, null);

r.once('readable', function () {
  // this time, we'll get *all* the remaining data, because
  // it's been added synchronously, as the read WOULD take
  // us below the hwm, and so it triggered a _read() again,
  // which synchronously added more, which we then return.
  chunk = r.read();
  assert.strictEqual(chunk, str + str);

  chunk = r.read();
  assert.strictEqual(chunk, null);
});

return module.exports;});
