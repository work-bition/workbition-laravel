(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/main"],{

/***/ "./node_modules/svg-baker-runtime/browser-symbol.js":
/*!**********************************************************!*\
  !*** ./node_modules/svg-baker-runtime/browser-symbol.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

var SpriteSymbol = function SpriteSymbol(ref) {
  var id = ref.id;
  var viewBox = ref.viewBox;
  var content = ref.content;

  this.id = id;
  this.viewBox = viewBox;
  this.content = content;
};

/**
 * @return {string}
 */
SpriteSymbol.prototype.stringify = function stringify () {
  return this.content;
};

/**
 * @return {string}
 */
SpriteSymbol.prototype.toString = function toString () {
  return this.stringify();
};

SpriteSymbol.prototype.destroy = function destroy () {
    var this$1 = this;

  ['id', 'viewBox', 'content'].forEach(function (prop) { return delete this$1[prop]; });
};

/**
 * @param {string} content
 * @return {Element}
 */
var parse = function (content) {
  var hasImportNode = !!document.importNode;
  var doc = new DOMParser().parseFromString(content, 'image/svg+xml').documentElement;

  /**
   * Fix for browser which are throwing WrongDocumentError
   * if you insert an element which is not part of the document
   * @see http://stackoverflow.com/a/7986519/4624403
   */
  if (hasImportNode) {
    return document.importNode(doc, true);
  }

  return doc;
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var deepmerge = createCommonjsModule(function (module, exports) {
(function (root, factory) {
    if (false) {} else {
        module.exports = factory();
    }
}(commonjsGlobal, function () {

function isMergeableObject(val) {
    var nonNullObject = val && typeof val === 'object';

    return nonNullObject
        && Object.prototype.toString.call(val) !== '[object RegExp]'
        && Object.prototype.toString.call(val) !== '[object Date]'
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function (key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var arrayMerge = options.arrayMerge || defaultArrayMerge;

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

return deepmerge

}));
});

var namespaces_1 = createCommonjsModule(function (module, exports) {
var namespaces = {
  svg: {
    name: 'xmlns',
    uri: 'http://www.w3.org/2000/svg'
  },
  xlink: {
    name: 'xmlns:xlink',
    uri: 'http://www.w3.org/1999/xlink'
  }
};

exports.default = namespaces;
module.exports = exports.default;
});

/**
 * @param {Object} attrs
 * @return {string}
 */
var objectToAttrsString = function (attrs) {
  return Object.keys(attrs).map(function (attr) {
    var value = attrs[attr].toString().replace(/"/g, '&quot;');
    return (attr + "=\"" + value + "\"");
  }).join(' ');
};

var svg = namespaces_1.svg;
var xlink = namespaces_1.xlink;

var defaultAttrs = {};
defaultAttrs[svg.name] = svg.uri;
defaultAttrs[xlink.name] = xlink.uri;

/**
 * @param {string} [content]
 * @param {Object} [attributes]
 * @return {string}
 */
var wrapInSvgString = function (content, attributes) {
  if ( content === void 0 ) content = '';

  var attrs = deepmerge(defaultAttrs, attributes || {});
  var attrsRendered = objectToAttrsString(attrs);
  return ("<svg " + attrsRendered + ">" + content + "</svg>");
};

var BrowserSpriteSymbol = (function (SpriteSymbol$$1) {
  function BrowserSpriteSymbol () {
    SpriteSymbol$$1.apply(this, arguments);
  }

  if ( SpriteSymbol$$1 ) BrowserSpriteSymbol.__proto__ = SpriteSymbol$$1;
  BrowserSpriteSymbol.prototype = Object.create( SpriteSymbol$$1 && SpriteSymbol$$1.prototype );
  BrowserSpriteSymbol.prototype.constructor = BrowserSpriteSymbol;

  var prototypeAccessors = { isMounted: {} };

  prototypeAccessors.isMounted.get = function () {
    return !!this.node;
  };

  /**
   * @param {Element} node
   * @return {BrowserSpriteSymbol}
   */
  BrowserSpriteSymbol.createFromExistingNode = function createFromExistingNode (node) {
    return new BrowserSpriteSymbol({
      id: node.getAttribute('id'),
      viewBox: node.getAttribute('viewBox'),
      content: node.outerHTML
    });
  };

  BrowserSpriteSymbol.prototype.destroy = function destroy () {
    if (this.isMounted) {
      this.unmount();
    }
    SpriteSymbol$$1.prototype.destroy.call(this);
  };

  /**
   * @param {Element|string} target
   * @return {Element}
   */
  BrowserSpriteSymbol.prototype.mount = function mount (target) {
    if (this.isMounted) {
      return this.node;
    }

    var mountTarget = typeof target === 'string' ? document.querySelector(target) : target;
    var node = this.render();
    this.node = node;

    mountTarget.appendChild(node);

    return node;
  };

  /**
   * @return {Element}
   */
  BrowserSpriteSymbol.prototype.render = function render () {
    var content = this.stringify();
    return parse(wrapInSvgString(content)).childNodes[0];
  };

  BrowserSpriteSymbol.prototype.unmount = function unmount () {
    this.node.parentNode.removeChild(this.node);
  };

  Object.defineProperties( BrowserSpriteSymbol.prototype, prototypeAccessors );

  return BrowserSpriteSymbol;
}(SpriteSymbol));

return BrowserSpriteSymbol;

})));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js":
/*!************************************************************************!*\
  !*** ./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var deepmerge = createCommonjsModule(function (module, exports) {
(function (root, factory) {
    if (false) {} else {
        module.exports = factory();
    }
}(commonjsGlobal, function () {

function isMergeableObject(val) {
    var nonNullObject = val && typeof val === 'object';

    return nonNullObject
        && Object.prototype.toString.call(val) !== '[object RegExp]'
        && Object.prototype.toString.call(val) !== '[object Date]'
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function (key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var arrayMerge = options.arrayMerge || defaultArrayMerge;

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

return deepmerge

}));
});

//      
// An event handler can take an optional event argument
// and should not return a value
                                          
// An array of all currently registered event handlers for a type
                                            
// A map of event types and their corresponding event handlers.
                        
                                   
  

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all                 ) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on: function on(type        , handler              ) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
		 * @memberof mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).map(function (handler) { handler(evt); });
			(all['*'] || []).map(function (handler) { handler(type, evt); });
		}
	};
}

var namespaces_1 = createCommonjsModule(function (module, exports) {
var namespaces = {
  svg: {
    name: 'xmlns',
    uri: 'http://www.w3.org/2000/svg'
  },
  xlink: {
    name: 'xmlns:xlink',
    uri: 'http://www.w3.org/1999/xlink'
  }
};

exports.default = namespaces;
module.exports = exports.default;
});

/**
 * @param {Object} attrs
 * @return {string}
 */
var objectToAttrsString = function (attrs) {
  return Object.keys(attrs).map(function (attr) {
    var value = attrs[attr].toString().replace(/"/g, '&quot;');
    return (attr + "=\"" + value + "\"");
  }).join(' ');
};

var svg = namespaces_1.svg;
var xlink = namespaces_1.xlink;

var defaultAttrs = {};
defaultAttrs[svg.name] = svg.uri;
defaultAttrs[xlink.name] = xlink.uri;

/**
 * @param {string} [content]
 * @param {Object} [attributes]
 * @return {string}
 */
var wrapInSvgString = function (content, attributes) {
  if ( content === void 0 ) content = '';

  var attrs = deepmerge(defaultAttrs, attributes || {});
  var attrsRendered = objectToAttrsString(attrs);
  return ("<svg " + attrsRendered + ">" + content + "</svg>");
};

var svg$1 = namespaces_1.svg;
var xlink$1 = namespaces_1.xlink;

var defaultConfig = {
  attrs: ( obj = {
    style: ['position: absolute', 'width: 0', 'height: 0'].join('; ')
  }, obj[svg$1.name] = svg$1.uri, obj[xlink$1.name] = xlink$1.uri, obj )
};
var obj;

var Sprite = function Sprite(config) {
  this.config = deepmerge(defaultConfig, config || {});
  this.symbols = [];
};

/**
 * Add new symbol. If symbol with the same id exists it will be replaced.
 * @param {SpriteSymbol} symbol
 * @return {boolean} `true` - symbol was added, `false` - replaced
 */
Sprite.prototype.add = function add (symbol) {
  var ref = this;
    var symbols = ref.symbols;
  var existing = this.find(symbol.id);

  if (existing) {
    symbols[symbols.indexOf(existing)] = symbol;
    return false;
  }

  symbols.push(symbol);
  return true;
};

/**
 * Remove symbol & destroy it
 * @param {string} id
 * @return {boolean} `true` - symbol was found & successfully destroyed, `false` - otherwise
 */
Sprite.prototype.remove = function remove (id) {
  var ref = this;
    var symbols = ref.symbols;
  var symbol = this.find(id);

  if (symbol) {
    symbols.splice(symbols.indexOf(symbol), 1);
    symbol.destroy();
    return true;
  }

  return false;
};

/**
 * @param {string} id
 * @return {SpriteSymbol|null}
 */
Sprite.prototype.find = function find (id) {
  return this.symbols.filter(function (s) { return s.id === id; })[0] || null;
};

/**
 * @param {string} id
 * @return {boolean}
 */
Sprite.prototype.has = function has (id) {
  return this.find(id) !== null;
};

/**
 * @return {string}
 */
Sprite.prototype.stringify = function stringify () {
  var ref = this.config;
    var attrs = ref.attrs;
  var stringifiedSymbols = this.symbols.map(function (s) { return s.stringify(); }).join('');
  return wrapInSvgString(stringifiedSymbols, attrs);
};

/**
 * @return {string}
 */
Sprite.prototype.toString = function toString () {
  return this.stringify();
};

Sprite.prototype.destroy = function destroy () {
  this.symbols.forEach(function (s) { return s.destroy(); });
};

var SpriteSymbol = function SpriteSymbol(ref) {
  var id = ref.id;
  var viewBox = ref.viewBox;
  var content = ref.content;

  this.id = id;
  this.viewBox = viewBox;
  this.content = content;
};

/**
 * @return {string}
 */
SpriteSymbol.prototype.stringify = function stringify () {
  return this.content;
};

/**
 * @return {string}
 */
SpriteSymbol.prototype.toString = function toString () {
  return this.stringify();
};

SpriteSymbol.prototype.destroy = function destroy () {
    var this$1 = this;

  ['id', 'viewBox', 'content'].forEach(function (prop) { return delete this$1[prop]; });
};

/**
 * @param {string} content
 * @return {Element}
 */
var parse = function (content) {
  var hasImportNode = !!document.importNode;
  var doc = new DOMParser().parseFromString(content, 'image/svg+xml').documentElement;

  /**
   * Fix for browser which are throwing WrongDocumentError
   * if you insert an element which is not part of the document
   * @see http://stackoverflow.com/a/7986519/4624403
   */
  if (hasImportNode) {
    return document.importNode(doc, true);
  }

  return doc;
};

var BrowserSpriteSymbol = (function (SpriteSymbol$$1) {
  function BrowserSpriteSymbol () {
    SpriteSymbol$$1.apply(this, arguments);
  }

  if ( SpriteSymbol$$1 ) BrowserSpriteSymbol.__proto__ = SpriteSymbol$$1;
  BrowserSpriteSymbol.prototype = Object.create( SpriteSymbol$$1 && SpriteSymbol$$1.prototype );
  BrowserSpriteSymbol.prototype.constructor = BrowserSpriteSymbol;

  var prototypeAccessors = { isMounted: {} };

  prototypeAccessors.isMounted.get = function () {
    return !!this.node;
  };

  /**
   * @param {Element} node
   * @return {BrowserSpriteSymbol}
   */
  BrowserSpriteSymbol.createFromExistingNode = function createFromExistingNode (node) {
    return new BrowserSpriteSymbol({
      id: node.getAttribute('id'),
      viewBox: node.getAttribute('viewBox'),
      content: node.outerHTML
    });
  };

  BrowserSpriteSymbol.prototype.destroy = function destroy () {
    if (this.isMounted) {
      this.unmount();
    }
    SpriteSymbol$$1.prototype.destroy.call(this);
  };

  /**
   * @param {Element|string} target
   * @return {Element}
   */
  BrowserSpriteSymbol.prototype.mount = function mount (target) {
    if (this.isMounted) {
      return this.node;
    }

    var mountTarget = typeof target === 'string' ? document.querySelector(target) : target;
    var node = this.render();
    this.node = node;

    mountTarget.appendChild(node);

    return node;
  };

  /**
   * @return {Element}
   */
  BrowserSpriteSymbol.prototype.render = function render () {
    var content = this.stringify();
    return parse(wrapInSvgString(content)).childNodes[0];
  };

  BrowserSpriteSymbol.prototype.unmount = function unmount () {
    this.node.parentNode.removeChild(this.node);
  };

  Object.defineProperties( BrowserSpriteSymbol.prototype, prototypeAccessors );

  return BrowserSpriteSymbol;
}(SpriteSymbol));

var defaultConfig$1 = {
  /**
   * Should following options be automatically configured:
   * - `syncUrlsWithBaseTag`
   * - `locationChangeAngularEmitter`
   * - `moveGradientsOutsideSymbol`
   * @type {boolean}
   */
  autoConfigure: true,

  /**
   * Default mounting selector
   * @type {string}
   */
  mountTo: 'body',

  /**
   * Fix disappearing SVG elements when <base href> exists.
   * Executes when sprite mounted.
   * @see http://stackoverflow.com/a/18265336/796152
   * @see https://github.com/everdimension/angular-svg-base-fix
   * @see https://github.com/angular/angular.js/issues/8934#issuecomment-56568466
   * @type {boolean}
   */
  syncUrlsWithBaseTag: false,

  /**
   * Should sprite listen custom location change event
   * @type {boolean}
   */
  listenLocationChangeEvent: true,

  /**
   * Custom window event name which should be emitted to update sprite urls
   * @type {string}
   */
  locationChangeEvent: 'locationChange',

  /**
   * Emit location change event in Angular automatically
   * @type {boolean}
   */
  locationChangeAngularEmitter: false,

  /**
   * Selector to find symbols usages when updating sprite urls
   * @type {string}
   */
  usagesToUpdate: 'use[*|href]',

  /**
   * Fix Firefox bug when gradients and patterns don't work if they are within a symbol.
   * Executes when sprite is rendered, but not mounted.
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=306674
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=353575
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=1235364
   * @type {boolean}
   */
  moveGradientsOutsideSymbol: false
};

/**
 * @param {*} arrayLike
 * @return {Array}
 */
var arrayFrom = function (arrayLike) {
  return Array.prototype.slice.call(arrayLike, 0);
};

var ua = navigator.userAgent;

var browser = {
  isChrome: /chrome/i.test(ua),
  isFirefox: /firefox/i.test(ua),

  // https://msdn.microsoft.com/en-us/library/ms537503(v=vs.85).aspx
  isIE: /msie/i.test(ua) || /trident/i.test(ua),
  isEdge: /edge/i.test(ua)
};

/**
 * @param {string} name
 * @param {*} data
 */
var dispatchEvent = function (name, data) {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent(name, false, false, data);
  window.dispatchEvent(event);
};

/**
 * IE doesn't evaluate <style> tags in SVGs that are dynamically added to the page.
 * This trick will trigger IE to read and use any existing SVG <style> tags.
 * @see https://github.com/iconic/SVGInjector/issues/23
 * @see https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10898469/
 *
 * @param {Element} node DOM Element to search <style> tags in
 * @return {Array<HTMLStyleElement>}
 */
var evalStylesIEWorkaround = function (node) {
  var updatedNodes = [];

  arrayFrom(node.querySelectorAll('style'))
    .forEach(function (style) {
      style.textContent += '';
      updatedNodes.push(style);
    });

  return updatedNodes;
};

/**
 * @param {string} [url] If not provided - current URL will be used
 * @return {string}
 */
var getUrlWithoutFragment = function (url) {
  return (url || window.location.href).split('#')[0];
};

/* global angular */
/**
 * @param {string} eventName
 */
var locationChangeAngularEmitter = function (eventName) {
  angular.module('ng').run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$locationChangeSuccess', function (e, newUrl, oldUrl) {
      dispatchEvent(eventName, { oldUrl: oldUrl, newUrl: newUrl });
    });
  }]);
};

var defaultSelector = 'linearGradient, radialGradient, pattern';

/**
 * @param {Element} svg
 * @param {string} [selector]
 * @return {Element}
 */
var moveGradientsOutsideSymbol = function (svg, selector) {
  if ( selector === void 0 ) selector = defaultSelector;

  arrayFrom(svg.querySelectorAll('symbol')).forEach(function (symbol) {
    arrayFrom(symbol.querySelectorAll(selector)).forEach(function (node) {
      symbol.parentNode.insertBefore(node, symbol);
    });
  });
  return svg;
};

/**
 * @param {NodeList} nodes
 * @param {Function} [matcher]
 * @return {Attr[]}
 */
function selectAttributes(nodes, matcher) {
  var attrs = arrayFrom(nodes).reduce(function (acc, node) {
    if (!node.attributes) {
      return acc;
    }

    var arrayfied = arrayFrom(node.attributes);
    var matched = matcher ? arrayfied.filter(matcher) : arrayfied;
    return acc.concat(matched);
  }, []);

  return attrs;
}

/**
 * @param {NodeList|Node} nodes
 * @param {boolean} [clone=true]
 * @return {string}
 */

var xLinkNS = namespaces_1.xlink.uri;
var xLinkAttrName = 'xlink:href';

