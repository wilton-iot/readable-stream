define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
'use strict';
var stream = require('readable-stream/');

module.exports = function (t) {
  t.tets('pipe without listenerCount', function (t) {
    t.plan(2);
    var r = new Stream({
      read: function (){}});
    r.listenerCount = undefined;

    var w = new Stream();
    w.listenerCount = undefined;

    w.on('pipe', function() {
      r.emit('error', new Error('Readable Error'));
      w.emit('error', new Error('Writable Error'));
    });
    r.on('error', function (e) {
      t.ok(e, 'readable error');
    });
    w.on('error', function (e) {
      t.ok(e, 'writable error');
    });
    r.pipe(w);

  });
}

return module.exports;});
