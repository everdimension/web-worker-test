function doComputations(iterations = 100000000) {
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
  console.log('worker msg....', e);
  const res = doComputations(e.data);

  console.log('res');
  postMessage(res);
}
