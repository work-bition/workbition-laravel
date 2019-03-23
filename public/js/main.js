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
	"./auth.svg": "./resources/js/icons/svg/auth.svg",
	"./discussion.svg": "./resources/js/icons/svg/discussion.svg",
	"./favourite.svg": "./resources/js/icons/svg/favourite.svg",
	"./hot.svg": "./resources/js/icons/svg/hot.svg",
	"./login.svg": "./resources/js/icons/svg/login.svg",
	"./logo.svg": "./resources/js/icons/svg/logo.svg",
	"./register.svg": "./resources/js/icons/svg/register.svg",
	"./study.svg": "./resources/js/icons/svg/study.svg",
	"./sync.svg": "./resources/js/icons/svg/sync.svg",
	"./wechat-mini-program.svg": "./resources/js/icons/svg/wechat-mini-program.svg",
	"./wechat.svg": "./resources/js/icons/svg/wechat.svg",
	"./weibo.svg": "./resources/js/icons/svg/weibo.svg"
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

/***/ "./resources/js/icons/svg/auth.svg":
/*!*****************************************!*\
  !*** ./resources/js/icons/svg/auth.svg ***!
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
  "id": "icon-auth",
  "use": "icon-auth-usage",
  "viewBox": "0 0 136 163",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 136 163\" id=\"icon-auth\"><g fill=\"none\" fill-rule=\"evenodd\"><path d=\"M.574 23.751V94.38s-.515 21.2 25.262 45.812c-.442-.42 19.662 20.55 42.2 21.994 0 0 20.257.569 46.446-26.238 0 0 18.777-19.482 21.018-41.453 0-2.646-.036-70.743-.036-70.743s-20.006 1.9-44.175-9.732C91.171 13.964 78.487 8.53 68.02.185c0 0-14.96 11.48-31.073 17.192.048 0-15.32 6.743-36.372 6.374z\" fill=\"#2A6EA8\" /><path fill=\"#FFF\" d=\"M40.672 76.058L31.863 86.44l28.632 24.436 43.714-50.444-10.29-8.953-34.87 40.243z\" /></g></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

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

/***/ "./resources/js/icons/svg/favourite.svg":
/*!**********************************************!*\
  !*** ./resources/js/icons/svg/favourite.svg ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-baker-runtime/browser-symbol */ "./node_modules/svg-baker-runtime/browser-symbol.js");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-sprite-loader/runtime/browser-sprite.build */ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-favourite",
  "use": "icon-favourite-usage",
  "viewBox": "0 0 160 138",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 160 138\" id=\"icon-favourite\"><g fill=\"none\" fill-rule=\"evenodd\"><path d=\"M91.364 12.636L80 26.273 68.636 12.182C60.91 4.455 50.455.818 40.455.818 30 .818 19.545 4.91 11.818 12.636c-15.454 15-15.454 40 0 55.455L80 137.18l67.727-69.545c15.455-15.454 15.455-40 0-55.454C140 4.455 129.545.818 119.545.818S99.091 4.91 91.364 12.636z\" fill=\"#FFA064\" /><path d=\"M147.727 11.636C140 3.91 129.545.273 119.545.273S99.091 3.909 91.364 11.636L80 25.273c14.09 23.182 38.182 39.545 66.364 43.636l1.818-1.818c15-15.455 15-40.455-.455-55.455z\" fill=\"#FE8350\" /></g></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/icons/svg/hot.svg":
/*!****************************************!*\
  !*** ./resources/js/icons/svg/hot.svg ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-baker-runtime/browser-symbol */ "./node_modules/svg-baker-runtime/browser-symbol.js");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-sprite-loader/runtime/browser-sprite.build */ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-hot",
  "use": "icon-hot-usage",
  "viewBox": "0 0 1024 1024",
  "content": "<symbol class=\"icon\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-hot\"><defs><style></style></defs><path d=\"M728.154 555.135a30.113 30.113 0 0 0-51.795 9.335 224.345 224.345 0 0 1-38.545 68.056 312.276 312.276 0 0 0 1.806-33.727 381.235 381.235 0 0 0-2.71-41.857 308.963 308.963 0 0 0-23.187-81.005 34.33 34.33 0 0 0-3.915-8.432 301.134 301.134 0 0 0-110.516-127.078 30.113 30.113 0 0 0-30.113 0 30.113 30.113 0 0 0-15.96 26.198 207.481 207.481 0 0 1-21.983 90.34 201.458 201.458 0 0 1-76.79 82.812 271.02 271.02 0 0 0-85.521 79.8 264.094 264.094 0 0 0-42.761 144.244 259.577 259.577 0 0 0 30.113 124.669 266.804 266.804 0 0 0 94.255 99.675 30.113 30.113 0 0 0 33.727 0 30.113 30.113 0 0 0 11.443-31.619 267.106 267.106 0 0 1-6.926-60.227 251.145 251.145 0 0 1 17.466-92.749 236.089 236.089 0 0 1 18.068-38.545l1.807 4.216a470.973 470.973 0 0 0 199.35 221.032 207.18 207.18 0 0 0 19.875 10.54l3.312 1.807a30.113 30.113 0 0 0 32.222-3.915 316.793 316.793 0 0 0 107.504-167.13 341.787 341.787 0 0 0 9.938-78.595 315.287 315.287 0 0 0-70.164-197.845z\" fill=\"#FFC824\" /><path d=\"M281.572 371.142a30.113 30.113 0 0 1-25.295-13.55 30.113 30.113 0 0 1 8.733-41.557l12.648-8.13a30.113 30.113 0 0 1 30.113 51.794l-8.733 6.625a30.113 30.113 0 0 1-17.466 4.818z\" fill=\"#6B400D\" /><path d=\"M707.074 1024a32.221 32.221 0 0 1-10.54-1.807 412.252 412.252 0 0 1-70.465-32.823 470.973 470.973 0 0 1-199.35-221.032l-1.807-4.216a236.089 236.089 0 0 0-18.068 38.545 256.265 256.265 0 0 0-3.915 175.26 30.113 30.113 0 0 1-6.926 30.113 30.113 30.113 0 0 1-30.113 8.13 391.474 391.474 0 0 1-231.572-190.015 391.474 391.474 0 0 1 17.165-396.292c5.721-9.034 12.045-17.766 18.369-25.897a30.113 30.113 0 0 1 47.579 36.738c-5.42 7.227-10.54 14.455-15.358 21.983a331.247 331.247 0 0 0-14.755 335.463 331.247 331.247 0 0 0 144.544 140.328 337.27 337.27 0 0 1-2.71-43.062 312.276 312.276 0 0 1 21.38-114.13 308.963 308.963 0 0 1 60.227-100.88 30.113 30.113 0 0 1 30.113-9.033 30.113 30.113 0 0 1 21.983 21.38 439.354 439.354 0 0 0 18.37 51.494A412.854 412.854 0 0 0 655.58 937.274a309.565 309.565 0 0 0 46.977 22.886A412.252 412.252 0 0 0 862.76 726.78a421.587 421.587 0 0 0 12.046-100.277 402.013 402.013 0 0 0-60.227-214.106 331.247 331.247 0 0 1-20.176 34.931 376.417 376.417 0 0 1-125.874 122.26c-9.937 5.722-19.574 10.841-30.113 15.66a30.113 30.113 0 0 1-33.727-5.722 30.113 30.113 0 0 1-4.517-33.727 389.366 389.366 0 0 0 30.113-156.89 481.814 481.814 0 0 0-3.312-54.807 402.013 402.013 0 0 0-30.114-105.698v-3.312l-1.806-3.313A389.366 389.366 0 0 0 493.269 86.571a396.894 396.894 0 0 1-37.641 114.732 30.113 30.113 0 0 1-53.602-27.102 338.775 338.775 0 0 0 35.233-143.942 30.113 30.113 0 0 1 46.675-25.295 451.7 451.7 0 0 1 164.42 189.714 50.892 50.892 0 0 1 5.118 10.84 458.024 458.024 0 0 1 34.33 120.454 556.194 556.194 0 0 1 2.71 62.937 466.757 466.757 0 0 1-10.54 98.17 319.503 319.503 0 0 0 62.937-72.272 307.156 307.156 0 0 0 37.943-73.477 30.113 30.113 0 0 1 50.892-9.937A470.07 470.07 0 0 1 935.634 625.9a481.814 481.814 0 0 1-13.851 114.732 471.876 471.876 0 0 1-198.146 277.947 30.113 30.113 0 0 1-16.563 5.42zM597.763 227.2zm-2.108-3.914z\" fill=\"#333\" /></symbol>"
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
  "viewBox": "0 0 135 38",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 135 38\" id=\"icon-logo\"><g fill=\"none\" fill-rule=\"evenodd\"><circle fill=\"#2A6EA8\" cx=\"19\" cy=\"19\" r=\"19\" /><g transform=\"translate(10 9)\" fill=\"#FFF\"><g transform=\"translate(.203 .656)\"><path d=\"M15.95 8.442h3.19v3.54c0 1.712-.007 3.004-.258 3.877-.251.872-.561 1.598-.93 2.178a6.948 6.948 0 0 1-1.353 1.556c-1.774 1.521-4.091 2.282-6.954 2.282-2.916 0-5.255-.755-7.017-2.266a7.27 7.27 0 0 1-1.354-1.572c-.369-.58-.673-1.29-.914-2.13-.24-.84-.36-2.16-.36-3.958V1.823h3.281V11.98c0 2.096.18 3.553.66 4.373.481.819 1.213 1.476 2.195 1.97.983.495 2.142.742 3.477.742 1.901 0 3.45-.494 4.646-1.484a4.598 4.598 0 0 0 1.362-1.883c.278-.723.33-1.963.33-3.718V8.442z\" /><path d=\"M1.64 0h.046c.881 0 1.595.714 1.595 1.595v1.322a1.64 1.64 0 0 1-3.281 0V1.64C0 .735.735 0 1.64 0z\" /><rect x=\"16.406\" y=\"6.836\" width=\"2.734\" height=\"7.292\" rx=\"1.367\" /></g><rect x=\"6.219\" y=\".656\" width=\"13.125\" height=\"3.281\" rx=\"1.641\" /><rect x=\"6.219\" y=\"7.219\" width=\"13.125\" height=\"3.281\" rx=\"1.641\" /></g><path d=\"M59.824 13.792c-.848 0-1.456-.12-1.824-.36-.432-.24-.728-.672-.888-1.296l-.672-2.472h3.144l.696 2.616c.128.512.464.768 1.008.768h1.272v.744h-2.736zm-18.432 3.432v-.768h1.152c.72-.016 1.168-.376 1.344-1.08l1.368-6.144H48.4l-1.248 5.688c-.224.96-.672 1.6-1.344 1.92-.512.256-1.232.384-2.16.384h-2.256zm2.376 12.72V18.4h3v11.544h-3zm15.552 0c-1.024.016-1.744-.176-2.16-.576-.4-.368-.6-.976-.6-1.824V16.84h3.024v11.208c.016.736.352 1.112 1.008 1.128H62.8v.768h-3.48zm-10.968-14.4V14.8h3.096l.192-5.568h3.048l-.216 5.568h8.304v.744h-8.328l-.408 11.76c-.032.928-.28 1.592-.744 1.992-.48.432-1.176.648-2.088.648h-2.952v-.768h1.584c.704-.016 1.088-.424 1.152-1.224l.432-12.408h-3.072zm29.865-4.152l-.72 3.792h4.8l-.696-3.768c-.144-.528-.464-.808-.96-.84h-1.44c-.512.048-.84.32-.984.816zm3.216 17.784c.88-.032 1.336-.488 1.368-1.368v-5.616c-.064-.896-.52-1.368-1.368-1.416h-3.072c-.832.08-1.288.552-1.368 1.416v5.616c.016.896.48 1.352 1.392 1.368h3.048zm-15.96-14.52v-.792h2.568V9.232h2.952v4.632h2.136v.792h-2.136v5.808l2.136-.672v.792l-2.136.672v5.736c0 1.136-.296 1.928-.888 2.376-.544.384-1.368.576-2.472.576h-1.896v-.768h1.152c.72-.048 1.104-.424 1.152-1.128v-5.856l-2.544.792v-.792l2.544-.792v-6.744h-2.568zm7.464 4.152v-.768h.456c.4-.016.656-.272.768-.768l.984-5.304c.128-.672.408-1.184.84-1.536.528-.416 1.224-.624 2.088-.624h3.72c.8 0 1.44.168 1.92.504.48.336.792.864.936 1.584l.984 5.328c.096.528.376.8.84.816h.336v.768h-1.536c-.64 0-1.192-.12-1.656-.36-.528-.32-.848-.792-.96-1.416l-.216-1.08h-5.088l-.216 1.104c-.128.624-.408 1.072-.84 1.344-.448.272-1 .408-1.656.408h-1.704zm3.936 11.136c-.96 0-1.688-.248-2.184-.744-.48-.432-.72-1.112-.72-2.04v-4.224c0-.96.312-1.68.936-2.16.56-.512 1.328-.768 2.304-.768h5.472c.96 0 1.72.224 2.28.672.576.496.864 1.232.864 2.208v4.2c0 .928-.24 1.624-.72 2.088-.512.512-1.272.768-2.28.768h-5.952zm22.45-18.216v2.16h2.687v-3.312h-1.488c-.784.016-1.184.4-1.2 1.152zm7.103-1.152h-1.512v3.312h2.712v-2.16c-.048-.72-.448-1.104-1.2-1.152zm-7.104 6.312c0 .752.384 1.128 1.152 1.128h1.536v-3.384h-2.688v2.256zm7.2 1.128c.72-.016 1.088-.392 1.104-1.128v-2.256h-2.712v3.384h1.608zm-13.056-3.864c-.768 0-1.368-.128-1.8-.384-.432-.24-.744-.656-.936-1.248l-1.056-3.312h3.096l1.104 3.48c.176.48.504.72.984.72h.744v.744h-2.136zm2.592 14.808v-.768h.48c.528 0 .832-.256.912-.768l.696-4.704h2.592l-.696 4.464c-.112.656-.384 1.112-.816 1.368-.384.272-.936.408-1.656.408h-1.512zm13.272 0c-.656 0-1.2-.128-1.632-.384-.432-.288-.712-.752-.84-1.392l-.672-4.464h2.592l.672 4.704c.08.544.384.8.912.768h.504v.768h-1.536zm-17.136.936c-.688-.224-1.04-.76-1.056-1.608V17.824c-.016-.672-.312-1.016-.888-1.032h-.84v-.768h2.064c.896 0 1.552.232 1.968.696.336.384.504.96.504 1.728v9.168c0 .192.056.32.168.384.112.048.232.016.36-.096l1.392-1.296v.936l-1.872 1.776c-.544.528-1.144.72-1.8.576zm7.608-11.112c-1.056 0-1.808-.224-2.256-.672-.448-.448-.672-1.136-.672-2.064v-3.696c0-.816.256-1.44.768-1.872.528-.448 1.248-.672 2.16-.672h7.368c.912 0 1.608.184 2.088.552.544.416.816 1.08.816 1.992v3.696c0 .976-.248 1.688-.744 2.136-.448.4-1.168.6-2.16.6h-2.256v1.776h5.784v.768h-5.784v8.592h-2.904v-8.592h-5.904v-.768h5.904v-1.776h-2.208zm18.562-6.096c-.624.016-1.096-.056-1.416-.216-.416-.176-.688-.432-.816-.768l-.816-2.016h3.168l.624 1.584c.176.448.512.664 1.008.648h.888v.768h-2.64zm8.856 0v-.768h.888c.512.016.848-.2 1.008-.648l.624-1.584h3.168l-.792 1.992a1.314 1.314 0 0 1-.72.744c-.32.192-.872.28-1.656.264h-2.52zm1.176 9.6c.656-.016.992-.368 1.008-1.056V19.36c0-.688-.336-1.032-1.008-1.032h-8.544c-.672.016-1.016.352-1.032 1.008v1.944c0 .672.344 1.008 1.032 1.008h8.544zm-14.568-5.304v-1.176c0-.624.2-1.104.6-1.44.432-.368 1.032-.552 1.8-.552h6.288V9.232h3.192v4.584h6c.96 0 1.656.184 2.088.552.4.32.6.8.6 1.44v1.176h-3.048v-1.32c.016-.752-.4-1.12-1.248-1.104h-12c-.832-.016-1.24.336-1.224 1.056v1.368h-3.048zm4.152 6.048c-.736 0-1.28-.144-1.632-.432-.368-.32-.552-.792-.552-1.416v-1.776c0-.592.184-1.048.552-1.368.352-.304.888-.456 1.608-.456h12.216c.768 0 1.328.144 1.68.432.384.304.576.768.576 1.392v1.752c0 .624-.16 1.072-.48 1.344-.368.352-.96.528-1.776.528h-4.44v2.304h7.608v.744h-7.608v3.096h9.096v.768h-21.432v-.768h9.072V26.08h-7.584v-.744h7.584v-2.304h-4.488z\" fill=\"#292525\" /></g></symbol>"
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

/***/ "./resources/js/icons/svg/wechat-mini-program.svg":
/*!********************************************************!*\
  !*** ./resources/js/icons/svg/wechat-mini-program.svg ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-baker-runtime/browser-symbol */ "./node_modules/svg-baker-runtime/browser-symbol.js");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-sprite-loader/runtime/browser-sprite.build */ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-wechat-mini-program",
  "use": "icon-wechat-mini-program-usage",
  "viewBox": "0 0 186 186",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 186 186\" id=\"icon-wechat-mini-program\"><path d=\"M93 .692C42.02.692.692 42.02.692 93c0 50.98 41.328 92.308 92.308 92.308 50.98 0 92.308-41.328 92.308-92.308C185.308 42.02 143.98.692 93 .692zm30.77 99.077a7.692 7.692 0 0 1-9.385-3.846c-1.693-3.692 0-6.308 3.384-8.461 1.261-.846 2.6-1.567 4-2.154 6.154-3.539 11.231-8.154 8.154-15.385a14 14 0 0 0-16.461-8.154 13.077 13.077 0 0 0-12.77 13.385v38.308c-2.091 15.354-15.274 26.757-30.769 26.615-16.76-1.232-29.431-15.684-28.461-32.462 0-8.923 8.307-15.384 19.23-20.923 4.616-1.384 9.231-1.384 11.693 3.231 2.461 4.615-2.154 8-6.154 9.846-8.154 3.539-12.154 9.231-8.308 17.539a14.308 14.308 0 0 0 19.23 6.769 13.538 13.538 0 0 0 9.078-14.615v-34.77c-.696-12.491 7.353-23.799 19.384-27.23a32 32 0 0 1 33.847 8.769 28.154 28.154 0 0 1-15.385 43.538h-.308z\" fill=\"#1198CF\" fill-rule=\"nonzero\" /></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/icons/svg/wechat.svg":
/*!*******************************************!*\
  !*** ./resources/js/icons/svg/wechat.svg ***!
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
  "id": "icon-wechat",
  "use": "icon-wechat-usage",
  "viewBox": "0 0 512 512",
  "content": "<symbol viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-wechat\"><path d=\"M512 256c0 141.387-114.613 256-256 256S0 397.387 0 256 114.613 0 256 0s256 114.613 256 256zm0 0\" fill=\"#2ad827\" /><path d=\"M498.438 338.426l-95.91-95.91c-9.508-10.68-21.938-19.422-36.294-25.407l-67.488-67.582c-22.3-23.289-56.035-38.148-93.82-38.148-67.153 0-121.594 46.898-121.594 104.75 0 25.062 10.23 48.062 27.273 66.09l15.72 15.758-6.755 25.046c-.687 2.543.168 4.875 1.778 6.407l178.308 178.847c93.094-15.996 169.008-82.257 198.781-169.851zm0 0\" fill=\"#00ae00\" /><path d=\"M239.184 221.27c21.988-18.438 51.058-28.59 81.851-28.59.813 0 1.621.007 2.43.023-12.348-46.574-60.73-81.324-118.54-81.324-67.155 0-121.593 46.898-121.593 104.75 0 32.207 16.879 61.012 43.43 80.226l-7.192 26.668c-1.535 5.7 4.66 10.36 9.707 7.301l28.864-17.488c14.402 5.176 30.207 8.039 46.789 8.039 1.09 0 2.175-.016 3.261-.04a88.477 88.477 0 0 1-4.332-27.398c-.004-27.44 12.543-53.07 35.325-72.167zm4.375-60.344c8.523 0 15.433 6.91 15.433 15.433 0 8.528-6.91 15.438-15.433 15.438-8.528 0-15.438-6.91-15.438-15.438 0-8.523 6.91-15.433 15.438-15.433zm-80.32 30.87c-8.524 0-15.434-6.91-15.434-15.437 0-8.523 6.91-15.433 15.433-15.433 8.528 0 15.438 6.91 15.438 15.433 0 8.528-6.91 15.438-15.438 15.438zm0 0\" fill=\"#fff\" /><path d=\"M422.664 293.438c0-47.06-45.5-85.208-101.629-85.208-56.125 0-101.625 38.149-101.625 85.208 0 47.054 45.5 85.203 101.625 85.203 13.86 0 27.067-2.329 39.106-6.54l20.925 13.458c4.942 3.175 11.243-1.258 9.914-6.98l-4.613-19.88c22.192-15.633 36.297-39.062 36.297-65.262zM287.742 283.32c-7.566 0-13.703-6.132-13.703-13.703 0-7.566 6.137-13.699 13.703-13.699 7.567 0 13.7 6.133 13.7 13.7 0 7.57-6.133 13.702-13.7 13.702zm66.59 0c-7.566 0-13.703-6.132-13.703-13.703 0-7.566 6.137-13.699 13.703-13.699s13.703 6.133 13.703 13.7c0 7.57-6.137 13.702-13.703 13.702zm0 0\" fill=\"#ffec97\" /><path d=\"M422.668 293.441c0-46.382-44.191-84.101-99.2-85.18V378.61c12.97-.25 25.34-2.55 36.669-6.507l20.93 13.457c4.94 3.18 11.242-1.258 9.91-6.98l-4.61-19.88c22.192-15.629 36.301-39.058 36.301-65.258zm-68.34-10.12c-7.558 0-13.7-6.13-13.7-13.7 0-7.57 6.142-13.7 13.7-13.7 7.57 0 13.711 6.13 13.711 13.7 0 7.57-6.14 13.7-13.71 13.7zm0 0\" fill=\"#ffe047\" /><path d=\"M204.93 111.379c-2.293 0-4.563.05-6.82.172v209.148c2.257.121 4.527.172 6.82.172 1.09 0 2.18-.012 3.257-.031a88.395 88.395 0 0 1-4.328-27.399c0-27.441 12.54-53.07 35.32-72.171 21.989-18.442 51.06-28.59 81.86-28.59.809 0 1.617.011 2.43.02-12.352-46.571-60.742-81.321-118.54-81.321zm38.629 80.422c-8.532 0-15.442-6.91-15.442-15.442 0-8.52 6.91-15.43 15.442-15.43 8.52 0 15.43 6.91 15.43 15.43 0 8.532-6.91 15.442-15.43 15.442zm0 0\" fill=\"#fff5cb\" /></symbol>"
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
  transition: 'fade',
  duration: 100,
  context: 'body',

  /** BLurring with true will make elements with fixed position disappear **/
  blurring: false,
  observeChanges: true
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

/***/ "./resources/js/index/articlesColumn.js":
/*!**********************************************!*\
  !*** ./resources/js/index/articlesColumn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
* Articles Column - Articles Feed
**/

/** Providing the popup functionality to the authorization icons **/
$('#main_content .articles-feed .articles.column .item .content .meta .authorization .popup-icon-wrapper').popup({
  inline: true,
  position: 'top center',
  transition: 'fade',
  hoverable: true,
  variation: 'inverted'
});
/** Providing the popup functionality when clicking on the share option icons **/

