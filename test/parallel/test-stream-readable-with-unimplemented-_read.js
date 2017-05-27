define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
/*<replacement>*/
var bufferShim = require('readable-stream/lib/buffer-shims');
/*</replacement>*/
require('readable-stream/common');
var stream = require('readable-stream/../');
var assert = require('assert/');

var readable = new stream.Readable();

assert.throws(function () {
  return readable.read();
}, /not implemented/);

return module.exports;});
