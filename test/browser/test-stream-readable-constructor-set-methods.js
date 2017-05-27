define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
'use strict';
//var common = require('readable-stream/common');

var Readable = require('readable-stream/').Readable;
module.exports = function (t) {
  t.test('readable constructor set methods', function (t) {
    t.plan(2);
    var _readCalled = false;
    function _read(n) {
      _readCalled = true;
      this.push(null);
    }

    var r = new Readable({ read: _read });
    r.resume();

    setTimeout(function() {
      t.equal(r._read, _read);
      t.ok(_readCalled);
    });
  });
}

return module.exports;});
