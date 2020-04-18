/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/custom-polyfill.js":
/*!****************************************!*\
  !*** ./src/scripts/custom-polyfill.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint-disable func-names, no-plusplus, operator-linebreak, no-continue */
// Element.prototype.matches polyfill
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s);
    var i = matches.length;

    while (--i >= 0 && matches.item(i) !== this) {
      continue;
    }

    return i > -1;
  };
}

/***/ }),

/***/ "./src/scripts/framework/enum.js":
/*!***************************************!*\
  !*** ./src/scripts/framework/enum.js ***!
  \***************************************/
/*! exports provided: breakpoints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "breakpoints", function() { return breakpoints; });
// eslint-disable-next-line import/prefer-default-export
var breakpoints = {
  SIZE_XXL: 1600,
  SIZE_XL: 1440,
  SIZE_LG: 1200,
  SIZE_MD: 1024,
  SIZE_SM: 768,
  SIZE_XS: 480,
  SIZE_XXS: 320,
  SIZE_0: 0
};

/***/ }),

/***/ "./src/scripts/framework/framework.js":
/*!********************************************!*\
  !*** ./src/scripts/framework/framework.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var iframe_resizer_js_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! iframe-resizer/js/index */ "./node_modules/iframe-resizer/js/index.js");
/* harmony import */ var iframe_resizer_js_index__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(iframe_resizer_js_index__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var css_element_queries__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! css-element-queries */ "./node_modules/css-element-queries/index.js");
/* harmony import */ var css_element_queries__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(css_element_queries__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/scripts/framework/utils.js");
/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./enum */ "./src/scripts/framework/enum.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/menu */ "./src/scripts/modules/menu.js");
/* harmony import */ var _modules_infinitescroll__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/infinitescroll */ "./src/scripts/modules/infinitescroll.js");
/* harmony import */ var _modules_analytics_events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../modules/analytics.events */ "./src/scripts/modules/analytics.events.js");
/* harmony import */ var _modules_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../modules/ui */ "./src/scripts/modules/ui.js");
/* harmony import */ var _modules_video__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../modules/video */ "./src/scripts/modules/video.js");
/* harmony import */ var _modules_radial_menu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../modules/radial-menu */ "./src/scripts/modules/radial-menu.js");




 // Modules







var App = {
  init: function init() {
    Object(_utils__WEBPACK_IMPORTED_MODULE_3__["cp"])('fetch', 'mounted', 'events', 'analytics')(this);
    return this;
  },
  fetch: function fetch() {},
  mounted: function mounted() {
    // ui stuff
    Object(_modules_ui__WEBPACK_IMPORTED_MODULE_8__["uiButtons"])(); // call resize

    setTimeout(function () {
      if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
        var evt = document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
      } else {
        window.dispatchEvent(new Event('resize'));
      }
    }, 100); // *** START Element queries *** //
    // Parses all available CSS and attach ResizeSensor to those elements which have rules attached

    css_element_queries__WEBPACK_IMPORTED_MODULE_2__["ElementQueries"].init(); // *** END Element queries *** //
    // iframe fixer

    Object(iframe_resizer_js_index__WEBPACK_IMPORTED_MODULE_1__["iframeResize"])(null, 'iframe:not(#et-fb-app-frame)'); // Infinite Scroll Pagination

    Object(_modules_infinitescroll__WEBPACK_IMPORTED_MODULE_6__["default"])(); // Trigger focus on Authentication Platform graphic

    Object(_modules_radial_menu__WEBPACK_IMPORTED_MODULE_10__["circleAnimation"])();
  },
  events: function events() {
    // Clicks
    if (this.bodyEl.addEventListener) this.bodyEl.addEventListener('click', this.clickHandler.bind(this), true);else if (this.bodyEl.attachEvent) this.bodyEl.attachEvent('onclick', this.clickHandler.bind(this), true); // IE
    // Scroll

    document.addEventListener('scroll', lodash__WEBPACK_IMPORTED_MODULE_0___default.a.throttle(this.scrollHandler.bind(this), 50));
    document.addEventListener('touchstart', lodash__WEBPACK_IMPORTED_MODULE_0___default.a.throttle(this.scrollHandler.bind(this), 50)); // Keys

    window.addEventListener('keydown', this.keyBoardHandler.bind(this), true); // Resize

    window.addEventListener('resize', lodash__WEBPACK_IMPORTED_MODULE_0___default.a.debounce(this.resize.bind(this), 200), false);
    return this;
  },
  clickHandler: function clickHandler(event) {
    var button = event.button,
        quantity = event.detail,
        target = event.target,
        type = event.type; // Menu

    if (this.hamburgerEl === target) Object(_modules_menu__WEBPACK_IMPORTED_MODULE_5__["default"])();
  },
  scrollHandler: function scrollHandler(event) {
    // Infinite Scroll Pagination
    Object(_modules_infinitescroll__WEBPACK_IMPORTED_MODULE_6__["default"])();
  },
  keyBoardHandler: function keyBoardHandler(event) {
    // eslint-disable-next-line no-unused-vars
    var key = event.keyCode;
  },
  resize: function resize(e) {
    // eslint-disable-next-line no-unused-vars
    var bp = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["detectViewMode"])(_enum__WEBPACK_IMPORTED_MODULE_4__["breakpoints"]);
  },
  analytics: function analytics() {
    // Add event listener to all links to .pdf files
    Object(_modules_analytics_events__WEBPACK_IMPORTED_MODULE_7__["crawlPdfAnchors"])(); // Add event listener to all links with a `data-event-listener` attr

    Object(_modules_analytics_events__WEBPACK_IMPORTED_MODULE_7__["crawlAnchors"])(); // Add event listener to all links to .png files

    Object(_modules_analytics_events__WEBPACK_IMPORTED_MODULE_7__["crawlPngAnchors"])();
  }
};
/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/scripts/framework/utils.js":
/*!****************************************!*\
  !*** ./src/scripts/framework/utils.js ***!
  \****************************************/
