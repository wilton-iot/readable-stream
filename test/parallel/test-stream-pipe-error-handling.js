define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
/*<replacement>*/
var bufferShim = require('readable-stream/lib/buffer-shims');
/*</replacement>*/
var common = require('readable-stream/common');
var assert = require('assert/');
var Stream = require('stream').Stream;

{
  var source = new Stream();
  var dest = new Stream();

  source.pipe(dest);

  var gotErr = null;
  source.on('error', function (err) {
    gotErr = err;
  });

  var err = new Error('This stream turned into bacon.');
  source.emit('error', err);
  assert.strictEqual(gotErr, err);
}

{
  var _source = new Stream();
  var _dest = new Stream();

  _source.pipe(_dest);

  var _err = new Error('This stream turned into bacon.');

  var _gotErr = null;
  try {
    _source.emit('error', _err);
  } catch (e) {
    _gotErr = e;
  }

  assert.strictEqual(_gotErr, _err);
}

{
  var R = require('readable-stream/../').Readable;
  var W = require('readable-stream/../').Writable;

  var r = new R();
  var w = new W();
  var removed = false;

  r._read = common.mustCall(function () {
    setTimeout(common.mustCall(function () {
      assert(removed);
      assert.throws(function () {
        w.emit('error', new Error('fail'));
      }, /^Error: fail$/);
    }), 1);
  });

  w.on('error', myOnError);
  r.pipe(w);
  w.removeListener('error', myOnError);
  removed = true;

  function myOnError() {
    throw new Error('this should not happen');
  }
}

{
  var _R = require('readable-stream/../').Readable;
  var _W = require('readable-stream/../').Writable;

  var _r = new _R();
  var _w = new _W();
  var _removed = false;

  _r._read = common.mustCall(function () {
    setTimeout(common.mustCall(function () {
      assert(_removed);
      _w.emit('error', new Error('fail'));
    }), 1);
  });

  _w.on('error', common.mustCall(function () {}));
  _w._write = function () {};

  _r.pipe(_w);
  // Removing some OTHER random listener should not do anything
  _w.removeListener('error', function () {});
  _removed = true;
}

return module.exports;});
