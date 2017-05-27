define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
/*<replacement>*/
var bufferShim = require('readable-stream/lib/buffer-shims');
/*</replacement>*/
var common = require('readable-stream/common');
var stream = require('readable-stream/../');

var r = new stream.Stream();
r.listenerCount = undefined;

var w = new stream.Stream();
w.listenerCount = undefined;

w.on('pipe', function () {
  r.emit('error', new Error('Readable Error'));
  w.emit('error', new Error('Writable Error'));
});
r.on('error', common.mustCall(noop));
w.on('error', common.mustCall(noop));
r.pipe(w);

function noop() {}

return module.exports;});
