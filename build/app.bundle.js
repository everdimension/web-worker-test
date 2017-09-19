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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _doComputations = __webpack_require__(1);

var _doComputations2 = _interopRequireDefault(_doComputations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _window = window,
    fromModuleButton = _window.fromModuleButton,
    renderResult = _window.renderResult,
    renderLoader = _window.renderLoader,
    removeLoader = _window.removeLoader;


var NUMBER_OF_ITERATIONS = 100000000;

function getDuration(type) {
  performance.measure(type, 'start-' + type, 'end-' + type);
  var measureItems = performance.getEntriesByType('measure').filter(function (m) {
    return m.name === type;
  });
  var latestMeasure = measureItems[measureItems.length - 1];
  return latestMeasure.duration;
}

fromModuleButton.addEventListener('click', function () {
  performance.mark('start-fromModule');

  renderLoader();

  setTimeout(function () {
    // give a chance to `renderLoader`
    (0, _doComputations2.default)(NUMBER_OF_ITERATIONS);

    performance.mark('end-fromModule');

    setTimeout(function () {
      return removeLoader();
    });
    renderResult({ type: 'fromModule', duration: getDuration('fromModule') });
  }, 100);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = doComputations;
function doComputations() {
  var iterations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100000000;

  var arr = [];
  for (var i = 0; i < iterations; i++) {
    var val = i * Math.sqrt(arr.length);
    if (arr.length > 1000000) {
      arr.length = 200000;
    }
    arr.push({ val: val });
  }
  return arr;
}

/***/ })
/******/ ]);