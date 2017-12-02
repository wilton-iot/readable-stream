define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
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
var test = require('tape-compat');
var isBrowser = require("is-in-browser");

test('streams', function (t) {
  require('readable-stream/test/browser/test-stream-big-packet')(t);
  if (isBrowser) {
      require('readable-stream/test/browser/test-stream-big-push')(t);
  }
  require('readable-stream/test/browser/test-stream-duplex')(t);
  if (isBrowser) {
      require('readable-stream/test/browser/test-stream-end-paused')(t);
  }
  require('readable-stream/test/browser/test-stream-ispaused')(t);
  require('readable-stream/test/browser/test-stream-pipe-after-end')(t);

//  node specific
//  require('readable-stream/test/browser/test-stream-pipe-cleanup')(t);
//  require('readable-stream/test/browser/test-stream-pipe-cleanup-pause')(t);

  require('readable-stream/test/browser/test-stream-pipe-error-handling')(t);
  require('readable-stream/test/browser/test-stream-pipe-event')(t);
  require('readable-stream/test/browser/test-stream-push-order')(t);
if (isBrowser) {
//  fail
//  require('readable-stream/test/browser/test-stream-push-strings')(t);
}
  require('readable-stream/test/browser/test-stream-readable-constructor-set-methods')(t);
  if (!isBrowser) {
      require('readable-stream/test/browser/test-stream-readable-event')(t);
  }
  require('readable-stream/test/browser/test-stream-transform-constructor-set-methods')(t);
  if (isBrowser) {
      require('readable-stream/test/browser/test-stream-transform-objectmode-falsey-value')(t);
  }
  require('readable-stream/test/browser/test-stream-transform-split-objectmode')(t);
  if (isBrowser) {
      require('readable-stream/test/browser/test-stream-unshift-empty-chunk')(t);
//    fail
//      require('readable-stream/test/browser/test-stream-unshift-read-race')(t);
  }
  require('readable-stream/test/browser/test-stream-writable-change-default-encoding')(t);
  require('readable-stream/test/browser/test-stream-writable-constructor-set-methods')(t);
  require('readable-stream/test/browser/test-stream-writable-decoded-encoding')(t);
  if (isBrowser) {
      require('readable-stream/test/browser/test-stream-writev')(t);
  }
  require('readable-stream/test/browser/test-stream-sync-write')(t);
  require('readable-stream/test/browser/test-stream-pipe-without-listenerCount');
});

test('streams 2', function (t) {
// ?
//  require('readable-stream/test/browser/test-stream2-base64-single-char-read-end')(t);
  if (isBrowser) {
//    fail
//      require('readable-stream/test/browser/test-stream2-compatibility')(t);
//    stack overflow
//      require('readable-stream/test/browser/test-stream2-large-read-stall')(t);
//    fail
//      require('readable-stream/test/browser/test-stream2-objects')(t);
  }
  require('readable-stream/test/browser/test-stream2-pipe-error-handling')(t);
  if (isBrowser) {
//    fail
//      require('readable-stream/test/browser/test-stream2-pipe-error-once-listener')(t);
//    fail
//      require('readable-stream/test/browser/test-stream2-push')(t);
//    fail
//      require('readable-stream/test/browser/test-stream2-readable-empty-buffer-no-eof')(t);
  }
  require('readable-stream/test/browser/test-stream2-readable-from-list')(t);
  if (isBrowser) {
//    fail
//      require('readable-stream/test/browser/test-stream2-transform')(t);
  }
  if (!isBrowser) {
      require('readable-stream/test/browser/test-stream2-set-encoding')(t);
  }
  if (isBrowser) {
      require('readable-stream/test/browser/test-stream2-readable-legacy-drain')(t);
  }
  require('readable-stream/test/browser/test-stream2-readable-wrap-empty')(t);
  require('readable-stream/test/browser/test-stream2-readable-non-empty-end')(t);
  if (!isBrowser) {
      require('readable-stream/test/browser/test-stream2-readable-wrap')(t);
  }
  if (isBrowser) {
      require('readable-stream/test/browser/test-stream2-unpipe-drain')(t);
//    fail
//      require('readable-stream/test/browser/test-stream2-writable')(t);
  }
});
test('streams 3', function (t) {
  if (isBrowser) {
//    fail
//      require('readable-stream/test/browser/test-stream3-pause-then-read')(t);
  }
});

require = requireOrig;});
