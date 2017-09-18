import doComputations from './doComputations';
const createNewWorker = require('./simple.worker.js');
const stanadloneWorkerURL = require('file-loader!./standalone-worker.js');

const input = document.querySelector('input');
const mainThreadButton = document.getElementById('mainThread');
const workerButton = document.getElementById('worker');
const standaloneWorkerButton = document.getElementById('standaloneWorker');
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

function renderResult({ type, duration }) {
  const p = document.createElement('p');
  p.textContent = `Type: ${type}, Time taken: ${duration}`;
  results.appendChild(p);
}

mainThreadButton.addEventListener('click', () => {
  resetPerformance();

  input.focus();
  performance.mark('start');

  doComputations(100000000); // 7844.904052734375ms

  performance.mark('end');

  renderResult({ type: 'main thread', duration: getTimeTaken() });
});

workerButton.addEventListener('click', () => {
  resetPerformance();

  const webpackWorker = createNewWorker();
  webpackWorker.onmessage = (e) => {
    performance.mark('end');
    renderResult({ type: 'webpack web worker', duration: getTimeTaken() });
    webpackWorker.terminate();
  };

  input.focus();
  performance.mark('start');

  webpackWorker.postMessage(100000000);
});

standaloneWorkerButton.addEventListener('click', () => {
  resetPerformance();

  const standaloneWorker = new Worker(stanadloneWorkerURL);
  standaloneWorker.onmessage = (e) => {
    performance.mark('end');
    renderResult({ type: 'standalone web worker', duration: getTimeTaken() });
    standaloneWorker.terminate();
  };

  input.focus();
  performance.mark('start');

  standaloneWorker.postMessage(100000000);
});
