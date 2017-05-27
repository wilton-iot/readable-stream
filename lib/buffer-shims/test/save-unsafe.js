define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
'use strict';

var assert = require('assert');
var bufferShim = require('buffer-shims/');
var safe = bufferShim.alloc(10);

function isZeroFilled(buf) {
  for (var n = 0; n < buf.length; n++)
    if (buf[n] > 0) return false;
  return true;
}

assert(isZeroFilled(safe));

return module.exports;});
