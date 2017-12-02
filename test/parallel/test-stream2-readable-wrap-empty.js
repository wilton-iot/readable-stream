define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
/*<replacement>*/
var bufferShim = require('buffer-shims');
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

require = requireOrig;});
