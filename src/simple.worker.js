import doComputations from './doComputations';

self.onmessage = function(e) {
  console.log('worker msg....', e);
  const res = doComputations(e.data);

  console.log('res');
  postMessage(res);
}
