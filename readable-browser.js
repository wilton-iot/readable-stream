define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
exports = module.exports = require('readable-stream/lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('readable-stream/lib/_stream_writable.js');
exports.Duplex = require('readable-stream/lib/_stream_duplex.js');
exports.Transform = require('readable-stream/lib/_stream_transform.js');
exports.PassThrough = require('readable-stream/lib/_stream_passthrough.js');

require = requireOrig;});
