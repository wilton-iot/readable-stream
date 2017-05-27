define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
/*<replacement>*/
var bufferShim = require('readable-stream/lib/buffer-shims');
/*</replacement>*/
var common = require('readable-stream/common');

var Readable = require('readable-stream/../lib/_stream_readable');
var EE = require('events').EventEmitter;

var oldStream = new EE();
oldStream.pause = function () {};
oldStream.resume = function () {};

var newStream = new Readable().wrap(oldStream);

newStream.on('readable', function () {}).on('end', common.mustCall(function () {}));

oldStream.emit('end');

return module.exports;});
