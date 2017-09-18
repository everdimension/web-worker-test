import 'performance-polyfill'; // for safari
import doComputations from './doComputations';
const createNewWorker = require('./simple.worker.js');
const stanadloneWorkerURL = require('file-loader!./standalone-worker.js');
import {
  mainThreadButton,
  mainThreadInlineButton,
  workerButton,
  standaloneWorkerButton,
  input,
  renderResult,
  renderLoader,
  removeLoader,
} from './view';

const NUMBER_OF_ITERATIONS = 100000000;

function getDuration(type) {
  performance.measure(type, `start-${type}`, `end-${type}`);
  const measureItems = performance
    .getEntriesByType('measure')
    .filter(m => m.name === type);
  const latestMeasure = measureItems[measureItems.length - 1];
  return latestMeasure.duration;
}

mainThreadButton.addEventListener('click', () => {
  performance.mark('start-mainThread');

  renderLoader();

  setTimeout(() => { // give a chance to `renderLoader`
    doComputations(NUMBER_OF_ITERATIONS);

    performance.mark('end-mainThread');

    setTimeout(() => removeLoader());
    renderResult({ type: 'mainThread', duration: getDuration('mainThread') });
  }, 100);
});

function doComputationsInline(iterations = 100000000) {
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

mainThreadInlineButton.addEventListener('click', () => {
  performance.mark('start-mainThreadInline');

  renderLoader();
  setTimeout(() => { // give a chance to `renderLoader`
    doComputations(NUMBER_OF_ITERATIONS);

    performance.mark('end-mainThreadInline');

    setTimeout(() => removeLoader());
    renderResult({
      type: 'mainThreadInline',
      duration: getDuration('mainThreadInline'),
    }, 100);
  });
});

workerButton.addEventListener('click', () => {
  const webpackWorker = createNewWorker();
  webpackWorker.onmessage = e => {
    performance.mark('end-webpackWorker');
    removeLoader();
    renderResult({
      type: 'webpackWorker',
      duration: getDuration('webpackWorker'),
    });
    webpackWorker.terminate();
  };

  renderLoader();
  performance.mark('start-webpackWorker');

  webpackWorker.postMessage(NUMBER_OF_ITERATIONS);
});

standaloneWorkerButton.addEventListener('click', () => {
  const standaloneWorker = new Worker(stanadloneWorkerURL);
  standaloneWorker.onmessage = e => {
    performance.mark('end-standaloneWorker');
    removeLoader();
    renderResult({
      type: 'standaloneWorker',
      duration: getDuration('standaloneWorker'),
    });
    standaloneWorker.terminate();
  };

  renderLoader();
  performance.mark('start-standaloneWorker');

  standaloneWorker.postMessage(NUMBER_OF_ITERATIONS);
});
