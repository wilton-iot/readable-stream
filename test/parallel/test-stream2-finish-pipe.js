define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
/*<replacement>*/
var bufferShim = require('readable-stream/lib/buffer-shims');
/*</replacement>*/
require('readable-stream/common');
var stream = require('readable-stream/../');
var Buffer = require('buffer').Buffer;

var r = new stream.Readable();
r._read = function (size) {
  r.push(bufferShim.allocUnsafe(size));
};

var w = new stream.Writable();
w._write = function (data, encoding, cb) {
  cb(null);
};

r.pipe(w);

// This might sound unrealistic, but it happens in net.js. When
// `socket.allowHalfOpen === false`, EOF will cause `.destroySoon()` call which
// ends the writable side of net.Socket.
w.end();

return module.exports;});
