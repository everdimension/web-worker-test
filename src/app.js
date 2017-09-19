import doComputations from './doComputations';

const {
  fromModuleButton,
  renderResult,
  renderLoader,
  removeLoader,
} = window;

const NUMBER_OF_ITERATIONS = 100000000;

function getDuration(type) {
  performance.measure(type, `start-${type}`, `end-${type}`);
  const measureItems = performance
    .getEntriesByType('measure')
    .filter(m => m.name === type);
  const latestMeasure = measureItems[measureItems.length - 1];
  return latestMeasure.duration;
}

fromModuleButton.addEventListener('click', () => {
  performance.mark('start-fromModule');

  renderLoader();

  setTimeout(() => { // give a chance to `renderLoader`
    doComputations(NUMBER_OF_ITERATIONS);

    performance.mark('end-fromModule');

    setTimeout(() => removeLoader());
    renderResult({ type: 'fromModule', duration: getDuration('fromModule') });
  }, 100);
});
