/**
 * The contents of this file are conceptually the same as
 * the contents of `/src/standalone-worker.js` file.
 * The difference is that this file is transpiled and bundled by webpack.
 */

import doComputations from './doComputations';

self.onmessage = function(e) {
  console.log(`Will run ${e.data} iterations in a webpack-bundled worker`);
  const res = doComputations(e.data);

  console.log('webpack worker done');
  postMessage(res);
};