// eslint-disable-next-line no-useless-escape
var specialUrlCharsPattern = /[{}|\\\^\[\]`"<>]/g;

function encoder(url) {
  return url.replace(specialUrlCharsPattern, function (match) {
    return ("%" + (match[0].charCodeAt(0).toString(16).toUpperCase()));
  });
}

/**
 * @param {NodeList} nodes
 * @param {string} startsWith
 * @param {string} replaceWith
 * @return {NodeList}
 */
function updateReferences(nodes, startsWith, replaceWith) {
  arrayFrom(nodes).forEach(function (node) {
    var href = node.getAttribute(xLinkAttrName);
    if (href && href.indexOf(startsWith) === 0) {
      var newUrl = href.replace(startsWith, replaceWith);
      node.setAttributeNS(xLinkNS, xLinkAttrName, newUrl);
    }
  });

  return nodes;
}

/**
 * List of SVG attributes to update url() target in them
 */
var attList = [
  'clipPath',
  'colorProfile',
  'src',
  'cursor',
  'fill',
  'filter',
  'marker',
  'markerStart',
  'markerMid',
  'markerEnd',
  'mask',
  'stroke',
  'style'
];

var attSelector = attList.map(function (attr) { return ("[" + attr + "]"); }).join(',');

/**
 * Update URLs in svg image (like `fill="url(...)"`) and update referencing elements
 * @param {Element} svg
 * @param {NodeList} references
 * @param {string|RegExp} startsWith
 * @param {string} replaceWith
 * @return {void}
 *
 * @example
 * const sprite = document.querySelector('svg.sprite');
 * const usages = document.querySelectorAll('use');
 * updateUrls(sprite, usages, '#', 'prefix#');
 */
var updateUrls = function (svg, references, startsWith, replaceWith) {
  var startsWithEncoded = encoder(startsWith);
  var replaceWithEncoded = encoder(replaceWith);

  var nodes = svg.querySelectorAll(attSelector);
  var attrs = selectAttributes(nodes, function (ref) {
    var localName = ref.localName;
    var value = ref.value;

    return attList.indexOf(localName) !== -1 && value.indexOf(("url(" + startsWithEncoded)) !== -1;
  });

  attrs.forEach(function (attr) { return attr.value = attr.value.replace(startsWithEncoded, replaceWithEncoded); });
  updateReferences(references, startsWithEncoded, replaceWithEncoded);
};

/**
 * Internal emitter events
 * @enum
 * @private
 */
var Events = {
  MOUNT: 'mount',
  SYMBOL_MOUNT: 'symbol_mount'
};

var BrowserSprite = (function (Sprite$$1) {
  function BrowserSprite(cfg) {
    var this$1 = this;
    if ( cfg === void 0 ) cfg = {};

    Sprite$$1.call(this, deepmerge(defaultConfig$1, cfg));

    var emitter = mitt();
    this._emitter = emitter;
    this.node = null;

    var ref = this;
    var config = ref.config;

    if (config.autoConfigure) {
      this._autoConfigure(cfg);
    }

    if (config.syncUrlsWithBaseTag) {
      var baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
      emitter.on(Events.MOUNT, function () { return this$1.updateUrls('#', baseUrl); });
    }

    var handleLocationChange = this._handleLocationChange.bind(this);
    this._handleLocationChange = handleLocationChange;

    // Provide way to update sprite urls externally via dispatching custom window event
    if (config.listenLocationChangeEvent) {
      window.addEventListener(config.locationChangeEvent, handleLocationChange);
    }

    // Emit location change event in Angular automatically
    if (config.locationChangeAngularEmitter) {
      locationChangeAngularEmitter(config.locationChangeEvent);
    }

    // After sprite mounted
    emitter.on(Events.MOUNT, function (spriteNode) {
      if (config.moveGradientsOutsideSymbol) {
        moveGradientsOutsideSymbol(spriteNode);
      }
    });

    // After symbol mounted into sprite
    emitter.on(Events.SYMBOL_MOUNT, function (symbolNode) {
      if (config.moveGradientsOutsideSymbol) {
        moveGradientsOutsideSymbol(symbolNode.parentNode);
      }

      if (browser.isIE || browser.isEdge) {
        evalStylesIEWorkaround(symbolNode);
      }
    });
  }

  if ( Sprite$$1 ) BrowserSprite.__proto__ = Sprite$$1;
  BrowserSprite.prototype = Object.create( Sprite$$1 && Sprite$$1.prototype );
  BrowserSprite.prototype.constructor = BrowserSprite;

  var prototypeAccessors = { isMounted: {} };

  /**
   * @return {boolean}
   */
  prototypeAccessors.isMounted.get = function () {
    return !!this.node;
  };

  /**
   * Automatically configure following options
   * - `syncUrlsWithBaseTag`
   * - `locationChangeAngularEmitter`
   * - `moveGradientsOutsideSymbol`
   * @param {Object} cfg
   * @private
   */
  BrowserSprite.prototype._autoConfigure = function _autoConfigure (cfg) {
    var ref = this;
    var config = ref.config;

    if (typeof cfg.syncUrlsWithBaseTag === 'undefined') {
      config.syncUrlsWithBaseTag = typeof document.getElementsByTagName('base')[0] !== 'undefined';
    }

    if (typeof cfg.locationChangeAngularEmitter === 'undefined') {
      config.locationChangeAngularEmitter = 'angular' in window;
    }

    if (typeof cfg.moveGradientsOutsideSymbol === 'undefined') {
      config.moveGradientsOutsideSymbol = browser.isFirefox;
    }
  };

  /**
   * @param {Event} event
   * @param {Object} event.detail
   * @param {string} event.detail.oldUrl
   * @param {string} event.detail.newUrl
   * @private
   */
  BrowserSprite.prototype._handleLocationChange = function _handleLocationChange (event) {
    var ref = event.detail;
    var oldUrl = ref.oldUrl;
    var newUrl = ref.newUrl;
    this.updateUrls(oldUrl, newUrl);
  };

  /**
   * Add new symbol. If symbol with the same id exists it will be replaced.
   * If sprite already mounted - `symbol.mount(sprite.node)` will be called.
   * @fires Events#SYMBOL_MOUNT
   * @param {BrowserSpriteSymbol} symbol
   * @return {boolean} `true` - symbol was added, `false` - replaced
   */
  BrowserSprite.prototype.add = function add (symbol) {
    var sprite = this;
    var isNewSymbol = Sprite$$1.prototype.add.call(this, symbol);

    if (this.isMounted && isNewSymbol) {
      symbol.mount(sprite.node);
      this._emitter.emit(Events.SYMBOL_MOUNT, symbol.node);
    }

    return isNewSymbol;
  };

  /**
   * Attach to existing DOM node
   * @param {string|Element} target
   * @return {Element|null} attached DOM Element. null if node to attach not found.
   */
  BrowserSprite.prototype.attach = function attach (target) {
    var this$1 = this;

    var sprite = this;

    if (sprite.isMounted) {
      return sprite.node;
    }

    /** @type Element */
    var node = typeof target === 'string' ? document.querySelector(target) : target;
    sprite.node = node;

    // Already added symbols needs to be mounted
    this.symbols.forEach(function (symbol) {
      symbol.mount(sprite.node);
      this$1._emitter.emit(Events.SYMBOL_MOUNT, symbol.node);
    });

    // Create symbols from existing DOM nodes, add and mount them
    arrayFrom(node.querySelectorAll('symbol'))
      .forEach(function (symbolNode) {
        var symbol = BrowserSpriteSymbol.createFromExistingNode(symbolNode);
        symbol.node = symbolNode; // hack to prevent symbol mounting to sprite when adding
        sprite.add(symbol);
      });

    this._emitter.emit(Events.MOUNT, node);

    return node;
  };

  BrowserSprite.prototype.destroy = function destroy () {
    var ref = this;
    var config = ref.config;
    var symbols = ref.symbols;
    var _emitter = ref._emitter;

    symbols.forEach(function (s) { return s.destroy(); });

    _emitter.off('*');
    window.removeEventListener(config.locationChangeEvent, this._handleLocationChange);

    if (this.isMounted) {
      this.unmount();
    }
  };

  /**
   * @fires Events#MOUNT
   * @param {string|Element} [target]
   * @param {boolean} [prepend=false]
   * @return {Element|null} rendered sprite node. null if mount node not found.
   */
  BrowserSprite.prototype.mount = function mount (target, prepend) {
    if ( target === void 0 ) target = this.config.mountTo;
    if ( prepend === void 0 ) prepend = false;

    var sprite = this;

    if (sprite.isMounted) {
      return sprite.node;
    }

    var mountNode = typeof target === 'string' ? document.querySelector(target) : target;
    var node = sprite.render();
    this.node = node;

    if (prepend && mountNode.childNodes[0]) {
      mountNode.insertBefore(node, mountNode.childNodes[0]);
    } else {
      mountNode.appendChild(node);
    }

    this._emitter.emit(Events.MOUNT, node);

    return node;
  };

  /**
   * @return {Element}
   */
  BrowserSprite.prototype.render = function render () {
    return parse(this.stringify());
  };

  /**
   * Detach sprite from the DOM
   */
  BrowserSprite.prototype.unmount = function unmount () {
    this.node.parentNode.removeChild(this.node);
  };

  /**
   * Update URLs in sprite and usage elements
   * @param {string} oldUrl
   * @param {string} newUrl
   * @return {boolean} `true` - URLs was updated, `false` - sprite is not mounted
   */
  BrowserSprite.prototype.updateUrls = function updateUrls$1 (oldUrl, newUrl) {
    if (!this.isMounted) {
      return false;
    }

    var usages = document.querySelectorAll(this.config.usagesToUpdate);

    updateUrls(
      this.node,
      usages,
      ((getUrlWithoutFragment(oldUrl)) + "#"),
      ((getUrlWithoutFragment(newUrl)) + "#")
    );

    return true;
  };

  Object.defineProperties( BrowserSprite.prototype, prototypeAccessors );

  return BrowserSprite;
}(Sprite));

var ready$1 = createCommonjsModule(function (module) {
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  { module.exports = definition(); }

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);


  if (!loaded)
  { doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener);
    loaded = 1;
    while (listener = fns.shift()) { listener(); }
  }); }

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn);
  }

});
});

var spriteNodeId = '__SVG_SPRITE_NODE__';
var spriteGlobalVarName = '__SVG_SPRITE__';
var isSpriteExists = !!window[spriteGlobalVarName];

// eslint-disable-next-line import/no-mutable-exports
var sprite;

if (isSpriteExists) {
  sprite = window[spriteGlobalVarName];
} else {
  sprite = new BrowserSprite({ attrs: { id: spriteNodeId } });
  window[spriteGlobalVarName] = sprite;
}

var loadSprite = function () {
  /**
   * Check for page already contains sprite node
   * If found - attach to and reuse it's content
   * If not - render and mount the new sprite
   */
  var existing = document.getElementById(spriteNodeId);

  if (existing) {
    sprite.attach(existing);
  } else {
    sprite.mount(document.body, true);
  }
};

if (document.body) {
  loadSprite();
} else {
  ready$1(loadSprite);
}

var sprite$1 = sprite;

return sprite$1;

})));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./resources/js/icons/svg sync \\.svg$":
/*!*********************************************************!*\
  !*** ./resources/js/icons/svg sync nonrecursive \.svg$ ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./discussion.svg": "./resources/js/icons/svg/discussion.svg",
	"./login.svg": "./resources/js/icons/svg/login.svg",
	"./logo.svg": "./resources/js/icons/svg/logo.svg",
	"./register.svg": "./resources/js/icons/svg/register.svg",
	"./study.svg": "./resources/js/icons/svg/study.svg",
	"./sync.svg": "./resources/js/icons/svg/sync.svg",
	"./weibo.svg": "./resources/js/icons/svg/weibo.svg",
	"./weixin.svg": "./resources/js/icons/svg/weixin.svg"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./resources/js/icons/svg sync \\.svg$";

/***/ }),

/***/ "./resources/js/icons/svg/discussion.svg":
/*!***********************************************!*\
  !*** ./resources/js/icons/svg/discussion.svg ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-baker-runtime/browser-symbol */ "./node_modules/svg-baker-runtime/browser-symbol.js");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-sprite-loader/runtime/browser-sprite.build */ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-discussion",
  "use": "icon-discussion-usage",
  "viewBox": "0 0 512 512",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" id=\"icon-discussion\"><g fill-rule=\"nonzero\" fill=\"none\"><path fill=\"#E25456\" d=\"M392 260.393H0v-260h392z\" /><path fill=\"#D0021B\" d=\"M196 .393h196v260H196z\" /><path fill=\"#FFEA75\" d=\"M452 320.393H60v-260h392z\" /><path fill=\"#E69F12\" d=\"M256 60.39h196v260H256z\" /><path fill=\"#671F7C\" d=\"M462 511.607L300.787 350.393H462z\" /><path fill=\"#1198CF\" d=\"M512 380.393H120v-260h392z\" /><path fill=\"#2A6FA9\" d=\"M316 120.39h196v260H316z\" /></g></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/icons/svg/login.svg":
/*!******************************************!*\
  !*** ./resources/js/icons/svg/login.svg ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-baker-runtime/browser-symbol */ "./node_modules/svg-baker-runtime/browser-symbol.js");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-sprite-loader/runtime/browser-sprite.build */ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-login",
  "use": "icon-login-usage",
  "viewBox": "0 0 226 324",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 226 324\" id=\"icon-login\"><g fill-rule=\"nonzero\" fill=\"none\"><path d=\"M194.44 82.01v24.61h-30V82.01c0-28.36-23.08-51.43-51.44-51.43-.13 0-.25 0-.38.01-28.19.2-51.06 23.19-51.06 51.42v66.13h-30V82.01C31.56 37.24 67.89.79 112.62.59c.13-.01.25-.01.38-.01 44.9 0 81.44 36.53 81.44 81.43z\" fill=\"#C8C6CD\" /><path fill=\"#FFB74C\" d=\"M.89 133.14h224.22v189.98H.89z\" /><path fill=\"#FF9A00\" d=\"M112.62 133.14h112.49v189.98H112.62z\" /><path d=\"M194.44 82.01v24.61h-30V82.01c0-28.36-23.08-51.43-51.44-51.43-.13 0-.25 0-.38.01v-30c.13-.01.25-.01.38-.01 44.9 0 81.44 36.53 81.44 81.43z\" fill=\"#AEADB3\" /><path d=\"M135.207 217.682c0 5.636-2.464 10.742-6.458 14.469l-.017 25.53H96.503l-.045-25.53C92.464 228.424 90 223.318 90 217.68 90 206.26 100.12 197 112.603 197c12.483 0 22.604 9.26 22.604 20.682z\" fill=\"#9A4C00\" /><path d=\"M135.603 217.682c0 5.636-2.464 10.742-6.458 14.469l-.017 25.53H113V197c12.483 0 22.603 9.26 22.603 20.682z\" fill=\"#703700\" /></g></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/icons/svg/logo.svg":
/*!*****************************************!*\
  !*** ./resources/js/icons/svg/logo.svg ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-baker-runtime/browser-symbol */ "./node_modules/svg-baker-runtime/browser-symbol.js");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-sprite-loader/runtime/browser-sprite.build */ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-logo",
  "use": "icon-logo-usage",
  "viewBox": "0 0 140 38",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 140 38\" id=\"icon-logo\"><defs><path d=\"M13.14 7.941c-.198 2.744-.4 4.665-.608 5.762a11.484 11.484 0 0 1-.991 3.014c-.455.912-1.103 1.8-1.946 2.664-.843.863-1.942 1.763-3.298 2.699l-.322-.412c1.851-1.63 3.16-3.433 3.93-5.41.768-1.978 1.177-4.75 1.227-8.317H8.256c-.446 0-.794.057-1.041.17l-.447-1.017c.347.08.76.12 1.24.12h3.124c.033-.984.05-2.045.05-3.183s-.025-2.473-.075-4.007a47.11 47.11 0 0 1 2.157.52c.562.154.892.255.992.303.099.049.148.105.148.17 0 .113-.28.347-.843.702-.115 2.211-.24 4.043-.372 5.496h5.554l.892-1.332c.182-.29.385-.436.608-.436.223 0 .698.343 1.425 1.03.728.685 1.091 1.1 1.091 1.246 0 .145-.165.218-.496.218H16.29v10.895c0 .42.082.674.247.762.166.09.757.134 1.773.134 1.017 0 1.636-.09 1.86-.267.223-.177.425-.585.607-1.222.182-.638.372-1.675.57-3.111h.471c0 1.29.058 2.239.174 2.844.115.606.351 1.001.706 1.187.356.185.533.347.533.484s-.095.339-.285.605c-.19.266-.425.504-.706.714-.281.21-.542.343-.781.4-.24.056-.732.105-1.475.145-.744.04-1.575.06-2.492.06s-1.59-.044-2.02-.133c-.43-.088-.732-.274-.906-.556-.173-.283-.26-.795-.26-1.538V7.941H13.14zM3.719 9.442c-1.091 1.582-2.24 2.97-3.446 4.164L0 13.34C2.562 9.58 4.405 5.173 5.529.121c1.024.339 1.805.646 2.343.92.537.274.805.476.805.605 0 .13-.198.242-.595.34-.297.064-.686.64-1.165 1.73a34.518 34.518 0 0 1-1.76 3.426c.644.274.967.472.967.593s-.15.27-.447.448v13.122a.68.68 0 0 1-.037.242c-.025.065-.182.174-.47.327-.29.154-.58.27-.869.351-.289.081-.475.121-.557.121-.083 0-.124-.088-.124-.266l.074-2.276a86.6 86.6 0 0 0 .025-2.01V9.443zm11.776-8.135c1.355.42 2.355.82 3 1.199.645.38.967.827.967 1.343 0 .517-.157.957-.471 1.32-.314.363-.603.545-.868.545-.264 0-.487-.283-.67-.848-.214-.71-.491-1.299-.83-1.767-.339-.468-.789-.944-1.351-1.428l.223-.364zM39.98 3.22c-1.669 3.438-4.107 6.529-7.313 9.273l-.397-.29a24.741 24.741 0 0 0 3.694-5.17c1.008-1.88 1.926-4.2 2.752-6.96 1.058.339 1.81.6 2.256.786.446.186.67.331.67.436 0 .105-.158.202-.472.29-.314.09-.578.368-.793.836 1.983 3.583 4.487 5.794 7.512 6.634v.411c-.727.097-1.227.21-1.5.34-.273.128-.508.362-.706.701-.1.162-.215.242-.347.242-.298 0-1.054-.641-2.269-1.924S40.823 5.673 39.98 3.22zM28.65 6.658h-2.553c-.413 0-.769.04-1.066.12l-.422-.943c.347.08.76.12 1.24.12h2.801v-3.05c0-.936-.016-1.807-.05-2.614 2.083.564 3.125.976 3.125 1.234 0 .146-.323.396-.967.75v3.68h.743l.868-1.089c.165-.193.314-.29.446-.29.133 0 .34.129.62.387l.918.823c.33.29.495.509.495.654 0 .145-.198.218-.595.218h-3.495v3.22l3.223-1.55.248.412-3.471 2.373v8.45c0 .483-.038.863-.112 1.137-.074.274-.24.525-.496.75-.256.226-.66.452-1.215.678-.553.226-.892.34-1.016.34s-.227-.122-.31-.364c-.198-.63-.48-1.105-.843-1.428-.364-.323-1.05-.662-2.058-1.017l.174-.533c1.504.275 2.463.412 2.876.412.413 0 .665-.057.756-.17.09-.113.136-.322.136-.63v-6.173c-.909.646-1.62 1.243-2.132 1.792-.116.129-.21.194-.285.194-.074 0-.215-.117-.421-.352-.207-.234-.65-.81-1.327-1.73 1.62-.517 3.008-1.05 4.165-1.598V6.658zM41.146 9.95l.595-.896c.165-.226.305-.34.421-.34.116 0 .335.154.657.46.322.307.624.582.905.824s.421.428.421.557c0 .129-.132.193-.396.193h-6.645c-.446 0-.793.049-1.04.146l-.447-1.066c.347.081.76.122 1.24.122h4.289zm1.338 10.12h-5.33v1.355c0 .226-.041.38-.124.46-.083.081-.405.222-.967.424-.562.202-.884.303-.967.303-.082 0-.124-.057-.124-.17l.05-1.114c.033-.451.05-.871.05-1.258v-5.617c0-.678-.025-1.364-.075-2.058 1.19.403 2.116.766 2.777 1.09h4.388l.496-.945c.083-.145.186-.218.31-.218s.47.158 1.041.472c.57.315.938.529 1.103.642.166.113.248.238.248.375s-.223.36-.67.666v4.745l.05 1.72a.48.48 0 0 1-.198.41c-.132.098-.446.243-.942.436-.496.194-.818.291-.967.291-.099 0-.149-.113-.149-.339v-1.67zm-5.33-.824h5.33V14.26h-5.33v4.987zM51.846.291c1.703.92 2.847 1.61 3.434 2.07.587.46.88.915.88 1.367 0 .452-.198.924-.595 1.417-.396.492-.71.738-.942.738-.149 0-.256-.036-.322-.109-.066-.072-.215-.492-.446-1.259a8.904 8.904 0 0 0-.88-2.033c-.356-.59-.831-1.223-1.426-1.9l.297-.291zm11.28 14.962c-1.107 1.63-2.272 2.97-3.495 4.019-1.223 1.049-2.752 2.041-4.586 2.977l-.248-.338c3.421-2.486 5.743-5.303 6.966-8.45h-4.016c-.43 0-.785.04-1.066.121l-.422-.896c.347.081.76.121 1.24.121h5.628V9.781h-2.678v.654a.472.472 0 0 1-.223.4c-.149.104-.434.233-.855.387-.422.153-.74.23-.955.23-.099 0-.14-.065-.124-.194.083-.888.124-1.993.124-3.317V2.518c0-.678-.024-1.364-.074-2.058 1.09.355 1.876.694 2.355 1.017h7.363l.57-.872c.116-.177.244-.266.385-.266.14 0 .574.218 1.302.654.727.435 1.09.746 1.09.932 0 .185-.363.448-1.09.787v4.817c0 .856.008 1.429.024 1.72l.025.823c0 .129-.082.242-.248.339-.165.096-.45.21-.855.338-.405.13-.698.194-.88.194-.116 0-.174-.12-.174-.363v-.799h-3.198v3.026h4.264l.818-1.113c.15-.194.294-.29.434-.29s.55.27 1.228.81c.677.54 1.016.884 1.016 1.03 0 .144-.14.217-.421.217h-6.075c.744 1.679 1.616 2.99 2.616 3.934s2.459 1.804 4.376 2.579l-.1.411c-.627-.032-1.14 0-1.536.097-.397.097-.794.34-1.19.726-.116.113-.224.17-.323.17-.264 0-.967-.682-2.107-2.046-1.14-1.364-1.926-3.32-2.355-5.87h-.645v6.027c0 .582.017 1.179.05 1.792l.024.799c0 .178-.289.375-.867.593-.579.218-.918.327-1.017.327-.099 0-.149-.073-.149-.218l.05-1.235c.017-.597.025-1.283.025-2.058v-4.236zM60.45 5.35h2.678V2.155h-2.678V5.35zm4.562 0h3.198V2.155h-3.198V5.35zm-1.884.677h-2.678v3.075h2.678V6.028zm5.082 0h-3.198v3.075h3.198V6.028zm-15.52 11.38V9.054h-1.884c-.297 0-.57.04-.818.12l-.67-.968c.282.081.629.121 1.042.121h2.231l.546-.944c.132-.226.26-.339.384-.339s.537.214 1.24.642c.702.428 1.053.726 1.053.896 0 .17-.33.423-.992.762v8.183l3.075-2.106.322.412c-1.488 1.517-2.562 2.655-3.223 3.413a34.881 34.881 0 0 0-1.86 2.325c-.115.145-.206.217-.272.217-.066 0-.248-.181-.546-.544a14.037 14.037 0 0 1-.942-1.32c.53-.597.88-1.061 1.054-1.392.174-.33.26-.706.26-1.126zM85.232 6.221V2.591c0-1.292-.017-2.155-.05-2.591.579.097 1.157.234 1.736.412.578.177.95.306 1.116.387.165.08.247.17.247.266 0 .097-.297.331-.892.702v4.455h1.09c1.042-1.372 2.05-3.026 3.025-4.963.943.468 1.637.827 2.083 1.077.446.25.67.448.67.593 0 .194-.257.307-.77.34-.264.016-.561.169-.892.46-.81.693-1.86 1.525-3.148 2.493h4.537l1.066-1.065a.24.24 0 0 1 .173-.073c.116 0 .455.234 1.017.702l1.165 1.017c.215.194.322.38.322.557 0 .178-.26.282-.78.315-.521.032-1 .193-1.439.484-.438.29-1.186.993-2.243 2.106l-.447-.242 1.463-3.05H78.736c-.033 1.242-.301 2.162-.805 2.76-.504.597-1.087.895-1.748.895-.364 0-.661-.084-.893-.254-.231-.17-.347-.383-.347-.641 0-.259.298-.594.893-1.005a4.747 4.747 0 0 0 1.438-1.574c.363-.637.636-1.424.818-2.36h.446c.083.452.14.928.174 1.428h6.52zm-5.9-4.43c1.19.29 2.057.556 2.603.799.545.242.9.496 1.066.762.165.266.248.605.248 1.017 0 .412-.112.775-.335 1.09-.223.314-.434.472-.632.472-.199 0-.34-.04-.422-.121-.082-.081-.19-.267-.322-.557-.48-1.05-1.29-2.082-2.43-3.1l.223-.362zm3.446 7.239h7.065l.72-.824c.115-.129.218-.193.31-.193.09 0 .47.21 1.14.63.67.419 1.004.69 1.004.81 0 .121-.232.31-.694.57v2.856c0 .339.008.63.024.872l.05.605c0 .113-.07.214-.21.302-.141.09-.435.21-.88.364-.447.153-.77.23-.968.23-.099 0-.149-.081-.149-.242v-.751h-2.677v2.663h4.165l.793-1.138c.133-.193.257-.29.372-.29.116 0 .298.097.546.29.248.194.55.44.905.739.355.298.595.512.719.641.123.13.185.234.185.315 0 .161-.132.242-.396.242h-7.29v3.075h6.472l.991-1.404c.133-.162.257-.242.372-.242.116 0 .248.048.397.145l1.066.871c.578.5.921.8 1.029.896.107.097.161.194.161.29 0 .162-.124.243-.372.243H77.2c-.446 0-.793.048-1.041.145l-.446-1.065c.347.08.76.12 1.24.12h8.354v-3.074h-5.751c-.447 0-.794.049-1.042.145l-.446-1.065c.347.08.76.121 1.24.121h6V14.26h-2.579c0 .274-.058.46-.174.557-.115.097-.421.218-.917.363-.496.145-.843.218-1.041.218-.066 0-.1-.065-.1-.194l.025-.847c.017-.258.025-.533.025-.823v-3.56c0-.677-.025-1.363-.074-2.057.727.242 1.496.613 2.306 1.114zm7.412 4.478V9.781h-7.462v3.728h7.462z\" id=\"icon-logo_a\" /></defs><g fill=\"none\" fill-rule=\"evenodd\"><circle fill=\"#2A6EA8\" cx=\"19\" cy=\"19\" r=\"19\" /><g transform=\"translate(10 9)\" fill=\"#FFF\"><g transform=\"translate(.203 .656)\"><path d=\"M15.95 8.442h3.19v3.54c0 1.712-.007 3.004-.258 3.877-.251.872-.561 1.598-.93 2.178a6.948 6.948 0 0 1-1.353 1.556c-1.774 1.521-4.091 2.282-6.954 2.282-2.916 0-5.255-.755-7.017-2.266a7.27 7.27 0 0 1-1.354-1.572c-.369-.58-.673-1.29-.914-2.13-.24-.84-.36-2.16-.36-3.958V1.823h3.281V11.98c0 2.096.18 3.553.66 4.373.481.819 1.213 1.476 2.195 1.97.983.495 2.142.742 3.477.742 1.901 0 3.45-.494 4.646-1.484a4.598 4.598 0 0 0 1.362-1.883c.278-.723.33-1.963.33-3.718V8.442z\" /><path d=\"M1.64 0h.046c.881 0 1.595.714 1.595 1.595v1.322a1.64 1.64 0 0 1-3.281 0V1.64C0 .735.735 0 1.64 0z\" /><rect x=\"16.406\" y=\"6.836\" width=\"2.734\" height=\"7.292\" rx=\"1.367\" /></g><rect x=\"6.219\" y=\".656\" width=\"13.125\" height=\"3.281\" rx=\"1.641\" /><rect x=\"6.219\" y=\"7.219\" width=\"13.125\" height=\"3.281\" rx=\"1.641\" /></g><g transform=\"translate(42 8)\" fill=\"#000\"><use xlink:href=\"#icon-logo_a\" /><use xlink:href=\"#icon-logo_a\" /></g></g></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/icons/svg/register.svg":
/*!*********************************************!*\
  !*** ./resources/js/icons/svg/register.svg ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-baker-runtime/browser-symbol */ "./node_modules/svg-baker-runtime/browser-symbol.js");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-sprite-loader/runtime/browser-sprite.build */ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-register",
  "use": "icon-register-usage",
  "viewBox": "0 0 1196 1024",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1196 1024\" id=\"icon-register\"><g fill-rule=\"nonzero\" fill=\"none\"><path d=\"M585.143 0C343.77 0 146.286 197.486 146.286 441.295c0 119.467 46.324 226.743 121.904 307.2-21.942 53.638-39.009 109.715-51.2 158.476C202.362 965.486 246.248 1024 307.2 1024h555.886c60.952 0 104.838-58.514 90.21-117.029-12.191-48.761-29.258-104.838-51.2-158.476C977.675 668.038 1024 560.762 1024 441.295 1024 197.485 826.514 0 585.143 0z\" fill=\"#FFA3AB\" /><path d=\"M585.143 650.971c80.457 0 148.724-51.2 175.543-124.342 9.752-29.258-12.19-60.953-43.886-60.953H453.486c-31.696 0-53.638 31.695-43.886 60.953 26.819 73.142 95.086 124.342 175.543 124.342z\" fill=\"#FFF\" /><path d=\"M402.286 97.524C180.419 97.524 0 275.504 0 497.37c0 107.277 43.886 204.8 112.152 277.943-19.504 48.762-34.133 99.962-46.323 143.848C53.639 972.8 92.648 1024 148.724 1024h507.124c56.076 0 95.085-51.2 82.895-104.838-12.19-43.886-26.82-95.086-46.324-143.848 70.705-73.143 112.152-170.666 112.152-277.943 0-221.866-180.419-399.847-402.285-399.847z\" fill=\"#1298CF\" /><path d=\"M402.286 687.543c73.143 0 136.533-46.324 160.914-112.153 9.752-26.819-12.19-56.076-41.448-56.076H282.82c-29.257 0-48.762 29.257-41.448 56.076 24.381 63.391 87.772 112.153 160.915 112.153z\" fill=\"#FFF\" /><path d=\"M1093.52 58.016c8.728 6.445 17.042 13.464 24.994 21.417 81.459 81.227 81.459 213.249 0 294.476-81.264 81.45-213.24 81.45-294.504 0-7.768-7.73-14.943-16.1-21.38-24.792-46.42-63.842-52.08-148.093-16.875-217.05 9.654-18.938 22.35-36.72 38.255-52.634 73.33-73.497 188.097-80.673 269.51-21.417z\" fill=\"#A0D468\" /><path d=\"M1066.083 207.583h-75.666v-75.666c0-10.465-8.452-18.917-18.917-18.917-10.456 0-18.917 8.452-18.917 18.917v75.666h-75.666c-10.456 0-18.917 8.452-18.917 18.917 0 10.456 8.46 18.917 18.917 18.917h75.666v75.666c0 10.456 8.461 18.917 18.917 18.917 10.465 0 18.917-8.46 18.917-18.917v-75.666h75.666c10.465 0 18.917-8.461 18.917-18.917 0-10.465-8.452-18.917-18.917-18.917z\" fill=\"#FFF\" /></g></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/icons/svg/study.svg":
/*!******************************************!*\
  !*** ./resources/js/icons/svg/study.svg ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-baker-runtime/browser-symbol */ "./node_modules/svg-baker-runtime/browser-symbol.js");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-sprite-loader/runtime/browser-sprite.build */ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-study",
  "use": "icon-study-usage",
  "viewBox": "0 0 512 512",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" id=\"icon-study\"><path d=\"M406 512H61V0h345c24.813 0 45 20.187 45 45v422c0 24.813-20.187 45-45 45z\" fill=\"#00aaf0\" /><g fill=\"#0096dc\"><path d=\"M406 0H256v512h150c24.813 0 45-20.187 45-45V45c0-24.813-20.187-45-45-45zM121 30h30v452h-30z\" /></g><path fill=\"#ffdc40\" d=\"M381 183.028l-30-20-30 20V0h60z\" /></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/icons/svg/sync.svg":
/*!*****************************************!*\
  !*** ./resources/js/icons/svg/sync.svg ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-baker-runtime/browser-symbol */ "./node_modules/svg-baker-runtime/browser-symbol.js");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-sprite-loader/runtime/browser-sprite.build */ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-sync",
  "use": "icon-sync-usage",
  "viewBox": "0 0 512 512",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" id=\"icon-sync\"><g fill-rule=\"nonzero\" fill=\"none\"><path d=\"M511.914 256c0-141.387-114.594-256-255.957-256C114.597 0 0 114.613 0 256s114.598 256 255.957 256c141.363 0 255.957-114.613 255.957-256z\" fill=\"#1197CE\" /><path d=\"M410.719 52.098c32.676 42.988 52.086 96.617 52.086 154.785 0 141.383-114.594 256-255.957 256-58.16 0-111.778-19.414-154.758-52.098C98.84 472.285 172.754 512 255.957 512c141.363 0 255.957-114.613 255.957-256 0-83.215-39.707-157.145-101.195-203.902z\" fill=\"#2970AA\" /><path d=\"M137.598 374.184l16.957-16.961C203 400.012 257.199 411.403 316.55 384.75c37.277-16.742 61.59-46.098 75.66-85.422.879-2.453-.95-5.039-3.555-5.031-13.039.031-25.34-.074-37.601.539-2.442.121-5.407 3.71-6.918 6.383-25.52 45.203-76.926 64.988-123.551 46.347-12.145-4.855-23-12.933-35.934-20.386l17.27-17.274c2.121-2.12.617-5.75-2.383-5.75-21.078-.004-41.898-.011-63.273-.015-2.606 0-4.727 2.109-4.723 4.714.016 17.641-.016 48.715.305 63.032.066 2.96 3.652 4.39 5.75 2.297z\" fill=\"#E3FAFF\" /><path d=\"M388.656 294.297c-7.64.02-15.023-.008-22.3.09 2.156.465 3.53 2.754 2.746 4.941-14.067 39.324-38.38 68.684-75.657 85.422-17.382 7.805-34.316 12.324-50.797 13.77 23.645 2.132 48.293-2.27 73.903-13.77 37.277-16.742 61.59-46.098 75.66-85.422.875-2.45-.95-5.039-3.555-5.031z\" fill=\"#CCF4FF\" /><path d=\"M325.352 186.39l-15.375 15.38c-1.961 1.96-.579 5.316 2.199 5.32 20.59.039 41.262.074 61.414.11a4.705 4.705 0 0 0 4.715-4.716c-.028-19.445-.055-40.109-.082-61.011-.004-2.778-3.36-4.164-5.325-2.2l-15.609 15.614c-45.598-40.871-96.691-52.852-153.785-31.614-39.012 14.512-71.09 49.422-83.84 89.067-.773 2.406 1.047 4.863 3.578 4.87 12.762.036 25.332.18 37.88-.304 2.19-.086 4.862-3.527 6.265-6.011 23.773-42.106 69.578-62.301 114.406-50.063 16.316 4.457 30.617 12.59 43.559 25.559z\" fill=\"#E3FAFF\" /><path d=\"M378.223 141.473c-.004-2.778-3.36-4.164-5.325-2.2l-15.609 15.614a202.879 202.879 0 0 0-15.726-12.758v-.008c-.04-.027-.075-.05-.114-.078a7.644 7.644 0 0 0-.215-.16v.004c-31.55-22.969-65.617-32.63-102.355-27.649 20.34 2.875 50.176 18.606 74.926 35.61 17.222 11.836 27.48 31.425 27.511 52.328v.304a4.692 4.692 0 0 1-4.062 4.653c12.21.023 24.367.043 36.336.066a4.699 4.699 0 0 0 4.71-4.71c-.023-19.446-.05-40.11-.077-61.016z\" fill=\"#CCF4FF\" /></g></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/icons/svg/weibo.svg":
/*!******************************************!*\
  !*** ./resources/js/icons/svg/weibo.svg ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-baker-runtime/browser-symbol */ "./node_modules/svg-baker-runtime/browser-symbol.js");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-sprite-loader/runtime/browser-sprite.build */ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-weibo",
  "use": "icon-weibo-usage",
  "viewBox": "0 0 512 512",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" id=\"icon-weibo\"><path d=\"M403.51 247.992c12.189-23.721 13.499-45.899 3.546-63.137-10.316-17.868-31.605-28.033-59.944-28.622-20.81-.427-44.439 4.311-68.131 13.528 8.166-27.851 5.532-49.961-7.876-63.369-16.113-16.113-44.899-16.666-81.056-1.558-33.715 14.088-70.764 40.33-104.325 73.889C35.742 228.706 2.534 286.681.945 326.653A75.672 75.672 0 0 0 0 338.441c0 35.793 25.09 69.017 70.648 93.547 43.858 23.617 101.979 36.622 163.656 36.622s119.798-13.005 163.656-36.622c45.558-24.53 70.648-57.754 70.648-93.547.001-34.374-23.032-66.257-65.098-90.449z\" fill=\"#ea533b\" /><path d=\"M260.338 459.932c-61.677 0-119.798-13.005-163.656-36.622-45.558-24.53-70.648-57.754-70.648-93.547 0-3.863.318-7.825.945-11.787 1.589-39.973 34.797-97.947 84.78-147.93 33.227-33.226 69.87-59.27 103.314-73.458-7.854 1.823-16.218 4.566-25.023 8.245-33.715 14.088-70.764 40.33-104.325 73.889C35.742 228.707 2.534 286.682.945 326.654A75.65 75.65 0 0 0 0 338.441c0 35.793 25.09 69.017 70.648 93.547 43.858 23.617 101.979 36.622 163.656 36.622 48.616 0 95.016-8.086 133.969-23.074-32.921 9.405-69.744 14.396-107.935 14.396z\" fill=\"#d93c1c\" /><path d=\"M364.19 312.032c-2.568-29.565-22.081-55.61-54.944-73.338-31.681-17.091-72.302-24.49-114.382-20.835-42.079 3.656-80.818 17.949-109.076 40.247-29.314 23.131-44.045 52.151-41.476 81.715 2.569 29.565 22.082 55.61 54.946 73.338 26.389 14.236 58.976 21.748 93.447 21.747 6.913 0 13.905-.302 20.934-.913 42.079-3.654 80.817-17.948 109.075-40.246 29.315-23.131 44.044-52.151 41.476-81.715z\" fill=\"#fff\" /><path d=\"M230.36 425.319a241.87 241.87 0 0 1-20.934.913c-34.471.001-67.059-7.511-93.447-21.747-32.863-17.729-52.378-43.774-54.946-73.338-2.569-29.564 12.161-58.584 41.476-81.715 5.799-4.575 12.046-8.808 18.665-12.687-12.993 5.932-24.911 13.095-35.388 21.361-29.314 23.131-44.045 52.151-41.476 81.715 2.569 29.565 22.082 55.61 54.946 73.338 26.389 14.236 58.976 21.748 93.447 21.747 6.913 0 13.905-.302 20.934-.913 33.445-2.905 64.771-12.535 90.41-27.559-22.053 10.069-47.206 16.585-73.687 18.885z\" fill=\"#e5e5e5\" /><path d=\"M286.65 312.533c-9.507-39.544-55.55-62.508-102.638-51.189-47.088 11.32-77.661 52.703-68.156 92.249 4.682 19.473 18.156 35.492 37.943 45.105 12.283 5.967 26.102 9.003 40.355 9.003 8.042 0 16.221-.967 24.339-2.918 47.089-11.321 77.664-52.703 68.157-92.25z\" fill=\"#333\" /><circle cx=\"177.898\" cy=\"351.457\" r=\"30.373\" fill=\"#fff\" /><g fill=\"#ffa929\"><path d=\"M373.152 117.153c-7.189 0-13.017 5.828-13.017 13.017 0 7.189 5.828 13.017 13.017 13.017 26.318 0 47.729 21.411 47.729 47.729 0 7.189 5.828 13.017 13.017 13.017s13.017-5.828 13.017-13.017c-.001-40.673-33.091-73.763-73.763-73.763z\" /><path d=\"M364.475 43.39c-3.261 0-6.564.108-9.817.322-9.564.629-16.808 8.893-16.18 18.458.629 9.564 8.9 16.804 18.458 16.18a115.6 115.6 0 0 1 7.539-.248c62.206 0 112.813 50.608 112.813 112.813 0 7.606-.759 15.204-2.257 22.581-1.396 6.875 1.691 14.209 7.576 18.025 5.99 3.884 14.111 3.587 19.829-.675 3.388-2.525 5.774-6.307 6.614-10.445a148.538 148.538 0 0 0 2.95-29.487c0-81.343-66.18-147.524-147.525-147.524z\" /></g><circle cx=\"234.305\" cy=\"321.085\" r=\"17.356\" fill=\"#fff\" /></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/icons/svg/weixin.svg":
/*!*******************************************!*\
  !*** ./resources/js/icons/svg/weixin.svg ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-baker-runtime/browser-symbol */ "./node_modules/svg-baker-runtime/browser-symbol.js");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-sprite-loader/runtime/browser-sprite.build */ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-weixin",
  "use": "icon-weixin-usage",
  "viewBox": "0 0 512 512",
  "content": "<symbol viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-weixin\"><path d=\"M512 256c0 141.387-114.613 256-256 256S0 397.387 0 256 114.613 0 256 0s256 114.613 256 256zm0 0\" fill=\"#2ad827\" /><path d=\"M498.438 338.426l-95.91-95.91c-9.508-10.68-21.938-19.422-36.294-25.407l-67.488-67.582c-22.3-23.289-56.035-38.148-93.82-38.148-67.153 0-121.594 46.898-121.594 104.75 0 25.062 10.23 48.062 27.273 66.09l15.72 15.758-6.755 25.046c-.687 2.543.168 4.875 1.778 6.407l178.308 178.847c93.094-15.996 169.008-82.257 198.781-169.851zm0 0\" fill=\"#00ae00\" /><path d=\"M239.184 221.27c21.988-18.438 51.058-28.59 81.851-28.59.813 0 1.621.007 2.43.023-12.348-46.574-60.73-81.324-118.54-81.324-67.155 0-121.593 46.898-121.593 104.75 0 32.207 16.879 61.012 43.43 80.226l-7.192 26.668c-1.535 5.7 4.66 10.36 9.707 7.301l28.864-17.488c14.402 5.176 30.207 8.039 46.789 8.039 1.09 0 2.175-.016 3.261-.04a88.477 88.477 0 0 1-4.332-27.398c-.004-27.44 12.543-53.07 35.325-72.167zm4.375-60.344c8.523 0 15.433 6.91 15.433 15.433 0 8.528-6.91 15.438-15.433 15.438-8.528 0-15.438-6.91-15.438-15.438 0-8.523 6.91-15.433 15.438-15.433zm-80.32 30.87c-8.524 0-15.434-6.91-15.434-15.437 0-8.523 6.91-15.433 15.433-15.433 8.528 0 15.438 6.91 15.438 15.433 0 8.528-6.91 15.438-15.438 15.438zm0 0\" fill=\"#fff\" /><path d=\"M422.664 293.438c0-47.06-45.5-85.208-101.629-85.208-56.125 0-101.625 38.149-101.625 85.208 0 47.054 45.5 85.203 101.625 85.203 13.86 0 27.067-2.329 39.106-6.54l20.925 13.458c4.942 3.175 11.243-1.258 9.914-6.98l-4.613-19.88c22.192-15.633 36.297-39.062 36.297-65.262zM287.742 283.32c-7.566 0-13.703-6.132-13.703-13.703 0-7.566 6.137-13.699 13.703-13.699 7.567 0 13.7 6.133 13.7 13.7 0 7.57-6.133 13.702-13.7 13.702zm66.59 0c-7.566 0-13.703-6.132-13.703-13.703 0-7.566 6.137-13.699 13.703-13.699s13.703 6.133 13.703 13.7c0 7.57-6.137 13.702-13.703 13.702zm0 0\" fill=\"#ffec97\" /><path d=\"M422.668 293.441c0-46.382-44.191-84.101-99.2-85.18V378.61c12.97-.25 25.34-2.55 36.669-6.507l20.93 13.457c4.94 3.18 11.242-1.258 9.91-6.98l-4.61-19.88c22.192-15.629 36.301-39.058 36.301-65.258zm-68.34-10.12c-7.558 0-13.7-6.13-13.7-13.7 0-7.57 6.142-13.7 13.7-13.7 7.57 0 13.711 6.13 13.711 13.7 0 7.57-6.14 13.7-13.71 13.7zm0 0\" fill=\"#ffe047\" /><path d=\"M204.93 111.379c-2.293 0-4.563.05-6.82.172v209.148c2.257.121 4.527.172 6.82.172 1.09 0 2.18-.012 3.257-.031a88.395 88.395 0 0 1-4.328-27.399c0-27.441 12.54-53.07 35.32-72.171 21.989-18.442 51.06-28.59 81.86-28.59.809 0 1.617.011 2.43.02-12.352-46.571-60.742-81.321-118.54-81.321zm38.629 80.422c-8.532 0-15.442-6.91-15.442-15.442 0-8.52 6.91-15.43 15.442-15.43 8.52 0 15.43 6.91 15.43 15.43 0 8.532-6.91 15.442-15.43 15.442zm0 0\" fill=\"#fff5cb\" /></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/index/accountModal.js":
/*!********************************************!*\
  !*** ./resources/js/index/accountModal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/

/**
* header - account modal
**/

/** Clone Some Html Codes for Reducing the Page Size **/

/** Cloning the benifits bar, third login and register link section into account login and account register section where necessary **/
$('#account_modal .account-register .content .benifits_bar').clone()
/** optional parameter: includeEvents **/
.prependTo('#account_modal .account-login .password-login .content, #account_modal .account-login .phone-code-login .content');
$('#account_modal .account-register .content .third-login').clone()
/** optional parameter: includeEvents **/
.appendTo('#account_modal .account-login .password-login .content, #account_modal .account-login .phone-code-login .content');
$('#account_modal .account-login .password-login .register-link').clone()
/** optional parameter: includeEvents **/
.appendTo('#account_modal .account-login .phone-code-login');
/** Initializing the functionality of the account modal **/

$('#account_modal').modal({
  closable: false,
  transition: 'zoom',
  duration: 100,
  context: 'body'
}).modal('attach events', '#account_modal .close_button', 'hide');
/** Switching between the password login and phone code login tabs  **/

$('.tabs-control .password-login-title').on('click', function () {
  $.tab('change tab', 'password-login-tab');
  /** When switching the tab, changing the style of two tab titles by adding and removing CSS class   **/

  $('#account_modal .account-login .password-login-title').removeClass('not-active-tab-title');
  $('#account_modal .account-login .phone-code-login-title').addClass('not-active-tab-title');
});
/** Switching between the password login and phone code login tabs  **/

$('.tabs-control .phone-code-login-title').on('click', function () {
  $.tab('change tab', 'phone-code-login-tab');
  /** When switching the tab, changing the style of two tab titles by adding and removing CSS class   **/

  $('#account_modal .account-login .phone-code-login-title').removeClass('not-active-tab-title');
  $('#account_modal .account-login .password-login-title').addClass('not-active-tab-title');
});
/** Swiching account register and account login modal **/

function moveAccountModal(disToMove) {
  $('#account_modal .account-login').css({
    'transform': "translateX(".concat(disToMove, ")"),
    'transition': 'all 0.3s cubic-bezier(0, 0, 0.2, 1) 0s'
  });
  $('#account_modal .account-register').css({
    'transform': "translateX(".concat(disToMove, ")"),
    'transition': 'all 0.3s cubic-bezier(0, 0, 0.2, 1) 0s'
  });
  $('#account_modal').modal('show');
}

$('#main_sidebar .register.button, #header .register.button, #account_modal .account-login .switch-register').click(function (event) {
  moveAccountModal('-100%');
});
$('#main_sidebar .login.button, #header .login.button, #account_modal .account-register .switch-login').click(function (event) {
  moveAccountModal('0');
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/index/cornerBanners.js":
/*!*********************************************!*\
  !*** ./resources/js/index/cornerBanners.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
* Page Banners - Corner Banners
**/

/** When hovering on the corner banner, chaging the shape of the image in it by using CSS commands **/
$('#main_content .corner_banners .corner_banner').hover(
/** When the mouse enters into the corner banner area, turning the shape of the image into cornered square from circle **/
function (event) {
  $(event.currentTarget).find('.card_image').css({
    'border-radius': '15%'
  });
},
/** When the mouse leave the corner banner area, turning the shape of the image into circle from cornered square **/
function (event) {
  $(event.currentTarget).find('.card_image').css({
    'border-radius': '50%'
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/index/detectBrowsers.js":
/*!**********************************************!*\
  !*** ./resources/js/index/detectBrowsers.js ***!
  \**********************************************/
/*! exports provided: isiOS, isAndroid, isIE11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isiOS", function() { return isiOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAndroid", function() { return isAndroid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIE11", function() { return isIE11; });
/*****************************************************************************************************************************

                                   Detect Browsers

******************************************************************************************************************************/

/** Mobile Device and IE11 Detection **/

/** detecting if it is iOS or Android devices **/
var u = navigator.userAgent; //iOS devices

var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //Android devices

var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
/** detecting if it is IE11 browser **/

var isIE11 = false;

if (window.matchMedia("screen and (-ms-high-contrast: active), (-ms-high-contrast: none)").matches) {
  isIE11 = true;
}



/***/ }),

/***/ "./resources/js/index/header.js":
/*!**************************************!*\
  !*** ./resources/js/index/header.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _accountModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accountModal */ "./resources/js/index/accountModal.js");
/* harmony import */ var _accountModal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_accountModal__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _searchBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./searchBar */ "./resources/js/index/searchBar.js");
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sidebar */ "./resources/js/index/sidebar.js");
/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/




/***/ }),

/***/ "./resources/js/index/main.js":
/*!************************************!*\
  !*** ./resources/js/index/main.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _semantic_ui_dist_semantic_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../semantic-ui/dist/semantic.min.js */ "./semantic-ui/dist/semantic.min.js");
/* harmony import */ var _semantic_ui_dist_semantic_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_semantic_ui_dist_semantic_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header */ "./resources/js/index/header.js");
/* harmony import */ var _pageBanners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pageBanners */ "./resources/js/index/pageBanners.js");


 //借助webpack的require.context来动态引入所有svg图标文件

var request = __webpack_require__("./resources/js/icons/svg sync \\.svg$");

request.keys().forEach(request);

/***/ }),

/***/ "./resources/js/index/mainBanner.js":
/*!******************************************!*\
  !*** ./resources/js/index/mainBanner.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
* Page Banners - Main Banner(featured carousel)
**/

/** Solve the problem that the images after the first one show out there out of the carousel area **/

/** befre the slick component takes effect when you refresh the page in the Chrome browser **/
$(document).ready(function () {
  $('.featured_carousel .image_holder').css('visibility', 'visible');
  $('#main_content .page_banners').css('box-shadow', '0 8px 24px 0 rgba(82,94,102,.15)');
  $('#main_content .page_banners .corner_banners .corner_banner').css('visibility', 'visible');
});
/** Activating the functionality of the featured carousel with the customized previous and next arrow indicators **/

$('#main_content .page_banners .featured_carousel').slick({
  autoplay: true,
  autoplaySpeed: 2000,
  fade: true,
  cssEase: 'linear',
  dots: true,
  prevArrow: '<button type="button" class="prev circular ui icon button"><i class="chevron left icon"></i></button>',
  nextArrow: '<button type="button" class="next circular ui icon button"><i class="chevron right icon"></i></button>'
});
/** Fix the problem that the slide pictures get in stuck temporarily when resizing the browser window **/

$(window).resize(function (event) {
  var realtimeWidth = $('#main_content .page_banners .main_banner .slick-list').width();
  $('#main_content .page_banners .main_banner .item .image_holder').css('width', realtimeWidth);
});
/** Fix the problem that the arrows doesn't fade out, **/

/** when the mouse hovers on the carousel area, navigation dots and left and right arrows, making the left and right arrows showing out there with fade animation effects **/

/** and make the color of the overlay on the slick slides change between lighter and darker **/

function moveNavButtons(disToMove, buttonOpacity) {
  $('.featured_carousel .prev.button').css({
    'transform': "translate(".concat(disToMove, ", -50%)"),
    'opacity': "".concat(buttonOpacity)
  });
  $('.featured_carousel .next.button').css({
    'transform': "translate(-".concat(disToMove, ", -50%)"),
    'opacity': "".concat(buttonOpacity)
  });
}

$('.featured_carousel .slick-list, .featured_carousel .prev.button, .featured_carousel .next.button, .featured_carousel .slick-dots').hover(
/** When the mouse enters into the carousel area, making the arrows fade in **/
function () {
  moveNavButtons('1.2rem', 1);
},
/** When the mouse leaves the carousel area, making the arrows fade out **/
function () {
  moveNavButtons('0.4rem', 0);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/index/pageBanners.js":
/*!*******************************************!*\
  !*** ./resources/js/index/pageBanners.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! slick-carousel */ "./node_modules/slick-carousel/slick/slick.js");
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(slick_carousel__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mainBanner_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mainBanner.js */ "./resources/js/index/mainBanner.js");
/* harmony import */ var _mainBanner_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mainBanner_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cornerBanners_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cornerBanners.js */ "./resources/js/index/cornerBanners.js");
/* harmony import */ var _cornerBanners_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_cornerBanners_js__WEBPACK_IMPORTED_MODULE_2__);
/*****************************************************************************************************************************

                                                        Page Banners

******************************************************************************************************************************/




/***/ }),

/***/ "./resources/js/index/searchBar.js":
/*!*****************************************!*\
  !*** ./resources/js/index/searchBar.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _detectBrowsers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detectBrowsers */ "./resources/js/index/detectBrowsers.js");
/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/

/**
* header - search bar
**/

/** When using Chinese input, do not show search results before Chinese characters are spell out **/

/** flag showing whether Chinese characters are spell out **/

var chineseInput_flag = true;
/** This event indicates that the alphabetic characters used for spelling Chinese words has been typed, **/

/** but Chinese words are not generated **/

$('#header .right.menu .ui.search input.prompt').on('compositionstart', function () {
  /** the state of combining Chinese words is not finished **/
  chineseInput_flag = false;
});
/** This event indicates that the alphabetic characters used for spelling Chinese words has been typed, **/

/** and all the relative Chinese words are generated **/

$('#header .right.menu .ui.search input.prompt').on('compositionend', function () {
  /** the state of combining Chinese words is finished **/
  chineseInput_flag = true;
});
/** the message that needs to be passed when there's no search result returned **/

$.fn.search.settings.error.noResults = '抱歉～您的搜索没匹配到任何结果。';
/** the html code generated when there's no search result returned **/

$.fn.search.settings.templates.message = function (message, type) {
  var html = '';

  if (message !== undefined && type !== undefined) {
    html += '' + '<div class="message ' + type + '">'; // when there's no result returned, the html code that should be generated

    if (type == 'empty') {
      html += '' + '<div class="header">没找到“<span>' + $('#header .right.menu .ui.search').search('get value') + '</span>”的搜索结果</div>' + '<br />' + '<div class="description">' + message + '</div>' + '<br />' + '<div class="description"><a href="http://www.pingwest.com">告诉我们</a>您感兴趣的话题，根据反馈，我们有可能在将来增加相关的内容。</div>';
    }
    /** other circumstances **/
    else {
        html += ' <div class="description">' + message + '</div>';
      }

    html += '</div>';
  }

  return html;
};
/** local search data **/


var content = [{
  title: '还要啥男朋友？！白领自拍指南'
}, {
  title: '不学你就out啦！财务工作必须掌握的20个Excel函数'
}, {
  title: '1Password——密码管理的终极解决方案'
}, {
  title: '5分钟设计出Excel的花式图表'
}, {
  title: '精通Word排版艺术'
}, {
  title: 'Word PowerPoint Excel基础教程'
}, {
  title: 'Armenia'
}, {
  title: 'Netherlands Antilles'
}, {
  title: 'Angola'
}, {
  title: 'Argentina'
}, {
  title: 'American Samoa'
}, {
  title: 'Austria'
}, {
  title: 'Australia'
}, {
  title: 'Aruba'
}, {
  title: 'Aland Islands'
}, {
  title: 'Azerbaijan'
}, {
  title: 'Bosnia'
}, {
  title: 'Barbados'
}, {
  title: 'Bangladesh'
}, {
  title: 'Belgium'
}, {
  title: 'Burkina Faso'
}, {
  title: 'Bulgaria'
}, {
  title: 'Bahrain'
}, {
  title: 'Burundi'
}];
/** activate the search feature **/

$('#header .right.menu .ui.search').search({
  source: content,
  fullTextSearch: true,
  transition: 'fade',
  maxResults: 10,
  onResultsOpen: function onResultsOpen() {
    $('#main_content .page_banners')[0].style.zIndex = -1;
    $('#main_content .page_banners')[0].style.zIndex = -1;
  },
  onResultsClose: function onResultsClose() {
    $('#main_content .page_banners')[0].style.zIndex = 'auto';
    $('#main_content .page_banners')[0].style.zIndex = 'auto';
  },
  onSearchQuery: function onSearchQuery(query) {
    if ($.trim(query) === '') {
      $('#header .right.menu .ui.search .results').addClass('hide_results');
    } else {
      setTimeout(function () {
        /** if the state of combining Chinese words is not finished, do not show any search results **/
        if (!chineseInput_flag) {
          $('#header .right.menu .ui.search .results').addClass('hide_results');
        }
        /** if the state of combining Chinese words is finished, showing the relative search results **/
        else {
            $('#header .right.menu .ui.search .results').removeClass('hide_results');
            $('#header .right.menu .ui.search').search('search local', $.trim(query));
          }
      }, 0);
    }
  }
});
/** when clicking on the search icon, make the search box visible **/

$('#header .right.menu .ui.search i.search.icon').click(function (event) {
  /** if Android devices are detected, making the close icon a little bit larger **/

  /** the reason why doing this is because the small close icon on Android devices is very hard to click **/
  if (_detectBrowsers__WEBPACK_IMPORTED_MODULE_0__["isAndroid"]) {
    /** the 'large' class can make the icon become large **/
    $('#header .right.menu .ui.search .close.icon').addClass('large');
    /** making the close icon in the correct position after adjusting its size **/

    $('#header .right.menu .ui.search .close.icon')[0].style.transform = 'translateY(-0.05rem)';
  }
  /** making search box visible **/


  var search_input = $('#header .right.menu .ui.search input.prompt')[0];
  search_input.style.visibility = 'visible';
  /** making search input get foucs **/

  if (!_detectBrowsers__WEBPACK_IMPORTED_MODULE_0__["isIE11"]) {
    search_input.focus();
  }
  /** making login and register buttons invisible **/


  var login_button = $('#header .right.menu .login.button');
  var divider = $('#header .right.menu .divider_item');
  var register_button = $('#header .right.menu .register_button');
  login_button[0].style.display = 'none';
  divider[0].style.display = 'none';
  register_button[0].style.display = 'none';
  /** removing 'link' class via jQuery **/

  $(event.currentTarget).removeClass('link');
  /** making the close icon visible **/

  $('#header .right.menu .ui.search i.close.icon')[0].style.display = 'inline-block';
  /** adding class to search icon for negative margin **/

  $(event.currentTarget).addClass('negative_mg_lft');
  /** stopping the propagation **/

  event.stopPropagation();
});
/** when click on the close icon, closing the search results panels in two steps **/

$('#header .right.menu .ui.search i.close.icon').click(function (event) {
  /** if search results panel is open, just close it and do nothing else **/
  if ($('#header .right.menu .ui.search').search('is visible')) {
    $('#header .right.menu .ui.search').search('hide results');
    /** clear the input in the search box **/

    $('#header .right.menu .ui.search input.prompt').val('');
  }
  /** if search results panel is not open, make the search box invisble **/
  else {
      /* making search input invisible */
      var search_input = $('#header .right.menu .ui.search input.prompt')[0];
      search_input.style.visibility = 'hidden';
      search_input.style.width = '0';
      /* making close icon invisible */

      var close_icon = event.currentTarget;
      close_icon.style.display = 'none';
      /* making login and register buttons visible */

      var login_button = $('#header .right.menu .login.button');
      var divider = $('#header .right.menu .divider_item');
      var register_button = $('#header .right.menu .register_button');
      login_button[0].style.display = 'inline-block';
      divider[0].style.display = 'inline-block';
      register_button[0].style.display = 'inline-block';
      /* adding 'link' class to search icon via jQuery */

      $('#header .right.menu .ui.search i.search.icon').addClass('link');
      /* removing class from search icon for negative margin */

      $('#header .right.menu .ui.search i.search.icon').removeClass('negative_mg_lft');
    }
});
/** preventing the body click event when click on search input **/

$('#header .right.menu .ui.search .prompt').click(function (event) {
  /* stopping the propagation */
  event.stopPropagation();
});
/** When the keyboard is close, resize the height of the sidebar for Android devices **/

$('#header .right.menu .ui.search .prompt').blur(function () {
  if (_detectBrowsers__WEBPACK_IMPORTED_MODULE_0__["isAndroid"]) {
    /** delay the display of the sidebar after resizing the height of it **/

    /** the reason why doing this is becasue only when the keyboard is close can you resize the height of the sidebar **/
    setTimeout("$('#main_sidebar .content_wrapper').css('height', $(window).height())", 200);
  }
});
/** when clicking the menu button, making the search bar invisible **/

$('#header .right.menu .menu_button .align.justify.icon').click(function (event) {
  /* making search input invisible */
  var search_input = $('#header .right.menu .ui.search input.prompt')[0];
  search_input.style.visibility = 'hidden';
  search_input.style.width = '0';
  /* making close icon invisible */

  var close_icon = $('#header .right.menu .ui.search .close.icon')[0];
  close_icon.style.display = 'none';
  /* making login and register buttons visible */

  var login_button = $('#header .right.menu .login.button');
  var divider = $('#header .right.menu .divider_item');
  var register_button = $('#header .right.menu .register_button');
  login_button[0].style.display = 'inline-block';
  divider[0].style.display = 'inline-block';
  register_button[0].style.display = 'inline-block';
  /* adding 'link' class to search icon via jQuery */

  $('#header .right.menu .ui.search i.search.icon').addClass('link');
  /* removing class from search icon for negative margin */

  $('#header .right.menu .ui.search i.search.icon').removeClass('negative_mg_lft');
});
/** when clicking in the viewport, making the search input get focus **/

$('body').click(function (event) {
  /** clear the input in the search box **/
  $('#header .right.menu .ui.search input.prompt').val('');
  /** making search input get foucs **/

  var search_input = $('#header .right.menu .ui.search input.prompt')[0];
  /** in IE11, when the input is focused, placeholder can not be displayed **/

  if (!_detectBrowsers__WEBPACK_IMPORTED_MODULE_0__["isIE11"]) {
    search_input.focus();
  }
});
/** hiding results panel of the search box when clicking on it **/

$('#header .right.menu .ui.search .results').click(function (event) {
  /** hiding the results panel of the search bar **/
  $('#header .right.menu .ui.search').search('hide results');
  /** making search input get foucs **/

  var search_input = $('#header .right.menu .ui.search input.prompt')[0];
  /** clear the input **/

  $(search_input).val('');
  search_input.focus();
  /* stopping the propagation */

  event.stopPropagation();
});
/** Solve the problem of when the 'esc' key is pressed, SUI search component does not work **/

$(window).on('keyup', function (evt) {
  if (evt.which == 27) {
    $(".prompt").blur();
    $('#header .right.menu .ui.search i.close.icon').click();
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/index/sidebar.js":
/*!***************************************!*\
  !*** ./resources/js/index/sidebar.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _detectBrowsers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detectBrowsers */ "./resources/js/index/detectBrowsers.js");
/* harmony import */ var enquire_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! enquire.js */ "./node_modules/enquire.js/src/index.js");
/* harmony import */ var enquire_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(enquire_js__WEBPACK_IMPORTED_MODULE_1__);
/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/


/**
* header - sidebar
**/

/** Clone Some Html Codes for Reducing the Page Size **/

/** Cloning the items of the main navigation into sidebar **/

$('#main_nav .left.menu a.item').clone()
/** optional parameter: includeEvents **/
.appendTo('#main_sidebar section.ui.menu ul').wrap('<li></li>');
/** Cloning the register button into sidebar **/

$('#header .right.menu .register_button').clone(true)
/** optional parameter: includeEvents **/
.appendTo('#main_sidebar .ui.menu .login_register_buttons');
/** Resizing the height for iOS and Android devices **/

var resizeSidebarHeight = function resizeSidebarHeight() {
  /* resizing the height of the sidebar when the ios device is detected */
  if (_detectBrowsers__WEBPACK_IMPORTED_MODULE_0__["isiOS"] || _detectBrowsers__WEBPACK_IMPORTED_MODULE_0__["isAndroid"]) {
    $('#main_sidebar .content_wrapper').css('height', $(window).height());
  }
};
/** When chaging the orientation of the devices, closing the sidebar **/


$(window).on('orientationchange', function (event) {
  /* making the sidebar invisible */
  $('#main_sidebar .close_layer a').click();
  /** making the results panel of the search box to be close **/

  $('#header .right.menu .ui.search').search('hide results');
});
/** toggling the display of the sidebar **/

$('#main_sidebar').sidebar({
  transition: 'overlay',
  mobileTransition: 'overlay',
  dimPage: false,
  context: 'body',
  onVisible: function onVisible() {
    /** Resizing the height for iOS devices **/
    resizeSidebarHeight();
    /** when opening the sidebar, preventing the body layer from moving **/

    $('body').addClass('fixed_layer');
  },
  onHidden: function onHidden() {
    /** when closing the sidebar, releasing the original state of the body layer **/
    $('body').removeClass('fixed_layer');
  }
}).sidebar('attach events', '#header .right.menu .menu_button .align.justify.icon');
/** making the sidebar invisible **/

$('#main_sidebar .close_layer a').click(function (event) {
  $('#main_sidebar').sidebar('hide');
});
/** when the width of the screen is greater than 768px, close the sidebar if it is open **/

enquire_js__WEBPACK_IMPORTED_MODULE_1___default.a.register("screen and (min-width: 768px)", {
  match: function match() {
    if ($('#main_sidebar').sidebar('is visible')) {
      $('#main_sidebar .close_layer a').click();
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/sass/index/main.scss":
/*!****************************************!*\
  !*** ./resources/sass/index/main.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./semantic-ui/dist/semantic.min.js":
/*!******************************************!*\
  !*** ./semantic-ui/dist/semantic.min.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
* # Semantic UI - 2.4.2
* https://github.com/Semantic-Org/Semantic-UI
* http://www.semantic-ui.com/
*
* Copyright 2014 Contributors
* Released under the MIT license
* http://opensource.org/licenses/MIT
*
*/
!function (p, h, b, v) {
  p.site = p.fn.site = function (e) {
    var s,
        c,
        i = new Date().getTime(),
        o = [],
        t = e,
        n = "string" == typeof t,
        l = [].slice.call(arguments, 1),
        u = p.isPlainObject(e) ? p.extend(!0, {}, p.site.settings, e) : p.extend({}, p.site.settings),
        a = u.namespace,
        d = u.error,
        r = "module-" + a,
        f = p(b),
        m = this,
        g = f.data(r);
    return s = {
      initialize: function initialize() {
        s.instantiate();
      },
      instantiate: function instantiate() {
        s.verbose("Storing instance of site", s), g = s, f.data(r, s);
      },
      normalize: function normalize() {
        s.fix.console(), s.fix.requestAnimationFrame();
      },
      fix: {
        console: function (_console) {
          function console() {
            return _console.apply(this, arguments);
          }

          console.toString = function () {
            return _console.toString();
          };

          return console;
        }(function () {
          s.debug("Normalizing window.console"), console !== v && console.log !== v || (s.verbose("Console not available, normalizing events"), s.disable.console()), void 0 !== console.group && void 0 !== console.groupEnd && void 0 !== console.groupCollapsed || (s.verbose("Console group not available, normalizing events"), h.console.group = function () {}, h.console.groupEnd = function () {}, h.console.groupCollapsed = function () {}), void 0 === console.markTimeline && (s.verbose("Mark timeline not available, normalizing events"), h.console.markTimeline = function () {});
        }),
        consoleClear: function consoleClear() {
          s.debug("Disabling programmatic console clearing"), h.console.clear = function () {};
        },
        requestAnimationFrame: function requestAnimationFrame() {
          s.debug("Normalizing requestAnimationFrame"), h.requestAnimationFrame === v && (s.debug("RequestAnimationFrame not available, normalizing event"), h.requestAnimationFrame = h.requestAnimationFrame || h.mozRequestAnimationFrame || h.webkitRequestAnimationFrame || h.msRequestAnimationFrame || function (e) {
            setTimeout(e, 0);
          });
        }
      },
      moduleExists: function moduleExists(e) {
        return p.fn[e] !== v && p.fn[e].settings !== v;
      },
      enabled: {
        modules: function modules(e) {
          var n = [];
          return e = e || u.modules, p.each(e, function (e, t) {
            s.moduleExists(t) && n.push(t);
          }), n;
        }
      },
      disabled: {
        modules: function modules(e) {
          var n = [];
          return e = e || u.modules, p.each(e, function (e, t) {
            s.moduleExists(t) || n.push(t);
          }), n;
        }
      },
      change: {
        setting: function setting(o, a, e, r) {
          e = "string" == typeof e ? "all" === e ? u.modules : [e] : e || u.modules, r = r === v || r, p.each(e, function (e, t) {
            var n,
                i = !s.moduleExists(t) || p.fn[t].settings.namespace || !1;
            s.moduleExists(t) && (s.verbose("Changing default setting", o, a, t), p.fn[t].settings[o] = a, r && i && 0 < (n = p(":data(module-" + i + ")")).length && (s.verbose("Modifying existing settings", n), n[t]("setting", o, a)));
          });
        },
        settings: function settings(i, e, o) {
          e = "string" == typeof e ? [e] : e || u.modules, o = o === v || o, p.each(e, function (e, t) {
            var n;
            s.moduleExists(t) && (s.verbose("Changing default setting", i, t), p.extend(!0, p.fn[t].settings, i), o && a && 0 < (n = p(":data(module-" + a + ")")).length && (s.verbose("Modifying existing settings", n), n[t]("setting", i)));
          });
        }
      },
      enable: {
        console: function console() {
          s.console(!0);
        },
        debug: function debug(e, t) {
          e = e || u.modules, s.debug("Enabling debug for modules", e), s.change.setting("debug", !0, e, t);
        },
        verbose: function verbose(e, t) {
          e = e || u.modules, s.debug("Enabling verbose debug for modules", e), s.change.setting("verbose", !0, e, t);
        }
      },
      disable: {
        console: function console() {
          s.console(!1);
        },
        debug: function debug(e, t) {
          e = e || u.modules, s.debug("Disabling debug for modules", e), s.change.setting("debug", !1, e, t);
        },
        verbose: function verbose(e, t) {
          e = e || u.modules, s.debug("Disabling verbose debug for modules", e), s.change.setting("verbose", !1, e, t);
        }
      },
      console: function console(e) {
        if (e) {
          if (g.cache.console === v) return void s.error(d.console);
          s.debug("Restoring console function"), h.console = g.cache.console;
        } else s.debug("Disabling console function"), g.cache.console = h.console, h.console = {
          clear: function clear() {},
          error: function error() {},
          group: function group() {},
          groupCollapsed: function groupCollapsed() {},
          groupEnd: function groupEnd() {},
          info: function info() {},
          log: function log() {},
          markTimeline: function markTimeline() {},
          warn: function warn() {}
        };
      },
      destroy: function destroy() {
        s.verbose("Destroying previous site for", f), f.removeData(r);
      },
      cache: {},
      setting: function setting(e, t) {
        if (p.isPlainObject(e)) p.extend(!0, u, e);else {
          if (t === v) return u[e];
          u[e] = t;
        }
      },
      internal: function internal(e, t) {
        if (p.isPlainObject(e)) p.extend(!0, s, e);else {
          if (t === v) return s[e];
          s[e] = t;
        }
      },
      debug: function debug() {
        u.debug && (u.performance ? s.performance.log(arguments) : (s.debug = Function.prototype.bind.call(console.info, console, u.name + ":"), s.debug.apply(console, arguments)));
      },
      verbose: function verbose() {
        u.verbose && u.debug && (u.performance ? s.performance.log(arguments) : (s.verbose = Function.prototype.bind.call(console.info, console, u.name + ":"), s.verbose.apply(console, arguments)));
      },
      error: function error() {
        s.error = Function.prototype.bind.call(console.error, console, u.name + ":"), s.error.apply(console, arguments);
      },
      performance: {
        log: function log(e) {
          var t, n;
          u.performance && (n = (t = new Date().getTime()) - (i || t), i = t, o.push({
            Element: m,
            Name: e[0],
            Arguments: [].slice.call(e, 1) || "",
            "Execution Time": n
          })), clearTimeout(s.performance.timer), s.performance.timer = setTimeout(s.performance.display, 500);
        },
        display: function display() {
          var e = u.name + ":",
              n = 0;
          i = !1, clearTimeout(s.performance.timer), p.each(o, function (e, t) {
            n += t["Execution Time"];
          }), e += " " + n + "ms", (console.group !== v || console.table !== v) && 0 < o.length && (console.groupCollapsed(e), console.table ? console.table(o) : p.each(o, function (e, t) {
            console.log(t.Name + ": " + t["Execution Time"] + "ms");
          }), console.groupEnd()), o = [];
        }
      },
      invoke: function invoke(i, e, t) {
        var o,
            a,
            n,
            r = g;
        return e = e || l, t = m || t, "string" == typeof i && r !== v && (i = i.split(/[\. ]/), o = i.length - 1, p.each(i, function (e, t) {
          var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
          if (p.isPlainObject(r[n]) && e != o) r = r[n];else {
            if (r[n] !== v) return a = r[n], !1;
            if (!p.isPlainObject(r[t]) || e == o) return r[t] !== v ? a = r[t] : s.error(d.method, i), !1;
            r = r[t];
          }
        })), p.isFunction(a) ? n = a.apply(t, e) : a !== v && (n = a), p.isArray(c) ? c.push(n) : c !== v ? c = [c, n] : n !== v && (c = n), a;
      }
    }, n ? (g === v && s.initialize(), s.invoke(t)) : (g !== v && s.destroy(), s.initialize()), c !== v ? c : this;
  }, p.site.settings = {
    name: "Site",
    namespace: "site",
    error: {
      console: "Console cannot be restored, most likely it was overwritten outside of module",
      method: "The method you called is not defined."
    },
    debug: !1,
    verbose: !1,
    performance: !0,
    modules: ["accordion", "api", "checkbox", "dimmer", "dropdown", "embed", "form", "modal", "nag", "popup", "rating", "shape", "sidebar", "state", "sticky", "tab", "transition", "visit", "visibility"],
    siteNamespace: "site",
    namespaceStub: {
      cache: {},
      config: {},
      sections: {},
      section: {},
      utilities: {}
    }
  }, p.extend(p.expr[":"], {
    data: p.expr.createPseudo ? p.expr.createPseudo(function (t) {
      return function (e) {
        return !!p.data(e, t);
      };
    }) : function (e, t, n) {
      return !!p.data(e, n[3]);
    }
  });
}(jQuery, window, document), function (E, q, O, j) {
  "use strict";

  q = void 0 !== q && q.Math == Math ? q : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), E.fn.search = function (c) {
    var C,
        w = E(this),
        k = w.selector || "",
        T = new Date().getTime(),
        S = [],
        A = c,
        R = "string" == typeof A,
        F = [].slice.call(arguments, 1);
    return E(this).each(function () {
      var f,
          l = E.isPlainObject(c) ? E.extend(!0, {}, E.fn.search.settings, c) : E.extend({}, E.fn.search.settings),
          m = l.className,
          u = l.metadata,
          d = l.regExp,
          a = l.fields,
          g = l.selector,
          p = l.error,
          e = l.namespace,
          i = "." + e,
          t = e + "-module",
          h = E(this),
          b = h.find(g.prompt),
          n = h.find(g.searchButton),
          o = h.find(g.results),
          r = h.find(g.result),
          v = (h.find(g.category), this),
          s = h.data(t),
          y = !1,
          x = !1;
      f = {
        initialize: function initialize() {
          f.verbose("Initializing module"), f.get.settings(), f.determine.searchFields(), f.bind.events(), f.set.type(), f.create.results(), f.instantiate();
        },
        instantiate: function instantiate() {
          f.verbose("Storing instance of module", f), s = f, h.data(t, f);
        },
        destroy: function destroy() {
          f.verbose("Destroying instance"), h.off(i).removeData(t);
        },
        refresh: function refresh() {
          f.debug("Refreshing selector cache"), b = h.find(g.prompt), n = h.find(g.searchButton), h.find(g.category), o = h.find(g.results), r = h.find(g.result);
        },
        refreshResults: function refreshResults() {
          o = h.find(g.results), r = h.find(g.result);
        },
        bind: {
          events: function events() {
            f.verbose("Binding events to search"), l.automatic && (h.on(f.get.inputEvent() + i, g.prompt, f.event.input), b.attr("autocomplete", "off")), h.on("focus" + i, g.prompt, f.event.focus).on("blur" + i, g.prompt, f.event.blur).on("keydown" + i, g.prompt, f.handleKeyboard).on("click" + i, g.searchButton, f.query).on("mousedown" + i, g.results, f.event.result.mousedown).on("mouseup" + i, g.results, f.event.result.mouseup).on("click" + i, g.result, f.event.result.click);
          }
        },
        determine: {
          searchFields: function searchFields() {
            c && c.searchFields !== j && (l.searchFields = c.searchFields);
          }
        },
        event: {
          input: function input() {
            l.searchDelay ? (clearTimeout(f.timer), f.timer = setTimeout(function () {
              f.is.focused() && f.query();
            }, l.searchDelay)) : f.query();
          },
          focus: function focus() {
            f.set.focus(), l.searchOnFocus && f.has.minimumCharacters() && f.query(function () {
              f.can.show() && f.showResults();
            });
          },
          blur: function blur(e) {
            var t = O.activeElement === this,
                n = function n() {
              f.cancel.query(), f.remove.focus(), f.timer = setTimeout(f.hideResults, l.hideDelay);
            };

            t || (x = !1, f.resultsClicked ? (f.debug("Determining if user action caused search to close"), h.one("click.close" + i, g.results, function (e) {
              f.is.inMessage(e) || y ? b.focus() : (y = !1, f.is.animating() || f.is.hidden() || n());
            })) : (f.debug("Input blurred without user action, closing results"), n()));
          },
          result: {
            mousedown: function mousedown() {
              f.resultsClicked = !0;
            },
            mouseup: function mouseup() {
              f.resultsClicked = !1;
            },
            click: function click(e) {
              f.debug("Search result selected");
              var t = E(this),
                  n = t.find(g.title).eq(0),
                  i = t.is("a[href]") ? t : t.find("a[href]").eq(0),
                  o = i.attr("href") || !1,
                  a = i.attr("target") || !1,
                  r = (n.html(), 0 < n.length && n.text()),
                  s = f.get.results(),
                  c = t.data(u.result) || f.get.result(r, s);
              if (E.isFunction(l.onSelect) && !1 === l.onSelect.call(v, c, s)) return f.debug("Custom onSelect callback cancelled default select action"), void (y = !0);
              f.hideResults(), r && f.set.value(r), o && (f.verbose("Opening search link found in result", i), "_blank" == a || e.ctrlKey ? q.open(o) : q.location.href = o);
            }
          }
        },
        handleKeyboard: function handleKeyboard(e) {
          var t,
              n = h.find(g.result),
              i = h.find(g.category),
              o = n.filter("." + m.active),
              a = n.index(o),
              r = n.length,
              s = 0 < o.length,
              c = e.which,
              l = 13,
              u = 38,
              d = 40;
          if (c == 27 && (f.verbose("Escape key pressed, blurring search field"), f.hideResults(), x = !0), f.is.visible()) {
            if (c == l) {
              if (f.verbose("Enter key pressed, selecting active result"), 0 < n.filter("." + m.active).length) return f.event.result.click.call(n.filter("." + m.active), e), e.preventDefault(), !1;
            } else c == u && s ? (f.verbose("Up key pressed, changing active result"), t = a - 1 < 0 ? a : a - 1, i.removeClass(m.active), n.removeClass(m.active).eq(t).addClass(m.active).closest(i).addClass(m.active), e.preventDefault()) : c == d && (f.verbose("Down key pressed, changing active result"), t = r <= a + 1 ? a : a + 1, i.removeClass(m.active), n.removeClass(m.active).eq(t).addClass(m.active).closest(i).addClass(m.active), e.preventDefault());
          } else c == l && (f.verbose("Enter key pressed, executing query"), f.query(), f.set.buttonPressed(), b.one("keyup", f.remove.buttonFocus));
        },
        setup: {
          api: function api(t, n) {
            var e = {
              debug: l.debug,
              on: !1,
              cache: l.cache,
              action: "search",
              urlData: {
                query: t
              },
              onSuccess: function onSuccess(e) {
                f.parse.response.call(v, e, t), n();
              },
              onFailure: function onFailure() {
                f.displayMessage(p.serverError), n();
              },
              onAbort: function onAbort(e) {},
              onError: f.error
            };
            E.extend(!0, e, l.apiSettings), f.verbose("Setting up API request", e), h.api(e);
          }
        },
        can: {
          useAPI: function useAPI() {
            return E.fn.api !== j;
          },
          show: function show() {
            return f.is.focused() && !f.is.visible() && !f.is.empty();
          },
          transition: function transition() {
            return l.transition && E.fn.transition !== j && h.transition("is supported");
          }
        },
        is: {
          animating: function animating() {
            return o.hasClass(m.animating);
          },
          hidden: function hidden() {
            return o.hasClass(m.hidden);
          },
          inMessage: function inMessage(e) {
            if (e.target) {
              var t = E(e.target);
              return E.contains(O.documentElement, e.target) && 0 < t.closest(g.message).length;
            }
          },
          empty: function empty() {
            return "" === o.html();
          },
          visible: function visible() {
            return 0 < o.filter(":visible").length;
          },
          focused: function focused() {
            return 0 < b.filter(":focus").length;
          }
        },
        get: {
          settings: function settings() {
            E.isPlainObject(c) && c.searchFullText && (l.fullTextSearch = c.searchFullText, f.error(l.error.oldSearchSyntax, v));
          },
          inputEvent: function inputEvent() {
            var e = b[0];
            return e !== j && e.oninput !== j ? "input" : e !== j && e.onpropertychange !== j ? "propertychange" : "keyup";
          },
          value: function value() {
            return b.val();
          },
          results: function results() {
            return h.data(u.results);
          },
          result: function result(n, e) {
            var i = ["title", "id"],
                o = !1;
            return n = n !== j ? n : f.get.value(), e = e !== j ? e : f.get.results(), "category" === l.type ? (f.debug("Finding result that matches", n), E.each(e, function (e, t) {
              if (E.isArray(t.results) && (o = f.search.object(n, t.results, i)[0])) return !1;
            })) : (f.debug("Finding result in results object", n), o = f.search.object(n, e, i)[0]), o || !1;
          }
        },
        select: {
          firstResult: function firstResult() {
            f.verbose("Selecting first result"), r.first().addClass(m.active);
          }
        },
        set: {
          focus: function focus() {
            h.addClass(m.focus);
          },
          loading: function loading() {
            h.addClass(m.loading);
          },
          value: function value(e) {
            f.verbose("Setting search input value", e), b.val(e);
          },
          type: function type(e) {
            e = e || l.type, "category" == l.type && h.addClass(l.type);
          },
          buttonPressed: function buttonPressed() {
            n.addClass(m.pressed);
          }
        },
        remove: {
          loading: function loading() {
            h.removeClass(m.loading);
          },
          focus: function focus() {
            h.removeClass(m.focus);
          },
          buttonPressed: function buttonPressed() {
            n.removeClass(m.pressed);
          }
        },
        query: function query(e) {
          e = E.isFunction(e) ? e : function () {};
          var t = f.get.value(),
              n = f.read.cache(t);
          e = e || function () {}, f.has.minimumCharacters() ? (n ? (f.debug("Reading result from cache", t), f.save.results(n.results), f.addResults(n.html), f.inject.id(n.results), e()) : (f.debug("Querying for", t), E.isPlainObject(l.source) || E.isArray(l.source) ? (f.search.local(t), e()) : f.can.useAPI() ? f.search.remote(t, e) : (f.error(p.source), e())), l.onSearchQuery.call(v, t)) : f.hideResults();
        },
        search: {
          local: function local(e) {
            var t,
                n = f.search.object(e, l.content);
            f.set.loading(), f.save.results(n), f.debug("Returned full local search results", n), 0 < l.maxResults && (f.debug("Using specified max results", n), n = n.slice(0, l.maxResults)), "category" == l.type && (n = f.create.categoryResults(n)), t = f.generateResults({
              results: n
            }), f.remove.loading(), f.addResults(t), f.inject.id(n), f.write.cache(e, {
              html: t,
              results: n
            });
          },
          remote: function remote(e, t) {
            t = E.isFunction(t) ? t : function () {}, h.api("is loading") && h.api("abort"), f.setup.api(e, t), h.api("query");
          },
          object: function object(i, t, e) {
            var a = [],
                r = [],
                s = [],
                n = i.toString().replace(d.escape, "\\$&"),
                o = new RegExp(d.beginsWith + n, "i"),
                c = function c(e, t) {
              var n = -1 == E.inArray(t, a),
                  i = -1 == E.inArray(t, s),
                  o = -1 == E.inArray(t, r);
              n && i && o && e.push(t);
            };

            return t = t || l.source, e = e !== j ? e : l.searchFields, E.isArray(e) || (e = [e]), t === j || !1 === t ? (f.error(p.source), []) : (E.each(e, function (e, n) {
              E.each(t, function (e, t) {
                "string" == typeof t[n] && (-1 !== t[n].search(o) ? c(a, t) : "exact" === l.fullTextSearch && f.exactSearch(i, t[n]) ? c(r, t) : 1 == l.fullTextSearch && f.fuzzySearch(i, t[n]) && c(s, t));
              });
            }), E.merge(r, s), E.merge(a, r), a);
          }
        },
        exactSearch: function exactSearch(e, t) {
          return e = e.toLowerCase(), -1 < (t = t.toLowerCase()).indexOf(e);
        },
        fuzzySearch: function fuzzySearch(e, t) {
          var n = t.length,
              i = e.length;
          if ("string" != typeof e) return !1;
          if (e = e.toLowerCase(), t = t.toLowerCase(), n < i) return !1;
          if (i === n) return e === t;

          e: for (var o = 0, a = 0; o < i; o++) {
            for (var r = e.charCodeAt(o); a < n;) {
              if (t.charCodeAt(a++) === r) continue e;
            }

            return !1;
          }

          return !0;
        },
        parse: {
          response: function response(e, t) {
            var n = f.generateResults(e);
            f.verbose("Parsing server response", e), e !== j && t !== j && e[a.results] !== j && (f.addResults(n), f.inject.id(e[a.results]), f.write.cache(t, {
              html: n,
              results: e[a.results]
            }), f.save.results(e[a.results]));
          }
        },
        cancel: {
          query: function query() {
            f.can.useAPI() && h.api("abort");
          }
        },
        has: {
          minimumCharacters: function minimumCharacters() {
            return f.get.value().length >= l.minCharacters;
          },
          results: function results() {
            return 0 !== o.length && "" != o.html();
          }
        },
        clear: {
          cache: function cache(e) {
            var t = h.data(u.cache);
            e ? e && t && t[e] && (f.debug("Removing value from cache", e), delete t[e], h.data(u.cache, t)) : (f.debug("Clearing cache", e), h.removeData(u.cache));
          }
        },
        read: {
          cache: function cache(e) {
            var t = h.data(u.cache);
            return !!l.cache && (f.verbose("Checking cache for generated html for query", e), "object" == _typeof(t) && t[e] !== j && t[e]);
          }
        },
        create: {
          categoryResults: function categoryResults(e) {
            var n = {};
            return E.each(e, function (e, t) {
              t.category && (n[t.category] === j ? (f.verbose("Creating new category of results", t.category), n[t.category] = {
                name: t.category,
                results: [t]
              }) : n[t.category].results.push(t));
            }), n;
          },
          id: function id(e, t) {
            var n,
                i = e + 1;
            return t !== j ? (n = String.fromCharCode(97 + t) + i, f.verbose("Creating category result id", n)) : (n = i, f.verbose("Creating result id", n)), n;
          },
          results: function results() {
            0 === o.length && (o = E("<div />").addClass(m.results).appendTo(h));
          }
        },
        inject: {
          result: function result(e, t, n) {
            f.verbose("Injecting result into results");
            var i = n !== j ? o.children().eq(n).children(g.results).first().children(g.result).eq(t) : o.children(g.result).eq(t);
            f.verbose("Injecting results metadata", i), i.data(u.result, e);
          },
          id: function id(i) {
            f.debug("Injecting unique ids into results");
            var o = 0,
                a = 0;
            return "category" === l.type ? E.each(i, function (e, i) {
              a = 0, E.each(i.results, function (e, t) {
                var n = i.results[e];
                n.id === j && (n.id = f.create.id(a, o)), f.inject.result(n, a, o), a++;
              }), o++;
            }) : E.each(i, function (e, t) {
              var n = i[e];
              n.id === j && (n.id = f.create.id(a)), f.inject.result(n, a), a++;
            }), i;
          }
        },
        save: {
          results: function results(e) {
            f.verbose("Saving current search results to metadata", e), h.data(u.results, e);
          }
        },
        write: {
          cache: function cache(e, t) {
            var n = h.data(u.cache) !== j ? h.data(u.cache) : {};
            l.cache && (f.verbose("Writing generated html to cache", e, t), n[e] = t, h.data(u.cache, n));
          }
        },
        addResults: function addResults(e) {
          if (E.isFunction(l.onResultsAdd) && !1 === l.onResultsAdd.call(o, e)) return f.debug("onResultsAdd callback cancelled default action"), !1;
          e ? (o.html(e), f.refreshResults(), l.selectFirstResult && f.select.firstResult(), f.showResults()) : f.hideResults(function () {
            o.empty();
          });
        },
        showResults: function showResults(e) {
          e = E.isFunction(e) ? e : function () {}, x || !f.is.visible() && f.has.results() && (f.can.transition() ? (f.debug("Showing results with css animations"), o.transition({
            animation: l.transition + " in",
            debug: l.debug,
            verbose: l.verbose,
            duration: l.duration,
            onComplete: function onComplete() {
              e();
            },
            queue: !0
          })) : (f.debug("Showing results with javascript"), o.stop().fadeIn(l.duration, l.easing)), l.onResultsOpen.call(o));
        },
        hideResults: function hideResults(e) {
          e = E.isFunction(e) ? e : function () {}, f.is.visible() && (f.can.transition() ? (f.debug("Hiding results with css animations"), o.transition({
            animation: l.transition + " out",
            debug: l.debug,
            verbose: l.verbose,
            duration: l.duration,
            onComplete: function onComplete() {
              e();
            },
            queue: !0
          })) : (f.debug("Hiding results with javascript"), o.stop().fadeOut(l.duration, l.easing)), l.onResultsClose.call(o));
        },
        generateResults: function generateResults(e) {
          f.debug("Generating html from response", e);
          var t = l.templates[l.type],
              n = E.isPlainObject(e[a.results]) && !E.isEmptyObject(e[a.results]),
              i = E.isArray(e[a.results]) && 0 < e[a.results].length,
              o = "";
          return n || i ? (0 < l.maxResults && (n ? "standard" == l.type && f.error(p.maxResults) : e[a.results] = e[a.results].slice(0, l.maxResults)), E.isFunction(t) ? o = t(e, a) : f.error(p.noTemplate, !1)) : l.showNoResults && (o = f.displayMessage(p.noResults, "empty")), l.onResults.call(v, e), o;
        },
        displayMessage: function displayMessage(e, t) {
          return t = t || "standard", f.debug("Displaying message", e, t), f.addResults(l.templates.message(e, t)), l.templates.message(e, t);
        },
        setting: function setting(e, t) {
          if (E.isPlainObject(e)) E.extend(!0, l, e);else {
            if (t === j) return l[e];
            l[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (E.isPlainObject(e)) E.extend(!0, f, e);else {
            if (t === j) return f[e];
            f[e] = t;
          }
        },
        debug: function debug() {
          !l.silent && l.debug && (l.performance ? f.performance.log(arguments) : (f.debug = Function.prototype.bind.call(console.info, console, l.name + ":"), f.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !l.silent && l.verbose && l.debug && (l.performance ? f.performance.log(arguments) : (f.verbose = Function.prototype.bind.call(console.info, console, l.name + ":"), f.verbose.apply(console, arguments)));
        },
        error: function error() {
          l.silent || (f.error = Function.prototype.bind.call(console.error, console, l.name + ":"), f.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var t, n;
            l.performance && (n = (t = new Date().getTime()) - (T || t), T = t, S.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: v,
              "Execution Time": n
            })), clearTimeout(f.performance.timer), f.performance.timer = setTimeout(f.performance.display, 500);
          },
          display: function display() {
            var e = l.name + ":",
                n = 0;
            T = !1, clearTimeout(f.performance.timer), E.each(S, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", k && (e += " '" + k + "'"), 1 < w.length && (e += " (" + w.length + ")"), (console.group !== j || console.table !== j) && 0 < S.length && (console.groupCollapsed(e), console.table ? console.table(S) : E.each(S, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), S = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              a,
              n,
              r = s;
          return e = e || F, t = v || t, "string" == typeof i && r !== j && (i = i.split(/[\. ]/), o = i.length - 1, E.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (E.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== j) return a = r[n], !1;
              if (!E.isPlainObject(r[t]) || e == o) return r[t] !== j && (a = r[t]), !1;
              r = r[t];
            }
          })), E.isFunction(a) ? n = a.apply(t, e) : a !== j && (n = a), E.isArray(C) ? C.push(n) : C !== j ? C = [C, n] : n !== j && (C = n), a;
        }
      }, R ? (s === j && f.initialize(), f.invoke(A)) : (s !== j && s.invoke("destroy"), f.initialize());
    }), C !== j ? C : this;
  }, E.fn.search.settings = {
    name: "Search",
    namespace: "search",
    silent: !1,
    debug: !1,
    verbose: !1,
    performance: !0,
    type: "standard",
    minCharacters: 1,
    selectFirstResult: !1,
    apiSettings: !1,
    source: !1,
    searchOnFocus: !0,
    searchFields: ["title", "description"],
    displayField: "",
    fullTextSearch: "exact",
    automatic: !0,
    hideDelay: 0,
    searchDelay: 200,
    maxResults: 7,
    cache: !0,
    showNoResults: !0,
    transition: "scale",
    duration: 200,
    easing: "easeOutExpo",
    onSelect: !1,
    onResultsAdd: !1,
    onSearchQuery: function onSearchQuery(e) {},
    onResults: function onResults(e) {},
    onResultsOpen: function onResultsOpen() {},
    onResultsClose: function onResultsClose() {},
    className: {
      animating: "animating",
      active: "active",
      empty: "empty",
      focus: "focus",
      hidden: "hidden",
      loading: "loading",
      results: "results",
      pressed: "down"
    },
    error: {
      source: "Cannot search. No source used, and Semantic API module was not included",
      noResults: "Your search returned no results",
      logging: "Error in debug logging, exiting.",
      noEndpoint: "No search endpoint was specified",
      noTemplate: "A valid template name was not specified.",
      oldSearchSyntax: "searchFullText setting has been renamed fullTextSearch for consistency, please adjust your settings.",
      serverError: "There was an issue querying the server.",
      maxResults: "Results must be an array to use maxResults setting",
      method: "The method you called is not defined."
    },
    metadata: {
      cache: "cache",
      results: "results",
      result: "result"
    },
    regExp: {
      escape: /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
      beginsWith: "(?:s|^)"
    },
    fields: {
      categories: "results",
      categoryName: "name",
      categoryResults: "results",
      description: "description",
      image: "image",
      price: "price",
      results: "results",
      title: "title",
      url: "url",
      action: "action",
      actionText: "text",
      actionURL: "url"
    },
    selector: {
      prompt: ".prompt",
      searchButton: ".search.button",
      results: ".results",
      message: ".results > .message",
      category: ".category",
      result: ".result",
      title: ".title, .name"
    },
    templates: {
      escape: function escape(e) {
        var t = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#x27;",
          "`": "&#x60;"
        };
        return /[&<>"'`]/.test(e) ? e.replace(/[&<>"'`]/g, function (e) {
          return t[e];
        }) : e;
      },
      message: function message(e, t) {
        var n = "";
        return e !== j && t !== j && (n += '<div class="message ' + t + '">', n += "empty" == t ? '<div class="header">No Results</div class="header"><div class="description">' + e + '</div class="description">' : ' <div class="description">' + e + "</div>", n += "</div>"), n;
      },
      category: function category(e, n) {
        var i = "";
        E.fn.search.settings.templates.escape;
        return e[n.categoryResults] !== j && (E.each(e[n.categoryResults], function (e, t) {
          t[n.results] !== j && 0 < t.results.length && (i += '<div class="category">', t[n.categoryName] !== j && (i += '<div class="name">' + t[n.categoryName] + "</div>"), i += '<div class="results">', E.each(t.results, function (e, t) {
            t[n.url] ? i += '<a class="result" href="' + t[n.url] + '">' : i += '<a class="result">', t[n.image] !== j && (i += '<div class="image"> <img src="' + t[n.image] + '"></div>'), i += '<div class="content">', t[n.price] !== j && (i += '<div class="price">' + t[n.price] + "</div>"), t[n.title] !== j && (i += '<div class="title">' + t[n.title] + "</div>"), t[n.description] !== j && (i += '<div class="description">' + t[n.description] + "</div>"), i += "</div>", i += "</a>";
          }), i += "</div>", i += "</div>");
        }), e[n.action] && (i += '<a href="' + e[n.action][n.actionURL] + '" class="action">' + e[n.action][n.actionText] + "</a>"), i);
      },
      standard: function standard(e, n) {
        var i = "";
        return e[n.results] !== j && (E.each(e[n.results], function (e, t) {
          t[n.url] ? i += '<a class="result" href="' + t[n.url] + '">' : i += '<a class="result">', t[n.image] !== j && (i += '<div class="image"> <img src="' + t[n.image] + '"></div>'), i += '<div class="content">', t[n.price] !== j && (i += '<div class="price">' + t[n.price] + "</div>"), t[n.title] !== j && (i += '<div class="title">' + t[n.title] + "</div>"), t[n.description] !== j && (i += '<div class="description">' + t[n.description] + "</div>"), i += "</div>", i += "</a>";
        }), e[n.action] && (i += '<a href="' + e[n.action][n.actionURL] + '" class="action">' + e[n.action][n.actionText] + "</a>"), i);
      }
    }
  };
}(jQuery, window, document), function (D, P, M, z) {
  "use strict";

  P = void 0 !== P && P.Math == Math ? P : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), D.fn.sidebar = function (x) {
    var C,
        e = D(this),
        w = D(P),
        k = D(M),
        T = D("html"),
        S = D("head"),
        A = e.selector || "",
        R = new Date().getTime(),
        F = [],
        E = x,
        q = "string" == typeof E,
        O = [].slice.call(arguments, 1),
        j = P.requestAnimationFrame || P.mozRequestAnimationFrame || P.webkitRequestAnimationFrame || P.msRequestAnimationFrame || function (e) {
      setTimeout(e, 0);
    };

    return e.each(function () {
      var r,
          s,
          e,
          t,
          c,
          l,
          u = D.isPlainObject(x) ? D.extend(!0, {}, D.fn.sidebar.settings, x) : D.extend({}, D.fn.sidebar.settings),
          n = u.selector,
          a = u.className,
          i = u.namespace,
          o = u.regExp,
          d = u.error,
          f = "." + i,
          m = "module-" + i,
          g = D(this),
          p = D(u.context),
          h = g.children(n.sidebar),
          b = (p.children(n.fixed), p.children(n.pusher)),
          v = this,
          y = g.data(m);
      l = {
        initialize: function initialize() {
          l.debug("Initializing sidebar", x), l.create.id(), c = l.get.transitionEvent(), u.delaySetup ? j(l.setup.layout) : l.setup.layout(), j(function () {
            l.setup.cache();
          }), l.instantiate();
        },
        instantiate: function instantiate() {
          l.verbose("Storing instance of module", l), y = l, g.data(m, l);
        },
        create: {
          id: function id() {
            e = (Math.random().toString(16) + "000000000").substr(2, 8), s = "." + e, l.verbose("Creating unique id for element", e);
          }
        },
        destroy: function destroy() {
          l.verbose("Destroying previous module for", g), g.off(f).removeData(m), l.is.ios() && l.remove.ios(), p.off(s), w.off(s), k.off(s);
        },
        event: {
          clickaway: function clickaway(e) {
            var t = 0 < b.find(e.target).length || b.is(e.target),
                n = p.is(e.target);
            t && (l.verbose("User clicked on dimmed page"), l.hide()), n && (l.verbose("User clicked on dimmable context (scaled out page)"), l.hide());
          },
          touch: function touch(e) {},
          containScroll: function containScroll(e) {
            v.scrollTop <= 0 && (v.scrollTop = 1), v.scrollTop + v.offsetHeight >= v.scrollHeight && (v.scrollTop = v.scrollHeight - v.offsetHeight - 1);
          },
          scroll: function scroll(e) {
            0 === D(e.target).closest(n.sidebar).length && e.preventDefault();
          }
        },
        bind: {
          clickaway: function clickaway() {
            l.verbose("Adding clickaway events to context", p), u.closable && p.on("click" + s, l.event.clickaway).on("touchend" + s, l.event.clickaway);
          },
          scrollLock: function scrollLock() {
            u.scrollLock && (l.debug("Disabling page scroll"), w.on("DOMMouseScroll" + s, l.event.scroll)), l.verbose("Adding events to contain sidebar scroll"), k.on("touchmove" + s, l.event.touch), g.on("scroll" + f, l.event.containScroll);
          }
        },
        unbind: {
          clickaway: function clickaway() {
            l.verbose("Removing clickaway events from context", p), p.off(s);
          },
          scrollLock: function scrollLock() {
            l.verbose("Removing scroll lock from page"), k.off(s), w.off(s), g.off("scroll" + f);
          }
        },
        add: {
          inlineCSS: function inlineCSS() {
            var e,
                t = l.cache.width || g.outerWidth(),
                n = l.cache.height || g.outerHeight(),
                i = l.is.rtl(),
                o = l.get.direction(),
                a = {
              left: t,
              right: -t,
              top: n,
              bottom: -n
            };
            i && (l.verbose("RTL detected, flipping widths"), a.left = -t, a.right = t), e = "<style>", "left" === o || "right" === o ? (l.debug("Adding CSS rules for animation distance", t), e += " .ui.visible." + o + ".sidebar ~ .fixed, .ui.visible." + o + ".sidebar ~ .pusher {   -webkit-transform: translate3d(" + a[o] + "px, 0, 0);           transform: translate3d(" + a[o] + "px, 0, 0); }") : "top" !== o && "bottom" != o || (e += " .ui.visible." + o + ".sidebar ~ .fixed, .ui.visible." + o + ".sidebar ~ .pusher {   -webkit-transform: translate3d(0, " + a[o] + "px, 0);           transform: translate3d(0, " + a[o] + "px, 0); }"), l.is.ie() && ("left" === o || "right" === o ? (l.debug("Adding CSS rules for animation distance", t), e += " body.pushable > .ui.visible." + o + ".sidebar ~ .pusher:after {   -webkit-transform: translate3d(" + a[o] + "px, 0, 0);           transform: translate3d(" + a[o] + "px, 0, 0); }") : "top" !== o && "bottom" != o || (e += " body.pushable > .ui.visible." + o + ".sidebar ~ .pusher:after {   -webkit-transform: translate3d(0, " + a[o] + "px, 0);           transform: translate3d(0, " + a[o] + "px, 0); }"), e += " body.pushable > .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher:after, body.pushable > .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher:after {   -webkit-transform: translate3d(0px, 0, 0);           transform: translate3d(0px, 0, 0); }"), r = D(e += "</style>").appendTo(S), l.debug("Adding sizing css to head", r);
          }
        },
        refresh: function refresh() {
          l.verbose("Refreshing selector cache"), p = D(u.context), h = p.children(n.sidebar), b = p.children(n.pusher), p.children(n.fixed), l.clear.cache();
        },
        refreshSidebars: function refreshSidebars() {
          l.verbose("Refreshing other sidebars"), h = p.children(n.sidebar);
        },
        repaint: function repaint() {
          l.verbose("Forcing repaint event"), v.style.display = "none";
          v.offsetHeight;
          v.scrollTop = v.scrollTop, v.style.display = "";
        },
        setup: {
          cache: function cache() {
            l.cache = {
              width: g.outerWidth(),
              height: g.outerHeight(),
              rtl: "rtl" == g.css("direction")
            };
          },
          layout: function layout() {
            0 === p.children(n.pusher).length && (l.debug("Adding wrapper element for sidebar"), l.error(d.pusher), b = D('<div class="pusher" />'), p.children().not(n.omitted).not(h).wrapAll(b), l.refresh()), 0 !== g.nextAll(n.pusher).length && g.nextAll(n.pusher)[0] === b[0] || (l.debug("Moved sidebar to correct parent element"), l.error(d.movedSidebar, v), g.detach().prependTo(p), l.refresh()), l.clear.cache(), l.set.pushable(), l.set.direction();
          }
        },
        attachEvents: function attachEvents(e, t) {
          var n = D(e);
          t = D.isFunction(l[t]) ? l[t] : l.toggle, 0 < n.length ? (l.debug("Attaching sidebar events to element", e, t), n.on("click" + f, t)) : l.error(d.notFound, e);
        },
        show: function show(e) {
          if (e = D.isFunction(e) ? e : function () {}, l.is.hidden()) {
            if (l.refreshSidebars(), u.overlay && (l.error(d.overlay), u.transition = "overlay"), l.refresh(), l.othersActive()) if (l.debug("Other sidebars currently visible"), u.exclusive) {
              if ("overlay" != u.transition) return void l.hideOthers(l.show);
              l.hideOthers();
            } else u.transition = "overlay";
            l.pushPage(function () {
              e.call(v), u.onShow.call(v);
            }), u.onChange.call(v), u.onVisible.call(v);
          } else l.debug("Sidebar is already visible");
        },
        hide: function hide(e) {
          e = D.isFunction(e) ? e : function () {}, (l.is.visible() || l.is.animating()) && (l.debug("Hiding sidebar", e), l.refreshSidebars(), l.pullPage(function () {
            e.call(v), u.onHidden.call(v);
          }), u.onChange.call(v), u.onHide.call(v));
        },
        othersAnimating: function othersAnimating() {
          return 0 < h.not(g).filter("." + a.animating).length;
        },
        othersVisible: function othersVisible() {
          return 0 < h.not(g).filter("." + a.visible).length;
        },
        othersActive: function othersActive() {
          return l.othersVisible() || l.othersAnimating();
        },
        hideOthers: function hideOthers(e) {
          var t = h.not(g).filter("." + a.visible),
              n = t.length,
              i = 0;
          e = e || function () {}, t.sidebar("hide", function () {
            ++i == n && e();
          });
        },
        toggle: function toggle() {
          l.verbose("Determining toggled direction"), l.is.hidden() ? l.show() : l.hide();
        },
        pushPage: function pushPage(t) {
          var e,
              n,
              _i,
              o = l.get.transition(),
              a = "overlay" === o || l.othersActive() ? g : b;

          t = D.isFunction(t) ? t : function () {}, "scale down" == u.transition && l.scrollToTop(), l.set.transition(o), l.repaint(), e = function e() {
            l.bind.clickaway(), l.add.inlineCSS(), l.set.animating(), l.set.visible();
          }, n = function n() {
            l.set.dimmed();
          }, _i = function i(e) {
            e.target == a[0] && (a.off(c + s, _i), l.remove.animating(), l.bind.scrollLock(), t.call(v));
          }, a.off(c + s), a.on(c + s, _i), j(e), u.dimPage && !l.othersVisible() && j(n);
        },
        pullPage: function pullPage(t) {
          var e,
              _n,
              i = l.get.transition(),
              o = "overlay" == i || l.othersActive() ? g : b;

          t = D.isFunction(t) ? t : function () {}, l.verbose("Removing context push state", l.get.direction()), l.unbind.clickaway(), l.unbind.scrollLock(), e = function e() {
            l.set.transition(i), l.set.animating(), l.remove.visible(), u.dimPage && !l.othersVisible() && b.removeClass(a.dimmed);
          }, _n = function n(e) {
            e.target == o[0] && (o.off(c + s, _n), l.remove.animating(), l.remove.transition(), l.remove.inlineCSS(), ("scale down" == i || u.returnScroll && l.is.mobile()) && l.scrollBack(), t.call(v));
          }, o.off(c + s), o.on(c + s, _n), j(e);
        },
        scrollToTop: function scrollToTop() {
          l.verbose("Scrolling to top of page to avoid animation issues"), t = D(P).scrollTop(), g.scrollTop(0), P.scrollTo(0, 0);
        },
        scrollBack: function scrollBack() {
          l.verbose("Scrolling back to original page position"), P.scrollTo(0, t);
        },
        clear: {
          cache: function cache() {
            l.verbose("Clearing cached dimensions"), l.cache = {};
          }
        },
        set: {
          ios: function ios() {
            T.addClass(a.ios);
          },
          pushed: function pushed() {
            p.addClass(a.pushed);
          },
          pushable: function pushable() {
            p.addClass(a.pushable);
          },
          dimmed: function dimmed() {
            b.addClass(a.dimmed);
          },
          active: function active() {
            g.addClass(a.active);
          },
          animating: function animating() {
            g.addClass(a.animating);
          },
          transition: function transition(e) {
            e = e || l.get.transition(), g.addClass(e);
          },
          direction: function direction(e) {
            e = e || l.get.direction(), g.addClass(a[e]);
          },
          visible: function visible() {
            g.addClass(a.visible);
          },
          overlay: function overlay() {
            g.addClass(a.overlay);
          }
        },
        remove: {
          inlineCSS: function inlineCSS() {
            l.debug("Removing inline css styles", r), r && 0 < r.length && r.remove();
          },
          ios: function ios() {
            T.removeClass(a.ios);
          },
          pushed: function pushed() {
            p.removeClass(a.pushed);
          },
          pushable: function pushable() {
            p.removeClass(a.pushable);
          },
          active: function active() {
            g.removeClass(a.active);
          },
          animating: function animating() {
            g.removeClass(a.animating);
          },
          transition: function transition(e) {
            e = e || l.get.transition(), g.removeClass(e);
          },
          direction: function direction(e) {
            e = e || l.get.direction(), g.removeClass(a[e]);
          },
          visible: function visible() {
            g.removeClass(a.visible);
          },
          overlay: function overlay() {
            g.removeClass(a.overlay);
          }
        },
        get: {
          direction: function direction() {
            return g.hasClass(a.top) ? a.top : g.hasClass(a.right) ? a.right : g.hasClass(a.bottom) ? a.bottom : a.left;
          },
          transition: function transition() {
            var e,
                t = l.get.direction();
            return e = l.is.mobile() ? "auto" == u.mobileTransition ? u.defaultTransition.mobile[t] : u.mobileTransition : "auto" == u.transition ? u.defaultTransition.computer[t] : u.transition, l.verbose("Determined transition", e), e;
          },
          transitionEvent: function transitionEvent() {
            var e,
                t = M.createElement("element"),
                n = {
              transition: "transitionend",
              OTransition: "oTransitionEnd",
              MozTransition: "transitionend",
              WebkitTransition: "webkitTransitionEnd"
            };

            for (e in n) {
              if (t.style[e] !== z) return n[e];
            }
          }
        },
        is: {
          ie: function ie() {
            return !P.ActiveXObject && "ActiveXObject" in P || "ActiveXObject" in P;
          },
          ios: function ios() {
            var e = navigator.userAgent,
                t = e.match(o.ios),
                n = e.match(o.mobileChrome);
            return !(!t || n) && (l.verbose("Browser was found to be iOS", e), !0);
          },
          mobile: function mobile() {
            var e = navigator.userAgent;
            return e.match(o.mobile) ? (l.verbose("Browser was found to be mobile", e), !0) : (l.verbose("Browser is not mobile, using regular transition", e), !1);
          },
          hidden: function hidden() {
            return !l.is.visible();
          },
          visible: function visible() {
            return g.hasClass(a.visible);
          },
          open: function open() {
            return l.is.visible();
          },
          closed: function closed() {
            return l.is.hidden();
          },
          vertical: function vertical() {
            return g.hasClass(a.top);
          },
          animating: function animating() {
            return p.hasClass(a.animating);
          },
          rtl: function rtl() {
            return l.cache.rtl === z && (l.cache.rtl = "rtl" == g.css("direction")), l.cache.rtl;
          }
        },
        setting: function setting(e, t) {
          if (l.debug("Changing setting", e, t), D.isPlainObject(e)) D.extend(!0, u, e);else {
            if (t === z) return u[e];
            D.isPlainObject(u[e]) ? D.extend(!0, u[e], t) : u[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (D.isPlainObject(e)) D.extend(!0, l, e);else {
            if (t === z) return l[e];
            l[e] = t;
          }
        },
        debug: function debug() {
          !u.silent && u.debug && (u.performance ? l.performance.log(arguments) : (l.debug = Function.prototype.bind.call(console.info, console, u.name + ":"), l.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !u.silent && u.verbose && u.debug && (u.performance ? l.performance.log(arguments) : (l.verbose = Function.prototype.bind.call(console.info, console, u.name + ":"), l.verbose.apply(console, arguments)));
        },
        error: function error() {
          u.silent || (l.error = Function.prototype.bind.call(console.error, console, u.name + ":"), l.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var t, n;
            u.performance && (n = (t = new Date().getTime()) - (R || t), R = t, F.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: v,
              "Execution Time": n
            })), clearTimeout(l.performance.timer), l.performance.timer = setTimeout(l.performance.display, 500);
          },
          display: function display() {
            var e = u.name + ":",
                n = 0;
            R = !1, clearTimeout(l.performance.timer), D.each(F, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", A && (e += " '" + A + "'"), (console.group !== z || console.table !== z) && 0 < F.length && (console.groupCollapsed(e), console.table ? console.table(F) : D.each(F, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), F = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              a,
              n,
              r = y;
          return e = e || O, t = v || t, "string" == typeof i && r !== z && (i = i.split(/[\. ]/), o = i.length - 1, D.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (D.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== z) return a = r[n], !1;
              if (!D.isPlainObject(r[t]) || e == o) return r[t] !== z ? a = r[t] : l.error(d.method, i), !1;
              r = r[t];
            }
          })), D.isFunction(a) ? n = a.apply(t, e) : a !== z && (n = a), D.isArray(C) ? C.push(n) : C !== z ? C = [C, n] : n !== z && (C = n), a;
        }
      }, q ? (y === z && l.initialize(), l.invoke(E)) : (y !== z && l.invoke("destroy"), l.initialize());
    }), C !== z ? C : this;
  }, D.fn.sidebar.settings = {
    name: "Sidebar",
    namespace: "sidebar",
    silent: !1,
    debug: !1,
    verbose: !1,
    performance: !0,
    transition: "auto",
    mobileTransition: "auto",
    defaultTransition: {
      computer: {
        left: "uncover",
        right: "uncover",
        top: "overlay",
        bottom: "overlay"
      },
      mobile: {
        left: "uncover",
        right: "uncover",
        top: "overlay",
        bottom: "overlay"
      }
    },
    context: "body",
    exclusive: !1,
    closable: !0,
    dimPage: !0,
    scrollLock: !1,
    returnScroll: !1,
    delaySetup: !1,
    duration: 500,
    onChange: function onChange() {},
    onShow: function onShow() {},
    onHide: function onHide() {},
    onHidden: function onHidden() {},
    onVisible: function onVisible() {},
    className: {
      active: "active",
      animating: "animating",
      dimmed: "dimmed",
      ios: "ios",
      pushable: "pushable",
      pushed: "pushed",
      right: "right",
      top: "top",
      left: "left",
      bottom: "bottom",
      visible: "visible"
    },
    selector: {
      fixed: ".fixed",
      omitted: "script, link, style, .ui.modal, .ui.dimmer, .ui.nag, .ui.fixed",
      pusher: ".pusher",
      sidebar: ".ui.sidebar"
    },
    regExp: {
      ios: /(iPad|iPhone|iPod)/g,
      mobileChrome: /(CriOS)/g,
      mobile: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g
    },
    error: {
      method: "The method you called is not defined.",
      pusher: "Had to add pusher element. For optimal performance make sure body content is inside a pusher element",
      movedSidebar: "Had to move sidebar. For optimal performance make sure sidebar and pusher are direct children of your body tag",
      overlay: "The overlay setting is no longer supported, use animation: overlay",
      notFound: "There were no elements that matched the specified selector"
    }
  };
}(jQuery, window, document), function (F, E, e, q) {
  "use strict";

  E = void 0 !== E && E.Math == Math ? E : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
  F.api = F.fn.api = function (x) {
    var C,
        e = F.isFunction(this) ? F(E) : F(this),
        w = e.selector || "",
        k = new Date().getTime(),
        T = [],
        S = x,
        A = "string" == typeof S,
        R = [].slice.call(arguments, 1);
    return e.each(function () {
      var a,
          r,
          n,
          e,
          s,
          c,
          l = F.isPlainObject(x) ? F.extend(!0, {}, F.fn.api.settings, x) : F.extend({}, F.fn.api.settings),
          t = l.namespace,
          i = l.metadata,
          o = l.selector,
          u = l.error,
          d = l.className,
          f = "." + t,
          m = "module-" + t,
          g = F(this),
          p = g.closest(o.form),
          h = l.stateContext ? F(l.stateContext) : g,
          b = this,
          v = h[0],
          y = g.data(m);
      c = {
        initialize: function initialize() {
          A || c.bind.events(), c.instantiate();
        },
        instantiate: function instantiate() {
          c.verbose("Storing instance of module", c), y = c, g.data(m, y);
        },
        destroy: function destroy() {
          c.verbose("Destroying previous module for", b), g.removeData(m).off(f);
        },
        bind: {
          events: function events() {
            var e = c.get.event();
            e ? (c.verbose("Attaching API events to element", e), g.on(e + f, c.event.trigger)) : "now" == l.on && (c.debug("Querying API endpoint immediately"), c.query());
          }
        },
        decode: {
          json: function json(e) {
            if (e !== q && "string" == typeof e) try {
              e = JSON.parse(e);
            } catch (e) {}
            return e;
          }
        },
        read: {
          cachedResponse: function cachedResponse(e) {
            var t;
            if (E.Storage !== q) return t = sessionStorage.getItem(e), c.debug("Using cached response", e, t), t = c.decode.json(t);
            c.error(u.noStorage);
          }
        },
        write: {
          cachedResponse: function cachedResponse(e, t) {
            t && "" === t ? c.debug("Response empty, not caching", t) : E.Storage !== q ? (F.isPlainObject(t) && (t = JSON.stringify(t)), sessionStorage.setItem(e, t), c.verbose("Storing cached response for url", e, t)) : c.error(u.noStorage);
          }
        },
        query: function query() {
          if (c.is.disabled()) c.debug("Element is disabled API request aborted");else {
            if (c.is.loading()) {
              if (!l.interruptRequests) return void c.debug("Cancelling request, previous request is still pending");
              c.debug("Interrupting previous request"), c.abort();
            }

            if (l.defaultData && F.extend(!0, l.urlData, c.get.defaultData()), l.serializeForm && (l.data = c.add.formData(l.data)), !1 === (r = c.get.settings())) return c.cancelled = !0, void c.error(u.beforeSend);

            if (c.cancelled = !1, (n = c.get.templatedURL()) || c.is.mocked()) {
              if ((n = c.add.urlData(n)) || c.is.mocked()) {
                if (r.url = l.base + n, a = F.extend(!0, {}, l, {
                  type: l.method || l.type,
                  data: e,
                  url: l.base + n,
                  beforeSend: l.beforeXHR,
                  success: function success() {},
                  failure: function failure() {},
                  complete: function complete() {}
                }), c.debug("Querying URL", a.url), c.verbose("Using AJAX settings", a), "local" === l.cache && c.read.cachedResponse(n)) return c.debug("Response returned from local cache"), c.request = c.create.request(), void c.request.resolveWith(v, [c.read.cachedResponse(n)]);
                l.throttle ? l.throttleFirstRequest || c.timer ? (c.debug("Throttling request", l.throttle), clearTimeout(c.timer), c.timer = setTimeout(function () {
                  c.timer && delete c.timer, c.debug("Sending throttled request", e, a.method), c.send.request();
                }, l.throttle)) : (c.debug("Sending request", e, a.method), c.send.request(), c.timer = setTimeout(function () {}, l.throttle)) : (c.debug("Sending request", e, a.method), c.send.request());
              }
            } else c.error(u.missingURL);
          }
        },
        should: {
          removeError: function removeError() {
            return !0 === l.hideError || "auto" === l.hideError && !c.is.form();
          }
        },
        is: {
          disabled: function disabled() {
            return 0 < g.filter(o.disabled).length;
          },
          expectingJSON: function expectingJSON() {
            return "json" === l.dataType || "jsonp" === l.dataType;
          },
          form: function form() {
            return g.is("form") || h.is("form");
          },
          mocked: function mocked() {
            return l.mockResponse || l.mockResponseAsync || l.response || l.responseAsync;
          },
          input: function input() {
            return g.is("input");
          },
          loading: function loading() {
            return !!c.request && "pending" == c.request.state();
          },
          abortedRequest: function abortedRequest(e) {
            return e && e.readyState !== q && 0 === e.readyState ? (c.verbose("XHR request determined to be aborted"), !0) : (c.verbose("XHR request was not aborted"), !1);
          },
          validResponse: function validResponse(e) {
            return c.is.expectingJSON() && F.isFunction(l.successTest) ? (c.debug("Checking JSON returned success", l.successTest, e), l.successTest(e) ? (c.debug("Response passed success test", e), !0) : (c.debug("Response failed success test", e), !1)) : (c.verbose("Response is not JSON, skipping validation", l.successTest, e), !0);
          }
        },
        was: {
          cancelled: function cancelled() {
            return c.cancelled || !1;
          },
          succesful: function succesful() {
            return c.request && "resolved" == c.request.state();
          },
          failure: function failure() {
            return c.request && "rejected" == c.request.state();
          },
          complete: function complete() {
            return c.request && ("resolved" == c.request.state() || "rejected" == c.request.state());
          }
        },
        add: {
          urlData: function urlData(o, a) {
            var e, t;
            return o && (e = o.match(l.regExp.required), t = o.match(l.regExp.optional), a = a || l.urlData, e && (c.debug("Looking for required URL variables", e), F.each(e, function (e, t) {
              var n = -1 !== t.indexOf("$") ? t.substr(2, t.length - 3) : t.substr(1, t.length - 2),
                  i = F.isPlainObject(a) && a[n] !== q ? a[n] : g.data(n) !== q ? g.data(n) : h.data(n) !== q ? h.data(n) : a[n];
              if (i === q) return c.error(u.requiredParameter, n, o), o = !1;
              c.verbose("Found required variable", n, i), i = l.encodeParameters ? c.get.urlEncodedValue(i) : i, o = o.replace(t, i);
            })), t && (c.debug("Looking for optional URL variables", e), F.each(t, function (e, t) {
              var n = -1 !== t.indexOf("$") ? t.substr(3, t.length - 4) : t.substr(2, t.length - 3),
                  i = F.isPlainObject(a) && a[n] !== q ? a[n] : g.data(n) !== q ? g.data(n) : h.data(n) !== q ? h.data(n) : a[n];
              o = i !== q ? (c.verbose("Optional variable Found", n, i), o.replace(t, i)) : (c.verbose("Optional variable not found", n), -1 !== o.indexOf("/" + t) ? o.replace("/" + t, "") : o.replace(t, ""));
            }))), o;
          },
          formData: function formData(e) {
            var t = F.fn.serializeObject !== q,
                n = t ? p.serializeObject() : p.serialize();
            return e = e || l.data, e = F.isPlainObject(e) ? t ? (c.debug("Extending existing data with form data", e, n), F.extend(!0, {}, e, n)) : (c.error(u.missingSerialize), c.debug("Cant extend data. Replacing data with form data", e, n), n) : (c.debug("Adding form data", n), n);
          }
        },
        send: {
          request: function request() {
            c.set.loading(), c.request = c.create.request(), c.is.mocked() ? c.mockedXHR = c.create.mockedXHR() : c.xhr = c.create.xhr(), l.onRequest.call(v, c.request, c.xhr);
          }
        },
        event: {
          trigger: function trigger(e) {
            c.query(), "submit" != e.type && "click" != e.type || e.preventDefault();
          },
          xhr: {
            always: function always() {},
            done: function done(e, t, n) {
              var i = this,
                  o = new Date().getTime() - s,
                  a = l.loadingDuration - o,
                  r = !!F.isFunction(l.onResponse) && (c.is.expectingJSON() ? l.onResponse.call(i, F.extend(!0, {}, e)) : l.onResponse.call(i, e));
              a = 0 < a ? a : 0, r && (c.debug("Modified API response in onResponse callback", l.onResponse, r, e), e = r), 0 < a && c.debug("Response completed early delaying state change by", a), setTimeout(function () {
                c.is.validResponse(e) ? c.request.resolveWith(i, [e, n]) : c.request.rejectWith(i, [n, "invalid"]);
              }, a);
            },
            fail: function fail(e, t, n) {
              var i = this,
                  o = new Date().getTime() - s,
                  a = l.loadingDuration - o;
              0 < (a = 0 < a ? a : 0) && c.debug("Response completed early delaying state change by", a), setTimeout(function () {
                c.is.abortedRequest(e) ? c.request.rejectWith(i, [e, "aborted", n]) : c.request.rejectWith(i, [e, "error", t, n]);
              }, a);
            }
          },
          request: {
            done: function done(e, t) {
              c.debug("Successful API Response", e), "local" === l.cache && n && (c.write.cachedResponse(n, e), c.debug("Saving server response locally", c.cache)), l.onSuccess.call(v, e, g, t);
            },
            complete: function complete(e, t) {
              var n, i;
              c.was.succesful() ? (i = e, n = t) : (n = e, i = c.get.responseFromXHR(n)), c.remove.loading(), l.onComplete.call(v, i, g, n);
            },
            fail: function fail(e, t, n) {
              var i = c.get.responseFromXHR(e),
                  o = c.get.errorFromRequest(i, t, n);
              if ("aborted" == t) return c.debug("XHR Aborted (Most likely caused by page navigation or CORS Policy)", t, n), l.onAbort.call(v, t, g, e), !0;
              "invalid" == t ? c.debug("JSON did not pass success test. A server-side error has most likely occurred", i) : "error" == t && e !== q && (c.debug("XHR produced a server error", t, n), 200 != e.status && n !== q && "" !== n && c.error(u.statusMessage + n, a.url), l.onError.call(v, o, g, e)), l.errorDuration && "aborted" !== t && (c.debug("Adding error state"), c.set.error(), c.should.removeError() && setTimeout(c.remove.error, l.errorDuration)), c.debug("API Request failed", o, e), l.onFailure.call(v, i, g, e);
            }
          }
        },
        create: {
          request: function request() {
            return F.Deferred().always(c.event.request.complete).done(c.event.request.done).fail(c.event.request.fail);
          },
          mockedXHR: function mockedXHR() {
            var e,
                t,
                n,
                i = l.mockResponse || l.response,
                o = l.mockResponseAsync || l.responseAsync;
            return n = F.Deferred().always(c.event.xhr.complete).done(c.event.xhr.done).fail(c.event.xhr.fail), i ? (t = F.isFunction(i) ? (c.debug("Using specified synchronous callback", i), i.call(v, r)) : (c.debug("Using settings specified response", i), i), n.resolveWith(v, [t, !1, {
              responseText: t
            }])) : F.isFunction(o) && (e = function e(_e) {
              c.debug("Async callback returned response", _e), _e ? n.resolveWith(v, [_e, !1, {
                responseText: _e
              }]) : n.rejectWith(v, [{
                responseText: _e
              }, !1, !1]);
            }, c.debug("Using specified async response callback", o), o.call(v, r, e)), n;
          },
          xhr: function xhr() {
            var e;
            return e = F.ajax(a).always(c.event.xhr.always).done(c.event.xhr.done).fail(c.event.xhr.fail), c.verbose("Created server request", e, a), e;
          }
        },
        set: {
          error: function error() {
            c.verbose("Adding error state to element", h), h.addClass(d.error);
          },
          loading: function loading() {
            c.verbose("Adding loading state to element", h), h.addClass(d.loading), s = new Date().getTime();
          }
        },
        remove: {
          error: function error() {
            c.verbose("Removing error state from element", h), h.removeClass(d.error);
          },
          loading: function loading() {
            c.verbose("Removing loading state from element", h), h.removeClass(d.loading);
          }
        },
        get: {
          responseFromXHR: function responseFromXHR(e) {
            return !!F.isPlainObject(e) && (c.is.expectingJSON() ? c.decode.json(e.responseText) : e.responseText);
          },
          errorFromRequest: function errorFromRequest(e, t, n) {
            return F.isPlainObject(e) && e.error !== q ? e.error : l.error[t] !== q ? l.error[t] : n;
          },
          request: function request() {
            return c.request || !1;
          },
          xhr: function xhr() {
            return c.xhr || !1;
          },
          settings: function settings() {
            var e;
            return (e = l.beforeSend.call(v, l)) && (e.success !== q && (c.debug("Legacy success callback detected", e), c.error(u.legacyParameters, e.success), e.onSuccess = e.success), e.failure !== q && (c.debug("Legacy failure callback detected", e), c.error(u.legacyParameters, e.failure), e.onFailure = e.failure), e.complete !== q && (c.debug("Legacy complete callback detected", e), c.error(u.legacyParameters, e.complete), e.onComplete = e.complete)), e === q && c.error(u.noReturnedValue), !1 === e ? e : e !== q ? F.extend(!0, {}, e) : F.extend(!0, {}, l);
          },
          urlEncodedValue: function urlEncodedValue(e) {
            var t = E.decodeURIComponent(e),
                n = E.encodeURIComponent(e);
            return t !== e ? (c.debug("URL value is already encoded, avoiding double encoding", e), e) : (c.verbose("Encoding value using encodeURIComponent", e, n), n);
          },
          defaultData: function defaultData() {
            var e = {};
            return F.isWindow(b) || (c.is.input() ? e.value = g.val() : c.is.form() || (e.text = g.text())), e;
          },
          event: function event() {
            return F.isWindow(b) || "now" == l.on ? (c.debug("API called without element, no events attached"), !1) : "auto" == l.on ? g.is("input") ? b.oninput !== q ? "input" : b.onpropertychange !== q ? "propertychange" : "keyup" : g.is("form") ? "submit" : "click" : l.on;
          },
          templatedURL: function templatedURL(e) {
            if (e = e || g.data(i.action) || l.action || !1, n = g.data(i.url) || l.url || !1) return c.debug("Using specified url", n), n;

            if (e) {
              if (c.debug("Looking up url for action", e, l.api), l.api[e] === q && !c.is.mocked()) return void c.error(u.missingAction, l.action, l.api);
              n = l.api[e];
            } else c.is.form() && (n = g.attr("action") || h.attr("action") || !1, c.debug("No url or action specified, defaulting to form action", n));

            return n;
          }
        },
        abort: function abort() {
          var e = c.get.xhr();
          e && "resolved" !== e.state() && (c.debug("Cancelling API request"), e.abort());
        },
        reset: function reset() {
          c.remove.error(), c.remove.loading();
        },
        setting: function setting(e, t) {
          if (c.debug("Changing setting", e, t), F.isPlainObject(e)) F.extend(!0, l, e);else {
            if (t === q) return l[e];
            F.isPlainObject(l[e]) ? F.extend(!0, l[e], t) : l[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (F.isPlainObject(e)) F.extend(!0, c, e);else {
            if (t === q) return c[e];
            c[e] = t;
          }
        },
        debug: function debug() {
          !l.silent && l.debug && (l.performance ? c.performance.log(arguments) : (c.debug = Function.prototype.bind.call(console.info, console, l.name + ":"), c.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !l.silent && l.verbose && l.debug && (l.performance ? c.performance.log(arguments) : (c.verbose = Function.prototype.bind.call(console.info, console, l.name + ":"), c.verbose.apply(console, arguments)));
        },
        error: function error() {
          l.silent || (c.error = Function.prototype.bind.call(console.error, console, l.name + ":"), c.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var t, n;
            l.performance && (n = (t = new Date().getTime()) - (k || t), k = t, T.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              "Execution Time": n
            })), clearTimeout(c.performance.timer), c.performance.timer = setTimeout(c.performance.display, 500);
          },
          display: function display() {
            var e = l.name + ":",
                n = 0;
            k = !1, clearTimeout(c.performance.timer), F.each(T, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", w && (e += " '" + w + "'"), (console.group !== q || console.table !== q) && 0 < T.length && (console.groupCollapsed(e), console.table ? console.table(T) : F.each(T, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), T = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              a,
              n,
              r = y;
          return e = e || R, t = b || t, "string" == typeof i && r !== q && (i = i.split(/[\. ]/), o = i.length - 1, F.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (F.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== q) return a = r[n], !1;
              if (!F.isPlainObject(r[t]) || e == o) return r[t] !== q ? a = r[t] : c.error(u.method, i), !1;
              r = r[t];
            }
          })), F.isFunction(a) ? n = a.apply(t, e) : a !== q && (n = a), F.isArray(C) ? C.push(n) : C !== q ? C = [C, n] : n !== q && (C = n), a;
        }
      }, A ? (y === q && c.initialize(), c.invoke(S)) : (y !== q && y.invoke("destroy"), c.initialize());
    }), C !== q ? C : this;
  }, F.api.settings = {
    name: "API",
    namespace: "api",
    debug: !1,
    verbose: !1,
    performance: !0,
    api: {},
    cache: !0,
    interruptRequests: !0,
    on: "auto",
    stateContext: !1,
    loadingDuration: 0,
    hideError: "auto",
    errorDuration: 2e3,
    encodeParameters: !0,
    action: !1,
    url: !1,
    base: "",
    urlData: {},
    defaultData: !0,
    serializeForm: !1,
    throttle: 0,
    throttleFirstRequest: !0,
    method: "get",
    data: {},
    dataType: "json",
    mockResponse: !1,
    mockResponseAsync: !1,
    response: !1,
    responseAsync: !1,
    beforeSend: function beforeSend(e) {
      return e;
    },
    beforeXHR: function beforeXHR(e) {},
    onRequest: function onRequest(e, t) {},
    onResponse: !1,
    onSuccess: function onSuccess(e, t) {},
    onComplete: function onComplete(e, t) {},
    onFailure: function onFailure(e, t) {},
    onError: function onError(e, t) {},
    onAbort: function onAbort(e, t) {},
    successTest: !1,
    error: {
      beforeSend: "The before send function has aborted the request",
      error: "There was an error with your request",
      exitConditions: "API Request Aborted. Exit conditions met",
      JSONParse: "JSON could not be parsed during error handling",
      legacyParameters: "You are using legacy API success callback names",
      method: "The method you called is not defined",
      missingAction: "API action used but no url was defined",
      missingSerialize: "jquery-serialize-object is required to add form data to an existing data object",
      missingURL: "No URL specified for api event",
      noReturnedValue: "The beforeSend callback must return a settings object, beforeSend ignored.",
      noStorage: "Caching responses locally requires session storage",
      parseError: "There was an error parsing your request",
      requiredParameter: "Missing a required URL parameter: ",
      statusMessage: "Server gave an error: ",
      timeout: "Your request timed out"
    },
    regExp: {
      required: /\{\$*[A-z0-9]+\}/g,
      optional: /\{\/\$*[A-z0-9]+\}/g
    },
    className: {
      loading: "loading",
      error: "error"
    },
    selector: {
      disabled: ".disabled",
      form: "form"
    },
    metadata: {
      action: "action",
      url: "url"
    }
  };
}(jQuery, window, document), function (C, e, w, k) {
  "use strict";

  e = void 0 !== e && e.Math == Math ? e : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), C.fn.transition = function () {
    var l,
        r = C(this),
        g = r.selector || "",
        p = new Date().getTime(),
        h = [],
        b = arguments,
        v = b[0],
        y = [].slice.call(arguments, 1),
        x = "string" == typeof v;
    e.requestAnimationFrame || e.mozRequestAnimationFrame || e.webkitRequestAnimationFrame || e.msRequestAnimationFrame;
    return r.each(function (i) {
      var u,
          s,
          t,
          d,
          n,
          o,
          e,
          a,
          f,
          m = C(this),
          c = this;
      (f = {
        initialize: function initialize() {
          u = f.get.settings.apply(c, b), d = u.className, t = u.error, n = u.metadata, a = "." + u.namespace, e = "module-" + u.namespace, s = m.data(e) || f, o = f.get.animationEndEvent(), x && (x = f.invoke(v)), !1 === x && (f.verbose("Converted arguments into settings object", u), u.interval ? f.delay(u.animate) : f.animate(), f.instantiate());
        },
        instantiate: function instantiate() {
          f.verbose("Storing instance of module", f), s = f, m.data(e, s);
        },
        destroy: function destroy() {
          f.verbose("Destroying previous module for", c), m.removeData(e);
        },
        refresh: function refresh() {
          f.verbose("Refreshing display type on next animation"), delete f.displayType;
        },
        forceRepaint: function forceRepaint() {
          f.verbose("Forcing element repaint");
          var e = m.parent(),
              t = m.next();
          0 === t.length ? m.detach().appendTo(e) : m.detach().insertBefore(t);
        },
        repaint: function repaint() {
          f.verbose("Repainting element");
          c.offsetWidth;
        },
        delay: function delay(e) {
          var t,
              n = f.get.animationDirection();
          n || (n = f.can.transition() ? f.get.direction() : "static"), e = e !== k ? e : u.interval, t = "auto" == u.reverse && n == d.outward || 1 == u.reverse ? (r.length - i) * u.interval : i * u.interval, f.debug("Delaying animation by", t), setTimeout(f.animate, t);
        },
        animate: function animate(e) {
          if (u = e || u, !f.is.supported()) return f.error(t.support), !1;

          if (f.debug("Preparing animation", u.animation), f.is.animating()) {
            if (u.queue) return !u.allowRepeats && f.has.direction() && f.is.occurring() && !0 !== f.queuing ? f.debug("Animation is currently occurring, preventing queueing same animation", u.animation) : f.queue(u.animation), !1;
            if (!u.allowRepeats && f.is.occurring()) return f.debug("Animation is already occurring, will not execute repeated animation", u.animation), !1;
            f.debug("New animation started, completing previous early", u.animation), s.complete();
          }

          f.can.animate() ? f.set.animating(u.animation) : f.error(t.noAnimation, u.animation, c);
        },
        reset: function reset() {
          f.debug("Resetting animation to beginning conditions"), f.remove.animationCallbacks(), f.restore.conditions(), f.remove.animating();
        },
        queue: function queue(e) {
          f.debug("Queueing animation of", e), f.queuing = !0, m.one(o + ".queue" + a, function () {
            f.queuing = !1, f.repaint(), f.animate.apply(this, u);
          });
        },
        complete: function complete(e) {
          f.debug("Animation complete", u.animation), f.remove.completeCallback(), f.remove.failSafe(), f.is.looping() || (f.is.outward() ? (f.verbose("Animation is outward, hiding element"), f.restore.conditions(), f.hide()) : f.is.inward() ? (f.verbose("Animation is outward, showing element"), f.restore.conditions(), f.show()) : (f.verbose("Static animation completed"), f.restore.conditions(), u.onComplete.call(c)));
        },
        force: {
          visible: function visible() {
            var e = m.attr("style"),
                t = f.get.userStyle(),
                n = f.get.displayType(),
                i = t + "display: " + n + " !important;",
                o = m.css("display"),
                a = e === k || "" === e;
            o !== n ? (f.verbose("Overriding default display to show element", n), m.attr("style", i)) : a && m.removeAttr("style");
          },
          hidden: function hidden() {
            var e = m.attr("style"),
                t = m.css("display"),
                n = e === k || "" === e;
            "none" === t || f.is.hidden() ? n && m.removeAttr("style") : (f.verbose("Overriding default display to hide element"), m.css("display", "none"));
          }
        },
        has: {
          direction: function direction(e) {
            var n = !1;
            return "string" == typeof (e = e || u.animation) && (e = e.split(" "), C.each(e, function (e, t) {
              t !== d.inward && t !== d.outward || (n = !0);
            })), n;
          },
          inlineDisplay: function inlineDisplay() {
            var e = m.attr("style") || "";
            return C.isArray(e.match(/display.*?;/, ""));
          }
        },
        set: {
          animating: function animating(e) {
            var t;
            f.remove.completeCallback(), e = e || u.animation, t = f.get.animationClass(e), f.save.animation(t), f.force.visible(), f.remove.hidden(), f.remove.direction(), f.start.animation(t);
          },
          duration: function duration(e, t) {
            ((t = "number" == typeof (t = t || u.duration) ? t + "ms" : t) || 0 === t) && (f.verbose("Setting animation duration", t), m.css({
              "animation-duration": t
            }));
          },
          direction: function direction(e) {
            (e = e || f.get.direction()) == d.inward ? f.set.inward() : f.set.outward();
          },
          looping: function looping() {
            f.debug("Transition set to loop"), m.addClass(d.looping);
          },
          hidden: function hidden() {
            m.addClass(d.transition).addClass(d.hidden);
          },
          inward: function inward() {
            f.debug("Setting direction to inward"), m.removeClass(d.outward).addClass(d.inward);
          },
          outward: function outward() {
            f.debug("Setting direction to outward"), m.removeClass(d.inward).addClass(d.outward);
          },
          visible: function visible() {
            m.addClass(d.transition).addClass(d.visible);
          }
        },
        start: {
          animation: function animation(e) {
            e = e || f.get.animationClass(), f.debug("Starting tween", e), m.addClass(e).one(o + ".complete" + a, f.complete), u.useFailSafe && f.add.failSafe(), f.set.duration(u.duration), u.onStart.call(c);
          }
        },
        save: {
          animation: function animation(e) {
            f.cache || (f.cache = {}), f.cache.animation = e;
          },
          displayType: function displayType(e) {
            "none" !== e && m.data(n.displayType, e);
          },
          transitionExists: function transitionExists(e, t) {
            C.fn.transition.exists[e] = t, f.verbose("Saving existence of transition", e, t);
          }
        },
        restore: {
          conditions: function conditions() {
            var e = f.get.currentAnimation();
            e && (m.removeClass(e), f.verbose("Removing animation class", f.cache)), f.remove.duration();
          }
        },
        add: {
          failSafe: function failSafe() {
            var e = f.get.duration();
            f.timer = setTimeout(function () {
              m.triggerHandler(o);
            }, e + u.failSafeDelay), f.verbose("Adding fail safe timer", f.timer);
          }
        },
        remove: {
          animating: function animating() {
            m.removeClass(d.animating);
          },
          animationCallbacks: function animationCallbacks() {
            f.remove.queueCallback(), f.remove.completeCallback();
          },
          queueCallback: function queueCallback() {
            m.off(".queue" + a);
          },
          completeCallback: function completeCallback() {
            m.off(".complete" + a);
          },
          display: function display() {
            m.css("display", "");
          },
          direction: function direction() {
            m.removeClass(d.inward).removeClass(d.outward);
          },
          duration: function duration() {
            m.css("animation-duration", "");
          },
          failSafe: function failSafe() {
            f.verbose("Removing fail safe timer", f.timer), f.timer && clearTimeout(f.timer);
          },
          hidden: function hidden() {
            m.removeClass(d.hidden);
          },
          visible: function visible() {
            m.removeClass(d.visible);
          },
          looping: function looping() {
            f.debug("Transitions are no longer looping"), f.is.looping() && (f.reset(), m.removeClass(d.looping));
          },
          transition: function transition() {
            m.removeClass(d.visible).removeClass(d.hidden);
          }
        },
        get: {
          settings: function settings(e, t, n) {
            return "object" == _typeof(e) ? C.extend(!0, {}, C.fn.transition.settings, e) : "function" == typeof n ? C.extend({}, C.fn.transition.settings, {
              animation: e,
              onComplete: n,
              duration: t
            }) : "string" == typeof t || "number" == typeof t ? C.extend({}, C.fn.transition.settings, {
              animation: e,
              duration: t
            }) : "object" == _typeof(t) ? C.extend({}, C.fn.transition.settings, t, {
              animation: e
            }) : "function" == typeof t ? C.extend({}, C.fn.transition.settings, {
              animation: e,
              onComplete: t
            }) : C.extend({}, C.fn.transition.settings, {
              animation: e
            });
          },
          animationClass: function animationClass(e) {
            var t = e || u.animation,
                n = f.can.transition() && !f.has.direction() ? f.get.direction() + " " : "";
            return d.animating + " " + d.transition + " " + n + t;
          },
          currentAnimation: function currentAnimation() {
            return !(!f.cache || f.cache.animation === k) && f.cache.animation;
          },
          currentDirection: function currentDirection() {
            return f.is.inward() ? d.inward : d.outward;
          },
          direction: function direction() {
            return f.is.hidden() || !f.is.visible() ? d.inward : d.outward;
          },
          animationDirection: function animationDirection(e) {
            var n;
            return "string" == typeof (e = e || u.animation) && (e = e.split(" "), C.each(e, function (e, t) {
              t === d.inward ? n = d.inward : t === d.outward && (n = d.outward);
            })), n || !1;
          },
          duration: function duration(e) {
            return !1 === (e = e || u.duration) && (e = m.css("animation-duration") || 0), "string" == typeof e ? -1 < e.indexOf("ms") ? parseFloat(e) : 1e3 * parseFloat(e) : e;
          },
          displayType: function displayType(e) {
            return e = e === k || e, u.displayType ? u.displayType : (e && m.data(n.displayType) === k && f.can.transition(!0), m.data(n.displayType));
          },
          userStyle: function userStyle(e) {
            return (e = e || m.attr("style") || "").replace(/display.*?;/, "");
          },
          transitionExists: function transitionExists(e) {
            return C.fn.transition.exists[e];
          },
          animationStartEvent: function animationStartEvent() {
            var e,
                t = w.createElement("div"),
                n = {
              animation: "animationstart",
              OAnimation: "oAnimationStart",
              MozAnimation: "mozAnimationStart",
              WebkitAnimation: "webkitAnimationStart"
            };

            for (e in n) {
              if (t.style[e] !== k) return n[e];
            }

            return !1;
          },
          animationEndEvent: function animationEndEvent() {
            var e,
                t = w.createElement("div"),
                n = {
              animation: "animationend",
              OAnimation: "oAnimationEnd",
              MozAnimation: "mozAnimationEnd",
              WebkitAnimation: "webkitAnimationEnd"
            };

            for (e in n) {
              if (t.style[e] !== k) return n[e];
            }

            return !1;
          }
        },
        can: {
          transition: function transition(e) {
            var t,
                n,
                i,
                o,
                a,
                r,
                s = u.animation,
                c = f.get.transitionExists(s),
                l = f.get.displayType(!1);

            if (c === k || e) {
              if (f.verbose("Determining whether animation exists"), t = m.attr("class"), n = m.prop("tagName"), o = (i = C("<" + n + " />").addClass(t).insertAfter(m)).addClass(s).removeClass(d.inward).removeClass(d.outward).addClass(d.animating).addClass(d.transition).css("animationName"), a = i.addClass(d.inward).css("animationName"), l || (l = i.attr("class", t).removeAttr("style").removeClass(d.hidden).removeClass(d.visible).show().css("display"), f.verbose("Determining final display state", l), f.save.displayType(l)), i.remove(), o != a) f.debug("Direction exists for animation", s), r = !0;else {
                if ("none" == o || !o) return void f.debug("No animation defined in css", s);
                f.debug("Static animation found", s, l), r = !1;
              }
              f.save.transitionExists(s, r);
            }

            return c !== k ? c : r;
          },
          animate: function animate() {
            return f.can.transition() !== k;
          }
        },
        is: {
          animating: function animating() {
            return m.hasClass(d.animating);
          },
          inward: function inward() {
            return m.hasClass(d.inward);
          },
          outward: function outward() {
            return m.hasClass(d.outward);
          },
          looping: function looping() {
            return m.hasClass(d.looping);
          },
          occurring: function occurring(e) {
            return e = "." + (e = e || u.animation).replace(" ", "."), 0 < m.filter(e).length;
          },
          visible: function visible() {
            return m.is(":visible");
          },
          hidden: function hidden() {
            return "hidden" === m.css("visibility");
          },
          supported: function supported() {
            return !1 !== o;
          }
        },
        hide: function hide() {
          f.verbose("Hiding element"), f.is.animating() && f.reset(), c.blur(), f.remove.display(), f.remove.visible(), f.set.hidden(), f.force.hidden(), u.onHide.call(c), u.onComplete.call(c);
        },
        show: function show(e) {
          f.verbose("Showing element", e), f.remove.hidden(), f.set.visible(), f.force.visible(), u.onShow.call(c), u.onComplete.call(c);
        },
        toggle: function toggle() {
          f.is.visible() ? f.hide() : f.show();
        },
        stop: function stop() {
          f.debug("Stopping current animation"), m.triggerHandler(o);
        },
        stopAll: function stopAll() {
          f.debug("Stopping all animation"), f.remove.queueCallback(), m.triggerHandler(o);
        },
        clear: {
          queue: function queue() {
            f.debug("Clearing animation queue"), f.remove.queueCallback();
          }
        },
        enable: function enable() {
          f.verbose("Starting animation"), m.removeClass(d.disabled);
        },
        disable: function disable() {
          f.debug("Stopping animation"), m.addClass(d.disabled);
        },
        setting: function setting(e, t) {
          if (f.debug("Changing setting", e, t), C.isPlainObject(e)) C.extend(!0, u, e);else {
            if (t === k) return u[e];
            C.isPlainObject(u[e]) ? C.extend(!0, u[e], t) : u[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (C.isPlainObject(e)) C.extend(!0, f, e);else {
            if (t === k) return f[e];
            f[e] = t;
          }
        },
        debug: function debug() {
          !u.silent && u.debug && (u.performance ? f.performance.log(arguments) : (f.debug = Function.prototype.bind.call(console.info, console, u.name + ":"), f.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !u.silent && u.verbose && u.debug && (u.performance ? f.performance.log(arguments) : (f.verbose = Function.prototype.bind.call(console.info, console, u.name + ":"), f.verbose.apply(console, arguments)));
        },
        error: function error() {
          u.silent || (f.error = Function.prototype.bind.call(console.error, console, u.name + ":"), f.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var t, n;
            u.performance && (n = (t = new Date().getTime()) - (p || t), p = t, h.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: c,
              "Execution Time": n
            })), clearTimeout(f.performance.timer), f.performance.timer = setTimeout(f.performance.display, 500);
          },
          display: function display() {
            var e = u.name + ":",
                n = 0;
            p = !1, clearTimeout(f.performance.timer), C.each(h, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", g && (e += " '" + g + "'"), 1 < r.length && (e += " (" + r.length + ")"), (console.group !== k || console.table !== k) && 0 < h.length && (console.groupCollapsed(e), console.table ? console.table(h) : C.each(h, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), h = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              a,
              n,
              r = s;
          return e = e || y, t = c || t, "string" == typeof i && r !== k && (i = i.split(/[\. ]/), o = i.length - 1, C.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (C.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== k) return a = r[n], !1;
              if (!C.isPlainObject(r[t]) || e == o) return r[t] !== k && (a = r[t]), !1;
              r = r[t];
            }
          })), C.isFunction(a) ? n = a.apply(t, e) : a !== k && (n = a), C.isArray(l) ? l.push(n) : l !== k ? l = [l, n] : n !== k && (l = n), a !== k && a;
        }
      }).initialize();
    }), l !== k ? l : this;
  }, C.fn.transition.exists = {}, C.fn.transition.settings = {
    name: "Transition",
    silent: !1,
    debug: !1,
    verbose: !1,
    performance: !0,
    namespace: "transition",
    interval: 0,
    reverse: "auto",
    onStart: function onStart() {},
    onComplete: function onComplete() {},
    onShow: function onShow() {},
    onHide: function onHide() {},
    useFailSafe: !0,
    failSafeDelay: 100,
    allowRepeats: !1,
    displayType: !1,
    animation: "fade",
    duration: !1,
    queue: !0,
    metadata: {
      displayType: "display"
    },
    className: {
      animating: "animating",
      disabled: "disabled",
      hidden: "hidden",
      inward: "in",
      loading: "loading",
      looping: "looping",
      outward: "out",
      transition: "transition",
      visible: "visible"
    },
    error: {
      noAnimation: "Element is no longer attached to DOM. Unable to animate.  Use silent setting to surpress this warning in production.",
      repeated: "That animation is already occurring, cancelling repeated animation",
      method: "The method you called is not defined",
      support: "This browser does not support CSS animations"
    }
  };
}(jQuery, window, document), function (k, e, T, S) {
  "use strict";

  e = void 0 !== e && e.Math == Math ? e : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), k.fn.dimmer = function (p) {
    var h,
        b = k(this),
        v = new Date().getTime(),
        y = [],
        x = p,
        C = "string" == typeof x,
        w = [].slice.call(arguments, 1);
    return b.each(function () {
      var a,
          t,
          s,
          r = k.isPlainObject(p) ? k.extend(!0, {}, k.fn.dimmer.settings, p) : k.extend({}, k.fn.dimmer.settings),
          n = r.selector,
          e = r.namespace,
          i = r.className,
          c = r.error,
          o = "." + e,
          l = "module-" + e,
          u = b.selector || "",
          d = "ontouchstart" in T.documentElement ? "touchstart" : "click",
          f = k(this),
          m = this,
          g = f.data(l);
      (s = {
        preinitialize: function preinitialize() {
          a = s.is.dimmer() ? (t = f.parent(), f) : (t = f, s.has.dimmer() ? r.dimmerName ? t.find(n.dimmer).filter("." + r.dimmerName) : t.find(n.dimmer) : s.create());
        },
        initialize: function initialize() {
          s.debug("Initializing dimmer", r), s.bind.events(), s.set.dimmable(), s.instantiate();
        },
        instantiate: function instantiate() {
          s.verbose("Storing instance of module", s), g = s, f.data(l, g);
        },
        destroy: function destroy() {
          s.verbose("Destroying previous module", a), s.unbind.events(), s.remove.variation(), t.off(o);
        },
        bind: {
          events: function events() {
            "hover" == r.on ? t.on("mouseenter" + o, s.show).on("mouseleave" + o, s.hide) : "click" == r.on && t.on(d + o, s.toggle), s.is.page() && (s.debug("Setting as a page dimmer", t), s.set.pageDimmer()), s.is.closable() && (s.verbose("Adding dimmer close event", a), t.on(d + o, n.dimmer, s.event.click));
          }
        },
        unbind: {
          events: function events() {
            f.removeData(l), t.off(o);
          }
        },
        event: {
          click: function click(e) {
            s.verbose("Determining if event occured on dimmer", e), (0 === a.find(e.target).length || k(e.target).is(n.content)) && (s.hide(), e.stopImmediatePropagation());
          }
        },
        addContent: function addContent(e) {
          var t = k(e);
          s.debug("Add content to dimmer", t), t.parent()[0] !== a[0] && t.detach().appendTo(a);
        },
        create: function create() {
          var e = k(r.template.dimmer());
          return r.dimmerName && (s.debug("Creating named dimmer", r.dimmerName), e.addClass(r.dimmerName)), e.appendTo(t), e;
        },
        show: function show(e) {
          e = k.isFunction(e) ? e : function () {}, s.debug("Showing dimmer", a, r), s.set.variation(), s.is.dimmed() && !s.is.animating() || !s.is.enabled() ? s.debug("Dimmer is already shown or disabled") : (s.animate.show(e), r.onShow.call(m), r.onChange.call(m));
        },
        hide: function hide(e) {
          e = k.isFunction(e) ? e : function () {}, s.is.dimmed() || s.is.animating() ? (s.debug("Hiding dimmer", a), s.animate.hide(e), r.onHide.call(m), r.onChange.call(m)) : s.debug("Dimmer is not visible");
        },
        toggle: function toggle() {
          s.verbose("Toggling dimmer visibility", a), s.is.dimmed() ? s.hide() : s.show();
        },
        animate: {
          show: function show(e) {
            e = k.isFunction(e) ? e : function () {}, r.useCSS && k.fn.transition !== S && a.transition("is supported") ? (r.useFlex ? (s.debug("Using flex dimmer"), s.remove.legacy()) : (s.debug("Using legacy non-flex dimmer"), s.set.legacy()), "auto" !== r.opacity && s.set.opacity(), a.transition({
              displayType: r.useFlex ? "flex" : "block",
              animation: r.transition + " in",
              queue: !1,
              duration: s.get.duration(),
              useFailSafe: !0,
              onStart: function onStart() {
                s.set.dimmed();
              },
              onComplete: function onComplete() {
                s.set.active(), e();
              }
            })) : (s.verbose("Showing dimmer animation with javascript"), s.set.dimmed(), "auto" == r.opacity && (r.opacity = .8), a.stop().css({
              opacity: 0,
              width: "100%",
              height: "100%"
            }).fadeTo(s.get.duration(), r.opacity, function () {
              a.removeAttr("style"), s.set.active(), e();
            }));
          },
          hide: function hide(e) {
            e = k.isFunction(e) ? e : function () {}, r.useCSS && k.fn.transition !== S && a.transition("is supported") ? (s.verbose("Hiding dimmer with css"), a.transition({
              displayType: r.useFlex ? "flex" : "block",
              animation: r.transition + " out",
              queue: !1,
              duration: s.get.duration(),
              useFailSafe: !0,
              onStart: function onStart() {
                s.remove.dimmed();
              },
              onComplete: function onComplete() {
                s.remove.variation(), s.remove.active(), e();
              }
            })) : (s.verbose("Hiding dimmer with javascript"), s.remove.dimmed(), a.stop().fadeOut(s.get.duration(), function () {
              s.remove.active(), a.removeAttr("style"), e();
            }));
          }
        },
        get: {
          dimmer: function dimmer() {
            return a;
          },
          duration: function duration() {
            return "object" == _typeof(r.duration) ? s.is.active() ? r.duration.hide : r.duration.show : r.duration;
          }
        },
        has: {
          dimmer: function dimmer() {
            return r.dimmerName ? 0 < f.find(n.dimmer).filter("." + r.dimmerName).length : 0 < f.find(n.dimmer).length;
          }
        },
        is: {
          active: function active() {
            return a.hasClass(i.active);
          },
          animating: function animating() {
            return a.is(":animated") || a.hasClass(i.animating);
          },
          closable: function closable() {
            return "auto" == r.closable ? "hover" != r.on : r.closable;
          },
          dimmer: function dimmer() {
            return f.hasClass(i.dimmer);
          },
          dimmable: function dimmable() {
            return f.hasClass(i.dimmable);
          },
          dimmed: function dimmed() {
            return t.hasClass(i.dimmed);
          },
          disabled: function disabled() {
            return t.hasClass(i.disabled);
          },
          enabled: function enabled() {
            return !s.is.disabled();
          },
          page: function page() {
            return t.is("body");
          },
          pageDimmer: function pageDimmer() {
            return a.hasClass(i.pageDimmer);
          }
        },
        can: {
          show: function show() {
            return !a.hasClass(i.disabled);
          }
        },
        set: {
          opacity: function opacity(e) {
            var t = a.css("background-color"),
                n = t.split(","),
                i = n && 3 == n.length,
                o = n && 4 == n.length;
            e = 0 === r.opacity ? 0 : r.opacity || e, t = i || o ? (n[3] = e + ")", n.join(",")) : "rgba(0, 0, 0, " + e + ")", s.debug("Setting opacity to", e), a.css("background-color", t);
          },
          legacy: function legacy() {
            a.addClass(i.legacy);
          },
          active: function active() {
            a.addClass(i.active);
          },
          dimmable: function dimmable() {
            t.addClass(i.dimmable);
          },
          dimmed: function dimmed() {
            t.addClass(i.dimmed);
          },
          pageDimmer: function pageDimmer() {
            a.addClass(i.pageDimmer);
          },
          disabled: function disabled() {
            a.addClass(i.disabled);
          },
          variation: function variation(e) {
            (e = e || r.variation) && a.addClass(e);
          }
        },
        remove: {
          active: function active() {
            a.removeClass(i.active);
          },
          legacy: function legacy() {
            a.removeClass(i.legacy);
          },
          dimmed: function dimmed() {
            t.removeClass(i.dimmed);
          },
          disabled: function disabled() {
            a.removeClass(i.disabled);
          },
          variation: function variation(e) {
            (e = e || r.variation) && a.removeClass(e);
          }
        },
        setting: function setting(e, t) {
          if (s.debug("Changing setting", e, t), k.isPlainObject(e)) k.extend(!0, r, e);else {
            if (t === S) return r[e];
            k.isPlainObject(r[e]) ? k.extend(!0, r[e], t) : r[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (k.isPlainObject(e)) k.extend(!0, s, e);else {
            if (t === S) return s[e];
            s[e] = t;
          }
        },
        debug: function debug() {
          !r.silent && r.debug && (r.performance ? s.performance.log(arguments) : (s.debug = Function.prototype.bind.call(console.info, console, r.name + ":"), s.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !r.silent && r.verbose && r.debug && (r.performance ? s.performance.log(arguments) : (s.verbose = Function.prototype.bind.call(console.info, console, r.name + ":"), s.verbose.apply(console, arguments)));
        },
        error: function error() {
          r.silent || (s.error = Function.prototype.bind.call(console.error, console, r.name + ":"), s.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var t, n;
            r.performance && (n = (t = new Date().getTime()) - (v || t), v = t, y.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: m,
              "Execution Time": n
            })), clearTimeout(s.performance.timer), s.performance.timer = setTimeout(s.performance.display, 500);
          },
          display: function display() {
            var e = r.name + ":",
                n = 0;
            v = !1, clearTimeout(s.performance.timer), k.each(y, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", u && (e += " '" + u + "'"), 1 < b.length && (e += " (" + b.length + ")"), (console.group !== S || console.table !== S) && 0 < y.length && (console.groupCollapsed(e), console.table ? console.table(y) : k.each(y, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), y = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              a,
              n,
              r = g;
          return e = e || w, t = m || t, "string" == typeof i && r !== S && (i = i.split(/[\. ]/), o = i.length - 1, k.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (k.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== S) return a = r[n], !1;
              if (!k.isPlainObject(r[t]) || e == o) return r[t] !== S ? a = r[t] : s.error(c.method, i), !1;
              r = r[t];
            }
          })), k.isFunction(a) ? n = a.apply(t, e) : a !== S && (n = a), k.isArray(h) ? h.push(n) : h !== S ? h = [h, n] : n !== S && (h = n), a;
        }
      }).preinitialize(), C ? (g === S && s.initialize(), s.invoke(x)) : (g !== S && g.invoke("destroy"), s.initialize());
    }), h !== S ? h : this;
  }, k.fn.dimmer.settings = {
    name: "Dimmer",
    namespace: "dimmer",
    silent: !1,
    debug: !1,
    verbose: !1,
    performance: !0,
    useFlex: !0,
    dimmerName: !1,
    variation: !1,
    closable: "auto",
    useCSS: !0,
    transition: "fade",
    on: !1,
    opacity: "auto",
    duration: {
      show: 500,
      hide: 500
    },
    onChange: function onChange() {},
    onShow: function onShow() {},
    onHide: function onHide() {},
    error: {
      method: "The method you called is not defined."
    },
    className: {
      active: "active",
      animating: "animating",
      dimmable: "dimmable",
      dimmed: "dimmed",
      dimmer: "dimmer",
      disabled: "disabled",
      hide: "hide",
      legacy: "legacy",
      pageDimmer: "page",
      show: "show"
    },
    selector: {
      dimmer: "> .ui.dimmer",
      content: ".ui.dimmer > .content, .ui.dimmer > .content > .center"
    },
    template: {
      dimmer: function dimmer() {
        return k("<div />").attr("class", "ui dimmer");
      }
    }
  };
}(jQuery, window, document), function (P, M, z, L) {
  "use strict";

  M = void 0 !== M && M.Math == Math ? M : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), P.fn.modal = function (w) {
    var k,
        e = P(this),
        T = P(M),
        S = P(z),
        A = P("body"),
        R = e.selector || "",
        F = new Date().getTime(),
        E = [],
        q = w,
        O = "string" == typeof q,
        j = [].slice.call(arguments, 1),
        D = M.requestAnimationFrame || M.mozRequestAnimationFrame || M.webkitRequestAnimationFrame || M.msRequestAnimationFrame || function (e) {
      setTimeout(e, 0);
    };

    return e.each(function () {
      var n,
          i,
          e,
          o,
          a,
          t,
          r,
          s,
          c,
          l = P.isPlainObject(w) ? P.extend(!0, {}, P.fn.modal.settings, w) : P.extend({}, P.fn.modal.settings),
          u = l.selector,
          d = l.className,
          f = l.namespace,
          m = l.error,
          g = "." + f,
          p = "module-" + f,
          h = P(this),
          b = P(l.context),
          v = h.find(u.close),
          y = this,
          x = h.data(p),
          C = !1;
      c = {
        initialize: function initialize() {
          c.verbose("Initializing dimmer", b), c.create.id(), c.create.dimmer(), c.refreshModals(), c.bind.events(), l.observeChanges && c.observeChanges(), c.instantiate();
        },
        instantiate: function instantiate() {
          c.verbose("Storing instance of modal"), x = c, h.data(p, x);
        },
        create: {
          dimmer: function dimmer() {
            var e = {
              debug: l.debug,
              variation: !l.centered && "top aligned",
              dimmerName: "modals"
            },
                t = P.extend(!0, e, l.dimmerSettings);
            P.fn.dimmer !== L ? (c.debug("Creating dimmer"), o = b.dimmer(t), l.detachable ? (c.verbose("Modal is detachable, moving content into dimmer"), o.dimmer("add content", h)) : c.set.undetached(), a = o.dimmer("get dimmer")) : c.error(m.dimmer);
          },
          id: function id() {
            r = (Math.random().toString(16) + "000000000").substr(2, 8), t = "." + r, c.verbose("Creating unique id for element", r);
          }
        },
        destroy: function destroy() {
          c.verbose("Destroying previous modal"), h.removeData(p).off(g), T.off(t), a.off(t), v.off(g), b.dimmer("destroy");
        },
        observeChanges: function observeChanges() {
          "MutationObserver" in M && ((s = new MutationObserver(function (e) {
            c.debug("DOM tree modified, refreshing"), c.refresh();
          })).observe(y, {
            childList: !0,
            subtree: !0
          }), c.debug("Setting up mutation observer", s));
        },
        refresh: function refresh() {
          c.remove.scrolling(), c.cacheSizes(), c.can.useFlex() || c.set.modalOffset(), c.set.screenHeight(), c.set.type();
        },
        refreshModals: function refreshModals() {
          i = h.siblings(u.modal), n = i.add(h);
        },
        attachEvents: function attachEvents(e, t) {
          var n = P(e);
          t = P.isFunction(c[t]) ? c[t] : c.toggle, 0 < n.length ? (c.debug("Attaching modal events to element", e, t), n.off(g).on("click" + g, t)) : c.error(m.notFound, e);
        },
        bind: {
          events: function events() {
            c.verbose("Attaching events"), h.on("click" + g, u.close, c.event.close).on("click" + g, u.approve, c.event.approve).on("click" + g, u.deny, c.event.deny), T.on("resize" + t, c.event.resize);
          },
          scrollLock: function scrollLock() {
            o.get(0).addEventListener("touchmove", c.event.preventScroll, {
              passive: !1
            });
          }
        },
        unbind: {
          scrollLock: function scrollLock() {
            o.get(0).removeEventListener("touchmove", c.event.preventScroll, {
              passive: !1
            });
          }
        },
        get: {
          id: function id() {
            return (Math.random().toString(16) + "000000000").substr(2, 8);
          }
        },
        event: {
          approve: function approve() {
            C || !1 === l.onApprove.call(y, P(this)) ? c.verbose("Approve callback returned false cancelling hide") : (C = !0, c.hide(function () {
              C = !1;
            }));
          },
          preventScroll: function preventScroll(e) {
            e.preventDefault();
          },
          deny: function deny() {
            C || !1 === l.onDeny.call(y, P(this)) ? c.verbose("Deny callback returned false cancelling hide") : (C = !0, c.hide(function () {
              C = !1;
            }));
          },
          close: function close() {
            c.hide();
          },
          click: function click(e) {
            if (l.closable) {
              var t = 0 < P(e.target).closest(u.modal).length,
                  n = P.contains(z.documentElement, e.target);
              !t && n && c.is.active() && (c.debug("Dimmer clicked, hiding all modals"), c.remove.clickaway(), l.allowMultiple ? c.hide() : c.hideAll());
            } else c.verbose("Dimmer clicked but closable setting is disabled");
          },
          debounce: function debounce(e, t) {
            clearTimeout(c.timer), c.timer = setTimeout(e, t);
          },
          keyboard: function keyboard(e) {
            27 == e.which && (l.closable ? (c.debug("Escape key pressed hiding modal"), c.hide()) : c.debug("Escape key pressed, but closable is set to false"), e.preventDefault());
          },
          resize: function resize() {
            o.dimmer("is active") && (c.is.animating() || c.is.active()) && D(c.refresh);
          }
        },
        toggle: function toggle() {
          c.is.active() || c.is.animating() ? c.hide() : c.show();
        },
        show: function show(e) {
          e = P.isFunction(e) ? e : function () {}, c.refreshModals(), c.set.dimmerSettings(), c.set.dimmerStyles(), c.showModal(e);
        },
        hide: function hide(e) {
          e = P.isFunction(e) ? e : function () {}, c.refreshModals(), c.hideModal(e);
        },
        showModal: function showModal(e) {
          e = P.isFunction(e) ? e : function () {}, c.is.animating() || !c.is.active() ? (c.showDimmer(), c.cacheSizes(), c.can.useFlex() ? c.remove.legacy() : (c.set.legacy(), c.set.modalOffset(), c.debug("Using non-flex legacy modal positioning.")), c.set.screenHeight(), c.set.type(), c.set.clickaway(), !l.allowMultiple && c.others.active() ? c.hideOthers(c.showModal) : (l.allowMultiple && l.detachable && h.detach().appendTo(a), l.onShow.call(y), l.transition && P.fn.transition !== L && h.transition("is supported") ? (c.debug("Showing modal with css animations"), h.transition({
            debug: l.debug,
            animation: l.transition + " in",
            queue: l.queue,
            duration: l.duration,
            useFailSafe: !0,
            onComplete: function onComplete() {
              l.onVisible.apply(y), l.keyboardShortcuts && c.add.keyboardShortcuts(), c.save.focus(), c.set.active(), l.autofocus && c.set.autofocus(), e();
            }
          })) : c.error(m.noTransition))) : c.debug("Modal is already visible");
        },
        hideModal: function hideModal(e, t) {
          e = P.isFunction(e) ? e : function () {}, c.debug("Hiding modal"), !1 !== l.onHide.call(y, P(this)) ? (c.is.animating() || c.is.active()) && (l.transition && P.fn.transition !== L && h.transition("is supported") ? (c.remove.active(), h.transition({
            debug: l.debug,
            animation: l.transition + " out",
            queue: l.queue,
            duration: l.duration,
            useFailSafe: !0,
            onStart: function onStart() {
              c.others.active() || t || c.hideDimmer(), l.keyboardShortcuts && c.remove.keyboardShortcuts();
            },
            onComplete: function onComplete() {
              l.onHidden.call(y), c.remove.dimmerStyles(), c.restore.focus(), e();
            }
          })) : c.error(m.noTransition)) : c.verbose("Hide callback returned false cancelling hide");
        },
        showDimmer: function showDimmer() {
          o.dimmer("is animating") || !o.dimmer("is active") ? (c.debug("Showing dimmer"), o.dimmer("show")) : c.debug("Dimmer already visible");
        },
        hideDimmer: function hideDimmer() {
          o.dimmer("is animating") || o.dimmer("is active") ? (c.unbind.scrollLock(), o.dimmer("hide", function () {
            c.remove.clickaway(), c.remove.screenHeight();
          })) : c.debug("Dimmer is not visible cannot hide");
        },
        hideAll: function hideAll(e) {
          var t = n.filter("." + d.active + ", ." + d.animating);
          e = P.isFunction(e) ? e : function () {}, 0 < t.length && (c.debug("Hiding all visible modals"), c.hideDimmer(), t.modal("hide modal", e));
        },
        hideOthers: function hideOthers(e) {
          var t = i.filter("." + d.active + ", ." + d.animating);
          e = P.isFunction(e) ? e : function () {}, 0 < t.length && (c.debug("Hiding other modals", i), t.modal("hide modal", e, !0));
        },
        others: {
          active: function active() {
            return 0 < i.filter("." + d.active).length;
          },
          animating: function animating() {
            return 0 < i.filter("." + d.animating).length;
          }
        },
        add: {
          keyboardShortcuts: function keyboardShortcuts() {
            c.verbose("Adding keyboard shortcuts"), S.on("keyup" + g, c.event.keyboard);
          }
        },
        save: {
          focus: function focus() {
            0 < P(z.activeElement).closest(h).length || (e = P(z.activeElement).blur());
          }
        },
        restore: {
          focus: function focus() {
            e && 0 < e.length && e.focus();
          }
        },
        remove: {
          active: function active() {
            h.removeClass(d.active);
          },
          legacy: function legacy() {
            h.removeClass(d.legacy);
          },
          clickaway: function clickaway() {
            a.off("click" + t);
          },
          dimmerStyles: function dimmerStyles() {
            a.removeClass(d.inverted), o.removeClass(d.blurring);
          },
          bodyStyle: function bodyStyle() {
            "" === A.attr("style") && (c.verbose("Removing style attribute"), A.removeAttr("style"));
          },
          screenHeight: function screenHeight() {
            c.debug("Removing page height"), A.css("height", "");
          },
          keyboardShortcuts: function keyboardShortcuts() {
            c.verbose("Removing keyboard shortcuts"), S.off("keyup" + g);
          },
          scrolling: function scrolling() {
            o.removeClass(d.scrolling), h.removeClass(d.scrolling);
          }
        },
        cacheSizes: function cacheSizes() {
          h.addClass(d.loading);
          var e = h.prop("scrollHeight"),
              t = h.outerWidth(),
              n = h.outerHeight();
          c.cache !== L && 0 === n || (c.cache = {
            pageHeight: P(z).outerHeight(),
            width: t,
            height: n + l.offset,
            scrollHeight: e + l.offset,
            contextHeight: "body" == l.context ? P(M).height() : o.height()
          }, c.cache.topOffset = -c.cache.height / 2), h.removeClass(d.loading), c.debug("Caching modal and container sizes", c.cache);
        },
        can: {
          useFlex: function useFlex() {
            return "auto" == l.useFlex ? l.detachable && !c.is.ie() : l.useFlex;
          },
          fit: function fit() {
            var e = c.cache.contextHeight,
                t = c.cache.contextHeight / 2,
                n = c.cache.topOffset,
                i = c.cache.scrollHeight,
                o = c.cache.height,
                a = l.padding;
            return o < i ? t + n + i + a < e : o + 2 * a < e;
          }
        },
        is: {
          active: function active() {
            return h.hasClass(d.active);
          },
          ie: function ie() {
            return !M.ActiveXObject && "ActiveXObject" in M || "ActiveXObject" in M;
          },
          animating: function animating() {
            return h.transition("is supported") ? h.transition("is animating") : h.is(":visible");
          },
          scrolling: function scrolling() {
            return o.hasClass(d.scrolling);
          },
          modernBrowser: function modernBrowser() {
            return !(M.ActiveXObject || "ActiveXObject" in M);
          }
        },
        set: {
          autofocus: function autofocus() {
            var e = h.find("[tabindex], :input").filter(":visible"),
                t = e.filter("[autofocus]"),
                n = 0 < t.length ? t.first() : e.first();
            0 < n.length && n.focus();
          },
          clickaway: function clickaway() {
            a.on("click" + t, c.event.click);
          },
          dimmerSettings: function dimmerSettings() {
            if (P.fn.dimmer !== L) {
              var e = {
                debug: l.debug,
                dimmerName: "modals",
                closable: "auto",
                useFlex: c.can.useFlex(),
                variation: !l.centered && "top aligned",
                duration: {
                  show: l.duration,
                  hide: l.duration
                }
              },
                  t = P.extend(!0, e, l.dimmerSettings);
              l.inverted && (t.variation = t.variation !== L ? t.variation + " inverted" : "inverted"), b.dimmer("setting", t);
            } else c.error(m.dimmer);
          },
          dimmerStyles: function dimmerStyles() {
            l.inverted ? a.addClass(d.inverted) : a.removeClass(d.inverted), l.blurring ? o.addClass(d.blurring) : o.removeClass(d.blurring);
          },
          modalOffset: function modalOffset() {
            var e = c.cache.width,
                t = c.cache.height;
            h.css({
              marginTop: l.centered && c.can.fit() ? -t / 2 : 0,
              marginLeft: -e / 2
            }), c.verbose("Setting modal offset for legacy mode");
          },
          screenHeight: function screenHeight() {
            c.can.fit() ? A.css("height", "") : (c.debug("Modal is taller than page content, resizing page height"), A.css("height", c.cache.height + 2 * l.padding));
          },
          active: function active() {
            h.addClass(d.active);
          },
          scrolling: function scrolling() {
            o.addClass(d.scrolling), h.addClass(d.scrolling), c.unbind.scrollLock();
          },
          legacy: function legacy() {
            h.addClass(d.legacy);
          },
          type: function type() {
            c.can.fit() ? (c.verbose("Modal fits on screen"), c.others.active() || c.others.animating() || (c.remove.scrolling(), c.bind.scrollLock())) : (c.verbose("Modal cannot fit on screen setting to scrolling"), c.set.scrolling());
          },
          undetached: function undetached() {
            o.addClass(d.undetached);
          }
        },
        setting: function setting(e, t) {
          if (c.debug("Changing setting", e, t), P.isPlainObject(e)) P.extend(!0, l, e);else {
            if (t === L) return l[e];
            P.isPlainObject(l[e]) ? P.extend(!0, l[e], t) : l[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (P.isPlainObject(e)) P.extend(!0, c, e);else {
            if (t === L) return c[e];
            c[e] = t;
          }
        },
        debug: function debug() {
          !l.silent && l.debug && (l.performance ? c.performance.log(arguments) : (c.debug = Function.prototype.bind.call(console.info, console, l.name + ":"), c.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !l.silent && l.verbose && l.debug && (l.performance ? c.performance.log(arguments) : (c.verbose = Function.prototype.bind.call(console.info, console, l.name + ":"), c.verbose.apply(console, arguments)));
        },
        error: function error() {
          l.silent || (c.error = Function.prototype.bind.call(console.error, console, l.name + ":"), c.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var t, n;
            l.performance && (n = (t = new Date().getTime()) - (F || t), F = t, E.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: y,
              "Execution Time": n
            })), clearTimeout(c.performance.timer), c.performance.timer = setTimeout(c.performance.display, 500);
          },
          display: function display() {
            var e = l.name + ":",
                n = 0;
            F = !1, clearTimeout(c.performance.timer), P.each(E, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", R && (e += " '" + R + "'"), (console.group !== L || console.table !== L) && 0 < E.length && (console.groupCollapsed(e), console.table ? console.table(E) : P.each(E, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), E = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              a,
              n,
              r = x;
          return e = e || j, t = y || t, "string" == typeof i && r !== L && (i = i.split(/[\. ]/), o = i.length - 1, P.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (P.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== L) return a = r[n], !1;
              if (!P.isPlainObject(r[t]) || e == o) return r[t] !== L && (a = r[t]), !1;
              r = r[t];
            }
          })), P.isFunction(a) ? n = a.apply(t, e) : a !== L && (n = a), P.isArray(k) ? k.push(n) : k !== L ? k = [k, n] : n !== L && (k = n), a;
        }
      }, O ? (x === L && c.initialize(), c.invoke(q)) : (x !== L && x.invoke("destroy"), c.initialize());
    }), k !== L ? k : this;
  }, P.fn.modal.settings = {
    name: "Modal",
    namespace: "modal",
    useFlex: "auto",
    offset: 0,
    silent: !1,
    debug: !1,
    verbose: !1,
    performance: !0,
    observeChanges: !1,
    allowMultiple: !1,
    detachable: !0,
    closable: !0,
    autofocus: !0,
    inverted: !1,
    blurring: !1,
    centered: !0,
    dimmerSettings: {
      closable: !1,
      useCSS: !0
    },
    keyboardShortcuts: !0,
    context: "body",
    queue: !1,
    duration: 500,
    transition: "scale",
    padding: 50,
    onShow: function onShow() {},
    onVisible: function onVisible() {},
    onHide: function onHide() {
      return !0;
    },
    onHidden: function onHidden() {},
    onApprove: function onApprove() {
      return !0;
    },
    onDeny: function onDeny() {
      return !0;
    },
    selector: {
      close: "> .close",
      approve: ".actions .positive, .actions .approve, .actions .ok",
      deny: ".actions .negative, .actions .deny, .actions .cancel",
      modal: ".ui.modal"
    },
    error: {
      dimmer: "UI Dimmer, a required component is not included in this page",
      method: "The method you called is not defined.",
      notFound: "The element you specified could not be found"
    },
    className: {
      active: "active",
      animating: "animating",
      blurring: "blurring",
      inverted: "inverted",
      legacy: "legacy",
      loading: "loading",
      scrolling: "scrolling",
      undetached: "undetached"
    }
  };
}(jQuery, window, document), function (q, e, O, j) {
  "use strict";

  e = void 0 !== e && e.Math == Math ? e : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), q.fn.form = function (x) {
    var C,
        w = q(this),
        k = w.selector || "",
        T = new Date().getTime(),
        S = [],
        A = x,
        R = arguments[1],
        F = "string" == typeof A,
        E = [].slice.call(arguments, 1);
    return w.each(function () {
      var n,
          c,
          t,
          e,
          d,
          l,
          u,
          f,
          m,
          i,
          s,
          o,
          a,
          g,
          p,
          h,
          r = q(this),
          b = this,
          v = [],
          y = !1;
      (h = {
        initialize: function initialize() {
          h.get.settings(), F ? (p === j && h.instantiate(), h.invoke(A)) : (p !== j && p.invoke("destroy"), h.verbose("Initializing form validation", r, d), h.bindEvents(), h.set.defaults(), h.instantiate());
        },
        instantiate: function instantiate() {
          h.verbose("Storing instance of module", h), p = h, r.data(a, h);
        },
        destroy: function destroy() {
          h.verbose("Destroying previous module", p), h.removeEvents(), r.removeData(a);
        },
        refresh: function refresh() {
          h.verbose("Refreshing selector cache"), n = r.find(f.field), c = r.find(f.group), t = r.find(f.message), r.find(f.prompt), e = r.find(f.submit), r.find(f.clear), r.find(f.reset);
        },
        submit: function submit() {
          h.verbose("Submitting form", r), r.submit();
        },
        attachEvents: function attachEvents(e, t) {
          t = t || "submit", q(e).on("click" + g, function (e) {
            h[t](), e.preventDefault();
          });
        },
        bindEvents: function bindEvents() {
          h.verbose("Attaching form events"), r.on("submit" + g, h.validate.form).on("blur" + g, f.field, h.event.field.blur).on("click" + g, f.submit, h.submit).on("click" + g, f.reset, h.reset).on("click" + g, f.clear, h.clear), d.keyboardShortcuts && r.on("keydown" + g, f.field, h.event.field.keydown), n.each(function () {
            var e = q(this),
                t = e.prop("type"),
                n = h.get.changeEvent(t, e);
            q(this).on(n + g, h.event.field.change);
          });
        },
        clear: function clear() {
          n.each(function () {
            var e = q(this),
                t = e.parent(),
                n = e.closest(c),
                i = n.find(f.prompt),
                o = e.data(u.defaultValue) || "",
                a = t.is(f.uiCheckbox),
                r = t.is(f.uiDropdown);
            n.hasClass(m.error) && (h.verbose("Resetting error on field", n), n.removeClass(m.error), i.remove()), r ? (h.verbose("Resetting dropdown value", t, o), t.dropdown("clear")) : a ? e.prop("checked", !1) : (h.verbose("Resetting field value", e, o), e.val(""));
          });
        },
        reset: function reset() {
          n.each(function () {
            var e = q(this),
                t = e.parent(),
                n = e.closest(c),
                i = n.find(f.prompt),
                o = e.data(u.defaultValue),
                a = t.is(f.uiCheckbox),
                r = t.is(f.uiDropdown),
                s = n.hasClass(m.error);
            o !== j && (s && (h.verbose("Resetting error on field", n), n.removeClass(m.error), i.remove()), r ? (h.verbose("Resetting dropdown value", t, o), t.dropdown("restore defaults")) : a ? (h.verbose("Resetting checkbox value", t, o), e.prop("checked", o)) : (h.verbose("Resetting field value", e, o), e.val(o)));
          });
        },
        determine: {
          isValid: function isValid() {
            var n = !0;
            return q.each(l, function (e, t) {
              h.validate.field(t, e, !0) || (n = !1);
            }), n;
          }
        },
        is: {
          bracketedRule: function bracketedRule(e) {
            return e.type && e.type.match(d.regExp.bracket);
          },
          shorthandFields: function shorthandFields(e) {
            var t = e[Object.keys(e)[0]];
            return h.is.shorthandRules(t);
          },
          shorthandRules: function shorthandRules(e) {
            return "string" == typeof e || q.isArray(e);
          },
          empty: function empty(e) {
            return !e || 0 === e.length || (e.is('input[type="checkbox"]') ? !e.is(":checked") : h.is.blank(e));
          },
          blank: function blank(e) {
            return "" === q.trim(e.val());
          },
          valid: function valid(e) {
            var n = !0;
            return e ? (h.verbose("Checking if field is valid", e), h.validate.field(l[e], e, !1)) : (h.verbose("Checking if form is valid"), q.each(l, function (e, t) {
              h.is.valid(e) || (n = !1);
            }), n);
          }
        },
        removeEvents: function removeEvents() {
          r.off(g), n.off(g), e.off(g), n.off(g);
        },
        event: {
          field: {
            keydown: function keydown(e) {
              var t = q(this),
                  n = e.which,
                  i = t.is(f.input),
                  o = t.is(f.checkbox),
                  a = 0 < t.closest(f.uiDropdown).length,
                  r = 13;
              n == 27 && (h.verbose("Escape key pressed blurring field"), t.blur()), e.ctrlKey || n != r || !i || a || o || (y || (t.one("keyup" + g, h.event.field.keyup), h.submit(), h.debug("Enter pressed on input submitting form")), y = !0);
            },
            keyup: function keyup() {
              y = !1;
            },
            blur: function blur(e) {
              var t = q(this),
                  n = t.closest(c),
                  i = h.get.validation(t);
              n.hasClass(m.error) ? (h.debug("Revalidating field", t, i), i && h.validate.field(i)) : "blur" == d.on && i && h.validate.field(i);
            },
            change: function change(e) {
              var t = q(this),
                  n = t.closest(c),
                  i = h.get.validation(t);
              i && ("change" == d.on || n.hasClass(m.error) && d.revalidate) && (clearTimeout(h.timer), h.timer = setTimeout(function () {
                h.debug("Revalidating field", t, h.get.validation(t)), h.validate.field(i);
              }, d.delay));
            }
          }
        },
        get: {
          ancillaryValue: function ancillaryValue(e) {
            return !(!e.type || !e.value && !h.is.bracketedRule(e)) && (e.value !== j ? e.value : e.type.match(d.regExp.bracket)[1] + "");
          },
          ruleName: function ruleName(e) {
            return h.is.bracketedRule(e) ? e.type.replace(e.type.match(d.regExp.bracket)[0], "") : e.type;
          },
          changeEvent: function changeEvent(e, t) {
            return "checkbox" == e || "radio" == e || "hidden" == e || t.is("select") ? "change" : h.get.inputEvent();
          },
          inputEvent: function inputEvent() {
            return O.createElement("input").oninput !== j ? "input" : O.createElement("input").onpropertychange !== j ? "propertychange" : "keyup";
          },
          fieldsFromShorthand: function fieldsFromShorthand(e) {
            var i = {};
            return q.each(e, function (n, e) {
              "string" == typeof e && (e = [e]), i[n] = {
                rules: []
              }, q.each(e, function (e, t) {
                i[n].rules.push({
                  type: t
                });
              });
            }), i;
          },
          prompt: function prompt(e, t) {
            var n,
                i,
                o = h.get.ruleName(e),
                a = h.get.ancillaryValue(e),
                r = h.get.field(t.identifier),
                s = r.val(),
                c = q.isFunction(e.prompt) ? e.prompt(s) : e.prompt || d.prompt[o] || d.text.unspecifiedRule,
                l = -1 !== c.search("{value}"),
                u = -1 !== c.search("{name}");
            return l && (c = c.replace("{value}", r.val())), u && (i = 1 == (n = r.closest(f.group).find("label").eq(0)).length ? n.text() : r.prop("placeholder") || d.text.unspecifiedField, c = c.replace("{name}", i)), c = (c = c.replace("{identifier}", t.identifier)).replace("{ruleValue}", a), e.prompt || h.verbose("Using default validation prompt for type", c, o), c;
          },
          settings: function settings() {
            if (q.isPlainObject(x)) {
              var e = Object.keys(x);
              0 < e.length && x[e[0]].identifier !== j && x[e[0]].rules !== j ? (d = q.extend(!0, {}, q.fn.form.settings, R), l = q.extend({}, q.fn.form.settings.defaults, x), h.error(d.error.oldSyntax, b), h.verbose("Extending settings from legacy parameters", l, d)) : (x.fields && h.is.shorthandFields(x.fields) && (x.fields = h.get.fieldsFromShorthand(x.fields)), d = q.extend(!0, {}, q.fn.form.settings, x), l = q.extend({}, q.fn.form.settings.defaults, d.fields), h.verbose("Extending settings", l, d));
            } else d = q.fn.form.settings, l = q.fn.form.settings.defaults, h.verbose("Using default form validation", l, d);

            o = d.namespace, u = d.metadata, f = d.selector, m = d.className, i = d.regExp, s = d.error, a = "module-" + o, g = "." + o, p = r.data(a), h.refresh();
          },
          field: function field(e) {
            return h.verbose("Finding field with identifier", e), e = h.escape.string(e), 0 < n.filter("#" + e).length ? n.filter("#" + e) : 0 < n.filter('[name="' + e + '"]').length ? n.filter('[name="' + e + '"]') : 0 < n.filter('[name="' + e + '[]"]').length ? n.filter('[name="' + e + '[]"]') : 0 < n.filter("[data-" + u.validate + '="' + e + '"]').length ? n.filter("[data-" + u.validate + '="' + e + '"]') : q("<input/>");
          },
          fields: function fields(e) {
            var n = q();
            return q.each(e, function (e, t) {
              n = n.add(h.get.field(t));
            }), n;
          },
          validation: function validation(n) {
            var i, o;
            return !!l && (q.each(l, function (e, t) {
              o = t.identifier || e, h.get.field(o)[0] == n[0] && (t.identifier = o, i = t);
            }), i || !1);
          },
          value: function value(e) {
            var t = [];
            return t.push(e), h.get.values.call(b, t)[e];
          },
          values: function values(e) {
            var t = q.isArray(e) ? h.get.fields(e) : n,
                l = {};
            return t.each(function (e, t) {
              var n = q(t),
                  i = (n.prop("type"), n.prop("name")),
                  o = n.val(),
                  a = n.is(f.checkbox),
                  r = n.is(f.radio),
                  s = -1 !== i.indexOf("[]"),
                  c = !!a && n.is(":checked");
              i && (s ? (i = i.replace("[]", ""), l[i] || (l[i] = []), a ? c ? l[i].push(o || !0) : l[i].push(!1) : l[i].push(o)) : r ? l[i] !== j && 0 != l[i] || (l[i] = !!c && (o || !0)) : l[i] = a ? !!c && (o || !0) : o);
            }), l;
          }
        },
        has: {
          field: function field(e) {
            return h.verbose("Checking for existence of a field with identifier", e), "string" != typeof (e = h.escape.string(e)) && h.error(s.identifier, e), 0 < n.filter("#" + e).length || 0 < n.filter('[name="' + e + '"]').length || 0 < n.filter("[data-" + u.validate + '="' + e + '"]').length;
          }
        },
        escape: {
          string: function string(e) {
            return (e = String(e)).replace(i.escape, "\\$&");
          }
        },
        add: {
          rule: function rule(e, t) {
            h.add.field(e, t);
          },
          field: function field(n, e) {
            var i = {};
            h.is.shorthandRules(e) ? (e = q.isArray(e) ? e : [e], i[n] = {
              rules: []
            }, q.each(e, function (e, t) {
              i[n].rules.push({
                type: t
              });
            })) : i[n] = e, l = q.extend({}, l, i), h.debug("Adding rules", i, l);
          },
          fields: function fields(e) {
            var t;
            t = e && h.is.shorthandFields(e) ? h.get.fieldsFromShorthand(e) : e, l = q.extend({}, l, t);
          },
          prompt: function prompt(e, t) {
            var n = h.get.field(e).closest(c),
                i = n.children(f.prompt),
                o = 0 !== i.length;
            t = "string" == typeof t ? [t] : t, h.verbose("Adding field error state", e), n.addClass(m.error), d.inline && (o || (i = d.templates.prompt(t)).appendTo(n), i.html(t[0]), o ? h.verbose("Inline errors are disabled, no inline error added", e) : d.transition && q.fn.transition !== j && r.transition("is supported") ? (h.verbose("Displaying error with css transition", d.transition), i.transition(d.transition + " in", d.duration)) : (h.verbose("Displaying error with fallback javascript animation"), i.fadeIn(d.duration)));
          },
          errors: function errors(e) {
            h.debug("Adding form error messages", e), h.set.error(), t.html(d.templates.error(e));
          }
        },
        remove: {
          rule: function rule(n, e) {
            var i = q.isArray(e) ? e : [e];
            if (e == j) return h.debug("Removed all rules"), void (l[n].rules = []);
            l[n] != j && q.isArray(l[n].rules) && q.each(l[n].rules, function (e, t) {
              -1 !== i.indexOf(t.type) && (h.debug("Removed rule", t.type), l[n].rules.splice(e, 1));
            });
          },
          field: function field(e) {
            var t = q.isArray(e) ? e : [e];
            q.each(t, function (e, t) {
              h.remove.rule(t);
            });
          },
          rules: function rules(e, n) {
            q.isArray(e) ? q.each(fields, function (e, t) {
              h.remove.rule(t, n);
            }) : h.remove.rule(e, n);
          },
          fields: function fields(e) {
            h.remove.field(e);
          },
          prompt: function prompt(e) {
            var t = h.get.field(e).closest(c),
                n = t.children(f.prompt);
            t.removeClass(m.error), d.inline && n.is(":visible") && (h.verbose("Removing prompt for field", e), d.transition && q.fn.transition !== j && r.transition("is supported") ? n.transition(d.transition + " out", d.duration, function () {
              n.remove();
            }) : n.fadeOut(d.duration, function () {
              n.remove();
            }));
          }
        },
        set: {
          success: function success() {
            r.removeClass(m.error).addClass(m.success);
          },
          defaults: function defaults() {
            n.each(function () {
              var e = q(this),
                  t = 0 < e.filter(f.checkbox).length ? e.is(":checked") : e.val();
              e.data(u.defaultValue, t);
            });
          },
          error: function error() {
            r.removeClass(m.success).addClass(m.error);
          },
          value: function value(e, t) {
            var n = {};
            return n[e] = t, h.set.values.call(b, n);
          },
          values: function values(e) {
            q.isEmptyObject(e) || q.each(e, function (e, t) {
              var n,
                  i = h.get.field(e),
                  o = i.parent(),
                  a = q.isArray(t),
                  r = o.is(f.uiCheckbox),
                  s = o.is(f.uiDropdown),
                  c = i.is(f.radio) && r;
              0 < i.length && (a && r ? (h.verbose("Selecting multiple", t, i), o.checkbox("uncheck"), q.each(t, function (e, t) {
                n = i.filter('[value="' + t + '"]'), o = n.parent(), 0 < n.length && o.checkbox("check");
              })) : c ? (h.verbose("Selecting radio value", t, i), i.filter('[value="' + t + '"]').parent(f.uiCheckbox).checkbox("check")) : r ? (h.verbose("Setting checkbox value", t, o), !0 === t ? o.checkbox("check") : o.checkbox("uncheck")) : s ? (h.verbose("Setting dropdown value", t, o), o.dropdown("set selected", t)) : (h.verbose("Setting field value", t, i), i.val(t)));
            });
          }
        },
        validate: {
          form: function form(e, t) {
            var n = h.get.values();
            if (y) return !1;

            if (v = [], h.determine.isValid()) {
              if (h.debug("Form has no validation errors, submitting"), h.set.success(), !0 !== t) return d.onSuccess.call(b, e, n);
            } else if (h.debug("Form has errors"), h.set.error(), d.inline || h.add.errors(v), r.data("moduleApi") !== j && e.stopImmediatePropagation(), !0 !== t) return d.onFailure.call(b, v, n);
          },
          field: function field(n, e, t) {
            t = t === j || t, "string" == typeof n && (h.verbose("Validating field", n), n = l[e = n]);
            var i = n.identifier || e,
                o = h.get.field(i),
                a = !!n.depends && h.get.field(n.depends),
                r = !0,
                s = [];
            return n.identifier || (h.debug("Using field name as identifier", i), n.identifier = i), o.prop("disabled") ? (h.debug("Field is disabled. Skipping", i), r = !0) : n.optional && h.is.blank(o) ? (h.debug("Field is optional and blank. Skipping", i), r = !0) : n.depends && h.is.empty(a) ? (h.debug("Field depends on another value that is not present or empty. Skipping", a), r = !0) : n.rules !== j && q.each(n.rules, function (e, t) {
              h.has.field(i) && !h.validate.rule(n, t) && (h.debug("Field is invalid", i, t.type), s.push(h.get.prompt(t, n)), r = !1);
            }), r ? (t && (h.remove.prompt(i, s), d.onValid.call(o)), !0) : (t && (v = v.concat(s), h.add.prompt(i, s), d.onInvalid.call(o, s)), !1);
          },
          rule: function rule(e, t) {
            var n = h.get.field(e.identifier),
                i = (t.type, n.val()),
                o = h.get.ancillaryValue(t),
                a = h.get.ruleName(t),
                r = d.rules[a];
            if (q.isFunction(r)) return i = i === j || "" === i || null === i ? "" : q.trim(i + ""), r.call(n, i, o);
            h.error(s.noRule, a);
          }
        },
        setting: function setting(e, t) {
          if (q.isPlainObject(e)) q.extend(!0, d, e);else {
            if (t === j) return d[e];
            d[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (q.isPlainObject(e)) q.extend(!0, h, e);else {
            if (t === j) return h[e];
            h[e] = t;
          }
        },
        debug: function debug() {
          !d.silent && d.debug && (d.performance ? h.performance.log(arguments) : (h.debug = Function.prototype.bind.call(console.info, console, d.name + ":"), h.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !d.silent && d.verbose && d.debug && (d.performance ? h.performance.log(arguments) : (h.verbose = Function.prototype.bind.call(console.info, console, d.name + ":"), h.verbose.apply(console, arguments)));
        },
        error: function error() {
          d.silent || (h.error = Function.prototype.bind.call(console.error, console, d.name + ":"), h.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var t, n;
            d.performance && (n = (t = new Date().getTime()) - (T || t), T = t, S.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: b,
              "Execution Time": n
            })), clearTimeout(h.performance.timer), h.performance.timer = setTimeout(h.performance.display, 500);
          },
          display: function display() {
            var e = d.name + ":",
                n = 0;
            T = !1, clearTimeout(h.performance.timer), q.each(S, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", k && (e += " '" + k + "'"), 1 < w.length && (e += " (" + w.length + ")"), (console.group !== j || console.table !== j) && 0 < S.length && (console.groupCollapsed(e), console.table ? console.table(S) : q.each(S, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), S = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              a,
              n,
              r = p;
          return e = e || E, t = b || t, "string" == typeof i && r !== j && (i = i.split(/[\. ]/), o = i.length - 1, q.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (q.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== j) return a = r[n], !1;
              if (!q.isPlainObject(r[t]) || e == o) return r[t] !== j && (a = r[t]), !1;
              r = r[t];
            }
          })), q.isFunction(a) ? n = a.apply(t, e) : a !== j && (n = a), q.isArray(C) ? C.push(n) : C !== j ? C = [C, n] : n !== j && (C = n), a;
        }
      }).initialize();
    }), C !== j ? C : this;
  }, q.fn.form.settings = {
    name: "Form",
    namespace: "form",
    debug: !1,
    verbose: !1,
    performance: !0,
    fields: !1,
    keyboardShortcuts: !0,
    on: "submit",
    inline: !1,
    delay: 200,
    revalidate: !0,
    transition: "scale",
    duration: 200,
    onValid: function onValid() {},
    onInvalid: function onInvalid() {},
    onSuccess: function onSuccess() {
      return !0;
    },
    onFailure: function onFailure() {
      return !1;
    },
    metadata: {
      defaultValue: "default",
      validate: "validate"
    },
    regExp: {
      htmlID: /^[a-zA-Z][\w:.-]*$/g,
      bracket: /\[(.*)\]/i,
      decimal: /^\d+\.?\d*$/,
      email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
      escape: /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
      flags: /^\/(.*)\/(.*)?/,
      integer: /^\-?\d+$/,
      number: /^\-?\d*(\.\d+)?$/,
      url: /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i
    },
    text: {
      unspecifiedRule: "Please enter a valid value",
      unspecifiedField: "This field"
    },
    prompt: {
      empty: "{name} must have a value",
      checked: "{name} must be checked",
      email: "{name} must be a valid e-mail",
      url: "{name} must be a valid url",
      regExp: "{name} is not formatted correctly",
      integer: "{name} must be an integer",
      decimal: "{name} must be a decimal number",
      number: "{name} must be set to a number",
      is: '{name} must be "{ruleValue}"',
      isExactly: '{name} must be exactly "{ruleValue}"',
      not: '{name} cannot be set to "{ruleValue}"',
      notExactly: '{name} cannot be set to exactly "{ruleValue}"',
      contain: '{name} must contain "{ruleValue}"',
      containExactly: '{name} must contain exactly "{ruleValue}"',
      doesntContain: '{name} cannot contain  "{ruleValue}"',
      doesntContainExactly: '{name} cannot contain exactly "{ruleValue}"',
      minLength: "{name} must be at least {ruleValue} characters",
      length: "{name} must be at least {ruleValue} characters",
      exactLength: "{name} must be exactly {ruleValue} characters",
      maxLength: "{name} cannot be longer than {ruleValue} characters",
      match: "{name} must match {ruleValue} field",
      different: "{name} must have a different value than {ruleValue} field",
      creditCard: "{name} must be a valid credit card number",
      minCount: "{name} must have at least {ruleValue} choices",
      exactCount: "{name} must have exactly {ruleValue} choices",
      maxCount: "{name} must have {ruleValue} or less choices"
    },
    selector: {
      checkbox: 'input[type="checkbox"], input[type="radio"]',
      clear: ".clear",
      field: "input, textarea, select",
      group: ".field",
      input: "input",
      message: ".error.message",
      prompt: ".prompt.label",
      radio: 'input[type="radio"]',
      reset: '.reset:not([type="reset"])',
      submit: '.submit:not([type="submit"])',
      uiCheckbox: ".ui.checkbox",
      uiDropdown: ".ui.dropdown"
    },
    className: {
      error: "error",
      label: "ui prompt label",
      pressed: "down",
      success: "success"
    },
    error: {
      identifier: "You must specify a string identifier for each field",
      method: "The method you called is not defined.",
      noRule: "There is no rule matching the one you specified",
      oldSyntax: "Starting in 2.0 forms now only take a single settings object. Validation settings converted to new syntax automatically."
    },
    templates: {
      error: function error(e) {
        var n = '<ul class="list">';
        return q.each(e, function (e, t) {
          n += "<li>" + t + "</li>";
        }), q(n += "</ul>");
      },
      prompt: function prompt(e) {
        return q("<div/>").addClass("ui basic red pointing prompt label").html(e[0]);
      }
    },
    rules: {
      empty: function empty(e) {
        return !(e === j || "" === e || q.isArray(e) && 0 === e.length);
      },
      checked: function checked() {
        return 0 < q(this).filter(":checked").length;
      },
      email: function email(e) {
        return q.fn.form.settings.regExp.email.test(e);
      },
      url: function url(e) {
        return q.fn.form.settings.regExp.url.test(e);
      },
      regExp: function regExp(e, t) {
        if (t instanceof RegExp) return e.match(t);
        var n,
            i = t.match(q.fn.form.settings.regExp.flags);
        return i && (t = 2 <= i.length ? i[1] : t, n = 3 <= i.length ? i[2] : ""), e.match(new RegExp(t, n));
      },
      integer: function integer(e, t) {
        var n,
            i,
            o,
            a = q.fn.form.settings.regExp.integer;
        return t && -1 === ["", ".."].indexOf(t) && (-1 == t.indexOf("..") ? a.test(t) && (n = i = t - 0) : (o = t.split("..", 2), a.test(o[0]) && (n = o[0] - 0), a.test(o[1]) && (i = o[1] - 0))), a.test(e) && (n === j || n <= e) && (i === j || e <= i);
      },
      decimal: function decimal(e) {
        return q.fn.form.settings.regExp.decimal.test(e);
      },
      number: function number(e) {
        return q.fn.form.settings.regExp.number.test(e);
      },
      is: function is(e, t) {
        return t = "string" == typeof t ? t.toLowerCase() : t, (e = "string" == typeof e ? e.toLowerCase() : e) == t;
      },
      isExactly: function isExactly(e, t) {
        return e == t;
      },
      not: function not(e, t) {
        return (e = "string" == typeof e ? e.toLowerCase() : e) != (t = "string" == typeof t ? t.toLowerCase() : t);
      },
      notExactly: function notExactly(e, t) {
        return e != t;
      },
      contains: function contains(e, t) {
        return t = t.replace(q.fn.form.settings.regExp.escape, "\\$&"), -1 !== e.search(new RegExp(t, "i"));
      },
      containsExactly: function containsExactly(e, t) {
        return t = t.replace(q.fn.form.settings.regExp.escape, "\\$&"), -1 !== e.search(new RegExp(t));
      },
      doesntContain: function doesntContain(e, t) {
        return t = t.replace(q.fn.form.settings.regExp.escape, "\\$&"), -1 === e.search(new RegExp(t, "i"));
      },
      doesntContainExactly: function doesntContainExactly(e, t) {
        return t = t.replace(q.fn.form.settings.regExp.escape, "\\$&"), -1 === e.search(new RegExp(t));
      },
      minLength: function minLength(e, t) {
        return e !== j && e.length >= t;
      },
      length: function length(e, t) {
        return e !== j && e.length >= t;
      },
      exactLength: function exactLength(e, t) {
        return e !== j && e.length == t;
      },
      maxLength: function maxLength(e, t) {
        return e !== j && e.length <= t;
      },
      match: function match(e, t) {
        var n;
        q(this);
        return 0 < q('[data-validate="' + t + '"]').length ? n = q('[data-validate="' + t + '"]').val() : 0 < q("#" + t).length ? n = q("#" + t).val() : 0 < q('[name="' + t + '"]').length ? n = q('[name="' + t + '"]').val() : 0 < q('[name="' + t + '[]"]').length && (n = q('[name="' + t + '[]"]')), n !== j && e.toString() == n.toString();
      },
      different: function different(e, t) {
        var n;
        q(this);
        return 0 < q('[data-validate="' + t + '"]').length ? n = q('[data-validate="' + t + '"]').val() : 0 < q("#" + t).length ? n = q("#" + t).val() : 0 < q('[name="' + t + '"]').length ? n = q('[name="' + t + '"]').val() : 0 < q('[name="' + t + '[]"]').length && (n = q('[name="' + t + '[]"]')), n !== j && e.toString() !== n.toString();
      },
      creditCard: function creditCard(n, e) {
        var t,
            i,
            o = {
          visa: {
            pattern: /^4/,
            length: [16]
          },
          amex: {
            pattern: /^3[47]/,
            length: [15]
          },
          mastercard: {
            pattern: /^5[1-5]/,
            length: [16]
          },
          discover: {
            pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
            length: [16]
          },
          unionPay: {
            pattern: /^(62|88)/,
            length: [16, 17, 18, 19]
          },
          jcb: {
            pattern: /^35(2[89]|[3-8][0-9])/,
            length: [16]
          },
          maestro: {
            pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
            length: [12, 13, 14, 15, 16, 17, 18, 19]
          },
          dinersClub: {
            pattern: /^(30[0-5]|^36)/,
            length: [14]
          },
          laser: {
            pattern: /^(6304|670[69]|6771)/,
            length: [16, 17, 18, 19]
          },
          visaElectron: {
            pattern: /^(4026|417500|4508|4844|491(3|7))/,
            length: [16]
          }
        },
            a = {},
            r = !1,
            s = "string" == typeof e && e.split(",");

        if ("string" == typeof n && 0 !== n.length) {
          if (n = n.replace(/[\-]/g, ""), s && (q.each(s, function (e, t) {
            (i = o[t]) && (a = {
              length: -1 !== q.inArray(n.length, i.length),
              pattern: -1 !== n.search(i.pattern)
            }).length && a.pattern && (r = !0);
          }), !r)) return !1;
          if ((t = {
            number: -1 !== q.inArray(n.length, o.unionPay.length),
            pattern: -1 !== n.search(o.unionPay.pattern)
          }).number && t.pattern) return !0;

          for (var c = n.length, l = 0, u = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]], d = 0; c--;) {
            d += u[l][parseInt(n.charAt(c), 10)], l ^= 1;
          }

          return d % 10 == 0 && 0 < d;
        }
      },
      minCount: function minCount(e, t) {
        return 0 == t || (1 == t ? "" !== e : e.split(",").length >= t);
      },
      exactCount: function exactCount(e, t) {
        return 0 == t ? "" === e : 1 == t ? "" !== e && -1 === e.search(",") : e.split(",").length == t;
      },
      maxCount: function maxCount(e, t) {
        return 0 != t && (1 == t ? -1 === e.search(",") : e.split(",").length <= t);
      }
    }
  };
}(jQuery, window, document), function (E, q, O, j) {
  "use strict";

  q = void 0 !== q && q.Math == Math ? q : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), E.fn.tab = function (r) {
    var l,
        u = E.isFunction(this) ? E(q) : E(this),
        d = u.selector || "",
        f = new Date().getTime(),
        m = [],
        g = r,
        A = "string" == typeof g,
        R = [].slice.call(arguments, 1),
        F = !1;
    return u.each(function () {
      var p,
          a,
          h,
          b,
          v,
          y,
          x = E.isPlainObject(r) ? E.extend(!0, {}, E.fn.tab.settings, r) : E.extend({}, E.fn.tab.settings),
          C = x.className,
          w = x.metadata,
          t = x.selector,
          k = x.error,
          e = "." + x.namespace,
          n = "module-" + x.namespace,
          T = E(this),
          i = {},
          S = !0,
          o = 0,
          s = this,
          c = T.data(n);
      v = {
        initialize: function initialize() {
          v.debug("Initializing tab menu item", T), v.fix.callbacks(), v.determineTabs(), v.debug("Determining tabs", x.context, a), x.auto && v.set.auto(), v.bind.events(), x.history && !F && (v.initializeHistory(), F = !0), v.instantiate();
        },
        instantiate: function instantiate() {
          v.verbose("Storing instance of module", v), c = v, T.data(n, v);
        },
        destroy: function destroy() {
          v.debug("Destroying tabs", T), T.removeData(n).off(e);
        },
        bind: {
          events: function events() {
            E.isWindow(s) || (v.debug("Attaching tab activation events to element", T), T.on("click" + e, v.event.click));
          }
        },
        determineTabs: function determineTabs() {
          var e;
          "parent" === x.context ? (0 < T.closest(t.ui).length ? (e = T.closest(t.ui), v.verbose("Using closest UI element as parent", e)) : e = T, p = e.parent(), v.verbose("Determined parent element for creating context", p)) : x.context ? (p = E(x.context), v.verbose("Using selector for tab context", x.context, p)) : p = E("body"), x.childrenOnly ? (a = p.children(t.tabs), v.debug("Searching tab context children for tabs", p, a)) : (a = p.find(t.tabs), v.debug("Searching tab context for tabs", p, a));
        },
        fix: {
          callbacks: function callbacks() {
            E.isPlainObject(r) && (r.onTabLoad || r.onTabInit) && (r.onTabLoad && (r.onLoad = r.onTabLoad, delete r.onTabLoad, v.error(k.legacyLoad, r.onLoad)), r.onTabInit && (r.onFirstLoad = r.onTabInit, delete r.onTabInit, v.error(k.legacyInit, r.onFirstLoad)), x = E.extend(!0, {}, E.fn.tab.settings, r));
          }
        },
        initializeHistory: function initializeHistory() {
          if (v.debug("Initializing page state"), E.address === j) return v.error(k.state), !1;

          if ("state" == x.historyType) {
            if (v.debug("Using HTML5 to manage state"), !1 === x.path) return v.error(k.path), !1;
            E.address.history(!0).state(x.path);
          }

          E.address.bind("change", v.event.history.change);
        },
        event: {
          click: function click(e) {
            var t = E(this).data(w.tab);
            t !== j ? (x.history ? (v.verbose("Updating page state", e), E.address.value(t)) : (v.verbose("Changing tab", e), v.changeTab(t)), e.preventDefault()) : v.debug("No tab specified");
          },
          history: {
            change: function change(e) {
              var t = e.pathNames.join("/") || v.get.initialPath(),
                  n = x.templates.determineTitle(t) || !1;
              v.performance.display(), v.debug("History change event", t, e), y = e, t !== j && v.changeTab(t), n && E.address.title(n);
            }
          }
        },
        refresh: function refresh() {
          h && (v.debug("Refreshing tab", h), v.changeTab(h));
        },
        cache: {
          read: function read(e) {
            return e !== j && i[e];
          },
          add: function add(e, t) {
            e = e || h, v.debug("Adding cached content for", e), i[e] = t;
          },
          remove: function remove(e) {
            e = e || h, v.debug("Removing cached content for", e), delete i[e];
          }
        },
        set: {
          auto: function auto() {
            var e = "string" == typeof x.path ? x.path.replace(/\/$/, "") + "/{$tab}" : "/{$tab}";
            v.verbose("Setting up automatic tab retrieval from server", e), E.isPlainObject(x.apiSettings) ? x.apiSettings.url = e : x.apiSettings = {
              url: e
            };
          },
          loading: function loading(e) {
            var t = v.get.tabElement(e);
            t.hasClass(C.loading) || (v.verbose("Setting loading state for", t), t.addClass(C.loading).siblings(a).removeClass(C.active + " " + C.loading), 0 < t.length && x.onRequest.call(t[0], e));
          },
          state: function state(e) {
            E.address.value(e);
          }
        },
        changeTab: function changeTab(d) {
          var f = q.history && q.history.pushState && x.ignoreFirstLoad && S,
              m = x.auto || E.isPlainObject(x.apiSettings),
              g = m && !f ? v.utilities.pathToArray(d) : v.get.defaultPathArray(d);
          d = v.utilities.arrayToPath(g), E.each(g, function (e, t) {
            var n,
                i,
                o,
                a,
                r = g.slice(0, e + 1),
                s = v.utilities.arrayToPath(r),
                c = v.is.tab(s),
                l = e + 1 == g.length,
                u = v.get.tabElement(s);

            if (v.verbose("Looking for tab", t), c) {
              if (v.verbose("Tab was found", t), h = s, b = v.utilities.filterArray(g, r), l ? a = !0 : (i = g.slice(0, e + 2), o = v.utilities.arrayToPath(i), (a = !v.is.tab(o)) && v.verbose("Tab parameters found", i)), a && m) return f ? (v.debug("Ignoring remote content on first tab load", s), S = !1, v.cache.add(d, u.html()), v.activate.all(s), x.onFirstLoad.call(u[0], s, b, y), x.onLoad.call(u[0], s, b, y)) : (v.activate.navigation(s), v.fetch.content(s, d)), !1;
              v.debug("Opened local tab", s), v.activate.all(s), v.cache.read(s) || (v.cache.add(s, !0), v.debug("First time tab loaded calling tab init"), x.onFirstLoad.call(u[0], s, b, y)), x.onLoad.call(u[0], s, b, y);
            } else {
              if (-1 != d.search("/") || "" === d) return v.error(k.missingTab, T, p, s), !1;
              if (s = (n = E("#" + d + ', a[name="' + d + '"]')).closest("[data-tab]").data(w.tab), u = v.get.tabElement(s), n && 0 < n.length && s) return v.debug("Anchor link used, opening parent tab", u, n), u.hasClass(C.active) || setTimeout(function () {
                v.scrollTo(n);
              }, 0), v.activate.all(s), v.cache.read(s) || (v.cache.add(s, !0), v.debug("First time tab loaded calling tab init"), x.onFirstLoad.call(u[0], s, b, y)), x.onLoad.call(u[0], s, b, y), !1;
            }
          });
        },
        scrollTo: function scrollTo(e) {
          var t = !!(e && 0 < e.length) && e.offset().top;
          !1 !== t && (v.debug("Forcing scroll to an in-page link in a hidden tab", t, e), E(O).scrollTop(t));
        },
        update: {
          content: function content(e, t, n) {
            var i = v.get.tabElement(e),
                o = i[0];
            n = n !== j ? n : x.evaluateScripts, "string" == typeof x.cacheType && "dom" == x.cacheType.toLowerCase() && "string" != typeof t ? i.empty().append(E(t).clone(!0)) : n ? (v.debug("Updating HTML and evaluating inline scripts", e, t), i.html(t)) : (v.debug("Updating HTML", e, t), o.innerHTML = t);
          }
        },
        fetch: {
          content: function content(t, n) {
            var e,
                i,
                o = v.get.tabElement(t),
                a = {
              dataType: "html",
              encodeParameters: !1,
              on: "now",
              cache: x.alwaysRefresh,
              headers: {
                "X-Remote": !0
              },
              onSuccess: function onSuccess(e) {
                "response" == x.cacheType && v.cache.add(n, e), v.update.content(t, e), t == h ? (v.debug("Content loaded", t), v.activate.tab(t)) : v.debug("Content loaded in background", t), x.onFirstLoad.call(o[0], t, b, y), x.onLoad.call(o[0], t, b, y), x.loadOnce ? v.cache.add(n, !0) : "string" == typeof x.cacheType && "dom" == x.cacheType.toLowerCase() && 0 < o.children().length ? setTimeout(function () {
                  var e = o.children().clone(!0);
                  e = e.not("script"), v.cache.add(n, e);
                }, 0) : v.cache.add(n, o.html());
              },
              urlData: {
                tab: n
              }
            },
                r = o.api("get request") || !1,
                s = r && "pending" === r.state();
            n = n || t, i = v.cache.read(n), x.cache && i ? (v.activate.tab(t), v.debug("Adding cached content", n), x.loadOnce || ("once" == x.evaluateScripts ? v.update.content(t, i, !1) : v.update.content(t, i)), x.onLoad.call(o[0], t, b, y)) : s ? (v.set.loading(t), v.debug("Content is already loading", n)) : E.api !== j ? (e = E.extend(!0, {}, x.apiSettings, a), v.debug("Retrieving remote content", n, e), v.set.loading(t), o.api(e)) : v.error(k.api);
          }
        },
        activate: {
          all: function all(e) {
            v.activate.tab(e), v.activate.navigation(e);
          },
          tab: function tab(e) {
            var t = v.get.tabElement(e),
                n = "siblings" == x.deactivate ? t.siblings(a) : a.not(t),
                i = t.hasClass(C.active);
            v.verbose("Showing tab content for", t), i || (t.addClass(C.active), n.removeClass(C.active + " " + C.loading), 0 < t.length && x.onVisible.call(t[0], e));
          },
          navigation: function navigation(e) {
            var t = v.get.navElement(e),
                n = "siblings" == x.deactivate ? t.siblings(u) : u.not(t),
                i = t.hasClass(C.active);
            v.verbose("Activating tab navigation for", t, e), i || (t.addClass(C.active), n.removeClass(C.active + " " + C.loading));
          }
        },
        deactivate: {
          all: function all() {
            v.deactivate.navigation(), v.deactivate.tabs();
          },
          navigation: function navigation() {
            u.removeClass(C.active);
          },
          tabs: function tabs() {
            a.removeClass(C.active + " " + C.loading);
          }
        },
        is: {
          tab: function tab(e) {
            return e !== j && 0 < v.get.tabElement(e).length;
          }
        },
        get: {
          initialPath: function initialPath() {
            return u.eq(0).data(w.tab) || a.eq(0).data(w.tab);
          },
          path: function path() {
            return E.address.value();
          },
          defaultPathArray: function defaultPathArray(e) {
            return v.utilities.pathToArray(v.get.defaultPath(e));
          },
          defaultPath: function defaultPath(e) {
            var t = u.filter("[data-" + w.tab + '^="' + e + '/"]').eq(0).data(w.tab) || !1;

            if (t) {
              if (v.debug("Found default tab", t), o < x.maxDepth) return o++, v.get.defaultPath(t);
              v.error(k.recursion);
            } else v.debug("No default tabs found for", e, a);

            return o = 0, e;
          },
          navElement: function navElement(e) {
            return e = e || h, u.filter("[data-" + w.tab + '="' + e + '"]');
          },
          tabElement: function tabElement(e) {
            var t, n, i, o;
            return e = e || h, i = v.utilities.pathToArray(e), o = v.utilities.last(i), t = a.filter("[data-" + w.tab + '="' + e + '"]'), n = a.filter("[data-" + w.tab + '="' + o + '"]'), 0 < t.length ? t : n;
          },
          tab: function tab() {
            return h;
          }
        },
        utilities: {
          filterArray: function filterArray(e, t) {
            return E.grep(e, function (e) {
              return -1 == E.inArray(e, t);
            });
          },
          last: function last(e) {
            return !!E.isArray(e) && e[e.length - 1];
          },
          pathToArray: function pathToArray(e) {
            return e === j && (e = h), "string" == typeof e ? e.split("/") : [e];
          },
          arrayToPath: function arrayToPath(e) {
            return !!E.isArray(e) && e.join("/");
          }
        },
        setting: function setting(e, t) {
          if (v.debug("Changing setting", e, t), E.isPlainObject(e)) E.extend(!0, x, e);else {
            if (t === j) return x[e];
            E.isPlainObject(x[e]) ? E.extend(!0, x[e], t) : x[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (E.isPlainObject(e)) E.extend(!0, v, e);else {
            if (t === j) return v[e];
            v[e] = t;
          }
        },
        debug: function debug() {
          !x.silent && x.debug && (x.performance ? v.performance.log(arguments) : (v.debug = Function.prototype.bind.call(console.info, console, x.name + ":"), v.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !x.silent && x.verbose && x.debug && (x.performance ? v.performance.log(arguments) : (v.verbose = Function.prototype.bind.call(console.info, console, x.name + ":"), v.verbose.apply(console, arguments)));
        },
        error: function error() {
          x.silent || (v.error = Function.prototype.bind.call(console.error, console, x.name + ":"), v.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var t, n;
            x.performance && (n = (t = new Date().getTime()) - (f || t), f = t, m.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: s,
              "Execution Time": n
            })), clearTimeout(v.performance.timer), v.performance.timer = setTimeout(v.performance.display, 500);
          },
          display: function display() {
            var e = x.name + ":",
                n = 0;
            f = !1, clearTimeout(v.performance.timer), E.each(m, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", d && (e += " '" + d + "'"), (console.group !== j || console.table !== j) && 0 < m.length && (console.groupCollapsed(e), console.table ? console.table(m) : E.each(m, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), m = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              a,
              n,
              r = c;
          return e = e || R, t = s || t, "string" == typeof i && r !== j && (i = i.split(/[\. ]/), o = i.length - 1, E.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (E.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== j) return a = r[n], !1;
              if (!E.isPlainObject(r[t]) || e == o) return r[t] !== j ? a = r[t] : v.error(k.method, i), !1;
              r = r[t];
            }
          })), E.isFunction(a) ? n = a.apply(t, e) : a !== j && (n = a), E.isArray(l) ? l.push(n) : l !== j ? l = [l, n] : n !== j && (l = n), a;
        }
      }, A ? (c === j && v.initialize(), v.invoke(g)) : (c !== j && c.invoke("destroy"), v.initialize());
    }), l !== j ? l : this;
  }, E.tab = function () {
    E(q).tab.apply(this, arguments);
  }, E.fn.tab.settings = {
    name: "Tab",
    namespace: "tab",
    silent: !1,
    debug: !1,
    verbose: !1,
    performance: !0,
    auto: !1,
    history: !1,
    historyType: "hash",
    path: !1,
    context: !1,
    childrenOnly: !1,
    maxDepth: 25,
    deactivate: "siblings",
    alwaysRefresh: !1,
    cache: !0,
    loadOnce: !1,
    cacheType: "response",
    ignoreFirstLoad: !1,
    apiSettings: !1,
    evaluateScripts: "once",
    onFirstLoad: function onFirstLoad(e, t, n) {},
    onLoad: function onLoad(e, t, n) {},
    onVisible: function onVisible(e, t, n) {},
    onRequest: function onRequest(e, t, n) {},
    templates: {
      determineTitle: function determineTitle(e) {}
    },
    error: {
      api: "You attempted to load content without API module",
      method: "The method you called is not defined",
      missingTab: "Activated tab cannot be found. Tabs are case-sensitive.",
      noContent: "The tab you specified is missing a content url.",
      path: "History enabled, but no path was specified",
      recursion: "Max recursive depth reached",
      legacyInit: "onTabInit has been renamed to onFirstLoad in 2.0, please adjust your code.",
      legacyLoad: "onTabLoad has been renamed to onLoad in 2.0. Please adjust your code",
      state: "History requires Asual's Address library <https://github.com/asual/jquery-address>"
    },
    metadata: {
      tab: "tab",
      loaded: "loaded",
      promise: "promise"
    },
    className: {
      loading: "loading",
      active: "active"
    },
    selector: {
      tabs: ".ui.tab",
      ui: ".ui"
    }
  };
}(jQuery, window, document);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ 0:
/*!***************************************************************************!*\
  !*** multi ./resources/js/index/main.js ./resources/sass/index/main.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/wangjue/Sites/workbition/resources/js/index/main.js */"./resources/js/index/main.js");
module.exports = __webpack_require__(/*! /Users/wangjue/Sites/workbition/resources/sass/index/main.scss */"./resources/sass/index/main.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);