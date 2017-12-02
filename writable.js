define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
var Stream = require("stream")
var Writable = require("readable-stream/lib/_stream_writable.js")

if (process.env.READABLE_STREAM === 'disable') {
  module.exports = Stream && Stream.Writable || Writable
}

module.exports = Writable

require = requireOrig;});