$('#main_content .articles-feed .articles.column .item .content .extra .article-options .share.option').popup({
  inline: true,
  position: 'bottom center',
  hoverable: true,
  transition: 'fade',
  on: 'click'
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/index/articlesFeed.js":
/*!********************************************!*\
  !*** ./resources/js/index/articlesFeed.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _asidesColumn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asidesColumn */ "./resources/js/index/asidesColumn.js");
/* harmony import */ var _articlesColumn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./articlesColumn */ "./resources/js/index/articlesColumn.js");
/* harmony import */ var _articlesColumn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_articlesColumn__WEBPACK_IMPORTED_MODULE_1__);



/***/ }),

/***/ "./resources/js/index/asidesColumn.js":
/*!********************************************!*\
  !*** ./resources/js/index/asidesColumn.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _ellipsisText__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ellipsisText */ "./resources/js/index/ellipsisText.js");

/**
* Asides Column - Articles Feed
**/

/** Providing the ellipsis(...) to the elements when their texts are more than 2 lines **/

var articlesFeedAsideHeaders = $('#main_content .articles-feed .row .asides.column .aside1 .item .content .header');
Object(_ellipsisText__WEBPACK_IMPORTED_MODULE_0__["default"])(articlesFeedAsideHeaders);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/index/cornerBanners.js":
/*!*********************************************!*\
  !*** ./resources/js/index/cornerBanners.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _ellipsisText__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ellipsisText */ "./resources/js/index/ellipsisText.js");

/**
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
var cornerBannerDescriptions = $('#main_content .page_banners .corner_banners .corner_banner .card_area .card_content .description span');
Object(_ellipsisText__WEBPACK_IMPORTED_MODULE_0__["default"])(cornerBannerDescriptions);
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

/***/ "./resources/js/index/ellipsisText.js":
/*!********************************************!*\
  !*** ./resources/js/index/ellipsisText.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ellipsisText; });
/* harmony import */ var ellipsis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ellipsis.js */ "./node_modules/ellipsis.js/ellipsis.js");
/* harmony import */ var ellipsis_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ellipsis_js__WEBPACK_IMPORTED_MODULE_0__);

function ellipsisText(ellipsisElements) {
  var ellipsisOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    className: false,
    lines: 2
  };
  var ellipsisConf = ellipsisOptions;
  var ellipsis = Ellipsis(ellipsisConf);
  ellipsis.add(ellipsisElements);
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
/* harmony import */ var _mainNavigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mainNavigation */ "./resources/js/index/mainNavigation.js");
/* harmony import */ var _mainNavigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mainNavigation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _pageBanners__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pageBanners */ "./resources/js/index/pageBanners.js");
/* harmony import */ var _articlesFeed__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./articlesFeed */ "./resources/js/index/articlesFeed.js");




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

/***/ "./resources/js/index/mainNavigation.js":
/*!**********************************************!*\
  !*** ./resources/js/index/mainNavigation.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
* Main Navigation
**/