/*! exports provided: cp, detectViewMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cp", function() { return cp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detectViewMode", function() { return detectViewMode; });
var cp = function cp() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    fns.forEach(function (fn) {
      if (typeof context[fn] === 'function') {
        context[fn].call(context);
      }
    });
  };
};
var detectViewMode = function detectViewMode(BP) {
  var currentBreakPoint = BP[Object.keys(BP)[0]];

  for (var bp in BP) {
    if (window.matchMedia("screen and (min-width: ".concat(BP[bp], "px)")).matches) {
      currentBreakPoint = BP[bp];
      break;
    }
  }

  return currentBreakPoint;
};

/***/ }),

/***/ "./src/scripts/lazysizes.js":
/*!**********************************!*\
  !*** ./src/scripts/lazysizes.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lazysizes_plugins_custommedia_ls_custommedia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lazysizes/plugins/custommedia/ls.custommedia */ "./node_modules/lazysizes/plugins/custommedia/ls.custommedia.js");
/* harmony import */ var lazysizes_plugins_custommedia_ls_custommedia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lazysizes_plugins_custommedia_ls_custommedia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lazysizes */ "./node_modules/lazysizes/lazysizes.js");
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lazysizes__WEBPACK_IMPORTED_MODULE_1__);


window.lazySizesConfig = window.lazySizesConfig || {};

/***/ }),

/***/ "./src/scripts/main.js":
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/menu */ "./src/scripts/modules/menu.js");
/* harmony import */ var _framework_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./framework/framework */ "./src/scripts/framework/framework.js");
/* harmony import */ var _custom_polyfill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom-polyfill */ "./src/scripts/custom-polyfill.js");
/* harmony import */ var _custom_polyfill__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_custom_polyfill__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lity */ "./node_modules/lity/dist/lity.js");
/* harmony import */ var lity__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lity__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lazysizes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lazysizes */ "./src/scripts/lazysizes.js");
/* harmony import */ var _wiki__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./wiki */ "./src/scripts/wiki.js");
/* harmony import */ var _wiki__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wiki__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scripts */ "./src/scripts/scripts.js");
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_scripts__WEBPACK_IMPORTED_MODULE_6__);
 // Menu vars





 // Legacy scripts


/* init */

var app = function app(proto, ext) {
  return Object.assign(Object.create(proto), ext);
};

var bodyEl = document.querySelector('body');
var ext = {
  bodyEl: bodyEl,
  bodyClasses: bodyEl.classList,
  hamburgerEl: _modules_menu__WEBPACK_IMPORTED_MODULE_0__["hamburgerEl"],
  menuFooter: _modules_menu__WEBPACK_IMPORTED_MODULE_0__["menuFooter"]
};

