define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
if (!global.console) {
  global.console = {};
}
if (!global.console.log) {
  global.console.log = function () {};
}
if (!global.console.error) {
  global.console.error = global.console.log;
}
if (!global.console.info) {
  global.console.info = global.console.log;
}
var test = require('tape');

test('streams', function (t) {
  require('readable-stream/test/browser/test-stream-big-packet')(t);
  require('readable-stream/test/browser/test-stream-big-push')(t);
  require('readable-stream/test/browser/test-stream-duplex')(t);
  require('readable-stream/test/browser/test-stream-end-paused')(t);
  require('readable-stream/test/browser/test-stream-ispaused')(t);
  require('readable-stream/test/browser/test-stream-pipe-after-end')(t);
//  require('readable-stream/test/browser/test-stream-pipe-cleanup')(t);
//  require('readable-stream/test/browser/test-stream-pipe-cleanup-pause')(t);
//  require('readable-stream/test/browser/test-stream-pipe-error-handling')(t);
//  require('readable-stream/test/browser/test-stream-pipe-event')(t);
//  require('readable-stream/test/browser/test-stream-push-order')(t);
  require('readable-stream/test/browser/test-stream-push-strings')(t);
  require('readable-stream/test/browser/test-stream-readable-constructor-set-methods')(t);
  require('readable-stream/test/browser/test-stream-readable-event')(t);
  require('readable-stream/test/browser/test-stream-transform-constructor-set-methods')(t);
  require('readable-stream/test/browser/test-stream-transform-objectmode-falsey-value')(t);
  require('readable-stream/test/browser/test-stream-transform-split-objectmode')(t);
  require('readable-stream/test/browser/test-stream-unshift-empty-chunk')(t);
//  require('readable-stream/test/browser/test-stream-unshift-read-race')(t);
  require('readable-stream/test/browser/test-stream-writable-change-default-encoding')(t);
  require('readable-stream/test/browser/test-stream-writable-constructor-set-methods')(t);
  require('readable-stream/test/browser/test-stream-writable-decoded-encoding')(t);
  require('readable-stream/test/browser/test-stream-writev')(t);
  require('readable-stream/test/browser/test-stream-sync-write')(t);
  require('readable-stream/test/browser/test-stream-pipe-without-listenerCount');
});

test('streams 2', function (t) {
//  require('readable-stream/test/browser/test-stream2-base64-single-char-read-end')(t);
  require('readable-stream/test/browser/test-stream2-compatibility')(t);
//  require('readable-stream/test/browser/test-stream2-large-read-stall')(t);
//  require('readable-stream/test/browser/test-stream2-objects')(t);
  require('readable-stream/test/browser/test-stream2-pipe-error-handling')(t);
//  require('readable-stream/test/browser/test-stream2-pipe-error-once-listener')(t);
  require('readable-stream/test/browser/test-stream2-push')(t);
  require('readable-stream/test/browser/test-stream2-readable-empty-buffer-no-eof')(t);
  require('readable-stream/test/browser/test-stream2-readable-from-list')(t);
  require('readable-stream/test/browser/test-stream2-transform')(t);
  require('readable-stream/test/browser/test-stream2-set-encoding')(t);
//  require('readable-stream/test/browser/test-stream2-readable-legacy-drain')(t);
  require('readable-stream/test/browser/test-stream2-readable-wrap-empty')(t);
  require('readable-stream/test/browser/test-stream2-readable-non-empty-end')(t);
  require('readable-stream/test/browser/test-stream2-readable-wrap')(t);
//  require('readable-stream/test/browser/test-stream2-unpipe-drain')(t);
  require('readable-stream/test/browser/test-stream2-writable')(t);
});
//test('streams 3', function (t) {
//  require('readable-stream/test/browser/test-stream3-pause-then-read')(t);
//});

return module.exports;});