/** Animation effect **/
$('#main_nav .left.menu a').hover(function (event) {
  $(event.currentTarget.children[0]).transition('tada');
}, function (event) {
  $(event.currentTarget.children[0]).transition('stop');
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
  onResultsOpen: function onResultsOpen() {//$('#main_content .page_banners')[0].style.zIndex = -1
  },
  onResultsClose: function onResultsClose() {//$('#main_content .page_banners')[0].style.zIndex = 'auto'
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
  /** making wechat official platform buttons invisible **/


  var wechat_official_platform = $('#header .right.menu .wechat-official-platform');
  wechat_official_platform[0].style.display = 'none';
  /** making the divider invisible **/

  var divider_item = $('#header .right.menu>.divider_item');
  divider_item[0].style.display = 'none';
  /** making login and register buttons invisible **/

  var account_buttons = $('#header .right.menu .account-buttons');
  account_buttons[0].style.display = 'none';
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
      /* making wechat public platform, the divider, the login and register buttons visible */

      var wechat_official_platform = $('#header .right.menu .wechat-official-platform');
      var divider_item = $('#header .right.menu>.divider_item');
      var account_buttons = $('#header .right.menu .account-buttons');
      wechat_official_platform[0].style.display = 'flex';
      divider_item[0].style.display = 'block';
      account_buttons[0].style.display = 'flex';
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
var juantop = 0;
/** toggling the display of the sidebar **/

$('#main_sidebar').sidebar({
  transition: 'overlay',
  mobileTransition: 'overlay',
  dimPage: false,
  context: 'body',
  scrollLock: false,
  returnScroll: false,
  onVisible: function onVisible() {
    juantop = $(document).scrollTop();
    /** Resizing the height for iOS devices **/

    resizeSidebarHeight();
    /** when opening the sidebar, preventing the body layer from moving **/

    $('body').addClass('fixed_layer');
    $('body').css('top', "-".concat(juantop, "px"));
  },
  onShow: function onShow() {
    /** Solving the problem that the background elements will show up when scrolling beyond the bottom of the sidebar in Chrome browser **/
    $('body .pusher').css('height', '0');
  },
  onHide: function onHide() {
    $('body .pusher').css('height', 'auto');
  },
  onHidden: function onHidden() {
    /** Solving the problem that the background elements will show up when scrolling beyond the bottom of the sidebar in Chrome browser **/
    //$('body .pusher').css('height', 'auto')

    /** when closing the sidebar, releasing the original state of the body layer **/
    $('body').removeClass('fixed_layer');
    $(document).scrollTop(juantop);
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
        r = u.namespace,
        d = u.error,
        a = "module-" + r,
        f = p(b),
        m = this,
        g = f.data(a);
    return s = {
      initialize: function initialize() {
        s.instantiate();
      },
      instantiate: function instantiate() {
        s.verbose("Storing instance of site", s), g = s, f.data(a, s);
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
        setting: function setting(o, r, e, a) {
          e = "string" == typeof e ? "all" === e ? u.modules : [e] : e || u.modules, a = a === v || a, p.each(e, function (e, t) {
            var n,
                i = !s.moduleExists(t) || p.fn[t].settings.namespace || !1;
            s.moduleExists(t) && (s.verbose("Changing default setting", o, r, t), p.fn[t].settings[o] = r, a && i && 0 < (n = p(":data(module-" + i + ")")).length && (s.verbose("Modifying existing settings", n), n[t]("setting", o, r)));
          });
        },
        settings: function settings(i, e, o) {
          e = "string" == typeof e ? [e] : e || u.modules, o = o === v || o, p.each(e, function (e, t) {
            var n;
            s.moduleExists(t) && (s.verbose("Changing default setting", i, t), p.extend(!0, p.fn[t].settings, i), o && r && 0 < (n = p(":data(module-" + r + ")")).length && (s.verbose("Modifying existing settings", n), n[t]("setting", i)));
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
        s.verbose("Destroying previous site for", f), f.removeData(a);
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
            r,
            n,
            a = g;
        return e = e || l, t = m || t, "string" == typeof i && a !== v && (i = i.split(/[\. ]/), o = i.length - 1, p.each(i, function (e, t) {
          var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
          if (p.isPlainObject(a[n]) && e != o) a = a[n];else {
            if (a[n] !== v) return r = a[n], !1;
            if (!p.isPlainObject(a[t]) || e == o) return a[t] !== v ? r = a[t] : s.error(d.method, i), !1;
            a = a[t];
          }
        })), p.isFunction(r) ? n = r.apply(t, e) : r !== v && (n = r), p.isArray(c) ? c.push(n) : c !== v ? c = [c, n] : n !== v && (c = n), r;
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
}(jQuery, window, document), function (F, E, O, q) {
  "use strict";

  E = void 0 !== E && E.Math == Math ? E : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), F.fn.search = function (c) {
    var C,
        w = F(this),
        S = w.selector || "",
        k = new Date().getTime(),
        T = [],
        R = c,
        A = "string" == typeof R,
        P = [].slice.call(arguments, 1);
    return F(this).each(function () {
      var f,
          l = F.isPlainObject(c) ? F.extend(!0, {}, F.fn.search.settings, c) : F.extend({}, F.fn.search.settings),
          m = l.className,
          u = l.metadata,
          d = l.regExp,
          r = l.fields,
          g = l.selector,
          p = l.error,
          e = l.namespace,
          i = "." + e,
          t = e + "-module",
          h = F(this),
          b = h.find(g.prompt),
          n = h.find(g.searchButton),
          o = h.find(g.results),
          a = h.find(g.result),
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
          f.debug("Refreshing selector cache"), b = h.find(g.prompt), n = h.find(g.searchButton), h.find(g.category), o = h.find(g.results), a = h.find(g.result);
        },
        refreshResults: function refreshResults() {
          o = h.find(g.results), a = h.find(g.result);
        },
        bind: {
          events: function events() {
            f.verbose("Binding events to search"), l.automatic && (h.on(f.get.inputEvent() + i, g.prompt, f.event.input), b.attr("autocomplete", "off")), h.on("focus" + i, g.prompt, f.event.focus).on("blur" + i, g.prompt, f.event.blur).on("keydown" + i, g.prompt, f.handleKeyboard).on("click" + i, g.searchButton, f.query).on("mousedown" + i, g.results, f.event.result.mousedown).on("mouseup" + i, g.results, f.event.result.mouseup).on("click" + i, g.result, f.event.result.click);
          }
        },
        determine: {
          searchFields: function searchFields() {
            c && c.searchFields !== q && (l.searchFields = c.searchFields);
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
              var t = F(this),
                  n = t.find(g.title).eq(0),
                  i = t.is("a[href]") ? t : t.find("a[href]").eq(0),
                  o = i.attr("href") || !1,
                  r = i.attr("target") || !1,
                  a = (n.html(), 0 < n.length && n.text()),
                  s = f.get.results(),
                  c = t.data(u.result) || f.get.result(a, s);
              if (F.isFunction(l.onSelect) && !1 === l.onSelect.call(v, c, s)) return f.debug("Custom onSelect callback cancelled default select action"), void (y = !0);
              f.hideResults(), a && f.set.value(a), o && (f.verbose("Opening search link found in result", i), "_blank" == r || e.ctrlKey ? E.open(o) : E.location.href = o);
            }
          }
        },
        handleKeyboard: function handleKeyboard(e) {
          var t,
              n = h.find(g.result),
              i = h.find(g.category),
              o = n.filter("." + m.active),
              r = n.index(o),
              a = n.length,
              s = 0 < o.length,
              c = e.which,
              l = 13,
              u = 38,
              d = 40;
          if (c == 27 && (f.verbose("Escape key pressed, blurring search field"), f.hideResults(), x = !0), f.is.visible()) {
            if (c == l) {
              if (f.verbose("Enter key pressed, selecting active result"), 0 < n.filter("." + m.active).length) return f.event.result.click.call(n.filter("." + m.active), e), e.preventDefault(), !1;
            } else c == u && s ? (f.verbose("Up key pressed, changing active result"), t = r - 1 < 0 ? r : r - 1, i.removeClass(m.active), n.removeClass(m.active).eq(t).addClass(m.active).closest(i).addClass(m.active), e.preventDefault()) : c == d && (f.verbose("Down key pressed, changing active result"), t = a <= r + 1 ? r : r + 1, i.removeClass(m.active), n.removeClass(m.active).eq(t).addClass(m.active).closest(i).addClass(m.active), e.preventDefault());
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
            F.extend(!0, e, l.apiSettings), f.verbose("Setting up API request", e), h.api(e);
          }
        },
        can: {
          useAPI: function useAPI() {
            return F.fn.api !== q;
          },
          show: function show() {
            return f.is.focused() && !f.is.visible() && !f.is.empty();
          },
          transition: function transition() {
            return l.transition && F.fn.transition !== q && h.transition("is supported");
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
              var t = F(e.target);
              return F.contains(O.documentElement, e.target) && 0 < t.closest(g.message).length;
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
            F.isPlainObject(c) && c.searchFullText && (l.fullTextSearch = c.searchFullText, f.error(l.error.oldSearchSyntax, v));
          },
          inputEvent: function inputEvent() {
            var e = b[0];
            return e !== q && e.oninput !== q ? "input" : e !== q && e.onpropertychange !== q ? "propertychange" : "keyup";
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
            return n = n !== q ? n : f.get.value(), e = e !== q ? e : f.get.results(), "category" === l.type ? (f.debug("Finding result that matches", n), F.each(e, function (e, t) {
              if (F.isArray(t.results) && (o = f.search.object(n, t.results, i)[0])) return !1;
            })) : (f.debug("Finding result in results object", n), o = f.search.object(n, e, i)[0]), o || !1;
          }
        },
        select: {
          firstResult: function firstResult() {
            f.verbose("Selecting first result"), a.first().addClass(m.active);
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
          e = F.isFunction(e) ? e : function () {};
          var t = f.get.value(),
              n = f.read.cache(t);
          e = e || function () {}, f.has.minimumCharacters() ? (n ? (f.debug("Reading result from cache", t), f.save.results(n.results), f.addResults(n.html), f.inject.id(n.results), e()) : (f.debug("Querying for", t), F.isPlainObject(l.source) || F.isArray(l.source) ? (f.search.local(t), e()) : f.can.useAPI() ? f.search.remote(t, e) : (f.error(p.source), e())), l.onSearchQuery.call(v, t)) : f.hideResults();
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
            t = F.isFunction(t) ? t : function () {}, h.api("is loading") && h.api("abort"), f.setup.api(e, t), h.api("query");
          },
          object: function object(i, t, e) {
            var r = [],
                a = [],
                s = [],
                n = i.toString().replace(d.escape, "\\$&"),
                o = new RegExp(d.beginsWith + n, "i"),
                c = function c(e, t) {
              var n = -1 == F.inArray(t, r),
                  i = -1 == F.inArray(t, s),
                  o = -1 == F.inArray(t, a);
              n && i && o && e.push(t);
            };

            return t = t || l.source, e = e !== q ? e : l.searchFields, F.isArray(e) || (e = [e]), t === q || !1 === t ? (f.error(p.source), []) : (F.each(e, function (e, n) {
              F.each(t, function (e, t) {
                "string" == typeof t[n] && (-1 !== t[n].search(o) ? c(r, t) : "exact" === l.fullTextSearch && f.exactSearch(i, t[n]) ? c(a, t) : 1 == l.fullTextSearch && f.fuzzySearch(i, t[n]) && c(s, t));
              });
            }), F.merge(a, s), F.merge(r, a), r);
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

          e: for (var o = 0, r = 0; o < i; o++) {
            for (var a = e.charCodeAt(o); r < n;) {
              if (t.charCodeAt(r++) === a) continue e;
            }

            return !1;
          }

          return !0;
        },
        parse: {
          response: function response(e, t) {
            var n = f.generateResults(e);
            f.verbose("Parsing server response", e), e !== q && t !== q && e[r.results] !== q && (f.addResults(n), f.inject.id(e[r.results]), f.write.cache(t, {
              html: n,
              results: e[r.results]
            }), f.save.results(e[r.results]));
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
            return !!l.cache && (f.verbose("Checking cache for generated html for query", e), "object" == _typeof(t) && t[e] !== q && t[e]);
          }
        },
        create: {
          categoryResults: function categoryResults(e) {
            var n = {};
            return F.each(e, function (e, t) {
              t.category && (n[t.category] === q ? (f.verbose("Creating new category of results", t.category), n[t.category] = {
                name: t.category,
                results: [t]
              }) : n[t.category].results.push(t));
            }), n;
          },
          id: function id(e, t) {
            var n,
                i = e + 1;
            return t !== q ? (n = String.fromCharCode(97 + t) + i, f.verbose("Creating category result id", n)) : (n = i, f.verbose("Creating result id", n)), n;
          },
          results: function results() {
            0 === o.length && (o = F("<div />").addClass(m.results).appendTo(h));
          }
        },
        inject: {
          result: function result(e, t, n) {
            f.verbose("Injecting result into results");
            var i = n !== q ? o.children().eq(n).children(g.results).first().children(g.result).eq(t) : o.children(g.result).eq(t);
            f.verbose("Injecting results metadata", i), i.data(u.result, e);
          },
          id: function id(i) {
            f.debug("Injecting unique ids into results");
            var o = 0,
                r = 0;
            return "category" === l.type ? F.each(i, function (e, i) {
              r = 0, F.each(i.results, function (e, t) {
                var n = i.results[e];
                n.id === q && (n.id = f.create.id(r, o)), f.inject.result(n, r, o), r++;
              }), o++;
            }) : F.each(i, function (e, t) {
              var n = i[e];
              n.id === q && (n.id = f.create.id(r)), f.inject.result(n, r), r++;
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
            var n = h.data(u.cache) !== q ? h.data(u.cache) : {};
            l.cache && (f.verbose("Writing generated html to cache", e, t), n[e] = t, h.data(u.cache, n));
          }
        },
        addResults: function addResults(e) {
          if (F.isFunction(l.onResultsAdd) && !1 === l.onResultsAdd.call(o, e)) return f.debug("onResultsAdd callback cancelled default action"), !1;
          e ? (o.html(e), f.refreshResults(), l.selectFirstResult && f.select.firstResult(), f.showResults()) : f.hideResults(function () {
            o.empty();
          });
        },
        showResults: function showResults(e) {
          e = F.isFunction(e) ? e : function () {}, x || !f.is.visible() && f.has.results() && (f.can.transition() ? (f.debug("Showing results with css animations"), o.transition({
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
          e = F.isFunction(e) ? e : function () {}, f.is.visible() && (f.can.transition() ? (f.debug("Hiding results with css animations"), o.transition({
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
              n = F.isPlainObject(e[r.results]) && !F.isEmptyObject(e[r.results]),
              i = F.isArray(e[r.results]) && 0 < e[r.results].length,
              o = "";
          return n || i ? (0 < l.maxResults && (n ? "standard" == l.type && f.error(p.maxResults) : e[r.results] = e[r.results].slice(0, l.maxResults)), F.isFunction(t) ? o = t(e, r) : f.error(p.noTemplate, !1)) : l.showNoResults && (o = f.displayMessage(p.noResults, "empty")), l.onResults.call(v, e), o;
        },
        displayMessage: function displayMessage(e, t) {
          return t = t || "standard", f.debug("Displaying message", e, t), f.addResults(l.templates.message(e, t)), l.templates.message(e, t);
        },
        setting: function setting(e, t) {
          if (F.isPlainObject(e)) F.extend(!0, l, e);else {
            if (t === q) return l[e];
            l[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (F.isPlainObject(e)) F.extend(!0, f, e);else {
            if (t === q) return f[e];
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
            l.performance && (n = (t = new Date().getTime()) - (k || t), k = t, T.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: v,
              "Execution Time": n
            })), clearTimeout(f.performance.timer), f.performance.timer = setTimeout(f.performance.display, 500);
          },
          display: function display() {
            var e = l.name + ":",
                n = 0;
            k = !1, clearTimeout(f.performance.timer), F.each(T, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", S && (e += " '" + S + "'"), 1 < w.length && (e += " (" + w.length + ")"), (console.group !== q || console.table !== q) && 0 < T.length && (console.groupCollapsed(e), console.table ? console.table(T) : F.each(T, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), T = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              r,
              n,
              a = s;
          return e = e || P, t = v || t, "string" == typeof i && a !== q && (i = i.split(/[\. ]/), o = i.length - 1, F.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (F.isPlainObject(a[n]) && e != o) a = a[n];else {
              if (a[n] !== q) return r = a[n], !1;
              if (!F.isPlainObject(a[t]) || e == o) return a[t] !== q && (r = a[t]), !1;
              a = a[t];
            }
          })), F.isFunction(r) ? n = r.apply(t, e) : r !== q && (n = r), F.isArray(C) ? C.push(n) : C !== q ? C = [C, n] : n !== q && (C = n), r;
        }
      }, A ? (s === q && f.initialize(), f.invoke(R)) : (s !== q && s.invoke("destroy"), f.initialize());
    }), C !== q ? C : this;
  }, F.fn.search.settings = {
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
        return e !== q && t !== q && (n += '<div class="message ' + t + '">', n += "empty" == t ? '<div class="header">No Results</div class="header"><div class="description">' + e + '</div class="description">' : ' <div class="description">' + e + "</div>", n += "</div>"), n;
      },
      category: function category(e, n) {
        var i = "";
        F.fn.search.settings.templates.escape;
        return e[n.categoryResults] !== q && (F.each(e[n.categoryResults], function (e, t) {
          t[n.results] !== q && 0 < t.results.length && (i += '<div class="category">', t[n.categoryName] !== q && (i += '<div class="name">' + t[n.categoryName] + "</div>"), i += '<div class="results">', F.each(t.results, function (e, t) {
            t[n.url] ? i += '<a class="result" href="' + t[n.url] + '">' : i += '<a class="result">', t[n.image] !== q && (i += '<div class="image"> <img src="' + t[n.image] + '"></div>'), i += '<div class="content">', t[n.price] !== q && (i += '<div class="price">' + t[n.price] + "</div>"), t[n.title] !== q && (i += '<div class="title">' + t[n.title] + "</div>"), t[n.description] !== q && (i += '<div class="description">' + t[n.description] + "</div>"), i += "</div>", i += "</a>";
          }), i += "</div>", i += "</div>");
        }), e[n.action] && (i += '<a href="' + e[n.action][n.actionURL] + '" class="action">' + e[n.action][n.actionText] + "</a>"), i);
      },
      standard: function standard(e, n) {
        var i = "";
        return e[n.results] !== q && (F.each(e[n.results], function (e, t) {
          t[n.url] ? i += '<a class="result" href="' + t[n.url] + '">' : i += '<a class="result">', t[n.image] !== q && (i += '<div class="image"> <img src="' + t[n.image] + '"></div>'), i += '<div class="content">', t[n.price] !== q && (i += '<div class="price">' + t[n.price] + "</div>"), t[n.title] !== q && (i += '<div class="title">' + t[n.title] + "</div>"), t[n.description] !== q && (i += '<div class="description">' + t[n.description] + "</div>"), i += "</div>", i += "</a>";
        }), e[n.action] && (i += '<a href="' + e[n.action][n.actionURL] + '" class="action">' + e[n.action][n.actionText] + "</a>"), i);
      }
    }
  };
}(jQuery, window, document), function (j, D, z, M) {
  "use strict";

  D = void 0 !== D && D.Math == Math ? D : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), j.fn.sidebar = function (x) {
    var C,
        e = j(this),
        w = j(D),
        S = j(z),
        k = j("html"),
        T = j("head"),
        R = e.selector || "",
        A = new Date().getTime(),
        P = [],
        F = x,
        E = "string" == typeof F,
        O = [].slice.call(arguments, 1),
        q = D.requestAnimationFrame || D.mozRequestAnimationFrame || D.webkitRequestAnimationFrame || D.msRequestAnimationFrame || function (e) {
      setTimeout(e, 0);
    };

    return e.each(function () {
      var a,
          s,
          e,
          t,
          c,
          l,
          u = j.isPlainObject(x) ? j.extend(!0, {}, j.fn.sidebar.settings, x) : j.extend({}, j.fn.sidebar.settings),
          n = u.selector,
          r = u.className,
          i = u.namespace,
          o = u.regExp,
          d = u.error,
          f = "." + i,
          m = "module-" + i,
          g = j(this),
          p = j(u.context),
          h = g.children(n.sidebar),
          b = (p.children(n.fixed), p.children(n.pusher)),
          v = this,
          y = g.data(m);
      l = {
        initialize: function initialize() {
          l.debug("Initializing sidebar", x), l.create.id(), c = l.get.transitionEvent(), u.delaySetup ? q(l.setup.layout) : l.setup.layout(), q(function () {
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
          l.verbose("Destroying previous module for", g), g.off(f).removeData(m), l.is.ios() && l.remove.ios(), p.off(s), w.off(s), S.off(s);
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
            0 === j(e.target).closest(n.sidebar).length && e.preventDefault();
          }
        },
        bind: {
          clickaway: function clickaway() {
            l.verbose("Adding clickaway events to context", p), u.closable && p.on("click" + s, l.event.clickaway).on("touchend" + s, l.event.clickaway);
          },
          scrollLock: function scrollLock() {
            u.scrollLock && (l.debug("Disabling page scroll"), w.on("DOMMouseScroll" + s, l.event.scroll)), l.verbose("Adding events to contain sidebar scroll"), S.on("touchmove" + s, l.event.touch), g.on("scroll" + f, l.event.containScroll);
          }
        },
        unbind: {
          clickaway: function clickaway() {
            l.verbose("Removing clickaway events from context", p), p.off(s);
          },
          scrollLock: function scrollLock() {
            l.verbose("Removing scroll lock from page"), S.off(s), w.off(s), g.off("scroll" + f);
          }
        },
        add: {
          inlineCSS: function inlineCSS() {
            var e,
                t = l.cache.width || g.outerWidth(),
                n = l.cache.height || g.outerHeight(),
                i = l.is.rtl(),
                o = l.get.direction(),
                r = {
              left: t,
              right: -t,
              top: n,
              bottom: -n
            };
            i && (l.verbose("RTL detected, flipping widths"), r.left = -t, r.right = t), e = "<style>", "left" === o || "right" === o ? (l.debug("Adding CSS rules for animation distance", t), e += " .ui.visible." + o + ".sidebar ~ .fixed, .ui.visible." + o + ".sidebar ~ .pusher {   -webkit-transform: translate3d(" + r[o] + "px, 0, 0);           transform: translate3d(" + r[o] + "px, 0, 0); }") : "top" !== o && "bottom" != o || (e += " .ui.visible." + o + ".sidebar ~ .fixed, .ui.visible." + o + ".sidebar ~ .pusher {   -webkit-transform: translate3d(0, " + r[o] + "px, 0);           transform: translate3d(0, " + r[o] + "px, 0); }"), l.is.ie() && ("left" === o || "right" === o ? (l.debug("Adding CSS rules for animation distance", t), e += " body.pushable > .ui.visible." + o + ".sidebar ~ .pusher:after {   -webkit-transform: translate3d(" + r[o] + "px, 0, 0);           transform: translate3d(" + r[o] + "px, 0, 0); }") : "top" !== o && "bottom" != o || (e += " body.pushable > .ui.visible." + o + ".sidebar ~ .pusher:after {   -webkit-transform: translate3d(0, " + r[o] + "px, 0);           transform: translate3d(0, " + r[o] + "px, 0); }"), e += " body.pushable > .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher:after, body.pushable > .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher:after {   -webkit-transform: translate3d(0px, 0, 0);           transform: translate3d(0px, 0, 0); }"), a = j(e += "</style>").appendTo(T), l.debug("Adding sizing css to head", a);
          }
        },
        refresh: function refresh() {
          l.verbose("Refreshing selector cache"), p = j(u.context), h = p.children(n.sidebar), b = p.children(n.pusher), p.children(n.fixed), l.clear.cache();
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
            0 === p.children(n.pusher).length && (l.debug("Adding wrapper element for sidebar"), l.error(d.pusher), b = j('<div class="pusher" />'), p.children().not(n.omitted).not(h).wrapAll(b), l.refresh()), 0 !== g.nextAll(n.pusher).length && g.nextAll(n.pusher)[0] === b[0] || (l.debug("Moved sidebar to correct parent element"), l.error(d.movedSidebar, v), g.detach().prependTo(p), l.refresh()), l.clear.cache(), l.set.pushable(), l.set.direction();
          }
        },
        attachEvents: function attachEvents(e, t) {
          var n = j(e);
          t = j.isFunction(l[t]) ? l[t] : l.toggle, 0 < n.length ? (l.debug("Attaching sidebar events to element", e, t), n.on("click" + f, t)) : l.error(d.notFound, e);
        },
        show: function show(e) {
          if (e = j.isFunction(e) ? e : function () {}, l.is.hidden()) {
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
          e = j.isFunction(e) ? e : function () {}, (l.is.visible() || l.is.animating()) && (l.debug("Hiding sidebar", e), l.refreshSidebars(), l.pullPage(function () {
            e.call(v), u.onHidden.call(v);
          }), u.onChange.call(v), u.onHide.call(v));
        },
        othersAnimating: function othersAnimating() {
          return 0 < h.not(g).filter("." + r.animating).length;
        },
        othersVisible: function othersVisible() {
          return 0 < h.not(g).filter("." + r.visible).length;
        },
        othersActive: function othersActive() {
          return l.othersVisible() || l.othersAnimating();
        },
        hideOthers: function hideOthers(e) {
          var t = h.not(g).filter("." + r.visible),
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
              r = "overlay" === o || l.othersActive() ? g : b;

          t = j.isFunction(t) ? t : function () {}, "scale down" == u.transition && l.scrollToTop(), l.set.transition(o), l.repaint(), e = function e() {
            l.bind.clickaway(), l.add.inlineCSS(), l.set.animating(), l.set.visible();
          }, n = function n() {
            l.set.dimmed();
          }, _i = function i(e) {
            e.target == r[0] && (r.off(c + s, _i), l.remove.animating(), l.bind.scrollLock(), t.call(v));
          }, r.off(c + s), r.on(c + s, _i), q(e), u.dimPage && !l.othersVisible() && q(n);
        },
        pullPage: function pullPage(t) {
          var e,
              _n,
              i = l.get.transition(),
              o = "overlay" == i || l.othersActive() ? g : b;

          t = j.isFunction(t) ? t : function () {}, l.verbose("Removing context push state", l.get.direction()), l.unbind.clickaway(), l.unbind.scrollLock(), e = function e() {
            l.set.transition(i), l.set.animating(), l.remove.visible(), u.dimPage && !l.othersVisible() && b.removeClass(r.dimmed);
          }, _n = function n(e) {
            e.target == o[0] && (o.off(c + s, _n), l.remove.animating(), l.remove.transition(), l.remove.inlineCSS(), ("scale down" == i || u.returnScroll && l.is.mobile()) && l.scrollBack(), t.call(v));
          }, o.off(c + s), o.on(c + s, _n), q(e);
        },
        scrollToTop: function scrollToTop() {
          l.verbose("Scrolling to top of page to avoid animation issues"), t = j(D).scrollTop(), g.scrollTop(0), D.scrollTo(0, 0);
        },
        scrollBack: function scrollBack() {
          l.verbose("Scrolling back to original page position"), D.scrollTo(0, t);
        },
        clear: {
          cache: function cache() {
            l.verbose("Clearing cached dimensions"), l.cache = {};
          }
        },
        set: {
          ios: function ios() {
            k.addClass(r.ios);
          },
          pushed: function pushed() {
            p.addClass(r.pushed);
          },
          pushable: function pushable() {
            p.addClass(r.pushable);
          },
          dimmed: function dimmed() {
            b.addClass(r.dimmed);
          },
          active: function active() {
            g.addClass(r.active);
          },
          animating: function animating() {
            g.addClass(r.animating);
          },
          transition: function transition(e) {
            e = e || l.get.transition(), g.addClass(e);
          },
          direction: function direction(e) {
            e = e || l.get.direction(), g.addClass(r[e]);
          },
          visible: function visible() {
            g.addClass(r.visible);
          },
          overlay: function overlay() {
            g.addClass(r.overlay);
          }
        },
        remove: {
          inlineCSS: function inlineCSS() {
            l.debug("Removing inline css styles", a), a && 0 < a.length && a.remove();
          },
          ios: function ios() {
            k.removeClass(r.ios);
          },
          pushed: function pushed() {
            p.removeClass(r.pushed);
          },
          pushable: function pushable() {
            p.removeClass(r.pushable);
          },
          active: function active() {
            g.removeClass(r.active);
          },
          animating: function animating() {
            g.removeClass(r.animating);
          },
          transition: function transition(e) {
            e = e || l.get.transition(), g.removeClass(e);
          },
          direction: function direction(e) {
            e = e || l.get.direction(), g.removeClass(r[e]);
          },
          visible: function visible() {
            g.removeClass(r.visible);
          },
          overlay: function overlay() {
            g.removeClass(r.overlay);
          }
        },
        get: {
          direction: function direction() {
            return g.hasClass(r.top) ? r.top : g.hasClass(r.right) ? r.right : g.hasClass(r.bottom) ? r.bottom : r.left;
          },
          transition: function transition() {
            var e,
                t = l.get.direction();
            return e = l.is.mobile() ? "auto" == u.mobileTransition ? u.defaultTransition.mobile[t] : u.mobileTransition : "auto" == u.transition ? u.defaultTransition.computer[t] : u.transition, l.verbose("Determined transition", e), e;
          },
          transitionEvent: function transitionEvent() {
            var e,
                t = z.createElement("element"),
                n = {
              transition: "transitionend",
              OTransition: "oTransitionEnd",
              MozTransition: "transitionend",
              WebkitTransition: "webkitTransitionEnd"
            };

            for (e in n) {
              if (t.style[e] !== M) return n[e];
            }
          }
        },
        is: {
          ie: function ie() {
            return !D.ActiveXObject && "ActiveXObject" in D || "ActiveXObject" in D;
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
            return g.hasClass(r.visible);
          },
          open: function open() {
            return l.is.visible();
          },
          closed: function closed() {
            return l.is.hidden();
          },
          vertical: function vertical() {
            return g.hasClass(r.top);
          },
          animating: function animating() {
            return p.hasClass(r.animating);
          },
          rtl: function rtl() {
            return l.cache.rtl === M && (l.cache.rtl = "rtl" == g.css("direction")), l.cache.rtl;
          }
        },
        setting: function setting(e, t) {
          if (l.debug("Changing setting", e, t), j.isPlainObject(e)) j.extend(!0, u, e);else {
            if (t === M) return u[e];
            j.isPlainObject(u[e]) ? j.extend(!0, u[e], t) : u[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (j.isPlainObject(e)) j.extend(!0, l, e);else {
            if (t === M) return l[e];
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
            u.performance && (n = (t = new Date().getTime()) - (A || t), A = t, P.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: v,
              "Execution Time": n
            })), clearTimeout(l.performance.timer), l.performance.timer = setTimeout(l.performance.display, 500);
          },
          display: function display() {
            var e = u.name + ":",
                n = 0;
            A = !1, clearTimeout(l.performance.timer), j.each(P, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", R && (e += " '" + R + "'"), (console.group !== M || console.table !== M) && 0 < P.length && (console.groupCollapsed(e), console.table ? console.table(P) : j.each(P, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), P = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              r,
              n,
              a = y;
          return e = e || O, t = v || t, "string" == typeof i && a !== M && (i = i.split(/[\. ]/), o = i.length - 1, j.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (j.isPlainObject(a[n]) && e != o) a = a[n];else {
              if (a[n] !== M) return r = a[n], !1;
              if (!j.isPlainObject(a[t]) || e == o) return a[t] !== M ? r = a[t] : l.error(d.method, i), !1;
              a = a[t];
            }
          })), j.isFunction(r) ? n = r.apply(t, e) : r !== M && (n = r), j.isArray(C) ? C.push(n) : C !== M ? C = [C, n] : n !== M && (C = n), r;
        }
      }, E ? (y === M && l.initialize(), l.invoke(F)) : (y !== M && l.invoke("destroy"), l.initialize());
    }), C !== M ? C : this;
  }, j.fn.sidebar.settings = {
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
}(jQuery, window, document), function (P, F, e, E) {
  "use strict";

  F = void 0 !== F && F.Math == Math ? F : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
  P.api = P.fn.api = function (x) {
    var C,
        e = P.isFunction(this) ? P(F) : P(this),
        w = e.selector || "",
        S = new Date().getTime(),
        k = [],
        T = x,
        R = "string" == typeof T,
        A = [].slice.call(arguments, 1);
    return e.each(function () {
      var r,
          a,
          n,
          e,
          s,
          c,
          l = P.isPlainObject(x) ? P.extend(!0, {}, P.fn.api.settings, x) : P.extend({}, P.fn.api.settings),
          t = l.namespace,
          i = l.metadata,
          o = l.selector,
          u = l.error,
          d = l.className,
          f = "." + t,
          m = "module-" + t,
          g = P(this),
          p = g.closest(o.form),
          h = l.stateContext ? P(l.stateContext) : g,
          b = this,
          v = h[0],
          y = g.data(m);
      c = {
        initialize: function initialize() {
          R || c.bind.events(), c.instantiate();
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
            if (e !== E && "string" == typeof e) try {
              e = JSON.parse(e);
            } catch (e) {}
            return e;
          }
        },
        read: {
          cachedResponse: function cachedResponse(e) {
            var t;
            if (F.Storage !== E) return t = sessionStorage.getItem(e), c.debug("Using cached response", e, t), t = c.decode.json(t);
            c.error(u.noStorage);
          }
        },
        write: {
          cachedResponse: function cachedResponse(e, t) {
            t && "" === t ? c.debug("Response empty, not caching", t) : F.Storage !== E ? (P.isPlainObject(t) && (t = JSON.stringify(t)), sessionStorage.setItem(e, t), c.verbose("Storing cached response for url", e, t)) : c.error(u.noStorage);
          }
        },
        query: function query() {
          if (c.is.disabled()) c.debug("Element is disabled API request aborted");else {
            if (c.is.loading()) {
              if (!l.interruptRequests) return void c.debug("Cancelling request, previous request is still pending");
              c.debug("Interrupting previous request"), c.abort();
            }

            if (l.defaultData && P.extend(!0, l.urlData, c.get.defaultData()), l.serializeForm && (l.data = c.add.formData(l.data)), !1 === (a = c.get.settings())) return c.cancelled = !0, void c.error(u.beforeSend);

            if (c.cancelled = !1, (n = c.get.templatedURL()) || c.is.mocked()) {
              if ((n = c.add.urlData(n)) || c.is.mocked()) {
                if (a.url = l.base + n, r = P.extend(!0, {}, l, {
                  type: l.method || l.type,
                  data: e,
                  url: l.base + n,
                  beforeSend: l.beforeXHR,
                  success: function success() {},
                  failure: function failure() {},
                  complete: function complete() {}
                }), c.debug("Querying URL", r.url), c.verbose("Using AJAX settings", r), "local" === l.cache && c.read.cachedResponse(n)) return c.debug("Response returned from local cache"), c.request = c.create.request(), void c.request.resolveWith(v, [c.read.cachedResponse(n)]);
                l.throttle ? l.throttleFirstRequest || c.timer ? (c.debug("Throttling request", l.throttle), clearTimeout(c.timer), c.timer = setTimeout(function () {
                  c.timer && delete c.timer, c.debug("Sending throttled request", e, r.method), c.send.request();
                }, l.throttle)) : (c.debug("Sending request", e, r.method), c.send.request(), c.timer = setTimeout(function () {}, l.throttle)) : (c.debug("Sending request", e, r.method), c.send.request());
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
            return e && e.readyState !== E && 0 === e.readyState ? (c.verbose("XHR request determined to be aborted"), !0) : (c.verbose("XHR request was not aborted"), !1);
          },
          validResponse: function validResponse(e) {
            return c.is.expectingJSON() && P.isFunction(l.successTest) ? (c.debug("Checking JSON returned success", l.successTest, e), l.successTest(e) ? (c.debug("Response passed success test", e), !0) : (c.debug("Response failed success test", e), !1)) : (c.verbose("Response is not JSON, skipping validation", l.successTest, e), !0);
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
          urlData: function urlData(o, r) {
            var e, t;
            return o && (e = o.match(l.regExp.required), t = o.match(l.regExp.optional), r = r || l.urlData, e && (c.debug("Looking for required URL variables", e), P.each(e, function (e, t) {
              var n = -1 !== t.indexOf("$") ? t.substr(2, t.length - 3) : t.substr(1, t.length - 2),
                  i = P.isPlainObject(r) && r[n] !== E ? r[n] : g.data(n) !== E ? g.data(n) : h.data(n) !== E ? h.data(n) : r[n];
              if (i === E) return c.error(u.requiredParameter, n, o), o = !1;
              c.verbose("Found required variable", n, i), i = l.encodeParameters ? c.get.urlEncodedValue(i) : i, o = o.replace(t, i);
            })), t && (c.debug("Looking for optional URL variables", e), P.each(t, function (e, t) {
              var n = -1 !== t.indexOf("$") ? t.substr(3, t.length - 4) : t.substr(2, t.length - 3),
                  i = P.isPlainObject(r) && r[n] !== E ? r[n] : g.data(n) !== E ? g.data(n) : h.data(n) !== E ? h.data(n) : r[n];
              o = i !== E ? (c.verbose("Optional variable Found", n, i), o.replace(t, i)) : (c.verbose("Optional variable not found", n), -1 !== o.indexOf("/" + t) ? o.replace("/" + t, "") : o.replace(t, ""));
            }))), o;
          },
          formData: function formData(e) {
            var t = P.fn.serializeObject !== E,
                n = t ? p.serializeObject() : p.serialize();
            return e = e || l.data, e = P.isPlainObject(e) ? t ? (c.debug("Extending existing data with form data", e, n), P.extend(!0, {}, e, n)) : (c.error(u.missingSerialize), c.debug("Cant extend data. Replacing data with form data", e, n), n) : (c.debug("Adding form data", n), n);
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
                  r = l.loadingDuration - o,
                  a = !!P.isFunction(l.onResponse) && (c.is.expectingJSON() ? l.onResponse.call(i, P.extend(!0, {}, e)) : l.onResponse.call(i, e));
              r = 0 < r ? r : 0, a && (c.debug("Modified API response in onResponse callback", l.onResponse, a, e), e = a), 0 < r && c.debug("Response completed early delaying state change by", r), setTimeout(function () {
                c.is.validResponse(e) ? c.request.resolveWith(i, [e, n]) : c.request.rejectWith(i, [n, "invalid"]);
              }, r);
            },
            fail: function fail(e, t, n) {
              var i = this,
                  o = new Date().getTime() - s,
                  r = l.loadingDuration - o;
              0 < (r = 0 < r ? r : 0) && c.debug("Response completed early delaying state change by", r), setTimeout(function () {
                c.is.abortedRequest(e) ? c.request.rejectWith(i, [e, "aborted", n]) : c.request.rejectWith(i, [e, "error", t, n]);
              }, r);
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
              "invalid" == t ? c.debug("JSON did not pass success test. A server-side error has most likely occurred", i) : "error" == t && e !== E && (c.debug("XHR produced a server error", t, n), 200 != e.status && n !== E && "" !== n && c.error(u.statusMessage + n, r.url), l.onError.call(v, o, g, e)), l.errorDuration && "aborted" !== t && (c.debug("Adding error state"), c.set.error(), c.should.removeError() && setTimeout(c.remove.error, l.errorDuration)), c.debug("API Request failed", o, e), l.onFailure.call(v, i, g, e);
            }
          }
        },
        create: {
          request: function request() {
            return P.Deferred().always(c.event.request.complete).done(c.event.request.done).fail(c.event.request.fail);
          },
          mockedXHR: function mockedXHR() {
            var e,
                t,
                n,
                i = l.mockResponse || l.response,
                o = l.mockResponseAsync || l.responseAsync;
            return n = P.Deferred().always(c.event.xhr.complete).done(c.event.xhr.done).fail(c.event.xhr.fail), i ? (t = P.isFunction(i) ? (c.debug("Using specified synchronous callback", i), i.call(v, a)) : (c.debug("Using settings specified response", i), i), n.resolveWith(v, [t, !1, {
              responseText: t
            }])) : P.isFunction(o) && (e = function e(_e) {
              c.debug("Async callback returned response", _e), _e ? n.resolveWith(v, [_e, !1, {
                responseText: _e
              }]) : n.rejectWith(v, [{
                responseText: _e
              }, !1, !1]);
            }, c.debug("Using specified async response callback", o), o.call(v, a, e)), n;
          },
          xhr: function xhr() {
            var e;
            return e = P.ajax(r).always(c.event.xhr.always).done(c.event.xhr.done).fail(c.event.xhr.fail), c.verbose("Created server request", e, r), e;
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
            return !!P.isPlainObject(e) && (c.is.expectingJSON() ? c.decode.json(e.responseText) : e.responseText);
          },
          errorFromRequest: function errorFromRequest(e, t, n) {
            return P.isPlainObject(e) && e.error !== E ? e.error : l.error[t] !== E ? l.error[t] : n;
          },
          request: function request() {
            return c.request || !1;
          },
          xhr: function xhr() {
            return c.xhr || !1;
          },
          settings: function settings() {
            var e;
            return (e = l.beforeSend.call(v, l)) && (e.success !== E && (c.debug("Legacy success callback detected", e), c.error(u.legacyParameters, e.success), e.onSuccess = e.success), e.failure !== E && (c.debug("Legacy failure callback detected", e), c.error(u.legacyParameters, e.failure), e.onFailure = e.failure), e.complete !== E && (c.debug("Legacy complete callback detected", e), c.error(u.legacyParameters, e.complete), e.onComplete = e.complete)), e === E && c.error(u.noReturnedValue), !1 === e ? e : e !== E ? P.extend(!0, {}, e) : P.extend(!0, {}, l);
          },
          urlEncodedValue: function urlEncodedValue(e) {
            var t = F.decodeURIComponent(e),
                n = F.encodeURIComponent(e);
            return t !== e ? (c.debug("URL value is already encoded, avoiding double encoding", e), e) : (c.verbose("Encoding value using encodeURIComponent", e, n), n);
          },
          defaultData: function defaultData() {
            var e = {};
            return P.isWindow(b) || (c.is.input() ? e.value = g.val() : c.is.form() || (e.text = g.text())), e;
          },
          event: function event() {
            return P.isWindow(b) || "now" == l.on ? (c.debug("API called without element, no events attached"), !1) : "auto" == l.on ? g.is("input") ? b.oninput !== E ? "input" : b.onpropertychange !== E ? "propertychange" : "keyup" : g.is("form") ? "submit" : "click" : l.on;
          },
          templatedURL: function templatedURL(e) {
            if (e = e || g.data(i.action) || l.action || !1, n = g.data(i.url) || l.url || !1) return c.debug("Using specified url", n), n;

            if (e) {
              if (c.debug("Looking up url for action", e, l.api), l.api[e] === E && !c.is.mocked()) return void c.error(u.missingAction, l.action, l.api);
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
          if (c.debug("Changing setting", e, t), P.isPlainObject(e)) P.extend(!0, l, e);else {
            if (t === E) return l[e];
            P.isPlainObject(l[e]) ? P.extend(!0, l[e], t) : l[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (P.isPlainObject(e)) P.extend(!0, c, e);else {
            if (t === E) return c[e];
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
            l.performance && (n = (t = new Date().getTime()) - (S || t), S = t, k.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              "Execution Time": n
            })), clearTimeout(c.performance.timer), c.performance.timer = setTimeout(c.performance.display, 500);
          },
          display: function display() {
            var e = l.name + ":",
                n = 0;
            S = !1, clearTimeout(c.performance.timer), P.each(k, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", w && (e += " '" + w + "'"), (console.group !== E || console.table !== E) && 0 < k.length && (console.groupCollapsed(e), console.table ? console.table(k) : P.each(k, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), k = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              r,
              n,
              a = y;
          return e = e || A, t = b || t, "string" == typeof i && a !== E && (i = i.split(/[\. ]/), o = i.length - 1, P.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (P.isPlainObject(a[n]) && e != o) a = a[n];else {
              if (a[n] !== E) return r = a[n], !1;
              if (!P.isPlainObject(a[t]) || e == o) return a[t] !== E ? r = a[t] : c.error(u.method, i), !1;
              a = a[t];
            }
          })), P.isFunction(r) ? n = r.apply(t, e) : r !== E && (n = r), P.isArray(C) ? C.push(n) : C !== E ? C = [C, n] : n !== E && (C = n), r;
        }
      }, R ? (y === E && c.initialize(), c.invoke(T)) : (y !== E && y.invoke("destroy"), c.initialize());
    }), C !== E ? C : this;
  }, P.api.settings = {
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
}(jQuery, window, document), function (C, e, w, S) {
  "use strict";

  e = void 0 !== e && e.Math == Math ? e : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), C.fn.transition = function () {
    var l,
        a = C(this),
        g = a.selector || "",
        p = new Date().getTime(),
        h = [],
        b = arguments,
        v = b[0],
        y = [].slice.call(arguments, 1),
        x = "string" == typeof v;
    e.requestAnimationFrame || e.mozRequestAnimationFrame || e.webkitRequestAnimationFrame || e.msRequestAnimationFrame;
    return a.each(function (i) {
      var u,
          s,
          t,
          d,
          n,
          o,
          e,
          r,
          f,
          m = C(this),
          c = this;
      (f = {
        initialize: function initialize() {
          u = f.get.settings.apply(c, b), d = u.className, t = u.error, n = u.metadata, r = "." + u.namespace, e = "module-" + u.namespace, s = m.data(e) || f, o = f.get.animationEndEvent(), x && (x = f.invoke(v)), !1 === x && (f.verbose("Converted arguments into settings object", u), u.interval ? f.delay(u.animate) : f.animate(), f.instantiate());
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
          n || (n = f.can.transition() ? f.get.direction() : "static"), e = e !== S ? e : u.interval, t = "auto" == u.reverse && n == d.outward || 1 == u.reverse ? (a.length - i) * u.interval : i * u.interval, f.debug("Delaying animation by", t), setTimeout(f.animate, t);
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
          f.debug("Queueing animation of", e), f.queuing = !0, m.one(o + ".queue" + r, function () {
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
                r = e === S || "" === e;
            o !== n ? (f.verbose("Overriding default display to show element", n), m.attr("style", i)) : r && m.removeAttr("style");
          },
          hidden: function hidden() {
            var e = m.attr("style"),
                t = m.css("display"),
                n = e === S || "" === e;
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
            e = e || f.get.animationClass(), f.debug("Starting tween", e), m.addClass(e).one(o + ".complete" + r, f.complete), u.useFailSafe && f.add.failSafe(), f.set.duration(u.duration), u.onStart.call(c);
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
            m.off(".queue" + r);
          },
          completeCallback: function completeCallback() {
            m.off(".complete" + r);
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
            return !(!f.cache || f.cache.animation === S) && f.cache.animation;
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
            return e = e === S || e, u.displayType ? u.displayType : (e && m.data(n.displayType) === S && f.can.transition(!0), m.data(n.displayType));
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
              if (t.style[e] !== S) return n[e];
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
              if (t.style[e] !== S) return n[e];
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
                r,
                a,
                s = u.animation,
                c = f.get.transitionExists(s),
                l = f.get.displayType(!1);

            if (c === S || e) {
              if (f.verbose("Determining whether animation exists"), t = m.attr("class"), n = m.prop("tagName"), o = (i = C("<" + n + " />").addClass(t).insertAfter(m)).addClass(s).removeClass(d.inward).removeClass(d.outward).addClass(d.animating).addClass(d.transition).css("animationName"), r = i.addClass(d.inward).css("animationName"), l || (l = i.attr("class", t).removeAttr("style").removeClass(d.hidden).removeClass(d.visible).show().css("display"), f.verbose("Determining final display state", l), f.save.displayType(l)), i.remove(), o != r) f.debug("Direction exists for animation", s), a = !0;else {
                if ("none" == o || !o) return void f.debug("No animation defined in css", s);
                f.debug("Static animation found", s, l), a = !1;
              }
              f.save.transitionExists(s, a);
            }

            return c !== S ? c : a;
          },
          animate: function animate() {
            return f.can.transition() !== S;
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
            if (t === S) return u[e];
            C.isPlainObject(u[e]) ? C.extend(!0, u[e], t) : u[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (C.isPlainObject(e)) C.extend(!0, f, e);else {
            if (t === S) return f[e];
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
            }), e += " " + n + "ms", g && (e += " '" + g + "'"), 1 < a.length && (e += " (" + a.length + ")"), (console.group !== S || console.table !== S) && 0 < h.length && (console.groupCollapsed(e), console.table ? console.table(h) : C.each(h, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), h = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              r,
              n,
              a = s;
          return e = e || y, t = c || t, "string" == typeof i && a !== S && (i = i.split(/[\. ]/), o = i.length - 1, C.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (C.isPlainObject(a[n]) && e != o) a = a[n];else {
              if (a[n] !== S) return r = a[n], !1;
              if (!C.isPlainObject(a[t]) || e == o) return a[t] !== S && (r = a[t]), !1;
              a = a[t];
            }
          })), C.isFunction(r) ? n = r.apply(t, e) : r !== S && (n = r), C.isArray(l) ? l.push(n) : l !== S ? l = [l, n] : n !== S && (l = n), r !== S && r;
        }
      }).initialize();
    }), l !== S ? l : this;
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
}(jQuery, window, document), function (S, e, k, T) {
  "use strict";

  e = void 0 !== e && e.Math == Math ? e : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), S.fn.dimmer = function (p) {
    var h,
        b = S(this),
        v = new Date().getTime(),
        y = [],
        x = p,
        C = "string" == typeof x,
        w = [].slice.call(arguments, 1);
    return b.each(function () {
      var r,
          t,
          s,
          a = S.isPlainObject(p) ? S.extend(!0, {}, S.fn.dimmer.settings, p) : S.extend({}, S.fn.dimmer.settings),
          n = a.selector,
          e = a.namespace,
          i = a.className,
          c = a.error,
          o = "." + e,
          l = "module-" + e,
          u = b.selector || "",
          d = "ontouchstart" in k.documentElement ? "touchstart" : "click",
          f = S(this),
          m = this,
          g = f.data(l);
      (s = {
        preinitialize: function preinitialize() {
          r = s.is.dimmer() ? (t = f.parent(), f) : (t = f, s.has.dimmer() ? a.dimmerName ? t.find(n.dimmer).filter("." + a.dimmerName) : t.find(n.dimmer) : s.create());
        },
        initialize: function initialize() {
          s.debug("Initializing dimmer", a), s.bind.events(), s.set.dimmable(), s.instantiate();
        },
        instantiate: function instantiate() {
          s.verbose("Storing instance of module", s), g = s, f.data(l, g);
        },
        destroy: function destroy() {
          s.verbose("Destroying previous module", r), s.unbind.events(), s.remove.variation(), t.off(o);
        },
        bind: {
          events: function events() {
            "hover" == a.on ? t.on("mouseenter" + o, s.show).on("mouseleave" + o, s.hide) : "click" == a.on && t.on(d + o, s.toggle), s.is.page() && (s.debug("Setting as a page dimmer", t), s.set.pageDimmer()), s.is.closable() && (s.verbose("Adding dimmer close event", r), t.on(d + o, n.dimmer, s.event.click));
          }
        },
        unbind: {
          events: function events() {
            f.removeData(l), t.off(o);
          }
        },
        event: {
          click: function click(e) {
            s.verbose("Determining if event occured on dimmer", e), (0 === r.find(e.target).length || S(e.target).is(n.content)) && (s.hide(), e.stopImmediatePropagation());
          }
        },
        addContent: function addContent(e) {
          var t = S(e);
          s.debug("Add content to dimmer", t), t.parent()[0] !== r[0] && t.detach().appendTo(r);
        },
        create: function create() {
          var e = S(a.template.dimmer());
          return a.dimmerName && (s.debug("Creating named dimmer", a.dimmerName), e.addClass(a.dimmerName)), e.appendTo(t), e;
        },
        show: function show(e) {
          e = S.isFunction(e) ? e : function () {}, s.debug("Showing dimmer", r, a), s.set.variation(), s.is.dimmed() && !s.is.animating() || !s.is.enabled() ? s.debug("Dimmer is already shown or disabled") : (s.animate.show(e), a.onShow.call(m), a.onChange.call(m));
        },
        hide: function hide(e) {
          e = S.isFunction(e) ? e : function () {}, s.is.dimmed() || s.is.animating() ? (s.debug("Hiding dimmer", r), s.animate.hide(e), a.onHide.call(m), a.onChange.call(m)) : s.debug("Dimmer is not visible");
        },
        toggle: function toggle() {
          s.verbose("Toggling dimmer visibility", r), s.is.dimmed() ? s.hide() : s.show();
        },
        animate: {
          show: function show(e) {
            e = S.isFunction(e) ? e : function () {}, a.useCSS && S.fn.transition !== T && r.transition("is supported") ? (a.useFlex ? (s.debug("Using flex dimmer"), s.remove.legacy()) : (s.debug("Using legacy non-flex dimmer"), s.set.legacy()), "auto" !== a.opacity && s.set.opacity(), r.transition({
              displayType: a.useFlex ? "flex" : "block",
              animation: a.transition + " in",
              queue: !1,
              duration: s.get.duration(),
              useFailSafe: !0,
              onStart: function onStart() {
                s.set.dimmed();
              },
              onComplete: function onComplete() {
                s.set.active(), e();
              }
            })) : (s.verbose("Showing dimmer animation with javascript"), s.set.dimmed(), "auto" == a.opacity && (a.opacity = .8), r.stop().css({
              opacity: 0,
              width: "100%",
              height: "100%"
            }).fadeTo(s.get.duration(), a.opacity, function () {
              r.removeAttr("style"), s.set.active(), e();
            }));
          },
          hide: function hide(e) {
            e = S.isFunction(e) ? e : function () {}, a.useCSS && S.fn.transition !== T && r.transition("is supported") ? (s.verbose("Hiding dimmer with css"), r.transition({
              displayType: a.useFlex ? "flex" : "block",
              animation: a.transition + " out",
              queue: !1,
              duration: s.get.duration(),
              useFailSafe: !0,
              onStart: function onStart() {
                s.remove.dimmed();
              },
              onComplete: function onComplete() {
                s.remove.variation(), s.remove.active(), e();
              }
            })) : (s.verbose("Hiding dimmer with javascript"), s.remove.dimmed(), r.stop().fadeOut(s.get.duration(), function () {
              s.remove.active(), r.removeAttr("style"), e();
            }));
          }
        },
        get: {
          dimmer: function dimmer() {
            return r;
          },
          duration: function duration() {
            return "object" == _typeof(a.duration) ? s.is.active() ? a.duration.hide : a.duration.show : a.duration;
          }
        },
        has: {
          dimmer: function dimmer() {
            return a.dimmerName ? 0 < f.find(n.dimmer).filter("." + a.dimmerName).length : 0 < f.find(n.dimmer).length;
          }
        },
        is: {
          active: function active() {
            return r.hasClass(i.active);
          },
          animating: function animating() {
            return r.is(":animated") || r.hasClass(i.animating);
          },
          closable: function closable() {
            return "auto" == a.closable ? "hover" != a.on : a.closable;
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
            return r.hasClass(i.pageDimmer);
          }
        },
        can: {
          show: function show() {
            return !r.hasClass(i.disabled);
          }
        },
        set: {
          opacity: function opacity(e) {
            var t = r.css("background-color"),
                n = t.split(","),
                i = n && 3 == n.length,
                o = n && 4 == n.length;
            e = 0 === a.opacity ? 0 : a.opacity || e, t = i || o ? (n[3] = e + ")", n.join(",")) : "rgba(0, 0, 0, " + e + ")", s.debug("Setting opacity to", e), r.css("background-color", t);
          },
          legacy: function legacy() {
            r.addClass(i.legacy);
          },
          active: function active() {
            r.addClass(i.active);
          },
          dimmable: function dimmable() {
            t.addClass(i.dimmable);
          },
          dimmed: function dimmed() {
            t.addClass(i.dimmed);
          },
          pageDimmer: function pageDimmer() {
            r.addClass(i.pageDimmer);
          },
          disabled: function disabled() {
            r.addClass(i.disabled);
          },
          variation: function variation(e) {
            (e = e || a.variation) && r.addClass(e);
          }
        },
        remove: {
          active: function active() {
            r.removeClass(i.active);
          },
          legacy: function legacy() {
            r.removeClass(i.legacy);
          },
          dimmed: function dimmed() {
            t.removeClass(i.dimmed);
          },
          disabled: function disabled() {
            r.removeClass(i.disabled);
          },
          variation: function variation(e) {
            (e = e || a.variation) && r.removeClass(e);
          }
        },
        setting: function setting(e, t) {
          if (s.debug("Changing setting", e, t), S.isPlainObject(e)) S.extend(!0, a, e);else {
            if (t === T) return a[e];
            S.isPlainObject(a[e]) ? S.extend(!0, a[e], t) : a[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (S.isPlainObject(e)) S.extend(!0, s, e);else {
            if (t === T) return s[e];
            s[e] = t;
          }
        },
        debug: function debug() {
          !a.silent && a.debug && (a.performance ? s.performance.log(arguments) : (s.debug = Function.prototype.bind.call(console.info, console, a.name + ":"), s.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !a.silent && a.verbose && a.debug && (a.performance ? s.performance.log(arguments) : (s.verbose = Function.prototype.bind.call(console.info, console, a.name + ":"), s.verbose.apply(console, arguments)));
        },
        error: function error() {
          a.silent || (s.error = Function.prototype.bind.call(console.error, console, a.name + ":"), s.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var t, n;
            a.performance && (n = (t = new Date().getTime()) - (v || t), v = t, y.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: m,
              "Execution Time": n
            })), clearTimeout(s.performance.timer), s.performance.timer = setTimeout(s.performance.display, 500);
          },
          display: function display() {
            var e = a.name + ":",
                n = 0;
            v = !1, clearTimeout(s.performance.timer), S.each(y, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", u && (e += " '" + u + "'"), 1 < b.length && (e += " (" + b.length + ")"), (console.group !== T || console.table !== T) && 0 < y.length && (console.groupCollapsed(e), console.table ? console.table(y) : S.each(y, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), y = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              r,
              n,
              a = g;
          return e = e || w, t = m || t, "string" == typeof i && a !== T && (i = i.split(/[\. ]/), o = i.length - 1, S.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (S.isPlainObject(a[n]) && e != o) a = a[n];else {
              if (a[n] !== T) return r = a[n], !1;
              if (!S.isPlainObject(a[t]) || e == o) return a[t] !== T ? r = a[t] : s.error(c.method, i), !1;
              a = a[t];
            }
          })), S.isFunction(r) ? n = r.apply(t, e) : r !== T && (n = r), S.isArray(h) ? h.push(n) : h !== T ? h = [h, n] : n !== T && (h = n), r;
        }
      }).preinitialize(), C ? (g === T && s.initialize(), s.invoke(x)) : (g !== T && g.invoke("destroy"), s.initialize());
    }), h !== T ? h : this;
  }, S.fn.dimmer.settings = {
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
        return S("<div />").attr("class", "ui dimmer");
      }
    }
  };
}(jQuery, window, document), function (D, z, M, N) {
  "use strict";

  z = void 0 !== z && z.Math == Math ? z : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), D.fn.modal = function (w) {
    var S,
        e = D(this),
        k = D(z),
        T = D(M),
        R = D("body"),
        A = e.selector || "",
        P = new Date().getTime(),
        F = [],
        E = w,
        O = "string" == typeof E,
        q = [].slice.call(arguments, 1),
        j = z.requestAnimationFrame || z.mozRequestAnimationFrame || z.webkitRequestAnimationFrame || z.msRequestAnimationFrame || function (e) {
      setTimeout(e, 0);
    };

    return e.each(function () {
      var n,
          i,
          e,
          o,
          r,
          t,
          a,
          s,
          c,
          l = D.isPlainObject(w) ? D.extend(!0, {}, D.fn.modal.settings, w) : D.extend({}, D.fn.modal.settings),
          u = l.selector,
          d = l.className,
          f = l.namespace,
          m = l.error,
          g = "." + f,
          p = "module-" + f,
          h = D(this),
          b = D(l.context),
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
                t = D.extend(!0, e, l.dimmerSettings);
            D.fn.dimmer !== N ? (c.debug("Creating dimmer"), o = b.dimmer(t), l.detachable ? (c.verbose("Modal is detachable, moving content into dimmer"), o.dimmer("add content", h)) : c.set.undetached(), r = o.dimmer("get dimmer")) : c.error(m.dimmer);
          },
          id: function id() {
            a = (Math.random().toString(16) + "000000000").substr(2, 8), t = "." + a, c.verbose("Creating unique id for element", a);
          }
        },
        destroy: function destroy() {
          c.verbose("Destroying previous modal"), h.removeData(p).off(g), k.off(t), r.off(t), v.off(g), b.dimmer("destroy");
        },
        observeChanges: function observeChanges() {
          "MutationObserver" in z && ((s = new MutationObserver(function (e) {
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
          var n = D(e);
          t = D.isFunction(c[t]) ? c[t] : c.toggle, 0 < n.length ? (c.debug("Attaching modal events to element", e, t), n.off(g).on("click" + g, t)) : c.error(m.notFound, e);
        },
        bind: {
          events: function events() {
            c.verbose("Attaching events"), h.on("click" + g, u.close, c.event.close).on("click" + g, u.approve, c.event.approve).on("click" + g, u.deny, c.event.deny), k.on("resize" + t, c.event.resize);
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
            C || !1 === l.onApprove.call(y, D(this)) ? c.verbose("Approve callback returned false cancelling hide") : (C = !0, c.hide(function () {
              C = !1;
            }));
          },
          preventScroll: function preventScroll(e) {
            e.preventDefault();
          },
          deny: function deny() {
            C || !1 === l.onDeny.call(y, D(this)) ? c.verbose("Deny callback returned false cancelling hide") : (C = !0, c.hide(function () {
              C = !1;
            }));
          },
          close: function close() {
            c.hide();
          },
          click: function click(e) {
            if (l.closable) {
              var t = 0 < D(e.target).closest(u.modal).length,
                  n = D.contains(M.documentElement, e.target);
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
            o.dimmer("is active") && (c.is.animating() || c.is.active()) && j(c.refresh);
          }
        },
        toggle: function toggle() {
          c.is.active() || c.is.animating() ? c.hide() : c.show();
        },
        show: function show(e) {
          e = D.isFunction(e) ? e : function () {}, c.refreshModals(), c.set.dimmerSettings(), c.set.dimmerStyles(), c.showModal(e);
        },
        hide: function hide(e) {
          e = D.isFunction(e) ? e : function () {}, c.refreshModals(), c.hideModal(e);
        },
        showModal: function showModal(e) {
          e = D.isFunction(e) ? e : function () {}, c.is.animating() || !c.is.active() ? (c.showDimmer(), c.cacheSizes(), c.can.useFlex() ? c.remove.legacy() : (c.set.legacy(), c.set.modalOffset(), c.debug("Using non-flex legacy modal positioning.")), c.set.screenHeight(), c.set.type(), c.set.clickaway(), !l.allowMultiple && c.others.active() ? c.hideOthers(c.showModal) : (l.allowMultiple && l.detachable && h.detach().appendTo(r), l.onShow.call(y), l.transition && D.fn.transition !== N && h.transition("is supported") ? (c.debug("Showing modal with css animations"), h.transition({
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
          e = D.isFunction(e) ? e : function () {}, c.debug("Hiding modal"), !1 !== l.onHide.call(y, D(this)) ? (c.is.animating() || c.is.active()) && (l.transition && D.fn.transition !== N && h.transition("is supported") ? (c.remove.active(), h.transition({
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
          e = D.isFunction(e) ? e : function () {}, 0 < t.length && (c.debug("Hiding all visible modals"), c.hideDimmer(), t.modal("hide modal", e));
        },
        hideOthers: function hideOthers(e) {
          var t = i.filter("." + d.active + ", ." + d.animating);
          e = D.isFunction(e) ? e : function () {}, 0 < t.length && (c.debug("Hiding other modals", i), t.modal("hide modal", e, !0));
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
            c.verbose("Adding keyboard shortcuts"), T.on("keyup" + g, c.event.keyboard);
          }
        },
        save: {
          focus: function focus() {
            0 < D(M.activeElement).closest(h).length || (e = D(M.activeElement).blur());
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
            r.off("click" + t);
          },
          dimmerStyles: function dimmerStyles() {
            r.removeClass(d.inverted), o.removeClass(d.blurring);
          },
          bodyStyle: function bodyStyle() {
            "" === R.attr("style") && (c.verbose("Removing style attribute"), R.removeAttr("style"));
          },
          screenHeight: function screenHeight() {
            c.debug("Removing page height"), R.css("height", "");
          },
          keyboardShortcuts: function keyboardShortcuts() {
            c.verbose("Removing keyboard shortcuts"), T.off("keyup" + g);
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
          c.cache !== N && 0 === n || (c.cache = {
            pageHeight: D(M).outerHeight(),
            width: t,
            height: n + l.offset,
            scrollHeight: e + l.offset,
            contextHeight: "body" == l.context ? D(z).height() : o.height()
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
                r = l.padding;
            return o < i ? t + n + i + r < e : o + 2 * r < e;
          }
        },
        is: {
          active: function active() {
            return h.hasClass(d.active);
          },
          ie: function ie() {
            return !z.ActiveXObject && "ActiveXObject" in z || "ActiveXObject" in z;
          },
          animating: function animating() {
            return h.transition("is supported") ? h.transition("is animating") : h.is(":visible");
          },
          scrolling: function scrolling() {
            return o.hasClass(d.scrolling);
          },
          modernBrowser: function modernBrowser() {
            return !(z.ActiveXObject || "ActiveXObject" in z);
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
            r.on("click" + t, c.event.click);
          },
          dimmerSettings: function dimmerSettings() {
            if (D.fn.dimmer !== N) {
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
                  t = D.extend(!0, e, l.dimmerSettings);
              l.inverted && (t.variation = t.variation !== N ? t.variation + " inverted" : "inverted"), b.dimmer("setting", t);
            } else c.error(m.dimmer);
          },
          dimmerStyles: function dimmerStyles() {
            l.inverted ? r.addClass(d.inverted) : r.removeClass(d.inverted), l.blurring ? o.addClass(d.blurring) : o.removeClass(d.blurring);
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
            c.can.fit() ? R.css("height", "") : (c.debug("Modal is taller than page content, resizing page height"), R.css("height", c.cache.height + 2 * l.padding));
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
          if (c.debug("Changing setting", e, t), D.isPlainObject(e)) D.extend(!0, l, e);else {
            if (t === N) return l[e];
            D.isPlainObject(l[e]) ? D.extend(!0, l[e], t) : l[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (D.isPlainObject(e)) D.extend(!0, c, e);else {
            if (t === N) return c[e];
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
            l.performance && (n = (t = new Date().getTime()) - (P || t), P = t, F.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: y,
              "Execution Time": n
            })), clearTimeout(c.performance.timer), c.performance.timer = setTimeout(c.performance.display, 500);
          },
          display: function display() {
            var e = l.name + ":",
                n = 0;
            P = !1, clearTimeout(c.performance.timer), D.each(F, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", A && (e += " '" + A + "'"), (console.group !== N || console.table !== N) && 0 < F.length && (console.groupCollapsed(e), console.table ? console.table(F) : D.each(F, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), F = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              r,
              n,
              a = x;
          return e = e || q, t = y || t, "string" == typeof i && a !== N && (i = i.split(/[\. ]/), o = i.length - 1, D.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (D.isPlainObject(a[n]) && e != o) a = a[n];else {
              if (a[n] !== N) return r = a[n], !1;
              if (!D.isPlainObject(a[t]) || e == o) return a[t] !== N && (r = a[t]), !1;
              a = a[t];
            }
          })), D.isFunction(r) ? n = r.apply(t, e) : r !== N && (n = r), D.isArray(S) ? S.push(n) : S !== N ? S = [S, n] : n !== N && (S = n), r;
        }
      }, O ? (x === N && c.initialize(), c.invoke(E)) : (x !== N && x.invoke("destroy"), c.initialize());
    }), S !== N ? S : this;
  }, D.fn.modal.settings = {
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
}(jQuery, window, document), function (E, e, O, q) {
  "use strict";

  e = void 0 !== e && e.Math == Math ? e : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), E.fn.form = function (x) {
    var C,
        w = E(this),
        S = w.selector || "",
        k = new Date().getTime(),
        T = [],
        R = x,
        A = arguments[1],
        P = "string" == typeof R,
        F = [].slice.call(arguments, 1);
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
          r,
          g,
          p,
          h,
          a = E(this),
          b = this,
          v = [],
          y = !1;
      (h = {
        initialize: function initialize() {
          h.get.settings(), P ? (p === q && h.instantiate(), h.invoke(R)) : (p !== q && p.invoke("destroy"), h.verbose("Initializing form validation", a, d), h.bindEvents(), h.set.defaults(), h.instantiate());
        },
        instantiate: function instantiate() {
          h.verbose("Storing instance of module", h), p = h, a.data(r, h);
        },
        destroy: function destroy() {
          h.verbose("Destroying previous module", p), h.removeEvents(), a.removeData(r);
        },
        refresh: function refresh() {
          h.verbose("Refreshing selector cache"), n = a.find(f.field), c = a.find(f.group), t = a.find(f.message), a.find(f.prompt), e = a.find(f.submit), a.find(f.clear), a.find(f.reset);
        },
        submit: function submit() {
          h.verbose("Submitting form", a), a.submit();
        },
        attachEvents: function attachEvents(e, t) {
          t = t || "submit", E(e).on("click" + g, function (e) {
            h[t](), e.preventDefault();
          });
        },
        bindEvents: function bindEvents() {
          h.verbose("Attaching form events"), a.on("submit" + g, h.validate.form).on("blur" + g, f.field, h.event.field.blur).on("click" + g, f.submit, h.submit).on("click" + g, f.reset, h.reset).on("click" + g, f.clear, h.clear), d.keyboardShortcuts && a.on("keydown" + g, f.field, h.event.field.keydown), n.each(function () {
            var e = E(this),
                t = e.prop("type"),
                n = h.get.changeEvent(t, e);
            E(this).on(n + g, h.event.field.change);
          });
        },
        clear: function clear() {
          n.each(function () {
            var e = E(this),
                t = e.parent(),
                n = e.closest(c),
                i = n.find(f.prompt),
                o = e.data(u.defaultValue) || "",
                r = t.is(f.uiCheckbox),
                a = t.is(f.uiDropdown);
            n.hasClass(m.error) && (h.verbose("Resetting error on field", n), n.removeClass(m.error), i.remove()), a ? (h.verbose("Resetting dropdown value", t, o), t.dropdown("clear")) : r ? e.prop("checked", !1) : (h.verbose("Resetting field value", e, o), e.val(""));
          });
        },
        reset: function reset() {
          n.each(function () {
            var e = E(this),
                t = e.parent(),
                n = e.closest(c),
                i = n.find(f.prompt),
                o = e.data(u.defaultValue),
                r = t.is(f.uiCheckbox),
                a = t.is(f.uiDropdown),
                s = n.hasClass(m.error);
            o !== q && (s && (h.verbose("Resetting error on field", n), n.removeClass(m.error), i.remove()), a ? (h.verbose("Resetting dropdown value", t, o), t.dropdown("restore defaults")) : r ? (h.verbose("Resetting checkbox value", t, o), e.prop("checked", o)) : (h.verbose("Resetting field value", e, o), e.val(o)));
          });
        },
        determine: {
          isValid: function isValid() {
            var n = !0;
            return E.each(l, function (e, t) {
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
            return "string" == typeof e || E.isArray(e);
          },
          empty: function empty(e) {
            return !e || 0 === e.length || (e.is('input[type="checkbox"]') ? !e.is(":checked") : h.is.blank(e));
          },
          blank: function blank(e) {
            return "" === E.trim(e.val());
          },
          valid: function valid(e) {
            var n = !0;
            return e ? (h.verbose("Checking if field is valid", e), h.validate.field(l[e], e, !1)) : (h.verbose("Checking if form is valid"), E.each(l, function (e, t) {
              h.is.valid(e) || (n = !1);
            }), n);
          }
        },
        removeEvents: function removeEvents() {
          a.off(g), n.off(g), e.off(g), n.off(g);
        },
        event: {
          field: {
            keydown: function keydown(e) {
              var t = E(this),
                  n = e.which,
                  i = t.is(f.input),
                  o = t.is(f.checkbox),
                  r = 0 < t.closest(f.uiDropdown).length,
                  a = 13;
              n == 27 && (h.verbose("Escape key pressed blurring field"), t.blur()), e.ctrlKey || n != a || !i || r || o || (y || (t.one("keyup" + g, h.event.field.keyup), h.submit(), h.debug("Enter pressed on input submitting form")), y = !0);
            },
            keyup: function keyup() {
              y = !1;
            },
            blur: function blur(e) {
              var t = E(this),
                  n = t.closest(c),
                  i = h.get.validation(t);
              n.hasClass(m.error) ? (h.debug("Revalidating field", t, i), i && h.validate.field(i)) : "blur" == d.on && i && h.validate.field(i);
            },
            change: function change(e) {
              var t = E(this),
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
            return !(!e.type || !e.value && !h.is.bracketedRule(e)) && (e.value !== q ? e.value : e.type.match(d.regExp.bracket)[1] + "");
          },
          ruleName: function ruleName(e) {
            return h.is.bracketedRule(e) ? e.type.replace(e.type.match(d.regExp.bracket)[0], "") : e.type;
          },
          changeEvent: function changeEvent(e, t) {
            return "checkbox" == e || "radio" == e || "hidden" == e || t.is("select") ? "change" : h.get.inputEvent();
          },
          inputEvent: function inputEvent() {
            return O.createElement("input").oninput !== q ? "input" : O.createElement("input").onpropertychange !== q ? "propertychange" : "keyup";
          },
          fieldsFromShorthand: function fieldsFromShorthand(e) {
            var i = {};
            return E.each(e, function (n, e) {
              "string" == typeof e && (e = [e]), i[n] = {
                rules: []
              }, E.each(e, function (e, t) {
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
                r = h.get.ancillaryValue(e),
                a = h.get.field(t.identifier),
                s = a.val(),
                c = E.isFunction(e.prompt) ? e.prompt(s) : e.prompt || d.prompt[o] || d.text.unspecifiedRule,
                l = -1 !== c.search("{value}"),
                u = -1 !== c.search("{name}");
            return l && (c = c.replace("{value}", a.val())), u && (i = 1 == (n = a.closest(f.group).find("label").eq(0)).length ? n.text() : a.prop("placeholder") || d.text.unspecifiedField, c = c.replace("{name}", i)), c = (c = c.replace("{identifier}", t.identifier)).replace("{ruleValue}", r), e.prompt || h.verbose("Using default validation prompt for type", c, o), c;
          },
          settings: function settings() {
            if (E.isPlainObject(x)) {
              var e = Object.keys(x);
              0 < e.length && x[e[0]].identifier !== q && x[e[0]].rules !== q ? (d = E.extend(!0, {}, E.fn.form.settings, A), l = E.extend({}, E.fn.form.settings.defaults, x), h.error(d.error.oldSyntax, b), h.verbose("Extending settings from legacy parameters", l, d)) : (x.fields && h.is.shorthandFields(x.fields) && (x.fields = h.get.fieldsFromShorthand(x.fields)), d = E.extend(!0, {}, E.fn.form.settings, x), l = E.extend({}, E.fn.form.settings.defaults, d.fields), h.verbose("Extending settings", l, d));
            } else d = E.fn.form.settings, l = E.fn.form.settings.defaults, h.verbose("Using default form validation", l, d);

            o = d.namespace, u = d.metadata, f = d.selector, m = d.className, i = d.regExp, s = d.error, r = "module-" + o, g = "." + o, p = a.data(r), h.refresh();
          },
          field: function field(e) {
            return h.verbose("Finding field with identifier", e), e = h.escape.string(e), 0 < n.filter("#" + e).length ? n.filter("#" + e) : 0 < n.filter('[name="' + e + '"]').length ? n.filter('[name="' + e + '"]') : 0 < n.filter('[name="' + e + '[]"]').length ? n.filter('[name="' + e + '[]"]') : 0 < n.filter("[data-" + u.validate + '="' + e + '"]').length ? n.filter("[data-" + u.validate + '="' + e + '"]') : E("<input/>");
          },
          fields: function fields(e) {
            var n = E();
            return E.each(e, function (e, t) {
              n = n.add(h.get.field(t));
            }), n;
          },
          validation: function validation(n) {
            var i, o;
            return !!l && (E.each(l, function (e, t) {
              o = t.identifier || e, h.get.field(o)[0] == n[0] && (t.identifier = o, i = t);
            }), i || !1);
          },
          value: function value(e) {
            var t = [];
            return t.push(e), h.get.values.call(b, t)[e];
          },
          values: function values(e) {
            var t = E.isArray(e) ? h.get.fields(e) : n,
                l = {};
            return t.each(function (e, t) {
              var n = E(t),
                  i = (n.prop("type"), n.prop("name")),
                  o = n.val(),
                  r = n.is(f.checkbox),
                  a = n.is(f.radio),
                  s = -1 !== i.indexOf("[]"),
                  c = !!r && n.is(":checked");
              i && (s ? (i = i.replace("[]", ""), l[i] || (l[i] = []), r ? c ? l[i].push(o || !0) : l[i].push(!1) : l[i].push(o)) : a ? l[i] !== q && 0 != l[i] || (l[i] = !!c && (o || !0)) : l[i] = r ? !!c && (o || !0) : o);
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
            h.is.shorthandRules(e) ? (e = E.isArray(e) ? e : [e], i[n] = {
              rules: []
            }, E.each(e, function (e, t) {
              i[n].rules.push({
                type: t
              });
            })) : i[n] = e, l = E.extend({}, l, i), h.debug("Adding rules", i, l);
          },
          fields: function fields(e) {
            var t;
            t = e && h.is.shorthandFields(e) ? h.get.fieldsFromShorthand(e) : e, l = E.extend({}, l, t);
          },
          prompt: function prompt(e, t) {
            var n = h.get.field(e).closest(c),
                i = n.children(f.prompt),
                o = 0 !== i.length;
            t = "string" == typeof t ? [t] : t, h.verbose("Adding field error state", e), n.addClass(m.error), d.inline && (o || (i = d.templates.prompt(t)).appendTo(n), i.html(t[0]), o ? h.verbose("Inline errors are disabled, no inline error added", e) : d.transition && E.fn.transition !== q && a.transition("is supported") ? (h.verbose("Displaying error with css transition", d.transition), i.transition(d.transition + " in", d.duration)) : (h.verbose("Displaying error with fallback javascript animation"), i.fadeIn(d.duration)));
          },
          errors: function errors(e) {
            h.debug("Adding form error messages", e), h.set.error(), t.html(d.templates.error(e));
          }
        },
        remove: {
          rule: function rule(n, e) {
            var i = E.isArray(e) ? e : [e];
            if (e == q) return h.debug("Removed all rules"), void (l[n].rules = []);
            l[n] != q && E.isArray(l[n].rules) && E.each(l[n].rules, function (e, t) {
              -1 !== i.indexOf(t.type) && (h.debug("Removed rule", t.type), l[n].rules.splice(e, 1));
            });
          },
          field: function field(e) {
            var t = E.isArray(e) ? e : [e];
            E.each(t, function (e, t) {
              h.remove.rule(t);
            });
          },
          rules: function rules(e, n) {
            E.isArray(e) ? E.each(fields, function (e, t) {
              h.remove.rule(t, n);
            }) : h.remove.rule(e, n);
          },
          fields: function fields(e) {
            h.remove.field(e);
          },
          prompt: function prompt(e) {
            var t = h.get.field(e).closest(c),
                n = t.children(f.prompt);
            t.removeClass(m.error), d.inline && n.is(":visible") && (h.verbose("Removing prompt for field", e), d.transition && E.fn.transition !== q && a.transition("is supported") ? n.transition(d.transition + " out", d.duration, function () {
              n.remove();
            }) : n.fadeOut(d.duration, function () {
              n.remove();
            }));
          }
        },
        set: {
          success: function success() {
            a.removeClass(m.error).addClass(m.success);
          },
          defaults: function defaults() {
            n.each(function () {
              var e = E(this),
                  t = 0 < e.filter(f.checkbox).length ? e.is(":checked") : e.val();
              e.data(u.defaultValue, t);
            });
          },
          error: function error() {
            a.removeClass(m.success).addClass(m.error);
          },
          value: function value(e, t) {
            var n = {};
            return n[e] = t, h.set.values.call(b, n);
          },
          values: function values(e) {
            E.isEmptyObject(e) || E.each(e, function (e, t) {
              var n,
                  i = h.get.field(e),
                  o = i.parent(),
                  r = E.isArray(t),
                  a = o.is(f.uiCheckbox),
                  s = o.is(f.uiDropdown),
                  c = i.is(f.radio) && a;
              0 < i.length && (r && a ? (h.verbose("Selecting multiple", t, i), o.checkbox("uncheck"), E.each(t, function (e, t) {
                n = i.filter('[value="' + t + '"]'), o = n.parent(), 0 < n.length && o.checkbox("check");
              })) : c ? (h.verbose("Selecting radio value", t, i), i.filter('[value="' + t + '"]').parent(f.uiCheckbox).checkbox("check")) : a ? (h.verbose("Setting checkbox value", t, o), !0 === t ? o.checkbox("check") : o.checkbox("uncheck")) : s ? (h.verbose("Setting dropdown value", t, o), o.dropdown("set selected", t)) : (h.verbose("Setting field value", t, i), i.val(t)));
            });
          }
        },
        validate: {
          form: function form(e, t) {
            var n = h.get.values();
            if (y) return !1;

            if (v = [], h.determine.isValid()) {
              if (h.debug("Form has no validation errors, submitting"), h.set.success(), !0 !== t) return d.onSuccess.call(b, e, n);
            } else if (h.debug("Form has errors"), h.set.error(), d.inline || h.add.errors(v), a.data("moduleApi") !== q && e.stopImmediatePropagation(), !0 !== t) return d.onFailure.call(b, v, n);
          },
          field: function field(n, e, t) {
            t = t === q || t, "string" == typeof n && (h.verbose("Validating field", n), n = l[e = n]);
            var i = n.identifier || e,
                o = h.get.field(i),
                r = !!n.depends && h.get.field(n.depends),
                a = !0,
                s = [];
            return n.identifier || (h.debug("Using field name as identifier", i), n.identifier = i), o.prop("disabled") ? (h.debug("Field is disabled. Skipping", i), a = !0) : n.optional && h.is.blank(o) ? (h.debug("Field is optional and blank. Skipping", i), a = !0) : n.depends && h.is.empty(r) ? (h.debug("Field depends on another value that is not present or empty. Skipping", r), a = !0) : n.rules !== q && E.each(n.rules, function (e, t) {
              h.has.field(i) && !h.validate.rule(n, t) && (h.debug("Field is invalid", i, t.type), s.push(h.get.prompt(t, n)), a = !1);
            }), a ? (t && (h.remove.prompt(i, s), d.onValid.call(o)), !0) : (t && (v = v.concat(s), h.add.prompt(i, s), d.onInvalid.call(o, s)), !1);
          },
          rule: function rule(e, t) {
            var n = h.get.field(e.identifier),
                i = (t.type, n.val()),
                o = h.get.ancillaryValue(t),
                r = h.get.ruleName(t),
                a = d.rules[r];
            if (E.isFunction(a)) return i = i === q || "" === i || null === i ? "" : E.trim(i + ""), a.call(n, i, o);
            h.error(s.noRule, r);
          }
        },
        setting: function setting(e, t) {
          if (E.isPlainObject(e)) E.extend(!0, d, e);else {
            if (t === q) return d[e];
            d[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (E.isPlainObject(e)) E.extend(!0, h, e);else {
            if (t === q) return h[e];
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
            d.performance && (n = (t = new Date().getTime()) - (k || t), k = t, T.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: b,
              "Execution Time": n
            })), clearTimeout(h.performance.timer), h.performance.timer = setTimeout(h.performance.display, 500);
          },
          display: function display() {
            var e = d.name + ":",
                n = 0;
            k = !1, clearTimeout(h.performance.timer), E.each(T, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", S && (e += " '" + S + "'"), 1 < w.length && (e += " (" + w.length + ")"), (console.group !== q || console.table !== q) && 0 < T.length && (console.groupCollapsed(e), console.table ? console.table(T) : E.each(T, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), T = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              r,
              n,
              a = p;
          return e = e || F, t = b || t, "string" == typeof i && a !== q && (i = i.split(/[\. ]/), o = i.length - 1, E.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (E.isPlainObject(a[n]) && e != o) a = a[n];else {
              if (a[n] !== q) return r = a[n], !1;
              if (!E.isPlainObject(a[t]) || e == o) return a[t] !== q && (r = a[t]), !1;
              a = a[t];
            }
          })), E.isFunction(r) ? n = r.apply(t, e) : r !== q && (n = r), E.isArray(C) ? C.push(n) : C !== q ? C = [C, n] : n !== q && (C = n), r;
        }
      }).initialize();
    }), C !== q ? C : this;
  }, E.fn.form.settings = {
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
        return E.each(e, function (e, t) {
          n += "<li>" + t + "</li>";
        }), E(n += "</ul>");
      },
      prompt: function prompt(e) {
        return E("<div/>").addClass("ui basic red pointing prompt label").html(e[0]);
      }
    },
    rules: {
      empty: function empty(e) {
        return !(e === q || "" === e || E.isArray(e) && 0 === e.length);
      },
      checked: function checked() {
        return 0 < E(this).filter(":checked").length;
      },
      email: function email(e) {
        return E.fn.form.settings.regExp.email.test(e);
      },
      url: function url(e) {
        return E.fn.form.settings.regExp.url.test(e);
      },
      regExp: function regExp(e, t) {
        if (t instanceof RegExp) return e.match(t);
        var n,
            i = t.match(E.fn.form.settings.regExp.flags);
        return i && (t = 2 <= i.length ? i[1] : t, n = 3 <= i.length ? i[2] : ""), e.match(new RegExp(t, n));
      },
      integer: function integer(e, t) {
        var n,
            i,
            o,
            r = E.fn.form.settings.regExp.integer;
        return t && -1 === ["", ".."].indexOf(t) && (-1 == t.indexOf("..") ? r.test(t) && (n = i = t - 0) : (o = t.split("..", 2), r.test(o[0]) && (n = o[0] - 0), r.test(o[1]) && (i = o[1] - 0))), r.test(e) && (n === q || n <= e) && (i === q || e <= i);
      },
      decimal: function decimal(e) {
        return E.fn.form.settings.regExp.decimal.test(e);
      },
      number: function number(e) {
        return E.fn.form.settings.regExp.number.test(e);
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
        return t = t.replace(E.fn.form.settings.regExp.escape, "\\$&"), -1 !== e.search(new RegExp(t, "i"));
      },
      containsExactly: function containsExactly(e, t) {
        return t = t.replace(E.fn.form.settings.regExp.escape, "\\$&"), -1 !== e.search(new RegExp(t));
      },
      doesntContain: function doesntContain(e, t) {
        return t = t.replace(E.fn.form.settings.regExp.escape, "\\$&"), -1 === e.search(new RegExp(t, "i"));
      },
      doesntContainExactly: function doesntContainExactly(e, t) {
        return t = t.replace(E.fn.form.settings.regExp.escape, "\\$&"), -1 === e.search(new RegExp(t));
      },
      minLength: function minLength(e, t) {
        return e !== q && e.length >= t;
      },
      length: function length(e, t) {
        return e !== q && e.length >= t;
      },
      exactLength: function exactLength(e, t) {
        return e !== q && e.length == t;
      },
      maxLength: function maxLength(e, t) {
        return e !== q && e.length <= t;
      },
      match: function match(e, t) {
        var n;
        E(this);
        return 0 < E('[data-validate="' + t + '"]').length ? n = E('[data-validate="' + t + '"]').val() : 0 < E("#" + t).length ? n = E("#" + t).val() : 0 < E('[name="' + t + '"]').length ? n = E('[name="' + t + '"]').val() : 0 < E('[name="' + t + '[]"]').length && (n = E('[name="' + t + '[]"]')), n !== q && e.toString() == n.toString();
      },
      different: function different(e, t) {
        var n;
        E(this);
        return 0 < E('[data-validate="' + t + '"]').length ? n = E('[data-validate="' + t + '"]').val() : 0 < E("#" + t).length ? n = E("#" + t).val() : 0 < E('[name="' + t + '"]').length ? n = E('[name="' + t + '"]').val() : 0 < E('[name="' + t + '[]"]').length && (n = E('[name="' + t + '[]"]')), n !== q && e.toString() !== n.toString();
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
            r = {},
            a = !1,
            s = "string" == typeof e && e.split(",");

        if ("string" == typeof n && 0 !== n.length) {
          if (n = n.replace(/[\-]/g, ""), s && (E.each(s, function (e, t) {
            (i = o[t]) && (r = {
              length: -1 !== E.inArray(n.length, i.length),
              pattern: -1 !== n.search(i.pattern)
            }).length && r.pattern && (a = !0);
          }), !a)) return !1;
          if ((t = {
            number: -1 !== E.inArray(n.length, o.unionPay.length),
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
}(jQuery, window, document), function (F, E, O, q) {
  "use strict";

  E = void 0 !== E && E.Math == Math ? E : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), F.fn.tab = function (a) {
    var l,
        u = F.isFunction(this) ? F(E) : F(this),
        d = u.selector || "",
        f = new Date().getTime(),
        m = [],
        g = a,
        R = "string" == typeof g,
        A = [].slice.call(arguments, 1),
        P = !1;
    return u.each(function () {
      var p,
          r,
          h,
          b,
          v,
          y,
          x = F.isPlainObject(a) ? F.extend(!0, {}, F.fn.tab.settings, a) : F.extend({}, F.fn.tab.settings),
          C = x.className,
          w = x.metadata,
          t = x.selector,
          S = x.error,
          e = "." + x.namespace,
          n = "module-" + x.namespace,
          k = F(this),
          i = {},
          T = !0,
          o = 0,
          s = this,
          c = k.data(n);
      v = {
        initialize: function initialize() {
          v.debug("Initializing tab menu item", k), v.fix.callbacks(), v.determineTabs(), v.debug("Determining tabs", x.context, r), x.auto && v.set.auto(), v.bind.events(), x.history && !P && (v.initializeHistory(), P = !0), v.instantiate();
        },
        instantiate: function instantiate() {
          v.verbose("Storing instance of module", v), c = v, k.data(n, v);
        },
        destroy: function destroy() {
          v.debug("Destroying tabs", k), k.removeData(n).off(e);
        },
        bind: {
          events: function events() {
            F.isWindow(s) || (v.debug("Attaching tab activation events to element", k), k.on("click" + e, v.event.click));
          }
        },
        determineTabs: function determineTabs() {
          var e;
          "parent" === x.context ? (0 < k.closest(t.ui).length ? (e = k.closest(t.ui), v.verbose("Using closest UI element as parent", e)) : e = k, p = e.parent(), v.verbose("Determined parent element for creating context", p)) : x.context ? (p = F(x.context), v.verbose("Using selector for tab context", x.context, p)) : p = F("body"), x.childrenOnly ? (r = p.children(t.tabs), v.debug("Searching tab context children for tabs", p, r)) : (r = p.find(t.tabs), v.debug("Searching tab context for tabs", p, r));
        },
        fix: {
          callbacks: function callbacks() {
            F.isPlainObject(a) && (a.onTabLoad || a.onTabInit) && (a.onTabLoad && (a.onLoad = a.onTabLoad, delete a.onTabLoad, v.error(S.legacyLoad, a.onLoad)), a.onTabInit && (a.onFirstLoad = a.onTabInit, delete a.onTabInit, v.error(S.legacyInit, a.onFirstLoad)), x = F.extend(!0, {}, F.fn.tab.settings, a));
          }
        },
        initializeHistory: function initializeHistory() {
          if (v.debug("Initializing page state"), F.address === q) return v.error(S.state), !1;

          if ("state" == x.historyType) {
            if (v.debug("Using HTML5 to manage state"), !1 === x.path) return v.error(S.path), !1;
            F.address.history(!0).state(x.path);
          }

          F.address.bind("change", v.event.history.change);
        },
        event: {
          click: function click(e) {
            var t = F(this).data(w.tab);
            t !== q ? (x.history ? (v.verbose("Updating page state", e), F.address.value(t)) : (v.verbose("Changing tab", e), v.changeTab(t)), e.preventDefault()) : v.debug("No tab specified");
          },
          history: {
            change: function change(e) {
              var t = e.pathNames.join("/") || v.get.initialPath(),
                  n = x.templates.determineTitle(t) || !1;
              v.performance.display(), v.debug("History change event", t, e), y = e, t !== q && v.changeTab(t), n && F.address.title(n);
            }
          }
        },
        refresh: function refresh() {
          h && (v.debug("Refreshing tab", h), v.changeTab(h));
        },
        cache: {
          read: function read(e) {
            return e !== q && i[e];
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
            v.verbose("Setting up automatic tab retrieval from server", e), F.isPlainObject(x.apiSettings) ? x.apiSettings.url = e : x.apiSettings = {
              url: e
            };
          },
          loading: function loading(e) {
            var t = v.get.tabElement(e);
            t.hasClass(C.loading) || (v.verbose("Setting loading state for", t), t.addClass(C.loading).siblings(r).removeClass(C.active + " " + C.loading), 0 < t.length && x.onRequest.call(t[0], e));
          },
          state: function state(e) {
            F.address.value(e);
          }
        },
        changeTab: function changeTab(d) {
          var f = E.history && E.history.pushState && x.ignoreFirstLoad && T,
              m = x.auto || F.isPlainObject(x.apiSettings),
              g = m && !f ? v.utilities.pathToArray(d) : v.get.defaultPathArray(d);
          d = v.utilities.arrayToPath(g), F.each(g, function (e, t) {
            var n,
                i,
                o,
                r,
                a = g.slice(0, e + 1),
                s = v.utilities.arrayToPath(a),
                c = v.is.tab(s),
                l = e + 1 == g.length,
                u = v.get.tabElement(s);

            if (v.verbose("Looking for tab", t), c) {
              if (v.verbose("Tab was found", t), h = s, b = v.utilities.filterArray(g, a), l ? r = !0 : (i = g.slice(0, e + 2), o = v.utilities.arrayToPath(i), (r = !v.is.tab(o)) && v.verbose("Tab parameters found", i)), r && m) return f ? (v.debug("Ignoring remote content on first tab load", s), T = !1, v.cache.add(d, u.html()), v.activate.all(s), x.onFirstLoad.call(u[0], s, b, y), x.onLoad.call(u[0], s, b, y)) : (v.activate.navigation(s), v.fetch.content(s, d)), !1;
              v.debug("Opened local tab", s), v.activate.all(s), v.cache.read(s) || (v.cache.add(s, !0), v.debug("First time tab loaded calling tab init"), x.onFirstLoad.call(u[0], s, b, y)), x.onLoad.call(u[0], s, b, y);
            } else {
              if (-1 != d.search("/") || "" === d) return v.error(S.missingTab, k, p, s), !1;
              if (s = (n = F("#" + d + ', a[name="' + d + '"]')).closest("[data-tab]").data(w.tab), u = v.get.tabElement(s), n && 0 < n.length && s) return v.debug("Anchor link used, opening parent tab", u, n), u.hasClass(C.active) || setTimeout(function () {
                v.scrollTo(n);
              }, 0), v.activate.all(s), v.cache.read(s) || (v.cache.add(s, !0), v.debug("First time tab loaded calling tab init"), x.onFirstLoad.call(u[0], s, b, y)), x.onLoad.call(u[0], s, b, y), !1;
            }
          });
        },
        scrollTo: function scrollTo(e) {
          var t = !!(e && 0 < e.length) && e.offset().top;
          !1 !== t && (v.debug("Forcing scroll to an in-page link in a hidden tab", t, e), F(O).scrollTop(t));
        },
        update: {
          content: function content(e, t, n) {
            var i = v.get.tabElement(e),
                o = i[0];
            n = n !== q ? n : x.evaluateScripts, "string" == typeof x.cacheType && "dom" == x.cacheType.toLowerCase() && "string" != typeof t ? i.empty().append(F(t).clone(!0)) : n ? (v.debug("Updating HTML and evaluating inline scripts", e, t), i.html(t)) : (v.debug("Updating HTML", e, t), o.innerHTML = t);
          }
        },
        fetch: {
          content: function content(t, n) {
            var e,
                i,
                o = v.get.tabElement(t),
                r = {
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
                a = o.api("get request") || !1,
                s = a && "pending" === a.state();
            n = n || t, i = v.cache.read(n), x.cache && i ? (v.activate.tab(t), v.debug("Adding cached content", n), x.loadOnce || ("once" == x.evaluateScripts ? v.update.content(t, i, !1) : v.update.content(t, i)), x.onLoad.call(o[0], t, b, y)) : s ? (v.set.loading(t), v.debug("Content is already loading", n)) : F.api !== q ? (e = F.extend(!0, {}, x.apiSettings, r), v.debug("Retrieving remote content", n, e), v.set.loading(t), o.api(e)) : v.error(S.api);
          }
        },
        activate: {
          all: function all(e) {
            v.activate.tab(e), v.activate.navigation(e);
          },
          tab: function tab(e) {
            var t = v.get.tabElement(e),
                n = "siblings" == x.deactivate ? t.siblings(r) : r.not(t),
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
            r.removeClass(C.active + " " + C.loading);
          }
        },
        is: {
          tab: function tab(e) {
            return e !== q && 0 < v.get.tabElement(e).length;
          }
        },
        get: {
          initialPath: function initialPath() {
            return u.eq(0).data(w.tab) || r.eq(0).data(w.tab);
          },
          path: function path() {
            return F.address.value();
          },
          defaultPathArray: function defaultPathArray(e) {
            return v.utilities.pathToArray(v.get.defaultPath(e));
          },
          defaultPath: function defaultPath(e) {
            var t = u.filter("[data-" + w.tab + '^="' + e + '/"]').eq(0).data(w.tab) || !1;

            if (t) {
              if (v.debug("Found default tab", t), o < x.maxDepth) return o++, v.get.defaultPath(t);
              v.error(S.recursion);
            } else v.debug("No default tabs found for", e, r);

            return o = 0, e;
          },
          navElement: function navElement(e) {
            return e = e || h, u.filter("[data-" + w.tab + '="' + e + '"]');
          },
          tabElement: function tabElement(e) {
            var t, n, i, o;
            return e = e || h, i = v.utilities.pathToArray(e), o = v.utilities.last(i), t = r.filter("[data-" + w.tab + '="' + e + '"]'), n = r.filter("[data-" + w.tab + '="' + o + '"]'), 0 < t.length ? t : n;
          },
          tab: function tab() {
            return h;
          }
        },
        utilities: {
          filterArray: function filterArray(e, t) {
            return F.grep(e, function (e) {
              return -1 == F.inArray(e, t);
            });
          },
          last: function last(e) {
            return !!F.isArray(e) && e[e.length - 1];
          },
          pathToArray: function pathToArray(e) {
            return e === q && (e = h), "string" == typeof e ? e.split("/") : [e];
          },
          arrayToPath: function arrayToPath(e) {
            return !!F.isArray(e) && e.join("/");
          }
        },
        setting: function setting(e, t) {
          if (v.debug("Changing setting", e, t), F.isPlainObject(e)) F.extend(!0, x, e);else {
            if (t === q) return x[e];
            F.isPlainObject(x[e]) ? F.extend(!0, x[e], t) : x[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (F.isPlainObject(e)) F.extend(!0, v, e);else {
            if (t === q) return v[e];
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
            f = !1, clearTimeout(v.performance.timer), F.each(m, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", d && (e += " '" + d + "'"), (console.group !== q || console.table !== q) && 0 < m.length && (console.groupCollapsed(e), console.table ? console.table(m) : F.each(m, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), m = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              r,
              n,
              a = c;
          return e = e || A, t = s || t, "string" == typeof i && a !== q && (i = i.split(/[\. ]/), o = i.length - 1, F.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (F.isPlainObject(a[n]) && e != o) a = a[n];else {
              if (a[n] !== q) return r = a[n], !1;
              if (!F.isPlainObject(a[t]) || e == o) return a[t] !== q ? r = a[t] : v.error(S.method, i), !1;
              a = a[t];
            }
          })), F.isFunction(r) ? n = r.apply(t, e) : r !== q && (n = r), F.isArray(l) ? l.push(n) : l !== q ? l = [l, n] : n !== q && (l = n), r;
        }
      }, R ? (c === q && v.initialize(), v.invoke(g)) : (c !== q && c.invoke("destroy"), v.initialize());
    }), l !== q ? l : this;
  }, F.tab = function () {
    F(E).tab.apply(this, arguments);
  }, F.fn.tab.settings = {
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
}(jQuery, window, document), function (T, R, A, P) {
  "use strict";

  R = void 0 !== R && R.Math == Math ? R : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), T.fn.sticky = function (b) {
    var v,
        e = T(this),
        y = e.selector || "",
        x = new Date().getTime(),
        C = [],
        w = b,
        S = "string" == typeof w,
        k = [].slice.call(arguments, 1);
    return e.each(function () {
      var i,
          o,
          e,
          t,
          d,
          f = T.isPlainObject(b) ? T.extend(!0, {}, T.fn.sticky.settings, b) : T.extend({}, T.fn.sticky.settings),
          n = f.className,
          r = f.namespace,
          a = f.error,
          s = "." + r,
          c = "module-" + r,
          l = T(this),
          u = T(R),
          m = T(f.scrollContext),
          g = (l.selector, l.data(c)),
          p = R.requestAnimationFrame || R.mozRequestAnimationFrame || R.webkitRequestAnimationFrame || R.msRequestAnimationFrame || function (e) {
        setTimeout(e, 0);
      },
          h = this;

      d = {
        initialize: function initialize() {
          d.determineContainer(), d.determineContext(), d.verbose("Initializing sticky", f, i), d.save.positions(), d.checkErrors(), d.bind.events(), f.observeChanges && d.observeChanges(), d.instantiate();
        },
        instantiate: function instantiate() {
          d.verbose("Storing instance of module", d), g = d, l.data(c, d);
        },
        destroy: function destroy() {
          d.verbose("Destroying previous instance"), d.reset(), e && e.disconnect(), t && t.disconnect(), u.off("load" + s, d.event.load).off("resize" + s, d.event.resize), m.off("scrollchange" + s, d.event.scrollchange), l.removeData(c);
        },
        observeChanges: function observeChanges() {
          "MutationObserver" in R && (e = new MutationObserver(d.event.documentChanged), t = new MutationObserver(d.event.changed), e.observe(A, {
            childList: !0,
            subtree: !0
          }), t.observe(h, {
            childList: !0,
            subtree: !0
          }), t.observe(o[0], {
            childList: !0,
            subtree: !0
          }), d.debug("Setting up mutation observer", t));
        },
        determineContainer: function determineContainer() {
          i = f.container ? T(f.container) : l.offsetParent();
        },
        determineContext: function determineContext() {
          0 !== (o = f.context ? T(f.context) : i).length || d.error(a.invalidContext, f.context, l);
        },
        checkErrors: function checkErrors() {
          if (d.is.hidden() && d.error(a.visible, l), d.cache.element.height > d.cache.context.height) return d.reset(), void d.error(a.elementSize, l);
        },
        bind: {
          events: function events() {
            u.on("load" + s, d.event.load).on("resize" + s, d.event.resize), m.off("scroll" + s).on("scroll" + s, d.event.scroll).on("scrollchange" + s, d.event.scrollchange);
          }
        },
        event: {
          changed: function changed(e) {
            clearTimeout(d.timer), d.timer = setTimeout(function () {
              d.verbose("DOM tree modified, updating sticky menu", e), d.refresh();
            }, 100);
          },
          documentChanged: function documentChanged(e) {
            [].forEach.call(e, function (e) {
              e.removedNodes && [].forEach.call(e.removedNodes, function (e) {
                (e == h || 0 < T(e).find(h).length) && (d.debug("Element removed from DOM, tearing down events"), d.destroy());
              });
            });
          },
          load: function load() {
            d.verbose("Page contents finished loading"), p(d.refresh);
          },
          resize: function resize() {
            d.verbose("Window resized"), p(d.refresh);
          },
          scroll: function scroll() {
            p(function () {
              m.triggerHandler("scrollchange" + s, m.scrollTop());
            });
          },
          scrollchange: function scrollchange(e, t) {
            d.stick(t), f.onScroll.call(h);
          }
        },
        refresh: function refresh(e) {
          d.reset(), f.context || d.determineContext(), e && d.determineContainer(), d.save.positions(), d.stick(), f.onReposition.call(h);
        },
        supports: {
          sticky: function sticky() {
            var e = T("<div/>");
            e[0];
            return e.addClass(n.supported), e.css("position").match("sticky");
          }
        },
        save: {
          lastScroll: function lastScroll(e) {
            d.lastScroll = e;
          },
          elementScroll: function elementScroll(e) {
            d.elementScroll = e;
          },
          positions: function positions() {
            var e = {
              height: m.height()
            },
                t = {
              margin: {
                top: parseInt(l.css("margin-top"), 10),
                bottom: parseInt(l.css("margin-bottom"), 10)
              },
              offset: l.offset(),
              width: l.outerWidth(),
              height: l.outerHeight()
            },
                n = {
              offset: o.offset(),
              height: o.outerHeight()
            };
            i.outerHeight();
            d.is.standardScroll() || (d.debug("Non-standard scroll. Removing scroll offset from element offset"), e.top = m.scrollTop(), e.left = m.scrollLeft(), t.offset.top += e.top, n.offset.top += e.top, t.offset.left += e.left, n.offset.left += e.left), d.cache = {
              fits: t.height + f.offset <= e.height,
              sameHeight: t.height == n.height,
              scrollContext: {
                height: e.height
              },
              element: {
                margin: t.margin,
                top: t.offset.top - t.margin.top,
                left: t.offset.left,
                width: t.width,
                height: t.height,
                bottom: t.offset.top + t.height
              },
              context: {
                top: n.offset.top,
                height: n.height,
                bottom: n.offset.top + n.height
              }
            }, d.set.containerSize(), d.stick(), d.debug("Caching element positions", d.cache);
          }
        },
        get: {
          direction: function direction(e) {
            var t = "down";
            return e = e || m.scrollTop(), d.lastScroll !== P && (d.lastScroll < e ? t = "down" : d.lastScroll > e && (t = "up")), t;
          },
          scrollChange: function scrollChange(e) {
            return e = e || m.scrollTop(), d.lastScroll ? e - d.lastScroll : 0;
          },
          currentElementScroll: function currentElementScroll() {
            return d.elementScroll ? d.elementScroll : d.is.top() ? Math.abs(parseInt(l.css("top"), 10)) || 0 : Math.abs(parseInt(l.css("bottom"), 10)) || 0;
          },
          elementScroll: function elementScroll(e) {
            e = e || m.scrollTop();
            var t = d.cache.element,
                n = d.cache.scrollContext,
                i = d.get.scrollChange(e),
                o = t.height - n.height + f.offset,
                r = d.get.currentElementScroll(),
                a = r + i;
            return r = d.cache.fits || a < 0 ? 0 : o < a ? o : a;
          }
        },
        remove: {
          lastScroll: function lastScroll() {
            delete d.lastScroll;
          },
          elementScroll: function elementScroll(e) {
            delete d.elementScroll;
          },
          minimumSize: function minimumSize() {
            i.css("min-height", "");
          },
          offset: function offset() {
            l.css("margin-top", "");
          }
        },
        set: {
          offset: function offset() {
            d.verbose("Setting offset on element", f.offset), l.css("margin-top", f.offset);
          },
          containerSize: function containerSize() {
            var e = i.get(0).tagName;
            "HTML" === e || "body" == e ? d.determineContainer() : Math.abs(i.outerHeight() - d.cache.context.height) > f.jitter && (d.debug("Context has padding, specifying exact height for container", d.cache.context.height), i.css({
              height: d.cache.context.height
            }));
          },
          minimumSize: function minimumSize() {
            var e = d.cache.element;
            i.css("min-height", e.height);
          },
          scroll: function scroll(e) {
            d.debug("Setting scroll on element", e), d.elementScroll != e && (d.is.top() && l.css("bottom", "").css("top", -e), d.is.bottom() && l.css("top", "").css("bottom", e));
          },
          size: function size() {
            0 !== d.cache.element.height && 0 !== d.cache.element.width && (h.style.setProperty("width", d.cache.element.width + "px", "important"), h.style.setProperty("height", d.cache.element.height + "px", "important"));
          }
        },
        is: {
          standardScroll: function standardScroll() {
            return m[0] == R;
          },
          top: function top() {
            return l.hasClass(n.top);
          },
          bottom: function bottom() {
            return l.hasClass(n.bottom);
          },
          initialPosition: function initialPosition() {
            return !d.is.fixed() && !d.is.bound();
          },
          hidden: function hidden() {
            return !l.is(":visible");
          },
          bound: function bound() {
            return l.hasClass(n.bound);
          },
          fixed: function fixed() {
            return l.hasClass(n.fixed);
          }
        },
        stick: function stick(e) {
          var t = e || m.scrollTop(),
              n = d.cache,
              i = n.fits,
              o = n.sameHeight,
              r = n.element,
              a = n.scrollContext,
              s = n.context,
              c = d.is.bottom() && f.pushing ? f.bottomOffset : f.offset,
              l = (e = {
            top: t + c,
            bottom: t + c + a.height
          }, d.get.direction(e.top), i ? 0 : d.get.elementScroll(e.top)),
              u = !i;
          0 !== r.height && !o && (d.is.initialPosition() ? e.top >= s.bottom ? (d.debug("Initial element position is bottom of container"), d.bindBottom()) : e.top > r.top && (r.height + e.top - l >= s.bottom ? (d.debug("Initial element position is bottom of container"), d.bindBottom()) : (d.debug("Initial element position is fixed"), d.fixTop())) : d.is.fixed() ? d.is.top() ? e.top <= r.top ? (d.debug("Fixed element reached top of container"), d.setInitialPosition()) : r.height + e.top - l >= s.bottom ? (d.debug("Fixed element reached bottom of container"), d.bindBottom()) : u && (d.set.scroll(l), d.save.lastScroll(e.top), d.save.elementScroll(l)) : d.is.bottom() && (e.bottom - r.height <= r.top ? (d.debug("Bottom fixed rail has reached top of container"), d.setInitialPosition()) : e.bottom >= s.bottom ? (d.debug("Bottom fixed rail has reached bottom of container"), d.bindBottom()) : u && (d.set.scroll(l), d.save.lastScroll(e.top), d.save.elementScroll(l))) : d.is.bottom() && (e.top <= r.top ? (d.debug("Jumped from bottom fixed to top fixed, most likely used home/end button"), d.setInitialPosition()) : f.pushing ? d.is.bound() && e.bottom <= s.bottom && (d.debug("Fixing bottom attached element to bottom of browser."), d.fixBottom()) : d.is.bound() && e.top <= s.bottom - r.height && (d.debug("Fixing bottom attached element to top of browser."), d.fixTop())));
        },
        bindTop: function bindTop() {
          d.debug("Binding element to top of parent container"), d.remove.offset(), l.css({
            left: "",
            top: "",
            marginBottom: ""
          }).removeClass(n.fixed).removeClass(n.bottom).addClass(n.bound).addClass(n.top), f.onTop.call(h), f.onUnstick.call(h);
        },
        bindBottom: function bindBottom() {
          d.debug("Binding element to bottom of parent container"), d.remove.offset(), l.css({
            left: "",
            top: ""
          }).removeClass(n.fixed).removeClass(n.top).addClass(n.bound).addClass(n.bottom), f.onBottom.call(h), f.onUnstick.call(h);
        },
        setInitialPosition: function setInitialPosition() {
          d.debug("Returning to initial position"), d.unfix(), d.unbind();
        },
        fixTop: function fixTop() {
          d.debug("Fixing element to top of page"), f.setSize && d.set.size(), d.set.minimumSize(), d.set.offset(), l.css({
            left: d.cache.element.left,
            bottom: "",
            marginBottom: ""
          }).removeClass(n.bound).removeClass(n.bottom).addClass(n.fixed).addClass(n.top), f.onStick.call(h);
        },
        fixBottom: function fixBottom() {
          d.debug("Sticking element to bottom of page"), f.setSize && d.set.size(), d.set.minimumSize(), d.set.offset(), l.css({
            left: d.cache.element.left,
            bottom: "",
            marginBottom: ""
          }).removeClass(n.bound).removeClass(n.top).addClass(n.fixed).addClass(n.bottom), f.onStick.call(h);
        },
        unbind: function unbind() {
          d.is.bound() && (d.debug("Removing container bound position on element"), d.remove.offset(), l.removeClass(n.bound).removeClass(n.top).removeClass(n.bottom));
        },
        unfix: function unfix() {
          d.is.fixed() && (d.debug("Removing fixed position on element"), d.remove.minimumSize(), d.remove.offset(), l.removeClass(n.fixed).removeClass(n.top).removeClass(n.bottom), f.onUnstick.call(h));
        },
        reset: function reset() {
          d.debug("Resetting elements position"), d.unbind(), d.unfix(), d.resetCSS(), d.remove.offset(), d.remove.lastScroll();
        },
        resetCSS: function resetCSS() {
          l.css({
            width: "",
            height: ""
          }), i.css({
            height: ""
          });
        },
        setting: function setting(e, t) {
          if (T.isPlainObject(e)) T.extend(!0, f, e);else {
            if (t === P) return f[e];
            f[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (T.isPlainObject(e)) T.extend(!0, d, e);else {
            if (t === P) return d[e];
            d[e] = t;
          }
        },
        debug: function debug() {
          !f.silent && f.debug && (f.performance ? d.performance.log(arguments) : (d.debug = Function.prototype.bind.call(console.info, console, f.name + ":"), d.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !f.silent && f.verbose && f.debug && (f.performance ? d.performance.log(arguments) : (d.verbose = Function.prototype.bind.call(console.info, console, f.name + ":"), d.verbose.apply(console, arguments)));
        },
        error: function error() {
          f.silent || (d.error = Function.prototype.bind.call(console.error, console, f.name + ":"), d.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var t, n;
            f.performance && (n = (t = new Date().getTime()) - (x || t), x = t, C.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: h,
              "Execution Time": n
            })), clearTimeout(d.performance.timer), d.performance.timer = setTimeout(d.performance.display, 0);
          },
          display: function display() {
            var e = f.name + ":",
                n = 0;
            x = !1, clearTimeout(d.performance.timer), T.each(C, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", y && (e += " '" + y + "'"), (console.group !== P || console.table !== P) && 0 < C.length && (console.groupCollapsed(e), console.table ? console.table(C) : T.each(C, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), C = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              r,
              n,
              a = g;
          return e = e || k, t = h || t, "string" == typeof i && a !== P && (i = i.split(/[\. ]/), o = i.length - 1, T.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (T.isPlainObject(a[n]) && e != o) a = a[n];else {
              if (a[n] !== P) return r = a[n], !1;
              if (!T.isPlainObject(a[t]) || e == o) return a[t] !== P && (r = a[t]), !1;
              a = a[t];
            }
          })), T.isFunction(r) ? n = r.apply(t, e) : r !== P && (n = r), T.isArray(v) ? v.push(n) : v !== P ? v = [v, n] : n !== P && (v = n), r;
        }
      }, S ? (g === P && d.initialize(), d.invoke(w)) : (g !== P && g.invoke("destroy"), d.initialize());
    }), v !== P ? v : this;
  }, T.fn.sticky.settings = {
    name: "Sticky",
    namespace: "sticky",
    silent: !1,
    debug: !1,
    verbose: !0,
    performance: !0,
    pushing: !1,
    context: !1,
    container: !1,
    scrollContext: R,
    offset: 0,
    bottomOffset: 0,
    jitter: 5,
    setSize: !0,
    observeChanges: !1,
    onReposition: function onReposition() {},
    onScroll: function onScroll() {},
    onStick: function onStick() {},
    onUnstick: function onUnstick() {},
    onTop: function onTop() {},
    onBottom: function onBottom() {},
    error: {
      container: "Sticky element must be inside a relative container",
      visible: "Element is hidden, you must call refresh after element becomes visible. Use silent setting to surpress this warning in production.",
      method: "The method you called is not defined.",
      invalidContext: "Context specified does not exist",
      elementSize: "Sticky element is larger than its container, cannot create sticky."
    },
    className: {
      bound: "bound",
      fixed: "fixed",
      supported: "native",
      top: "top",
      bottom: "bottom"
    }
  };
}(jQuery, window, document), function (z, M, N, L) {
  "use strict";

  M = void 0 !== M && M.Math == Math ? M : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), z.fn.popup = function (k) {
    var T,
        e = z(this),
        R = z(N),
        A = z(M),
        P = z("body"),
        F = e.selector || "",
        E = new Date().getTime(),
        O = [],
        q = k,
        j = "string" == typeof q,
        D = [].slice.call(arguments, 1);
    return e.each(function () {
      var u,
          l,
          e,
          t,
          n,
          d,
          f = z.isPlainObject(k) ? z.extend(!0, {}, z.fn.popup.settings, k) : z.extend({}, z.fn.popup.settings),
          o = f.selector,
          m = f.className,
          g = f.error,
          p = f.metadata,
          i = f.namespace,
          r = "." + f.namespace,
          a = "module-" + i,
          h = z(this),
          s = z(f.context),
          c = z(f.scrollContext),
          b = z(f.boundary),
          v = f.target ? z(f.target) : h,
          y = 0,
          x = !1,
          C = !1,
          w = this,
          S = h.data(a);
      d = {
        initialize: function initialize() {
          d.debug("Initializing", h), d.createID(), d.bind.events(), !d.exists() && f.preserve && d.create(), f.observeChanges && d.observeChanges(), d.instantiate();
        },
        instantiate: function instantiate() {
          d.verbose("Storing instance", d), S = d, h.data(a, S);
        },
        observeChanges: function observeChanges() {
          "MutationObserver" in M && ((e = new MutationObserver(d.event.documentChanged)).observe(N, {
            childList: !0,
            subtree: !0
          }), d.debug("Setting up mutation observer", e));
        },
        refresh: function refresh() {
          f.popup ? u = z(f.popup).eq(0) : f.inline && (u = v.nextAll(o.popup).eq(0), f.popup = u), f.popup ? (u.addClass(m.loading), l = d.get.offsetParent(), u.removeClass(m.loading), f.movePopup && d.has.popup() && d.get.offsetParent(u)[0] !== l[0] && (d.debug("Moving popup to the same offset parent as target"), u.detach().appendTo(l))) : l = f.inline ? d.get.offsetParent(v) : d.has.popup() ? d.get.offsetParent(u) : P, l.is("html") && l[0] !== P[0] && (d.debug("Setting page as offset parent"), l = P), d.get.variation() && d.set.variation();
        },
        reposition: function reposition() {
          d.refresh(), d.set.position();
        },
        destroy: function destroy() {
          d.debug("Destroying previous module"), e && e.disconnect(), u && !f.preserve && d.removePopup(), clearTimeout(d.hideTimer), clearTimeout(d.showTimer), d.unbind.close(), d.unbind.events(), h.removeData(a);
        },
        event: {
          start: function start(e) {
            var t = z.isPlainObject(f.delay) ? f.delay.show : f.delay;
            clearTimeout(d.hideTimer), C || (d.showTimer = setTimeout(d.show, t));
          },
          end: function end() {
            var e = z.isPlainObject(f.delay) ? f.delay.hide : f.delay;
            clearTimeout(d.showTimer), d.hideTimer = setTimeout(d.hide, e);
          },
          touchstart: function touchstart(e) {
            C = !0, d.show();
          },
          resize: function resize() {
            d.is.visible() && d.set.position();
          },
          documentChanged: function documentChanged(e) {
            [].forEach.call(e, function (e) {
              e.removedNodes && [].forEach.call(e.removedNodes, function (e) {
                (e == w || 0 < z(e).find(w).length) && (d.debug("Element removed from DOM, tearing down events"), d.destroy());
              });
            });
          },
          hideGracefully: function hideGracefully(e) {
            var t = z(e.target),
                n = z.contains(N.documentElement, e.target),
                i = 0 < t.closest(o.popup).length;
            e && !i && n ? (d.debug("Click occurred outside popup hiding popup"), d.hide()) : d.debug("Click was inside popup, keeping popup open");
          }
        },
        create: function create() {
          var e = d.get.html(),
              t = d.get.title(),
              n = d.get.content();
          e || n || t ? (d.debug("Creating pop-up html"), e || (e = f.templates.popup({
            title: t,
            content: n
          })), u = z("<div/>").addClass(m.popup).data(p.activator, h).html(e), f.inline ? (d.verbose("Inserting popup element inline", u), u.insertAfter(h)) : (d.verbose("Appending popup element to body", u), u.appendTo(s)), d.refresh(), d.set.variation(), f.hoverable && d.bind.popup(), f.onCreate.call(u, w)) : 0 !== v.next(o.popup).length ? (d.verbose("Pre-existing popup found"), f.inline = !0, f.popup = v.next(o.popup).data(p.activator, h), d.refresh(), f.hoverable && d.bind.popup()) : f.popup ? (z(f.popup).data(p.activator, h), d.verbose("Used popup specified in settings"), d.refresh(), f.hoverable && d.bind.popup()) : d.debug("No content specified skipping display", w);
        },
        createID: function createID() {
          n = (Math.random().toString(16) + "000000000").substr(2, 8), t = "." + n, d.verbose("Creating unique id for element", n);
        },
        toggle: function toggle() {
          d.debug("Toggling pop-up"), d.is.hidden() ? (d.debug("Popup is hidden, showing pop-up"), d.unbind.close(), d.show()) : (d.debug("Popup is visible, hiding pop-up"), d.hide());
        },
        show: function show(e) {
          if (e = e || function () {}, d.debug("Showing pop-up", f.transition), d.is.hidden() && (!d.is.active() || !d.is.dropdown())) {
            if (d.exists() || d.create(), !1 === f.onShow.call(u, w)) return void d.debug("onShow callback returned false, cancelling popup animation");
            f.preserve || f.popup || d.refresh(), u && d.set.position() && (d.save.conditions(), f.exclusive && d.hideAll(), d.animate.show(e));
          }
        },
        hide: function hide(e) {
          if (e = e || function () {}, d.is.visible() || d.is.animating()) {
            if (!1 === f.onHide.call(u, w)) return void d.debug("onHide callback returned false, cancelling popup animation");
            d.remove.visible(), d.unbind.close(), d.restore.conditions(), d.animate.hide(e);
          }
        },
        hideAll: function hideAll() {
          z(o.popup).filter("." + m.popupVisible).each(function () {
            z(this).data(p.activator).popup("hide");
          });
        },
        exists: function exists() {
          return !!u && (f.inline || f.popup ? d.has.popup() : 1 <= u.closest(s).length);
        },
        removePopup: function removePopup() {
          d.has.popup() && !f.popup && (d.debug("Removing popup", u), u.remove(), u = L, f.onRemove.call(u, w));
        },
        save: {
          conditions: function conditions() {
            d.cache = {
              title: h.attr("title")
            }, d.cache.title && h.removeAttr("title"), d.verbose("Saving original attributes", d.cache.title);
          }
        },
        restore: {
          conditions: function conditions() {
            return d.cache && d.cache.title && (h.attr("title", d.cache.title), d.verbose("Restoring original attributes", d.cache.title)), !0;
          }
        },
        supports: {
          svg: function svg() {
            return "undefined" == typeof SVGGraphicsElement;
          }
        },
        animate: {
          show: function show(e) {
            e = z.isFunction(e) ? e : function () {}, f.transition && z.fn.transition !== L && h.transition("is supported") ? (d.set.visible(), u.transition({
              animation: f.transition + " in",
              queue: !1,
              debug: f.debug,
              verbose: f.verbose,
              duration: f.duration,
              onComplete: function onComplete() {
                d.bind.close(), e.call(u, w), f.onVisible.call(u, w);
              }
            })) : d.error(g.noTransition);
          },
          hide: function hide(e) {
            e = z.isFunction(e) ? e : function () {}, d.debug("Hiding pop-up"), !1 !== f.onHide.call(u, w) ? f.transition && z.fn.transition !== L && h.transition("is supported") ? u.transition({
              animation: f.transition + " out",
              queue: !1,
              duration: f.duration,
              debug: f.debug,
              verbose: f.verbose,
              onComplete: function onComplete() {
                d.reset(), e.call(u, w), f.onHidden.call(u, w);
              }
            }) : d.error(g.noTransition) : d.debug("onHide callback returned false, cancelling popup animation");
          }
        },
        change: {
          content: function content(e) {
            u.html(e);
          }
        },
        get: {
          html: function html() {
            return h.removeData(p.html), h.data(p.html) || f.html;
          },
          title: function title() {
            return h.removeData(p.title), h.data(p.title) || f.title;
          },
          content: function content() {
            return h.removeData(p.content), h.data(p.content) || f.content || h.attr("title");
          },
          variation: function variation() {
            return h.removeData(p.variation), h.data(p.variation) || f.variation;
          },
          popup: function popup() {
            return u;
          },
          popupOffset: function popupOffset() {
            return u.offset();
          },
          calculations: function calculations() {
            var e,
                t = d.get.offsetParent(u),
                n = v[0],
                i = b[0] == M,
                o = f.inline || f.popup && f.movePopup ? v.position() : v.offset(),
                r = i ? {
              top: 0,
              left: 0
            } : b.offset(),
                a = {},
                s = i ? {
              top: A.scrollTop(),
              left: A.scrollLeft()
            } : {
              top: 0,
              left: 0
            };

            if (a = {
              target: {
                element: v[0],
                width: v.outerWidth(),
                height: v.outerHeight(),
                top: o.top,
                left: o.left,
                margin: {}
              },
              popup: {
                width: u.outerWidth(),
                height: u.outerHeight()
              },
              parent: {
                width: l.outerWidth(),
                height: l.outerHeight()
              },
              screen: {
                top: r.top,
                left: r.left,
                scroll: {
                  top: s.top,
                  left: s.left
                },
                width: b.width(),
                height: b.height()
              }
            }, t.get(0) !== l.get(0)) {
              var c = t.offset();
              a.target.top -= c.top, a.target.left -= c.left, a.parent.width = t.outerWidth(), a.parent.height = t.outerHeight();
            }

            return f.setFluidWidth && d.is.fluid() && (a.container = {
              width: u.parent().outerWidth()
            }, a.popup.width = a.container.width), a.target.margin.top = f.inline ? parseInt(M.getComputedStyle(n).getPropertyValue("margin-top"), 10) : 0, a.target.margin.left = f.inline ? d.is.rtl() ? parseInt(M.getComputedStyle(n).getPropertyValue("margin-right"), 10) : parseInt(M.getComputedStyle(n).getPropertyValue("margin-left"), 10) : 0, e = a.screen, a.boundary = {
              top: e.top + e.scroll.top,
              bottom: e.top + e.scroll.top + e.height,
              left: e.left + e.scroll.left,
              right: e.left + e.scroll.left + e.width
            }, a;
          },
          id: function id() {
            return n;
          },
          startEvent: function startEvent() {
            return "hover" == f.on ? "mouseenter" : "focus" == f.on && "focus";
          },
          scrollEvent: function scrollEvent() {
            return "scroll";
          },
          endEvent: function endEvent() {
            return "hover" == f.on ? "mouseleave" : "focus" == f.on && "blur";
          },
          distanceFromBoundary: function distanceFromBoundary(e, t) {
            var n,
                i,
                o = {};
            return n = (t = t || d.get.calculations()).popup, i = t.boundary, e && (o = {
              top: e.top - i.top,
              left: e.left - i.left,
              right: i.right - (e.left + n.width),
              bottom: i.bottom - (e.top + n.height)
            }, d.verbose("Distance from boundaries determined", e, o)), o;
          },
          offsetParent: function offsetParent(e) {
            var t = (e !== L ? e[0] : v[0]).parentNode,
                n = z(t);
            if (t) for (var i = "none" === n.css("transform"), o = "static" === n.css("position"), r = n.is("body"); t && !r && o && i;) {
              t = t.parentNode, i = "none" === (n = z(t)).css("transform"), o = "static" === n.css("position"), r = n.is("body");
            }
            return n && 0 < n.length ? n : z();
          },
          positions: function positions() {
            return {
              "top left": !1,
              "top center": !1,
              "top right": !1,
              "bottom left": !1,
              "bottom center": !1,
              "bottom right": !1,
              "left center": !1,
              "right center": !1
            };
          },
          nextPosition: function nextPosition(e) {
            var t = e.split(" "),
                n = t[0],
                i = t[1],
                o = "top" == n || "bottom" == n,
                r = !1,
                a = !1,
                s = !1;
            return x || (d.verbose("All available positions available"), x = d.get.positions()), d.debug("Recording last position tried", e), x[e] = !0, "opposite" === f.prefer && (s = (s = [{
              top: "bottom",
              bottom: "top",
              left: "right",
              right: "left"
            }[n], i]).join(" "), r = !0 === x[s], d.debug("Trying opposite strategy", s)), "adjacent" === f.prefer && o && (s = (s = [n, {
              left: "center",
              center: "right",
              right: "left"
            }[i]]).join(" "), a = !0 === x[s], d.debug("Trying adjacent strategy", s)), (a || r) && (d.debug("Using backup position", s), s = {
              "top left": "top center",
              "top center": "top right",
              "top right": "right center",
              "right center": "bottom right",
              "bottom right": "bottom center",
              "bottom center": "bottom left",
              "bottom left": "left center",
              "left center": "top left"
            }[e]), s;
          }
        },
        set: {
          position: function position(e, t) {
            if (0 !== v.length && 0 !== u.length) {
              var n, i, o, r, a, s, c, l;
              if (t = t || d.get.calculations(), e = e || h.data(p.position) || f.position, n = h.data(p.offset) || f.offset, i = f.distanceAway, o = t.target, r = t.popup, a = t.parent, d.should.centerArrow(t) && (d.verbose("Adjusting offset to center arrow on small target element"), "top left" != e && "bottom left" != e || (n += o.width / 2, n -= f.arrowPixelsFromEdge), "top right" != e && "bottom right" != e || (n -= o.width / 2, n += f.arrowPixelsFromEdge)), 0 === o.width && 0 === o.height && !d.is.svg(o.element)) return d.debug("Popup target is hidden, no action taken"), !1;

              switch (f.inline && (d.debug("Adding margin to calculation", o.margin), "left center" == e || "right center" == e ? (n += o.margin.top, i += -o.margin.left) : "top left" == e || "top center" == e || "top right" == e ? (n += o.margin.left, i -= o.margin.top) : (n += o.margin.left, i += o.margin.top)), d.debug("Determining popup position from calculations", e, t), d.is.rtl() && (e = e.replace(/left|right/g, function (e) {
                return "left" == e ? "right" : "left";
              }), d.debug("RTL: Popup position updated", e)), y == f.maxSearchDepth && "string" == typeof f.lastResort && (e = f.lastResort), e) {
                case "top left":
                  s = {
                    top: "auto",
                    bottom: a.height - o.top + i,
                    left: o.left + n,
                    right: "auto"
                  };
                  break;

                case "top center":
                  s = {
                    bottom: a.height - o.top + i,
                    left: o.left + o.width / 2 - r.width / 2 + n,
                    top: "auto",
                    right: "auto"
                  };
                  break;

                case "top right":
                  s = {
                    bottom: a.height - o.top + i,
                    right: a.width - o.left - o.width - n,
                    top: "auto",
                    left: "auto"
                  };
                  break;

                case "left center":
                  s = {
                    top: o.top + o.height / 2 - r.height / 2 + n,
                    right: a.width - o.left + i,
                    left: "auto",
                    bottom: "auto"
                  };
                  break;

                case "right center":
                  s = {
                    top: o.top + o.height / 2 - r.height / 2 + n,
                    left: o.left + o.width + i,
                    bottom: "auto",
                    right: "auto"
                  };
                  break;

                case "bottom left":
                  s = {
                    top: o.top + o.height + i,
                    left: o.left + n,
                    bottom: "auto",
                    right: "auto"
                  };
                  break;

                case "bottom center":
                  s = {
                    top: o.top + o.height + i,
                    left: o.left + o.width / 2 - r.width / 2 + n,
                    bottom: "auto",
                    right: "auto"
                  };
                  break;

                case "bottom right":
                  s = {
                    top: o.top + o.height + i,
                    right: a.width - o.left - o.width - n,
                    left: "auto",
                    bottom: "auto"
                  };
              }

              if (s === L && d.error(g.invalidPosition, e), d.debug("Calculated popup positioning values", s), u.css(s).removeClass(m.position).addClass(e).addClass(m.loading), c = d.get.popupOffset(), l = d.get.distanceFromBoundary(c, t), d.is.offstage(l, e)) {
                if (d.debug("Position is outside viewport", e), y < f.maxSearchDepth) return y++, e = d.get.nextPosition(e), d.debug("Trying new position", e), !!u && d.set.position(e, t);
                if (!f.lastResort) return d.debug("Popup could not find a position to display", u), d.error(g.cannotPlace, w), d.remove.attempts(), d.remove.loading(), d.reset(), f.onUnplaceable.call(u, w), !1;
                d.debug("No position found, showing with last position");
              }

              return d.debug("Position is on stage", e), d.remove.attempts(), d.remove.loading(), f.setFluidWidth && d.is.fluid() && d.set.fluidWidth(t), !0;
            }

            d.error(g.notFound);
          },
          fluidWidth: function fluidWidth(e) {
            e = e || d.get.calculations(), d.debug("Automatically setting element width to parent width", e.parent.width), u.css("width", e.container.width);
          },
          variation: function variation(e) {
            (e = e || d.get.variation()) && d.has.popup() && (d.verbose("Adding variation to popup", e), u.addClass(e));
          },
          visible: function visible() {
            h.addClass(m.visible);
          }
        },
        remove: {
          loading: function loading() {
            u.removeClass(m.loading);
          },
          variation: function variation(e) {
            (e = e || d.get.variation()) && (d.verbose("Removing variation", e), u.removeClass(e));
          },
          visible: function visible() {
            h.removeClass(m.visible);
          },
          attempts: function attempts() {
            d.verbose("Resetting all searched positions"), y = 0, x = !1;
          }
        },
        bind: {
          events: function events() {
            d.debug("Binding popup events to module"), "click" == f.on && h.on("click" + r, d.toggle), "hover" == f.on && h.on("touchstart" + r, d.event.touchstart), d.get.startEvent() && h.on(d.get.startEvent() + r, d.event.start).on(d.get.endEvent() + r, d.event.end), f.target && d.debug("Target set to element", v), A.on("resize" + t, d.event.resize);
          },
          popup: function popup() {
            d.verbose("Allowing hover events on popup to prevent closing"), u && d.has.popup() && u.on("mouseenter" + r, d.event.start).on("mouseleave" + r, d.event.end);
          },
          close: function close() {
            (!0 === f.hideOnScroll || "auto" == f.hideOnScroll && "click" != f.on) && d.bind.closeOnScroll(), d.is.closable() ? d.bind.clickaway() : "hover" == f.on && C && d.bind.touchClose();
          },
          closeOnScroll: function closeOnScroll() {
            d.verbose("Binding scroll close event to document"), c.one(d.get.scrollEvent() + t, d.event.hideGracefully);
          },
          touchClose: function touchClose() {
            d.verbose("Binding popup touchclose event to document"), R.on("touchstart" + t, function (e) {
              d.verbose("Touched away from popup"), d.event.hideGracefully.call(w, e);
            });
          },
          clickaway: function clickaway() {
            d.verbose("Binding popup close event to document"), R.on("click" + t, function (e) {
              d.verbose("Clicked away from popup"), d.event.hideGracefully.call(w, e);
            });
          }
        },
        unbind: {
          events: function events() {
            A.off(t), h.off(r);
          },
          close: function close() {
            R.off(t), c.off(t);
          }
        },
        has: {
          popup: function popup() {
            return u && 0 < u.length;
          }
        },
        should: {
          centerArrow: function centerArrow(e) {
            return !d.is.basic() && e.target.width <= 2 * f.arrowPixelsFromEdge;
          }
        },
        is: {
          closable: function closable() {
            return "auto" == f.closable ? "hover" != f.on : f.closable;
          },
          offstage: function offstage(e, n) {
            var i = [];
            return z.each(e, function (e, t) {
              t < -f.jitter && (d.debug("Position exceeds allowable distance from edge", e, t, n), i.push(e));
            }), 0 < i.length;
          },
          svg: function svg(e) {
            return d.supports.svg() && e instanceof SVGGraphicsElement;
          },
          basic: function basic() {
            return h.hasClass(m.basic);
          },
          active: function active() {
            return h.hasClass(m.active);
          },
          animating: function animating() {
            return u !== L && u.hasClass(m.animating);
          },
          fluid: function fluid() {
            return u !== L && u.hasClass(m.fluid);
          },
          visible: function visible() {
            return u !== L && u.hasClass(m.popupVisible);
          },
          dropdown: function dropdown() {
            return h.hasClass(m.dropdown);
          },
          hidden: function hidden() {
            return !d.is.visible();
          },
          rtl: function rtl() {
            return "rtl" == h.css("direction");
          }
        },
        reset: function reset() {
          d.remove.visible(), f.preserve ? z.fn.transition !== L && u.transition("remove transition") : d.removePopup();
        },
        setting: function setting(e, t) {
          if (z.isPlainObject(e)) z.extend(!0, f, e);else {
            if (t === L) return f[e];
            f[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (z.isPlainObject(e)) z.extend(!0, d, e);else {
            if (t === L) return d[e];
            d[e] = t;
          }
        },
        debug: function debug() {
          !f.silent && f.debug && (f.performance ? d.performance.log(arguments) : (d.debug = Function.prototype.bind.call(console.info, console, f.name + ":"), d.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !f.silent && f.verbose && f.debug && (f.performance ? d.performance.log(arguments) : (d.verbose = Function.prototype.bind.call(console.info, console, f.name + ":"), d.verbose.apply(console, arguments)));
        },
        error: function error() {
          f.silent || (d.error = Function.prototype.bind.call(console.error, console, f.name + ":"), d.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var t, n;
            f.performance && (n = (t = new Date().getTime()) - (E || t), E = t, O.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: w,
              "Execution Time": n
            })), clearTimeout(d.performance.timer), d.performance.timer = setTimeout(d.performance.display, 500);
          },
          display: function display() {
            var e = f.name + ":",
                n = 0;
            E = !1, clearTimeout(d.performance.timer), z.each(O, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", F && (e += " '" + F + "'"), (console.group !== L || console.table !== L) && 0 < O.length && (console.groupCollapsed(e), console.table ? console.table(O) : z.each(O, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), O = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              r,
              n,
              a = S;
          return e = e || D, t = w || t, "string" == typeof i && a !== L && (i = i.split(/[\. ]/), o = i.length - 1, z.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (z.isPlainObject(a[n]) && e != o) a = a[n];else {
              if (a[n] !== L) return r = a[n], !1;
              if (!z.isPlainObject(a[t]) || e == o) return a[t] !== L && (r = a[t]), !1;
              a = a[t];
            }
          })), z.isFunction(r) ? n = r.apply(t, e) : r !== L && (n = r), z.isArray(T) ? T.push(n) : T !== L ? T = [T, n] : n !== L && (T = n), r;
        }
      }, j ? (S === L && d.initialize(), d.invoke(q)) : (S !== L && S.invoke("destroy"), d.initialize());
    }), T !== L ? T : this;
  }, z.fn.popup.settings = {
    name: "Popup",
    silent: !1,
    debug: !1,
    verbose: !1,
    performance: !0,
    namespace: "popup",
    observeChanges: !0,
    onCreate: function onCreate() {},
    onRemove: function onRemove() {},
    onShow: function onShow() {},
    onVisible: function onVisible() {},
    onHide: function onHide() {},
    onUnplaceable: function onUnplaceable() {},
    onHidden: function onHidden() {},
    on: "hover",
    boundary: M,
    addTouchEvents: !0,
    position: "top left",
    variation: "",
    movePopup: !0,
    target: !1,
    popup: !1,
    inline: !1,
    preserve: !1,
    hoverable: !1,
    content: !1,
    html: !1,
    title: !1,
    closable: !0,
    hideOnScroll: "auto",
    exclusive: !1,
    context: "body",
    scrollContext: M,
    prefer: "opposite",
    lastResort: !1,
    arrowPixelsFromEdge: 20,
    delay: {
      show: 50,
      hide: 70
    },
    setFluidWidth: !0,
    duration: 200,
    transition: "scale",
    distanceAway: 0,
    jitter: 2,
    offset: 0,
    maxSearchDepth: 15,
    error: {
      invalidPosition: "The position you specified is not a valid position",
      cannotPlace: "Popup does not fit within the boundaries of the viewport",
      method: "The method you called is not defined.",
      noTransition: "This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>",
      notFound: "The target or popup you specified does not exist on the page"
    },
    metadata: {
      activator: "activator",
      content: "content",
      html: "html",
      offset: "offset",
      position: "position",
      title: "title",
      variation: "variation"
    },
    className: {
      active: "active",
      basic: "basic",
      animating: "animating",
      dropdown: "dropdown",
      fluid: "fluid",
      loading: "loading",
      popup: "ui popup",
      position: "top left center bottom right",
      visible: "visible",
      popupVisible: "visible"
    },
    selector: {
      popup: ".ui.popup"
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
      popup: function popup(e) {
        var t = "",
            n = z.fn.popup.settings.templates.escape;
        return _typeof(e) !== L && (_typeof(e.title) !== L && e.title && (e.title = n(e.title), t += '<div class="header">' + e.title + "</div>"), _typeof(e.content) !== L && e.content && (e.content = n(e.content), t += '<div class="content">' + e.content + "</div>")), t;
      }
    }
  };
}(jQuery, window, document), function (P, F, E, O) {
  "use strict";

  F = void 0 !== F && F.Math == Math ? F : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), P.fn.visibility = function (v) {
    var y,
        e = P(this),
        x = e.selector || "",
        C = new Date().getTime(),
        w = [],
        S = v,
        k = "string" == typeof S,
        T = [].slice.call(arguments, 1),
        R = e.length,
        A = 0;
    return e.each(function () {
      var e,
          t,
          n,
          s,
          o = P.isPlainObject(v) ? P.extend(!0, {}, P.fn.visibility.settings, v) : P.extend({}, P.fn.visibility.settings),
          i = o.className,
          r = o.namespace,
          c = o.error,
          a = o.metadata,
          l = "." + r,
          u = "module-" + r,
          d = P(F),
          f = P(this),
          m = P(o.context),
          g = (f.selector, f.data(u)),
          p = F.requestAnimationFrame || F.mozRequestAnimationFrame || F.webkitRequestAnimationFrame || F.msRequestAnimationFrame || function (e) {
        setTimeout(e, 0);
      },
          h = this,
          b = !1;

      s = {
        initialize: function initialize() {
          s.debug("Initializing", o), s.setup.cache(), s.should.trackChanges() && ("image" == o.type && s.setup.image(), "fixed" == o.type && s.setup.fixed(), o.observeChanges && s.observeChanges(), s.bind.events()), s.save.position(), s.is.visible() || s.error(c.visible, f), o.initialCheck && s.checkVisibility(), s.instantiate();
        },
        instantiate: function instantiate() {
          s.debug("Storing instance", s), f.data(u, s), g = s;
        },
        destroy: function destroy() {
          s.verbose("Destroying previous module"), n && n.disconnect(), t && t.disconnect(), d.off("load" + l, s.event.load).off("resize" + l, s.event.resize), m.off("scroll" + l, s.event.scroll).off("scrollchange" + l, s.event.scrollchange), "fixed" == o.type && (s.resetFixed(), s.remove.placeholder()), f.off(l).removeData(u);
        },
        observeChanges: function observeChanges() {
          "MutationObserver" in F && (t = new MutationObserver(s.event.contextChanged), n = new MutationObserver(s.event.changed), t.observe(E, {
            childList: !0,
            subtree: !0
          }), n.observe(h, {
            childList: !0,
            subtree: !0
          }), s.debug("Setting up mutation observer", n));
        },
        bind: {
          events: function events() {
            s.verbose("Binding visibility events to scroll and resize"), o.refreshOnLoad && d.on("load" + l, s.event.load), d.on("resize" + l, s.event.resize), m.off("scroll" + l).on("scroll" + l, s.event.scroll).on("scrollchange" + l, s.event.scrollchange);
          }
        },
        event: {
          changed: function changed(e) {
            s.verbose("DOM tree modified, updating visibility calculations"), s.timer = setTimeout(function () {
              s.verbose("DOM tree modified, updating sticky menu"), s.refresh();
            }, 100);
          },
          contextChanged: function contextChanged(e) {
            [].forEach.call(e, function (e) {
              e.removedNodes && [].forEach.call(e.removedNodes, function (e) {
                (e == h || 0 < P(e).find(h).length) && (s.debug("Element removed from DOM, tearing down events"), s.destroy());
              });
            });
          },
          resize: function resize() {
            s.debug("Window resized"), o.refreshOnResize && p(s.refresh);
          },
          load: function load() {
            s.debug("Page finished loading"), p(s.refresh);
          },
          scroll: function scroll() {
            o.throttle ? (clearTimeout(s.timer), s.timer = setTimeout(function () {
              m.triggerHandler("scrollchange" + l, [m.scrollTop()]);
            }, o.throttle)) : p(function () {
              m.triggerHandler("scrollchange" + l, [m.scrollTop()]);
            });
          },
          scrollchange: function scrollchange(e, t) {
            s.checkVisibility(t);
          }
        },
        precache: function precache(e, t) {
          e instanceof Array || (e = [e]);

          for (var n = e.length, i = 0, o = [], r = E.createElement("img"), a = function a() {
            ++i >= e.length && P.isFunction(t) && t();
          }; n--;) {
            (r = E.createElement("img")).onload = a, r.onerror = a, r.src = e[n], o.push(r);
          }
        },
        enableCallbacks: function enableCallbacks() {
          s.debug("Allowing callbacks to occur"), b = !1;
        },
        disableCallbacks: function disableCallbacks() {
          s.debug("Disabling all callbacks temporarily"), b = !0;
        },
        should: {
          trackChanges: function trackChanges() {
            return k ? (s.debug("One time query, no need to bind events"), !1) : (s.debug("Callbacks being attached"), !0);
          }
        },
        setup: {
          cache: function cache() {
            s.cache = {
              occurred: {},
              screen: {},
              element: {}
            };
          },
          image: function image() {
            var e = f.data(a.src);
            e && (s.verbose("Lazy loading image", e), o.once = !0, o.observeChanges = !1, o.onOnScreen = function () {
              s.debug("Image on screen", h), s.precache(e, function () {
                s.set.image(e, function () {
                  ++A == R && o.onAllLoaded.call(this), o.onLoad.call(this);
                });
              });
            });
          },
          fixed: function fixed() {
            s.debug("Setting up fixed"), o.once = !1, o.observeChanges = !1, o.initialCheck = !0, o.refreshOnLoad = !0, v.transition || (o.transition = !1), s.create.placeholder(), s.debug("Added placeholder", e), o.onTopPassed = function () {
              s.debug("Element passed, adding fixed position", f), s.show.placeholder(), s.set.fixed(), o.transition && P.fn.transition !== O && f.transition(o.transition, o.duration);
            }, o.onTopPassedReverse = function () {
              s.debug("Element returned to position, removing fixed", f), s.hide.placeholder(), s.remove.fixed();
            };
          }
        },
        create: {
          placeholder: function placeholder() {
            s.verbose("Creating fixed position placeholder"), e = f.clone(!1).css("display", "none").addClass(i.placeholder).insertAfter(f);
          }
        },
        show: {
          placeholder: function placeholder() {
            s.verbose("Showing placeholder"), e.css("display", "block").css("visibility", "hidden");
          }
        },
        hide: {
          placeholder: function placeholder() {
            s.verbose("Hiding placeholder"), e.css("display", "none").css("visibility", "");
          }
        },
        set: {
          fixed: function fixed() {
            s.verbose("Setting element to fixed position"), f.addClass(i.fixed).css({
              position: "fixed",
              top: o.offset + "px",
              left: "auto",
              zIndex: o.zIndex
            }), o.onFixed.call(h);
          },
          image: function image(e, t) {
            if (f.attr("src", e), o.transition) {
              if (P.fn.transition !== O) {
                if (f.hasClass(i.visible)) return void s.debug("Transition already occurred on this image, skipping animation");
                f.transition(o.transition, o.duration, t);
              } else f.fadeIn(o.duration, t);
            } else f.show();
          }
        },
        is: {
          onScreen: function onScreen() {
            return s.get.elementCalculations().onScreen;
          },
          offScreen: function offScreen() {
            return s.get.elementCalculations().offScreen;
          },
          visible: function visible() {
            return !(!s.cache || !s.cache.element) && !(0 === s.cache.element.width && 0 === s.cache.element.offset.top);
          },
          verticallyScrollableContext: function verticallyScrollableContext() {
            var e = m.get(0) !== F && m.css("overflow-y");
            return "auto" == e || "scroll" == e;
          },
          horizontallyScrollableContext: function horizontallyScrollableContext() {
            var e = m.get(0) !== F && m.css("overflow-x");
            return "auto" == e || "scroll" == e;
          }
        },
        refresh: function refresh() {
          s.debug("Refreshing constants (width/height)"), "fixed" == o.type && s.resetFixed(), s.reset(), s.save.position(), o.checkOnRefresh && s.checkVisibility(), o.onRefresh.call(h);
        },
        resetFixed: function resetFixed() {
          s.remove.fixed(), s.remove.occurred();
        },
        reset: function reset() {
          s.verbose("Resetting all cached values"), P.isPlainObject(s.cache) && (s.cache.screen = {}, s.cache.element = {});
        },
        checkVisibility: function checkVisibility(e) {
          s.verbose("Checking visibility of element", s.cache.element), !b && s.is.visible() && (s.save.scroll(e), s.save.calculations(), s.passed(), s.passingReverse(), s.topVisibleReverse(), s.bottomVisibleReverse(), s.topPassedReverse(), s.bottomPassedReverse(), s.onScreen(), s.offScreen(), s.passing(), s.topVisible(), s.bottomVisible(), s.topPassed(), s.bottomPassed(), o.onUpdate && o.onUpdate.call(h, s.get.elementCalculations()));
        },
        passed: function passed(e, t) {
          var n = s.get.elementCalculations();
          if (e && t) o.onPassed[e] = t;else {
            if (e !== O) return s.get.pixelsPassed(e) > n.pixelsPassed;
            n.passing && P.each(o.onPassed, function (e, t) {
              n.bottomVisible || n.pixelsPassed > s.get.pixelsPassed(e) ? s.execute(t, e) : o.once || s.remove.occurred(t);
            });
          }
        },
        onScreen: function onScreen(e) {
          var t = s.get.elementCalculations(),
              n = e || o.onOnScreen,
              i = "onScreen";
          if (e && (s.debug("Adding callback for onScreen", e), o.onOnScreen = e), t.onScreen ? s.execute(n, i) : o.once || s.remove.occurred(i), e !== O) return t.onOnScreen;
        },
        offScreen: function offScreen(e) {
          var t = s.get.elementCalculations(),
              n = e || o.onOffScreen,
              i = "offScreen";
          if (e && (s.debug("Adding callback for offScreen", e), o.onOffScreen = e), t.offScreen ? s.execute(n, i) : o.once || s.remove.occurred(i), e !== O) return t.onOffScreen;
        },
        passing: function passing(e) {
          var t = s.get.elementCalculations(),
              n = e || o.onPassing,
              i = "passing";
          if (e && (s.debug("Adding callback for passing", e), o.onPassing = e), t.passing ? s.execute(n, i) : o.once || s.remove.occurred(i), e !== O) return t.passing;
        },
        topVisible: function topVisible(e) {
          var t = s.get.elementCalculations(),
              n = e || o.onTopVisible,
              i = "topVisible";
          if (e && (s.debug("Adding callback for top visible", e), o.onTopVisible = e), t.topVisible ? s.execute(n, i) : o.once || s.remove.occurred(i), e === O) return t.topVisible;
        },
        bottomVisible: function bottomVisible(e) {
          var t = s.get.elementCalculations(),
              n = e || o.onBottomVisible,
              i = "bottomVisible";
          if (e && (s.debug("Adding callback for bottom visible", e), o.onBottomVisible = e), t.bottomVisible ? s.execute(n, i) : o.once || s.remove.occurred(i), e === O) return t.bottomVisible;
        },
        topPassed: function topPassed(e) {
          var t = s.get.elementCalculations(),
              n = e || o.onTopPassed,
              i = "topPassed";
          if (e && (s.debug("Adding callback for top passed", e), o.onTopPassed = e), t.topPassed ? s.execute(n, i) : o.once || s.remove.occurred(i), e === O) return t.topPassed;
        },
        bottomPassed: function bottomPassed(e) {
          var t = s.get.elementCalculations(),
              n = e || o.onBottomPassed,
              i = "bottomPassed";
          if (e && (s.debug("Adding callback for bottom passed", e), o.onBottomPassed = e), t.bottomPassed ? s.execute(n, i) : o.once || s.remove.occurred(i), e === O) return t.bottomPassed;
        },
        passingReverse: function passingReverse(e) {
          var t = s.get.elementCalculations(),
              n = e || o.onPassingReverse,
              i = "passingReverse";
          if (e && (s.debug("Adding callback for passing reverse", e), o.onPassingReverse = e), t.passing ? o.once || s.remove.occurred(i) : s.get.occurred("passing") && s.execute(n, i), e !== O) return !t.passing;
        },
        topVisibleReverse: function topVisibleReverse(e) {
          var t = s.get.elementCalculations(),
              n = e || o.onTopVisibleReverse,
              i = "topVisibleReverse";
          if (e && (s.debug("Adding callback for top visible reverse", e), o.onTopVisibleReverse = e), t.topVisible ? o.once || s.remove.occurred(i) : s.get.occurred("topVisible") && s.execute(n, i), e === O) return !t.topVisible;
        },
        bottomVisibleReverse: function bottomVisibleReverse(e) {
          var t = s.get.elementCalculations(),
              n = e || o.onBottomVisibleReverse,
              i = "bottomVisibleReverse";
          if (e && (s.debug("Adding callback for bottom visible reverse", e), o.onBottomVisibleReverse = e), t.bottomVisible ? o.once || s.remove.occurred(i) : s.get.occurred("bottomVisible") && s.execute(n, i), e === O) return !t.bottomVisible;
        },
        topPassedReverse: function topPassedReverse(e) {
          var t = s.get.elementCalculations(),
              n = e || o.onTopPassedReverse,
              i = "topPassedReverse";
          if (e && (s.debug("Adding callback for top passed reverse", e), o.onTopPassedReverse = e), t.topPassed ? o.once || s.remove.occurred(i) : s.get.occurred("topPassed") && s.execute(n, i), e === O) return !t.onTopPassed;
        },
        bottomPassedReverse: function bottomPassedReverse(e) {
          var t = s.get.elementCalculations(),
              n = e || o.onBottomPassedReverse,
              i = "bottomPassedReverse";
          if (e && (s.debug("Adding callback for bottom passed reverse", e), o.onBottomPassedReverse = e), t.bottomPassed ? o.once || s.remove.occurred(i) : s.get.occurred("bottomPassed") && s.execute(n, i), e === O) return !t.bottomPassed;
        },
        execute: function execute(e, t) {
          var n = s.get.elementCalculations(),
              i = s.get.screenCalculations();
          (e = e || !1) && (o.continuous ? (s.debug("Callback being called continuously", t, n), e.call(h, n, i)) : s.get.occurred(t) || (s.debug("Conditions met", t, n), e.call(h, n, i))), s.save.occurred(t);
        },
        remove: {
          fixed: function fixed() {
            s.debug("Removing fixed position"), f.removeClass(i.fixed).css({
              position: "",
              top: "",
              left: "",
              zIndex: ""
            }), o.onUnfixed.call(h);
          },
          placeholder: function placeholder() {
            s.debug("Removing placeholder content"), e && e.remove();
          },
          occurred: function occurred(e) {
            if (e) {
              var t = s.cache.occurred;
              t[e] !== O && !0 === t[e] && (s.debug("Callback can now be called again", e), s.cache.occurred[e] = !1);
            } else s.cache.occurred = {};
          }
        },
        save: {
          calculations: function calculations() {
            s.verbose("Saving all calculations necessary to determine positioning"), s.save.direction(), s.save.screenCalculations(), s.save.elementCalculations();
          },
          occurred: function occurred(e) {
            e && (s.cache.occurred[e] !== O && !0 === s.cache.occurred[e] || (s.verbose("Saving callback occurred", e), s.cache.occurred[e] = !0));
          },
          scroll: function scroll(e) {
            e = e + o.offset || m.scrollTop() + o.offset, s.cache.scroll = e;
          },
          direction: function direction() {
            var e,
                t = s.get.scroll(),
                n = s.get.lastScroll();
            return e = n < t && n ? "down" : t < n && n ? "up" : "static", s.cache.direction = e, s.cache.direction;
          },
          elementPosition: function elementPosition() {
            var e = s.cache.element,
                t = s.get.screenSize();
            return s.verbose("Saving element position"), e.fits = e.height < t.height, e.offset = f.offset(), e.width = f.outerWidth(), e.height = f.outerHeight(), s.is.verticallyScrollableContext() && (e.offset.top += m.scrollTop() - m.offset().top), s.is.horizontallyScrollableContext() && (e.offset.left += m.scrollLeft - m.offset().left), s.cache.element = e;
          },
          elementCalculations: function elementCalculations() {
            var e = s.get.screenCalculations(),
                t = s.get.elementPosition();
            return o.includeMargin ? (t.margin = {}, t.margin.top = parseInt(f.css("margin-top"), 10), t.margin.bottom = parseInt(f.css("margin-bottom"), 10), t.top = t.offset.top - t.margin.top, t.bottom = t.offset.top + t.height + t.margin.bottom) : (t.top = t.offset.top, t.bottom = t.offset.top + t.height), t.topPassed = e.top >= t.top, t.bottomPassed = e.top >= t.bottom, t.topVisible = e.bottom >= t.top && !t.topPassed, t.bottomVisible = e.bottom >= t.bottom && !t.bottomPassed, t.pixelsPassed = 0, t.percentagePassed = 0, t.onScreen = (t.topVisible || t.passing) && !t.bottomPassed, t.passing = t.topPassed && !t.bottomPassed, t.offScreen = !t.onScreen, t.passing && (t.pixelsPassed = e.top - t.top, t.percentagePassed = (e.top - t.top) / t.height), s.cache.element = t, s.verbose("Updated element calculations", t), t;
          },
          screenCalculations: function screenCalculations() {
            var e = s.get.scroll();
            return s.save.direction(), s.cache.screen.top = e, s.cache.screen.bottom = e + s.cache.screen.height, s.cache.screen;
          },
          screenSize: function screenSize() {
            s.verbose("Saving window position"), s.cache.screen = {
              height: m.height()
            };
          },
          position: function position() {
            s.save.screenSize(), s.save.elementPosition();
          }
        },
        get: {
          pixelsPassed: function pixelsPassed(e) {
            var t = s.get.elementCalculations();
            return -1 < e.search("%") ? t.height * (parseInt(e, 10) / 100) : parseInt(e, 10);
          },
          occurred: function occurred(e) {
            return s.cache.occurred !== O && s.cache.occurred[e] || !1;
          },
          direction: function direction() {
            return s.cache.direction === O && s.save.direction(), s.cache.direction;
          },
          elementPosition: function elementPosition() {
            return s.cache.element === O && s.save.elementPosition(), s.cache.element;
          },
          elementCalculations: function elementCalculations() {
            return s.cache.element === O && s.save.elementCalculations(), s.cache.element;
          },
          screenCalculations: function screenCalculations() {
            return s.cache.screen === O && s.save.screenCalculations(), s.cache.screen;
          },
          screenSize: function screenSize() {
            return s.cache.screen === O && s.save.screenSize(), s.cache.screen;
          },
          scroll: function scroll() {
            return s.cache.scroll === O && s.save.scroll(), s.cache.scroll;
          },
          lastScroll: function lastScroll() {
            return s.cache.screen === O ? (s.debug("First scroll event, no last scroll could be found"), !1) : s.cache.screen.top;
          }
        },
        setting: function setting(e, t) {
          if (P.isPlainObject(e)) P.extend(!0, o, e);else {
            if (t === O) return o[e];
            o[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (P.isPlainObject(e)) P.extend(!0, s, e);else {
            if (t === O) return s[e];
            s[e] = t;
          }
        },
        debug: function debug() {
          !o.silent && o.debug && (o.performance ? s.performance.log(arguments) : (s.debug = Function.prototype.bind.call(console.info, console, o.name + ":"), s.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !o.silent && o.verbose && o.debug && (o.performance ? s.performance.log(arguments) : (s.verbose = Function.prototype.bind.call(console.info, console, o.name + ":"), s.verbose.apply(console, arguments)));
        },
        error: function error() {
          o.silent || (s.error = Function.prototype.bind.call(console.error, console, o.name + ":"), s.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var t, n;
            o.performance && (n = (t = new Date().getTime()) - (C || t), C = t, w.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: h,
              "Execution Time": n
            })), clearTimeout(s.performance.timer), s.performance.timer = setTimeout(s.performance.display, 500);
          },
          display: function display() {
            var e = o.name + ":",
                n = 0;
            C = !1, clearTimeout(s.performance.timer), P.each(w, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", x && (e += " '" + x + "'"), (console.group !== O || console.table !== O) && 0 < w.length && (console.groupCollapsed(e), console.table ? console.table(w) : P.each(w, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), w = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              r,
              n,
              a = g;
          return e = e || T, t = h || t, "string" == typeof i && a !== O && (i = i.split(/[\. ]/), o = i.length - 1, P.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (P.isPlainObject(a[n]) && e != o) a = a[n];else {
              if (a[n] !== O) return r = a[n], !1;
              if (!P.isPlainObject(a[t]) || e == o) return a[t] !== O ? r = a[t] : s.error(c.method, i), !1;
              a = a[t];
            }
          })), P.isFunction(r) ? n = r.apply(t, e) : r !== O && (n = r), P.isArray(y) ? y.push(n) : y !== O ? y = [y, n] : n !== O && (y = n), r;
        }
      }, k ? (g === O && s.initialize(), g.save.scroll(), g.save.calculations(), s.invoke(S)) : (g !== O && g.invoke("destroy"), s.initialize());
    }), y !== O ? y : this;
  }, P.fn.visibility.settings = {
    name: "Visibility",
    namespace: "visibility",
    debug: !1,
    verbose: !1,
    performance: !0,
    observeChanges: !0,
    initialCheck: !0,
    refreshOnLoad: !0,
    refreshOnResize: !0,
    checkOnRefresh: !0,
    once: !0,
    continuous: !1,
    offset: 0,
    includeMargin: !1,
    context: F,
    throttle: !1,
    type: !1,
    zIndex: "10",
    transition: "fade in",
    duration: 1e3,
    onPassed: {},
    onOnScreen: !1,
    onOffScreen: !1,
    onPassing: !1,
    onTopVisible: !1,
    onBottomVisible: !1,
    onTopPassed: !1,
    onBottomPassed: !1,
    onPassingReverse: !1,
    onTopVisibleReverse: !1,
    onBottomVisibleReverse: !1,
    onTopPassedReverse: !1,
    onBottomPassedReverse: !1,
    onLoad: function onLoad() {},
    onAllLoaded: function onAllLoaded() {},
    onFixed: function onFixed() {},
    onUnfixed: function onUnfixed() {},
    onUpdate: !1,
    onRefresh: function onRefresh() {},
    metadata: {
      src: "src"
    },
    className: {
      fixed: "fixed",
      placeholder: "placeholder",
      visible: "visible"
    },
    error: {
      method: "The method you called is not defined.",
      visible: "Element is hidden, you must call refresh after element becomes visible"
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