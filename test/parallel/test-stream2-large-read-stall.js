define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/
var common = require('readable-stream/common');
var assert = require('assert');

// If everything aligns so that you do a read(n) of exactly the
// remaining buffer, then make sure that 'end' still emits.

var READSIZE = 100;
var PUSHSIZE = 20;
var PUSHCOUNT = 1000;
var HWM = 50;

var Readable = require('readable-stream/../').Readable;
var r = new Readable({
  highWaterMark: HWM
});
var rs = r._readableState;

r._read = push;

r.on('readable', function () {
  ;false && console.error('>> readable');
  var ret = void 0;
  do {
    ;false && console.error('  > read(%d)', READSIZE);
    ret = r.read(READSIZE);
    ;false && console.error('  < %j (%d remain)', ret && ret.length, rs.length);
  } while (ret && ret.length === READSIZE);

  ;false && console.error('<< after read()', ret && ret.length, rs.needReadable, rs.length);
});

r.on('end', common.mustCall(function () {
  assert.strictEqual(pushes, PUSHCOUNT + 1);
}));

var pushes = 0;
function push() {
  if (pushes > PUSHCOUNT) return;

  if (pushes++ === PUSHCOUNT) {
    ;false && console.error('   push(EOF)');
    return r.push(null);
  }

  ;false && console.error('   push #%d', pushes);
  if (r.push(bufferShim.allocUnsafe(PUSHSIZE))) setTimeout(push, 1);
}

require = requireOrig;});
