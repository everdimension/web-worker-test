const input = document.querySelector('input');
const mainThreadButton = document.getElementById('mainThread');
const mainThreadInlineButton = document.getElementById('mainThreadInline');
const workerButton = document.getElementById('webpackWorker');
const standaloneWorkerButton = document.getElementById('standaloneWorker');
const results = document.getElementById('results');

function renderResult({ type, duration }) {
  const p = document.createElement('p');
  p.textContent = `Type: ${type}, Time taken: ${duration}`;
  results.appendChild(p);
  p.scrollIntoView();
}

function renderLoader() {
  const existingLoader = document.querySelector('.loader');

  if (existingLoader) {
    return; // do not render another one
  }

  const loader = document.createElement('loader');
  loader.classList.add('loader');
  loader.textContent = 'running computations, be patient...';
  document.body.appendChild(loader);
}

function removeLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.parentNode.removeChild(loader);
  }
}

Object.assign(window, {
  mainThreadButton,
  mainThreadInlineButton,
  workerButton,
  standaloneWorkerButton,
  fromModuleButton,
  unwrappedCodeButton,
  input,
  renderLoader,
  removeLoader,
  renderResult,
});
