(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/main"],{

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "./node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ( true &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/detect.js/detect.js":
/*!******************************************!*\
  !*** ./node_modules/detect.js/detect.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Detect.js: User-Agent Parser
 * https://github.com/darcyclarke/Detect.js
 * Dual licensed under the MIT and GPL licenses.
 *
 * @version 2.2.2
 * @author Darcy Clarke
 * @url http://darcyclarke.me
 * @createdat Mon Oct 26 2015 08:21:54 GMT-0200 (Horário brasileiro de verão)
 *
 * Based on UA-Parser (https://github.com/tobie/ua-parser) by Tobie Langel
 *
 * Example Usage:
 * var agentInfo = detect.parse(navigator.userAgent);
 * console.log(agentInfo.browser.family); // Chrome
 *
 */
(function(root, undefined) {
    // Shim Array.prototype.map if necessary
    // Production steps of ECMA-262, Edition 5, 15.4.4.19
    // Reference: http://es5.github.com/#x15.4.4.19
    if (!Array.prototype.map) {
        Array.prototype.map = function(callback, thisArg) {
            var T, A, k;
            if (this == null) {
                throw new TypeError(" this is null or not defined");
            }
            // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
            var O = Object(this);
            // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            var len = O.length >>> 0;
            // 4. If IsCallable(callback) is false, throw a TypeError exception.
            // See: http://es5.github.com/#x9.11
            if (typeof callback !== "function") {
                throw new TypeError(callback + " is not a function");
            }
            // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (thisArg) {
                T = thisArg;
            }
            // 6. Let A be a new array created as if by the expression new Array(len) where Array is
            // the standard built-in constructor with that name and len is the value of len.
            A = new Array(len);
            // 7. Let k be 0
            k = 0;
            // 8. Repeat, while k < len
            while (k < len) {
                var kValue, mappedValue;
                // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then
                if (k in O) {
                    // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                    kValue = O[k];
                    // ii. Let mappedValue be the result of calling the Call internal method of callback
                    // with T as the this value and argument list containing kValue, k, and O.
                    mappedValue = callback.call(T, kValue, k, O);
                    // iii. Call the DefineOwnProperty internal method of A with arguments
                    // Pk, Property Descriptor {Value: mappedValue, : true, Enumerable: true, Configurable: true},
                    // and false.
                    // In browsers that support Object.defineProperty, use the following:
                    // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });
                    // For best browser support, use the following:
                    A[k] = mappedValue;
                }
                // d. Increase k by 1.
                k++;
            }
            // 9. return A
            return A;
        };
    }
    // Detect
    var detect = root.detect = function() {
        // Context
        var _this = function() {};
        // Regexes
        var regexes = {
            browser_parsers: [ {
                regex: "^(Opera)/(\\d+)\\.(\\d+) \\(Nintendo Wii",
                family_replacement: "Wii",
                manufacturer: "Nintendo"
            }, {
                regex: "(SeaMonkey|Camino)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)",
                family_replacement: "Camino",
                other: true
            }, {
                regex: "(Pale[Mm]oon)/(\\d+)\\.(\\d+)\\.?(\\d+)?",
                family_replacement: "Pale Moon (Firefox Variant)",
                other: true
            }, {
                regex: "(Fennec)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)",
                family_replacement: "Firefox Mobile"
            }, {
                regex: "(Fennec)/(\\d+)\\.(\\d+)(pre)",
                family_replacment: "Firefox Mobile"
            }, {
                regex: "(Fennec)/(\\d+)\\.(\\d+)",
                family_replacement: "Firefox Mobile"
            }, {
                regex: "Mobile.*(Firefox)/(\\d+)\\.(\\d+)",
                family_replacement: "Firefox Mobile"
            }, {
                regex: "(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?)",
                family_replacement: "Firefox ($1)"
            }, {
                regex: "(Firefox)/(\\d+)\\.(\\d+)(a\\d+[a-z]*)",
                family_replacement: "Firefox Alpha"
            }, {
                regex: "(Firefox)/(\\d+)\\.(\\d+)(b\\d+[a-z]*)",
                family_replacement: "Firefox Beta"
            }, {
                regex: "(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(a\\d+[a-z]*)",
                family_replacement: "Firefox Alpha"
            }, {
                regex: "(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(b\\d+[a-z]*)",
                family_replacement: "Firefox Beta"
            }, {
                regex: "(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?",
                family_replacement: "Firefox ($1)"
            }, {
                regex: "(Firefox).*Tablet browser (\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "MicroB",
                tablet: true
            }, {
                regex: "(MozillaDeveloperPreview)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?"
            }, {
                regex: "(Flock)/(\\d+)\\.(\\d+)(b\\d+?)",
                family_replacement: "Flock",
                other: true
            }, {
                regex: "(RockMelt)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Rockmelt",
                other: true
            }, {
                regex: "(Navigator)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Netscape"
            }, {
                regex: "(Navigator)/(\\d+)\\.(\\d+)([ab]\\d+)",
                family_replacement: "Netscape"
            }, {
                regex: "(Netscape6)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Netscape"
            }, {
                regex: "(MyIBrow)/(\\d+)\\.(\\d+)",
                family_replacement: "My Internet Browser",
                other: true
            }, {
                regex: "(Opera Tablet).*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                family_replacement: "Opera Tablet",
                tablet: true
            }, {
                regex: "(Opera)/.+Opera Mobi.+Version/(\\d+)\\.(\\d+)",
                family_replacement: "Opera Mobile"
            }, {
                regex: "Opera Mobi",
                family_replacement: "Opera Mobile"
            }, {
                regex: "(Opera Mini)/(\\d+)\\.(\\d+)",
                family_replacement: "Opera Mini"
            }, {
                regex: "(Opera Mini)/att/(\\d+)\\.(\\d+)",
                family_replacement: "Opera Mini"
            }, {
                regex: "(Opera)/9.80.*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                family_replacement: "Opera"
            }, {
                regex: "(OPR)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                family_replacement: "Opera"
            }, {
                regex: "(webOSBrowser)/(\\d+)\\.(\\d+)",
                family_replacement: "webOS"
            }, {
                regex: "(webOS)/(\\d+)\\.(\\d+)",
                family_replacement: "webOS"
            }, {
                regex: "(wOSBrowser).+TouchPad/(\\d+)\\.(\\d+)",
                family_replacement: "webOS TouchPad"
            }, {
                regex: "(luakit)",
                family_replacement: "LuaKit",
                other: true
            }, {
                regex: "(Lightning)/(\\d+)\\.(\\d+)([ab]?\\d+[a-z]*)",
                family_replacement: "Lightning",
                other: true
            }, {
                regex: "(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?) \\(Swiftfox\\)",
                family_replacement: "Swiftfox",
                other: true
            }, {
                regex: "(Firefox)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)? \\(Swiftfox\\)",
                family_replacement: "Swiftfox",
                other: true
            }, {
                regex: "rekonq",
                family_replacement: "Rekonq",
                other: true
            }, {
                regex: "(conkeror|Conkeror)/(\\d+)\\.(\\d+)\\.?(\\d+)?",
                family_replacement: "Conkeror",
                other: true
            }, {
                regex: "(konqueror)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Konqueror",
                other: true
            }, {
                regex: "(WeTab)-Browser",
                family_replacement: "WeTab",
                other: true
            }, {
                regex: "(Comodo_Dragon)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Comodo Dragon",
                other: true
            }, {
                regex: "(YottaaMonitor)",
                family_replacement: "Yottaa Monitor",
                other: true
            }, {
                regex: "(Kindle)/(\\d+)\\.(\\d+)",
                family_replacement: "Kindle"
            }, {
                regex: "(Symphony) (\\d+).(\\d+)",
                family_replacement: "Symphony",
                other: true
            }, {
                regex: "Minimo",
                family_replacement: "Minimo",
                other: true
            }, {
                regex: "(Edge)/(\\d+)\\.(\\d+)",
                family_replacement: "Edge"
            }, {
                regex: "(CrMo)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Chrome Mobile"
            }, {
                regex: "(CriOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Chrome Mobile iOS"
            }, {
                regex: "(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+) Mobile",
                family_replacement: "Chrome Mobile"
            }, {
                regex: "(chromeframe)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Chrome Frame"
            }, {
                regex: "(UC Browser)(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "UC Browser",
                other: true
            }, {
                regex: "(SLP Browser)/(\\d+)\\.(\\d+)",
                family_replacement: "Tizen Browser",
                other: true
            }, {
                regex: "(Epiphany)/(\\d+)\\.(\\d+).(\\d+)",
                family_replacement: "Epiphany",
                other: true
            }, {
                regex: "(SE 2\\.X) MetaSr (\\d+)\\.(\\d+)",
                family_replacement: "Sogou Explorer",
                other: true
            }, {
                regex: "(Pingdom.com_bot_version_)(\\d+)\\.(\\d+)",
                family_replacement: "PingdomBot",
                other: true
            }, {
                regex: "(facebookexternalhit)/(\\d+)\\.(\\d+)",
                family_replacement: "FacebookBot"
            }, {
                regex: "(Twitterbot)/(\\d+)\\.(\\d+)",
                family_replacement: "TwitterBot"
            }, {
                regex: "(AdobeAIR|Chromium|FireWeb|Jasmine|ANTGalio|Midori|Fresco|Lobo|PaleMoon|Maxthon|Lynx|OmniWeb|Dillo|Camino|Demeter|Fluid|Fennec|Shiira|Sunrise|Chrome|Flock|Netscape|Lunascape|WebPilot|NetFront|Netfront|Konqueror|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|Opera Mini|iCab|NetNewsWire|ThunderBrowse|Iron|Iris|UP\\.Browser|Bunjaloo|Google Earth|Raven for Mac)/(\\d+)\\.(\\d+)\\.(\\d+)"
            }, {
                regex: "(Bolt|Jasmine|IceCat|Skyfire|Midori|Maxthon|Lynx|Arora|IBrowse|Dillo|Camino|Shiira|Fennec|Phoenix|Chrome|Flock|Netscape|Lunascape|Epiphany|WebPilot|Opera Mini|Opera|NetFront|Netfront|Konqueror|Googlebot|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|iCab|NetNewsWire|Iron|Space Bison|Stainless|Orca|Dolfin|BOLT|Minimo|Tizen Browser|Polaris)/(\\d+)\\.(\\d+)"
            }, {
                regex: "(iRider|Crazy Browser|SkipStone|iCab|Lunascape|Sleipnir|Maemo Browser) (\\d+)\\.(\\d+)\\.(\\d+)"
            }, {
                regex: "(iCab|Lunascape|Opera|Android|Jasmine|Polaris|BREW) (\\d+)\\.(\\d+)\\.?(\\d+)?"
            }, {
                regex: "(Android) Donut",
                v2_replacement: "2",
                v1_replacement: "1"
            }, {
                regex: "(Android) Eclair",
                v2_replacement: "1",
                v1_replacement: "2"
            }, {
                regex: "(Android) Froyo",
                v2_replacement: "2",
                v1_replacement: "2"
            }, {
                regex: "(Android) Gingerbread",
                v2_replacement: "3",
                v1_replacement: "2"
            }, {
                regex: "(Android) Honeycomb",
                v1_replacement: "3"
            }, {
                regex: "(IEMobile)[ /](\\d+)\\.(\\d+)",
                family_replacement: "IE Mobile"
            }, {
                regex: "(MSIE) (\\d+)\\.(\\d+).*XBLWP7",
                family_replacement: "IE Large Screen"
            }, {
                regex: "(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+)"
            }, {
                regex: "(Firefox)/(\\d+)\\.(\\d+)(pre|[ab]\\d+[a-z]*)?"
            }, {
                regex: "(Obigo)InternetBrowser",
                other: true
            }, {
                regex: "(Obigo)\\-Browser",
                other: true
            }, {
                regex: "(Obigo|OBIGO)[^\\d]*(\\d+)(?:.(\\d+))?",
                other: true
            }, {
                regex: "(MAXTHON|Maxthon) (\\d+)\\.(\\d+)",
                family_replacement: "Maxthon",
                other: true
            }, {
                regex: "(Maxthon|MyIE2|Uzbl|Shiira)",
                v1_replacement: "0",
                other: true
            }, {
                regex: "(PLAYSTATION) (\\d+)",
                family_replacement: "PlayStation",
                manufacturer: "Sony"
            }, {
                regex: "(PlayStation Portable)[^\\d]+(\\d+).(\\d+)",
                manufacturer: "Sony"
            }, {
                regex: "(BrowseX) \\((\\d+)\\.(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(POLARIS)/(\\d+)\\.(\\d+)",
                family_replacement: "Polaris",
                other: true
            }, {
                regex: "(Embider)/(\\d+)\\.(\\d+)",
                family_replacement: "Polaris",
                other: true
            }, {
                regex: "(BonEcho)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Bon Echo",
                other: true
            }, {
                regex: "(iPod).+Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            }, {
                regex: "(iPod).*Version/(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            }, {
                regex: "(iPod)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            }, {
                regex: "(iPhone).*Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            }, {
                regex: "(iPhone).*Version/(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            }, {
                regex: "(iPhone)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            }, {
                regex: "(iPad).*Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                tablet: true,
                manufacturer: "Apple"
            }, {
                regex: "(iPad).*Version/(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                tablet: true,
                manufacturer: "Apple"
            }, {
                regex: "(iPad)",
                family_replacement: "Mobile Safari",
                tablet: true,
                manufacturer: "Apple"
            }, {
                regex: "(AvantGo) (\\d+).(\\d+)",
                other: true
            }, {
                regex: "(Avant)",
                v1_replacement: "1",
                other: true
            }, {
                regex: "^(Nokia)",
                family_replacement: "Nokia Services (WAP) Browser",
                manufacturer: "Nokia"
            }, {
                regex: "(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)\\.(\\d+)",
                manufacturer: "Nokia"
            }, {
                regex: "(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)",
                manufacturer: "Nokia"
            }, {
                regex: "(NokiaBrowser)/(\\d+)\\.(\\d+)",
                manufacturer: "Nokia"
            }, {
                regex: "(BrowserNG)/(\\d+)\\.(\\d+).(\\d+)",
                family_replacement: "NokiaBrowser",
                manufacturer: "Nokia"
            }, {
                regex: "(Series60)/5\\.0",
                v2_replacement: "0",
                v1_replacement: "7",
                family_replacement: "NokiaBrowser",
                manufacturer: "Nokia"
            }, {
                regex: "(Series60)/(\\d+)\\.(\\d+)",
                family_replacement: "Nokia OSS Browser",
                manufacturer: "Nokia"
            }, {
                regex: "(S40OviBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Nokia Series 40 Ovi Browser",
                manufacturer: "Nokia"
            }, {
                regex: "(Nokia)[EN]?(\\d+)",
                manufacturer: "Nokia"
            }, {
                regex: "(PlayBook).+RIM Tablet OS (\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Blackberry WebKit",
                tablet: true,
                manufacturer: "Nokia"
            }, {
                regex: "(Black[bB]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Blackberry WebKit",
                manufacturer: "RIM"
            }, {
                regex: "(Black[bB]erry)\\s?(\\d+)",
                family_replacement: "Blackberry",
                manufacturer: "RIM"
            }, {
                regex: "(OmniWeb)/v(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(Blazer)/(\\d+)\\.(\\d+)",
                family_replacement: "Palm Blazer",
                manufacturer: "Palm"
            }, {
                regex: "(Pre)/(\\d+)\\.(\\d+)",
                family_replacement: "Palm Pre",
                manufacturer: "Palm"
            }, {
                regex: "(Links) \\((\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(QtWeb) Internet Browser/(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(Silk)/(\\d+)\\.(\\d+)(?:\\.([0-9\\-]+))?",
                other: true,
                tablet: true
            }, {
                regex: "(AppleWebKit)/(\\d+)\\.?(\\d+)?\\+ .* Version/\\d+\\.\\d+.\\d+ Safari/",
                family_replacement: "WebKit Nightly"
            }, {
                regex: "(Version)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?.*Safari/",
                family_replacement: "Safari"
            }, {
                regex: "(Safari)/\\d+"
            }, {
                regex: "(OLPC)/Update(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(OLPC)/Update()\\.(\\d+)",
                v1_replacement: "0",
                other: true
            }, {
                regex: "(SEMC\\-Browser)/(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(Teleca)",
                family_replacement: "Teleca Browser",
                other: true
            }, {
                regex: "Trident(.*)rv.(\\d+)\\.(\\d+)",
                family_replacement: "IE"
            }, {
                regex: "(MSIE) (\\d+)\\.(\\d+)",
                family_replacement: "IE"
            } ],
            os_parsers: [ {
                regex: "(Android) (\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?"
            }, {
                regex: "(Android)\\-(\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?"
            }, {
                regex: "(Android) Donut",
                os_v2_replacement: "2",
                os_v1_replacement: "1"
            }, {
                regex: "(Android) Eclair",
                os_v2_replacement: "1",
                os_v1_replacement: "2"
            }, {
                regex: "(Android) Froyo",
                os_v2_replacement: "2",
                os_v1_replacement: "2"
            }, {
                regex: "(Android) Gingerbread",
                os_v2_replacement: "3",
                os_v1_replacement: "2"
            }, {
                regex: "(Android) Honeycomb",
                os_v1_replacement: "3"
            }, {
                regex: "(Silk-Accelerated=[a-z]{4,5})",
                os_replacement: "Android"
            }, {
                regex: "(Windows Phone 6\\.5)"
            }, {
                regex: "(Windows (?:NT 5\\.2|NT 5\\.1))",
                os_replacement: "Windows XP"
            }, {
                regex: "(XBLWP7)",
                os_replacement: "Windows Phone OS"
            }, {
                regex: "(Windows NT 6\\.1)",
                os_replacement: "Windows 7"
            }, {
                regex: "(Windows NT 6\\.0)",
                os_replacement: "Windows Vista"
            }, {
                regex: "(Windows 98|Windows XP|Windows ME|Windows 95|Windows CE|Windows 7|Windows NT 4\\.0|Windows Vista|Windows 2000)"
            }, {
                regex: "(Windows NT 6\\.4|Windows NT 10\\.0)",
                os_replacement: "Windows 10"
            }, {
                regex: "(Windows NT 6\\.2)",
                os_replacement: "Windows 8"
            }, {
                regex: "(Windows Phone 8)",
                os_replacement: "Windows Phone 8"
            }, {
                regex: "(Windows NT 5\\.0)",
                os_replacement: "Windows 2000"
            }, {
                regex: "(Windows Phone OS) (\\d+)\\.(\\d+)"
            }, {
                regex: "(Windows ?Mobile)",
                os_replacement: "Windows Mobile"
            }, {
                regex: "(WinNT4.0)",
                os_replacement: "Windows NT 4.0"
            }, {
                regex: "(Win98)",
                os_replacement: "Windows 98"
            }, {
                regex: "(Tizen)/(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(Mac OS X) (\\d+)[_.](\\d+)(?:[_.](\\d+))?",
                manufacturer: "Apple"
            }, {
                regex: "(?:PPC|Intel) (Mac OS X)",
                manufacturer: "Apple"
            }, {
                regex: "(CPU OS|iPhone OS) (\\d+)_(\\d+)(?:_(\\d+))?",
                os_replacement: "iOS",
                manufacturer: "Apple"
            }, {
                regex: "(iPhone|iPad|iPod); Opera",
                os_replacement: "iOS",
                manufacturer: "Apple"
            }, {
                regex: "(iPad); Opera",
                tablet: true,
                manufacturer: "Apple"
            }, {
                regex: "(iPhone|iPad|iPod).*Mac OS X.*Version/(\\d+)\\.(\\d+)",
                os_replacement: "iOS",
                manufacturer: "Apple"
            }, {
                regex: "(CrOS) [a-z0-9_]+ (\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                os_replacement: "Chrome OS"
            }, {
                regex: "(Debian)-(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                other: true
            }, {
                regex: "(Linux Mint)(?:/(\\d+))?",
                other: true
            }, {
                regex: "(Mandriva)(?: Linux)?/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                other: true
            }, {
                regex: "(Symbian[Oo][Ss])/(\\d+)\\.(\\d+)",
                os_replacement: "Symbian OS"
            }, {
                regex: "(Symbian/3).+NokiaBrowser/7\\.3",
                os_replacement: "Symbian^3 Anna"
            }, {
                regex: "(Symbian/3).+NokiaBrowser/7\\.4",
                os_replacement: "Symbian^3 Belle"
            }, {
                regex: "(Symbian/3)",
                os_replacement: "Symbian^3"
            }, {
                regex: "(Series 60|SymbOS|S60)",
                os_replacement: "Symbian OS"
            }, {
                regex: "(MeeGo)",
                other: true
            }, {
                regex: "Symbian [Oo][Ss]",
                os_replacement: "Symbian OS"
            }, {
                regex: "(Black[Bb]erry)[0-9a-z]+/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                os_replacement: "BlackBerry OS",
                manufacturer: "RIM"
            }, {
                regex: "(Black[Bb]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                os_replacement: "BlackBerry OS",
                manufacturer: "RIM"
            }, {
                regex: "(RIM Tablet OS) (\\d+)\\.(\\d+)\\.(\\d+)",
                os_replacement: "BlackBerry Tablet OS",
                tablet: true,
                manufacturer: "RIM"
            }, {
                regex: "(Play[Bb]ook)",
                os_replacement: "BlackBerry Tablet OS",
                tablet: true,
                manufacturer: "RIM"
            }, {
                regex: "(Black[Bb]erry)",
                os_replacement: "Blackberry OS",
                manufacturer: "RIM"
            }, {
                regex: "(webOS|hpwOS)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                os_replacement: "webOS"
            }, {
                regex: "(SUSE|Fedora|Red Hat|PCLinuxOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(SUSE|Fedora|Red Hat|Puppy|PCLinuxOS|CentOS)/(\\d+)\\.(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(Ubuntu|Kindle|Bada|Lubuntu|BackTrack|Red Hat|Slackware)/(\\d+)\\.(\\d+)"
            }, {
                regex: "(Windows|OpenBSD|FreeBSD|NetBSD|Ubuntu|Kubuntu|Android|Arch Linux|CentOS|WeTab|Slackware)"
            }, {
                regex: "(Linux|BSD)",
                other: true
            } ],
            mobile_os_families: [ "Windows Phone 6.5", "Windows CE", "Symbian OS" ],
            device_parsers: [ {
                regex: "HTC ([A-Z][a-z0-9]+) Build",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "HTC ([A-Z][a-z0-9 ]+) \\d+\\.\\d+\\.\\d+\\.\\d+",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "HTC_Touch_([A-Za-z0-9]+)",
                device_replacement: "HTC Touch ($1)",
                manufacturer: "HTC"
            }, {
                regex: "USCCHTC(\\d+)",
                device_replacement: "HTC $1 (US Cellular)",
                manufacturer: "HTC"
            }, {
                regex: "Sprint APA(9292)",
                device_replacement: "HTC $1 (Sprint)",
                manufacturer: "HTC"
            }, {
                regex: "HTC ([A-Za-z0-9]+ [A-Z])",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "HTC-([A-Za-z0-9]+)",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "HTC_([A-Za-z0-9]+)",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "HTC ([A-Za-z0-9]+)",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "(ADR[A-Za-z0-9]+)",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "(HTC)",
                manufacturer: "HTC"
            }, {
                regex: "SonyEricsson([A-Za-z0-9]+)/",
                device_replacement: "Ericsson $1",
                other: true,
                manufacturer: "Sony"
            }, {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; WOWMobile (.+) Build"
            }, {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\.[\\d]+; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build"
            }, {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\-update1\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build"
            }, {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build"
            }, {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\.[\\d]+; (.+) Build"
            }, {
                regex: "NokiaN([0-9]+)",
                device_replacement: "Nokia N$1",
                manufacturer: "Nokia"
            }, {
                regex: "Nokia([A-Za-z0-9\\v-]+)",
                device_replacement: "Nokia $1",
                manufacturer: "Nokia"
            }, {
                regex: "NOKIA ([A-Za-z0-9\\-]+)",
                device_replacement: "Nokia $1",
                manufacturer: "Nokia"
            }, {
                regex: "Nokia ([A-Za-z0-9\\-]+)",
                device_replacement: "Nokia $1",
                manufacturer: "Nokia"
            }, {
                regex: "Lumia ([A-Za-z0-9\\-]+)",
                device_replacement: "Lumia $1",
                manufacturer: "Nokia"
            }, {
                regex: "Symbian",
                device_replacement: "Nokia",
                manufacturer: "Nokia"
            }, {
                regex: "(PlayBook).+RIM Tablet OS",
                device_replacement: "Blackberry Playbook",
                tablet: true,
                manufacturer: "RIM"
            }, {
                regex: "(Black[Bb]erry [0-9]+);",
                manufacturer: "RIM"
            }, {
                regex: "Black[Bb]erry([0-9]+)",
                device_replacement: "BlackBerry $1",
                manufacturer: "RIM"
            }, {
                regex: "(Pre)/(\\d+)\\.(\\d+)",
                device_replacement: "Palm Pre",
                manufacturer: "Palm"
            }, {
                regex: "(Pixi)/(\\d+)\\.(\\d+)",
                device_replacement: "Palm Pixi",
                manufacturer: "Palm"
            }, {
                regex: "(Touchpad)/(\\d+)\\.(\\d+)",
                device_replacement: "HP Touchpad",
                manufacturer: "HP"
            }, {
                regex: "HPiPAQ([A-Za-z0-9]+)/(\\d+).(\\d+)",
                device_replacement: "HP iPAQ $1",
                manufacturer: "HP"
            }, {
                regex: "Palm([A-Za-z0-9]+)",
                device_replacement: "Palm $1",
                manufacturer: "Palm"
            }, {
                regex: "Treo([A-Za-z0-9]+)",
                device_replacement: "Palm Treo $1",
                manufacturer: "Palm"
            }, {
                regex: "webOS.*(P160UNA)/(\\d+).(\\d+)",
                device_replacement: "HP Veer",
                manufacturer: "HP"
            }, {
                regex: "(Kindle Fire)",
                manufacturer: "Amazon"
            }, {
                regex: "(Kindle)",
                manufacturer: "Amazon"
            }, {
                regex: "(Silk)/(\\d+)\\.(\\d+)(?:\\.([0-9\\-]+))?",
                device_replacement: "Kindle Fire",
                tablet: true,
                manufacturer: "Amazon"
            }, {
                regex: "(iPad) Simulator;",
                manufacturer: "Apple"
            }, {
                regex: "(iPad);",
                manufacturer: "Apple"
            }, {
                regex: "(iPod);",
                manufacturer: "Apple"
            }, {
                regex: "(iPhone) Simulator;",
                manufacturer: "Apple"
            }, {
                regex: "(iPhone);",
                manufacturer: "Apple"
            }, {
                regex: "Nexus\\ ([A-Za-z0-9\\-]+)",
                device_replacement: "Nexus $1"
            }, {
                regex: "acer_([A-Za-z0-9]+)_",
                device_replacement: "Acer $1",
                manufacturer: "Acer"
            }, {
                regex: "acer_([A-Za-z0-9]+)_",
                device_replacement: "Acer $1",
                manufacturer: "Acer"
            }, {
                regex: "Amoi\\-([A-Za-z0-9]+)",
                device_replacement: "Amoi $1",
                other: true,
                manufacturer: "Amoi"
            }, {
                regex: "AMOI\\-([A-Za-z0-9]+)",
                device_replacement: "Amoi $1",
                other: true,
                manufacturer: "Amoi"
            }, {
                regex: "Asus\\-([A-Za-z0-9]+)",
                device_replacement: "Asus $1",
                manufacturer: "Asus"
            }, {
                regex: "ASUS\\-([A-Za-z0-9]+)",
                device_replacement: "Asus $1",
                manufacturer: "Asus"
            }, {
                regex: "BIRD\\-([A-Za-z0-9]+)",
                device_replacement: "Bird $1",
                other: true
            }, {
                regex: "BIRD\\.([A-Za-z0-9]+)",
                device_replacement: "Bird $1",
                other: true
            }, {
                regex: "BIRD ([A-Za-z0-9]+)",
                device_replacement: "Bird $1",
                other: true
            }, {
                regex: "Dell ([A-Za-z0-9]+)",
                device_replacement: "Dell $1",
                manufacturer: "Dell"
            }, {
                regex: "DoCoMo/2\\.0 ([A-Za-z0-9]+)",
                device_replacement: "DoCoMo $1",
                other: true
            }, {
                regex: "([A-Za-z0-9]+)\\_W\\;FOMA",
                device_replacement: "DoCoMo $1",
                other: true
            }, {
                regex: "([A-Za-z0-9]+)\\;FOMA",
                device_replacement: "DoCoMo $1",
                other: true
            }, {
                regex: "vodafone([A-Za-z0-9]+)",
                device_replacement: "Huawei Vodafone $1",
                other: true
            }, {
                regex: "i\\-mate ([A-Za-z0-9]+)",
                device_replacement: "i-mate $1",
                other: true
            }, {
                regex: "Kyocera\\-([A-Za-z0-9]+)",
                device_replacement: "Kyocera $1",
                other: true
            }, {
                regex: "KWC\\-([A-Za-z0-9]+)",
                device_replacement: "Kyocera $1",
                other: true
            }, {
                regex: "Lenovo\\-([A-Za-z0-9]+)",
                device_replacement: "Lenovo $1",
                manufacturer: "Lenovo"
            }, {
                regex: "Lenovo\\_([A-Za-z0-9]+)",
                device_replacement: "Lenovo $1",
                manufacturer: "Levovo"
            }, {
                regex: "LG/([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LG-LG([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LGE-LG([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LGE VX([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LG ([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LGE LG\\-AX([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LG\\-([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LGE\\-([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LG([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "(KIN)\\.One (\\d+)\\.(\\d+)",
                device_replacement: "Microsoft $1"
            }, {
                regex: "(KIN)\\.Two (\\d+)\\.(\\d+)",
                device_replacement: "Microsoft $1"
            }, {
                regex: "(Motorola)\\-([A-Za-z0-9]+)",
                manufacturer: "Motorola"
            }, {
                regex: "MOTO\\-([A-Za-z0-9]+)",
                device_replacement: "Motorola $1",
                manufacturer: "Motorola"
            }, {
                regex: "MOT\\-([A-Za-z0-9]+)",
                device_replacement: "Motorola $1",
                manufacturer: "Motorola"
            }, {
                regex: "Philips([A-Za-z0-9]+)",
                device_replacement: "Philips $1",
                manufacturer: "Philips"
            }, {
                regex: "Philips ([A-Za-z0-9]+)",
                device_replacement: "Philips $1",
                manufacturer: "Philips"
            }, {
                regex: "SAMSUNG-([A-Za-z0-9\\-]+)",
                device_replacement: "Samsung $1",
                manufacturer: "Samsung"
            }, {
                regex: "SAMSUNG\\; ([A-Za-z0-9\\-]+)",
                device_replacement: "Samsung $1",
                manufacturer: "Samsung"
            }, {
                regex: "Softbank/1\\.0/([A-Za-z0-9]+)",
                device_replacement: "Softbank $1",
                other: true
            }, {
                regex: "Softbank/2\\.0/([A-Za-z0-9]+)",
                device_replacement: "Softbank $1",
                other: true
            }, {
                regex: "(hiptop|avantgo|plucker|xiino|blazer|elaine|up.browser|up.link|mmp|smartphone|midp|wap|vodafone|o2|pocket|mobile|pda)",
                device_replacement: "Generic Smartphone"
            }, {
                regex: "^(1207|3gso|4thp|501i|502i|503i|504i|505i|506i|6310|6590|770s|802s|a wa|acer|acs\\-|airn|alav|asus|attw|au\\-m|aur |aus |abac|acoo|aiko|alco|alca|amoi|anex|anny|anyw|aptu|arch|argo|bell|bird|bw\\-n|bw\\-u|beck|benq|bilb|blac|c55/|cdm\\-|chtm|capi|comp|cond|craw|dall|dbte|dc\\-s|dica|ds\\-d|ds12|dait|devi|dmob|doco|dopo|el49|erk0|esl8|ez40|ez60|ez70|ezos|ezze|elai|emul|eric|ezwa|fake|fly\\-|fly\\_|g\\-mo|g1 u|g560|gf\\-5|grun|gene|go.w|good|grad|hcit|hd\\-m|hd\\-p|hd\\-t|hei\\-|hp i|hpip|hs\\-c|htc |htc\\-|htca|htcg)",
                device_replacement: "Generic Feature Phone"
            }, {
                regex: "^(htcp|htcs|htct|htc\\_|haie|hita|huaw|hutc|i\\-20|i\\-go|i\\-ma|i230|iac|iac\\-|iac/|ig01|im1k|inno|iris|jata|java|kddi|kgt|kgt/|kpt |kwc\\-|klon|lexi|lg g|lg\\-a|lg\\-b|lg\\-c|lg\\-d|lg\\-f|lg\\-g|lg\\-k|lg\\-l|lg\\-m|lg\\-o|lg\\-p|lg\\-s|lg\\-t|lg\\-u|lg\\-w|lg/k|lg/l|lg/u|lg50|lg54|lge\\-|lge/|lynx|leno|m1\\-w|m3ga|m50/|maui|mc01|mc21|mcca|medi|meri|mio8|mioa|mo01|mo02|mode|modo|mot |mot\\-|mt50|mtp1|mtv |mate|maxo|merc|mits|mobi|motv|mozz|n100|n101|n102|n202|n203|n300|n302|n500|n502|n505|n700|n701|n710|nec\\-|nem\\-|newg|neon)",
                device_replacement: "Generic Feature Phone"
            }, {
                regex: "^(netf|noki|nzph|o2 x|o2\\-x|opwv|owg1|opti|oran|ot\\-s|p800|pand|pg\\-1|pg\\-2|pg\\-3|pg\\-6|pg\\-8|pg\\-c|pg13|phil|pn\\-2|pt\\-g|palm|pana|pire|pock|pose|psio|qa\\-a|qc\\-2|qc\\-3|qc\\-5|qc\\-7|qc07|qc12|qc21|qc32|qc60|qci\\-|qwap|qtek|r380|r600|raks|rim9|rove|s55/|sage|sams|sc01|sch\\-|scp\\-|sdk/|se47|sec\\-|sec0|sec1|semc|sgh\\-|shar|sie\\-|sk\\-0|sl45|slid|smb3|smt5|sp01|sph\\-|spv |spv\\-|sy01|samm|sany|sava|scoo|send|siem|smar|smit|soft|sony|t\\-mo|t218|t250|t600|t610|t618|tcl\\-|tdg\\-|telm|tim\\-|ts70|tsm\\-|tsm3|tsm5|tx\\-9|tagt)",
                device_replacement: "Generic Feature Phone"
            }, {
                regex: "^(talk|teli|topl|tosh|up.b|upg1|utst|v400|v750|veri|vk\\-v|vk40|vk50|vk52|vk53|vm40|vx98|virg|vite|voda|vulc|w3c |w3c\\-|wapj|wapp|wapu|wapm|wig |wapi|wapr|wapv|wapy|wapa|waps|wapt|winc|winw|wonu|x700|xda2|xdag|yas\\-|your|zte\\-|zeto|aste|audi|avan|blaz|brew|brvw|bumb|ccwa|cell|cldc|cmd\\-|dang|eml2|fetc|hipt|http|ibro|idea|ikom|ipaq|jbro|jemu|jigs|keji|kyoc|kyok|libw|m\\-cr|midp|mmef|moto|mwbp|mywa|newt|nok6|o2im|pant|pdxg|play|pluc|port|prox|rozo|sama|seri|smal|symb|treo|upsi|vx52|vx53|vx60|vx61|vx70|vx80|vx81|vx83|vx85|wap\\-|webc|whit|wmlb|xda\\-|xda\\_)",
                device_replacement: "Generic Feature Phone"
            }, {
                regex: "(bot|borg|google(^tv)|yahoo|slurp|msnbot|msrbot|openbot|archiver|netresearch|lycos|scooter|altavista|teoma|gigabot|baiduspider|blitzbot|oegp|charlotte|furlbot|http%20client|polybot|htdig|ichiro|mogimogi|larbin|pompos|scrubby|searchsight|seekbot|semanticdiscovery|silk|snappy|speedy|spider|voila|vortex|voyager|zao|zeal|fast\\-webcrawler|converacrawler|dataparksearch|findlinks)",
                device_replacement: "Spider"
            } ],
            mobile_browser_families: [ "Firefox Mobile", "Opera Mobile", "Opera Mini", "Mobile Safari", "webOS", "IE Mobile", "Playstation Portable", "Nokia", "Blackberry", "Palm", "Silk", "Android", "Maemo", "Obigo", "Netfront", "AvantGo", "Teleca", "SEMC-Browser", "Bolt", "Iris", "UP.Browser", "Symphony", "Minimo", "Bunjaloo", "Jasmine", "Dolfin", "Polaris", "BREW", "Chrome Mobile", "Chrome Mobile iOS", "UC Browser", "Tizen Browser" ]
        };
        // Parsers
        _this.parsers = [ "device_parsers", "browser_parsers", "os_parsers", "mobile_os_families", "mobile_browser_families" ];
        // Types
        _this.types = [ "browser", "os", "device" ];
        // Regular Expressions
        _this.regexes = regexes || function() {
            var results = {};
            _this.parsers.map(function(parser) {
                results[parser] = [];
            });
            return results;
        }();
        // Families
        _this.families = function() {
            var results = {};
            _this.types.map(function(type) {
                results[type] = [];
            });
            return results;
        }();
        // Utility Variables
        var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype, nativeForEach = ArrayProto.forEach, nativeIndexOf = ArrayProto.indexOf;
        // Find Utility
        var find = function(ua, obj) {
            var ret = {};
            for (var i = 0; i < obj.length; i++) {
                ret = obj[i](ua);
                if (ret) {
                    break;
                }
            }
            return ret;
        };
        // Remove Utility
        var remove = function(arr, props) {
            each(arr, function(obj) {
                each(props, function(prop) {
                    delete obj[prop];
                });
            });
        };
        // Contains Utility
        var contains = function(obj, target) {
            var found = false;
            if (obj == null) return found;
            if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
            found = any(obj, function(value) {
                return value === target;
            });
            return found;
        };
        // Each Utility
        var each = forEach = function(obj, iterator, context) {
            if (obj == null) return;
            if (nativeForEach && obj.forEach === nativeForEach) {
                obj.forEach(iterator, context);
            } else if (obj.length === +obj.length) {
                for (var i = 0, l = obj.length; i < l; i++) {
                    iterator.call(context, obj[i], i, obj);
                }
            } else {
                for (var key in obj) {
                    if (_.has(obj, key)) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            }
        };
        // Extend Utiltiy
        var extend = function(obj) {
            each(slice.call(arguments, 1), function(source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            });
            return obj;
        };
        // Check String Utility
        var check = function(str) {
            return !!(str && typeof str != "undefined" && str != null);
        };
        // To Version String Utility
        var toVersionString = function(obj) {
            var output = "";
            obj = obj || {};
            if (check(obj)) {
                if (check(obj.major)) {
                    output += obj.major;
                    if (check(obj.minor)) {
                        output += "." + obj.minor;
                        if (check(obj.patch)) {
                            output += "." + obj.patch;
                        }
                    }
                }
            }
            return output;
        };
        // To String Utility
        var toString = function(obj) {
            obj = obj || {};
            var suffix = toVersionString(obj);
            if (suffix) suffix = " " + suffix;
            return obj && check(obj.family) ? obj.family + suffix : "";
        };
        // Parse User-Agent String
        _this.parse = function(ua) {
            // Parsers Utility
            var parsers = function(type) {
                return _this.regexes[type + "_parsers"].map(function(obj) {
                    var regexp = new RegExp(obj.regex), rep = obj[(type === "browser" ? "family" : type) + "_replacement"], major_rep = obj.major_version_replacement;
                    function parser(ua) {
                        var m = ua.match(regexp);
                        if (!m) return null;
                        var ret = {};
                        ret.family = (rep ? rep.replace("$1", m[1]) : m[1]) || "other";
                        ret.major = parseInt(major_rep ? major_rep : m[2]) || null;
                        ret.minor = m[3] ? parseInt(m[3]) : null;
                        ret.patch = m[4] ? parseInt(m[4]) : null;
                        ret.tablet = obj.tablet;
                        ret.man = obj.manufacturer || null;
                        return ret;
                    }
                    return parser;
                });
            };
            // User Agent
            var UserAgent = function() {};
            // Browsers Parsed
            var browser_parsers = parsers("browser");
            // Operating Systems Parsed
            var os_parsers = parsers("os");
            // Devices Parsed
            var device_parsers = parsers("device");
            // Set Agent
            var a = new UserAgent();
            // Remember the original user agent string
            a.source = ua;
            // Set Browser
            a.browser = find(ua, browser_parsers);
            if (check(a.browser)) {
                a.browser.name = toString(a.browser);
                a.browser.version = toVersionString(a.browser);
            } else {
                a.browser = {};
            }
            // Set OS
            a.os = find(ua, os_parsers);
            if (check(a.os)) {
                a.os.name = toString(a.os);
                a.os.version = toVersionString(a.os);
            } else {
                a.os = {};
            }
            // Set Device
            a.device = find(ua, device_parsers);
            if (check(a.device)) {
                a.device.name = toString(a.device);
                a.device.version = toVersionString(a.device);
            } else {
                a.device = {
                    tablet: false,
                    family: "Other"
                };
            }
            // Determine Device Type
            var mobile_agents = {};
            var mobile_browser_families = _this.regexes.mobile_browser_families.map(function(str) {
                mobile_agents[str] = true;
            });
            var mobile_os_families = _this.regexes.mobile_os_families.map(function(str) {
                mobile_agents[str] = true;
            });
            // Is Spider
            if (a.browser.family === "Spider") {
                a.device.type = "Spider";
            } else if (a.browser.tablet || a.os.tablet || a.device.tablet) {
                a.device.type = "Tablet";
            } else if (mobile_agents.hasOwnProperty(a.browser.family)) {
                a.device.type = "Mobile";
            } else {
                a.device.type = "Desktop";
            }
            // Determine Device Manufacturer
            a.device.manufacturer = a.browser.man || a.os.man || a.device.man || null;
            // Cleanup Objects
            remove([ a.browser, a.os, a.device ], [ "tablet", "man" ]);
            // Return Agent
            return a;
        };
        // Return context
        return _this;
    }();
    // Export the Underscore object for **Node.js** and **"CommonJS"**,
    // backwards-compatibility for the old `require()` API. If we're not
    // CommonJS, add `_` to the global object via a string identifier
    // the Closure Compiler "advanced" mode. Registration as an AMD
    // via define() happens at the end of this file
    if (true) {
        if ( true && module.exports) {
            exports = module.exports = detect;
        }
        exports.detect = detect;
    } else {}
    // AMD define happens at the end for compatibility with AMD
    // that don't enforce next-turn semantics on modules
    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function(require) {
            return detect;
        }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
})(window);

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

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
	"./administrator.svg": "./resources/js/icons/svg/administrator.svg",
	"./approved.svg": "./resources/js/icons/svg/approved.svg",
	"./auth.svg": "./resources/js/icons/svg/auth.svg",
	"./courses.svg": "./resources/js/icons/svg/courses.svg",
	"./discussion.svg": "./resources/js/icons/svg/discussion.svg",
	"./favourite.svg": "./resources/js/icons/svg/favourite.svg",
	"./hot.svg": "./resources/js/icons/svg/hot.svg",
	"./instagram.svg": "./resources/js/icons/svg/instagram.svg",
	"./invisible.svg": "./resources/js/icons/svg/invisible.svg",
	"./login.svg": "./resources/js/icons/svg/login.svg",
	"./logo-alternate.svg": "./resources/js/icons/svg/logo-alternate.svg",
	"./logo-color-reverse.svg": "./resources/js/icons/svg/logo-color-reverse.svg",
	"./logo.svg": "./resources/js/icons/svg/logo.svg",
	"./logout.svg": "./resources/js/icons/svg/logout.svg",
	"./notification.svg": "./resources/js/icons/svg/notification.svg",
	"./profile.svg": "./resources/js/icons/svg/profile.svg",
	"./publish.svg": "./resources/js/icons/svg/publish.svg",
	"./register.svg": "./resources/js/icons/svg/register.svg",
	"./rss.svg": "./resources/js/icons/svg/rss.svg",
	"./settings.svg": "./resources/js/icons/svg/settings.svg",
	"./settings2.svg": "./resources/js/icons/svg/settings2.svg",
	"./study.svg": "./resources/js/icons/svg/study.svg",
	"./sync.svg": "./resources/js/icons/svg/sync.svg",
	"./visible.svg": "./resources/js/icons/svg/visible.svg",
	"./wechat-mini-program.svg": "./resources/js/icons/svg/wechat-mini-program.svg",
	"./wechat.svg": "./resources/js/icons/svg/wechat.svg",
	"./weibo.svg": "./resources/js/icons/svg/weibo.svg",
	"./zhihu.svg": "./resources/js/icons/svg/zhihu.svg"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./resources/js/icons/svg sync \\.svg$";

/***/ }),

/***/ "./resources/js/icons/svg/administrator.svg":
/*!**************************************************!*\
  !*** ./resources/js/icons/svg/administrator.svg ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-baker-runtime/browser-symbol */ "./node_modules/svg-baker-runtime/browser-symbol.js");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-sprite-loader/runtime/browser-sprite.build */ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-administrator",
  "use": "icon-administrator-usage",
  "viewBox": "0 0 1024 1024",
  "content": "<symbol class=\"icon\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-administrator\"><path d=\"M512 526.92c115.366 0 208.888-138.283 208.888-253.649 0-115.366-93.522-208.888-208.888-208.888s-208.888 93.522-208.888 208.888S396.634 526.921 512 526.921zM138.986 795.698c0-56.443 40.94-122.625 91.447-147.825l92.897-46.35 70.368 242.728s1.968 21.004 37.145 21.004c35.177 0 35.177-21.004 35.177-21.004V646.285s1.596-44.762 47.464-44.762c45.867 0 45.867 44.762 45.867 44.762v197.966s11.992 24.88 40.407 24.88c28.416 0 31.845-24.88 31.845-24.88l68.893-242.728 93.053 46.384c50.515 25.18 91.465 91.34 91.465 147.79v61.722c0 56.442-45.754 102.198-102.192 102.198H241.178c-56.439 0-102.192-45.747-102.192-102.198v-61.721z\" /></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/icons/svg/approved.svg":
/*!*********************************************!*\
  !*** ./resources/js/icons/svg/approved.svg ***!
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
  "id": "icon-approved",
  "use": "icon-approved-usage",
  "viewBox": "0 0 1024 1024",
  "content": "<symbol class=\"icon\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-approved\"><path d=\"M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0zm-46.08 775.68l-217.6-217.6L320 486.4l145.92 145.92L755.2 343.04l71.68 71.68-360.96 360.96z\" fill=\"#7ED321\" /></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

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

/***/ "./resources/js/icons/svg/courses.svg":
/*!********************************************!*\
  !*** ./resources/js/icons/svg/courses.svg ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-baker-runtime/browser-symbol */ "./node_modules/svg-baker-runtime/browser-symbol.js");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-sprite-loader/runtime/browser-sprite.build */ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-courses",
  "use": "icon-courses-usage",
  "viewBox": "0 0 1024 1024",
  "content": "<symbol class=\"icon\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-courses\"><defs><style></style></defs><path d=\"M809.4 47.9H701.6v392c0 22.6-18.3 41-41 41-22.6 0-41-18.3-41-41v-392H183.8c-38.8 0-70.2 31.4-70.2 70.2v113.5h109.6c22.6 0 41 18.3 41 41 0 22.6-18.3 41-41 41H113.6v85.2h112.6c22.6 0 41 18.3 41 41 0 22.6-18.3 41-41 41H113.6V566h102.6c22.6 0 41 18.3 41 41s-18.3 41-41 41H113.6v85.2h108.6c22.6 0 41 18.3 41 41 0 22.6-18.3 41-41 41H113.6v107.9c0 38.8 31.4 70.2 70.2 70.2h625.5c38.8 0 70.2-31.4 70.2-70.2v-805c0-38.8-31.4-70.2-70.1-70.2z\" fill=\"#242424\" /></symbol>"
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

/***/ "./resources/js/icons/svg/instagram.svg":
/*!**********************************************!*\
  !*** ./resources/js/icons/svg/instagram.svg ***!
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
  "id": "icon-instagram",
  "use": "icon-instagram-usage",
  "viewBox": "0 0 200 200",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" id=\"icon-instagram\"><g fill=\"none\" fill-rule=\"evenodd\"><path d=\"M0 100c0 55.228 44.772 100 100 100s100-44.772 100-100S155.228 0 100 0 0 44.772 0 100z\" fill=\"#A97E57\" /><path d=\"M146.371 51.923c-11.948 1.512-24.406 1.46-36.943.266-17.509-1.347-43.098-9.428-52.526 6.734-15.145 25.873-7.675 58.998-4.146 88.311l52.632 52.62c50.933-2.704 91.752-43.518 94.465-94.449l-53.482-53.482z\" fill=\"#7B5E3C\" /><path d=\"M123.136 42.76H76.864c-18.805 0-34.103 15.3-34.103 34.104v46.272c0 18.803 15.298 34.103 34.103 34.103h46.272c18.804 0 34.103-15.299 34.103-34.103V76.864c0-18.805-15.299-34.103-34.103-34.103zm22.587 80.376c0 12.474-10.113 22.587-22.587 22.587H76.864c-12.474 0-22.586-10.113-22.586-22.587V76.864c0-12.474 10.112-22.587 22.586-22.587h46.272c12.474 0 22.587 10.114 22.587 22.587v46.272z\" fill=\"#FFF\" fill-rule=\"nonzero\" /><path d=\"M100 70.391c-16.326 0-29.609 13.283-29.609 29.609 0 16.325 13.283 29.607 29.609 29.607s29.607-13.281 29.607-29.607S116.326 70.391 100 70.391zm0 47.7c-9.992 0-18.092-8.099-18.092-18.091s8.1-18.092 18.092-18.092c9.992 0 18.091 8.1 18.091 18.092 0 9.992-8.1 18.091-18.091 18.091z\" fill=\"#FFF\" fill-rule=\"nonzero\" /><path d=\"M136.759 70.615a7.095 7.095 0 1 1-14.19 0 7.095 7.095 0 0 1 14.19 0z\" fill=\"#D1D1D1\" /><path d=\"M123.136 42.76h-23.36v11.517h23.36c12.474 0 22.587 10.114 22.587 22.587v46.272c0 12.474-10.113 22.587-22.587 22.587h-23.36v11.516h23.36c18.804 0 34.103-15.299 34.103-34.103V76.864c0-18.805-15.299-34.103-34.103-34.103z\" fill=\"#D1D1D1\" /><path d=\"M100 70.391c-.075 0-.149.006-.224.006v11.516c.074 0 .149-.005.224-.005 9.992 0 18.091 8.1 18.091 18.092 0 9.992-8.099 18.091-18.091 18.091-.075 0-.15-.005-.224-.005v11.516c.075 0 .149.005.224.005 16.326 0 29.607-13.282 29.607-29.607 0-16.326-13.281-29.609-29.607-29.609z\" fill=\"#D1D1D1\" /></g></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/icons/svg/invisible.svg":
/*!**********************************************!*\
  !*** ./resources/js/icons/svg/invisible.svg ***!
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
  "id": "icon-invisible",
  "use": "icon-invisible-usage",
  "viewBox": "0 0 470 406",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 470 406\" id=\"icon-invisible\"><g fill=\"#8D8C8C\" fill-rule=\"evenodd\"><path d=\"M231.147 128.373l67.2 67.2.32-3.52c0-35.307-28.693-64-64-64l-3.52.32z\" /><path d=\"M234.667 85.387c58.88 0 106.667 47.787 106.667 106.667 0 13.76-2.773 26.88-7.573 38.933l62.4 62.4c32.213-26.88 57.6-61.653 73.28-101.333-37.013-93.653-128-160-234.773-160-29.867 0-58.453 5.333-85.013 14.933l46.08 45.973c12.052-4.693 25.172-7.573 38.932-7.573z\" /><path d=\"M21.333 27.253l48.64 48.64L79.68 85.6C44.48 113.12 16.64 149.707 0 192.053c36.907 93.653 128 160 234.667 160 33.067 0 64.64-6.4 93.547-18.027l9.067 9.067 62.187 62.293 27.2-27.093L48.533.053l-27.2 27.2zM139.307 145.12l32.96 32.96c-.96 4.587-1.6 9.173-1.6 13.973 0 35.307 28.693 64 64 64 4.8 0 9.387-.64 13.867-1.6l32.96 32.96c-14.187 7.04-29.973 11.307-46.827 11.307-58.88 0-106.667-47.787-106.667-106.667 0-16.853 4.267-32.64 11.307-46.933z\" fill-rule=\"nonzero\" /></g></symbol>"
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

/***/ "./resources/js/icons/svg/logo-alternate.svg":
/*!***************************************************!*\
  !*** ./resources/js/icons/svg/logo-alternate.svg ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-baker-runtime/browser-symbol */ "./node_modules/svg-baker-runtime/browser-symbol.js");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-sprite-loader/runtime/browser-sprite.build */ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-logo-alternate",
  "use": "icon-logo-alternate-usage",
  "viewBox": "0 0 135 38",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 135 38\" id=\"icon-logo-alternate\"><g fill=\"none\" fill-rule=\"evenodd\"><circle fill=\"#2A6EA8\" cx=\"19\" cy=\"19\" r=\"19\" /><g transform=\"translate(10 9)\" fill=\"#FFF\"><g transform=\"translate(.203 .656)\"><path d=\"M15.95 8.442h3.19v3.54c0 1.712-.007 3.004-.258 3.877-.251.872-.561 1.598-.93 2.178a6.948 6.948 0 0 1-1.353 1.556c-1.774 1.521-4.091 2.282-6.954 2.282-2.916 0-5.255-.755-7.017-2.266a7.27 7.27 0 0 1-1.354-1.572c-.369-.58-.673-1.29-.914-2.13-.24-.84-.36-2.16-.36-3.958V1.823h3.281V11.98c0 2.096.18 3.553.66 4.373.481.819 1.213 1.476 2.195 1.97.983.495 2.142.742 3.477.742 1.901 0 3.45-.494 4.646-1.484a4.598 4.598 0 0 0 1.362-1.883c.278-.723.33-1.963.33-3.718V8.442z\" /><path d=\"M1.64 0h.046c.881 0 1.595.714 1.595 1.595v1.322a1.64 1.64 0 0 1-3.281 0V1.64C0 .735.735 0 1.64 0z\" /><rect x=\"16.406\" y=\"6.836\" width=\"2.734\" height=\"7.292\" rx=\"1.367\" /></g><rect x=\"6.219\" y=\".656\" width=\"13.125\" height=\"3.281\" rx=\"1.641\" /><rect x=\"6.219\" y=\"7.219\" width=\"13.125\" height=\"3.281\" rx=\"1.641\" /></g><path d=\"M59.824 13.792c-.848 0-1.456-.12-1.824-.36-.432-.24-.728-.672-.888-1.296l-.672-2.472h3.144l.696 2.616c.128.512.464.768 1.008.768h1.272v.744h-2.736zm-18.432 3.432v-.768h1.152c.72-.016 1.168-.376 1.344-1.08l1.368-6.144H48.4l-1.248 5.688c-.224.96-.672 1.6-1.344 1.92-.512.256-1.232.384-2.16.384h-2.256zm2.376 12.72V18.4h3v11.544h-3zm15.552 0c-1.024.016-1.744-.176-2.16-.576-.4-.368-.6-.976-.6-1.824V16.84h3.024v11.208c.016.736.352 1.112 1.008 1.128H62.8v.768h-3.48zm-10.968-14.4V14.8h3.096l.192-5.568h3.048l-.216 5.568h8.304v.744h-8.328l-.408 11.76c-.032.928-.28 1.592-.744 1.992-.48.432-1.176.648-2.088.648h-2.952v-.768h1.584c.704-.016 1.088-.424 1.152-1.224l.432-12.408h-3.072zm29.865-4.152l-.72 3.792h4.8l-.696-3.768c-.144-.528-.464-.808-.96-.84h-1.44c-.512.048-.84.32-.984.816zm3.216 17.784c.88-.032 1.336-.488 1.368-1.368v-5.616c-.064-.896-.52-1.368-1.368-1.416h-3.072c-.832.08-1.288.552-1.368 1.416v5.616c.016.896.48 1.352 1.392 1.368h3.048zm-15.96-14.52v-.792h2.568V9.232h2.952v4.632h2.136v.792h-2.136v5.808l2.136-.672v.792l-2.136.672v5.736c0 1.136-.296 1.928-.888 2.376-.544.384-1.368.576-2.472.576h-1.896v-.768h1.152c.72-.048 1.104-.424 1.152-1.128v-5.856l-2.544.792v-.792l2.544-.792v-6.744h-2.568zm7.464 4.152v-.768h.456c.4-.016.656-.272.768-.768l.984-5.304c.128-.672.408-1.184.84-1.536.528-.416 1.224-.624 2.088-.624h3.72c.8 0 1.44.168 1.92.504.48.336.792.864.936 1.584l.984 5.328c.096.528.376.8.84.816h.336v.768h-1.536c-.64 0-1.192-.12-1.656-.36-.528-.32-.848-.792-.96-1.416l-.216-1.08h-5.088l-.216 1.104c-.128.624-.408 1.072-.84 1.344-.448.272-1 .408-1.656.408h-1.704zm3.936 11.136c-.96 0-1.688-.248-2.184-.744-.48-.432-.72-1.112-.72-2.04v-4.224c0-.96.312-1.68.936-2.16.56-.512 1.328-.768 2.304-.768h5.472c.96 0 1.72.224 2.28.672.576.496.864 1.232.864 2.208v4.2c0 .928-.24 1.624-.72 2.088-.512.512-1.272.768-2.28.768h-5.952zm22.45-18.216v2.16h2.687v-3.312h-1.488c-.784.016-1.184.4-1.2 1.152zm7.103-1.152h-1.512v3.312h2.712v-2.16c-.048-.72-.448-1.104-1.2-1.152zm-7.104 6.312c0 .752.384 1.128 1.152 1.128h1.536v-3.384h-2.688v2.256zm7.2 1.128c.72-.016 1.088-.392 1.104-1.128v-2.256h-2.712v3.384h1.608zm-13.056-3.864c-.768 0-1.368-.128-1.8-.384-.432-.24-.744-.656-.936-1.248l-1.056-3.312h3.096l1.104 3.48c.176.48.504.72.984.72h.744v.744h-2.136zm2.592 14.808v-.768h.48c.528 0 .832-.256.912-.768l.696-4.704h2.592l-.696 4.464c-.112.656-.384 1.112-.816 1.368-.384.272-.936.408-1.656.408h-1.512zm13.272 0c-.656 0-1.2-.128-1.632-.384-.432-.288-.712-.752-.84-1.392l-.672-4.464h2.592l.672 4.704c.08.544.384.8.912.768h.504v.768h-1.536zm-17.136.936c-.688-.224-1.04-.76-1.056-1.608V17.824c-.016-.672-.312-1.016-.888-1.032h-.84v-.768h2.064c.896 0 1.552.232 1.968.696.336.384.504.96.504 1.728v9.168c0 .192.056.32.168.384.112.048.232.016.36-.096l1.392-1.296v.936l-1.872 1.776c-.544.528-1.144.72-1.8.576zm7.608-11.112c-1.056 0-1.808-.224-2.256-.672-.448-.448-.672-1.136-.672-2.064v-3.696c0-.816.256-1.44.768-1.872.528-.448 1.248-.672 2.16-.672h7.368c.912 0 1.608.184 2.088.552.544.416.816 1.08.816 1.992v3.696c0 .976-.248 1.688-.744 2.136-.448.4-1.168.6-2.16.6h-2.256v1.776h5.784v.768h-5.784v8.592h-2.904v-8.592h-5.904v-.768h5.904v-1.776h-2.208zm18.562-6.096c-.624.016-1.096-.056-1.416-.216-.416-.176-.688-.432-.816-.768l-.816-2.016h3.168l.624 1.584c.176.448.512.664 1.008.648h.888v.768h-2.64zm8.856 0v-.768h.888c.512.016.848-.2 1.008-.648l.624-1.584h3.168l-.792 1.992a1.314 1.314 0 0 1-.72.744c-.32.192-.872.28-1.656.264h-2.52zm1.176 9.6c.656-.016.992-.368 1.008-1.056V19.36c0-.688-.336-1.032-1.008-1.032h-8.544c-.672.016-1.016.352-1.032 1.008v1.944c0 .672.344 1.008 1.032 1.008h8.544zm-14.568-5.304v-1.176c0-.624.2-1.104.6-1.44.432-.368 1.032-.552 1.8-.552h6.288V9.232h3.192v4.584h6c.96 0 1.656.184 2.088.552.4.32.6.8.6 1.44v1.176h-3.048v-1.32c.016-.752-.4-1.12-1.248-1.104h-12c-.832-.016-1.24.336-1.224 1.056v1.368h-3.048zm4.152 6.048c-.736 0-1.28-.144-1.632-.432-.368-.32-.552-.792-.552-1.416v-1.776c0-.592.184-1.048.552-1.368.352-.304.888-.456 1.608-.456h12.216c.768 0 1.328.144 1.68.432.384.304.576.768.576 1.392v1.752c0 .624-.16 1.072-.48 1.344-.368.352-.96.528-1.776.528h-4.44v2.304h7.608v.744h-7.608v3.096h9.096v.768h-21.432v-.768h9.072V26.08h-7.584v-.744h7.584v-2.304h-4.488z\" fill=\"#292525\" /></g></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/icons/svg/logo-color-reverse.svg":
/*!*******************************************************!*\
  !*** ./resources/js/icons/svg/logo-color-reverse.svg ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-baker-runtime/browser-symbol */ "./node_modules/svg-baker-runtime/browser-symbol.js");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-sprite-loader/runtime/browser-sprite.build */ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-logo-color-reverse",
  "use": "icon-logo-color-reverse-usage",
  "viewBox": "0 0 135 38",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 135 38\" id=\"icon-logo-color-reverse\"><g fill=\"none\" fill-rule=\"evenodd\"><circle fill=\"#FFF\" cx=\"19\" cy=\"19\" r=\"19\" /><g transform=\"translate(10 9)\" fill=\"#2A6EA8\"><g transform=\"translate(.203 .656)\"><path d=\"M15.95 8.442h3.19v3.54c0 1.712-.007 3.004-.258 3.877-.251.872-.561 1.598-.93 2.178a6.948 6.948 0 0 1-1.353 1.556c-1.774 1.521-4.091 2.282-6.954 2.282-2.916 0-5.255-.755-7.017-2.266a7.27 7.27 0 0 1-1.354-1.572c-.369-.58-.673-1.29-.914-2.13-.24-.84-.36-2.16-.36-3.958V1.823h3.281V11.98c0 2.096.18 3.553.66 4.373.481.819 1.213 1.476 2.195 1.97.983.495 2.142.742 3.477.742 1.901 0 3.45-.494 4.646-1.484a4.598 4.598 0 0 0 1.362-1.883c.278-.723.33-1.963.33-3.718V8.442z\" /><path d=\"M1.64 0h.046c.881 0 1.595.714 1.595 1.595v1.322a1.64 1.64 0 0 1-3.281 0V1.64C0 .735.735 0 1.64 0z\" /><rect x=\"16.406\" y=\"6.836\" width=\"2.734\" height=\"7.292\" rx=\"1.367\" /></g><rect x=\"6.219\" y=\".656\" width=\"13.125\" height=\"3.281\" rx=\"1.641\" /><rect x=\"6.219\" y=\"7.219\" width=\"13.125\" height=\"3.281\" rx=\"1.641\" /></g><path d=\"M59.824 13.792c-.848 0-1.456-.12-1.824-.36-.432-.24-.728-.672-.888-1.296l-.672-2.472h3.144l.696 2.616c.128.512.464.768 1.008.768h1.272v.744h-2.736zm-18.432 3.432v-.768h1.152c.72-.016 1.168-.376 1.344-1.08l1.368-6.144H48.4l-1.248 5.688c-.224.96-.672 1.6-1.344 1.92-.512.256-1.232.384-2.16.384h-2.256zm2.376 12.72V18.4h3v11.544h-3zm15.552 0c-1.024.016-1.744-.176-2.16-.576-.4-.368-.6-.976-.6-1.824V16.84h3.024v11.208c.016.736.352 1.112 1.008 1.128H62.8v.768h-3.48zm-10.968-14.4V14.8h3.096l.192-5.568h3.048l-.216 5.568h8.304v.744h-8.328l-.408 11.76c-.032.928-.28 1.592-.744 1.992-.48.432-1.176.648-2.088.648h-2.952v-.768h1.584c.704-.016 1.088-.424 1.152-1.224l.432-12.408h-3.072zm29.865-4.152l-.72 3.792h4.8l-.696-3.768c-.144-.528-.464-.808-.96-.84h-1.44c-.512.048-.84.32-.984.816zm3.216 17.784c.88-.032 1.336-.488 1.368-1.368v-5.616c-.064-.896-.52-1.368-1.368-1.416h-3.072c-.832.08-1.288.552-1.368 1.416v5.616c.016.896.48 1.352 1.392 1.368h3.048zm-15.96-14.52v-.792h2.568V9.232h2.952v4.632h2.136v.792h-2.136v5.808l2.136-.672v.792l-2.136.672v5.736c0 1.136-.296 1.928-.888 2.376-.544.384-1.368.576-2.472.576h-1.896v-.768h1.152c.72-.048 1.104-.424 1.152-1.128v-5.856l-2.544.792v-.792l2.544-.792v-6.744h-2.568zm7.464 4.152v-.768h.456c.4-.016.656-.272.768-.768l.984-5.304c.128-.672.408-1.184.84-1.536.528-.416 1.224-.624 2.088-.624h3.72c.8 0 1.44.168 1.92.504.48.336.792.864.936 1.584l.984 5.328c.096.528.376.8.84.816h.336v.768h-1.536c-.64 0-1.192-.12-1.656-.36-.528-.32-.848-.792-.96-1.416l-.216-1.08h-5.088l-.216 1.104c-.128.624-.408 1.072-.84 1.344-.448.272-1 .408-1.656.408h-1.704zm3.936 11.136c-.96 0-1.688-.248-2.184-.744-.48-.432-.72-1.112-.72-2.04v-4.224c0-.96.312-1.68.936-2.16.56-.512 1.328-.768 2.304-.768h5.472c.96 0 1.72.224 2.28.672.576.496.864 1.232.864 2.208v4.2c0 .928-.24 1.624-.72 2.088-.512.512-1.272.768-2.28.768h-5.952zm22.45-18.216v2.16h2.687v-3.312h-1.488c-.784.016-1.184.4-1.2 1.152zm7.103-1.152h-1.512v3.312h2.712v-2.16c-.048-.72-.448-1.104-1.2-1.152zm-7.104 6.312c0 .752.384 1.128 1.152 1.128h1.536v-3.384h-2.688v2.256zm7.2 1.128c.72-.016 1.088-.392 1.104-1.128v-2.256h-2.712v3.384h1.608zm-13.056-3.864c-.768 0-1.368-.128-1.8-.384-.432-.24-.744-.656-.936-1.248l-1.056-3.312h3.096l1.104 3.48c.176.48.504.72.984.72h.744v.744h-2.136zm2.592 14.808v-.768h.48c.528 0 .832-.256.912-.768l.696-4.704h2.592l-.696 4.464c-.112.656-.384 1.112-.816 1.368-.384.272-.936.408-1.656.408h-1.512zm13.272 0c-.656 0-1.2-.128-1.632-.384-.432-.288-.712-.752-.84-1.392l-.672-4.464h2.592l.672 4.704c.08.544.384.8.912.768h.504v.768h-1.536zm-17.136.936c-.688-.224-1.04-.76-1.056-1.608V17.824c-.016-.672-.312-1.016-.888-1.032h-.84v-.768h2.064c.896 0 1.552.232 1.968.696.336.384.504.96.504 1.728v9.168c0 .192.056.32.168.384.112.048.232.016.36-.096l1.392-1.296v.936l-1.872 1.776c-.544.528-1.144.72-1.8.576zm7.608-11.112c-1.056 0-1.808-.224-2.256-.672-.448-.448-.672-1.136-.672-2.064v-3.696c0-.816.256-1.44.768-1.872.528-.448 1.248-.672 2.16-.672h7.368c.912 0 1.608.184 2.088.552.544.416.816 1.08.816 1.992v3.696c0 .976-.248 1.688-.744 2.136-.448.4-1.168.6-2.16.6h-2.256v1.776h5.784v.768h-5.784v8.592h-2.904v-8.592h-5.904v-.768h5.904v-1.776h-2.208zm18.562-6.096c-.624.016-1.096-.056-1.416-.216-.416-.176-.688-.432-.816-.768l-.816-2.016h3.168l.624 1.584c.176.448.512.664 1.008.648h.888v.768h-2.64zm8.856 0v-.768h.888c.512.016.848-.2 1.008-.648l.624-1.584h3.168l-.792 1.992a1.314 1.314 0 0 1-.72.744c-.32.192-.872.28-1.656.264h-2.52zm1.176 9.6c.656-.016.992-.368 1.008-1.056V19.36c0-.688-.336-1.032-1.008-1.032h-8.544c-.672.016-1.016.352-1.032 1.008v1.944c0 .672.344 1.008 1.032 1.008h8.544zm-14.568-5.304v-1.176c0-.624.2-1.104.6-1.44.432-.368 1.032-.552 1.8-.552h6.288V9.232h3.192v4.584h6c.96 0 1.656.184 2.088.552.4.32.6.8.6 1.44v1.176h-3.048v-1.32c.016-.752-.4-1.12-1.248-1.104h-12c-.832-.016-1.24.336-1.224 1.056v1.368h-3.048zm4.152 6.048c-.736 0-1.28-.144-1.632-.432-.368-.32-.552-.792-.552-1.416v-1.776c0-.592.184-1.048.552-1.368.352-.304.888-.456 1.608-.456h12.216c.768 0 1.328.144 1.68.432.384.304.576.768.576 1.392v1.752c0 .624-.16 1.072-.48 1.344-.368.352-.96.528-1.776.528h-4.44v2.304h7.608v.744h-7.608v3.096h9.096v.768h-21.432v-.768h9.072V26.08h-7.584v-.744h7.584v-2.304h-4.488z\" fill=\"#FFF\" fill-rule=\"nonzero\" /></g></symbol>"
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
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 135 38\" id=\"icon-logo\"><g fill=\"none\" fill-rule=\"evenodd\"><circle fill=\"#2688B6\" cx=\"19\" cy=\"19\" r=\"19\" /><g transform=\"translate(10 9)\" fill=\"#FFF\"><g transform=\"translate(.203 .656)\"><path d=\"M15.95 8.442h3.19v3.54c0 1.712-.007 3.004-.258 3.877-.251.872-.561 1.598-.93 2.178a6.948 6.948 0 0 1-1.353 1.556c-1.774 1.521-4.091 2.282-6.954 2.282-2.916 0-5.255-.755-7.017-2.266a7.27 7.27 0 0 1-1.354-1.572c-.369-.58-.673-1.29-.914-2.13-.24-.84-.36-2.16-.36-3.958V1.823h3.281V11.98c0 2.096.18 3.553.66 4.373.481.819 1.213 1.476 2.195 1.97.983.495 2.142.742 3.477.742 1.901 0 3.45-.494 4.646-1.484a4.598 4.598 0 0 0 1.362-1.883c.278-.723.33-1.963.33-3.718V8.442z\" /><path d=\"M1.64 0h.046c.881 0 1.595.714 1.595 1.595v1.322a1.64 1.64 0 0 1-3.281 0V1.64C0 .735.735 0 1.64 0z\" /><rect x=\"16.406\" y=\"6.836\" width=\"2.734\" height=\"7.292\" rx=\"1.367\" /></g><rect x=\"6.219\" y=\".656\" width=\"13.125\" height=\"3.281\" rx=\"1.641\" /><rect x=\"6.219\" y=\"7.219\" width=\"13.125\" height=\"3.281\" rx=\"1.641\" /></g><path d=\"M59.824 13.792c-.848 0-1.456-.12-1.824-.36-.432-.24-.728-.672-.888-1.296l-.672-2.472h3.144l.696 2.616c.128.512.464.768 1.008.768h1.272v.744h-2.736zm-18.432 3.432v-.768h1.152c.72-.016 1.168-.376 1.344-1.08l1.368-6.144H48.4l-1.248 5.688c-.224.96-.672 1.6-1.344 1.92-.512.256-1.232.384-2.16.384h-2.256zm2.376 12.72V18.4h3v11.544h-3zm15.552 0c-1.024.016-1.744-.176-2.16-.576-.4-.368-.6-.976-.6-1.824V16.84h3.024v11.208c.016.736.352 1.112 1.008 1.128H62.8v.768h-3.48zm-10.968-14.4V14.8h3.096l.192-5.568h3.048l-.216 5.568h8.304v.744h-8.328l-.408 11.76c-.032.928-.28 1.592-.744 1.992-.48.432-1.176.648-2.088.648h-2.952v-.768h1.584c.704-.016 1.088-.424 1.152-1.224l.432-12.408h-3.072zm29.865-4.152l-.72 3.792h4.8l-.696-3.768c-.144-.528-.464-.808-.96-.84h-1.44c-.512.048-.84.32-.984.816zm3.216 17.784c.88-.032 1.336-.488 1.368-1.368v-5.616c-.064-.896-.52-1.368-1.368-1.416h-3.072c-.832.08-1.288.552-1.368 1.416v5.616c.016.896.48 1.352 1.392 1.368h3.048zm-15.96-14.52v-.792h2.568V9.232h2.952v4.632h2.136v.792h-2.136v5.808l2.136-.672v.792l-2.136.672v5.736c0 1.136-.296 1.928-.888 2.376-.544.384-1.368.576-2.472.576h-1.896v-.768h1.152c.72-.048 1.104-.424 1.152-1.128v-5.856l-2.544.792v-.792l2.544-.792v-6.744h-2.568zm7.464 4.152v-.768h.456c.4-.016.656-.272.768-.768l.984-5.304c.128-.672.408-1.184.84-1.536.528-.416 1.224-.624 2.088-.624h3.72c.8 0 1.44.168 1.92.504.48.336.792.864.936 1.584l.984 5.328c.096.528.376.8.84.816h.336v.768h-1.536c-.64 0-1.192-.12-1.656-.36-.528-.32-.848-.792-.96-1.416l-.216-1.08h-5.088l-.216 1.104c-.128.624-.408 1.072-.84 1.344-.448.272-1 .408-1.656.408h-1.704zm3.936 11.136c-.96 0-1.688-.248-2.184-.744-.48-.432-.72-1.112-.72-2.04v-4.224c0-.96.312-1.68.936-2.16.56-.512 1.328-.768 2.304-.768h5.472c.96 0 1.72.224 2.28.672.576.496.864 1.232.864 2.208v4.2c0 .928-.24 1.624-.72 2.088-.512.512-1.272.768-2.28.768h-5.952zm22.45-18.216v2.16h2.687v-3.312h-1.488c-.784.016-1.184.4-1.2 1.152zm7.103-1.152h-1.512v3.312h2.712v-2.16c-.048-.72-.448-1.104-1.2-1.152zm-7.104 6.312c0 .752.384 1.128 1.152 1.128h1.536v-3.384h-2.688v2.256zm7.2 1.128c.72-.016 1.088-.392 1.104-1.128v-2.256h-2.712v3.384h1.608zm-13.056-3.864c-.768 0-1.368-.128-1.8-.384-.432-.24-.744-.656-.936-1.248l-1.056-3.312h3.096l1.104 3.48c.176.48.504.72.984.72h.744v.744h-2.136zm2.592 14.808v-.768h.48c.528 0 .832-.256.912-.768l.696-4.704h2.592l-.696 4.464c-.112.656-.384 1.112-.816 1.368-.384.272-.936.408-1.656.408h-1.512zm13.272 0c-.656 0-1.2-.128-1.632-.384-.432-.288-.712-.752-.84-1.392l-.672-4.464h2.592l.672 4.704c.08.544.384.8.912.768h.504v.768h-1.536zm-17.136.936c-.688-.224-1.04-.76-1.056-1.608V17.824c-.016-.672-.312-1.016-.888-1.032h-.84v-.768h2.064c.896 0 1.552.232 1.968.696.336.384.504.96.504 1.728v9.168c0 .192.056.32.168.384.112.048.232.016.36-.096l1.392-1.296v.936l-1.872 1.776c-.544.528-1.144.72-1.8.576zm7.608-11.112c-1.056 0-1.808-.224-2.256-.672-.448-.448-.672-1.136-.672-2.064v-3.696c0-.816.256-1.44.768-1.872.528-.448 1.248-.672 2.16-.672h7.368c.912 0 1.608.184 2.088.552.544.416.816 1.08.816 1.992v3.696c0 .976-.248 1.688-.744 2.136-.448.4-1.168.6-2.16.6h-2.256v1.776h5.784v.768h-5.784v8.592h-2.904v-8.592h-5.904v-.768h5.904v-1.776h-2.208zm18.562-6.096c-.624.016-1.096-.056-1.416-.216-.416-.176-.688-.432-.816-.768l-.816-2.016h3.168l.624 1.584c.176.448.512.664 1.008.648h.888v.768h-2.64zm8.856 0v-.768h.888c.512.016.848-.2 1.008-.648l.624-1.584h3.168l-.792 1.992a1.314 1.314 0 0 1-.72.744c-.32.192-.872.28-1.656.264h-2.52zm1.176 9.6c.656-.016.992-.368 1.008-1.056V19.36c0-.688-.336-1.032-1.008-1.032h-8.544c-.672.016-1.016.352-1.032 1.008v1.944c0 .672.344 1.008 1.032 1.008h8.544zm-14.568-5.304v-1.176c0-.624.2-1.104.6-1.44.432-.368 1.032-.552 1.8-.552h6.288V9.232h3.192v4.584h6c.96 0 1.656.184 2.088.552.4.32.6.8.6 1.44v1.176h-3.048v-1.32c.016-.752-.4-1.12-1.248-1.104h-12c-.832-.016-1.24.336-1.224 1.056v1.368h-3.048zm4.152 6.048c-.736 0-1.28-.144-1.632-.432-.368-.32-.552-.792-.552-1.416v-1.776c0-.592.184-1.048.552-1.368.352-.304.888-.456 1.608-.456h12.216c.768 0 1.328.144 1.68.432.384.304.576.768.576 1.392v1.752c0 .624-.16 1.072-.48 1.344-.368.352-.96.528-1.776.528h-4.44v2.304h7.608v.744h-7.608v3.096h9.096v.768h-21.432v-.768h9.072V26.08h-7.584v-.744h7.584v-2.304h-4.488z\" fill=\"#292525\" fill-rule=\"nonzero\" /></g></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/icons/svg/logout.svg":
/*!*******************************************!*\
  !*** ./resources/js/icons/svg/logout.svg ***!
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
  "id": "icon-logout",
  "use": "icon-logout-usage",
  "viewBox": "0 0 512 512",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" id=\"icon-logout\"><g fill=\"none\" fill-rule=\"evenodd\"><path d=\"M298.668 277.336c-35.285 0-64-28.715-64-64s28.715-64 64-64h42.664V64.004c0-35.285-28.715-64-64-64H48c-7.02 0-13.59 3.453-17.578 9.234-3.969 5.782-4.863 13.145-2.348 19.692l154.668 405.336c3.137 8.277 11.07 13.738 19.926 13.738h74.664c35.285 0 64-28.715 64-64V277.336h-42.664z\" fill=\"#BC061D\" /><path d=\"M397.164 318.383C389.207 315.074 384 307.289 384 298.668v-64h-85.332c-11.777 0-21.336-9.555-21.336-21.332 0-11.777 9.559-21.332 21.336-21.332H384v-64c0-8.621 5.207-16.406 13.164-19.715a21.33 21.33 0 0 1 23.25 4.633l85.336 85.332c8.34 8.34 8.34 21.824 0 30.164l-85.336 85.336a21.335 21.335 0 0 1-23.25 4.629z\" fill=\"#BC061D\" /><path d=\"M184.45 44.844L56.257 2.114C27.328-6.782 0 14.573 0 42.667v384c0 18.242 11.605 34.52 28.887 40.492l128.168 42.73c4.715 1.45 9.047 2.114 13.613 2.114 23.531 0 42.664-19.137 42.664-42.668v-384c0-18.238-11.605-34.516-28.883-40.492z\" fill=\"#F65468\" /></g></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/icons/svg/notification.svg":
/*!*************************************************!*\
  !*** ./resources/js/icons/svg/notification.svg ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-baker-runtime/browser-symbol */ "./node_modules/svg-baker-runtime/browser-symbol.js");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-sprite-loader/runtime/browser-sprite.build */ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-notification",
  "use": "icon-notification-usage",
  "viewBox": "0 0 1024 1024",
  "content": "<symbol class=\"icon\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-notification\"><path d=\"M331.5 756.5a180.5 180.5 0 1 0 361 0 180.5 180.5 0 1 0-361 0z\" fill=\"#FFCE00\" /><path d=\"M796 656c-24.9 0-45-20.1-45-45V461c0-63.8-24.9-123.9-70-169-45.1-45.1-105.2-70-169-70s-123.9 24.9-169 70c-45.1 45.1-70 105.2-70 169v150c0 24.9-20.1 45-45 45s-45-20.1-45-45V461c0-44.4 8.7-87.5 25.9-128.1 16.6-39.2 40.3-74.4 70.5-104.6s65.4-53.9 104.6-70.5c40.5-17.1 83.6-25.8 128-25.8s87.5 8.7 128.1 25.9c39.2 16.6 74.4 40.3 104.6 70.5s53.9 65.4 70.5 104.6c17.1 40.5 25.8 83.6 25.8 128v150c0 24.9-20.1 45-45 45zm41 125H187c-24.9 0-45-20.1-45-45s20.1-45 45-45h650c24.9 0 45 20.1 45 45s-20.1 45-45 45z\" fill=\"#242F44\" /><path d=\"M512 374.9c-24.9 0-45-20.1-45-45V101.2c0-24.9 20.1-45 45-45s45 20.1 45 45v228.6c0 24.9-20.1 45.1-45 45.1z\" fill=\"#242F44\" /></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/icons/svg/profile.svg":
/*!********************************************!*\
  !*** ./resources/js/icons/svg/profile.svg ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-baker-runtime/browser-symbol */ "./node_modules/svg-baker-runtime/browser-symbol.js");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-sprite-loader/runtime/browser-sprite.build */ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-profile",
  "use": "icon-profile-usage",
  "viewBox": "0 0 1024 1024",
  "content": "<symbol class=\"icon\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-profile\"><defs><style></style></defs><path d=\"M864 0H96C43.2 0 0 43.2 0 96v832c0 52.8 43.2 96 96 96h768c52.8 0 96-43.2 96-96V96c0-52.8-43.2-96-96-96zm-32 896H128V128h704v768zM256 576h448v64H256zm0 128h448v64H256zm64-416a96 96 0 1 1 192.064.064A96 96 0 0 1 320 288zm160 96H352c-52.8 0-96 28.8-96 64v64h320v-64c0-35.2-43.2-64-96-64z\" /></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/icons/svg/publish.svg":
/*!********************************************!*\
  !*** ./resources/js/icons/svg/publish.svg ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-baker-runtime/browser-symbol */ "./node_modules/svg-baker-runtime/browser-symbol.js");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-sprite-loader/runtime/browser-sprite.build */ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-publish",
  "use": "icon-publish-usage",
  "viewBox": "0 0 1189 1024",
  "content": "<symbol class=\"icon\" viewBox=\"0 0 1189 1024\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-publish\"><path d=\"M1112.91 2.628L43.798 334.618A59.127 59.127 0 0 0 21.9 435.353l147.6 131.395 656.971-329.8-557.988 420.024 394.184 350.385a59.127 59.127 0 0 0 92.852-18.833L1182.549 84.53a59.127 59.127 0 0 0-69.639-81.902z\" fill=\"#2c2c2c\" /><path d=\"M310.967 963.559a19.271 19.271 0 0 1-29.783-15.768l-12.264-290.82 216.801 194.464zM856.253 964.435l269.359-646.899L994.655 865.89l-138.402 98.546z\" fill=\"#2c2c2c\" /></symbol>"
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

/***/ "./resources/js/icons/svg/rss.svg":
/*!****************************************!*\
  !*** ./resources/js/icons/svg/rss.svg ***!
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
  "id": "icon-rss",
  "use": "icon-rss-usage",
  "viewBox": "0 0 200 200",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" id=\"icon-rss\"><g fill=\"none\" fill-rule=\"evenodd\"><circle fill=\"#FFF\" cx=\"98.5\" cy=\"98.5\" r=\"94.5\" /><path d=\"M100 .088C44.818.088.084 44.82.084 100c0 55.18 44.734 99.912 99.916 99.912 55.182 0 99.916-44.732 99.916-99.912C199.916 44.82 155.182.088 100 .088zm-39.582 149.54c-5.65 0-10.23-4.58-10.23-10.23s4.58-10.229 10.23-10.229c5.649 0 10.23 4.58 10.23 10.23s-4.58 10.23-10.23 10.23zm40.91.203c0-28.292-23.017-51.308-51.292-51.308V76.92c40.286 0 72.91 32.658 72.91 72.911h-21.618zm39.278 0c0-49.942-40.612-90.584-90.57-90.584V37.643c61.97 0 112.191 50.25 112.191 112.188h-21.62z\" fill=\"#F78422\" fill-rule=\"nonzero\" /></g></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/icons/svg/settings.svg":
/*!*********************************************!*\
  !*** ./resources/js/icons/svg/settings.svg ***!
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
  "id": "icon-settings",
  "use": "icon-settings-usage",
  "viewBox": "0 0 1024 1024",
  "content": "<symbol class=\"icon\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-settings\"><defs><style></style></defs><path d=\"M509.043 417.431c-52.988 0-96.134 43.099-96.134 96.134 0 52.99 43.146 96.136 96.134 96.136s96.135-43.147 96.135-96.136c0-52.987-43.147-96.134-96.135-96.134zm453.161 87.915c-1.732-27.295-8.764-53.7-20.89-78.843-4.623-9.658-13.86-15.38-25.253-14.802l-60.943 3.778c-7.297-26.613-17.484-51.862-30.391-75.488l48.923-55.433a26.226 26.226 0 0 0 3.83-28.977c-12.334-25.09-28.977-46.926-49.341-64.882-20.422-18.003-44.149-31.756-70.502-40.943-9.971-3.464-21.206-.576-28.292 7.455l-40.369 45.72c-23.884-13.542-48.925-24.198-74.855-31.756l-4.619-73.964c-.683-10.602-7.664-19.79-17.743-23.202-24.783-8.413-50.127-12.389-76.032-11.191v.083h-1.525v-.083c-25.903-1.199-51.249 2.778-76.031 11.19-10.08 3.413-17.06 12.6-17.743 23.203l-4.62 73.964c-25.93 7.558-50.971 18.214-74.854 31.757l-40.369-45.721c-7.088-8.032-18.322-10.92-28.293-7.455-26.353 9.187-50.08 22.94-70.5 40.943-20.366 17.956-37.008 39.793-49.342 64.882a26.228 26.228 0 0 0 3.83 28.977l48.924 55.433c-12.909 23.626-23.095 48.875-30.392 75.488l-60.943-3.778c-11.392-.578-20.63 5.143-25.252 14.802-12.126 25.143-19.159 51.548-20.891 78.843-1.63 27.245 2.047 54.385 10.97 80.737 3.412 10.028 12.599 17.01 23.15 17.692l73.964 4.618a351.132 351.132 0 0 0 31.814 74.856l-45.829 40.419c-7.98 7.09-10.918 18.269-7.402 28.293 9.186 26.354 22.89 50.03 40.948 70.66 18.11 20.365 39.947 37.007 64.88 49.292 9.554 4.72 21.052 3.202 28.976-3.887l55.487-48.873c23.62 12.915 48.87 23.044 75.483 30.342l-3.78 60.891c-.625 10.66 5.145 20.578 14.754 25.196 24.983 12.182 51.445 19.267 78.897 20.998 1.195.093 2.382.154 3.568.212v.173h3.159v-.198c1.042-.054 2.082-.106 3.131-.187 27.453-1.73 53.914-8.815 78.898-20.998 9.61-4.618 15.38-14.537 14.753-25.196l-3.779-60.891c26.613-7.299 51.863-17.427 75.484-30.342l55.487 48.873c7.925 7.09 19.422 8.608 28.976 3.887 24.933-12.285 46.77-28.927 64.88-49.292 18.057-20.63 31.762-44.306 40.948-70.66 3.516-10.025.577-21.204-7.402-28.293l-45.829-40.419a351.258 351.258 0 0 0 31.815-74.856l73.963-4.618c10.551-.682 19.737-7.664 23.148-17.692 8.92-26.352 12.595-53.492 10.966-80.737zM511.034 705.7c-105.967 0-191.87-86.425-191.87-193.033 0-106.609 85.903-193.032 191.87-193.032s191.868 86.423 191.868 193.032C702.902 619.274 617 705.7 511.035 705.7z\" /></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/icons/svg/settings2.svg":
/*!**********************************************!*\
  !*** ./resources/js/icons/svg/settings2.svg ***!
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
  "id": "icon-settings2",
  "use": "icon-settings2-usage",
  "viewBox": "0 0 1024 1024",
  "content": "<symbol class=\"icon\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-settings2\"><defs><style></style></defs><path d=\"M320.584 507.875a190.359 190.359 0 1 0 190.359-190.359 190.359 190.359 0 0 0-190.36 190.36zm190.359-63.453a63.453 63.453 0 1 1-63.453 63.453 63.453 63.453 0 0 1 63.453-63.453z\" /><path d=\"M927.828 232.49L542.67 8.5a63.453 63.453 0 0 0-63.453 0L94.056 232.49a63.453 63.453 0 0 0-31.726 55.204v447.343a63.453 63.453 0 0 0 31.727 55.204l385.16 225.258a63.453 63.453 0 0 0 63.452 0l385.16-223.355a63.453 63.453 0 0 0 31.726-55.204V287.06a63.453 63.453 0 0 0-31.727-54.57zm-95.18 465.744L510.944 884.786 189.236 698.234V323.862L510.943 137.31l321.706 186.552z\" /></symbol>"
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

/***/ "./resources/js/icons/svg/visible.svg":
/*!********************************************!*\
  !*** ./resources/js/icons/svg/visible.svg ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-baker-runtime/browser-symbol */ "./node_modules/svg-baker-runtime/browser-symbol.js");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-sprite-loader/runtime/browser-sprite.build */ "./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-visible",
  "use": "icon-visible-usage",
  "viewBox": "0 0 512 342",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 342\" id=\"icon-visible\"><g fill=\"#2A70AA\" fill-rule=\"evenodd\"><path d=\"M256 .333C85.333.333 0 171 0 171s85.333 170.667 256 170.667S512 171 512 171 426.667.333 256 .333zM256 299c-70.693 0-128-57.307-128-128S185.307 43 256 43c70.692 0 128 57.307 128 128s-57.308 128-128 128z\" fill-rule=\"nonzero\" /><path d=\"M333.012 134.213c-5.148 5.154-12.262 8.343-20.123 8.343-15.71 0-28.444-12.735-28.444-28.444 0-7.861 3.189-14.976 8.341-20.123-11.139-5.331-23.612-8.321-36.786-8.321-47.128 0-85.333 38.205-85.333 85.333 0 8.749 1.323 17.19 3.769 25.138C181.124 181.32 196.019 171 213.333 171 236.898 171 256 190.102 256 213.667c0 17.314-10.32 32.209-25.138 38.898A85.321 85.321 0 0 0 256 256.334c47.128 0 85.333-38.205 85.333-85.333 0-13.175-2.991-25.648-8.321-36.788z\" /></g></symbol>"
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

/***/ "./resources/js/icons/svg/zhihu.svg":
/*!******************************************!*\
  !*** ./resources/js/icons/svg/zhihu.svg ***!
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
  "id": "icon-zhihu",
  "use": "icon-zhihu-usage",
  "viewBox": "0 0 200 200",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" id=\"icon-zhihu\"><g fill=\"none\" fill-rule=\"evenodd\"><circle fill=\"#FFF\" cx=\"100.5\" cy=\"104.5\" r=\"69.5\" /><path d=\"M100 200C44.773 200 0 155.227 0 100S44.773 0 100 0s100 44.773 100 100-44.773 100-100 100zM74.636 52.25s-7.072.41-9.568 4.782C62.568 61.4 54.46 83.864 54.46 83.864s2.705 1.245 7.282-2.082 6.032-9.15 6.032-9.15l8.318-.414.209 23.71s-14.355-.21-17.268 0c-2.91.204-4.573 7.9-4.573 7.9H76.3s-1.873 13.104-7.49 22.672c-5.615 9.568-16.224 17.055-16.224 17.055s7.7 3.118 15.182-1.25c7.491-4.364 13.014-23.573 13.014-23.573l17.563 21.495s1.6-10.232-.286-13.122c-1.886-2.887-12.15-14.51-12.15-14.51l-4.482 3.955 3.191-12.718h19.132s0-7.491-3.74-7.91c-3.746-.408-15.392 0-15.392 0V72.637h17.264s-.21-7.695-3.537-7.695H70.268l4.364-12.686.004-.005zm33.2 11.95v70.032h7.032l2.56 8.79 12.372-8.79h17.395V64.2h-39.359z\" fill=\"#25B8F4\" fill-rule=\"nonzero\" /><path fill=\"#25B8F4\" d=\"M116.168 72h23.027v54.273h-8.181l-10.423 7.863-2.273-7.863h-2.15z\" /></g></symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "./resources/js/index/accountModal.js":
/*!********************************************!*\
  !*** ./resources/js/index/accountModal.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _formValidation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formValidation */ "./resources/js/index/formValidation.js");
/* harmony import */ var _detectBrowsers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detectBrowsers */ "./resources/js/index/detectBrowsers.js");
/* harmony import */ var _effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./effects */ "./resources/js/index/effects.js");
/* harmony import */ var _network__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./network */ "./resources/js/index/network.js");
/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/




/*****************************************************************************************************************************

                                            Initializing Account Modal

*****************************************************************************************************************************/

/** Clone Some Html Codes for Reducing the Page Size **/

/** Cloning the benifits bar, third login and register link section into account login and account register section where necessary **/

$('#account_modal .account-register .content .benifits_bar').clone()
/** optional parameter: includeEvents **/
.prependTo('#account_modal .account-login .password-login .content, #account_modal .account-login .phone-code-login .content');
$('#account_modal .account-login .password-login .register-link').clone()
/** optional parameter: includeEvents **/
.appendTo('#account_modal .account-login .phone-code-login .content');
$('#account_modal .account-register .content .third-login').clone()
/** optional parameter: includeEvents **/
.insertBefore('#account_modal .account-login .password-login .content .register-link, #account_modal .account-login .phone-code-login .content .register-link');
/** Initializing the functionality of the account modal **/

$('#account_modal').modal({
  closable: false,
  autofocus: false,
  transition: 'fade',
  duration: 100,
  context: 'body',

  /** BLurring with true will make elements with fixed position disappear **/
  blurring: false
  /** this option will make the page stop to scroll when open it and the scrollbar is at the top in iOS Browsers  **/
  //observeChanges: true

}).modal('attach events', '#account_modal .close_button', 'hide');
/** Switching between the password login and phone code login tabs  **/

$('#account_modal .tabs-control .password-login-title').on('click', function () {
  $.tab('change tab', 'password-login-tab');
  /** When switching the tab, changing the style of two tab titles by adding and removing CSS class   **/

  $('#account_modal .account-login .password-login-title').removeClass('not-active-tab-title');
  $('#account_modal .account-login .phone-code-login-title').addClass('not-active-tab-title');
});
/** Switching between the password login and phone code login tabs  **/

$('#account_modal .tabs-control .phone-code-login-title').on('click', function () {
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
/** Swiching to account login from  account register modal **/


$('#main_sidebar .register.button, #header .register.button, #account_modal .account-login .switch-register').click(function (event) {
  moveAccountModal('-100%');
});
/** Swiching to account register from  account login modal **/

$('#main_sidebar .login.button, #header .login.button, #account_modal .account-register .switch-login').click(function (event) {
  moveAccountModal('0');
});
/*****************************************************************************************************************************

                                  AJAX Login and Register

******************************************************************************************************************************/

var maintainingFlags = {
  remoteProcessingFlag: false,
  resendPhoneCodeCountingDownFlag: false
};
var YpCaptchaMaintainingFlags = {
  YpCaptchaProcessingFlag: false,
  YpCaptchaButtonShowingFlag: false,
  YpCaptchaButtonShownFlag: false,
  YpCaptchaButtonTextFlashingFlag: false,
  YpCaptchaSuccessButtonShownFlag: false,
  YpCaptchaRefreshButtonInitializedFlag: false,
  YpCaptchaRefreshButtonRefreshTimes: 0
};
var errorBoxMaintainingFlags = {
  registerAccountTabErrorBoxShowingFlag: false,
  passwordLoginTabErrorBoxShowingFlag: false,
  phoneCodeLoginTabErrorBoxShowingFlag: false
};
var maintainingObjects = {
  YpCaptchaInstance: undefined,
  YpCaptchaPuzzleDialogShowUpWatcher: undefined,
  resendPhoneCodeCounter: undefined
};
var YpCaptchaInitializingOptions = {
  //过期时间不宜设置过短，不然容易引发异常，单位：秒
  expired: 5,
  mode: 'dialog',
  winWidth: 334,
  noButton: false,
  lang: 'zh-cn',
  // 界面语言, 目前支持: 中文简体 zh-cn, 英语 en
  // langPack: LANG_OTHER, // 你可以通过该参数自定义语言包, 其优先级高于lang
  langPack: {
    'YPcaptcha_01': '请点击按钮开始验证',
    'YPcaptcha_02': '请按顺序点击:',
    'YPcaptcha_03': '向右拖动滑块填充拼图',
    'YPcaptcha_04': '验证失败，请重试',
    'YPcaptcha_05': '验证成功'
  },
  container: document.getElementById('register-yunpian-captcha'),
  appId: '2d797943d96348c8922e375c7c4fbdaa',
  version: 'v1',
  //when the user clicks on the YpCaptcha button
  beforeStart: function beforeStart(next) {
    //Prevent multiple requests before get the result
    if (Object(_network__WEBPACK_IMPORTED_MODULE_3__["startProcessingLock"])({
      maintainingFlagsInfo: {
        flagsContainer: YpCaptchaMaintainingFlags,
        flagName: 'YpCaptchaProcessingFlag'
      }
    })) {
      Object(_formValidation__WEBPACK_IMPORTED_MODULE_0__["validateForm"])({
        targetForm: $('#account_modal .account-register'),
        fields: {
          phoneField: {
            element: 'input[name=phone]',
            rules: ['required', //javascript中'\'字符需要被转义，regexp类会自动在正则表达式的开头和末尾加上'/'
            'regex:' + /^1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4[579]\d{2})\d{6}$/.toString()],
            errorMessages: {
              required: '请输入手机号码',
              regex: '请输入正确的手机号码'
            }
          }
        },
        callbacks: {
          failed: function failed(errorsBag) {
            showErrorBox({
              tabName: '.account-register',
              errorsBag: errorsBag,
              formBox: {
                marginTopDistance: '0'
              }
            });
            Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
              maintainingFlagsInfo: {
                flagsContainer: YpCaptchaMaintainingFlags,
                flagName: 'YpCaptchaProcessingFlag'
              }
            });
          },
          succeeded: function succeeded() {
            closeErrorBox({
              tabName: '.account-register',
              formBox: {
                marginTopDistance: '1.5rem'
              }
            });
            changeYpCaptchaButtonText('.account-register', '正在获取拼图...'); //watch the YpCaptcha puzzle shows up

            Object(_network__WEBPACK_IMPORTED_MODULE_3__["startRepeater"])({
              maintainingObjectsInfo: {
                objectsContainer: maintainingObjects,
                objectName: 'YpCaptchaPuzzleDialogShowUpWatcher'
              },
              intervalCallback: function intervalCallback() {
                //observe the puzzle shows up
                //only when the puzzle dialog shows up can error box be closed, YpCaptcha button text be changed
                //and YpCaptcha refresh button operations be done
                if (isYpCaptchaPuzzleDialogShown()) {
                  closeErrorBox({
                    tabName: '.account-register',
                    formBox: {
                      marginTopDistance: '1.5rem'
                    }
                  });
                  changeYpCaptchaButtonText('.account-register', '请完成拼图');
                  initializeYpCaptchaRefreshButton();
                }
              },
              frequency: 100
            }); //prevent frequent requests in a very short period by the users
            //makes the puzzle show up

            Object(_network__WEBPACK_IMPORTED_MODULE_3__["suspendCurrentProcess"])({
              suspendingTime: 1000,
              callbacks: {
                resumed: function resumed() {
                  next();
                }
              }
            });
          }
        }
      });
    }
  },
  //when the user clicks on the other areas on the register tab, which makes the puzzle disappear, it's only in effect when the mode is set to 'dialog'
  onExit: function onExit() {
    changeYpCaptchaButtonText('.account-register', '请点击按钮开始验证');
    Object(_network__WEBPACK_IMPORTED_MODULE_3__["clearRepeater"])({
      maintainingObjectsInfo: {
        objectsContainer: maintainingObjects,
        objectName: 'YpCaptchaPuzzleDialogShowUpWatcher'
      }
    });
    Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
      maintainingFlagsInfo: {
        flagsContainer: YpCaptchaMaintainingFlags,
        flagName: 'YpCaptchaRefreshButtonInitializedFlag'
      }
    });
    Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
      maintainingFlagsInfo: {
        flagsContainer: YpCaptchaMaintainingFlags,
        flagName: 'YpCaptchaProcessingFlag'
      }
    });
  },
  //when the user successfully finishes the puzzle
  onSuccess: function onSuccess(validInfo, close, useDefaultSuccess) {
    changeGetPhoneCodeLinkText('.account-register', '发送中...');
    getVerificationCode(validInfo.token, validInfo.authenticate);
    useDefaultSuccess(true);
    close(); //flagName: 'YpCaptchaSuccessButtonShownFlag'
    //hide YpCaptcha button

    if (Object(_network__WEBPACK_IMPORTED_MODULE_3__["startProcessingLock"])({
      maintainingFlagsInfo: {
        flagsContainer: YpCaptchaMaintainingFlags,
        flagName: 'YpCaptchaSuccessButtonShownFlag'
      }
    })) {
      hideYpCaptchaButton({
        YpCaptchaButtonID: '#register-yunpian-captcha',
        hidingTime: 600,
        hiddenCallback: function hiddenCallback() {
          Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
            maintainingFlagsInfo: {
              flagsContainer: YpCaptchaMaintainingFlags,
              flagName: 'YpCaptchaSuccessButtonShownFlag'
            }
          });
          Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
            maintainingFlagsInfo: {
              flagsContainer: YpCaptchaMaintainingFlags,
              flagName: 'YpCaptchaButtonShownFlag'
            }
          });
        }
      });
    }

    releaseYpCaptcha();
    Object(_network__WEBPACK_IMPORTED_MODULE_3__["clearRepeater"])({
      maintainingObjectsInfo: {
        objectsContainer: maintainingObjects,
        objectName: 'YpCaptchaPuzzleDialogShowUpWatcher'
      }
    });
    Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
      maintainingFlagsInfo: {
        flagsContainer: YpCaptchaMaintainingFlags,
        flagName: 'YpCaptchaRefreshButtonRefreshTimes'
      },
      setZero: true
    });
    Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
      maintainingFlagsInfo: {
        flagsContainer: YpCaptchaMaintainingFlags,
        flagName: 'YpCaptchaRefreshButtonInitializedFlag'
      }
    });
    Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
      maintainingFlagsInfo: {
        flagsContainer: YpCaptchaMaintainingFlags,
        flagName: 'YpCaptchaProcessingFlag'
      }
    });
  },
  onFail: function onFail(code, message, retry) {
    retry();
    Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
      maintainingFlagsInfo: {
        flagsContainer: YpCaptchaMaintainingFlags,
        flagName: 'YpCaptchaProcessingFlag'
      }
    });
  },
  onError: function onError(param) {
    changeYpCaptchaButtonText('.account-register', '请点击按钮开始验证');

    if (param.code == 429) {
      showErrorBox({
        tabName: '.account-register',
        errorsBag: [['请求过于频繁，请稍后再试']],
        formBox: {
          marginTopDistance: '0'
        }
      });
      Object(_network__WEBPACK_IMPORTED_MODULE_3__["clearRepeater"])({
        maintainingObjectsInfo: {
          objectsContainer: maintainingObjects,
          objectName: 'YpCaptchaPuzzleDialogShowUpWatcher'
        }
      });
      Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
        maintainingFlagsInfo: {
          flagsContainer: YpCaptchaMaintainingFlags,
          flagName: 'YpCaptchaProcessingFlag'
        }
      });
      return;
    }

    showErrorBox({
      tabName: '.account-register',
      errorsBag: [['验证服务异常，请稍后再试']],
      formBox: {
        marginTopDistance: '0'
      }
    });
    Object(_network__WEBPACK_IMPORTED_MODULE_3__["clearRepeater"])({
      maintainingObjectsInfo: {
        objectsContainer: maintainingObjects,
        objectName: 'YpCaptchaPuzzleDialogShowUpWatcher'
      }
    });
    Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
      maintainingFlagsInfo: {
        flagsContainer: YpCaptchaMaintainingFlags,
        flagName: 'YpCaptchaProcessingFlag'
      }
    });
  }
};

function createErrorItems(errors, itemElement, container) {
  $(container).empty();
  $.each(errors, function (index, el) {
    var item = document.createElement(itemElement);
    item.innerHTML = el[0];
    $(container)[0].appendChild(item);
  });
}

function adjustFormBoxTopMargin(formName, marginDistance) {
  $("#account_modal .login-register-box ".concat(formName, " .form-box")).css('margin-top', marginDistance);
}

function getErrorBoxFlagName(tabName) {
  var flagName;

  switch (tabName) {
    case '.password-login':
      flagName = 'passwordLoginTabErrorBoxShowingFlag';
      break;

    case '.phone-code-login':
      flagName = 'phoneCodeLoginTabErrorBoxShowingFlag';
      break;

    case '.account-register':
      flagName = 'registerAccountTabErrorBoxShowingFlag';
      break;
  }

  return flagName;
}
/*************************************************************

              showErrorBox OPTIONS EXAMPLE

**************************************************************

{

  tabName: '.password-login',

  errorsBag[optional]: errorsBag,

  formBox: {

    marginTopDistance: '1.5rem'

  }

}

//errorsBag structure: [['First Field First Error'], ['Second Field First Error', 'Second Field Second Error(Not Show)']]

**************************************************************/


function showErrorBox(options) {
  var flagName = getErrorBoxFlagName(options.tabName);

  if (Object(_network__WEBPACK_IMPORTED_MODULE_3__["startProcessingLock"])({
    maintainingFlagsInfo: {
      flagsContainer: errorBoxMaintainingFlags,
      flagName: flagName
    }
  })) {
    if ($("#account_modal .login-register-box ".concat(options.tabName, " .error-box")).css('display') == 'block') {
      Object(_effects__WEBPACK_IMPORTED_MODULE_2__["fadeOut"])({
        targetElement: $("#account_modal .login-register-box ".concat(options.tabName, " .error-box")),
        effectDuration: 250,
        targetOriginalDisplayType: 'none',
        callbacks: {
          disappeared: function disappeared() {
            adjustFormBoxTopMargin(options.tabName, options.formBox.marginTopDistance);
            createErrorItems(options.errorsBag, 'li', "#account_modal .login-register-box ".concat(options.tabName, " .error-box .list")); //there's no enough room for the 3rd message in the error box, so when there are 3 messages needed to show, we have to make the 3rd one disappear,
            // the error box can show two messages to the maximum

            if ($('#account_modal .account-register .content .error-box .error.message .list').children('li').length == 3) {
              //兼容IE11，IE11不兼容js的remove方法，但是可以使用JQuery的remove方法
              $('#account_modal .account-register .content .error-box .error.message .list').children('li:nth-child(3)').remove(); //$('#account_modal .account-register .content .error-box .error.message .list').children()[2].remove()
            }

            Object(_effects__WEBPACK_IMPORTED_MODULE_2__["fadeIn"])({
              targetElement: $("#account_modal .login-register-box ".concat(options.tabName, " .error-box")),
              effectDuration: 250,
              callbacks: {
                shown: function shown() {
                  Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
                    maintainingFlagsInfo: {
                      flagsContainer: errorBoxMaintainingFlags,
                      flagName: flagName
                    }
                  });
                }
              }
            });
          }
        }
      });
    } else {
      Object(_effects__WEBPACK_IMPORTED_MODULE_2__["fadeOut"])({
        targetElement: $("#account_modal .login-register-box ".concat(options.tabName, " .benifits_bar")),
        effectDuration: 250,
        targetOriginalDisplayType: 'none',
        callbacks: {
          disappeared: function disappeared() {
            adjustFormBoxTopMargin(options.tabName, options.formBox.marginTopDistance);
            createErrorItems(options.errorsBag, 'li', "#account_modal .login-register-box ".concat(options.tabName, " .error-box .list")); //there's no enough room for the 3rd message in the error box, so when there are 3 messages needed to show, we have to make the 3rd one disappear,
            // the error box can show two messages to the maximum

            if ($('#account_modal .account-register .content .error-box .error.message .list').children('li').length == 3) {
              //兼容IE11，IE11不兼容js的remove方法，但是可以使用JQuery的remove方法
              $('#account_modal .account-register .content .error-box .error.message .list').children('li:nth-child(3)').remove(); //$('#account_modal .account-register .content .error-box .error.message .list').children()[2].remove()
            }

            Object(_effects__WEBPACK_IMPORTED_MODULE_2__["fadeIn"])({
              targetElement: $("#account_modal .login-register-box ".concat(options.tabName, " .error-box")),
              effectDuration: 250,
              callbacks: {
                shown: function shown() {
                  Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
                    maintainingFlagsInfo: {
                      flagsContainer: errorBoxMaintainingFlags,
                      flagName: flagName
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
  }
}
/*************************************************************

              closeErrorBox OPTIONS EXAMPLE

**************************************************************

{

  tabName: '.password-login',

  formBox: {

    marginTopDistance: '1.5rem'

  },


  resolve[optional]: resolve

}

resolve is used with promise functionality

**************************************************************/


function closeErrorBox(options) {
  var flagName = getErrorBoxFlagName(options.tabName);

  if (Object(_network__WEBPACK_IMPORTED_MODULE_3__["startProcessingLock"])({
    maintainingFlagsInfo: {
      flagsContainer: errorBoxMaintainingFlags,
      flagName: flagName
    }
  })) {
    if ($("#account_modal .login-register-box ".concat(options.tabName, " .error-box")).css('display') != 'none') {
      Object(_effects__WEBPACK_IMPORTED_MODULE_2__["fadeOut"])({
        targetElement: $("#account_modal .login-register-box ".concat(options.tabName, " .error-box")),
        effectDuration: 250,
        targetOriginalDisplayType: 'none',
        callbacks: {
          disappeared: function disappeared() {
            adjustFormBoxTopMargin(options.tabName, options.formBox.marginTopDistance);
            Object(_effects__WEBPACK_IMPORTED_MODULE_2__["fadeIn"])({
              targetElement: $("#account_modal .login-register-box ".concat(options.tabName, " .benifits_bar")),
              effectDuration: 250,
              callbacks: {
                shown: function shown() {
                  Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
                    maintainingFlagsInfo: {
                      flagsContainer: errorBoxMaintainingFlags,
                      flagName: flagName
                    }
                  });

                  if (options.resolve) {
                    options.resolve();
                  }
                }
              }
            });
          }
        }
      });
    } else {
      Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
        maintainingFlagsInfo: {
          flagsContainer: errorBoxMaintainingFlags,
          flagName: flagName
        }
      });

      if (options.resolve) {
        options.resolve();
      }
    }
  }
}

function changeSubmitButtonText(tabName, text) {
  $("#account_modal .login-register-box ".concat(tabName, " .form-box .button")).text(text);
}

function changeGetPhoneCodeLinkText(tabName, text) {
  $("#account_modal .login-register-box ".concat(tabName, " .form-box .get-phone-code .link")).text(text);
}

function passwordInputStyleAttrChanger(tabName, invisibleIconDisplayStyle, visibleIconDisplayStyle, passwordInputType) {
  //toggle icon display
  $("#account_modal ".concat(tabName, " .password-switch .icon-invisible")).css('display', invisibleIconDisplayStyle);
  $("#account_modal ".concat(tabName, " .password-switch .icon-visible")).css('display', visibleIconDisplayStyle); //toggle password visibility

  $("#account_modal ".concat(tabName, " input[name=password]")).attr('type', passwordInputType);
}

function togglePasswordInputVisibility(tabName) {
  if ($("#account_modal ".concat(tabName, " input[name=password]")).attr('type') == 'password') {
    passwordInputStyleAttrChanger(tabName, 'block', 'none', 'text');
  } else if ($("#account_modal ".concat(tabName, " input[name=password]")).attr('type') == 'text') {
    passwordInputStyleAttrChanger(tabName, 'none', 'block', 'password');
  }
}

function disableAllActionsOnPage() {
  $('body').css('pointer-events', 'none');
}

function getPostUrl(formName) {
  return $("#account_modal .login-register-box ".concat(formName, " .form-box .ui.form")).attr("action");
}

function getVerificationCode(captcha_token, captcha_authenticate) {
  if (Object(_network__WEBPACK_IMPORTED_MODULE_3__["startProcessingLock"])({
    maintainingFlagsInfo: {
      flagsContainer: maintainingFlags,
      flagName: 'remoteProcessingFlag'
    }
  })) {
    Object(_network__WEBPACK_IMPORTED_MODULE_3__["sendPostRequest"])({
      postUrl: getPostUrl('.account-register'),
      targetForm: $('#account_modal .account-register'),
      postFields: {
        phone: {
          type: 'element',
          literalValue: 'input[name=phone]'
        },
        captcha_token: {
          type: 'parameter',
          literalValue: captcha_token
        },
        captcha_authenticate: {
          type: 'parameter',
          literalValue: captcha_authenticate
        }
      },
      postTimeout: 8000,
      callbacks: {
        failed: function failed(error) {
          var errorsBag = Object(_network__WEBPACK_IMPORTED_MODULE_3__["getNetworkRelatedErrorsBag"])(error);
          changeGetPhoneCodeLinkText('.account-register', '获取短信验证码');
          showErrorBox({
            tabName: '.account-register',
            errorsBag: errorsBag,
            formBox: {
              marginTopDistance: '0'
            }
          });
          Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
            maintainingFlagsInfo: {
              flagsContainer: maintainingFlags,
              flagName: 'resendPhoneCodeCountingDownFlag'
            }
          });
          Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
            maintainingFlagsInfo: {
              flagsContainer: maintainingFlags,
              flagName: 'remoteProcessingFlag'
            }
          });
        },
        succeeded: function succeeded(response) {
          if (response.data.success) {
            console.log(response.data); //window.location.href = location.href

            var counter = 60;
            Object(_network__WEBPACK_IMPORTED_MODULE_3__["startRepeater"])({
              maintainingObjectsInfo: {
                objectsContainer: maintainingObjects,
                objectName: 'resendPhoneCodeCounter'
              },
              intervalCallback: function intervalCallback() {
                counter -= 1;

                if (counter == 0) {
                  changeGetPhoneCodeLinkText('.account-register', '重新获取验证码');
                  Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
                    maintainingFlagsInfo: {
                      flagsContainer: maintainingFlags,
                      flagName: 'resendPhoneCodeCountingDownFlag'
                    }
                  });
                  Object(_network__WEBPACK_IMPORTED_MODULE_3__["clearRepeater"])({
                    maintainingObjectsInfo: {
                      objectsContainer: maintainingObjects,
                      objectName: 'resendPhoneCodeCounter'
                    }
                  });
                } else {
                  changeGetPhoneCodeLinkText('.account-register', "".concat(counter, "s\u540E\u91CD\u65B0\u83B7\u53D6"));
                }
              },
              frequency: 1000
            });
            Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
              maintainingFlagsInfo: {
                flagsContainer: maintainingFlags,
                flagName: 'remoteProcessingFlag'
              }
            });
          } else {
            changeGetPhoneCodeLinkText('.account-register', '获取短信验证码');
            showErrorBox({
              tabName: '.account-register',
              errorsBag: response.data.errors,
              formBox: {
                marginTopDistance: '0'
              }
            });
            Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
              maintainingFlagsInfo: {
                flagsContainer: maintainingFlags,
                flagName: 'resendPhoneCodeCountingDownFlag'
              }
            });
            Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
              maintainingFlagsInfo: {
                flagsContainer: maintainingFlags,
                flagName: 'remoteProcessingFlag'
              }
            });
          }
        }
      }
    });
  }
}

function refreshPageUsingCurrentUrl() {
  location.reload();
  Object(_network__WEBPACK_IMPORTED_MODULE_3__["suspendCurrentProcess"])({
    suspendingTime: 4000,
    callbacks: {
      resumed: function resumed() {
        alert('reload');
        location.reload();
      }
    }
  });
}
/*****************************************************************************************************************************

                                YpCaptcha Related - AJAX Login and Register

******************************************************************************************************************************/


function initializingYpCaptcha() {
  if (YpRiddler != undefined) {
    // 初始化云片图片验证码
    var YpCaptcha = new YpRiddler(YpCaptchaInitializingOptions);
    return YpCaptcha;
  } else {
    return undefined;
  }
}

function instantiateYpCaptcha() {
  Object(_network__WEBPACK_IMPORTED_MODULE_3__["assignValueToMaintainingObjectsOnce"])({
    maintainingObjectsInfo: {
      objectsContainer: maintainingObjects,
      objectName: 'YpCaptchaInstance'
    },
    assginValueFunc: function assginValueFunc() {
      return initializingYpCaptcha();
    }
  });
}

function releaseYpCaptcha() {
  Object(_network__WEBPACK_IMPORTED_MODULE_3__["unsetMaintainingObjects"])({
    maintainingObjectsInfo: {
      objectsContainer: maintainingObjects,
      objectName: 'YpCaptchaInstance'
    }
  });
}
/*************************************************************

             showYpCaptchaButton OPTIONS EXAMPLE

**************************************************************

{

  YpCaptchaButtonID: '#register-yunpian-captcha',

  showingTime: 1000,

  shownCallback: () => {

    stopProcessingLock({

      maintainingFlagsInfo: {

        flagsContainer:YpCaptchaMaintainingFlags,

        flagName: 'YpCaptchaButtonShowingFlag'

      }

    })

  }

}

**************************************************************/


function showYpCaptchaButton(show_button_options) {
  //changing the position of YpCaptchaButton
  $(show_button_options.YpCaptchaButtonID).css('order', '0'); //showing the YpCaptchaButton

  Object(_effects__WEBPACK_IMPORTED_MODULE_2__["fadeIn"])({
    targetElement: $(show_button_options.YpCaptchaButtonID),
    effectDuration: show_button_options.showingTime,
    callbacks: {
      shown: show_button_options.shownCallback
    }
  });
}
/*************************************************************

             hideYpCaptchaButton OPTIONS EXAMPLE

**************************************************************

{

  YpCaptchaButtonID: '#register-yunpian-captcha',

  hidingTime: 1000,

  hiddenCallback: () => {

    stopProcessingLock({

      maintainingFlagsInfo: {

        flagsContainer:YpCaptchaMaintainingFlags,

        flagName: 'YpCaptchaButtonShowingFlag'

      }

    })

  }

}

**************************************************************/


function hideYpCaptchaButton(hide_button_options) {
  //hiding the YpCaptchaButton
  Object(_effects__WEBPACK_IMPORTED_MODULE_2__["fadeOut"])({
    targetElement: $(hide_button_options.YpCaptchaButtonID),
    effectDuration: hide_button_options.hidingTime,
    targetOriginalDisplayType: 'block',
    callbacks: {
      disappeared: function disappeared() {
        //changing the position of YpCaptchaButton
        $(hide_button_options.YpCaptchaButtonID).css('order', '1');
        hide_button_options.hiddenCallback();
      }
    }
  });
}

function changeYpCaptchaButtonText(tabName, text) {
  $("#account_modal .login-register-box ".concat(tabName, " .form-box .yunpian-captcha .yp-riddler-button .yp-riddler-button_text")).text(text);
}
/*************************************************************

       makeYpCaptchaButtonTextFlash OPTIONS EXAMPLE

**************************************************************

{

  YpCaptchaButtonID: '#register-yunpian-captcha',

  effectDuration: 800,

  callbacks : {

    beforeEffect: () => {

    },

    afterEffect: () => {

    }

  }

}

**************************************************************/


function makeYpCaptchaButtonTextFlash(flash_effect_options) {
  //prevent multiple request before get the result
  if (Object(_network__WEBPACK_IMPORTED_MODULE_3__["startProcessingLock"])({
    maintainingFlagsInfo: {
      flagsContainer: YpCaptchaMaintainingFlags,
      flagName: 'YpCaptchaButtonTextFlashingFlag'
    }
  })) {
    //except for 'glow' option, other options in transition in Semantic UI will cause svg icons move while animation effects are on progress in Safari on Mac computer or in the browsers on iOS devices
    //so we do not use transition in SUI and we realize the same function by ourselves
    Object(_effects__WEBPACK_IMPORTED_MODULE_2__["enableFlashEffect"])({
      targetElement: $("".concat(flash_effect_options.YpCaptchaButtonID, " .yp-riddler-button .yp-riddler-button_text")),
      effectDuration: flash_effect_options.effectDuration,
      targetOriginalDisplayType: 'inline-block',
      flashTimes: 2,
      callbacks: {
        beforeEffect: function beforeEffect() {
          flash_effect_options.callbacks.beforeEffect();
        },
        afterEffect: function afterEffect() {
          flash_effect_options.callbacks.afterEffect();
          Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
            maintainingFlagsInfo: {
              flagsContainer: YpCaptchaMaintainingFlags,
              flagName: 'YpCaptchaButtonTextFlashingFlag'
            }
          });
        }
      }
    });
  }
}

function isYpCaptchaButtonShown() {
  if (YpCaptchaMaintainingFlags.YpCaptchaButtonShowingFlag == false && YpCaptchaMaintainingFlags.YpCaptchaButtonShownFlag == true && YpCaptchaMaintainingFlags.YpCaptchaSuccessButtonShownFlag == false) {
    return true;
  }

  return false;
}

function isYpCaptchaPuzzleDialogShown() {
  if ($('#register-yunpian-captcha .yp-riddler-win-masker').css('display') == 'block' && $('#register-yunpian-captcha .yp-riddler-win-masker').children().length > 0) {
    return true;
  }

  return false;
}

function initializeYpCaptchaRefreshButton() {
  //only if YpCaptcha refresh button is initialized in the DOM when opening the YpCaptcha puzzle dialog
  //can its trasnform rotate degrees be synced with YpCaptcha
  //and then can it be shown after 1.5s
  //and then can click event be arranged
  if (Object(_network__WEBPACK_IMPORTED_MODULE_3__["startProcessingLock"])({
    maintainingFlagsInfo: {
      flagsContainer: YpCaptchaMaintainingFlags,
      flagName: 'YpCaptchaRefreshButtonInitializedFlag'
    }
  })) {
    //resume the transform rotate degrees counted by YpCaptcha
    $('#register-yunpian-captcha .yp-riddler-refresh').css('transform', 'rotate(' + YpCaptchaMaintainingFlags.YpCaptchaRefreshButtonRefreshTimes * 90 + 'deg)'); //make the YpCaptcha refresh button visible after 1.5s

    Object(_network__WEBPACK_IMPORTED_MODULE_3__["suspendCurrentProcess"])({
      suspendingTime: 1500,
      callbacks: {
        resumed: function resumed() {
          $('#register-yunpian-captcha .yp-riddler-refresh').css('visibility', 'visible');
        }
      }
    }); //when clicking on the YpCaptcha refresh button...

    $('#register-yunpian-captcha .yp-riddler-refresh').click(function (event) {
      //correct the animation effect by YpCaptcha's default behaviours
      $('#register-yunpian-captcha .yp-riddler-refresh').css('transition-property', 'transform'); //freeze all actions, mainly aims for preventing clicking events from being activated

      $('body,#register-yunpian-captcha .yp-riddler-refresh').css('pointer-events', 'none'); //count how many times the YpCaptcha refresh button rotates when clicking on it

      YpCaptchaMaintainingFlags.YpCaptchaRefreshButtonRefreshTimes += 1; //fade out and fade in the YpCaptcha refresh button
      //leave 0.25s for YpCaptcha refresh button rotate when clicking on it before it starts fade out

      Object(_network__WEBPACK_IMPORTED_MODULE_3__["suspendCurrentProcess"])({
        suspendingTime: 250,
        callbacks: {
          resumed: function resumed() {
            //fade out and fade in the YpCaptcha refresh button
            // make it possible that after fade out have finished the fade in then starts
            Object(_network__WEBPACK_IMPORTED_MODULE_3__["wait"])({
              worthWaitingHandler: function worthWaitingHandler(resolve) {
                Object(_effects__WEBPACK_IMPORTED_MODULE_2__["fadeOut"])({
                  targetElement: $('#register-yunpian-captcha .yp-riddler-refresh'),
                  effectDuration: 250,
                  targetOriginalDisplayType: 'none',
                  callbacks: {
                    disappeared: function disappeared() {
                      Object(_network__WEBPACK_IMPORTED_MODULE_3__["suspendCurrentProcess"])({
                        suspendingTime: 200,
                        callbacks: {
                          resumed: function resumed() {
                            resolve();
                          }
                        }
                      });
                    }
                  }
                });
              },
              suspendedHandler: function suspendedHandler() {
                Object(_effects__WEBPACK_IMPORTED_MODULE_2__["fadeIn"])({
                  targetElement: $('#register-yunpian-captcha .yp-riddler-refresh'),
                  effectDuration: 250,
                  callbacks: {
                    shown: function shown() {
                      //resume all actions, mainly aims for making the click evnets being activated
                      $('body,#register-yunpian-captcha .yp-riddler-refresh').css('pointer-events', 'all');
                    }
                  }
                });
              }
            });
          }
        }
      });
    });
  }
} //submit event for the form on PasswordLoginTab


$('#account_modal .account-login .password.login.form').submit(function (event) {
  //stop the form from submitting
  event.preventDefault();
  Object(_formValidation__WEBPACK_IMPORTED_MODULE_0__["validateForm"])({
    targetForm: $('#account_modal .account-login .password-login'),
    fields: {
      emailField: {
        element: 'input[name=email_name]',
        rules: ['required', //javascript中'\'字符需要被转义，regexp类会自动在正则表达式的开头和末尾加上'/'
        'regex:' + /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.toString()],
        errorMessages: {
          required: '请输入电子邮箱',
          regex: '请输入正确的电子邮箱'
        }
      },
      passwordField: {
        element: 'input[name=password]',
        rules: ['required', 'between:6,16'],
        errorMessages: {
          required: '请输入密码',
          between: '请确保密码的长度在8-16位之间'
        }
      }
    },
    callbacks: {
      failed: function failed(errorsBag) {
        showErrorBox({
          tabName: '.password-login',
          errorsBag: errorsBag,
          formBox: {
            marginTopDistance: '1rem'
          }
        });
      },
      succeeded: function succeeded() {
        //start the remote processing lock, preventing over-executing the codes before the remote returns the result
        //Only when remote processing flag is true, the codes inside will be executed
        if (Object(_network__WEBPACK_IMPORTED_MODULE_3__["startProcessingLock"])({
          maintainingFlagsInfo: {
            flagsContainer: maintainingFlags,
            flagName: 'remoteProcessingFlag'
          }
        })) {
          changeSubmitButtonText('.password-login', '登录中...');
          Object(_network__WEBPACK_IMPORTED_MODULE_3__["sendPostRequest"])({
            postUrl: getPostUrl('.password-login'),
            targetForm: $('#account_modal .account-login .password-login'),
            postFields: {
              email: {
                type: 'element',
                literalValue: 'input[name=email_name]'
              },
              password: {
                type: 'element',
                literalValue: 'input[name=password]'
              },
              _token: {
                type: 'element',
                literalValue: 'input[name=_token]'
              }
            },
            postTimeout: 8000,
            callbacks: {
              failed: function failed(error) {
                var errorsBag = Object(_network__WEBPACK_IMPORTED_MODULE_3__["getNetworkRelatedErrorsBag"])(error);
                showErrorBox({
                  tabName: '.password-login',
                  errorsBag: errorsBag,
                  formBox: {
                    marginTopDistance: '1rem'
                  }
                });
                changeSubmitButtonText('.password-login', '登录');
                Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
                  maintainingFlagsInfo: {
                    flagsContainer: maintainingFlags,
                    flagName: 'remoteProcessingFlag'
                  }
                });
              },
              succeeded: function succeeded(response) {
                if (response.data.success) {
                  Object(_network__WEBPACK_IMPORTED_MODULE_3__["wait"])({
                    worthWaitingHandler: function worthWaitingHandler(resolve) {
                      closeErrorBox({
                        tabName: '.password-login',
                        formBox: {
                          marginTopDistance: '2.5rem'
                        },
                        resolve: resolve
                      });
                    },
                    suspendedHandler: function suspendedHandler() {
                      disableAllActionsOnPage();
                      refreshPageUsingCurrentUrl();
                      Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
                        maintainingFlagsInfo: {
                          flagsContainer: maintainingFlags,
                          flagName: 'remoteProcessingFlag'
                        }
                      });
                    }
                  });
                } else {
                  showErrorBox({
                    tabName: '.password-login',
                    errorsBag: response.data.errors,
                    formBox: {
                      marginTopDistance: '1rem'
                    }
                  });
                  changeSubmitButtonText('.password-login', '登录');
                  Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
                    maintainingFlagsInfo: {
                      flagsContainer: maintainingFlags,
                      flagName: 'remoteProcessingFlag'
                    }
                  });
                }
              }
            }
          });
        }
      }
    }
  });
}); //submit event for the form on AccountRegisterTab

$('#account_modal .account-register .register.form').submit(function (event) {
  //stop the form from submitting
  event.preventDefault();
  Object(_formValidation__WEBPACK_IMPORTED_MODULE_0__["validateForm"])({
    targetForm: $('#account_modal .account-register'),
    fields: {
      phoneField: {
        element: 'input[name=phone]',
        rules: ['required', //javascript中'\'字符需要被转义，regexp类会自动在正则表达式的开头和末尾加上'/'
        'regex:' + /^1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4[579]\d{2})\d{6}$/.toString()],
        errorMessages: {
          required: '请输入手机号码',
          regex: '请输入正确的手机号码'
        }
      },
      passwordField: {
        element: 'input[name=password]',
        rules: ['required', 'between:6,16'],
        errorMessages: {
          required: '请输入密码',
          between: '请确保密码长度在8-16位之间'
        }
      },
      phoneCodeField: {
        element: 'input[name=phoneCode]',
        rules: ['required', 'digits:4'],
        errorMessages: {
          required: '请输入手机验证码',
          digits: '请输入4位数字的手机验证码'
        }
      }
    },
    callbacks: {
      failed: function failed(errorsBag) {
        showErrorBox({
          tabName: '.account-register',
          errorsBag: errorsBag,
          formBox: {
            marginTopDistance: '0'
          }
        });
      },
      succeeded: function succeeded() {
        //start the remote processing lock, preventing over-executing the codes before the remote returns the result
        //Only when remote processing flag is true, the codes inside will be executed
        if (Object(_network__WEBPACK_IMPORTED_MODULE_3__["startProcessingLock"])({
          maintainingFlagsInfo: {
            flagsContainer: maintainingFlags,
            flagName: 'remoteProcessingFlag'
          }
        })) {
          changeSubmitButtonText('.account-register', '注册中...');
          Object(_network__WEBPACK_IMPORTED_MODULE_3__["sendPostRequest"])({
            postUrl: window.location.protocol + '//' + window.location.host + '/register',
            targetForm: $('#account_modal .account-register'),
            postFields: {
              phone: {
                type: 'element',
                literalValue: 'input[name=phone]'
              },
              password: {
                type: 'element',
                literalValue: 'input[name=password]'
              },
              phoneCode: {
                type: 'element',
                literalValue: 'input[name=phoneCode]'
              },
              _token: {
                type: 'element',
                literalValue: 'input[name=_token]'
              }
            },
            postTimeout: 8000,
            callbacks: {
              failed: function failed(error) {
                var errorsBag = Object(_network__WEBPACK_IMPORTED_MODULE_3__["getNetworkRelatedErrorsBag"])(error);
                showErrorBox({
                  tabName: '.account-register',
                  errorsBag: errorsBag,
                  formBox: {
                    marginTopDistance: '0'
                  }
                });
                changeSubmitButtonText('.account-register', '注册');
                Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
                  maintainingFlagsInfo: {
                    flagsContainer: maintainingFlags,
                    flagName: 'remoteProcessingFlag'
                  }
                });
              },
              succeeded: function succeeded(response) {
                if (response.data.success) {
                  refreshPageUsingCurrentUrl();
                  Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
                    maintainingFlagsInfo: {
                      flagsContainer: maintainingFlags,
                      flagName: 'remoteProcessingFlag'
                    }
                  });
                } else {
                  showErrorBox({
                    tabName: '.account-register',
                    errorsBag: response.data.errors,
                    formBox: {
                      marginTopDistance: '0'
                    }
                  });
                  changeSubmitButtonText('.account-register', '注册');
                  Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
                    maintainingFlagsInfo: {
                      flagsContainer: maintainingFlags,
                      flagName: 'remoteProcessingFlag'
                    }
                  });
                }
              }
            }
          });
        }
      }
    }
  });
}); //click event for the 'get phone code' button on AccountRegisterTab

$('#account_modal .account-register .get-phone-code .link').click(function (event) {
  Object(_formValidation__WEBPACK_IMPORTED_MODULE_0__["validateForm"])({
    targetForm: $('#account_modal .account-register'),
    fields: {
      phoneField: {
        element: 'input[name=phone]',
        rules: ['required', //javascript中'\'字符需要被转义，regexp类会自动在正则表达式的开头和末尾加上'/'
        'regex:' + /^1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4[579]\d{2})\d{6}$/.toString()],
        errorMessages: {
          required: '请输入手机号码',
          regex: '请输入正确的手机号码'
        }
      }
    },
    callbacks: {
      failed: function failed(errorsBag) {
        showErrorBox({
          tabName: '.account-register',
          errorsBag: errorsBag,
          formBox: {
            marginTopDistance: '0'
          }
        });
      },
      succeeded: function succeeded() {
        Object(_network__WEBPACK_IMPORTED_MODULE_3__["wait"])({
          worthWaitingHandler: function worthWaitingHandler(resolve) {
            closeErrorBox({
              tabName: '.account-register',
              formBox: {
                marginTopDistance: '1.5rem'
              },
              resolve: resolve
            });
          },
          suspendedHandler: function suspendedHandler() {
            //prevent multiple requests before get the result
            //only when the YpCaptchaButtonShowingFlag is false and the YpCaptchaButtonShownFlag is false
            //the YpCaptchButton can be instantiated and showed up
            if (Object(_network__WEBPACK_IMPORTED_MODULE_3__["startTripleProcessingLock"])({
              //indicating if the YpCaptchaButton is showing
              firstMaintainingFlagsInfo: {
                flagsContainer: YpCaptchaMaintainingFlags,
                flagName: 'YpCaptchaButtonShowingFlag'
              },
              //indicating if the YpCaptchaButton is shown
              secondMaintainingFlagsInfo: {
                flagsContainer: YpCaptchaMaintainingFlags,
                flagName: 'YpCaptchaButtonShownFlag'
              },
              //indicating if the resend phone code is counting down
              thirdMaintainingFlagsInfo: {
                flagsContainer: maintainingFlags,
                flagName: 'resendPhoneCodeCountingDownFlag'
              }
            })) {
              instantiateYpCaptcha(); //show up the YpCaptchaButton

              showYpCaptchaButton({
                YpCaptchaButtonID: '#register-yunpian-captcha',
                showingTime: 600,
                shownCallback: function shownCallback() {
                  Object(_network__WEBPACK_IMPORTED_MODULE_3__["stopProcessingLock"])({
                    maintainingFlagsInfo: {
                      flagsContainer: YpCaptchaMaintainingFlags,
                      flagName: 'YpCaptchaButtonShowingFlag'
                    }
                  });
                }
              });
            } //make the text of YpCaptchaButton flash


            if (isYpCaptchaButtonShown()) {
              makeYpCaptchaButtonTextFlash({
                YpCaptchaButtonID: '#register-yunpian-captcha',
                effectDuration: 800,
                callbacks: {
                  beforeEffect: function beforeEffect() {//console.log('before the effect')
                  },
                  afterEffect: function afterEffect() {//console.log('after the effect')
                  }
                }
              });
            }
          }
        });
      }
    }
  });
}); //click event for the 'passwowrd switch' button on PasswordLoginTab

$('#account_modal .password-login .password-switch').click(function (event) {
  togglePasswordInputVisibility('.password-login');
}); //click event for the 'passwowrd switch' button on AccountRegisterTab

$('#account_modal .account-register .password-switch').click(function (event) {
  togglePasswordInputVisibility('.account-register');
}); //click event for close button on ErrorBox on PasswordLoginTab

$('#account_modal .password-login .error-box .message .close').click(function (event) {
  closeErrorBox({
    tabName: '.password-login',
    formBox: {
      marginTopDistance: '2.5rem'
    }
  });
}); //click event for close button on ErrorBox on AccountRegisterTab

$('#account_modal .account-register .error-box .message .close').click(function (event) {
  closeErrorBox({
    tabName: '.account-register',
    formBox: {
      marginTopDistance: '1.5rem'
    }
  });
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
  transition: 'fade'
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
/* harmony import */ var enquire_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! enquire.js */ "./node_modules/enquire.js/src/index.js");
/* harmony import */ var enquire_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(enquire_js__WEBPACK_IMPORTED_MODULE_1__);


/**
* Asides Column - Articles Feed
**/

/** Providing the ellipsis(...) to the elements when their texts are more than 2 lines **/

var articlesFeedAsideHeaders = $('#main_content .articles-feed .row .asides.column .aside1 .item .content .header');
Object(_ellipsisText__WEBPACK_IMPORTED_MODULE_0__["default"])(articlesFeedAsideHeaders);
$('#main_content .articles-feed .asides.column .ui.sticky').sticky({
  context: '.articles-feed .asides.column',
  offset: 80,
  observeChanges: true,
  pushing: false
});
/** when the width of the screen is less than 579px, cancel the sticky **/

enquire_js__WEBPACK_IMPORTED_MODULE_1___default.a.register("screen and (max-width: 579px)", {
  match: function match() {
    // cancel the sticky
    $('#main_content .articles-feed .asides.column .asides-wrapper').removeClass('sticky');
  },
  unmatch: function unmatch() {
    //resume the sticky
    $('#main_content .articles-feed .asides.column .asides-wrapper').addClass('sticky');
  }
});
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

$(document).ready(function () {
  //解决在Edge浏览器中重新加载页面时，corner banners右上角的label闪现黑色的背景颜色
  $('#main_content .page_banners .corner_banners .right.corner.label').css('visibility', 'visible');
});
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
/*! exports provided: isiOS, isAndroid, isSafari, isIE11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isiOS", function() { return isiOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAndroid", function() { return isAndroid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSafari", function() { return isSafari; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIE11", function() { return isIE11; });
/* harmony import */ var detect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! detect.js */ "./node_modules/detect.js/detect.js");
/* harmony import */ var detect_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(detect_js__WEBPACK_IMPORTED_MODULE_0__);
/*****************************************************************************************************************************

                                   Detect Browsers

******************************************************************************************************************************/

var ua = detect_js__WEBPACK_IMPORTED_MODULE_0___default.a.parse(navigator.userAgent);
/** Mobile Device and IE11 Detection **/

/** detecting if it is iOS or Android devices **/

var u = navigator.userAgent; //iOS devices

var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //Android devices

var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // Safari browsers on Mac and iOS devices

var isSafari = ua.browser.family.toLowerCase().search('safari') > -1;
/** detecting if it is IE11 browser **/

var isIE11 = false;

if (window.matchMedia("screen and (-ms-high-contrast: active), (-ms-high-contrast: none)").matches) {
  isIE11 = true;
}



/***/ }),

/***/ "./resources/js/index/effects.js":
/*!***************************************!*\
  !*** ./resources/js/index/effects.js ***!
  \***************************************/
/*! exports provided: fadeIn, fadeOut, enableFlashEffect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fadeIn", function() { return fadeIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fadeOut", function() { return fadeOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableFlashEffect", function() { return enableFlashEffect; });
/*************************************************************

                    fadeIn OPTIONS EXAMPLE

**************************************************************

{

  targetElement: $('#register-yunpian-captcha .yp-riddler-button .yp-riddler-button_text'),

  effectDuration: 250,

  callbacks: {

    shown: () => {}

  }

}

**************************************************************/
function fadeIn(fade_in_options) {
  fade_in_options.targetElement.css({
    'display': 'none',
    'visibility': 'visible'
  });
  fade_in_options.targetElement.fadeIn(fade_in_options.effectDuration, function () {
    if (fade_in_options.callbacks) {
      fade_in_options.callbacks.shown();
    }
  });
}
/*************************************************************

                    fadeOut OPTIONS EXAMPLE

**************************************************************

{

  targetElement: $('#register-yunpian-captcha .yp-riddler-button .yp-riddler-button_text'),

  effectDuration: 250,

  targetOriginalDisplayType: 'block',

  callbacks: {

    disappeared: () => {}

  }

}

**************************************************************/


function fadeOut(fade_out_options) {
  fade_out_options.targetElement.fadeOut(fade_out_options.effectDuration, function () {
    fade_out_options.targetElement.css({
      'display': fade_out_options.targetOriginalDisplayType,
      'visibility': 'hidden'
    });

    if (fade_out_options.callbacks) {
      fade_out_options.callbacks.disappeared();
    }
  });
}
/*************************************************************

             enableFlashEffect OPTIONS EXAMPLE

**************************************************************

{

  targetElement: $('#register-yunpian-captcha .yp-riddler-button .yp-riddler-button_text'),

  effectDuration: 800,

  targetOriginalDisplayType: 'inline-block',

  flashTimes: 2,

  callbacks: {

    beforeEffect: () => {},

    afterEffect: () => {}

  }

}

**************************************************************/


function enableFlashEffect(effect_options) {
  //here will only be called once
  if (effect_options.callbacks.beforeEffect.isCalled == undefined) {
    effect_options.callbacks.beforeEffect();
    effect_options.callbacks.beforeEffect.isCalled = true;
    effect_options.partDuration = effect_options.effectDuration / (effect_options.flashTimes * 2);
  }

  fadeOut({
    targetElement: effect_options.targetElement,
    effectDuration: effect_options.partDuration,
    targetOriginalDisplayType: effect_options.targetOriginalDisplayType,
    callbacks: {
      disappeared: function disappeared() {
        fadeIn({
          targetElement: effect_options.targetElement,
          effectDuration: effect_options.partDuration,
          callbacks: {
            shown: function shown() {
              effect_options.flashTimes -= 1;

              if (effect_options.flashTimes > 0) {
                enableFlashEffect(effect_options);
              } else {
                effect_options.callbacks.afterEffect();
                return;
              }
            }
          }
        });
      }
    }
  });
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

/***/ "./resources/js/index/footer.js":
/*!**************************************!*\
  !*** ./resources/js/index/footer.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
* Main Navigation
**/

/** Animation effect **/
$('.footer .footer-share a').hover(function (event) {
  $(event.currentTarget.children[0]).transition('tada');
}, function (event) {
  $(event.currentTarget.children[0]).transition('stop');
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/index/formValidation.js":
/*!**********************************************!*\
  !*** ./resources/js/index/formValidation.js ***!
  \**********************************************/
/*! exports provided: validateForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateForm", function() { return validateForm; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./resources/js/index/utils.js");
/*****************************************************************************************************************************

                                   Validating The form Format

******************************************************************************************************************************/


function isEmpty(input) {
  if ($.trim(input).length > 0) {
    return false;
  }

  return true;
}

function isFailedRegexTest(regex_expression, input) {
  var trimmed_regex_expression = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["trimOneCharacterFromEdges"])(regex_expression);
  var regex = new RegExp(trimmed_regex_expression);

  if (regex.test(input)) {
    return false;
  } else {
    return true;
  }
}

function isBeyondLengthRange(length_range_strs, input) {
  var length_range_array = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["splitStrsIntoTwoParts"])(length_range_strs, ',');
  var min_length = parseInt(length_range_array[0]);
  var max_length = parseInt(length_range_array[1]);

  if (input.length >= min_length && input.length <= max_length) {
    return false;
  }

  return true;
}

function isDigitsWithIncorrectLength(digits_strs, input) {
  var regex_strs = '^\\d{' + digits_strs + '}$';
  var regex = new RegExp(regex_strs);

  if (regex.test(input)) {
    return false;
  }

  return true;
}

function getFormValidationErrorsBag(targetForm, fields) {
  var errorsBag = [];
  $.each(fields, function (index, field) {
    var field_input_value = targetForm.find(field.element).val();
    var fieldErrors = [];
    $.each(field.rules, function (index, rule) {
      var splitted_rule_array = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["splitStrsIntoTwoParts"])(rule, ':');
      var rule_name = splitted_rule_array[0];
      var rule_option = splitted_rule_array[1];

      switch (rule_name) {
        case 'required':
          if (isEmpty(field_input_value)) {
            fieldErrors.push(field.errorMessages[rule_name]);
          }

          break;

        case 'regex':
          if (isFailedRegexTest(rule_option, field_input_value)) {
            fieldErrors.push(field.errorMessages[rule_name]);
          }

          break;

        case 'between':
          if (isBeyondLengthRange(rule_option, field_input_value)) {
            fieldErrors.push(field.errorMessages[rule_name]);
          }

          break;

        case 'digits':
          if (isDigitsWithIncorrectLength(rule_option, field_input_value)) {
            fieldErrors.push(field.errorMessages[rule_name]);
          }

          break;

        default:
      }
    });

    if (fieldErrors.length > 0) {
      errorsBag.push(fieldErrors);
    }
  });

  if (errorsBag.length > 0) {
    return errorsBag;
  } else {
    return false;
  }
}

function validateForm(validation_options) {
  var errorsBag = getFormValidationErrorsBag(validation_options.targetForm, validation_options.fields);

  if (errorsBag) {
    validation_options.callbacks.failed(errorsBag);
  } else {
    validation_options.callbacks.succeeded();
  }
}


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/index/header.js":
/*!**************************************!*\
  !*** ./resources/js/index/header.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _detectBrowsers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detectBrowsers */ "./resources/js/index/detectBrowsers.js");
/* harmony import */ var objectFitPolyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! objectFitPolyfill */ "./node_modules/objectFitPolyfill/dist/objectFitPolyfill.min.js");
/* harmony import */ var objectFitPolyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(objectFitPolyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _accountModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./accountModal */ "./resources/js/index/accountModal.js");
/* harmony import */ var _searchBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./searchBar */ "./resources/js/index/searchBar.js");
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sidebar */ "./resources/js/index/sidebar.js");
/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/





/** Providing the dropdown functionality when clicking on the avatar icon **/

$('#header .right.menu .authentication-links .avatar-container .ui.avatar.dropdown').dropdown({
  transition: 'fade'
});
/** sovle the problem that clicking on the items of the drowpdown menu will casue the doropdown menu to hide and show agagin in IE 11 browsers **/

if (_detectBrowsers__WEBPACK_IMPORTED_MODULE_0__["isIE11"]) {
  $('#header .right.menu .authentication-links .avatar-container .ui.avatar.dropdown .menu').click(function (event) {
    $(document.activeElement).blur();
  });
}
/** Animation effect **/


$('#header .avatar.dropdown .menu a.item, #header .avatar.dropdown .menu .button').hover(function (event) {
  $(event.currentTarget.children[0]).transition('tada');
}, function (event) {
  $(event.currentTarget.children[0]).transition('stop');
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/index/main.js":
/*!************************************!*\
  !*** ./resources/js/index/main.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _semantic_ui_dist_semantic_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../semantic-ui/dist/semantic.min.js */ "./semantic-ui/dist/semantic.min.js");
/* harmony import */ var _semantic_ui_dist_semantic_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_semantic_ui_dist_semantic_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header */ "./resources/js/index/header.js");
/* harmony import */ var _mainNavigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mainNavigation */ "./resources/js/index/mainNavigation.js");
/* harmony import */ var _mainNavigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mainNavigation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _pageBanners__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pageBanners */ "./resources/js/index/pageBanners.js");
/* harmony import */ var _articlesFeed__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./articlesFeed */ "./resources/js/index/articlesFeed.js");
/* harmony import */ var _footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./footer */ "./resources/js/index/footer.js");
/* harmony import */ var _footer__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_footer__WEBPACK_IMPORTED_MODULE_5__);





 //借助webpack的require.context来动态引入所有svg图标文件

var request = __webpack_require__("./resources/js/icons/svg sync \\.svg$");

request.keys().forEach(request);
window.$ = $; //svg sprite 清除无用'class'属性

$(document).ready(function () {
  $('body > svg > symbol').removeAttr('class'); //Chrome和Firefox无法正常显示
  //$('body > svg > symbol').removeAttr('viewBox')
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

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
  $('.featured_carousel .image_holder').css('visibility', 'visible'); //解决在Chrome浏览器中新打开页面时，Page banner高度变形的问题

  $('.featured_carousel .image_holder').css('display', 'block');
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

/***/ "./resources/js/index/network.js":
/*!***************************************!*\
  !*** ./resources/js/index/network.js ***!
  \***************************************/
/*! exports provided: startProcessingLock, startTripleProcessingLock, stopProcessingLock, sendPostRequest, getNetworkRelatedErrorsBag, suspendCurrentProcess, assignValueToMaintainingObjects, assignValueToMaintainingObjectsOnce, unsetMaintainingObjects, startRepeater, clearRepeater, wait */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startProcessingLock", function() { return startProcessingLock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startTripleProcessingLock", function() { return startTripleProcessingLock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopProcessingLock", function() { return stopProcessingLock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendPostRequest", function() { return sendPostRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNetworkRelatedErrorsBag", function() { return getNetworkRelatedErrorsBag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "suspendCurrentProcess", function() { return suspendCurrentProcess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignValueToMaintainingObjects", function() { return assignValueToMaintainingObjects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignValueToMaintainingObjectsOnce", function() { return assignValueToMaintainingObjectsOnce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsetMaintainingObjects", function() { return unsetMaintainingObjects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startRepeater", function() { return startRepeater; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearRepeater", function() { return clearRepeater; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wait", function() { return wait; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/*************************************************************

             startProcessingLock OPTIONS EXAMPLE

**************************************************************

{

  maintainingFlagsInfo: {

    flagsContainer:maintainingFlags,

    flagName: 'YpCaptchaProcessingFlag'

  }

}

**************************************************************/

function startProcessingLock(lock_options) {
  if (!lock_options.maintainingFlagsInfo.flagsContainer[lock_options.maintainingFlagsInfo.flagName]) {
    lock_options.maintainingFlagsInfo.flagsContainer[lock_options.maintainingFlagsInfo.flagName] = true;
    return true;
  }

  return false;
}
/*************************************************************

             startDoubleProcessingLock OPTIONS EXAMPLE

**************************************************************

{

  firstMaintainingFlagsInfo: {

    flagsContainer:maintainingFlags,

    flagName: 'YpCaptchaProcessingFlag'

  },

  secondMaintainingFlagsInfo: {

    flagsContainer:maintainingFlags,

    flagName: 'YpCaptchaProcessingFlag'

  }

}

**************************************************************/


function startDoubleProcessingLock(lock_options) {
  if (!lock_options.firstMaintainingFlagsInfo.flagsContainer[lock_options.firstMaintainingFlagsInfo.flagName] && !lock_options.secondMaintainingFlagsInfo.flagsContainer[lock_options.secondMaintainingFlagsInfo.flagName]) {
    lock_options.firstMaintainingFlagsInfo.flagsContainer[lock_options.firstMaintainingFlagsInfo.flagName] = true;
    lock_options.secondMaintainingFlagsInfo.flagsContainer[lock_options.secondMaintainingFlagsInfo.flagName] = true;
    return true;
  }

  return false;
}
/*************************************************************

         startTripleProcessingLock OPTIONS EXAMPLE

**************************************************************

{

  firstMaintainingFlagsInfo: {

    flagsContainer:maintainingFlags,

    flagName: 'YpCaptchaProcessingFlag'

  },

  secondMaintainingFlagsInfo: {

    flagsContainer:maintainingFlags,

    flagName: 'YpCaptchaProcessingFlag'

  },

  thirdMaintainingFlagsInfo: {

    flagsContainer:maintainingFlags,

    flagName: 'YpCaptchaProcessingFlag'

  },

}

**************************************************************/


function startTripleProcessingLock(lock_options) {
  if (!lock_options.firstMaintainingFlagsInfo.flagsContainer[lock_options.firstMaintainingFlagsInfo.flagName] && !lock_options.secondMaintainingFlagsInfo.flagsContainer[lock_options.secondMaintainingFlagsInfo.flagName] && !lock_options.thirdMaintainingFlagsInfo.flagsContainer[lock_options.thirdMaintainingFlagsInfo.flagName]) {
    lock_options.firstMaintainingFlagsInfo.flagsContainer[lock_options.firstMaintainingFlagsInfo.flagName] = true;
    lock_options.secondMaintainingFlagsInfo.flagsContainer[lock_options.secondMaintainingFlagsInfo.flagName] = true;
    lock_options.thirdMaintainingFlagsInfo.flagsContainer[lock_options.thirdMaintainingFlagsInfo.flagName] = true;
    return true;
  }

  return false;
}
/*************************************************************

             stopProcessingLock OPTIONS EXAMPLE

**************************************************************

{

  maintainingFlagsInfo: {

    flagsContainer:maintainingFlags,

    flagName: 'YpCaptchaProcessingFlag'

  },

  setZero[optional]: true

}

**************************************************************/


function stopProcessingLock(lock_options) {
  if (lock_options.maintainingFlagsInfo.flagsContainer[lock_options.maintainingFlagsInfo.flagName]) {
    if (lock_options.setZero) {
      lock_options.maintainingFlagsInfo.flagsContainer[lock_options.maintainingFlagsInfo.flagName] = 0;
      return;
    }

    lock_options.maintainingFlagsInfo.flagsContainer[lock_options.maintainingFlagsInfo.flagName] = false;
  }
}
/*************************************************************

            sendPostRequest OPTIONS EXAMPLE

**************************************************************

{

  postUrl: getPostUrl('.account-register'),

  targetForm: $('#account_modal .account-login .password-login'),

  postFields: {

    phone:  {

      type: 'element',

      literalValue: 'input[name=phone]'

    },

    captcha_token: {

      type: 'parameter',

      literalValue:  captcha_token

    },

    captcha_authenticate: {

      type: 'parameter',

      literalValue:  captcha_authenticate

    },

  },

  postTimeout: 8000

  callbacks: {

    failed: (error) => {},

    succeeded: (response) =>{}

  }


}

**************************************************************/


function sendPostRequest(post_options) {
  var computed_field_value = {};
  $.each(post_options.postFields, function (key, field) {
    var field_input_value;

    if (field.type == 'element') {
      field_input_value = post_options.targetForm.find(field.literalValue).val();
    } else if (field.type == 'parameter') {
      field_input_value = field.literalValue;
    }

    computed_field_value[key] = field_input_value;
  });
  axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(post_options.postUrl, computed_field_value, {
    timeout: post_options.postTimeout
  }).then(function (response) {
    post_options.callbacks.succeeded(response);
  })["catch"](function (error) {
    post_options.callbacks.failed(error);
  });
}

function getNetworkRelatedErrorsBag(error) {
  var errorsBag = [];
  var globalErrors = [];

  if (error.response) {
    ////in Laravel, the command like 'throw new \Symfony\Component\HttpKernel\Exception\ConflictHttpException('User was updated prior to your request.');'
    // will return error information from error.response
    // The request was made and the server responded with a status code
    globalErrors.push("\u670D\u52A1\u5668\u8FD4\u56DE ".concat(error.response.status, " \u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"));
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    globalErrors.push('网络连接错误，请稍后再试');
  } else {
    // Something happened in setting up the request that triggered an Error
    globalErrors.push('在发起请求时出现错误，请稍后再试');
  }

  errorsBag.push(globalErrors);
  return errorsBag;
}

function suspendCurrentProcess(suspend_options) {
  wait({
    worthWaitingHandler: function worthWaitingHandler(resolve) {
      setTimeout(function () {
        resolve();
      }, suspend_options.suspendingTime);
    },
    suspendedHandler: suspend_options.callbacks.resumed
  });
}
/*************************************************************

       assignValueToMaintainingObjects OPTIONS EXAMPLE

**************************************************************

{

  maintainingObjectsInfo: {

    objectsContainer: maintainingObjects,

    objectName: 'YpCaptchaInstance'

  },

  assginValueFunc: () => {

    return instantiateYpCaptcha()

  }

}

**************************************************************/


function assignValueToMaintainingObjects(assign_options) {
  assign_options.maintainingObjectsInfo.objectsContainer[assign_options.maintainingObjectsInfo.objectName] = assign_options.assginValueFunc();
}
/* only when the value of the object is undefined, this function can assign value to this object */


function assignValueToMaintainingObjectsOnce(assign_options) {
  if (assign_options.maintainingObjectsInfo.objectsContainer[assign_options.maintainingObjectsInfo.objectName] == undefined) {
    assign_options.maintainingObjectsInfo.objectsContainer[assign_options.maintainingObjectsInfo.objectName] = assign_options.assginValueFunc();
  }
}

function unsetMaintainingObjects(unset_options) {
  if (unset_options.maintainingObjectsInfo.objectsContainer[unset_options.maintainingObjectsInfo.objectName] != undefined) {
    unset_options.maintainingObjectsInfo.objectsContainer[unset_options.maintainingObjectsInfo.objectName] = undefined;
  }
}
/*************************************************************

                 startRepeater OPTIONS EXAMPLE

**************************************************************

{

  maintainingObjectsInfo: {

    objectsContainer:maintainingObjects,

    objectName: 'puzzleShowUpWatcher'

  },

  intervalCallback: () => {},

  frequency: 100

}

**************************************************************/


function startRepeater(repeat_options) {
  assignValueToMaintainingObjects({
    maintainingObjectsInfo: repeat_options.maintainingObjectsInfo,
    assginValueFunc: function assginValueFunc() {
      return setInterval(repeat_options.intervalCallback, repeat_options.frequency);
    }
  });
}

function clearRepeater(repeat_options) {
  clearInterval(repeat_options.maintainingObjectsInfo.objectsContainer[repeat_options.maintainingObjectsInfo.objectName]);
}
/*************************************************************

                    wait OPTIONS EXAMPLE

**************************************************************

{

  worthWaitingHandler: () => {


  },

  suspendedHandler: () => {

  }

}

only when the worthWaitingHandler is finally executed the suspendedHandler

will be called

**************************************************************/


function wait(wait_options) {
  new Promise(function (resolve, reject) {
    wait_options.worthWaitingHandler(resolve);
  }).then(function () {
    wait_options.suspendedHandler();
  });
}


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

  var authentication_links = $('#header .right.menu .authentication-links');
  authentication_links[0].style.display = 'none';
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
      var authentication_links = $('#header .right.menu .authentication-links');
      wechat_official_platform[0].style.display = 'flex';
      divider_item[0].style.display = 'block';
      authentication_links[0].style.display = 'flex';
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
/** when clicking the menu button, making the search bar invisible while the search bar is open **/

$('#header .right.menu .menu_button .align.justify.icon').click(function (event) {
  /* making results panel of search input invisible if it shows up */
  $('#header .right.menu .ui.search .results').addClass('hide_results');
  /* making search input invisible */

  var search_input = $('#header .right.menu .ui.search input.prompt')[0];
  search_input.style.visibility = 'hidden';
  search_input.style.width = '0';
  /* making close icon invisible */

  var close_icon = $('#header .right.menu .ui.search .close.icon')[0];
  close_icon.style.display = 'none';
  /** when clicking the menu button, set the display of the wechat official platform section to 'flex' **/

  var wechat_official_platform = $('#header .header_content .right_wrap .right.menu .wechat-official-platform');
  wechat_official_platform[0].style.display = 'flex';
  /* when clicking the menu button, set the display of the dividers to 'block' */

  var dividers = $('#header .right.menu .divider_item');
  dividers[0].style.display = 'block';
  dividers[1].style.display = 'block';
  /* making login and register buttons visible */

  var authentication_links = $('#header .right.menu .authentication-links');
  authentication_links[0].style.display = 'flex';
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
var scrollDistance = 0;
/** toggling the display of the sidebar **/

$('#main_sidebar').sidebar({
  transition: 'overlay',
  mobileTransition: 'overlay',
  dimPage: false,
  context: 'body',
  scrollLock: false,
  returnScroll: false,

  /** Is called when a sidebar begins animating in **/
  onVisible: function onVisible() {
    /** remember the scroll distance of the page when the sidebar begins animating in **/
    scrollDistance = $(document).scrollTop();
    /** Resizing the height for iOS devices **/

    resizeSidebarHeight();
    /** when opening the sidebar, preventing the body layer from moving **/

    $('body').addClass('fixed_layer');
    /** set the top property of the body element (which is fixed) to the negative value of the scroll distance **/

    /** make sure that the viewport remains the same position when open the sidebar **/

    $('body').css('top', "-".concat(scrollDistance, "px"));
  },
  //is called when a sidebar has finished animating in
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
    /** when close the sidebar, make sure the viewport remains the same position **/

    $(document).scrollTop(scrollDistance);
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

/***/ "./resources/js/index/utils.js":
/*!*************************************!*\
  !*** ./resources/js/index/utils.js ***!
  \*************************************/
/*! exports provided: splitStrsIntoTwoParts, trimOneCharacterFromEdges */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitStrsIntoTwoParts", function() { return splitStrsIntoTwoParts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimOneCharacterFromEdges", function() { return trimOneCharacterFromEdges; });
/*****************************************************************************************************************************

                                   Utils

******************************************************************************************************************************/

/** splitStrsIntoTwoParts('between:8,16',':') will be split into ['between', '8,16']**/

/** splitStrsIntoTwoParts('abcdef',':') will return ['abcdef']**/
function splitStrsIntoTwoParts(splitStrs, indicator) {
  var strs_array = splitStrs.split(indicator);

  if (strs_array.length === 1) {
    return strs_array;
  }

  var first_part_strs = strs_array.shift();
  var second_part_strs = strs_array.join(indicator);
  var two_parts_array = [];

  if (first_part_strs !== '') {
    two_parts_array.push(first_part_strs);
  }

  if (second_part_strs !== '') {
    two_parts_array.push(second_part_strs);
  }

  return two_parts_array;
}

function trimOneCharacterFromEdges(trimmingStrs) {
  var trimmedStrs = trimmingStrs.substr(1);
  trimmedStrs = trimmedStrs.substr(0, trimmedStrs.length - 1);
  return trimmedStrs;
}



/***/ }),

/***/ "./resources/sass/editor.scss":
/*!************************************!*\
  !*** ./resources/sass/editor.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

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
!function (p, h, v, b) {
  p.site = p.fn.site = function (e) {
    var s,
        l,
        i = new Date().getTime(),
        o = [],
        t = e,
        n = "string" == typeof t,
        c = [].slice.call(arguments, 1),
        u = p.isPlainObject(e) ? p.extend(!0, {}, p.site.settings, e) : p.extend({}, p.site.settings),
        a = u.namespace,
        d = u.error,
        r = "module-" + a,
        f = p(v),
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
          s.debug("Normalizing window.console"), console !== b && console.log !== b || (s.verbose("Console not available, normalizing events"), s.disable.console()), void 0 !== console.group && void 0 !== console.groupEnd && void 0 !== console.groupCollapsed || (s.verbose("Console group not available, normalizing events"), h.console.group = function () {}, h.console.groupEnd = function () {}, h.console.groupCollapsed = function () {}), void 0 === console.markTimeline && (s.verbose("Mark timeline not available, normalizing events"), h.console.markTimeline = function () {});
        }),
        consoleClear: function consoleClear() {
          s.debug("Disabling programmatic console clearing"), h.console.clear = function () {};
        },
        requestAnimationFrame: function requestAnimationFrame() {
          s.debug("Normalizing requestAnimationFrame"), h.requestAnimationFrame === b && (s.debug("RequestAnimationFrame not available, normalizing event"), h.requestAnimationFrame = h.requestAnimationFrame || h.mozRequestAnimationFrame || h.webkitRequestAnimationFrame || h.msRequestAnimationFrame || function (e) {
            setTimeout(e, 0);
          });
        }
      },
      moduleExists: function moduleExists(e) {
        return p.fn[e] !== b && p.fn[e].settings !== b;
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
          e = "string" == typeof e ? "all" === e ? u.modules : [e] : e || u.modules, r = r === b || r, p.each(e, function (e, t) {
            var n,
                i = !s.moduleExists(t) || p.fn[t].settings.namespace || !1;
            s.moduleExists(t) && (s.verbose("Changing default setting", o, a, t), p.fn[t].settings[o] = a, r && i && 0 < (n = p(":data(module-" + i + ")")).length && (s.verbose("Modifying existing settings", n), n[t]("setting", o, a)));
          });
        },
        settings: function settings(i, e, o) {
          e = "string" == typeof e ? [e] : e || u.modules, o = o === b || o, p.each(e, function (e, t) {
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
          if (g.cache.console === b) return void s.error(d.console);
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
          if (t === b) return u[e];
          u[e] = t;
        }
      },
      internal: function internal(e, t) {
        if (p.isPlainObject(e)) p.extend(!0, s, e);else {
          if (t === b) return s[e];
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
          }), e += " " + n + "ms", (console.group !== b || console.table !== b) && 0 < o.length && (console.groupCollapsed(e), console.table ? console.table(o) : p.each(o, function (e, t) {
            console.log(t.Name + ": " + t["Execution Time"] + "ms");
          }), console.groupEnd()), o = [];
        }
      },
      invoke: function invoke(i, e, t) {
        var o,
            a,
            n,
            r = g;
        return e = e || c, t = m || t, "string" == typeof i && r !== b && (i = i.split(/[\. ]/), o = i.length - 1, p.each(i, function (e, t) {
          var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
          if (p.isPlainObject(r[n]) && e != o) r = r[n];else {
            if (r[n] !== b) return a = r[n], !1;
            if (!p.isPlainObject(r[t]) || e == o) return r[t] !== b ? a = r[t] : s.error(d.method, i), !1;
            r = r[t];
          }
        })), p.isFunction(a) ? n = a.apply(t, e) : a !== b && (n = a), p.isArray(l) ? l.push(n) : l !== b ? l = [l, n] : n !== b && (l = n), a;
      }
    }, n ? (g === b && s.initialize(), s.invoke(t)) : (g !== b && s.destroy(), s.initialize()), l !== b ? l : this;
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
}(jQuery, window, document), function (F, E, O, D) {
  "use strict";

  E = void 0 !== E && E.Math == Math ? E : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), F.fn.search = function (l) {
    var C,
        w = F(this),
        S = w.selector || "",
        T = new Date().getTime(),
        k = [],
        A = l,
        R = "string" == typeof A,
        P = [].slice.call(arguments, 1);
    return F(this).each(function () {
      var f,
          c = F.isPlainObject(l) ? F.extend(!0, {}, F.fn.search.settings, l) : F.extend({}, F.fn.search.settings),
          m = c.className,
          u = c.metadata,
          d = c.regExp,
          a = c.fields,
          g = c.selector,
          p = c.error,
          e = c.namespace,
          i = "." + e,
          t = e + "-module",
          h = F(this),
          v = h.find(g.prompt),
          n = h.find(g.searchButton),
          o = h.find(g.results),
          r = h.find(g.result),
          b = (h.find(g.category), this),
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
          f.debug("Refreshing selector cache"), v = h.find(g.prompt), n = h.find(g.searchButton), h.find(g.category), o = h.find(g.results), r = h.find(g.result);
        },
        refreshResults: function refreshResults() {
          o = h.find(g.results), r = h.find(g.result);
        },
        bind: {
          events: function events() {
            f.verbose("Binding events to search"), c.automatic && (h.on(f.get.inputEvent() + i, g.prompt, f.event.input), v.attr("autocomplete", "off")), h.on("focus" + i, g.prompt, f.event.focus).on("blur" + i, g.prompt, f.event.blur).on("keydown" + i, g.prompt, f.handleKeyboard).on("click" + i, g.searchButton, f.query).on("mousedown" + i, g.results, f.event.result.mousedown).on("mouseup" + i, g.results, f.event.result.mouseup).on("click" + i, g.result, f.event.result.click);
          }
        },
        determine: {
          searchFields: function searchFields() {
            l && l.searchFields !== D && (c.searchFields = l.searchFields);
          }
        },
        event: {
          input: function input() {
            c.searchDelay ? (clearTimeout(f.timer), f.timer = setTimeout(function () {
              f.is.focused() && f.query();
            }, c.searchDelay)) : f.query();
          },
          focus: function focus() {
            f.set.focus(), c.searchOnFocus && f.has.minimumCharacters() && f.query(function () {
              f.can.show() && f.showResults();
            });
          },
          blur: function blur(e) {
            var t = O.activeElement === this,
                n = function n() {
              f.cancel.query(), f.remove.focus(), f.timer = setTimeout(f.hideResults, c.hideDelay);
            };

            t || (x = !1, f.resultsClicked ? (f.debug("Determining if user action caused search to close"), h.one("click.close" + i, g.results, function (e) {
              f.is.inMessage(e) || y ? v.focus() : (y = !1, f.is.animating() || f.is.hidden() || n());
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
                  a = i.attr("target") || !1,
                  r = (n.html(), 0 < n.length && n.text()),
                  s = f.get.results(),
                  l = t.data(u.result) || f.get.result(r, s);
              if (F.isFunction(c.onSelect) && !1 === c.onSelect.call(b, l, s)) return f.debug("Custom onSelect callback cancelled default select action"), void (y = !0);
              f.hideResults(), r && f.set.value(r), o && (f.verbose("Opening search link found in result", i), "_blank" == a || e.ctrlKey ? E.open(o) : E.location.href = o);
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
              l = e.which,
              c = 13,
              u = 38,
              d = 40;
          if (l == 27 && (f.verbose("Escape key pressed, blurring search field"), f.hideResults(), x = !0), f.is.visible()) {
            if (l == c) {
              if (f.verbose("Enter key pressed, selecting active result"), 0 < n.filter("." + m.active).length) return f.event.result.click.call(n.filter("." + m.active), e), e.preventDefault(), !1;
            } else l == u && s ? (f.verbose("Up key pressed, changing active result"), t = a - 1 < 0 ? a : a - 1, i.removeClass(m.active), n.removeClass(m.active).eq(t).addClass(m.active).closest(i).addClass(m.active), e.preventDefault()) : l == d && (f.verbose("Down key pressed, changing active result"), t = r <= a + 1 ? a : a + 1, i.removeClass(m.active), n.removeClass(m.active).eq(t).addClass(m.active).closest(i).addClass(m.active), e.preventDefault());
          } else l == c && (f.verbose("Enter key pressed, executing query"), f.query(), f.set.buttonPressed(), v.one("keyup", f.remove.buttonFocus));
        },
        setup: {
          api: function api(t, n) {
            var e = {
              debug: c.debug,
              on: !1,
              cache: c.cache,
              action: "search",
              urlData: {
                query: t
              },
              onSuccess: function onSuccess(e) {
                f.parse.response.call(b, e, t), n();
              },
              onFailure: function onFailure() {
                f.displayMessage(p.serverError), n();
              },
              onAbort: function onAbort(e) {},
              onError: f.error
            };
            F.extend(!0, e, c.apiSettings), f.verbose("Setting up API request", e), h.api(e);
          }
        },
        can: {
          useAPI: function useAPI() {
            return F.fn.api !== D;
          },
          show: function show() {
            return f.is.focused() && !f.is.visible() && !f.is.empty();
          },
          transition: function transition() {
            return c.transition && F.fn.transition !== D && h.transition("is supported");
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
            return 0 < v.filter(":focus").length;
          }
        },
        get: {
          settings: function settings() {
            F.isPlainObject(l) && l.searchFullText && (c.fullTextSearch = l.searchFullText, f.error(c.error.oldSearchSyntax, b));
          },
          inputEvent: function inputEvent() {
            var e = v[0];
            return e !== D && e.oninput !== D ? "input" : e !== D && e.onpropertychange !== D ? "propertychange" : "keyup";
          },
          value: function value() {
            return v.val();
          },
          results: function results() {
            return h.data(u.results);
          },
          result: function result(n, e) {
            var i = ["title", "id"],
                o = !1;
            return n = n !== D ? n : f.get.value(), e = e !== D ? e : f.get.results(), "category" === c.type ? (f.debug("Finding result that matches", n), F.each(e, function (e, t) {
              if (F.isArray(t.results) && (o = f.search.object(n, t.results, i)[0])) return !1;
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
            f.verbose("Setting search input value", e), v.val(e);
          },
          type: function type(e) {
            e = e || c.type, "category" == c.type && h.addClass(c.type);
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
          e = e || function () {}, f.has.minimumCharacters() ? (n ? (f.debug("Reading result from cache", t), f.save.results(n.results), f.addResults(n.html), f.inject.id(n.results), e()) : (f.debug("Querying for", t), F.isPlainObject(c.source) || F.isArray(c.source) ? (f.search.local(t), e()) : f.can.useAPI() ? f.search.remote(t, e) : (f.error(p.source), e())), c.onSearchQuery.call(b, t)) : f.hideResults();
        },
        search: {
          local: function local(e) {
            var t,
                n = f.search.object(e, c.content);
            f.set.loading(), f.save.results(n), f.debug("Returned full local search results", n), 0 < c.maxResults && (f.debug("Using specified max results", n), n = n.slice(0, c.maxResults)), "category" == c.type && (n = f.create.categoryResults(n)), t = f.generateResults({
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
            var a = [],
                r = [],
                s = [],
                n = i.toString().replace(d.escape, "\\$&"),
                o = new RegExp(d.beginsWith + n, "i"),
                l = function l(e, t) {
              var n = -1 == F.inArray(t, a),
                  i = -1 == F.inArray(t, s),
                  o = -1 == F.inArray(t, r);
              n && i && o && e.push(t);
            };

            return t = t || c.source, e = e !== D ? e : c.searchFields, F.isArray(e) || (e = [e]), t === D || !1 === t ? (f.error(p.source), []) : (F.each(e, function (e, n) {
              F.each(t, function (e, t) {
                "string" == typeof t[n] && (-1 !== t[n].search(o) ? l(a, t) : "exact" === c.fullTextSearch && f.exactSearch(i, t[n]) ? l(r, t) : 1 == c.fullTextSearch && f.fuzzySearch(i, t[n]) && l(s, t));
              });
            }), F.merge(r, s), F.merge(a, r), a);
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
            f.verbose("Parsing server response", e), e !== D && t !== D && e[a.results] !== D && (f.addResults(n), f.inject.id(e[a.results]), f.write.cache(t, {
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
            return f.get.value().length >= c.minCharacters;
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
            return !!c.cache && (f.verbose("Checking cache for generated html for query", e), "object" == _typeof(t) && t[e] !== D && t[e]);
          }
        },
        create: {
          categoryResults: function categoryResults(e) {
            var n = {};
            return F.each(e, function (e, t) {
              t.category && (n[t.category] === D ? (f.verbose("Creating new category of results", t.category), n[t.category] = {
                name: t.category,
                results: [t]
              }) : n[t.category].results.push(t));
            }), n;
          },
          id: function id(e, t) {
            var n,
                i = e + 1;
            return t !== D ? (n = String.fromCharCode(97 + t) + i, f.verbose("Creating category result id", n)) : (n = i, f.verbose("Creating result id", n)), n;
          },
          results: function results() {
            0 === o.length && (o = F("<div />").addClass(m.results).appendTo(h));
          }
        },
        inject: {
          result: function result(e, t, n) {
            f.verbose("Injecting result into results");
            var i = n !== D ? o.children().eq(n).children(g.results).first().children(g.result).eq(t) : o.children(g.result).eq(t);
            f.verbose("Injecting results metadata", i), i.data(u.result, e);
          },
          id: function id(i) {
            f.debug("Injecting unique ids into results");
            var o = 0,
                a = 0;
            return "category" === c.type ? F.each(i, function (e, i) {
              a = 0, F.each(i.results, function (e, t) {
                var n = i.results[e];
                n.id === D && (n.id = f.create.id(a, o)), f.inject.result(n, a, o), a++;
              }), o++;
            }) : F.each(i, function (e, t) {
              var n = i[e];
              n.id === D && (n.id = f.create.id(a)), f.inject.result(n, a), a++;
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
            var n = h.data(u.cache) !== D ? h.data(u.cache) : {};
            c.cache && (f.verbose("Writing generated html to cache", e, t), n[e] = t, h.data(u.cache, n));
          }
        },
        addResults: function addResults(e) {
          if (F.isFunction(c.onResultsAdd) && !1 === c.onResultsAdd.call(o, e)) return f.debug("onResultsAdd callback cancelled default action"), !1;
          e ? (o.html(e), f.refreshResults(), c.selectFirstResult && f.select.firstResult(), f.showResults()) : f.hideResults(function () {
            o.empty();
          });
        },
        showResults: function showResults(e) {
          e = F.isFunction(e) ? e : function () {}, x || !f.is.visible() && f.has.results() && (f.can.transition() ? (f.debug("Showing results with css animations"), o.transition({
            animation: c.transition + " in",
            debug: c.debug,
            verbose: c.verbose,
            duration: c.duration,
            onComplete: function onComplete() {
              e();
            },
            queue: !0
          })) : (f.debug("Showing results with javascript"), o.stop().fadeIn(c.duration, c.easing)), c.onResultsOpen.call(o));
        },
        hideResults: function hideResults(e) {
          e = F.isFunction(e) ? e : function () {}, f.is.visible() && (f.can.transition() ? (f.debug("Hiding results with css animations"), o.transition({
            animation: c.transition + " out",
            debug: c.debug,
            verbose: c.verbose,
            duration: c.duration,
            onComplete: function onComplete() {
              e();
            },
            queue: !0
          })) : (f.debug("Hiding results with javascript"), o.stop().fadeOut(c.duration, c.easing)), c.onResultsClose.call(o));
        },
        generateResults: function generateResults(e) {
          f.debug("Generating html from response", e);
          var t = c.templates[c.type],
              n = F.isPlainObject(e[a.results]) && !F.isEmptyObject(e[a.results]),
              i = F.isArray(e[a.results]) && 0 < e[a.results].length,
              o = "";
          return n || i ? (0 < c.maxResults && (n ? "standard" == c.type && f.error(p.maxResults) : e[a.results] = e[a.results].slice(0, c.maxResults)), F.isFunction(t) ? o = t(e, a) : f.error(p.noTemplate, !1)) : c.showNoResults && (o = f.displayMessage(p.noResults, "empty")), c.onResults.call(b, e), o;
        },
        displayMessage: function displayMessage(e, t) {
          return t = t || "standard", f.debug("Displaying message", e, t), f.addResults(c.templates.message(e, t)), c.templates.message(e, t);
        },
        setting: function setting(e, t) {
          if (F.isPlainObject(e)) F.extend(!0, c, e);else {
            if (t === D) return c[e];
            c[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (F.isPlainObject(e)) F.extend(!0, f, e);else {
            if (t === D) return f[e];
            f[e] = t;
          }
        },
        debug: function debug() {
          !c.silent && c.debug && (c.performance ? f.performance.log(arguments) : (f.debug = Function.prototype.bind.call(console.info, console, c.name + ":"), f.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !c.silent && c.verbose && c.debug && (c.performance ? f.performance.log(arguments) : (f.verbose = Function.prototype.bind.call(console.info, console, c.name + ":"), f.verbose.apply(console, arguments)));
        },
        error: function error() {
          c.silent || (f.error = Function.prototype.bind.call(console.error, console, c.name + ":"), f.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var t, n;
            c.performance && (n = (t = new Date().getTime()) - (T || t), T = t, k.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: b,
              "Execution Time": n
            })), clearTimeout(f.performance.timer), f.performance.timer = setTimeout(f.performance.display, 500);
          },
          display: function display() {
            var e = c.name + ":",
                n = 0;
            T = !1, clearTimeout(f.performance.timer), F.each(k, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", S && (e += " '" + S + "'"), 1 < w.length && (e += " (" + w.length + ")"), (console.group !== D || console.table !== D) && 0 < k.length && (console.groupCollapsed(e), console.table ? console.table(k) : F.each(k, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), k = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              a,
              n,
              r = s;
          return e = e || P, t = b || t, "string" == typeof i && r !== D && (i = i.split(/[\. ]/), o = i.length - 1, F.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (F.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== D) return a = r[n], !1;
              if (!F.isPlainObject(r[t]) || e == o) return r[t] !== D && (a = r[t]), !1;
              r = r[t];
            }
          })), F.isFunction(a) ? n = a.apply(t, e) : a !== D && (n = a), F.isArray(C) ? C.push(n) : C !== D ? C = [C, n] : n !== D && (C = n), a;
        }
      }, R ? (s === D && f.initialize(), f.invoke(A)) : (s !== D && s.invoke("destroy"), f.initialize());
    }), C !== D ? C : this;
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
        return e !== D && t !== D && (n += '<div class="message ' + t + '">', n += "empty" == t ? '<div class="header">No Results</div class="header"><div class="description">' + e + '</div class="description">' : ' <div class="description">' + e + "</div>", n += "</div>"), n;
      },
      category: function category(e, n) {
        var i = "";
        F.fn.search.settings.templates.escape;
        return e[n.categoryResults] !== D && (F.each(e[n.categoryResults], function (e, t) {
          t[n.results] !== D && 0 < t.results.length && (i += '<div class="category">', t[n.categoryName] !== D && (i += '<div class="name">' + t[n.categoryName] + "</div>"), i += '<div class="results">', F.each(t.results, function (e, t) {
            t[n.url] ? i += '<a class="result" href="' + t[n.url] + '">' : i += '<a class="result">', t[n.image] !== D && (i += '<div class="image"> <img src="' + t[n.image] + '"></div>'), i += '<div class="content">', t[n.price] !== D && (i += '<div class="price">' + t[n.price] + "</div>"), t[n.title] !== D && (i += '<div class="title">' + t[n.title] + "</div>"), t[n.description] !== D && (i += '<div class="description">' + t[n.description] + "</div>"), i += "</div>", i += "</a>";
          }), i += "</div>", i += "</div>");
        }), e[n.action] && (i += '<a href="' + e[n.action][n.actionURL] + '" class="action">' + e[n.action][n.actionText] + "</a>"), i);
      },
      standard: function standard(e, n) {
        var i = "";
        return e[n.results] !== D && (F.each(e[n.results], function (e, t) {
          t[n.url] ? i += '<a class="result" href="' + t[n.url] + '">' : i += '<a class="result">', t[n.image] !== D && (i += '<div class="image"> <img src="' + t[n.image] + '"></div>'), i += '<div class="content">', t[n.price] !== D && (i += '<div class="price">' + t[n.price] + "</div>"), t[n.title] !== D && (i += '<div class="title">' + t[n.title] + "</div>"), t[n.description] !== D && (i += '<div class="description">' + t[n.description] + "</div>"), i += "</div>", i += "</a>";
        }), e[n.action] && (i += '<a href="' + e[n.action][n.actionURL] + '" class="action">' + e[n.action][n.actionText] + "</a>"), i);
      }
    }
  };
}(jQuery, window, document), function (q, L, j, z) {
  "use strict";

  L = void 0 !== L && L.Math == Math ? L : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), q.fn.sidebar = function (x) {
    var C,
        e = q(this),
        w = q(L),
        S = q(j),
        T = q("html"),
        k = q("head"),
        A = e.selector || "",
        R = new Date().getTime(),
        P = [],
        F = x,
        E = "string" == typeof F,
        O = [].slice.call(arguments, 1),
        D = L.requestAnimationFrame || L.mozRequestAnimationFrame || L.webkitRequestAnimationFrame || L.msRequestAnimationFrame || function (e) {
      setTimeout(e, 0);
    };

    return e.each(function () {
      var r,
          s,
          e,
          t,
          l,
          c,
          u = q.isPlainObject(x) ? q.extend(!0, {}, q.fn.sidebar.settings, x) : q.extend({}, q.fn.sidebar.settings),
          n = u.selector,
          a = u.className,
          i = u.namespace,
          o = u.regExp,
          d = u.error,
          f = "." + i,
          m = "module-" + i,
          g = q(this),
          p = q(u.context),
          h = g.children(n.sidebar),
          v = (p.children(n.fixed), p.children(n.pusher)),
          b = this,
          y = g.data(m);
      c = {
        initialize: function initialize() {
          c.debug("Initializing sidebar", x), c.create.id(), l = c.get.transitionEvent(), u.delaySetup ? D(c.setup.layout) : c.setup.layout(), D(function () {
            c.setup.cache();
          }), c.instantiate();
        },
        instantiate: function instantiate() {
          c.verbose("Storing instance of module", c), y = c, g.data(m, c);
        },
        create: {
          id: function id() {
            e = (Math.random().toString(16) + "000000000").substr(2, 8), s = "." + e, c.verbose("Creating unique id for element", e);
          }
        },
        destroy: function destroy() {
          c.verbose("Destroying previous module for", g), g.off(f).removeData(m), c.is.ios() && c.remove.ios(), p.off(s), w.off(s), S.off(s);
        },
        event: {
          clickaway: function clickaway(e) {
            var t = 0 < v.find(e.target).length || v.is(e.target),
                n = p.is(e.target);
            t && (c.verbose("User clicked on dimmed page"), c.hide()), n && (c.verbose("User clicked on dimmable context (scaled out page)"), c.hide());
          },
          touch: function touch(e) {},
          containScroll: function containScroll(e) {
            b.scrollTop <= 0 && (b.scrollTop = 1), b.scrollTop + b.offsetHeight >= b.scrollHeight && (b.scrollTop = b.scrollHeight - b.offsetHeight - 1);
          },
          scroll: function scroll(e) {
            0 === q(e.target).closest(n.sidebar).length && e.preventDefault();
          }
        },
        bind: {
          clickaway: function clickaway() {
            c.verbose("Adding clickaway events to context", p), u.closable && p.on("click" + s, c.event.clickaway).on("touchend" + s, c.event.clickaway);
          },
          scrollLock: function scrollLock() {
            u.scrollLock && (c.debug("Disabling page scroll"), w.on("DOMMouseScroll" + s, c.event.scroll)), c.verbose("Adding events to contain sidebar scroll"), S.on("touchmove" + s, c.event.touch), g.on("scroll" + f, c.event.containScroll);
          }
        },
        unbind: {
          clickaway: function clickaway() {
            c.verbose("Removing clickaway events from context", p), p.off(s);
          },
          scrollLock: function scrollLock() {
            c.verbose("Removing scroll lock from page"), S.off(s), w.off(s), g.off("scroll" + f);
          }
        },
        add: {
          inlineCSS: function inlineCSS() {
            var e,
                t = c.cache.width || g.outerWidth(),
                n = c.cache.height || g.outerHeight(),
                i = c.is.rtl(),
                o = c.get.direction(),
                a = {
              left: t,
              right: -t,
              top: n,
              bottom: -n
            };
            i && (c.verbose("RTL detected, flipping widths"), a.left = -t, a.right = t), e = "<style>", "left" === o || "right" === o ? (c.debug("Adding CSS rules for animation distance", t), e += " .ui.visible." + o + ".sidebar ~ .fixed, .ui.visible." + o + ".sidebar ~ .pusher {   -webkit-transform: translate3d(" + a[o] + "px, 0, 0);           transform: translate3d(" + a[o] + "px, 0, 0); }") : "top" !== o && "bottom" != o || (e += " .ui.visible." + o + ".sidebar ~ .fixed, .ui.visible." + o + ".sidebar ~ .pusher {   -webkit-transform: translate3d(0, " + a[o] + "px, 0);           transform: translate3d(0, " + a[o] + "px, 0); }"), c.is.ie() && ("left" === o || "right" === o ? (c.debug("Adding CSS rules for animation distance", t), e += " body.pushable > .ui.visible." + o + ".sidebar ~ .pusher:after {   -webkit-transform: translate3d(" + a[o] + "px, 0, 0);           transform: translate3d(" + a[o] + "px, 0, 0); }") : "top" !== o && "bottom" != o || (e += " body.pushable > .ui.visible." + o + ".sidebar ~ .pusher:after {   -webkit-transform: translate3d(0, " + a[o] + "px, 0);           transform: translate3d(0, " + a[o] + "px, 0); }"), e += " body.pushable > .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher:after, body.pushable > .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher:after {   -webkit-transform: translate3d(0px, 0, 0);           transform: translate3d(0px, 0, 0); }"), r = q(e += "</style>").appendTo(k), c.debug("Adding sizing css to head", r);
          }
        },
        refresh: function refresh() {
          c.verbose("Refreshing selector cache"), p = q(u.context), h = p.children(n.sidebar), v = p.children(n.pusher), p.children(n.fixed), c.clear.cache();
        },
        refreshSidebars: function refreshSidebars() {
          c.verbose("Refreshing other sidebars"), h = p.children(n.sidebar);
        },
        repaint: function repaint() {
          c.verbose("Forcing repaint event"), b.style.display = "none";
          b.offsetHeight;
          b.scrollTop = b.scrollTop, b.style.display = "";
        },
        setup: {
          cache: function cache() {
            c.cache = {
              width: g.outerWidth(),
              height: g.outerHeight(),
              rtl: "rtl" == g.css("direction")
            };
          },
          layout: function layout() {
            0 === p.children(n.pusher).length && (c.debug("Adding wrapper element for sidebar"), c.error(d.pusher), v = q('<div class="pusher" />'), p.children().not(n.omitted).not(h).wrapAll(v), c.refresh()), 0 !== g.nextAll(n.pusher).length && g.nextAll(n.pusher)[0] === v[0] || (c.debug("Moved sidebar to correct parent element"), c.error(d.movedSidebar, b), g.detach().prependTo(p), c.refresh()), c.clear.cache(), c.set.pushable(), c.set.direction();
          }
        },
        attachEvents: function attachEvents(e, t) {
          var n = q(e);
          t = q.isFunction(c[t]) ? c[t] : c.toggle, 0 < n.length ? (c.debug("Attaching sidebar events to element", e, t), n.on("click" + f, t)) : c.error(d.notFound, e);
        },
        show: function show(e) {
          if (e = q.isFunction(e) ? e : function () {}, c.is.hidden()) {
            if (c.refreshSidebars(), u.overlay && (c.error(d.overlay), u.transition = "overlay"), c.refresh(), c.othersActive()) if (c.debug("Other sidebars currently visible"), u.exclusive) {
              if ("overlay" != u.transition) return void c.hideOthers(c.show);
              c.hideOthers();
            } else u.transition = "overlay";
            c.pushPage(function () {
              e.call(b), u.onShow.call(b);
            }), u.onChange.call(b), u.onVisible.call(b);
          } else c.debug("Sidebar is already visible");
        },
        hide: function hide(e) {
          e = q.isFunction(e) ? e : function () {}, (c.is.visible() || c.is.animating()) && (c.debug("Hiding sidebar", e), c.refreshSidebars(), c.pullPage(function () {
            e.call(b), u.onHidden.call(b);
          }), u.onChange.call(b), u.onHide.call(b));
        },
        othersAnimating: function othersAnimating() {
          return 0 < h.not(g).filter("." + a.animating).length;
        },
        othersVisible: function othersVisible() {
          return 0 < h.not(g).filter("." + a.visible).length;
        },
        othersActive: function othersActive() {
          return c.othersVisible() || c.othersAnimating();
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
          c.verbose("Determining toggled direction"), c.is.hidden() ? c.show() : c.hide();
        },
        pushPage: function pushPage(t) {
          var e,
              n,
              _i,
              o = c.get.transition(),
              a = "overlay" === o || c.othersActive() ? g : v;

          t = q.isFunction(t) ? t : function () {}, "scale down" == u.transition && c.scrollToTop(), c.set.transition(o), c.repaint(), e = function e() {
            c.bind.clickaway(), c.add.inlineCSS(), c.set.animating(), c.set.visible();
          }, n = function n() {
            c.set.dimmed();
          }, _i = function i(e) {
            e.target == a[0] && (a.off(l + s, _i), c.remove.animating(), c.bind.scrollLock(), t.call(b));
          }, a.off(l + s), a.on(l + s, _i), D(e), u.dimPage && !c.othersVisible() && D(n);
        },
        pullPage: function pullPage(t) {
          var e,
              _n,
              i = c.get.transition(),
              o = "overlay" == i || c.othersActive() ? g : v;

          t = q.isFunction(t) ? t : function () {}, c.verbose("Removing context push state", c.get.direction()), c.unbind.clickaway(), c.unbind.scrollLock(), e = function e() {
            c.set.transition(i), c.set.animating(), c.remove.visible(), u.dimPage && !c.othersVisible() && v.removeClass(a.dimmed);
          }, _n = function n(e) {
            e.target == o[0] && (o.off(l + s, _n), c.remove.animating(), c.remove.transition(), c.remove.inlineCSS(), ("scale down" == i || u.returnScroll && c.is.mobile()) && c.scrollBack(), t.call(b));
          }, o.off(l + s), o.on(l + s, _n), D(e);
        },
        scrollToTop: function scrollToTop() {
          c.verbose("Scrolling to top of page to avoid animation issues"), t = q(L).scrollTop(), g.scrollTop(0), L.scrollTo(0, 0);
        },
        scrollBack: function scrollBack() {
          c.verbose("Scrolling back to original page position"), L.scrollTo(0, t);
        },
        clear: {
          cache: function cache() {
            c.verbose("Clearing cached dimensions"), c.cache = {};
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
            v.addClass(a.dimmed);
          },
          active: function active() {
            g.addClass(a.active);
          },
          animating: function animating() {
            g.addClass(a.animating);
          },
          transition: function transition(e) {
            e = e || c.get.transition(), g.addClass(e);
          },
          direction: function direction(e) {
            e = e || c.get.direction(), g.addClass(a[e]);
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
            c.debug("Removing inline css styles", r), r && 0 < r.length && r.remove();
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
            e = e || c.get.transition(), g.removeClass(e);
          },
          direction: function direction(e) {
            e = e || c.get.direction(), g.removeClass(a[e]);
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
                t = c.get.direction();
            return e = c.is.mobile() ? "auto" == u.mobileTransition ? u.defaultTransition.mobile[t] : u.mobileTransition : "auto" == u.transition ? u.defaultTransition.computer[t] : u.transition, c.verbose("Determined transition", e), e;
          },
          transitionEvent: function transitionEvent() {
            var e,
                t = j.createElement("element"),
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
            return !L.ActiveXObject && "ActiveXObject" in L || "ActiveXObject" in L;
          },
          ios: function ios() {
            var e = navigator.userAgent,
                t = e.match(o.ios),
                n = e.match(o.mobileChrome);
            return !(!t || n) && (c.verbose("Browser was found to be iOS", e), !0);
          },
          mobile: function mobile() {
            var e = navigator.userAgent;
            return e.match(o.mobile) ? (c.verbose("Browser was found to be mobile", e), !0) : (c.verbose("Browser is not mobile, using regular transition", e), !1);
          },
          hidden: function hidden() {
            return !c.is.visible();
          },
          visible: function visible() {
            return g.hasClass(a.visible);
          },
          open: function open() {
            return c.is.visible();
          },
          closed: function closed() {
            return c.is.hidden();
          },
          vertical: function vertical() {
            return g.hasClass(a.top);
          },
          animating: function animating() {
            return p.hasClass(a.animating);
          },
          rtl: function rtl() {
            return c.cache.rtl === z && (c.cache.rtl = "rtl" == g.css("direction")), c.cache.rtl;
          }
        },
        setting: function setting(e, t) {
          if (c.debug("Changing setting", e, t), q.isPlainObject(e)) q.extend(!0, u, e);else {
            if (t === z) return u[e];
            q.isPlainObject(u[e]) ? q.extend(!0, u[e], t) : u[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (q.isPlainObject(e)) q.extend(!0, c, e);else {
            if (t === z) return c[e];
            c[e] = t;
          }
        },
        debug: function debug() {
          !u.silent && u.debug && (u.performance ? c.performance.log(arguments) : (c.debug = Function.prototype.bind.call(console.info, console, u.name + ":"), c.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !u.silent && u.verbose && u.debug && (u.performance ? c.performance.log(arguments) : (c.verbose = Function.prototype.bind.call(console.info, console, u.name + ":"), c.verbose.apply(console, arguments)));
        },
        error: function error() {
          u.silent || (c.error = Function.prototype.bind.call(console.error, console, u.name + ":"), c.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var t, n;
            u.performance && (n = (t = new Date().getTime()) - (R || t), R = t, P.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: b,
              "Execution Time": n
            })), clearTimeout(c.performance.timer), c.performance.timer = setTimeout(c.performance.display, 500);
          },
          display: function display() {
            var e = u.name + ":",
                n = 0;
            R = !1, clearTimeout(c.performance.timer), q.each(P, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", A && (e += " '" + A + "'"), (console.group !== z || console.table !== z) && 0 < P.length && (console.groupCollapsed(e), console.table ? console.table(P) : q.each(P, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), P = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              a,
              n,
              r = y;
          return e = e || O, t = b || t, "string" == typeof i && r !== z && (i = i.split(/[\. ]/), o = i.length - 1, q.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (q.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== z) return a = r[n], !1;
              if (!q.isPlainObject(r[t]) || e == o) return r[t] !== z ? a = r[t] : c.error(d.method, i), !1;
              r = r[t];
            }
          })), q.isFunction(a) ? n = a.apply(t, e) : a !== z && (n = a), q.isArray(C) ? C.push(n) : C !== z ? C = [C, n] : n !== z && (C = n), a;
        }
      }, E ? (y === z && c.initialize(), c.invoke(F)) : (y !== z && c.invoke("destroy"), c.initialize());
    }), C !== z ? C : this;
  }, q.fn.sidebar.settings = {
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
        T = [],
        k = x,
        A = "string" == typeof k,
        R = [].slice.call(arguments, 1);
    return e.each(function () {
      var a,
          r,
          n,
          e,
          s,
          l,
          c = P.isPlainObject(x) ? P.extend(!0, {}, P.fn.api.settings, x) : P.extend({}, P.fn.api.settings),
          t = c.namespace,
          i = c.metadata,
          o = c.selector,
          u = c.error,
          d = c.className,
          f = "." + t,
          m = "module-" + t,
          g = P(this),
          p = g.closest(o.form),
          h = c.stateContext ? P(c.stateContext) : g,
          v = this,
          b = h[0],
          y = g.data(m);
      l = {
        initialize: function initialize() {
          A || l.bind.events(), l.instantiate();
        },
        instantiate: function instantiate() {
          l.verbose("Storing instance of module", l), y = l, g.data(m, y);
        },
        destroy: function destroy() {
          l.verbose("Destroying previous module for", v), g.removeData(m).off(f);
        },
        bind: {
          events: function events() {
            var e = l.get.event();
            e ? (l.verbose("Attaching API events to element", e), g.on(e + f, l.event.trigger)) : "now" == c.on && (l.debug("Querying API endpoint immediately"), l.query());
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
            if (F.Storage !== E) return t = sessionStorage.getItem(e), l.debug("Using cached response", e, t), t = l.decode.json(t);
            l.error(u.noStorage);
          }
        },
        write: {
          cachedResponse: function cachedResponse(e, t) {
            t && "" === t ? l.debug("Response empty, not caching", t) : F.Storage !== E ? (P.isPlainObject(t) && (t = JSON.stringify(t)), sessionStorage.setItem(e, t), l.verbose("Storing cached response for url", e, t)) : l.error(u.noStorage);
          }
        },
        query: function query() {
          if (l.is.disabled()) l.debug("Element is disabled API request aborted");else {
            if (l.is.loading()) {
              if (!c.interruptRequests) return void l.debug("Cancelling request, previous request is still pending");
              l.debug("Interrupting previous request"), l.abort();
            }

            if (c.defaultData && P.extend(!0, c.urlData, l.get.defaultData()), c.serializeForm && (c.data = l.add.formData(c.data)), !1 === (r = l.get.settings())) return l.cancelled = !0, void l.error(u.beforeSend);

            if (l.cancelled = !1, (n = l.get.templatedURL()) || l.is.mocked()) {
              if ((n = l.add.urlData(n)) || l.is.mocked()) {
                if (r.url = c.base + n, a = P.extend(!0, {}, c, {
                  type: c.method || c.type,
                  data: e,
                  url: c.base + n,
                  beforeSend: c.beforeXHR,
                  success: function success() {},
                  failure: function failure() {},
                  complete: function complete() {}
                }), l.debug("Querying URL", a.url), l.verbose("Using AJAX settings", a), "local" === c.cache && l.read.cachedResponse(n)) return l.debug("Response returned from local cache"), l.request = l.create.request(), void l.request.resolveWith(b, [l.read.cachedResponse(n)]);
                c.throttle ? c.throttleFirstRequest || l.timer ? (l.debug("Throttling request", c.throttle), clearTimeout(l.timer), l.timer = setTimeout(function () {
                  l.timer && delete l.timer, l.debug("Sending throttled request", e, a.method), l.send.request();
                }, c.throttle)) : (l.debug("Sending request", e, a.method), l.send.request(), l.timer = setTimeout(function () {}, c.throttle)) : (l.debug("Sending request", e, a.method), l.send.request());
              }
            } else l.error(u.missingURL);
          }
        },
        should: {
          removeError: function removeError() {
            return !0 === c.hideError || "auto" === c.hideError && !l.is.form();
          }
        },
        is: {
          disabled: function disabled() {
            return 0 < g.filter(o.disabled).length;
          },
          expectingJSON: function expectingJSON() {
            return "json" === c.dataType || "jsonp" === c.dataType;
          },
          form: function form() {
            return g.is("form") || h.is("form");
          },
          mocked: function mocked() {
            return c.mockResponse || c.mockResponseAsync || c.response || c.responseAsync;
          },
          input: function input() {
            return g.is("input");
          },
          loading: function loading() {
            return !!l.request && "pending" == l.request.state();
          },
          abortedRequest: function abortedRequest(e) {
            return e && e.readyState !== E && 0 === e.readyState ? (l.verbose("XHR request determined to be aborted"), !0) : (l.verbose("XHR request was not aborted"), !1);
          },
          validResponse: function validResponse(e) {
            return l.is.expectingJSON() && P.isFunction(c.successTest) ? (l.debug("Checking JSON returned success", c.successTest, e), c.successTest(e) ? (l.debug("Response passed success test", e), !0) : (l.debug("Response failed success test", e), !1)) : (l.verbose("Response is not JSON, skipping validation", c.successTest, e), !0);
          }
        },
        was: {
          cancelled: function cancelled() {
            return l.cancelled || !1;
          },
          succesful: function succesful() {
            return l.request && "resolved" == l.request.state();
          },
          failure: function failure() {
            return l.request && "rejected" == l.request.state();
          },
          complete: function complete() {
            return l.request && ("resolved" == l.request.state() || "rejected" == l.request.state());
          }
        },
        add: {
          urlData: function urlData(o, a) {
            var e, t;
            return o && (e = o.match(c.regExp.required), t = o.match(c.regExp.optional), a = a || c.urlData, e && (l.debug("Looking for required URL variables", e), P.each(e, function (e, t) {
              var n = -1 !== t.indexOf("$") ? t.substr(2, t.length - 3) : t.substr(1, t.length - 2),
                  i = P.isPlainObject(a) && a[n] !== E ? a[n] : g.data(n) !== E ? g.data(n) : h.data(n) !== E ? h.data(n) : a[n];
              if (i === E) return l.error(u.requiredParameter, n, o), o = !1;
              l.verbose("Found required variable", n, i), i = c.encodeParameters ? l.get.urlEncodedValue(i) : i, o = o.replace(t, i);
            })), t && (l.debug("Looking for optional URL variables", e), P.each(t, function (e, t) {
              var n = -1 !== t.indexOf("$") ? t.substr(3, t.length - 4) : t.substr(2, t.length - 3),
                  i = P.isPlainObject(a) && a[n] !== E ? a[n] : g.data(n) !== E ? g.data(n) : h.data(n) !== E ? h.data(n) : a[n];
              o = i !== E ? (l.verbose("Optional variable Found", n, i), o.replace(t, i)) : (l.verbose("Optional variable not found", n), -1 !== o.indexOf("/" + t) ? o.replace("/" + t, "") : o.replace(t, ""));
            }))), o;
          },
          formData: function formData(e) {
            var t = P.fn.serializeObject !== E,
                n = t ? p.serializeObject() : p.serialize();
            return e = e || c.data, e = P.isPlainObject(e) ? t ? (l.debug("Extending existing data with form data", e, n), P.extend(!0, {}, e, n)) : (l.error(u.missingSerialize), l.debug("Cant extend data. Replacing data with form data", e, n), n) : (l.debug("Adding form data", n), n);
          }
        },
        send: {
          request: function request() {
            l.set.loading(), l.request = l.create.request(), l.is.mocked() ? l.mockedXHR = l.create.mockedXHR() : l.xhr = l.create.xhr(), c.onRequest.call(b, l.request, l.xhr);
          }
        },
        event: {
          trigger: function trigger(e) {
            l.query(), "submit" != e.type && "click" != e.type || e.preventDefault();
          },
          xhr: {
            always: function always() {},
            done: function done(e, t, n) {
              var i = this,
                  o = new Date().getTime() - s,
                  a = c.loadingDuration - o,
                  r = !!P.isFunction(c.onResponse) && (l.is.expectingJSON() ? c.onResponse.call(i, P.extend(!0, {}, e)) : c.onResponse.call(i, e));
              a = 0 < a ? a : 0, r && (l.debug("Modified API response in onResponse callback", c.onResponse, r, e), e = r), 0 < a && l.debug("Response completed early delaying state change by", a), setTimeout(function () {
                l.is.validResponse(e) ? l.request.resolveWith(i, [e, n]) : l.request.rejectWith(i, [n, "invalid"]);
              }, a);
            },
            fail: function fail(e, t, n) {
              var i = this,
                  o = new Date().getTime() - s,
                  a = c.loadingDuration - o;
              0 < (a = 0 < a ? a : 0) && l.debug("Response completed early delaying state change by", a), setTimeout(function () {
                l.is.abortedRequest(e) ? l.request.rejectWith(i, [e, "aborted", n]) : l.request.rejectWith(i, [e, "error", t, n]);
              }, a);
            }
          },
          request: {
            done: function done(e, t) {
              l.debug("Successful API Response", e), "local" === c.cache && n && (l.write.cachedResponse(n, e), l.debug("Saving server response locally", l.cache)), c.onSuccess.call(b, e, g, t);
            },
            complete: function complete(e, t) {
              var n, i;
              l.was.succesful() ? (i = e, n = t) : (n = e, i = l.get.responseFromXHR(n)), l.remove.loading(), c.onComplete.call(b, i, g, n);
            },
            fail: function fail(e, t, n) {
              var i = l.get.responseFromXHR(e),
                  o = l.get.errorFromRequest(i, t, n);
              if ("aborted" == t) return l.debug("XHR Aborted (Most likely caused by page navigation or CORS Policy)", t, n), c.onAbort.call(b, t, g, e), !0;
              "invalid" == t ? l.debug("JSON did not pass success test. A server-side error has most likely occurred", i) : "error" == t && e !== E && (l.debug("XHR produced a server error", t, n), 200 != e.status && n !== E && "" !== n && l.error(u.statusMessage + n, a.url), c.onError.call(b, o, g, e)), c.errorDuration && "aborted" !== t && (l.debug("Adding error state"), l.set.error(), l.should.removeError() && setTimeout(l.remove.error, c.errorDuration)), l.debug("API Request failed", o, e), c.onFailure.call(b, i, g, e);
            }
          }
        },
        create: {
          request: function request() {
            return P.Deferred().always(l.event.request.complete).done(l.event.request.done).fail(l.event.request.fail);
          },
          mockedXHR: function mockedXHR() {
            var e,
                t,
                n,
                i = c.mockResponse || c.response,
                o = c.mockResponseAsync || c.responseAsync;
            return n = P.Deferred().always(l.event.xhr.complete).done(l.event.xhr.done).fail(l.event.xhr.fail), i ? (t = P.isFunction(i) ? (l.debug("Using specified synchronous callback", i), i.call(b, r)) : (l.debug("Using settings specified response", i), i), n.resolveWith(b, [t, !1, {
              responseText: t
            }])) : P.isFunction(o) && (e = function e(_e) {
              l.debug("Async callback returned response", _e), _e ? n.resolveWith(b, [_e, !1, {
                responseText: _e
              }]) : n.rejectWith(b, [{
                responseText: _e
              }, !1, !1]);
            }, l.debug("Using specified async response callback", o), o.call(b, r, e)), n;
          },
          xhr: function xhr() {
            var e;
            return e = P.ajax(a).always(l.event.xhr.always).done(l.event.xhr.done).fail(l.event.xhr.fail), l.verbose("Created server request", e, a), e;
          }
        },
        set: {
          error: function error() {
            l.verbose("Adding error state to element", h), h.addClass(d.error);
          },
          loading: function loading() {
            l.verbose("Adding loading state to element", h), h.addClass(d.loading), s = new Date().getTime();
          }
        },
        remove: {
          error: function error() {
            l.verbose("Removing error state from element", h), h.removeClass(d.error);
          },
          loading: function loading() {
            l.verbose("Removing loading state from element", h), h.removeClass(d.loading);
          }
        },
        get: {
          responseFromXHR: function responseFromXHR(e) {
            return !!P.isPlainObject(e) && (l.is.expectingJSON() ? l.decode.json(e.responseText) : e.responseText);
          },
          errorFromRequest: function errorFromRequest(e, t, n) {
            return P.isPlainObject(e) && e.error !== E ? e.error : c.error[t] !== E ? c.error[t] : n;
          },
          request: function request() {
            return l.request || !1;
          },
          xhr: function xhr() {
            return l.xhr || !1;
          },
          settings: function settings() {
            var e;
            return (e = c.beforeSend.call(b, c)) && (e.success !== E && (l.debug("Legacy success callback detected", e), l.error(u.legacyParameters, e.success), e.onSuccess = e.success), e.failure !== E && (l.debug("Legacy failure callback detected", e), l.error(u.legacyParameters, e.failure), e.onFailure = e.failure), e.complete !== E && (l.debug("Legacy complete callback detected", e), l.error(u.legacyParameters, e.complete), e.onComplete = e.complete)), e === E && l.error(u.noReturnedValue), !1 === e ? e : e !== E ? P.extend(!0, {}, e) : P.extend(!0, {}, c);
          },
          urlEncodedValue: function urlEncodedValue(e) {
            var t = F.decodeURIComponent(e),
                n = F.encodeURIComponent(e);
            return t !== e ? (l.debug("URL value is already encoded, avoiding double encoding", e), e) : (l.verbose("Encoding value using encodeURIComponent", e, n), n);
          },
          defaultData: function defaultData() {
            var e = {};
            return P.isWindow(v) || (l.is.input() ? e.value = g.val() : l.is.form() || (e.text = g.text())), e;
          },
          event: function event() {
            return P.isWindow(v) || "now" == c.on ? (l.debug("API called without element, no events attached"), !1) : "auto" == c.on ? g.is("input") ? v.oninput !== E ? "input" : v.onpropertychange !== E ? "propertychange" : "keyup" : g.is("form") ? "submit" : "click" : c.on;
          },
          templatedURL: function templatedURL(e) {
            if (e = e || g.data(i.action) || c.action || !1, n = g.data(i.url) || c.url || !1) return l.debug("Using specified url", n), n;

            if (e) {
              if (l.debug("Looking up url for action", e, c.api), c.api[e] === E && !l.is.mocked()) return void l.error(u.missingAction, c.action, c.api);
              n = c.api[e];
            } else l.is.form() && (n = g.attr("action") || h.attr("action") || !1, l.debug("No url or action specified, defaulting to form action", n));

            return n;
          }
        },
        abort: function abort() {
          var e = l.get.xhr();
          e && "resolved" !== e.state() && (l.debug("Cancelling API request"), e.abort());
        },
        reset: function reset() {
          l.remove.error(), l.remove.loading();
        },
        setting: function setting(e, t) {
          if (l.debug("Changing setting", e, t), P.isPlainObject(e)) P.extend(!0, c, e);else {
            if (t === E) return c[e];
            P.isPlainObject(c[e]) ? P.extend(!0, c[e], t) : c[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (P.isPlainObject(e)) P.extend(!0, l, e);else {
            if (t === E) return l[e];
            l[e] = t;
          }
        },
        debug: function debug() {
          !c.silent && c.debug && (c.performance ? l.performance.log(arguments) : (l.debug = Function.prototype.bind.call(console.info, console, c.name + ":"), l.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !c.silent && c.verbose && c.debug && (c.performance ? l.performance.log(arguments) : (l.verbose = Function.prototype.bind.call(console.info, console, c.name + ":"), l.verbose.apply(console, arguments)));
        },
        error: function error() {
          c.silent || (l.error = Function.prototype.bind.call(console.error, console, c.name + ":"), l.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var t, n;
            c.performance && (n = (t = new Date().getTime()) - (S || t), S = t, T.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              "Execution Time": n
            })), clearTimeout(l.performance.timer), l.performance.timer = setTimeout(l.performance.display, 500);
          },
          display: function display() {
            var e = c.name + ":",
                n = 0;
            S = !1, clearTimeout(l.performance.timer), P.each(T, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", w && (e += " '" + w + "'"), (console.group !== E || console.table !== E) && 0 < T.length && (console.groupCollapsed(e), console.table ? console.table(T) : P.each(T, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), T = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              a,
              n,
              r = y;
          return e = e || R, t = v || t, "string" == typeof i && r !== E && (i = i.split(/[\. ]/), o = i.length - 1, P.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (P.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== E) return a = r[n], !1;
              if (!P.isPlainObject(r[t]) || e == o) return r[t] !== E ? a = r[t] : l.error(u.method, i), !1;
              r = r[t];
            }
          })), P.isFunction(a) ? n = a.apply(t, e) : a !== E && (n = a), P.isArray(C) ? C.push(n) : C !== E ? C = [C, n] : n !== E && (C = n), a;
        }
      }, A ? (y === E && l.initialize(), l.invoke(k)) : (y !== E && y.invoke("destroy"), l.initialize());
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
    var c,
        r = C(this),
        g = r.selector || "",
        p = new Date().getTime(),
        h = [],
        v = arguments,
        b = v[0],
        y = [].slice.call(arguments, 1),
        x = "string" == typeof b;
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
          l = this;
      (f = {
        initialize: function initialize() {
          u = f.get.settings.apply(l, v), d = u.className, t = u.error, n = u.metadata, a = "." + u.namespace, e = "module-" + u.namespace, s = m.data(e) || f, o = f.get.animationEndEvent(), x && (x = f.invoke(b)), !1 === x && (f.verbose("Converted arguments into settings object", u), u.interval ? f.delay(u.animate) : f.animate(), f.instantiate());
        },
        instantiate: function instantiate() {
          f.verbose("Storing instance of module", f), s = f, m.data(e, s);
        },
        destroy: function destroy() {
          f.verbose("Destroying previous module for", l), m.removeData(e);
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
          l.offsetWidth;
        },
        delay: function delay(e) {
          var t,
              n = f.get.animationDirection();
          n || (n = f.can.transition() ? f.get.direction() : "static"), e = e !== S ? e : u.interval, t = "auto" == u.reverse && n == d.outward || 1 == u.reverse ? (r.length - i) * u.interval : i * u.interval, f.debug("Delaying animation by", t), setTimeout(f.animate, t);
        },
        animate: function animate(e) {
          if (u = e || u, !f.is.supported()) return f.error(t.support), !1;

          if (f.debug("Preparing animation", u.animation), f.is.animating()) {
            if (u.queue) return !u.allowRepeats && f.has.direction() && f.is.occurring() && !0 !== f.queuing ? f.debug("Animation is currently occurring, preventing queueing same animation", u.animation) : f.queue(u.animation), !1;
            if (!u.allowRepeats && f.is.occurring()) return f.debug("Animation is already occurring, will not execute repeated animation", u.animation), !1;
            f.debug("New animation started, completing previous early", u.animation), s.complete();
          }

          f.can.animate() ? f.set.animating(u.animation) : f.error(t.noAnimation, u.animation, l);
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
          f.debug("Animation complete", u.animation), f.remove.completeCallback(), f.remove.failSafe(), f.is.looping() || (f.is.outward() ? (f.verbose("Animation is outward, hiding element"), f.restore.conditions(), f.hide()) : f.is.inward() ? (f.verbose("Animation is outward, showing element"), f.restore.conditions(), f.show()) : (f.verbose("Static animation completed"), f.restore.conditions(), u.onComplete.call(l)));
        },
        force: {
          visible: function visible() {
            var e = m.attr("style"),
                t = f.get.userStyle(),
                n = f.get.displayType(),
                i = t + "display: " + n + " !important;",
                o = m.css("display"),
                a = e === S || "" === e;
            o !== n ? (f.verbose("Overriding default display to show element", n), m.attr("style", i)) : a && m.removeAttr("style");
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
            e = e || f.get.animationClass(), f.debug("Starting tween", e), m.addClass(e).one(o + ".complete" + a, f.complete), u.useFailSafe && f.add.failSafe(), f.set.duration(u.duration), u.onStart.call(l);
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
                a,
                r,
                s = u.animation,
                l = f.get.transitionExists(s),
                c = f.get.displayType(!1);

            if (l === S || e) {
              if (f.verbose("Determining whether animation exists"), t = m.attr("class"), n = m.prop("tagName"), o = (i = C("<" + n + " />").addClass(t).insertAfter(m)).addClass(s).removeClass(d.inward).removeClass(d.outward).addClass(d.animating).addClass(d.transition).css("animationName"), a = i.addClass(d.inward).css("animationName"), c || (c = i.attr("class", t).removeAttr("style").removeClass(d.hidden).removeClass(d.visible).show().css("display"), f.verbose("Determining final display state", c), f.save.displayType(c)), i.remove(), o != a) f.debug("Direction exists for animation", s), r = !0;else {
                if ("none" == o || !o) return void f.debug("No animation defined in css", s);
                f.debug("Static animation found", s, c), r = !1;
              }
              f.save.transitionExists(s, r);
            }

            return l !== S ? l : r;
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
          f.verbose("Hiding element"), f.is.animating() && f.reset(), l.blur(), f.remove.display(), f.remove.visible(), f.set.hidden(), f.force.hidden(), u.onHide.call(l), u.onComplete.call(l);
        },
        show: function show(e) {
          f.verbose("Showing element", e), f.remove.hidden(), f.set.visible(), f.force.visible(), u.onShow.call(l), u.onComplete.call(l);
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
              Element: l,
              "Execution Time": n
            })), clearTimeout(f.performance.timer), f.performance.timer = setTimeout(f.performance.display, 500);
          },
          display: function display() {
            var e = u.name + ":",
                n = 0;
            p = !1, clearTimeout(f.performance.timer), C.each(h, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", g && (e += " '" + g + "'"), 1 < r.length && (e += " (" + r.length + ")"), (console.group !== S || console.table !== S) && 0 < h.length && (console.groupCollapsed(e), console.table ? console.table(h) : C.each(h, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), h = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              a,
              n,
              r = s;
          return e = e || y, t = l || t, "string" == typeof i && r !== S && (i = i.split(/[\. ]/), o = i.length - 1, C.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (C.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== S) return a = r[n], !1;
              if (!C.isPlainObject(r[t]) || e == o) return r[t] !== S && (a = r[t]), !1;
              r = r[t];
            }
          })), C.isFunction(a) ? n = a.apply(t, e) : a !== S && (n = a), C.isArray(c) ? c.push(n) : c !== S ? c = [c, n] : n !== S && (c = n), a !== S && a;
        }
      }).initialize();
    }), c !== S ? c : this;
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
}(jQuery, window, document), function (S, e, T, k) {
  "use strict";

  e = void 0 !== e && e.Math == Math ? e : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), S.fn.dimmer = function (p) {
    var h,
        v = S(this),
        b = new Date().getTime(),
        y = [],
        x = p,
        C = "string" == typeof x,
        w = [].slice.call(arguments, 1);
    return v.each(function () {
      var a,
          t,
          s,
          r = S.isPlainObject(p) ? S.extend(!0, {}, S.fn.dimmer.settings, p) : S.extend({}, S.fn.dimmer.settings),
          n = r.selector,
          e = r.namespace,
          i = r.className,
          l = r.error,
          o = "." + e,
          c = "module-" + e,
          u = v.selector || "",
          d = "ontouchstart" in T.documentElement ? "touchstart" : "click",
          f = S(this),
          m = this,
          g = f.data(c);
      (s = {
        preinitialize: function preinitialize() {
          a = s.is.dimmer() ? (t = f.parent(), f) : (t = f, s.has.dimmer() ? r.dimmerName ? t.find(n.dimmer).filter("." + r.dimmerName) : t.find(n.dimmer) : s.create());
        },
        initialize: function initialize() {
          s.debug("Initializing dimmer", r), s.bind.events(), s.set.dimmable(), s.instantiate();
        },
        instantiate: function instantiate() {
          s.verbose("Storing instance of module", s), g = s, f.data(c, g);
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
            f.removeData(c), t.off(o);
          }
        },
        event: {
          click: function click(e) {
            s.verbose("Determining if event occured on dimmer", e), (0 === a.find(e.target).length || S(e.target).is(n.content)) && (s.hide(), e.stopImmediatePropagation());
          }
        },
        addContent: function addContent(e) {
          var t = S(e);
          s.debug("Add content to dimmer", t), t.parent()[0] !== a[0] && t.detach().appendTo(a);
        },
        create: function create() {
          var e = S(r.template.dimmer());
          return r.dimmerName && (s.debug("Creating named dimmer", r.dimmerName), e.addClass(r.dimmerName)), e.appendTo(t), e;
        },
        show: function show(e) {
          e = S.isFunction(e) ? e : function () {}, s.debug("Showing dimmer", a, r), s.set.variation(), s.is.dimmed() && !s.is.animating() || !s.is.enabled() ? s.debug("Dimmer is already shown or disabled") : (s.animate.show(e), r.onShow.call(m), r.onChange.call(m));
        },
        hide: function hide(e) {
          e = S.isFunction(e) ? e : function () {}, s.is.dimmed() || s.is.animating() ? (s.debug("Hiding dimmer", a), s.animate.hide(e), r.onHide.call(m), r.onChange.call(m)) : s.debug("Dimmer is not visible");
        },
        toggle: function toggle() {
          s.verbose("Toggling dimmer visibility", a), s.is.dimmed() ? s.hide() : s.show();
        },
        animate: {
          show: function show(e) {
            e = S.isFunction(e) ? e : function () {}, r.useCSS && S.fn.transition !== k && a.transition("is supported") ? (r.useFlex ? (s.debug("Using flex dimmer"), s.remove.legacy()) : (s.debug("Using legacy non-flex dimmer"), s.set.legacy()), "auto" !== r.opacity && s.set.opacity(), a.transition({
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
            e = S.isFunction(e) ? e : function () {}, r.useCSS && S.fn.transition !== k && a.transition("is supported") ? (s.verbose("Hiding dimmer with css"), a.transition({
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
          if (s.debug("Changing setting", e, t), S.isPlainObject(e)) S.extend(!0, r, e);else {
            if (t === k) return r[e];
            S.isPlainObject(r[e]) ? S.extend(!0, r[e], t) : r[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (S.isPlainObject(e)) S.extend(!0, s, e);else {
            if (t === k) return s[e];
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
            r.performance && (n = (t = new Date().getTime()) - (b || t), b = t, y.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: m,
              "Execution Time": n
            })), clearTimeout(s.performance.timer), s.performance.timer = setTimeout(s.performance.display, 500);
          },
          display: function display() {
            var e = r.name + ":",
                n = 0;
            b = !1, clearTimeout(s.performance.timer), S.each(y, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", u && (e += " '" + u + "'"), 1 < v.length && (e += " (" + v.length + ")"), (console.group !== k || console.table !== k) && 0 < y.length && (console.groupCollapsed(e), console.table ? console.table(y) : S.each(y, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), y = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              a,
              n,
              r = g;
          return e = e || w, t = m || t, "string" == typeof i && r !== k && (i = i.split(/[\. ]/), o = i.length - 1, S.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (S.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== k) return a = r[n], !1;
              if (!S.isPlainObject(r[t]) || e == o) return r[t] !== k ? a = r[t] : s.error(l.method, i), !1;
              r = r[t];
            }
          })), S.isFunction(a) ? n = a.apply(t, e) : a !== k && (n = a), S.isArray(h) ? h.push(n) : h !== k ? h = [h, n] : n !== k && (h = n), a;
        }
      }).preinitialize(), C ? (g === k && s.initialize(), s.invoke(x)) : (g !== k && g.invoke("destroy"), s.initialize());
    }), h !== k ? h : this;
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
}(jQuery, window, document), function (L, j, z, I) {
  "use strict";

  j = void 0 !== j && j.Math == Math ? j : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), L.fn.modal = function (w) {
    var S,
        e = L(this),
        T = L(j),
        k = L(z),
        A = L("body"),
        R = e.selector || "",
        P = new Date().getTime(),
        F = [],
        E = w,
        O = "string" == typeof E,
        D = [].slice.call(arguments, 1),
        q = j.requestAnimationFrame || j.mozRequestAnimationFrame || j.webkitRequestAnimationFrame || j.msRequestAnimationFrame || function (e) {
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
          l,
          c = L.isPlainObject(w) ? L.extend(!0, {}, L.fn.modal.settings, w) : L.extend({}, L.fn.modal.settings),
          u = c.selector,
          d = c.className,
          f = c.namespace,
          m = c.error,
          g = "." + f,
          p = "module-" + f,
          h = L(this),
          v = L(c.context),
          b = h.find(u.close),
          y = this,
          x = h.data(p),
          C = !1;
      l = {
        initialize: function initialize() {
          l.verbose("Initializing dimmer", v), l.create.id(), l.create.dimmer(), l.refreshModals(), l.bind.events(), c.observeChanges && l.observeChanges(), l.instantiate();
        },
        instantiate: function instantiate() {
          l.verbose("Storing instance of modal"), x = l, h.data(p, x);
        },
        create: {
          dimmer: function dimmer() {
            var e = {
              debug: c.debug,
              variation: !c.centered && "top aligned",
              dimmerName: "modals"
            },
                t = L.extend(!0, e, c.dimmerSettings);
            L.fn.dimmer !== I ? (l.debug("Creating dimmer"), o = v.dimmer(t), c.detachable ? (l.verbose("Modal is detachable, moving content into dimmer"), o.dimmer("add content", h)) : l.set.undetached(), a = o.dimmer("get dimmer")) : l.error(m.dimmer);
          },
          id: function id() {
            r = (Math.random().toString(16) + "000000000").substr(2, 8), t = "." + r, l.verbose("Creating unique id for element", r);
          }
        },
        destroy: function destroy() {
          l.verbose("Destroying previous modal"), h.removeData(p).off(g), T.off(t), a.off(t), b.off(g), v.dimmer("destroy");
        },
        observeChanges: function observeChanges() {
          "MutationObserver" in j && ((s = new MutationObserver(function (e) {
            l.debug("DOM tree modified, refreshing"), l.refresh();
          })).observe(y, {
            childList: !0,
            subtree: !0
          }), l.debug("Setting up mutation observer", s));
        },
        refresh: function refresh() {
          l.remove.scrolling(), l.cacheSizes(), l.can.useFlex() || l.set.modalOffset(), l.set.screenHeight(), l.set.type();
        },
        refreshModals: function refreshModals() {
          i = h.siblings(u.modal), n = i.add(h);
        },
        attachEvents: function attachEvents(e, t) {
          var n = L(e);
          t = L.isFunction(l[t]) ? l[t] : l.toggle, 0 < n.length ? (l.debug("Attaching modal events to element", e, t), n.off(g).on("click" + g, t)) : l.error(m.notFound, e);
        },
        bind: {
          events: function events() {
            l.verbose("Attaching events"), h.on("click" + g, u.close, l.event.close).on("click" + g, u.approve, l.event.approve).on("click" + g, u.deny, l.event.deny), T.on("resize" + t, l.event.resize);
          },
          scrollLock: function scrollLock() {
            o.get(0).addEventListener("touchmove", l.event.preventScroll, {
              passive: !1
            });
          }
        },
        unbind: {
          scrollLock: function scrollLock() {
            o.get(0).removeEventListener("touchmove", l.event.preventScroll, {
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
            C || !1 === c.onApprove.call(y, L(this)) ? l.verbose("Approve callback returned false cancelling hide") : (C = !0, l.hide(function () {
              C = !1;
            }));
          },
          preventScroll: function preventScroll(e) {
            e.preventDefault();
          },
          deny: function deny() {
            C || !1 === c.onDeny.call(y, L(this)) ? l.verbose("Deny callback returned false cancelling hide") : (C = !0, l.hide(function () {
              C = !1;
            }));
          },
          close: function close() {
            l.hide();
          },
          click: function click(e) {
            if (c.closable) {
              var t = 0 < L(e.target).closest(u.modal).length,
                  n = L.contains(z.documentElement, e.target);
              !t && n && l.is.active() && (l.debug("Dimmer clicked, hiding all modals"), l.remove.clickaway(), c.allowMultiple ? l.hide() : l.hideAll());
            } else l.verbose("Dimmer clicked but closable setting is disabled");
          },
          debounce: function debounce(e, t) {
            clearTimeout(l.timer), l.timer = setTimeout(e, t);
          },
          keyboard: function keyboard(e) {
            27 == e.which && (c.closable ? (l.debug("Escape key pressed hiding modal"), l.hide()) : l.debug("Escape key pressed, but closable is set to false"), e.preventDefault());
          },
          resize: function resize() {
            o.dimmer("is active") && (l.is.animating() || l.is.active()) && q(l.refresh);
          }
        },
        toggle: function toggle() {
          l.is.active() || l.is.animating() ? l.hide() : l.show();
        },
        show: function show(e) {
          e = L.isFunction(e) ? e : function () {}, l.refreshModals(), l.set.dimmerSettings(), l.set.dimmerStyles(), l.showModal(e);
        },
        hide: function hide(e) {
          e = L.isFunction(e) ? e : function () {}, l.refreshModals(), l.hideModal(e);
        },
        showModal: function showModal(e) {
          e = L.isFunction(e) ? e : function () {}, l.is.animating() || !l.is.active() ? (l.showDimmer(), l.cacheSizes(), l.can.useFlex() ? l.remove.legacy() : (l.set.legacy(), l.set.modalOffset(), l.debug("Using non-flex legacy modal positioning.")), l.set.screenHeight(), l.set.type(), l.set.clickaway(), !c.allowMultiple && l.others.active() ? l.hideOthers(l.showModal) : (c.allowMultiple && c.detachable && h.detach().appendTo(a), c.onShow.call(y), c.transition && L.fn.transition !== I && h.transition("is supported") ? (l.debug("Showing modal with css animations"), h.transition({
            debug: c.debug,
            animation: c.transition + " in",
            queue: c.queue,
            duration: c.duration,
            useFailSafe: !0,
            onComplete: function onComplete() {
              c.onVisible.apply(y), c.keyboardShortcuts && l.add.keyboardShortcuts(), l.save.focus(), l.set.active(), c.autofocus && l.set.autofocus(), e();
            }
          })) : l.error(m.noTransition))) : l.debug("Modal is already visible");
        },
        hideModal: function hideModal(e, t) {
          e = L.isFunction(e) ? e : function () {}, l.debug("Hiding modal"), !1 !== c.onHide.call(y, L(this)) ? (l.is.animating() || l.is.active()) && (c.transition && L.fn.transition !== I && h.transition("is supported") ? (l.remove.active(), h.transition({
            debug: c.debug,
            animation: c.transition + " out",
            queue: c.queue,
            duration: c.duration,
            useFailSafe: !0,
            onStart: function onStart() {
              l.others.active() || t || l.hideDimmer(), c.keyboardShortcuts && l.remove.keyboardShortcuts();
            },
            onComplete: function onComplete() {
              c.onHidden.call(y), l.remove.dimmerStyles(), l.restore.focus(), e();
            }
          })) : l.error(m.noTransition)) : l.verbose("Hide callback returned false cancelling hide");
        },
        showDimmer: function showDimmer() {
          o.dimmer("is animating") || !o.dimmer("is active") ? (l.debug("Showing dimmer"), o.dimmer("show")) : l.debug("Dimmer already visible");
        },
        hideDimmer: function hideDimmer() {
          o.dimmer("is animating") || o.dimmer("is active") ? (l.unbind.scrollLock(), o.dimmer("hide", function () {
            l.remove.clickaway(), l.remove.screenHeight();
          })) : l.debug("Dimmer is not visible cannot hide");
        },
        hideAll: function hideAll(e) {
          var t = n.filter("." + d.active + ", ." + d.animating);
          e = L.isFunction(e) ? e : function () {}, 0 < t.length && (l.debug("Hiding all visible modals"), l.hideDimmer(), t.modal("hide modal", e));
        },
        hideOthers: function hideOthers(e) {
          var t = i.filter("." + d.active + ", ." + d.animating);
          e = L.isFunction(e) ? e : function () {}, 0 < t.length && (l.debug("Hiding other modals", i), t.modal("hide modal", e, !0));
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
            l.verbose("Adding keyboard shortcuts"), k.on("keyup" + g, l.event.keyboard);
          }
        },
        save: {
          focus: function focus() {
            0 < L(z.activeElement).closest(h).length || (e = L(z.activeElement).blur());
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
            "" === A.attr("style") && (l.verbose("Removing style attribute"), A.removeAttr("style"));
          },
          screenHeight: function screenHeight() {
            l.debug("Removing page height"), A.css("height", "");
          },
          keyboardShortcuts: function keyboardShortcuts() {
            l.verbose("Removing keyboard shortcuts"), k.off("keyup" + g);
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
          l.cache !== I && 0 === n || (l.cache = {
            pageHeight: L(z).outerHeight(),
            width: t,
            height: n + c.offset,
            scrollHeight: e + c.offset,
            contextHeight: "body" == c.context ? L(j).height() : o.height()
          }, l.cache.topOffset = -l.cache.height / 2), h.removeClass(d.loading), l.debug("Caching modal and container sizes", l.cache);
        },
        can: {
          useFlex: function useFlex() {
            return "auto" == c.useFlex ? c.detachable && !l.is.ie() : c.useFlex;
          },
          fit: function fit() {
            var e = l.cache.contextHeight,
                t = l.cache.contextHeight / 2,
                n = l.cache.topOffset,
                i = l.cache.scrollHeight,
                o = l.cache.height,
                a = c.padding;
            return o < i ? t + n + i + a < e : o + 2 * a < e;
          }
        },
        is: {
          active: function active() {
            return h.hasClass(d.active);
          },
          ie: function ie() {
            return !j.ActiveXObject && "ActiveXObject" in j || "ActiveXObject" in j;
          },
          animating: function animating() {
            return h.transition("is supported") ? h.transition("is animating") : h.is(":visible");
          },
          scrolling: function scrolling() {
            return o.hasClass(d.scrolling);
          },
          modernBrowser: function modernBrowser() {
            return !(j.ActiveXObject || "ActiveXObject" in j);
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
            a.on("click" + t, l.event.click);
          },
          dimmerSettings: function dimmerSettings() {
            if (L.fn.dimmer !== I) {
              var e = {
                debug: c.debug,
                dimmerName: "modals",
                closable: "auto",
                useFlex: l.can.useFlex(),
                variation: !c.centered && "top aligned",
                duration: {
                  show: c.duration,
                  hide: c.duration
                }
              },
                  t = L.extend(!0, e, c.dimmerSettings);
              c.inverted && (t.variation = t.variation !== I ? t.variation + " inverted" : "inverted"), v.dimmer("setting", t);
            } else l.error(m.dimmer);
          },
          dimmerStyles: function dimmerStyles() {
            c.inverted ? a.addClass(d.inverted) : a.removeClass(d.inverted), c.blurring ? o.addClass(d.blurring) : o.removeClass(d.blurring);
          },
          modalOffset: function modalOffset() {
            var e = l.cache.width,
                t = l.cache.height;
            h.css({
              marginTop: c.centered && l.can.fit() ? -t / 2 : 0,
              marginLeft: -e / 2
            }), l.verbose("Setting modal offset for legacy mode");
          },
          screenHeight: function screenHeight() {
            l.can.fit() ? A.css("height", "") : (l.debug("Modal is taller than page content, resizing page height"), A.css("height", l.cache.height + 2 * c.padding));
          },
          active: function active() {
            h.addClass(d.active);
          },
          scrolling: function scrolling() {
            o.addClass(d.scrolling), h.addClass(d.scrolling), l.unbind.scrollLock();
          },
          legacy: function legacy() {
            h.addClass(d.legacy);
          },
          type: function type() {
            l.can.fit() ? (l.verbose("Modal fits on screen"), l.others.active() || l.others.animating() || (l.remove.scrolling(), l.bind.scrollLock())) : (l.verbose("Modal cannot fit on screen setting to scrolling"), l.set.scrolling());
          },
          undetached: function undetached() {
            o.addClass(d.undetached);
          }
        },
        setting: function setting(e, t) {
          if (l.debug("Changing setting", e, t), L.isPlainObject(e)) L.extend(!0, c, e);else {
            if (t === I) return c[e];
            L.isPlainObject(c[e]) ? L.extend(!0, c[e], t) : c[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (L.isPlainObject(e)) L.extend(!0, l, e);else {
            if (t === I) return l[e];
            l[e] = t;
          }
        },
        debug: function debug() {
          !c.silent && c.debug && (c.performance ? l.performance.log(arguments) : (l.debug = Function.prototype.bind.call(console.info, console, c.name + ":"), l.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !c.silent && c.verbose && c.debug && (c.performance ? l.performance.log(arguments) : (l.verbose = Function.prototype.bind.call(console.info, console, c.name + ":"), l.verbose.apply(console, arguments)));
        },
        error: function error() {
          c.silent || (l.error = Function.prototype.bind.call(console.error, console, c.name + ":"), l.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var t, n;
            c.performance && (n = (t = new Date().getTime()) - (P || t), P = t, F.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: y,
              "Execution Time": n
            })), clearTimeout(l.performance.timer), l.performance.timer = setTimeout(l.performance.display, 500);
          },
          display: function display() {
            var e = c.name + ":",
                n = 0;
            P = !1, clearTimeout(l.performance.timer), L.each(F, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", R && (e += " '" + R + "'"), (console.group !== I || console.table !== I) && 0 < F.length && (console.groupCollapsed(e), console.table ? console.table(F) : L.each(F, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), F = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              a,
              n,
              r = x;
          return e = e || D, t = y || t, "string" == typeof i && r !== I && (i = i.split(/[\. ]/), o = i.length - 1, L.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (L.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== I) return a = r[n], !1;
              if (!L.isPlainObject(r[t]) || e == o) return r[t] !== I && (a = r[t]), !1;
              r = r[t];
            }
          })), L.isFunction(a) ? n = a.apply(t, e) : a !== I && (n = a), L.isArray(S) ? S.push(n) : S !== I ? S = [S, n] : n !== I && (S = n), a;
        }
      }, O ? (x === I && l.initialize(), l.invoke(E)) : (x !== I && x.invoke("destroy"), l.initialize());
    }), S !== I ? S : this;
  }, L.fn.modal.settings = {
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
}(jQuery, window, document), function (E, e, O, D) {
  "use strict";

  e = void 0 !== e && e.Math == Math ? e : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), E.fn.form = function (x) {
    var C,
        w = E(this),
        S = w.selector || "",
        T = new Date().getTime(),
        k = [],
        A = x,
        R = arguments[1],
        P = "string" == typeof A,
        F = [].slice.call(arguments, 1);
    return w.each(function () {
      var n,
          l,
          t,
          e,
          d,
          c,
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
          r = E(this),
          v = this,
          b = [],
          y = !1;
      (h = {
        initialize: function initialize() {
          h.get.settings(), P ? (p === D && h.instantiate(), h.invoke(A)) : (p !== D && p.invoke("destroy"), h.verbose("Initializing form validation", r, d), h.bindEvents(), h.set.defaults(), h.instantiate());
        },
        instantiate: function instantiate() {
          h.verbose("Storing instance of module", h), p = h, r.data(a, h);
        },
        destroy: function destroy() {
          h.verbose("Destroying previous module", p), h.removeEvents(), r.removeData(a);
        },
        refresh: function refresh() {
          h.verbose("Refreshing selector cache"), n = r.find(f.field), l = r.find(f.group), t = r.find(f.message), r.find(f.prompt), e = r.find(f.submit), r.find(f.clear), r.find(f.reset);
        },
        submit: function submit() {
          h.verbose("Submitting form", r), r.submit();
        },
        attachEvents: function attachEvents(e, t) {
          t = t || "submit", E(e).on("click" + g, function (e) {
            h[t](), e.preventDefault();
          });
        },
        bindEvents: function bindEvents() {
          h.verbose("Attaching form events"), r.on("submit" + g, h.validate.form).on("blur" + g, f.field, h.event.field.blur).on("click" + g, f.submit, h.submit).on("click" + g, f.reset, h.reset).on("click" + g, f.clear, h.clear), d.keyboardShortcuts && r.on("keydown" + g, f.field, h.event.field.keydown), n.each(function () {
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
                n = e.closest(l),
                i = n.find(f.prompt),
                o = e.data(u.defaultValue) || "",
                a = t.is(f.uiCheckbox),
                r = t.is(f.uiDropdown);
            n.hasClass(m.error) && (h.verbose("Resetting error on field", n), n.removeClass(m.error), i.remove()), r ? (h.verbose("Resetting dropdown value", t, o), t.dropdown("clear")) : a ? e.prop("checked", !1) : (h.verbose("Resetting field value", e, o), e.val(""));
          });
        },
        reset: function reset() {
          n.each(function () {
            var e = E(this),
                t = e.parent(),
                n = e.closest(l),
                i = n.find(f.prompt),
                o = e.data(u.defaultValue),
                a = t.is(f.uiCheckbox),
                r = t.is(f.uiDropdown),
                s = n.hasClass(m.error);
            o !== D && (s && (h.verbose("Resetting error on field", n), n.removeClass(m.error), i.remove()), r ? (h.verbose("Resetting dropdown value", t, o), t.dropdown("restore defaults")) : a ? (h.verbose("Resetting checkbox value", t, o), e.prop("checked", o)) : (h.verbose("Resetting field value", e, o), e.val(o)));
          });
        },
        determine: {
          isValid: function isValid() {
            var n = !0;
            return E.each(c, function (e, t) {
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
            return e ? (h.verbose("Checking if field is valid", e), h.validate.field(c[e], e, !1)) : (h.verbose("Checking if form is valid"), E.each(c, function (e, t) {
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
              var t = E(this),
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
              var t = E(this),
                  n = t.closest(l),
                  i = h.get.validation(t);
              n.hasClass(m.error) ? (h.debug("Revalidating field", t, i), i && h.validate.field(i)) : "blur" == d.on && i && h.validate.field(i);
            },
            change: function change(e) {
              var t = E(this),
                  n = t.closest(l),
                  i = h.get.validation(t);
              i && ("change" == d.on || n.hasClass(m.error) && d.revalidate) && (clearTimeout(h.timer), h.timer = setTimeout(function () {
                h.debug("Revalidating field", t, h.get.validation(t)), h.validate.field(i);
              }, d.delay));
            }
          }
        },
        get: {
          ancillaryValue: function ancillaryValue(e) {
            return !(!e.type || !e.value && !h.is.bracketedRule(e)) && (e.value !== D ? e.value : e.type.match(d.regExp.bracket)[1] + "");
          },
          ruleName: function ruleName(e) {
            return h.is.bracketedRule(e) ? e.type.replace(e.type.match(d.regExp.bracket)[0], "") : e.type;
          },
          changeEvent: function changeEvent(e, t) {
            return "checkbox" == e || "radio" == e || "hidden" == e || t.is("select") ? "change" : h.get.inputEvent();
          },
          inputEvent: function inputEvent() {
            return O.createElement("input").oninput !== D ? "input" : O.createElement("input").onpropertychange !== D ? "propertychange" : "keyup";
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
                a = h.get.ancillaryValue(e),
                r = h.get.field(t.identifier),
                s = r.val(),
                l = E.isFunction(e.prompt) ? e.prompt(s) : e.prompt || d.prompt[o] || d.text.unspecifiedRule,
                c = -1 !== l.search("{value}"),
                u = -1 !== l.search("{name}");
            return c && (l = l.replace("{value}", r.val())), u && (i = 1 == (n = r.closest(f.group).find("label").eq(0)).length ? n.text() : r.prop("placeholder") || d.text.unspecifiedField, l = l.replace("{name}", i)), l = (l = l.replace("{identifier}", t.identifier)).replace("{ruleValue}", a), e.prompt || h.verbose("Using default validation prompt for type", l, o), l;
          },
          settings: function settings() {
            if (E.isPlainObject(x)) {
              var e = Object.keys(x);
              0 < e.length && x[e[0]].identifier !== D && x[e[0]].rules !== D ? (d = E.extend(!0, {}, E.fn.form.settings, R), c = E.extend({}, E.fn.form.settings.defaults, x), h.error(d.error.oldSyntax, v), h.verbose("Extending settings from legacy parameters", c, d)) : (x.fields && h.is.shorthandFields(x.fields) && (x.fields = h.get.fieldsFromShorthand(x.fields)), d = E.extend(!0, {}, E.fn.form.settings, x), c = E.extend({}, E.fn.form.settings.defaults, d.fields), h.verbose("Extending settings", c, d));
            } else d = E.fn.form.settings, c = E.fn.form.settings.defaults, h.verbose("Using default form validation", c, d);

            o = d.namespace, u = d.metadata, f = d.selector, m = d.className, i = d.regExp, s = d.error, a = "module-" + o, g = "." + o, p = r.data(a), h.refresh();
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
            return !!c && (E.each(c, function (e, t) {
              o = t.identifier || e, h.get.field(o)[0] == n[0] && (t.identifier = o, i = t);
            }), i || !1);
          },
          value: function value(e) {
            var t = [];
            return t.push(e), h.get.values.call(v, t)[e];
          },
          values: function values(e) {
            var t = E.isArray(e) ? h.get.fields(e) : n,
                c = {};
            return t.each(function (e, t) {
              var n = E(t),
                  i = (n.prop("type"), n.prop("name")),
                  o = n.val(),
                  a = n.is(f.checkbox),
                  r = n.is(f.radio),
                  s = -1 !== i.indexOf("[]"),
                  l = !!a && n.is(":checked");
              i && (s ? (i = i.replace("[]", ""), c[i] || (c[i] = []), a ? l ? c[i].push(o || !0) : c[i].push(!1) : c[i].push(o)) : r ? c[i] !== D && 0 != c[i] || (c[i] = !!l && (o || !0)) : c[i] = a ? !!l && (o || !0) : o);
            }), c;
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
            })) : i[n] = e, c = E.extend({}, c, i), h.debug("Adding rules", i, c);
          },
          fields: function fields(e) {
            var t;
            t = e && h.is.shorthandFields(e) ? h.get.fieldsFromShorthand(e) : e, c = E.extend({}, c, t);
          },
          prompt: function prompt(e, t) {
            var n = h.get.field(e).closest(l),
                i = n.children(f.prompt),
                o = 0 !== i.length;
            t = "string" == typeof t ? [t] : t, h.verbose("Adding field error state", e), n.addClass(m.error), d.inline && (o || (i = d.templates.prompt(t)).appendTo(n), i.html(t[0]), o ? h.verbose("Inline errors are disabled, no inline error added", e) : d.transition && E.fn.transition !== D && r.transition("is supported") ? (h.verbose("Displaying error with css transition", d.transition), i.transition(d.transition + " in", d.duration)) : (h.verbose("Displaying error with fallback javascript animation"), i.fadeIn(d.duration)));
          },
          errors: function errors(e) {
            h.debug("Adding form error messages", e), h.set.error(), t.html(d.templates.error(e));
          }
        },
        remove: {
          rule: function rule(n, e) {
            var i = E.isArray(e) ? e : [e];
            if (e == D) return h.debug("Removed all rules"), void (c[n].rules = []);
            c[n] != D && E.isArray(c[n].rules) && E.each(c[n].rules, function (e, t) {
              -1 !== i.indexOf(t.type) && (h.debug("Removed rule", t.type), c[n].rules.splice(e, 1));
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
            var t = h.get.field(e).closest(l),
                n = t.children(f.prompt);
            t.removeClass(m.error), d.inline && n.is(":visible") && (h.verbose("Removing prompt for field", e), d.transition && E.fn.transition !== D && r.transition("is supported") ? n.transition(d.transition + " out", d.duration, function () {
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
              var e = E(this),
                  t = 0 < e.filter(f.checkbox).length ? e.is(":checked") : e.val();
              e.data(u.defaultValue, t);
            });
          },
          error: function error() {
            r.removeClass(m.success).addClass(m.error);
          },
          value: function value(e, t) {
            var n = {};
            return n[e] = t, h.set.values.call(v, n);
          },
          values: function values(e) {
            E.isEmptyObject(e) || E.each(e, function (e, t) {
              var n,
                  i = h.get.field(e),
                  o = i.parent(),
                  a = E.isArray(t),
                  r = o.is(f.uiCheckbox),
                  s = o.is(f.uiDropdown),
                  l = i.is(f.radio) && r;
              0 < i.length && (a && r ? (h.verbose("Selecting multiple", t, i), o.checkbox("uncheck"), E.each(t, function (e, t) {
                n = i.filter('[value="' + t + '"]'), o = n.parent(), 0 < n.length && o.checkbox("check");
              })) : l ? (h.verbose("Selecting radio value", t, i), i.filter('[value="' + t + '"]').parent(f.uiCheckbox).checkbox("check")) : r ? (h.verbose("Setting checkbox value", t, o), !0 === t ? o.checkbox("check") : o.checkbox("uncheck")) : s ? (h.verbose("Setting dropdown value", t, o), o.dropdown("set selected", t)) : (h.verbose("Setting field value", t, i), i.val(t)));
            });
          }
        },
        validate: {
          form: function form(e, t) {
            var n = h.get.values();
            if (y) return !1;

            if (b = [], h.determine.isValid()) {
              if (h.debug("Form has no validation errors, submitting"), h.set.success(), !0 !== t) return d.onSuccess.call(v, e, n);
            } else if (h.debug("Form has errors"), h.set.error(), d.inline || h.add.errors(b), r.data("moduleApi") !== D && e.stopImmediatePropagation(), !0 !== t) return d.onFailure.call(v, b, n);
          },
          field: function field(n, e, t) {
            t = t === D || t, "string" == typeof n && (h.verbose("Validating field", n), n = c[e = n]);
            var i = n.identifier || e,
                o = h.get.field(i),
                a = !!n.depends && h.get.field(n.depends),
                r = !0,
                s = [];
            return n.identifier || (h.debug("Using field name as identifier", i), n.identifier = i), o.prop("disabled") ? (h.debug("Field is disabled. Skipping", i), r = !0) : n.optional && h.is.blank(o) ? (h.debug("Field is optional and blank. Skipping", i), r = !0) : n.depends && h.is.empty(a) ? (h.debug("Field depends on another value that is not present or empty. Skipping", a), r = !0) : n.rules !== D && E.each(n.rules, function (e, t) {
              h.has.field(i) && !h.validate.rule(n, t) && (h.debug("Field is invalid", i, t.type), s.push(h.get.prompt(t, n)), r = !1);
            }), r ? (t && (h.remove.prompt(i, s), d.onValid.call(o)), !0) : (t && (b = b.concat(s), h.add.prompt(i, s), d.onInvalid.call(o, s)), !1);
          },
          rule: function rule(e, t) {
            var n = h.get.field(e.identifier),
                i = (t.type, n.val()),
                o = h.get.ancillaryValue(t),
                a = h.get.ruleName(t),
                r = d.rules[a];
            if (E.isFunction(r)) return i = i === D || "" === i || null === i ? "" : E.trim(i + ""), r.call(n, i, o);
            h.error(s.noRule, a);
          }
        },
        setting: function setting(e, t) {
          if (E.isPlainObject(e)) E.extend(!0, d, e);else {
            if (t === D) return d[e];
            d[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (E.isPlainObject(e)) E.extend(!0, h, e);else {
            if (t === D) return h[e];
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
            d.performance && (n = (t = new Date().getTime()) - (T || t), T = t, k.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: v,
              "Execution Time": n
            })), clearTimeout(h.performance.timer), h.performance.timer = setTimeout(h.performance.display, 500);
          },
          display: function display() {
            var e = d.name + ":",
                n = 0;
            T = !1, clearTimeout(h.performance.timer), E.each(k, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", S && (e += " '" + S + "'"), 1 < w.length && (e += " (" + w.length + ")"), (console.group !== D || console.table !== D) && 0 < k.length && (console.groupCollapsed(e), console.table ? console.table(k) : E.each(k, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), k = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              a,
              n,
              r = p;
          return e = e || F, t = v || t, "string" == typeof i && r !== D && (i = i.split(/[\. ]/), o = i.length - 1, E.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (E.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== D) return a = r[n], !1;
              if (!E.isPlainObject(r[t]) || e == o) return r[t] !== D && (a = r[t]), !1;
              r = r[t];
            }
          })), E.isFunction(a) ? n = a.apply(t, e) : a !== D && (n = a), E.isArray(C) ? C.push(n) : C !== D ? C = [C, n] : n !== D && (C = n), a;
        }
      }).initialize();
    }), C !== D ? C : this;
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
        return !(e === D || "" === e || E.isArray(e) && 0 === e.length);
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
            a = E.fn.form.settings.regExp.integer;
        return t && -1 === ["", ".."].indexOf(t) && (-1 == t.indexOf("..") ? a.test(t) && (n = i = t - 0) : (o = t.split("..", 2), a.test(o[0]) && (n = o[0] - 0), a.test(o[1]) && (i = o[1] - 0))), a.test(e) && (n === D || n <= e) && (i === D || e <= i);
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
        return e !== D && e.length >= t;
      },
      length: function length(e, t) {
        return e !== D && e.length >= t;
      },
      exactLength: function exactLength(e, t) {
        return e !== D && e.length == t;
      },
      maxLength: function maxLength(e, t) {
        return e !== D && e.length <= t;
      },
      match: function match(e, t) {
        var n;
        E(this);
        return 0 < E('[data-validate="' + t + '"]').length ? n = E('[data-validate="' + t + '"]').val() : 0 < E("#" + t).length ? n = E("#" + t).val() : 0 < E('[name="' + t + '"]').length ? n = E('[name="' + t + '"]').val() : 0 < E('[name="' + t + '[]"]').length && (n = E('[name="' + t + '[]"]')), n !== D && e.toString() == n.toString();
      },
      different: function different(e, t) {
        var n;
        E(this);
        return 0 < E('[data-validate="' + t + '"]').length ? n = E('[data-validate="' + t + '"]').val() : 0 < E("#" + t).length ? n = E("#" + t).val() : 0 < E('[name="' + t + '"]').length ? n = E('[name="' + t + '"]').val() : 0 < E('[name="' + t + '[]"]').length && (n = E('[name="' + t + '[]"]')), n !== D && e.toString() !== n.toString();
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
          if (n = n.replace(/[\-]/g, ""), s && (E.each(s, function (e, t) {
            (i = o[t]) && (a = {
              length: -1 !== E.inArray(n.length, i.length),
              pattern: -1 !== n.search(i.pattern)
            }).length && a.pattern && (r = !0);
          }), !r)) return !1;
          if ((t = {
            number: -1 !== E.inArray(n.length, o.unionPay.length),
            pattern: -1 !== n.search(o.unionPay.pattern)
          }).number && t.pattern) return !0;

          for (var l = n.length, c = 0, u = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]], d = 0; l--;) {
            d += u[c][parseInt(n.charAt(l), 10)], c ^= 1;
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
}(jQuery, window, document), function (F, E, O, D) {
  "use strict";

  E = void 0 !== E && E.Math == Math ? E : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), F.fn.tab = function (r) {
    var c,
        u = F.isFunction(this) ? F(E) : F(this),
        d = u.selector || "",
        f = new Date().getTime(),
        m = [],
        g = r,
        A = "string" == typeof g,
        R = [].slice.call(arguments, 1),
        P = !1;
    return u.each(function () {
      var p,
          a,
          h,
          v,
          b,
          y,
          x = F.isPlainObject(r) ? F.extend(!0, {}, F.fn.tab.settings, r) : F.extend({}, F.fn.tab.settings),
          C = x.className,
          w = x.metadata,
          t = x.selector,
          S = x.error,
          e = "." + x.namespace,
          n = "module-" + x.namespace,
          T = F(this),
          i = {},
          k = !0,
          o = 0,
          s = this,
          l = T.data(n);
      b = {
        initialize: function initialize() {
          b.debug("Initializing tab menu item", T), b.fix.callbacks(), b.determineTabs(), b.debug("Determining tabs", x.context, a), x.auto && b.set.auto(), b.bind.events(), x.history && !P && (b.initializeHistory(), P = !0), b.instantiate();
        },
        instantiate: function instantiate() {
          b.verbose("Storing instance of module", b), l = b, T.data(n, b);
        },
        destroy: function destroy() {
          b.debug("Destroying tabs", T), T.removeData(n).off(e);
        },
        bind: {
          events: function events() {
            F.isWindow(s) || (b.debug("Attaching tab activation events to element", T), T.on("click" + e, b.event.click));
          }
        },
        determineTabs: function determineTabs() {
          var e;
          "parent" === x.context ? (0 < T.closest(t.ui).length ? (e = T.closest(t.ui), b.verbose("Using closest UI element as parent", e)) : e = T, p = e.parent(), b.verbose("Determined parent element for creating context", p)) : x.context ? (p = F(x.context), b.verbose("Using selector for tab context", x.context, p)) : p = F("body"), x.childrenOnly ? (a = p.children(t.tabs), b.debug("Searching tab context children for tabs", p, a)) : (a = p.find(t.tabs), b.debug("Searching tab context for tabs", p, a));
        },
        fix: {
          callbacks: function callbacks() {
            F.isPlainObject(r) && (r.onTabLoad || r.onTabInit) && (r.onTabLoad && (r.onLoad = r.onTabLoad, delete r.onTabLoad, b.error(S.legacyLoad, r.onLoad)), r.onTabInit && (r.onFirstLoad = r.onTabInit, delete r.onTabInit, b.error(S.legacyInit, r.onFirstLoad)), x = F.extend(!0, {}, F.fn.tab.settings, r));
          }
        },
        initializeHistory: function initializeHistory() {
          if (b.debug("Initializing page state"), F.address === D) return b.error(S.state), !1;

          if ("state" == x.historyType) {
            if (b.debug("Using HTML5 to manage state"), !1 === x.path) return b.error(S.path), !1;
            F.address.history(!0).state(x.path);
          }

          F.address.bind("change", b.event.history.change);
        },
        event: {
          click: function click(e) {
            var t = F(this).data(w.tab);
            t !== D ? (x.history ? (b.verbose("Updating page state", e), F.address.value(t)) : (b.verbose("Changing tab", e), b.changeTab(t)), e.preventDefault()) : b.debug("No tab specified");
          },
          history: {
            change: function change(e) {
              var t = e.pathNames.join("/") || b.get.initialPath(),
                  n = x.templates.determineTitle(t) || !1;
              b.performance.display(), b.debug("History change event", t, e), y = e, t !== D && b.changeTab(t), n && F.address.title(n);
            }
          }
        },
        refresh: function refresh() {
          h && (b.debug("Refreshing tab", h), b.changeTab(h));
        },
        cache: {
          read: function read(e) {
            return e !== D && i[e];
          },
          add: function add(e, t) {
            e = e || h, b.debug("Adding cached content for", e), i[e] = t;
          },
          remove: function remove(e) {
            e = e || h, b.debug("Removing cached content for", e), delete i[e];
          }
        },
        set: {
          auto: function auto() {
            var e = "string" == typeof x.path ? x.path.replace(/\/$/, "") + "/{$tab}" : "/{$tab}";
            b.verbose("Setting up automatic tab retrieval from server", e), F.isPlainObject(x.apiSettings) ? x.apiSettings.url = e : x.apiSettings = {
              url: e
            };
          },
          loading: function loading(e) {
            var t = b.get.tabElement(e);
            t.hasClass(C.loading) || (b.verbose("Setting loading state for", t), t.addClass(C.loading).siblings(a).removeClass(C.active + " " + C.loading), 0 < t.length && x.onRequest.call(t[0], e));
          },
          state: function state(e) {
            F.address.value(e);
          }
        },
        changeTab: function changeTab(d) {
          var f = E.history && E.history.pushState && x.ignoreFirstLoad && k,
              m = x.auto || F.isPlainObject(x.apiSettings),
              g = m && !f ? b.utilities.pathToArray(d) : b.get.defaultPathArray(d);
          d = b.utilities.arrayToPath(g), F.each(g, function (e, t) {
            var n,
                i,
                o,
                a,
                r = g.slice(0, e + 1),
                s = b.utilities.arrayToPath(r),
                l = b.is.tab(s),
                c = e + 1 == g.length,
                u = b.get.tabElement(s);

            if (b.verbose("Looking for tab", t), l) {
              if (b.verbose("Tab was found", t), h = s, v = b.utilities.filterArray(g, r), c ? a = !0 : (i = g.slice(0, e + 2), o = b.utilities.arrayToPath(i), (a = !b.is.tab(o)) && b.verbose("Tab parameters found", i)), a && m) return f ? (b.debug("Ignoring remote content on first tab load", s), k = !1, b.cache.add(d, u.html()), b.activate.all(s), x.onFirstLoad.call(u[0], s, v, y), x.onLoad.call(u[0], s, v, y)) : (b.activate.navigation(s), b.fetch.content(s, d)), !1;
              b.debug("Opened local tab", s), b.activate.all(s), b.cache.read(s) || (b.cache.add(s, !0), b.debug("First time tab loaded calling tab init"), x.onFirstLoad.call(u[0], s, v, y)), x.onLoad.call(u[0], s, v, y);
            } else {
              if (-1 != d.search("/") || "" === d) return b.error(S.missingTab, T, p, s), !1;
              if (s = (n = F("#" + d + ', a[name="' + d + '"]')).closest("[data-tab]").data(w.tab), u = b.get.tabElement(s), n && 0 < n.length && s) return b.debug("Anchor link used, opening parent tab", u, n), u.hasClass(C.active) || setTimeout(function () {
                b.scrollTo(n);
              }, 0), b.activate.all(s), b.cache.read(s) || (b.cache.add(s, !0), b.debug("First time tab loaded calling tab init"), x.onFirstLoad.call(u[0], s, v, y)), x.onLoad.call(u[0], s, v, y), !1;
            }
          });
        },
        scrollTo: function scrollTo(e) {
          var t = !!(e && 0 < e.length) && e.offset().top;
          !1 !== t && (b.debug("Forcing scroll to an in-page link in a hidden tab", t, e), F(O).scrollTop(t));
        },
        update: {
          content: function content(e, t, n) {
            var i = b.get.tabElement(e),
                o = i[0];
            n = n !== D ? n : x.evaluateScripts, "string" == typeof x.cacheType && "dom" == x.cacheType.toLowerCase() && "string" != typeof t ? i.empty().append(F(t).clone(!0)) : n ? (b.debug("Updating HTML and evaluating inline scripts", e, t), i.html(t)) : (b.debug("Updating HTML", e, t), o.innerHTML = t);
          }
        },
        fetch: {
          content: function content(t, n) {
            var e,
                i,
                o = b.get.tabElement(t),
                a = {
              dataType: "html",
              encodeParameters: !1,
              on: "now",
              cache: x.alwaysRefresh,
              headers: {
                "X-Remote": !0
              },
              onSuccess: function onSuccess(e) {
                "response" == x.cacheType && b.cache.add(n, e), b.update.content(t, e), t == h ? (b.debug("Content loaded", t), b.activate.tab(t)) : b.debug("Content loaded in background", t), x.onFirstLoad.call(o[0], t, v, y), x.onLoad.call(o[0], t, v, y), x.loadOnce ? b.cache.add(n, !0) : "string" == typeof x.cacheType && "dom" == x.cacheType.toLowerCase() && 0 < o.children().length ? setTimeout(function () {
                  var e = o.children().clone(!0);
                  e = e.not("script"), b.cache.add(n, e);
                }, 0) : b.cache.add(n, o.html());
              },
              urlData: {
                tab: n
              }
            },
                r = o.api("get request") || !1,
                s = r && "pending" === r.state();
            n = n || t, i = b.cache.read(n), x.cache && i ? (b.activate.tab(t), b.debug("Adding cached content", n), x.loadOnce || ("once" == x.evaluateScripts ? b.update.content(t, i, !1) : b.update.content(t, i)), x.onLoad.call(o[0], t, v, y)) : s ? (b.set.loading(t), b.debug("Content is already loading", n)) : F.api !== D ? (e = F.extend(!0, {}, x.apiSettings, a), b.debug("Retrieving remote content", n, e), b.set.loading(t), o.api(e)) : b.error(S.api);
          }
        },
        activate: {
          all: function all(e) {
            b.activate.tab(e), b.activate.navigation(e);
          },
          tab: function tab(e) {
            var t = b.get.tabElement(e),
                n = "siblings" == x.deactivate ? t.siblings(a) : a.not(t),
                i = t.hasClass(C.active);
            b.verbose("Showing tab content for", t), i || (t.addClass(C.active), n.removeClass(C.active + " " + C.loading), 0 < t.length && x.onVisible.call(t[0], e));
          },
          navigation: function navigation(e) {
            var t = b.get.navElement(e),
                n = "siblings" == x.deactivate ? t.siblings(u) : u.not(t),
                i = t.hasClass(C.active);
            b.verbose("Activating tab navigation for", t, e), i || (t.addClass(C.active), n.removeClass(C.active + " " + C.loading));
          }
        },
        deactivate: {
          all: function all() {
            b.deactivate.navigation(), b.deactivate.tabs();
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
            return e !== D && 0 < b.get.tabElement(e).length;
          }
        },
        get: {
          initialPath: function initialPath() {
            return u.eq(0).data(w.tab) || a.eq(0).data(w.tab);
          },
          path: function path() {
            return F.address.value();
          },
          defaultPathArray: function defaultPathArray(e) {
            return b.utilities.pathToArray(b.get.defaultPath(e));
          },
          defaultPath: function defaultPath(e) {
            var t = u.filter("[data-" + w.tab + '^="' + e + '/"]').eq(0).data(w.tab) || !1;

            if (t) {
              if (b.debug("Found default tab", t), o < x.maxDepth) return o++, b.get.defaultPath(t);
              b.error(S.recursion);
            } else b.debug("No default tabs found for", e, a);

            return o = 0, e;
          },
          navElement: function navElement(e) {
            return e = e || h, u.filter("[data-" + w.tab + '="' + e + '"]');
          },
          tabElement: function tabElement(e) {
            var t, n, i, o;
            return e = e || h, i = b.utilities.pathToArray(e), o = b.utilities.last(i), t = a.filter("[data-" + w.tab + '="' + e + '"]'), n = a.filter("[data-" + w.tab + '="' + o + '"]'), 0 < t.length ? t : n;
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
            return e === D && (e = h), "string" == typeof e ? e.split("/") : [e];
          },
          arrayToPath: function arrayToPath(e) {
            return !!F.isArray(e) && e.join("/");
          }
        },
        setting: function setting(e, t) {
          if (b.debug("Changing setting", e, t), F.isPlainObject(e)) F.extend(!0, x, e);else {
            if (t === D) return x[e];
            F.isPlainObject(x[e]) ? F.extend(!0, x[e], t) : x[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (F.isPlainObject(e)) F.extend(!0, b, e);else {
            if (t === D) return b[e];
            b[e] = t;
          }
        },
        debug: function debug() {
          !x.silent && x.debug && (x.performance ? b.performance.log(arguments) : (b.debug = Function.prototype.bind.call(console.info, console, x.name + ":"), b.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !x.silent && x.verbose && x.debug && (x.performance ? b.performance.log(arguments) : (b.verbose = Function.prototype.bind.call(console.info, console, x.name + ":"), b.verbose.apply(console, arguments)));
        },
        error: function error() {
          x.silent || (b.error = Function.prototype.bind.call(console.error, console, x.name + ":"), b.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var t, n;
            x.performance && (n = (t = new Date().getTime()) - (f || t), f = t, m.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: s,
              "Execution Time": n
            })), clearTimeout(b.performance.timer), b.performance.timer = setTimeout(b.performance.display, 500);
          },
          display: function display() {
            var e = x.name + ":",
                n = 0;
            f = !1, clearTimeout(b.performance.timer), F.each(m, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", d && (e += " '" + d + "'"), (console.group !== D || console.table !== D) && 0 < m.length && (console.groupCollapsed(e), console.table ? console.table(m) : F.each(m, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), m = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              a,
              n,
              r = l;
          return e = e || R, t = s || t, "string" == typeof i && r !== D && (i = i.split(/[\. ]/), o = i.length - 1, F.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (F.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== D) return a = r[n], !1;
              if (!F.isPlainObject(r[t]) || e == o) return r[t] !== D ? a = r[t] : b.error(S.method, i), !1;
              r = r[t];
            }
          })), F.isFunction(a) ? n = a.apply(t, e) : a !== D && (n = a), F.isArray(c) ? c.push(n) : c !== D ? c = [c, n] : n !== D && (c = n), a;
        }
      }, A ? (l === D && b.initialize(), b.invoke(g)) : (l !== D && l.invoke("destroy"), b.initialize());
    }), c !== D ? c : this;
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
}(jQuery, window, document), function (k, A, R, P) {
  "use strict";

  A = void 0 !== A && A.Math == Math ? A : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), k.fn.sticky = function (v) {
    var b,
        e = k(this),
        y = e.selector || "",
        x = new Date().getTime(),
        C = [],
        w = v,
        S = "string" == typeof w,
        T = [].slice.call(arguments, 1);
    return e.each(function () {
      var i,
          o,
          e,
          t,
          d,
          f = k.isPlainObject(v) ? k.extend(!0, {}, k.fn.sticky.settings, v) : k.extend({}, k.fn.sticky.settings),
          n = f.className,
          a = f.namespace,
          r = f.error,
          s = "." + a,
          l = "module-" + a,
          c = k(this),
          u = k(A),
          m = k(f.scrollContext),
          g = (c.selector, c.data(l)),
          p = A.requestAnimationFrame || A.mozRequestAnimationFrame || A.webkitRequestAnimationFrame || A.msRequestAnimationFrame || function (e) {
        setTimeout(e, 0);
      },
          h = this;

      d = {
        initialize: function initialize() {
          d.determineContainer(), d.determineContext(), d.verbose("Initializing sticky", f, i), d.save.positions(), d.checkErrors(), d.bind.events(), f.observeChanges && d.observeChanges(), d.instantiate();
        },
        instantiate: function instantiate() {
          d.verbose("Storing instance of module", d), g = d, c.data(l, d);
        },
        destroy: function destroy() {
          d.verbose("Destroying previous instance"), d.reset(), e && e.disconnect(), t && t.disconnect(), u.off("load" + s, d.event.load).off("resize" + s, d.event.resize), m.off("scrollchange" + s, d.event.scrollchange), c.removeData(l);
        },
        observeChanges: function observeChanges() {
          "MutationObserver" in A && (e = new MutationObserver(d.event.documentChanged), t = new MutationObserver(d.event.changed), e.observe(R, {
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
          i = f.container ? k(f.container) : c.offsetParent();
        },
        determineContext: function determineContext() {
          0 !== (o = f.context ? k(f.context) : i).length || d.error(r.invalidContext, f.context, c);
        },
        checkErrors: function checkErrors() {
          if (d.is.hidden() && d.error(r.visible, c), d.cache.element.height > d.cache.context.height) return d.reset(), void d.error(r.elementSize, c);
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
                (e == h || 0 < k(e).find(h).length) && (d.debug("Element removed from DOM, tearing down events"), d.destroy());
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
            var e = k("<div/>");
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
                top: parseInt(c.css("margin-top"), 10),
                bottom: parseInt(c.css("margin-bottom"), 10)
              },
              offset: c.offset(),
              width: c.outerWidth(),
              height: c.outerHeight()
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
            return d.elementScroll ? d.elementScroll : d.is.top() ? Math.abs(parseInt(c.css("top"), 10)) || 0 : Math.abs(parseInt(c.css("bottom"), 10)) || 0;
          },
          elementScroll: function elementScroll(e) {
            e = e || m.scrollTop();
            var t = d.cache.element,
                n = d.cache.scrollContext,
                i = d.get.scrollChange(e),
                o = t.height - n.height + f.offset,
                a = d.get.currentElementScroll(),
                r = a + i;
            return a = d.cache.fits || r < 0 ? 0 : o < r ? o : r;
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
            c.css("margin-top", "");
          }
        },
        set: {
          offset: function offset() {
            d.verbose("Setting offset on element", f.offset), c.css("margin-top", f.offset);
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
            d.debug("Setting scroll on element", e), d.elementScroll != e && (d.is.top() && c.css("bottom", "").css("top", -e), d.is.bottom() && c.css("top", "").css("bottom", e));
          },
          size: function size() {
            0 !== d.cache.element.height && 0 !== d.cache.element.width && (h.style.setProperty("width", d.cache.element.width + "px", "important"), h.style.setProperty("height", d.cache.element.height + "px", "important"));
          }
        },
        is: {
          standardScroll: function standardScroll() {
            return m[0] == A;
          },
          top: function top() {
            return c.hasClass(n.top);
          },
          bottom: function bottom() {
            return c.hasClass(n.bottom);
          },
          initialPosition: function initialPosition() {
            return !d.is.fixed() && !d.is.bound();
          },
          hidden: function hidden() {
            return !c.is(":visible");
          },
          bound: function bound() {
            return c.hasClass(n.bound);
          },
          fixed: function fixed() {
            return c.hasClass(n.fixed);
          }
        },
        stick: function stick(e) {
          var t = e || m.scrollTop(),
              n = d.cache,
              i = n.fits,
              o = n.sameHeight,
              a = n.element,
              r = n.scrollContext,
              s = n.context,
              l = d.is.bottom() && f.pushing ? f.bottomOffset : f.offset,
              c = (e = {
            top: t + l,
            bottom: t + l + r.height
          }, d.get.direction(e.top), i ? 0 : d.get.elementScroll(e.top)),
              u = !i;
          0 !== a.height && !o && (d.is.initialPosition() ? e.top >= s.bottom ? (d.debug("Initial element position is bottom of container"), d.bindBottom()) : e.top > a.top && (a.height + e.top - c >= s.bottom ? (d.debug("Initial element position is bottom of container"), d.bindBottom()) : (d.debug("Initial element position is fixed"), d.fixTop())) : d.is.fixed() ? d.is.top() ? e.top <= a.top ? (d.debug("Fixed element reached top of container"), d.setInitialPosition()) : a.height + e.top - c >= s.bottom ? (d.debug("Fixed element reached bottom of container"), d.bindBottom()) : u && (d.set.scroll(c), d.save.lastScroll(e.top), d.save.elementScroll(c)) : d.is.bottom() && (e.bottom - a.height <= a.top ? (d.debug("Bottom fixed rail has reached top of container"), d.setInitialPosition()) : e.bottom >= s.bottom ? (d.debug("Bottom fixed rail has reached bottom of container"), d.bindBottom()) : u && (d.set.scroll(c), d.save.lastScroll(e.top), d.save.elementScroll(c))) : d.is.bottom() && (e.top <= a.top ? (d.debug("Jumped from bottom fixed to top fixed, most likely used home/end button"), d.setInitialPosition()) : f.pushing ? d.is.bound() && e.bottom <= s.bottom && (d.debug("Fixing bottom attached element to bottom of browser."), d.fixBottom()) : d.is.bound() && e.top <= s.bottom - a.height && (d.debug("Fixing bottom attached element to top of browser."), d.fixTop())));
        },
        bindTop: function bindTop() {
          d.debug("Binding element to top of parent container"), d.remove.offset(), c.css({
            left: "",
            top: "",
            marginBottom: ""
          }).removeClass(n.fixed).removeClass(n.bottom).addClass(n.bound).addClass(n.top), f.onTop.call(h), f.onUnstick.call(h);
        },
        bindBottom: function bindBottom() {
          d.debug("Binding element to bottom of parent container"), d.remove.offset(), c.css({
            left: "",
            top: ""
          }).removeClass(n.fixed).removeClass(n.top).addClass(n.bound).addClass(n.bottom), f.onBottom.call(h), f.onUnstick.call(h);
        },
        setInitialPosition: function setInitialPosition() {
          d.debug("Returning to initial position"), d.unfix(), d.unbind();
        },
        fixTop: function fixTop() {
          d.debug("Fixing element to top of page"), f.setSize && d.set.size(), d.set.minimumSize(), d.set.offset(), c.css({
            left: d.cache.element.left,
            bottom: "",
            marginBottom: ""
          }).removeClass(n.bound).removeClass(n.bottom).addClass(n.fixed).addClass(n.top), f.onStick.call(h);
        },
        fixBottom: function fixBottom() {
          d.debug("Sticking element to bottom of page"), f.setSize && d.set.size(), d.set.minimumSize(), d.set.offset(), c.css({
            left: d.cache.element.left,
            bottom: "",
            marginBottom: ""
          }).removeClass(n.bound).removeClass(n.top).addClass(n.fixed).addClass(n.bottom), f.onStick.call(h);
        },
        unbind: function unbind() {
          d.is.bound() && (d.debug("Removing container bound position on element"), d.remove.offset(), c.removeClass(n.bound).removeClass(n.top).removeClass(n.bottom));
        },
        unfix: function unfix() {
          d.is.fixed() && (d.debug("Removing fixed position on element"), d.remove.minimumSize(), d.remove.offset(), c.removeClass(n.fixed).removeClass(n.top).removeClass(n.bottom), f.onUnstick.call(h));
        },
        reset: function reset() {
          d.debug("Resetting elements position"), d.unbind(), d.unfix(), d.resetCSS(), d.remove.offset(), d.remove.lastScroll();
        },
        resetCSS: function resetCSS() {
          c.css({
            width: "",
            height: ""
          }), i.css({
            height: ""
          });
        },
        setting: function setting(e, t) {
          if (k.isPlainObject(e)) k.extend(!0, f, e);else {
            if (t === P) return f[e];
            f[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (k.isPlainObject(e)) k.extend(!0, d, e);else {
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
            x = !1, clearTimeout(d.performance.timer), k.each(C, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", y && (e += " '" + y + "'"), (console.group !== P || console.table !== P) && 0 < C.length && (console.groupCollapsed(e), console.table ? console.table(C) : k.each(C, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), C = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              a,
              n,
              r = g;
          return e = e || T, t = h || t, "string" == typeof i && r !== P && (i = i.split(/[\. ]/), o = i.length - 1, k.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (k.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== P) return a = r[n], !1;
              if (!k.isPlainObject(r[t]) || e == o) return r[t] !== P && (a = r[t]), !1;
              r = r[t];
            }
          })), k.isFunction(a) ? n = a.apply(t, e) : a !== P && (n = a), k.isArray(b) ? b.push(n) : b !== P ? b = [b, n] : n !== P && (b = n), a;
        }
      }, S ? (g === P && d.initialize(), d.invoke(w)) : (g !== P && g.invoke("destroy"), d.initialize());
    }), b !== P ? b : this;
  }, k.fn.sticky.settings = {
    name: "Sticky",
    namespace: "sticky",
    silent: !1,
    debug: !1,
    verbose: !0,
    performance: !0,
    pushing: !1,
    context: !1,
    container: !1,
    scrollContext: A,
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
}(jQuery, window, document), function (j, z, I, M) {
  "use strict";

  z = void 0 !== z && z.Math == Math ? z : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), j.fn.popup = function (T) {
    var k,
        e = j(this),
        A = j(I),
        R = j(z),
        P = j("body"),
        F = e.selector || "",
        E = new Date().getTime(),
        O = [],
        D = T,
        q = "string" == typeof D,
        L = [].slice.call(arguments, 1);
    return e.each(function () {
      var u,
          c,
          e,
          t,
          n,
          d,
          f = j.isPlainObject(T) ? j.extend(!0, {}, j.fn.popup.settings, T) : j.extend({}, j.fn.popup.settings),
          o = f.selector,
          m = f.className,
          g = f.error,
          p = f.metadata,
          i = f.namespace,
          a = "." + f.namespace,
          r = "module-" + i,
          h = j(this),
          s = j(f.context),
          l = j(f.scrollContext),
          v = j(f.boundary),
          b = f.target ? j(f.target) : h,
          y = 0,
          x = !1,
          C = !1,
          w = this,
          S = h.data(r);
      d = {
        initialize: function initialize() {
          d.debug("Initializing", h), d.createID(), d.bind.events(), !d.exists() && f.preserve && d.create(), f.observeChanges && d.observeChanges(), d.instantiate();
        },
        instantiate: function instantiate() {
          d.verbose("Storing instance", d), S = d, h.data(r, S);
        },
        observeChanges: function observeChanges() {
          "MutationObserver" in z && ((e = new MutationObserver(d.event.documentChanged)).observe(I, {
            childList: !0,
            subtree: !0
          }), d.debug("Setting up mutation observer", e));
        },
        refresh: function refresh() {
          f.popup ? u = j(f.popup).eq(0) : f.inline && (u = b.nextAll(o.popup).eq(0), f.popup = u), f.popup ? (u.addClass(m.loading), c = d.get.offsetParent(), u.removeClass(m.loading), f.movePopup && d.has.popup() && d.get.offsetParent(u)[0] !== c[0] && (d.debug("Moving popup to the same offset parent as target"), u.detach().appendTo(c))) : c = f.inline ? d.get.offsetParent(b) : d.has.popup() ? d.get.offsetParent(u) : P, c.is("html") && c[0] !== P[0] && (d.debug("Setting page as offset parent"), c = P), d.get.variation() && d.set.variation();
        },
        reposition: function reposition() {
          d.refresh(), d.set.position();
        },
        destroy: function destroy() {
          d.debug("Destroying previous module"), e && e.disconnect(), u && !f.preserve && d.removePopup(), clearTimeout(d.hideTimer), clearTimeout(d.showTimer), d.unbind.close(), d.unbind.events(), h.removeData(r);
        },
        event: {
          start: function start(e) {
            var t = j.isPlainObject(f.delay) ? f.delay.show : f.delay;
            clearTimeout(d.hideTimer), C || (d.showTimer = setTimeout(d.show, t));
          },
          end: function end() {
            var e = j.isPlainObject(f.delay) ? f.delay.hide : f.delay;
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
                (e == w || 0 < j(e).find(w).length) && (d.debug("Element removed from DOM, tearing down events"), d.destroy());
              });
            });
          },
          hideGracefully: function hideGracefully(e) {
            var t = j(e.target),
                n = j.contains(I.documentElement, e.target),
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
          })), u = j("<div/>").addClass(m.popup).data(p.activator, h).html(e), f.inline ? (d.verbose("Inserting popup element inline", u), u.insertAfter(h)) : (d.verbose("Appending popup element to body", u), u.appendTo(s)), d.refresh(), d.set.variation(), f.hoverable && d.bind.popup(), f.onCreate.call(u, w)) : 0 !== b.next(o.popup).length ? (d.verbose("Pre-existing popup found"), f.inline = !0, f.popup = b.next(o.popup).data(p.activator, h), d.refresh(), f.hoverable && d.bind.popup()) : f.popup ? (j(f.popup).data(p.activator, h), d.verbose("Used popup specified in settings"), d.refresh(), f.hoverable && d.bind.popup()) : d.debug("No content specified skipping display", w);
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
          j(o.popup).filter("." + m.popupVisible).each(function () {
            j(this).data(p.activator).popup("hide");
          });
        },
        exists: function exists() {
          return !!u && (f.inline || f.popup ? d.has.popup() : 1 <= u.closest(s).length);
        },
        removePopup: function removePopup() {
          d.has.popup() && !f.popup && (d.debug("Removing popup", u), u.remove(), u = M, f.onRemove.call(u, w));
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
            e = j.isFunction(e) ? e : function () {}, f.transition && j.fn.transition !== M && h.transition("is supported") ? (d.set.visible(), u.transition({
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
            e = j.isFunction(e) ? e : function () {}, d.debug("Hiding pop-up"), !1 !== f.onHide.call(u, w) ? f.transition && j.fn.transition !== M && h.transition("is supported") ? u.transition({
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
                n = b[0],
                i = v[0] == z,
                o = f.inline || f.popup && f.movePopup ? b.position() : b.offset(),
                a = i ? {
              top: 0,
              left: 0
            } : v.offset(),
                r = {},
                s = i ? {
              top: R.scrollTop(),
              left: R.scrollLeft()
            } : {
              top: 0,
              left: 0
            };

            if (r = {
              target: {
                element: b[0],
                width: b.outerWidth(),
                height: b.outerHeight(),
                top: o.top,
                left: o.left,
                margin: {}
              },
              popup: {
                width: u.outerWidth(),
                height: u.outerHeight()
              },
              parent: {
                width: c.outerWidth(),
                height: c.outerHeight()
              },
              screen: {
                top: a.top,
                left: a.left,
                scroll: {
                  top: s.top,
                  left: s.left
                },
                width: v.width(),
                height: v.height()
              }
            }, t.get(0) !== c.get(0)) {
              var l = t.offset();
              r.target.top -= l.top, r.target.left -= l.left, r.parent.width = t.outerWidth(), r.parent.height = t.outerHeight();
            }

            return f.setFluidWidth && d.is.fluid() && (r.container = {
              width: u.parent().outerWidth()
            }, r.popup.width = r.container.width), r.target.margin.top = f.inline ? parseInt(z.getComputedStyle(n).getPropertyValue("margin-top"), 10) : 0, r.target.margin.left = f.inline ? d.is.rtl() ? parseInt(z.getComputedStyle(n).getPropertyValue("margin-right"), 10) : parseInt(z.getComputedStyle(n).getPropertyValue("margin-left"), 10) : 0, e = r.screen, r.boundary = {
              top: e.top + e.scroll.top,
              bottom: e.top + e.scroll.top + e.height,
              left: e.left + e.scroll.left,
              right: e.left + e.scroll.left + e.width
            }, r;
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
            var t = (e !== M ? e[0] : b[0]).parentNode,
                n = j(t);
            if (t) for (var i = "none" === n.css("transform"), o = "static" === n.css("position"), a = n.is("body"); t && !a && o && i;) {
              t = t.parentNode, i = "none" === (n = j(t)).css("transform"), o = "static" === n.css("position"), a = n.is("body");
            }
            return n && 0 < n.length ? n : j();
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
                a = !1,
                r = !1,
                s = !1;
            return x || (d.verbose("All available positions available"), x = d.get.positions()), d.debug("Recording last position tried", e), x[e] = !0, "opposite" === f.prefer && (s = (s = [{
              top: "bottom",
              bottom: "top",
              left: "right",
              right: "left"
            }[n], i]).join(" "), a = !0 === x[s], d.debug("Trying opposite strategy", s)), "adjacent" === f.prefer && o && (s = (s = [n, {
              left: "center",
              center: "right",
              right: "left"
            }[i]]).join(" "), r = !0 === x[s], d.debug("Trying adjacent strategy", s)), (r || a) && (d.debug("Using backup position", s), s = {
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
            if (0 !== b.length && 0 !== u.length) {
              var n, i, o, a, r, s, l, c;
              if (t = t || d.get.calculations(), e = e || h.data(p.position) || f.position, n = h.data(p.offset) || f.offset, i = f.distanceAway, o = t.target, a = t.popup, r = t.parent, d.should.centerArrow(t) && (d.verbose("Adjusting offset to center arrow on small target element"), "top left" != e && "bottom left" != e || (n += o.width / 2, n -= f.arrowPixelsFromEdge), "top right" != e && "bottom right" != e || (n -= o.width / 2, n += f.arrowPixelsFromEdge)), 0 === o.width && 0 === o.height && !d.is.svg(o.element)) return d.debug("Popup target is hidden, no action taken"), !1;

              switch (f.inline && (d.debug("Adding margin to calculation", o.margin), "left center" == e || "right center" == e ? (n += o.margin.top, i += -o.margin.left) : "top left" == e || "top center" == e || "top right" == e ? (n += o.margin.left, i -= o.margin.top) : (n += o.margin.left, i += o.margin.top)), d.debug("Determining popup position from calculations", e, t), d.is.rtl() && (e = e.replace(/left|right/g, function (e) {
                return "left" == e ? "right" : "left";
              }), d.debug("RTL: Popup position updated", e)), y == f.maxSearchDepth && "string" == typeof f.lastResort && (e = f.lastResort), e) {
                case "top left":
                  s = {
                    top: "auto",
                    bottom: r.height - o.top + i,
                    left: o.left + n,
                    right: "auto"
                  };
                  break;

                case "top center":
                  s = {
                    bottom: r.height - o.top + i,
                    left: o.left + o.width / 2 - a.width / 2 + n,
                    top: "auto",
                    right: "auto"
                  };
                  break;

                case "top right":
                  s = {
                    bottom: r.height - o.top + i,
                    right: r.width - o.left - o.width - n,
                    top: "auto",
                    left: "auto"
                  };
                  break;

                case "left center":
                  s = {
                    top: o.top + o.height / 2 - a.height / 2 + n,
                    right: r.width - o.left + i,
                    left: "auto",
                    bottom: "auto"
                  };
                  break;

                case "right center":
                  s = {
                    top: o.top + o.height / 2 - a.height / 2 + n,
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
                    left: o.left + o.width / 2 - a.width / 2 + n,
                    bottom: "auto",
                    right: "auto"
                  };
                  break;

                case "bottom right":
                  s = {
                    top: o.top + o.height + i,
                    right: r.width - o.left - o.width - n,
                    left: "auto",
                    bottom: "auto"
                  };
              }

              if (s === M && d.error(g.invalidPosition, e), d.debug("Calculated popup positioning values", s), u.css(s).removeClass(m.position).addClass(e).addClass(m.loading), l = d.get.popupOffset(), c = d.get.distanceFromBoundary(l, t), d.is.offstage(c, e)) {
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
            d.debug("Binding popup events to module"), "click" == f.on && h.on("click" + a, d.toggle), "hover" == f.on && h.on("touchstart" + a, d.event.touchstart), d.get.startEvent() && h.on(d.get.startEvent() + a, d.event.start).on(d.get.endEvent() + a, d.event.end), f.target && d.debug("Target set to element", b), R.on("resize" + t, d.event.resize);
          },
          popup: function popup() {
            d.verbose("Allowing hover events on popup to prevent closing"), u && d.has.popup() && u.on("mouseenter" + a, d.event.start).on("mouseleave" + a, d.event.end);
          },
          close: function close() {
            (!0 === f.hideOnScroll || "auto" == f.hideOnScroll && "click" != f.on) && d.bind.closeOnScroll(), d.is.closable() ? d.bind.clickaway() : "hover" == f.on && C && d.bind.touchClose();
          },
          closeOnScroll: function closeOnScroll() {
            d.verbose("Binding scroll close event to document"), l.one(d.get.scrollEvent() + t, d.event.hideGracefully);
          },
          touchClose: function touchClose() {
            d.verbose("Binding popup touchclose event to document"), A.on("touchstart" + t, function (e) {
              d.verbose("Touched away from popup"), d.event.hideGracefully.call(w, e);
            });
          },
          clickaway: function clickaway() {
            d.verbose("Binding popup close event to document"), A.on("click" + t, function (e) {
              d.verbose("Clicked away from popup"), d.event.hideGracefully.call(w, e);
            });
          }
        },
        unbind: {
          events: function events() {
            R.off(t), h.off(a);
          },
          close: function close() {
            A.off(t), l.off(t);
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
            return j.each(e, function (e, t) {
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
            return u !== M && u.hasClass(m.animating);
          },
          fluid: function fluid() {
            return u !== M && u.hasClass(m.fluid);
          },
          visible: function visible() {
            return u !== M && u.hasClass(m.popupVisible);
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
          d.remove.visible(), f.preserve ? j.fn.transition !== M && u.transition("remove transition") : d.removePopup();
        },
        setting: function setting(e, t) {
          if (j.isPlainObject(e)) j.extend(!0, f, e);else {
            if (t === M) return f[e];
            f[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (j.isPlainObject(e)) j.extend(!0, d, e);else {
            if (t === M) return d[e];
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
            E = !1, clearTimeout(d.performance.timer), j.each(O, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", F && (e += " '" + F + "'"), (console.group !== M || console.table !== M) && 0 < O.length && (console.groupCollapsed(e), console.table ? console.table(O) : j.each(O, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), O = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              a,
              n,
              r = S;
          return e = e || L, t = w || t, "string" == typeof i && r !== M && (i = i.split(/[\. ]/), o = i.length - 1, j.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (j.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== M) return a = r[n], !1;
              if (!j.isPlainObject(r[t]) || e == o) return r[t] !== M && (a = r[t]), !1;
              r = r[t];
            }
          })), j.isFunction(a) ? n = a.apply(t, e) : a !== M && (n = a), j.isArray(k) ? k.push(n) : k !== M ? k = [k, n] : n !== M && (k = n), a;
        }
      }, q ? (S === M && d.initialize(), d.invoke(D)) : (S !== M && S.invoke("destroy"), d.initialize());
    }), k !== M ? k : this;
  }, j.fn.popup.settings = {
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
    boundary: z,
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
    scrollContext: z,
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
            n = j.fn.popup.settings.templates.escape;
        return _typeof(e) !== M && (_typeof(e.title) !== M && e.title && (e.title = n(e.title), t += '<div class="header">' + e.title + "</div>"), _typeof(e.content) !== M && e.content && (e.content = n(e.content), t += '<div class="content">' + e.content + "</div>")), t;
      }
    }
  };
}(jQuery, window, document), function (P, F, E, O) {
  "use strict";

  F = void 0 !== F && F.Math == Math ? F : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), P.fn.visibility = function (b) {
    var y,
        e = P(this),
        x = e.selector || "",
        C = new Date().getTime(),
        w = [],
        S = b,
        T = "string" == typeof S,
        k = [].slice.call(arguments, 1),
        A = e.length,
        R = 0;
    return e.each(function () {
      var e,
          t,
          n,
          s,
          o = P.isPlainObject(b) ? P.extend(!0, {}, P.fn.visibility.settings, b) : P.extend({}, P.fn.visibility.settings),
          i = o.className,
          a = o.namespace,
          l = o.error,
          r = o.metadata,
          c = "." + a,
          u = "module-" + a,
          d = P(F),
          f = P(this),
          m = P(o.context),
          g = (f.selector, f.data(u)),
          p = F.requestAnimationFrame || F.mozRequestAnimationFrame || F.webkitRequestAnimationFrame || F.msRequestAnimationFrame || function (e) {
        setTimeout(e, 0);
      },
          h = this,
          v = !1;

      s = {
        initialize: function initialize() {
          s.debug("Initializing", o), s.setup.cache(), s.should.trackChanges() && ("image" == o.type && s.setup.image(), "fixed" == o.type && s.setup.fixed(), o.observeChanges && s.observeChanges(), s.bind.events()), s.save.position(), s.is.visible() || s.error(l.visible, f), o.initialCheck && s.checkVisibility(), s.instantiate();
        },
        instantiate: function instantiate() {
          s.debug("Storing instance", s), f.data(u, s), g = s;
        },
        destroy: function destroy() {
          s.verbose("Destroying previous module"), n && n.disconnect(), t && t.disconnect(), d.off("load" + c, s.event.load).off("resize" + c, s.event.resize), m.off("scroll" + c, s.event.scroll).off("scrollchange" + c, s.event.scrollchange), "fixed" == o.type && (s.resetFixed(), s.remove.placeholder()), f.off(c).removeData(u);
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
            s.verbose("Binding visibility events to scroll and resize"), o.refreshOnLoad && d.on("load" + c, s.event.load), d.on("resize" + c, s.event.resize), m.off("scroll" + c).on("scroll" + c, s.event.scroll).on("scrollchange" + c, s.event.scrollchange);
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
              m.triggerHandler("scrollchange" + c, [m.scrollTop()]);
            }, o.throttle)) : p(function () {
              m.triggerHandler("scrollchange" + c, [m.scrollTop()]);
            });
          },
          scrollchange: function scrollchange(e, t) {
            s.checkVisibility(t);
          }
        },
        precache: function precache(e, t) {
          e instanceof Array || (e = [e]);

          for (var n = e.length, i = 0, o = [], a = E.createElement("img"), r = function r() {
            ++i >= e.length && P.isFunction(t) && t();
          }; n--;) {
            (a = E.createElement("img")).onload = r, a.onerror = r, a.src = e[n], o.push(a);
          }
        },
        enableCallbacks: function enableCallbacks() {
          s.debug("Allowing callbacks to occur"), v = !1;
        },
        disableCallbacks: function disableCallbacks() {
          s.debug("Disabling all callbacks temporarily"), v = !0;
        },
        should: {
          trackChanges: function trackChanges() {
            return T ? (s.debug("One time query, no need to bind events"), !1) : (s.debug("Callbacks being attached"), !0);
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
            var e = f.data(r.src);
            e && (s.verbose("Lazy loading image", e), o.once = !0, o.observeChanges = !1, o.onOnScreen = function () {
              s.debug("Image on screen", h), s.precache(e, function () {
                s.set.image(e, function () {
                  ++R == A && o.onAllLoaded.call(this), o.onLoad.call(this);
                });
              });
            });
          },
          fixed: function fixed() {
            s.debug("Setting up fixed"), o.once = !1, o.observeChanges = !1, o.initialCheck = !0, o.refreshOnLoad = !0, b.transition || (o.transition = !1), s.create.placeholder(), s.debug("Added placeholder", e), o.onTopPassed = function () {
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
          s.verbose("Checking visibility of element", s.cache.element), !v && s.is.visible() && (s.save.scroll(e), s.save.calculations(), s.passed(), s.passingReverse(), s.topVisibleReverse(), s.bottomVisibleReverse(), s.topPassedReverse(), s.bottomPassedReverse(), s.onScreen(), s.offScreen(), s.passing(), s.topVisible(), s.bottomVisible(), s.topPassed(), s.bottomPassed(), o.onUpdate && o.onUpdate.call(h, s.get.elementCalculations()));
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
              a,
              n,
              r = g;
          return e = e || k, t = h || t, "string" == typeof i && r !== O && (i = i.split(/[\. ]/), o = i.length - 1, P.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (P.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== O) return a = r[n], !1;
              if (!P.isPlainObject(r[t]) || e == o) return r[t] !== O ? a = r[t] : s.error(l.method, i), !1;
              r = r[t];
            }
          })), P.isFunction(a) ? n = a.apply(t, e) : a !== O && (n = a), P.isArray(y) ? y.push(n) : y !== O ? y = [y, n] : n !== O && (y = n), a;
        }
      }, T ? (g === O && s.initialize(), g.save.scroll(), g.save.calculations(), s.invoke(S)) : (g !== O && g.invoke("destroy"), s.initialize());
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
}(jQuery, window, document), function (K, J, G, Y) {
  "use strict";

  J = void 0 !== J && J.Math == Math ? J : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), K.fn.dropdown = function (I) {
    var M,
        V = K(this),
        N = K(G),
        H = V.selector || "",
        U = "ontouchstart" in G.documentElement,
        B = new Date().getTime(),
        W = [],
        X = I,
        $ = "string" == typeof X,
        Q = [].slice.call(arguments, 1);
    return V.each(function (n) {
      var e,
          t,
          i,
          o,
          a,
          r,
          s,
          g,
          p = K.isPlainObject(I) ? K.extend(!0, {}, K.fn.dropdown.settings, I) : K.extend({}, K.fn.dropdown.settings),
          h = p.className,
          c = p.message,
          l = p.fields,
          v = p.keys,
          b = p.metadata,
          u = p.namespace,
          d = p.regExp,
          y = p.selector,
          f = p.error,
          m = p.templates,
          x = "." + u,
          C = "module-" + u,
          w = K(this),
          S = K(p.context),
          T = w.find(y.text),
          k = w.find(y.search),
          A = w.find(y.sizer),
          R = w.find(y.input),
          P = w.find(y.icon),
          F = 0 < w.prev().find(y.text).length ? w.prev().find(y.text) : w.prev(),
          E = w.children(y.menu),
          O = E.find(y.item),
          D = !1,
          q = !1,
          L = !1,
          j = this,
          z = w.data(C);
      g = {
        initialize: function initialize() {
          g.debug("Initializing dropdown", p), g.is.alreadySetup() ? g.setup.reference() : (g.setup.layout(), p.values && g.change.values(p.values), g.refreshData(), g.save.defaults(), g.restore.selected(), g.create.id(), g.bind.events(), g.observeChanges(), g.instantiate());
        },
        instantiate: function instantiate() {
          g.verbose("Storing instance of dropdown", g), z = g, w.data(C, g);
        },
        destroy: function destroy() {
          g.verbose("Destroying previous dropdown", w), g.remove.tabbable(), w.off(x).removeData(C), E.off(x), N.off(o), g.disconnect.menuObserver(), g.disconnect.selectObserver();
        },
        observeChanges: function observeChanges() {
          "MutationObserver" in J && (r = new MutationObserver(g.event.select.mutation), s = new MutationObserver(g.event.menu.mutation), g.debug("Setting up mutation observer", r, s), g.observe.select(), g.observe.menu());
        },
        disconnect: {
          menuObserver: function menuObserver() {
            s && s.disconnect();
          },
          selectObserver: function selectObserver() {
            r && r.disconnect();
          }
        },
        observe: {
          select: function select() {
            g.has.input() && r.observe(w[0], {
              childList: !0,
              subtree: !0
            });
          },
          menu: function menu() {
            g.has.menu() && s.observe(E[0], {
              childList: !0,
              subtree: !0
            });
          }
        },
        create: {
          id: function id() {
            a = (Math.random().toString(16) + "000000000").substr(2, 8), o = "." + a, g.verbose("Creating unique id for element", a);
          },
          userChoice: function userChoice(e) {
            var n, i, o;
            return !!(e = e || g.get.userValues()) && (e = K.isArray(e) ? e : [e], K.each(e, function (e, t) {
              !1 === g.get.item(t) && (o = p.templates.addition(g.add.variables(c.addResult, t)), i = K("<div />").html(o).attr("data-" + b.value, t).attr("data-" + b.text, t).addClass(h.addition).addClass(h.item), p.hideAdditions && i.addClass(h.hidden), n = n === Y ? i : n.add(i), g.verbose("Creating user choices for value", t, i));
            }), n);
          },
          userLabels: function userLabels(e) {
            var t = g.get.userValues();
            t && (g.debug("Adding user labels", t), K.each(t, function (e, t) {
              g.verbose("Adding custom user value"), g.add.label(t, t);
            }));
          },
          menu: function menu() {
            E = K("<div />").addClass(h.menu).appendTo(w);
          },
          sizer: function sizer() {
            A = K("<span />").addClass(h.sizer).insertAfter(k);
          }
        },
        search: function search(e) {
          e = e !== Y ? e : g.get.query(), g.verbose("Searching for query", e), g.has.minCharacters(e) ? g.filter(e) : g.hide();
        },
        select: {
          firstUnfiltered: function firstUnfiltered() {
            g.verbose("Selecting first non-filtered element"), g.remove.selectedItem(), O.not(y.unselectable).not(y.addition + y.hidden).eq(0).addClass(h.selected);
          },
          nextAvailable: function nextAvailable(e) {
            var t = (e = e.eq(0)).nextAll(y.item).not(y.unselectable).eq(0),
                n = e.prevAll(y.item).not(y.unselectable).eq(0);
            0 < t.length ? (g.verbose("Moving selection to", t), t.addClass(h.selected)) : (g.verbose("Moving selection to", n), n.addClass(h.selected));
          }
        },
        setup: {
          api: function api() {
            var e = {
              debug: p.debug,
              urlData: {
                value: g.get.value(),
                query: g.get.query()
              },
              on: !1
            };
            g.verbose("First request, initializing API"), w.api(e);
          },
          layout: function layout() {
            w.is("select") && (g.setup.select(), g.setup.returnedObject()), g.has.menu() || g.create.menu(), g.is.search() && !g.has.search() && (g.verbose("Adding search input"), k = K("<input />").addClass(h.search).prop("autocomplete", "off").insertBefore(T)), g.is.multiple() && g.is.searchSelection() && !g.has.sizer() && g.create.sizer(), p.allowTab && g.set.tabbable();
          },
          select: function select() {
            var e = g.get.selectValues();
            g.debug("Dropdown initialized on a select", e), w.is("select") && (R = w), 0 < R.parent(y.dropdown).length ? (g.debug("UI dropdown already exists. Creating dropdown menu only"), w = R.closest(y.dropdown), g.has.menu() || g.create.menu(), E = w.children(y.menu), g.setup.menu(e)) : (g.debug("Creating entire dropdown from select"), w = K("<div />").attr("class", R.attr("class")).addClass(h.selection).addClass(h.dropdown).html(m.dropdown(e)).insertBefore(R), R.hasClass(h.multiple) && !1 === R.prop("multiple") && (g.error(f.missingMultiple), R.prop("multiple", !0)), R.is("[multiple]") && g.set.multiple(), R.prop("disabled") && (g.debug("Disabling dropdown"), w.addClass(h.disabled)), R.removeAttr("class").detach().prependTo(w)), g.refresh();
          },
          menu: function menu(e) {
            E.html(m.menu(e, l)), O = E.find(y.item);
          },
          reference: function reference() {
            g.debug("Dropdown behavior was called on select, replacing with closest dropdown"), w = w.parent(y.dropdown), z = w.data(C), j = w.get(0), g.refresh(), g.setup.returnedObject();
          },
          returnedObject: function returnedObject() {
            var e = V.slice(0, n),
                t = V.slice(n + 1);
            V = e.add(w).add(t);
          }
        },
        refresh: function refresh() {
          g.refreshSelectors(), g.refreshData();
        },
        refreshItems: function refreshItems() {
          O = E.find(y.item);
        },
        refreshSelectors: function refreshSelectors() {
          g.verbose("Refreshing selector cache"), T = w.find(y.text), k = w.find(y.search), R = w.find(y.input), P = w.find(y.icon), F = 0 < w.prev().find(y.text).length ? w.prev().find(y.text) : w.prev(), E = w.children(y.menu), O = E.find(y.item);
        },
        refreshData: function refreshData() {
          g.verbose("Refreshing cached metadata"), O.removeData(b.text).removeData(b.value);
        },
        clearData: function clearData() {
          g.verbose("Clearing metadata"), O.removeData(b.text).removeData(b.value), w.removeData(b.defaultText).removeData(b.defaultValue).removeData(b.placeholderText);
        },
        toggle: function toggle() {
          g.verbose("Toggling menu visibility"), g.is.active() ? g.hide() : g.show();
        },
        show: function show(e) {
          if (e = K.isFunction(e) ? e : function () {}, !g.can.show() && g.is.remote() && (g.debug("No API results retrieved, searching before show"), g.queryRemote(g.get.query(), g.show)), g.can.show() && !g.is.active()) {
            if (g.debug("Showing dropdown"), !g.has.message() || g.has.maxSelections() || g.has.allResultsFiltered() || g.remove.message(), g.is.allFiltered()) return !0;
            !1 !== p.onShow.call(j) && g.animate.show(function () {
              g.can.click() && g.bind.intent(), g.has.menuSearch() && g.focusSearch(), g.set.visible(), e.call(j);
            });
          }
        },
        hide: function hide(e) {
          e = K.isFunction(e) ? e : function () {}, g.is.active() && !g.is.animatingOutward() && (g.debug("Hiding dropdown"), !1 !== p.onHide.call(j) && g.animate.hide(function () {
            g.remove.visible(), e.call(j);
          }));
        },
        hideOthers: function hideOthers() {
          g.verbose("Finding other dropdowns to hide"), V.not(w).has(y.menu + "." + h.visible).dropdown("hide");
        },
        hideMenu: function hideMenu() {
          g.verbose("Hiding menu  instantaneously"), g.remove.active(), g.remove.visible(), E.transition("hide");
        },
        hideSubMenus: function hideSubMenus() {
          var e = E.children(y.item).find(y.menu);
          g.verbose("Hiding sub menus", e), e.transition("hide");
        },
        bind: {
          events: function events() {
            U && g.bind.touchEvents(), g.bind.keyboardEvents(), g.bind.inputEvents(), g.bind.mouseEvents();
          },
          touchEvents: function touchEvents() {
            g.debug("Touch device detected binding additional touch events"), g.is.searchSelection() || g.is.single() && w.on("touchstart" + x, g.event.test.toggle), E.on("touchstart" + x, y.item, g.event.item.mouseenter);
          },
          keyboardEvents: function keyboardEvents() {
            g.verbose("Binding keyboard events"), w.on("keydown" + x, g.event.keydown), g.has.search() && w.on(g.get.inputEvent() + x, y.search, g.event.input), g.is.multiple() && N.on("keydown" + o, g.event.document.keydown);
          },
          inputEvents: function inputEvents() {
            g.verbose("Binding input change events"), w.on("change" + x, y.input, g.event.change);
          },
          mouseEvents: function mouseEvents() {
            g.verbose("Binding mouse events"), g.is.multiple() && w.on("click" + x, y.label, g.event.label.click).on("click" + x, y.remove, g.event.remove.click), g.is.searchSelection() ? (w.on("mousedown" + x, g.event.mousedown).on("mouseup" + x, g.event.mouseup).on("mousedown" + x, y.menu, g.event.menu.mousedown).on("mouseup" + x, y.menu, g.event.menu.mouseup).on("click" + x, y.icon, g.event.icon.click).on("focus" + x, y.search, g.event.search.focus).on("click" + x, y.search, g.event.search.focus).on("blur" + x, y.search, g.event.search.blur).on("click" + x, y.text, g.event.text.focus), g.is.multiple() && w.on("click" + x, g.event.click)) : ("click" == p.on ? w.on("click" + x, g.event.test.toggle) : "hover" == p.on ? w.on("mouseenter" + x, g.delay.show).on("mouseleave" + x, g.delay.hide) : w.on(p.on + x, g.toggle), w.on("click" + x, y.icon, g.event.icon.click).on("mousedown" + x, g.event.mousedown).on("mouseup" + x, g.event.mouseup).on("focus" + x, g.event.focus), g.has.menuSearch() ? w.on("blur" + x, y.search, g.event.search.blur) : w.on("blur" + x, g.event.blur)), E.on("mouseenter" + x, y.item, g.event.item.mouseenter).on("mouseleave" + x, y.item, g.event.item.mouseleave).on("click" + x, y.item, g.event.item.click);
          },
          intent: function intent() {
            g.verbose("Binding hide intent event to document"), U && N.on("touchstart" + o, g.event.test.touch).on("touchmove" + o, g.event.test.touch), N.on("click" + o, g.event.test.hide);
          }
        },
        unbind: {
          intent: function intent() {
            g.verbose("Removing hide intent event from document"), U && N.off("touchstart" + o).off("touchmove" + o), N.off("click" + o);
          }
        },
        filter: function filter(e) {
          var t = e !== Y ? e : g.get.query(),
              n = function n() {
            g.is.multiple() && g.filterActive(), (e || !e && 0 == g.get.activeItem().length) && g.select.firstUnfiltered(), g.has.allResultsFiltered() ? p.onNoResults.call(j, t) ? p.allowAdditions ? p.hideAdditions && (g.verbose("User addition with no menu, setting empty style"), g.set.empty(), g.hideMenu()) : (g.verbose("All items filtered, showing message", t), g.add.message(c.noResults)) : (g.verbose("All items filtered, hiding dropdown", t), g.hideMenu()) : (g.remove.empty(), g.remove.message()), p.allowAdditions && g.add.userSuggestion(e), g.is.searchSelection() && g.can.show() && g.is.focusedOnSearch() && g.show();
          };

          p.useLabels && g.has.maxSelections() || (p.apiSettings ? g.can.useAPI() ? g.queryRemote(t, function () {
            p.filterRemoteData && g.filterItems(t), n();
          }) : g.error(f.noAPI) : (g.filterItems(t), n()));
        },
        queryRemote: function queryRemote(e, n) {
          var t = {
            errorDuration: !1,
            cache: "local",
            throttle: p.throttle,
            urlData: {
              query: e
            },
            onError: function onError() {
              g.add.message(c.serverError), n();
            },
            onFailure: function onFailure() {
              g.add.message(c.serverError), n();
            },
            onSuccess: function onSuccess(e) {
              var t = e[l.remoteValues];
              K.isArray(t) && 0 < t.length ? (g.remove.message(), g.setup.menu({
                values: e[l.remoteValues]
              })) : g.add.message(c.noResults), n();
            }
          };
          w.api("get request") || g.setup.api(), t = K.extend(!0, {}, t, p.apiSettings), w.api("setting", t).api("query");
        },
        filterItems: function filterItems(e) {
          var i = e !== Y ? e : g.get.query(),
              o = null,
              t = g.escape.string(i),
              a = new RegExp("^" + t, "igm");
          g.has.query() && (o = [], g.verbose("Searching for matching values", i), O.each(function () {
            var e,
                t,
                n = K(this);

            if ("both" == p.match || "text" == p.match) {
              if (-1 !== (e = String(g.get.choiceText(n, !1))).search(a)) return o.push(this), !0;
              if ("exact" === p.fullTextSearch && g.exactSearch(i, e)) return o.push(this), !0;
              if (!0 === p.fullTextSearch && g.fuzzySearch(i, e)) return o.push(this), !0;
            }

            if ("both" == p.match || "value" == p.match) {
              if (-1 !== (t = String(g.get.choiceValue(n, e))).search(a)) return o.push(this), !0;
              if ("exact" === p.fullTextSearch && g.exactSearch(i, t)) return o.push(this), !0;
              if (!0 === p.fullTextSearch && g.fuzzySearch(i, t)) return o.push(this), !0;
            }
          })), g.debug("Showing only matched items", i), g.remove.filteredItem(), o && O.not(o).addClass(h.filtered);
        },
        fuzzySearch: function fuzzySearch(e, t) {
          var n = t.length,
              i = e.length;
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
        exactSearch: function exactSearch(e, t) {
          return e = e.toLowerCase(), -1 < (t = t.toLowerCase()).indexOf(e);
        },
        filterActive: function filterActive() {
          p.useLabels && O.filter("." + h.active).addClass(h.filtered);
        },
        focusSearch: function focusSearch(e) {
          g.has.search() && !g.is.focusedOnSearch() && (e ? (w.off("focus" + x, y.search), k.focus(), w.on("focus" + x, y.search, g.event.search.focus)) : k.focus());
        },
        forceSelection: function forceSelection() {
          var e = O.not(h.filtered).filter("." + h.selected).eq(0),
              t = O.not(h.filtered).filter("." + h.active).eq(0),
              n = 0 < e.length ? e : t;
          if (0 < n.length && !g.is.multiple()) return g.debug("Forcing partial selection to selected item", n), void g.event.item.click.call(n, {}, !0);
          p.allowAdditions && g.set.selected(g.get.query()), g.remove.searchTerm();
        },
        change: {
          values: function values(e) {
            p.allowAdditions || g.clear(), g.debug("Creating dropdown with specified values", e), g.setup.menu({
              values: e
            }), K.each(e, function (e, t) {
              if (1 == t.selected) return g.debug("Setting initial selection to", t.value), g.set.selected(t.value), !0;
            });
          }
        },
        event: {
          change: function change() {
            L || (g.debug("Input changed, updating selection"), g.set.selected());
          },
          focus: function focus() {
            p.showOnFocus && !D && g.is.hidden() && !t && g.show();
          },
          blur: function blur(e) {
            t = G.activeElement === this, D || t || (g.remove.activeLabel(), g.hide());
          },
          mousedown: function mousedown() {
            g.is.searchSelection() ? i = !0 : D = !0;
          },
          mouseup: function mouseup() {
            g.is.searchSelection() ? i = !1 : D = !1;
          },
          click: function click(e) {
            K(e.target).is(w) && (g.is.focusedOnSearch() ? g.show() : g.focusSearch());
          },
          search: {
            focus: function focus() {
              D = !0, g.is.multiple() && g.remove.activeLabel(), p.showOnFocus && g.search();
            },
            blur: function blur(e) {
              t = G.activeElement === this, g.is.searchSelection() && !i && (q || t || (p.forceSelection && g.forceSelection(), g.hide())), i = !1;
            }
          },
          icon: {
            click: function click(e) {
              P.hasClass(h.clear) ? g.clear() : g.can.click() && g.toggle();
            }
          },
          text: {
            focus: function focus(e) {
              D = !0, g.focusSearch();
            }
          },
          input: function input(e) {
            (g.is.multiple() || g.is.searchSelection()) && g.set.filtered(), clearTimeout(g.timer), g.timer = setTimeout(g.search, p.delay.search);
          },
          label: {
            click: function click(e) {
              var t = K(this),
                  n = w.find(y.label),
                  i = n.filter("." + h.active),
                  o = t.nextAll("." + h.active),
                  a = t.prevAll("." + h.active),
                  r = 0 < o.length ? t.nextUntil(o).add(i).add(t) : t.prevUntil(a).add(i).add(t);
              e.shiftKey ? (i.removeClass(h.active), r.addClass(h.active)) : e.ctrlKey ? t.toggleClass(h.active) : (i.removeClass(h.active), t.addClass(h.active)), p.onLabelSelect.apply(this, n.filter("." + h.active));
            }
          },
          remove: {
            click: function click() {
              var e = K(this).parent();
              e.hasClass(h.active) ? g.remove.activeLabels() : g.remove.activeLabels(e);
            }
          },
          test: {
            toggle: function toggle(e) {
              var t = g.is.multiple() ? g.show : g.toggle;
              g.is.bubbledLabelClick(e) || g.is.bubbledIconClick(e) || g.determine.eventOnElement(e, t) && e.preventDefault();
            },
            touch: function touch(e) {
              g.determine.eventOnElement(e, function () {
                "touchstart" == e.type ? g.timer = setTimeout(function () {
                  g.hide();
                }, p.delay.touch) : "touchmove" == e.type && clearTimeout(g.timer);
              }), e.stopPropagation();
            },
            hide: function hide(e) {
              g.determine.eventInModule(e, g.hide);
            }
          },
          select: {
            mutation: function mutation(e) {
              g.debug("<select> modified, recreating menu");
              var n = !1;
              K.each(e, function (e, t) {
                if (K(t.target).is("select") || K(t.addedNodes).is("select")) return n = !0;
              }), n && (g.disconnect.selectObserver(), g.refresh(), g.setup.select(), g.set.selected(), g.observe.select());
            }
          },
          menu: {
            mutation: function mutation(e) {
              var t = e[0],
                  n = t.addedNodes ? K(t.addedNodes[0]) : K(!1),
                  i = t.removedNodes ? K(t.removedNodes[0]) : K(!1),
                  o = n.add(i),
                  a = o.is(y.addition) || 0 < o.closest(y.addition).length,
                  r = o.is(y.message) || 0 < o.closest(y.message).length;
              a || r ? (g.debug("Updating item selector cache"), g.refreshItems()) : (g.debug("Menu modified, updating selector cache"), g.refresh());
            },
            mousedown: function mousedown() {
              q = !0;
            },
            mouseup: function mouseup() {
              q = !1;
            }
          },
          item: {
            mouseenter: function mouseenter(e) {
              var t = K(e.target),
                  n = K(this),
                  i = n.children(y.menu),
                  o = n.siblings(y.item).children(y.menu),
                  a = 0 < i.length;
              !(0 < i.find(t).length) && a && (clearTimeout(g.itemTimer), g.itemTimer = setTimeout(function () {
                g.verbose("Showing sub-menu", i), K.each(o, function () {
                  g.animate.hide(!1, K(this));
                }), g.animate.show(!1, i);
              }, p.delay.show), e.preventDefault());
            },
            mouseleave: function mouseleave(e) {
              var t = K(this).children(y.menu);
              0 < t.length && (clearTimeout(g.itemTimer), g.itemTimer = setTimeout(function () {
                g.verbose("Hiding sub-menu", t), g.animate.hide(!1, t);
              }, p.delay.hide));
            },
            click: function click(e, t) {
              var n = K(this),
                  i = K(e ? e.target : ""),
                  o = n.find(y.menu),
                  a = g.get.choiceText(n),
                  r = g.get.choiceValue(n, a),
                  s = 0 < o.length,
                  l = 0 < o.find(i).length;
              g.has.menuSearch() && K(G.activeElement).blur(), l || s && !p.allowCategorySelection || (g.is.searchSelection() && (p.allowAdditions && g.remove.userAddition(), g.remove.searchTerm(), g.is.focusedOnSearch() || 1 == t || g.focusSearch(!0)), p.useLabels || (g.remove.filteredItem(), g.set.scrollPosition(n)), g.determine.selectAction.call(this, a, r));
            }
          },
          document: {
            keydown: function keydown(e) {
              var t = e.which;

              if (g.is.inObject(t, v)) {
                var n = w.find(y.label),
                    i = n.filter("." + h.active),
                    o = (i.data(b.value), n.index(i)),
                    a = n.length,
                    r = 0 < i.length,
                    s = 1 < i.length,
                    l = 0 === o,
                    c = o + 1 == a,
                    u = g.is.searchSelection(),
                    d = g.is.focusedOnSearch(),
                    f = g.is.focused(),
                    m = d && 0 === g.get.caretPosition();
                if (u && !r && !d) return;
                t == v.leftArrow ? !f && !m || r ? r && (e.shiftKey ? g.verbose("Adding previous label to selection") : (g.verbose("Selecting previous label"), n.removeClass(h.active)), l && !s ? i.addClass(h.active) : i.prev(y.siblingLabel).addClass(h.active).end(), e.preventDefault()) : (g.verbose("Selecting previous label"), n.last().addClass(h.active)) : t == v.rightArrow ? (f && !r && n.first().addClass(h.active), r && (e.shiftKey ? g.verbose("Adding next label to selection") : (g.verbose("Selecting next label"), n.removeClass(h.active)), c ? u ? d ? n.removeClass(h.active) : g.focusSearch() : s ? i.next(y.siblingLabel).addClass(h.active) : i.addClass(h.active) : i.next(y.siblingLabel).addClass(h.active), e.preventDefault())) : t == v.deleteKey || t == v.backspace ? r ? (g.verbose("Removing active labels"), c && u && !d && g.focusSearch(), i.last().next(y.siblingLabel).addClass(h.active), g.remove.activeLabels(i), e.preventDefault()) : m && !r && t == v.backspace && (g.verbose("Removing last label on input backspace"), i = n.last().addClass(h.active), g.remove.activeLabels(i)) : i.removeClass(h.active);
              }
            }
          },
          keydown: function keydown(e) {
            var t = e.which;

            if (g.is.inObject(t, v)) {
              var n,
                  i = O.not(y.unselectable).filter("." + h.selected).eq(0),
                  o = E.children("." + h.active).eq(0),
                  a = 0 < i.length ? i : o,
                  r = 0 < a.length ? a.siblings(":not(." + h.filtered + ")").addBack() : E.children(":not(." + h.filtered + ")"),
                  s = a.children(y.menu),
                  l = a.closest(y.menu),
                  c = l.hasClass(h.visible) || l.hasClass(h.animating) || 0 < l.parent(y.menu).length,
                  u = 0 < s.length,
                  d = 0 < a.length,
                  f = 0 < a.not(y.unselectable).length,
                  m = t == v.delimiter && p.allowAdditions && g.is.multiple();

              if (p.allowAdditions && p.hideAdditions && (t == v.enter || m) && f && (g.verbose("Selecting item from keyboard shortcut", a), g.event.item.click.call(a, e), g.is.searchSelection() && g.remove.searchTerm()), g.is.visible()) {
                if ((t == v.enter || m) && (t == v.enter && d && u && !p.allowCategorySelection ? (g.verbose("Pressed enter on unselectable category, opening sub menu"), t = v.rightArrow) : f && (g.verbose("Selecting item from keyboard shortcut", a), g.event.item.click.call(a, e), g.is.searchSelection() && g.remove.searchTerm()), e.preventDefault()), d && (t == v.leftArrow && l[0] !== E[0] && (g.verbose("Left key pressed, closing sub-menu"), g.animate.hide(!1, l), a.removeClass(h.selected), l.closest(y.item).addClass(h.selected), e.preventDefault()), t == v.rightArrow && u && (g.verbose("Right key pressed, opening sub-menu"), g.animate.show(!1, s), a.removeClass(h.selected), s.find(y.item).eq(0).addClass(h.selected), e.preventDefault())), t == v.upArrow) {
                  if (n = d && c ? a.prevAll(y.item + ":not(" + y.unselectable + ")").eq(0) : O.eq(0), r.index(n) < 0) return g.verbose("Up key pressed but reached top of current menu"), void e.preventDefault();
                  g.verbose("Up key pressed, changing active item"), a.removeClass(h.selected), n.addClass(h.selected), g.set.scrollPosition(n), p.selectOnKeydown && g.is.single() && g.set.selectedItem(n), e.preventDefault();
                }

                if (t == v.downArrow) {
                  if (0 === (n = d && c ? n = a.nextAll(y.item + ":not(" + y.unselectable + ")").eq(0) : O.eq(0)).length) return g.verbose("Down key pressed but reached bottom of current menu"), void e.preventDefault();
                  g.verbose("Down key pressed, changing active item"), O.removeClass(h.selected), n.addClass(h.selected), g.set.scrollPosition(n), p.selectOnKeydown && g.is.single() && g.set.selectedItem(n), e.preventDefault();
                }

                t == v.pageUp && (g.scrollPage("up"), e.preventDefault()), t == v.pageDown && (g.scrollPage("down"), e.preventDefault()), t == v.escape && (g.verbose("Escape key pressed, closing dropdown"), g.hide());
              } else m && e.preventDefault(), t != v.downArrow || g.is.visible() || (g.verbose("Down key pressed, showing dropdown"), g.show(), e.preventDefault());
            } else g.has.search() || g.set.selectedLetter(String.fromCharCode(t));
          }
        },
        trigger: {
          change: function change() {
            var e = G.createEvent("HTMLEvents"),
                t = R[0];
            t && (g.verbose("Triggering native change event"), e.initEvent("change", !0, !1), t.dispatchEvent(e));
          }
        },
        determine: {
          selectAction: function selectAction(e, t) {
            g.verbose("Determining action", p.action), K.isFunction(g.action[p.action]) ? (g.verbose("Triggering preset action", p.action, e, t), g.action[p.action].call(j, e, t, this)) : K.isFunction(p.action) ? (g.verbose("Triggering user action", p.action, e, t), p.action.call(j, e, t, this)) : g.error(f.action, p.action);
          },
          eventInModule: function eventInModule(e, t) {
            var n = K(e.target),
                i = 0 < n.closest(G.documentElement).length,
                o = 0 < n.closest(w).length;
            return t = K.isFunction(t) ? t : function () {}, i && !o ? (g.verbose("Triggering event", t), t(), !0) : (g.verbose("Event occurred in dropdown, canceling callback"), !1);
          },
          eventOnElement: function eventOnElement(e, t) {
            var n = K(e.target),
                i = n.closest(y.siblingLabel),
                o = G.body.contains(e.target),
                a = 0 === w.find(i).length,
                r = 0 === n.closest(E).length;
            return t = K.isFunction(t) ? t : function () {}, o && a && r ? (g.verbose("Triggering event", t), t(), !0) : (g.verbose("Event occurred in dropdown menu, canceling callback"), !1);
          }
        },
        action: {
          nothing: function nothing() {},
          activate: function activate(e, t, n) {
            if (t = t !== Y ? t : e, g.can.activate(K(n))) {
              if (g.set.selected(t, K(n)), g.is.multiple() && !g.is.allFiltered()) return;
              g.hideAndClear();
            }
          },
          select: function select(e, t, n) {
            if (t = t !== Y ? t : e, g.can.activate(K(n))) {
              if (g.set.value(t, e, K(n)), g.is.multiple() && !g.is.allFiltered()) return;
              g.hideAndClear();
            }
          },
          combo: function combo(e, t, n) {
            t = t !== Y ? t : e, g.set.selected(t, K(n)), g.hideAndClear();
          },
          hide: function hide(e, t, n) {
            g.set.value(t, e, K(n)), g.hideAndClear();
          }
        },
        get: {
          id: function id() {
            return a;
          },
          defaultText: function defaultText() {
            return w.data(b.defaultText);
          },
          defaultValue: function defaultValue() {
            return w.data(b.defaultValue);
          },
          placeholderText: function placeholderText() {
            return "auto" != p.placeholder && "string" == typeof p.placeholder ? p.placeholder : w.data(b.placeholderText) || "";
          },
          text: function text() {
            return T.text();
          },
          query: function query() {
            return K.trim(k.val());
          },
          searchWidth: function searchWidth(e) {
            return e = e !== Y ? e : k.val(), A.text(e), Math.ceil(A.width() + 1);
          },
          selectionCount: function selectionCount() {
            var e = g.get.values();
            return g.is.multiple() ? K.isArray(e) ? e.length : 0 : "" !== g.get.value() ? 1 : 0;
          },
          transition: function transition(e) {
            return "auto" == p.transition ? g.is.upward(e) ? "slide up" : "slide down" : p.transition;
          },
          userValues: function userValues() {
            var e = g.get.values();
            return !!e && (e = K.isArray(e) ? e : [e], K.grep(e, function (e) {
              return !1 === g.get.item(e);
            }));
          },
          uniqueArray: function uniqueArray(n) {
            return K.grep(n, function (e, t) {
              return K.inArray(e, n) === t;
            });
          },
          caretPosition: function caretPosition() {
            var e,
                t,
                n = k.get(0);
            return "selectionStart" in n ? n.selectionStart : G.selection ? (n.focus(), t = (e = G.selection.createRange()).text.length, e.moveStart("character", -n.value.length), e.text.length - t) : void 0;
          },
          value: function value() {
            var e = 0 < R.length ? R.val() : w.data(b.value),
                t = K.isArray(e) && 1 === e.length && "" === e[0];
            return e === Y || t ? "" : e;
          },
          values: function values() {
            var e = g.get.value();
            return "" === e ? "" : !g.has.selectInput() && g.is.multiple() ? "string" == typeof e ? e.split(p.delimiter) : "" : e;
          },
          remoteValues: function remoteValues() {
            var e = g.get.values(),
                i = !1;
            return e && ("string" == typeof e && (e = [e]), K.each(e, function (e, t) {
              var n = g.read.remoteData(t);
              g.verbose("Restoring value from session data", n, t), n && (i || (i = {}), i[t] = n);
            })), i;
          },
          choiceText: function choiceText(e, t) {
            if (t = t !== Y ? t : p.preserveHTML, e) return 0 < e.find(y.menu).length && (g.verbose("Retrieving text of element with sub-menu"), (e = e.clone()).find(y.menu).remove(), e.find(y.menuIcon).remove()), e.data(b.text) !== Y ? e.data(b.text) : t ? K.trim(e.html()) : K.trim(e.text());
          },
          choiceValue: function choiceValue(e, t) {
            return t = t || g.get.choiceText(e), !!e && (e.data(b.value) !== Y ? String(e.data(b.value)) : "string" == typeof t ? K.trim(t.toLowerCase()) : String(t));
          },
          inputEvent: function inputEvent() {
            var e = k[0];
            return !!e && (e.oninput !== Y ? "input" : e.onpropertychange !== Y ? "propertychange" : "keyup");
          },
          selectValues: function selectValues() {
            var o = {
              values: []
            };
            return w.find("option").each(function () {
              var e = K(this),
                  t = e.html(),
                  n = e.attr("disabled"),
                  i = e.attr("value") !== Y ? e.attr("value") : t;
              "auto" === p.placeholder && "" === i ? o.placeholder = t : o.values.push({
                name: t,
                value: i,
                disabled: n
              });
            }), p.placeholder && "auto" !== p.placeholder && (g.debug("Setting placeholder value to", p.placeholder), o.placeholder = p.placeholder), p.sortSelect ? (o.values.sort(function (e, t) {
              return e.name > t.name ? 1 : -1;
            }), g.debug("Retrieved and sorted values from select", o)) : g.debug("Retrieved values from select", o), o;
          },
          activeItem: function activeItem() {
            return O.filter("." + h.active);
          },
          selectedItem: function selectedItem() {
            var e = O.not(y.unselectable).filter("." + h.selected);
            return 0 < e.length ? e : O.eq(0);
          },
          itemWithAdditions: function itemWithAdditions(e) {
            var t = g.get.item(e),
                n = g.create.userChoice(e);
            return n && 0 < n.length && (t = 0 < t.length ? t.add(n) : n), t;
          },
          item: function item(i, o) {
            var e,
                a,
                r = !1;
            return i = i !== Y ? i : g.get.values() !== Y ? g.get.values() : g.get.text(), e = a ? 0 < i.length : i !== Y && null !== i, a = g.is.multiple() && K.isArray(i), o = "" === i || 0 === i || o || !1, e && O.each(function () {
              var e = K(this),
                  t = g.get.choiceText(e),
                  n = g.get.choiceValue(e, t);
              if (null !== n && n !== Y) if (a) -1 === K.inArray(String(n), i) && -1 === K.inArray(t, i) || (r = r ? r.add(e) : e);else if (o) {
                if (g.verbose("Ambiguous dropdown value using strict type check", e, i), n === i || t === i) return r = e, !0;
              } else if (String(n) == String(i) || t == i) return g.verbose("Found select item by value", n, i), r = e, !0;
            }), r;
          }
        },
        check: {
          maxSelections: function maxSelections(e) {
            return !p.maxSelections || ((e = e !== Y ? e : g.get.selectionCount()) >= p.maxSelections ? (g.debug("Maximum selection count reached"), p.useLabels && (O.addClass(h.filtered), g.add.message(c.maxSelections)), !0) : (g.verbose("No longer at maximum selection count"), g.remove.message(), g.remove.filteredItem(), g.is.searchSelection() && g.filterItems(), !1));
          }
        },
        restore: {
          defaults: function defaults() {
            g.clear(), g.restore.defaultText(), g.restore.defaultValue();
          },
          defaultText: function defaultText() {
            var e = g.get.defaultText();
            e === g.get.placeholderText ? (g.debug("Restoring default placeholder text", e), g.set.placeholderText(e)) : (g.debug("Restoring default text", e), g.set.text(e));
          },
          placeholderText: function placeholderText() {
            g.set.placeholderText();
          },
          defaultValue: function defaultValue() {
            var e = g.get.defaultValue();
            e !== Y && (g.debug("Restoring default value", e), "" !== e ? (g.set.value(e), g.set.selected()) : (g.remove.activeItem(), g.remove.selectedItem()));
          },
          labels: function labels() {
            p.allowAdditions && (p.useLabels || (g.error(f.labels), p.useLabels = !0), g.debug("Restoring selected values"), g.create.userLabels()), g.check.maxSelections();
          },
          selected: function selected() {
            g.restore.values(), g.is.multiple() ? (g.debug("Restoring previously selected values and labels"), g.restore.labels()) : g.debug("Restoring previously selected values");
          },
          values: function values() {
            g.set.initialLoad(), p.apiSettings && p.saveRemoteData && g.get.remoteValues() ? g.restore.remoteValues() : g.set.selected(), g.remove.initialLoad();
          },
          remoteValues: function remoteValues() {
            var e = g.get.remoteValues();
            g.debug("Recreating selected from session data", e), e && (g.is.single() ? K.each(e, function (e, t) {
              g.set.text(t);
            }) : K.each(e, function (e, t) {
              g.add.label(e, t);
            }));
          }
        },
        read: {
          remoteData: function remoteData(e) {
            var t;
            if (J.Storage !== Y) return (t = sessionStorage.getItem(e)) !== Y && t;
            g.error(f.noStorage);
          }
        },
        save: {
          defaults: function defaults() {
            g.save.defaultText(), g.save.placeholderText(), g.save.defaultValue();
          },
          defaultValue: function defaultValue() {
            var e = g.get.value();
            g.verbose("Saving default value as", e), w.data(b.defaultValue, e);
          },
          defaultText: function defaultText() {
            var e = g.get.text();
            g.verbose("Saving default text as", e), w.data(b.defaultText, e);
          },
          placeholderText: function placeholderText() {
            var e;
            !1 !== p.placeholder && T.hasClass(h.placeholder) && (e = g.get.text(), g.verbose("Saving placeholder text as", e), w.data(b.placeholderText, e));
          },
          remoteData: function remoteData(e, t) {
            J.Storage !== Y ? (g.verbose("Saving remote data to session storage", t, e), sessionStorage.setItem(t, e)) : g.error(f.noStorage);
          }
        },
        clear: function clear() {
          g.is.multiple() && p.useLabels ? g.remove.labels() : (g.remove.activeItem(), g.remove.selectedItem()), g.set.placeholderText(), g.clearValue();
        },
        clearValue: function clearValue() {
          g.set.value("");
        },
        scrollPage: function scrollPage(e, t) {
          var n,
              i,
              o = t || g.get.selectedItem(),
              a = o.closest(y.menu),
              r = a.outerHeight(),
              s = a.scrollTop(),
              l = O.eq(0).outerHeight(),
              c = Math.floor(r / l),
              u = (a.prop("scrollHeight"), "up" == e ? s - l * c : s + l * c),
              d = O.not(y.unselectable);
          i = "up" == e ? d.index(o) - c : d.index(o) + c, 0 < (n = ("up" == e ? 0 <= i : i < d.length) ? d.eq(i) : "up" == e ? d.first() : d.last()).length && (g.debug("Scrolling page", e, n), o.removeClass(h.selected), n.addClass(h.selected), p.selectOnKeydown && g.is.single() && g.set.selectedItem(n), a.scrollTop(u));
        },
        set: {
          filtered: function filtered() {
            var e = g.is.multiple(),
                t = g.is.searchSelection(),
                n = e && t,
                i = t ? g.get.query() : "",
                o = "string" == typeof i && 0 < i.length,
                a = g.get.searchWidth(),
                r = "" !== i;
            e && o && (g.verbose("Adjusting input width", a, p.glyphWidth), k.css("width", a)), o || n && r ? (g.verbose("Hiding placeholder text"), T.addClass(h.filtered)) : (!e || n && !r) && (g.verbose("Showing placeholder text"), T.removeClass(h.filtered));
          },
          empty: function empty() {
            w.addClass(h.empty);
          },
          loading: function loading() {
            w.addClass(h.loading);
          },
          placeholderText: function placeholderText(e) {
            e = e || g.get.placeholderText(), g.debug("Setting placeholder text", e), g.set.text(e), T.addClass(h.placeholder);
          },
          tabbable: function tabbable() {
            g.is.searchSelection() ? (g.debug("Added tabindex to searchable dropdown"), k.val("").attr("tabindex", 0), E.attr("tabindex", -1)) : (g.debug("Added tabindex to dropdown"), w.attr("tabindex") === Y && (w.attr("tabindex", 0), E.attr("tabindex", -1)));
          },
          initialLoad: function initialLoad() {
            g.verbose("Setting initial load"), e = !0;
          },
          activeItem: function activeItem(e) {
            p.allowAdditions && 0 < e.filter(y.addition).length ? e.addClass(h.filtered) : e.addClass(h.active);
          },
          partialSearch: function partialSearch(e) {
            var t = g.get.query().length;
            k.val(e.substr(0, t));
          },
          scrollPosition: function scrollPosition(e, t) {
            var n, i, o, a, r, s;
            n = (e = e || g.get.selectedItem()).closest(y.menu), i = e && 0 < e.length, t = t !== Y && t, e && 0 < n.length && i && (e.position().top, n.addClass(h.loading), o = (a = n.scrollTop()) - n.offset().top + e.offset().top, t || (s = a + n.height() < o + 5, r = o - 5 < a), g.debug("Scrolling to active item", o), (t || r || s) && n.scrollTop(o), n.removeClass(h.loading));
          },
          text: function text(e) {
            "select" !== p.action && ("combo" == p.action ? (g.debug("Changing combo button text", e, F), p.preserveHTML ? F.html(e) : F.text(e)) : (e !== g.get.placeholderText() && T.removeClass(h.placeholder), g.debug("Changing text", e, T), T.removeClass(h.filtered), p.preserveHTML ? T.html(e) : T.text(e)));
          },
          selectedItem: function selectedItem(e) {
            var t = g.get.choiceValue(e),
                n = g.get.choiceText(e, !1),
                i = g.get.choiceText(e, !0);
            g.debug("Setting user selection to item", e), g.remove.activeItem(), g.set.partialSearch(n), g.set.activeItem(e), g.set.selected(t, e), g.set.text(i);
          },
          selectedLetter: function selectedLetter(e) {
            var t,
                n = O.filter("." + h.selected),
                i = 0 < n.length && g.has.firstLetter(n, e),
                o = !1;
            i && (t = n.nextAll(O).eq(0), g.has.firstLetter(t, e) && (o = t)), o || O.each(function () {
              if (g.has.firstLetter(K(this), e)) return o = K(this), !1;
            }), o && (g.verbose("Scrolling to next value with letter", e), g.set.scrollPosition(o), n.removeClass(h.selected), o.addClass(h.selected), p.selectOnKeydown && g.is.single() && g.set.selectedItem(o));
          },
          direction: function direction(e) {
            "auto" == p.direction ? (g.remove.upward(), g.can.openDownward(e) ? g.remove.upward(e) : g.set.upward(e), g.is.leftward(e) || g.can.openRightward(e) || g.set.leftward(e)) : "upward" == p.direction && g.set.upward(e);
          },
          upward: function upward(e) {
            (e || w).addClass(h.upward);
          },
          leftward: function leftward(e) {
            (e || E).addClass(h.leftward);
          },
          value: function value(e, t, n) {
            var i = g.escape.value(e),
                o = 0 < R.length,
                a = g.get.values(),
                r = e !== Y ? String(e) : e;

            if (o) {
              if (!p.allowReselection && r == a && (g.verbose("Skipping value update already same value", e, a), !g.is.initialLoad())) return;
              g.is.single() && g.has.selectInput() && g.can.extendSelect() && (g.debug("Adding user option", e), g.add.optionValue(e)), g.debug("Updating input value", i, a), L = !0, R.val(i), !1 === p.fireOnInit && g.is.initialLoad() ? g.debug("Input native change event ignored on initial load") : g.trigger.change(), L = !1;
            } else g.verbose("Storing value in metadata", i, R), i !== a && w.data(b.value, r);

            g.is.single() && p.clearable && (i ? g.set.clearable() : g.remove.clearable()), !1 === p.fireOnInit && g.is.initialLoad() ? g.verbose("No callback on initial load", p.onChange) : p.onChange.call(j, e, t, n);
          },
          active: function active() {
            w.addClass(h.active);
          },
          multiple: function multiple() {
            w.addClass(h.multiple);
          },
          visible: function visible() {
            w.addClass(h.visible);
          },
          exactly: function exactly(e, t) {
            g.debug("Setting selected to exact values"), g.clear(), g.set.selected(e, t);
          },
          selected: function selected(e, s) {
            var l = g.is.multiple();
            (s = p.allowAdditions ? s || g.get.itemWithAdditions(e) : s || g.get.item(e)) && (g.debug("Setting selected menu item to", s), g.is.multiple() && g.remove.searchWidth(), g.is.single() ? (g.remove.activeItem(), g.remove.selectedItem()) : p.useLabels && g.remove.selectedItem(), s.each(function () {
              var e = K(this),
                  t = g.get.choiceText(e),
                  n = g.get.choiceValue(e, t),
                  i = e.hasClass(h.filtered),
                  o = e.hasClass(h.active),
                  a = e.hasClass(h.addition),
                  r = l && 1 == s.length;
              l ? !o || a ? (p.apiSettings && p.saveRemoteData && g.save.remoteData(t, n), p.useLabels ? (g.add.label(n, t, r), g.add.value(n, t, e), g.set.activeItem(e), g.filterActive(), g.select.nextAvailable(s)) : (g.add.value(n, t, e), g.set.text(g.add.variables(c.count)), g.set.activeItem(e))) : i || (g.debug("Selected active value, removing label"), g.remove.selected(n)) : (p.apiSettings && p.saveRemoteData && g.save.remoteData(t, n), g.set.text(t), g.set.value(n, t, e), e.addClass(h.active).addClass(h.selected));
            }));
          },
          clearable: function clearable() {
            P.addClass(h.clear);
          }
        },
        add: {
          label: function label(e, t, n) {
            var i,
                o = g.is.searchSelection() ? k : T,
                a = g.escape.value(e);
            p.ignoreCase && (a = a.toLowerCase()), i = K("<a />").addClass(h.label).attr("data-" + b.value, a).html(m.label(a, t)), i = p.onLabelCreate.call(i, a, t), g.has.label(e) ? g.debug("User selection already exists, skipping", a) : (p.label.variation && i.addClass(p.label.variation), !0 === n ? (g.debug("Animating in label", i), i.addClass(h.hidden).insertBefore(o).transition(p.label.transition, p.label.duration)) : (g.debug("Adding selection label", i), i.insertBefore(o)));
          },
          message: function message(e) {
            var t = E.children(y.message),
                n = p.templates.message(g.add.variables(e));
            0 < t.length ? t.html(n) : t = K("<div/>").html(n).addClass(h.message).appendTo(E);
          },
          optionValue: function optionValue(e) {
            var t = g.escape.value(e);
            0 < R.find('option[value="' + g.escape.string(t) + '"]').length || (g.disconnect.selectObserver(), g.is.single() && (g.verbose("Removing previous user addition"), R.find("option." + h.addition).remove()), K("<option/>").prop("value", t).addClass(h.addition).html(e).appendTo(R), g.verbose("Adding user addition as an <option>", e), g.observe.select());
          },
          userSuggestion: function userSuggestion(e) {
            var t,
                n = E.children(y.addition),
                i = g.get.item(e),
                o = i && i.not(y.addition).length,
                a = 0 < n.length;
            p.useLabels && g.has.maxSelections() || ("" === e || o ? n.remove() : (a ? (n.data(b.value, e).data(b.text, e).attr("data-" + b.value, e).attr("data-" + b.text, e).removeClass(h.filtered), p.hideAdditions || (t = p.templates.addition(g.add.variables(c.addResult, e)), n.html(t)), g.verbose("Replacing user suggestion with new value", n)) : ((n = g.create.userChoice(e)).prependTo(E), g.verbose("Adding item choice to menu corresponding with user choice addition", n)), p.hideAdditions && !g.is.allFiltered() || n.addClass(h.selected).siblings().removeClass(h.selected), g.refreshItems()));
          },
          variables: function variables(e, t) {
            var n,
                i,
                o = -1 !== e.search("{count}"),
                a = -1 !== e.search("{maxCount}"),
                r = -1 !== e.search("{term}");
            return g.verbose("Adding templated variables to message", e), o && (n = g.get.selectionCount(), e = e.replace("{count}", n)), a && (n = g.get.selectionCount(), e = e.replace("{maxCount}", p.maxSelections)), r && (i = t || g.get.query(), e = e.replace("{term}", i)), e;
          },
          value: function value(e, t, n) {
            var i,
                o = g.get.values();
            g.has.value(e) ? g.debug("Value already selected") : "" !== e ? (i = K.isArray(o) ? (i = o.concat([e]), g.get.uniqueArray(i)) : [e], g.has.selectInput() ? g.can.extendSelect() && (g.debug("Adding value to select", e, i, R), g.add.optionValue(e)) : (i = i.join(p.delimiter), g.debug("Setting hidden input to delimited value", i, R)), !1 === p.fireOnInit && g.is.initialLoad() ? g.verbose("Skipping onadd callback on initial load", p.onAdd) : p.onAdd.call(j, e, t, n), g.set.value(i, e, t, n), g.check.maxSelections()) : g.debug("Cannot select blank values from multiselect");
          }
        },
        remove: {
          active: function active() {
            w.removeClass(h.active);
          },
          activeLabel: function activeLabel() {
            w.find(y.label).removeClass(h.active);
          },
          empty: function empty() {
            w.removeClass(h.empty);
          },
          loading: function loading() {
            w.removeClass(h.loading);
          },
          initialLoad: function initialLoad() {
            e = !1;
          },
          upward: function upward(e) {
            (e || w).removeClass(h.upward);
          },
          leftward: function leftward(e) {
            (e || E).removeClass(h.leftward);
          },
          visible: function visible() {
            w.removeClass(h.visible);
          },
          activeItem: function activeItem() {
            O.removeClass(h.active);
          },
          filteredItem: function filteredItem() {
            p.useLabels && g.has.maxSelections() || (p.useLabels && g.is.multiple() ? O.not("." + h.active).removeClass(h.filtered) : O.removeClass(h.filtered), g.remove.empty());
          },
          optionValue: function optionValue(e) {
            var t = g.escape.value(e),
                n = R.find('option[value="' + g.escape.string(t) + '"]');
            0 < n.length && n.hasClass(h.addition) && (r && (r.disconnect(), g.verbose("Temporarily disconnecting mutation observer")), n.remove(), g.verbose("Removing user addition as an <option>", t), r && r.observe(R[0], {
              childList: !0,
              subtree: !0
            }));
          },
          message: function message() {
            E.children(y.message).remove();
          },
          searchWidth: function searchWidth() {
            k.css("width", "");
          },
          searchTerm: function searchTerm() {
            g.verbose("Cleared search term"), k.val(""), g.set.filtered();
          },
          userAddition: function userAddition() {
            O.filter(y.addition).remove();
          },
          selected: function selected(e, t) {
            if (!(t = p.allowAdditions ? t || g.get.itemWithAdditions(e) : t || g.get.item(e))) return !1;
            t.each(function () {
              var e = K(this),
                  t = g.get.choiceText(e),
                  n = g.get.choiceValue(e, t);
              g.is.multiple() ? p.useLabels ? (g.remove.value(n, t, e), g.remove.label(n)) : (g.remove.value(n, t, e), 0 === g.get.selectionCount() ? g.set.placeholderText() : g.set.text(g.add.variables(c.count))) : g.remove.value(n, t, e), e.removeClass(h.filtered).removeClass(h.active), p.useLabels && e.removeClass(h.selected);
            });
          },
          selectedItem: function selectedItem() {
            O.removeClass(h.selected);
          },
          value: function value(e, t, n) {
            var i,
                o = g.get.values();
            g.has.selectInput() ? (g.verbose("Input is <select> removing selected option", e), i = g.remove.arrayValue(e, o), g.remove.optionValue(e)) : (g.verbose("Removing from delimited values", e), i = (i = g.remove.arrayValue(e, o)).join(p.delimiter)), !1 === p.fireOnInit && g.is.initialLoad() ? g.verbose("No callback on initial load", p.onRemove) : p.onRemove.call(j, e, t, n), g.set.value(i, t, n), g.check.maxSelections();
          },
          arrayValue: function arrayValue(t, e) {
            return K.isArray(e) || (e = [e]), e = K.grep(e, function (e) {
              return t != e;
            }), g.verbose("Removed value from delimited string", t, e), e;
          },
          label: function label(e, t) {
            var n = w.find(y.label).filter("[data-" + b.value + '="' + g.escape.string(e) + '"]');
            g.verbose("Removing label", n), n.remove();
          },
          activeLabels: function activeLabels(e) {
            e = e || w.find(y.label).filter("." + h.active), g.verbose("Removing active label selections", e), g.remove.labels(e);
          },
          labels: function labels(e) {
            e = e || w.find(y.label), g.verbose("Removing labels", e), e.each(function () {
              var e = K(this),
                  t = e.data(b.value),
                  n = t !== Y ? String(t) : t,
                  i = g.is.userValue(n);
              !1 !== p.onLabelRemove.call(e, t) ? (g.remove.message(), i ? (g.remove.value(n), g.remove.label(n)) : g.remove.selected(n)) : g.debug("Label remove callback cancelled removal");
            });
          },
          tabbable: function tabbable() {
            g.is.searchSelection() ? (g.debug("Searchable dropdown initialized"), k.removeAttr("tabindex")) : (g.debug("Simple selection dropdown initialized"), w.removeAttr("tabindex")), E.removeAttr("tabindex");
          },
          clearable: function clearable() {
            P.removeClass(h.clear);
          }
        },
        has: {
          menuSearch: function menuSearch() {
            return g.has.search() && 0 < k.closest(E).length;
          },
          search: function search() {
            return 0 < k.length;
          },
          sizer: function sizer() {
            return 0 < A.length;
          },
          selectInput: function selectInput() {
            return R.is("select");
          },
          minCharacters: function minCharacters(e) {
            return !p.minCharacters || (e = e !== Y ? String(e) : String(g.get.query())).length >= p.minCharacters;
          },
          firstLetter: function firstLetter(e, t) {
            var n;
            return !(!e || 0 === e.length || "string" != typeof t) && (n = g.get.choiceText(e, !1), (t = t.toLowerCase()) == String(n).charAt(0).toLowerCase());
          },
          input: function input() {
            return 0 < R.length;
          },
          items: function items() {
            return 0 < O.length;
          },
          menu: function menu() {
            return 0 < E.length;
          },
          message: function message() {
            return 0 !== E.children(y.message).length;
          },
          label: function label(e) {
            var t = g.escape.value(e),
                n = w.find(y.label);
            return p.ignoreCase && (t = t.toLowerCase()), 0 < n.filter("[data-" + b.value + '="' + g.escape.string(t) + '"]').length;
          },
          maxSelections: function maxSelections() {
            return p.maxSelections && g.get.selectionCount() >= p.maxSelections;
          },
          allResultsFiltered: function allResultsFiltered() {
            var e = O.not(y.addition);
            return e.filter(y.unselectable).length === e.length;
          },
          userSuggestion: function userSuggestion() {
            return 0 < E.children(y.addition).length;
          },
          query: function query() {
            return "" !== g.get.query();
          },
          value: function value(e) {
            return p.ignoreCase ? g.has.valueIgnoringCase(e) : g.has.valueMatchingCase(e);
          },
          valueMatchingCase: function valueMatchingCase(e) {
            var t = g.get.values();
            return !!(K.isArray(t) ? t && -1 !== K.inArray(e, t) : t == e);
          },
          valueIgnoringCase: function valueIgnoringCase(n) {
            var e = g.get.values(),
                i = !1;
            return K.isArray(e) || (e = [e]), K.each(e, function (e, t) {
              if (String(n).toLowerCase() == String(t).toLowerCase()) return !(i = !0);
            }), i;
          }
        },
        is: {
          active: function active() {
            return w.hasClass(h.active);
          },
          animatingInward: function animatingInward() {
            return E.transition("is inward");
          },
          animatingOutward: function animatingOutward() {
            return E.transition("is outward");
          },
          bubbledLabelClick: function bubbledLabelClick(e) {
            return K(e.target).is("select, input") && 0 < w.closest("label").length;
          },
          bubbledIconClick: function bubbledIconClick(e) {
            return 0 < K(e.target).closest(P).length;
          },
          alreadySetup: function alreadySetup() {
            return w.is("select") && w.parent(y.dropdown).data(C) !== Y && 0 === w.prev().length;
          },
          animating: function animating(e) {
            return e ? e.transition && e.transition("is animating") : E.transition && E.transition("is animating");
          },
          leftward: function leftward(e) {
            return (e || E).hasClass(h.leftward);
          },
          disabled: function disabled() {
            return w.hasClass(h.disabled);
          },
          focused: function focused() {
            return G.activeElement === w[0];
          },
          focusedOnSearch: function focusedOnSearch() {
            return G.activeElement === k[0];
          },
          allFiltered: function allFiltered() {
            return (g.is.multiple() || g.has.search()) && !(0 == p.hideAdditions && g.has.userSuggestion()) && !g.has.message() && g.has.allResultsFiltered();
          },
          hidden: function hidden(e) {
            return !g.is.visible(e);
          },
          initialLoad: function initialLoad() {
            return e;
          },
          inObject: function inObject(n, e) {
            var i = !1;
            return K.each(e, function (e, t) {
              if (t == n) return i = !0;
            }), i;
          },
          multiple: function multiple() {
            return w.hasClass(h.multiple);
          },
          remote: function remote() {
            return p.apiSettings && g.can.useAPI();
          },
          single: function single() {
            return !g.is.multiple();
          },
          selectMutation: function selectMutation(e) {
            var n = !1;
            return K.each(e, function (e, t) {
              if (t.target && K(t.target).is("select")) return n = !0;
            }), n;
          },
          search: function search() {
            return w.hasClass(h.search);
          },
          searchSelection: function searchSelection() {
            return g.has.search() && 1 === k.parent(y.dropdown).length;
          },
          selection: function selection() {
            return w.hasClass(h.selection);
          },
          userValue: function userValue(e) {
            return -1 !== K.inArray(e, g.get.userValues());
          },
          upward: function upward(e) {
            return (e || w).hasClass(h.upward);
          },
          visible: function visible(e) {
            return e ? e.hasClass(h.visible) : E.hasClass(h.visible);
          },
          verticallyScrollableContext: function verticallyScrollableContext() {
            var e = S.get(0) !== J && S.css("overflow-y");
            return "auto" == e || "scroll" == e;
          },
          horizontallyScrollableContext: function horizontallyScrollableContext() {
            var e = S.get(0) !== J && S.css("overflow-X");
            return "auto" == e || "scroll" == e;
          }
        },
        can: {
          activate: function activate(e) {
            return !!p.useLabels || !g.has.maxSelections() || !(!g.has.maxSelections() || !e.hasClass(h.active));
          },
          openDownward: function openDownward(e) {
            var t,
                n,
                i = e || E,
                o = !0;
            return i.addClass(h.loading), n = {
              context: {
                offset: S.get(0) === J ? {
                  top: 0,
                  left: 0
                } : S.offset(),
                scrollTop: S.scrollTop(),
                height: S.outerHeight()
              },
              menu: {
                offset: i.offset(),
                height: i.outerHeight()
              }
            }, g.is.verticallyScrollableContext() && (n.menu.offset.top += n.context.scrollTop), o = (t = {
              above: n.context.scrollTop <= n.menu.offset.top - n.context.offset.top - n.menu.height,
              below: n.context.scrollTop + n.context.height >= n.menu.offset.top - n.context.offset.top + n.menu.height
            }).below ? (g.verbose("Dropdown can fit in context downward", t), !0) : t.below || t.above ? (g.verbose("Dropdown cannot fit below, opening upward", t), !1) : (g.verbose("Dropdown cannot fit in either direction, favoring downward", t), !0), i.removeClass(h.loading), o;
          },
          openRightward: function openRightward(e) {
            var t,
                n,
                i = e || E,
                o = !0;
            return i.addClass(h.loading), n = {
              context: {
                offset: S.get(0) === J ? {
                  top: 0,
                  left: 0
                } : S.offset(),
                scrollLeft: S.scrollLeft(),
                width: S.outerWidth()
              },
              menu: {
                offset: i.offset(),
                width: i.outerWidth()
              }
            }, g.is.horizontallyScrollableContext() && (n.menu.offset.left += n.context.scrollLeft), (t = n.menu.offset.left - n.context.offset.left + n.menu.width >= n.context.scrollLeft + n.context.width) && (g.verbose("Dropdown cannot fit in context rightward", t), o = !1), i.removeClass(h.loading), o;
          },
          click: function click() {
            return U || "click" == p.on;
          },
          extendSelect: function extendSelect() {
            return p.allowAdditions || p.apiSettings;
          },
          show: function show() {
            return !g.is.disabled() && (g.has.items() || g.has.message());
          },
          useAPI: function useAPI() {
            return K.fn.api !== Y;
          }
        },
        animate: {
          show: function show(e, t) {
            var n,
                i = t || E,
                o = t ? function () {} : function () {
              g.hideSubMenus(), g.hideOthers(), g.set.active();
            };
            e = K.isFunction(e) ? e : function () {}, g.verbose("Doing menu show animation", i), g.set.direction(t), n = g.get.transition(t), g.is.selection() && g.set.scrollPosition(g.get.selectedItem(), !0), (g.is.hidden(i) || g.is.animating(i)) && ("none" == n ? (o(), i.transition("show"), e.call(j)) : K.fn.transition !== Y && w.transition("is supported") ? i.transition({
              animation: n + " in",
              debug: p.debug,
              verbose: p.verbose,
              duration: p.duration,
              queue: !0,
              onStart: o,
              onComplete: function onComplete() {
                e.call(j);
              }
            }) : g.error(f.noTransition, n));
          },
          hide: function hide(e, t) {
            var n = t || E,
                i = (t ? p.duration : p.duration, t ? function () {} : function () {
              g.can.click() && g.unbind.intent(), g.remove.active();
            }),
                o = g.get.transition(t);
            e = K.isFunction(e) ? e : function () {}, (g.is.visible(n) || g.is.animating(n)) && (g.verbose("Doing menu hide animation", n), "none" == o ? (i(), n.transition("hide"), e.call(j)) : K.fn.transition !== Y && w.transition("is supported") ? n.transition({
              animation: o + " out",
              duration: p.duration,
              debug: p.debug,
              verbose: p.verbose,
              queue: !1,
              onStart: i,
              onComplete: function onComplete() {
                e.call(j);
              }
            }) : g.error(f.transition));
          }
        },
        hideAndClear: function hideAndClear() {
          g.remove.searchTerm(), g.has.maxSelections() || (g.has.search() ? g.hide(function () {
            g.remove.filteredItem();
          }) : g.hide());
        },
        delay: {
          show: function show() {
            g.verbose("Delaying show event to ensure user intent"), clearTimeout(g.timer), g.timer = setTimeout(g.show, p.delay.show);
          },
          hide: function hide() {
            g.verbose("Delaying hide event to ensure user intent"), clearTimeout(g.timer), g.timer = setTimeout(g.hide, p.delay.hide);
          }
        },
        escape: {
          value: function value(e) {
            var t = K.isArray(e),
                n = "string" == typeof e,
                i = !n && !t,
                o = n && -1 !== e.search(d.quote),
                a = [];
            return i || !o ? e : (g.debug("Encoding quote values for use in select", e), t ? (K.each(e, function (e, t) {
              a.push(t.replace(d.quote, "&quot;"));
            }), a) : e.replace(d.quote, "&quot;"));
          },
          string: function string(e) {
            return (e = String(e)).replace(d.escape, "\\$&");
          }
        },
        setting: function setting(e, t) {
          if (g.debug("Changing setting", e, t), K.isPlainObject(e)) K.extend(!0, p, e);else {
            if (t === Y) return p[e];
            K.isPlainObject(p[e]) ? K.extend(!0, p[e], t) : p[e] = t;
          }
        },
        internal: function internal(e, t) {
          if (K.isPlainObject(e)) K.extend(!0, g, e);else {
            if (t === Y) return g[e];
            g[e] = t;
          }
        },
        debug: function debug() {
          !p.silent && p.debug && (p.performance ? g.performance.log(arguments) : (g.debug = Function.prototype.bind.call(console.info, console, p.name + ":"), g.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !p.silent && p.verbose && p.debug && (p.performance ? g.performance.log(arguments) : (g.verbose = Function.prototype.bind.call(console.info, console, p.name + ":"), g.verbose.apply(console, arguments)));
        },
        error: function error() {
          p.silent || (g.error = Function.prototype.bind.call(console.error, console, p.name + ":"), g.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var t, n;
            p.performance && (n = (t = new Date().getTime()) - (B || t), B = t, W.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: j,
              "Execution Time": n
            })), clearTimeout(g.performance.timer), g.performance.timer = setTimeout(g.performance.display, 500);
          },
          display: function display() {
            var e = p.name + ":",
                n = 0;
            B = !1, clearTimeout(g.performance.timer), K.each(W, function (e, t) {
              n += t["Execution Time"];
            }), e += " " + n + "ms", H && (e += " '" + H + "'"), (console.group !== Y || console.table !== Y) && 0 < W.length && (console.groupCollapsed(e), console.table ? console.table(W) : K.each(W, function (e, t) {
              console.log(t.Name + ": " + t["Execution Time"] + "ms");
            }), console.groupEnd()), W = [];
          }
        },
        invoke: function invoke(i, e, t) {
          var o,
              a,
              n,
              r = z;
          return e = e || Q, t = j || t, "string" == typeof i && r !== Y && (i = i.split(/[\. ]/), o = i.length - 1, K.each(i, function (e, t) {
            var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (K.isPlainObject(r[n]) && e != o) r = r[n];else {
              if (r[n] !== Y) return a = r[n], !1;
              if (!K.isPlainObject(r[t]) || e == o) return r[t] !== Y ? a = r[t] : g.error(f.method, i), !1;
              r = r[t];
            }
          })), K.isFunction(a) ? n = a.apply(t, e) : a !== Y && (n = a), K.isArray(M) ? M.push(n) : M !== Y ? M = [M, n] : n !== Y && (M = n), a;
        }
      }, $ ? (z === Y && g.initialize(), g.invoke(X)) : (z !== Y && z.invoke("destroy"), g.initialize());
    }), M !== Y ? M : V;
  }, K.fn.dropdown.settings = {
    silent: !1,
    debug: !1,
    verbose: !1,
    performance: !0,
    on: "click",
    action: "activate",
    values: !1,
    clearable: !1,
    apiSettings: !1,
    selectOnKeydown: !0,
    minCharacters: 0,
    filterRemoteData: !1,
    saveRemoteData: !0,
    throttle: 200,
    context: J,
    direction: "auto",
    keepOnScreen: !0,
    match: "both",
    fullTextSearch: !1,
    placeholder: "auto",
    preserveHTML: !0,
    sortSelect: !1,
    forceSelection: !0,
    allowAdditions: !1,
    ignoreCase: !1,
    hideAdditions: !0,
    maxSelections: !1,
    useLabels: !0,
    delimiter: ",",
    showOnFocus: !0,
    allowReselection: !1,
    allowTab: !0,
    allowCategorySelection: !1,
    fireOnInit: !1,
    transition: "auto",
    duration: 200,
    glyphWidth: 1.037,
    label: {
      transition: "scale",
      duration: 200,
      variation: !1
    },
    delay: {
      hide: 300,
      show: 200,
      search: 20,
      touch: 50
    },
    onChange: function onChange(e, t, n) {},
    onAdd: function onAdd(e, t, n) {},
    onRemove: function onRemove(e, t, n) {},
    onLabelSelect: function onLabelSelect(e) {},
    onLabelCreate: function onLabelCreate(e, t) {
      return K(this);
    },
    onLabelRemove: function onLabelRemove(e) {
      return !0;
    },
    onNoResults: function onNoResults(e) {
      return !0;
    },
    onShow: function onShow() {},
    onHide: function onHide() {},
    name: "Dropdown",
    namespace: "dropdown",
    message: {
      addResult: "Add <b>{term}</b>",
      count: "{count} selected",
      maxSelections: "Max {maxCount} selections",
      noResults: "No results found.",
      serverError: "There was an error contacting the server"
    },
    error: {
      action: "You called a dropdown action that was not defined",
      alreadySetup: "Once a select has been initialized behaviors must be called on the created ui dropdown",
      labels: "Allowing user additions currently requires the use of labels.",
      missingMultiple: "<select> requires multiple property to be set to correctly preserve multiple values",
      method: "The method you called is not defined.",
      noAPI: "The API module is required to load resources remotely",
      noStorage: "Saving remote data requires session storage",
      noTransition: "This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>"
    },
    regExp: {
      escape: /[-[\]{}()*+?.,\\^$|#\s]/g,
      quote: /"/g
    },
    metadata: {
      defaultText: "defaultText",
      defaultValue: "defaultValue",
      placeholderText: "placeholder",
      text: "text",
      value: "value"
    },
    fields: {
      remoteValues: "results",
      values: "values",
      disabled: "disabled",
      name: "name",
      value: "value",
      text: "text"
    },
    keys: {
      backspace: 8,
      delimiter: 188,
      deleteKey: 46,
      enter: 13,
      escape: 27,
      pageUp: 33,
      pageDown: 34,
      leftArrow: 37,
      upArrow: 38,
      rightArrow: 39,
      downArrow: 40
    },
    selector: {
      addition: ".addition",
      dropdown: ".ui.dropdown",
      hidden: ".hidden",
      icon: "> .dropdown.icon",
      input: '> input[type="hidden"], > select',
      item: ".item",
      label: "> .label",
      remove: "> .label > .delete.icon",
      siblingLabel: ".label",
      menu: ".menu",
      message: ".message",
      menuIcon: ".dropdown.icon",
      search: "input.search, .menu > .search > input, .menu input.search",
      sizer: "> input.sizer",
      text: "> .text:not(.icon)",
      unselectable: ".disabled, .filtered"
    },
    className: {
      active: "active",
      addition: "addition",
      animating: "animating",
      clear: "clear",
      disabled: "disabled",
      empty: "empty",
      dropdown: "ui dropdown",
      filtered: "filtered",
      hidden: "hidden transition",
      item: "item",
      label: "ui label",
      loading: "loading",
      menu: "menu",
      message: "message",
      multiple: "multiple",
      placeholder: "default",
      sizer: "sizer",
      search: "search",
      selected: "selected",
      selection: "selection",
      upward: "upward",
      leftward: "left",
      visible: "visible"
    }
  }, K.fn.dropdown.settings.templates = {
    dropdown: function dropdown(e) {
      var t = e.placeholder || !1,
          n = (e.values, "");
      return n += '<i class="dropdown icon"></i>', e.placeholder ? n += '<div class="default text">' + t + "</div>" : n += '<div class="text"></div>', n += '<div class="menu">', K.each(e.values, function (e, t) {
        n += t.disabled ? '<div class="disabled item" data-value="' + t.value + '">' + t.name + "</div>" : '<div class="item" data-value="' + t.value + '">' + t.name + "</div>";
      }), n += "</div>";
    },
    menu: function menu(e, o) {
      var t = e[o.values] || {},
          a = "";
      return K.each(t, function (e, t) {
        var n = t[o.text] ? 'data-text="' + t[o.text] + '"' : "",
            i = t[o.disabled] ? "disabled " : "";
        a += '<div class="' + i + 'item" data-value="' + t[o.value] + '"' + n + ">", a += t[o.name], a += "</div>";
      }), a;
    },
    label: function label(e, t) {
      return t + '<i class="delete icon"></i>';
    },
    message: function message(e) {
      return e;
    },
    addition: function addition(e) {
      return e;
    }
  };
}(jQuery, window, document);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ 0:
/*!********************************************************************************************************!*\
  !*** multi ./resources/js/index/main.js ./resources/sass/index/main.scss ./resources/sass/editor.scss ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/vagrant/Code/workbition/resources/js/index/main.js */"./resources/js/index/main.js");
__webpack_require__(/*! /home/vagrant/Code/workbition/resources/sass/index/main.scss */"./resources/sass/index/main.scss");
module.exports = __webpack_require__(/*! /home/vagrant/Code/workbition/resources/sass/editor.scss */"./resources/sass/editor.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);