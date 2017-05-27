define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
'use strict';

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return fn.call(null);
  case 2:
    return nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

module.exports = nextTick;

return module.exports;});
