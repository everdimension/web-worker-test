'use strict';

/**
 * The contents of this file are conceptually the same as
 * the contents of `/src/simple.worker.js` file.
 * The difference is that this file has the `doComputations` function hardcoded
 * and is not transpiled by webpack in any way.
 */

function doComputations() {
  var iterations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100000000;

  /* this function is an exact copy of `/src/doComputations.js` */
  var arr = [];
  for (var i = 0; i < iterations; i++) {
    var val = i * Math.sqrt(arr.length);
    if (arr.length > 1000000) {
      arr.length = 200000;
    }
    arr.push({ val: val });
  }
  return arr;
}

self.onmessage = function (e) {
  console.log('Will run ' + e.data + ' iterations in a standalone worker');
  var res = doComputations(e.data);

  console.log('standalone worker done');
  postMessage(res);
};