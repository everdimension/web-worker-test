console.log('hi from app latest');

const pic = require('file-loader!./pic.jpg');
console.log('pic is', { pic });


const worker = new Worker(require('./folder/some.worker.js'));
Object.assign(window, { worker });

const input = document.querySelector('input');

const res = document.createElement('p');
worker.onmessage = (e) => {
  console.timeEnd('start of operations');
  console.log(e.data[e.data.length - 1]);
  res.textContent = e.data[e.data.length - 1].val;
  document.body.appendChild(res);
};

function doComputations(iterations) {
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

document.querySelector('button').addEventListener('click', () => {
  input.focus();

  console.time('start of operations');
  worker.postMessage(100000000);
  // doComputations(100000000); // 7844.904052734375ms
});
