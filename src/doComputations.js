export default function doComputations(iterations = 100000000) {
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
