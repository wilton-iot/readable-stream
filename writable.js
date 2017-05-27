define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
var Stream = require("stream")
var Writable = require("readable-stream/lib/_stream_writable.js")

if (process.env.READABLE_STREAM === 'disable') {
  module.exports = Stream && Stream.Writable || Writable
}

module.exports = Writable

return module.exports;});
