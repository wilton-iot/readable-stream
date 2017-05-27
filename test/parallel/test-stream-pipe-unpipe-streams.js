define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
/*<replacement>*/
var bufferShim = require('readable-stream/lib/buffer-shims');
/*</replacement>*/
var common = require('readable-stream/common');
var assert = require('assert/');

var _require = require('readable-stream/../'),
    Readable = _require.Readable,
    Writable = _require.Writable;

var source = Readable({ read: function () {} });
var dest1 = Writable({ write: function () {} });
var dest2 = Writable({ write: function () {} });

source.pipe(dest1);
source.pipe(dest2);

dest1.on('unpipe', common.mustCall(function () {}));
dest2.on('unpipe', common.mustCall(function () {}));

assert.strictEqual(source._readableState.pipes[0], dest1);
assert.strictEqual(source._readableState.pipes[1], dest2);
assert.strictEqual(source._readableState.pipes.length, 2);

// Should be able to unpipe them in the reverse order that they were piped.

source.unpipe(dest2);

assert.strictEqual(source._readableState.pipes, dest1);
assert.notStrictEqual(source._readableState.pipes, dest2);

dest2.on('unpipe', common.mustNotCall());
source.unpipe(dest2);

source.unpipe(dest1);

assert.strictEqual(source._readableState.pipes, null);

return module.exports;});