if (document.readyState !== 'loading') {
  app(_framework_framework__WEBPACK_IMPORTED_MODULE_1__["default"], ext).init();
} else {
  document.addEventListener('DOMContentLoaded', function () {
    app(_framework_framework__WEBPACK_IMPORTED_MODULE_1__["default"], ext).init();
  });
}

/***/ }),

/***/ "./src/scripts/modules/analytics.events.js":
/*!*************************************************!*\
  !*** ./src/scripts/modules/analytics.events.js ***!
  \*************************************************/
/*! exports provided: crawlPdfAnchors, crawlAnchors, crawlPngAnchors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "crawlPdfAnchors", function() { return crawlPdfAnchors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "crawlAnchors", function() { return crawlAnchors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "crawlPngAnchors", function() { return crawlPngAnchors; });
var clickHandler = function clickHandler(cat, act, label, val) {
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/events#implementation
  // eslint-disable-next-line no-undef
  ga('send', 'event', cat, act, label, val);
};

var addListeners = function addListeners(elem, cat, act, label, val) {
  // https://stackoverflow.com/a/10896968/605748
  if (elem.addEventListener) elem.addEventListener('click', function () {
    return clickHandler(cat, act, label, val);
  });else if (elem.attachEvent) elem.attachEvent('onclick', function () {
    return clickHandler(cat, act, label, val);
  });
}; // Add event listener to all links to .pdf files


var crawlPdfAnchors = function crawlPdfAnchors() {
  var $pdfAnchors = Array.prototype.slice.call(document.querySelectorAll('a[href*=".pdf"]'));
  $pdfAnchors.forEach(function (pdf) {
    var filename = pdf.pathname.match(/[^/]+$/m)[0];
    addListeners(pdf, 'PDF', 'read', filename, null);
  });
}; // Add event listener to all links with a `data-event-listener` attr

var crawlAnchors = function crawlAnchors() {
  var $anchors = Array.prototype.slice.call(document.querySelectorAll('a[data-event-listener]'));
  $anchors.forEach(function (elem) {
    var eventListener = elem.dataset.eventListener;

    if (eventListener === 'on') {
      var eventValue = elem.textContent;
      addListeners(elem, 'Menu', 'click', eventValue, null);
    }
  });
}; // Add event listener to all links to .png files

var crawlPngAnchors = function crawlPngAnchors() {
  var $pngAnchors = Array.prototype.slice.call(document.querySelectorAll('a[href*=".png"]'));
  $pngAnchors.forEach(function (png) {
    var filename = png.pathname.match(/[^/]+$/m)[0];
    addListeners(png, 'PNG', 'read', filename, null);
  });
};

/***/ }),

/***/ "./src/scripts/modules/infinitescroll.js":
/*!***********************************************!*\
  !*** ./src/scripts/modules/infinitescroll.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// eslint-disable-next-line no-undef
var $ = jQuery;
var options = {
  nextSelector: '.pagination .next',
  navSelector: '.pagination',
  itemSelector: '.card-container',
  contentSelector: '.cards'
};
var loading = false;
var finished = false;
var desturl = $(options.nextSelector).attr('href'); // init next url

var mainAjax = function mainAjax() {
  var lastElem = $(options.itemSelector).last(); // set loader and loading

  $(options.navSelector).css('display', 'none').after('<progress class="pagination-loader" max="100"></progress>');
  loading = true; // decode url to prevent error

  desturl = decodeURIComponent(desturl);
  desturl = desturl.replace(/^(?:\/\/|[^/]+)*\//, '/'); // ajax call

  $.ajax({
    url: desturl,
    dataType: 'html',
    cache: false,
    success: function success(data) {
      var obj = $(data);
      var elems = obj.find(options.itemSelector);
      var next = obj.find(options.nextSelector);

      if (next.length) {
        desturl = next.attr('href');
      } else {
        finished = true;
      }

      lastElem.after(elems);
      $('.pagination-loader').remove();
      setTimeout(function () {
        loading = false;
      }, 1000);
    }
  });
};

var initInfiniteScroll = function initInfiniteScroll() {
  var w = $(window);
  var elem = $(options.itemSelector).last();

  if (typeof elem !== 'undefined' && !loading && !finished && desturl && w.scrollTop() + w.height() >= elem.offset().top - 2 * elem.height()) {
    mainAjax();
  }
};

/* harmony default export */ __webpack_exports__["default"] = (initInfiniteScroll);

/***/ }),

/***/ "./src/scripts/modules/menu.js":
/*!*************************************!*\
  !*** ./src/scripts/modules/menu.js ***!
  \*************************************/
