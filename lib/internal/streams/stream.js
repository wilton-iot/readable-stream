define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
module.exports = require('stream');

require = requireOrig;});
