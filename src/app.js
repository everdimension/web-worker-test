import doComputations from './doComputations';

const createNewWorker = require('./simple.worker.js');
// const worker = new Worker(require('./simple.worker.js'));
// const worker = require('file-loader!worker');
const worker = createNewWorker();

const input = document.querySelector('input');
const mainThreadButton = document.getElementById('mainThread');
const workerButton = document.getElementById('worker');
const results = document.createElement('div');
document.body.appendChild(results);

function resetPerformance() {
  performance.clearMeasures();
  performance.clearMarks();
}

function getTimeTaken() {
  performance.measure('computations', 'start', 'end');
  const perfMeasure = performance.getEntriesByType('measure')[0];
  return perfMeasure.duration;
}

function renderResult(duration) {
  const p = document.createElement('p');
  p.textContent = `Time taken: ${duration}`;
  results.appendChild(p);
}

worker.onmessage = (e) => {
  performance.mark('end');
  renderResult(getTimeTaken());
};

mainThreadButton.addEventListener('click', () => {
  resetPerformance();

  input.focus();
  performance.mark('start');

  doComputations(100000000); // 7844.904052734375ms

  performance.mark('end');

  renderResult(getTimeTaken());
});

workerButton.addEventListener('click', () => {
  resetPerformance();

  input.focus();
  performance.mark('start');

  worker.postMessage(100000000);
});
