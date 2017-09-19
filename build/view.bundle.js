/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var input = document.querySelector('input');
var mainThreadButton = document.getElementById('mainThread');
var mainThreadInlineButton = document.getElementById('mainThreadInline');
var workerButton = document.getElementById('webpackWorker');
var standaloneWorkerButton = document.getElementById('standaloneWorker');
var results = document.getElementById('results');

function renderResult(_ref) {
  var type = _ref.type,
      duration = _ref.duration;

  var p = document.createElement('p');
  p.textContent = 'Type: ' + type + ', Time taken: ' + duration;
  results.appendChild(p);
  p.scrollIntoView();
}

function renderLoader() {
  var existingLoader = document.querySelector('.loader');

  if (existingLoader) {
    return; // do not render another one
  }

  var loader = document.createElement('loader');
  loader.classList.add('loader');
  loader.textContent = 'running computations, be patient...';
  document.body.appendChild(loader);
}

function removeLoader() {
  var loader = document.querySelector('.loader');
  if (loader) {
    loader.parentNode.removeChild(loader);
  }
}

Object.assign(window, {
  mainThreadButton: mainThreadButton,
  mainThreadInlineButton: mainThreadInlineButton,
  workerButton: workerButton,
  standaloneWorkerButton: standaloneWorkerButton,
  fromModuleButton: fromModuleButton,
  unwrappedCodeButton: unwrappedCodeButton,
  input: input,
  renderLoader: renderLoader,
  removeLoader: removeLoader,
  renderResult: renderResult
});

/***/ })

/******/ });