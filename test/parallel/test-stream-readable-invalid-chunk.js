define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/
require('readable-stream/common');
var stream = require('readable-stream/../');
var assert = require('assert');

var readable = new stream.Readable({
  read: function () {}
});

assert.throws(function () {
  return readable.push([]);
}, /Invalid non-string\/buffer chunk/);
assert.throws(function () {
  return readable.push({});
}, /Invalid non-string\/buffer chunk/);
assert.throws(function () {
  return readable.push(0);
}, /Invalid non-string\/buffer chunk/);

require = requireOrig;});
