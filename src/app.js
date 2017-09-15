import doComputations from './doComputations';

// const worker = new Worker(require('./simple.worker.js'));
const worker = require('file-loader!./simple.worker.js');
// const worker = require('file-loader!worker');
console.log({ worker });
const input = document.querySelector('input');

const res = document.createElement('p');

worker.onmessage = (e) => {
  console.timeEnd('start of operations');
  console.log(e.data[e.data.length - 1]);
  res.textContent = e.data[e.data.length - 1].val;
  document.body.appendChild(res);
};

document.querySelector('button').addEventListener('click', () => {
  input.focus();

  console.time('start of operations');
  worker.postMessage(100000000);
  // doComputations(100000000); // 7844.904052734375ms
});
