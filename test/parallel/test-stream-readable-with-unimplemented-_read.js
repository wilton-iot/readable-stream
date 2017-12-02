define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/
require('readable-stream/common');
var stream = require('readable-stream/../');
var assert = require('assert');

var readable = new stream.Readable();

assert.throws(function () {
  return readable.read();
}, /not implemented/);

require = requireOrig;});
