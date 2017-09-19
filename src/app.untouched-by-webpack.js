/**
 * This file is basically copy of './src/app.js',
 * but it is not bundled with webpack (just copied as is)
 * and has no imports, the `doComputations` function is just copied, too
 */

(function() {
  'use strict';

  function doComputations(iterations = 100000000) {
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

  const {
    unwrappedCodeButton,
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

  unwrappedCodeButton.addEventListener('click', () => {
    performance.mark('start-untouched');

    renderLoader();

    setTimeout(() => { // give a chance to `renderLoader`
      doComputations(NUMBER_OF_ITERATIONS);

      performance.mark('end-untouched');

      setTimeout(() => removeLoader());
      renderResult({ type: 'untouched', duration: getDuration('untouched') });
    }, 100);
  });
})();