/*! exports provided: hamburgerEl, menuFooter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hamburgerEl", function() { return hamburgerEl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "menuFooter", function() { return menuFooter; });
var hamburgerEl = document.querySelector('.mobile_menu_bar_toggle');
var menuFooter = document.querySelector('#top-header');

var initMenu = function initMenu() {
  menuFooter.classList.toggle('open');
};

/* harmony default export */ __webpack_exports__["default"] = (initMenu);

/***/ }),

/***/ "./src/scripts/modules/radial-menu.js":
/*!********************************************!*\
  !*** ./src/scripts/modules/radial-menu.js ***!
  \********************************************/
/*! exports provided: circleAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circleAnimation", function() { return circleAnimation; });
// Trigger focus on Authentication Platform graphic
var scrollIntoView = function scrollIntoView(elem) {
  var id = elem.dataset.id;
  document.querySelector("#".concat(id)).scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
};

var clickHandler = function clickHandler(elem) {
  scrollIntoView(elem);
};

var addListeners = function addListeners(elem) {
  // https://stackoverflow.com/a/10896968/605748
  if (elem.addEventListener) elem.addEventListener('click', function () {
    return clickHandler(elem);
  });else if (elem.attachEvent) elem.attachEvent('onclick', function () {
    return clickHandler(elem);
  });
}; // eslint-disable-next-line import/prefer-default-export


var circleAnimation = function circleAnimation() {
  var $icons = document.querySelectorAll('.circle-container > *');
  var iconTimer = 150;
  if ($icons.length === 0) return;
  setTimeout(function () {
    (function circleLoop(i) {
      setTimeout(function () {
        var elem = $icons[i - 1]; // Add hover class

        elem.classList.add('hover'); // Add event listener to control clicks/taps

        addListeners(elem);
        setTimeout(function () {
          // Remove hover class
          $icons[i - 1].classList.remove('hover'); // Loop over icons
          // eslint-disable-next-line no-plusplus, no-param-reassign

          if (--i) circleLoop(i);
        }, iconTimer * 1.5);
      }, iconTimer);
    })($icons.length);
  }, 500);
};

/***/ }),

/***/ "./src/scripts/modules/ui.js":
/*!***********************************!*\
  !*** ./src/scripts/modules/ui.js ***!
  \***********************************/
/*! exports provided: uiButtons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uiButtons", function() { return uiButtons; });
// UI
// eslint-disable-next-line import/prefer-default-export
var uiButtons = function uiButtons() {
  // Standardize button attributes/style
  // we are wrapping input elements to enable the use of ::after (pseudo-element)
  // the end effect is to copy the hover effect in place for <a> tags
  // we can't use ::after on <input> directly: https://stackoverflow.com/a/4660434/605748
  // also see: global.scss `.et_pb_button > input`
  setTimeout(function () {
    var $buttons = Array.prototype.slice.call(document.querySelectorAll('.hs-button')); // console.log('$buttons', $buttons);

    $buttons.forEach(function (elem) {
      var _wrapper$classList;

      // create wrapper container
      var wrapper = document.createElement('span');

      (_wrapper$classList = wrapper.classList).add.apply(_wrapper$classList, ['et_pb_button', 'et_pb_bg_layout_dark']); // insert wrapper before elem in the DOM tree


      elem.parentNode.insertBefore(wrapper, elem); // move el into wrapper

      wrapper.appendChild(elem);
    });
  }, 200);
};

/***/ }),

/***/ "./src/scripts/modules/video.js":
/*!**************************************!*\
  !*** ./src/scripts/modules/video.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var plyr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! plyr */ "./node_modules/plyr/dist/plyr.min.js");
/* harmony import */ var plyr__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(plyr__WEBPACK_IMPORTED_MODULE_0__);
// Video

var playerConfig = {
  enabled: true,
  controls: ['current-time', 'mute', 'play-large', 'progress', 'volume'],
  iconUrl: null,
  autoplay: false,
  clickToPlay: true,
  disableContextMenu: true,
  hideControls: true,
  resetOnEnd: true,
  tooltips: {
    controls: true
  },
  displayDuration: true,
  captions: {
    active: false
  },
  ratio: '16:9',
  quality: {
    "default": 720
  },
  loop: {
    active: true
  },
  youtube: {
    noCookie: false,
    rel: 0,
    showinfo: 0,
    iv_load_policy: 3,
    modestbranding: 1
  }
};
var players = Array.from(document.querySelectorAll('.et_pb_module.hyprse_youtube #player')).map(function (p) {
  return new plyr__WEBPACK_IMPORTED_MODULE_0___default.a(p, playerConfig);
});
/* harmony default export */ __webpack_exports__["default"] = (players);

