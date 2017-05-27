define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
/*<replacement>*/
var bufferShim = require('readable-stream/lib/buffer-shims');
/*</replacement>*/

require('readable-stream/common');

var assert = require('assert/');
var Transform = require('readable-stream/../').Transform;

var expected = 'asdf';

function _transform(d, e, n) {
  n();
}
function _flush(n) {
  n(null, expected);
}

var t = new Transform({
  transform: _transform,
  flush: _flush
});

t.end(bufferShim.from('blerg'));
t.on('data', function (data) {
  assert.strictEqual(data.toString(), expected);
});

return module.exports;});
