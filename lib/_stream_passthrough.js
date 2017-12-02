define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

'use strict';

module.exports = PassThrough;

var Transform = require('readable-stream/lib/_stream_transform');

/*<replacement>*/
var util = require('util');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

require = requireOrig;});
