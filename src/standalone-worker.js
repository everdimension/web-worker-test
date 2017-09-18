/**
 * The contents of this file are conceptually the same as
 * the contents of `/src/simple.worker.js` file.
 * The difference is that this file has the `doComputations` function hardcoded
 * and is not transpiled by webpack in any way.
 */

function doComputations(iterations = 100000000) {
  /* this function is an exact copy of `/src/doComputations.js` */
  const arr = [];
  for (var i = 0; i < iterations; i++) {
    const val = i * Math.sqrt(arr.length);
    if (arr.length > 1000000) {
      arr.length = 200000;
    }
    arr.push({ val });
  }
  return arr;
}

self.onmessage = function(e) {
  console.log(`Will run ${e.data} iterations in a standalone worker`);
  const res = doComputations(e.data);

  console.log('standalone worker done');
  postMessage(res);
};