/***/ }),

/***/ "./src/scripts/scripts.js":
/*!********************************!*\
  !*** ./src/scripts/scripts.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var _this = this;

// eslint-disable-next-line no-undef
jQuery(function ($) {
  $('body').addClass('pageload');

  var demoslides = function demoslides(slide) {
    $('.switch-container.enter').removeClass('exit'); // Exit

    var active = $('.switch-container.active');
    $('.switch-container.active').addClass('exit'); // Enter

    active.removeClass('exit').removeClass('active').removeClass('enter'); // Reset

    setTimeout(function () {
      slide.addClass('active').addClass('enter');
    }, 200);
  };

  var demoone = function demoone() {
    $('#one-btn').parent().addClass('active');
    $('#one').addClass('enter');
    var slide = $('#one');
    demoslides(slide);
    window.location.hash = 'schedule';
  };

  var demoexperience = function demoexperience() {
    $('#experience-btn').parent().addClass('active');
    $('#experience').addClass('enter');
    window.location.hash = 'exp';
    var slide = $('#experience');
    demoslides(slide);
  };

  var demo = function demo() {
    $('.btn-demo').click(function () {
      var btn = $(_this);
      var current = $(_this).parent();

      if ($(_this).parent().hasClass('active')) {
        current.removeClass('active');
      } else {
        if (btn.attr('id') === 'experience-btn') {
          $('.btn-demo').parent().removeClass('active');
          demoexperience();
        }

        if (btn.attr('id') === 'one-btn') {
          $('.btn-demo').parent().removeClass('active');
          demoone();
        }
      }
    });
    var loc = window.location.hash;

    if (loc === '#exp') {
      $('.btn-demo').parent().removeClass('active');
      demoexperience();
    }

    if (loc === '#schedule') {
      $('.btn-demo').parent().removeClass('active');
      demoone();
    }
  };

  var init = function init() {
    if ($('#switch-content').length) {
      demo();
    } // Check for table


    if ($('table').length) {
      $('table').wrap('<div class=table-wrap>');
    }

    $('#menu-item-154').find('a.quadmenu-dropdown-toggle.hoverintent').attr('href', '');
    var cta = $('#menu-item-19649').clone();
    $('#et-secondary-nav.menu').prepend(cta);
  };

  init();
});

/***/ }),

/***/ "./src/scripts/wiki.js":
/*!*****************************!*\
  !*** ./src/scripts/wiki.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var scrollToView = function scrollToView(elem) {
  var tidClicked = elem.parentNode.dataset.tid;
  var header = document.querySelector("[data-tid=\"".concat(tidClicked, "\"]"));
  header.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
};

var clickHandler = function clickHandler(elem) {
  var tidClicked = elem.parentNode.dataset.tid; // Hide open content blocks

  var opened = Array.from(document.querySelectorAll('[data-tid].open'));
  opened.forEach(function (el) {
    if (el.dataset.tid !== tidClicked) {
      el.classList.remove('open');
    }
  }); // Toggle class on section/taxonomy header

  var container = elem.parentElement;
  container.classList.toggle('open');
  scrollToView(elem);
};

var addListeners = function addListeners(elem) {
  // https://stackoverflow.com/a/10896968/605748
  if (elem.addEventListener) elem.addEventListener('click', function () {
    return clickHandler(elem);
  });else if (elem.attachEvent) elem.attachEvent('onclick', function () {
    return clickHandler(elem);
  });
};

document.addEventListener('DOMContentLoaded', function () {
  var $headers = Array.prototype.slice.call(document.querySelectorAll('[data-tid] .header'));
  $headers.forEach(function (elem) {
    var tid = elem.parentElement.dataset.tid;

    if (tid) {
      addListeners(elem);
    }
  });
});

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 0:
/*!**********************************************************!*\
  !*** multi ./src/styles/main.scss ./src/scripts/main.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/styles/main.scss */"./src/styles/main.scss");
module.exports = __webpack_require__(/*! ./src/scripts/main.js */"./src/scripts/main.js");


/***/ })

/******/ });
//# sourceMappingURL=main.js.map