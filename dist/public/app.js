/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  __webpack_require__(194);
  
  var _react = __webpack_require__(8);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fastclick = __webpack_require__(207);
  
  var _fastclick2 = _interopRequireDefault(_fastclick);
  
  var _componentsApp = __webpack_require__(181);
  
  var _componentsApp2 = _interopRequireDefault(_componentsApp);
  
  var _coreDispatcher = __webpack_require__(65);
  
  var _coreDispatcher2 = _interopRequireDefault(_coreDispatcher);
  
  var _actionsAppActions = __webpack_require__(63);
  
  var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);
  
  var _constantsActionTypes = __webpack_require__(64);
  
  var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);
  
  var path = decodeURI(window.location.pathname);
  var onSetMeta = function onSetMeta(name, content) {
    // Remove and create a new <meta /> tag in order to make it work
    // with bookmarks in Safari
    var elements = document.getElementsByTagName('meta');
    [].slice.call(elements).forEach(function (element) {
      if (element.getAttribute('name') === name) {
        element.parentNode.removeChild(element);
      }
    });
  
    var meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    document.getElementsByTagName('head')[0].appendChild(meta);
  };
  
  function run() {
    // Render the top-level React component
    var props = {
      path: path,
      context: {
        onSetTitle: function onSetTitle(value) {
          return document.title = value;
        },
        onSetMeta: onSetMeta
      }
    };
  
    var element = _react2['default'].createElement(_componentsApp2['default'], props);
    _react2['default'].render(element, document.getElementById('app'), function () {
      var css = document.getElementById('css');
      css.parentNode.removeChild(css);
    });
  
    // Update `Application.path` prop when `window.location` is changed
    _coreDispatcher2['default'].register(function (action) {
      if (action.type === _constantsActionTypes2['default'].CHANGE_LOCATION) {
        element = _react2['default'].cloneElement(element, { path: action.path });
        _react2['default'].render(element, document.getElementById('app'));
      }
    });
  }
  
  // Run the application when both DOM is ready
  // and page content is loaded
  Promise.all([new Promise(function (resolve) {
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', resolve);
    } else {
      window.attachEvent('onload', resolve);
    }
  }).then(function () {
    return _fastclick2['default'].attach(document.body);
  }), new Promise(function (resolve) {
    return _actionsAppActions2['default'].loadPage(path, resolve);
  })]).then(run);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var global = typeof self != 'undefined' ? self : Function('return this')()
    , core   = {}
    , defineProperty = Object.defineProperty
    , hasOwnProperty = {}.hasOwnProperty
    , ceil  = Math.ceil
    , floor = Math.floor
    , max   = Math.max
    , min   = Math.min;
  // The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
  var DESC = !!function(){
    try {
      return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
    } catch(e){ /* empty */ }
  }();
  var hide = createDefiner(1);
  // 7.1.4 ToInteger
  function toInteger(it){
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  }
  function desc(bitmap, value){
    return {
      enumerable  : !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable    : !(bitmap & 4),
      value       : value
    };
  }
  function simpleSet(object, key, value){
    object[key] = value;
    return object;
  }
  function createDefiner(bitmap){
    return DESC ? function(object, key, value){
      return $.setDesc(object, key, desc(bitmap, value));
    } : simpleSet;
  }
  
  function isObject(it){
    return it !== null && (typeof it == 'object' || typeof it == 'function');
  }
  function isFunction(it){
    return typeof it == 'function';
  }
  function assertDefined(it){
    if(it == undefined)throw TypeError("Can't call method on  " + it);
    return it;
  }
  
  var $ = module.exports = __webpack_require__(128)({
    g: global,
    core: core,
    html: global.document && document.documentElement,
    // http://jsperf.com/core-js-isobject
    isObject:   isObject,
    isFunction: isFunction,
    that: function(){
      return this;
    },
    // 7.1.4 ToInteger
    toInteger: toInteger,
    // 7.1.15 ToLength
    toLength: function(it){
      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
    },
    toIndex: function(index, length){
      index = toInteger(index);
      return index < 0 ? max(index + length, 0) : min(index, length);
    },
    has: function(it, key){
      return hasOwnProperty.call(it, key);
    },
    create:     Object.create,
    getProto:   Object.getPrototypeOf,
    DESC:       DESC,
    desc:       desc,
    getDesc:    Object.getOwnPropertyDescriptor,
    setDesc:    defineProperty,
    setDescs:   Object.defineProperties,
    getKeys:    Object.keys,
    getNames:   Object.getOwnPropertyNames,
    getSymbols: Object.getOwnPropertySymbols,
    assertDefined: assertDefined,
    // Dummy, fix for not array-like ES3 string in es5 module
    ES5Object: Object,
    toObject: function(it){
      return $.ES5Object(assertDefined(it));
    },
    hide: hide,
    def: createDefiner(0),
    set: global.Symbol ? simpleSet : hide,
    each: [].forEach
  });
  /* eslint-disable no-undef */
  if(typeof __e != 'undefined')__e = core;
  if(typeof __g != 'undefined')__g = global;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule invariant
   */
  
  "use strict";
  
  /**
   * Use invariant() to assert state which your program assumes to be true.
   *
   * Provide sprintf-style format (only %s is supported) and arguments
   * to provide information about what broke and what you were
   * expecting.
   *
   * The invariant message will be stripped in production, but the invariant
   * will remain to ensure logic does not differ in production.
   */
  
  var invariant = function(condition, format, a, b, c, d, e, f) {
    if (true) {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    }
  
    if (!condition) {
      var error;
      if (format === undefined) {
        error = new Error(
          'Minified exception occurred; use the non-minified dev environment ' +
          'for the full error message and additional helpful warnings.'
        );
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(
          'Invariant Violation: ' +
          format.replace(/%s/g, function() { return args[argIndex++]; })
        );
      }
  
      error.framesToPop = 1; // we don't care about invariant's own frame
      throw error;
    }
  };
  
  module.exports = invariant;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

  var $          = __webpack_require__(1)
    , global     = $.g
    , core       = $.core
    , isFunction = $.isFunction
    , $redef     = __webpack_require__(21);
  function ctx(fn, that){
    return function(){
      return fn.apply(that, arguments);
    };
  }
  global.core = core;
  // type bitmap
  $def.F = 1;  // forced
  $def.G = 2;  // global
  $def.S = 4;  // static
  $def.P = 8;  // proto
  $def.B = 16; // bind
  $def.W = 32; // wrap
  function $def(type, name, source){
    var key, own, out, exp
      , isGlobal = type & $def.G
      , isProto  = type & $def.P
      , target   = isGlobal ? global : type & $def.S
          ? global[name] : (global[name] || {}).prototype
      , exports  = isGlobal ? core : core[name] || (core[name] = {});
    if(isGlobal)source = name;
    for(key in source){
      // contains in native
      own = !(type & $def.F) && target && key in target;
      // export native or passed
      out = (own ? target : source)[key];
      // bind timers to global for call from export context
      if(type & $def.B && own)exp = ctx(out, global);
      else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
      // extend global
      if(target && !own)$redef(target, key, out);
      // export
      if(exports[key] != out)$.hide(exports, key, exp);
      if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
    }
  }
  module.exports = $def;

/***/ },
/* 4 */
/***/ function(module, exports) {

  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule Object.assign
   */
  
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign
  
  'use strict';
  
  function assign(target, sources) {
    if (target == null) {
      throw new TypeError('Object.assign target cannot be null or undefined');
    }
  
    var to = Object(target);
    var hasOwnProperty = Object.prototype.hasOwnProperty;
  
    for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
      var nextSource = arguments[nextIndex];
      if (nextSource == null) {
        continue;
      }
  
      var from = Object(nextSource);
  
      // We don't currently support accessors nor proxies. Therefore this
      // copy cannot throw. If we ever supported this then we must handle
      // exceptions and side-effects. We don't support symbols so they won't
      // be transferred.
  
      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
    }
  
    return to;
  }
  
  module.exports = assign;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactElement
   */
  
  'use strict';
  
  var ReactContext = __webpack_require__(73);
  var ReactCurrentOwner = __webpack_require__(24);
  
  var assign = __webpack_require__(4);
  var warning = __webpack_require__(6);
  
  var RESERVED_PROPS = {
    key: true,
    ref: true
  };
  
  /**
   * Warn for mutations.
   *
   * @internal
   * @param {object} object
   * @param {string} key
   */
  function defineWarningProperty(object, key) {
    Object.defineProperty(object, key, {
  
      configurable: false,
      enumerable: true,
  
      get: function() {
        if (!this._store) {
          return null;
        }
        return this._store[key];
      },
  
      set: function(value) {
        (true ? warning(
          false,
          'Don\'t set the %s property of the React element. Instead, ' +
          'specify the correct value when initially creating the element.',
          key
        ) : null);
        this._store[key] = value;
      }
  
    });
  }
  
  /**
   * This is updated to true if the membrane is successfully created.
   */
  var useMutationMembrane = false;
  
  /**
   * Warn for mutations.
   *
   * @internal
   * @param {object} element
   */
  function defineMutationMembrane(prototype) {
    try {
      var pseudoFrozenProperties = {
        props: true
      };
      for (var key in pseudoFrozenProperties) {
        defineWarningProperty(prototype, key);
      }
      useMutationMembrane = true;
    } catch (x) {
      // IE will fail on defineProperty
    }
  }
  
  /**
   * Base constructor for all React elements. This is only used to make this
   * work with a dynamic instanceof check. Nothing should live on this prototype.
   *
   * @param {*} type
   * @param {string|object} ref
   * @param {*} key
   * @param {*} props
   * @internal
   */
  var ReactElement = function(type, key, ref, owner, context, props) {
    // Built-in properties that belong on the element
    this.type = type;
    this.key = key;
    this.ref = ref;
  
    // Record the component responsible for creating this element.
    this._owner = owner;
  
    // TODO: Deprecate withContext, and then the context becomes accessible
    // through the owner.
    this._context = context;
  
    if (true) {
      // The validation flag and props are currently mutative. We put them on
      // an external backing store so that we can freeze the whole object.
      // This can be replaced with a WeakMap once they are implemented in
      // commonly used development environments.
      this._store = {props: props, originalProps: assign({}, props)};
  
      // To make comparing ReactElements easier for testing purposes, we make
      // the validation flag non-enumerable (where possible, which should
      // include every environment we run tests in), so the test framework
      // ignores it.
      try {
        Object.defineProperty(this._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true
        });
      } catch (x) {
      }
      this._store.validated = false;
  
      // We're not allowed to set props directly on the object so we early
      // return and rely on the prototype membrane to forward to the backing
      // store.
      if (useMutationMembrane) {
        Object.freeze(this);
        return;
      }
    }
  
    this.props = props;
  };
  
  // We intentionally don't expose the function on the constructor property.
  // ReactElement should be indistinguishable from a plain object.
  ReactElement.prototype = {
    _isReactElement: true
  };
  
  if (true) {
    defineMutationMembrane(ReactElement.prototype);
  }
  
  ReactElement.createElement = function(type, config, children) {
    var propName;
  
    // Reserved names are extracted
    var props = {};
  
    var key = null;
    var ref = null;
  
    if (config != null) {
      ref = config.ref === undefined ? null : config.ref;
      key = config.key === undefined ? null : '' + config.key;
      // Remaining properties are added to a new props object
      for (propName in config) {
        if (config.hasOwnProperty(propName) &&
            !RESERVED_PROPS.hasOwnProperty(propName)) {
          props[propName] = config[propName];
        }
      }
    }
  
    // Children can be more than one argument, and those are transferred onto
    // the newly allocated props object.
    var childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);
      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }
      props.children = childArray;
    }
  
    // Resolve default props
    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;
      for (propName in defaultProps) {
        if (typeof props[propName] === 'undefined') {
          props[propName] = defaultProps[propName];
        }
      }
    }
  
    return new ReactElement(
      type,
      key,
      ref,
      ReactCurrentOwner.current,
      ReactContext.current,
      props
    );
  };
  
  ReactElement.createFactory = function(type) {
    var factory = ReactElement.createElement.bind(null, type);
    // Expose the type on the factory and the prototype so that it can be
    // easily accessed on elements. E.g. <Foo />.type === Foo.type.
    // This should not be named `constructor` since this may not be the function
    // that created the element, and it may not even be a constructor.
    // Legacy hook TODO: Warn if this is accessed
    factory.type = type;
    return factory;
  };
  
  ReactElement.cloneAndReplaceProps = function(oldElement, newProps) {
    var newElement = new ReactElement(
      oldElement.type,
      oldElement.key,
      oldElement.ref,
      oldElement._owner,
      oldElement._context,
      newProps
    );
  
    if (true) {
      // If the key on the original is valid, then the clone is valid
      newElement._store.validated = oldElement._store.validated;
    }
    return newElement;
  };
  
  ReactElement.cloneElement = function(element, config, children) {
    var propName;
  
    // Original props are copied
    var props = assign({}, element.props);
  
    // Reserved names are extracted
    var key = element.key;
    var ref = element.ref;
  
    // Owner will be preserved, unless ref is overridden
    var owner = element._owner;
  
    if (config != null) {
      if (config.ref !== undefined) {
        // Silently steal the ref from the parent.
        ref = config.ref;
        owner = ReactCurrentOwner.current;
      }
      if (config.key !== undefined) {
        key = '' + config.key;
      }
      // Remaining properties override existing props
      for (propName in config) {
        if (config.hasOwnProperty(propName) &&
            !RESERVED_PROPS.hasOwnProperty(propName)) {
          props[propName] = config[propName];
        }
      }
    }
  
    // Children can be more than one argument, and those are transferred onto
    // the newly allocated props object.
    var childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);
      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }
      props.children = childArray;
    }
  
    return new ReactElement(
      element.type,
      key,
      ref,
      owner,
      element._context,
      props
    );
  };
  
  /**
   * @param {?object} object
   * @return {boolean} True if `object` is a valid component.
   * @final
   */
  ReactElement.isValidElement = function(object) {
    // ReactTestUtils is often used outside of beforeEach where as React is
    // within it. This leads to two different instances of React on the same
    // page. To identify a element from a different React instance we use
    // a flag instead of an instanceof check.
    var isElement = !!(object && object._isReactElement);
    // if (isElement && !(object instanceof ReactElement)) {
    // This is an indicator that you're using multiple versions of React at the
    // same time. This will screw with ownership and stuff. Fix it, please.
    // TODO: We could possibly warn here.
    // }
    return isElement;
  };
  
  module.exports = ReactElement;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule warning
   */
  
  "use strict";
  
  var emptyFunction = __webpack_require__(25);
  
  /**
   * Similar to invariant but only logs a warning if the condition is not met.
   * This can be used to log issues in development environments in critical
   * paths. Removing the logging code for production environments will keep the
   * same logic and follow the same code paths.
   */
  
  var warning = emptyFunction;
  
  if (true) {
    warning = function(condition, format ) {for (var args=[],$__0=2,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
      if (format === undefined) {
        throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
          'message argument'
        );
      }
  
      if (format.length < 10 || /^[s\W]*$/.test(format)) {
        throw new Error(
          'The warning format should be able to uniquely identify this ' +
          'warning. Please, use a more descriptive format than: ' + format
        );
      }
  
      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }
  
      if (!condition) {
        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function()  {return args[argIndex++];});
        console.warn(message);
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch(x) {}
      }
    };
  }
  
  module.exports = warning;


/***/ },
/* 7 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ExecutionEnvironment
   */
  
  /*jslint evil: true */
  
  "use strict";
  
  var canUseDOM = !!(
    (typeof window !== 'undefined' &&
    window.document && window.document.createElement)
  );
  
  /**
   * Simple, lightweight module assisting with the detection and context of
   * Worker. Helps avoid circular dependencies and allows code to reason about
   * whether or not they are in a Worker, even if they never include the main
   * `ReactWorker` dependency.
   */
  var ExecutionEnvironment = {
  
    canUseDOM: canUseDOM,
  
    canUseWorkers: typeof Worker !== 'undefined',
  
    canUseEventListeners:
      canUseDOM && !!(window.addEventListener || window.attachEvent),
  
    canUseViewport: canUseDOM && !!window.screen,
  
    isInWorker: !canUseDOM // For now, this is true - might change in the future.
  
  };
  
  module.exports = ExecutionEnvironment;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__(223);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(1);
  function assert(condition, msg1, msg2){
    if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
  }
  assert.def = $.assertDefined;
  assert.fn = function(it){
    if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
    return it;
  };
  assert.obj = function(it){
    if(!$.isObject(it))throw TypeError(it + ' is not an object!');
    return it;
  };
  assert.inst = function(it, Constructor, name){
    if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
    return it;
  };
  module.exports = assert;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

  var $        = __webpack_require__(1)
    , TAG      = __webpack_require__(11)('toStringTag')
    , toString = {}.toString;
  function cof(it){
    return toString.call(it).slice(8, -1);
  }
  cof.classof = function(it){
    var O, T;
    return it == undefined ? it === undefined ? 'Undefined' : 'Null'
      : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
  };
  cof.set = function(it, tag, stat){
    if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
  };
  module.exports = cof;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

  var global = __webpack_require__(1).g
    , store  = __webpack_require__(60)('wks');
  module.exports = function(name){
    return store[name] || (store[name] =
      global.Symbol && global.Symbol[name] || __webpack_require__(16).safe('Symbol.' + name));
  };

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule EventConstants
   */
  
  'use strict';
  
  var keyMirror = __webpack_require__(36);
  
  var PropagationPhases = keyMirror({bubbled: null, captured: null});
  
  /**
   * Types of raw signals from the browser caught at the top level.
   */
  var topLevelTypes = keyMirror({
    topBlur: null,
    topChange: null,
    topClick: null,
    topCompositionEnd: null,
    topCompositionStart: null,
    topCompositionUpdate: null,
    topContextMenu: null,
    topCopy: null,
    topCut: null,
    topDoubleClick: null,
    topDrag: null,
    topDragEnd: null,
    topDragEnter: null,
    topDragExit: null,
    topDragLeave: null,
    topDragOver: null,
    topDragStart: null,
    topDrop: null,
    topError: null,
    topFocus: null,
    topInput: null,
    topKeyDown: null,
    topKeyPress: null,
    topKeyUp: null,
    topLoad: null,
    topMouseDown: null,
    topMouseMove: null,
    topMouseOut: null,
    topMouseOver: null,
    topMouseUp: null,
    topPaste: null,
    topReset: null,
    topScroll: null,
    topSelectionChange: null,
    topSubmit: null,
    topTextInput: null,
    topTouchCancel: null,
    topTouchEnd: null,
    topTouchMove: null,
    topTouchStart: null,
    topWheel: null
  });
  
  var EventConstants = {
    topLevelTypes: topLevelTypes,
    PropagationPhases: PropagationPhases
  };
  
  module.exports = EventConstants;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactClass
   */
  
  'use strict';
  
  var ReactComponent = __webpack_require__(106);
  var ReactCurrentOwner = __webpack_require__(24);
  var ReactElement = __webpack_require__(5);
  var ReactErrorUtils = __webpack_require__(241);
  var ReactInstanceMap = __webpack_require__(34);
  var ReactLifeCycle = __webpack_require__(76);
  var ReactPropTypeLocations = __webpack_require__(77);
  var ReactPropTypeLocationNames = __webpack_require__(51);
  var ReactUpdateQueue = __webpack_require__(78);
  
  var assign = __webpack_require__(4);
  var invariant = __webpack_require__(2);
  var keyMirror = __webpack_require__(36);
  var keyOf = __webpack_require__(28);
  var warning = __webpack_require__(6);
  
  var MIXINS_KEY = keyOf({mixins: null});
  
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */
  var SpecPolicy = keyMirror({
    /**
     * These methods may be defined only once by the class specification or mixin.
     */
    DEFINE_ONCE: null,
    /**
     * These methods may be defined by both the class specification and mixins.
     * Subsequent definitions will be chained. These methods must return void.
     */
    DEFINE_MANY: null,
    /**
     * These methods are overriding the base class.
     */
    OVERRIDE_BASE: null,
    /**
     * These methods are similar to DEFINE_MANY, except we assume they return
     * objects. We try to merge the keys of the return values of all the mixed in
     * functions. If there is a key conflict we throw.
     */
    DEFINE_MANY_MERGED: null
  });
  
  
  var injectedMixins = [];
  
  /**
   * Composite components are higher-level components that compose other composite
   * or native components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */
  var ReactClassInterface = {
  
    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: SpecPolicy.DEFINE_MANY,
  
    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: SpecPolicy.DEFINE_MANY,
  
    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: SpecPolicy.DEFINE_MANY,
  
    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: SpecPolicy.DEFINE_MANY,
  
    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: SpecPolicy.DEFINE_MANY,
  
    // ==== Definition methods ====
  
    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,
  
    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: SpecPolicy.DEFINE_MANY_MERGED,
  
    /**
     * @return {object}
     * @optional
     */
    getChildContext: SpecPolicy.DEFINE_MANY_MERGED,
  
    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @nosideeffects
     * @required
     */
    render: SpecPolicy.DEFINE_ONCE,
  
  
  
    // ==== Delegate methods ====
  
    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: SpecPolicy.DEFINE_MANY,
  
    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: SpecPolicy.DEFINE_MANY,
  
    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: SpecPolicy.DEFINE_MANY,
  
    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,
  
    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: SpecPolicy.DEFINE_MANY,
  
    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: SpecPolicy.DEFINE_MANY,
  
    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: SpecPolicy.DEFINE_MANY,
  
  
  
    // ==== Advanced methods ====
  
    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: SpecPolicy.OVERRIDE_BASE
  
  };
  
  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */
  var RESERVED_SPEC_KEYS = {
    displayName: function(Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function(Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function(Constructor, childContextTypes) {
      if (true) {
        validateTypeDef(
          Constructor,
          childContextTypes,
          ReactPropTypeLocations.childContext
        );
      }
      Constructor.childContextTypes = assign(
        {},
        Constructor.childContextTypes,
        childContextTypes
      );
    },
    contextTypes: function(Constructor, contextTypes) {
      if (true) {
        validateTypeDef(
          Constructor,
          contextTypes,
          ReactPropTypeLocations.context
        );
      }
      Constructor.contextTypes = assign(
        {},
        Constructor.contextTypes,
        contextTypes
      );
    },
    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function(Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(
          Constructor.getDefaultProps,
          getDefaultProps
        );
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function(Constructor, propTypes) {
      if (true) {
        validateTypeDef(
          Constructor,
          propTypes,
          ReactPropTypeLocations.prop
        );
      }
      Constructor.propTypes = assign(
        {},
        Constructor.propTypes,
        propTypes
      );
    },
    statics: function(Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    }
  };
  
  function validateTypeDef(Constructor, typeDef, location) {
    for (var propName in typeDef) {
      if (typeDef.hasOwnProperty(propName)) {
        // use a warning instead of an invariant so components
        // don't show up in prod but not in __DEV__
        (true ? warning(
          typeof typeDef[propName] === 'function',
          '%s: %s type `%s` is invalid; it must be a function, usually from ' +
          'React.PropTypes.',
          Constructor.displayName || 'ReactClass',
          ReactPropTypeLocationNames[location],
          propName
        ) : null);
      }
    }
  }
  
  function validateMethodOverride(proto, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name) ?
      ReactClassInterface[name] :
      null;
  
    // Disallow overriding of base class methods unless explicitly allowed.
    if (ReactClassMixin.hasOwnProperty(name)) {
      (true ? invariant(
        specPolicy === SpecPolicy.OVERRIDE_BASE,
        'ReactClassInterface: You are attempting to override ' +
        '`%s` from your class specification. Ensure that your method names ' +
        'do not overlap with React methods.',
        name
      ) : invariant(specPolicy === SpecPolicy.OVERRIDE_BASE));
    }
  
    // Disallow defining methods more than once unless explicitly allowed.
    if (proto.hasOwnProperty(name)) {
      (true ? invariant(
        specPolicy === SpecPolicy.DEFINE_MANY ||
        specPolicy === SpecPolicy.DEFINE_MANY_MERGED,
        'ReactClassInterface: You are attempting to define ' +
        '`%s` on your component more than once. This conflict may be due ' +
        'to a mixin.',
        name
      ) : invariant(specPolicy === SpecPolicy.DEFINE_MANY ||
      specPolicy === SpecPolicy.DEFINE_MANY_MERGED));
    }
  }
  
  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classses.
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      return;
    }
  
    (true ? invariant(
      typeof spec !== 'function',
      'ReactClass: You\'re attempting to ' +
      'use a component class as a mixin. Instead, just use a regular object.'
    ) : invariant(typeof spec !== 'function'));
    (true ? invariant(
      !ReactElement.isValidElement(spec),
      'ReactClass: You\'re attempting to ' +
      'use a component as a mixin. Instead, just use a regular object.'
    ) : invariant(!ReactElement.isValidElement(spec)));
  
    var proto = Constructor.prototype;
  
    // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.
    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }
  
    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }
  
      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above
        continue;
      }
  
      var property = spec[name];
      validateMethodOverride(proto, name);
  
      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod =
          ReactClassInterface.hasOwnProperty(name);
        var isAlreadyDefined = proto.hasOwnProperty(name);
        var markedDontBind = property && property.__reactDontBind;
        var isFunction = typeof property === 'function';
        var shouldAutoBind =
          isFunction &&
          !isReactClassMethod &&
          !isAlreadyDefined &&
          !markedDontBind;
  
        if (shouldAutoBind) {
          if (!proto.__reactAutoBindMap) {
            proto.__reactAutoBindMap = {};
          }
          proto.__reactAutoBindMap[name] = property;
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name];
  
            // These cases should already be caught by validateMethodOverride
            (true ? invariant(
              isReactClassMethod && (
                (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)
              ),
              'ReactClass: Unexpected spec policy %s for key %s ' +
              'when mixing in component specs.',
              specPolicy,
              name
            ) : invariant(isReactClassMethod && (
              (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)
            )));
  
            // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.
            if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;
            if (true) {
              // Add verbose displayName to the function, which helps when looking
              // at profiling tools.
              if (typeof property === 'function' && spec.displayName) {
                proto[name].displayName = spec.displayName + '_' + name;
              }
            }
          }
        }
      }
    }
  }
  
  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }
    for (var name in statics) {
      var property = statics[name];
      if (!statics.hasOwnProperty(name)) {
        continue;
      }
  
      var isReserved = name in RESERVED_SPEC_KEYS;
      (true ? invariant(
        !isReserved,
        'ReactClass: You are attempting to define a reserved ' +
        'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
        'as an instance property instead; it will still be accessible on the ' +
        'constructor.',
        name
      ) : invariant(!isReserved));
  
      var isInherited = name in Constructor;
      (true ? invariant(
        !isInherited,
        'ReactClass: You are attempting to define ' +
        '`%s` on your component more than once. This conflict may be ' +
        'due to a mixin.',
        name
      ) : invariant(!isInherited));
      Constructor[name] = property;
    }
  }
  
  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */
  function mergeIntoWithNoDuplicateKeys(one, two) {
    (true ? invariant(
      one && two && typeof one === 'object' && typeof two === 'object',
      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
    ) : invariant(one && two && typeof one === 'object' && typeof two === 'object'));
  
    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        (true ? invariant(
          one[key] === undefined,
          'mergeIntoWithNoDuplicateKeys(): ' +
          'Tried to merge two objects with the same key: `%s`. This conflict ' +
          'may be due to a mixin; in particular, this may be caused by two ' +
          'getInitialState() or getDefaultProps() methods returning objects ' +
          'with clashing keys.',
          key
        ) : invariant(one[key] === undefined));
        one[key] = two[key];
      }
    }
    return one;
  }
  
  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);
      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }
      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }
  
  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }
  
  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    if (true) {
      boundMethod.__reactBoundContext = component;
      boundMethod.__reactBoundMethod = method;
      boundMethod.__reactBoundArguments = null;
      var componentName = component.constructor.displayName;
      var _bind = boundMethod.bind;
      /* eslint-disable block-scoped-var, no-undef */
      boundMethod.bind = function(newThis ) {for (var args=[],$__0=1,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
        // User is trying to bind() an autobound method; we effectively will
        // ignore the value of "this" that the user is trying to use, so
        // let's warn.
        if (newThis !== component && newThis !== null) {
          (true ? warning(
            false,
            'bind(): React component methods may only be bound to the ' +
            'component instance. See %s',
            componentName
          ) : null);
        } else if (!args.length) {
          (true ? warning(
            false,
            'bind(): You are binding a component method to the component. ' +
            'React does this for you automatically in a high-performance ' +
            'way, so you can safely remove this call. See %s',
            componentName
          ) : null);
          return boundMethod;
        }
        var reboundMethod = _bind.apply(boundMethod, arguments);
        reboundMethod.__reactBoundContext = component;
        reboundMethod.__reactBoundMethod = method;
        reboundMethod.__reactBoundArguments = args;
        return reboundMethod;
        /* eslint-enable */
      };
    }
    return boundMethod;
  }
  
  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */
  function bindAutoBindMethods(component) {
    for (var autoBindKey in component.__reactAutoBindMap) {
      if (component.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
        var method = component.__reactAutoBindMap[autoBindKey];
        component[autoBindKey] = bindAutoBindMethod(
          component,
          ReactErrorUtils.guard(
            method,
            component.constructor.displayName + '.' + autoBindKey
          )
        );
      }
    }
  }
  
  var typeDeprecationDescriptor = {
    enumerable: false,
    get: function() {
      var displayName = this.displayName || this.name || 'Component';
      (true ? warning(
        false,
        '%s.type is deprecated. Use %s directly to access the class.',
        displayName,
        displayName
      ) : null);
      Object.defineProperty(this, 'type', {
        value: this
      });
      return this;
    }
  };
  
  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */
  var ReactClassMixin = {
  
    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function(newState, callback) {
      ReactUpdateQueue.enqueueReplaceState(this, newState);
      if (callback) {
        ReactUpdateQueue.enqueueCallback(this, callback);
      }
    },
  
    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function() {
      if (true) {
        var owner = ReactCurrentOwner.current;
        if (owner !== null) {
          (true ? warning(
            owner._warnedAboutRefsInRender,
            '%s is accessing isMounted inside its render() function. ' +
            'render() should be a pure function of props and state. It should ' +
            'never access something that requires stale data from the previous ' +
            'render, such as refs. Move this logic to componentDidMount and ' +
            'componentDidUpdate instead.',
            owner.getName() || 'A component'
          ) : null);
          owner._warnedAboutRefsInRender = true;
        }
      }
      var internalInstance = ReactInstanceMap.get(this);
      return (
        internalInstance &&
        internalInstance !== ReactLifeCycle.currentlyMountingInstance
      );
    },
  
    /**
     * Sets a subset of the props.
     *
     * @param {object} partialProps Subset of the next props.
     * @param {?function} callback Called after props are updated.
     * @final
     * @public
     * @deprecated
     */
    setProps: function(partialProps, callback) {
      ReactUpdateQueue.enqueueSetProps(this, partialProps);
      if (callback) {
        ReactUpdateQueue.enqueueCallback(this, callback);
      }
    },
  
    /**
     * Replace all the props.
     *
     * @param {object} newProps Subset of the next props.
     * @param {?function} callback Called after props are updated.
     * @final
     * @public
     * @deprecated
     */
    replaceProps: function(newProps, callback) {
      ReactUpdateQueue.enqueueReplaceProps(this, newProps);
      if (callback) {
        ReactUpdateQueue.enqueueCallback(this, callback);
      }
    }
  };
  
  var ReactClassComponent = function() {};
  assign(
    ReactClassComponent.prototype,
    ReactComponent.prototype,
    ReactClassMixin
  );
  
  /**
   * Module for creating composite components.
   *
   * @class ReactClass
   */
  var ReactClass = {
  
    /**
     * Creates a composite component class given a class specification.
     *
     * @param {object} spec Class specification (which must define `render`).
     * @return {function} Component constructor function.
     * @public
     */
    createClass: function(spec) {
      var Constructor = function(props, context) {
        // This constructor is overridden by mocks. The argument is used
        // by mocks to assert on what gets mounted.
  
        if (true) {
          (true ? warning(
            this instanceof Constructor,
            'Something is calling a React component directly. Use a factory or ' +
            'JSX instead. See: https://fb.me/react-legacyfactory'
          ) : null);
        }
  
        // Wire up auto-binding
        if (this.__reactAutoBindMap) {
          bindAutoBindMethods(this);
        }
  
        this.props = props;
        this.context = context;
        this.state = null;
  
        // ReactClasses doesn't have constructors. Instead, they use the
        // getInitialState and componentWillMount methods for initialization.
  
        var initialState = this.getInitialState ? this.getInitialState() : null;
        if (true) {
          // We allow auto-mocks to proceed as if they're returning null.
          if (typeof initialState === 'undefined' &&
              this.getInitialState._isMockFunction) {
            // This is probably bad practice. Consider warning here and
            // deprecating this convenience.
            initialState = null;
          }
        }
        (true ? invariant(
          typeof initialState === 'object' && !Array.isArray(initialState),
          '%s.getInitialState(): must return an object or null',
          Constructor.displayName || 'ReactCompositeComponent'
        ) : invariant(typeof initialState === 'object' && !Array.isArray(initialState)));
  
        this.state = initialState;
      };
      Constructor.prototype = new ReactClassComponent();
      Constructor.prototype.constructor = Constructor;
  
      injectedMixins.forEach(
        mixSpecIntoComponent.bind(null, Constructor)
      );
  
      mixSpecIntoComponent(Constructor, spec);
  
      // Initialize the defaultProps property after all mixins have been merged
      if (Constructor.getDefaultProps) {
        Constructor.defaultProps = Constructor.getDefaultProps();
      }
  
      if (true) {
        // This is a tag to indicate that the use of these method names is ok,
        // since it's used with createClass. If it's not, then it's likely a
        // mistake so we'll warn you to use the static property, property
        // initializer or constructor respectively.
        if (Constructor.getDefaultProps) {
          Constructor.getDefaultProps.isReactClassApproved = {};
        }
        if (Constructor.prototype.getInitialState) {
          Constructor.prototype.getInitialState.isReactClassApproved = {};
        }
      }
  
      (true ? invariant(
        Constructor.prototype.render,
        'createClass(...): Class specification must implement a `render` method.'
      ) : invariant(Constructor.prototype.render));
  
      if (true) {
        (true ? warning(
          !Constructor.prototype.componentShouldUpdate,
          '%s has a method called ' +
          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
          'The name is phrased as a question because the function is ' +
          'expected to return a value.',
          spec.displayName || 'A component'
        ) : null);
      }
  
      // Reduce time spent doing lookups by setting these on the prototype.
      for (var methodName in ReactClassInterface) {
        if (!Constructor.prototype[methodName]) {
          Constructor.prototype[methodName] = null;
        }
      }
  
      // Legacy hook
      Constructor.type = Constructor;
      if (true) {
        try {
          Object.defineProperty(Constructor, 'type', typeDeprecationDescriptor);
        } catch (x) {
          // IE will fail on defineProperty (es5-shim/sham too)
        }
      }
  
      return Constructor;
    },
  
    injection: {
      injectMixin: function(mixin) {
        injectedMixins.push(mixin);
      }
    }
  
  };
  
  module.exports = ReactClass;


/***/ },
/* 14 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  var stylesInDom = {},
  	memoize = function(fn) {
  		var memo;
  		return function () {
  			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
  			return memo;
  		};
  	},
  	isOldIE = memoize(function() {
  		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
  	}),
  	getHeadElement = memoize(function () {
  		return document.head || document.getElementsByTagName("head")[0];
  	}),
  	singletonElement = null,
  	singletonCounter = 0;
  
  module.exports = function(list, options) {
  	if(true) {
  		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
  	}
  
  	options = options || {};
  	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  	// tags it will allow on a page
  	if (typeof options.singleton === "undefined") options.singleton = isOldIE();
  
  	var styles = listToStyles(list);
  	addStylesToDom(styles, options);
  
  	return function update(newList) {
  		var mayRemove = [];
  		for(var i = 0; i < styles.length; i++) {
  			var item = styles[i];
  			var domStyle = stylesInDom[item.id];
  			domStyle.refs--;
  			mayRemove.push(domStyle);
  		}
  		if(newList) {
  			var newStyles = listToStyles(newList);
  			addStylesToDom(newStyles, options);
  		}
  		for(var i = 0; i < mayRemove.length; i++) {
  			var domStyle = mayRemove[i];
  			if(domStyle.refs === 0) {
  				for(var j = 0; j < domStyle.parts.length; j++)
  					domStyle.parts[j]();
  				delete stylesInDom[domStyle.id];
  			}
  		}
  	};
  }
  
  function addStylesToDom(styles, options) {
  	for(var i = 0; i < styles.length; i++) {
  		var item = styles[i];
  		var domStyle = stylesInDom[item.id];
  		if(domStyle) {
  			domStyle.refs++;
  			for(var j = 0; j < domStyle.parts.length; j++) {
  				domStyle.parts[j](item.parts[j]);
  			}
  			for(; j < item.parts.length; j++) {
  				domStyle.parts.push(addStyle(item.parts[j], options));
  			}
  		} else {
  			var parts = [];
  			for(var j = 0; j < item.parts.length; j++) {
  				parts.push(addStyle(item.parts[j], options));
  			}
  			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
  		}
  	}
  }
  
  function listToStyles(list) {
  	var styles = [];
  	var newStyles = {};
  	for(var i = 0; i < list.length; i++) {
  		var item = list[i];
  		var id = item[0];
  		var css = item[1];
  		var media = item[2];
  		var sourceMap = item[3];
  		var part = {css: css, media: media, sourceMap: sourceMap};
  		if(!newStyles[id])
  			styles.push(newStyles[id] = {id: id, parts: [part]});
  		else
  			newStyles[id].parts.push(part);
  	}
  	return styles;
  }
  
  function createStyleElement() {
  	var styleElement = document.createElement("style");
  	var head = getHeadElement();
  	styleElement.type = "text/css";
  	head.appendChild(styleElement);
  	return styleElement;
  }
  
  function createLinkElement() {
  	var linkElement = document.createElement("link");
  	var head = getHeadElement();
  	linkElement.rel = "stylesheet";
  	head.appendChild(linkElement);
  	return linkElement;
  }
  
  function addStyle(obj, options) {
  	var styleElement, update, remove;
  
  	if (options.singleton) {
  		var styleIndex = singletonCounter++;
  		styleElement = singletonElement || (singletonElement = createStyleElement());
  		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
  		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
  	} else if(obj.sourceMap &&
  		typeof URL === "function" &&
  		typeof URL.createObjectURL === "function" &&
  		typeof URL.revokeObjectURL === "function" &&
  		typeof Blob === "function" &&
  		typeof btoa === "function") {
  		styleElement = createLinkElement();
  		update = updateLink.bind(null, styleElement);
  		remove = function() {
  			styleElement.parentNode.removeChild(styleElement);
  			if(styleElement.href)
  				URL.revokeObjectURL(styleElement.href);
  		};
  	} else {
  		styleElement = createStyleElement();
  		update = applyToTag.bind(null, styleElement);
  		remove = function() {
  			styleElement.parentNode.removeChild(styleElement);
  		};
  	}
  
  	update(obj);
  
  	return function updateStyle(newObj) {
  		if(newObj) {
  			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
  				return;
  			update(obj = newObj);
  		} else {
  			remove();
  		}
  	};
  }
  
  var replaceText = (function () {
  	var textStore = [];
  
  	return function (index, replacement) {
  		textStore[index] = replacement;
  		return textStore.filter(Boolean).join('\n');
  	};
  })();
  
  function applyToSingletonTag(styleElement, index, remove, obj) {
  	var css = remove ? "" : obj.css;
  
  	if (styleElement.styleSheet) {
  		styleElement.styleSheet.cssText = replaceText(index, css);
  	} else {
  		var cssNode = document.createTextNode(css);
  		var childNodes = styleElement.childNodes;
  		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
  		if (childNodes.length) {
  			styleElement.insertBefore(cssNode, childNodes[index]);
  		} else {
  			styleElement.appendChild(cssNode);
  		}
  	}
  }
  
  function applyToTag(styleElement, obj) {
  	var css = obj.css;
  	var media = obj.media;
  	var sourceMap = obj.sourceMap;
  
  	if(media) {
  		styleElement.setAttribute("media", media)
  	}
  
  	if(styleElement.styleSheet) {
  		styleElement.styleSheet.cssText = css;
  	} else {
  		while(styleElement.firstChild) {
  			styleElement.removeChild(styleElement.firstChild);
  		}
  		styleElement.appendChild(document.createTextNode(css));
  	}
  }
  
  function updateLink(linkElement, obj) {
  	var css = obj.css;
  	var media = obj.media;
  	var sourceMap = obj.sourceMap;
  
  	if(sourceMap) {
  		// http://stackoverflow.com/a/26603875
  		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
  	}
  
  	var blob = new Blob([css], { type: "text/css" });
  
  	var oldSrc = linkElement.href;
  
  	linkElement.href = URL.createObjectURL(blob);
  
  	if(oldSrc)
  		URL.revokeObjectURL(oldSrc);
  }


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

  var sid = 0;
  function uid(key){
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
  }
  uid.safe = __webpack_require__(1).g.Symbol || uid;
  module.exports = uid;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(8);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _node_modulesReactLibInvariant = __webpack_require__(2);
  
  var _node_modulesReactLibInvariant2 = _interopRequireDefault(_node_modulesReactLibInvariant);
  
  var _node_modulesReactLibExecutionEnvironment = __webpack_require__(7);
  
  var count = 0;
  
  function withStyles(styles) {
    return function (ComposedComponent) {
      return (function () {
        _createClass(WithStyles, null, [{
          key: 'contextTypes',
          value: {
            onInsertCss: _react.PropTypes.func
          },
          enumerable: true
        }]);
  
        function WithStyles() {
          _classCallCheck(this, WithStyles);
  
          this.refCount = 0;
  
          ComposedComponent.prototype.renderCss = (function (css) {
            var style = undefined;
  
            if (_node_modulesReactLibExecutionEnvironment.canUseDOM) {
              if (this.styleId && (style = document.getElementById(this.styleId))) {
                if ('textContent' in style) {
                  style.textContent = css;
                } else {
                  style.styleSheet.cssText = css;
                }
              } else {
                this.styleId = 'dynamic-css-' + count++;
                style = document.createElement('style');
                style.setAttribute('id', this.styleId);
                style.setAttribute('type', 'text/css');
  
                if ('textContent' in style) {
                  style.textContent = css;
                } else {
                  style.styleSheet.cssText = css;
                }
  
                document.getElementsByTagName('head')[0].appendChild(style);
                this.refCount++;
              }
            } else {
              this.context.onInsertCss(css);
            }
          }).bind(this);
        }
  
        _createClass(WithStyles, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
            if (_node_modulesReactLibExecutionEnvironment.canUseDOM) {
              (0, _node_modulesReactLibInvariant2['default'])(styles.use, 'The style-loader must be configured with reference-counted API.');
              styles.use();
            } else {
              this.context.onInsertCss(styles.toString());
            }
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            styles.unuse();
  
            if (this.styleId) {
              this.refCount--;
  
              if (this.refCount < 1) {
                var style = document.getElementById(this.styleId);
  
                if (style) {
                  style.parentNode.removeChild(style);
                }
              }
            }
          }
        }, {
          key: 'render',
          value: function render() {
            return _react2['default'].createElement(ComposedComponent, this.props);
          }
        }]);
  
        return WithStyles;
      })();
    };
  }
  
  exports['default'] = withStyles;
  module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactMount
   */
  
  'use strict';
  
  var DOMProperty = __webpack_require__(29);
  var ReactBrowserEventEmitter = __webpack_require__(32);
  var ReactCurrentOwner = __webpack_require__(24);
  var ReactElement = __webpack_require__(5);
  var ReactElementValidator = __webpack_require__(41);
  var ReactEmptyComponent = __webpack_require__(75);
  var ReactInstanceHandles = __webpack_require__(33);
  var ReactInstanceMap = __webpack_require__(34);
  var ReactMarkupChecksum = __webpack_require__(110);
  var ReactPerf = __webpack_require__(27);
  var ReactReconciler = __webpack_require__(35);
  var ReactUpdateQueue = __webpack_require__(78);
  var ReactUpdates = __webpack_require__(19);
  
  var emptyObject = __webpack_require__(54);
  var containsNode = __webpack_require__(116);
  var getReactRootElementInContainer = __webpack_require__(273);
  var instantiateReactComponent = __webpack_require__(84);
  var invariant = __webpack_require__(2);
  var setInnerHTML = __webpack_require__(86);
  var shouldUpdateReactComponent = __webpack_require__(87);
  var warning = __webpack_require__(6);
  
  var SEPARATOR = ReactInstanceHandles.SEPARATOR;
  
  var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
  var nodeCache = {};
  
  var ELEMENT_NODE_TYPE = 1;
  var DOC_NODE_TYPE = 9;
  
  /** Mapping from reactRootID to React component instance. */
  var instancesByReactRootID = {};
  
  /** Mapping from reactRootID to `container` nodes. */
  var containersByReactRootID = {};
  
  if (true) {
    /** __DEV__-only mapping from reactRootID to root elements. */
    var rootElementsByReactRootID = {};
  }
  
  // Used to store breadth-first search state in findComponentRoot.
  var findComponentRootReusableArray = [];
  
  /**
   * Finds the index of the first character
   * that's not common between the two given strings.
   *
   * @return {number} the index of the character where the strings diverge
   */
  function firstDifferenceIndex(string1, string2) {
    var minLen = Math.min(string1.length, string2.length);
    for (var i = 0; i < minLen; i++) {
      if (string1.charAt(i) !== string2.charAt(i)) {
        return i;
      }
    }
    return string1.length === string2.length ? -1 : minLen;
  }
  
  /**
   * @param {DOMElement} container DOM element that may contain a React component.
   * @return {?string} A "reactRoot" ID, if a React component is rendered.
   */
  function getReactRootID(container) {
    var rootElement = getReactRootElementInContainer(container);
    return rootElement && ReactMount.getID(rootElement);
  }
  
  /**
   * Accessing node[ATTR_NAME] or calling getAttribute(ATTR_NAME) on a form
   * element can return its control whose name or ID equals ATTR_NAME. All
   * DOM nodes support `getAttributeNode` but this can also get called on
   * other objects so just return '' if we're given something other than a
   * DOM node (such as window).
   *
   * @param {?DOMElement|DOMWindow|DOMDocument|DOMTextNode} node DOM node.
   * @return {string} ID of the supplied `domNode`.
   */
  function getID(node) {
    var id = internalGetID(node);
    if (id) {
      if (nodeCache.hasOwnProperty(id)) {
        var cached = nodeCache[id];
        if (cached !== node) {
          (true ? invariant(
            !isValid(cached, id),
            'ReactMount: Two valid but unequal nodes with the same `%s`: %s',
            ATTR_NAME, id
          ) : invariant(!isValid(cached, id)));
  
          nodeCache[id] = node;
        }
      } else {
        nodeCache[id] = node;
      }
    }
  
    return id;
  }
  
  function internalGetID(node) {
    // If node is something like a window, document, or text node, none of
    // which support attributes or a .getAttribute method, gracefully return
    // the empty string, as if the attribute were missing.
    return node && node.getAttribute && node.getAttribute(ATTR_NAME) || '';
  }
  
  /**
   * Sets the React-specific ID of the given node.
   *
   * @param {DOMElement} node The DOM node whose ID will be set.
   * @param {string} id The value of the ID attribute.
   */
  function setID(node, id) {
    var oldID = internalGetID(node);
    if (oldID !== id) {
      delete nodeCache[oldID];
    }
    node.setAttribute(ATTR_NAME, id);
    nodeCache[id] = node;
  }
  
  /**
   * Finds the node with the supplied React-generated DOM ID.
   *
   * @param {string} id A React-generated DOM ID.
   * @return {DOMElement} DOM node with the suppled `id`.
   * @internal
   */
  function getNode(id) {
    if (!nodeCache.hasOwnProperty(id) || !isValid(nodeCache[id], id)) {
      nodeCache[id] = ReactMount.findReactNodeByID(id);
    }
    return nodeCache[id];
  }
  
  /**
   * Finds the node with the supplied public React instance.
   *
   * @param {*} instance A public React instance.
   * @return {?DOMElement} DOM node with the suppled `id`.
   * @internal
   */
  function getNodeFromInstance(instance) {
    var id = ReactInstanceMap.get(instance)._rootNodeID;
    if (ReactEmptyComponent.isNullComponentID(id)) {
      return null;
    }
    if (!nodeCache.hasOwnProperty(id) || !isValid(nodeCache[id], id)) {
      nodeCache[id] = ReactMount.findReactNodeByID(id);
    }
    return nodeCache[id];
  }
  
  /**
   * A node is "valid" if it is contained by a currently mounted container.
   *
   * This means that the node does not have to be contained by a document in
   * order to be considered valid.
   *
   * @param {?DOMElement} node The candidate DOM node.
   * @param {string} id The expected ID of the node.
   * @return {boolean} Whether the node is contained by a mounted container.
   */
  function isValid(node, id) {
    if (node) {
      (true ? invariant(
        internalGetID(node) === id,
        'ReactMount: Unexpected modification of `%s`',
        ATTR_NAME
      ) : invariant(internalGetID(node) === id));
  
      var container = ReactMount.findReactContainerForID(id);
      if (container && containsNode(container, node)) {
        return true;
      }
    }
  
    return false;
  }
  
  /**
   * Causes the cache to forget about one React-specific ID.
   *
   * @param {string} id The ID to forget.
   */
  function purgeID(id) {
    delete nodeCache[id];
  }
  
  var deepestNodeSoFar = null;
  function findDeepestCachedAncestorImpl(ancestorID) {
    var ancestor = nodeCache[ancestorID];
    if (ancestor && isValid(ancestor, ancestorID)) {
      deepestNodeSoFar = ancestor;
    } else {
      // This node isn't populated in the cache, so presumably none of its
      // descendants are. Break out of the loop.
      return false;
    }
  }
  
  /**
   * Return the deepest cached node whose ID is a prefix of `targetID`.
   */
  function findDeepestCachedAncestor(targetID) {
    deepestNodeSoFar = null;
    ReactInstanceHandles.traverseAncestors(
      targetID,
      findDeepestCachedAncestorImpl
    );
  
    var foundNode = deepestNodeSoFar;
    deepestNodeSoFar = null;
    return foundNode;
  }
  
  /**
   * Mounts this component and inserts it into the DOM.
   *
   * @param {ReactComponent} componentInstance The instance to mount.
   * @param {string} rootID DOM ID of the root node.
   * @param {DOMElement} container DOM element to mount into.
   * @param {ReactReconcileTransaction} transaction
   * @param {boolean} shouldReuseMarkup If true, do not insert markup
   */
  function mountComponentIntoNode(
      componentInstance,
      rootID,
      container,
      transaction,
      shouldReuseMarkup) {
    var markup = ReactReconciler.mountComponent(
      componentInstance, rootID, transaction, emptyObject
    );
    componentInstance._isTopLevel = true;
    ReactMount._mountImageIntoNode(markup, container, shouldReuseMarkup);
  }
  
  /**
   * Batched mount.
   *
   * @param {ReactComponent} componentInstance The instance to mount.
   * @param {string} rootID DOM ID of the root node.
   * @param {DOMElement} container DOM element to mount into.
   * @param {boolean} shouldReuseMarkup If true, do not insert markup
   */
  function batchedMountComponentIntoNode(
      componentInstance,
      rootID,
      container,
      shouldReuseMarkup) {
    var transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
    transaction.perform(
      mountComponentIntoNode,
      null,
      componentInstance,
      rootID,
      container,
      transaction,
      shouldReuseMarkup
    );
    ReactUpdates.ReactReconcileTransaction.release(transaction);
  }
  
  /**
   * Mounting is the process of initializing a React component by creating its
   * representative DOM elements and inserting them into a supplied `container`.
   * Any prior content inside `container` is destroyed in the process.
   *
   *   ReactMount.render(
   *     component,
   *     document.getElementById('container')
   *   );
   *
   *   <div id="container">                   <-- Supplied `container`.
   *     <div data-reactid=".3">              <-- Rendered reactRoot of React
   *       // ...                                 component.
   *     </div>
   *   </div>
   *
   * Inside of `container`, the first element rendered is the "reactRoot".
   */
  var ReactMount = {
    /** Exposed for debugging purposes **/
    _instancesByReactRootID: instancesByReactRootID,
  
    /**
     * This is a hook provided to support rendering React components while
     * ensuring that the apparent scroll position of its `container` does not
     * change.
     *
     * @param {DOMElement} container The `container` being rendered into.
     * @param {function} renderCallback This must be called once to do the render.
     */
    scrollMonitor: function(container, renderCallback) {
      renderCallback();
    },
  
    /**
     * Take a component that's already mounted into the DOM and replace its props
     * @param {ReactComponent} prevComponent component instance already in the DOM
     * @param {ReactElement} nextElement component instance to render
     * @param {DOMElement} container container to render into
     * @param {?function} callback function triggered on completion
     */
    _updateRootComponent: function(
        prevComponent,
        nextElement,
        container,
        callback) {
      if (true) {
        ReactElementValidator.checkAndWarnForMutatedProps(nextElement);
      }
  
      ReactMount.scrollMonitor(container, function() {
        ReactUpdateQueue.enqueueElementInternal(prevComponent, nextElement);
        if (callback) {
          ReactUpdateQueue.enqueueCallbackInternal(prevComponent, callback);
        }
      });
  
      if (true) {
        // Record the root element in case it later gets transplanted.
        rootElementsByReactRootID[getReactRootID(container)] =
          getReactRootElementInContainer(container);
      }
  
      return prevComponent;
    },
  
    /**
     * Register a component into the instance map and starts scroll value
     * monitoring
     * @param {ReactComponent} nextComponent component instance to render
     * @param {DOMElement} container container to render into
     * @return {string} reactRoot ID prefix
     */
    _registerComponent: function(nextComponent, container) {
      (true ? invariant(
        container && (
          (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE)
        ),
        '_registerComponent(...): Target container is not a DOM element.'
      ) : invariant(container && (
        (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE)
      )));
  
      ReactBrowserEventEmitter.ensureScrollValueMonitoring();
  
      var reactRootID = ReactMount.registerContainer(container);
      instancesByReactRootID[reactRootID] = nextComponent;
      return reactRootID;
    },
  
    /**
     * Render a new component into the DOM.
     * @param {ReactElement} nextElement element to render
     * @param {DOMElement} container container to render into
     * @param {boolean} shouldReuseMarkup if we should skip the markup insertion
     * @return {ReactComponent} nextComponent
     */
    _renderNewRootComponent: function(
      nextElement,
      container,
      shouldReuseMarkup
    ) {
      // Various parts of our code (such as ReactCompositeComponent's
      // _renderValidatedComponent) assume that calls to render aren't nested;
      // verify that that's the case.
      (true ? warning(
        ReactCurrentOwner.current == null,
        '_renderNewRootComponent(): Render methods should be a pure function ' +
        'of props and state; triggering nested component updates from ' +
        'render is not allowed. If necessary, trigger nested updates in ' +
        'componentDidUpdate.'
      ) : null);
  
      var componentInstance = instantiateReactComponent(nextElement, null);
      var reactRootID = ReactMount._registerComponent(
        componentInstance,
        container
      );
  
      // The initial render is synchronous but any updates that happen during
      // rendering, in componentWillMount or componentDidMount, will be batched
      // according to the current batching strategy.
  
      ReactUpdates.batchedUpdates(
        batchedMountComponentIntoNode,
        componentInstance,
        reactRootID,
        container,
        shouldReuseMarkup
      );
  
      if (true) {
        // Record the root element in case it later gets transplanted.
        rootElementsByReactRootID[reactRootID] =
          getReactRootElementInContainer(container);
      }
  
      return componentInstance;
    },
  
    /**
     * Renders a React component into the DOM in the supplied `container`.
     *
     * If the React component was previously rendered into `container`, this will
     * perform an update on it and only mutate the DOM as necessary to reflect the
     * latest React component.
     *
     * @param {ReactElement} nextElement Component element to render.
     * @param {DOMElement} container DOM element to render into.
     * @param {?function} callback function triggered on completion
     * @return {ReactComponent} Component instance rendered in `container`.
     */
    render: function(nextElement, container, callback) {
      (true ? invariant(
        ReactElement.isValidElement(nextElement),
        'React.render(): Invalid component element.%s',
        (
          typeof nextElement === 'string' ?
            ' Instead of passing an element string, make sure to instantiate ' +
            'it by passing it to React.createElement.' :
          typeof nextElement === 'function' ?
            ' Instead of passing a component class, make sure to instantiate ' +
            'it by passing it to React.createElement.' :
          // Check if it quacks like an element
          nextElement != null && nextElement.props !== undefined ?
            ' This may be caused by unintentionally loading two independent ' +
            'copies of React.' :
            ''
        )
      ) : invariant(ReactElement.isValidElement(nextElement)));
  
      var prevComponent = instancesByReactRootID[getReactRootID(container)];
  
      if (prevComponent) {
        var prevElement = prevComponent._currentElement;
        if (shouldUpdateReactComponent(prevElement, nextElement)) {
          return ReactMount._updateRootComponent(
            prevComponent,
            nextElement,
            container,
            callback
          ).getPublicInstance();
        } else {
          ReactMount.unmountComponentAtNode(container);
        }
      }
  
      var reactRootElement = getReactRootElementInContainer(container);
      var containerHasReactMarkup =
        reactRootElement && ReactMount.isRenderedByReact(reactRootElement);
  
      if (true) {
        if (!containerHasReactMarkup || reactRootElement.nextSibling) {
          var rootElementSibling = reactRootElement;
          while (rootElementSibling) {
            if (ReactMount.isRenderedByReact(rootElementSibling)) {
              (true ? warning(
                false,
                'render(): Target node has markup rendered by React, but there ' +
                'are unrelated nodes as well. This is most commonly caused by ' +
                'white-space inserted around server-rendered markup.'
              ) : null);
              break;
            }
  
            rootElementSibling = rootElementSibling.nextSibling;
          }
        }
      }
  
      var shouldReuseMarkup = containerHasReactMarkup && !prevComponent;
  
      var component = ReactMount._renderNewRootComponent(
        nextElement,
        container,
        shouldReuseMarkup
      ).getPublicInstance();
      if (callback) {
        callback.call(component);
      }
      return component;
    },
  
    /**
     * Constructs a component instance of `constructor` with `initialProps` and
     * renders it into the supplied `container`.
     *
     * @param {function} constructor React component constructor.
     * @param {?object} props Initial props of the component instance.
     * @param {DOMElement} container DOM element to render into.
     * @return {ReactComponent} Component instance rendered in `container`.
     */
    constructAndRenderComponent: function(constructor, props, container) {
      var element = ReactElement.createElement(constructor, props);
      return ReactMount.render(element, container);
    },
  
    /**
     * Constructs a component instance of `constructor` with `initialProps` and
     * renders it into a container node identified by supplied `id`.
     *
     * @param {function} componentConstructor React component constructor
     * @param {?object} props Initial props of the component instance.
     * @param {string} id ID of the DOM element to render into.
     * @return {ReactComponent} Component instance rendered in the container node.
     */
    constructAndRenderComponentByID: function(constructor, props, id) {
      var domNode = document.getElementById(id);
      (true ? invariant(
        domNode,
        'Tried to get element with id of "%s" but it is not present on the page.',
        id
      ) : invariant(domNode));
      return ReactMount.constructAndRenderComponent(constructor, props, domNode);
    },
  
    /**
     * Registers a container node into which React components will be rendered.
     * This also creates the "reactRoot" ID that will be assigned to the element
     * rendered within.
     *
     * @param {DOMElement} container DOM element to register as a container.
     * @return {string} The "reactRoot" ID of elements rendered within.
     */
    registerContainer: function(container) {
      var reactRootID = getReactRootID(container);
      if (reactRootID) {
        // If one exists, make sure it is a valid "reactRoot" ID.
        reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID);
      }
      if (!reactRootID) {
        // No valid "reactRoot" ID found, create one.
        reactRootID = ReactInstanceHandles.createReactRootID();
      }
      containersByReactRootID[reactRootID] = container;
      return reactRootID;
    },
  
    /**
     * Unmounts and destroys the React component rendered in the `container`.
     *
     * @param {DOMElement} container DOM element containing a React component.
     * @return {boolean} True if a component was found in and unmounted from
     *                   `container`
     */
    unmountComponentAtNode: function(container) {
      // Various parts of our code (such as ReactCompositeComponent's
      // _renderValidatedComponent) assume that calls to render aren't nested;
      // verify that that's the case. (Strictly speaking, unmounting won't cause a
      // render but we still don't expect to be in a render call here.)
      (true ? warning(
        ReactCurrentOwner.current == null,
        'unmountComponentAtNode(): Render methods should be a pure function of ' +
        'props and state; triggering nested component updates from render is ' +
        'not allowed. If necessary, trigger nested updates in ' +
        'componentDidUpdate.'
      ) : null);
  
      (true ? invariant(
        container && (
          (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE)
        ),
        'unmountComponentAtNode(...): Target container is not a DOM element.'
      ) : invariant(container && (
        (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE)
      )));
  
      var reactRootID = getReactRootID(container);
      var component = instancesByReactRootID[reactRootID];
      if (!component) {
        return false;
      }
      ReactMount.unmountComponentFromNode(component, container);
      delete instancesByReactRootID[reactRootID];
      delete containersByReactRootID[reactRootID];
      if (true) {
        delete rootElementsByReactRootID[reactRootID];
      }
      return true;
    },
  
    /**
     * Unmounts a component and removes it from the DOM.
     *
     * @param {ReactComponent} instance React component instance.
     * @param {DOMElement} container DOM element to unmount from.
     * @final
     * @internal
     * @see {ReactMount.unmountComponentAtNode}
     */
    unmountComponentFromNode: function(instance, container) {
      ReactReconciler.unmountComponent(instance);
  
      if (container.nodeType === DOC_NODE_TYPE) {
        container = container.documentElement;
      }
  
      // http://jsperf.com/emptying-a-node
      while (container.lastChild) {
        container.removeChild(container.lastChild);
      }
    },
  
    /**
     * Finds the container DOM element that contains React component to which the
     * supplied DOM `id` belongs.
     *
     * @param {string} id The ID of an element rendered by a React component.
     * @return {?DOMElement} DOM element that contains the `id`.
     */
    findReactContainerForID: function(id) {
      var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(id);
      var container = containersByReactRootID[reactRootID];
  
      if (true) {
        var rootElement = rootElementsByReactRootID[reactRootID];
        if (rootElement && rootElement.parentNode !== container) {
          (true ? invariant(
            // Call internalGetID here because getID calls isValid which calls
            // findReactContainerForID (this function).
            internalGetID(rootElement) === reactRootID,
            'ReactMount: Root element ID differed from reactRootID.'
          ) : invariant(// Call internalGetID here because getID calls isValid which calls
          // findReactContainerForID (this function).
          internalGetID(rootElement) === reactRootID));
  
          var containerChild = container.firstChild;
          if (containerChild &&
              reactRootID === internalGetID(containerChild)) {
            // If the container has a new child with the same ID as the old
            // root element, then rootElementsByReactRootID[reactRootID] is
            // just stale and needs to be updated. The case that deserves a
            // warning is when the container is empty.
            rootElementsByReactRootID[reactRootID] = containerChild;
          } else {
            (true ? warning(
              false,
              'ReactMount: Root element has been removed from its original ' +
              'container. New container:', rootElement.parentNode
            ) : null);
          }
        }
      }
  
      return container;
    },
  
    /**
     * Finds an element rendered by React with the supplied ID.
     *
     * @param {string} id ID of a DOM node in the React component.
     * @return {DOMElement} Root DOM node of the React component.
     */
    findReactNodeByID: function(id) {
      var reactRoot = ReactMount.findReactContainerForID(id);
      return ReactMount.findComponentRoot(reactRoot, id);
    },
  
    /**
     * True if the supplied `node` is rendered by React.
     *
     * @param {*} node DOM Element to check.
     * @return {boolean} True if the DOM Element appears to be rendered by React.
     * @internal
     */
    isRenderedByReact: function(node) {
      if (node.nodeType !== 1) {
        // Not a DOMElement, therefore not a React component
        return false;
      }
      var id = ReactMount.getID(node);
      return id ? id.charAt(0) === SEPARATOR : false;
    },
  
    /**
     * Traverses up the ancestors of the supplied node to find a node that is a
     * DOM representation of a React component.
     *
     * @param {*} node
     * @return {?DOMEventTarget}
     * @internal
     */
    getFirstReactDOM: function(node) {
      var current = node;
      while (current && current.parentNode !== current) {
        if (ReactMount.isRenderedByReact(current)) {
          return current;
        }
        current = current.parentNode;
      }
      return null;
    },
  
    /**
     * Finds a node with the supplied `targetID` inside of the supplied
     * `ancestorNode`.  Exploits the ID naming scheme to perform the search
     * quickly.
     *
     * @param {DOMEventTarget} ancestorNode Search from this root.
     * @pararm {string} targetID ID of the DOM representation of the component.
     * @return {DOMEventTarget} DOM node with the supplied `targetID`.
     * @internal
     */
    findComponentRoot: function(ancestorNode, targetID) {
      var firstChildren = findComponentRootReusableArray;
      var childIndex = 0;
  
      var deepestAncestor = findDeepestCachedAncestor(targetID) || ancestorNode;
  
      firstChildren[0] = deepestAncestor.firstChild;
      firstChildren.length = 1;
  
      while (childIndex < firstChildren.length) {
        var child = firstChildren[childIndex++];
        var targetChild;
  
        while (child) {
          var childID = ReactMount.getID(child);
          if (childID) {
            // Even if we find the node we're looking for, we finish looping
            // through its siblings to ensure they're cached so that we don't have
            // to revisit this node again. Otherwise, we make n^2 calls to getID
            // when visiting the many children of a single node in order.
  
            if (targetID === childID) {
              targetChild = child;
            } else if (ReactInstanceHandles.isAncestorIDOf(childID, targetID)) {
              // If we find a child whose ID is an ancestor of the given ID,
              // then we can be sure that we only want to search the subtree
              // rooted at this child, so we can throw out the rest of the
              // search state.
              firstChildren.length = childIndex = 0;
              firstChildren.push(child.firstChild);
            }
  
          } else {
            // If this child had no ID, then there's a chance that it was
            // injected automatically by the browser, as when a `<table>`
            // element sprouts an extra `<tbody>` child as a side effect of
            // `.innerHTML` parsing. Optimistically continue down this
            // branch, but not before examining the other siblings.
            firstChildren.push(child.firstChild);
          }
  
          child = child.nextSibling;
        }
  
        if (targetChild) {
          // Emptying firstChildren/findComponentRootReusableArray is
          // not necessary for correctness, but it helps the GC reclaim
          // any nodes that were left at the end of the search.
          firstChildren.length = 0;
  
          return targetChild;
        }
      }
  
      firstChildren.length = 0;
  
      (true ? invariant(
        false,
        'findComponentRoot(..., %s): Unable to find element. This probably ' +
        'means the DOM was unexpectedly mutated (e.g., by the browser), ' +
        'usually due to forgetting a <tbody> when using tables, nesting tags ' +
        'like <form>, <p>, or <a>, or using non-SVG elements in an <svg> ' +
        'parent. ' +
        'Try inspecting the child nodes of the element with React ID `%s`.',
        targetID,
        ReactMount.getID(ancestorNode)
      ) : invariant(false));
    },
  
    _mountImageIntoNode: function(markup, container, shouldReuseMarkup) {
      (true ? invariant(
        container && (
          (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE)
        ),
        'mountComponentIntoNode(...): Target container is not valid.'
      ) : invariant(container && (
        (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE)
      )));
  
      if (shouldReuseMarkup) {
        var rootElement = getReactRootElementInContainer(container);
        if (ReactMarkupChecksum.canReuseMarkup(markup, rootElement)) {
          return;
        } else {
          var checksum = rootElement.getAttribute(
            ReactMarkupChecksum.CHECKSUM_ATTR_NAME
          );
          rootElement.removeAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
  
          var rootMarkup = rootElement.outerHTML;
          rootElement.setAttribute(
            ReactMarkupChecksum.CHECKSUM_ATTR_NAME,
            checksum
          );
  
          var diffIndex = firstDifferenceIndex(markup, rootMarkup);
          var difference = ' (client) ' +
            markup.substring(diffIndex - 20, diffIndex + 20) +
            '\n (server) ' + rootMarkup.substring(diffIndex - 20, diffIndex + 20);
  
          (true ? invariant(
            container.nodeType !== DOC_NODE_TYPE,
            'You\'re trying to render a component to the document using ' +
            'server rendering but the checksum was invalid. This usually ' +
            'means you rendered a different component type or props on ' +
            'the client from the one on the server, or your render() ' +
            'methods are impure. React cannot handle this case due to ' +
            'cross-browser quirks by rendering at the document root. You ' +
            'should look for environment dependent code in your components ' +
            'and ensure the props are the same client and server side:\n%s',
            difference
          ) : invariant(container.nodeType !== DOC_NODE_TYPE));
  
          if (true) {
            (true ? warning(
              false,
              'React attempted to reuse markup in a container but the ' +
              'checksum was invalid. This generally means that you are ' +
              'using server rendering and the markup generated on the ' +
              'server was not what the client was expecting. React injected ' +
              'new markup to compensate which works but you have lost many ' +
              'of the benefits of server rendering. Instead, figure out ' +
              'why the markup being generated is different on the client ' +
              'or server:\n%s',
              difference
            ) : null);
          }
        }
      }
  
      (true ? invariant(
        container.nodeType !== DOC_NODE_TYPE,
        'You\'re trying to render a component to the document but ' +
          'you didn\'t use server rendering. We can\'t do this ' +
          'without using server rendering due to cross-browser quirks. ' +
          'See React.renderToString() for server rendering.'
      ) : invariant(container.nodeType !== DOC_NODE_TYPE));
  
      setInnerHTML(container, markup);
    },
  
    /**
     * React ID utilities.
     */
  
    getReactRootID: getReactRootID,
  
    getID: getID,
  
    setID: setID,
  
    getNode: getNode,
  
    getNodeFromInstance: getNodeFromInstance,
  
    purgeID: purgeID
  };
  
  ReactPerf.measureMethods(ReactMount, 'ReactMount', {
    _renderNewRootComponent: '_renderNewRootComponent',
    _mountImageIntoNode: '_mountImageIntoNode'
  });
  
  module.exports = ReactMount;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactUpdates
   */
  
  'use strict';
  
  var CallbackQueue = __webpack_require__(67);
  var PooledClass = __webpack_require__(22);
  var ReactCurrentOwner = __webpack_require__(24);
  var ReactPerf = __webpack_require__(27);
  var ReactReconciler = __webpack_require__(35);
  var Transaction = __webpack_require__(53);
  
  var assign = __webpack_require__(4);
  var invariant = __webpack_require__(2);
  var warning = __webpack_require__(6);
  
  var dirtyComponents = [];
  var asapCallbackQueue = CallbackQueue.getPooled();
  var asapEnqueued = false;
  
  var batchingStrategy = null;
  
  function ensureInjected() {
    (true ? invariant(
      ReactUpdates.ReactReconcileTransaction && batchingStrategy,
      'ReactUpdates: must inject a reconcile transaction class and batching ' +
      'strategy'
    ) : invariant(ReactUpdates.ReactReconcileTransaction && batchingStrategy));
  }
  
  var NESTED_UPDATES = {
    initialize: function() {
      this.dirtyComponentsLength = dirtyComponents.length;
    },
    close: function() {
      if (this.dirtyComponentsLength !== dirtyComponents.length) {
        // Additional updates were enqueued by componentDidUpdate handlers or
        // similar; before our own UPDATE_QUEUEING wrapper closes, we want to run
        // these new updates so that if A's componentDidUpdate calls setState on
        // B, B will update before the callback A's updater provided when calling
        // setState.
        dirtyComponents.splice(0, this.dirtyComponentsLength);
        flushBatchedUpdates();
      } else {
        dirtyComponents.length = 0;
      }
    }
  };
  
  var UPDATE_QUEUEING = {
    initialize: function() {
      this.callbackQueue.reset();
    },
    close: function() {
      this.callbackQueue.notifyAll();
    }
  };
  
  var TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING];
  
  function ReactUpdatesFlushTransaction() {
    this.reinitializeTransaction();
    this.dirtyComponentsLength = null;
    this.callbackQueue = CallbackQueue.getPooled();
    this.reconcileTransaction =
      ReactUpdates.ReactReconcileTransaction.getPooled();
  }
  
  assign(
    ReactUpdatesFlushTransaction.prototype,
    Transaction.Mixin, {
    getTransactionWrappers: function() {
      return TRANSACTION_WRAPPERS;
    },
  
    destructor: function() {
      this.dirtyComponentsLength = null;
      CallbackQueue.release(this.callbackQueue);
      this.callbackQueue = null;
      ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
      this.reconcileTransaction = null;
    },
  
    perform: function(method, scope, a) {
      // Essentially calls `this.reconcileTransaction.perform(method, scope, a)`
      // with this transaction's wrappers around it.
      return Transaction.Mixin.perform.call(
        this,
        this.reconcileTransaction.perform,
        this.reconcileTransaction,
        method,
        scope,
        a
      );
    }
  });
  
  PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);
  
  function batchedUpdates(callback, a, b, c, d) {
    ensureInjected();
    batchingStrategy.batchedUpdates(callback, a, b, c, d);
  }
  
  /**
   * Array comparator for ReactComponents by mount ordering.
   *
   * @param {ReactComponent} c1 first component you're comparing
   * @param {ReactComponent} c2 second component you're comparing
   * @return {number} Return value usable by Array.prototype.sort().
   */
  function mountOrderComparator(c1, c2) {
    return c1._mountOrder - c2._mountOrder;
  }
  
  function runBatchedUpdates(transaction) {
    var len = transaction.dirtyComponentsLength;
    (true ? invariant(
      len === dirtyComponents.length,
      'Expected flush transaction\'s stored dirty-components length (%s) to ' +
      'match dirty-components array length (%s).',
      len,
      dirtyComponents.length
    ) : invariant(len === dirtyComponents.length));
  
    // Since reconciling a component higher in the owner hierarchy usually (not
    // always -- see shouldComponentUpdate()) will reconcile children, reconcile
    // them before their children by sorting the array.
    dirtyComponents.sort(mountOrderComparator);
  
    for (var i = 0; i < len; i++) {
      // If a component is unmounted before pending changes apply, it will still
      // be here, but we assume that it has cleared its _pendingCallbacks and
      // that performUpdateIfNecessary is a noop.
      var component = dirtyComponents[i];
  
      // If performUpdateIfNecessary happens to enqueue any new updates, we
      // shouldn't execute the callbacks until the next render happens, so
      // stash the callbacks first
      var callbacks = component._pendingCallbacks;
      component._pendingCallbacks = null;
  
      ReactReconciler.performUpdateIfNecessary(
        component,
        transaction.reconcileTransaction
      );
  
      if (callbacks) {
        for (var j = 0; j < callbacks.length; j++) {
          transaction.callbackQueue.enqueue(
            callbacks[j],
            component.getPublicInstance()
          );
        }
      }
    }
  }
  
  var flushBatchedUpdates = function() {
    // ReactUpdatesFlushTransaction's wrappers will clear the dirtyComponents
    // array and perform any updates enqueued by mount-ready handlers (i.e.,
    // componentDidUpdate) but we need to check here too in order to catch
    // updates enqueued by setState callbacks and asap calls.
    while (dirtyComponents.length || asapEnqueued) {
      if (dirtyComponents.length) {
        var transaction = ReactUpdatesFlushTransaction.getPooled();
        transaction.perform(runBatchedUpdates, null, transaction);
        ReactUpdatesFlushTransaction.release(transaction);
      }
  
      if (asapEnqueued) {
        asapEnqueued = false;
        var queue = asapCallbackQueue;
        asapCallbackQueue = CallbackQueue.getPooled();
        queue.notifyAll();
        CallbackQueue.release(queue);
      }
    }
  };
  flushBatchedUpdates = ReactPerf.measure(
    'ReactUpdates',
    'flushBatchedUpdates',
    flushBatchedUpdates
  );
  
  /**
   * Mark a component as needing a rerender, adding an optional callback to a
   * list of functions which will be executed once the rerender occurs.
   */
  function enqueueUpdate(component) {
    ensureInjected();
  
    // Various parts of our code (such as ReactCompositeComponent's
    // _renderValidatedComponent) assume that calls to render aren't nested;
    // verify that that's the case. (This is called by each top-level update
    // function, like setProps, setState, forceUpdate, etc.; creation and
    // destruction of top-level components is guarded in ReactMount.)
    (true ? warning(
      ReactCurrentOwner.current == null,
      'enqueueUpdate(): Render methods should be a pure function of props ' +
      'and state; triggering nested component updates from render is not ' +
      'allowed. If necessary, trigger nested updates in ' +
      'componentDidUpdate.'
    ) : null);
  
    if (!batchingStrategy.isBatchingUpdates) {
      batchingStrategy.batchedUpdates(enqueueUpdate, component);
      return;
    }
  
    dirtyComponents.push(component);
  }
  
  /**
   * Enqueue a callback to be run at the end of the current batching cycle. Throws
   * if no updates are currently being performed.
   */
  function asap(callback, context) {
    (true ? invariant(
      batchingStrategy.isBatchingUpdates,
      'ReactUpdates.asap: Can\'t enqueue an asap callback in a context where' +
      'updates are not being batched.'
    ) : invariant(batchingStrategy.isBatchingUpdates));
    asapCallbackQueue.enqueue(callback, context);
    asapEnqueued = true;
  }
  
  var ReactUpdatesInjection = {
    injectReconcileTransaction: function(ReconcileTransaction) {
      (true ? invariant(
        ReconcileTransaction,
        'ReactUpdates: must provide a reconcile transaction class'
      ) : invariant(ReconcileTransaction));
      ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
    },
  
    injectBatchingStrategy: function(_batchingStrategy) {
      (true ? invariant(
        _batchingStrategy,
        'ReactUpdates: must provide a batching strategy'
      ) : invariant(_batchingStrategy));
      (true ? invariant(
        typeof _batchingStrategy.batchedUpdates === 'function',
        'ReactUpdates: must provide a batchedUpdates() function'
      ) : invariant(typeof _batchingStrategy.batchedUpdates === 'function'));
      (true ? invariant(
        typeof _batchingStrategy.isBatchingUpdates === 'boolean',
        'ReactUpdates: must provide an isBatchingUpdates boolean attribute'
      ) : invariant(typeof _batchingStrategy.isBatchingUpdates === 'boolean'));
      batchingStrategy = _batchingStrategy;
    }
  };
  
  var ReactUpdates = {
    /**
     * React references `ReactReconcileTransaction` using this property in order
     * to allow dependency injection.
     *
     * @internal
     */
    ReactReconcileTransaction: null,
  
    batchedUpdates: batchedUpdates,
    enqueueUpdate: enqueueUpdate,
    flushBatchedUpdates: flushBatchedUpdates,
    injection: ReactUpdatesInjection,
    asap: asap
  };
  
  module.exports = ReactUpdates;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $                 = __webpack_require__(1)
    , cof               = __webpack_require__(10)
    , classof           = cof.classof
    , assert            = __webpack_require__(9)
    , assertObject      = assert.obj
    , SYMBOL_ITERATOR   = __webpack_require__(11)('iterator')
    , FF_ITERATOR       = '@@iterator'
    , Iterators         = __webpack_require__(60)('iterators')
    , IteratorPrototype = {};
  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  setIterator(IteratorPrototype, $.that);
  function setIterator(O, value){
    $.hide(O, SYMBOL_ITERATOR, value);
    // Add iterator for FF iterator protocol
    if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
  }
  
  module.exports = {
    // Safari has buggy iterators w/o `next`
    BUGGY: 'keys' in [] && !('next' in [].keys()),
    Iterators: Iterators,
    step: function(done, value){
      return {value: value, done: !!done};
    },
    is: function(it){
      var O      = Object(it)
        , Symbol = $.g.Symbol;
      return (Symbol && Symbol.iterator || FF_ITERATOR) in O
        || SYMBOL_ITERATOR in O
        || $.has(Iterators, classof(O));
    },
    get: function(it){
      var Symbol = $.g.Symbol
        , getIter;
      if(it != undefined){
        getIter = it[Symbol && Symbol.iterator || FF_ITERATOR]
          || it[SYMBOL_ITERATOR]
          || Iterators[classof(it)];
      }
      assert($.isFunction(getIter), it, ' is not iterable!');
      return assertObject(getIter.call(it));
    },
    set: setIterator,
    create: function(Constructor, NAME, next, proto){
      Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
      cof.set(Constructor, NAME + ' Iterator');
    }
  };

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

  var $   = __webpack_require__(1)
    , tpl = String({}.hasOwnProperty)
    , SRC = __webpack_require__(16).safe('src')
    , _toString = Function.toString;
  
  function $redef(O, key, val, safe){
    if($.isFunction(val)){
      var base = O[key];
      $.hide(val, SRC, base ? String(base) : tpl.replace(/hasOwnProperty/, String(key)));
      if(!('name' in val))val.name = key;
    }
    if(O === $.g){
      O[key] = val;
    } else {
      if(!safe)delete O[key];
      $.hide(O, key, val);
    }
  }
  
  // add fake Function#toString for correct work wrapped methods / constructors
  // with methods similar to LoDash isNative
  $redef(Function.prototype, 'toString', function toString(){
    return $.has(this, SRC) ? this[SRC] : _toString.call(this);
  });
  
  $.core.inspectSource = function(it){
    return _toString.call(it);
  };
  
  module.exports = $redef;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule PooledClass
   */
  
  'use strict';
  
  var invariant = __webpack_require__(2);
  
  /**
   * Static poolers. Several custom versions for each potential number of
   * arguments. A completely generic pooler is easy to implement, but would
   * require accessing the `arguments` object. In each of these, `this` refers to
   * the Class itself, not an instance. If any others are needed, simply add them
   * here, or in their own files.
   */
  var oneArgumentPooler = function(copyFieldsFrom) {
    var Klass = this;
    if (Klass.instancePool.length) {
      var instance = Klass.instancePool.pop();
      Klass.call(instance, copyFieldsFrom);
      return instance;
    } else {
      return new Klass(copyFieldsFrom);
    }
  };
  
  var twoArgumentPooler = function(a1, a2) {
    var Klass = this;
    if (Klass.instancePool.length) {
      var instance = Klass.instancePool.pop();
      Klass.call(instance, a1, a2);
      return instance;
    } else {
      return new Klass(a1, a2);
    }
  };
  
  var threeArgumentPooler = function(a1, a2, a3) {
    var Klass = this;
    if (Klass.instancePool.length) {
      var instance = Klass.instancePool.pop();
      Klass.call(instance, a1, a2, a3);
      return instance;
    } else {
      return new Klass(a1, a2, a3);
    }
  };
  
  var fiveArgumentPooler = function(a1, a2, a3, a4, a5) {
    var Klass = this;
    if (Klass.instancePool.length) {
      var instance = Klass.instancePool.pop();
      Klass.call(instance, a1, a2, a3, a4, a5);
      return instance;
    } else {
      return new Klass(a1, a2, a3, a4, a5);
    }
  };
  
  var standardReleaser = function(instance) {
    var Klass = this;
    (true ? invariant(
      instance instanceof Klass,
      'Trying to release an instance into a pool of a different type.'
    ) : invariant(instance instanceof Klass));
    if (instance.destructor) {
      instance.destructor();
    }
    if (Klass.instancePool.length < Klass.poolSize) {
      Klass.instancePool.push(instance);
    }
  };
  
  var DEFAULT_POOL_SIZE = 10;
  var DEFAULT_POOLER = oneArgumentPooler;
  
  /**
   * Augments `CopyConstructor` to be a poolable class, augmenting only the class
   * itself (statically) not adding any prototypical fields. Any CopyConstructor
   * you give this may have a `poolSize` property, and will look for a
   * prototypical `destructor` on instances (optional).
   *
   * @param {Function} CopyConstructor Constructor that can be used to reset.
   * @param {Function} pooler Customizable pooler.
   */
  var addPoolingTo = function(CopyConstructor, pooler) {
    var NewKlass = CopyConstructor;
    NewKlass.instancePool = [];
    NewKlass.getPooled = pooler || DEFAULT_POOLER;
    if (!NewKlass.poolSize) {
      NewKlass.poolSize = DEFAULT_POOL_SIZE;
    }
    NewKlass.release = standardReleaser;
    return NewKlass;
  };
  
  var PooledClass = {
    addPoolingTo: addPoolingTo,
    oneArgumentPooler: oneArgumentPooler,
    twoArgumentPooler: twoArgumentPooler,
    threeArgumentPooler: threeArgumentPooler,
    fiveArgumentPooler: fiveArgumentPooler
  };
  
  module.exports = PooledClass;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactBrowserComponentMixin
   */
  
  'use strict';
  
  var findDOMNode = __webpack_require__(117);
  
  var ReactBrowserComponentMixin = {
    /**
     * Returns the DOM node rendered by this component.
     *
     * @return {DOMElement} The root node of this component.
     * @final
     * @protected
     */
    getDOMNode: function() {
      return findDOMNode(this);
    }
  };
  
  module.exports = ReactBrowserComponentMixin;


/***/ },
/* 24 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactCurrentOwner
   */
  
  'use strict';
  
  /**
   * Keeps track of the current owner.
   *
   * The current owner is the component who should own any components that are
   * currently being constructed.
   *
   * The depth indicate how many composite components are above this render level.
   */
  var ReactCurrentOwner = {
  
    /**
     * @internal
     * @type {ReactComponent}
     */
    current: null
  
  };
  
  module.exports = ReactCurrentOwner;


/***/ },
/* 25 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule emptyFunction
   */
  
  function makeEmptyFunction(arg) {
    return function() {
      return arg;
    };
  }
  
  /**
   * This function accepts and discards inputs; it has no side effects. This is
   * primarily useful idiomatically for overridable function endpoints which
   * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
   */
  function emptyFunction() {}
  
  emptyFunction.thatReturns = makeEmptyFunction;
  emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
  emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
  emptyFunction.thatReturnsNull = makeEmptyFunction(null);
  emptyFunction.thatReturnsThis = function() { return this; };
  emptyFunction.thatReturnsArgument = function(arg) { return arg; };
  
  module.exports = emptyFunction;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

  // Optional / simple context binding
  var assertFunction = __webpack_require__(9).fn;
  module.exports = function(fn, that, length){
    assertFunction(fn);
    if(~length && that === undefined)return fn;
    switch(length){
      case 1: return function(a){
        return fn.call(that, a);
      };
      case 2: return function(a, b){
        return fn.call(that, a, b);
      };
      case 3: return function(a, b, c){
        return fn.call(that, a, b, c);
      };
    } return function(/* ...args */){
        return fn.apply(that, arguments);
      };
  };

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactPerf
   * @typechecks static-only
   */
  
  'use strict';
  
  /**
   * ReactPerf is a general AOP system designed to measure performance. This
   * module only has the hooks: see ReactDefaultPerf for the analysis tool.
   */
  var ReactPerf = {
    /**
     * Boolean to enable/disable measurement. Set to false by default to prevent
     * accidental logging and perf loss.
     */
    enableMeasure: false,
  
    /**
     * Holds onto the measure function in use. By default, don't measure
     * anything, but we'll override this if we inject a measure function.
     */
    storedMeasure: _noMeasure,
  
    /**
     * @param {object} object
     * @param {string} objectName
     * @param {object<string>} methodNames
     */
    measureMethods: function(object, objectName, methodNames) {
      if (true) {
        for (var key in methodNames) {
          if (!methodNames.hasOwnProperty(key)) {
            continue;
          }
          object[key] = ReactPerf.measure(
            objectName,
            methodNames[key],
            object[key]
          );
        }
      }
    },
  
    /**
     * Use this to wrap methods you want to measure. Zero overhead in production.
     *
     * @param {string} objName
     * @param {string} fnName
     * @param {function} func
     * @return {function}
     */
    measure: function(objName, fnName, func) {
      if (true) {
        var measuredFunc = null;
        var wrapper = function() {
          if (ReactPerf.enableMeasure) {
            if (!measuredFunc) {
              measuredFunc = ReactPerf.storedMeasure(objName, fnName, func);
            }
            return measuredFunc.apply(this, arguments);
          }
          return func.apply(this, arguments);
        };
        wrapper.displayName = objName + '_' + fnName;
        return wrapper;
      }
      return func;
    },
  
    injection: {
      /**
       * @param {function} measure
       */
      injectMeasure: function(measure) {
        ReactPerf.storedMeasure = measure;
      }
    }
  };
  
  /**
   * Simply passes through the measured function, without measuring it.
   *
   * @param {string} objName
   * @param {string} fnName
   * @param {function} func
   * @return {function}
   */
  function _noMeasure(objName, fnName, func) {
    return func;
  }
  
  module.exports = ReactPerf;


/***/ },
/* 28 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule keyOf
   */
  
  /**
   * Allows extraction of a minified key. Let's the build system minify keys
   * without loosing the ability to dynamically use key strings as values
   * themselves. Pass in an object with a single key/val pair and it will return
   * you the string key of that single record. Suppose you want to grab the
   * value for a key 'className' inside of an object. Key/val minification may
   * have aliased that key to be 'xa12'. keyOf({className: null}) will return
   * 'xa12' in that case. Resolve keys you want to use once at startup time, then
   * reuse those resolutions.
   */
  var keyOf = function(oneKeyObj) {
    var key;
    for (key in oneKeyObj) {
      if (!oneKeyObj.hasOwnProperty(key)) {
        continue;
      }
      return key;
    }
    return null;
  };
  
  
  module.exports = keyOf;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule DOMProperty
   * @typechecks static-only
   */
  
  /*jslint bitwise: true */
  
  'use strict';
  
  var invariant = __webpack_require__(2);
  
  function checkMask(value, bitmask) {
    return (value & bitmask) === bitmask;
  }
  
  var DOMPropertyInjection = {
    /**
     * Mapping from normalized, camelcased property names to a configuration that
     * specifies how the associated DOM property should be accessed or rendered.
     */
    MUST_USE_ATTRIBUTE: 0x1,
    MUST_USE_PROPERTY: 0x2,
    HAS_SIDE_EFFECTS: 0x4,
    HAS_BOOLEAN_VALUE: 0x8,
    HAS_NUMERIC_VALUE: 0x10,
    HAS_POSITIVE_NUMERIC_VALUE: 0x20 | 0x10,
    HAS_OVERLOADED_BOOLEAN_VALUE: 0x40,
  
    /**
     * Inject some specialized knowledge about the DOM. This takes a config object
     * with the following properties:
     *
     * isCustomAttribute: function that given an attribute name will return true
     * if it can be inserted into the DOM verbatim. Useful for data-* or aria-*
     * attributes where it's impossible to enumerate all of the possible
     * attribute names,
     *
     * Properties: object mapping DOM property name to one of the
     * DOMPropertyInjection constants or null. If your attribute isn't in here,
     * it won't get written to the DOM.
     *
     * DOMAttributeNames: object mapping React attribute name to the DOM
     * attribute name. Attribute names not specified use the **lowercase**
     * normalized name.
     *
     * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
     * Property names not specified use the normalized name.
     *
     * DOMMutationMethods: Properties that require special mutation methods. If
     * `value` is undefined, the mutation method should unset the property.
     *
     * @param {object} domPropertyConfig the config as described above.
     */
    injectDOMPropertyConfig: function(domPropertyConfig) {
      var Properties = domPropertyConfig.Properties || {};
      var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
      var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
      var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};
  
      if (domPropertyConfig.isCustomAttribute) {
        DOMProperty._isCustomAttributeFunctions.push(
          domPropertyConfig.isCustomAttribute
        );
      }
  
      for (var propName in Properties) {
        (true ? invariant(
          !DOMProperty.isStandardName.hasOwnProperty(propName),
          'injectDOMPropertyConfig(...): You\'re trying to inject DOM property ' +
          '\'%s\' which has already been injected. You may be accidentally ' +
          'injecting the same DOM property config twice, or you may be ' +
          'injecting two configs that have conflicting property names.',
          propName
        ) : invariant(!DOMProperty.isStandardName.hasOwnProperty(propName)));
  
        DOMProperty.isStandardName[propName] = true;
  
        var lowerCased = propName.toLowerCase();
        DOMProperty.getPossibleStandardName[lowerCased] = propName;
  
        if (DOMAttributeNames.hasOwnProperty(propName)) {
          var attributeName = DOMAttributeNames[propName];
          DOMProperty.getPossibleStandardName[attributeName] = propName;
          DOMProperty.getAttributeName[propName] = attributeName;
        } else {
          DOMProperty.getAttributeName[propName] = lowerCased;
        }
  
        DOMProperty.getPropertyName[propName] =
          DOMPropertyNames.hasOwnProperty(propName) ?
            DOMPropertyNames[propName] :
            propName;
  
        if (DOMMutationMethods.hasOwnProperty(propName)) {
          DOMProperty.getMutationMethod[propName] = DOMMutationMethods[propName];
        } else {
          DOMProperty.getMutationMethod[propName] = null;
        }
  
        var propConfig = Properties[propName];
        DOMProperty.mustUseAttribute[propName] =
          checkMask(propConfig, DOMPropertyInjection.MUST_USE_ATTRIBUTE);
        DOMProperty.mustUseProperty[propName] =
          checkMask(propConfig, DOMPropertyInjection.MUST_USE_PROPERTY);
        DOMProperty.hasSideEffects[propName] =
          checkMask(propConfig, DOMPropertyInjection.HAS_SIDE_EFFECTS);
        DOMProperty.hasBooleanValue[propName] =
          checkMask(propConfig, DOMPropertyInjection.HAS_BOOLEAN_VALUE);
        DOMProperty.hasNumericValue[propName] =
          checkMask(propConfig, DOMPropertyInjection.HAS_NUMERIC_VALUE);
        DOMProperty.hasPositiveNumericValue[propName] =
          checkMask(propConfig, DOMPropertyInjection.HAS_POSITIVE_NUMERIC_VALUE);
        DOMProperty.hasOverloadedBooleanValue[propName] =
          checkMask(propConfig, DOMPropertyInjection.HAS_OVERLOADED_BOOLEAN_VALUE);
  
        (true ? invariant(
          !DOMProperty.mustUseAttribute[propName] ||
            !DOMProperty.mustUseProperty[propName],
          'DOMProperty: Cannot require using both attribute and property: %s',
          propName
        ) : invariant(!DOMProperty.mustUseAttribute[propName] ||
          !DOMProperty.mustUseProperty[propName]));
        (true ? invariant(
          DOMProperty.mustUseProperty[propName] ||
            !DOMProperty.hasSideEffects[propName],
          'DOMProperty: Properties that have side effects must use property: %s',
          propName
        ) : invariant(DOMProperty.mustUseProperty[propName] ||
          !DOMProperty.hasSideEffects[propName]));
        (true ? invariant(
          !!DOMProperty.hasBooleanValue[propName] +
            !!DOMProperty.hasNumericValue[propName] +
            !!DOMProperty.hasOverloadedBooleanValue[propName] <= 1,
          'DOMProperty: Value can be one of boolean, overloaded boolean, or ' +
          'numeric value, but not a combination: %s',
          propName
        ) : invariant(!!DOMProperty.hasBooleanValue[propName] +
          !!DOMProperty.hasNumericValue[propName] +
          !!DOMProperty.hasOverloadedBooleanValue[propName] <= 1));
      }
    }
  };
  var defaultValueCache = {};
  
  /**
   * DOMProperty exports lookup objects that can be used like functions:
   *
   *   > DOMProperty.isValid['id']
   *   true
   *   > DOMProperty.isValid['foobar']
   *   undefined
   *
   * Although this may be confusing, it performs better in general.
   *
   * @see http://jsperf.com/key-exists
   * @see http://jsperf.com/key-missing
   */
  var DOMProperty = {
  
    ID_ATTRIBUTE_NAME: 'data-reactid',
  
    /**
     * Checks whether a property name is a standard property.
     * @type {Object}
     */
    isStandardName: {},
  
    /**
     * Mapping from lowercase property names to the properly cased version, used
     * to warn in the case of missing properties.
     * @type {Object}
     */
    getPossibleStandardName: {},
  
    /**
     * Mapping from normalized names to attribute names that differ. Attribute
     * names are used when rendering markup or with `*Attribute()`.
     * @type {Object}
     */
    getAttributeName: {},
  
    /**
     * Mapping from normalized names to properties on DOM node instances.
     * (This includes properties that mutate due to external factors.)
     * @type {Object}
     */
    getPropertyName: {},
  
    /**
     * Mapping from normalized names to mutation methods. This will only exist if
     * mutation cannot be set simply by the property or `setAttribute()`.
     * @type {Object}
     */
    getMutationMethod: {},
  
    /**
     * Whether the property must be accessed and mutated as an object property.
     * @type {Object}
     */
    mustUseAttribute: {},
  
    /**
     * Whether the property must be accessed and mutated using `*Attribute()`.
     * (This includes anything that fails `<propName> in <element>`.)
     * @type {Object}
     */
    mustUseProperty: {},
  
    /**
     * Whether or not setting a value causes side effects such as triggering
     * resources to be loaded or text selection changes. We must ensure that
     * the value is only set if it has changed.
     * @type {Object}
     */
    hasSideEffects: {},
  
    /**
     * Whether the property should be removed when set to a falsey value.
     * @type {Object}
     */
    hasBooleanValue: {},
  
    /**
     * Whether the property must be numeric or parse as a
     * numeric and should be removed when set to a falsey value.
     * @type {Object}
     */
    hasNumericValue: {},
  
    /**
     * Whether the property must be positive numeric or parse as a positive
     * numeric and should be removed when set to a falsey value.
     * @type {Object}
     */
    hasPositiveNumericValue: {},
  
    /**
     * Whether the property can be used as a flag as well as with a value. Removed
     * when strictly equal to false; present without a value when strictly equal
     * to true; present with a value otherwise.
     * @type {Object}
     */
    hasOverloadedBooleanValue: {},
  
    /**
     * All of the isCustomAttribute() functions that have been injected.
     */
    _isCustomAttributeFunctions: [],
  
    /**
     * Checks whether a property name is a custom attribute.
     * @method
     */
    isCustomAttribute: function(attributeName) {
      for (var i = 0; i < DOMProperty._isCustomAttributeFunctions.length; i++) {
        var isCustomAttributeFn = DOMProperty._isCustomAttributeFunctions[i];
        if (isCustomAttributeFn(attributeName)) {
          return true;
        }
      }
      return false;
    },
  
    /**
     * Returns the default property value for a DOM property (i.e., not an
     * attribute). Most default values are '' or false, but not all. Worse yet,
     * some (in particular, `type`) vary depending on the type of element.
     *
     * TODO: Is it better to grab all the possible properties when creating an
     * element to avoid having to create the same element twice?
     */
    getDefaultValueForProperty: function(nodeName, prop) {
      var nodeDefaults = defaultValueCache[nodeName];
      var testElement;
      if (!nodeDefaults) {
        defaultValueCache[nodeName] = nodeDefaults = {};
      }
      if (!(prop in nodeDefaults)) {
        testElement = document.createElement(nodeName);
        nodeDefaults[prop] = testElement[prop];
      }
      return nodeDefaults[prop];
    },
  
    injection: DOMPropertyInjection
  };
  
  module.exports = DOMProperty;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule SyntheticEvent
   * @typechecks static-only
   */
  
  'use strict';
  
  var PooledClass = __webpack_require__(22);
  
  var assign = __webpack_require__(4);
  var emptyFunction = __webpack_require__(25);
  var getEventTarget = __webpack_require__(83);
  
  /**
   * @interface Event
   * @see http://www.w3.org/TR/DOM-Level-3-Events/
   */
  var EventInterface = {
    type: null,
    target: getEventTarget,
    // currentTarget is set when dispatching; no use in copying it here
    currentTarget: emptyFunction.thatReturnsNull,
    eventPhase: null,
    bubbles: null,
    cancelable: null,
    timeStamp: function(event) {
      return event.timeStamp || Date.now();
    },
    defaultPrevented: null,
    isTrusted: null
  };
  
  /**
   * Synthetic events are dispatched by event plugins, typically in response to a
   * top-level event delegation handler.
   *
   * These systems should generally use pooling to reduce the frequency of garbage
   * collection. The system should check `isPersistent` to determine whether the
   * event should be released into the pool after being dispatched. Users that
   * need a persisted event should invoke `persist`.
   *
   * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
   * normalizing browser quirks. Subclasses do not necessarily have to implement a
   * DOM interface; custom application-specific events can also subclass this.
   *
   * @param {object} dispatchConfig Configuration used to dispatch this event.
   * @param {string} dispatchMarker Marker identifying the event target.
   * @param {object} nativeEvent Native browser event.
   */
  function SyntheticEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    this.dispatchConfig = dispatchConfig;
    this.dispatchMarker = dispatchMarker;
    this.nativeEvent = nativeEvent;
  
    var Interface = this.constructor.Interface;
    for (var propName in Interface) {
      if (!Interface.hasOwnProperty(propName)) {
        continue;
      }
      var normalize = Interface[propName];
      if (normalize) {
        this[propName] = normalize(nativeEvent);
      } else {
        this[propName] = nativeEvent[propName];
      }
    }
  
    var defaultPrevented = nativeEvent.defaultPrevented != null ?
      nativeEvent.defaultPrevented :
      nativeEvent.returnValue === false;
    if (defaultPrevented) {
      this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
    } else {
      this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
    }
    this.isPropagationStopped = emptyFunction.thatReturnsFalse;
  }
  
  assign(SyntheticEvent.prototype, {
  
    preventDefault: function() {
      this.defaultPrevented = true;
      var event = this.nativeEvent;
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
      this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
    },
  
    stopPropagation: function() {
      var event = this.nativeEvent;
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
      this.isPropagationStopped = emptyFunction.thatReturnsTrue;
    },
  
    /**
     * We release all dispatched `SyntheticEvent`s after each event loop, adding
     * them back into the pool. This allows a way to hold onto a reference that
     * won't be added back into the pool.
     */
    persist: function() {
      this.isPersistent = emptyFunction.thatReturnsTrue;
    },
  
    /**
     * Checks if this event should be released back into the pool.
     *
     * @return {boolean} True if this should not be released, false otherwise.
     */
    isPersistent: emptyFunction.thatReturnsFalse,
  
    /**
     * `PooledClass` looks for `destructor` on each instance it releases.
     */
    destructor: function() {
      var Interface = this.constructor.Interface;
      for (var propName in Interface) {
        this[propName] = null;
      }
      this.dispatchConfig = null;
      this.dispatchMarker = null;
      this.nativeEvent = null;
    }
  
  });
  
  SyntheticEvent.Interface = EventInterface;
  
  /**
   * Helper to reduce boilerplate when creating subclasses.
   *
   * @param {function} Class
   * @param {?object} Interface
   */
  SyntheticEvent.augmentClass = function(Class, Interface) {
    var Super = this;
  
    var prototype = Object.create(Super.prototype);
    assign(prototype, Class.prototype);
    Class.prototype = prototype;
    Class.prototype.constructor = Class;
  
    Class.Interface = assign({}, Super.Interface, Interface);
    Class.augmentClass = Super.augmentClass;
  
    PooledClass.addPoolingTo(Class, PooledClass.threeArgumentPooler);
  };
  
  PooledClass.addPoolingTo(SyntheticEvent, PooledClass.threeArgumentPooler);
  
  module.exports = SyntheticEvent;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

  // 22.1.3.31 Array.prototype[@@unscopables]
  var UNSCOPABLES = __webpack_require__(11)('unscopables');
  if(!(UNSCOPABLES in []))__webpack_require__(1).hide(Array.prototype, UNSCOPABLES, {});
  module.exports = function(key){
    [][UNSCOPABLES][key] = true;
  };

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactBrowserEventEmitter
   * @typechecks static-only
   */
  
  'use strict';
  
  var EventConstants = __webpack_require__(12);
  var EventPluginHub = __webpack_require__(39);
  var EventPluginRegistry = __webpack_require__(105);
  var ReactEventEmitterMixin = __webpack_require__(242);
  var ViewportMetrics = __webpack_require__(115);
  
  var assign = __webpack_require__(4);
  var isEventSupported = __webpack_require__(85);
  
  /**
   * Summary of `ReactBrowserEventEmitter` event handling:
   *
   *  - Top-level delegation is used to trap most native browser events. This
   *    may only occur in the main thread and is the responsibility of
   *    ReactEventListener, which is injected and can therefore support pluggable
   *    event sources. This is the only work that occurs in the main thread.
   *
   *  - We normalize and de-duplicate events to account for browser quirks. This
   *    may be done in the worker thread.
   *
   *  - Forward these native events (with the associated top-level type used to
   *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
   *    to extract any synthetic events.
   *
   *  - The `EventPluginHub` will then process each event by annotating them with
   *    "dispatches", a sequence of listeners and IDs that care about that event.
   *
   *  - The `EventPluginHub` then dispatches the events.
   *
   * Overview of React and the event system:
   *
   * +------------+    .
   * |    DOM     |    .
   * +------------+    .
   *       |           .
   *       v           .
   * +------------+    .
   * | ReactEvent |    .
   * |  Listener  |    .
   * +------------+    .                         +-----------+
   *       |           .               +--------+|SimpleEvent|
   *       |           .               |         |Plugin     |
   * +-----|------+    .               v         +-----------+
   * |     |      |    .    +--------------+                    +------------+
   * |     +-----------.--->|EventPluginHub|                    |    Event   |
   * |            |    .    |              |     +-----------+  | Propagators|
   * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
   * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
   * |            |    .    |              |     +-----------+  |  utilities |
   * |     +-----------.--->|              |                    +------------+
   * |     |      |    .    +--------------+
   * +-----|------+    .                ^        +-----------+
   *       |           .                |        |Enter/Leave|
   *       +           .                +-------+|Plugin     |
   * +-------------+   .                         +-----------+
   * | application |   .
   * |-------------|   .
   * |             |   .
   * |             |   .
   * +-------------+   .
   *                   .
   *    React Core     .  General Purpose Event Plugin System
   */
  
  var alreadyListeningTo = {};
  var isMonitoringScrollValue = false;
  var reactTopListenersCounter = 0;
  
  // For events like 'submit' which don't consistently bubble (which we trap at a
  // lower node than `document`), binding at `document` would cause duplicate
  // events so we don't include them here
  var topEventMapping = {
    topBlur: 'blur',
    topChange: 'change',
    topClick: 'click',
    topCompositionEnd: 'compositionend',
    topCompositionStart: 'compositionstart',
    topCompositionUpdate: 'compositionupdate',
    topContextMenu: 'contextmenu',
    topCopy: 'copy',
    topCut: 'cut',
    topDoubleClick: 'dblclick',
    topDrag: 'drag',
    topDragEnd: 'dragend',
    topDragEnter: 'dragenter',
    topDragExit: 'dragexit',
    topDragLeave: 'dragleave',
    topDragOver: 'dragover',
    topDragStart: 'dragstart',
    topDrop: 'drop',
    topFocus: 'focus',
    topInput: 'input',
    topKeyDown: 'keydown',
    topKeyPress: 'keypress',
    topKeyUp: 'keyup',
    topMouseDown: 'mousedown',
    topMouseMove: 'mousemove',
    topMouseOut: 'mouseout',
    topMouseOver: 'mouseover',
    topMouseUp: 'mouseup',
    topPaste: 'paste',
    topScroll: 'scroll',
    topSelectionChange: 'selectionchange',
    topTextInput: 'textInput',
    topTouchCancel: 'touchcancel',
    topTouchEnd: 'touchend',
    topTouchMove: 'touchmove',
    topTouchStart: 'touchstart',
    topWheel: 'wheel'
  };
  
  /**
   * To ensure no conflicts with other potential React instances on the page
   */
  var topListenersIDKey = '_reactListenersID' + String(Math.random()).slice(2);
  
  function getListeningForDocument(mountAt) {
    // In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
    // directly.
    if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
      mountAt[topListenersIDKey] = reactTopListenersCounter++;
      alreadyListeningTo[mountAt[topListenersIDKey]] = {};
    }
    return alreadyListeningTo[mountAt[topListenersIDKey]];
  }
  
  /**
   * `ReactBrowserEventEmitter` is used to attach top-level event listeners. For
   * example:
   *
   *   ReactBrowserEventEmitter.putListener('myID', 'onClick', myFunction);
   *
   * This would allocate a "registration" of `('onClick', myFunction)` on 'myID'.
   *
   * @internal
   */
  var ReactBrowserEventEmitter = assign({}, ReactEventEmitterMixin, {
  
    /**
     * Injectable event backend
     */
    ReactEventListener: null,
  
    injection: {
      /**
       * @param {object} ReactEventListener
       */
      injectReactEventListener: function(ReactEventListener) {
        ReactEventListener.setHandleTopLevel(
          ReactBrowserEventEmitter.handleTopLevel
        );
        ReactBrowserEventEmitter.ReactEventListener = ReactEventListener;
      }
    },
  
    /**
     * Sets whether or not any created callbacks should be enabled.
     *
     * @param {boolean} enabled True if callbacks should be enabled.
     */
    setEnabled: function(enabled) {
      if (ReactBrowserEventEmitter.ReactEventListener) {
        ReactBrowserEventEmitter.ReactEventListener.setEnabled(enabled);
      }
    },
  
    /**
     * @return {boolean} True if callbacks are enabled.
     */
    isEnabled: function() {
      return !!(
        (ReactBrowserEventEmitter.ReactEventListener && ReactBrowserEventEmitter.ReactEventListener.isEnabled())
      );
    },
  
    /**
     * We listen for bubbled touch events on the document object.
     *
     * Firefox v8.01 (and possibly others) exhibited strange behavior when
     * mounting `onmousemove` events at some node that was not the document
     * element. The symptoms were that if your mouse is not moving over something
     * contained within that mount point (for example on the background) the
     * top-level listeners for `onmousemove` won't be called. However, if you
     * register the `mousemove` on the document object, then it will of course
     * catch all `mousemove`s. This along with iOS quirks, justifies restricting
     * top-level listeners to the document object only, at least for these
     * movement types of events and possibly all events.
     *
     * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
     *
     * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
     * they bubble to document.
     *
     * @param {string} registrationName Name of listener (e.g. `onClick`).
     * @param {object} contentDocumentHandle Document which owns the container
     */
    listenTo: function(registrationName, contentDocumentHandle) {
      var mountAt = contentDocumentHandle;
      var isListening = getListeningForDocument(mountAt);
      var dependencies = EventPluginRegistry.
        registrationNameDependencies[registrationName];
  
      var topLevelTypes = EventConstants.topLevelTypes;
      for (var i = 0, l = dependencies.length; i < l; i++) {
        var dependency = dependencies[i];
        if (!(
              (isListening.hasOwnProperty(dependency) && isListening[dependency])
            )) {
          if (dependency === topLevelTypes.topWheel) {
            if (isEventSupported('wheel')) {
              ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
                topLevelTypes.topWheel,
                'wheel',
                mountAt
              );
            } else if (isEventSupported('mousewheel')) {
              ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
                topLevelTypes.topWheel,
                'mousewheel',
                mountAt
              );
            } else {
              // Firefox needs to capture a different mouse scroll event.
              // @see http://www.quirksmode.org/dom/events/tests/scroll.html
              ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
                topLevelTypes.topWheel,
                'DOMMouseScroll',
                mountAt
              );
            }
          } else if (dependency === topLevelTypes.topScroll) {
  
            if (isEventSupported('scroll', true)) {
              ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(
                topLevelTypes.topScroll,
                'scroll',
                mountAt
              );
            } else {
              ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
                topLevelTypes.topScroll,
                'scroll',
                ReactBrowserEventEmitter.ReactEventListener.WINDOW_HANDLE
              );
            }
          } else if (dependency === topLevelTypes.topFocus ||
              dependency === topLevelTypes.topBlur) {
  
            if (isEventSupported('focus', true)) {
              ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(
                topLevelTypes.topFocus,
                'focus',
                mountAt
              );
              ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(
                topLevelTypes.topBlur,
                'blur',
                mountAt
              );
            } else if (isEventSupported('focusin')) {
              // IE has `focusin` and `focusout` events which bubble.
              // @see http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
              ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
                topLevelTypes.topFocus,
                'focusin',
                mountAt
              );
              ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
                topLevelTypes.topBlur,
                'focusout',
                mountAt
              );
            }
  
            // to make sure blur and focus event listeners are only attached once
            isListening[topLevelTypes.topBlur] = true;
            isListening[topLevelTypes.topFocus] = true;
          } else if (topEventMapping.hasOwnProperty(dependency)) {
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
              dependency,
              topEventMapping[dependency],
              mountAt
            );
          }
  
          isListening[dependency] = true;
        }
      }
    },
  
    trapBubbledEvent: function(topLevelType, handlerBaseName, handle) {
      return ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
        topLevelType,
        handlerBaseName,
        handle
      );
    },
  
    trapCapturedEvent: function(topLevelType, handlerBaseName, handle) {
      return ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(
        topLevelType,
        handlerBaseName,
        handle
      );
    },
  
    /**
     * Listens to window scroll and resize events. We cache scroll values so that
     * application code can access them without triggering reflows.
     *
     * NOTE: Scroll events do not bubble.
     *
     * @see http://www.quirksmode.org/dom/events/scroll.html
     */
    ensureScrollValueMonitoring: function() {
      if (!isMonitoringScrollValue) {
        var refresh = ViewportMetrics.refreshScrollValues;
        ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);
        isMonitoringScrollValue = true;
      }
    },
  
    eventNameDispatchConfigs: EventPluginHub.eventNameDispatchConfigs,
  
    registrationNameModules: EventPluginHub.registrationNameModules,
  
    putListener: EventPluginHub.putListener,
  
    getListener: EventPluginHub.getListener,
  
    deleteListener: EventPluginHub.deleteListener,
  
    deleteAllListeners: EventPluginHub.deleteAllListeners
  
  });
  
  module.exports = ReactBrowserEventEmitter;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactInstanceHandles
   * @typechecks static-only
   */
  
  'use strict';
  
  var ReactRootIndex = __webpack_require__(114);
  
  var invariant = __webpack_require__(2);
  
  var SEPARATOR = '.';
  var SEPARATOR_LENGTH = SEPARATOR.length;
  
  /**
   * Maximum depth of traversals before we consider the possibility of a bad ID.
   */
  var MAX_TREE_DEPTH = 100;
  
  /**
   * Creates a DOM ID prefix to use when mounting React components.
   *
   * @param {number} index A unique integer
   * @return {string} React root ID.
   * @internal
   */
  function getReactRootIDString(index) {
    return SEPARATOR + index.toString(36);
  }
  
  /**
   * Checks if a character in the supplied ID is a separator or the end.
   *
   * @param {string} id A React DOM ID.
   * @param {number} index Index of the character to check.
   * @return {boolean} True if the character is a separator or end of the ID.
   * @private
   */
  function isBoundary(id, index) {
    return id.charAt(index) === SEPARATOR || index === id.length;
  }
  
  /**
   * Checks if the supplied string is a valid React DOM ID.
   *
   * @param {string} id A React DOM ID, maybe.
   * @return {boolean} True if the string is a valid React DOM ID.
   * @private
   */
  function isValidID(id) {
    return id === '' || (
      id.charAt(0) === SEPARATOR && id.charAt(id.length - 1) !== SEPARATOR
    );
  }
  
  /**
   * Checks if the first ID is an ancestor of or equal to the second ID.
   *
   * @param {string} ancestorID
   * @param {string} descendantID
   * @return {boolean} True if `ancestorID` is an ancestor of `descendantID`.
   * @internal
   */
  function isAncestorIDOf(ancestorID, descendantID) {
    return (
      descendantID.indexOf(ancestorID) === 0 &&
      isBoundary(descendantID, ancestorID.length)
    );
  }
  
  /**
   * Gets the parent ID of the supplied React DOM ID, `id`.
   *
   * @param {string} id ID of a component.
   * @return {string} ID of the parent, or an empty string.
   * @private
   */
  function getParentID(id) {
    return id ? id.substr(0, id.lastIndexOf(SEPARATOR)) : '';
  }
  
  /**
   * Gets the next DOM ID on the tree path from the supplied `ancestorID` to the
   * supplied `destinationID`. If they are equal, the ID is returned.
   *
   * @param {string} ancestorID ID of an ancestor node of `destinationID`.
   * @param {string} destinationID ID of the destination node.
   * @return {string} Next ID on the path from `ancestorID` to `destinationID`.
   * @private
   */
  function getNextDescendantID(ancestorID, destinationID) {
    (true ? invariant(
      isValidID(ancestorID) && isValidID(destinationID),
      'getNextDescendantID(%s, %s): Received an invalid React DOM ID.',
      ancestorID,
      destinationID
    ) : invariant(isValidID(ancestorID) && isValidID(destinationID)));
    (true ? invariant(
      isAncestorIDOf(ancestorID, destinationID),
      'getNextDescendantID(...): React has made an invalid assumption about ' +
      'the DOM hierarchy. Expected `%s` to be an ancestor of `%s`.',
      ancestorID,
      destinationID
    ) : invariant(isAncestorIDOf(ancestorID, destinationID)));
    if (ancestorID === destinationID) {
      return ancestorID;
    }
    // Skip over the ancestor and the immediate separator. Traverse until we hit
    // another separator or we reach the end of `destinationID`.
    var start = ancestorID.length + SEPARATOR_LENGTH;
    var i;
    for (i = start; i < destinationID.length; i++) {
      if (isBoundary(destinationID, i)) {
        break;
      }
    }
    return destinationID.substr(0, i);
  }
  
  /**
   * Gets the nearest common ancestor ID of two IDs.
   *
   * Using this ID scheme, the nearest common ancestor ID is the longest common
   * prefix of the two IDs that immediately preceded a "marker" in both strings.
   *
   * @param {string} oneID
   * @param {string} twoID
   * @return {string} Nearest common ancestor ID, or the empty string if none.
   * @private
   */
  function getFirstCommonAncestorID(oneID, twoID) {
    var minLength = Math.min(oneID.length, twoID.length);
    if (minLength === 0) {
      return '';
    }
    var lastCommonMarkerIndex = 0;
    // Use `<=` to traverse until the "EOL" of the shorter string.
    for (var i = 0; i <= minLength; i++) {
      if (isBoundary(oneID, i) && isBoundary(twoID, i)) {
        lastCommonMarkerIndex = i;
      } else if (oneID.charAt(i) !== twoID.charAt(i)) {
        break;
      }
    }
    var longestCommonID = oneID.substr(0, lastCommonMarkerIndex);
    (true ? invariant(
      isValidID(longestCommonID),
      'getFirstCommonAncestorID(%s, %s): Expected a valid React DOM ID: %s',
      oneID,
      twoID,
      longestCommonID
    ) : invariant(isValidID(longestCommonID)));
    return longestCommonID;
  }
  
  /**
   * Traverses the parent path between two IDs (either up or down). The IDs must
   * not be the same, and there must exist a parent path between them. If the
   * callback returns `false`, traversal is stopped.
   *
   * @param {?string} start ID at which to start traversal.
   * @param {?string} stop ID at which to end traversal.
   * @param {function} cb Callback to invoke each ID with.
   * @param {?boolean} skipFirst Whether or not to skip the first node.
   * @param {?boolean} skipLast Whether or not to skip the last node.
   * @private
   */
  function traverseParentPath(start, stop, cb, arg, skipFirst, skipLast) {
    start = start || '';
    stop = stop || '';
    (true ? invariant(
      start !== stop,
      'traverseParentPath(...): Cannot traverse from and to the same ID, `%s`.',
      start
    ) : invariant(start !== stop));
    var traverseUp = isAncestorIDOf(stop, start);
    (true ? invariant(
      traverseUp || isAncestorIDOf(start, stop),
      'traverseParentPath(%s, %s, ...): Cannot traverse from two IDs that do ' +
      'not have a parent path.',
      start,
      stop
    ) : invariant(traverseUp || isAncestorIDOf(start, stop)));
    // Traverse from `start` to `stop` one depth at a time.
    var depth = 0;
    var traverse = traverseUp ? getParentID : getNextDescendantID;
    for (var id = start; /* until break */; id = traverse(id, stop)) {
      var ret;
      if ((!skipFirst || id !== start) && (!skipLast || id !== stop)) {
        ret = cb(id, traverseUp, arg);
      }
      if (ret === false || id === stop) {
        // Only break //after// visiting `stop`.
        break;
      }
      (true ? invariant(
        depth++ < MAX_TREE_DEPTH,
        'traverseParentPath(%s, %s, ...): Detected an infinite loop while ' +
        'traversing the React DOM ID tree. This may be due to malformed IDs: %s',
        start, stop
      ) : invariant(depth++ < MAX_TREE_DEPTH));
    }
  }
  
  /**
   * Manages the IDs assigned to DOM representations of React components. This
   * uses a specific scheme in order to traverse the DOM efficiently (e.g. in
   * order to simulate events).
   *
   * @internal
   */
  var ReactInstanceHandles = {
  
    /**
     * Constructs a React root ID
     * @return {string} A React root ID.
     */
    createReactRootID: function() {
      return getReactRootIDString(ReactRootIndex.createReactRootIndex());
    },
  
    /**
     * Constructs a React ID by joining a root ID with a name.
     *
     * @param {string} rootID Root ID of a parent component.
     * @param {string} name A component's name (as flattened children).
     * @return {string} A React ID.
     * @internal
     */
    createReactID: function(rootID, name) {
      return rootID + name;
    },
  
    /**
     * Gets the DOM ID of the React component that is the root of the tree that
     * contains the React component with the supplied DOM ID.
     *
     * @param {string} id DOM ID of a React component.
     * @return {?string} DOM ID of the React component that is the root.
     * @internal
     */
    getReactRootIDFromNodeID: function(id) {
      if (id && id.charAt(0) === SEPARATOR && id.length > 1) {
        var index = id.indexOf(SEPARATOR, 1);
        return index > -1 ? id.substr(0, index) : id;
      }
      return null;
    },
  
    /**
     * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
     * should would receive a `mouseEnter` or `mouseLeave` event.
     *
     * NOTE: Does not invoke the callback on the nearest common ancestor because
     * nothing "entered" or "left" that element.
     *
     * @param {string} leaveID ID being left.
     * @param {string} enterID ID being entered.
     * @param {function} cb Callback to invoke on each entered/left ID.
     * @param {*} upArg Argument to invoke the callback with on left IDs.
     * @param {*} downArg Argument to invoke the callback with on entered IDs.
     * @internal
     */
    traverseEnterLeave: function(leaveID, enterID, cb, upArg, downArg) {
      var ancestorID = getFirstCommonAncestorID(leaveID, enterID);
      if (ancestorID !== leaveID) {
        traverseParentPath(leaveID, ancestorID, cb, upArg, false, true);
      }
      if (ancestorID !== enterID) {
        traverseParentPath(ancestorID, enterID, cb, downArg, true, false);
      }
    },
  
    /**
     * Simulates the traversal of a two-phase, capture/bubble event dispatch.
     *
     * NOTE: This traversal happens on IDs without touching the DOM.
     *
     * @param {string} targetID ID of the target node.
     * @param {function} cb Callback to invoke.
     * @param {*} arg Argument to invoke the callback with.
     * @internal
     */
    traverseTwoPhase: function(targetID, cb, arg) {
      if (targetID) {
        traverseParentPath('', targetID, cb, arg, true, false);
        traverseParentPath(targetID, '', cb, arg, false, true);
      }
    },
  
    /**
     * Traverse a node ID, calling the supplied `cb` for each ancestor ID. For
     * example, passing `.0.$row-0.1` would result in `cb` getting called
     * with `.0`, `.0.$row-0`, and `.0.$row-0.1`.
     *
     * NOTE: This traversal happens on IDs without touching the DOM.
     *
     * @param {string} targetID ID of the target node.
     * @param {function} cb Callback to invoke.
     * @param {*} arg Argument to invoke the callback with.
     * @internal
     */
    traverseAncestors: function(targetID, cb, arg) {
      traverseParentPath('', targetID, cb, arg, true, false);
    },
  
    /**
     * Exposed for unit testing.
     * @private
     */
    _getFirstCommonAncestorID: getFirstCommonAncestorID,
  
    /**
     * Exposed for unit testing.
     * @private
     */
    _getNextDescendantID: getNextDescendantID,
  
    isAncestorIDOf: isAncestorIDOf,
  
    SEPARATOR: SEPARATOR
  
  };
  
  module.exports = ReactInstanceHandles;


/***/ },
/* 34 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactInstanceMap
   */
  
  'use strict';
  
  /**
   * `ReactInstanceMap` maintains a mapping from a public facing stateful
   * instance (key) and the internal representation (value). This allows public
   * methods to accept the user facing instance as an argument and map them back
   * to internal methods.
   */
  
  // TODO: Replace this with ES6: var ReactInstanceMap = new Map();
  var ReactInstanceMap = {
  
    /**
     * This API should be called `delete` but we'd have to make sure to always
     * transform these to strings for IE support. When this transform is fully
     * supported we can rename it.
     */
    remove: function(key) {
      key._reactInternalInstance = undefined;
    },
  
    get: function(key) {
      return key._reactInternalInstance;
    },
  
    has: function(key) {
      return key._reactInternalInstance !== undefined;
    },
  
    set: function(key, value) {
      key._reactInternalInstance = value;
    }
  
  };
  
  module.exports = ReactInstanceMap;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactReconciler
   */
  
  'use strict';
  
  var ReactRef = __webpack_require__(248);
  var ReactElementValidator = __webpack_require__(41);
  
  /**
   * Helper to call ReactRef.attachRefs with this composite component, split out
   * to avoid allocations in the transaction mount-ready queue.
   */
  function attachRefs() {
    ReactRef.attachRefs(this, this._currentElement);
  }
  
  var ReactReconciler = {
  
    /**
     * Initializes the component, renders markup, and registers event listeners.
     *
     * @param {ReactComponent} internalInstance
     * @param {string} rootID DOM ID of the root node.
     * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
     * @return {?string} Rendered markup to be inserted into the DOM.
     * @final
     * @internal
     */
    mountComponent: function(internalInstance, rootID, transaction, context) {
      var markup = internalInstance.mountComponent(rootID, transaction, context);
      if (true) {
        ReactElementValidator.checkAndWarnForMutatedProps(
          internalInstance._currentElement
        );
      }
      transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
      return markup;
    },
  
    /**
     * Releases any resources allocated by `mountComponent`.
     *
     * @final
     * @internal
     */
    unmountComponent: function(internalInstance) {
      ReactRef.detachRefs(internalInstance, internalInstance._currentElement);
      internalInstance.unmountComponent();
    },
  
    /**
     * Update a component using a new element.
     *
     * @param {ReactComponent} internalInstance
     * @param {ReactElement} nextElement
     * @param {ReactReconcileTransaction} transaction
     * @param {object} context
     * @internal
     */
    receiveComponent: function(
      internalInstance, nextElement, transaction, context
    ) {
      var prevElement = internalInstance._currentElement;
  
      if (nextElement === prevElement && nextElement._owner != null) {
        // Since elements are immutable after the owner is rendered,
        // we can do a cheap identity compare here to determine if this is a
        // superfluous reconcile. It's possible for state to be mutable but such
        // change should trigger an update of the owner which would recreate
        // the element. We explicitly check for the existence of an owner since
        // it's possible for an element created outside a composite to be
        // deeply mutated and reused.
        return;
      }
  
      if (true) {
        ReactElementValidator.checkAndWarnForMutatedProps(nextElement);
      }
  
      var refsChanged = ReactRef.shouldUpdateRefs(
        prevElement,
        nextElement
      );
  
      if (refsChanged) {
        ReactRef.detachRefs(internalInstance, prevElement);
      }
  
      internalInstance.receiveComponent(nextElement, transaction, context);
  
      if (refsChanged) {
        transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
      }
    },
  
    /**
     * Flush any dirty changes in a component.
     *
     * @param {ReactComponent} internalInstance
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */
    performUpdateIfNecessary: function(
      internalInstance,
      transaction
    ) {
      internalInstance.performUpdateIfNecessary(transaction);
    }
  
  };
  
  module.exports = ReactReconciler;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule keyMirror
   * @typechecks static-only
   */
  
  'use strict';
  
  var invariant = __webpack_require__(2);
  
  /**
   * Constructs an enumeration with keys equal to their value.
   *
   * For example:
   *
   *   var COLORS = keyMirror({blue: null, red: null});
   *   var myColor = COLORS.blue;
   *   var isColorValid = !!COLORS[myColor];
   *
   * The last line could not be performed if the values of the generated enum were
   * not equal to their keys.
   *
   *   Input:  {key1: val1, key2: val2}
   *   Output: {key1: key1, key2: key2}
   *
   * @param {object} obj
   * @return {object}
   */
  var keyMirror = function(obj) {
    var ret = {};
    var key;
    (true ? invariant(
      obj instanceof Object && !Array.isArray(obj),
      'keyMirror(...): Argument must be an object.'
    ) : invariant(obj instanceof Object && !Array.isArray(obj)));
    for (key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }
      ret[key] = key;
    }
    return ret;
  };
  
  module.exports = keyMirror;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  var ctx  = __webpack_require__(26)
    , get  = __webpack_require__(20).get
    , call = __webpack_require__(95);
  module.exports = function(iterable, entries, fn, that){
    var iterator = get(iterable)
      , f        = ctx(fn, that, entries ? 2 : 1)
      , step;
    while(!(step = iterator.next()).done){
      if(call(iterator, f, step.value, entries) === false){
        return call.close(iterator);
      }
    }
  };

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule DOMPropertyOperations
   * @typechecks static-only
   */
  
  'use strict';
  
  var DOMProperty = __webpack_require__(29);
  
  var quoteAttributeValueForBrowser = __webpack_require__(283);
  var warning = __webpack_require__(6);
  
  function shouldIgnoreValue(name, value) {
    return value == null ||
      (DOMProperty.hasBooleanValue[name] && !value) ||
      (DOMProperty.hasNumericValue[name] && isNaN(value)) ||
      (DOMProperty.hasPositiveNumericValue[name] && (value < 1)) ||
      (DOMProperty.hasOverloadedBooleanValue[name] && value === false);
  }
  
  if (true) {
    var reactProps = {
      children: true,
      dangerouslySetInnerHTML: true,
      key: true,
      ref: true
    };
    var warnedProperties = {};
  
    var warnUnknownProperty = function(name) {
      if (reactProps.hasOwnProperty(name) && reactProps[name] ||
          warnedProperties.hasOwnProperty(name) && warnedProperties[name]) {
        return;
      }
  
      warnedProperties[name] = true;
      var lowerCasedName = name.toLowerCase();
  
      // data-* attributes should be lowercase; suggest the lowercase version
      var standardName = (
        DOMProperty.isCustomAttribute(lowerCasedName) ?
          lowerCasedName :
        DOMProperty.getPossibleStandardName.hasOwnProperty(lowerCasedName) ?
          DOMProperty.getPossibleStandardName[lowerCasedName] :
          null
      );
  
      // For now, only warn when we have a suggested correction. This prevents
      // logging too much when using transferPropsTo.
      (true ? warning(
        standardName == null,
        'Unknown DOM property %s. Did you mean %s?',
        name,
        standardName
      ) : null);
  
    };
  }
  
  /**
   * Operations for dealing with DOM properties.
   */
  var DOMPropertyOperations = {
  
    /**
     * Creates markup for the ID property.
     *
     * @param {string} id Unescaped ID.
     * @return {string} Markup string.
     */
    createMarkupForID: function(id) {
      return DOMProperty.ID_ATTRIBUTE_NAME + '=' +
        quoteAttributeValueForBrowser(id);
    },
  
    /**
     * Creates markup for a property.
     *
     * @param {string} name
     * @param {*} value
     * @return {?string} Markup string, or null if the property was invalid.
     */
    createMarkupForProperty: function(name, value) {
      if (DOMProperty.isStandardName.hasOwnProperty(name) &&
          DOMProperty.isStandardName[name]) {
        if (shouldIgnoreValue(name, value)) {
          return '';
        }
        var attributeName = DOMProperty.getAttributeName[name];
        if (DOMProperty.hasBooleanValue[name] ||
            (DOMProperty.hasOverloadedBooleanValue[name] && value === true)) {
          return attributeName;
        }
        return attributeName + '=' + quoteAttributeValueForBrowser(value);
      } else if (DOMProperty.isCustomAttribute(name)) {
        if (value == null) {
          return '';
        }
        return name + '=' + quoteAttributeValueForBrowser(value);
      } else if (true) {
        warnUnknownProperty(name);
      }
      return null;
    },
  
    /**
     * Sets the value for a property on a node.
     *
     * @param {DOMElement} node
     * @param {string} name
     * @param {*} value
     */
    setValueForProperty: function(node, name, value) {
      if (DOMProperty.isStandardName.hasOwnProperty(name) &&
          DOMProperty.isStandardName[name]) {
        var mutationMethod = DOMProperty.getMutationMethod[name];
        if (mutationMethod) {
          mutationMethod(node, value);
        } else if (shouldIgnoreValue(name, value)) {
          this.deleteValueForProperty(node, name);
        } else if (DOMProperty.mustUseAttribute[name]) {
          // `setAttribute` with objects becomes only `[object]` in IE8/9,
          // ('' + value) makes it output the correct toString()-value.
          node.setAttribute(DOMProperty.getAttributeName[name], '' + value);
        } else {
          var propName = DOMProperty.getPropertyName[name];
          // Must explicitly cast values for HAS_SIDE_EFFECTS-properties to the
          // property type before comparing; only `value` does and is string.
          if (!DOMProperty.hasSideEffects[name] ||
              ('' + node[propName]) !== ('' + value)) {
            // Contrary to `setAttribute`, object properties are properly
            // `toString`ed by IE8/9.
            node[propName] = value;
          }
        }
      } else if (DOMProperty.isCustomAttribute(name)) {
        if (value == null) {
          node.removeAttribute(name);
        } else {
          node.setAttribute(name, '' + value);
        }
      } else if (true) {
        warnUnknownProperty(name);
      }
    },
  
    /**
     * Deletes the value for a property on a node.
     *
     * @param {DOMElement} node
     * @param {string} name
     */
    deleteValueForProperty: function(node, name) {
      if (DOMProperty.isStandardName.hasOwnProperty(name) &&
          DOMProperty.isStandardName[name]) {
        var mutationMethod = DOMProperty.getMutationMethod[name];
        if (mutationMethod) {
          mutationMethod(node, undefined);
        } else if (DOMProperty.mustUseAttribute[name]) {
          node.removeAttribute(DOMProperty.getAttributeName[name]);
        } else {
          var propName = DOMProperty.getPropertyName[name];
          var defaultValue = DOMProperty.getDefaultValueForProperty(
            node.nodeName,
            propName
          );
          if (!DOMProperty.hasSideEffects[name] ||
              ('' + node[propName]) !== defaultValue) {
            node[propName] = defaultValue;
          }
        }
      } else if (DOMProperty.isCustomAttribute(name)) {
        node.removeAttribute(name);
      } else if (true) {
        warnUnknownProperty(name);
      }
    }
  
  };
  
  module.exports = DOMPropertyOperations;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule EventPluginHub
   */
  
  'use strict';
  
  var EventPluginRegistry = __webpack_require__(105);
  var EventPluginUtils = __webpack_require__(68);
  
  var accumulateInto = __webpack_require__(79);
  var forEachAccumulated = __webpack_require__(80);
  var invariant = __webpack_require__(2);
  
  /**
   * Internal store for event listeners
   */
  var listenerBank = {};
  
  /**
   * Internal queue of events that have accumulated their dispatches and are
   * waiting to have their dispatches executed.
   */
  var eventQueue = null;
  
  /**
   * Dispatches an event and releases it back into the pool, unless persistent.
   *
   * @param {?object} event Synthetic event to be dispatched.
   * @private
   */
  var executeDispatchesAndRelease = function(event) {
    if (event) {
      var executeDispatch = EventPluginUtils.executeDispatch;
      // Plugins can provide custom behavior when dispatching events.
      var PluginModule = EventPluginRegistry.getPluginModuleForEvent(event);
      if (PluginModule && PluginModule.executeDispatch) {
        executeDispatch = PluginModule.executeDispatch;
      }
      EventPluginUtils.executeDispatchesInOrder(event, executeDispatch);
  
      if (!event.isPersistent()) {
        event.constructor.release(event);
      }
    }
  };
  
  /**
   * - `InstanceHandle`: [required] Module that performs logical traversals of DOM
   *   hierarchy given ids of the logical DOM elements involved.
   */
  var InstanceHandle = null;
  
  function validateInstanceHandle() {
    var valid =
      InstanceHandle &&
      InstanceHandle.traverseTwoPhase &&
      InstanceHandle.traverseEnterLeave;
    (true ? invariant(
      valid,
      'InstanceHandle not injected before use!'
    ) : invariant(valid));
  }
  
  /**
   * This is a unified interface for event plugins to be installed and configured.
   *
   * Event plugins can implement the following properties:
   *
   *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
   *     Required. When a top-level event is fired, this method is expected to
   *     extract synthetic events that will in turn be queued and dispatched.
   *
   *   `eventTypes` {object}
   *     Optional, plugins that fire events must publish a mapping of registration
   *     names that are used to register listeners. Values of this mapping must
   *     be objects that contain `registrationName` or `phasedRegistrationNames`.
   *
   *   `executeDispatch` {function(object, function, string)}
   *     Optional, allows plugins to override how an event gets dispatched. By
   *     default, the listener is simply invoked.
   *
   * Each plugin that is injected into `EventsPluginHub` is immediately operable.
   *
   * @public
   */
  var EventPluginHub = {
  
    /**
     * Methods for injecting dependencies.
     */
    injection: {
  
      /**
       * @param {object} InjectedMount
       * @public
       */
      injectMount: EventPluginUtils.injection.injectMount,
  
      /**
       * @param {object} InjectedInstanceHandle
       * @public
       */
      injectInstanceHandle: function(InjectedInstanceHandle) {
        InstanceHandle = InjectedInstanceHandle;
        if (true) {
          validateInstanceHandle();
        }
      },
  
      getInstanceHandle: function() {
        if (true) {
          validateInstanceHandle();
        }
        return InstanceHandle;
      },
  
      /**
       * @param {array} InjectedEventPluginOrder
       * @public
       */
      injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,
  
      /**
       * @param {object} injectedNamesToPlugins Map from names to plugin modules.
       */
      injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName
  
    },
  
    eventNameDispatchConfigs: EventPluginRegistry.eventNameDispatchConfigs,
  
    registrationNameModules: EventPluginRegistry.registrationNameModules,
  
    /**
     * Stores `listener` at `listenerBank[registrationName][id]`. Is idempotent.
     *
     * @param {string} id ID of the DOM element.
     * @param {string} registrationName Name of listener (e.g. `onClick`).
     * @param {?function} listener The callback to store.
     */
    putListener: function(id, registrationName, listener) {
      (true ? invariant(
        !listener || typeof listener === 'function',
        'Expected %s listener to be a function, instead got type %s',
        registrationName, typeof listener
      ) : invariant(!listener || typeof listener === 'function'));
  
      var bankForRegistrationName =
        listenerBank[registrationName] || (listenerBank[registrationName] = {});
      bankForRegistrationName[id] = listener;
    },
  
    /**
     * @param {string} id ID of the DOM element.
     * @param {string} registrationName Name of listener (e.g. `onClick`).
     * @return {?function} The stored callback.
     */
    getListener: function(id, registrationName) {
      var bankForRegistrationName = listenerBank[registrationName];
      return bankForRegistrationName && bankForRegistrationName[id];
    },
  
    /**
     * Deletes a listener from the registration bank.
     *
     * @param {string} id ID of the DOM element.
     * @param {string} registrationName Name of listener (e.g. `onClick`).
     */
    deleteListener: function(id, registrationName) {
      var bankForRegistrationName = listenerBank[registrationName];
      if (bankForRegistrationName) {
        delete bankForRegistrationName[id];
      }
    },
  
    /**
     * Deletes all listeners for the DOM element with the supplied ID.
     *
     * @param {string} id ID of the DOM element.
     */
    deleteAllListeners: function(id) {
      for (var registrationName in listenerBank) {
        delete listenerBank[registrationName][id];
      }
    },
  
    /**
     * Allows registered plugins an opportunity to extract events from top-level
     * native browser events.
     *
     * @param {string} topLevelType Record from `EventConstants`.
     * @param {DOMEventTarget} topLevelTarget The listening component root node.
     * @param {string} topLevelTargetID ID of `topLevelTarget`.
     * @param {object} nativeEvent Native browser event.
     * @return {*} An accumulation of synthetic events.
     * @internal
     */
    extractEvents: function(
        topLevelType,
        topLevelTarget,
        topLevelTargetID,
        nativeEvent) {
      var events;
      var plugins = EventPluginRegistry.plugins;
      for (var i = 0, l = plugins.length; i < l; i++) {
        // Not every plugin in the ordering may be loaded at runtime.
        var possiblePlugin = plugins[i];
        if (possiblePlugin) {
          var extractedEvents = possiblePlugin.extractEvents(
            topLevelType,
            topLevelTarget,
            topLevelTargetID,
            nativeEvent
          );
          if (extractedEvents) {
            events = accumulateInto(events, extractedEvents);
          }
        }
      }
      return events;
    },
  
    /**
     * Enqueues a synthetic event that should be dispatched when
     * `processEventQueue` is invoked.
     *
     * @param {*} events An accumulation of synthetic events.
     * @internal
     */
    enqueueEvents: function(events) {
      if (events) {
        eventQueue = accumulateInto(eventQueue, events);
      }
    },
  
    /**
     * Dispatches all synthetic events on the event queue.
     *
     * @internal
     */
    processEventQueue: function() {
      // Set `eventQueue` to null before processing it so that we can tell if more
      // events get enqueued while processing.
      var processingEventQueue = eventQueue;
      eventQueue = null;
      forEachAccumulated(processingEventQueue, executeDispatchesAndRelease);
      (true ? invariant(
        !eventQueue,
        'processEventQueue(): Additional events were enqueued while processing ' +
        'an event queue. Support for this has not yet been implemented.'
      ) : invariant(!eventQueue));
    },
  
    /**
     * These are needed for tests only. Do not use!
     */
    __purge: function() {
      listenerBank = {};
    },
  
    __getListenerBank: function() {
      return listenerBank;
    }
  
  };
  
  module.exports = EventPluginHub;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule EventPropagators
   */
  
  'use strict';
  
  var EventConstants = __webpack_require__(12);
  var EventPluginHub = __webpack_require__(39);
  
  var accumulateInto = __webpack_require__(79);
  var forEachAccumulated = __webpack_require__(80);
  
  var PropagationPhases = EventConstants.PropagationPhases;
  var getListener = EventPluginHub.getListener;
  
  /**
   * Some event types have a notion of different registration names for different
   * "phases" of propagation. This finds listeners by a given phase.
   */
  function listenerAtPhase(id, event, propagationPhase) {
    var registrationName =
      event.dispatchConfig.phasedRegistrationNames[propagationPhase];
    return getListener(id, registrationName);
  }
  
  /**
   * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
   * here, allows us to not have to bind or create functions for each event.
   * Mutating the event's members allows us to not have to create a wrapping
   * "dispatch" object that pairs the event with the listener.
   */
  function accumulateDirectionalDispatches(domID, upwards, event) {
    if (true) {
      if (!domID) {
        throw new Error('Dispatching id must not be null');
      }
    }
    var phase = upwards ? PropagationPhases.bubbled : PropagationPhases.captured;
    var listener = listenerAtPhase(domID, event, phase);
    if (listener) {
      event._dispatchListeners =
        accumulateInto(event._dispatchListeners, listener);
      event._dispatchIDs = accumulateInto(event._dispatchIDs, domID);
    }
  }
  
  /**
   * Collect dispatches (must be entirely collected before dispatching - see unit
   * tests). Lazily allocate the array to conserve memory.  We must loop through
   * each event and perform the traversal for each one. We can not perform a
   * single traversal for the entire collection of events because each event may
   * have a different target.
   */
  function accumulateTwoPhaseDispatchesSingle(event) {
    if (event && event.dispatchConfig.phasedRegistrationNames) {
      EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(
        event.dispatchMarker,
        accumulateDirectionalDispatches,
        event
      );
    }
  }
  
  
  /**
   * Accumulates without regard to direction, does not look for phased
   * registration names. Same as `accumulateDirectDispatchesSingle` but without
   * requiring that the `dispatchMarker` be the same as the dispatched ID.
   */
  function accumulateDispatches(id, ignoredDirection, event) {
    if (event && event.dispatchConfig.registrationName) {
      var registrationName = event.dispatchConfig.registrationName;
      var listener = getListener(id, registrationName);
      if (listener) {
        event._dispatchListeners =
          accumulateInto(event._dispatchListeners, listener);
        event._dispatchIDs = accumulateInto(event._dispatchIDs, id);
      }
    }
  }
  
  /**
   * Accumulates dispatches on an `SyntheticEvent`, but only for the
   * `dispatchMarker`.
   * @param {SyntheticEvent} event
   */
  function accumulateDirectDispatchesSingle(event) {
    if (event && event.dispatchConfig.registrationName) {
      accumulateDispatches(event.dispatchMarker, null, event);
    }
  }
  
  function accumulateTwoPhaseDispatches(events) {
    forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
  }
  
  function accumulateEnterLeaveDispatches(leave, enter, fromID, toID) {
    EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(
      fromID,
      toID,
      accumulateDispatches,
      leave,
      enter
    );
  }
  
  
  function accumulateDirectDispatches(events) {
    forEachAccumulated(events, accumulateDirectDispatchesSingle);
  }
  
  
  
  /**
   * A small set of propagation patterns, each of which will accept a small amount
   * of information, and generate a set of "dispatch ready event objects" - which
   * are sets of events that have already been annotated with a set of dispatched
   * listener functions/ids. The API is designed this way to discourage these
   * propagation strategies from actually executing the dispatches, since we
   * always want to collect the entire set of dispatches before executing event a
   * single one.
   *
   * @constructor EventPropagators
   */
  var EventPropagators = {
    accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
    accumulateDirectDispatches: accumulateDirectDispatches,
    accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
  };
  
  module.exports = EventPropagators;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactElementValidator
   */
  
  /**
   * ReactElementValidator provides a wrapper around a element factory
   * which validates the props passed to the element. This is intended to be
   * used only in DEV and could be replaced by a static type checker for languages
   * that support it.
   */
  
  'use strict';
  
  var ReactElement = __webpack_require__(5);
  var ReactFragment = __webpack_require__(49);
  var ReactPropTypeLocations = __webpack_require__(77);
  var ReactPropTypeLocationNames = __webpack_require__(51);
  var ReactCurrentOwner = __webpack_require__(24);
  var ReactNativeComponent = __webpack_require__(50);
  
  var getIteratorFn = __webpack_require__(120);
  var invariant = __webpack_require__(2);
  var warning = __webpack_require__(6);
  
  function getDeclarationErrorAddendum() {
    if (ReactCurrentOwner.current) {
      var name = ReactCurrentOwner.current.getName();
      if (name) {
        return ' Check the render method of `' + name + '`.';
      }
    }
    return '';
  }
  
  /**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */
  var ownerHasKeyUseWarning = {};
  
  var loggedTypeFailures = {};
  
  var NUMERIC_PROPERTY_REGEX = /^\d+$/;
  
  /**
   * Gets the instance's name for use in warnings.
   *
   * @internal
   * @return {?string} Display name or undefined
   */
  function getName(instance) {
    var publicInstance = instance && instance.getPublicInstance();
    if (!publicInstance) {
      return undefined;
    }
    var constructor = publicInstance.constructor;
    if (!constructor) {
      return undefined;
    }
    return constructor.displayName || constructor.name || undefined;
  }
  
  /**
   * Gets the current owner's displayName for use in warnings.
   *
   * @internal
   * @return {?string} Display name or undefined
   */
  function getCurrentOwnerDisplayName() {
    var current = ReactCurrentOwner.current;
    return (
      current && getName(current) || undefined
    );
  }
  
  /**
   * Warn if the element doesn't have an explicit key assigned to it.
   * This element is in an array. The array could grow and shrink or be
   * reordered. All children that haven't already been validated are required to
   * have a "key" property assigned to it.
   *
   * @internal
   * @param {ReactElement} element Element that requires a key.
   * @param {*} parentType element's parent's type.
   */
  function validateExplicitKey(element, parentType) {
    if (element._store.validated || element.key != null) {
      return;
    }
    element._store.validated = true;
  
    warnAndMonitorForKeyUse(
      'Each child in an array or iterator should have a unique "key" prop.',
      element,
      parentType
    );
  }
  
  /**
   * Warn if the key is being defined as an object property but has an incorrect
   * value.
   *
   * @internal
   * @param {string} name Property name of the key.
   * @param {ReactElement} element Component that requires a key.
   * @param {*} parentType element's parent's type.
   */
  function validatePropertyKey(name, element, parentType) {
    if (!NUMERIC_PROPERTY_REGEX.test(name)) {
      return;
    }
    warnAndMonitorForKeyUse(
      'Child objects should have non-numeric keys so ordering is preserved.',
      element,
      parentType
    );
  }
  
  /**
   * Shared warning and monitoring code for the key warnings.
   *
   * @internal
   * @param {string} message The base warning that gets output.
   * @param {ReactElement} element Component that requires a key.
   * @param {*} parentType element's parent's type.
   */
  function warnAndMonitorForKeyUse(message, element, parentType) {
    var ownerName = getCurrentOwnerDisplayName();
    var parentName = typeof parentType === 'string' ?
      parentType : parentType.displayName || parentType.name;
  
    var useName = ownerName || parentName;
    var memoizer = ownerHasKeyUseWarning[message] || (
      (ownerHasKeyUseWarning[message] = {})
    );
    if (memoizer.hasOwnProperty(useName)) {
      return;
    }
    memoizer[useName] = true;
  
    var parentOrOwnerAddendum =
      ownerName ? (" Check the render method of " + ownerName + ".") :
      parentName ? (" Check the React.render call using <" + parentName + ">.") :
      '';
  
    // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.
    var childOwnerAddendum = '';
    if (element &&
        element._owner &&
        element._owner !== ReactCurrentOwner.current) {
      // Name of the component that originally created this child.
      var childOwnerName = getName(element._owner);
  
      childOwnerAddendum = (" It was passed a child from " + childOwnerName + ".");
    }
  
    (true ? warning(
      false,
      message + '%s%s See https://fb.me/react-warning-keys for more information.',
      parentOrOwnerAddendum,
      childOwnerAddendum
    ) : null);
  }
  
  /**
   * Ensure that every element either is passed in a static location, in an
   * array with an explicit keys property defined, or in an object literal
   * with valid key property.
   *
   * @internal
   * @param {ReactNode} node Statically passed child of any type.
   * @param {*} parentType node's parent's type.
   */
  function validateChildKeys(node, parentType) {
    if (Array.isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];
        if (ReactElement.isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (ReactElement.isValidElement(node)) {
      // This element was passed in a valid location.
      node._store.validated = true;
    } else if (node) {
      var iteratorFn = getIteratorFn(node);
      // Entry iterators provide implicit keys.
      if (iteratorFn) {
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;
          while (!(step = iterator.next()).done) {
            if (ReactElement.isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      } else if (typeof node === 'object') {
        var fragment = ReactFragment.extractIfFragment(node);
        for (var key in fragment) {
          if (fragment.hasOwnProperty(key)) {
            validatePropertyKey(key, fragment[key], parentType);
          }
        }
      }
    }
  }
  
  /**
   * Assert that the props are valid
   *
   * @param {string} componentName Name of the component for error messages.
   * @param {object} propTypes Map of prop name to a ReactPropType
   * @param {object} props
   * @param {string} location e.g. "prop", "context", "child context"
   * @private
   */
  function checkPropTypes(componentName, propTypes, props, location) {
    for (var propName in propTypes) {
      if (propTypes.hasOwnProperty(propName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          (true ? invariant(
            typeof propTypes[propName] === 'function',
            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
            'React.PropTypes.',
            componentName || 'React class',
            ReactPropTypeLocationNames[location],
            propName
          ) : invariant(typeof propTypes[propName] === 'function'));
          error = propTypes[propName](props, propName, componentName, location);
        } catch (ex) {
          error = ex;
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;
  
          var addendum = getDeclarationErrorAddendum(this);
          (true ? warning(false, 'Failed propType: %s%s', error.message, addendum) : null);
        }
      }
    }
  }
  
  var warnedPropsMutations = {};
  
  /**
   * Warn about mutating props when setting `propName` on `element`.
   *
   * @param {string} propName The string key within props that was set
   * @param {ReactElement} element
   */
  function warnForPropsMutation(propName, element) {
    var type = element.type;
    var elementName = typeof type === 'string' ? type : type.displayName;
    var ownerName = element._owner ?
      element._owner.getPublicInstance().constructor.displayName : null;
  
    var warningKey = propName + '|' + elementName + '|' + ownerName;
    if (warnedPropsMutations.hasOwnProperty(warningKey)) {
      return;
    }
    warnedPropsMutations[warningKey] = true;
  
    var elementInfo = '';
    if (elementName) {
      elementInfo = ' <' + elementName + ' />';
    }
    var ownerInfo = '';
    if (ownerName) {
      ownerInfo = ' The element was created by ' + ownerName + '.';
    }
  
    (true ? warning(
      false,
      'Don\'t set .props.%s of the React component%s. Instead, specify the ' +
      'correct value when initially creating the element or use ' +
      'React.cloneElement to make a new element with updated props.%s',
      propName,
      elementInfo,
      ownerInfo
    ) : null);
  }
  
  // Inline Object.is polyfill
  function is(a, b) {
    if (a !== a) {
      // NaN
      return b !== b;
    }
    if (a === 0 && b === 0) {
      // +-0
      return 1 / a === 1 / b;
    }
    return a === b;
  }
  
  /**
   * Given an element, check if its props have been mutated since element
   * creation (or the last call to this function). In particular, check if any
   * new props have been added, which we can't directly catch by defining warning
   * properties on the props object.
   *
   * @param {ReactElement} element
   */
  function checkAndWarnForMutatedProps(element) {
    if (!element._store) {
      // Element was created using `new ReactElement` directly or with
      // `ReactElement.createElement`; skip mutation checking
      return;
    }
  
    var originalProps = element._store.originalProps;
    var props = element.props;
  
    for (var propName in props) {
      if (props.hasOwnProperty(propName)) {
        if (!originalProps.hasOwnProperty(propName) ||
            !is(originalProps[propName], props[propName])) {
          warnForPropsMutation(propName, element);
  
          // Copy over the new value so that the two props objects match again
          originalProps[propName] = props[propName];
        }
      }
    }
  }
  
  /**
   * Given an element, validate that its props follow the propTypes definition,
   * provided by the type.
   *
   * @param {ReactElement} element
   */
  function validatePropTypes(element) {
    if (element.type == null) {
      // This has already warned. Don't throw.
      return;
    }
    // Extract the component class from the element. Converts string types
    // to a composite class which may have propTypes.
    // TODO: Validating a string's propTypes is not decoupled from the
    // rendering target which is problematic.
    var componentClass = ReactNativeComponent.getComponentClassForElement(
      element
    );
    var name = componentClass.displayName || componentClass.name;
    if (componentClass.propTypes) {
      checkPropTypes(
        name,
        componentClass.propTypes,
        element.props,
        ReactPropTypeLocations.prop
      );
    }
    if (typeof componentClass.getDefaultProps === 'function') {
      (true ? warning(
        componentClass.getDefaultProps.isReactClassApproved,
        'getDefaultProps is only used on classic React.createClass ' +
        'definitions. Use a static property named `defaultProps` instead.'
      ) : null);
    }
  }
  
  var ReactElementValidator = {
  
    checkAndWarnForMutatedProps: checkAndWarnForMutatedProps,
  
    createElement: function(type, props, children) {
      // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.
      (true ? warning(
        type != null,
        'React.createElement: type should not be null or undefined. It should ' +
          'be a string (for DOM elements) or a ReactClass (for composite ' +
          'components).'
      ) : null);
  
      var element = ReactElement.createElement.apply(this, arguments);
  
      // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.
      if (element == null) {
        return element;
      }
  
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
  
      validatePropTypes(element);
  
      return element;
    },
  
    createFactory: function(type) {
      var validatedFactory = ReactElementValidator.createElement.bind(
        null,
        type
      );
      // Legacy hook TODO: Warn if this is accessed
      validatedFactory.type = type;
  
      if (true) {
        try {
          Object.defineProperty(
            validatedFactory,
            'type',
            {
              enumerable: false,
              get: function() {
                (true ? warning(
                  false,
                  'Factory.type is deprecated. Access the class directly ' +
                  'before passing it to createFactory.'
                ) : null);
                Object.defineProperty(this, 'type', {
                  value: type
                });
                return type;
              }
            }
          );
        } catch (x) {
          // IE will fail on defineProperty (es5-shim/sham too)
        }
      }
  
  
      return validatedFactory;
    },
  
    cloneElement: function(element, props, children) {
      var newElement = ReactElement.cloneElement.apply(this, arguments);
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], newElement.type);
      }
      validatePropTypes(newElement);
      return newElement;
    }
  
  };
  
  module.exports = ReactElementValidator;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule SyntheticUIEvent
   * @typechecks static-only
   */
  
  'use strict';
  
  var SyntheticEvent = __webpack_require__(30);
  
  var getEventTarget = __webpack_require__(83);
  
  /**
   * @interface UIEvent
   * @see http://www.w3.org/TR/DOM-Level-3-Events/
   */
  var UIEventInterface = {
    view: function(event) {
      if (event.view) {
        return event.view;
      }
  
      var target = getEventTarget(event);
      if (target != null && target.window === target) {
        // target is a window object
        return target;
      }
  
      var doc = target.ownerDocument;
      // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
      if (doc) {
        return doc.defaultView || doc.parentWindow;
      } else {
        return window;
      }
    },
    detail: function(event) {
      return event.detail || 0;
    }
  };
  
  /**
   * @param {object} dispatchConfig Configuration used to dispatch this event.
   * @param {string} dispatchMarker Marker identifying the event target.
   * @param {object} nativeEvent Native browser event.
   * @extends {SyntheticEvent}
   */
  function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  
  SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);
  
  module.exports = SyntheticUIEvent;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  // 0 -> Array#forEach
  // 1 -> Array#map
  // 2 -> Array#filter
  // 3 -> Array#some
  // 4 -> Array#every
  // 5 -> Array#find
  // 6 -> Array#findIndex
  var $   = __webpack_require__(1)
    , ctx = __webpack_require__(26);
  module.exports = function(TYPE){
    var IS_MAP        = TYPE == 1
      , IS_FILTER     = TYPE == 2
      , IS_SOME       = TYPE == 3
      , IS_EVERY      = TYPE == 4
      , IS_FIND_INDEX = TYPE == 6
      , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
    return function($this, callbackfn, that){
      var O      = Object($.assertDefined($this))
        , self   = $.ES5Object(O)
        , f      = ctx(callbackfn, that, 3)
        , length = $.toLength(self.length)
        , index  = 0
        , result = IS_MAP ? Array(length) : IS_FILTER ? [] : undefined
        , val, res;
      for(;length > index; index++)if(NO_HOLES || index in self){
        val = self[index];
        res = f(val, index, O);
        if(TYPE){
          if(IS_MAP)result[index] = res;            // map
          else if(res)switch(TYPE){
            case 3: return true;                    // some
            case 5: return val;                     // find
            case 6: return index;                   // findIndex
            case 2: result.push(val);               // filter
          } else if(IS_EVERY)return false;          // every
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $     = __webpack_require__(1)
    , $def  = __webpack_require__(3)
    , BUGGY = __webpack_require__(20).BUGGY
    , forOf = __webpack_require__(37)
    , species = __webpack_require__(47)
    , assertInstance = __webpack_require__(9).inst;
  
  module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
    var Base  = $.g[NAME]
      , C     = Base
      , ADDER = IS_MAP ? 'set' : 'add'
      , proto = C && C.prototype
      , O     = {};
    function fixMethod(KEY){
      var fn = proto[KEY];
      __webpack_require__(21)(proto, KEY,
        KEY == 'delete' ? function(a){ return fn.call(this, a === 0 ? 0 : a); }
        : KEY == 'has' ? function has(a){ return fn.call(this, a === 0 ? 0 : a); }
        : KEY == 'get' ? function get(a){ return fn.call(this, a === 0 ? 0 : a); }
        : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
      );
    }
    if(!$.isFunction(C) || !(IS_WEAK || !BUGGY && proto.forEach && proto.entries)){
      // create collection constructor
      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
      __webpack_require__(46)(C.prototype, methods);
    } else {
      var inst  = new C
        , chain = inst[ADDER](IS_WEAK ? {} : -0, 1)
        , buggyZero;
      // wrap for init collections from iterable
      if(!__webpack_require__(57)(function(iter){ new C(iter); })){ // eslint-disable-line no-new
        C = wrapper(function(target, iterable){
          assertInstance(target, C, NAME);
          var that = new Base;
          if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
          return that;
        });
        C.prototype = proto;
        proto.constructor = C;
      }
      IS_WEAK || inst.forEach(function(val, key){
        buggyZero = 1 / key === -Infinity;
      });
      // fix converting -0 key to +0
      if(buggyZero){
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }
      // + fix .add & .set for chaining
      if(buggyZero || chain !== inst)fixMethod(ADDER);
    }
  
    __webpack_require__(10).set(C, NAME);
  
    O[NAME] = C;
    $def($def.G + $def.W + $def.F * (C != Base), O);
    species(C);
    species($.core[NAME]); // for wrapper
  
    if(!IS_WEAK)common.setIter(C, NAME, IS_MAP);
  
    return C;
  };

/***/ },
/* 45 */
/***/ function(module, exports) {

  // Fast apply
  // http://jsperf.lnkit.com/fast-apply/5
  module.exports = function(fn, args, that){
    var un = that === undefined;
    switch(args.length){
      case 0: return un ? fn()
                        : fn.call(that);
      case 1: return un ? fn(args[0])
                        : fn.call(that, args[0]);
      case 2: return un ? fn(args[0], args[1])
                        : fn.call(that, args[0], args[1]);
      case 3: return un ? fn(args[0], args[1], args[2])
                        : fn.call(that, args[0], args[1], args[2]);
      case 4: return un ? fn(args[0], args[1], args[2], args[3])
                        : fn.call(that, args[0], args[1], args[2], args[3]);
      case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
                        : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
    } return              fn.apply(that, args);
  };

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  var $redef = __webpack_require__(21);
  module.exports = function(target, src){
    for(var key in src)$redef(target, key, src[key]);
    return target;
  };

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

  var $       = __webpack_require__(1)
    , SPECIES = __webpack_require__(11)('species');
  module.exports = function(C){
    if($.DESC && !(SPECIES in C))$.setDesc(C, SPECIES, {
      configurable: true,
      get: $.that
    });
  };

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule AutoFocusMixin
   * @typechecks static-only
   */
  
  'use strict';
  
  var focusNode = __webpack_require__(118);
  
  var AutoFocusMixin = {
    componentDidMount: function() {
      if (this.props.autoFocus) {
        focusNode(this.getDOMNode());
      }
    }
  };
  
  module.exports = AutoFocusMixin;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
  * @providesModule ReactFragment
  */
  
  'use strict';
  
  var ReactElement = __webpack_require__(5);
  
  var warning = __webpack_require__(6);
  
  /**
   * We used to allow keyed objects to serve as a collection of ReactElements,
   * or nested sets. This allowed us a way to explicitly key a set a fragment of
   * components. This is now being replaced with an opaque data structure.
   * The upgrade path is to call React.addons.createFragment({ key: value }) to
   * create a keyed fragment. The resulting data structure is opaque, for now.
   */
  
  if (true) {
    var fragmentKey = '_reactFragment';
    var didWarnKey = '_reactDidWarn';
    var canWarnForReactFragment = false;
  
    try {
      // Feature test. Don't even try to issue this warning if we can't use
      // enumerable: false.
  
      var dummy = function() {
        return 1;
      };
  
      Object.defineProperty(
        {},
        fragmentKey,
        {enumerable: false, value: true}
      );
  
      Object.defineProperty(
        {},
        'key',
        {enumerable: true, get: dummy}
      );
  
      canWarnForReactFragment = true;
    } catch (x) { }
  
    var proxyPropertyAccessWithWarning = function(obj, key) {
      Object.defineProperty(obj, key, {
        enumerable: true,
        get: function() {
          (true ? warning(
            this[didWarnKey],
            'A ReactFragment is an opaque type. Accessing any of its ' +
            'properties is deprecated. Pass it to one of the React.Children ' +
            'helpers.'
          ) : null);
          this[didWarnKey] = true;
          return this[fragmentKey][key];
        },
        set: function(value) {
          (true ? warning(
            this[didWarnKey],
            'A ReactFragment is an immutable opaque type. Mutating its ' +
            'properties is deprecated.'
          ) : null);
          this[didWarnKey] = true;
          this[fragmentKey][key] = value;
        }
      });
    };
  
    var issuedWarnings = {};
  
    var didWarnForFragment = function(fragment) {
      // We use the keys and the type of the value as a heuristic to dedupe the
      // warning to avoid spamming too much.
      var fragmentCacheKey = '';
      for (var key in fragment) {
        fragmentCacheKey += key + ':' + (typeof fragment[key]) + ',';
      }
      var alreadyWarnedOnce = !!issuedWarnings[fragmentCacheKey];
      issuedWarnings[fragmentCacheKey] = true;
      return alreadyWarnedOnce;
    };
  }
  
  var ReactFragment = {
    // Wrap a keyed object in an opaque proxy that warns you if you access any
    // of its properties.
    create: function(object) {
      if (true) {
        if (typeof object !== 'object' || !object || Array.isArray(object)) {
          (true ? warning(
            false,
            'React.addons.createFragment only accepts a single object.',
            object
          ) : null);
          return object;
        }
        if (ReactElement.isValidElement(object)) {
          (true ? warning(
            false,
            'React.addons.createFragment does not accept a ReactElement ' +
            'without a wrapper object.'
          ) : null);
          return object;
        }
        if (canWarnForReactFragment) {
          var proxy = {};
          Object.defineProperty(proxy, fragmentKey, {
            enumerable: false,
            value: object
          });
          Object.defineProperty(proxy, didWarnKey, {
            writable: true,
            enumerable: false,
            value: false
          });
          for (var key in object) {
            proxyPropertyAccessWithWarning(proxy, key);
          }
          Object.preventExtensions(proxy);
          return proxy;
        }
      }
      return object;
    },
    // Extract the original keyed object from the fragment opaque type. Warn if
    // a plain object is passed here.
    extract: function(fragment) {
      if (true) {
        if (canWarnForReactFragment) {
          if (!fragment[fragmentKey]) {
            (true ? warning(
              didWarnForFragment(fragment),
              'Any use of a keyed object should be wrapped in ' +
              'React.addons.createFragment(object) before being passed as a ' +
              'child.'
            ) : null);
            return fragment;
          }
          return fragment[fragmentKey];
        }
      }
      return fragment;
    },
    // Check if this is a fragment and if so, extract the keyed object. If it
    // is a fragment-like object, warn that it should be wrapped. Ignore if we
    // can't determine what kind of object this is.
    extractIfFragment: function(fragment) {
      if (true) {
        if (canWarnForReactFragment) {
          // If it is the opaque type, return the keyed object.
          if (fragment[fragmentKey]) {
            return fragment[fragmentKey];
          }
          // Otherwise, check each property if it has an element, if it does
          // it is probably meant as a fragment, so we can warn early. Defer,
          // the warning to extract.
          for (var key in fragment) {
            if (fragment.hasOwnProperty(key) &&
                ReactElement.isValidElement(fragment[key])) {
              // This looks like a fragment object, we should provide an
              // early warning.
              return ReactFragment.extract(fragment);
            }
          }
        }
      }
      return fragment;
    }
  };
  
  module.exports = ReactFragment;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactNativeComponent
   */
  
  'use strict';
  
  var assign = __webpack_require__(4);
  var invariant = __webpack_require__(2);
  
  var autoGenerateWrapperClass = null;
  var genericComponentClass = null;
  // This registry keeps track of wrapper classes around native tags
  var tagToComponentClass = {};
  var textComponentClass = null;
  
  var ReactNativeComponentInjection = {
    // This accepts a class that receives the tag string. This is a catch all
    // that can render any kind of tag.
    injectGenericComponentClass: function(componentClass) {
      genericComponentClass = componentClass;
    },
    // This accepts a text component class that takes the text string to be
    // rendered as props.
    injectTextComponentClass: function(componentClass) {
      textComponentClass = componentClass;
    },
    // This accepts a keyed object with classes as values. Each key represents a
    // tag. That particular tag will use this class instead of the generic one.
    injectComponentClasses: function(componentClasses) {
      assign(tagToComponentClass, componentClasses);
    },
    // Temporary hack since we expect DOM refs to behave like composites,
    // for this release.
    injectAutoWrapper: function(wrapperFactory) {
      autoGenerateWrapperClass = wrapperFactory;
    }
  };
  
  /**
   * Get a composite component wrapper class for a specific tag.
   *
   * @param {ReactElement} element The tag for which to get the class.
   * @return {function} The React class constructor function.
   */
  function getComponentClassForElement(element) {
    if (typeof element.type === 'function') {
      return element.type;
    }
    var tag = element.type;
    var componentClass = tagToComponentClass[tag];
    if (componentClass == null) {
      tagToComponentClass[tag] = componentClass = autoGenerateWrapperClass(tag);
    }
    return componentClass;
  }
  
  /**
   * Get a native internal component class for a specific tag.
   *
   * @param {ReactElement} element The element to create.
   * @return {function} The internal class constructor function.
   */
  function createInternalComponent(element) {
    (true ? invariant(
      genericComponentClass,
      'There is no registered component for the tag %s',
      element.type
    ) : invariant(genericComponentClass));
    return new genericComponentClass(element.type, element.props);
  }
  
  /**
   * @param {ReactText} text
   * @return {ReactComponent}
   */
  function createInstanceForText(text) {
    return new textComponentClass(text);
  }
  
  /**
   * @param {ReactComponent} component
   * @return {boolean}
   */
  function isTextComponent(component) {
    return component instanceof textComponentClass;
  }
  
  var ReactNativeComponent = {
    getComponentClassForElement: getComponentClassForElement,
    createInternalComponent: createInternalComponent,
    createInstanceForText: createInstanceForText,
    isTextComponent: isTextComponent,
    injection: ReactNativeComponentInjection
  };
  
  module.exports = ReactNativeComponent;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactPropTypeLocationNames
   */
  
  'use strict';
  
  var ReactPropTypeLocationNames = {};
  
  if (true) {
    ReactPropTypeLocationNames = {
      prop: 'prop',
      context: 'context',
      childContext: 'child context'
    };
  }
  
  module.exports = ReactPropTypeLocationNames;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule SyntheticMouseEvent
   * @typechecks static-only
   */
  
  'use strict';
  
  var SyntheticUIEvent = __webpack_require__(42);
  var ViewportMetrics = __webpack_require__(115);
  
  var getEventModifierState = __webpack_require__(82);
  
  /**
   * @interface MouseEvent
   * @see http://www.w3.org/TR/DOM-Level-3-Events/
   */
  var MouseEventInterface = {
    screenX: null,
    screenY: null,
    clientX: null,
    clientY: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    getModifierState: getEventModifierState,
    button: function(event) {
      // Webkit, Firefox, IE9+
      // which:  1 2 3
      // button: 0 1 2 (standard)
      var button = event.button;
      if ('which' in event) {
        return button;
      }
      // IE<9
      // which:  undefined
      // button: 0 0 0
      // button: 1 4 2 (onmouseup)
      return button === 2 ? 2 : button === 4 ? 1 : 0;
    },
    buttons: null,
    relatedTarget: function(event) {
      return event.relatedTarget || (
        ((event.fromElement === event.srcElement ? event.toElement : event.fromElement))
      );
    },
    // "Proprietary" Interface.
    pageX: function(event) {
      return 'pageX' in event ?
        event.pageX :
        event.clientX + ViewportMetrics.currentScrollLeft;
    },
    pageY: function(event) {
      return 'pageY' in event ?
        event.pageY :
        event.clientY + ViewportMetrics.currentScrollTop;
    }
  };
  
  /**
   * @param {object} dispatchConfig Configuration used to dispatch this event.
   * @param {string} dispatchMarker Marker identifying the event target.
   * @param {object} nativeEvent Native browser event.
   * @extends {SyntheticUIEvent}
   */
  function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  
  SyntheticUIEvent.augmentClass(SyntheticMouseEvent, MouseEventInterface);
  
  module.exports = SyntheticMouseEvent;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule Transaction
   */
  
  'use strict';
  
  var invariant = __webpack_require__(2);
  
  /**
   * `Transaction` creates a black box that is able to wrap any method such that
   * certain invariants are maintained before and after the method is invoked
   * (Even if an exception is thrown while invoking the wrapped method). Whoever
   * instantiates a transaction can provide enforcers of the invariants at
   * creation time. The `Transaction` class itself will supply one additional
   * automatic invariant for you - the invariant that any transaction instance
   * should not be run while it is already being run. You would typically create a
   * single instance of a `Transaction` for reuse multiple times, that potentially
   * is used to wrap several different methods. Wrappers are extremely simple -
   * they only require implementing two methods.
   *
   * <pre>
   *                       wrappers (injected at creation time)
   *                                      +        +
   *                                      |        |
   *                    +-----------------|--------|--------------+
   *                    |                 v        |              |
   *                    |      +---------------+   |              |
   *                    |   +--|    wrapper1   |---|----+         |
   *                    |   |  +---------------+   v    |         |
   *                    |   |          +-------------+  |         |
   *                    |   |     +----|   wrapper2  |--------+   |
   *                    |   |     |    +-------------+  |     |   |
   *                    |   |     |                     |     |   |
   *                    |   v     v                     v     v   | wrapper
   *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
   * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
   * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
   *                    | |   | |   |   |         |   |   | |   | |
   *                    | |   | |   |   |         |   |   | |   | |
   *                    | |   | |   |   |         |   |   | |   | |
   *                    | +---+ +---+   +---------+   +---+ +---+ |
   *                    |  initialize                    close    |
   *                    +-----------------------------------------+
   * </pre>
   *
   * Use cases:
   * - Preserving the input selection ranges before/after reconciliation.
   *   Restoring selection even in the event of an unexpected error.
   * - Deactivating events while rearranging the DOM, preventing blurs/focuses,
   *   while guaranteeing that afterwards, the event system is reactivated.
   * - Flushing a queue of collected DOM mutations to the main UI thread after a
   *   reconciliation takes place in a worker thread.
   * - Invoking any collected `componentDidUpdate` callbacks after rendering new
   *   content.
   * - (Future use case): Wrapping particular flushes of the `ReactWorker` queue
   *   to preserve the `scrollTop` (an automatic scroll aware DOM).
   * - (Future use case): Layout calculations before and after DOM updates.
   *
   * Transactional plugin API:
   * - A module that has an `initialize` method that returns any precomputation.
   * - and a `close` method that accepts the precomputation. `close` is invoked
   *   when the wrapped process is completed, or has failed.
   *
   * @param {Array<TransactionalWrapper>} transactionWrapper Wrapper modules
   * that implement `initialize` and `close`.
   * @return {Transaction} Single transaction for reuse in thread.
   *
   * @class Transaction
   */
  var Mixin = {
    /**
     * Sets up this instance so that it is prepared for collecting metrics. Does
     * so such that this setup method may be used on an instance that is already
     * initialized, in a way that does not consume additional memory upon reuse.
     * That can be useful if you decide to make your subclass of this mixin a
     * "PooledClass".
     */
    reinitializeTransaction: function() {
      this.transactionWrappers = this.getTransactionWrappers();
      if (!this.wrapperInitData) {
        this.wrapperInitData = [];
      } else {
        this.wrapperInitData.length = 0;
      }
      this._isInTransaction = false;
    },
  
    _isInTransaction: false,
  
    /**
     * @abstract
     * @return {Array<TransactionWrapper>} Array of transaction wrappers.
     */
    getTransactionWrappers: null,
  
    isInTransaction: function() {
      return !!this._isInTransaction;
    },
  
    /**
     * Executes the function within a safety window. Use this for the top level
     * methods that result in large amounts of computation/mutations that would
     * need to be safety checked.
     *
     * @param {function} method Member of scope to call.
     * @param {Object} scope Scope to invoke from.
     * @param {Object?=} args... Arguments to pass to the method (optional).
     *                           Helps prevent need to bind in many cases.
     * @return Return value from `method`.
     */
    perform: function(method, scope, a, b, c, d, e, f) {
      (true ? invariant(
        !this.isInTransaction(),
        'Transaction.perform(...): Cannot initialize a transaction when there ' +
        'is already an outstanding transaction.'
      ) : invariant(!this.isInTransaction()));
      var errorThrown;
      var ret;
      try {
        this._isInTransaction = true;
        // Catching errors makes debugging more difficult, so we start with
        // errorThrown set to true before setting it to false after calling
        // close -- if it's still set to true in the finally block, it means
        // one of these calls threw.
        errorThrown = true;
        this.initializeAll(0);
        ret = method.call(scope, a, b, c, d, e, f);
        errorThrown = false;
      } finally {
        try {
          if (errorThrown) {
            // If `method` throws, prefer to show that stack trace over any thrown
            // by invoking `closeAll`.
            try {
              this.closeAll(0);
            } catch (err) {
            }
          } else {
            // Since `method` didn't throw, we don't want to silence the exception
            // here.
            this.closeAll(0);
          }
        } finally {
          this._isInTransaction = false;
        }
      }
      return ret;
    },
  
    initializeAll: function(startIndex) {
      var transactionWrappers = this.transactionWrappers;
      for (var i = startIndex; i < transactionWrappers.length; i++) {
        var wrapper = transactionWrappers[i];
        try {
          // Catching errors makes debugging more difficult, so we start with the
          // OBSERVED_ERROR state before overwriting it with the real return value
          // of initialize -- if it's still set to OBSERVED_ERROR in the finally
          // block, it means wrapper.initialize threw.
          this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
          this.wrapperInitData[i] = wrapper.initialize ?
            wrapper.initialize.call(this) :
            null;
        } finally {
          if (this.wrapperInitData[i] === Transaction.OBSERVED_ERROR) {
            // The initializer for wrapper i threw an error; initialize the
            // remaining wrappers but silence any exceptions from them to ensure
            // that the first error is the one to bubble up.
            try {
              this.initializeAll(i + 1);
            } catch (err) {
            }
          }
        }
      }
    },
  
    /**
     * Invokes each of `this.transactionWrappers.close[i]` functions, passing into
     * them the respective return values of `this.transactionWrappers.init[i]`
     * (`close`rs that correspond to initializers that failed will not be
     * invoked).
     */
    closeAll: function(startIndex) {
      (true ? invariant(
        this.isInTransaction(),
        'Transaction.closeAll(): Cannot close transaction when none are open.'
      ) : invariant(this.isInTransaction()));
      var transactionWrappers = this.transactionWrappers;
      for (var i = startIndex; i < transactionWrappers.length; i++) {
        var wrapper = transactionWrappers[i];
        var initData = this.wrapperInitData[i];
        var errorThrown;
        try {
          // Catching errors makes debugging more difficult, so we start with
          // errorThrown set to true before setting it to false after calling
          // close -- if it's still set to true in the finally block, it means
          // wrapper.close threw.
          errorThrown = true;
          if (initData !== Transaction.OBSERVED_ERROR && wrapper.close) {
            wrapper.close.call(this, initData);
          }
          errorThrown = false;
        } finally {
          if (errorThrown) {
            // The closer for wrapper i threw an error; close the remaining
            // wrappers but silence any exceptions from them to ensure that the
            // first error is the one to bubble up.
            try {
              this.closeAll(i + 1);
            } catch (e) {
            }
          }
        }
      }
      this.wrapperInitData.length = 0;
    }
  };
  
  var Transaction = {
  
    Mixin: Mixin,
  
    /**
     * Token to look for to determine if an error occured.
     */
    OBSERVED_ERROR: {}
  
  };
  
  module.exports = Transaction;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule emptyObject
   */
  
  "use strict";
  
  var emptyObject = {};
  
  if (true) {
    Object.freeze(emptyObject);
  }
  
  module.exports = emptyObject;


/***/ },
/* 55 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule escapeTextContentForBrowser
   */
  
  'use strict';
  
  var ESCAPE_LOOKUP = {
    '&': '&amp;',
    '>': '&gt;',
    '<': '&lt;',
    '"': '&quot;',
    '\'': '&#x27;'
  };
  
  var ESCAPE_REGEX = /[&><"']/g;
  
  function escaper(match) {
    return ESCAPE_LOOKUP[match];
  }
  
  /**
   * Escapes text to prevent scripting attacks.
   *
   * @param {*} text Text value to escape.
   * @return {string} An escaped string.
   */
  function escapeTextContentForBrowser(text) {
    return ('' + text).replace(ESCAPE_REGEX, escaper);
  }
  
  module.exports = escapeTextContentForBrowser;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  var $def            = __webpack_require__(3)
    , $redef          = __webpack_require__(21)
    , $               = __webpack_require__(1)
    , cof             = __webpack_require__(10)
    , $iter           = __webpack_require__(20)
    , SYMBOL_ITERATOR = __webpack_require__(11)('iterator')
    , FF_ITERATOR     = '@@iterator'
    , KEYS            = 'keys'
    , VALUES          = 'values'
    , Iterators       = $iter.Iterators;
  module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
    $iter.create(Constructor, NAME, next);
    function createMethod(kind){
      function $$(that){
        return new Constructor(that, kind);
      }
      switch(kind){
        case KEYS: return function keys(){ return $$(this); };
        case VALUES: return function values(){ return $$(this); };
      } return function entries(){ return $$(this); };
    }
    var TAG      = NAME + ' Iterator'
      , proto    = Base.prototype
      , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
      , _default = _native || createMethod(DEFAULT)
      , methods, key;
    // Fix native
    if(_native){
      var IteratorPrototype = $.getProto(_default.call(new Base));
      // Set @@toStringTag to native iterators
      cof.set(IteratorPrototype, TAG, true);
      // FF fix
      if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
    }
    // Define iterator
    if($.FW || FORCE)$iter.set(proto, _default);
    // Plug for library
    Iterators[NAME] = _default;
    Iterators[TAG]  = $.that;
    if(DEFAULT){
      methods = {
        keys:    IS_SET            ? _default : createMethod(KEYS),
        values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
        entries: DEFAULT != VALUES ? _default : createMethod('entries')
      };
      if(FORCE)for(key in methods){
        if(!(key in proto))$redef(proto, key, methods[key]);
      } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
    }
  };

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

  var SYMBOL_ITERATOR = __webpack_require__(11)('iterator')
    , SAFE_CLOSING    = false;
  try {
    var riter = [7][SYMBOL_ITERATOR]();
    riter['return'] = function(){ SAFE_CLOSING = true; };
    Array.from(riter, function(){ throw 2; });
  } catch(e){ /* empty */ }
  module.exports = function(exec){
    if(!SAFE_CLOSING)return false;
    var safe = false;
    try {
      var arr  = [7]
        , iter = arr[SYMBOL_ITERATOR]();
      iter.next = function(){ safe = true; };
      arr[SYMBOL_ITERATOR] = function(){ return iter; };
      exec(arr);
    } catch(e){ /* empty */ }
    return safe;
  };

/***/ },
/* 58 */
/***/ function(module, exports) {

  'use strict';
  module.exports = function(regExp, replace, isStatic){
    var replacer = replace === Object(replace) ? function(part){
      return replace[part];
    } : replace;
    return function(it){
      return String(isStatic ? it : this).replace(regExp, replacer);
    };
  };

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */
  var $      = __webpack_require__(1)
    , assert = __webpack_require__(9);
  function check(O, proto){
    assert.obj(O);
    assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
  }
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
      ? function(buggy, set){
          try {
            set = __webpack_require__(26)(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
            set({}, []);
          } catch(e){ buggy = true; }
          return function setPrototypeOf(O, proto){
            check(O, proto);
            if(buggy)O.__proto__ = proto;
            else set(O, proto);
            return O;
          };
        }()
      : undefined),
    check: check
  };

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  var $      = __webpack_require__(1)
    , SHARED = '__core-js_shared__'
    , store  = $.g[SHARED] || ($.g[SHARED] = {});
  module.exports = function(key){
    return store[key] || (store[key] = {});
  };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  // true  -> String#at
  // false -> String#codePointAt
  var $ = __webpack_require__(1);
  module.exports = function(TO_STRING){
    return function(that, pos){
      var s = String($.assertDefined(that))
        , i = $.toInteger(pos)
        , l = s.length
        , a, b;
      if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l
        || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
          ? TO_STRING ? s.charAt(i) : a
          : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };

/***/ },
/* 62 */
/***/ function(module, exports) {

  module.exports = function(exec){
    try {
      exec();
      return false;
    } catch(e){
      return true;
    }
  };

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _superagent = __webpack_require__(298);
  
  var _superagent2 = _interopRequireDefault(_superagent);
  
  var _reactLibExecutionEnvironment = __webpack_require__(7);
  
  var _coreDispatcher = __webpack_require__(65);
  
  var _coreDispatcher2 = _interopRequireDefault(_coreDispatcher);
  
  var _constantsActionTypes = __webpack_require__(64);
  
  var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);
  
  exports['default'] = {
  
    navigateTo: function navigateTo(path, options) {
      this.loadPage(path, function () {
        if (_reactLibExecutionEnvironment.canUseDOM) {
          if (options && options.replace) {
            window.history.replaceState({}, document.title, path);
          } else {
            window.history.pushState({}, document.title, path);
          }
        }
  
        _coreDispatcher2['default'].dispatch({
          type: _constantsActionTypes2['default'].CHANGE_LOCATION,
          path: path
        });
      });
    },
  
    loadPage: function loadPage(path, callback) {
      _coreDispatcher2['default'].dispatch({
        type: _constantsActionTypes2['default'].GET_PAGE,
        path: path
      });
  
      _superagent2['default'].get('/api/query?path=' + encodeURI(path)).accept('application/json').end(function (err, res) {
        _coreDispatcher2['default'].dispatch({
          type: _constantsActionTypes2['default'].RECEIVE_PAGE,
          path: path,
          err: err,
          page: res ? res.body : null
        });
  
        if (callback) {
          callback();
        }
      });
    }
  
  };
  module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _reactLibKeyMirror = __webpack_require__(36);
  
  var _reactLibKeyMirror2 = _interopRequireDefault(_reactLibKeyMirror);
  
  exports['default'] = (0, _reactLibKeyMirror2['default'])({
    GET_PAGE: null,
    RECEIVE_PAGE: null,
    CHANGE_LOCATION: null
  });
  module.exports = exports['default'];

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _flux = __webpack_require__(208);
  
  exports['default'] = new _flux.Dispatcher();
  module.exports = exports['default'];

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _reactLibInvariant = __webpack_require__(2);
  
  var _reactLibInvariant2 = _interopRequireDefault(_reactLibInvariant);
  
  var _actionsAppActions = __webpack_require__(63);
  
  var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);
  
  function handleClick(event) {
    // If not left mouse click
    if (event.button !== 0) {
      return;
    }
  
    // If modified event
    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
      return;
    }
  
    var el = event.currentTarget;
    (0, _reactLibInvariant2['default'])(el && el.nodeName === 'A', 'The target element must be a link.');
  
    // Rebuild path
    var path = el.pathname + el.search + (el.hash || '');
  
    event.preventDefault();
    _actionsAppActions2['default'].navigateTo(path);
  }
  
  exports['default'] = { handleClick: handleClick };
  module.exports = exports['default'];

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule CallbackQueue
   */
  
  'use strict';
  
  var PooledClass = __webpack_require__(22);
  
  var assign = __webpack_require__(4);
  var invariant = __webpack_require__(2);
  
  /**
   * A specialized pseudo-event module to help keep track of components waiting to
   * be notified when their DOM representations are available for use.
   *
   * This implements `PooledClass`, so you should never need to instantiate this.
   * Instead, use `CallbackQueue.getPooled()`.
   *
   * @class ReactMountReady
   * @implements PooledClass
   * @internal
   */
  function CallbackQueue() {
    this._callbacks = null;
    this._contexts = null;
  }
  
  assign(CallbackQueue.prototype, {
  
    /**
     * Enqueues a callback to be invoked when `notifyAll` is invoked.
     *
     * @param {function} callback Invoked when `notifyAll` is invoked.
     * @param {?object} context Context to call `callback` with.
     * @internal
     */
    enqueue: function(callback, context) {
      this._callbacks = this._callbacks || [];
      this._contexts = this._contexts || [];
      this._callbacks.push(callback);
      this._contexts.push(context);
    },
  
    /**
     * Invokes all enqueued callbacks and clears the queue. This is invoked after
     * the DOM representation of a component has been created or updated.
     *
     * @internal
     */
    notifyAll: function() {
      var callbacks = this._callbacks;
      var contexts = this._contexts;
      if (callbacks) {
        (true ? invariant(
          callbacks.length === contexts.length,
          'Mismatched list of contexts in callback queue'
        ) : invariant(callbacks.length === contexts.length));
        this._callbacks = null;
        this._contexts = null;
        for (var i = 0, l = callbacks.length; i < l; i++) {
          callbacks[i].call(contexts[i]);
        }
        callbacks.length = 0;
        contexts.length = 0;
      }
    },
  
    /**
     * Resets the internal queue.
     *
     * @internal
     */
    reset: function() {
      this._callbacks = null;
      this._contexts = null;
    },
  
    /**
     * `PooledClass` looks for this.
     */
    destructor: function() {
      this.reset();
    }
  
  });
  
  PooledClass.addPoolingTo(CallbackQueue);
  
  module.exports = CallbackQueue;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule EventPluginUtils
   */
  
  'use strict';
  
  var EventConstants = __webpack_require__(12);
  
  var invariant = __webpack_require__(2);
  
  /**
   * Injected dependencies:
   */
  
  /**
   * - `Mount`: [required] Module that can convert between React dom IDs and
   *   actual node references.
   */
  var injection = {
    Mount: null,
    injectMount: function(InjectedMount) {
      injection.Mount = InjectedMount;
      if (true) {
        (true ? invariant(
          InjectedMount && InjectedMount.getNode,
          'EventPluginUtils.injection.injectMount(...): Injected Mount module ' +
          'is missing getNode.'
        ) : invariant(InjectedMount && InjectedMount.getNode));
      }
    }
  };
  
  var topLevelTypes = EventConstants.topLevelTypes;
  
  function isEndish(topLevelType) {
    return topLevelType === topLevelTypes.topMouseUp ||
           topLevelType === topLevelTypes.topTouchEnd ||
           topLevelType === topLevelTypes.topTouchCancel;
  }
  
  function isMoveish(topLevelType) {
    return topLevelType === topLevelTypes.topMouseMove ||
           topLevelType === topLevelTypes.topTouchMove;
  }
  function isStartish(topLevelType) {
    return topLevelType === topLevelTypes.topMouseDown ||
           topLevelType === topLevelTypes.topTouchStart;
  }
  
  
  var validateEventDispatches;
  if (true) {
    validateEventDispatches = function(event) {
      var dispatchListeners = event._dispatchListeners;
      var dispatchIDs = event._dispatchIDs;
  
      var listenersIsArr = Array.isArray(dispatchListeners);
      var idsIsArr = Array.isArray(dispatchIDs);
      var IDsLen = idsIsArr ? dispatchIDs.length : dispatchIDs ? 1 : 0;
      var listenersLen = listenersIsArr ?
        dispatchListeners.length :
        dispatchListeners ? 1 : 0;
  
      (true ? invariant(
        idsIsArr === listenersIsArr && IDsLen === listenersLen,
        'EventPluginUtils: Invalid `event`.'
      ) : invariant(idsIsArr === listenersIsArr && IDsLen === listenersLen));
    };
  }
  
  /**
   * Invokes `cb(event, listener, id)`. Avoids using call if no scope is
   * provided. The `(listener,id)` pair effectively forms the "dispatch" but are
   * kept separate to conserve memory.
   */
  function forEachEventDispatch(event, cb) {
    var dispatchListeners = event._dispatchListeners;
    var dispatchIDs = event._dispatchIDs;
    if (true) {
      validateEventDispatches(event);
    }
    if (Array.isArray(dispatchListeners)) {
      for (var i = 0; i < dispatchListeners.length; i++) {
        if (event.isPropagationStopped()) {
          break;
        }
        // Listeners and IDs are two parallel arrays that are always in sync.
        cb(event, dispatchListeners[i], dispatchIDs[i]);
      }
    } else if (dispatchListeners) {
      cb(event, dispatchListeners, dispatchIDs);
    }
  }
  
  /**
   * Default implementation of PluginModule.executeDispatch().
   * @param {SyntheticEvent} SyntheticEvent to handle
   * @param {function} Application-level callback
   * @param {string} domID DOM id to pass to the callback.
   */
  function executeDispatch(event, listener, domID) {
    event.currentTarget = injection.Mount.getNode(domID);
    var returnValue = listener(event, domID);
    event.currentTarget = null;
    return returnValue;
  }
  
  /**
   * Standard/simple iteration through an event's collected dispatches.
   */
  function executeDispatchesInOrder(event, cb) {
    forEachEventDispatch(event, cb);
    event._dispatchListeners = null;
    event._dispatchIDs = null;
  }
  
  /**
   * Standard/simple iteration through an event's collected dispatches, but stops
   * at the first dispatch execution returning true, and returns that id.
   *
   * @return id of the first dispatch execution who's listener returns true, or
   * null if no listener returned true.
   */
  function executeDispatchesInOrderStopAtTrueImpl(event) {
    var dispatchListeners = event._dispatchListeners;
    var dispatchIDs = event._dispatchIDs;
    if (true) {
      validateEventDispatches(event);
    }
    if (Array.isArray(dispatchListeners)) {
      for (var i = 0; i < dispatchListeners.length; i++) {
        if (event.isPropagationStopped()) {
          break;
        }
        // Listeners and IDs are two parallel arrays that are always in sync.
        if (dispatchListeners[i](event, dispatchIDs[i])) {
          return dispatchIDs[i];
        }
      }
    } else if (dispatchListeners) {
      if (dispatchListeners(event, dispatchIDs)) {
        return dispatchIDs;
      }
    }
    return null;
  }
  
  /**
   * @see executeDispatchesInOrderStopAtTrueImpl
   */
  function executeDispatchesInOrderStopAtTrue(event) {
    var ret = executeDispatchesInOrderStopAtTrueImpl(event);
    event._dispatchIDs = null;
    event._dispatchListeners = null;
    return ret;
  }
  
  /**
   * Execution of a "direct" dispatch - there must be at most one dispatch
   * accumulated on the event or it is considered an error. It doesn't really make
   * sense for an event with multiple dispatches (bubbled) to keep track of the
   * return values at each dispatch execution, but it does tend to make sense when
   * dealing with "direct" dispatches.
   *
   * @return The return value of executing the single dispatch.
   */
  function executeDirectDispatch(event) {
    if (true) {
      validateEventDispatches(event);
    }
    var dispatchListener = event._dispatchListeners;
    var dispatchID = event._dispatchIDs;
    (true ? invariant(
      !Array.isArray(dispatchListener),
      'executeDirectDispatch(...): Invalid `event`.'
    ) : invariant(!Array.isArray(dispatchListener)));
    var res = dispatchListener ?
      dispatchListener(event, dispatchID) :
      null;
    event._dispatchListeners = null;
    event._dispatchIDs = null;
    return res;
  }
  
  /**
   * @param {SyntheticEvent} event
   * @return {bool} True iff number of dispatches accumulated is greater than 0.
   */
  function hasDispatches(event) {
    return !!event._dispatchListeners;
  }
  
  /**
   * General utilities that are useful in creating custom Event Plugins.
   */
  var EventPluginUtils = {
    isEndish: isEndish,
    isMoveish: isMoveish,
    isStartish: isStartish,
  
    executeDirectDispatch: executeDirectDispatch,
    executeDispatch: executeDispatch,
    executeDispatchesInOrder: executeDispatchesInOrder,
    executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
    hasDispatches: hasDispatches,
    injection: injection,
    useTouchEvents: false
  };
  
  module.exports = EventPluginUtils;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule LinkedValueUtils
   * @typechecks static-only
   */
  
  'use strict';
  
  var ReactPropTypes = __webpack_require__(112);
  
  var invariant = __webpack_require__(2);
  
  var hasReadOnlyValue = {
    'button': true,
    'checkbox': true,
    'image': true,
    'hidden': true,
    'radio': true,
    'reset': true,
    'submit': true
  };
  
  function _assertSingleLink(input) {
    (true ? invariant(
      input.props.checkedLink == null || input.props.valueLink == null,
      'Cannot provide a checkedLink and a valueLink. If you want to use ' +
      'checkedLink, you probably don\'t want to use valueLink and vice versa.'
    ) : invariant(input.props.checkedLink == null || input.props.valueLink == null));
  }
  function _assertValueLink(input) {
    _assertSingleLink(input);
    (true ? invariant(
      input.props.value == null && input.props.onChange == null,
      'Cannot provide a valueLink and a value or onChange event. If you want ' +
      'to use value or onChange, you probably don\'t want to use valueLink.'
    ) : invariant(input.props.value == null && input.props.onChange == null));
  }
  
  function _assertCheckedLink(input) {
    _assertSingleLink(input);
    (true ? invariant(
      input.props.checked == null && input.props.onChange == null,
      'Cannot provide a checkedLink and a checked property or onChange event. ' +
      'If you want to use checked or onChange, you probably don\'t want to ' +
      'use checkedLink'
    ) : invariant(input.props.checked == null && input.props.onChange == null));
  }
  
  /**
   * @param {SyntheticEvent} e change event to handle
   */
  function _handleLinkedValueChange(e) {
    /*jshint validthis:true */
    this.props.valueLink.requestChange(e.target.value);
  }
  
  /**
    * @param {SyntheticEvent} e change event to handle
    */
  function _handleLinkedCheckChange(e) {
    /*jshint validthis:true */
    this.props.checkedLink.requestChange(e.target.checked);
  }
  
  /**
   * Provide a linked `value` attribute for controlled forms. You should not use
   * this outside of the ReactDOM controlled form components.
   */
  var LinkedValueUtils = {
    Mixin: {
      propTypes: {
        value: function(props, propName, componentName) {
          if (!props[propName] ||
              hasReadOnlyValue[props.type] ||
              props.onChange ||
              props.readOnly ||
              props.disabled) {
            return null;
          }
          return new Error(
            'You provided a `value` prop to a form field without an ' +
            '`onChange` handler. This will render a read-only field. If ' +
            'the field should be mutable use `defaultValue`. Otherwise, ' +
            'set either `onChange` or `readOnly`.'
          );
        },
        checked: function(props, propName, componentName) {
          if (!props[propName] ||
              props.onChange ||
              props.readOnly ||
              props.disabled) {
            return null;
          }
          return new Error(
            'You provided a `checked` prop to a form field without an ' +
            '`onChange` handler. This will render a read-only field. If ' +
            'the field should be mutable use `defaultChecked`. Otherwise, ' +
            'set either `onChange` or `readOnly`.'
          );
        },
        onChange: ReactPropTypes.func
      }
    },
  
    /**
     * @param {ReactComponent} input Form component
     * @return {*} current value of the input either from value prop or link.
     */
    getValue: function(input) {
      if (input.props.valueLink) {
        _assertValueLink(input);
        return input.props.valueLink.value;
      }
      return input.props.value;
    },
  
    /**
     * @param {ReactComponent} input Form component
     * @return {*} current checked status of the input either from checked prop
     *             or link.
     */
    getChecked: function(input) {
      if (input.props.checkedLink) {
        _assertCheckedLink(input);
        return input.props.checkedLink.value;
      }
      return input.props.checked;
    },
  
    /**
     * @param {ReactComponent} input Form component
     * @return {function} change callback either from onChange prop or link.
     */
    getOnChange: function(input) {
      if (input.props.valueLink) {
        _assertValueLink(input);
        return _handleLinkedValueChange;
      } else if (input.props.checkedLink) {
        _assertCheckedLink(input);
        return _handleLinkedCheckChange;
      }
      return input.props.onChange;
    }
  };
  
  module.exports = LinkedValueUtils;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule LocalEventTrapMixin
   */
  
  'use strict';
  
  var ReactBrowserEventEmitter = __webpack_require__(32);
  
  var accumulateInto = __webpack_require__(79);
  var forEachAccumulated = __webpack_require__(80);
  var invariant = __webpack_require__(2);
  
  function remove(event) {
    event.remove();
  }
  
  var LocalEventTrapMixin = {
    trapBubbledEvent:function(topLevelType, handlerBaseName) {
      (true ? invariant(this.isMounted(), 'Must be mounted to trap events') : invariant(this.isMounted()));
      // If a component renders to null or if another component fatals and causes
      // the state of the tree to be corrupted, `node` here can be null.
      var node = this.getDOMNode();
      (true ? invariant(
        node,
        'LocalEventTrapMixin.trapBubbledEvent(...): Requires node to be rendered.'
      ) : invariant(node));
      var listener = ReactBrowserEventEmitter.trapBubbledEvent(
        topLevelType,
        handlerBaseName,
        node
      );
      this._localEventListeners =
        accumulateInto(this._localEventListeners, listener);
    },
  
    // trapCapturedEvent would look nearly identical. We don't implement that
    // method because it isn't currently needed.
  
    componentWillUnmount:function() {
      if (this._localEventListeners) {
        forEachAccumulated(this._localEventListeners, remove);
      }
    }
  };
  
  module.exports = LocalEventTrapMixin;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactComponentBrowserEnvironment
   */
  
  /*jslint evil: true */
  
  'use strict';
  
  var ReactDOMIDOperations = __webpack_require__(107);
  var ReactMount = __webpack_require__(18);
  
  /**
   * Abstracts away all functionality of the reconciler that requires knowledge of
   * the browser context. TODO: These callers should be refactored to avoid the
   * need for this injection.
   */
  var ReactComponentBrowserEnvironment = {
  
    processChildrenUpdates:
      ReactDOMIDOperations.dangerouslyProcessChildrenUpdates,
  
    replaceNodeWithMarkupByID:
      ReactDOMIDOperations.dangerouslyReplaceNodeWithMarkupByID,
  
    /**
     * If a particular environment requires that some resources be cleaned up,
     * specify this in the injected Mixin. In the DOM, we would likely want to
     * purge any cached node ID lookups.
     *
     * @private
     */
    unmountIDFromEnvironment: function(rootNodeID) {
      ReactMount.purgeID(rootNodeID);
    }
  
  };
  
  module.exports = ReactComponentBrowserEnvironment;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactComponentEnvironment
   */
  
  'use strict';
  
  var invariant = __webpack_require__(2);
  
  var injected = false;
  
  var ReactComponentEnvironment = {
  
    /**
     * Optionally injectable environment dependent cleanup hook. (server vs.
     * browser etc). Example: A browser system caches DOM nodes based on component
     * ID and must remove that cache entry when this instance is unmounted.
     */
    unmountIDFromEnvironment: null,
  
    /**
     * Optionally injectable hook for swapping out mount images in the middle of
     * the tree.
     */
    replaceNodeWithMarkupByID: null,
  
    /**
     * Optionally injectable hook for processing a queue of child updates. Will
     * later move into MultiChildComponents.
     */
    processChildrenUpdates: null,
  
    injection: {
      injectEnvironment: function(environment) {
        (true ? invariant(
          !injected,
          'ReactCompositeComponent: injectEnvironment() can only be called once.'
        ) : invariant(!injected));
        ReactComponentEnvironment.unmountIDFromEnvironment =
          environment.unmountIDFromEnvironment;
        ReactComponentEnvironment.replaceNodeWithMarkupByID =
          environment.replaceNodeWithMarkupByID;
        ReactComponentEnvironment.processChildrenUpdates =
          environment.processChildrenUpdates;
        injected = true;
      }
    }
  
  };
  
  module.exports = ReactComponentEnvironment;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactContext
   */
  
  'use strict';
  
  var assign = __webpack_require__(4);
  var emptyObject = __webpack_require__(54);
  var warning = __webpack_require__(6);
  
  var didWarn = false;
  
  /**
   * Keeps track of the current context.
   *
   * The context is automatically passed down the component ownership hierarchy
   * and is accessible via `this.context` on ReactCompositeComponents.
   */
  var ReactContext = {
  
    /**
     * @internal
     * @type {object}
     */
    current: emptyObject,
  
    /**
     * Temporarily extends the current context while executing scopedCallback.
     *
     * A typical use case might look like
     *
     *  render: function() {
     *    var children = ReactContext.withContext({foo: 'foo'}, () => (
     *
     *    ));
     *    return <div>{children}</div>;
     *  }
     *
     * @param {object} newContext New context to merge into the existing context
     * @param {function} scopedCallback Callback to run with the new context
     * @return {ReactComponent|array<ReactComponent>}
     */
    withContext: function(newContext, scopedCallback) {
      if (true) {
        (true ? warning(
          didWarn,
          'withContext is deprecated and will be removed in a future version. ' +
          'Use a wrapper component with getChildContext instead.'
        ) : null);
  
        didWarn = true;
      }
  
      var result;
      var previousContext = ReactContext.current;
      ReactContext.current = assign({}, previousContext, newContext);
      try {
        result = scopedCallback();
      } finally {
        ReactContext.current = previousContext;
      }
      return result;
    }
  
  };
  
  module.exports = ReactContext;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDOMComponent
   * @typechecks static-only
   */
  
  /* global hasOwnProperty:true */
  
  'use strict';
  
  var CSSPropertyOperations = __webpack_require__(104);
  var DOMProperty = __webpack_require__(29);
  var DOMPropertyOperations = __webpack_require__(38);
  var ReactBrowserEventEmitter = __webpack_require__(32);
  var ReactComponentBrowserEnvironment =
    __webpack_require__(71);
  var ReactMount = __webpack_require__(18);
  var ReactMultiChild = __webpack_require__(245);
  var ReactPerf = __webpack_require__(27);
  
  var assign = __webpack_require__(4);
  var escapeTextContentForBrowser = __webpack_require__(55);
  var invariant = __webpack_require__(2);
  var isEventSupported = __webpack_require__(85);
  var keyOf = __webpack_require__(28);
  var warning = __webpack_require__(6);
  
  var deleteListener = ReactBrowserEventEmitter.deleteListener;
  var listenTo = ReactBrowserEventEmitter.listenTo;
  var registrationNameModules = ReactBrowserEventEmitter.registrationNameModules;
  
  // For quickly matching children type, to test if can be treated as content.
  var CONTENT_TYPES = {'string': true, 'number': true};
  
  var STYLE = keyOf({style: null});
  
  var ELEMENT_NODE_TYPE = 1;
  
  /**
   * Optionally injectable operations for mutating the DOM
   */
  var BackendIDOperations = null;
  
  /**
   * @param {?object} props
   */
  function assertValidProps(props) {
    if (!props) {
      return;
    }
    // Note the use of `==` which checks for null or undefined.
    if (props.dangerouslySetInnerHTML != null) {
      (true ? invariant(
        props.children == null,
        'Can only set one of `children` or `props.dangerouslySetInnerHTML`.'
      ) : invariant(props.children == null));
      (true ? invariant(
        typeof props.dangerouslySetInnerHTML === 'object' &&
        '__html' in props.dangerouslySetInnerHTML,
        '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. ' +
        'Please visit https://fb.me/react-invariant-dangerously-set-inner-html ' +
        'for more information.'
      ) : invariant(typeof props.dangerouslySetInnerHTML === 'object' &&
      '__html' in props.dangerouslySetInnerHTML));
    }
    if (true) {
      (true ? warning(
        props.innerHTML == null,
        'Directly setting property `innerHTML` is not permitted. ' +
        'For more information, lookup documentation on `dangerouslySetInnerHTML`.'
      ) : null);
      (true ? warning(
        !props.contentEditable || props.children == null,
        'A component is `contentEditable` and contains `children` managed by ' +
        'React. It is now your responsibility to guarantee that none of ' +
        'those nodes are unexpectedly modified or duplicated. This is ' +
        'probably not intentional.'
      ) : null);
    }
    (true ? invariant(
      props.style == null || typeof props.style === 'object',
      'The `style` prop expects a mapping from style properties to values, ' +
      'not a string. For example, style={{marginRight: spacing + \'em\'}} when ' +
      'using JSX.'
    ) : invariant(props.style == null || typeof props.style === 'object'));
  }
  
  function putListener(id, registrationName, listener, transaction) {
    if (true) {
      // IE8 has no API for event capturing and the `onScroll` event doesn't
      // bubble.
      (true ? warning(
        registrationName !== 'onScroll' || isEventSupported('scroll', true),
        'This browser doesn\'t support the `onScroll` event'
      ) : null);
    }
    var container = ReactMount.findReactContainerForID(id);
    if (container) {
      var doc = container.nodeType === ELEMENT_NODE_TYPE ?
        container.ownerDocument :
        container;
      listenTo(registrationName, doc);
    }
    transaction.getPutListenerQueue().enqueuePutListener(
      id,
      registrationName,
      listener
    );
  }
  
  // For HTML, certain tags should omit their close tag. We keep a whitelist for
  // those special cased tags.
  
  var omittedCloseTags = {
    'area': true,
    'base': true,
    'br': true,
    'col': true,
    'embed': true,
    'hr': true,
    'img': true,
    'input': true,
    'keygen': true,
    'link': true,
    'meta': true,
    'param': true,
    'source': true,
    'track': true,
    'wbr': true
    // NOTE: menuitem's close tag should be omitted, but that causes problems.
  };
  
  // We accept any tag to be rendered but since this gets injected into abitrary
  // HTML, we want to make sure that it's a safe tag.
  // http://www.w3.org/TR/REC-xml/#NT-Name
  
  var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // Simplified subset
  var validatedTagCache = {};
  var hasOwnProperty = {}.hasOwnProperty;
  
  function validateDangerousTag(tag) {
    if (!hasOwnProperty.call(validatedTagCache, tag)) {
      (true ? invariant(VALID_TAG_REGEX.test(tag), 'Invalid tag: %s', tag) : invariant(VALID_TAG_REGEX.test(tag)));
      validatedTagCache[tag] = true;
    }
  }
  
  /**
   * Creates a new React class that is idempotent and capable of containing other
   * React components. It accepts event listeners and DOM properties that are
   * valid according to `DOMProperty`.
   *
   *  - Event listeners: `onClick`, `onMouseDown`, etc.
   *  - DOM properties: `className`, `name`, `title`, etc.
   *
   * The `style` property functions differently from the DOM API. It accepts an
   * object mapping of style properties to values.
   *
   * @constructor ReactDOMComponent
   * @extends ReactMultiChild
   */
  function ReactDOMComponent(tag) {
    validateDangerousTag(tag);
    this._tag = tag;
    this._renderedChildren = null;
    this._previousStyleCopy = null;
    this._rootNodeID = null;
  }
  
  ReactDOMComponent.displayName = 'ReactDOMComponent';
  
  ReactDOMComponent.Mixin = {
  
    construct: function(element) {
      this._currentElement = element;
    },
  
    /**
     * Generates root tag markup then recurses. This method has side effects and
     * is not idempotent.
     *
     * @internal
     * @param {string} rootID The root DOM ID for this node.
     * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
     * @return {string} The computed markup.
     */
    mountComponent: function(rootID, transaction, context) {
      this._rootNodeID = rootID;
      assertValidProps(this._currentElement.props);
      var closeTag = omittedCloseTags[this._tag] ? '' : '</' + this._tag + '>';
      return (
        this._createOpenTagMarkupAndPutListeners(transaction) +
        this._createContentMarkup(transaction, context) +
        closeTag
      );
    },
  
    /**
     * Creates markup for the open tag and all attributes.
     *
     * This method has side effects because events get registered.
     *
     * Iterating over object properties is faster than iterating over arrays.
     * @see http://jsperf.com/obj-vs-arr-iteration
     *
     * @private
     * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
     * @return {string} Markup of opening tag.
     */
    _createOpenTagMarkupAndPutListeners: function(transaction) {
      var props = this._currentElement.props;
      var ret = '<' + this._tag;
  
      for (var propKey in props) {
        if (!props.hasOwnProperty(propKey)) {
          continue;
        }
        var propValue = props[propKey];
        if (propValue == null) {
          continue;
        }
        if (registrationNameModules.hasOwnProperty(propKey)) {
          putListener(this._rootNodeID, propKey, propValue, transaction);
        } else {
          if (propKey === STYLE) {
            if (propValue) {
              propValue = this._previousStyleCopy = assign({}, props.style);
            }
            propValue = CSSPropertyOperations.createMarkupForStyles(propValue);
          }
          var markup =
            DOMPropertyOperations.createMarkupForProperty(propKey, propValue);
          if (markup) {
            ret += ' ' + markup;
          }
        }
      }
  
      // For static pages, no need to put React ID and checksum. Saves lots of
      // bytes.
      if (transaction.renderToStaticMarkup) {
        return ret + '>';
      }
  
      var markupForID = DOMPropertyOperations.createMarkupForID(this._rootNodeID);
      return ret + ' ' + markupForID + '>';
    },
  
    /**
     * Creates markup for the content between the tags.
     *
     * @private
     * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
     * @param {object} context
     * @return {string} Content markup.
     */
    _createContentMarkup: function(transaction, context) {
      var prefix = '';
      if (this._tag === 'listing' ||
          this._tag === 'pre' ||
          this._tag === 'textarea') {
        // Add an initial newline because browsers ignore the first newline in
        // a <listing>, <pre>, or <textarea> as an "authoring convenience" -- see
        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody.
        prefix = '\n';
      }
  
      var props = this._currentElement.props;
  
      // Intentional use of != to avoid catching zero/false.
      var innerHTML = props.dangerouslySetInnerHTML;
      if (innerHTML != null) {
        if (innerHTML.__html != null) {
          return prefix + innerHTML.__html;
        }
      } else {
        var contentToUse =
          CONTENT_TYPES[typeof props.children] ? props.children : null;
        var childrenToUse = contentToUse != null ? null : props.children;
        if (contentToUse != null) {
          return prefix + escapeTextContentForBrowser(contentToUse);
        } else if (childrenToUse != null) {
          var mountImages = this.mountChildren(
            childrenToUse,
            transaction,
            context
          );
          return prefix + mountImages.join('');
        }
      }
      return prefix;
    },
  
    receiveComponent: function(nextElement, transaction, context) {
      var prevElement = this._currentElement;
      this._currentElement = nextElement;
      this.updateComponent(transaction, prevElement, nextElement, context);
    },
  
    /**
     * Updates a native DOM component after it has already been allocated and
     * attached to the DOM. Reconciles the root DOM node, then recurses.
     *
     * @param {ReactReconcileTransaction} transaction
     * @param {ReactElement} prevElement
     * @param {ReactElement} nextElement
     * @internal
     * @overridable
     */
    updateComponent: function(transaction, prevElement, nextElement, context) {
      assertValidProps(this._currentElement.props);
      this._updateDOMProperties(prevElement.props, transaction);
      this._updateDOMChildren(prevElement.props, transaction, context);
    },
  
    /**
     * Reconciles the properties by detecting differences in property values and
     * updating the DOM as necessary. This function is probably the single most
     * critical path for performance optimization.
     *
     * TODO: Benchmark whether checking for changed values in memory actually
     *       improves performance (especially statically positioned elements).
     * TODO: Benchmark the effects of putting this at the top since 99% of props
     *       do not change for a given reconciliation.
     * TODO: Benchmark areas that can be improved with caching.
     *
     * @private
     * @param {object} lastProps
     * @param {ReactReconcileTransaction} transaction
     */
    _updateDOMProperties: function(lastProps, transaction) {
      var nextProps = this._currentElement.props;
      var propKey;
      var styleName;
      var styleUpdates;
      for (propKey in lastProps) {
        if (nextProps.hasOwnProperty(propKey) ||
           !lastProps.hasOwnProperty(propKey)) {
          continue;
        }
        if (propKey === STYLE) {
          var lastStyle = this._previousStyleCopy;
          for (styleName in lastStyle) {
            if (lastStyle.hasOwnProperty(styleName)) {
              styleUpdates = styleUpdates || {};
              styleUpdates[styleName] = '';
            }
          }
          this._previousStyleCopy = null;
        } else if (registrationNameModules.hasOwnProperty(propKey)) {
          deleteListener(this._rootNodeID, propKey);
        } else if (
            DOMProperty.isStandardName[propKey] ||
            DOMProperty.isCustomAttribute(propKey)) {
          BackendIDOperations.deletePropertyByID(
            this._rootNodeID,
            propKey
          );
        }
      }
      for (propKey in nextProps) {
        var nextProp = nextProps[propKey];
        var lastProp = propKey === STYLE ?
          this._previousStyleCopy :
          lastProps[propKey];
        if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp) {
          continue;
        }
        if (propKey === STYLE) {
          if (nextProp) {
            nextProp = this._previousStyleCopy = assign({}, nextProp);
          } else {
            this._previousStyleCopy = null;
          }
          if (lastProp) {
            // Unset styles on `lastProp` but not on `nextProp`.
            for (styleName in lastProp) {
              if (lastProp.hasOwnProperty(styleName) &&
                  (!nextProp || !nextProp.hasOwnProperty(styleName))) {
                styleUpdates = styleUpdates || {};
                styleUpdates[styleName] = '';
              }
            }
            // Update styles that changed since `lastProp`.
            for (styleName in nextProp) {
              if (nextProp.hasOwnProperty(styleName) &&
                  lastProp[styleName] !== nextProp[styleName]) {
                styleUpdates = styleUpdates || {};
                styleUpdates[styleName] = nextProp[styleName];
              }
            }
          } else {
            // Relies on `updateStylesByID` not mutating `styleUpdates`.
            styleUpdates = nextProp;
          }
        } else if (registrationNameModules.hasOwnProperty(propKey)) {
          putListener(this._rootNodeID, propKey, nextProp, transaction);
        } else if (
            DOMProperty.isStandardName[propKey] ||
            DOMProperty.isCustomAttribute(propKey)) {
          BackendIDOperations.updatePropertyByID(
            this._rootNodeID,
            propKey,
            nextProp
          );
        }
      }
      if (styleUpdates) {
        BackendIDOperations.updateStylesByID(
          this._rootNodeID,
          styleUpdates
        );
      }
    },
  
    /**
     * Reconciles the children with the various properties that affect the
     * children content.
     *
     * @param {object} lastProps
     * @param {ReactReconcileTransaction} transaction
     */
    _updateDOMChildren: function(lastProps, transaction, context) {
      var nextProps = this._currentElement.props;
  
      var lastContent =
        CONTENT_TYPES[typeof lastProps.children] ? lastProps.children : null;
      var nextContent =
        CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null;
  
      var lastHtml =
        lastProps.dangerouslySetInnerHTML &&
        lastProps.dangerouslySetInnerHTML.__html;
      var nextHtml =
        nextProps.dangerouslySetInnerHTML &&
        nextProps.dangerouslySetInnerHTML.__html;
  
      // Note the use of `!=` which checks for null or undefined.
      var lastChildren = lastContent != null ? null : lastProps.children;
      var nextChildren = nextContent != null ? null : nextProps.children;
  
      // If we're switching from children to content/html or vice versa, remove
      // the old content
      var lastHasContentOrHtml = lastContent != null || lastHtml != null;
      var nextHasContentOrHtml = nextContent != null || nextHtml != null;
      if (lastChildren != null && nextChildren == null) {
        this.updateChildren(null, transaction, context);
      } else if (lastHasContentOrHtml && !nextHasContentOrHtml) {
        this.updateTextContent('');
      }
  
      if (nextContent != null) {
        if (lastContent !== nextContent) {
          this.updateTextContent('' + nextContent);
        }
      } else if (nextHtml != null) {
        if (lastHtml !== nextHtml) {
          BackendIDOperations.updateInnerHTMLByID(
            this._rootNodeID,
            nextHtml
          );
        }
      } else if (nextChildren != null) {
        this.updateChildren(nextChildren, transaction, context);
      }
    },
  
    /**
     * Destroys all event registrations for this instance. Does not remove from
     * the DOM. That must be done by the parent.
     *
     * @internal
     */
    unmountComponent: function() {
      this.unmountChildren();
      ReactBrowserEventEmitter.deleteAllListeners(this._rootNodeID);
      ReactComponentBrowserEnvironment.unmountIDFromEnvironment(this._rootNodeID);
      this._rootNodeID = null;
    }
  
  };
  
  ReactPerf.measureMethods(ReactDOMComponent, 'ReactDOMComponent', {
    mountComponent: 'mountComponent',
    updateComponent: 'updateComponent'
  });
  
  assign(
    ReactDOMComponent.prototype,
    ReactDOMComponent.Mixin,
    ReactMultiChild.Mixin
  );
  
  ReactDOMComponent.injection = {
    injectIDOperations: function(IDOperations) {
      ReactDOMComponent.BackendIDOperations = BackendIDOperations = IDOperations;
    }
  };
  
  module.exports = ReactDOMComponent;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactEmptyComponent
   */
  
  'use strict';
  
  var ReactElement = __webpack_require__(5);
  var ReactInstanceMap = __webpack_require__(34);
  
  var invariant = __webpack_require__(2);
  
  var component;
  // This registry keeps track of the React IDs of the components that rendered to
  // `null` (in reality a placeholder such as `noscript`)
  var nullComponentIDsRegistry = {};
  
  var ReactEmptyComponentInjection = {
    injectEmptyComponent: function(emptyComponent) {
      component = ReactElement.createFactory(emptyComponent);
    }
  };
  
  var ReactEmptyComponentType = function() {};
  ReactEmptyComponentType.prototype.componentDidMount = function() {
    var internalInstance = ReactInstanceMap.get(this);
    // TODO: Make sure we run these methods in the correct order, we shouldn't
    // need this check. We're going to assume if we're here it means we ran
    // componentWillUnmount already so there is no internal instance (it gets
    // removed as part of the unmounting process).
    if (!internalInstance) {
      return;
    }
    registerNullComponentID(internalInstance._rootNodeID);
  };
  ReactEmptyComponentType.prototype.componentWillUnmount = function() {
    var internalInstance = ReactInstanceMap.get(this);
    // TODO: Get rid of this check. See TODO in componentDidMount.
    if (!internalInstance) {
      return;
    }
    deregisterNullComponentID(internalInstance._rootNodeID);
  };
  ReactEmptyComponentType.prototype.render = function() {
    (true ? invariant(
      component,
      'Trying to return null from a render, but no null placeholder component ' +
      'was injected.'
    ) : invariant(component));
    return component();
  };
  
  var emptyElement = ReactElement.createElement(ReactEmptyComponentType);
  
  /**
   * Mark the component as having rendered to null.
   * @param {string} id Component's `_rootNodeID`.
   */
  function registerNullComponentID(id) {
    nullComponentIDsRegistry[id] = true;
  }
  
  /**
   * Unmark the component as having rendered to null: it renders to something now.
   * @param {string} id Component's `_rootNodeID`.
   */
  function deregisterNullComponentID(id) {
    delete nullComponentIDsRegistry[id];
  }
  
  /**
   * @param {string} id Component's `_rootNodeID`.
   * @return {boolean} True if the component is rendered to null.
   */
  function isNullComponentID(id) {
    return !!nullComponentIDsRegistry[id];
  }
  
  var ReactEmptyComponent = {
    emptyElement: emptyElement,
    injection: ReactEmptyComponentInjection,
    isNullComponentID: isNullComponentID
  };
  
  module.exports = ReactEmptyComponent;


/***/ },
/* 76 */
/***/ function(module, exports) {

  /**
   * Copyright 2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactLifeCycle
   */
  
  'use strict';
  
  /**
   * This module manages the bookkeeping when a component is in the process
   * of being mounted or being unmounted. This is used as a way to enforce
   * invariants (or warnings) when it is not recommended to call
   * setState/forceUpdate.
   *
   * currentlyMountingInstance: During the construction phase, it is not possible
   * to trigger an update since the instance is not fully mounted yet. However, we
   * currently allow this as a convenience for mutating the initial state.
   *
   * currentlyUnmountingInstance: During the unmounting phase, the instance is
   * still mounted and can therefore schedule an update. However, this is not
   * recommended and probably an error since it's about to be unmounted.
   * Therefore we still want to trigger in an error for that case.
   */
  
  var ReactLifeCycle = {
    currentlyMountingInstance: null,
    currentlyUnmountingInstance: null
  };
  
  module.exports = ReactLifeCycle;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactPropTypeLocations
   */
  
  'use strict';
  
  var keyMirror = __webpack_require__(36);
  
  var ReactPropTypeLocations = keyMirror({
    prop: null,
    context: null,
    childContext: null
  });
  
  module.exports = ReactPropTypeLocations;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactUpdateQueue
   */
  
  'use strict';
  
  var ReactLifeCycle = __webpack_require__(76);
  var ReactCurrentOwner = __webpack_require__(24);
  var ReactElement = __webpack_require__(5);
  var ReactInstanceMap = __webpack_require__(34);
  var ReactUpdates = __webpack_require__(19);
  
  var assign = __webpack_require__(4);
  var invariant = __webpack_require__(2);
  var warning = __webpack_require__(6);
  
  function enqueueUpdate(internalInstance) {
    if (internalInstance !== ReactLifeCycle.currentlyMountingInstance) {
      // If we're in a componentWillMount handler, don't enqueue a rerender
      // because ReactUpdates assumes we're in a browser context (which is
      // wrong for server rendering) and we're about to do a render anyway.
      // See bug in #1740.
      ReactUpdates.enqueueUpdate(internalInstance);
    }
  }
  
  function getInternalInstanceReadyForUpdate(publicInstance, callerName) {
    (true ? invariant(
      ReactCurrentOwner.current == null,
      '%s(...): Cannot update during an existing state transition ' +
      '(such as within `render`). Render methods should be a pure function ' +
      'of props and state.',
      callerName
    ) : invariant(ReactCurrentOwner.current == null));
  
    var internalInstance = ReactInstanceMap.get(publicInstance);
    if (!internalInstance) {
      if (true) {
        // Only warn when we have a callerName. Otherwise we should be silent.
        // We're probably calling from enqueueCallback. We don't want to warn
        // there because we already warned for the corresponding lifecycle method.
        (true ? warning(
          !callerName,
          '%s(...): Can only update a mounted or mounting component. ' +
          'This usually means you called %s() on an unmounted ' +
          'component. This is a no-op.',
          callerName,
          callerName
        ) : null);
      }
      return null;
    }
  
    if (internalInstance === ReactLifeCycle.currentlyUnmountingInstance) {
      return null;
    }
  
    return internalInstance;
  }
  
  /**
   * ReactUpdateQueue allows for state updates to be scheduled into a later
   * reconciliation step.
   */
  var ReactUpdateQueue = {
  
    /**
     * Enqueue a callback that will be executed after all the pending updates
     * have processed.
     *
     * @param {ReactClass} publicInstance The instance to use as `this` context.
     * @param {?function} callback Called after state is updated.
     * @internal
     */
    enqueueCallback: function(publicInstance, callback) {
      (true ? invariant(
        typeof callback === 'function',
        'enqueueCallback(...): You called `setProps`, `replaceProps`, ' +
        '`setState`, `replaceState`, or `forceUpdate` with a callback that ' +
        'isn\'t callable.'
      ) : invariant(typeof callback === 'function'));
      var internalInstance = getInternalInstanceReadyForUpdate(publicInstance);
  
      // Previously we would throw an error if we didn't have an internal
      // instance. Since we want to make it a no-op instead, we mirror the same
      // behavior we have in other enqueue* methods.
      // We also need to ignore callbacks in componentWillMount. See
      // enqueueUpdates.
      if (!internalInstance ||
          internalInstance === ReactLifeCycle.currentlyMountingInstance) {
        return null;
      }
  
      if (internalInstance._pendingCallbacks) {
        internalInstance._pendingCallbacks.push(callback);
      } else {
        internalInstance._pendingCallbacks = [callback];
      }
      // TODO: The callback here is ignored when setState is called from
      // componentWillMount. Either fix it or disallow doing so completely in
      // favor of getInitialState. Alternatively, we can disallow
      // componentWillMount during server-side rendering.
      enqueueUpdate(internalInstance);
    },
  
    enqueueCallbackInternal: function(internalInstance, callback) {
      (true ? invariant(
        typeof callback === 'function',
        'enqueueCallback(...): You called `setProps`, `replaceProps`, ' +
        '`setState`, `replaceState`, or `forceUpdate` with a callback that ' +
        'isn\'t callable.'
      ) : invariant(typeof callback === 'function'));
      if (internalInstance._pendingCallbacks) {
        internalInstance._pendingCallbacks.push(callback);
      } else {
        internalInstance._pendingCallbacks = [callback];
      }
      enqueueUpdate(internalInstance);
    },
  
    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldUpdateComponent`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @internal
     */
    enqueueForceUpdate: function(publicInstance) {
      var internalInstance = getInternalInstanceReadyForUpdate(
        publicInstance,
        'forceUpdate'
      );
  
      if (!internalInstance) {
        return;
      }
  
      internalInstance._pendingForceUpdate = true;
  
      enqueueUpdate(internalInstance);
    },
  
    /**
     * Replaces all of the state. Always use this or `setState` to mutate state.
     * You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {object} completeState Next state.
     * @internal
     */
    enqueueReplaceState: function(publicInstance, completeState) {
      var internalInstance = getInternalInstanceReadyForUpdate(
        publicInstance,
        'replaceState'
      );
  
      if (!internalInstance) {
        return;
      }
  
      internalInstance._pendingStateQueue = [completeState];
      internalInstance._pendingReplaceState = true;
  
      enqueueUpdate(internalInstance);
    },
  
    /**
     * Sets a subset of the state. This only exists because _pendingState is
     * internal. This provides a merging strategy that is not available to deep
     * properties which is confusing. TODO: Expose pendingState or don't use it
     * during the merge.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {object} partialState Next partial state to be merged with state.
     * @internal
     */
    enqueueSetState: function(publicInstance, partialState) {
      var internalInstance = getInternalInstanceReadyForUpdate(
        publicInstance,
        'setState'
      );
  
      if (!internalInstance) {
        return;
      }
  
      var queue =
        internalInstance._pendingStateQueue ||
        (internalInstance._pendingStateQueue = []);
      queue.push(partialState);
  
      enqueueUpdate(internalInstance);
    },
  
    /**
     * Sets a subset of the props.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {object} partialProps Subset of the next props.
     * @internal
     */
    enqueueSetProps: function(publicInstance, partialProps) {
      var internalInstance = getInternalInstanceReadyForUpdate(
        publicInstance,
        'setProps'
      );
  
      if (!internalInstance) {
        return;
      }
  
      (true ? invariant(
        internalInstance._isTopLevel,
        'setProps(...): You called `setProps` on a ' +
        'component with a parent. This is an anti-pattern since props will ' +
        'get reactively updated when rendered. Instead, change the owner\'s ' +
        '`render` method to pass the correct value as props to the component ' +
        'where it is created.'
      ) : invariant(internalInstance._isTopLevel));
  
      // Merge with the pending element if it exists, otherwise with existing
      // element props.
      var element = internalInstance._pendingElement ||
                    internalInstance._currentElement;
      var props = assign({}, element.props, partialProps);
      internalInstance._pendingElement = ReactElement.cloneAndReplaceProps(
        element,
        props
      );
  
      enqueueUpdate(internalInstance);
    },
  
    /**
     * Replaces all of the props.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {object} props New props.
     * @internal
     */
    enqueueReplaceProps: function(publicInstance, props) {
      var internalInstance = getInternalInstanceReadyForUpdate(
        publicInstance,
        'replaceProps'
      );
  
      if (!internalInstance) {
        return;
      }
  
      (true ? invariant(
        internalInstance._isTopLevel,
        'replaceProps(...): You called `replaceProps` on a ' +
        'component with a parent. This is an anti-pattern since props will ' +
        'get reactively updated when rendered. Instead, change the owner\'s ' +
        '`render` method to pass the correct value as props to the component ' +
        'where it is created.'
      ) : invariant(internalInstance._isTopLevel));
  
      // Merge with the pending element if it exists, otherwise with existing
      // element props.
      var element = internalInstance._pendingElement ||
                    internalInstance._currentElement;
      internalInstance._pendingElement = ReactElement.cloneAndReplaceProps(
        element,
        props
      );
  
      enqueueUpdate(internalInstance);
    },
  
    enqueueElementInternal: function(internalInstance, newElement) {
      internalInstance._pendingElement = newElement;
      enqueueUpdate(internalInstance);
    }
  
  };
  
  module.exports = ReactUpdateQueue;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule accumulateInto
   */
  
  'use strict';
  
  var invariant = __webpack_require__(2);
  
  /**
   *
   * Accumulates items that must not be null or undefined into the first one. This
   * is used to conserve memory by avoiding array allocations, and thus sacrifices
   * API cleanness. Since `current` can be null before being passed in and not
   * null after this function, make sure to assign it back to `current`:
   *
   * `a = accumulateInto(a, b);`
   *
   * This API should be sparingly used. Try `accumulate` for something cleaner.
   *
   * @return {*|array<*>} An accumulation of items.
   */
  
  function accumulateInto(current, next) {
    (true ? invariant(
      next != null,
      'accumulateInto(...): Accumulated items must not be null or undefined.'
    ) : invariant(next != null));
    if (current == null) {
      return next;
    }
  
    // Both are not empty. Warning: Never call x.concat(y) when you are not
    // certain that x is an Array (x could be a string with concat method).
    var currentIsArray = Array.isArray(current);
    var nextIsArray = Array.isArray(next);
  
    if (currentIsArray && nextIsArray) {
      current.push.apply(current, next);
      return current;
    }
  
    if (currentIsArray) {
      current.push(next);
      return current;
    }
  
    if (nextIsArray) {
      // A bit too dangerous to mutate `next`.
      return [current].concat(next);
    }
  
    return [current, next];
  }
  
  module.exports = accumulateInto;


/***/ },
/* 80 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule forEachAccumulated
   */
  
  'use strict';
  
  /**
   * @param {array} an "accumulation" of items which is either an Array or
   * a single item. Useful when paired with the `accumulate` module. This is a
   * simple utility that allows us to reason about a collection of items, but
   * handling the case when there is exactly one item (and we do not need to
   * allocate an array).
   */
  var forEachAccumulated = function(arr, cb, scope) {
    if (Array.isArray(arr)) {
      arr.forEach(cb, scope);
    } else if (arr) {
      cb.call(scope, arr);
    }
  };
  
  module.exports = forEachAccumulated;


/***/ },
/* 81 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule getEventCharCode
   * @typechecks static-only
   */
  
  'use strict';
  
  /**
   * `charCode` represents the actual "character code" and is safe to use with
   * `String.fromCharCode`. As such, only keys that correspond to printable
   * characters produce a valid `charCode`, the only exception to this is Enter.
   * The Tab-key is considered non-printable and does not have a `charCode`,
   * presumably because it does not produce a tab-character in browsers.
   *
   * @param {object} nativeEvent Native browser event.
   * @return {string} Normalized `charCode` property.
   */
  function getEventCharCode(nativeEvent) {
    var charCode;
    var keyCode = nativeEvent.keyCode;
  
    if ('charCode' in nativeEvent) {
      charCode = nativeEvent.charCode;
  
      // FF does not set `charCode` for the Enter-key, check against `keyCode`.
      if (charCode === 0 && keyCode === 13) {
        charCode = 13;
      }
    } else {
      // IE8 does not implement `charCode`, but `keyCode` has the correct value.
      charCode = keyCode;
    }
  
    // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
    // Must not discard the (non-)printable Enter-key.
    if (charCode >= 32 || charCode === 13) {
      return charCode;
    }
  
    return 0;
  }
  
  module.exports = getEventCharCode;


/***/ },
/* 82 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule getEventModifierState
   * @typechecks static-only
   */
  
  'use strict';
  
  /**
   * Translation from modifier key to the associated property in the event.
   * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
   */
  
  var modifierKeyToProp = {
    'Alt': 'altKey',
    'Control': 'ctrlKey',
    'Meta': 'metaKey',
    'Shift': 'shiftKey'
  };
  
  // IE8 does not implement getModifierState so we simply map it to the only
  // modifier keys exposed by the event itself, does not support Lock-keys.
  // Currently, all major browsers except Chrome seems to support Lock-keys.
  function modifierStateGetter(keyArg) {
    /*jshint validthis:true */
    var syntheticEvent = this;
    var nativeEvent = syntheticEvent.nativeEvent;
    if (nativeEvent.getModifierState) {
      return nativeEvent.getModifierState(keyArg);
    }
    var keyProp = modifierKeyToProp[keyArg];
    return keyProp ? !!nativeEvent[keyProp] : false;
  }
  
  function getEventModifierState(nativeEvent) {
    return modifierStateGetter;
  }
  
  module.exports = getEventModifierState;


/***/ },
/* 83 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule getEventTarget
   * @typechecks static-only
   */
  
  'use strict';
  
  /**
   * Gets the target node from a native browser event by accounting for
   * inconsistencies in browser DOM APIs.
   *
   * @param {object} nativeEvent Native browser event.
   * @return {DOMEventTarget} Target node.
   */
  function getEventTarget(nativeEvent) {
    var target = nativeEvent.target || nativeEvent.srcElement || window;
    // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
    // @see http://www.quirksmode.org/js/events_properties.html
    return target.nodeType === 3 ? target.parentNode : target;
  }
  
  module.exports = getEventTarget;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule instantiateReactComponent
   * @typechecks static-only
   */
  
  'use strict';
  
  var ReactCompositeComponent = __webpack_require__(226);
  var ReactEmptyComponent = __webpack_require__(75);
  var ReactNativeComponent = __webpack_require__(50);
  
  var assign = __webpack_require__(4);
  var invariant = __webpack_require__(2);
  var warning = __webpack_require__(6);
  
  // To avoid a cyclic dependency, we create the final class in this module
  var ReactCompositeComponentWrapper = function() { };
  assign(
    ReactCompositeComponentWrapper.prototype,
    ReactCompositeComponent.Mixin,
    {
      _instantiateReactComponent: instantiateReactComponent
    }
  );
  
  /**
   * Check if the type reference is a known internal type. I.e. not a user
   * provided composite type.
   *
   * @param {function} type
   * @return {boolean} Returns true if this is a valid internal type.
   */
  function isInternalComponentType(type) {
    return (
      typeof type === 'function' &&
      typeof type.prototype !== 'undefined' &&
      typeof type.prototype.mountComponent === 'function' &&
      typeof type.prototype.receiveComponent === 'function'
    );
  }
  
  /**
   * Given a ReactNode, create an instance that will actually be mounted.
   *
   * @param {ReactNode} node
   * @param {*} parentCompositeType The composite type that resolved this.
   * @return {object} A new instance of the element's constructor.
   * @protected
   */
  function instantiateReactComponent(node, parentCompositeType) {
    var instance;
  
    if (node === null || node === false) {
      node = ReactEmptyComponent.emptyElement;
    }
  
    if (typeof node === 'object') {
      var element = node;
      if (true) {
        (true ? warning(
          element && (typeof element.type === 'function' ||
                      typeof element.type === 'string'),
          'Only functions or strings can be mounted as React components.'
        ) : null);
      }
  
      // Special case string values
      if (parentCompositeType === element.type &&
          typeof element.type === 'string') {
        // Avoid recursion if the wrapper renders itself.
        instance = ReactNativeComponent.createInternalComponent(element);
        // All native components are currently wrapped in a composite so we're
        // safe to assume that this is what we should instantiate.
      } else if (isInternalComponentType(element.type)) {
        // This is temporarily available for custom components that are not string
        // represenations. I.e. ART. Once those are updated to use the string
        // representation, we can drop this code path.
        instance = new element.type(element);
      } else {
        instance = new ReactCompositeComponentWrapper();
      }
    } else if (typeof node === 'string' || typeof node === 'number') {
      instance = ReactNativeComponent.createInstanceForText(node);
    } else {
      (true ? invariant(
        false,
        'Encountered invalid React node of type %s',
        typeof node
      ) : invariant(false));
    }
  
    if (true) {
      (true ? warning(
        typeof instance.construct === 'function' &&
        typeof instance.mountComponent === 'function' &&
        typeof instance.receiveComponent === 'function' &&
        typeof instance.unmountComponent === 'function',
        'Only React Components can be mounted.'
      ) : null);
    }
  
    // Sets up the instance. This can probably just move into the constructor now.
    instance.construct(node);
  
    // These two fields are used by the DOM and ART diffing algorithms
    // respectively. Instead of using expandos on components, we should be
    // storing the state needed by the diffing algorithms elsewhere.
    instance._mountIndex = 0;
    instance._mountImage = null;
  
    if (true) {
      instance._isOwnerNecessary = false;
      instance._warnedAboutRefsInRender = false;
    }
  
    // Internal instances should fully constructed at this point, so they should
    // not get any new fields added to them at this point.
    if (true) {
      if (Object.preventExtensions) {
        Object.preventExtensions(instance);
      }
    }
  
    return instance;
  }
  
  module.exports = instantiateReactComponent;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule isEventSupported
   */
  
  'use strict';
  
  var ExecutionEnvironment = __webpack_require__(7);
  
  var useHasFeature;
  if (ExecutionEnvironment.canUseDOM) {
    useHasFeature =
      document.implementation &&
      document.implementation.hasFeature &&
      // always returns true in newer browsers as per the standard.
      // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
      document.implementation.hasFeature('', '') !== true;
  }
  
  /**
   * Checks if an event is supported in the current execution environment.
   *
   * NOTE: This will not work correctly for non-generic events such as `change`,
   * `reset`, `load`, `error`, and `select`.
   *
   * Borrows from Modernizr.
   *
   * @param {string} eventNameSuffix Event name, e.g. "click".
   * @param {?boolean} capture Check if the capture phase is supported.
   * @return {boolean} True if the event is supported.
   * @internal
   * @license Modernizr 3.0.0pre (Custom Build) | MIT
   */
  function isEventSupported(eventNameSuffix, capture) {
    if (!ExecutionEnvironment.canUseDOM ||
        capture && !('addEventListener' in document)) {
      return false;
    }
  
    var eventName = 'on' + eventNameSuffix;
    var isSupported = eventName in document;
  
    if (!isSupported) {
      var element = document.createElement('div');
      element.setAttribute(eventName, 'return;');
      isSupported = typeof element[eventName] === 'function';
    }
  
    if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
      // This is the only way to test support for the `wheel` event in IE9+.
      isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
    }
  
    return isSupported;
  }
  
  module.exports = isEventSupported;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule setInnerHTML
   */
  
  /* globals MSApp */
  
  'use strict';
  
  var ExecutionEnvironment = __webpack_require__(7);
  
  var WHITESPACE_TEST = /^[ \r\n\t\f]/;
  var NONVISIBLE_TEST = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/;
  
  /**
   * Set the innerHTML property of a node, ensuring that whitespace is preserved
   * even in IE8.
   *
   * @param {DOMElement} node
   * @param {string} html
   * @internal
   */
  var setInnerHTML = function(node, html) {
    node.innerHTML = html;
  };
  
  // Win8 apps: Allow all html to be inserted
  if (typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction) {
    setInnerHTML = function(node, html) {
      MSApp.execUnsafeLocalFunction(function() {
        node.innerHTML = html;
      });
    };
  }
  
  if (ExecutionEnvironment.canUseDOM) {
    // IE8: When updating a just created node with innerHTML only leading
    // whitespace is removed. When updating an existing node with innerHTML
    // whitespace in root TextNodes is also collapsed.
    // @see quirksmode.org/bugreports/archives/2004/11/innerhtml_and_t.html
  
    // Feature detection; only IE8 is known to behave improperly like this.
    var testElement = document.createElement('div');
    testElement.innerHTML = ' ';
    if (testElement.innerHTML === '') {
      setInnerHTML = function(node, html) {
        // Magic theory: IE8 supposedly differentiates between added and updated
        // nodes when processing innerHTML, innerHTML on updated nodes suffers
        // from worse whitespace behavior. Re-adding a node like this triggers
        // the initial and more favorable whitespace behavior.
        // TODO: What to do on a detached node?
        if (node.parentNode) {
          node.parentNode.replaceChild(node, node);
        }
  
        // We also implement a workaround for non-visible tags disappearing into
        // thin air on IE8, this only happens if there is no visible text
        // in-front of the non-visible tags. Piggyback on the whitespace fix
        // and simply check if any non-visible tags appear in the source.
        if (WHITESPACE_TEST.test(html) ||
            html[0] === '<' && NONVISIBLE_TEST.test(html)) {
          // Recover leading whitespace by temporarily prepending any character.
          // \uFEFF has the potential advantage of being zero-width/invisible.
          node.innerHTML = '\uFEFF' + html;
  
          // deleteData leaves an empty `TextNode` which offsets the index of all
          // children. Definitely want to avoid this.
          var textNode = node.firstChild;
          if (textNode.data.length === 1) {
            node.removeChild(textNode);
          } else {
            textNode.deleteData(0, 1);
          }
        } else {
          node.innerHTML = html;
        }
      };
    }
  }
  
  module.exports = setInnerHTML;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule shouldUpdateReactComponent
   * @typechecks static-only
   */
  
  'use strict';
  
  var warning = __webpack_require__(6);
  
  /**
   * Given a `prevElement` and `nextElement`, determines if the existing
   * instance should be updated as opposed to being destroyed or replaced by a new
   * instance. Both arguments are elements. This ensures that this logic can
   * operate on stateless trees without any backing instance.
   *
   * @param {?object} prevElement
   * @param {?object} nextElement
   * @return {boolean} True if the existing instance should be updated.
   * @protected
   */
  function shouldUpdateReactComponent(prevElement, nextElement) {
    if (prevElement != null && nextElement != null) {
      var prevType = typeof prevElement;
      var nextType = typeof nextElement;
      if (prevType === 'string' || prevType === 'number') {
        return (nextType === 'string' || nextType === 'number');
      } else {
        if (nextType === 'object' &&
            prevElement.type === nextElement.type &&
            prevElement.key === nextElement.key) {
          var ownersMatch = prevElement._owner === nextElement._owner;
          var prevName = null;
          var nextName = null;
          var nextDisplayName = null;
          if (true) {
            if (!ownersMatch) {
              if (prevElement._owner != null &&
                  prevElement._owner.getPublicInstance() != null &&
                  prevElement._owner.getPublicInstance().constructor != null) {
                prevName =
                  prevElement._owner.getPublicInstance().constructor.displayName;
              }
              if (nextElement._owner != null &&
                  nextElement._owner.getPublicInstance() != null &&
                  nextElement._owner.getPublicInstance().constructor != null) {
                nextName =
                  nextElement._owner.getPublicInstance().constructor.displayName;
              }
              if (nextElement.type != null &&
                  nextElement.type.displayName != null) {
                nextDisplayName = nextElement.type.displayName;
              }
              if (nextElement.type != null && typeof nextElement.type === 'string') {
                nextDisplayName = nextElement.type;
              }
              if (typeof nextElement.type !== 'string' ||
                  nextElement.type === 'input' ||
                  nextElement.type === 'textarea') {
                if ((prevElement._owner != null &&
                    prevElement._owner._isOwnerNecessary === false) ||
                    (nextElement._owner != null &&
                    nextElement._owner._isOwnerNecessary === false)) {
                  if (prevElement._owner != null) {
                    prevElement._owner._isOwnerNecessary = true;
                  }
                  if (nextElement._owner != null) {
                    nextElement._owner._isOwnerNecessary = true;
                  }
                  (true ? warning(
                    false,
                    '<%s /> is being rendered by both %s and %s using the same ' +
                    'key (%s) in the same place. Currently, this means that ' +
                    'they don\'t preserve state. This behavior should be very ' +
                    'rare so we\'re considering deprecating it. Please contact ' +
                    'the React team and explain your use case so that we can ' +
                    'take that into consideration.',
                    nextDisplayName || 'Unknown Component',
                    prevName || '[Unknown]',
                    nextName || '[Unknown]',
                    prevElement.key
                  ) : null);
                }
              }
            }
          }
          return ownersMatch;
        }
      }
    }
    return false;
  }
  
  module.exports = shouldUpdateReactComponent;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

  // false -> Array#indexOf
  // true  -> Array#includes
  var $ = __webpack_require__(1);
  module.exports = function(IS_INCLUDES){
    return function($this, el, fromIndex){
      var O      = $.toObject($this)
        , length = $.toLength(O.length)
        , index  = $.toIndex(fromIndex, length)
        , value;
      if(IS_INCLUDES && el != el)while(length > index){
        value = O[index++];
        if(value != value)return true;
      } else for(;length > index; index++)if(IS_INCLUDES || index in O){
        if(O[index] === el)return IS_INCLUDES || index;
      } return !IS_INCLUDES && -1;
    };
  };

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $        = __webpack_require__(1)
    , ctx      = __webpack_require__(26)
    , safe     = __webpack_require__(16).safe
    , assert   = __webpack_require__(9)
    , forOf    = __webpack_require__(37)
    , step     = __webpack_require__(20).step
    , $has     = $.has
    , set      = $.set
    , isObject = $.isObject
    , hide     = $.hide
    , isExtensible = Object.isExtensible || isObject
    , ID       = safe('id')
    , O1       = safe('O1')
    , LAST     = safe('last')
    , FIRST    = safe('first')
    , ITER     = safe('iter')
    , SIZE     = $.DESC ? safe('size') : 'size'
    , id       = 0;
  
  function fastKey(it, create){
    // return primitive with prefix
    if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if(!$has(it, ID)){
      // can't set id to frozen object
      if(!isExtensible(it))return 'F';
      // not necessary to add id
      if(!create)return 'E';
      // add missing object id
      hide(it, ID, ++id);
    // return object id with prefix
    } return 'O' + it[ID];
  }
  
  function getEntry(that, key){
    // fast case
    var index = fastKey(key), entry;
    if(index !== 'F')return that[O1][index];
    // frozen object case
    for(entry = that[FIRST]; entry; entry = entry.n){
      if(entry.k == key)return entry;
    }
  }
  
  module.exports = {
    getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
      var C = wrapper(function(that, iterable){
        assert.inst(that, C, NAME);
        set(that, O1, $.create(null));
        set(that, SIZE, 0);
        set(that, LAST, undefined);
        set(that, FIRST, undefined);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
      });
      __webpack_require__(46)(C.prototype, {
        // 23.1.3.1 Map.prototype.clear()
        // 23.2.3.2 Set.prototype.clear()
        clear: function clear(){
          for(var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n){
            entry.r = true;
            if(entry.p)entry.p = entry.p.n = undefined;
            delete data[entry.i];
          }
          that[FIRST] = that[LAST] = undefined;
          that[SIZE] = 0;
        },
        // 23.1.3.3 Map.prototype.delete(key)
        // 23.2.3.4 Set.prototype.delete(value)
        'delete': function(key){
          var that  = this
            , entry = getEntry(that, key);
          if(entry){
            var next = entry.n
              , prev = entry.p;
            delete that[O1][entry.i];
            entry.r = true;
            if(prev)prev.n = next;
            if(next)next.p = prev;
            if(that[FIRST] == entry)that[FIRST] = next;
            if(that[LAST] == entry)that[LAST] = prev;
            that[SIZE]--;
          } return !!entry;
        },
        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
        forEach: function forEach(callbackfn /*, that = undefined */){
          var f = ctx(callbackfn, arguments[1], 3)
            , entry;
          while(entry = entry ? entry.n : this[FIRST]){
            f(entry.v, entry.k, this);
            // revert to the last existing entry
            while(entry && entry.r)entry = entry.p;
          }
        },
        // 23.1.3.7 Map.prototype.has(key)
        // 23.2.3.7 Set.prototype.has(value)
        has: function has(key){
          return !!getEntry(this, key);
        }
      });
      if($.DESC)$.setDesc(C.prototype, 'size', {
        get: function(){
          return assert.def(this[SIZE]);
        }
      });
      return C;
    },
    def: function(that, key, value){
      var entry = getEntry(that, key)
        , prev, index;
      // change existing entry
      if(entry){
        entry.v = value;
      // create new entry
      } else {
        that[LAST] = entry = {
          i: index = fastKey(key, true), // <- index
          k: key,                        // <- key
          v: value,                      // <- value
          p: prev = that[LAST],          // <- previous entry
          n: undefined,                  // <- next entry
          r: false                       // <- removed
        };
        if(!that[FIRST])that[FIRST] = entry;
        if(prev)prev.n = entry;
        that[SIZE]++;
        // add to index
        if(index !== 'F')that[O1][index] = entry;
      } return that;
    },
    getEntry: getEntry,
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    setIter: function(C, NAME, IS_MAP){
      __webpack_require__(56)(C, NAME, function(iterated, kind){
        set(this, ITER, {o: iterated, k: kind});
      }, function(){
        var iter  = this[ITER]
          , kind  = iter.k
          , entry = iter.l;
        // revert to the last existing entry
        while(entry && entry.r)entry = entry.p;
        // get next entry
        if(!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])){
          // or finish the iteration
          iter.o = undefined;
          return step(1);
        }
        // return step by kind
        if(kind == 'keys'  )return step(0, entry.k);
        if(kind == 'values')return step(0, entry.v);
        return step(0, [entry.k, entry.v]);
      }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
    }
  };

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/DavidBruant/Map-Set.prototype.toJSON
  var $def  = __webpack_require__(3)
    , forOf = __webpack_require__(37);
  module.exports = function(NAME){
    $def($def.P, NAME, {
      toJSON: function toJSON(){
        var arr = [];
        forOf(this, false, arr.push, arr);
        return arr;
      }
    });
  };

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $         = __webpack_require__(1)
    , safe      = __webpack_require__(16).safe
    , assert    = __webpack_require__(9)
    , forOf     = __webpack_require__(37)
    , $has      = $.has
    , isObject  = $.isObject
    , hide      = $.hide
    , isExtensible = Object.isExtensible || isObject
    , id        = 0
    , ID        = safe('id')
    , WEAK      = safe('weak')
    , LEAK      = safe('leak')
    , method    = __webpack_require__(43)
    , find      = method(5)
    , findIndex = method(6);
  function findFrozen(store, key){
    return find(store.array, function(it){
      return it[0] === key;
    });
  }
  // fallback for frozen keys
  function leakStore(that){
    return that[LEAK] || hide(that, LEAK, {
      array: [],
      get: function(key){
        var entry = findFrozen(this, key);
        if(entry)return entry[1];
      },
      has: function(key){
        return !!findFrozen(this, key);
      },
      set: function(key, value){
        var entry = findFrozen(this, key);
        if(entry)entry[1] = value;
        else this.array.push([key, value]);
      },
      'delete': function(key){
        var index = findIndex(this.array, function(it){
          return it[0] === key;
        });
        if(~index)this.array.splice(index, 1);
        return !!~index;
      }
    })[LEAK];
  }
  
  module.exports = {
    getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
      var C = wrapper(function(that, iterable){
        $.set(assert.inst(that, C, NAME), ID, id++);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
      });
      __webpack_require__(46)(C.prototype, {
        // 23.3.3.2 WeakMap.prototype.delete(key)
        // 23.4.3.3 WeakSet.prototype.delete(value)
        'delete': function(key){
          if(!isObject(key))return false;
          if(!isExtensible(key))return leakStore(this)['delete'](key);
          return $has(key, WEAK) && $has(key[WEAK], this[ID]) && delete key[WEAK][this[ID]];
        },
        // 23.3.3.4 WeakMap.prototype.has(key)
        // 23.4.3.4 WeakSet.prototype.has(value)
        has: function has(key){
          if(!isObject(key))return false;
          if(!isExtensible(key))return leakStore(this).has(key);
          return $has(key, WEAK) && $has(key[WEAK], this[ID]);
        }
      });
      return C;
    },
    def: function(that, key, value){
      if(!isExtensible(assert.obj(key))){
        leakStore(that).set(key, value);
      } else {
        $has(key, WEAK) || hide(key, WEAK, {});
        key[WEAK][that[ID]] = value;
      } return that;
    },
    leakStore: leakStore,
    WEAK: WEAK,
    ID: ID
  };

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

  var $        = __webpack_require__(1)
    , document = $.g.document
    , isObject = $.isObject
    // in old IE typeof document.createElement is 'object'
    , is = isObject(document) && isObject(document.createElement);
  module.exports = function(it){
    return is ? document.createElement(it) : {};
  };

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(1);
  module.exports = function(it){
    var keys       = $.getKeys(it)
      , getDesc    = $.getDesc
      , getSymbols = $.getSymbols;
    if(getSymbols)$.each.call(getSymbols(it), function(key){
      if(getDesc(it, key).enumerable)keys.push(key);
    });
    return keys;
  };

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  var $ = __webpack_require__(1)
    , toString = {}.toString
    , getNames = $.getNames;
  
  var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];
  
  function getWindowNames(it){
    try {
      return getNames(it);
    } catch(e){
      return windowNames.slice();
    }
  }
  
  module.exports.get = function getOwnPropertyNames(it){
    if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
    return getNames($.toObject(it));
  };

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

  var assertObject = __webpack_require__(9).obj;
  function close(iterator){
    var ret = iterator['return'];
    if(ret !== undefined)assertObject(ret.call(iterator));
  }
  function call(iterator, fn, value, entries){
    try {
      return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
    } catch(e){
      close(iterator);
      throw e;
    }
  }
  call.close = close;
  module.exports = call;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

  var $            = __webpack_require__(1)
    , assertObject = __webpack_require__(9).obj;
  module.exports = function ownKeys(it){
    assertObject(it);
    var keys       = $.getNames(it)
      , getSymbols = $.getSymbols;
    return getSymbols ? keys.concat(getSymbols(it)) : keys;
  };

/***/ },
/* 97 */
/***/ function(module, exports) {

  module.exports = Object.is || function is(x, y){
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

  // http://wiki.ecmascript.org/doku.php?id=strawman:string_padding
  var $      = __webpack_require__(1)
    , repeat = __webpack_require__(99);
  
  module.exports = function(that, minLength, fillChar, left){
    // 1. Let O be CheckObjectCoercible(this value).
    // 2. Let S be ToString(O).
    var S = String($.assertDefined(that));
    // 4. If intMinLength is undefined, return S.
    if(minLength === undefined)return S;
    // 4. Let intMinLength be ToInteger(minLength).
    var intMinLength = $.toInteger(minLength);
    // 5. Let fillLen be the number of characters in S minus intMinLength.
    var fillLen = intMinLength - S.length;
    // 6. If fillLen < 0, then throw a RangeError exception.
    // 7. If fillLen is +∞, then throw a RangeError exception.
    if(fillLen < 0 || fillLen === Infinity){
      throw new RangeError('Cannot satisfy string length ' + minLength + ' for string: ' + S);
    }
    // 8. Let sFillStr be the string represented by fillStr.
    // 9. If sFillStr is undefined, let sFillStr be a space character.
    var sFillStr = fillChar === undefined ? ' ' : String(fillChar);
    // 10. Let sFillVal be a String made of sFillStr, repeated until fillLen is met.
    var sFillVal = repeat.call(sFillStr, Math.ceil(fillLen / sFillStr.length));
    // truncate if we overflowed
    if(sFillVal.length > fillLen)sFillVal = left
      ? sFillVal.slice(sFillVal.length - fillLen)
      : sFillVal.slice(0, fillLen);
    // 11. Return a string made from sFillVal, followed by S.
    // 11. Return a String made from S, followed by sFillVal.
    return left ? sFillVal.concat(S) : S.concat(sFillVal);
  };

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $ = __webpack_require__(1);
  
  module.exports = function repeat(count){
    var str = String($.assertDefined(this))
      , res = ''
      , n   = $.toInteger(count);
    if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
    for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
    return res;
  };

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $      = __webpack_require__(1)
    , ctx    = __webpack_require__(26)
    , cof    = __webpack_require__(10)
    , invoke = __webpack_require__(45)
    , cel    = __webpack_require__(92)
    , global             = $.g
    , isFunction         = $.isFunction
    , html               = $.html
    , process            = global.process
    , setTask            = global.setImmediate
    , clearTask          = global.clearImmediate
    , MessageChannel     = global.MessageChannel
    , counter            = 0
    , queue              = {}
    , ONREADYSTATECHANGE = 'onreadystatechange'
    , defer, channel, port;
  function run(){
    var id = +this;
    if($.has(queue, id)){
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  }
  function listner(event){
    run.call(event.data);
  }
  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if(!isFunction(setTask) || !isFunction(clearTask)){
    setTask = function(fn){
      var args = [], i = 1;
      while(arguments.length > i)args.push(arguments[i++]);
      queue[++counter] = function(){
        invoke(isFunction(fn) ? fn : Function(fn), args);
      };
      defer(counter);
      return counter;
    };
    clearTask = function(id){
      delete queue[id];
    };
    // Node.js 0.8-
    if(cof(process) == 'process'){
      defer = function(id){
        process.nextTick(ctx(run, id, 1));
      };
    // Modern browsers, skip implementation for WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is object
    } else if(global.addEventListener && isFunction(global.postMessage) && !global.importScripts){
      defer = function(id){
        global.postMessage(id, '*');
      };
      global.addEventListener('message', listner, false);
    // WebWorkers
    } else if(isFunction(MessageChannel)){
      channel = new MessageChannel;
      port    = channel.port2;
      channel.port1.onmessage = listner;
      defer = ctx(port.postMessage, port, 1);
    // IE8-
    } else if(ONREADYSTATECHANGE in cel('script')){
      defer = function(id){
        html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
          html.removeChild(this);
          run.call(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function(id){
        setTimeout(ctx(run, id, 1), 0);
      };
    }
  }
  module.exports = {
    set:   setTask,
    clear: clearTask
  };

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

  var $          = __webpack_require__(1)
    , setUnscope = __webpack_require__(31)
    , ITER       = __webpack_require__(16).safe('iter')
    , $iter      = __webpack_require__(20)
    , step       = $iter.step
    , Iterators  = $iter.Iterators;
  
  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  __webpack_require__(56)(Array, 'Array', function(iterated, kind){
    $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function(){
    var iter  = this[ITER]
      , O     = iter.o
      , kind  = iter.k
      , index = iter.i++;
    if(!O || index >= O.length){
      iter.o = undefined;
      return step(1);
    }
    if(kind == 'keys'  )return step(0, index);
    if(kind == 'values')return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');
  
  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  Iterators.Arguments = Iterators.Array;
  
  setUnscope('keys');
  setUnscope('values');
  setUnscope('entries');

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  //
  // We store our EE objects in a plain object whose properties are event names.
  // If `Object.create(null)` is not supported we prefix the event names with a
  // `~` to make sure that the built-in object properties are not overridden or
  // used as an attack vector.
  // We also assume that `Object.create(null)` is available when the event name
  // is an ES6 Symbol.
  //
  var prefix = typeof Object.create !== 'function' ? '~' : false;
  
  /**
   * Representation of a single EventEmitter function.
   *
   * @param {Function} fn Event handler to be called.
   * @param {Mixed} context Context for function execution.
   * @param {Boolean} once Only emit once
   * @api private
   */
  function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  }
  
  /**
   * Minimal EventEmitter interface that is molded against the Node.js
   * EventEmitter interface.
   *
   * @constructor
   * @api public
   */
  function EventEmitter() { /* Nothing to set */ }
  
  /**
   * Holds the assigned EventEmitters by name.
   *
   * @type {Object}
   * @private
   */
  EventEmitter.prototype._events = undefined;
  
  /**
   * Return a list of assigned event listeners.
   *
   * @param {String} event The events that should be listed.
   * @param {Boolean} exists We only need to know if there are listeners.
   * @returns {Array|Boolean}
   * @api public
   */
  EventEmitter.prototype.listeners = function listeners(event, exists) {
    var evt = prefix ? prefix + event : event
      , available = this._events && this._events[evt];
  
    if (exists) return !!available;
    if (!available) return [];
    if (available.fn) return [available.fn];
  
    for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
      ee[i] = available[i].fn;
    }
  
    return ee;
  };
  
  /**
   * Emit an event to all registered event listeners.
   *
   * @param {String} event The name of the event.
   * @returns {Boolean} Indication if we've emitted an event.
   * @api public
   */
  EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
  
    if (!this._events || !this._events[evt]) return false;
  
    var listeners = this._events[evt]
      , len = arguments.length
      , args
      , i;
  
    if ('function' === typeof listeners.fn) {
      if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
  
      switch (len) {
        case 1: return listeners.fn.call(listeners.context), true;
        case 2: return listeners.fn.call(listeners.context, a1), true;
        case 3: return listeners.fn.call(listeners.context, a1, a2), true;
        case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }
  
      for (i = 1, args = new Array(len -1); i < len; i++) {
        args[i - 1] = arguments[i];
      }
  
      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length
        , j;
  
      for (i = 0; i < length; i++) {
        if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
  
        switch (len) {
          case 1: listeners[i].fn.call(listeners[i].context); break;
          case 2: listeners[i].fn.call(listeners[i].context, a1); break;
          case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
          default:
            if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
              args[j - 1] = arguments[j];
            }
  
            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }
  
    return true;
  };
  
  /**
   * Register a new EventListener for the given event.
   *
   * @param {String} event Name of the event.
   * @param {Functon} fn Callback function.
   * @param {Mixed} context The context of the function.
   * @api public
   */
  EventEmitter.prototype.on = function on(event, fn, context) {
    var listener = new EE(fn, context || this)
      , evt = prefix ? prefix + event : event;
  
    if (!this._events) this._events = prefix ? {} : Object.create(null);
    if (!this._events[evt]) this._events[evt] = listener;
    else {
      if (!this._events[evt].fn) this._events[evt].push(listener);
      else this._events[evt] = [
        this._events[evt], listener
      ];
    }
  
    return this;
  };
  
  /**
   * Add an EventListener that's only called once.
   *
   * @param {String} event Name of the event.
   * @param {Function} fn Callback function.
   * @param {Mixed} context The context of the function.
   * @api public
   */
  EventEmitter.prototype.once = function once(event, fn, context) {
    var listener = new EE(fn, context || this, true)
      , evt = prefix ? prefix + event : event;
  
    if (!this._events) this._events = prefix ? {} : Object.create(null);
    if (!this._events[evt]) this._events[evt] = listener;
    else {
      if (!this._events[evt].fn) this._events[evt].push(listener);
      else this._events[evt] = [
        this._events[evt], listener
      ];
    }
  
    return this;
  };
  
  /**
   * Remove event listeners.
   *
   * @param {String} event The event we want to remove.
   * @param {Function} fn The listener that we need to find.
   * @param {Mixed} context Only remove listeners matching this context.
   * @param {Boolean} once Only remove once listeners.
   * @api public
   */
  EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
  
    if (!this._events || !this._events[evt]) return this;
  
    var listeners = this._events[evt]
      , events = [];
  
    if (fn) {
      if (listeners.fn) {
        if (
             listeners.fn !== fn
          || (once && !listeners.once)
          || (context && listeners.context !== context)
        ) {
          events.push(listeners);
        }
      } else {
        for (var i = 0, length = listeners.length; i < length; i++) {
          if (
               listeners[i].fn !== fn
            || (once && !listeners[i].once)
            || (context && listeners[i].context !== context)
          ) {
            events.push(listeners[i]);
          }
        }
      }
    }
  
    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) {
      this._events[evt] = events.length === 1 ? events[0] : events;
    } else {
      delete this._events[evt];
    }
  
    return this;
  };
  
  /**
   * Remove all listeners or only the listeners for the specified event.
   *
   * @param {String} event The event want to remove all listeners for.
   * @api public
   */
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    if (!this._events) return this;
  
    if (event) delete this._events[prefix ? prefix + event : event];
    else this._events = prefix ? {} : Object.create(null);
  
    return this;
  };
  
  //
  // Alias methods names because people roll like that.
  //
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.addListener = EventEmitter.prototype.on;
  
  //
  // This function doesn't apply anymore.
  //
  EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
    return this;
  };
  
  //
  // Expose the prefix.
  //
  EventEmitter.prefixed = prefix;
  
  //
  // Expose the module.
  //
  if (true) {
    module.exports = EventEmitter;
  }


/***/ },
/* 103 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule CSSProperty
   */
  
  'use strict';
  
  /**
   * CSS properties which accept numbers but are not in units of "px".
   */
  var isUnitlessNumber = {
    boxFlex: true,
    boxFlexGroup: true,
    columnCount: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true,
    zoom: true,
  
    // SVG-related properties
    fillOpacity: true,
    strokeDashoffset: true,
    strokeOpacity: true,
    strokeWidth: true
  };
  
  /**
   * @param {string} prefix vendor-specific prefix, eg: Webkit
   * @param {string} key style name, eg: transitionDuration
   * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
   * WebkitTransitionDuration
   */
  function prefixKey(prefix, key) {
    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
  }
  
  /**
   * Support style names that may come passed in prefixed by adding permutations
   * of vendor prefixes.
   */
  var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
  
  // Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
  // infinite loop, because it iterates over the newly added props too.
  Object.keys(isUnitlessNumber).forEach(function(prop) {
    prefixes.forEach(function(prefix) {
      isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
    });
  });
  
  /**
   * Most style properties can be unset by doing .style[prop] = '' but IE8
   * doesn't like doing that with shorthand properties so for the properties that
   * IE8 breaks on, which are listed here, we instead unset each of the
   * individual properties. See http://bugs.jquery.com/ticket/12385.
   * The 4-value 'clock' properties like margin, padding, border-width seem to
   * behave without any problems. Curiously, list-style works too without any
   * special prodding.
   */
  var shorthandPropertyExpansions = {
    background: {
      backgroundImage: true,
      backgroundPosition: true,
      backgroundRepeat: true,
      backgroundColor: true
    },
    border: {
      borderWidth: true,
      borderStyle: true,
      borderColor: true
    },
    borderBottom: {
      borderBottomWidth: true,
      borderBottomStyle: true,
      borderBottomColor: true
    },
    borderLeft: {
      borderLeftWidth: true,
      borderLeftStyle: true,
      borderLeftColor: true
    },
    borderRight: {
      borderRightWidth: true,
      borderRightStyle: true,
      borderRightColor: true
    },
    borderTop: {
      borderTopWidth: true,
      borderTopStyle: true,
      borderTopColor: true
    },
    font: {
      fontStyle: true,
      fontVariant: true,
      fontWeight: true,
      fontSize: true,
      lineHeight: true,
      fontFamily: true
    }
  };
  
  var CSSProperty = {
    isUnitlessNumber: isUnitlessNumber,
    shorthandPropertyExpansions: shorthandPropertyExpansions
  };
  
  module.exports = CSSProperty;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule CSSPropertyOperations
   * @typechecks static-only
   */
  
  'use strict';
  
  var CSSProperty = __webpack_require__(103);
  var ExecutionEnvironment = __webpack_require__(7);
  
  var camelizeStyleName = __webpack_require__(265);
  var dangerousStyleValue = __webpack_require__(269);
  var hyphenateStyleName = __webpack_require__(276);
  var memoizeStringOnly = __webpack_require__(279);
  var warning = __webpack_require__(6);
  
  var processStyleName = memoizeStringOnly(function(styleName) {
    return hyphenateStyleName(styleName);
  });
  
  var styleFloatAccessor = 'cssFloat';
  if (ExecutionEnvironment.canUseDOM) {
    // IE8 only supports accessing cssFloat (standard) as styleFloat
    if (document.documentElement.style.cssFloat === undefined) {
      styleFloatAccessor = 'styleFloat';
    }
  }
  
  if (true) {
    // 'msTransform' is correct, but the other prefixes should be capitalized
    var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
  
    // style values shouldn't contain a semicolon
    var badStyleValueWithSemicolonPattern = /;\s*$/;
  
    var warnedStyleNames = {};
    var warnedStyleValues = {};
  
    var warnHyphenatedStyleName = function(name) {
      if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
        return;
      }
  
      warnedStyleNames[name] = true;
      (true ? warning(
        false,
        'Unsupported style property %s. Did you mean %s?',
        name,
        camelizeStyleName(name)
      ) : null);
    };
  
    var warnBadVendoredStyleName = function(name) {
      if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
        return;
      }
  
      warnedStyleNames[name] = true;
      (true ? warning(
        false,
        'Unsupported vendor-prefixed style property %s. Did you mean %s?',
        name,
        name.charAt(0).toUpperCase() + name.slice(1)
      ) : null);
    };
  
    var warnStyleValueWithSemicolon = function(name, value) {
      if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
        return;
      }
  
      warnedStyleValues[value] = true;
      (true ? warning(
        false,
        'Style property values shouldn\'t contain a semicolon. ' +
        'Try "%s: %s" instead.',
        name,
        value.replace(badStyleValueWithSemicolonPattern, '')
      ) : null);
    };
  
    /**
     * @param {string} name
     * @param {*} value
     */
    var warnValidStyle = function(name, value) {
      if (name.indexOf('-') > -1) {
        warnHyphenatedStyleName(name);
      } else if (badVendoredStyleNamePattern.test(name)) {
        warnBadVendoredStyleName(name);
      } else if (badStyleValueWithSemicolonPattern.test(value)) {
        warnStyleValueWithSemicolon(name, value);
      }
    };
  }
  
  /**
   * Operations for dealing with CSS properties.
   */
  var CSSPropertyOperations = {
  
    /**
     * Serializes a mapping of style properties for use as inline styles:
     *
     *   > createMarkupForStyles({width: '200px', height: 0})
     *   "width:200px;height:0;"
     *
     * Undefined values are ignored so that declarative programming is easier.
     * The result should be HTML-escaped before insertion into the DOM.
     *
     * @param {object} styles
     * @return {?string}
     */
    createMarkupForStyles: function(styles) {
      var serialized = '';
      for (var styleName in styles) {
        if (!styles.hasOwnProperty(styleName)) {
          continue;
        }
        var styleValue = styles[styleName];
        if (true) {
          warnValidStyle(styleName, styleValue);
        }
        if (styleValue != null) {
          serialized += processStyleName(styleName) + ':';
          serialized += dangerousStyleValue(styleName, styleValue) + ';';
        }
      }
      return serialized || null;
    },
  
    /**
     * Sets the value for multiple styles on a node.  If a value is specified as
     * '' (empty string), the corresponding style property will be unset.
     *
     * @param {DOMElement} node
     * @param {object} styles
     */
    setValueForStyles: function(node, styles) {
      var style = node.style;
      for (var styleName in styles) {
        if (!styles.hasOwnProperty(styleName)) {
          continue;
        }
        if (true) {
          warnValidStyle(styleName, styles[styleName]);
        }
        var styleValue = dangerousStyleValue(styleName, styles[styleName]);
        if (styleName === 'float') {
          styleName = styleFloatAccessor;
        }
        if (styleValue) {
          style[styleName] = styleValue;
        } else {
          var expansion = CSSProperty.shorthandPropertyExpansions[styleName];
          if (expansion) {
            // Shorthand property that IE8 won't like unsetting, so unset each
            // component to placate it
            for (var individualStyleName in expansion) {
              style[individualStyleName] = '';
            }
          } else {
            style[styleName] = '';
          }
        }
      }
    }
  
  };
  
  module.exports = CSSPropertyOperations;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule EventPluginRegistry
   * @typechecks static-only
   */
  
  'use strict';
  
  var invariant = __webpack_require__(2);
  
  /**
   * Injectable ordering of event plugins.
   */
  var EventPluginOrder = null;
  
  /**
   * Injectable mapping from names to event plugin modules.
   */
  var namesToPlugins = {};
  
  /**
   * Recomputes the plugin list using the injected plugins and plugin ordering.
   *
   * @private
   */
  function recomputePluginOrdering() {
    if (!EventPluginOrder) {
      // Wait until an `EventPluginOrder` is injected.
      return;
    }
    for (var pluginName in namesToPlugins) {
      var PluginModule = namesToPlugins[pluginName];
      var pluginIndex = EventPluginOrder.indexOf(pluginName);
      (true ? invariant(
        pluginIndex > -1,
        'EventPluginRegistry: Cannot inject event plugins that do not exist in ' +
        'the plugin ordering, `%s`.',
        pluginName
      ) : invariant(pluginIndex > -1));
      if (EventPluginRegistry.plugins[pluginIndex]) {
        continue;
      }
      (true ? invariant(
        PluginModule.extractEvents,
        'EventPluginRegistry: Event plugins must implement an `extractEvents` ' +
        'method, but `%s` does not.',
        pluginName
      ) : invariant(PluginModule.extractEvents));
      EventPluginRegistry.plugins[pluginIndex] = PluginModule;
      var publishedEvents = PluginModule.eventTypes;
      for (var eventName in publishedEvents) {
        (true ? invariant(
          publishEventForPlugin(
            publishedEvents[eventName],
            PluginModule,
            eventName
          ),
          'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.',
          eventName,
          pluginName
        ) : invariant(publishEventForPlugin(
          publishedEvents[eventName],
          PluginModule,
          eventName
        )));
      }
    }
  }
  
  /**
   * Publishes an event so that it can be dispatched by the supplied plugin.
   *
   * @param {object} dispatchConfig Dispatch configuration for the event.
   * @param {object} PluginModule Plugin publishing the event.
   * @return {boolean} True if the event was successfully published.
   * @private
   */
  function publishEventForPlugin(dispatchConfig, PluginModule, eventName) {
    (true ? invariant(
      !EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName),
      'EventPluginHub: More than one plugin attempted to publish the same ' +
      'event name, `%s`.',
      eventName
    ) : invariant(!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName)));
    EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;
  
    var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
    if (phasedRegistrationNames) {
      for (var phaseName in phasedRegistrationNames) {
        if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
          var phasedRegistrationName = phasedRegistrationNames[phaseName];
          publishRegistrationName(
            phasedRegistrationName,
            PluginModule,
            eventName
          );
        }
      }
      return true;
    } else if (dispatchConfig.registrationName) {
      publishRegistrationName(
        dispatchConfig.registrationName,
        PluginModule,
        eventName
      );
      return true;
    }
    return false;
  }
  
  /**
   * Publishes a registration name that is used to identify dispatched events and
   * can be used with `EventPluginHub.putListener` to register listeners.
   *
   * @param {string} registrationName Registration name to add.
   * @param {object} PluginModule Plugin publishing the event.
   * @private
   */
  function publishRegistrationName(registrationName, PluginModule, eventName) {
    (true ? invariant(
      !EventPluginRegistry.registrationNameModules[registrationName],
      'EventPluginHub: More than one plugin attempted to publish the same ' +
      'registration name, `%s`.',
      registrationName
    ) : invariant(!EventPluginRegistry.registrationNameModules[registrationName]));
    EventPluginRegistry.registrationNameModules[registrationName] = PluginModule;
    EventPluginRegistry.registrationNameDependencies[registrationName] =
      PluginModule.eventTypes[eventName].dependencies;
  }
  
  /**
   * Registers plugins so that they can extract and dispatch events.
   *
   * @see {EventPluginHub}
   */
  var EventPluginRegistry = {
  
    /**
     * Ordered list of injected plugins.
     */
    plugins: [],
  
    /**
     * Mapping from event name to dispatch config
     */
    eventNameDispatchConfigs: {},
  
    /**
     * Mapping from registration name to plugin module
     */
    registrationNameModules: {},
  
    /**
     * Mapping from registration name to event name
     */
    registrationNameDependencies: {},
  
    /**
     * Injects an ordering of plugins (by plugin name). This allows the ordering
     * to be decoupled from injection of the actual plugins so that ordering is
     * always deterministic regardless of packaging, on-the-fly injection, etc.
     *
     * @param {array} InjectedEventPluginOrder
     * @internal
     * @see {EventPluginHub.injection.injectEventPluginOrder}
     */
    injectEventPluginOrder: function(InjectedEventPluginOrder) {
      (true ? invariant(
        !EventPluginOrder,
        'EventPluginRegistry: Cannot inject event plugin ordering more than ' +
        'once. You are likely trying to load more than one copy of React.'
      ) : invariant(!EventPluginOrder));
      // Clone the ordering so it cannot be dynamically mutated.
      EventPluginOrder = Array.prototype.slice.call(InjectedEventPluginOrder);
      recomputePluginOrdering();
    },
  
    /**
     * Injects plugins to be used by `EventPluginHub`. The plugin names must be
     * in the ordering injected by `injectEventPluginOrder`.
     *
     * Plugins can be injected as part of page initialization or on-the-fly.
     *
     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
     * @internal
     * @see {EventPluginHub.injection.injectEventPluginsByName}
     */
    injectEventPluginsByName: function(injectedNamesToPlugins) {
      var isOrderingDirty = false;
      for (var pluginName in injectedNamesToPlugins) {
        if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
          continue;
        }
        var PluginModule = injectedNamesToPlugins[pluginName];
        if (!namesToPlugins.hasOwnProperty(pluginName) ||
            namesToPlugins[pluginName] !== PluginModule) {
          (true ? invariant(
            !namesToPlugins[pluginName],
            'EventPluginRegistry: Cannot inject two different event plugins ' +
            'using the same name, `%s`.',
            pluginName
          ) : invariant(!namesToPlugins[pluginName]));
          namesToPlugins[pluginName] = PluginModule;
          isOrderingDirty = true;
        }
      }
      if (isOrderingDirty) {
        recomputePluginOrdering();
      }
    },
  
    /**
     * Looks up the plugin for the supplied event.
     *
     * @param {object} event A synthetic event.
     * @return {?object} The plugin that created the supplied event.
     * @internal
     */
    getPluginModuleForEvent: function(event) {
      var dispatchConfig = event.dispatchConfig;
      if (dispatchConfig.registrationName) {
        return EventPluginRegistry.registrationNameModules[
          dispatchConfig.registrationName
        ] || null;
      }
      for (var phase in dispatchConfig.phasedRegistrationNames) {
        if (!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)) {
          continue;
        }
        var PluginModule = EventPluginRegistry.registrationNameModules[
          dispatchConfig.phasedRegistrationNames[phase]
        ];
        if (PluginModule) {
          return PluginModule;
        }
      }
      return null;
    },
  
    /**
     * Exposed for unit testing.
     * @private
     */
    _resetEventPlugins: function() {
      EventPluginOrder = null;
      for (var pluginName in namesToPlugins) {
        if (namesToPlugins.hasOwnProperty(pluginName)) {
          delete namesToPlugins[pluginName];
        }
      }
      EventPluginRegistry.plugins.length = 0;
  
      var eventNameDispatchConfigs = EventPluginRegistry.eventNameDispatchConfigs;
      for (var eventName in eventNameDispatchConfigs) {
        if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
          delete eventNameDispatchConfigs[eventName];
        }
      }
  
      var registrationNameModules = EventPluginRegistry.registrationNameModules;
      for (var registrationName in registrationNameModules) {
        if (registrationNameModules.hasOwnProperty(registrationName)) {
          delete registrationNameModules[registrationName];
        }
      }
    }
  
  };
  
  module.exports = EventPluginRegistry;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactComponent
   */
  
  'use strict';
  
  var ReactUpdateQueue = __webpack_require__(78);
  
  var invariant = __webpack_require__(2);
  var warning = __webpack_require__(6);
  
  /**
   * Base class helpers for the updating state of a component.
   */
  function ReactComponent(props, context) {
    this.props = props;
    this.context = context;
  }
  
  /**
   * Sets a subset of the state. Always use this to mutate
   * state. You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * There is no guarantee that calls to `setState` will run synchronously,
   * as they may eventually be batched together.  You can provide an optional
   * callback that will be executed when the call to setState is actually
   * completed.
   *
   * When a function is provided to setState, it will be called at some point in
   * the future (not synchronously). It will be called with the up to date
   * component arguments (state, props, context). These values can be different
   * from this.* because your function may be called after receiveProps but before
   * shouldComponentUpdate, and this new state, props, and context will not yet be
   * assigned to this.
   *
   * @param {object|function} partialState Next partial state or function to
   *        produce next partial state to be merged with current state.
   * @param {?function} callback Called after state is updated.
   * @final
   * @protected
   */
  ReactComponent.prototype.setState = function(partialState, callback) {
    (true ? invariant(
      typeof partialState === 'object' ||
      typeof partialState === 'function' ||
      partialState == null,
      'setState(...): takes an object of state variables to update or a ' +
      'function which returns an object of state variables.'
    ) : invariant(typeof partialState === 'object' ||
    typeof partialState === 'function' ||
    partialState == null));
    if (true) {
      (true ? warning(
        partialState != null,
        'setState(...): You passed an undefined or null state object; ' +
        'instead, use forceUpdate().'
      ) : null);
    }
    ReactUpdateQueue.enqueueSetState(this, partialState);
    if (callback) {
      ReactUpdateQueue.enqueueCallback(this, callback);
    }
  };
  
  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {?function} callback Called after update is complete.
   * @final
   * @protected
   */
  ReactComponent.prototype.forceUpdate = function(callback) {
    ReactUpdateQueue.enqueueForceUpdate(this);
    if (callback) {
      ReactUpdateQueue.enqueueCallback(this, callback);
    }
  };
  
  /**
   * Deprecated APIs. These APIs used to exist on classic React classes but since
   * we would like to deprecate them, we're not going to move them over to this
   * modern base class. Instead, we define a getter that warns if it's accessed.
   */
  if (true) {
    var deprecatedAPIs = {
      getDOMNode: [
        'getDOMNode',
        'Use React.findDOMNode(component) instead.'
      ],
      isMounted: [
        'isMounted',
        'Instead, make sure to clean up subscriptions and pending requests in ' +
        'componentWillUnmount to prevent memory leaks.'
      ],
      replaceProps: [
        'replaceProps',
        'Instead, call React.render again at the top level.'
      ],
      replaceState: [
        'replaceState',
        'Refactor your code to use setState instead (see ' +
        'https://github.com/facebook/react/issues/3236).'
      ],
      setProps: [
        'setProps',
        'Instead, call React.render again at the top level.'
      ]
    };
    var defineDeprecationWarning = function(methodName, info) {
      try {
        Object.defineProperty(ReactComponent.prototype, methodName, {
          get: function() {
            (true ? warning(
              false,
              '%s(...) is deprecated in plain JavaScript React classes. %s',
              info[0],
              info[1]
            ) : null);
            return undefined;
          }
        });
      } catch (x) {
        // IE will fail on defineProperty (es5-shim/sham too)
      }
    };
    for (var fnName in deprecatedAPIs) {
      if (deprecatedAPIs.hasOwnProperty(fnName)) {
        defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      }
    }
  }
  
  module.exports = ReactComponent;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDOMIDOperations
   * @typechecks static-only
   */
  
  /*jslint evil: true */
  
  'use strict';
  
  var CSSPropertyOperations = __webpack_require__(104);
  var DOMChildrenOperations = __webpack_require__(215);
  var DOMPropertyOperations = __webpack_require__(38);
  var ReactMount = __webpack_require__(18);
  var ReactPerf = __webpack_require__(27);
  
  var invariant = __webpack_require__(2);
  var setInnerHTML = __webpack_require__(86);
  
  /**
   * Errors for properties that should not be updated with `updatePropertyById()`.
   *
   * @type {object}
   * @private
   */
  var INVALID_PROPERTY_ERRORS = {
    dangerouslySetInnerHTML:
      '`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.',
    style: '`style` must be set using `updateStylesByID()`.'
  };
  
  /**
   * Operations used to process updates to DOM nodes. This is made injectable via
   * `ReactDOMComponent.BackendIDOperations`.
   */
  var ReactDOMIDOperations = {
  
    /**
     * Updates a DOM node with new property values. This should only be used to
     * update DOM properties in `DOMProperty`.
     *
     * @param {string} id ID of the node to update.
     * @param {string} name A valid property name, see `DOMProperty`.
     * @param {*} value New value of the property.
     * @internal
     */
    updatePropertyByID: function(id, name, value) {
      var node = ReactMount.getNode(id);
      (true ? invariant(
        !INVALID_PROPERTY_ERRORS.hasOwnProperty(name),
        'updatePropertyByID(...): %s',
        INVALID_PROPERTY_ERRORS[name]
      ) : invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name)));
  
      // If we're updating to null or undefined, we should remove the property
      // from the DOM node instead of inadvertantly setting to a string. This
      // brings us in line with the same behavior we have on initial render.
      if (value != null) {
        DOMPropertyOperations.setValueForProperty(node, name, value);
      } else {
        DOMPropertyOperations.deleteValueForProperty(node, name);
      }
    },
  
    /**
     * Updates a DOM node to remove a property. This should only be used to remove
     * DOM properties in `DOMProperty`.
     *
     * @param {string} id ID of the node to update.
     * @param {string} name A property name to remove, see `DOMProperty`.
     * @internal
     */
    deletePropertyByID: function(id, name, value) {
      var node = ReactMount.getNode(id);
      (true ? invariant(
        !INVALID_PROPERTY_ERRORS.hasOwnProperty(name),
        'updatePropertyByID(...): %s',
        INVALID_PROPERTY_ERRORS[name]
      ) : invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name)));
      DOMPropertyOperations.deleteValueForProperty(node, name, value);
    },
  
    /**
     * Updates a DOM node with new style values. If a value is specified as '',
     * the corresponding style property will be unset.
     *
     * @param {string} id ID of the node to update.
     * @param {object} styles Mapping from styles to values.
     * @internal
     */
    updateStylesByID: function(id, styles) {
      var node = ReactMount.getNode(id);
      CSSPropertyOperations.setValueForStyles(node, styles);
    },
  
    /**
     * Updates a DOM node's innerHTML.
     *
     * @param {string} id ID of the node to update.
     * @param {string} html An HTML string.
     * @internal
     */
    updateInnerHTMLByID: function(id, html) {
      var node = ReactMount.getNode(id);
      setInnerHTML(node, html);
    },
  
    /**
     * Updates a DOM node's text content set by `props.content`.
     *
     * @param {string} id ID of the node to update.
     * @param {string} content Text content.
     * @internal
     */
    updateTextContentByID: function(id, content) {
      var node = ReactMount.getNode(id);
      DOMChildrenOperations.updateTextContent(node, content);
    },
  
    /**
     * Replaces a DOM node that exists in the document with markup.
     *
     * @param {string} id ID of child to be replaced.
     * @param {string} markup Dangerous markup to inject in place of child.
     * @internal
     * @see {Danger.dangerouslyReplaceNodeWithMarkup}
     */
    dangerouslyReplaceNodeWithMarkupByID: function(id, markup) {
      var node = ReactMount.getNode(id);
      DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup(node, markup);
    },
  
    /**
     * Updates a component's children by processing a series of updates.
     *
     * @param {array<object>} updates List of update configurations.
     * @param {array<string>} markup List of markup strings.
     * @internal
     */
    dangerouslyProcessChildrenUpdates: function(updates, markup) {
      for (var i = 0; i < updates.length; i++) {
        updates[i].parentNode = ReactMount.getNode(updates[i].parentID);
      }
      DOMChildrenOperations.processUpdates(updates, markup);
    }
  };
  
  ReactPerf.measureMethods(ReactDOMIDOperations, 'ReactDOMIDOperations', {
    updatePropertyByID: 'updatePropertyByID',
    deletePropertyByID: 'deletePropertyByID',
    updateStylesByID: 'updateStylesByID',
    updateInnerHTMLByID: 'updateInnerHTMLByID',
    updateTextContentByID: 'updateTextContentByID',
    dangerouslyReplaceNodeWithMarkupByID: 'dangerouslyReplaceNodeWithMarkupByID',
    dangerouslyProcessChildrenUpdates: 'dangerouslyProcessChildrenUpdates'
  });
  
  module.exports = ReactDOMIDOperations;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDOMTextComponent
   * @typechecks static-only
   */
  
  'use strict';
  
  var DOMPropertyOperations = __webpack_require__(38);
  var ReactComponentBrowserEnvironment =
    __webpack_require__(71);
  var ReactDOMComponent = __webpack_require__(74);
  
  var assign = __webpack_require__(4);
  var escapeTextContentForBrowser = __webpack_require__(55);
  
  /**
   * Text nodes violate a couple assumptions that React makes about components:
   *
   *  - When mounting text into the DOM, adjacent text nodes are merged.
   *  - Text nodes cannot be assigned a React root ID.
   *
   * This component is used to wrap strings in elements so that they can undergo
   * the same reconciliation that is applied to elements.
   *
   * TODO: Investigate representing React components in the DOM with text nodes.
   *
   * @class ReactDOMTextComponent
   * @extends ReactComponent
   * @internal
   */
  var ReactDOMTextComponent = function(props) {
    // This constructor and its argument is currently used by mocks.
  };
  
  assign(ReactDOMTextComponent.prototype, {
  
    /**
     * @param {ReactText} text
     * @internal
     */
    construct: function(text) {
      // TODO: This is really a ReactText (ReactNode), not a ReactElement
      this._currentElement = text;
      this._stringText = '' + text;
  
      // Properties
      this._rootNodeID = null;
      this._mountIndex = 0;
    },
  
    /**
     * Creates the markup for this text node. This node is not intended to have
     * any features besides containing text content.
     *
     * @param {string} rootID DOM ID of the root node.
     * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
     * @return {string} Markup for this text node.
     * @internal
     */
    mountComponent: function(rootID, transaction, context) {
      this._rootNodeID = rootID;
      var escapedText = escapeTextContentForBrowser(this._stringText);
  
      if (transaction.renderToStaticMarkup) {
        // Normally we'd wrap this in a `span` for the reasons stated above, but
        // since this is a situation where React won't take over (static pages),
        // we can simply return the text as it is.
        return escapedText;
      }
  
      return (
        '<span ' + DOMPropertyOperations.createMarkupForID(rootID) + '>' +
          escapedText +
        '</span>'
      );
    },
  
    /**
     * Updates this component by updating the text content.
     *
     * @param {ReactText} nextText The next text content
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */
    receiveComponent: function(nextText, transaction) {
      if (nextText !== this._currentElement) {
        this._currentElement = nextText;
        var nextStringText = '' + nextText;
        if (nextStringText !== this._stringText) {
          // TODO: Save this as pending props and use performUpdateIfNecessary
          // and/or updateComponent to do the actual update for consistency with
          // other component types?
          this._stringText = nextStringText;
          ReactDOMComponent.BackendIDOperations.updateTextContentByID(
            this._rootNodeID,
            nextStringText
          );
        }
      }
    },
  
    unmountComponent: function() {
      ReactComponentBrowserEnvironment.unmountIDFromEnvironment(this._rootNodeID);
    }
  
  });
  
  module.exports = ReactDOMTextComponent;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactInputSelection
   */
  
  'use strict';
  
  var ReactDOMSelection = __webpack_require__(235);
  
  var containsNode = __webpack_require__(116);
  var focusNode = __webpack_require__(118);
  var getActiveElement = __webpack_require__(119);
  
  function isInDocument(node) {
    return containsNode(document.documentElement, node);
  }
  
  /**
   * @ReactInputSelection: React input selection module. Based on Selection.js,
   * but modified to be suitable for react and has a couple of bug fixes (doesn't
   * assume buttons have range selections allowed).
   * Input selection module for React.
   */
  var ReactInputSelection = {
  
    hasSelectionCapabilities: function(elem) {
      return elem && (
        ((elem.nodeName === 'INPUT' && elem.type === 'text') ||
        elem.nodeName === 'TEXTAREA' || elem.contentEditable === 'true')
      );
    },
  
    getSelectionInformation: function() {
      var focusedElem = getActiveElement();
      return {
        focusedElem: focusedElem,
        selectionRange:
            ReactInputSelection.hasSelectionCapabilities(focusedElem) ?
            ReactInputSelection.getSelection(focusedElem) :
            null
      };
    },
  
    /**
     * @restoreSelection: If any selection information was potentially lost,
     * restore it. This is useful when performing operations that could remove dom
     * nodes and place them back in, resulting in focus being lost.
     */
    restoreSelection: function(priorSelectionInformation) {
      var curFocusedElem = getActiveElement();
      var priorFocusedElem = priorSelectionInformation.focusedElem;
      var priorSelectionRange = priorSelectionInformation.selectionRange;
      if (curFocusedElem !== priorFocusedElem &&
          isInDocument(priorFocusedElem)) {
        if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
          ReactInputSelection.setSelection(
            priorFocusedElem,
            priorSelectionRange
          );
        }
        focusNode(priorFocusedElem);
      }
    },
  
    /**
     * @getSelection: Gets the selection bounds of a focused textarea, input or
     * contentEditable node.
     * -@input: Look up selection bounds of this input
     * -@return {start: selectionStart, end: selectionEnd}
     */
    getSelection: function(input) {
      var selection;
  
      if ('selectionStart' in input) {
        // Modern browser with input or textarea.
        selection = {
          start: input.selectionStart,
          end: input.selectionEnd
        };
      } else if (document.selection && input.nodeName === 'INPUT') {
        // IE8 input.
        var range = document.selection.createRange();
        // There can only be one selection per document in IE, so it must
        // be in our element.
        if (range.parentElement() === input) {
          selection = {
            start: -range.moveStart('character', -input.value.length),
            end: -range.moveEnd('character', -input.value.length)
          };
        }
      } else {
        // Content editable or old IE textarea.
        selection = ReactDOMSelection.getOffsets(input);
      }
  
      return selection || {start: 0, end: 0};
    },
  
    /**
     * @setSelection: Sets the selection bounds of a textarea or input and focuses
     * the input.
     * -@input     Set selection bounds of this input or textarea
     * -@offsets   Object of same form that is returned from get*
     */
    setSelection: function(input, offsets) {
      var start = offsets.start;
      var end = offsets.end;
      if (typeof end === 'undefined') {
        end = start;
      }
  
      if ('selectionStart' in input) {
        input.selectionStart = start;
        input.selectionEnd = Math.min(end, input.value.length);
      } else if (document.selection && input.nodeName === 'INPUT') {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveStart('character', start);
        range.moveEnd('character', end - start);
        range.select();
      } else {
        ReactDOMSelection.setOffsets(input, offsets);
      }
    }
  };
  
  module.exports = ReactInputSelection;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactMarkupChecksum
   */
  
  'use strict';
  
  var adler32 = __webpack_require__(263);
  
  var ReactMarkupChecksum = {
    CHECKSUM_ATTR_NAME: 'data-react-checksum',
  
    /**
     * @param {string} markup Markup string
     * @return {string} Markup string with checksum attribute attached
     */
    addChecksumToMarkup: function(markup) {
      var checksum = adler32(markup);
      return markup.replace(
        '>',
        ' ' + ReactMarkupChecksum.CHECKSUM_ATTR_NAME + '="' + checksum + '">'
      );
    },
  
    /**
     * @param {string} markup to use
     * @param {DOMElement} element root React element
     * @returns {boolean} whether or not the markup is the same
     */
    canReuseMarkup: function(markup, element) {
      var existingChecksum = element.getAttribute(
        ReactMarkupChecksum.CHECKSUM_ATTR_NAME
      );
      existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
      var markupChecksum = adler32(markup);
      return markupChecksum === existingChecksum;
    }
  };
  
  module.exports = ReactMarkupChecksum;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactMultiChildUpdateTypes
   */
  
  'use strict';
  
  var keyMirror = __webpack_require__(36);
  
  /**
   * When a component's children are updated, a series of update configuration
   * objects are created in order to batch and serialize the required changes.
   *
   * Enumerates all the possible types of update configurations.
   *
   * @internal
   */
  var ReactMultiChildUpdateTypes = keyMirror({
    INSERT_MARKUP: null,
    MOVE_EXISTING: null,
    REMOVE_NODE: null,
    TEXT_CONTENT: null
  });
  
  module.exports = ReactMultiChildUpdateTypes;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactPropTypes
   */
  
  'use strict';
  
  var ReactElement = __webpack_require__(5);
  var ReactFragment = __webpack_require__(49);
  var ReactPropTypeLocationNames = __webpack_require__(51);
  
  var emptyFunction = __webpack_require__(25);
  
  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */
  
  var ANONYMOUS = '<<anonymous>>';
  
  var elementTypeChecker = createElementTypeChecker();
  var nodeTypeChecker = createNodeChecker();
  
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
  
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: elementTypeChecker,
    instanceOf: createInstanceTypeChecker,
    node: nodeTypeChecker,
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };
  
  function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName, location) {
      componentName = componentName || ANONYMOUS;
      if (props[propName] == null) {
        var locationName = ReactPropTypeLocationNames[location];
        if (isRequired) {
          return new Error(
            ("Required " + locationName + " `" + propName + "` was not specified in ") +
            ("`" + componentName + "`.")
          );
        }
        return null;
      } else {
        return validate(props, propName, componentName, location);
      }
    }
  
    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
  
    return chainedCheckType;
  }
  
  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        var locationName = ReactPropTypeLocationNames[location];
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);
  
        return new Error(
          ("Invalid " + locationName + " `" + propName + "` of type `" + preciseType + "` ") +
          ("supplied to `" + componentName + "`, expected `" + expectedType + "`.")
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  
  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturns(null));
  }
  
  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location) {
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var locationName = ReactPropTypeLocationNames[location];
        var propType = getPropType(propValue);
        return new Error(
          ("Invalid " + locationName + " `" + propName + "` of type ") +
          ("`" + propType + "` supplied to `" + componentName + "`, expected an array.")
        );
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  
  function createElementTypeChecker() {
    function validate(props, propName, componentName, location) {
      if (!ReactElement.isValidElement(props[propName])) {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error(
          ("Invalid " + locationName + " `" + propName + "` supplied to ") +
          ("`" + componentName + "`, expected a ReactElement.")
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  
  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location) {
      if (!(props[propName] instanceof expectedClass)) {
        var locationName = ReactPropTypeLocationNames[location];
        var expectedClassName = expectedClass.name || ANONYMOUS;
        return new Error(
          ("Invalid " + locationName + " `" + propName + "` supplied to ") +
          ("`" + componentName + "`, expected instance of `" + expectedClassName + "`.")
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  
  function createEnumTypeChecker(expectedValues) {
    function validate(props, propName, componentName, location) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (propValue === expectedValues[i]) {
          return null;
        }
      }
  
      var locationName = ReactPropTypeLocationNames[location];
      var valuesString = JSON.stringify(expectedValues);
      return new Error(
        ("Invalid " + locationName + " `" + propName + "` of value `" + propValue + "` ") +
        ("supplied to `" + componentName + "`, expected one of " + valuesString + ".")
      );
    }
    return createChainableTypeChecker(validate);
  }
  
  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error(
          ("Invalid " + locationName + " `" + propName + "` of type ") +
          ("`" + propType + "` supplied to `" + componentName + "`, expected an object.")
        );
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  
  function createUnionTypeChecker(arrayOfTypeCheckers) {
    function validate(props, propName, componentName, location) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location) == null) {
          return null;
        }
      }
  
      var locationName = ReactPropTypeLocationNames[location];
      return new Error(
        ("Invalid " + locationName + " `" + propName + "` supplied to ") +
        ("`" + componentName + "`.")
      );
    }
    return createChainableTypeChecker(validate);
  }
  
  function createNodeChecker() {
    function validate(props, propName, componentName, location) {
      if (!isNode(props[propName])) {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error(
          ("Invalid " + locationName + " `" + propName + "` supplied to ") +
          ("`" + componentName + "`, expected a ReactNode.")
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  
  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error(
          ("Invalid " + locationName + " `" + propName + "` of type `" + propType + "` ") +
          ("supplied to `" + componentName + "`, expected `object`.")
        );
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  
  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || ReactElement.isValidElement(propValue)) {
          return true;
        }
        propValue = ReactFragment.extractIfFragment(propValue);
        for (var k in propValue) {
          if (!isNode(propValue[k])) {
            return false;
          }
        }
        return true;
      default:
        return false;
    }
  }
  
  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    return propType;
  }
  
  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }
  
  module.exports = ReactPropTypes;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactPutListenerQueue
   */
  
  'use strict';
  
  var PooledClass = __webpack_require__(22);
  var ReactBrowserEventEmitter = __webpack_require__(32);
  
  var assign = __webpack_require__(4);
  
  function ReactPutListenerQueue() {
    this.listenersToPut = [];
  }
  
  assign(ReactPutListenerQueue.prototype, {
    enqueuePutListener: function(rootNodeID, propKey, propValue) {
      this.listenersToPut.push({
        rootNodeID: rootNodeID,
        propKey: propKey,
        propValue: propValue
      });
    },
  
    putListeners: function() {
      for (var i = 0; i < this.listenersToPut.length; i++) {
        var listenerToPut = this.listenersToPut[i];
        ReactBrowserEventEmitter.putListener(
          listenerToPut.rootNodeID,
          listenerToPut.propKey,
          listenerToPut.propValue
        );
      }
    },
  
    reset: function() {
      this.listenersToPut.length = 0;
    },
  
    destructor: function() {
      this.reset();
    }
  });
  
  PooledClass.addPoolingTo(ReactPutListenerQueue);
  
  module.exports = ReactPutListenerQueue;


/***/ },
/* 114 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactRootIndex
   * @typechecks
   */
  
  'use strict';
  
  var ReactRootIndexInjection = {
    /**
     * @param {function} _createReactRootIndex
     */
    injectCreateReactRootIndex: function(_createReactRootIndex) {
      ReactRootIndex.createReactRootIndex = _createReactRootIndex;
    }
  };
  
  var ReactRootIndex = {
    createReactRootIndex: null,
    injection: ReactRootIndexInjection
  };
  
  module.exports = ReactRootIndex;


/***/ },
/* 115 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ViewportMetrics
   */
  
  'use strict';
  
  var ViewportMetrics = {
  
    currentScrollLeft: 0,
  
    currentScrollTop: 0,
  
    refreshScrollValues: function(scrollPosition) {
      ViewportMetrics.currentScrollLeft = scrollPosition.x;
      ViewportMetrics.currentScrollTop = scrollPosition.y;
    }
  
  };
  
  module.exports = ViewportMetrics;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule containsNode
   * @typechecks
   */
  
  var isTextNode = __webpack_require__(277);
  
  /*jslint bitwise:true */
  
  /**
   * Checks if a given DOM node contains or is another DOM node.
   *
   * @param {?DOMNode} outerNode Outer DOM node.
   * @param {?DOMNode} innerNode Inner DOM node.
   * @return {boolean} True if `outerNode` contains or is `innerNode`.
   */
  function containsNode(outerNode, innerNode) {
    if (!outerNode || !innerNode) {
      return false;
    } else if (outerNode === innerNode) {
      return true;
    } else if (isTextNode(outerNode)) {
      return false;
    } else if (isTextNode(innerNode)) {
      return containsNode(outerNode, innerNode.parentNode);
    } else if (outerNode.contains) {
      return outerNode.contains(innerNode);
    } else if (outerNode.compareDocumentPosition) {
      return !!(outerNode.compareDocumentPosition(innerNode) & 16);
    } else {
      return false;
    }
  }
  
  module.exports = containsNode;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule findDOMNode
   * @typechecks static-only
   */
  
  'use strict';
  
  var ReactCurrentOwner = __webpack_require__(24);
  var ReactInstanceMap = __webpack_require__(34);
  var ReactMount = __webpack_require__(18);
  
  var invariant = __webpack_require__(2);
  var isNode = __webpack_require__(123);
  var warning = __webpack_require__(6);
  
  /**
   * Returns the DOM node rendered by this element.
   *
   * @param {ReactComponent|DOMElement} componentOrElement
   * @return {DOMElement} The root node of this element.
   */
  function findDOMNode(componentOrElement) {
    if (true) {
      var owner = ReactCurrentOwner.current;
      if (owner !== null) {
        (true ? warning(
          owner._warnedAboutRefsInRender,
          '%s is accessing getDOMNode or findDOMNode inside its render(). ' +
          'render() should be a pure function of props and state. It should ' +
          'never access something that requires stale data from the previous ' +
          'render, such as refs. Move this logic to componentDidMount and ' +
          'componentDidUpdate instead.',
          owner.getName() || 'A component'
        ) : null);
        owner._warnedAboutRefsInRender = true;
      }
    }
    if (componentOrElement == null) {
      return null;
    }
    if (isNode(componentOrElement)) {
      return componentOrElement;
    }
    if (ReactInstanceMap.has(componentOrElement)) {
      return ReactMount.getNodeFromInstance(componentOrElement);
    }
    (true ? invariant(
      componentOrElement.render == null ||
      typeof componentOrElement.render !== 'function',
      'Component (with keys: %s) contains `render` method ' +
      'but is not mounted in the DOM',
      Object.keys(componentOrElement)
    ) : invariant(componentOrElement.render == null ||
    typeof componentOrElement.render !== 'function'));
    (true ? invariant(
      false,
      'Element appears to be neither ReactComponent nor DOMNode (keys: %s)',
      Object.keys(componentOrElement)
    ) : invariant(false));
  }
  
  module.exports = findDOMNode;


/***/ },
/* 118 */
/***/ function(module, exports) {

  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule focusNode
   */
  
  "use strict";
  
  /**
   * @param {DOMElement} node input/textarea to focus
   */
  function focusNode(node) {
    // IE8 can throw "Can't move focus to the control because it is invisible,
    // not enabled, or of a type that does not accept the focus." for all kinds of
    // reasons that are too expensive and fragile to test.
    try {
      node.focus();
    } catch(e) {
    }
  }
  
  module.exports = focusNode;


/***/ },
/* 119 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule getActiveElement
   * @typechecks
   */
  
  /**
   * Same as document.activeElement but wraps in a try-catch block. In IE it is
   * not safe to call document.activeElement if there is nothing focused.
   *
   * The activeElement will be null only if the document body is not yet defined.
   */
  function getActiveElement() /*?DOMElement*/ {
    try {
      return document.activeElement || document.body;
    } catch (e) {
      return document.body;
    }
  }
  
  module.exports = getActiveElement;


/***/ },
/* 120 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule getIteratorFn
   * @typechecks static-only
   */
  
  'use strict';
  
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
  
  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (
      (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL])
    );
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }
  
  module.exports = getIteratorFn;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule getMarkupWrap
   */
  
  var ExecutionEnvironment = __webpack_require__(7);
  
  var invariant = __webpack_require__(2);
  
  /**
   * Dummy container used to detect which wraps are necessary.
   */
  var dummyNode =
    ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
  
  /**
   * Some browsers cannot use `innerHTML` to render certain elements standalone,
   * so we wrap them, render the wrapped nodes, then extract the desired node.
   *
   * In IE8, certain elements cannot render alone, so wrap all elements ('*').
   */
  var shouldWrap = {
    // Force wrapping for SVG elements because if they get created inside a <div>,
    // they will be initialized in the wrong namespace (and will not display).
    'circle': true,
    'clipPath': true,
    'defs': true,
    'ellipse': true,
    'g': true,
    'line': true,
    'linearGradient': true,
    'path': true,
    'polygon': true,
    'polyline': true,
    'radialGradient': true,
    'rect': true,
    'stop': true,
    'text': true
  };
  
  var selectWrap = [1, '<select multiple="true">', '</select>'];
  var tableWrap = [1, '<table>', '</table>'];
  var trWrap = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
  
  var svgWrap = [1, '<svg>', '</svg>'];
  
  var markupWrap = {
    '*': [1, '?<div>', '</div>'],
  
    'area': [1, '<map>', '</map>'],
    'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
    'legend': [1, '<fieldset>', '</fieldset>'],
    'param': [1, '<object>', '</object>'],
    'tr': [2, '<table><tbody>', '</tbody></table>'],
  
    'optgroup': selectWrap,
    'option': selectWrap,
  
    'caption': tableWrap,
    'colgroup': tableWrap,
    'tbody': tableWrap,
    'tfoot': tableWrap,
    'thead': tableWrap,
  
    'td': trWrap,
    'th': trWrap,
  
    'circle': svgWrap,
    'clipPath': svgWrap,
    'defs': svgWrap,
    'ellipse': svgWrap,
    'g': svgWrap,
    'line': svgWrap,
    'linearGradient': svgWrap,
    'path': svgWrap,
    'polygon': svgWrap,
    'polyline': svgWrap,
    'radialGradient': svgWrap,
    'rect': svgWrap,
    'stop': svgWrap,
    'text': svgWrap
  };
  
  /**
   * Gets the markup wrap configuration for the supplied `nodeName`.
   *
   * NOTE: This lazily detects which wraps are necessary for the current browser.
   *
   * @param {string} nodeName Lowercase `nodeName`.
   * @return {?array} Markup wrap configuration, if applicable.
   */
  function getMarkupWrap(nodeName) {
    (true ? invariant(!!dummyNode, 'Markup wrapping node not initialized') : invariant(!!dummyNode));
    if (!markupWrap.hasOwnProperty(nodeName)) {
      nodeName = '*';
    }
    if (!shouldWrap.hasOwnProperty(nodeName)) {
      if (nodeName === '*') {
        dummyNode.innerHTML = '<link />';
      } else {
        dummyNode.innerHTML = '<' + nodeName + '></' + nodeName + '>';
      }
      shouldWrap[nodeName] = !dummyNode.firstChild;
    }
    return shouldWrap[nodeName] ? markupWrap[nodeName] : null;
  }
  
  
  module.exports = getMarkupWrap;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule getTextContentAccessor
   */
  
  'use strict';
  
  var ExecutionEnvironment = __webpack_require__(7);
  
  var contentKey = null;
  
  /**
   * Gets the key used to access text content on a DOM node.
   *
   * @return {?string} Key used to access text content.
   * @internal
   */
  function getTextContentAccessor() {
    if (!contentKey && ExecutionEnvironment.canUseDOM) {
      // Prefer textContent to innerText because many browsers support both but
      // SVG <text> elements don't support innerText even when <div> does.
      contentKey = 'textContent' in document.documentElement ?
        'textContent' :
        'innerText';
    }
    return contentKey;
  }
  
  module.exports = getTextContentAccessor;


/***/ },
/* 123 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule isNode
   * @typechecks
   */
  
  /**
   * @param {*} object The object to check.
   * @return {boolean} Whether or not the object is a DOM node.
   */
  function isNode(object) {
    return !!(object && (
      ((typeof Node === 'function' ? object instanceof Node : typeof object === 'object' &&
      typeof object.nodeType === 'number' &&
      typeof object.nodeName === 'string'))
    ));
  }
  
  module.exports = isNode;


/***/ },
/* 124 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule isTextInputElement
   */
  
  'use strict';
  
  /**
   * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
   */
  var supportedInputTypes = {
    'color': true,
    'date': true,
    'datetime': true,
    'datetime-local': true,
    'email': true,
    'month': true,
    'number': true,
    'password': true,
    'range': true,
    'search': true,
    'tel': true,
    'text': true,
    'time': true,
    'url': true,
    'week': true
  };
  
  function isTextInputElement(elem) {
    return elem && (
      (elem.nodeName === 'INPUT' && supportedInputTypes[elem.type] || elem.nodeName === 'TEXTAREA')
    );
  }
  
  module.exports = isTextInputElement;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule traverseAllChildren
   */
  
  'use strict';
  
  var ReactElement = __webpack_require__(5);
  var ReactFragment = __webpack_require__(49);
  var ReactInstanceHandles = __webpack_require__(33);
  
  var getIteratorFn = __webpack_require__(120);
  var invariant = __webpack_require__(2);
  var warning = __webpack_require__(6);
  
  var SEPARATOR = ReactInstanceHandles.SEPARATOR;
  var SUBSEPARATOR = ':';
  
  /**
   * TODO: Test that a single child and an array with one item have the same key
   * pattern.
   */
  
  var userProvidedKeyEscaperLookup = {
    '=': '=0',
    '.': '=1',
    ':': '=2'
  };
  
  var userProvidedKeyEscapeRegex = /[=.:]/g;
  
  var didWarnAboutMaps = false;
  
  function userProvidedKeyEscaper(match) {
    return userProvidedKeyEscaperLookup[match];
  }
  
  /**
   * Generate a key string that identifies a component within a set.
   *
   * @param {*} component A component that could contain a manual key.
   * @param {number} index Index that is used if a manual key is not provided.
   * @return {string}
   */
  function getComponentKey(component, index) {
    if (component && component.key != null) {
      // Explicit key
      return wrapUserProvidedKey(component.key);
    }
    // Implicit key determined by the index in the set
    return index.toString(36);
  }
  
  /**
   * Escape a component key so that it is safe to use in a reactid.
   *
   * @param {*} key Component key to be escaped.
   * @return {string} An escaped string.
   */
  function escapeUserProvidedKey(text) {
    return ('' + text).replace(
      userProvidedKeyEscapeRegex,
      userProvidedKeyEscaper
    );
  }
  
  /**
   * Wrap a `key` value explicitly provided by the user to distinguish it from
   * implicitly-generated keys generated by a component's index in its parent.
   *
   * @param {string} key Value of a user-provided `key` attribute
   * @return {string}
   */
  function wrapUserProvidedKey(key) {
    return '$' + escapeUserProvidedKey(key);
  }
  
  /**
   * @param {?*} children Children tree container.
   * @param {!string} nameSoFar Name of the key path so far.
   * @param {!number} indexSoFar Number of children encountered until this point.
   * @param {!function} callback Callback to invoke with each child found.
   * @param {?*} traverseContext Used to pass information throughout the traversal
   * process.
   * @return {!number} The number of children in this subtree.
   */
  function traverseAllChildrenImpl(
    children,
    nameSoFar,
    indexSoFar,
    callback,
    traverseContext
  ) {
    var type = typeof children;
  
    if (type === 'undefined' || type === 'boolean') {
      // All of the above are perceived as null.
      children = null;
    }
  
    if (children === null ||
        type === 'string' ||
        type === 'number' ||
        ReactElement.isValidElement(children)) {
      callback(
        traverseContext,
        children,
        // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar,
        indexSoFar
      );
      return 1;
    }
  
    var child, nextName, nextIndex;
    var subtreeCount = 0; // Count of children found in the current subtree.
  
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        child = children[i];
        nextName = (
          (nameSoFar !== '' ? nameSoFar + SUBSEPARATOR : SEPARATOR) +
          getComponentKey(child, i)
        );
        nextIndex = indexSoFar + subtreeCount;
        subtreeCount += traverseAllChildrenImpl(
          child,
          nextName,
          nextIndex,
          callback,
          traverseContext
        );
      }
    } else {
      var iteratorFn = getIteratorFn(children);
      if (iteratorFn) {
        var iterator = iteratorFn.call(children);
        var step;
        if (iteratorFn !== children.entries) {
          var ii = 0;
          while (!(step = iterator.next()).done) {
            child = step.value;
            nextName = (
              (nameSoFar !== '' ? nameSoFar + SUBSEPARATOR : SEPARATOR) +
              getComponentKey(child, ii++)
            );
            nextIndex = indexSoFar + subtreeCount;
            subtreeCount += traverseAllChildrenImpl(
              child,
              nextName,
              nextIndex,
              callback,
              traverseContext
            );
          }
        } else {
          if (true) {
            (true ? warning(
              didWarnAboutMaps,
              'Using Maps as children is not yet fully supported. It is an ' +
              'experimental feature that might be removed. Convert it to a ' +
              'sequence / iterable of keyed ReactElements instead.'
            ) : null);
            didWarnAboutMaps = true;
          }
          // Iterator will provide entry [k,v] tuples rather than values.
          while (!(step = iterator.next()).done) {
            var entry = step.value;
            if (entry) {
              child = entry[1];
              nextName = (
                (nameSoFar !== '' ? nameSoFar + SUBSEPARATOR : SEPARATOR) +
                wrapUserProvidedKey(entry[0]) + SUBSEPARATOR +
                getComponentKey(child, 0)
              );
              nextIndex = indexSoFar + subtreeCount;
              subtreeCount += traverseAllChildrenImpl(
                child,
                nextName,
                nextIndex,
                callback,
                traverseContext
              );
            }
          }
        }
      } else if (type === 'object') {
        (true ? invariant(
          children.nodeType !== 1,
          'traverseAllChildren(...): Encountered an invalid child; DOM ' +
          'elements are not valid children of React components.'
        ) : invariant(children.nodeType !== 1));
        var fragment = ReactFragment.extract(children);
        for (var key in fragment) {
          if (fragment.hasOwnProperty(key)) {
            child = fragment[key];
            nextName = (
              (nameSoFar !== '' ? nameSoFar + SUBSEPARATOR : SEPARATOR) +
              wrapUserProvidedKey(key) + SUBSEPARATOR +
              getComponentKey(child, 0)
            );
            nextIndex = indexSoFar + subtreeCount;
            subtreeCount += traverseAllChildrenImpl(
              child,
              nextName,
              nextIndex,
              callback,
              traverseContext
            );
          }
        }
      }
    }
  
    return subtreeCount;
  }
  
  /**
   * Traverses children that are typically specified as `props.children`, but
   * might also be specified through attributes:
   *
   * - `traverseAllChildren(this.props.children, ...)`
   * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
   *
   * The `traverseContext` is an optional argument that is passed through the
   * entire traversal. It can be used to store accumulations or anything else that
   * the callback might find relevant.
   *
   * @param {?*} children Children tree object.
   * @param {!function} callback To invoke upon traversing each child.
   * @param {?*} traverseContext Context for traversal.
   * @return {!number} The number of children in this subtree.
   */
  function traverseAllChildren(children, callback, traverseContext) {
    if (children == null) {
      return 0;
    }
  
    return traverseAllChildrenImpl(children, '', 0, callback, traverseContext);
  }
  
  module.exports = traverseAllChildren;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

  /* WEBPACK VAR INJECTION */(function(global) {"use strict";
  
  __webpack_require__(178);
  
  __webpack_require__(179);
  
  if (global._babelPolyfill) {
    throw new Error("only one instance of babel/polyfill is allowed");
  }
  global._babelPolyfill = true;
  /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

  var $        = __webpack_require__(1)
    , enumKeys = __webpack_require__(93);
  // 19.1.2.1 Object.assign(target, source, ...)
  /* eslint-disable no-unused-vars */
  module.exports = Object.assign || function assign(target, source){
  /* eslint-enable no-unused-vars */
    var T = Object($.assertDefined(target))
      , l = arguments.length
      , i = 1;
    while(l > i){
      var S      = $.ES5Object(arguments[i++])
        , keys   = enumKeys(S)
        , length = keys.length
        , j      = 0
        , key;
      while(length > j)T[key = keys[j++]] = S[key];
    }
    return T;
  };

/***/ },
/* 128 */
/***/ function(module, exports) {

  module.exports = function($){
    $.FW   = true;
    $.path = $.g;
    return $;
  };

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(1);
  module.exports = function(object, el){
    var O      = $.toObject(object)
      , keys   = $.getKeys(O)
      , length = keys.length
      , index  = 0
      , key;
    while(length > index)if(O[key = keys[index++]] === el)return key;
  };

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $      = __webpack_require__(1)
    , invoke = __webpack_require__(45)
    , assertFunction = __webpack_require__(9).fn;
  module.exports = function(/* ...pargs */){
    var fn     = assertFunction(this)
      , length = arguments.length
      , pargs  = Array(length)
      , i      = 0
      , _      = $.path._
      , holder = false;
    while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
    return function(/* ...args */){
      var that    = this
        , _length = arguments.length
        , j = 0, k = 0, args;
      if(!holder && !_length)return invoke(fn, pargs, that);
      args = pargs.slice();
      if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
      while(_length > k)args.push(arguments[k++]);
      return invoke(fn, args, that);
    };
  };

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

  var $                = __webpack_require__(1)
    , cel              = __webpack_require__(92)
    , cof              = __webpack_require__(10)
    , $def             = __webpack_require__(3)
    , invoke           = __webpack_require__(45)
    , arrayMethod      = __webpack_require__(43)
    , IE_PROTO         = __webpack_require__(16).safe('__proto__')
    , assert           = __webpack_require__(9)
    , assertObject     = assert.obj
    , ObjectProto      = Object.prototype
    , html             = $.html
    , A                = []
    , _slice           = A.slice
    , _join            = A.join
    , classof          = cof.classof
    , has              = $.has
    , defineProperty   = $.setDesc
    , getOwnDescriptor = $.getDesc
    , defineProperties = $.setDescs
    , isFunction       = $.isFunction
    , isObject         = $.isObject
    , toObject         = $.toObject
    , toLength         = $.toLength
    , toIndex          = $.toIndex
    , IE8_DOM_DEFINE   = false
    , $indexOf         = __webpack_require__(88)(false)
    , $forEach         = arrayMethod(0)
    , $map             = arrayMethod(1)
    , $filter          = arrayMethod(2)
    , $some            = arrayMethod(3)
    , $every           = arrayMethod(4);
  
  if(!$.DESC){
    try {
      IE8_DOM_DEFINE = defineProperty(cel('div'), 'x',
        {get: function(){ return 8; }}
      ).x == 8;
    } catch(e){ /* empty */ }
    $.setDesc = function(O, P, Attributes){
      if(IE8_DOM_DEFINE)try {
        return defineProperty(O, P, Attributes);
      } catch(e){ /* empty */ }
      if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
      if('value' in Attributes)assertObject(O)[P] = Attributes.value;
      return O;
    };
    $.getDesc = function(O, P){
      if(IE8_DOM_DEFINE)try {
        return getOwnDescriptor(O, P);
      } catch(e){ /* empty */ }
      if(has(O, P))return $.desc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
    };
    $.setDescs = defineProperties = function(O, Properties){
      assertObject(O);
      var keys   = $.getKeys(Properties)
        , length = keys.length
        , i = 0
        , P;
      while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
      return O;
    };
  }
  $def($def.S + $def.F * !$.DESC, 'Object', {
    // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: $.getDesc,
    // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
    defineProperty: $.setDesc,
    // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
    defineProperties: defineProperties
  });
  
    // IE 8- don't enum bug keys
  var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' +
              'toLocaleString,toString,valueOf').split(',')
    // Additional keys for getOwnPropertyNames
    , keys2 = keys1.concat('length', 'prototype')
    , keysLen1 = keys1.length;
  
  // Create object with `null` prototype: use iframe Object with cleared prototype
  var createDict = function(){
    // Thrash, waste and sodomy: IE GC bug
    var iframe = cel('iframe')
      , i      = keysLen1
      , gt     = '>'
      , iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write('<script>document.F=Object</script' + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while(i--)delete createDict.prototype[keys1[i]];
    return createDict();
  };
  function createGetKeys(names, length){
    return function(object){
      var O      = toObject(object)
        , i      = 0
        , result = []
        , key;
      for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
      // Don't enum bug & hidden keys
      while(length > i)if(has(O, key = names[i++])){
        ~$indexOf(result, key) || result.push(key);
      }
      return result;
    };
  }
  function Empty(){}
  $def($def.S, 'Object', {
    // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
    getPrototypeOf: $.getProto = $.getProto || function(O){
      O = Object(assert.def(O));
      if(has(O, IE_PROTO))return O[IE_PROTO];
      if(isFunction(O.constructor) && O instanceof O.constructor){
        return O.constructor.prototype;
      } return O instanceof Object ? ObjectProto : null;
    },
    // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
    // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
    create: $.create = $.create || function(O, /*?*/Properties){
      var result;
      if(O !== null){
        Empty.prototype = assertObject(O);
        result = new Empty();
        Empty.prototype = null;
        // add "__proto__" for Object.getPrototypeOf shim
        result[IE_PROTO] = O;
      } else result = createDict();
      return Properties === undefined ? result : defineProperties(result, Properties);
    },
    // 19.1.2.14 / 15.2.3.14 Object.keys(O)
    keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false),
    // 19.1.2.17 / 15.2.3.8 Object.seal(O)
    seal: function seal(it){
      return it; // <- cap
    },
    // 19.1.2.5 / 15.2.3.9 Object.freeze(O)
    freeze: function freeze(it){
      return it; // <- cap
    },
    // 19.1.2.15 / 15.2.3.10 Object.preventExtensions(O)
    preventExtensions: function preventExtensions(it){
      return it; // <- cap
    },
    // 19.1.2.13 / 15.2.3.11 Object.isSealed(O)
    isSealed: function isSealed(it){
      return !isObject(it); // <- cap
    },
    // 19.1.2.12 / 15.2.3.12 Object.isFrozen(O)
    isFrozen: function isFrozen(it){
      return !isObject(it); // <- cap
    },
    // 19.1.2.11 / 15.2.3.13 Object.isExtensible(O)
    isExtensible: function isExtensible(it){
      return isObject(it); // <- cap
    }
  });
  
  // 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
  $def($def.P, 'Function', {
    bind: function(that /*, args... */){
      var fn       = assert.fn(this)
        , partArgs = _slice.call(arguments, 1);
      function bound(/* args... */){
        var args   = partArgs.concat(_slice.call(arguments))
          , constr = this instanceof bound
          , ctx    = constr ? $.create(fn.prototype) : that
          , result = invoke(fn, args, ctx);
        return constr ? ctx : result;
      }
      if(fn.prototype)bound.prototype = fn.prototype;
      return bound;
    }
  });
  
  // Fix for not array-like ES3 string and DOM objects
  if(!(0 in Object('z') && 'z'[0] == 'z')){
    $.ES5Object = function(it){
      return cof(it) == 'String' ? it.split('') : Object(it);
    };
  }
  
  var buggySlice = true;
  try {
    if(html)_slice.call(html);
    buggySlice = false;
  } catch(e){ /* empty */ }
  
  $def($def.P + $def.F * buggySlice, 'Array', {
    slice: function slice(begin, end){
      var len   = toLength(this.length)
        , klass = cof(this);
      end = end === undefined ? len : end;
      if(klass == 'Array')return _slice.call(this, begin, end);
      var start  = toIndex(begin, len)
        , upTo   = toIndex(end, len)
        , size   = toLength(upTo - start)
        , cloned = Array(size)
        , i      = 0;
      for(; i < size; i++)cloned[i] = klass == 'String'
        ? this.charAt(start + i)
        : this[start + i];
      return cloned;
    }
  });
  
  $def($def.P + $def.F * ($.ES5Object != Object), 'Array', {
    join: function join(){
      return _join.apply($.ES5Object(this), arguments);
    }
  });
  
  // 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
  $def($def.S, 'Array', {
    isArray: function(arg){
      return cof(arg) == 'Array';
    }
  });
  function createArrayReduce(isRight){
    return function(callbackfn, memo){
      assert.fn(callbackfn);
      var O      = toObject(this)
        , length = toLength(O.length)
        , index  = isRight ? length - 1 : 0
        , i      = isRight ? -1 : 1;
      if(arguments.length < 2)for(;;){
        if(index in O){
          memo = O[index];
          index += i;
          break;
        }
        index += i;
        assert(isRight ? index >= 0 : length > index, 'Reduce of empty array with no initial value');
      }
      for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
        memo = callbackfn(memo, O[index], index, this);
      }
      return memo;
    };
  }
  $def($def.P, 'Array', {
    // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
    forEach: $.each = $.each || function forEach(callbackfn/*, that = undefined */){
      return $forEach(this, callbackfn, arguments[1]);
    },
    // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
    map: function map(callbackfn/*, that = undefined */){
      return $map(this, callbackfn, arguments[1]);
    },
    // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
    filter: function filter(callbackfn/*, that = undefined */){
      return $filter(this, callbackfn, arguments[1]);
    },
    // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
    some: function some(callbackfn/*, that = undefined */){
      return $some(this, callbackfn, arguments[1]);
    },
    // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
    every: function every(callbackfn/*, that = undefined */){
      return $every(this, callbackfn, arguments[1]);
    },
    // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
    reduce: createArrayReduce(false),
    // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
    reduceRight: createArrayReduce(true),
    // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
    indexOf: function indexOf(el /*, fromIndex = 0 */){
      return $indexOf(this, el, arguments[1]);
    },
    // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
    lastIndexOf: function(el, fromIndex /* = @[*-1] */){
      var O      = toObject(this)
        , length = toLength(O.length)
        , index  = length - 1;
      if(arguments.length > 1)index = Math.min(index, $.toInteger(fromIndex));
      if(index < 0)index = toLength(length + index);
      for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
      return -1;
    }
  });
  
  // 21.1.3.25 / 15.5.4.20 String.prototype.trim()
  $def($def.P, 'String', {trim: __webpack_require__(58)(/^\s*([\s\S]*\S)?\s*$/, '$1')});
  
  // 20.3.3.1 / 15.9.4.4 Date.now()
  $def($def.S, 'Date', {now: function(){
    return +new Date;
  }});
  
  function lz(num){
    return num > 9 ? num : '0' + num;
  }
  
  // 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
  // PhantomJS and old webkit had a broken Date implementation.
  var date       = new Date(-5e13 - 1)
    , brokenDate = !(date.toISOString && date.toISOString() == '0385-07-25T07:06:39.999Z'
        && __webpack_require__(62)(function(){ new Date(NaN).toISOString(); }));
  $def($def.P + $def.F * brokenDate, 'Date', {toISOString: function(){
    if(!isFinite(this))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }});
  
  if(classof(function(){ return arguments; }()) == 'Object')cof.classof = function(it){
    var tag = classof(it);
    return tag == 'Object' && isFunction(it.callee) ? 'Arguments' : tag;
  };

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $       = __webpack_require__(1)
    , $def    = __webpack_require__(3)
    , toIndex = $.toIndex;
  $def($def.P, 'Array', {
    // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
    copyWithin: function copyWithin(target/* = 0 */, start /* = 0, end = @length */){
      var O     = Object($.assertDefined(this))
        , len   = $.toLength(O.length)
        , to    = toIndex(target, len)
        , from  = toIndex(start, len)
        , end   = arguments[2]
        , fin   = end === undefined ? len : toIndex(end, len)
        , count = Math.min(fin - from, len - to)
        , inc   = 1;
      if(from < to && to < from + count){
        inc  = -1;
        from = from + count - 1;
        to   = to   + count - 1;
      }
      while(count-- > 0){
        if(from in O)O[to] = O[from];
        else delete O[to];
        to   += inc;
        from += inc;
      } return O;
    }
  });
  __webpack_require__(31)('copyWithin');

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $       = __webpack_require__(1)
    , $def    = __webpack_require__(3)
    , toIndex = $.toIndex;
  $def($def.P, 'Array', {
    // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
    fill: function fill(value /*, start = 0, end = @length */){
      var O      = Object($.assertDefined(this))
        , length = $.toLength(O.length)
        , index  = toIndex(arguments[1], length)
        , end    = arguments[2]
        , endPos = end === undefined ? length : toIndex(end, length);
      while(endPos > index)O[index++] = value;
      return O;
    }
  });
  __webpack_require__(31)('fill');

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
  var KEY    = 'findIndex'
    , $def   = __webpack_require__(3)
    , forced = true
    , $find  = __webpack_require__(43)(6);
  // Shouldn't skip holes
  if(KEY in [])Array(1)[KEY](function(){ forced = false; });
  $def($def.P + $def.F * forced, 'Array', {
    findIndex: function findIndex(callbackfn/*, that = undefined */){
      return $find(this, callbackfn, arguments[1]);
    }
  });
  __webpack_require__(31)(KEY);

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
  var KEY    = 'find'
    , $def   = __webpack_require__(3)
    , forced = true
    , $find  = __webpack_require__(43)(5);
  // Shouldn't skip holes
  if(KEY in [])Array(1)[KEY](function(){ forced = false; });
  $def($def.P + $def.F * forced, 'Array', {
    find: function find(callbackfn/*, that = undefined */){
      return $find(this, callbackfn, arguments[1]);
    }
  });
  __webpack_require__(31)(KEY);

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

  var $     = __webpack_require__(1)
    , ctx   = __webpack_require__(26)
    , $def  = __webpack_require__(3)
    , $iter = __webpack_require__(20)
    , call  = __webpack_require__(95);
  $def($def.S + $def.F * !__webpack_require__(57)(function(iter){ Array.from(iter); }), 'Array', {
    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
    from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
      var O       = Object($.assertDefined(arrayLike))
        , mapfn   = arguments[1]
        , mapping = mapfn !== undefined
        , f       = mapping ? ctx(mapfn, arguments[2], 2) : undefined
        , index   = 0
        , length, result, step, iterator;
      if($iter.is(O)){
        iterator = $iter.get(O);
        // strange IE quirks mode bug -> use typeof instead of isFunction
        result   = new (typeof this == 'function' ? this : Array);
        for(; !(step = iterator.next()).done; index++){
          result[index] = mapping ? call(iterator, f, [step.value, index], true) : step.value;
        }
      } else {
        // strange IE quirks mode bug -> use typeof instead of isFunction
        result = new (typeof this == 'function' ? this : Array)(length = $.toLength(O.length));
        for(; length > index; index++){
          result[index] = mapping ? f(O[index], index) : O[index];
        }
      }
      result.length = index;
      return result;
    }
  });

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

  var $def = __webpack_require__(3);
  $def($def.S, 'Array', {
    // 22.1.2.3 Array.of( ...items)
    of: function of(/* ...args */){
      var index  = 0
        , length = arguments.length
        // strange IE quirks mode bug -> use typeof instead of isFunction
        , result = new (typeof this == 'function' ? this : Array)(length);
      while(length > index)result[index] = arguments[index++];
      result.length = length;
      return result;
    }
  });

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

  __webpack_require__(47)(Array);

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

  var $             = __webpack_require__(1)
    , HAS_INSTANCE  = __webpack_require__(11)('hasInstance')
    , FunctionProto = Function.prototype;
  // 19.2.3.6 Function.prototype[@@hasInstance](V)
  if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
    if(!$.isFunction(this) || !$.isObject(O))return false;
    if(!$.isObject(this.prototype))return O instanceof this;
    // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
    while(O = $.getProto(O))if(this.prototype === O)return true;
    return false;
  }});

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $    = __webpack_require__(1)
    , NAME = 'name'
    , setDesc = $.setDesc
    , FunctionProto = Function.prototype;
  // 19.2.4.2 name
  NAME in FunctionProto || $.FW && $.DESC && setDesc(FunctionProto, NAME, {
    configurable: true,
    get: function(){
      var match = String(this).match(/^\s*function ([^ (]*)/)
        , name  = match ? match[1] : '';
      $.has(this, NAME) || setDesc(this, NAME, $.desc(5, name));
      return name;
    },
    set: function(value){
      $.has(this, NAME) || setDesc(this, NAME, $.desc(0, value));
    }
  });

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var strong = __webpack_require__(89);
  
  // 23.1 Map Objects
  __webpack_require__(44)('Map', function(get){
    return function Map(){ return get(this, arguments[0]); };
  }, {
    // 23.1.3.6 Map.prototype.get(key)
    get: function get(key){
      var entry = strong.getEntry(this, key);
      return entry && entry.v;
    },
    // 23.1.3.9 Map.prototype.set(key, value)
    set: function set(key, value){
      return strong.def(this, key === 0 ? 0 : key, value);
    }
  }, strong, true);

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

  var Infinity = 1 / 0
    , $def  = __webpack_require__(3)
    , E     = Math.E
    , pow   = Math.pow
    , abs   = Math.abs
    , exp   = Math.exp
    , log   = Math.log
    , sqrt  = Math.sqrt
    , ceil  = Math.ceil
    , floor = Math.floor
    , EPSILON   = pow(2, -52)
    , EPSILON32 = pow(2, -23)
    , MAX32     = pow(2, 127) * (2 - EPSILON32)
    , MIN32     = pow(2, -126);
  function roundTiesToEven(n){
    return n + 1 / EPSILON - 1 / EPSILON;
  }
  
  // 20.2.2.28 Math.sign(x)
  function sign(x){
    return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
  }
  // 20.2.2.5 Math.asinh(x)
  function asinh(x){
    return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
  }
  // 20.2.2.14 Math.expm1(x)
  function expm1(x){
    return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
  }
  
  $def($def.S, 'Math', {
    // 20.2.2.3 Math.acosh(x)
    acosh: function acosh(x){
      return (x = +x) < 1 ? NaN : isFinite(x) ? log(x / E + sqrt(x + 1) * sqrt(x - 1) / E) + 1 : x;
    },
    // 20.2.2.5 Math.asinh(x)
    asinh: asinh,
    // 20.2.2.7 Math.atanh(x)
    atanh: function atanh(x){
      return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
    },
    // 20.2.2.9 Math.cbrt(x)
    cbrt: function cbrt(x){
      return sign(x = +x) * pow(abs(x), 1 / 3);
    },
    // 20.2.2.11 Math.clz32(x)
    clz32: function clz32(x){
      return (x >>>= 0) ? 31 - floor(log(x + 0.5) * Math.LOG2E) : 32;
    },
    // 20.2.2.12 Math.cosh(x)
    cosh: function cosh(x){
      return (exp(x = +x) + exp(-x)) / 2;
    },
    // 20.2.2.14 Math.expm1(x)
    expm1: expm1,
    // 20.2.2.16 Math.fround(x)
    fround: function fround(x){
      var $abs  = abs(x)
        , $sign = sign(x)
        , a, result;
      if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
      a = (1 + EPSILON32 / EPSILON) * $abs;
      result = a - (a - $abs);
      if(result > MAX32 || result != result)return $sign * Infinity;
      return $sign * result;
    },
    // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
    hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
      var sum  = 0
        , i    = 0
        , len  = arguments.length
        , larg = 0
        , arg, div;
      while(i < len){
        arg = abs(arguments[i++]);
        if(larg < arg){
          div  = larg / arg;
          sum  = sum * div * div + 1;
          larg = arg;
        } else if(arg > 0){
          div  = arg / larg;
          sum += div * div;
        } else sum += arg;
      }
      return larg === Infinity ? Infinity : larg * sqrt(sum);
    },
    // 20.2.2.18 Math.imul(x, y)
    imul: function imul(x, y){
      var UInt16 = 0xffff
        , xn = +x
        , yn = +y
        , xl = UInt16 & xn
        , yl = UInt16 & yn;
      return 0 | xl * yl + ((UInt16 & xn >>> 16) * yl + xl * (UInt16 & yn >>> 16) << 16 >>> 0);
    },
    // 20.2.2.20 Math.log1p(x)
    log1p: function log1p(x){
      return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
    },
    // 20.2.2.21 Math.log10(x)
    log10: function log10(x){
      return log(x) / Math.LN10;
    },
    // 20.2.2.22 Math.log2(x)
    log2: function log2(x){
      return log(x) / Math.LN2;
    },
    // 20.2.2.28 Math.sign(x)
    sign: sign,
    // 20.2.2.30 Math.sinh(x)
    sinh: function sinh(x){
      return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
    },
    // 20.2.2.33 Math.tanh(x)
    tanh: function tanh(x){
      var a = expm1(x = +x)
        , b = expm1(-x);
      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
    },
    // 20.2.2.34 Math.trunc(x)
    trunc: function trunc(it){
      return (it > 0 ? floor : ceil)(it);
    }
  });

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $          = __webpack_require__(1)
    , isObject   = $.isObject
    , isFunction = $.isFunction
    , NUMBER     = 'Number'
    , $Number    = $.g[NUMBER]
    , Base       = $Number
    , proto      = $Number.prototype;
  function toPrimitive(it){
    var fn, val;
    if(isFunction(fn = it.valueOf) && !isObject(val = fn.call(it)))return val;
    if(isFunction(fn = it.toString) && !isObject(val = fn.call(it)))return val;
    throw TypeError("Can't convert object to number");
  }
  function toNumber(it){
    if(isObject(it))it = toPrimitive(it);
    if(typeof it == 'string' && it.length > 2 && it.charCodeAt(0) == 48){
      var binary = false;
      switch(it.charCodeAt(1)){
        case 66 : case 98  : binary = true;
        case 79 : case 111 : return parseInt(it.slice(2), binary ? 2 : 8);
      }
    } return +it;
  }
  if($.FW && !($Number('0o1') && $Number('0b1'))){
    $Number = function Number(it){
      return this instanceof $Number ? new Base(toNumber(it)) : toNumber(it);
    };
    $.each.call($.DESC ? $.getNames(Base) : (
        // ES3:
        'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
        // ES6 (in case, if modules with ES6 Number statics required before):
        'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
        'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
      ).split(','), function(key){
        if($.has(Base, key) && !$.has($Number, key)){
          $.setDesc($Number, key, $.getDesc(Base, key));
        }
      }
    );
    $Number.prototype = proto;
    proto.constructor = $Number;
    __webpack_require__(21)($.g, NUMBER, $Number);
  }

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

  var $     = __webpack_require__(1)
    , $def  = __webpack_require__(3)
    , abs   = Math.abs
    , floor = Math.floor
    , _isFinite = $.g.isFinite
    , MAX_SAFE_INTEGER = 0x1fffffffffffff; // pow(2, 53) - 1 == 9007199254740991;
  function isInteger(it){
    return !$.isObject(it) && _isFinite(it) && floor(it) === it;
  }
  $def($def.S, 'Number', {
    // 20.1.2.1 Number.EPSILON
    EPSILON: Math.pow(2, -52),
    // 20.1.2.2 Number.isFinite(number)
    isFinite: function isFinite(it){
      return typeof it == 'number' && _isFinite(it);
    },
    // 20.1.2.3 Number.isInteger(number)
    isInteger: isInteger,
    // 20.1.2.4 Number.isNaN(number)
    isNaN: function isNaN(number){
      return number != number;
    },
    // 20.1.2.5 Number.isSafeInteger(number)
    isSafeInteger: function isSafeInteger(number){
      return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
    },
    // 20.1.2.6 Number.MAX_SAFE_INTEGER
    MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
    // 20.1.2.10 Number.MIN_SAFE_INTEGER
    MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
    // 20.1.2.12 Number.parseFloat(string)
    parseFloat: parseFloat,
    // 20.1.2.13 Number.parseInt(string, radix)
    parseInt: parseInt
  });

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.3.1 Object.assign(target, source)
  var $def = __webpack_require__(3);
  $def($def.S, 'Object', {assign: __webpack_require__(127)});

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.3.10 Object.is(value1, value2)
  var $def = __webpack_require__(3);
  $def($def.S, 'Object', {
    is: __webpack_require__(97)
  });

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.3.19 Object.setPrototypeOf(O, proto)
  var $def = __webpack_require__(3);
  $def($def.S, 'Object', {setPrototypeOf: __webpack_require__(59).set});

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

  var $        = __webpack_require__(1)
    , $def     = __webpack_require__(3)
    , isObject = $.isObject
    , toObject = $.toObject;
  $.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
    'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
  , function(KEY, ID){
    var fn     = ($.core.Object || {})[KEY] || Object[KEY]
      , forced = 0
      , method = {};
    method[KEY] = ID == 0 ? function freeze(it){
      return isObject(it) ? fn(it) : it;
    } : ID == 1 ? function seal(it){
      return isObject(it) ? fn(it) : it;
    } : ID == 2 ? function preventExtensions(it){
      return isObject(it) ? fn(it) : it;
    } : ID == 3 ? function isFrozen(it){
      return isObject(it) ? fn(it) : true;
    } : ID == 4 ? function isSealed(it){
      return isObject(it) ? fn(it) : true;
    } : ID == 5 ? function isExtensible(it){
      return isObject(it) ? fn(it) : false;
    } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
      return fn(toObject(it), key);
    } : ID == 7 ? function getPrototypeOf(it){
      return fn(Object($.assertDefined(it)));
    } : ID == 8 ? function keys(it){
      return fn(toObject(it));
    } : __webpack_require__(94).get;
    try {
      fn('z');
    } catch(e){
      forced = 1;
    }
    $def($def.S + $def.F * forced, 'Object', method);
  });

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // 19.1.3.6 Object.prototype.toString()
  var cof = __webpack_require__(10)
    , tmp = {};
  tmp[__webpack_require__(11)('toStringTag')] = 'z';
  if(__webpack_require__(1).FW && cof(tmp) != 'z'){
    __webpack_require__(21)(Object.prototype, 'toString', function toString(){
      return '[object ' + cof.classof(this) + ']';
    }, true);
  }

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $        = __webpack_require__(1)
    , ctx      = __webpack_require__(26)
    , cof      = __webpack_require__(10)
    , $def     = __webpack_require__(3)
    , assert   = __webpack_require__(9)
    , forOf    = __webpack_require__(37)
    , setProto = __webpack_require__(59).set
    , same     = __webpack_require__(97)
    , species  = __webpack_require__(47)
    , SPECIES  = __webpack_require__(11)('species')
    , RECORD   = __webpack_require__(16).safe('record')
    , PROMISE  = 'Promise'
    , global   = $.g
    , process  = global.process
    , isNode   = cof(process) == 'process'
    , asap     = process && process.nextTick || __webpack_require__(100).set
    , P        = global[PROMISE]
    , isFunction     = $.isFunction
    , isObject       = $.isObject
    , assertFunction = assert.fn
    , assertObject   = assert.obj
    , Wrapper;
  
  function testResolve(sub){
    var test = new P(function(){});
    if(sub)test.constructor = Object;
    return P.resolve(test) === test;
  }
  
  var useNative = function(){
    var works = false;
    function P2(x){
      var self = new P(x);
      setProto(self, P2.prototype);
      return self;
    }
    try {
      works = isFunction(P) && isFunction(P.resolve) && testResolve();
      setProto(P2, P);
      P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
      // actual Firefox has broken subclass support, test that
      if(!(P2.resolve(5).then(function(){}) instanceof P2)){
        works = false;
      }
      // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
      if(works && $.DESC){
        var thenableThenGotten = false;
        P.resolve($.setDesc({}, 'then', {
          get: function(){ thenableThenGotten = true; }
        }));
        works = thenableThenGotten;
      }
    } catch(e){ works = false; }
    return works;
  }();
  
  // helpers
  function isPromise(it){
    return isObject(it) && (useNative ? cof.classof(it) == 'Promise' : RECORD in it);
  }
  function sameConstructor(a, b){
    // library wrapper special case
    if(!$.FW && a === P && b === Wrapper)return true;
    return same(a, b);
  }
  function getConstructor(C){
    var S = assertObject(C)[SPECIES];
    return S != undefined ? S : C;
  }
  function isThenable(it){
    var then;
    if(isObject(it))then = it.then;
    return isFunction(then) ? then : false;
  }
  function notify(record){
    var chain = record.c;
    // strange IE + webpack dev server bug - use .call(global)
    if(chain.length)asap.call(global, function(){
      var value = record.v
        , ok    = record.s == 1
        , i     = 0;
      function run(react){
        var cb = ok ? react.ok : react.fail
          , ret, then;
        try {
          if(cb){
            if(!ok)record.h = true;
            ret = cb === true ? value : cb(value);
            if(ret === react.P){
              react.rej(TypeError('Promise-chain cycle'));
            } else if(then = isThenable(ret)){
              then.call(ret, react.res, react.rej);
            } else react.res(ret);
          } else react.rej(value);
        } catch(err){
          react.rej(err);
        }
      }
      while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
      chain.length = 0;
    });
  }
  function isUnhandled(promise){
    var record = promise[RECORD]
      , chain  = record.a || record.c
      , i      = 0
      , react;
    if(record.h)return false;
    while(chain.length > i){
      react = chain[i++];
      if(react.fail || !isUnhandled(react.P))return false;
    } return true;
  }
  function $reject(value){
    var record = this
      , promise;
    if(record.d)return;
    record.d = true;
    record = record.r || record; // unwrap
    record.v = value;
    record.s = 2;
    record.a = record.c.slice();
    setTimeout(function(){
      // strange IE + webpack dev server bug - use .call(global)
      asap.call(global, function(){
        if(isUnhandled(promise = record.p)){
          if(isNode){
            process.emit('unhandledRejection', value, promise);
          } else if(global.console && console.error){
            console.error('Unhandled promise rejection', value);
          }
        }
        record.a = undefined;
      });
    }, 1);
    notify(record);
  }
  function $resolve(value){
    var record = this
      , then;
    if(record.d)return;
    record.d = true;
    record = record.r || record; // unwrap
    try {
      if(then = isThenable(value)){
        // strange IE + webpack dev server bug - use .call(global)
        asap.call(global, function(){
          var wrapper = {r: record, d: false}; // wrap
          try {
            then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
          } catch(e){
            $reject.call(wrapper, e);
          }
        });
      } else {
        record.v = value;
        record.s = 1;
        notify(record);
      }
    } catch(e){
      $reject.call({r: record, d: false}, e); // wrap
    }
  }
  
  // constructor polyfill
  if(!useNative){
    // 25.4.3.1 Promise(executor)
    P = function Promise(executor){
      assertFunction(executor);
      var record = {
        p: assert.inst(this, P, PROMISE),       // <- promise
        c: [],                                  // <- awaiting reactions
        a: undefined,                           // <- checked in isUnhandled reactions
        s: 0,                                   // <- state
        d: false,                               // <- done
        v: undefined,                           // <- value
        h: false                                // <- handled rejection
      };
      $.hide(this, RECORD, record);
      try {
        executor(ctx($resolve, record, 1), ctx($reject, record, 1));
      } catch(err){
        $reject.call(record, err);
      }
    };
    __webpack_require__(46)(P.prototype, {
      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
      then: function then(onFulfilled, onRejected){
        var S = assertObject(assertObject(this).constructor)[SPECIES];
        var react = {
          ok:   isFunction(onFulfilled) ? onFulfilled : true,
          fail: isFunction(onRejected)  ? onRejected  : false
        };
        var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
          react.res = assertFunction(res);
          react.rej = assertFunction(rej);
        });
        var record = this[RECORD];
        record.c.push(react);
        if(record.a)record.a.push(react);
        if(record.s)notify(record);
        return promise;
      },
      // 25.4.5.1 Promise.prototype.catch(onRejected)
      'catch': function(onRejected){
        return this.then(undefined, onRejected);
      }
    });
  }
  
  // export
  $def($def.G + $def.W + $def.F * !useNative, {Promise: P});
  cof.set(P, PROMISE);
  species(P);
  species(Wrapper = $.core[PROMISE]);
  
  // statics
  $def($def.S + $def.F * !useNative, PROMISE, {
    // 25.4.4.5 Promise.reject(r)
    reject: function reject(r){
      return new (getConstructor(this))(function(res, rej){ rej(r); });
    }
  });
  $def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
    // 25.4.4.6 Promise.resolve(x)
    resolve: function resolve(x){
      return isPromise(x) && sameConstructor(x.constructor, this)
        ? x : new this(function(res){ res(x); });
    }
  });
  $def($def.S + $def.F * !(useNative && __webpack_require__(57)(function(iter){
    P.all(iter)['catch'](function(){});
  })), PROMISE, {
    // 25.4.4.1 Promise.all(iterable)
    all: function all(iterable){
      var C      = getConstructor(this)
        , values = [];
      return new C(function(res, rej){
        forOf(iterable, false, values.push, values);
        var remaining = values.length
          , results   = Array(remaining);
        if(remaining)$.each.call(values, function(promise, index){
          C.resolve(promise).then(function(value){
            results[index] = value;
            --remaining || res(results);
          }, rej);
        });
        else res(results);
      });
    },
    // 25.4.4.4 Promise.race(iterable)
    race: function race(iterable){
      var C = getConstructor(this);
      return new C(function(res, rej){
        forOf(iterable, false, function(promise){
          C.resolve(promise).then(res, rej);
        });
      });
    }
  });

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

  var $         = __webpack_require__(1)
    , $def      = __webpack_require__(3)
    , setProto  = __webpack_require__(59)
    , $iter     = __webpack_require__(20)
    , ITERATOR  = __webpack_require__(11)('iterator')
    , ITER      = __webpack_require__(16).safe('iter')
    , step      = $iter.step
    , assert    = __webpack_require__(9)
    , isObject  = $.isObject
    , getProto  = $.getProto
    , $Reflect  = $.g.Reflect
    , _apply    = Function.apply
    , assertObject = assert.obj
    , _isExtensible = Object.isExtensible || isObject
    , _preventExtensions = Object.preventExtensions
    // IE TP has broken Reflect.enumerate
    , buggyEnumerate = !($Reflect && $Reflect.enumerate && ITERATOR in $Reflect.enumerate({}));
  
  function Enumerate(iterated){
    $.set(this, ITER, {o: iterated, k: undefined, i: 0});
  }
  $iter.create(Enumerate, 'Object', function(){
    var iter = this[ITER]
      , keys = iter.k
      , key;
    if(keys == undefined){
      iter.k = keys = [];
      for(key in iter.o)keys.push(key);
    }
    do {
      if(iter.i >= keys.length)return step(1);
    } while(!((key = keys[iter.i++]) in iter.o));
    return step(0, key);
  });
  
  var reflect = {
    // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
    apply: function apply(target, thisArgument, argumentsList){
      return _apply.call(target, thisArgument, argumentsList);
    },
    // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
    construct: function construct(target, argumentsList /*, newTarget*/){
      var proto    = assert.fn(arguments.length < 3 ? target : arguments[2]).prototype
        , instance = $.create(isObject(proto) ? proto : Object.prototype)
        , result   = _apply.call(target, instance, argumentsList);
      return isObject(result) ? result : instance;
    },
    // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
    defineProperty: function defineProperty(target, propertyKey, attributes){
      assertObject(target);
      try {
        $.setDesc(target, propertyKey, attributes);
        return true;
      } catch(e){
        return false;
      }
    },
    // 26.1.4 Reflect.deleteProperty(target, propertyKey)
    deleteProperty: function deleteProperty(target, propertyKey){
      var desc = $.getDesc(assertObject(target), propertyKey);
      return desc && !desc.configurable ? false : delete target[propertyKey];
    },
    // 26.1.6 Reflect.get(target, propertyKey [, receiver])
    get: function get(target, propertyKey/*, receiver*/){
      var receiver = arguments.length < 3 ? target : arguments[2]
        , desc = $.getDesc(assertObject(target), propertyKey), proto;
      if(desc)return $.has(desc, 'value')
        ? desc.value
        : desc.get === undefined
          ? undefined
          : desc.get.call(receiver);
      return isObject(proto = getProto(target))
        ? get(proto, propertyKey, receiver)
        : undefined;
    },
    // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
      return $.getDesc(assertObject(target), propertyKey);
    },
    // 26.1.8 Reflect.getPrototypeOf(target)
    getPrototypeOf: function getPrototypeOf(target){
      return getProto(assertObject(target));
    },
    // 26.1.9 Reflect.has(target, propertyKey)
    has: function has(target, propertyKey){
      return propertyKey in target;
    },
    // 26.1.10 Reflect.isExtensible(target)
    isExtensible: function isExtensible(target){
      return _isExtensible(assertObject(target));
    },
    // 26.1.11 Reflect.ownKeys(target)
    ownKeys: __webpack_require__(96),
    // 26.1.12 Reflect.preventExtensions(target)
    preventExtensions: function preventExtensions(target){
      assertObject(target);
      try {
        if(_preventExtensions)_preventExtensions(target);
        return true;
      } catch(e){
        return false;
      }
    },
    // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
    set: function set(target, propertyKey, V/*, receiver*/){
      var receiver = arguments.length < 4 ? target : arguments[3]
        , ownDesc  = $.getDesc(assertObject(target), propertyKey)
        , existingDescriptor, proto;
      if(!ownDesc){
        if(isObject(proto = getProto(target))){
          return set(proto, propertyKey, V, receiver);
        }
        ownDesc = $.desc(0);
      }
      if($.has(ownDesc, 'value')){
        if(ownDesc.writable === false || !isObject(receiver))return false;
        existingDescriptor = $.getDesc(receiver, propertyKey) || $.desc(0);
        existingDescriptor.value = V;
        $.setDesc(receiver, propertyKey, existingDescriptor);
        return true;
      }
      return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
    }
  };
  // 26.1.14 Reflect.setPrototypeOf(target, proto)
  if(setProto)reflect.setPrototypeOf = function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  };
  
  $def($def.G, {Reflect: {}});
  
  $def($def.S + $def.F * buggyEnumerate, 'Reflect', {
    // 26.1.5 Reflect.enumerate(target)
    enumerate: function enumerate(target){
      return new Enumerate(assertObject(target));
    }
  });
  
  $def($def.S, 'Reflect', reflect);

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

  var $       = __webpack_require__(1)
    , cof     = __webpack_require__(10)
    , $RegExp = $.g.RegExp
    , Base    = $RegExp
    , proto   = $RegExp.prototype
    , re      = /a/g
    // "new" creates a new object
    , CORRECT_NEW = new $RegExp(re) !== re
    // RegExp allows a regex with flags as the pattern
    , ALLOWS_RE_WITH_FLAGS = function(){
      try {
        return $RegExp(re, 'i') == '/a/i';
      } catch(e){ /* empty */ }
    }();
  if($.FW && $.DESC){
    if(!CORRECT_NEW || !ALLOWS_RE_WITH_FLAGS){
      $RegExp = function RegExp(pattern, flags){
        var patternIsRegExp  = cof(pattern) == 'RegExp'
          , flagsIsUndefined = flags === undefined;
        if(!(this instanceof $RegExp) && patternIsRegExp && flagsIsUndefined)return pattern;
        return CORRECT_NEW
          ? new Base(patternIsRegExp && !flagsIsUndefined ? pattern.source : pattern, flags)
          : new Base(patternIsRegExp ? pattern.source : pattern
            , patternIsRegExp && flagsIsUndefined ? pattern.flags : flags);
      };
      $.each.call($.getNames(Base), function(key){
        key in $RegExp || $.setDesc($RegExp, key, {
          configurable: true,
          get: function(){ return Base[key]; },
          set: function(it){ Base[key] = it; }
        });
      });
      proto.constructor = $RegExp;
      $RegExp.prototype = proto;
      __webpack_require__(21)($.g, 'RegExp', $RegExp);
    }
    // 21.2.5.3 get RegExp.prototype.flags()
    if(/./g.flags != 'g')$.setDesc(proto, 'flags', {
      configurable: true,
      get: __webpack_require__(58)(/^.*\/(\w*)$/, '$1')
    });
  }
  __webpack_require__(47)($RegExp);

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var strong = __webpack_require__(89);
  
  // 23.2 Set Objects
  __webpack_require__(44)('Set', function(get){
    return function Set(){ return get(this, arguments[0]); };
  }, {
    // 23.2.3.1 Set.prototype.add(value)
    add: function add(value){
      return strong.def(this, value = value === 0 ? 0 : value, value);
    }
  }, strong);

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def = __webpack_require__(3)
    , $at  = __webpack_require__(61)(false);
  $def($def.P, 'String', {
    // 21.1.3.3 String.prototype.codePointAt(pos)
    codePointAt: function codePointAt(pos){
      return $at(this, pos);
    }
  });

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $    = __webpack_require__(1)
    , cof  = __webpack_require__(10)
    , $def = __webpack_require__(3)
    , toLength = $.toLength;
  
  // should throw error on regex
  $def($def.P + $def.F * !__webpack_require__(62)(function(){ 'q'.endsWith(/./); }), 'String', {
    // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
    endsWith: function endsWith(searchString /*, endPosition = @length */){
      if(cof(searchString) == 'RegExp')throw TypeError();
      var that = String($.assertDefined(this))
        , endPosition = arguments[1]
        , len = toLength(that.length)
        , end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
      searchString += '';
      return that.slice(end - searchString.length, end) === searchString;
    }
  });

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

  var $def    = __webpack_require__(3)
    , toIndex = __webpack_require__(1).toIndex
    , fromCharCode = String.fromCharCode
    , $fromCodePoint = String.fromCodePoint;
  
  // length should be 1, old FF problem
  $def($def.S + $def.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
    // 21.1.2.2 String.fromCodePoint(...codePoints)
    fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
      var res = []
        , len = arguments.length
        , i   = 0
        , code;
      while(len > i){
        code = +arguments[i++];
        if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
        res.push(code < 0x10000
          ? fromCharCode(code)
          : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
        );
      } return res.join('');
    }
  });

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $    = __webpack_require__(1)
    , cof  = __webpack_require__(10)
    , $def = __webpack_require__(3);
  
  $def($def.P, 'String', {
    // 21.1.3.7 String.prototype.includes(searchString, position = 0)
    includes: function includes(searchString /*, position = 0 */){
      if(cof(searchString) == 'RegExp')throw TypeError();
      return !!~String($.assertDefined(this)).indexOf(searchString, arguments[1]);
    }
  });

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

  var set   = __webpack_require__(1).set
    , $at   = __webpack_require__(61)(true)
    , ITER  = __webpack_require__(16).safe('iter')
    , $iter = __webpack_require__(20)
    , step  = $iter.step;
  
  // 21.1.3.27 String.prototype[@@iterator]()
  __webpack_require__(56)(String, 'String', function(iterated){
    set(this, ITER, {o: String(iterated), i: 0});
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
  }, function(){
    var iter  = this[ITER]
      , O     = iter.o
      , index = iter.i
      , point;
    if(index >= O.length)return step(1);
    point = $at(O, index);
    iter.i += point.length;
    return step(0, point);
  });

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

  var $    = __webpack_require__(1)
    , $def = __webpack_require__(3);
  
  $def($def.S, 'String', {
    // 21.1.2.4 String.raw(callSite, ...substitutions)
    raw: function raw(callSite){
      var tpl = $.toObject(callSite.raw)
        , len = $.toLength(tpl.length)
        , sln = arguments.length
        , res = []
        , i   = 0;
      while(len > i){
        res.push(String(tpl[i++]));
        if(i < sln)res.push(String(arguments[i]));
      } return res.join('');
    }
  });

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

  var $def = __webpack_require__(3);
  
  $def($def.P, 'String', {
    // 21.1.3.13 String.prototype.repeat(count)
    repeat: __webpack_require__(99)
  });

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $    = __webpack_require__(1)
    , cof  = __webpack_require__(10)
    , $def = __webpack_require__(3);
  
  // should throw error on regex
  $def($def.P + $def.F * !__webpack_require__(62)(function(){ 'q'.startsWith(/./); }), 'String', {
    // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
    startsWith: function startsWith(searchString /*, position = 0 */){
      if(cof(searchString) == 'RegExp')throw TypeError();
      var that  = String($.assertDefined(this))
        , index = $.toLength(Math.min(arguments[1], that.length));
      searchString += '';
      return that.slice(index, index + searchString.length) === searchString;
    }
  });

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // ECMAScript 6 symbols shim
  var $        = __webpack_require__(1)
    , setTag   = __webpack_require__(10).set
    , uid      = __webpack_require__(16)
    , shared   = __webpack_require__(60)
    , $def     = __webpack_require__(3)
    , $redef   = __webpack_require__(21)
    , keyOf    = __webpack_require__(129)
    , enumKeys = __webpack_require__(93)
    , assertObject = __webpack_require__(9).obj
    , ObjectProto = Object.prototype
    , DESC     = $.DESC
    , has      = $.has
    , $create  = $.create
    , getDesc  = $.getDesc
    , setDesc  = $.setDesc
    , desc     = $.desc
    , $names   = __webpack_require__(94)
    , getNames = $names.get
    , toObject = $.toObject
    , $Symbol  = $.g.Symbol
    , setter   = false
    , TAG      = uid('tag')
    , HIDDEN   = uid('hidden')
    , _propertyIsEnumerable = {}.propertyIsEnumerable
    , SymbolRegistry = shared('symbol-registry')
    , AllSymbols = shared('symbols')
    , useNative = $.isFunction($Symbol);
  
  var setSymbolDesc = DESC ? function(){ // fallback for old Android
    try {
      return $create(setDesc({}, HIDDEN, {
        get: function(){
          return setDesc(this, HIDDEN, {value: false})[HIDDEN];
        }
      }))[HIDDEN] || setDesc;
    } catch(e){
      return function(it, key, D){
        var protoDesc = getDesc(ObjectProto, key);
        if(protoDesc)delete ObjectProto[key];
        setDesc(it, key, D);
        if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
      };
    }
  }() : setDesc;
  
  function wrap(tag){
    var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
    DESC && setter && setSymbolDesc(ObjectProto, tag, {
      configurable: true,
      set: function(value){
        if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, desc(1, value));
      }
    });
    return sym;
  }
  
  function defineProperty(it, key, D){
    if(D && has(AllSymbols, key)){
      if(!D.enumerable){
        if(!has(it, HIDDEN))setDesc(it, HIDDEN, desc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
        D = $create(D, {enumerable: desc(0, false)});
      } return setSymbolDesc(it, key, D);
    } return setDesc(it, key, D);
  }
  function defineProperties(it, P){
    assertObject(it);
    var keys = enumKeys(P = toObject(P))
      , i    = 0
      , l = keys.length
      , key;
    while(l > i)defineProperty(it, key = keys[i++], P[key]);
    return it;
  }
  function create(it, P){
    return P === undefined ? $create(it) : defineProperties($create(it), P);
  }
  function propertyIsEnumerable(key){
    var E = _propertyIsEnumerable.call(this, key);
    return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
      ? E : true;
  }
  function getOwnPropertyDescriptor(it, key){
    var D = getDesc(it = toObject(it), key);
    if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
    return D;
  }
  function getOwnPropertyNames(it){
    var names  = getNames(toObject(it))
      , result = []
      , i      = 0
      , key;
    while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
    return result;
  }
  function getOwnPropertySymbols(it){
    var names  = getNames(toObject(it))
      , result = []
      , i      = 0
      , key;
    while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
    return result;
  }
  
  // 19.4.1.1 Symbol([description])
  if(!useNative){
    $Symbol = function Symbol(){
      if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
      return wrap(uid(arguments[0]));
    };
    $redef($Symbol.prototype, 'toString', function(){
      return this[TAG];
    });
  
    $.create     = create;
    $.setDesc    = defineProperty;
    $.getDesc    = getOwnPropertyDescriptor;
    $.setDescs   = defineProperties;
    $.getNames   = $names.get = getOwnPropertyNames;
    $.getSymbols = getOwnPropertySymbols;
  
    if($.DESC && $.FW)$redef(ObjectProto, 'propertyIsEnumerable', propertyIsEnumerable, true);
  }
  
  var symbolStatics = {
    // 19.4.2.1 Symbol.for(key)
    'for': function(key){
      return has(SymbolRegistry, key += '')
        ? SymbolRegistry[key]
        : SymbolRegistry[key] = $Symbol(key);
    },
    // 19.4.2.5 Symbol.keyFor(sym)
    keyFor: function keyFor(key){
      return keyOf(SymbolRegistry, key);
    },
    useSetter: function(){ setter = true; },
    useSimple: function(){ setter = false; }
  };
  // 19.4.2.2 Symbol.hasInstance
  // 19.4.2.3 Symbol.isConcatSpreadable
  // 19.4.2.4 Symbol.iterator
  // 19.4.2.6 Symbol.match
  // 19.4.2.8 Symbol.replace
  // 19.4.2.9 Symbol.search
  // 19.4.2.10 Symbol.species
  // 19.4.2.11 Symbol.split
  // 19.4.2.12 Symbol.toPrimitive
  // 19.4.2.13 Symbol.toStringTag
  // 19.4.2.14 Symbol.unscopables
  $.each.call((
      'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
      'species,split,toPrimitive,toStringTag,unscopables'
    ).split(','), function(it){
      var sym = __webpack_require__(11)(it);
      symbolStatics[it] = useNative ? sym : wrap(sym);
    }
  );
  
  setter = true;
  
  $def($def.G + $def.W, {Symbol: $Symbol});
  
  $def($def.S, 'Symbol', symbolStatics);
  
  $def($def.S + $def.F * !useNative, 'Object', {
    // 19.1.2.2 Object.create(O [, Properties])
    create: create,
    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
    defineProperty: defineProperty,
    // 19.1.2.3 Object.defineProperties(O, Properties)
    defineProperties: defineProperties,
    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: getOwnPropertyDescriptor,
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: getOwnPropertyNames,
    // 19.1.2.8 Object.getOwnPropertySymbols(O)
    getOwnPropertySymbols: getOwnPropertySymbols
  });
  
  // 19.4.3.5 Symbol.prototype[@@toStringTag]
  setTag($Symbol, 'Symbol');
  // 20.2.1.9 Math[@@toStringTag]
  setTag(Math, 'Math', true);
  // 24.3.3 JSON[@@toStringTag]
  setTag($.g.JSON, 'JSON', true);

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $         = __webpack_require__(1)
    , weak      = __webpack_require__(91)
    , leakStore = weak.leakStore
    , ID        = weak.ID
    , WEAK      = weak.WEAK
    , has       = $.has
    , isObject  = $.isObject
    , isExtensible = Object.isExtensible || isObject
    , tmp       = {};
  
  // 23.3 WeakMap Objects
  var $WeakMap = __webpack_require__(44)('WeakMap', function(get){
    return function WeakMap(){ return get(this, arguments[0]); };
  }, {
    // 23.3.3.3 WeakMap.prototype.get(key)
    get: function get(key){
      if(isObject(key)){
        if(!isExtensible(key))return leakStore(this).get(key);
        if(has(key, WEAK))return key[WEAK][this[ID]];
      }
    },
    // 23.3.3.5 WeakMap.prototype.set(key, value)
    set: function set(key, value){
      return weak.def(this, key, value);
    }
  }, weak, true, true);
  
  // IE11 WeakMap frozen keys fix
  if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
    $.each.call(['delete', 'has', 'get', 'set'], function(key){
      var proto  = $WeakMap.prototype
        , method = proto[key];
      __webpack_require__(21)(proto, key, function(a, b){
        // store frozen objects on leaky map
        if(isObject(a) && !isExtensible(a)){
          var result = leakStore(this)[key](a, b);
          return key == 'set' ? this : result;
        // store all the rest on native weakmap
        } return method.call(this, a, b);
      });
    });
  }

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var weak = __webpack_require__(91);
  
  // 23.4 WeakSet Objects
  __webpack_require__(44)('WeakSet', function(get){
    return function WeakSet(){ return get(this, arguments[0]); };
  }, {
    // 23.4.3.1 WeakSet.prototype.add(value)
    add: function add(value){
      return weak.def(this, value, true);
    }
  }, weak, false, true);

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def      = __webpack_require__(3)
    , $includes = __webpack_require__(88)(true);
  $def($def.P, 'Array', {
    // https://github.com/domenic/Array.prototype.includes
    includes: function includes(el /*, fromIndex = 0 */){
      return $includes(this, el, arguments[1]);
    }
  });
  __webpack_require__(31)('includes');

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/DavidBruant/Map-Set.prototype.toJSON
  __webpack_require__(90)('Map');

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

  // https://gist.github.com/WebReflection/9353781
  var $       = __webpack_require__(1)
    , $def    = __webpack_require__(3)
    , ownKeys = __webpack_require__(96);
  
  $def($def.S, 'Object', {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
      var O      = $.toObject(object)
        , result = {};
      $.each.call(ownKeys(O), function(key){
        $.setDesc(result, key, $.desc(0, $.getDesc(O, key)));
      });
      return result;
    }
  });

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

  // http://goo.gl/XkBrjD
  var $    = __webpack_require__(1)
    , $def = __webpack_require__(3);
  function createObjectToArray(isEntries){
    return function(object){
      var O      = $.toObject(object)
        , keys   = $.getKeys(O)
        , length = keys.length
        , i      = 0
        , result = Array(length)
        , key;
      if(isEntries)while(length > i)result[i] = [key = keys[i++], O[key]];
      else while(length > i)result[i] = O[keys[i++]];
      return result;
    };
  }
  $def($def.S, 'Object', {
    values:  createObjectToArray(false),
    entries: createObjectToArray(true)
  });

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/benjamingr/RexExp.escape
  var $def = __webpack_require__(3);
  $def($def.S, 'RegExp', {
    escape: __webpack_require__(58)(/[\\^$*+?.()|[\]{}]/g, '\\$&', true)
  });


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/DavidBruant/Map-Set.prototype.toJSON
  __webpack_require__(90)('Set');

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/mathiasbynens/String.prototype.at
  'use strict';
  var $def = __webpack_require__(3)
    , $at  = __webpack_require__(61)(true);
  $def($def.P, 'String', {
    at: function at(pos){
      return $at(this, pos);
    }
  });

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def = __webpack_require__(3)
    , $pad = __webpack_require__(98);
  $def($def.P, 'String', {
    lpad: function lpad(n){
      return $pad(this, n, arguments[1], true);
    }
  });

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def = __webpack_require__(3)
    , $pad = __webpack_require__(98);
  $def($def.P, 'String', {
    rpad: function rpad(n){
      return $pad(this, n, arguments[1], false);
    }
  });

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

  // JavaScript 1.6 / Strawman array statics shim
  var $       = __webpack_require__(1)
    , $def    = __webpack_require__(3)
    , $Array  = $.core.Array || Array
    , statics = {};
  function setStatics(keys, length){
    $.each.call(keys.split(','), function(key){
      if(length == undefined && key in $Array)statics[key] = $Array[key];
      else if(key in [])statics[key] = __webpack_require__(26)(Function.call, [][key], length);
    });
  }
  setStatics('pop,reverse,shift,keys,values,entries', 1);
  setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
  setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
             'reduce,reduceRight,copyWithin,fill,turn');
  $def($def.S, 'Array', statics);

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

  __webpack_require__(101);
  var $           = __webpack_require__(1)
    , Iterators   = __webpack_require__(20).Iterators
    , ITERATOR    = __webpack_require__(11)('iterator')
    , ArrayValues = Iterators.Array
    , NL          = $.g.NodeList
    , HTC         = $.g.HTMLCollection
    , NLProto     = NL && NL.prototype
    , HTCProto    = HTC && HTC.prototype;
  if($.FW){
    if(NL && !(ITERATOR in NLProto))$.hide(NLProto, ITERATOR, ArrayValues);
    if(HTC && !(ITERATOR in HTCProto))$.hide(HTCProto, ITERATOR, ArrayValues);
  }
  Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

  var $def  = __webpack_require__(3)
    , $task = __webpack_require__(100);
  $def($def.G + $def.B, {
    setImmediate:   $task.set,
    clearImmediate: $task.clear
  });

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

  // ie9- setTimeout & setInterval additional parameters fix
  var $         = __webpack_require__(1)
    , $def      = __webpack_require__(3)
    , invoke    = __webpack_require__(45)
    , partial   = __webpack_require__(130)
    , navigator = $.g.navigator
    , MSIE      = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
  function wrap(set){
    return MSIE ? function(fn, time /*, ...args */){
      return set(invoke(
        partial,
        [].slice.call(arguments, 2),
        $.isFunction(fn) ? fn : Function(fn)
      ), time);
    } : set;
  }
  $def($def.G + $def.B + $def.F * MSIE, {
    setTimeout:  wrap($.g.setTimeout),
    setInterval: wrap($.g.setInterval)
  });

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

  __webpack_require__(131);
  __webpack_require__(162);
  __webpack_require__(145);
  __webpack_require__(146);
  __webpack_require__(147);
  __webpack_require__(149);
  __webpack_require__(148);
  __webpack_require__(140);
  __webpack_require__(139);
  __webpack_require__(143);
  __webpack_require__(144);
  __webpack_require__(142);
  __webpack_require__(156);
  __webpack_require__(159);
  __webpack_require__(158);
  __webpack_require__(154);
  __webpack_require__(155);
  __webpack_require__(157);
  __webpack_require__(160);
  __webpack_require__(161);
  __webpack_require__(136);
  __webpack_require__(137);
  __webpack_require__(101);
  __webpack_require__(138);
  __webpack_require__(132);
  __webpack_require__(133);
  __webpack_require__(135);
  __webpack_require__(134);
  __webpack_require__(152);
  __webpack_require__(150);
  __webpack_require__(141);
  __webpack_require__(153);
  __webpack_require__(163);
  __webpack_require__(164);
  __webpack_require__(151);
  __webpack_require__(165);
  __webpack_require__(171);
  __webpack_require__(172);
  __webpack_require__(173);
  __webpack_require__(169);
  __webpack_require__(167);
  __webpack_require__(168);
  __webpack_require__(166);
  __webpack_require__(170);
  __webpack_require__(174);
  __webpack_require__(177);
  __webpack_require__(176);
  __webpack_require__(175);
  module.exports = __webpack_require__(1).core;


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

  /* WEBPACK VAR INJECTION */(function(global, process) {/**
   * Copyright (c) 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
   * additional grant of patent rights can be found in the PATENTS file in
   * the same directory.
   */
  
  !(function(global) {
    "use strict";
  
    var hasOwn = Object.prototype.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var iteratorSymbol =
      typeof Symbol === "function" && Symbol.iterator || "@@iterator";
  
    var inModule = typeof module === "object";
    var runtime = global.regeneratorRuntime;
    if (runtime) {
      if (inModule) {
        // If regeneratorRuntime is defined globally and we're in a module,
        // make the exports object identical to regeneratorRuntime.
        module.exports = runtime;
      }
      // Don't bother evaluating the rest of this file if the runtime was
      // already defined globally.
      return;
    }
  
    // Define the runtime globally (as expected by generated code) as either
    // module.exports (if we're in a module) or a new, empty object.
    runtime = global.regeneratorRuntime = inModule ? module.exports : {};
  
    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided, then outerFn.prototype instanceof Generator.
      var generator = Object.create((outerFn || Generator).prototype);
  
      generator._invoke = makeInvokeMethod(
        innerFn, self || null,
        new Context(tryLocsList || [])
      );
  
      return generator;
    }
    runtime.wrap = wrap;
  
    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }
  
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
  
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};
  
    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
  
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = "GeneratorFunction";
  
    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        prototype[method] = function(arg) {
          return this._invoke(method, arg);
        };
      });
    }
  
    runtime.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };
  
    runtime.mark = function(genFun) {
      genFun.__proto__ = GeneratorFunctionPrototype;
      genFun.prototype = Object.create(Gp);
      return genFun;
    };
  
    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `value instanceof AwaitArgument` to determine if the yielded value is
    // meant to be awaited. Some may consider the name of this method too
    // cutesy, but they are curmudgeons.
    runtime.awrap = function(arg) {
      return new AwaitArgument(arg);
    };
  
    function AwaitArgument(arg) {
      this.arg = arg;
    }
  
    function AsyncIterator(generator) {
      // This invoke function is written in a style that assumes some
      // calling function (or Promise) will handle exceptions.
      function invoke(method, arg) {
        var result = generator[method](arg);
        var value = result.value;
        return value instanceof AwaitArgument
          ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
          : Promise.resolve(value).then(function(unwrapped) {
              // When a yielded Promise is resolved, its final value becomes
              // the .value of the Promise<{value,done}> result for the
              // current iteration. If the Promise is rejected, however, the
              // result for this iteration will be rejected with the same
              // reason. Note that rejections of yielded Promises are not
              // thrown back into the generator function, as is the case
              // when an awaited Promise is rejected. This difference in
              // behavior between yield and await is important, because it
              // allows the consumer to decide what to do with the yielded
              // rejection (swallow it and continue, manually .throw it back
              // into the generator, abandon iteration, whatever). With
              // await, by contrast, there is no opportunity to examine the
              // rejection reason outside the generator function, so the
              // only option is to throw it from the await expression, and
              // let the generator function handle the exception.
              result.value = unwrapped;
              return result;
            });
      }
  
      if (typeof process === "object" && process.domain) {
        invoke = process.domain.bind(invoke);
      }
  
      var invokeNext = invoke.bind(generator, "next");
      var invokeThrow = invoke.bind(generator, "throw");
      var invokeReturn = invoke.bind(generator, "return");
      var previousPromise;
  
      function enqueue(method, arg) {
        var enqueueResult =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(function() {
            return invoke(method, arg);
          }) : new Promise(function(resolve) {
            resolve(invoke(method, arg));
          });
  
        // Avoid propagating enqueueResult failures to Promises returned by
        // later invocations of the iterator.
        previousPromise = enqueueResult["catch"](function(ignored){});
  
        return enqueueResult;
      }
  
      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }
  
    defineIteratorMethods(AsyncIterator.prototype);
  
    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    runtime.async = function(innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList)
      );
  
      return runtime.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };
  
    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
  
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }
  
        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }
  
          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }
  
        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            if (method === "return" ||
                (method === "throw" && delegate.iterator[method] === undefined)) {
              // A return or throw (when the delegate iterator has no throw
              // method) always terminates the yield* loop.
              context.delegate = null;
  
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              var returnMethod = delegate.iterator["return"];
              if (returnMethod) {
                var record = tryCatch(returnMethod, delegate.iterator, arg);
                if (record.type === "throw") {
                  // If the return method threw an exception, let that
                  // exception prevail over the original return or throw.
                  method = "throw";
                  arg = record.arg;
                  continue;
                }
              }
  
              if (method === "return") {
                // Continue with the outer return, now that the delegate
                // iterator has been terminated.
                continue;
              }
            }
  
            var record = tryCatch(
              delegate.iterator[method],
              delegate.iterator,
              arg
            );
  
            if (record.type === "throw") {
              context.delegate = null;
  
              // Like returning generator.throw(uncaught), but without the
              // overhead of an extra function call.
              method = "throw";
              arg = record.arg;
              continue;
            }
  
            // Delegate generator ran and handled its own exceptions so
            // regardless of what the method was, we continue as if it is
            // "next" with an undefined arg.
            method = "next";
            arg = undefined;
  
            var info = record.arg;
            if (info.done) {
              context[delegate.resultName] = info.value;
              context.next = delegate.nextLoc;
            } else {
              state = GenStateSuspendedYield;
              return info;
            }
  
            context.delegate = null;
          }
  
          if (method === "next") {
            if (state === GenStateSuspendedYield) {
              context.sent = arg;
            } else {
              context.sent = undefined;
            }
  
          } else if (method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw arg;
            }
  
            if (context.dispatchException(arg)) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              method = "next";
              arg = undefined;
            }
  
          } else if (method === "return") {
            context.abrupt("return", arg);
          }
  
          state = GenStateExecuting;
  
          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;
  
            var info = {
              value: record.arg,
              done: context.done
            };
  
            if (record.arg === ContinueSentinel) {
              if (context.delegate && method === "next") {
                // Deliberately forget the last sent value so that we don't
                // accidentally pass it on to the delegate.
                arg = undefined;
              }
            } else {
              return info;
            }
  
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(arg) call above.
            method = "throw";
            arg = record.arg;
          }
        }
      };
    }
  
    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);
  
    Gp[iteratorSymbol] = function() {
      return this;
    };
  
    Gp.toString = function() {
      return "[object Generator]";
    };
  
    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };
  
      if (1 in locs) {
        entry.catchLoc = locs[1];
      }
  
      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }
  
      this.tryEntries.push(entry);
    }
  
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }
  
    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }
  
    runtime.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();
  
      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }
  
        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };
  
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }
  
        if (typeof iterable.next === "function") {
          return iterable;
        }
  
        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }
  
            next.value = undefined;
            next.done = true;
  
            return next;
          };
  
          return next.next = next;
        }
      }
  
      // Return an iterator with no values.
      return { next: doneResult };
    }
    runtime.values = values;
  
    function doneResult() {
      return { value: undefined, done: true };
    }
  
    Context.prototype = {
      constructor: Context,
  
      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = undefined;
        this.done = false;
        this.delegate = null;
  
        this.tryEntries.forEach(resetTryEntry);
  
        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },
  
      stop: function() {
        this.done = true;
  
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }
  
        return this.rval;
      },
  
      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }
  
        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;
          return !!caught;
        }
  
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;
  
          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }
  
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");
  
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
  
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
  
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
  
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
  
      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
  
        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }
  
        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;
  
        if (finallyEntry) {
          this.next = finallyEntry.finallyLoc;
        } else {
          this.complete(record);
        }
  
        return ContinueSentinel;
      },
  
      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }
  
        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = record.arg;
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }
      },
  
      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
  
      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
  
        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },
  
      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };
  
        return ContinueSentinel;
      }
    };
  })(
    // Among the various tricks for obtaining a reference to the global
    // object, this seems to be the most reliable technique that does not
    // use indirect eval (which violates Content Security Policy).
    typeof global === "object" ? global :
    typeof window === "object" ? window :
    typeof self === "object" ? self : this
  );
  
  /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(211)))

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__(126);


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(8);
  
  var _react2 = _interopRequireDefault(_react);
  
  __webpack_require__(287);
  
  var _AppScss = __webpack_require__(288);
  
  var _AppScss2 = _interopRequireDefault(_AppScss);
  
  var _decoratorsWithContext = __webpack_require__(191);
  
  var _decoratorsWithContext2 = _interopRequireDefault(_decoratorsWithContext);
  
  var _decoratorsWithStyles = __webpack_require__(17);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _actionsAppActions = __webpack_require__(63);
  
  var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);
  
  var _storesAppStore = __webpack_require__(193);
  
  var _storesAppStore2 = _interopRequireDefault(_storesAppStore);
  
  var _Header = __webpack_require__(186);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _ContentPage = __webpack_require__(183);
  
  var _ContentPage2 = _interopRequireDefault(_ContentPage);
  
  var _ContactPage = __webpack_require__(182);
  
  var _ContactPage2 = _interopRequireDefault(_ContactPage);
  
  var _LoginPage = __webpack_require__(187);
  
  var _LoginPage2 = _interopRequireDefault(_LoginPage);
  
  var _RegisterPage = __webpack_require__(190);
  
  var _RegisterPage2 = _interopRequireDefault(_RegisterPage);
  
  var _NotFoundPage = __webpack_require__(189);
  
  var _NotFoundPage2 = _interopRequireDefault(_NotFoundPage);
  
  var _Feedback = __webpack_require__(184);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  var _Footer = __webpack_require__(185);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var pages = { ContentPage: _ContentPage2['default'], ContactPage: _ContactPage2['default'], LoginPage: _LoginPage2['default'], RegisterPage: _RegisterPage2['default'], NotFoundPage: _NotFoundPage2['default'] };
  
  var App = (function () {
    function App() {
      _classCallCheck(this, _App);
    }
  
    _createClass(App, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        window.addEventListener('popstate', this.handlePopState);
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps) {
        return this.props.path !== nextProps.path;
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.removeEventListener('popstate', this.handlePopState);
      }
    }, {
      key: 'handlePopState',
      value: function handlePopState(event) {
        _actionsAppActions2['default'].navigateTo(window.location.pathname, { replace: !!event.state });
      }
    }, {
      key: 'render',
      value: function render() {
        var component = undefined;
  
        switch (this.props.path) {
          case '/':
          case '/about':
          case '/privacy':
            var page = _storesAppStore2['default'].getPage(this.props.path);
            component = _react2['default'].createElement(pages[page.component], page);
            break;
  
          case '/contact':
            component = _react2['default'].createElement(_ContactPage2['default'], null);
            break;
  
          case '/login':
            component = _react2['default'].createElement(_LoginPage2['default'], null);
            break;
  
          case '/register':
            component = _react2['default'].createElement(_RegisterPage2['default'], null);
            break;
        }
  
        if (component) {
          return _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(_Header2['default'], null),
            component,
            _react2['default'].createElement(_Feedback2['default'], null),
            _react2['default'].createElement(_Footer2['default'], null)
          );
        }
  
        return _react2['default'].createElement(_NotFoundPage2['default'], null);
      }
    }], [{
      key: 'propTypes',
      value: {
        path: _react.PropTypes.string.isRequired
      },
      enumerable: true
    }]);
  
    var _App = App;
    App = (0, _decoratorsWithStyles2['default'])(_AppScss2['default'])(App) || App;
    App = (0, _decoratorsWithContext2['default'])(App) || App;
    return App;
  })();
  
  exports['default'] = App;
  module.exports = exports['default'];

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(8);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ContactPageScss = __webpack_require__(289);
  
  var _ContactPageScss2 = _interopRequireDefault(_ContactPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(17);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var ContactPage = (function () {
    function ContactPage() {
      _classCallCheck(this, _ContactPage);
    }
  
    _createClass(ContactPage, [{
      key: 'render',
      value: function render() {
        var title = 'Contact Us';
        this.context.onSetTitle(title);
        return _react2['default'].createElement(
          'div',
          { className: 'ContactPage' },
          _react2['default'].createElement(
            'div',
            { className: 'ContactPage-container' },
            _react2['default'].createElement(
              'h1',
              null,
              title
            ),
            _react2['default'].createElement(
              'p',
              null,
              '...'
            )
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _ContactPage = ContactPage;
    ContactPage = (0, _decoratorsWithStyles2['default'])(_ContactPageScss2['default'])(ContactPage) || ContactPage;
    return ContactPage;
  })();
  
  exports['default'] = ContactPage;
  module.exports = exports['default'];

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(8);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ContentPageScss = __webpack_require__(290);
  
  var _ContentPageScss2 = _interopRequireDefault(_ContentPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(17);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var ContentPage = (function () {
    function ContentPage() {
      _classCallCheck(this, _ContentPage);
    }
  
    _createClass(ContentPage, [{
      key: 'render',
      value: function render() {
        this.context.onSetTitle(this.props.title);
        return _react2['default'].createElement(
          'div',
          { className: 'ContentPage' },
          _react2['default'].createElement(
            'div',
            { className: 'ContentPage-container' },
            this.props.path === '/' ? null : _react2['default'].createElement(
              'h1',
              null,
              this.props.title
            ),
            _react2['default'].createElement('div', { dangerouslySetInnerHTML: { __html: this.props.content || '' } })
          )
        );
      }
    }], [{
      key: 'propTypes',
      value: {
        path: _react.PropTypes.string.isRequired,
        content: _react.PropTypes.string.isRequired,
        title: _react.PropTypes.string
      },
      enumerable: true
    }, {
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _ContentPage = ContentPage;
    ContentPage = (0, _decoratorsWithStyles2['default'])(_ContentPageScss2['default'])(ContentPage) || ContentPage;
    return ContentPage;
  })();
  
  exports['default'] = ContentPage;
  module.exports = exports['default'];

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(8);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FeedbackScss = __webpack_require__(291);
  
  var _FeedbackScss2 = _interopRequireDefault(_FeedbackScss);
  
  var _decoratorsWithStyles = __webpack_require__(17);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var Feedback = (function () {
    function Feedback() {
      _classCallCheck(this, _Feedback);
    }
  
    _createClass(Feedback, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { className: 'Feedback' },
          _react2['default'].createElement(
            'div',
            { className: 'Feedback-container' },
            _react2['default'].createElement(
              'a',
              { className: 'Feedback-link', href: 'https://gitter.im/kriasoft/react-starter-kit' },
              'Ask a question'
            ),
            _react2['default'].createElement(
              'span',
              { className: 'Feedback-spacer' },
              '|'
            ),
            _react2['default'].createElement(
              'a',
              { className: 'Feedback-link', href: 'https://github.com/kriasoft/react-starter-kit/issues/new' },
              'Report an issue'
            )
          )
        );
      }
    }]);
  
    var _Feedback = Feedback;
    Feedback = (0, _decoratorsWithStyles2['default'])(_FeedbackScss2['default'])(Feedback) || Feedback;
    return Feedback;
  })();
  
  exports['default'] = Feedback;
  module.exports = exports['default'];

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(8);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FooterScss = __webpack_require__(292);
  
  var _FooterScss2 = _interopRequireDefault(_FooterScss);
  
  var _decoratorsWithViewport = __webpack_require__(192);
  
  var _decoratorsWithViewport2 = _interopRequireDefault(_decoratorsWithViewport);
  
  var _decoratorsWithStyles = __webpack_require__(17);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _utilsLink = __webpack_require__(66);
  
  var _utilsLink2 = _interopRequireDefault(_utilsLink);
  
  var Footer = (function () {
    function Footer() {
      _classCallCheck(this, _Footer);
    }
  
    _createClass(Footer, [{
      key: 'render',
      value: function render() {
        // This is just an example how one can render CSS
        var _props$viewport = this.props.viewport;
        var width = _props$viewport.width;
        var height = _props$viewport.height;
  
        this.renderCss('.Footer-viewport:after {content:\' ' + width + 'x' + height + '\';}');
  
        return _react2['default'].createElement(
          'div',
          { className: 'Footer' },
          _react2['default'].createElement(
            'div',
            { className: 'Footer-container' },
            _react2['default'].createElement(
              'span',
              { className: 'Footer-text' },
              '© Your Company'
            ),
            _react2['default'].createElement(
              'span',
              { className: 'Footer-spacer' },
              '·'
            ),
            _react2['default'].createElement(
              'a',
              { className: 'Footer-link', href: '/', onClick: _utilsLink2['default'].handleClick },
              'Home'
            ),
            _react2['default'].createElement(
              'span',
              { className: 'Footer-spacer' },
              '·'
            ),
            _react2['default'].createElement(
              'a',
              { className: 'Footer-link', href: '/privacy', onClick: _utilsLink2['default'].handleClick },
              'Privacy'
            ),
            _react2['default'].createElement(
              'span',
              { className: 'Footer-spacer' },
              '·'
            ),
            _react2['default'].createElement(
              'a',
              { className: 'Footer-link', href: '/not-found', onClick: _utilsLink2['default'].handleClick },
              'Not Found'
            ),
            _react2['default'].createElement(
              'span',
              { className: 'Footer-spacer' },
              ' | '
            ),
            _react2['default'].createElement(
              'span',
              { ref: 'viewport', className: 'Footer-viewport Footer-text Footer-text--muted' },
              'Viewport:'
            )
          )
        );
      }
    }], [{
      key: 'propTypes',
      value: {
        viewport: _react.PropTypes.shape({
          width: _react.PropTypes.number.isRequired,
          height: _react.PropTypes.number.isRequired
        }).isRequired
      },
      enumerable: true
    }]);
  
    var _Footer = Footer;
    Footer = (0, _decoratorsWithStyles2['default'])(_FooterScss2['default'])(Footer) || Footer;
    Footer = (0, _decoratorsWithViewport2['default'])(Footer) || Footer;
    return Footer;
  })();
  
  exports['default'] = Footer;
  module.exports = exports['default'];

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(8);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeaderScss = __webpack_require__(293);
  
  var _HeaderScss2 = _interopRequireDefault(_HeaderScss);
  
  var _decoratorsWithStyles = __webpack_require__(17);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _utilsLink = __webpack_require__(66);
  
  var _utilsLink2 = _interopRequireDefault(_utilsLink);
  
  var _Navigation = __webpack_require__(188);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var Header = (function () {
    function Header() {
      _classCallCheck(this, _Header);
    }
  
    _createClass(Header, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { className: 'Header' },
          _react2['default'].createElement(
            'div',
            { className: 'Header-container' },
            _react2['default'].createElement(
              'a',
              { className: 'Header-brand', href: '/', onClick: _utilsLink2['default'].handleClick },
              _react2['default'].createElement('img', { className: 'Header-brandImg', src: __webpack_require__(301), width: '38', height: '38', alt: 'React' }),
              _react2['default'].createElement(
                'span',
                { className: 'Header-brandTxt' },
                'Your Company'
              )
            ),
            _react2['default'].createElement(_Navigation2['default'], { className: 'Header-nav' }),
            _react2['default'].createElement(
              'div',
              { className: 'Header-banner' },
              _react2['default'].createElement(
                'h1',
                { className: 'Header-bannerTitle' },
                'React'
              ),
              _react2['default'].createElement(
                'p',
                { className: 'Header-bannerDesc' },
                'Complex web apps made easy'
              )
            )
          )
        );
      }
    }]);
  
    var _Header = Header;
    Header = (0, _decoratorsWithStyles2['default'])(_HeaderScss2['default'])(Header) || Header;
    return Header;
  })();
  
  exports['default'] = Header;
  module.exports = exports['default'];

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(8);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _LoginPageScss = __webpack_require__(294);
  
  var _LoginPageScss2 = _interopRequireDefault(_LoginPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(17);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var LoginPage = (function () {
    function LoginPage() {
      _classCallCheck(this, _LoginPage);
    }
  
    _createClass(LoginPage, [{
      key: 'render',
      value: function render() {
        var title = 'Log In';
        this.context.onSetTitle(title);
        return _react2['default'].createElement(
          'div',
          { className: 'LoginPage' },
          _react2['default'].createElement(
            'div',
            { className: 'LoginPage-container' },
            _react2['default'].createElement(
              'h1',
              null,
              title
            ),
            _react2['default'].createElement(
              'p',
              null,
              '...'
            )
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _LoginPage = LoginPage;
    LoginPage = (0, _decoratorsWithStyles2['default'])(_LoginPageScss2['default'])(LoginPage) || LoginPage;
    return LoginPage;
  })();
  
  exports['default'] = LoginPage;
  module.exports = exports['default'];

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(8);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(195);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _NavigationScss = __webpack_require__(295);
  
  var _NavigationScss2 = _interopRequireDefault(_NavigationScss);
  
  var _decoratorsWithStyles = __webpack_require__(17);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _utilsLink = __webpack_require__(66);
  
  var _utilsLink2 = _interopRequireDefault(_utilsLink);
  
  var Navigation = (function () {
    function Navigation() {
      _classCallCheck(this, _Navigation);
    }
  
    _createClass(Navigation, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { className: (0, _classnames2['default'])(this.props.className, 'Navigation'), role: 'navigation' },
          _react2['default'].createElement(
            'a',
            { className: 'Navigation-link', href: '/about', onClick: _utilsLink2['default'].handleClick },
            'About'
          ),
          _react2['default'].createElement(
            'a',
            { className: 'Navigation-link', href: '/contact', onClick: _utilsLink2['default'].handleClick },
            'Contact'
          ),
          _react2['default'].createElement(
            'span',
            { className: 'Navigation-spacer' },
            ' | '
          ),
          _react2['default'].createElement(
            'a',
            { className: 'Navigation-link', href: '/login', onClick: _utilsLink2['default'].handleClick },
            'Log in'
          ),
          _react2['default'].createElement(
            'span',
            { className: 'Navigation-spacer' },
            'or'
          ),
          _react2['default'].createElement(
            'a',
            { className: 'Navigation-link Navigation-link--highlight', href: '/register', onClick: _utilsLink2['default'].handleClick },
            'Sign up'
          )
        );
      }
    }], [{
      key: 'propTypes',
      value: {
        className: _react.PropTypes.string
      },
      enumerable: true
    }]);
  
    var _Navigation = Navigation;
    Navigation = (0, _decoratorsWithStyles2['default'])(_NavigationScss2['default'])(Navigation) || Navigation;
    return Navigation;
  })();
  
  exports['default'] = Navigation;
  module.exports = exports['default'];

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(8);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _decoratorsWithStyles = __webpack_require__(17);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _NotFoundPageScss = __webpack_require__(296);
  
  var _NotFoundPageScss2 = _interopRequireDefault(_NotFoundPageScss);
  
  var NotFoundPage = (function () {
    function NotFoundPage() {
      _classCallCheck(this, _NotFoundPage);
    }
  
    _createClass(NotFoundPage, [{
      key: 'render',
      value: function render() {
        var title = 'Page Not Found';
        this.context.onSetTitle(title);
        this.context.onPageNotFound();
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'h1',
            null,
            title
          ),
          _react2['default'].createElement(
            'p',
            null,
            'Sorry, but the page you were trying to view does not exist.'
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _NotFoundPage = NotFoundPage;
    NotFoundPage = (0, _decoratorsWithStyles2['default'])(_NotFoundPageScss2['default'])(NotFoundPage) || NotFoundPage;
    return NotFoundPage;
  })();
  
  exports['default'] = NotFoundPage;
  module.exports = exports['default'];

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(8);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _decoratorsWithStyles = __webpack_require__(17);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _RegisterPageScss = __webpack_require__(297);
  
  var _RegisterPageScss2 = _interopRequireDefault(_RegisterPageScss);
  
  var RegisterPage = (function () {
    function RegisterPage() {
      _classCallCheck(this, _RegisterPage);
    }
  
    _createClass(RegisterPage, [{
      key: 'render',
      value: function render() {
        var title = 'New User Registration';
        this.context.onSetTitle(title);
        return _react2['default'].createElement(
          'div',
          { className: 'RegisterPage' },
          _react2['default'].createElement(
            'div',
            { className: 'RegisterPage-container' },
            _react2['default'].createElement(
              'h1',
              null,
              title
            ),
            _react2['default'].createElement(
              'p',
              null,
              '...'
            )
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _RegisterPage = RegisterPage;
    RegisterPage = (0, _decoratorsWithStyles2['default'])(_RegisterPageScss2['default'])(RegisterPage) || RegisterPage;
    return RegisterPage;
  })();
  
  exports['default'] = RegisterPage;
  module.exports = exports['default'];

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(8);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _node_modulesReactLibEmptyFunction = __webpack_require__(25);
  
  var _node_modulesReactLibEmptyFunction2 = _interopRequireDefault(_node_modulesReactLibEmptyFunction);
  
  function withContext(ComposedComponent) {
    return (function () {
      function WithContext() {
        _classCallCheck(this, WithContext);
      }
  
      _createClass(WithContext, [{
        key: 'getChildContext',
        value: function getChildContext() {
          var context = this.props.context;
          return {
            onInsertCss: context.onInsertCss || _node_modulesReactLibEmptyFunction2['default'],
            onSetTitle: context.onSetTitle || _node_modulesReactLibEmptyFunction2['default'],
            onSetMeta: context.onSetMeta || _node_modulesReactLibEmptyFunction2['default'],
            onPageNotFound: context.onPageNotFound || _node_modulesReactLibEmptyFunction2['default']
          };
        }
      }, {
        key: 'render',
        value: function render() {
          var _props = this.props;
          var context = _props.context;
  
          var other = _objectWithoutProperties(_props, ['context']);
  
          return _react2['default'].createElement(ComposedComponent, other);
        }
      }], [{
        key: 'propTypes',
        value: {
          context: _react.PropTypes.shape({
            onInsertCss: _react.PropTypes.func,
            onSetTitle: _react.PropTypes.func,
            onSetMeta: _react.PropTypes.func,
            onPageNotFound: _react.PropTypes.func
          })
        },
        enumerable: true
      }, {
        key: 'childContextTypes',
        value: {
          onInsertCss: _react.PropTypes.func.isRequired,
          onSetTitle: _react.PropTypes.func.isRequired,
          onSetMeta: _react.PropTypes.func.isRequired,
          onPageNotFound: _react.PropTypes.func.isRequired
        },
        enumerable: true
      }]);
  
      return WithContext;
    })();
  }
  
  exports['default'] = withContext;
  module.exports = exports['default'];

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(8);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _eventemitter3 = __webpack_require__(102);
  
  var _eventemitter32 = _interopRequireDefault(_eventemitter3);
  
  var _node_modulesReactLibExecutionEnvironment = __webpack_require__(7);
  
  var EE = undefined;
  var viewport = { width: 1366, height: 768 };
  var RESIZE_EVENT = 'resize';
  
  function handleWindowResize() {
    if (viewport.width !== window.innerWidth || viewport.height !== window.innerHeight) {
      viewport = { width: window.innerWidth, height: window.innerHeight };
      EE.emit(RESIZE_EVENT, viewport);
    }
  }
  
  function withViewport(ComposedComponent) {
    return (function (_Component) {
      _inherits(WithViewport, _Component);
  
      function WithViewport() {
        _classCallCheck(this, WithViewport);
  
        _get(Object.getPrototypeOf(WithViewport.prototype), 'constructor', this).call(this);
  
        this.state = {
          viewport: _node_modulesReactLibExecutionEnvironment.canUseDOM ? { width: window.innerWidth, height: window.innerHeight } : viewport
        };
      }
  
      _createClass(WithViewport, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          if (!EE) {
            EE = new _eventemitter32['default']();
            window.addEventListener('resize', handleWindowResize);
            window.addEventListener('orientationchange', handleWindowResize);
          }
  
          EE.on('resize', this.handleResize, this);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          EE.removeListener(RESIZE_EVENT, this.handleResize, this);
  
          if (!EE.listeners(RESIZE_EVENT, true)) {
            window.removeEventListener('resize', handleWindowResize);
            window.removeEventListener('orientationchange', handleWindowResize);
            EE = null;
          }
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2['default'].createElement(ComposedComponent, _extends({}, this.props, { viewport: this.state.viewport }));
        }
      }, {
        key: 'handleResize',
        value: function handleResize(value) {
          this.setState({ viewport: value });
        }
      }]);
  
      return WithViewport;
    })(_react.Component);
  }
  
  exports['default'] = withViewport;
  module.exports = exports['default'];

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _eventemitter3 = __webpack_require__(102);
  
  var _eventemitter32 = _interopRequireDefault(_eventemitter3);
  
  var _coreDispatcher = __webpack_require__(65);
  
  var _coreDispatcher2 = _interopRequireDefault(_coreDispatcher);
  
  var _constantsActionTypes = __webpack_require__(64);
  
  var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);
  
  var CHANGE_EVENT = 'change';
  
  var pages = {};
  var loading = false;
  
  var AppStore = Object.assign({}, _eventemitter32['default'].prototype, {
  
    isLoading: function isLoading() {
      return loading;
    },
  
    /**
     * Gets page data by the given URL path.
     *
     * @param {String} path URL path.
     * @returns {*} Page data.
     */
    getPage: function getPage(path) {
      return path in pages ? pages[path] : null;
    },
  
    /**
     * Emits change event to all registered event listeners.
     *
     * @returns {Boolean} Indication if we've emitted an event.
     */
    emitChange: function emitChange() {
      return this.emit(CHANGE_EVENT);
    },
  
    /**
     * Register a new change event listener.
     *
     * @param {function} callback Callback function.
     */
    onChange: function onChange(callback) {
      this.on(CHANGE_EVENT, callback);
    },
  
    /**
     * Remove change event listener.
     *
     * @param {function} callback Callback function.
     */
    off: function off(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }
  
  });
  
  AppStore.dispatchToken = _coreDispatcher2['default'].register(function (action) {
  
    switch (action.type) {
  
      case _constantsActionTypes2['default'].GET_PAGE:
        loading = true;
        AppStore.emitChange();
        break;
  
      case _constantsActionTypes2['default'].RECEIVE_PAGE:
        loading = false;
  
        if (!action.err) {
          pages[action.page.path] = action.page;
        }
  
        AppStore.emitChange();
        break;
  
      default:
      // Do nothing
  
    }
  });
  
  exports['default'] = AppStore;
  module.exports = exports['default'];

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__(180);


/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

  var __WEBPACK_AMD_DEFINE_RESULT__;/*!
    Copyright (c) 2015 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  */
  
  (function () {
  	'use strict';
  
  	function classNames () {
  
  		var classes = '';
  
  		for (var i = 0; i < arguments.length; i++) {
  			var arg = arguments[i];
  			if (!arg) continue;
  
  			var argType = typeof arg;
  
  			if ('string' === argType || 'number' === argType) {
  				classes += ' ' + arg;
  
  			} else if (Array.isArray(arg)) {
  				classes += ' ' + classNames.apply(null, arg);
  
  			} else if ('object' === argType) {
  				for (var key in arg) {
  					if (arg.hasOwnProperty(key) && arg[key]) {
  						classes += ' ' + key;
  					}
  				}
  			}
  		}
  
  		return classes.substr(1);
  	}
  
  	if (typeof module !== 'undefined' && module.exports) {
  		module.exports = classNames;
  	} else if (true){
  		// AMD. Register as an anonymous module.
  		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
  			return classNames;
  		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  	} else {
  		window.classNames = classNames;
  	}
  
  }());


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(14)();
  // imports
  
  
  // module
  exports.push([module.id, "/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS and IE text size adjust after device orientation change,\n *    without disabling user zoom.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.\n */\n\n[hidden],\ntemplate {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * Improve readability of focused elements when they are also in an\n * active/hover state.\n */\n\na:active,\na:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\n\nb,\nstrong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\n\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n  -webkit-box-sizing: content-box;\n     -moz-box-sizing: content-box;\n          box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\n\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit; /* 1 */\n  font: inherit; /* 2 */\n  margin: 0; /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\n\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton,\nhtml input[type=\"button\"], /* 1 */\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n  cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome.\n */\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  -webkit-box-sizing: content-box;\n     -moz-box-sizing: content-box;\n          box-sizing: content-box; /* 2 */\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n  border: 0; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n}\n", ""]);
  
  // exports


/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(14)();
  // imports
  
  
  // module
  exports.push([module.id, "html {\n  color: #222;\n  font-family: \"Segoe UI\", \"HelveticaNeue-Light\", sans-serif;\n  font-size: 1em;\n  font-weight: 100;\n  line-height: 1.375; }\n\n::-moz-selection {\n  background: #000;\n  color: #fff;\n  text-shadow: none; }\n\n::selection {\n  background: #000;\n  color: #fff;\n  text-shadow: none; }\n\nhr {\n  border: 0;\n  border-top: 1px solid #ccc;\n  display: block;\n  height: 1px;\n  margin: 1em 0;\n  padding: 0; }\n", ""]);
  
  // exports


/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(14)();
  // imports
  
  
  // module
  exports.push([module.id, ".ContactPage-container {\n  margin: 0 auto;\n  max-width: 1000px;\n  padding: 0 0 40px; }\n", ""]);
  
  // exports


/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(14)();
  // imports
  
  
  // module
  exports.push([module.id, ".ContentPage-container {\n  margin: 0 auto;\n  max-width: 1000px;\n  padding: 0 0 40px; }\n", ""]);
  
  // exports


/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(14)();
  // imports
  
  
  // module
  exports.push([module.id, ".Feedback {\n  background: #f5f5f5;\n  color: #333; }\n  .Feedback-container {\n    margin: 0 auto;\n    padding: 20px 8px;\n    max-width: 1000px;\n    text-align: center;\n    font-size: 1.5em; }\n  .Feedback-link,\n  .Feedback-link:active,\n  .Feedback-link:hover,\n  .Feedback-link:visited {\n    color: #333;\n    text-decoration: none; }\n  .Feedback-link:hover {\n    text-decoration: underline; }\n  .Feedback-spacer {\n    padding-right: 15px;\n    padding-left: 15px; }\n", ""]);
  
  // exports


/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(14)();
  // imports
  
  
  // module
  exports.push([module.id, ".Footer {\n  background: #333;\n  color: #fff; }\n  .Footer-container {\n    margin: 0 auto;\n    padding: 20px 15px;\n    max-width: 1000px;\n    text-align: center; }\n  .Footer-text {\n    color: rgba(255, 255, 255, 0.5); }\n    .Footer-text--muted {\n      color: rgba(255, 255, 255, 0.3); }\n  .Footer-spacer {\n    color: rgba(255, 255, 255, 0.3); }\n  .Footer-text,\n  .Footer-link {\n    padding: 2px 5px;\n    font-size: 1em; }\n  .Footer-link,\n  .Footer-link:active,\n  .Footer-link:visited {\n    color: rgba(255, 255, 255, 0.6);\n    text-decoration: none; }\n  .Footer-link:hover {\n    color: white; }\n", ""]);
  
  // exports


/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(14)();
  // imports
  
  
  // module
  exports.push([module.id, ".Header {\n  background: #373277;\n  color: #fff; }\n  .Header-container {\n    margin: 0 auto;\n    padding: 20px 0;\n    max-width: 1000px; }\n  .Header-brand {\n    color: #93e6fc;\n    text-decoration: none;\n    font-size: 1.75em; }\n  .Header-brandTxt {\n    margin-left: 10px; }\n  .Header-nav {\n    float: right;\n    margin-top: 6px; }\n  .Header-banner {\n    text-align: center; }\n  .Header-bannerTitle {\n    margin: 0;\n    padding: 10px;\n    font-weight: normal;\n    font-size: 4em;\n    line-height: 1em; }\n  .Header-bannerDesc {\n    padding: 0;\n    color: rgba(255, 255, 255, 0.5);\n    font-size: 1.25em;\n    margin: 0; }\n", ""]);
  
  // exports


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(14)();
  // imports
  
  
  // module
  exports.push([module.id, ".LoginPage-container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px; }\n", ""]);
  
  // exports


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(14)();
  // imports
  
  
  // module
  exports.push([module.id, ".Navigation-link {\n  display: inline-block;\n  padding: 3px 8px;\n  text-decoration: none;\n  font-size: 1.125em; }\n  .Navigation-link, .Navigation-link:active, .Navigation-link:visited {\n    color: rgba(255, 255, 255, 0.6); }\n  .Navigation-link:hover {\n    color: white; }\n  .Navigation-link--highlight {\n    margin-right: 8px;\n    margin-left: 8px;\n    border-radius: 3px;\n    background: rgba(0, 0, 0, 0.15);\n    color: #fff; }\n    .Navigation-link--highlight:hover {\n      background: rgba(0, 0, 0, 0.3); }\n\n.Navigation-spacer {\n  color: rgba(255, 255, 255, 0.3); }\n", ""]);
  
  // exports


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(14)();
  // imports
  
  
  // module
  exports.push([module.id, "html {\n  display: table;\n  width: 100%;\n  height: 100%;\n  color: #888;\n  text-align: center;\n  font-family: sans-serif;\n  margin: 0;\n  line-height: 1.2; }\n\nbody {\n  display: table-cell;\n  margin: 2em auto;\n  vertical-align: middle; }\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400; }\n\np {\n  margin: 0 auto;\n  width: 280px; }\n\n@media only screen and (max-width: 280px) {\n  body, p {\n    width: 95%; }\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em; } }\n", ""]);
  
  // exports


/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(14)();
  // imports
  
  
  // module
  exports.push([module.id, ".RegisterPage-container {\n  margin: 0 auto;\n  max-width: 1000px;\n  padding: 0 0 40px; }\n", ""]);
  
  // exports


/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

  var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
  	'use strict';
  
  	/**
  	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
  	 *
  	 * @codingstandard ftlabs-jsv2
  	 * @copyright The Financial Times Limited [All Rights Reserved]
  	 * @license MIT License (see LICENSE.txt)
  	 */
  
  	/*jslint browser:true, node:true*/
  	/*global define, Event, Node*/
  
  
  	/**
  	 * Instantiate fast-clicking listeners on the specified layer.
  	 *
  	 * @constructor
  	 * @param {Element} layer The layer to listen on
  	 * @param {Object} [options={}] The options to override the defaults
  	 */
  	function FastClick(layer, options) {
  		var oldOnClick;
  
  		options = options || {};
  
  		/**
  		 * Whether a click is currently being tracked.
  		 *
  		 * @type boolean
  		 */
  		this.trackingClick = false;
  
  
  		/**
  		 * Timestamp for when click tracking started.
  		 *
  		 * @type number
  		 */
  		this.trackingClickStart = 0;
  
  
  		/**
  		 * The element being tracked for a click.
  		 *
  		 * @type EventTarget
  		 */
  		this.targetElement = null;
  
  
  		/**
  		 * X-coordinate of touch start event.
  		 *
  		 * @type number
  		 */
  		this.touchStartX = 0;
  
  
  		/**
  		 * Y-coordinate of touch start event.
  		 *
  		 * @type number
  		 */
  		this.touchStartY = 0;
  
  
  		/**
  		 * ID of the last touch, retrieved from Touch.identifier.
  		 *
  		 * @type number
  		 */
  		this.lastTouchIdentifier = 0;
  
  
  		/**
  		 * Touchmove boundary, beyond which a click will be cancelled.
  		 *
  		 * @type number
  		 */
  		this.touchBoundary = options.touchBoundary || 10;
  
  
  		/**
  		 * The FastClick layer.
  		 *
  		 * @type Element
  		 */
  		this.layer = layer;
  
  		/**
  		 * The minimum time between tap(touchstart and touchend) events
  		 *
  		 * @type number
  		 */
  		this.tapDelay = options.tapDelay || 200;
  
  		/**
  		 * The maximum time for a tap
  		 *
  		 * @type number
  		 */
  		this.tapTimeout = options.tapTimeout || 700;
  
  		if (FastClick.notNeeded(layer)) {
  			return;
  		}
  
  		// Some old versions of Android don't have Function.prototype.bind
  		function bind(method, context) {
  			return function() { return method.apply(context, arguments); };
  		}
  
  
  		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
  		var context = this;
  		for (var i = 0, l = methods.length; i < l; i++) {
  			context[methods[i]] = bind(context[methods[i]], context);
  		}
  
  		// Set up event handlers as required
  		if (deviceIsAndroid) {
  			layer.addEventListener('mouseover', this.onMouse, true);
  			layer.addEventListener('mousedown', this.onMouse, true);
  			layer.addEventListener('mouseup', this.onMouse, true);
  		}
  
  		layer.addEventListener('click', this.onClick, true);
  		layer.addEventListener('touchstart', this.onTouchStart, false);
  		layer.addEventListener('touchmove', this.onTouchMove, false);
  		layer.addEventListener('touchend', this.onTouchEnd, false);
  		layer.addEventListener('touchcancel', this.onTouchCancel, false);
  
  		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
  		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
  		// layer when they are cancelled.
  		if (!Event.prototype.stopImmediatePropagation) {
  			layer.removeEventListener = function(type, callback, capture) {
  				var rmv = Node.prototype.removeEventListener;
  				if (type === 'click') {
  					rmv.call(layer, type, callback.hijacked || callback, capture);
  				} else {
  					rmv.call(layer, type, callback, capture);
  				}
  			};
  
  			layer.addEventListener = function(type, callback, capture) {
  				var adv = Node.prototype.addEventListener;
  				if (type === 'click') {
  					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
  						if (!event.propagationStopped) {
  							callback(event);
  						}
  					}), capture);
  				} else {
  					adv.call(layer, type, callback, capture);
  				}
  			};
  		}
  
  		// If a handler is already declared in the element's onclick attribute, it will be fired before
  		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
  		// adding it as listener.
  		if (typeof layer.onclick === 'function') {
  
  			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
  			// - the old one won't work if passed to addEventListener directly.
  			oldOnClick = layer.onclick;
  			layer.addEventListener('click', function(event) {
  				oldOnClick(event);
  			}, false);
  			layer.onclick = null;
  		}
  	}
  
  	/**
  	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
  	*
  	* @type boolean
  	*/
  	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
  
  	/**
  	 * Android requires exceptions.
  	 *
  	 * @type boolean
  	 */
  	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
  
  
  	/**
  	 * iOS requires exceptions.
  	 *
  	 * @type boolean
  	 */
  	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
  
  
  	/**
  	 * iOS 4 requires an exception for select elements.
  	 *
  	 * @type boolean
  	 */
  	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);
  
  
  	/**
  	 * iOS 6.0-7.* requires the target element to be manually derived
  	 *
  	 * @type boolean
  	 */
  	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);
  
  	/**
  	 * BlackBerry requires exceptions.
  	 *
  	 * @type boolean
  	 */
  	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;
  
  	/**
  	 * Determine whether a given element requires a native click.
  	 *
  	 * @param {EventTarget|Element} target Target DOM element
  	 * @returns {boolean} Returns true if the element needs a native click
  	 */
  	FastClick.prototype.needsClick = function(target) {
  		switch (target.nodeName.toLowerCase()) {
  
  		// Don't send a synthetic click to disabled inputs (issue #62)
  		case 'button':
  		case 'select':
  		case 'textarea':
  			if (target.disabled) {
  				return true;
  			}
  
  			break;
  		case 'input':
  
  			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
  			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
  				return true;
  			}
  
  			break;
  		case 'label':
  		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
  		case 'video':
  			return true;
  		}
  
  		return (/\bneedsclick\b/).test(target.className);
  	};
  
  
  	/**
  	 * Determine whether a given element requires a call to focus to simulate click into element.
  	 *
  	 * @param {EventTarget|Element} target Target DOM element
  	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
  	 */
  	FastClick.prototype.needsFocus = function(target) {
  		switch (target.nodeName.toLowerCase()) {
  		case 'textarea':
  			return true;
  		case 'select':
  			return !deviceIsAndroid;
  		case 'input':
  			switch (target.type) {
  			case 'button':
  			case 'checkbox':
  			case 'file':
  			case 'image':
  			case 'radio':
  			case 'submit':
  				return false;
  			}
  
  			// No point in attempting to focus disabled inputs
  			return !target.disabled && !target.readOnly;
  		default:
  			return (/\bneedsfocus\b/).test(target.className);
  		}
  	};
  
  
  	/**
  	 * Send a click event to the specified element.
  	 *
  	 * @param {EventTarget|Element} targetElement
  	 * @param {Event} event
  	 */
  	FastClick.prototype.sendClick = function(targetElement, event) {
  		var clickEvent, touch;
  
  		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
  		if (document.activeElement && document.activeElement !== targetElement) {
  			document.activeElement.blur();
  		}
  
  		touch = event.changedTouches[0];
  
  		// Synthesise a click event, with an extra attribute so it can be tracked
  		clickEvent = document.createEvent('MouseEvents');
  		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
  		clickEvent.forwardedTouchEvent = true;
  		targetElement.dispatchEvent(clickEvent);
  	};
  
  	FastClick.prototype.determineEventType = function(targetElement) {
  
  		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
  		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
  			return 'mousedown';
  		}
  
  		return 'click';
  	};
  
  
  	/**
  	 * @param {EventTarget|Element} targetElement
  	 */
  	FastClick.prototype.focus = function(targetElement) {
  		var length;
  
  		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
  		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
  			length = targetElement.value.length;
  			targetElement.setSelectionRange(length, length);
  		} else {
  			targetElement.focus();
  		}
  	};
  
  
  	/**
  	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
  	 *
  	 * @param {EventTarget|Element} targetElement
  	 */
  	FastClick.prototype.updateScrollParent = function(targetElement) {
  		var scrollParent, parentElement;
  
  		scrollParent = targetElement.fastClickScrollParent;
  
  		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
  		// target element was moved to another parent.
  		if (!scrollParent || !scrollParent.contains(targetElement)) {
  			parentElement = targetElement;
  			do {
  				if (parentElement.scrollHeight > parentElement.offsetHeight) {
  					scrollParent = parentElement;
  					targetElement.fastClickScrollParent = parentElement;
  					break;
  				}
  
  				parentElement = parentElement.parentElement;
  			} while (parentElement);
  		}
  
  		// Always update the scroll top tracker if possible.
  		if (scrollParent) {
  			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
  		}
  	};
  
  
  	/**
  	 * @param {EventTarget} targetElement
  	 * @returns {Element|EventTarget}
  	 */
  	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
  
  		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
  		if (eventTarget.nodeType === Node.TEXT_NODE) {
  			return eventTarget.parentNode;
  		}
  
  		return eventTarget;
  	};
  
  
  	/**
  	 * On touch start, record the position and scroll offset.
  	 *
  	 * @param {Event} event
  	 * @returns {boolean}
  	 */
  	FastClick.prototype.onTouchStart = function(event) {
  		var targetElement, touch, selection;
  
  		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
  		if (event.targetTouches.length > 1) {
  			return true;
  		}
  
  		targetElement = this.getTargetElementFromEventTarget(event.target);
  		touch = event.targetTouches[0];
  
  		if (deviceIsIOS) {
  
  			// Only trusted events will deselect text on iOS (issue #49)
  			selection = window.getSelection();
  			if (selection.rangeCount && !selection.isCollapsed) {
  				return true;
  			}
  
  			if (!deviceIsIOS4) {
  
  				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
  				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
  				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
  				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
  				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
  				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
  				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
  				// random integers, it's safe to to continue if the identifier is 0 here.
  				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
  					event.preventDefault();
  					return false;
  				}
  
  				this.lastTouchIdentifier = touch.identifier;
  
  				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
  				// 1) the user does a fling scroll on the scrollable layer
  				// 2) the user stops the fling scroll with another tap
  				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
  				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
  				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
  				this.updateScrollParent(targetElement);
  			}
  		}
  
  		this.trackingClick = true;
  		this.trackingClickStart = event.timeStamp;
  		this.targetElement = targetElement;
  
  		this.touchStartX = touch.pageX;
  		this.touchStartY = touch.pageY;
  
  		// Prevent phantom clicks on fast double-tap (issue #36)
  		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
  			event.preventDefault();
  		}
  
  		return true;
  	};
  
  
  	/**
  	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
  	 *
  	 * @param {Event} event
  	 * @returns {boolean}
  	 */
  	FastClick.prototype.touchHasMoved = function(event) {
  		var touch = event.changedTouches[0], boundary = this.touchBoundary;
  
  		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
  			return true;
  		}
  
  		return false;
  	};
  
  
  	/**
  	 * Update the last position.
  	 *
  	 * @param {Event} event
  	 * @returns {boolean}
  	 */
  	FastClick.prototype.onTouchMove = function(event) {
  		if (!this.trackingClick) {
  			return true;
  		}
  
  		// If the touch has moved, cancel the click tracking
  		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
  			this.trackingClick = false;
  			this.targetElement = null;
  		}
  
  		return true;
  	};
  
  
  	/**
  	 * Attempt to find the labelled control for the given label element.
  	 *
  	 * @param {EventTarget|HTMLLabelElement} labelElement
  	 * @returns {Element|null}
  	 */
  	FastClick.prototype.findControl = function(labelElement) {
  
  		// Fast path for newer browsers supporting the HTML5 control attribute
  		if (labelElement.control !== undefined) {
  			return labelElement.control;
  		}
  
  		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
  		if (labelElement.htmlFor) {
  			return document.getElementById(labelElement.htmlFor);
  		}
  
  		// If no for attribute exists, attempt to retrieve the first labellable descendant element
  		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
  		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
  	};
  
  
  	/**
  	 * On touch end, determine whether to send a click event at once.
  	 *
  	 * @param {Event} event
  	 * @returns {boolean}
  	 */
  	FastClick.prototype.onTouchEnd = function(event) {
  		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
  
  		if (!this.trackingClick) {
  			return true;
  		}
  
  		// Prevent phantom clicks on fast double-tap (issue #36)
  		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
  			this.cancelNextClick = true;
  			return true;
  		}
  
  		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
  			return true;
  		}
  
  		// Reset to prevent wrong click cancel on input (issue #156).
  		this.cancelNextClick = false;
  
  		this.lastClickTime = event.timeStamp;
  
  		trackingClickStart = this.trackingClickStart;
  		this.trackingClick = false;
  		this.trackingClickStart = 0;
  
  		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
  		// is performing a transition or scroll, and has to be re-detected manually. Note that
  		// for this to function correctly, it must be called *after* the event target is checked!
  		// See issue #57; also filed as rdar://13048589 .
  		if (deviceIsIOSWithBadTarget) {
  			touch = event.changedTouches[0];
  
  			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
  			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
  			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
  		}
  
  		targetTagName = targetElement.tagName.toLowerCase();
  		if (targetTagName === 'label') {
  			forElement = this.findControl(targetElement);
  			if (forElement) {
  				this.focus(targetElement);
  				if (deviceIsAndroid) {
  					return false;
  				}
  
  				targetElement = forElement;
  			}
  		} else if (this.needsFocus(targetElement)) {
  
  			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
  			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
  			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
  				this.targetElement = null;
  				return false;
  			}
  
  			this.focus(targetElement);
  			this.sendClick(targetElement, event);
  
  			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
  			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
  			if (!deviceIsIOS || targetTagName !== 'select') {
  				this.targetElement = null;
  				event.preventDefault();
  			}
  
  			return false;
  		}
  
  		if (deviceIsIOS && !deviceIsIOS4) {
  
  			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
  			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
  			scrollParent = targetElement.fastClickScrollParent;
  			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
  				return true;
  			}
  		}
  
  		// Prevent the actual click from going though - unless the target node is marked as requiring
  		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
  		if (!this.needsClick(targetElement)) {
  			event.preventDefault();
  			this.sendClick(targetElement, event);
  		}
  
  		return false;
  	};
  
  
  	/**
  	 * On touch cancel, stop tracking the click.
  	 *
  	 * @returns {void}
  	 */
  	FastClick.prototype.onTouchCancel = function() {
  		this.trackingClick = false;
  		this.targetElement = null;
  	};
  
  
  	/**
  	 * Determine mouse events which should be permitted.
  	 *
  	 * @param {Event} event
  	 * @returns {boolean}
  	 */
  	FastClick.prototype.onMouse = function(event) {
  
  		// If a target element was never set (because a touch event was never fired) allow the event
  		if (!this.targetElement) {
  			return true;
  		}
  
  		if (event.forwardedTouchEvent) {
  			return true;
  		}
  
  		// Programmatically generated events targeting a specific element should be permitted
  		if (!event.cancelable) {
  			return true;
  		}
  
  		// Derive and check the target element to see whether the mouse event needs to be permitted;
  		// unless explicitly enabled, prevent non-touch click events from triggering actions,
  		// to prevent ghost/doubleclicks.
  		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
  
  			// Prevent any user-added listeners declared on FastClick element from being fired.
  			if (event.stopImmediatePropagation) {
  				event.stopImmediatePropagation();
  			} else {
  
  				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
  				event.propagationStopped = true;
  			}
  
  			// Cancel the event
  			event.stopPropagation();
  			event.preventDefault();
  
  			return false;
  		}
  
  		// If the mouse event is permitted, return true for the action to go through.
  		return true;
  	};
  
  
  	/**
  	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
  	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
  	 * an actual click which should be permitted.
  	 *
  	 * @param {Event} event
  	 * @returns {boolean}
  	 */
  	FastClick.prototype.onClick = function(event) {
  		var permitted;
  
  		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
  		if (this.trackingClick) {
  			this.targetElement = null;
  			this.trackingClick = false;
  			return true;
  		}
  
  		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
  		if (event.target.type === 'submit' && event.detail === 0) {
  			return true;
  		}
  
  		permitted = this.onMouse(event);
  
  		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
  		if (!permitted) {
  			this.targetElement = null;
  		}
  
  		// If clicks are permitted, return true for the action to go through.
  		return permitted;
  	};
  
  
  	/**
  	 * Remove all FastClick's event listeners.
  	 *
  	 * @returns {void}
  	 */
  	FastClick.prototype.destroy = function() {
  		var layer = this.layer;
  
  		if (deviceIsAndroid) {
  			layer.removeEventListener('mouseover', this.onMouse, true);
  			layer.removeEventListener('mousedown', this.onMouse, true);
  			layer.removeEventListener('mouseup', this.onMouse, true);
  		}
  
  		layer.removeEventListener('click', this.onClick, true);
  		layer.removeEventListener('touchstart', this.onTouchStart, false);
  		layer.removeEventListener('touchmove', this.onTouchMove, false);
  		layer.removeEventListener('touchend', this.onTouchEnd, false);
  		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
  	};
  
  
  	/**
  	 * Check whether FastClick is needed.
  	 *
  	 * @param {Element} layer The layer to listen on
  	 */
  	FastClick.notNeeded = function(layer) {
  		var metaViewport;
  		var chromeVersion;
  		var blackberryVersion;
  		var firefoxVersion;
  
  		// Devices that don't support touch don't need FastClick
  		if (typeof window.ontouchstart === 'undefined') {
  			return true;
  		}
  
  		// Chrome version - zero for other browsers
  		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
  
  		if (chromeVersion) {
  
  			if (deviceIsAndroid) {
  				metaViewport = document.querySelector('meta[name=viewport]');
  
  				if (metaViewport) {
  					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
  					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
  						return true;
  					}
  					// Chrome 32 and above with width=device-width or less don't need FastClick
  					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
  						return true;
  					}
  				}
  
  			// Chrome desktop doesn't need FastClick (issue #15)
  			} else {
  				return true;
  			}
  		}
  
  		if (deviceIsBlackBerry10) {
  			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
  
  			// BlackBerry 10.3+ does not require Fastclick library.
  			// https://github.com/ftlabs/fastclick/issues/251
  			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
  				metaViewport = document.querySelector('meta[name=viewport]');
  
  				if (metaViewport) {
  					// user-scalable=no eliminates click delay.
  					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
  						return true;
  					}
  					// width=device-width (or less than device-width) eliminates click delay.
  					if (document.documentElement.scrollWidth <= window.outerWidth) {
  						return true;
  					}
  				}
  			}
  		}
  
  		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
  		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
  			return true;
  		}
  
  		// Firefox version - zero for other browsers
  		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
  
  		if (firefoxVersion >= 27) {
  			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896
  
  			metaViewport = document.querySelector('meta[name=viewport]');
  			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
  				return true;
  			}
  		}
  
  		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
  		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
  		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
  			return true;
  		}
  
  		return false;
  	};
  
  
  	/**
  	 * Factory method for creating a FastClick object
  	 *
  	 * @param {Element} layer The layer to listen on
  	 * @param {Object} [options={}] The options to override the defaults
  	 */
  	FastClick.attach = function(layer, options) {
  		return new FastClick(layer, options);
  	};
  
  
  	if (true) {
  
  		// AMD. Register as an anonymous module.
  		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
  			return FastClick;
  		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  	} else if (typeof module !== 'undefined' && module.exports) {
  		module.exports = FastClick.attach;
  		module.exports.FastClick = FastClick;
  	} else {
  		window.FastClick = FastClick;
  	}
  }());


/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright (c) 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   */
  
  module.exports.Dispatcher = __webpack_require__(209)


/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

  /*
   * Copyright (c) 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule Dispatcher
   * @typechecks
   */
  
  "use strict";
  
  var invariant = __webpack_require__(210);
  
  var _lastID = 1;
  var _prefix = 'ID_';
  
  /**
   * Dispatcher is used to broadcast payloads to registered callbacks. This is
   * different from generic pub-sub systems in two ways:
   *
   *   1) Callbacks are not subscribed to particular events. Every payload is
   *      dispatched to every registered callback.
   *   2) Callbacks can be deferred in whole or part until other callbacks have
   *      been executed.
   *
   * For example, consider this hypothetical flight destination form, which
   * selects a default city when a country is selected:
   *
   *   var flightDispatcher = new Dispatcher();
   *
   *   // Keeps track of which country is selected
   *   var CountryStore = {country: null};
   *
   *   // Keeps track of which city is selected
   *   var CityStore = {city: null};
   *
   *   // Keeps track of the base flight price of the selected city
   *   var FlightPriceStore = {price: null}
   *
   * When a user changes the selected city, we dispatch the payload:
   *
   *   flightDispatcher.dispatch({
   *     actionType: 'city-update',
   *     selectedCity: 'paris'
   *   });
   *
   * This payload is digested by `CityStore`:
   *
   *   flightDispatcher.register(function(payload) {
   *     if (payload.actionType === 'city-update') {
   *       CityStore.city = payload.selectedCity;
   *     }
   *   });
   *
   * When the user selects a country, we dispatch the payload:
   *
   *   flightDispatcher.dispatch({
   *     actionType: 'country-update',
   *     selectedCountry: 'australia'
   *   });
   *
   * This payload is digested by both stores:
   *
   *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
   *     if (payload.actionType === 'country-update') {
   *       CountryStore.country = payload.selectedCountry;
   *     }
   *   });
   *
   * When the callback to update `CountryStore` is registered, we save a reference
   * to the returned token. Using this token with `waitFor()`, we can guarantee
   * that `CountryStore` is updated before the callback that updates `CityStore`
   * needs to query its data.
   *
   *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
   *     if (payload.actionType === 'country-update') {
   *       // `CountryStore.country` may not be updated.
   *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
   *       // `CountryStore.country` is now guaranteed to be updated.
   *
   *       // Select the default city for the new country
   *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
   *     }
   *   });
   *
   * The usage of `waitFor()` can be chained, for example:
   *
   *   FlightPriceStore.dispatchToken =
   *     flightDispatcher.register(function(payload) {
   *       switch (payload.actionType) {
   *         case 'country-update':
   *           flightDispatcher.waitFor([CityStore.dispatchToken]);
   *           FlightPriceStore.price =
   *             getFlightPriceStore(CountryStore.country, CityStore.city);
   *           break;
   *
   *         case 'city-update':
   *           FlightPriceStore.price =
   *             FlightPriceStore(CountryStore.country, CityStore.city);
   *           break;
   *     }
   *   });
   *
   * The `country-update` payload will be guaranteed to invoke the stores'
   * registered callbacks in order: `CountryStore`, `CityStore`, then
   * `FlightPriceStore`.
   */
  
    function Dispatcher() {
      this.$Dispatcher_callbacks = {};
      this.$Dispatcher_isPending = {};
      this.$Dispatcher_isHandled = {};
      this.$Dispatcher_isDispatching = false;
      this.$Dispatcher_pendingPayload = null;
    }
  
    /**
     * Registers a callback to be invoked with every dispatched payload. Returns
     * a token that can be used with `waitFor()`.
     *
     * @param {function} callback
     * @return {string}
     */
    Dispatcher.prototype.register=function(callback) {
      var id = _prefix + _lastID++;
      this.$Dispatcher_callbacks[id] = callback;
      return id;
    };
  
    /**
     * Removes a callback based on its token.
     *
     * @param {string} id
     */
    Dispatcher.prototype.unregister=function(id) {
      invariant(
        this.$Dispatcher_callbacks[id],
        'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
        id
      );
      delete this.$Dispatcher_callbacks[id];
    };
  
    /**
     * Waits for the callbacks specified to be invoked before continuing execution
     * of the current callback. This method should only be used by a callback in
     * response to a dispatched payload.
     *
     * @param {array<string>} ids
     */
    Dispatcher.prototype.waitFor=function(ids) {
      invariant(
        this.$Dispatcher_isDispatching,
        'Dispatcher.waitFor(...): Must be invoked while dispatching.'
      );
      for (var ii = 0; ii < ids.length; ii++) {
        var id = ids[ii];
        if (this.$Dispatcher_isPending[id]) {
          invariant(
            this.$Dispatcher_isHandled[id],
            'Dispatcher.waitFor(...): Circular dependency detected while ' +
            'waiting for `%s`.',
            id
          );
          continue;
        }
        invariant(
          this.$Dispatcher_callbacks[id],
          'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
          id
        );
        this.$Dispatcher_invokeCallback(id);
      }
    };
  
    /**
     * Dispatches a payload to all registered callbacks.
     *
     * @param {object} payload
     */
    Dispatcher.prototype.dispatch=function(payload) {
      invariant(
        !this.$Dispatcher_isDispatching,
        'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
      );
      this.$Dispatcher_startDispatching(payload);
      try {
        for (var id in this.$Dispatcher_callbacks) {
          if (this.$Dispatcher_isPending[id]) {
            continue;
          }
          this.$Dispatcher_invokeCallback(id);
        }
      } finally {
        this.$Dispatcher_stopDispatching();
      }
    };
  
    /**
     * Is this Dispatcher currently dispatching.
     *
     * @return {boolean}
     */
    Dispatcher.prototype.isDispatching=function() {
      return this.$Dispatcher_isDispatching;
    };
  
    /**
     * Call the callback stored with the given id. Also do some internal
     * bookkeeping.
     *
     * @param {string} id
     * @internal
     */
    Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
      this.$Dispatcher_isPending[id] = true;
      this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
      this.$Dispatcher_isHandled[id] = true;
    };
  
    /**
     * Set up bookkeeping needed when dispatching.
     *
     * @param {object} payload
     * @internal
     */
    Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
      for (var id in this.$Dispatcher_callbacks) {
        this.$Dispatcher_isPending[id] = false;
        this.$Dispatcher_isHandled[id] = false;
      }
      this.$Dispatcher_pendingPayload = payload;
      this.$Dispatcher_isDispatching = true;
    };
  
    /**
     * Clear bookkeeping used for dispatching.
     *
     * @internal
     */
    Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
      this.$Dispatcher_pendingPayload = null;
      this.$Dispatcher_isDispatching = false;
    };
  
  
  module.exports = Dispatcher;


/***/ },
/* 210 */
/***/ function(module, exports) {

  /**
   * Copyright (c) 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule invariant
   */
  
  "use strict";
  
  /**
   * Use invariant() to assert state which your program assumes to be true.
   *
   * Provide sprintf-style format (only %s is supported) and arguments
   * to provide information about what broke and what you were
   * expecting.
   *
   * The invariant message will be stripped in production, but the invariant
   * will remain to ensure logic does not differ in production.
   */
  
  var invariant = function(condition, format, a, b, c, d, e, f) {
    if (false) {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    }
  
    if (!condition) {
      var error;
      if (format === undefined) {
        error = new Error(
          'Minified exception occurred; use the non-minified dev environment ' +
          'for the full error message and additional helpful warnings.'
        );
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(
          'Invariant Violation: ' +
          format.replace(/%s/g, function() { return args[argIndex++]; })
        );
      }
  
      error.framesToPop = 1; // we don't care about invariant's own frame
      throw error;
    }
  };
  
  module.exports = invariant;


/***/ },
/* 211 */
/***/ function(module, exports) {

  // shim for using process in browser
  
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  
  function cleanUpNextTick() {
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
      var timeout = setTimeout(cleanUpNextTick);
      draining = true;
  
      var len = queue.length;
      while(len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
              currentQueue[queueIndex].run();
          }
          queueIndex = -1;
          len = queue.length;
      }
      currentQueue = null;
      draining = false;
      clearTimeout(timeout);
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
          setTimeout(drainQueue, 0);
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
  
  process.binding = function (name) {
      throw new Error('process.binding is not supported');
  };
  
  // TODO(shtylman)
  process.cwd = function () { return '/' };
  process.chdir = function (dir) {
      throw new Error('process.chdir is not supported');
  };
  process.umask = function() { return 0; };


/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015 Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule BeforeInputEventPlugin
   * @typechecks static-only
   */
  
  'use strict';
  
  var EventConstants = __webpack_require__(12);
  var EventPropagators = __webpack_require__(40);
  var ExecutionEnvironment = __webpack_require__(7);
  var FallbackCompositionState = __webpack_require__(220);
  var SyntheticCompositionEvent = __webpack_require__(256);
  var SyntheticInputEvent = __webpack_require__(259);
  
  var keyOf = __webpack_require__(28);
  
  var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space
  var START_KEYCODE = 229;
  
  var canUseCompositionEvent = (
    ExecutionEnvironment.canUseDOM &&
    'CompositionEvent' in window
  );
  
  var documentMode = null;
  if (ExecutionEnvironment.canUseDOM && 'documentMode' in document) {
    documentMode = document.documentMode;
  }
  
  // Webkit offers a very useful `textInput` event that can be used to
  // directly represent `beforeInput`. The IE `textinput` event is not as
  // useful, so we don't use it.
  var canUseTextInputEvent = (
    ExecutionEnvironment.canUseDOM &&
    'TextEvent' in window &&
    !documentMode &&
    !isPresto()
  );
  
  // In IE9+, we have access to composition events, but the data supplied
  // by the native compositionend event may be incorrect. Japanese ideographic
  // spaces, for instance (\u3000) are not recorded correctly.
  var useFallbackCompositionData = (
    ExecutionEnvironment.canUseDOM &&
    (
      (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11)
    )
  );
  
  /**
   * Opera <= 12 includes TextEvent in window, but does not fire
   * text input events. Rely on keypress instead.
   */
  function isPresto() {
    var opera = window.opera;
    return (
      typeof opera === 'object' &&
      typeof opera.version === 'function' &&
      parseInt(opera.version(), 10) <= 12
    );
  }
  
  var SPACEBAR_CODE = 32;
  var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);
  
  var topLevelTypes = EventConstants.topLevelTypes;
  
  // Events and their corresponding property names.
  var eventTypes = {
    beforeInput: {
      phasedRegistrationNames: {
        bubbled: keyOf({onBeforeInput: null}),
        captured: keyOf({onBeforeInputCapture: null})
      },
      dependencies: [
        topLevelTypes.topCompositionEnd,
        topLevelTypes.topKeyPress,
        topLevelTypes.topTextInput,
        topLevelTypes.topPaste
      ]
    },
    compositionEnd: {
      phasedRegistrationNames: {
        bubbled: keyOf({onCompositionEnd: null}),
        captured: keyOf({onCompositionEndCapture: null})
      },
      dependencies: [
        topLevelTypes.topBlur,
        topLevelTypes.topCompositionEnd,
        topLevelTypes.topKeyDown,
        topLevelTypes.topKeyPress,
        topLevelTypes.topKeyUp,
        topLevelTypes.topMouseDown
      ]
    },
    compositionStart: {
      phasedRegistrationNames: {
        bubbled: keyOf({onCompositionStart: null}),
        captured: keyOf({onCompositionStartCapture: null})
      },
      dependencies: [
        topLevelTypes.topBlur,
        topLevelTypes.topCompositionStart,
        topLevelTypes.topKeyDown,
        topLevelTypes.topKeyPress,
        topLevelTypes.topKeyUp,
        topLevelTypes.topMouseDown
      ]
    },
    compositionUpdate: {
      phasedRegistrationNames: {
        bubbled: keyOf({onCompositionUpdate: null}),
        captured: keyOf({onCompositionUpdateCapture: null})
      },
      dependencies: [
        topLevelTypes.topBlur,
        topLevelTypes.topCompositionUpdate,
        topLevelTypes.topKeyDown,
        topLevelTypes.topKeyPress,
        topLevelTypes.topKeyUp,
        topLevelTypes.topMouseDown
      ]
    }
  };
  
  // Track whether we've ever handled a keypress on the space key.
  var hasSpaceKeypress = false;
  
  /**
   * Return whether a native keypress event is assumed to be a command.
   * This is required because Firefox fires `keypress` events for key commands
   * (cut, copy, select-all, etc.) even though no character is inserted.
   */
  function isKeypressCommand(nativeEvent) {
    return (
      (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) &&
      // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(nativeEvent.ctrlKey && nativeEvent.altKey)
    );
  }
  
  
  /**
   * Translate native top level events into event types.
   *
   * @param {string} topLevelType
   * @return {object}
   */
  function getCompositionEventType(topLevelType) {
    switch (topLevelType) {
      case topLevelTypes.topCompositionStart:
        return eventTypes.compositionStart;
      case topLevelTypes.topCompositionEnd:
        return eventTypes.compositionEnd;
      case topLevelTypes.topCompositionUpdate:
        return eventTypes.compositionUpdate;
    }
  }
  
  /**
   * Does our fallback best-guess model think this event signifies that
   * composition has begun?
   *
   * @param {string} topLevelType
   * @param {object} nativeEvent
   * @return {boolean}
   */
  function isFallbackCompositionStart(topLevelType, nativeEvent) {
    return (
      topLevelType === topLevelTypes.topKeyDown &&
      nativeEvent.keyCode === START_KEYCODE
    );
  }
  
  /**
   * Does our fallback mode think that this event is the end of composition?
   *
   * @param {string} topLevelType
   * @param {object} nativeEvent
   * @return {boolean}
   */
  function isFallbackCompositionEnd(topLevelType, nativeEvent) {
    switch (topLevelType) {
      case topLevelTypes.topKeyUp:
        // Command keys insert or clear IME input.
        return (END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1);
      case topLevelTypes.topKeyDown:
        // Expect IME keyCode on each keydown. If we get any other
        // code we must have exited earlier.
        return (nativeEvent.keyCode !== START_KEYCODE);
      case topLevelTypes.topKeyPress:
      case topLevelTypes.topMouseDown:
      case topLevelTypes.topBlur:
        // Events are not possible without cancelling IME.
        return true;
      default:
        return false;
    }
  }
  
  /**
   * Google Input Tools provides composition data via a CustomEvent,
   * with the `data` property populated in the `detail` object. If this
   * is available on the event object, use it. If not, this is a plain
   * composition event and we have nothing special to extract.
   *
   * @param {object} nativeEvent
   * @return {?string}
   */
  function getDataFromCustomEvent(nativeEvent) {
    var detail = nativeEvent.detail;
    if (typeof detail === 'object' && 'data' in detail) {
      return detail.data;
    }
    return null;
  }
  
  // Track the current IME composition fallback object, if any.
  var currentComposition = null;
  
  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {?object} A SyntheticCompositionEvent.
   */
  function extractCompositionEvent(
    topLevelType,
    topLevelTarget,
    topLevelTargetID,
    nativeEvent
  ) {
    var eventType;
    var fallbackData;
  
    if (canUseCompositionEvent) {
      eventType = getCompositionEventType(topLevelType);
    } else if (!currentComposition) {
      if (isFallbackCompositionStart(topLevelType, nativeEvent)) {
        eventType = eventTypes.compositionStart;
      }
    } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) {
      eventType = eventTypes.compositionEnd;
    }
  
    if (!eventType) {
      return null;
    }
  
    if (useFallbackCompositionData) {
      // The current composition is stored statically and must not be
      // overwritten while composition continues.
      if (!currentComposition && eventType === eventTypes.compositionStart) {
        currentComposition = FallbackCompositionState.getPooled(topLevelTarget);
      } else if (eventType === eventTypes.compositionEnd) {
        if (currentComposition) {
          fallbackData = currentComposition.getData();
        }
      }
    }
  
    var event = SyntheticCompositionEvent.getPooled(
      eventType,
      topLevelTargetID,
      nativeEvent
    );
  
    if (fallbackData) {
      // Inject data generated from fallback path into the synthetic event.
      // This matches the property of native CompositionEventInterface.
      event.data = fallbackData;
    } else {
      var customData = getDataFromCustomEvent(nativeEvent);
      if (customData !== null) {
        event.data = customData;
      }
    }
  
    EventPropagators.accumulateTwoPhaseDispatches(event);
    return event;
  }
  
  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {object} nativeEvent Native browser event.
   * @return {?string} The string corresponding to this `beforeInput` event.
   */
  function getNativeBeforeInputChars(topLevelType, nativeEvent) {
    switch (topLevelType) {
      case topLevelTypes.topCompositionEnd:
        return getDataFromCustomEvent(nativeEvent);
      case topLevelTypes.topKeyPress:
        /**
         * If native `textInput` events are available, our goal is to make
         * use of them. However, there is a special case: the spacebar key.
         * In Webkit, preventing default on a spacebar `textInput` event
         * cancels character insertion, but it *also* causes the browser
         * to fall back to its default spacebar behavior of scrolling the
         * page.
         *
         * Tracking at:
         * https://code.google.com/p/chromium/issues/detail?id=355103
         *
         * To avoid this issue, use the keypress event as if no `textInput`
         * event is available.
         */
        var which = nativeEvent.which;
        if (which !== SPACEBAR_CODE) {
          return null;
        }
  
        hasSpaceKeypress = true;
        return SPACEBAR_CHAR;
  
      case topLevelTypes.topTextInput:
        // Record the characters to be added to the DOM.
        var chars = nativeEvent.data;
  
        // If it's a spacebar character, assume that we have already handled
        // it at the keypress level and bail immediately. Android Chrome
        // doesn't give us keycodes, so we need to blacklist it.
        if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
          return null;
        }
  
        return chars;
  
      default:
        // For other native event types, do nothing.
        return null;
    }
  }
  
  /**
   * For browsers that do not provide the `textInput` event, extract the
   * appropriate string to use for SyntheticInputEvent.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {object} nativeEvent Native browser event.
   * @return {?string} The fallback string for this `beforeInput` event.
   */
  function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
    // If we are currently composing (IME) and using a fallback to do so,
    // try to extract the composed characters from the fallback object.
    if (currentComposition) {
      if (
        topLevelType === topLevelTypes.topCompositionEnd ||
        isFallbackCompositionEnd(topLevelType, nativeEvent)
      ) {
        var chars = currentComposition.getData();
        FallbackCompositionState.release(currentComposition);
        currentComposition = null;
        return chars;
      }
      return null;
    }
  
    switch (topLevelType) {
      case topLevelTypes.topPaste:
        // If a paste event occurs after a keypress, throw out the input
        // chars. Paste events should not lead to BeforeInput events.
        return null;
      case topLevelTypes.topKeyPress:
        /**
         * As of v27, Firefox may fire keypress events even when no character
         * will be inserted. A few possibilities:
         *
         * - `which` is `0`. Arrow keys, Esc key, etc.
         *
         * - `which` is the pressed key code, but no char is available.
         *   Ex: 'AltGr + d` in Polish. There is no modified character for
         *   this key combination and no character is inserted into the
         *   document, but FF fires the keypress for char code `100` anyway.
         *   No `input` event will occur.
         *
         * - `which` is the pressed key code, but a command combination is
         *   being used. Ex: `Cmd+C`. No character is inserted, and no
         *   `input` event will occur.
         */
        if (nativeEvent.which && !isKeypressCommand(nativeEvent)) {
          return String.fromCharCode(nativeEvent.which);
        }
        return null;
      case topLevelTypes.topCompositionEnd:
        return useFallbackCompositionData ? null : nativeEvent.data;
      default:
        return null;
    }
  }
  
  /**
   * Extract a SyntheticInputEvent for `beforeInput`, based on either native
   * `textInput` or fallback behavior.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {?object} A SyntheticInputEvent.
   */
  function extractBeforeInputEvent(
    topLevelType,
    topLevelTarget,
    topLevelTargetID,
    nativeEvent
  ) {
    var chars;
  
    if (canUseTextInputEvent) {
      chars = getNativeBeforeInputChars(topLevelType, nativeEvent);
    } else {
      chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
    }
  
    // If no characters are being inserted, no BeforeInput event should
    // be fired.
    if (!chars) {
      return null;
    }
  
    var event = SyntheticInputEvent.getPooled(
      eventTypes.beforeInput,
      topLevelTargetID,
      nativeEvent
    );
  
    event.data = chars;
    EventPropagators.accumulateTwoPhaseDispatches(event);
    return event;
  }
  
  /**
   * Create an `onBeforeInput` event to match
   * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
   *
   * This event plugin is based on the native `textInput` event
   * available in Chrome, Safari, Opera, and IE. This event fires after
   * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
   *
   * `beforeInput` is spec'd but not implemented in any browsers, and
   * the `input` event does not provide any useful information about what has
   * actually been added, contrary to the spec. Thus, `textInput` is the best
   * available event to identify the characters that have actually been inserted
   * into the target node.
   *
   * This plugin is also responsible for emitting `composition` events, thus
   * allowing us to share composition fallback code for both `beforeInput` and
   * `composition` event types.
   */
  var BeforeInputEventPlugin = {
  
    eventTypes: eventTypes,
  
    /**
     * @param {string} topLevelType Record from `EventConstants`.
     * @param {DOMEventTarget} topLevelTarget The listening component root node.
     * @param {string} topLevelTargetID ID of `topLevelTarget`.
     * @param {object} nativeEvent Native browser event.
     * @return {*} An accumulation of synthetic events.
     * @see {EventPluginHub.extractEvents}
     */
    extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent
    ) {
      return [
        extractCompositionEvent(
          topLevelType,
          topLevelTarget,
          topLevelTargetID,
          nativeEvent
        ),
        extractBeforeInputEvent(
          topLevelType,
          topLevelTarget,
          topLevelTargetID,
          nativeEvent
        )
      ];
    }
  };
  
  module.exports = BeforeInputEventPlugin;


/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ChangeEventPlugin
   */
  
  'use strict';
  
  var EventConstants = __webpack_require__(12);
  var EventPluginHub = __webpack_require__(39);
  var EventPropagators = __webpack_require__(40);
  var ExecutionEnvironment = __webpack_require__(7);
  var ReactUpdates = __webpack_require__(19);
  var SyntheticEvent = __webpack_require__(30);
  
  var isEventSupported = __webpack_require__(85);
  var isTextInputElement = __webpack_require__(124);
  var keyOf = __webpack_require__(28);
  
  var topLevelTypes = EventConstants.topLevelTypes;
  
  var eventTypes = {
    change: {
      phasedRegistrationNames: {
        bubbled: keyOf({onChange: null}),
        captured: keyOf({onChangeCapture: null})
      },
      dependencies: [
        topLevelTypes.topBlur,
        topLevelTypes.topChange,
        topLevelTypes.topClick,
        topLevelTypes.topFocus,
        topLevelTypes.topInput,
        topLevelTypes.topKeyDown,
        topLevelTypes.topKeyUp,
        topLevelTypes.topSelectionChange
      ]
    }
  };
  
  /**
   * For IE shims
   */
  var activeElement = null;
  var activeElementID = null;
  var activeElementValue = null;
  var activeElementValueProp = null;
  
  /**
   * SECTION: handle `change` event
   */
  function shouldUseChangeEvent(elem) {
    return (
      elem.nodeName === 'SELECT' ||
      (elem.nodeName === 'INPUT' && elem.type === 'file')
    );
  }
  
  var doesChangeEventBubble = false;
  if (ExecutionEnvironment.canUseDOM) {
    // See `handleChange` comment below
    doesChangeEventBubble = isEventSupported('change') && (
      (!('documentMode' in document) || document.documentMode > 8)
    );
  }
  
  function manualDispatchChangeEvent(nativeEvent) {
    var event = SyntheticEvent.getPooled(
      eventTypes.change,
      activeElementID,
      nativeEvent
    );
    EventPropagators.accumulateTwoPhaseDispatches(event);
  
    // If change and propertychange bubbled, we'd just bind to it like all the
    // other events and have it go through ReactBrowserEventEmitter. Since it
    // doesn't, we manually listen for the events and so we have to enqueue and
    // process the abstract event manually.
    //
    // Batching is necessary here in order to ensure that all event handlers run
    // before the next rerender (including event handlers attached to ancestor
    // elements instead of directly on the input). Without this, controlled
    // components don't work properly in conjunction with event bubbling because
    // the component is rerendered and the value reverted before all the event
    // handlers can run. See https://github.com/facebook/react/issues/708.
    ReactUpdates.batchedUpdates(runEventInBatch, event);
  }
  
  function runEventInBatch(event) {
    EventPluginHub.enqueueEvents(event);
    EventPluginHub.processEventQueue();
  }
  
  function startWatchingForChangeEventIE8(target, targetID) {
    activeElement = target;
    activeElementID = targetID;
    activeElement.attachEvent('onchange', manualDispatchChangeEvent);
  }
  
  function stopWatchingForChangeEventIE8() {
    if (!activeElement) {
      return;
    }
    activeElement.detachEvent('onchange', manualDispatchChangeEvent);
    activeElement = null;
    activeElementID = null;
  }
  
  function getTargetIDForChangeEvent(
      topLevelType,
      topLevelTarget,
      topLevelTargetID) {
    if (topLevelType === topLevelTypes.topChange) {
      return topLevelTargetID;
    }
  }
  function handleEventsForChangeEventIE8(
      topLevelType,
      topLevelTarget,
      topLevelTargetID) {
    if (topLevelType === topLevelTypes.topFocus) {
      // stopWatching() should be a noop here but we call it just in case we
      // missed a blur event somehow.
      stopWatchingForChangeEventIE8();
      startWatchingForChangeEventIE8(topLevelTarget, topLevelTargetID);
    } else if (topLevelType === topLevelTypes.topBlur) {
      stopWatchingForChangeEventIE8();
    }
  }
  
  
  /**
   * SECTION: handle `input` event
   */
  var isInputEventSupported = false;
  if (ExecutionEnvironment.canUseDOM) {
    // IE9 claims to support the input event but fails to trigger it when
    // deleting text, so we ignore its input events
    isInputEventSupported = isEventSupported('input') && (
      (!('documentMode' in document) || document.documentMode > 9)
    );
  }
  
  /**
   * (For old IE.) Replacement getter/setter for the `value` property that gets
   * set on the active element.
   */
  var newValueProp =  {
    get: function() {
      return activeElementValueProp.get.call(this);
    },
    set: function(val) {
      // Cast to a string so we can do equality checks.
      activeElementValue = '' + val;
      activeElementValueProp.set.call(this, val);
    }
  };
  
  /**
   * (For old IE.) Starts tracking propertychange events on the passed-in element
   * and override the value property so that we can distinguish user events from
   * value changes in JS.
   */
  function startWatchingForValueChange(target, targetID) {
    activeElement = target;
    activeElementID = targetID;
    activeElementValue = target.value;
    activeElementValueProp = Object.getOwnPropertyDescriptor(
      target.constructor.prototype,
      'value'
    );
  
    Object.defineProperty(activeElement, 'value', newValueProp);
    activeElement.attachEvent('onpropertychange', handlePropertyChange);
  }
  
  /**
   * (For old IE.) Removes the event listeners from the currently-tracked element,
   * if any exists.
   */
  function stopWatchingForValueChange() {
    if (!activeElement) {
      return;
    }
  
    // delete restores the original property definition
    delete activeElement.value;
    activeElement.detachEvent('onpropertychange', handlePropertyChange);
  
    activeElement = null;
    activeElementID = null;
    activeElementValue = null;
    activeElementValueProp = null;
  }
  
  /**
   * (For old IE.) Handles a propertychange event, sending a `change` event if
   * the value of the active element has changed.
   */
  function handlePropertyChange(nativeEvent) {
    if (nativeEvent.propertyName !== 'value') {
      return;
    }
    var value = nativeEvent.srcElement.value;
    if (value === activeElementValue) {
      return;
    }
    activeElementValue = value;
  
    manualDispatchChangeEvent(nativeEvent);
  }
  
  /**
   * If a `change` event should be fired, returns the target's ID.
   */
  function getTargetIDForInputEvent(
      topLevelType,
      topLevelTarget,
      topLevelTargetID) {
    if (topLevelType === topLevelTypes.topInput) {
      // In modern browsers (i.e., not IE8 or IE9), the input event is exactly
      // what we want so fall through here and trigger an abstract event
      return topLevelTargetID;
    }
  }
  
  // For IE8 and IE9.
  function handleEventsForInputEventIE(
      topLevelType,
      topLevelTarget,
      topLevelTargetID) {
    if (topLevelType === topLevelTypes.topFocus) {
      // In IE8, we can capture almost all .value changes by adding a
      // propertychange handler and looking for events with propertyName
      // equal to 'value'
      // In IE9, propertychange fires for most input events but is buggy and
      // doesn't fire when text is deleted, but conveniently, selectionchange
      // appears to fire in all of the remaining cases so we catch those and
      // forward the event if the value has changed
      // In either case, we don't want to call the event handler if the value
      // is changed from JS so we redefine a setter for `.value` that updates
      // our activeElementValue variable, allowing us to ignore those changes
      //
      // stopWatching() should be a noop here but we call it just in case we
      // missed a blur event somehow.
      stopWatchingForValueChange();
      startWatchingForValueChange(topLevelTarget, topLevelTargetID);
    } else if (topLevelType === topLevelTypes.topBlur) {
      stopWatchingForValueChange();
    }
  }
  
  // For IE8 and IE9.
  function getTargetIDForInputEventIE(
      topLevelType,
      topLevelTarget,
      topLevelTargetID) {
    if (topLevelType === topLevelTypes.topSelectionChange ||
        topLevelType === topLevelTypes.topKeyUp ||
        topLevelType === topLevelTypes.topKeyDown) {
      // On the selectionchange event, the target is just document which isn't
      // helpful for us so just check activeElement instead.
      //
      // 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
      // propertychange on the first input event after setting `value` from a
      // script and fires only keydown, keypress, keyup. Catching keyup usually
      // gets it and catching keydown lets us fire an event for the first
      // keystroke if user does a key repeat (it'll be a little delayed: right
      // before the second keystroke). Other input methods (e.g., paste) seem to
      // fire selectionchange normally.
      if (activeElement && activeElement.value !== activeElementValue) {
        activeElementValue = activeElement.value;
        return activeElementID;
      }
    }
  }
  
  
  /**
   * SECTION: handle `click` event
   */
  function shouldUseClickEvent(elem) {
    // Use the `click` event to detect changes to checkbox and radio inputs.
    // This approach works across all browsers, whereas `change` does not fire
    // until `blur` in IE8.
    return (
      elem.nodeName === 'INPUT' &&
      (elem.type === 'checkbox' || elem.type === 'radio')
    );
  }
  
  function getTargetIDForClickEvent(
      topLevelType,
      topLevelTarget,
      topLevelTargetID) {
    if (topLevelType === topLevelTypes.topClick) {
      return topLevelTargetID;
    }
  }
  
  /**
   * This plugin creates an `onChange` event that normalizes change events
   * across form elements. This event fires at a time when it's possible to
   * change the element's value without seeing a flicker.
   *
   * Supported elements are:
   * - input (see `isTextInputElement`)
   * - textarea
   * - select
   */
  var ChangeEventPlugin = {
  
    eventTypes: eventTypes,
  
    /**
     * @param {string} topLevelType Record from `EventConstants`.
     * @param {DOMEventTarget} topLevelTarget The listening component root node.
     * @param {string} topLevelTargetID ID of `topLevelTarget`.
     * @param {object} nativeEvent Native browser event.
     * @return {*} An accumulation of synthetic events.
     * @see {EventPluginHub.extractEvents}
     */
    extractEvents: function(
        topLevelType,
        topLevelTarget,
        topLevelTargetID,
        nativeEvent) {
  
      var getTargetIDFunc, handleEventFunc;
      if (shouldUseChangeEvent(topLevelTarget)) {
        if (doesChangeEventBubble) {
          getTargetIDFunc = getTargetIDForChangeEvent;
        } else {
          handleEventFunc = handleEventsForChangeEventIE8;
        }
      } else if (isTextInputElement(topLevelTarget)) {
        if (isInputEventSupported) {
          getTargetIDFunc = getTargetIDForInputEvent;
        } else {
          getTargetIDFunc = getTargetIDForInputEventIE;
          handleEventFunc = handleEventsForInputEventIE;
        }
      } else if (shouldUseClickEvent(topLevelTarget)) {
        getTargetIDFunc = getTargetIDForClickEvent;
      }
  
      if (getTargetIDFunc) {
        var targetID = getTargetIDFunc(
          topLevelType,
          topLevelTarget,
          topLevelTargetID
        );
        if (targetID) {
          var event = SyntheticEvent.getPooled(
            eventTypes.change,
            targetID,
            nativeEvent
          );
          EventPropagators.accumulateTwoPhaseDispatches(event);
          return event;
        }
      }
  
      if (handleEventFunc) {
        handleEventFunc(
          topLevelType,
          topLevelTarget,
          topLevelTargetID
        );
      }
    }
  
  };
  
  module.exports = ChangeEventPlugin;


/***/ },
/* 214 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ClientReactRootIndex
   * @typechecks
   */
  
  'use strict';
  
  var nextReactRootIndex = 0;
  
  var ClientReactRootIndex = {
    createReactRootIndex: function() {
      return nextReactRootIndex++;
    }
  };
  
  module.exports = ClientReactRootIndex;


/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule DOMChildrenOperations
   * @typechecks static-only
   */
  
  'use strict';
  
  var Danger = __webpack_require__(216);
  var ReactMultiChildUpdateTypes = __webpack_require__(111);
  
  var setTextContent = __webpack_require__(284);
  var invariant = __webpack_require__(2);
  
  /**
   * Inserts `childNode` as a child of `parentNode` at the `index`.
   *
   * @param {DOMElement} parentNode Parent node in which to insert.
   * @param {DOMElement} childNode Child node to insert.
   * @param {number} index Index at which to insert the child.
   * @internal
   */
  function insertChildAt(parentNode, childNode, index) {
    // By exploiting arrays returning `undefined` for an undefined index, we can
    // rely exclusively on `insertBefore(node, null)` instead of also using
    // `appendChild(node)`. However, using `undefined` is not allowed by all
    // browsers so we must replace it with `null`.
    parentNode.insertBefore(
      childNode,
      parentNode.childNodes[index] || null
    );
  }
  
  /**
   * Operations for updating with DOM children.
   */
  var DOMChildrenOperations = {
  
    dangerouslyReplaceNodeWithMarkup: Danger.dangerouslyReplaceNodeWithMarkup,
  
    updateTextContent: setTextContent,
  
    /**
     * Updates a component's children by processing a series of updates. The
     * update configurations are each expected to have a `parentNode` property.
     *
     * @param {array<object>} updates List of update configurations.
     * @param {array<string>} markupList List of markup strings.
     * @internal
     */
    processUpdates: function(updates, markupList) {
      var update;
      // Mapping from parent IDs to initial child orderings.
      var initialChildren = null;
      // List of children that will be moved or removed.
      var updatedChildren = null;
  
      for (var i = 0; i < updates.length; i++) {
        update = updates[i];
        if (update.type === ReactMultiChildUpdateTypes.MOVE_EXISTING ||
            update.type === ReactMultiChildUpdateTypes.REMOVE_NODE) {
          var updatedIndex = update.fromIndex;
          var updatedChild = update.parentNode.childNodes[updatedIndex];
          var parentID = update.parentID;
  
          (true ? invariant(
            updatedChild,
            'processUpdates(): Unable to find child %s of element. This ' +
            'probably means the DOM was unexpectedly mutated (e.g., by the ' +
            'browser), usually due to forgetting a <tbody> when using tables, ' +
            'nesting tags like <form>, <p>, or <a>, or using non-SVG elements ' +
            'in an <svg> parent. Try inspecting the child nodes of the element ' +
            'with React ID `%s`.',
            updatedIndex,
            parentID
          ) : invariant(updatedChild));
  
          initialChildren = initialChildren || {};
          initialChildren[parentID] = initialChildren[parentID] || [];
          initialChildren[parentID][updatedIndex] = updatedChild;
  
          updatedChildren = updatedChildren || [];
          updatedChildren.push(updatedChild);
        }
      }
  
      var renderedMarkup = Danger.dangerouslyRenderMarkup(markupList);
  
      // Remove updated children first so that `toIndex` is consistent.
      if (updatedChildren) {
        for (var j = 0; j < updatedChildren.length; j++) {
          updatedChildren[j].parentNode.removeChild(updatedChildren[j]);
        }
      }
  
      for (var k = 0; k < updates.length; k++) {
        update = updates[k];
        switch (update.type) {
          case ReactMultiChildUpdateTypes.INSERT_MARKUP:
            insertChildAt(
              update.parentNode,
              renderedMarkup[update.markupIndex],
              update.toIndex
            );
            break;
          case ReactMultiChildUpdateTypes.MOVE_EXISTING:
            insertChildAt(
              update.parentNode,
              initialChildren[update.parentID][update.fromIndex],
              update.toIndex
            );
            break;
          case ReactMultiChildUpdateTypes.TEXT_CONTENT:
            setTextContent(
              update.parentNode,
              update.textContent
            );
            break;
          case ReactMultiChildUpdateTypes.REMOVE_NODE:
            // Already removed by the for-loop above.
            break;
        }
      }
    }
  
  };
  
  module.exports = DOMChildrenOperations;


/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule Danger
   * @typechecks static-only
   */
  
  /*jslint evil: true, sub: true */
  
  'use strict';
  
  var ExecutionEnvironment = __webpack_require__(7);
  
  var createNodesFromMarkup = __webpack_require__(268);
  var emptyFunction = __webpack_require__(25);
  var getMarkupWrap = __webpack_require__(121);
  var invariant = __webpack_require__(2);
  
  var OPEN_TAG_NAME_EXP = /^(<[^ \/>]+)/;
  var RESULT_INDEX_ATTR = 'data-danger-index';
  
  /**
   * Extracts the `nodeName` from a string of markup.
   *
   * NOTE: Extracting the `nodeName` does not require a regular expression match
   * because we make assumptions about React-generated markup (i.e. there are no
   * spaces surrounding the opening tag and there is at least one attribute).
   *
   * @param {string} markup String of markup.
   * @return {string} Node name of the supplied markup.
   * @see http://jsperf.com/extract-nodename
   */
  function getNodeName(markup) {
    return markup.substring(1, markup.indexOf(' '));
  }
  
  var Danger = {
  
    /**
     * Renders markup into an array of nodes. The markup is expected to render
     * into a list of root nodes. Also, the length of `resultList` and
     * `markupList` should be the same.
     *
     * @param {array<string>} markupList List of markup strings to render.
     * @return {array<DOMElement>} List of rendered nodes.
     * @internal
     */
    dangerouslyRenderMarkup: function(markupList) {
      (true ? invariant(
        ExecutionEnvironment.canUseDOM,
        'dangerouslyRenderMarkup(...): Cannot render markup in a worker ' +
        'thread. Make sure `window` and `document` are available globally ' +
        'before requiring React when unit testing or use ' +
        'React.renderToString for server rendering.'
      ) : invariant(ExecutionEnvironment.canUseDOM));
      var nodeName;
      var markupByNodeName = {};
      // Group markup by `nodeName` if a wrap is necessary, else by '*'.
      for (var i = 0; i < markupList.length; i++) {
        (true ? invariant(
          markupList[i],
          'dangerouslyRenderMarkup(...): Missing markup.'
        ) : invariant(markupList[i]));
        nodeName = getNodeName(markupList[i]);
        nodeName = getMarkupWrap(nodeName) ? nodeName : '*';
        markupByNodeName[nodeName] = markupByNodeName[nodeName] || [];
        markupByNodeName[nodeName][i] = markupList[i];
      }
      var resultList = [];
      var resultListAssignmentCount = 0;
      for (nodeName in markupByNodeName) {
        if (!markupByNodeName.hasOwnProperty(nodeName)) {
          continue;
        }
        var markupListByNodeName = markupByNodeName[nodeName];
  
        // This for-in loop skips the holes of the sparse array. The order of
        // iteration should follow the order of assignment, which happens to match
        // numerical index order, but we don't rely on that.
        var resultIndex;
        for (resultIndex in markupListByNodeName) {
          if (markupListByNodeName.hasOwnProperty(resultIndex)) {
            var markup = markupListByNodeName[resultIndex];
  
            // Push the requested markup with an additional RESULT_INDEX_ATTR
            // attribute.  If the markup does not start with a < character, it
            // will be discarded below (with an appropriate console.error).
            markupListByNodeName[resultIndex] = markup.replace(
              OPEN_TAG_NAME_EXP,
              // This index will be parsed back out below.
              '$1 ' + RESULT_INDEX_ATTR + '="' + resultIndex + '" '
            );
          }
        }
  
        // Render each group of markup with similar wrapping `nodeName`.
        var renderNodes = createNodesFromMarkup(
          markupListByNodeName.join(''),
          emptyFunction // Do nothing special with <script> tags.
        );
  
        for (var j = 0; j < renderNodes.length; ++j) {
          var renderNode = renderNodes[j];
          if (renderNode.hasAttribute &&
              renderNode.hasAttribute(RESULT_INDEX_ATTR)) {
  
            resultIndex = +renderNode.getAttribute(RESULT_INDEX_ATTR);
            renderNode.removeAttribute(RESULT_INDEX_ATTR);
  
            (true ? invariant(
              !resultList.hasOwnProperty(resultIndex),
              'Danger: Assigning to an already-occupied result index.'
            ) : invariant(!resultList.hasOwnProperty(resultIndex)));
  
            resultList[resultIndex] = renderNode;
  
            // This should match resultList.length and markupList.length when
            // we're done.
            resultListAssignmentCount += 1;
  
          } else if (true) {
            console.error(
              'Danger: Discarding unexpected node:',
              renderNode
            );
          }
        }
      }
  
      // Although resultList was populated out of order, it should now be a dense
      // array.
      (true ? invariant(
        resultListAssignmentCount === resultList.length,
        'Danger: Did not assign to every index of resultList.'
      ) : invariant(resultListAssignmentCount === resultList.length));
  
      (true ? invariant(
        resultList.length === markupList.length,
        'Danger: Expected markup to render %s nodes, but rendered %s.',
        markupList.length,
        resultList.length
      ) : invariant(resultList.length === markupList.length));
  
      return resultList;
    },
  
    /**
     * Replaces a node with a string of markup at its current position within its
     * parent. The markup must render into a single root node.
     *
     * @param {DOMElement} oldChild Child node to replace.
     * @param {string} markup Markup to render in place of the child node.
     * @internal
     */
    dangerouslyReplaceNodeWithMarkup: function(oldChild, markup) {
      (true ? invariant(
        ExecutionEnvironment.canUseDOM,
        'dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a ' +
        'worker thread. Make sure `window` and `document` are available ' +
        'globally before requiring React when unit testing or use ' +
        'React.renderToString for server rendering.'
      ) : invariant(ExecutionEnvironment.canUseDOM));
      (true ? invariant(markup, 'dangerouslyReplaceNodeWithMarkup(...): Missing markup.') : invariant(markup));
      (true ? invariant(
        oldChild.tagName.toLowerCase() !== 'html',
        'dangerouslyReplaceNodeWithMarkup(...): Cannot replace markup of the ' +
        '<html> node. This is because browser quirks make this unreliable ' +
        'and/or slow. If you want to render to the root you must use ' +
        'server rendering. See React.renderToString().'
      ) : invariant(oldChild.tagName.toLowerCase() !== 'html'));
  
      var newChild = createNodesFromMarkup(markup, emptyFunction)[0];
      oldChild.parentNode.replaceChild(newChild, oldChild);
    }
  
  };
  
  module.exports = Danger;


/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule DefaultEventPluginOrder
   */
  
  'use strict';
  
  var keyOf = __webpack_require__(28);
  
  /**
   * Module that is injectable into `EventPluginHub`, that specifies a
   * deterministic ordering of `EventPlugin`s. A convenient way to reason about
   * plugins, without having to package every one of them. This is better than
   * having plugins be ordered in the same order that they are injected because
   * that ordering would be influenced by the packaging order.
   * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
   * preventing default on events is convenient in `SimpleEventPlugin` handlers.
   */
  var DefaultEventPluginOrder = [
    keyOf({ResponderEventPlugin: null}),
    keyOf({SimpleEventPlugin: null}),
    keyOf({TapEventPlugin: null}),
    keyOf({EnterLeaveEventPlugin: null}),
    keyOf({ChangeEventPlugin: null}),
    keyOf({SelectEventPlugin: null}),
    keyOf({BeforeInputEventPlugin: null}),
    keyOf({AnalyticsEventPlugin: null}),
    keyOf({MobileSafariClickEventPlugin: null})
  ];
  
  module.exports = DefaultEventPluginOrder;


/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule EnterLeaveEventPlugin
   * @typechecks static-only
   */
  
  'use strict';
  
  var EventConstants = __webpack_require__(12);
  var EventPropagators = __webpack_require__(40);
  var SyntheticMouseEvent = __webpack_require__(52);
  
  var ReactMount = __webpack_require__(18);
  var keyOf = __webpack_require__(28);
  
  var topLevelTypes = EventConstants.topLevelTypes;
  var getFirstReactDOM = ReactMount.getFirstReactDOM;
  
  var eventTypes = {
    mouseEnter: {
      registrationName: keyOf({onMouseEnter: null}),
      dependencies: [
        topLevelTypes.topMouseOut,
        topLevelTypes.topMouseOver
      ]
    },
    mouseLeave: {
      registrationName: keyOf({onMouseLeave: null}),
      dependencies: [
        topLevelTypes.topMouseOut,
        topLevelTypes.topMouseOver
      ]
    }
  };
  
  var extractedEvents = [null, null];
  
  var EnterLeaveEventPlugin = {
  
    eventTypes: eventTypes,
  
    /**
     * For almost every interaction we care about, there will be both a top-level
     * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
     * we do not extract duplicate events. However, moving the mouse into the
     * browser from outside will not fire a `mouseout` event. In this case, we use
     * the `mouseover` top-level event.
     *
     * @param {string} topLevelType Record from `EventConstants`.
     * @param {DOMEventTarget} topLevelTarget The listening component root node.
     * @param {string} topLevelTargetID ID of `topLevelTarget`.
     * @param {object} nativeEvent Native browser event.
     * @return {*} An accumulation of synthetic events.
     * @see {EventPluginHub.extractEvents}
     */
    extractEvents: function(
        topLevelType,
        topLevelTarget,
        topLevelTargetID,
        nativeEvent) {
      if (topLevelType === topLevelTypes.topMouseOver &&
          (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
        return null;
      }
      if (topLevelType !== topLevelTypes.topMouseOut &&
          topLevelType !== topLevelTypes.topMouseOver) {
        // Must not be a mouse in or mouse out - ignoring.
        return null;
      }
  
      var win;
      if (topLevelTarget.window === topLevelTarget) {
        // `topLevelTarget` is probably a window object.
        win = topLevelTarget;
      } else {
        // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
        var doc = topLevelTarget.ownerDocument;
        if (doc) {
          win = doc.defaultView || doc.parentWindow;
        } else {
          win = window;
        }
      }
  
      var from, to;
      if (topLevelType === topLevelTypes.topMouseOut) {
        from = topLevelTarget;
        to =
          getFirstReactDOM(nativeEvent.relatedTarget || nativeEvent.toElement) ||
          win;
      } else {
        from = win;
        to = topLevelTarget;
      }
  
      if (from === to) {
        // Nothing pertains to our managed components.
        return null;
      }
  
      var fromID = from ? ReactMount.getID(from) : '';
      var toID = to ? ReactMount.getID(to) : '';
  
      var leave = SyntheticMouseEvent.getPooled(
        eventTypes.mouseLeave,
        fromID,
        nativeEvent
      );
      leave.type = 'mouseleave';
      leave.target = from;
      leave.relatedTarget = to;
  
      var enter = SyntheticMouseEvent.getPooled(
        eventTypes.mouseEnter,
        toID,
        nativeEvent
      );
      enter.type = 'mouseenter';
      enter.target = to;
      enter.relatedTarget = from;
  
      EventPropagators.accumulateEnterLeaveDispatches(leave, enter, fromID, toID);
  
      extractedEvents[0] = leave;
      extractedEvents[1] = enter;
  
      return extractedEvents;
    }
  
  };
  
  module.exports = EnterLeaveEventPlugin;


/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * @providesModule EventListener
   * @typechecks
   */
  
  var emptyFunction = __webpack_require__(25);
  
  /**
   * Upstream version of event listener. Does not take into account specific
   * nature of platform.
   */
  var EventListener = {
    /**
     * Listen to DOM events during the bubble phase.
     *
     * @param {DOMEventTarget} target DOM element to register listener on.
     * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
     * @param {function} callback Callback function.
     * @return {object} Object with a `remove` method.
     */
    listen: function(target, eventType, callback) {
      if (target.addEventListener) {
        target.addEventListener(eventType, callback, false);
        return {
          remove: function() {
            target.removeEventListener(eventType, callback, false);
          }
        };
      } else if (target.attachEvent) {
        target.attachEvent('on' + eventType, callback);
        return {
          remove: function() {
            target.detachEvent('on' + eventType, callback);
          }
        };
      }
    },
  
    /**
     * Listen to DOM events during the capture phase.
     *
     * @param {DOMEventTarget} target DOM element to register listener on.
     * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
     * @param {function} callback Callback function.
     * @return {object} Object with a `remove` method.
     */
    capture: function(target, eventType, callback) {
      if (!target.addEventListener) {
        if (true) {
          console.error(
            'Attempted to listen to events during the capture phase on a ' +
            'browser that does not support the capture phase. Your application ' +
            'will not receive some events.'
          );
        }
        return {
          remove: emptyFunction
        };
      } else {
        target.addEventListener(eventType, callback, true);
        return {
          remove: function() {
            target.removeEventListener(eventType, callback, true);
          }
        };
      }
    },
  
    registerDefault: function() {}
  };
  
  module.exports = EventListener;


/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule FallbackCompositionState
   * @typechecks static-only
   */
  
  'use strict';
  
  var PooledClass = __webpack_require__(22);
  
  var assign = __webpack_require__(4);
  var getTextContentAccessor = __webpack_require__(122);
  
  /**
   * This helper class stores information about text content of a target node,
   * allowing comparison of content before and after a given event.
   *
   * Identify the node where selection currently begins, then observe
   * both its text content and its current position in the DOM. Since the
   * browser may natively replace the target node during composition, we can
   * use its position to find its replacement.
   *
   * @param {DOMEventTarget} root
   */
  function FallbackCompositionState(root) {
    this._root = root;
    this._startText = this.getText();
    this._fallbackText = null;
  }
  
  assign(FallbackCompositionState.prototype, {
    /**
     * Get current text of input.
     *
     * @return {string}
     */
    getText: function() {
      if ('value' in this._root) {
        return this._root.value;
      }
      return this._root[getTextContentAccessor()];
    },
  
    /**
     * Determine the differing substring between the initially stored
     * text content and the current content.
     *
     * @return {string}
     */
    getData: function() {
      if (this._fallbackText) {
        return this._fallbackText;
      }
  
      var start;
      var startValue = this._startText;
      var startLength = startValue.length;
      var end;
      var endValue = this.getText();
      var endLength = endValue.length;
  
      for (start = 0; start < startLength; start++) {
        if (startValue[start] !== endValue[start]) {
          break;
        }
      }
  
      var minEnd = startLength - start;
      for (end = 1; end <= minEnd; end++) {
        if (startValue[startLength - end] !== endValue[endLength - end]) {
          break;
        }
      }
  
      var sliceTail = end > 1 ? 1 - end : undefined;
      this._fallbackText = endValue.slice(start, sliceTail);
      return this._fallbackText;
    }
  });
  
  PooledClass.addPoolingTo(FallbackCompositionState);
  
  module.exports = FallbackCompositionState;


/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule HTMLDOMPropertyConfig
   */
  
  /*jslint bitwise: true*/
  
  'use strict';
  
  var DOMProperty = __webpack_require__(29);
  var ExecutionEnvironment = __webpack_require__(7);
  
  var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
  var MUST_USE_PROPERTY = DOMProperty.injection.MUST_USE_PROPERTY;
  var HAS_BOOLEAN_VALUE = DOMProperty.injection.HAS_BOOLEAN_VALUE;
  var HAS_SIDE_EFFECTS = DOMProperty.injection.HAS_SIDE_EFFECTS;
  var HAS_NUMERIC_VALUE = DOMProperty.injection.HAS_NUMERIC_VALUE;
  var HAS_POSITIVE_NUMERIC_VALUE =
    DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;
  var HAS_OVERLOADED_BOOLEAN_VALUE =
    DOMProperty.injection.HAS_OVERLOADED_BOOLEAN_VALUE;
  
  var hasSVG;
  if (ExecutionEnvironment.canUseDOM) {
    var implementation = document.implementation;
    hasSVG = (
      implementation &&
      implementation.hasFeature &&
      implementation.hasFeature(
        'http://www.w3.org/TR/SVG11/feature#BasicStructure',
        '1.1'
      )
    );
  }
  
  
  var HTMLDOMPropertyConfig = {
    isCustomAttribute: RegExp.prototype.test.bind(
      /^(data|aria)-[a-z_][a-z\d_.\-]*$/
    ),
    Properties: {
      /**
       * Standard Properties
       */
      accept: null,
      acceptCharset: null,
      accessKey: null,
      action: null,
      allowFullScreen: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      allowTransparency: MUST_USE_ATTRIBUTE,
      alt: null,
      async: HAS_BOOLEAN_VALUE,
      autoComplete: null,
      // autoFocus is polyfilled/normalized by AutoFocusMixin
      // autoFocus: HAS_BOOLEAN_VALUE,
      autoPlay: HAS_BOOLEAN_VALUE,
      cellPadding: null,
      cellSpacing: null,
      charSet: MUST_USE_ATTRIBUTE,
      checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      classID: MUST_USE_ATTRIBUTE,
      // To set className on SVG elements, it's necessary to use .setAttribute;
      // this works on HTML elements too in all browsers except IE8. Conveniently,
      // IE8 doesn't support SVG and so we can simply use the attribute in
      // browsers that support SVG and the property in browsers that don't,
      // regardless of whether the element is HTML or SVG.
      className: hasSVG ? MUST_USE_ATTRIBUTE : MUST_USE_PROPERTY,
      cols: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
      colSpan: null,
      content: null,
      contentEditable: null,
      contextMenu: MUST_USE_ATTRIBUTE,
      controls: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      coords: null,
      crossOrigin: null,
      data: null, // For `<object />` acts as `src`.
      dateTime: MUST_USE_ATTRIBUTE,
      defer: HAS_BOOLEAN_VALUE,
      dir: null,
      disabled: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      download: HAS_OVERLOADED_BOOLEAN_VALUE,
      draggable: null,
      encType: null,
      form: MUST_USE_ATTRIBUTE,
      formAction: MUST_USE_ATTRIBUTE,
      formEncType: MUST_USE_ATTRIBUTE,
      formMethod: MUST_USE_ATTRIBUTE,
      formNoValidate: HAS_BOOLEAN_VALUE,
      formTarget: MUST_USE_ATTRIBUTE,
      frameBorder: MUST_USE_ATTRIBUTE,
      headers: null,
      height: MUST_USE_ATTRIBUTE,
      hidden: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      high: null,
      href: null,
      hrefLang: null,
      htmlFor: null,
      httpEquiv: null,
      icon: null,
      id: MUST_USE_PROPERTY,
      label: null,
      lang: null,
      list: MUST_USE_ATTRIBUTE,
      loop: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      low: null,
      manifest: MUST_USE_ATTRIBUTE,
      marginHeight: null,
      marginWidth: null,
      max: null,
      maxLength: MUST_USE_ATTRIBUTE,
      media: MUST_USE_ATTRIBUTE,
      mediaGroup: null,
      method: null,
      min: null,
      multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      name: null,
      noValidate: HAS_BOOLEAN_VALUE,
      open: HAS_BOOLEAN_VALUE,
      optimum: null,
      pattern: null,
      placeholder: null,
      poster: null,
      preload: null,
      radioGroup: null,
      readOnly: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      rel: null,
      required: HAS_BOOLEAN_VALUE,
      role: MUST_USE_ATTRIBUTE,
      rows: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
      rowSpan: null,
      sandbox: null,
      scope: null,
      scoped: HAS_BOOLEAN_VALUE,
      scrolling: null,
      seamless: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      shape: null,
      size: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
      sizes: MUST_USE_ATTRIBUTE,
      span: HAS_POSITIVE_NUMERIC_VALUE,
      spellCheck: null,
      src: null,
      srcDoc: MUST_USE_PROPERTY,
      srcSet: MUST_USE_ATTRIBUTE,
      start: HAS_NUMERIC_VALUE,
      step: null,
      style: null,
      tabIndex: null,
      target: null,
      title: null,
      type: null,
      useMap: null,
      value: MUST_USE_PROPERTY | HAS_SIDE_EFFECTS,
      width: MUST_USE_ATTRIBUTE,
      wmode: MUST_USE_ATTRIBUTE,
  
      /**
       * Non-standard Properties
       */
      // autoCapitalize and autoCorrect are supported in Mobile Safari for
      // keyboard hints.
      autoCapitalize: null,
      autoCorrect: null,
      // itemProp, itemScope, itemType are for
      // Microdata support. See http://schema.org/docs/gs.html
      itemProp: MUST_USE_ATTRIBUTE,
      itemScope: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      itemType: MUST_USE_ATTRIBUTE,
      // itemID and itemRef are for Microdata support as well but
      // only specified in the the WHATWG spec document. See
      // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
      itemID: MUST_USE_ATTRIBUTE,
      itemRef: MUST_USE_ATTRIBUTE,
      // property is supported for OpenGraph in meta tags.
      property: null,
      // IE-only attribute that controls focus behavior
      unselectable: MUST_USE_ATTRIBUTE
    },
    DOMAttributeNames: {
      acceptCharset: 'accept-charset',
      className: 'class',
      htmlFor: 'for',
      httpEquiv: 'http-equiv'
    },
    DOMPropertyNames: {
      autoCapitalize: 'autocapitalize',
      autoComplete: 'autocomplete',
      autoCorrect: 'autocorrect',
      autoFocus: 'autofocus',
      autoPlay: 'autoplay',
      // `encoding` is equivalent to `enctype`, IE8 lacks an `enctype` setter.
      // http://www.w3.org/TR/html5/forms.html#dom-fs-encoding
      encType: 'encoding',
      hrefLang: 'hreflang',
      radioGroup: 'radiogroup',
      spellCheck: 'spellcheck',
      srcDoc: 'srcdoc',
      srcSet: 'srcset'
    }
  };
  
  module.exports = HTMLDOMPropertyConfig;


/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule MobileSafariClickEventPlugin
   * @typechecks static-only
   */
  
  'use strict';
  
  var EventConstants = __webpack_require__(12);
  
  var emptyFunction = __webpack_require__(25);
  
  var topLevelTypes = EventConstants.topLevelTypes;
  
  /**
   * Mobile Safari does not fire properly bubble click events on non-interactive
   * elements, which means delegated click listeners do not fire. The workaround
   * for this bug involves attaching an empty click listener on the target node.
   *
   * This particular plugin works around the bug by attaching an empty click
   * listener on `touchstart` (which does fire on every element).
   */
  var MobileSafariClickEventPlugin = {
  
    eventTypes: null,
  
    /**
     * @param {string} topLevelType Record from `EventConstants`.
     * @param {DOMEventTarget} topLevelTarget The listening component root node.
     * @param {string} topLevelTargetID ID of `topLevelTarget`.
     * @param {object} nativeEvent Native browser event.
     * @return {*} An accumulation of synthetic events.
     * @see {EventPluginHub.extractEvents}
     */
    extractEvents: function(
        topLevelType,
        topLevelTarget,
        topLevelTargetID,
        nativeEvent) {
      if (topLevelType === topLevelTypes.topTouchStart) {
        var target = nativeEvent.target;
        if (target && !target.onclick) {
          target.onclick = emptyFunction;
        }
      }
    }
  
  };
  
  module.exports = MobileSafariClickEventPlugin;


/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule React
   */
  
  /* globals __REACT_DEVTOOLS_GLOBAL_HOOK__*/
  
  'use strict';
  
  var EventPluginUtils = __webpack_require__(68);
  var ReactChildren = __webpack_require__(225);
  var ReactComponent = __webpack_require__(106);
  var ReactClass = __webpack_require__(13);
  var ReactContext = __webpack_require__(73);
  var ReactCurrentOwner = __webpack_require__(24);
  var ReactElement = __webpack_require__(5);
  var ReactElementValidator = __webpack_require__(41);
  var ReactDOM = __webpack_require__(227);
  var ReactDOMTextComponent = __webpack_require__(108);
  var ReactDefaultInjection = __webpack_require__(238);
  var ReactInstanceHandles = __webpack_require__(33);
  var ReactMount = __webpack_require__(18);
  var ReactPerf = __webpack_require__(27);
  var ReactPropTypes = __webpack_require__(112);
  var ReactReconciler = __webpack_require__(35);
  var ReactServerRendering = __webpack_require__(249);
  
  var assign = __webpack_require__(4);
  var findDOMNode = __webpack_require__(117);
  var onlyChild = __webpack_require__(280);
  
  ReactDefaultInjection.inject();
  
  var createElement = ReactElement.createElement;
  var createFactory = ReactElement.createFactory;
  var cloneElement = ReactElement.cloneElement;
  
  if (true) {
    createElement = ReactElementValidator.createElement;
    createFactory = ReactElementValidator.createFactory;
    cloneElement = ReactElementValidator.cloneElement;
  }
  
  var render = ReactPerf.measure('React', 'render', ReactMount.render);
  
  var React = {
    Children: {
      map: ReactChildren.map,
      forEach: ReactChildren.forEach,
      count: ReactChildren.count,
      only: onlyChild
    },
    Component: ReactComponent,
    DOM: ReactDOM,
    PropTypes: ReactPropTypes,
    initializeTouchEvents: function(shouldUseTouch) {
      EventPluginUtils.useTouchEvents = shouldUseTouch;
    },
    createClass: ReactClass.createClass,
    createElement: createElement,
    cloneElement: cloneElement,
    createFactory: createFactory,
    createMixin: function(mixin) {
      // Currently a noop. Will be used to validate and trace mixins.
      return mixin;
    },
    constructAndRenderComponent: ReactMount.constructAndRenderComponent,
    constructAndRenderComponentByID: ReactMount.constructAndRenderComponentByID,
    findDOMNode: findDOMNode,
    render: render,
    renderToString: ReactServerRendering.renderToString,
    renderToStaticMarkup: ReactServerRendering.renderToStaticMarkup,
    unmountComponentAtNode: ReactMount.unmountComponentAtNode,
    isValidElement: ReactElement.isValidElement,
    withContext: ReactContext.withContext,
  
    // Hook for JSX spread, don't use this for anything else.
    __spread: assign
  };
  
  // Inject the runtime into a devtools global hook regardless of browser.
  // Allows for debugging when the hook is injected on the page.
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
      CurrentOwner: ReactCurrentOwner,
      InstanceHandles: ReactInstanceHandles,
      Mount: ReactMount,
      Reconciler: ReactReconciler,
      TextComponent: ReactDOMTextComponent
    });
  }
  
  if (true) {
    var ExecutionEnvironment = __webpack_require__(7);
    if (ExecutionEnvironment.canUseDOM && window.top === window.self) {
  
      // If we're in Chrome, look for the devtools marker and provide a download
      // link if not installed.
      if (navigator.userAgent.indexOf('Chrome') > -1) {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
          console.debug(
            'Download the React DevTools for a better development experience: ' +
            'https://fb.me/react-devtools'
          );
        }
      }
  
      var expectedFeatures = [
        // shims
        Array.isArray,
        Array.prototype.every,
        Array.prototype.forEach,
        Array.prototype.indexOf,
        Array.prototype.map,
        Date.now,
        Function.prototype.bind,
        Object.keys,
        String.prototype.split,
        String.prototype.trim,
  
        // shams
        Object.create,
        Object.freeze
      ];
  
      for (var i = 0; i < expectedFeatures.length; i++) {
        if (!expectedFeatures[i]) {
          console.error(
            'One or more ES5 shim/shams expected by React are not available: ' +
            'https://fb.me/react-warning-polyfills'
          );
          break;
        }
      }
    }
  }
  
  React.version = '0.13.3';
  
  module.exports = React;


/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactChildReconciler
   * @typechecks static-only
   */
  
  'use strict';
  
  var ReactReconciler = __webpack_require__(35);
  
  var flattenChildren = __webpack_require__(270);
  var instantiateReactComponent = __webpack_require__(84);
  var shouldUpdateReactComponent = __webpack_require__(87);
  
  /**
   * ReactChildReconciler provides helpers for initializing or updating a set of
   * children. Its output is suitable for passing it onto ReactMultiChild which
   * does diffed reordering and insertion.
   */
  var ReactChildReconciler = {
  
    /**
     * Generates a "mount image" for each of the supplied children. In the case
     * of `ReactDOMComponent`, a mount image is a string of markup.
     *
     * @param {?object} nestedChildNodes Nested child maps.
     * @return {?object} A set of child instances.
     * @internal
     */
    instantiateChildren: function(nestedChildNodes, transaction, context) {
      var children = flattenChildren(nestedChildNodes);
      for (var name in children) {
        if (children.hasOwnProperty(name)) {
          var child = children[name];
          // The rendered children must be turned into instances as they're
          // mounted.
          var childInstance = instantiateReactComponent(child, null);
          children[name] = childInstance;
        }
      }
      return children;
    },
  
    /**
     * Updates the rendered children and returns a new set of children.
     *
     * @param {?object} prevChildren Previously initialized set of children.
     * @param {?object} nextNestedChildNodes Nested child maps.
     * @param {ReactReconcileTransaction} transaction
     * @param {object} context
     * @return {?object} A new set of child instances.
     * @internal
     */
    updateChildren: function(
      prevChildren,
      nextNestedChildNodes,
      transaction,
      context) {
      // We currently don't have a way to track moves here but if we use iterators
      // instead of for..in we can zip the iterators and check if an item has
      // moved.
      // TODO: If nothing has changed, return the prevChildren object so that we
      // can quickly bailout if nothing has changed.
      var nextChildren = flattenChildren(nextNestedChildNodes);
      if (!nextChildren && !prevChildren) {
        return null;
      }
      var name;
      for (name in nextChildren) {
        if (!nextChildren.hasOwnProperty(name)) {
          continue;
        }
        var prevChild = prevChildren && prevChildren[name];
        var prevElement = prevChild && prevChild._currentElement;
        var nextElement = nextChildren[name];
        if (shouldUpdateReactComponent(prevElement, nextElement)) {
          ReactReconciler.receiveComponent(
            prevChild, nextElement, transaction, context
          );
          nextChildren[name] = prevChild;
        } else {
          if (prevChild) {
            ReactReconciler.unmountComponent(prevChild, name);
          }
          // The child must be instantiated before it's mounted.
          var nextChildInstance = instantiateReactComponent(
            nextElement,
            null
          );
          nextChildren[name] = nextChildInstance;
        }
      }
      // Unmount children that are no longer present.
      for (name in prevChildren) {
        if (prevChildren.hasOwnProperty(name) &&
            !(nextChildren && nextChildren.hasOwnProperty(name))) {
          ReactReconciler.unmountComponent(prevChildren[name]);
        }
      }
      return nextChildren;
    },
  
    /**
     * Unmounts all rendered children. This should be used to clean up children
     * when this component is unmounted.
     *
     * @param {?object} renderedChildren Previously initialized set of children.
     * @internal
     */
    unmountChildren: function(renderedChildren) {
      for (var name in renderedChildren) {
        var renderedChild = renderedChildren[name];
        ReactReconciler.unmountComponent(renderedChild);
      }
    }
  
  };
  
  module.exports = ReactChildReconciler;


/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactChildren
   */
  
  'use strict';
  
  var PooledClass = __webpack_require__(22);
  var ReactFragment = __webpack_require__(49);
  
  var traverseAllChildren = __webpack_require__(125);
  var warning = __webpack_require__(6);
  
  var twoArgumentPooler = PooledClass.twoArgumentPooler;
  var threeArgumentPooler = PooledClass.threeArgumentPooler;
  
  /**
   * PooledClass representing the bookkeeping associated with performing a child
   * traversal. Allows avoiding binding callbacks.
   *
   * @constructor ForEachBookKeeping
   * @param {!function} forEachFunction Function to perform traversal with.
   * @param {?*} forEachContext Context to perform context with.
   */
  function ForEachBookKeeping(forEachFunction, forEachContext) {
    this.forEachFunction = forEachFunction;
    this.forEachContext = forEachContext;
  }
  PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);
  
  function forEachSingleChild(traverseContext, child, name, i) {
    var forEachBookKeeping = traverseContext;
    forEachBookKeeping.forEachFunction.call(
      forEachBookKeeping.forEachContext, child, i);
  }
  
  /**
   * Iterates through children that are typically specified as `props.children`.
   *
   * The provided forEachFunc(child, index) will be called for each
   * leaf child.
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} forEachFunc.
   * @param {*} forEachContext Context for forEachContext.
   */
  function forEachChildren(children, forEachFunc, forEachContext) {
    if (children == null) {
      return children;
    }
  
    var traverseContext =
      ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
    traverseAllChildren(children, forEachSingleChild, traverseContext);
    ForEachBookKeeping.release(traverseContext);
  }
  
  /**
   * PooledClass representing the bookkeeping associated with performing a child
   * mapping. Allows avoiding binding callbacks.
   *
   * @constructor MapBookKeeping
   * @param {!*} mapResult Object containing the ordered map of results.
   * @param {!function} mapFunction Function to perform mapping with.
   * @param {?*} mapContext Context to perform mapping with.
   */
  function MapBookKeeping(mapResult, mapFunction, mapContext) {
    this.mapResult = mapResult;
    this.mapFunction = mapFunction;
    this.mapContext = mapContext;
  }
  PooledClass.addPoolingTo(MapBookKeeping, threeArgumentPooler);
  
  function mapSingleChildIntoContext(traverseContext, child, name, i) {
    var mapBookKeeping = traverseContext;
    var mapResult = mapBookKeeping.mapResult;
  
    var keyUnique = !mapResult.hasOwnProperty(name);
    if (true) {
      (true ? warning(
        keyUnique,
        'ReactChildren.map(...): Encountered two children with the same key, ' +
        '`%s`. Child keys must be unique; when two children share a key, only ' +
        'the first child will be used.',
        name
      ) : null);
    }
  
    if (keyUnique) {
      var mappedChild =
        mapBookKeeping.mapFunction.call(mapBookKeeping.mapContext, child, i);
      mapResult[name] = mappedChild;
    }
  }
  
  /**
   * Maps children that are typically specified as `props.children`.
   *
   * The provided mapFunction(child, key, index) will be called for each
   * leaf child.
   *
   * TODO: This may likely break any calls to `ReactChildren.map` that were
   * previously relying on the fact that we guarded against null children.
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} mapFunction.
   * @param {*} mapContext Context for mapFunction.
   * @return {object} Object containing the ordered map of results.
   */
  function mapChildren(children, func, context) {
    if (children == null) {
      return children;
    }
  
    var mapResult = {};
    var traverseContext = MapBookKeeping.getPooled(mapResult, func, context);
    traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
    MapBookKeeping.release(traverseContext);
    return ReactFragment.create(mapResult);
  }
  
  function forEachSingleChildDummy(traverseContext, child, name, i) {
    return null;
  }
  
  /**
   * Count the number of children that are typically specified as
   * `props.children`.
   *
   * @param {?*} children Children tree container.
   * @return {number} The number of children.
   */
  function countChildren(children, context) {
    return traverseAllChildren(children, forEachSingleChildDummy, null);
  }
  
  var ReactChildren = {
    forEach: forEachChildren,
    map: mapChildren,
    count: countChildren
  };
  
  module.exports = ReactChildren;


/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactCompositeComponent
   */
  
  'use strict';
  
  var ReactComponentEnvironment = __webpack_require__(72);
  var ReactContext = __webpack_require__(73);
  var ReactCurrentOwner = __webpack_require__(24);
  var ReactElement = __webpack_require__(5);
  var ReactElementValidator = __webpack_require__(41);
  var ReactInstanceMap = __webpack_require__(34);
  var ReactLifeCycle = __webpack_require__(76);
  var ReactNativeComponent = __webpack_require__(50);
  var ReactPerf = __webpack_require__(27);
  var ReactPropTypeLocations = __webpack_require__(77);
  var ReactPropTypeLocationNames = __webpack_require__(51);
  var ReactReconciler = __webpack_require__(35);
  var ReactUpdates = __webpack_require__(19);
  
  var assign = __webpack_require__(4);
  var emptyObject = __webpack_require__(54);
  var invariant = __webpack_require__(2);
  var shouldUpdateReactComponent = __webpack_require__(87);
  var warning = __webpack_require__(6);
  
  function getDeclarationErrorAddendum(component) {
    var owner = component._currentElement._owner || null;
    if (owner) {
      var name = owner.getName();
      if (name) {
        return ' Check the render method of `' + name + '`.';
      }
    }
    return '';
  }
  
  /**
   * ------------------ The Life-Cycle of a Composite Component ------------------
   *
   * - constructor: Initialization of state. The instance is now retained.
   *   - componentWillMount
   *   - render
   *   - [children's constructors]
   *     - [children's componentWillMount and render]
   *     - [children's componentDidMount]
   *     - componentDidMount
   *
   *       Update Phases:
   *       - componentWillReceiveProps (only called if parent updated)
   *       - shouldComponentUpdate
   *         - componentWillUpdate
   *           - render
   *           - [children's constructors or receive props phases]
   *         - componentDidUpdate
   *
   *     - componentWillUnmount
   *     - [children's componentWillUnmount]
   *   - [children destroyed]
   * - (destroyed): The instance is now blank, released by React and ready for GC.
   *
   * -----------------------------------------------------------------------------
   */
  
  /**
   * An incrementing ID assigned to each component when it is mounted. This is
   * used to enforce the order in which `ReactUpdates` updates dirty components.
   *
   * @private
   */
  var nextMountID = 1;
  
  /**
   * @lends {ReactCompositeComponent.prototype}
   */
  var ReactCompositeComponentMixin = {
  
    /**
     * Base constructor for all composite component.
     *
     * @param {ReactElement} element
     * @final
     * @internal
     */
    construct: function(element) {
      this._currentElement = element;
      this._rootNodeID = null;
      this._instance = null;
  
      // See ReactUpdateQueue
      this._pendingElement = null;
      this._pendingStateQueue = null;
      this._pendingReplaceState = false;
      this._pendingForceUpdate = false;
  
      this._renderedComponent = null;
  
      this._context = null;
      this._mountOrder = 0;
      this._isTopLevel = false;
  
      // See ReactUpdates and ReactUpdateQueue.
      this._pendingCallbacks = null;
    },
  
    /**
     * Initializes the component, renders markup, and registers event listeners.
     *
     * @param {string} rootID DOM ID of the root node.
     * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
     * @return {?string} Rendered markup to be inserted into the DOM.
     * @final
     * @internal
     */
    mountComponent: function(rootID, transaction, context) {
      this._context = context;
      this._mountOrder = nextMountID++;
      this._rootNodeID = rootID;
  
      var publicProps = this._processProps(this._currentElement.props);
      var publicContext = this._processContext(this._currentElement._context);
  
      var Component = ReactNativeComponent.getComponentClassForElement(
        this._currentElement
      );
  
      // Initialize the public class
      var inst = new Component(publicProps, publicContext);
  
      if (true) {
        // This will throw later in _renderValidatedComponent, but add an early
        // warning now to help debugging
        (true ? warning(
          inst.render != null,
          '%s(...): No `render` method found on the returned component ' +
          'instance: you may have forgotten to define `render` in your ' +
          'component or you may have accidentally tried to render an element ' +
          'whose type is a function that isn\'t a React component.',
          Component.displayName || Component.name || 'Component'
        ) : null);
      }
  
      // These should be set up in the constructor, but as a convenience for
      // simpler class abstractions, we set them up after the fact.
      inst.props = publicProps;
      inst.context = publicContext;
      inst.refs = emptyObject;
  
      this._instance = inst;
  
      // Store a reference from the instance back to the internal representation
      ReactInstanceMap.set(inst, this);
  
      if (true) {
        this._warnIfContextsDiffer(this._currentElement._context, context);
      }
  
      if (true) {
        // Since plain JS classes are defined without any special initialization
        // logic, we can not catch common errors early. Therefore, we have to
        // catch them here, at initialization time, instead.
        (true ? warning(
          !inst.getInitialState ||
          inst.getInitialState.isReactClassApproved,
          'getInitialState was defined on %s, a plain JavaScript class. ' +
          'This is only supported for classes created using React.createClass. ' +
          'Did you mean to define a state property instead?',
          this.getName() || 'a component'
        ) : null);
        (true ? warning(
          !inst.getDefaultProps ||
          inst.getDefaultProps.isReactClassApproved,
          'getDefaultProps was defined on %s, a plain JavaScript class. ' +
          'This is only supported for classes created using React.createClass. ' +
          'Use a static property to define defaultProps instead.',
          this.getName() || 'a component'
        ) : null);
        (true ? warning(
          !inst.propTypes,
          'propTypes was defined as an instance property on %s. Use a static ' +
          'property to define propTypes instead.',
          this.getName() || 'a component'
        ) : null);
        (true ? warning(
          !inst.contextTypes,
          'contextTypes was defined as an instance property on %s. Use a ' +
          'static property to define contextTypes instead.',
          this.getName() || 'a component'
        ) : null);
        (true ? warning(
          typeof inst.componentShouldUpdate !== 'function',
          '%s has a method called ' +
          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
          'The name is phrased as a question because the function is ' +
          'expected to return a value.',
          (this.getName() || 'A component')
        ) : null);
      }
  
      var initialState = inst.state;
      if (initialState === undefined) {
        inst.state = initialState = null;
      }
      (true ? invariant(
        typeof initialState === 'object' && !Array.isArray(initialState),
        '%s.state: must be set to an object or null',
        this.getName() || 'ReactCompositeComponent'
      ) : invariant(typeof initialState === 'object' && !Array.isArray(initialState)));
  
      this._pendingStateQueue = null;
      this._pendingReplaceState = false;
      this._pendingForceUpdate = false;
  
      var childContext;
      var renderedElement;
  
      var previouslyMounting = ReactLifeCycle.currentlyMountingInstance;
      ReactLifeCycle.currentlyMountingInstance = this;
      try {
        if (inst.componentWillMount) {
          inst.componentWillMount();
          // When mounting, calls to `setState` by `componentWillMount` will set
          // `this._pendingStateQueue` without triggering a re-render.
          if (this._pendingStateQueue) {
            inst.state = this._processPendingState(inst.props, inst.context);
          }
        }
  
        childContext = this._getValidatedChildContext(context);
        renderedElement = this._renderValidatedComponent(childContext);
      } finally {
        ReactLifeCycle.currentlyMountingInstance = previouslyMounting;
      }
  
      this._renderedComponent = this._instantiateReactComponent(
        renderedElement,
        this._currentElement.type // The wrapping type
      );
  
      var markup = ReactReconciler.mountComponent(
        this._renderedComponent,
        rootID,
        transaction,
        this._mergeChildContext(context, childContext)
      );
      if (inst.componentDidMount) {
        transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
      }
  
      return markup;
    },
  
    /**
     * Releases any resources allocated by `mountComponent`.
     *
     * @final
     * @internal
     */
    unmountComponent: function() {
      var inst = this._instance;
  
      if (inst.componentWillUnmount) {
        var previouslyUnmounting = ReactLifeCycle.currentlyUnmountingInstance;
        ReactLifeCycle.currentlyUnmountingInstance = this;
        try {
          inst.componentWillUnmount();
        } finally {
          ReactLifeCycle.currentlyUnmountingInstance = previouslyUnmounting;
        }
      }
  
      ReactReconciler.unmountComponent(this._renderedComponent);
      this._renderedComponent = null;
  
      // Reset pending fields
      this._pendingStateQueue = null;
      this._pendingReplaceState = false;
      this._pendingForceUpdate = false;
      this._pendingCallbacks = null;
      this._pendingElement = null;
  
      // These fields do not really need to be reset since this object is no
      // longer accessible.
      this._context = null;
      this._rootNodeID = null;
  
      // Delete the reference from the instance to this internal representation
      // which allow the internals to be properly cleaned up even if the user
      // leaks a reference to the public instance.
      ReactInstanceMap.remove(inst);
  
      // Some existing components rely on inst.props even after they've been
      // destroyed (in event handlers).
      // TODO: inst.props = null;
      // TODO: inst.state = null;
      // TODO: inst.context = null;
    },
  
    /**
     * Schedule a partial update to the props. Only used for internal testing.
     *
     * @param {object} partialProps Subset of the next props.
     * @param {?function} callback Called after props are updated.
     * @final
     * @internal
     */
    _setPropsInternal: function(partialProps, callback) {
      // This is a deoptimized path. We optimize for always having an element.
      // This creates an extra internal element.
      var element = this._pendingElement || this._currentElement;
      this._pendingElement = ReactElement.cloneAndReplaceProps(
        element,
        assign({}, element.props, partialProps)
      );
      ReactUpdates.enqueueUpdate(this, callback);
    },
  
    /**
     * Filters the context object to only contain keys specified in
     * `contextTypes`
     *
     * @param {object} context
     * @return {?object}
     * @private
     */
    _maskContext: function(context) {
      var maskedContext = null;
      // This really should be getting the component class for the element,
      // but we know that we're not going to need it for built-ins.
      if (typeof this._currentElement.type === 'string') {
        return emptyObject;
      }
      var contextTypes = this._currentElement.type.contextTypes;
      if (!contextTypes) {
        return emptyObject;
      }
      maskedContext = {};
      for (var contextName in contextTypes) {
        maskedContext[contextName] = context[contextName];
      }
      return maskedContext;
    },
  
    /**
     * Filters the context object to only contain keys specified in
     * `contextTypes`, and asserts that they are valid.
     *
     * @param {object} context
     * @return {?object}
     * @private
     */
    _processContext: function(context) {
      var maskedContext = this._maskContext(context);
      if (true) {
        var Component = ReactNativeComponent.getComponentClassForElement(
          this._currentElement
        );
        if (Component.contextTypes) {
          this._checkPropTypes(
            Component.contextTypes,
            maskedContext,
            ReactPropTypeLocations.context
          );
        }
      }
      return maskedContext;
    },
  
    /**
     * @param {object} currentContext
     * @return {object}
     * @private
     */
    _getValidatedChildContext: function(currentContext) {
      var inst = this._instance;
      var childContext = inst.getChildContext && inst.getChildContext();
      if (childContext) {
        (true ? invariant(
          typeof inst.constructor.childContextTypes === 'object',
          '%s.getChildContext(): childContextTypes must be defined in order to ' +
          'use getChildContext().',
          this.getName() || 'ReactCompositeComponent'
        ) : invariant(typeof inst.constructor.childContextTypes === 'object'));
        if (true) {
          this._checkPropTypes(
            inst.constructor.childContextTypes,
            childContext,
            ReactPropTypeLocations.childContext
          );
        }
        for (var name in childContext) {
          (true ? invariant(
            name in inst.constructor.childContextTypes,
            '%s.getChildContext(): key "%s" is not defined in childContextTypes.',
            this.getName() || 'ReactCompositeComponent',
            name
          ) : invariant(name in inst.constructor.childContextTypes));
        }
        return childContext;
      }
      return null;
    },
  
    _mergeChildContext: function(currentContext, childContext) {
      if (childContext) {
        return assign({}, currentContext, childContext);
      }
      return currentContext;
    },
  
    /**
     * Processes props by setting default values for unspecified props and
     * asserting that the props are valid. Does not mutate its argument; returns
     * a new props object with defaults merged in.
     *
     * @param {object} newProps
     * @return {object}
     * @private
     */
    _processProps: function(newProps) {
      if (true) {
        var Component = ReactNativeComponent.getComponentClassForElement(
          this._currentElement
        );
        if (Component.propTypes) {
          this._checkPropTypes(
            Component.propTypes,
            newProps,
            ReactPropTypeLocations.prop
          );
        }
      }
      return newProps;
    },
  
    /**
     * Assert that the props are valid
     *
     * @param {object} propTypes Map of prop name to a ReactPropType
     * @param {object} props
     * @param {string} location e.g. "prop", "context", "child context"
     * @private
     */
    _checkPropTypes: function(propTypes, props, location) {
      // TODO: Stop validating prop types here and only use the element
      // validation.
      var componentName = this.getName();
      for (var propName in propTypes) {
        if (propTypes.hasOwnProperty(propName)) {
          var error;
          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            (true ? invariant(
              typeof propTypes[propName] === 'function',
              '%s: %s type `%s` is invalid; it must be a function, usually ' +
              'from React.PropTypes.',
              componentName || 'React class',
              ReactPropTypeLocationNames[location],
              propName
            ) : invariant(typeof propTypes[propName] === 'function'));
            error = propTypes[propName](props, propName, componentName, location);
          } catch (ex) {
            error = ex;
          }
          if (error instanceof Error) {
            // We may want to extend this logic for similar errors in
            // React.render calls, so I'm abstracting it away into
            // a function to minimize refactoring in the future
            var addendum = getDeclarationErrorAddendum(this);
  
            if (location === ReactPropTypeLocations.prop) {
              // Preface gives us something to blacklist in warning module
              (true ? warning(
                false,
                'Failed Composite propType: %s%s',
                error.message,
                addendum
              ) : null);
            } else {
              (true ? warning(
                false,
                'Failed Context Types: %s%s',
                error.message,
                addendum
              ) : null);
            }
          }
        }
      }
    },
  
    receiveComponent: function(nextElement, transaction, nextContext) {
      var prevElement = this._currentElement;
      var prevContext = this._context;
  
      this._pendingElement = null;
  
      this.updateComponent(
        transaction,
        prevElement,
        nextElement,
        prevContext,
        nextContext
      );
    },
  
    /**
     * If any of `_pendingElement`, `_pendingStateQueue`, or `_pendingForceUpdate`
     * is set, update the component.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */
    performUpdateIfNecessary: function(transaction) {
      if (this._pendingElement != null) {
        ReactReconciler.receiveComponent(
          this,
          this._pendingElement || this._currentElement,
          transaction,
          this._context
        );
      }
  
      if (this._pendingStateQueue !== null || this._pendingForceUpdate) {
        if (true) {
          ReactElementValidator.checkAndWarnForMutatedProps(
            this._currentElement
          );
        }
  
        this.updateComponent(
          transaction,
          this._currentElement,
          this._currentElement,
          this._context,
          this._context
        );
      }
    },
  
    /**
     * Compare two contexts, warning if they are different
     * TODO: Remove this check when owner-context is removed
     */
     _warnIfContextsDiffer: function(ownerBasedContext, parentBasedContext) {
      ownerBasedContext = this._maskContext(ownerBasedContext);
      parentBasedContext = this._maskContext(parentBasedContext);
      var parentKeys = Object.keys(parentBasedContext).sort();
      var displayName = this.getName() || 'ReactCompositeComponent';
      for (var i = 0; i < parentKeys.length; i++) {
        var key = parentKeys[i];
        (true ? warning(
          ownerBasedContext[key] === parentBasedContext[key],
          'owner-based and parent-based contexts differ '  +
          '(values: `%s` vs `%s`) for key (%s) while mounting %s ' +
          '(see: http://fb.me/react-context-by-parent)',
          ownerBasedContext[key],
          parentBasedContext[key],
          key,
          displayName
        ) : null);
      }
    },
  
    /**
     * Perform an update to a mounted component. The componentWillReceiveProps and
     * shouldComponentUpdate methods are called, then (assuming the update isn't
     * skipped) the remaining update lifecycle methods are called and the DOM
     * representation is updated.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @param {ReactElement} prevParentElement
     * @param {ReactElement} nextParentElement
     * @internal
     * @overridable
     */
    updateComponent: function(
      transaction,
      prevParentElement,
      nextParentElement,
      prevUnmaskedContext,
      nextUnmaskedContext
    ) {
      var inst = this._instance;
  
      var nextContext = inst.context;
      var nextProps = inst.props;
  
      // Distinguish between a props update versus a simple state update
      if (prevParentElement !== nextParentElement) {
        nextContext = this._processContext(nextParentElement._context);
        nextProps = this._processProps(nextParentElement.props);
  
        if (true) {
          if (nextUnmaskedContext != null) {
            this._warnIfContextsDiffer(
              nextParentElement._context,
              nextUnmaskedContext
            );
          }
        }
  
        // An update here will schedule an update but immediately set
        // _pendingStateQueue which will ensure that any state updates gets
        // immediately reconciled instead of waiting for the next batch.
  
        if (inst.componentWillReceiveProps) {
          inst.componentWillReceiveProps(nextProps, nextContext);
        }
      }
  
      var nextState = this._processPendingState(nextProps, nextContext);
  
      var shouldUpdate =
        this._pendingForceUpdate ||
        !inst.shouldComponentUpdate ||
        inst.shouldComponentUpdate(nextProps, nextState, nextContext);
  
      if (true) {
        (true ? warning(
          typeof shouldUpdate !== 'undefined',
          '%s.shouldComponentUpdate(): Returned undefined instead of a ' +
          'boolean value. Make sure to return true or false.',
          this.getName() || 'ReactCompositeComponent'
        ) : null);
      }
  
      if (shouldUpdate) {
        this._pendingForceUpdate = false;
        // Will set `this.props`, `this.state` and `this.context`.
        this._performComponentUpdate(
          nextParentElement,
          nextProps,
          nextState,
          nextContext,
          transaction,
          nextUnmaskedContext
        );
      } else {
        // If it's determined that a component should not update, we still want
        // to set props and state but we shortcut the rest of the update.
        this._currentElement = nextParentElement;
        this._context = nextUnmaskedContext;
        inst.props = nextProps;
        inst.state = nextState;
        inst.context = nextContext;
      }
    },
  
    _processPendingState: function(props, context) {
      var inst = this._instance;
      var queue = this._pendingStateQueue;
      var replace = this._pendingReplaceState;
      this._pendingReplaceState = false;
      this._pendingStateQueue = null;
  
      if (!queue) {
        return inst.state;
      }
  
      if (replace && queue.length === 1) {
        return queue[0];
      }
  
      var nextState = assign({}, replace ? queue[0] : inst.state);
      for (var i = replace ? 1 : 0; i < queue.length; i++) {
        var partial = queue[i];
        assign(
          nextState,
          typeof partial === 'function' ?
            partial.call(inst, nextState, props, context) :
            partial
        );
      }
  
      return nextState;
    },
  
    /**
     * Merges new props and state, notifies delegate methods of update and
     * performs update.
     *
     * @param {ReactElement} nextElement Next element
     * @param {object} nextProps Next public object to set as properties.
     * @param {?object} nextState Next object to set as state.
     * @param {?object} nextContext Next public object to set as context.
     * @param {ReactReconcileTransaction} transaction
     * @param {?object} unmaskedContext
     * @private
     */
    _performComponentUpdate: function(
      nextElement,
      nextProps,
      nextState,
      nextContext,
      transaction,
      unmaskedContext
    ) {
      var inst = this._instance;
  
      var prevProps = inst.props;
      var prevState = inst.state;
      var prevContext = inst.context;
  
      if (inst.componentWillUpdate) {
        inst.componentWillUpdate(nextProps, nextState, nextContext);
      }
  
      this._currentElement = nextElement;
      this._context = unmaskedContext;
      inst.props = nextProps;
      inst.state = nextState;
      inst.context = nextContext;
  
      this._updateRenderedComponent(transaction, unmaskedContext);
  
      if (inst.componentDidUpdate) {
        transaction.getReactMountReady().enqueue(
          inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext),
          inst
        );
      }
    },
  
    /**
     * Call the component's `render` method and update the DOM accordingly.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */
    _updateRenderedComponent: function(transaction, context) {
      var prevComponentInstance = this._renderedComponent;
      var prevRenderedElement = prevComponentInstance._currentElement;
      var childContext = this._getValidatedChildContext();
      var nextRenderedElement = this._renderValidatedComponent(childContext);
      if (shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
        ReactReconciler.receiveComponent(
          prevComponentInstance,
          nextRenderedElement,
          transaction,
          this._mergeChildContext(context, childContext)
        );
      } else {
        // These two IDs are actually the same! But nothing should rely on that.
        var thisID = this._rootNodeID;
        var prevComponentID = prevComponentInstance._rootNodeID;
        ReactReconciler.unmountComponent(prevComponentInstance);
  
        this._renderedComponent = this._instantiateReactComponent(
          nextRenderedElement,
          this._currentElement.type
        );
        var nextMarkup = ReactReconciler.mountComponent(
          this._renderedComponent,
          thisID,
          transaction,
          this._mergeChildContext(context, childContext)
        );
        this._replaceNodeWithMarkupByID(prevComponentID, nextMarkup);
      }
    },
  
    /**
     * @protected
     */
    _replaceNodeWithMarkupByID: function(prevComponentID, nextMarkup) {
      ReactComponentEnvironment.replaceNodeWithMarkupByID(
        prevComponentID,
        nextMarkup
      );
    },
  
    /**
     * @protected
     */
    _renderValidatedComponentWithoutOwnerOrContext: function() {
      var inst = this._instance;
      var renderedComponent = inst.render();
      if (true) {
        // We allow auto-mocks to proceed as if they're returning null.
        if (typeof renderedComponent === 'undefined' &&
            inst.render._isMockFunction) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          renderedComponent = null;
        }
      }
  
      return renderedComponent;
    },
  
    /**
     * @private
     */
    _renderValidatedComponent: function(childContext) {
      var renderedComponent;
      var previousContext = ReactContext.current;
      ReactContext.current = this._mergeChildContext(
        this._currentElement._context,
        childContext
      );
      ReactCurrentOwner.current = this;
      try {
        renderedComponent =
          this._renderValidatedComponentWithoutOwnerOrContext();
      } finally {
        ReactContext.current = previousContext;
        ReactCurrentOwner.current = null;
      }
      (true ? invariant(
        // TODO: An `isValidNode` function would probably be more appropriate
        renderedComponent === null || renderedComponent === false ||
        ReactElement.isValidElement(renderedComponent),
        '%s.render(): A valid ReactComponent must be returned. You may have ' +
          'returned undefined, an array or some other invalid object.',
        this.getName() || 'ReactCompositeComponent'
      ) : invariant(// TODO: An `isValidNode` function would probably be more appropriate
      renderedComponent === null || renderedComponent === false ||
      ReactElement.isValidElement(renderedComponent)));
      return renderedComponent;
    },
  
    /**
     * Lazily allocates the refs object and stores `component` as `ref`.
     *
     * @param {string} ref Reference name.
     * @param {component} component Component to store as `ref`.
     * @final
     * @private
     */
    attachRef: function(ref, component) {
      var inst = this.getPublicInstance();
      var refs = inst.refs === emptyObject ? (inst.refs = {}) : inst.refs;
      refs[ref] = component.getPublicInstance();
    },
  
    /**
     * Detaches a reference name.
     *
     * @param {string} ref Name to dereference.
     * @final
     * @private
     */
    detachRef: function(ref) {
      var refs = this.getPublicInstance().refs;
      delete refs[ref];
    },
  
    /**
     * Get a text description of the component that can be used to identify it
     * in error messages.
     * @return {string} The name or null.
     * @internal
     */
    getName: function() {
      var type = this._currentElement.type;
      var constructor = this._instance && this._instance.constructor;
      return (
        type.displayName || (constructor && constructor.displayName) ||
        type.name || (constructor && constructor.name) ||
        null
      );
    },
  
    /**
     * Get the publicly accessible representation of this component - i.e. what
     * is exposed by refs and returned by React.render. Can be null for stateless
     * components.
     *
     * @return {ReactComponent} the public component instance.
     * @internal
     */
    getPublicInstance: function() {
      return this._instance;
    },
  
    // Stub
    _instantiateReactComponent: null
  
  };
  
  ReactPerf.measureMethods(
    ReactCompositeComponentMixin,
    'ReactCompositeComponent',
    {
      mountComponent: 'mountComponent',
      updateComponent: 'updateComponent',
      _renderValidatedComponent: '_renderValidatedComponent'
    }
  );
  
  var ReactCompositeComponent = {
  
    Mixin: ReactCompositeComponentMixin
  
  };
  
  module.exports = ReactCompositeComponent;


/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDOM
   * @typechecks static-only
   */
  
  'use strict';
  
  var ReactElement = __webpack_require__(5);
  var ReactElementValidator = __webpack_require__(41);
  
  var mapObject = __webpack_require__(278);
  
  /**
   * Create a factory that creates HTML tag elements.
   *
   * @param {string} tag Tag name (e.g. `div`).
   * @private
   */
  function createDOMFactory(tag) {
    if (true) {
      return ReactElementValidator.createFactory(tag);
    }
    return ReactElement.createFactory(tag);
  }
  
  /**
   * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
   * This is also accessible via `React.DOM`.
   *
   * @public
   */
  var ReactDOM = mapObject({
    a: 'a',
    abbr: 'abbr',
    address: 'address',
    area: 'area',
    article: 'article',
    aside: 'aside',
    audio: 'audio',
    b: 'b',
    base: 'base',
    bdi: 'bdi',
    bdo: 'bdo',
    big: 'big',
    blockquote: 'blockquote',
    body: 'body',
    br: 'br',
    button: 'button',
    canvas: 'canvas',
    caption: 'caption',
    cite: 'cite',
    code: 'code',
    col: 'col',
    colgroup: 'colgroup',
    data: 'data',
    datalist: 'datalist',
    dd: 'dd',
    del: 'del',
    details: 'details',
    dfn: 'dfn',
    dialog: 'dialog',
    div: 'div',
    dl: 'dl',
    dt: 'dt',
    em: 'em',
    embed: 'embed',
    fieldset: 'fieldset',
    figcaption: 'figcaption',
    figure: 'figure',
    footer: 'footer',
    form: 'form',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    head: 'head',
    header: 'header',
    hr: 'hr',
    html: 'html',
    i: 'i',
    iframe: 'iframe',
    img: 'img',
    input: 'input',
    ins: 'ins',
    kbd: 'kbd',
    keygen: 'keygen',
    label: 'label',
    legend: 'legend',
    li: 'li',
    link: 'link',
    main: 'main',
    map: 'map',
    mark: 'mark',
    menu: 'menu',
    menuitem: 'menuitem',
    meta: 'meta',
    meter: 'meter',
    nav: 'nav',
    noscript: 'noscript',
    object: 'object',
    ol: 'ol',
    optgroup: 'optgroup',
    option: 'option',
    output: 'output',
    p: 'p',
    param: 'param',
    picture: 'picture',
    pre: 'pre',
    progress: 'progress',
    q: 'q',
    rp: 'rp',
    rt: 'rt',
    ruby: 'ruby',
    s: 's',
    samp: 'samp',
    script: 'script',
    section: 'section',
    select: 'select',
    small: 'small',
    source: 'source',
    span: 'span',
    strong: 'strong',
    style: 'style',
    sub: 'sub',
    summary: 'summary',
    sup: 'sup',
    table: 'table',
    tbody: 'tbody',
    td: 'td',
    textarea: 'textarea',
    tfoot: 'tfoot',
    th: 'th',
    thead: 'thead',
    time: 'time',
    title: 'title',
    tr: 'tr',
    track: 'track',
    u: 'u',
    ul: 'ul',
    'var': 'var',
    video: 'video',
    wbr: 'wbr',
  
    // SVG
    circle: 'circle',
    clipPath: 'clipPath',
    defs: 'defs',
    ellipse: 'ellipse',
    g: 'g',
    line: 'line',
    linearGradient: 'linearGradient',
    mask: 'mask',
    path: 'path',
    pattern: 'pattern',
    polygon: 'polygon',
    polyline: 'polyline',
    radialGradient: 'radialGradient',
    rect: 'rect',
    stop: 'stop',
    svg: 'svg',
    text: 'text',
    tspan: 'tspan'
  
  }, createDOMFactory);
  
  module.exports = ReactDOM;


/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDOMButton
   */
  
  'use strict';
  
  var AutoFocusMixin = __webpack_require__(48);
  var ReactBrowserComponentMixin = __webpack_require__(23);
  var ReactClass = __webpack_require__(13);
  var ReactElement = __webpack_require__(5);
  
  var keyMirror = __webpack_require__(36);
  
  var button = ReactElement.createFactory('button');
  
  var mouseListenerNames = keyMirror({
    onClick: true,
    onDoubleClick: true,
    onMouseDown: true,
    onMouseMove: true,
    onMouseUp: true,
    onClickCapture: true,
    onDoubleClickCapture: true,
    onMouseDownCapture: true,
    onMouseMoveCapture: true,
    onMouseUpCapture: true
  });
  
  /**
   * Implements a <button> native component that does not receive mouse events
   * when `disabled` is set.
   */
  var ReactDOMButton = ReactClass.createClass({
    displayName: 'ReactDOMButton',
    tagName: 'BUTTON',
  
    mixins: [AutoFocusMixin, ReactBrowserComponentMixin],
  
    render: function() {
      var props = {};
  
      // Copy the props; except the mouse listeners if we're disabled
      for (var key in this.props) {
        if (this.props.hasOwnProperty(key) &&
            (!this.props.disabled || !mouseListenerNames[key])) {
          props[key] = this.props[key];
        }
      }
  
      return button(props, this.props.children);
    }
  
  });
  
  module.exports = ReactDOMButton;


/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDOMForm
   */
  
  'use strict';
  
  var EventConstants = __webpack_require__(12);
  var LocalEventTrapMixin = __webpack_require__(70);
  var ReactBrowserComponentMixin = __webpack_require__(23);
  var ReactClass = __webpack_require__(13);
  var ReactElement = __webpack_require__(5);
  
  var form = ReactElement.createFactory('form');
  
  /**
   * Since onSubmit doesn't bubble OR capture on the top level in IE8, we need
   * to capture it on the <form> element itself. There are lots of hacks we could
   * do to accomplish this, but the most reliable is to make <form> a
   * composite component and use `componentDidMount` to attach the event handlers.
   */
  var ReactDOMForm = ReactClass.createClass({
    displayName: 'ReactDOMForm',
    tagName: 'FORM',
  
    mixins: [ReactBrowserComponentMixin, LocalEventTrapMixin],
  
    render: function() {
      // TODO: Instead of using `ReactDOM` directly, we should use JSX. However,
      // `jshint` fails to parse JSX so in order for linting to work in the open
      // source repo, we need to just use `ReactDOM.form`.
      return form(this.props);
    },
  
    componentDidMount: function() {
      this.trapBubbledEvent(EventConstants.topLevelTypes.topReset, 'reset');
      this.trapBubbledEvent(EventConstants.topLevelTypes.topSubmit, 'submit');
    }
  });
  
  module.exports = ReactDOMForm;


/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDOMIframe
   */
  
  'use strict';
  
  var EventConstants = __webpack_require__(12);
  var LocalEventTrapMixin = __webpack_require__(70);
  var ReactBrowserComponentMixin = __webpack_require__(23);
  var ReactClass = __webpack_require__(13);
  var ReactElement = __webpack_require__(5);
  
  var iframe = ReactElement.createFactory('iframe');
  
  /**
   * Since onLoad doesn't bubble OR capture on the top level in IE8, we need to
   * capture it on the <iframe> element itself. There are lots of hacks we could
   * do to accomplish this, but the most reliable is to make <iframe> a composite
   * component and use `componentDidMount` to attach the event handlers.
   */
  var ReactDOMIframe = ReactClass.createClass({
    displayName: 'ReactDOMIframe',
    tagName: 'IFRAME',
  
    mixins: [ReactBrowserComponentMixin, LocalEventTrapMixin],
  
    render: function() {
      return iframe(this.props);
    },
  
    componentDidMount: function() {
      this.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, 'load');
    }
  });
  
  module.exports = ReactDOMIframe;


/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDOMImg
   */
  
  'use strict';
  
  var EventConstants = __webpack_require__(12);
  var LocalEventTrapMixin = __webpack_require__(70);
  var ReactBrowserComponentMixin = __webpack_require__(23);
  var ReactClass = __webpack_require__(13);
  var ReactElement = __webpack_require__(5);
  
  var img = ReactElement.createFactory('img');
  
  /**
   * Since onLoad doesn't bubble OR capture on the top level in IE8, we need to
   * capture it on the <img> element itself. There are lots of hacks we could do
   * to accomplish this, but the most reliable is to make <img> a composite
   * component and use `componentDidMount` to attach the event handlers.
   */
  var ReactDOMImg = ReactClass.createClass({
    displayName: 'ReactDOMImg',
    tagName: 'IMG',
  
    mixins: [ReactBrowserComponentMixin, LocalEventTrapMixin],
  
    render: function() {
      return img(this.props);
    },
  
    componentDidMount: function() {
      this.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, 'load');
      this.trapBubbledEvent(EventConstants.topLevelTypes.topError, 'error');
    }
  });
  
  module.exports = ReactDOMImg;


/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDOMInput
   */
  
  'use strict';
  
  var AutoFocusMixin = __webpack_require__(48);
  var DOMPropertyOperations = __webpack_require__(38);
  var LinkedValueUtils = __webpack_require__(69);
  var ReactBrowserComponentMixin = __webpack_require__(23);
  var ReactClass = __webpack_require__(13);
  var ReactElement = __webpack_require__(5);
  var ReactMount = __webpack_require__(18);
  var ReactUpdates = __webpack_require__(19);
  
  var assign = __webpack_require__(4);
  var invariant = __webpack_require__(2);
  
  var input = ReactElement.createFactory('input');
  
  var instancesByReactID = {};
  
  function forceUpdateIfMounted() {
    /*jshint validthis:true */
    if (this.isMounted()) {
      this.forceUpdate();
    }
  }
  
  /**
   * Implements an <input> native component that allows setting these optional
   * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
   *
   * If `checked` or `value` are not supplied (or null/undefined), user actions
   * that affect the checked state or value will trigger updates to the element.
   *
   * If they are supplied (and not null/undefined), the rendered element will not
   * trigger updates to the element. Instead, the props must change in order for
   * the rendered element to be updated.
   *
   * The rendered element will be initialized as unchecked (or `defaultChecked`)
   * with an empty value (or `defaultValue`).
   *
   * @see http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
   */
  var ReactDOMInput = ReactClass.createClass({
    displayName: 'ReactDOMInput',
    tagName: 'INPUT',
  
    mixins: [AutoFocusMixin, LinkedValueUtils.Mixin, ReactBrowserComponentMixin],
  
    getInitialState: function() {
      var defaultValue = this.props.defaultValue;
      return {
        initialChecked: this.props.defaultChecked || false,
        initialValue: defaultValue != null ? defaultValue : null
      };
    },
  
    render: function() {
      // Clone `this.props` so we don't mutate the input.
      var props = assign({}, this.props);
  
      props.defaultChecked = null;
      props.defaultValue = null;
  
      var value = LinkedValueUtils.getValue(this);
      props.value = value != null ? value : this.state.initialValue;
  
      var checked = LinkedValueUtils.getChecked(this);
      props.checked = checked != null ? checked : this.state.initialChecked;
  
      props.onChange = this._handleChange;
  
      return input(props, this.props.children);
    },
  
    componentDidMount: function() {
      var id = ReactMount.getID(this.getDOMNode());
      instancesByReactID[id] = this;
    },
  
    componentWillUnmount: function() {
      var rootNode = this.getDOMNode();
      var id = ReactMount.getID(rootNode);
      delete instancesByReactID[id];
    },
  
    componentDidUpdate: function(prevProps, prevState, prevContext) {
      var rootNode = this.getDOMNode();
      if (this.props.checked != null) {
        DOMPropertyOperations.setValueForProperty(
          rootNode,
          'checked',
          this.props.checked || false
        );
      }
  
      var value = LinkedValueUtils.getValue(this);
      if (value != null) {
        // Cast `value` to a string to ensure the value is set correctly. While
        // browsers typically do this as necessary, jsdom doesn't.
        DOMPropertyOperations.setValueForProperty(rootNode, 'value', '' + value);
      }
    },
  
    _handleChange: function(event) {
      var returnValue;
      var onChange = LinkedValueUtils.getOnChange(this);
      if (onChange) {
        returnValue = onChange.call(this, event);
      }
      // Here we use asap to wait until all updates have propagated, which
      // is important when using controlled components within layers:
      // https://github.com/facebook/react/issues/1698
      ReactUpdates.asap(forceUpdateIfMounted, this);
  
      var name = this.props.name;
      if (this.props.type === 'radio' && name != null) {
        var rootNode = this.getDOMNode();
        var queryRoot = rootNode;
  
        while (queryRoot.parentNode) {
          queryRoot = queryRoot.parentNode;
        }
  
        // If `rootNode.form` was non-null, then we could try `form.elements`,
        // but that sometimes behaves strangely in IE8. We could also try using
        // `form.getElementsByName`, but that will only return direct children
        // and won't include inputs that use the HTML5 `form=` attribute. Since
        // the input might not even be in a form, let's just use the global
        // `querySelectorAll` to ensure we don't miss anything.
        var group = queryRoot.querySelectorAll(
          'input[name=' + JSON.stringify('' + name) + '][type="radio"]');
  
        for (var i = 0, groupLen = group.length; i < groupLen; i++) {
          var otherNode = group[i];
          if (otherNode === rootNode ||
              otherNode.form !== rootNode.form) {
            continue;
          }
          var otherID = ReactMount.getID(otherNode);
          (true ? invariant(
            otherID,
            'ReactDOMInput: Mixing React and non-React radio inputs with the ' +
            'same `name` is not supported.'
          ) : invariant(otherID));
          var otherInstance = instancesByReactID[otherID];
          (true ? invariant(
            otherInstance,
            'ReactDOMInput: Unknown radio button ID %s.',
            otherID
          ) : invariant(otherInstance));
          // If this is a controlled radio button group, forcing the input that
          // was previously checked to update will cause it to be come re-checked
          // as appropriate.
          ReactUpdates.asap(forceUpdateIfMounted, otherInstance);
        }
      }
  
      return returnValue;
    }
  
  });
  
  module.exports = ReactDOMInput;


/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDOMOption
   */
  
  'use strict';
  
  var ReactBrowserComponentMixin = __webpack_require__(23);
  var ReactClass = __webpack_require__(13);
  var ReactElement = __webpack_require__(5);
  
  var warning = __webpack_require__(6);
  
  var option = ReactElement.createFactory('option');
  
  /**
   * Implements an <option> native component that warns when `selected` is set.
   */
  var ReactDOMOption = ReactClass.createClass({
    displayName: 'ReactDOMOption',
    tagName: 'OPTION',
  
    mixins: [ReactBrowserComponentMixin],
  
    componentWillMount: function() {
      // TODO (yungsters): Remove support for `selected` in <option>.
      if (true) {
        (true ? warning(
          this.props.selected == null,
          'Use the `defaultValue` or `value` props on <select> instead of ' +
          'setting `selected` on <option>.'
        ) : null);
      }
    },
  
    render: function() {
      return option(this.props, this.props.children);
    }
  
  });
  
  module.exports = ReactDOMOption;


/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDOMSelect
   */
  
  'use strict';
  
  var AutoFocusMixin = __webpack_require__(48);
  var LinkedValueUtils = __webpack_require__(69);
  var ReactBrowserComponentMixin = __webpack_require__(23);
  var ReactClass = __webpack_require__(13);
  var ReactElement = __webpack_require__(5);
  var ReactUpdates = __webpack_require__(19);
  
  var assign = __webpack_require__(4);
  
  var select = ReactElement.createFactory('select');
  
  function updateOptionsIfPendingUpdateAndMounted() {
    /*jshint validthis:true */
    if (this._pendingUpdate) {
      this._pendingUpdate = false;
      var value = LinkedValueUtils.getValue(this);
      if (value != null && this.isMounted()) {
        updateOptions(this, value);
      }
    }
  }
  
  /**
   * Validation function for `value` and `defaultValue`.
   * @private
   */
  function selectValueType(props, propName, componentName) {
    if (props[propName] == null) {
      return null;
    }
    if (props.multiple) {
      if (!Array.isArray(props[propName])) {
        return new Error(
          ("The `" + propName + "` prop supplied to <select> must be an array if ") +
          ("`multiple` is true.")
        );
      }
    } else {
      if (Array.isArray(props[propName])) {
        return new Error(
          ("The `" + propName + "` prop supplied to <select> must be a scalar ") +
          ("value if `multiple` is false.")
        );
      }
    }
  }
  
  /**
   * @param {ReactComponent} component Instance of ReactDOMSelect
   * @param {*} propValue A stringable (with `multiple`, a list of stringables).
   * @private
   */
  function updateOptions(component, propValue) {
    var selectedValue, i, l;
    var options = component.getDOMNode().options;
  
    if (component.props.multiple) {
      selectedValue = {};
      for (i = 0, l = propValue.length; i < l; i++) {
        selectedValue['' + propValue[i]] = true;
      }
      for (i = 0, l = options.length; i < l; i++) {
        var selected = selectedValue.hasOwnProperty(options[i].value);
        if (options[i].selected !== selected) {
          options[i].selected = selected;
        }
      }
    } else {
      // Do not set `select.value` as exact behavior isn't consistent across all
      // browsers for all cases.
      selectedValue = '' + propValue;
      for (i = 0, l = options.length; i < l; i++) {
        if (options[i].value === selectedValue) {
          options[i].selected = true;
          return;
        }
      }
      if (options.length) {
        options[0].selected = true;
      }
    }
  }
  
  /**
   * Implements a <select> native component that allows optionally setting the
   * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
   * stringable. If `multiple` is true, the prop must be an array of stringables.
   *
   * If `value` is not supplied (or null/undefined), user actions that change the
   * selected option will trigger updates to the rendered options.
   *
   * If it is supplied (and not null/undefined), the rendered options will not
   * update in response to user actions. Instead, the `value` prop must change in
   * order for the rendered options to update.
   *
   * If `defaultValue` is provided, any options with the supplied values will be
   * selected.
   */
  var ReactDOMSelect = ReactClass.createClass({
    displayName: 'ReactDOMSelect',
    tagName: 'SELECT',
  
    mixins: [AutoFocusMixin, LinkedValueUtils.Mixin, ReactBrowserComponentMixin],
  
    propTypes: {
      defaultValue: selectValueType,
      value: selectValueType
    },
  
    render: function() {
      // Clone `this.props` so we don't mutate the input.
      var props = assign({}, this.props);
  
      props.onChange = this._handleChange;
      props.value = null;
  
      return select(props, this.props.children);
    },
  
    componentWillMount: function() {
      this._pendingUpdate = false;
    },
  
    componentDidMount: function() {
      var value = LinkedValueUtils.getValue(this);
      if (value != null) {
        updateOptions(this, value);
      } else if (this.props.defaultValue != null) {
        updateOptions(this, this.props.defaultValue);
      }
    },
  
    componentDidUpdate: function(prevProps) {
      var value = LinkedValueUtils.getValue(this);
      if (value != null) {
        this._pendingUpdate = false;
        updateOptions(this, value);
      } else if (!prevProps.multiple !== !this.props.multiple) {
        // For simplicity, reapply `defaultValue` if `multiple` is toggled.
        if (this.props.defaultValue != null) {
          updateOptions(this, this.props.defaultValue);
        } else {
          // Revert the select back to its default unselected state.
          updateOptions(this, this.props.multiple ? [] : '');
        }
      }
    },
  
    _handleChange: function(event) {
      var returnValue;
      var onChange = LinkedValueUtils.getOnChange(this);
      if (onChange) {
        returnValue = onChange.call(this, event);
      }
  
      this._pendingUpdate = true;
      ReactUpdates.asap(updateOptionsIfPendingUpdateAndMounted, this);
      return returnValue;
    }
  
  });
  
  module.exports = ReactDOMSelect;


/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDOMSelection
   */
  
  'use strict';
  
  var ExecutionEnvironment = __webpack_require__(7);
  
  var getNodeForCharacterOffset = __webpack_require__(272);
  var getTextContentAccessor = __webpack_require__(122);
  
  /**
   * While `isCollapsed` is available on the Selection object and `collapsed`
   * is available on the Range object, IE11 sometimes gets them wrong.
   * If the anchor/focus nodes and offsets are the same, the range is collapsed.
   */
  function isCollapsed(anchorNode, anchorOffset, focusNode, focusOffset) {
    return anchorNode === focusNode && anchorOffset === focusOffset;
  }
  
  /**
   * Get the appropriate anchor and focus node/offset pairs for IE.
   *
   * The catch here is that IE's selection API doesn't provide information
   * about whether the selection is forward or backward, so we have to
   * behave as though it's always forward.
   *
   * IE text differs from modern selection in that it behaves as though
   * block elements end with a new line. This means character offsets will
   * differ between the two APIs.
   *
   * @param {DOMElement} node
   * @return {object}
   */
  function getIEOffsets(node) {
    var selection = document.selection;
    var selectedRange = selection.createRange();
    var selectedLength = selectedRange.text.length;
  
    // Duplicate selection so we can move range without breaking user selection.
    var fromStart = selectedRange.duplicate();
    fromStart.moveToElementText(node);
    fromStart.setEndPoint('EndToStart', selectedRange);
  
    var startOffset = fromStart.text.length;
    var endOffset = startOffset + selectedLength;
  
    return {
      start: startOffset,
      end: endOffset
    };
  }
  
  /**
   * @param {DOMElement} node
   * @return {?object}
   */
  function getModernOffsets(node) {
    var selection = window.getSelection && window.getSelection();
  
    if (!selection || selection.rangeCount === 0) {
      return null;
    }
  
    var anchorNode = selection.anchorNode;
    var anchorOffset = selection.anchorOffset;
    var focusNode = selection.focusNode;
    var focusOffset = selection.focusOffset;
  
    var currentRange = selection.getRangeAt(0);
  
    // If the node and offset values are the same, the selection is collapsed.
    // `Selection.isCollapsed` is available natively, but IE sometimes gets
    // this value wrong.
    var isSelectionCollapsed = isCollapsed(
      selection.anchorNode,
      selection.anchorOffset,
      selection.focusNode,
      selection.focusOffset
    );
  
    var rangeLength = isSelectionCollapsed ? 0 : currentRange.toString().length;
  
    var tempRange = currentRange.cloneRange();
    tempRange.selectNodeContents(node);
    tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);
  
    var isTempRangeCollapsed = isCollapsed(
      tempRange.startContainer,
      tempRange.startOffset,
      tempRange.endContainer,
      tempRange.endOffset
    );
  
    var start = isTempRangeCollapsed ? 0 : tempRange.toString().length;
    var end = start + rangeLength;
  
    // Detect whether the selection is backward.
    var detectionRange = document.createRange();
    detectionRange.setStart(anchorNode, anchorOffset);
    detectionRange.setEnd(focusNode, focusOffset);
    var isBackward = detectionRange.collapsed;
  
    return {
      start: isBackward ? end : start,
      end: isBackward ? start : end
    };
  }
  
  /**
   * @param {DOMElement|DOMTextNode} node
   * @param {object} offsets
   */
  function setIEOffsets(node, offsets) {
    var range = document.selection.createRange().duplicate();
    var start, end;
  
    if (typeof offsets.end === 'undefined') {
      start = offsets.start;
      end = start;
    } else if (offsets.start > offsets.end) {
      start = offsets.end;
      end = offsets.start;
    } else {
      start = offsets.start;
      end = offsets.end;
    }
  
    range.moveToElementText(node);
    range.moveStart('character', start);
    range.setEndPoint('EndToStart', range);
    range.moveEnd('character', end - start);
    range.select();
  }
  
  /**
   * In modern non-IE browsers, we can support both forward and backward
   * selections.
   *
   * Note: IE10+ supports the Selection object, but it does not support
   * the `extend` method, which means that even in modern IE, it's not possible
   * to programatically create a backward selection. Thus, for all IE
   * versions, we use the old IE API to create our selections.
   *
   * @param {DOMElement|DOMTextNode} node
   * @param {object} offsets
   */
  function setModernOffsets(node, offsets) {
    if (!window.getSelection) {
      return;
    }
  
    var selection = window.getSelection();
    var length = node[getTextContentAccessor()].length;
    var start = Math.min(offsets.start, length);
    var end = typeof offsets.end === 'undefined' ?
              start : Math.min(offsets.end, length);
  
    // IE 11 uses modern selection, but doesn't support the extend method.
    // Flip backward selections, so we can set with a single range.
    if (!selection.extend && start > end) {
      var temp = end;
      end = start;
      start = temp;
    }
  
    var startMarker = getNodeForCharacterOffset(node, start);
    var endMarker = getNodeForCharacterOffset(node, end);
  
    if (startMarker && endMarker) {
      var range = document.createRange();
      range.setStart(startMarker.node, startMarker.offset);
      selection.removeAllRanges();
  
      if (start > end) {
        selection.addRange(range);
        selection.extend(endMarker.node, endMarker.offset);
      } else {
        range.setEnd(endMarker.node, endMarker.offset);
        selection.addRange(range);
      }
    }
  }
  
  var useIEOffsets = (
    ExecutionEnvironment.canUseDOM &&
    'selection' in document &&
    !('getSelection' in window)
  );
  
  var ReactDOMSelection = {
    /**
     * @param {DOMElement} node
     */
    getOffsets: useIEOffsets ? getIEOffsets : getModernOffsets,
  
    /**
     * @param {DOMElement|DOMTextNode} node
     * @param {object} offsets
     */
    setOffsets: useIEOffsets ? setIEOffsets : setModernOffsets
  };
  
  module.exports = ReactDOMSelection;


/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDOMTextarea
   */
  
  'use strict';
  
  var AutoFocusMixin = __webpack_require__(48);
  var DOMPropertyOperations = __webpack_require__(38);
  var LinkedValueUtils = __webpack_require__(69);
  var ReactBrowserComponentMixin = __webpack_require__(23);
  var ReactClass = __webpack_require__(13);
  var ReactElement = __webpack_require__(5);
  var ReactUpdates = __webpack_require__(19);
  
  var assign = __webpack_require__(4);
  var invariant = __webpack_require__(2);
  
  var warning = __webpack_require__(6);
  
  var textarea = ReactElement.createFactory('textarea');
  
  function forceUpdateIfMounted() {
    /*jshint validthis:true */
    if (this.isMounted()) {
      this.forceUpdate();
    }
  }
  
  /**
   * Implements a <textarea> native component that allows setting `value`, and
   * `defaultValue`. This differs from the traditional DOM API because value is
   * usually set as PCDATA children.
   *
   * If `value` is not supplied (or null/undefined), user actions that affect the
   * value will trigger updates to the element.
   *
   * If `value` is supplied (and not null/undefined), the rendered element will
   * not trigger updates to the element. Instead, the `value` prop must change in
   * order for the rendered element to be updated.
   *
   * The rendered element will be initialized with an empty value, the prop
   * `defaultValue` if specified, or the children content (deprecated).
   */
  var ReactDOMTextarea = ReactClass.createClass({
    displayName: 'ReactDOMTextarea',
    tagName: 'TEXTAREA',
  
    mixins: [AutoFocusMixin, LinkedValueUtils.Mixin, ReactBrowserComponentMixin],
  
    getInitialState: function() {
      var defaultValue = this.props.defaultValue;
      // TODO (yungsters): Remove support for children content in <textarea>.
      var children = this.props.children;
      if (children != null) {
        if (true) {
          (true ? warning(
            false,
            'Use the `defaultValue` or `value` props instead of setting ' +
            'children on <textarea>.'
          ) : null);
        }
        (true ? invariant(
          defaultValue == null,
          'If you supply `defaultValue` on a <textarea>, do not pass children.'
        ) : invariant(defaultValue == null));
        if (Array.isArray(children)) {
          (true ? invariant(
            children.length <= 1,
            '<textarea> can only have at most one child.'
          ) : invariant(children.length <= 1));
          children = children[0];
        }
  
        defaultValue = '' + children;
      }
      if (defaultValue == null) {
        defaultValue = '';
      }
      var value = LinkedValueUtils.getValue(this);
      return {
        // We save the initial value so that `ReactDOMComponent` doesn't update
        // `textContent` (unnecessary since we update value).
        // The initial value can be a boolean or object so that's why it's
        // forced to be a string.
        initialValue: '' + (value != null ? value : defaultValue)
      };
    },
  
    render: function() {
      // Clone `this.props` so we don't mutate the input.
      var props = assign({}, this.props);
  
      (true ? invariant(
        props.dangerouslySetInnerHTML == null,
        '`dangerouslySetInnerHTML` does not make sense on <textarea>.'
      ) : invariant(props.dangerouslySetInnerHTML == null));
  
      props.defaultValue = null;
      props.value = null;
      props.onChange = this._handleChange;
  
      // Always set children to the same thing. In IE9, the selection range will
      // get reset if `textContent` is mutated.
      return textarea(props, this.state.initialValue);
    },
  
    componentDidUpdate: function(prevProps, prevState, prevContext) {
      var value = LinkedValueUtils.getValue(this);
      if (value != null) {
        var rootNode = this.getDOMNode();
        // Cast `value` to a string to ensure the value is set correctly. While
        // browsers typically do this as necessary, jsdom doesn't.
        DOMPropertyOperations.setValueForProperty(rootNode, 'value', '' + value);
      }
    },
  
    _handleChange: function(event) {
      var returnValue;
      var onChange = LinkedValueUtils.getOnChange(this);
      if (onChange) {
        returnValue = onChange.call(this, event);
      }
      ReactUpdates.asap(forceUpdateIfMounted, this);
      return returnValue;
    }
  
  });
  
  module.exports = ReactDOMTextarea;


/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDefaultBatchingStrategy
   */
  
  'use strict';
  
  var ReactUpdates = __webpack_require__(19);
  var Transaction = __webpack_require__(53);
  
  var assign = __webpack_require__(4);
  var emptyFunction = __webpack_require__(25);
  
  var RESET_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: function() {
      ReactDefaultBatchingStrategy.isBatchingUpdates = false;
    }
  };
  
  var FLUSH_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
  };
  
  var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];
  
  function ReactDefaultBatchingStrategyTransaction() {
    this.reinitializeTransaction();
  }
  
  assign(
    ReactDefaultBatchingStrategyTransaction.prototype,
    Transaction.Mixin,
    {
      getTransactionWrappers: function() {
        return TRANSACTION_WRAPPERS;
      }
    }
  );
  
  var transaction = new ReactDefaultBatchingStrategyTransaction();
  
  var ReactDefaultBatchingStrategy = {
    isBatchingUpdates: false,
  
    /**
     * Call the provided function in a context within which calls to `setState`
     * and friends are batched such that components aren't updated unnecessarily.
     */
    batchedUpdates: function(callback, a, b, c, d) {
      var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;
  
      ReactDefaultBatchingStrategy.isBatchingUpdates = true;
  
      // The code is written this way to avoid extra allocations
      if (alreadyBatchingUpdates) {
        callback(a, b, c, d);
      } else {
        transaction.perform(callback, null, a, b, c, d);
      }
    }
  };
  
  module.exports = ReactDefaultBatchingStrategy;


/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDefaultInjection
   */
  
  'use strict';
  
  var BeforeInputEventPlugin = __webpack_require__(212);
  var ChangeEventPlugin = __webpack_require__(213);
  var ClientReactRootIndex = __webpack_require__(214);
  var DefaultEventPluginOrder = __webpack_require__(217);
  var EnterLeaveEventPlugin = __webpack_require__(218);
  var ExecutionEnvironment = __webpack_require__(7);
  var HTMLDOMPropertyConfig = __webpack_require__(221);
  var MobileSafariClickEventPlugin = __webpack_require__(222);
  var ReactBrowserComponentMixin = __webpack_require__(23);
  var ReactClass = __webpack_require__(13);
  var ReactComponentBrowserEnvironment =
    __webpack_require__(71);
  var ReactDefaultBatchingStrategy = __webpack_require__(237);
  var ReactDOMComponent = __webpack_require__(74);
  var ReactDOMButton = __webpack_require__(228);
  var ReactDOMForm = __webpack_require__(229);
  var ReactDOMImg = __webpack_require__(231);
  var ReactDOMIDOperations = __webpack_require__(107);
  var ReactDOMIframe = __webpack_require__(230);
  var ReactDOMInput = __webpack_require__(232);
  var ReactDOMOption = __webpack_require__(233);
  var ReactDOMSelect = __webpack_require__(234);
  var ReactDOMTextarea = __webpack_require__(236);
  var ReactDOMTextComponent = __webpack_require__(108);
  var ReactElement = __webpack_require__(5);
  var ReactEventListener = __webpack_require__(243);
  var ReactInjection = __webpack_require__(244);
  var ReactInstanceHandles = __webpack_require__(33);
  var ReactMount = __webpack_require__(18);
  var ReactReconcileTransaction = __webpack_require__(247);
  var SelectEventPlugin = __webpack_require__(252);
  var ServerReactRootIndex = __webpack_require__(253);
  var SimpleEventPlugin = __webpack_require__(254);
  var SVGDOMPropertyConfig = __webpack_require__(251);
  
  var createFullPageComponent = __webpack_require__(267);
  
  function autoGenerateWrapperClass(type) {
    return ReactClass.createClass({
      tagName: type.toUpperCase(),
      render: function() {
        return new ReactElement(
          type,
          null,
          null,
          null,
          null,
          this.props
        );
      }
    });
  }
  
  function inject() {
    ReactInjection.EventEmitter.injectReactEventListener(
      ReactEventListener
    );
  
    /**
     * Inject modules for resolving DOM hierarchy and plugin ordering.
     */
    ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);
    ReactInjection.EventPluginHub.injectInstanceHandle(ReactInstanceHandles);
    ReactInjection.EventPluginHub.injectMount(ReactMount);
  
    /**
     * Some important event plugins included by default (without having to require
     * them).
     */
    ReactInjection.EventPluginHub.injectEventPluginsByName({
      SimpleEventPlugin: SimpleEventPlugin,
      EnterLeaveEventPlugin: EnterLeaveEventPlugin,
      ChangeEventPlugin: ChangeEventPlugin,
      MobileSafariClickEventPlugin: MobileSafariClickEventPlugin,
      SelectEventPlugin: SelectEventPlugin,
      BeforeInputEventPlugin: BeforeInputEventPlugin
    });
  
    ReactInjection.NativeComponent.injectGenericComponentClass(
      ReactDOMComponent
    );
  
    ReactInjection.NativeComponent.injectTextComponentClass(
      ReactDOMTextComponent
    );
  
    ReactInjection.NativeComponent.injectAutoWrapper(
      autoGenerateWrapperClass
    );
  
    // This needs to happen before createFullPageComponent() otherwise the mixin
    // won't be included.
    ReactInjection.Class.injectMixin(ReactBrowserComponentMixin);
  
    ReactInjection.NativeComponent.injectComponentClasses({
      'button': ReactDOMButton,
      'form': ReactDOMForm,
      'iframe': ReactDOMIframe,
      'img': ReactDOMImg,
      'input': ReactDOMInput,
      'option': ReactDOMOption,
      'select': ReactDOMSelect,
      'textarea': ReactDOMTextarea,
  
      'html': createFullPageComponent('html'),
      'head': createFullPageComponent('head'),
      'body': createFullPageComponent('body')
    });
  
    ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMPropertyConfig);
    ReactInjection.DOMProperty.injectDOMPropertyConfig(SVGDOMPropertyConfig);
  
    ReactInjection.EmptyComponent.injectEmptyComponent('noscript');
  
    ReactInjection.Updates.injectReconcileTransaction(
      ReactReconcileTransaction
    );
    ReactInjection.Updates.injectBatchingStrategy(
      ReactDefaultBatchingStrategy
    );
  
    ReactInjection.RootIndex.injectCreateReactRootIndex(
      ExecutionEnvironment.canUseDOM ?
        ClientReactRootIndex.createReactRootIndex :
        ServerReactRootIndex.createReactRootIndex
    );
  
    ReactInjection.Component.injectEnvironment(ReactComponentBrowserEnvironment);
    ReactInjection.DOMComponent.injectIDOperations(ReactDOMIDOperations);
  
    if (true) {
      var url = (ExecutionEnvironment.canUseDOM && window.location.href) || '';
      if ((/[?&]react_perf\b/).test(url)) {
        var ReactDefaultPerf = __webpack_require__(239);
        ReactDefaultPerf.start();
      }
    }
  }
  
  module.exports = {
    inject: inject
  };


/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDefaultPerf
   * @typechecks static-only
   */
  
  'use strict';
  
  var DOMProperty = __webpack_require__(29);
  var ReactDefaultPerfAnalysis = __webpack_require__(240);
  var ReactMount = __webpack_require__(18);
  var ReactPerf = __webpack_require__(27);
  
  var performanceNow = __webpack_require__(282);
  
  function roundFloat(val) {
    return Math.floor(val * 100) / 100;
  }
  
  function addValue(obj, key, val) {
    obj[key] = (obj[key] || 0) + val;
  }
  
  var ReactDefaultPerf = {
    _allMeasurements: [], // last item in the list is the current one
    _mountStack: [0],
    _injected: false,
  
    start: function() {
      if (!ReactDefaultPerf._injected) {
        ReactPerf.injection.injectMeasure(ReactDefaultPerf.measure);
      }
  
      ReactDefaultPerf._allMeasurements.length = 0;
      ReactPerf.enableMeasure = true;
    },
  
    stop: function() {
      ReactPerf.enableMeasure = false;
    },
  
    getLastMeasurements: function() {
      return ReactDefaultPerf._allMeasurements;
    },
  
    printExclusive: function(measurements) {
      measurements = measurements || ReactDefaultPerf._allMeasurements;
      var summary = ReactDefaultPerfAnalysis.getExclusiveSummary(measurements);
      console.table(summary.map(function(item) {
        return {
          'Component class name': item.componentName,
          'Total inclusive time (ms)': roundFloat(item.inclusive),
          'Exclusive mount time (ms)': roundFloat(item.exclusive),
          'Exclusive render time (ms)': roundFloat(item.render),
          'Mount time per instance (ms)': roundFloat(item.exclusive / item.count),
          'Render time per instance (ms)': roundFloat(item.render / item.count),
          'Instances': item.count
        };
      }));
      // TODO: ReactDefaultPerfAnalysis.getTotalTime() does not return the correct
      // number.
    },
  
    printInclusive: function(measurements) {
      measurements = measurements || ReactDefaultPerf._allMeasurements;
      var summary = ReactDefaultPerfAnalysis.getInclusiveSummary(measurements);
      console.table(summary.map(function(item) {
        return {
          'Owner > component': item.componentName,
          'Inclusive time (ms)': roundFloat(item.time),
          'Instances': item.count
        };
      }));
      console.log(
        'Total time:',
        ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms'
      );
    },
  
    getMeasurementsSummaryMap: function(measurements) {
      var summary = ReactDefaultPerfAnalysis.getInclusiveSummary(
        measurements,
        true
      );
      return summary.map(function(item) {
        return {
          'Owner > component': item.componentName,
          'Wasted time (ms)': item.time,
          'Instances': item.count
        };
      });
    },
  
    printWasted: function(measurements) {
      measurements = measurements || ReactDefaultPerf._allMeasurements;
      console.table(ReactDefaultPerf.getMeasurementsSummaryMap(measurements));
      console.log(
        'Total time:',
        ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms'
      );
    },
  
    printDOM: function(measurements) {
      measurements = measurements || ReactDefaultPerf._allMeasurements;
      var summary = ReactDefaultPerfAnalysis.getDOMSummary(measurements);
      console.table(summary.map(function(item) {
        var result = {};
        result[DOMProperty.ID_ATTRIBUTE_NAME] = item.id;
        result['type'] = item.type;
        result['args'] = JSON.stringify(item.args);
        return result;
      }));
      console.log(
        'Total time:',
        ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms'
      );
    },
  
    _recordWrite: function(id, fnName, totalTime, args) {
      // TODO: totalTime isn't that useful since it doesn't count paints/reflows
      var writes =
        ReactDefaultPerf
          ._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1]
          .writes;
      writes[id] = writes[id] || [];
      writes[id].push({
        type: fnName,
        time: totalTime,
        args: args
      });
    },
  
    measure: function(moduleName, fnName, func) {
      return function() {for (var args=[],$__0=0,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
        var totalTime;
        var rv;
        var start;
  
        if (fnName === '_renderNewRootComponent' ||
            fnName === 'flushBatchedUpdates') {
          // A "measurement" is a set of metrics recorded for each flush. We want
          // to group the metrics for a given flush together so we can look at the
          // components that rendered and the DOM operations that actually
          // happened to determine the amount of "wasted work" performed.
          ReactDefaultPerf._allMeasurements.push({
            exclusive: {},
            inclusive: {},
            render: {},
            counts: {},
            writes: {},
            displayNames: {},
            totalTime: 0
          });
          start = performanceNow();
          rv = func.apply(this, args);
          ReactDefaultPerf._allMeasurements[
            ReactDefaultPerf._allMeasurements.length - 1
          ].totalTime = performanceNow() - start;
          return rv;
        } else if (fnName === '_mountImageIntoNode' ||
            moduleName === 'ReactDOMIDOperations') {
          start = performanceNow();
          rv = func.apply(this, args);
          totalTime = performanceNow() - start;
  
          if (fnName === '_mountImageIntoNode') {
            var mountID = ReactMount.getID(args[1]);
            ReactDefaultPerf._recordWrite(mountID, fnName, totalTime, args[0]);
          } else if (fnName === 'dangerouslyProcessChildrenUpdates') {
            // special format
            args[0].forEach(function(update) {
              var writeArgs = {};
              if (update.fromIndex !== null) {
                writeArgs.fromIndex = update.fromIndex;
              }
              if (update.toIndex !== null) {
                writeArgs.toIndex = update.toIndex;
              }
              if (update.textContent !== null) {
                writeArgs.textContent = update.textContent;
              }
              if (update.markupIndex !== null) {
                writeArgs.markup = args[1][update.markupIndex];
              }
              ReactDefaultPerf._recordWrite(
                update.parentID,
                update.type,
                totalTime,
                writeArgs
              );
            });
          } else {
            // basic format
            ReactDefaultPerf._recordWrite(
              args[0],
              fnName,
              totalTime,
              Array.prototype.slice.call(args, 1)
            );
          }
          return rv;
        } else if (moduleName === 'ReactCompositeComponent' && (
          (// TODO: receiveComponent()?
          (fnName === 'mountComponent' ||
          fnName === 'updateComponent' || fnName === '_renderValidatedComponent')))) {
  
          if (typeof this._currentElement.type === 'string') {
            return func.apply(this, args);
          }
  
          var rootNodeID = fnName === 'mountComponent' ?
            args[0] :
            this._rootNodeID;
          var isRender = fnName === '_renderValidatedComponent';
          var isMount = fnName === 'mountComponent';
  
          var mountStack = ReactDefaultPerf._mountStack;
          var entry = ReactDefaultPerf._allMeasurements[
            ReactDefaultPerf._allMeasurements.length - 1
          ];
  
          if (isRender) {
            addValue(entry.counts, rootNodeID, 1);
          } else if (isMount) {
            mountStack.push(0);
          }
  
          start = performanceNow();
          rv = func.apply(this, args);
          totalTime = performanceNow() - start;
  
          if (isRender) {
            addValue(entry.render, rootNodeID, totalTime);
          } else if (isMount) {
            var subMountTime = mountStack.pop();
            mountStack[mountStack.length - 1] += totalTime;
            addValue(entry.exclusive, rootNodeID, totalTime - subMountTime);
            addValue(entry.inclusive, rootNodeID, totalTime);
          } else {
            addValue(entry.inclusive, rootNodeID, totalTime);
          }
  
          entry.displayNames[rootNodeID] = {
            current: this.getName(),
            owner: this._currentElement._owner ?
              this._currentElement._owner.getName() :
              '<root>'
          };
  
          return rv;
        } else {
          return func.apply(this, args);
        }
      };
    }
  };
  
  module.exports = ReactDefaultPerf;


/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDefaultPerfAnalysis
   */
  
  var assign = __webpack_require__(4);
  
  // Don't try to save users less than 1.2ms (a number I made up)
  var DONT_CARE_THRESHOLD = 1.2;
  var DOM_OPERATION_TYPES = {
    '_mountImageIntoNode': 'set innerHTML',
    INSERT_MARKUP: 'set innerHTML',
    MOVE_EXISTING: 'move',
    REMOVE_NODE: 'remove',
    TEXT_CONTENT: 'set textContent',
    'updatePropertyByID': 'update attribute',
    'deletePropertyByID': 'delete attribute',
    'updateStylesByID': 'update styles',
    'updateInnerHTMLByID': 'set innerHTML',
    'dangerouslyReplaceNodeWithMarkupByID': 'replace'
  };
  
  function getTotalTime(measurements) {
    // TODO: return number of DOM ops? could be misleading.
    // TODO: measure dropped frames after reconcile?
    // TODO: log total time of each reconcile and the top-level component
    // class that triggered it.
    var totalTime = 0;
    for (var i = 0; i < measurements.length; i++) {
      var measurement = measurements[i];
      totalTime += measurement.totalTime;
    }
    return totalTime;
  }
  
  function getDOMSummary(measurements) {
    var items = [];
    for (var i = 0; i < measurements.length; i++) {
      var measurement = measurements[i];
      var id;
  
      for (id in measurement.writes) {
        measurement.writes[id].forEach(function(write) {
          items.push({
            id: id,
            type: DOM_OPERATION_TYPES[write.type] || write.type,
            args: write.args
          });
        });
      }
    }
    return items;
  }
  
  function getExclusiveSummary(measurements) {
    var candidates = {};
    var displayName;
  
    for (var i = 0; i < measurements.length; i++) {
      var measurement = measurements[i];
      var allIDs = assign(
        {},
        measurement.exclusive,
        measurement.inclusive
      );
  
      for (var id in allIDs) {
        displayName = measurement.displayNames[id].current;
  
        candidates[displayName] = candidates[displayName] || {
          componentName: displayName,
          inclusive: 0,
          exclusive: 0,
          render: 0,
          count: 0
        };
        if (measurement.render[id]) {
          candidates[displayName].render += measurement.render[id];
        }
        if (measurement.exclusive[id]) {
          candidates[displayName].exclusive += measurement.exclusive[id];
        }
        if (measurement.inclusive[id]) {
          candidates[displayName].inclusive += measurement.inclusive[id];
        }
        if (measurement.counts[id]) {
          candidates[displayName].count += measurement.counts[id];
        }
      }
    }
  
    // Now make a sorted array with the results.
    var arr = [];
    for (displayName in candidates) {
      if (candidates[displayName].exclusive >= DONT_CARE_THRESHOLD) {
        arr.push(candidates[displayName]);
      }
    }
  
    arr.sort(function(a, b) {
      return b.exclusive - a.exclusive;
    });
  
    return arr;
  }
  
  function getInclusiveSummary(measurements, onlyClean) {
    var candidates = {};
    var inclusiveKey;
  
    for (var i = 0; i < measurements.length; i++) {
      var measurement = measurements[i];
      var allIDs = assign(
        {},
        measurement.exclusive,
        measurement.inclusive
      );
      var cleanComponents;
  
      if (onlyClean) {
        cleanComponents = getUnchangedComponents(measurement);
      }
  
      for (var id in allIDs) {
        if (onlyClean && !cleanComponents[id]) {
          continue;
        }
  
        var displayName = measurement.displayNames[id];
  
        // Inclusive time is not useful for many components without knowing where
        // they are instantiated. So we aggregate inclusive time with both the
        // owner and current displayName as the key.
        inclusiveKey = displayName.owner + ' > ' + displayName.current;
  
        candidates[inclusiveKey] = candidates[inclusiveKey] || {
          componentName: inclusiveKey,
          time: 0,
          count: 0
        };
  
        if (measurement.inclusive[id]) {
          candidates[inclusiveKey].time += measurement.inclusive[id];
        }
        if (measurement.counts[id]) {
          candidates[inclusiveKey].count += measurement.counts[id];
        }
      }
    }
  
    // Now make a sorted array with the results.
    var arr = [];
    for (inclusiveKey in candidates) {
      if (candidates[inclusiveKey].time >= DONT_CARE_THRESHOLD) {
        arr.push(candidates[inclusiveKey]);
      }
    }
  
    arr.sort(function(a, b) {
      return b.time - a.time;
    });
  
    return arr;
  }
  
  function getUnchangedComponents(measurement) {
    // For a given reconcile, look at which components did not actually
    // render anything to the DOM and return a mapping of their ID to
    // the amount of time it took to render the entire subtree.
    var cleanComponents = {};
    var dirtyLeafIDs = Object.keys(measurement.writes);
    var allIDs = assign({}, measurement.exclusive, measurement.inclusive);
  
    for (var id in allIDs) {
      var isDirty = false;
      // For each component that rendered, see if a component that triggered
      // a DOM op is in its subtree.
      for (var i = 0; i < dirtyLeafIDs.length; i++) {
        if (dirtyLeafIDs[i].indexOf(id) === 0) {
          isDirty = true;
          break;
        }
      }
      if (!isDirty && measurement.counts[id] > 0) {
        cleanComponents[id] = true;
      }
    }
    return cleanComponents;
  }
  
  var ReactDefaultPerfAnalysis = {
    getExclusiveSummary: getExclusiveSummary,
    getInclusiveSummary: getInclusiveSummary,
    getDOMSummary: getDOMSummary,
    getTotalTime: getTotalTime
  };
  
  module.exports = ReactDefaultPerfAnalysis;


/***/ },
/* 241 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactErrorUtils
   * @typechecks
   */
  
  "use strict";
  
  var ReactErrorUtils = {
    /**
     * Creates a guarded version of a function. This is supposed to make debugging
     * of event handlers easier. To aid debugging with the browser's debugger,
     * this currently simply returns the original function.
     *
     * @param {function} func Function to be executed
     * @param {string} name The name of the guard
     * @return {function}
     */
    guard: function(func, name) {
      return func;
    }
  };
  
  module.exports = ReactErrorUtils;


/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactEventEmitterMixin
   */
  
  'use strict';
  
  var EventPluginHub = __webpack_require__(39);
  
  function runEventQueueInBatch(events) {
    EventPluginHub.enqueueEvents(events);
    EventPluginHub.processEventQueue();
  }
  
  var ReactEventEmitterMixin = {
  
    /**
     * Streams a fired top-level event to `EventPluginHub` where plugins have the
     * opportunity to create `ReactEvent`s to be dispatched.
     *
     * @param {string} topLevelType Record from `EventConstants`.
     * @param {object} topLevelTarget The listening component root node.
     * @param {string} topLevelTargetID ID of `topLevelTarget`.
     * @param {object} nativeEvent Native environment event.
     */
    handleTopLevel: function(
        topLevelType,
        topLevelTarget,
        topLevelTargetID,
        nativeEvent) {
      var events = EventPluginHub.extractEvents(
        topLevelType,
        topLevelTarget,
        topLevelTargetID,
        nativeEvent
      );
  
      runEventQueueInBatch(events);
    }
  };
  
  module.exports = ReactEventEmitterMixin;


/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactEventListener
   * @typechecks static-only
   */
  
  'use strict';
  
  var EventListener = __webpack_require__(219);
  var ExecutionEnvironment = __webpack_require__(7);
  var PooledClass = __webpack_require__(22);
  var ReactInstanceHandles = __webpack_require__(33);
  var ReactMount = __webpack_require__(18);
  var ReactUpdates = __webpack_require__(19);
  
  var assign = __webpack_require__(4);
  var getEventTarget = __webpack_require__(83);
  var getUnboundedScrollPosition = __webpack_require__(274);
  
  /**
   * Finds the parent React component of `node`.
   *
   * @param {*} node
   * @return {?DOMEventTarget} Parent container, or `null` if the specified node
   *                           is not nested.
   */
  function findParent(node) {
    // TODO: It may be a good idea to cache this to prevent unnecessary DOM
    // traversal, but caching is difficult to do correctly without using a
    // mutation observer to listen for all DOM changes.
    var nodeID = ReactMount.getID(node);
    var rootID = ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);
    var container = ReactMount.findReactContainerForID(rootID);
    var parent = ReactMount.getFirstReactDOM(container);
    return parent;
  }
  
  // Used to store ancestor hierarchy in top level callback
  function TopLevelCallbackBookKeeping(topLevelType, nativeEvent) {
    this.topLevelType = topLevelType;
    this.nativeEvent = nativeEvent;
    this.ancestors = [];
  }
  assign(TopLevelCallbackBookKeeping.prototype, {
    destructor: function() {
      this.topLevelType = null;
      this.nativeEvent = null;
      this.ancestors.length = 0;
    }
  });
  PooledClass.addPoolingTo(
    TopLevelCallbackBookKeeping,
    PooledClass.twoArgumentPooler
  );
  
  function handleTopLevelImpl(bookKeeping) {
    var topLevelTarget = ReactMount.getFirstReactDOM(
      getEventTarget(bookKeeping.nativeEvent)
    ) || window;
  
    // Loop through the hierarchy, in case there's any nested components.
    // It's important that we build the array of ancestors before calling any
    // event handlers, because event handlers can modify the DOM, leading to
    // inconsistencies with ReactMount's node cache. See #1105.
    var ancestor = topLevelTarget;
    while (ancestor) {
      bookKeeping.ancestors.push(ancestor);
      ancestor = findParent(ancestor);
    }
  
    for (var i = 0, l = bookKeeping.ancestors.length; i < l; i++) {
      topLevelTarget = bookKeeping.ancestors[i];
      var topLevelTargetID = ReactMount.getID(topLevelTarget) || '';
      ReactEventListener._handleTopLevel(
        bookKeeping.topLevelType,
        topLevelTarget,
        topLevelTargetID,
        bookKeeping.nativeEvent
      );
    }
  }
  
  function scrollValueMonitor(cb) {
    var scrollPosition = getUnboundedScrollPosition(window);
    cb(scrollPosition);
  }
  
  var ReactEventListener = {
    _enabled: true,
    _handleTopLevel: null,
  
    WINDOW_HANDLE: ExecutionEnvironment.canUseDOM ? window : null,
  
    setHandleTopLevel: function(handleTopLevel) {
      ReactEventListener._handleTopLevel = handleTopLevel;
    },
  
    setEnabled: function(enabled) {
      ReactEventListener._enabled = !!enabled;
    },
  
    isEnabled: function() {
      return ReactEventListener._enabled;
    },
  
  
    /**
     * Traps top-level events by using event bubbling.
     *
     * @param {string} topLevelType Record from `EventConstants`.
     * @param {string} handlerBaseName Event name (e.g. "click").
     * @param {object} handle Element on which to attach listener.
     * @return {object} An object with a remove function which will forcefully
     *                  remove the listener.
     * @internal
     */
    trapBubbledEvent: function(topLevelType, handlerBaseName, handle) {
      var element = handle;
      if (!element) {
        return null;
      }
      return EventListener.listen(
        element,
        handlerBaseName,
        ReactEventListener.dispatchEvent.bind(null, topLevelType)
      );
    },
  
    /**
     * Traps a top-level event by using event capturing.
     *
     * @param {string} topLevelType Record from `EventConstants`.
     * @param {string} handlerBaseName Event name (e.g. "click").
     * @param {object} handle Element on which to attach listener.
     * @return {object} An object with a remove function which will forcefully
     *                  remove the listener.
     * @internal
     */
    trapCapturedEvent: function(topLevelType, handlerBaseName, handle) {
      var element = handle;
      if (!element) {
        return null;
      }
      return EventListener.capture(
        element,
        handlerBaseName,
        ReactEventListener.dispatchEvent.bind(null, topLevelType)
      );
    },
  
    monitorScrollValue: function(refresh) {
      var callback = scrollValueMonitor.bind(null, refresh);
      EventListener.listen(window, 'scroll', callback);
    },
  
    dispatchEvent: function(topLevelType, nativeEvent) {
      if (!ReactEventListener._enabled) {
        return;
      }
  
      var bookKeeping = TopLevelCallbackBookKeeping.getPooled(
        topLevelType,
        nativeEvent
      );
      try {
        // Event queue being processed in the same cycle allows
        // `preventDefault`.
        ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
      } finally {
        TopLevelCallbackBookKeeping.release(bookKeeping);
      }
    }
  };
  
  module.exports = ReactEventListener;


/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactInjection
   */
  
  'use strict';
  
  var DOMProperty = __webpack_require__(29);
  var EventPluginHub = __webpack_require__(39);
  var ReactComponentEnvironment = __webpack_require__(72);
  var ReactClass = __webpack_require__(13);
  var ReactEmptyComponent = __webpack_require__(75);
  var ReactBrowserEventEmitter = __webpack_require__(32);
  var ReactNativeComponent = __webpack_require__(50);
  var ReactDOMComponent = __webpack_require__(74);
  var ReactPerf = __webpack_require__(27);
  var ReactRootIndex = __webpack_require__(114);
  var ReactUpdates = __webpack_require__(19);
  
  var ReactInjection = {
    Component: ReactComponentEnvironment.injection,
    Class: ReactClass.injection,
    DOMComponent: ReactDOMComponent.injection,
    DOMProperty: DOMProperty.injection,
    EmptyComponent: ReactEmptyComponent.injection,
    EventPluginHub: EventPluginHub.injection,
    EventEmitter: ReactBrowserEventEmitter.injection,
    NativeComponent: ReactNativeComponent.injection,
    Perf: ReactPerf.injection,
    RootIndex: ReactRootIndex.injection,
    Updates: ReactUpdates.injection
  };
  
  module.exports = ReactInjection;


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactMultiChild
   * @typechecks static-only
   */
  
  'use strict';
  
  var ReactComponentEnvironment = __webpack_require__(72);
  var ReactMultiChildUpdateTypes = __webpack_require__(111);
  
  var ReactReconciler = __webpack_require__(35);
  var ReactChildReconciler = __webpack_require__(224);
  
  /**
   * Updating children of a component may trigger recursive updates. The depth is
   * used to batch recursive updates to render markup more efficiently.
   *
   * @type {number}
   * @private
   */
  var updateDepth = 0;
  
  /**
   * Queue of update configuration objects.
   *
   * Each object has a `type` property that is in `ReactMultiChildUpdateTypes`.
   *
   * @type {array<object>}
   * @private
   */
  var updateQueue = [];
  
  /**
   * Queue of markup to be rendered.
   *
   * @type {array<string>}
   * @private
   */
  var markupQueue = [];
  
  /**
   * Enqueues markup to be rendered and inserted at a supplied index.
   *
   * @param {string} parentID ID of the parent component.
   * @param {string} markup Markup that renders into an element.
   * @param {number} toIndex Destination index.
   * @private
   */
  function enqueueMarkup(parentID, markup, toIndex) {
    // NOTE: Null values reduce hidden classes.
    updateQueue.push({
      parentID: parentID,
      parentNode: null,
      type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
      markupIndex: markupQueue.push(markup) - 1,
      textContent: null,
      fromIndex: null,
      toIndex: toIndex
    });
  }
  
  /**
   * Enqueues moving an existing element to another index.
   *
   * @param {string} parentID ID of the parent component.
   * @param {number} fromIndex Source index of the existing element.
   * @param {number} toIndex Destination index of the element.
   * @private
   */
  function enqueueMove(parentID, fromIndex, toIndex) {
    // NOTE: Null values reduce hidden classes.
    updateQueue.push({
      parentID: parentID,
      parentNode: null,
      type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
      markupIndex: null,
      textContent: null,
      fromIndex: fromIndex,
      toIndex: toIndex
    });
  }
  
  /**
   * Enqueues removing an element at an index.
   *
   * @param {string} parentID ID of the parent component.
   * @param {number} fromIndex Index of the element to remove.
   * @private
   */
  function enqueueRemove(parentID, fromIndex) {
    // NOTE: Null values reduce hidden classes.
    updateQueue.push({
      parentID: parentID,
      parentNode: null,
      type: ReactMultiChildUpdateTypes.REMOVE_NODE,
      markupIndex: null,
      textContent: null,
      fromIndex: fromIndex,
      toIndex: null
    });
  }
  
  /**
   * Enqueues setting the text content.
   *
   * @param {string} parentID ID of the parent component.
   * @param {string} textContent Text content to set.
   * @private
   */
  function enqueueTextContent(parentID, textContent) {
    // NOTE: Null values reduce hidden classes.
    updateQueue.push({
      parentID: parentID,
      parentNode: null,
      type: ReactMultiChildUpdateTypes.TEXT_CONTENT,
      markupIndex: null,
      textContent: textContent,
      fromIndex: null,
      toIndex: null
    });
  }
  
  /**
   * Processes any enqueued updates.
   *
   * @private
   */
  function processQueue() {
    if (updateQueue.length) {
      ReactComponentEnvironment.processChildrenUpdates(
        updateQueue,
        markupQueue
      );
      clearQueue();
    }
  }
  
  /**
   * Clears any enqueued updates.
   *
   * @private
   */
  function clearQueue() {
    updateQueue.length = 0;
    markupQueue.length = 0;
  }
  
  /**
   * ReactMultiChild are capable of reconciling multiple children.
   *
   * @class ReactMultiChild
   * @internal
   */
  var ReactMultiChild = {
  
    /**
     * Provides common functionality for components that must reconcile multiple
     * children. This is used by `ReactDOMComponent` to mount, update, and
     * unmount child components.
     *
     * @lends {ReactMultiChild.prototype}
     */
    Mixin: {
  
      /**
       * Generates a "mount image" for each of the supplied children. In the case
       * of `ReactDOMComponent`, a mount image is a string of markup.
       *
       * @param {?object} nestedChildren Nested child maps.
       * @return {array} An array of mounted representations.
       * @internal
       */
      mountChildren: function(nestedChildren, transaction, context) {
        var children = ReactChildReconciler.instantiateChildren(
          nestedChildren, transaction, context
        );
        this._renderedChildren = children;
        var mountImages = [];
        var index = 0;
        for (var name in children) {
          if (children.hasOwnProperty(name)) {
            var child = children[name];
            // Inlined for performance, see `ReactInstanceHandles.createReactID`.
            var rootID = this._rootNodeID + name;
            var mountImage = ReactReconciler.mountComponent(
              child,
              rootID,
              transaction,
              context
            );
            child._mountIndex = index;
            mountImages.push(mountImage);
            index++;
          }
        }
        return mountImages;
      },
  
      /**
       * Replaces any rendered children with a text content string.
       *
       * @param {string} nextContent String of content.
       * @internal
       */
      updateTextContent: function(nextContent) {
        updateDepth++;
        var errorThrown = true;
        try {
          var prevChildren = this._renderedChildren;
          // Remove any rendered children.
          ReactChildReconciler.unmountChildren(prevChildren);
          // TODO: The setTextContent operation should be enough
          for (var name in prevChildren) {
            if (prevChildren.hasOwnProperty(name)) {
              this._unmountChildByName(prevChildren[name], name);
            }
          }
          // Set new text content.
          this.setTextContent(nextContent);
          errorThrown = false;
        } finally {
          updateDepth--;
          if (!updateDepth) {
            if (errorThrown) {
              clearQueue();
            } else {
              processQueue();
            }
          }
        }
      },
  
      /**
       * Updates the rendered children with new children.
       *
       * @param {?object} nextNestedChildren Nested child maps.
       * @param {ReactReconcileTransaction} transaction
       * @internal
       */
      updateChildren: function(nextNestedChildren, transaction, context) {
        updateDepth++;
        var errorThrown = true;
        try {
          this._updateChildren(nextNestedChildren, transaction, context);
          errorThrown = false;
        } finally {
          updateDepth--;
          if (!updateDepth) {
            if (errorThrown) {
              clearQueue();
            } else {
              processQueue();
            }
          }
  
        }
      },
  
      /**
       * Improve performance by isolating this hot code path from the try/catch
       * block in `updateChildren`.
       *
       * @param {?object} nextNestedChildren Nested child maps.
       * @param {ReactReconcileTransaction} transaction
       * @final
       * @protected
       */
      _updateChildren: function(nextNestedChildren, transaction, context) {
        var prevChildren = this._renderedChildren;
        var nextChildren = ReactChildReconciler.updateChildren(
          prevChildren, nextNestedChildren, transaction, context
        );
        this._renderedChildren = nextChildren;
        if (!nextChildren && !prevChildren) {
          return;
        }
        var name;
        // `nextIndex` will increment for each child in `nextChildren`, but
        // `lastIndex` will be the last index visited in `prevChildren`.
        var lastIndex = 0;
        var nextIndex = 0;
        for (name in nextChildren) {
          if (!nextChildren.hasOwnProperty(name)) {
            continue;
          }
          var prevChild = prevChildren && prevChildren[name];
          var nextChild = nextChildren[name];
          if (prevChild === nextChild) {
            this.moveChild(prevChild, nextIndex, lastIndex);
            lastIndex = Math.max(prevChild._mountIndex, lastIndex);
            prevChild._mountIndex = nextIndex;
          } else {
            if (prevChild) {
              // Update `lastIndex` before `_mountIndex` gets unset by unmounting.
              lastIndex = Math.max(prevChild._mountIndex, lastIndex);
              this._unmountChildByName(prevChild, name);
            }
            // The child must be instantiated before it's mounted.
            this._mountChildByNameAtIndex(
              nextChild, name, nextIndex, transaction, context
            );
          }
          nextIndex++;
        }
        // Remove children that are no longer present.
        for (name in prevChildren) {
          if (prevChildren.hasOwnProperty(name) &&
              !(nextChildren && nextChildren.hasOwnProperty(name))) {
            this._unmountChildByName(prevChildren[name], name);
          }
        }
      },
  
      /**
       * Unmounts all rendered children. This should be used to clean up children
       * when this component is unmounted.
       *
       * @internal
       */
      unmountChildren: function() {
        var renderedChildren = this._renderedChildren;
        ReactChildReconciler.unmountChildren(renderedChildren);
        this._renderedChildren = null;
      },
  
      /**
       * Moves a child component to the supplied index.
       *
       * @param {ReactComponent} child Component to move.
       * @param {number} toIndex Destination index of the element.
       * @param {number} lastIndex Last index visited of the siblings of `child`.
       * @protected
       */
      moveChild: function(child, toIndex, lastIndex) {
        // If the index of `child` is less than `lastIndex`, then it needs to
        // be moved. Otherwise, we do not need to move it because a child will be
        // inserted or moved before `child`.
        if (child._mountIndex < lastIndex) {
          enqueueMove(this._rootNodeID, child._mountIndex, toIndex);
        }
      },
  
      /**
       * Creates a child component.
       *
       * @param {ReactComponent} child Component to create.
       * @param {string} mountImage Markup to insert.
       * @protected
       */
      createChild: function(child, mountImage) {
        enqueueMarkup(this._rootNodeID, mountImage, child._mountIndex);
      },
  
      /**
       * Removes a child component.
       *
       * @param {ReactComponent} child Child to remove.
       * @protected
       */
      removeChild: function(child) {
        enqueueRemove(this._rootNodeID, child._mountIndex);
      },
  
      /**
       * Sets this text content string.
       *
       * @param {string} textContent Text content to set.
       * @protected
       */
      setTextContent: function(textContent) {
        enqueueTextContent(this._rootNodeID, textContent);
      },
  
      /**
       * Mounts a child with the supplied name.
       *
       * NOTE: This is part of `updateChildren` and is here for readability.
       *
       * @param {ReactComponent} child Component to mount.
       * @param {string} name Name of the child.
       * @param {number} index Index at which to insert the child.
       * @param {ReactReconcileTransaction} transaction
       * @private
       */
      _mountChildByNameAtIndex: function(
        child,
        name,
        index,
        transaction,
        context) {
        // Inlined for performance, see `ReactInstanceHandles.createReactID`.
        var rootID = this._rootNodeID + name;
        var mountImage = ReactReconciler.mountComponent(
          child,
          rootID,
          transaction,
          context
        );
        child._mountIndex = index;
        this.createChild(child, mountImage);
      },
  
      /**
       * Unmounts a rendered child by name.
       *
       * NOTE: This is part of `updateChildren` and is here for readability.
       *
       * @param {ReactComponent} child Component to unmount.
       * @param {string} name Name of the child in `this._renderedChildren`.
       * @private
       */
      _unmountChildByName: function(child, name) {
        this.removeChild(child);
        child._mountIndex = null;
      }
  
    }
  
  };
  
  module.exports = ReactMultiChild;


/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactOwner
   */
  
  'use strict';
  
  var invariant = __webpack_require__(2);
  
  /**
   * ReactOwners are capable of storing references to owned components.
   *
   * All components are capable of //being// referenced by owner components, but
   * only ReactOwner components are capable of //referencing// owned components.
   * The named reference is known as a "ref".
   *
   * Refs are available when mounted and updated during reconciliation.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return (
   *         <div onClick={this.handleClick}>
   *           <CustomComponent ref="custom" />
   *         </div>
   *       );
   *     },
   *     handleClick: function() {
   *       this.refs.custom.handleClick();
   *     },
   *     componentDidMount: function() {
   *       this.refs.custom.initialize();
   *     }
   *   });
   *
   * Refs should rarely be used. When refs are used, they should only be done to
   * control data that is not handled by React's data flow.
   *
   * @class ReactOwner
   */
  var ReactOwner = {
  
    /**
     * @param {?object} object
     * @return {boolean} True if `object` is a valid owner.
     * @final
     */
    isValidOwner: function(object) {
      return !!(
        (object &&
        typeof object.attachRef === 'function' && typeof object.detachRef === 'function')
      );
    },
  
    /**
     * Adds a component by ref to an owner component.
     *
     * @param {ReactComponent} component Component to reference.
     * @param {string} ref Name by which to refer to the component.
     * @param {ReactOwner} owner Component on which to record the ref.
     * @final
     * @internal
     */
    addComponentAsRefTo: function(component, ref, owner) {
      (true ? invariant(
        ReactOwner.isValidOwner(owner),
        'addComponentAsRefTo(...): Only a ReactOwner can have refs. This ' +
        'usually means that you\'re trying to add a ref to a component that ' +
        'doesn\'t have an owner (that is, was not created inside of another ' +
        'component\'s `render` method). Try rendering this component inside of ' +
        'a new top-level component which will hold the ref.'
      ) : invariant(ReactOwner.isValidOwner(owner)));
      owner.attachRef(ref, component);
    },
  
    /**
     * Removes a component by ref from an owner component.
     *
     * @param {ReactComponent} component Component to dereference.
     * @param {string} ref Name of the ref to remove.
     * @param {ReactOwner} owner Component on which the ref is recorded.
     * @final
     * @internal
     */
    removeComponentAsRefFrom: function(component, ref, owner) {
      (true ? invariant(
        ReactOwner.isValidOwner(owner),
        'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. This ' +
        'usually means that you\'re trying to remove a ref to a component that ' +
        'doesn\'t have an owner (that is, was not created inside of another ' +
        'component\'s `render` method). Try rendering this component inside of ' +
        'a new top-level component which will hold the ref.'
      ) : invariant(ReactOwner.isValidOwner(owner)));
      // Check that `component` is still the current ref because we do not want to
      // detach the ref if another component stole it.
      if (owner.getPublicInstance().refs[ref] === component.getPublicInstance()) {
        owner.detachRef(ref);
      }
    }
  
  };
  
  module.exports = ReactOwner;


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactReconcileTransaction
   * @typechecks static-only
   */
  
  'use strict';
  
  var CallbackQueue = __webpack_require__(67);
  var PooledClass = __webpack_require__(22);
  var ReactBrowserEventEmitter = __webpack_require__(32);
  var ReactInputSelection = __webpack_require__(109);
  var ReactPutListenerQueue = __webpack_require__(113);
  var Transaction = __webpack_require__(53);
  
  var assign = __webpack_require__(4);
  
  /**
   * Ensures that, when possible, the selection range (currently selected text
   * input) is not disturbed by performing the transaction.
   */
  var SELECTION_RESTORATION = {
    /**
     * @return {Selection} Selection information.
     */
    initialize: ReactInputSelection.getSelectionInformation,
    /**
     * @param {Selection} sel Selection information returned from `initialize`.
     */
    close: ReactInputSelection.restoreSelection
  };
  
  /**
   * Suppresses events (blur/focus) that could be inadvertently dispatched due to
   * high level DOM manipulations (like temporarily removing a text input from the
   * DOM).
   */
  var EVENT_SUPPRESSION = {
    /**
     * @return {boolean} The enabled status of `ReactBrowserEventEmitter` before
     * the reconciliation.
     */
    initialize: function() {
      var currentlyEnabled = ReactBrowserEventEmitter.isEnabled();
      ReactBrowserEventEmitter.setEnabled(false);
      return currentlyEnabled;
    },
  
    /**
     * @param {boolean} previouslyEnabled Enabled status of
     *   `ReactBrowserEventEmitter` before the reconciliation occured. `close`
     *   restores the previous value.
     */
    close: function(previouslyEnabled) {
      ReactBrowserEventEmitter.setEnabled(previouslyEnabled);
    }
  };
  
  /**
   * Provides a queue for collecting `componentDidMount` and
   * `componentDidUpdate` callbacks during the the transaction.
   */
  var ON_DOM_READY_QUEUEING = {
    /**
     * Initializes the internal `onDOMReady` queue.
     */
    initialize: function() {
      this.reactMountReady.reset();
    },
  
    /**
     * After DOM is flushed, invoke all registered `onDOMReady` callbacks.
     */
    close: function() {
      this.reactMountReady.notifyAll();
    }
  };
  
  var PUT_LISTENER_QUEUEING = {
    initialize: function() {
      this.putListenerQueue.reset();
    },
  
    close: function() {
      this.putListenerQueue.putListeners();
    }
  };
  
  /**
   * Executed within the scope of the `Transaction` instance. Consider these as
   * being member methods, but with an implied ordering while being isolated from
   * each other.
   */
  var TRANSACTION_WRAPPERS = [
    PUT_LISTENER_QUEUEING,
    SELECTION_RESTORATION,
    EVENT_SUPPRESSION,
    ON_DOM_READY_QUEUEING
  ];
  
  /**
   * Currently:
   * - The order that these are listed in the transaction is critical:
   * - Suppresses events.
   * - Restores selection range.
   *
   * Future:
   * - Restore document/overflow scroll positions that were unintentionally
   *   modified via DOM insertions above the top viewport boundary.
   * - Implement/integrate with customized constraint based layout system and keep
   *   track of which dimensions must be remeasured.
   *
   * @class ReactReconcileTransaction
   */
  function ReactReconcileTransaction() {
    this.reinitializeTransaction();
    // Only server-side rendering really needs this option (see
    // `ReactServerRendering`), but server-side uses
    // `ReactServerRenderingTransaction` instead. This option is here so that it's
    // accessible and defaults to false when `ReactDOMComponent` and
    // `ReactTextComponent` checks it in `mountComponent`.`
    this.renderToStaticMarkup = false;
    this.reactMountReady = CallbackQueue.getPooled(null);
    this.putListenerQueue = ReactPutListenerQueue.getPooled();
  }
  
  var Mixin = {
    /**
     * @see Transaction
     * @abstract
     * @final
     * @return {array<object>} List of operation wrap proceedures.
     *   TODO: convert to array<TransactionWrapper>
     */
    getTransactionWrappers: function() {
      return TRANSACTION_WRAPPERS;
    },
  
    /**
     * @return {object} The queue to collect `onDOMReady` callbacks with.
     */
    getReactMountReady: function() {
      return this.reactMountReady;
    },
  
    getPutListenerQueue: function() {
      return this.putListenerQueue;
    },
  
    /**
     * `PooledClass` looks for this, and will invoke this before allowing this
     * instance to be resused.
     */
    destructor: function() {
      CallbackQueue.release(this.reactMountReady);
      this.reactMountReady = null;
  
      ReactPutListenerQueue.release(this.putListenerQueue);
      this.putListenerQueue = null;
    }
  };
  
  
  assign(ReactReconcileTransaction.prototype, Transaction.Mixin, Mixin);
  
  PooledClass.addPoolingTo(ReactReconcileTransaction);
  
  module.exports = ReactReconcileTransaction;


/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactRef
   */
  
  'use strict';
  
  var ReactOwner = __webpack_require__(246);
  
  var ReactRef = {};
  
  function attachRef(ref, component, owner) {
    if (typeof ref === 'function') {
      ref(component.getPublicInstance());
    } else {
      // Legacy ref
      ReactOwner.addComponentAsRefTo(component, ref, owner);
    }
  }
  
  function detachRef(ref, component, owner) {
    if (typeof ref === 'function') {
      ref(null);
    } else {
      // Legacy ref
      ReactOwner.removeComponentAsRefFrom(component, ref, owner);
    }
  }
  
  ReactRef.attachRefs = function(instance, element) {
    var ref = element.ref;
    if (ref != null) {
      attachRef(ref, instance, element._owner);
    }
  };
  
  ReactRef.shouldUpdateRefs = function(prevElement, nextElement) {
    // If either the owner or a `ref` has changed, make sure the newest owner
    // has stored a reference to `this`, and the previous owner (if different)
    // has forgotten the reference to `this`. We use the element instead
    // of the public this.props because the post processing cannot determine
    // a ref. The ref conceptually lives on the element.
  
    // TODO: Should this even be possible? The owner cannot change because
    // it's forbidden by shouldUpdateReactComponent. The ref can change
    // if you swap the keys of but not the refs. Reconsider where this check
    // is made. It probably belongs where the key checking and
    // instantiateReactComponent is done.
  
    return (
      nextElement._owner !== prevElement._owner ||
      nextElement.ref !== prevElement.ref
    );
  };
  
  ReactRef.detachRefs = function(instance, element) {
    var ref = element.ref;
    if (ref != null) {
      detachRef(ref, instance, element._owner);
    }
  };
  
  module.exports = ReactRef;


/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @typechecks static-only
   * @providesModule ReactServerRendering
   */
  'use strict';
  
  var ReactElement = __webpack_require__(5);
  var ReactInstanceHandles = __webpack_require__(33);
  var ReactMarkupChecksum = __webpack_require__(110);
  var ReactServerRenderingTransaction =
    __webpack_require__(250);
  
  var emptyObject = __webpack_require__(54);
  var instantiateReactComponent = __webpack_require__(84);
  var invariant = __webpack_require__(2);
  
  /**
   * @param {ReactElement} element
   * @return {string} the HTML markup
   */
  function renderToString(element) {
    (true ? invariant(
      ReactElement.isValidElement(element),
      'renderToString(): You must pass a valid ReactElement.'
    ) : invariant(ReactElement.isValidElement(element)));
  
    var transaction;
    try {
      var id = ReactInstanceHandles.createReactRootID();
      transaction = ReactServerRenderingTransaction.getPooled(false);
  
      return transaction.perform(function() {
        var componentInstance = instantiateReactComponent(element, null);
        var markup =
          componentInstance.mountComponent(id, transaction, emptyObject);
        return ReactMarkupChecksum.addChecksumToMarkup(markup);
      }, null);
    } finally {
      ReactServerRenderingTransaction.release(transaction);
    }
  }
  
  /**
   * @param {ReactElement} element
   * @return {string} the HTML markup, without the extra React ID and checksum
   * (for generating static pages)
   */
  function renderToStaticMarkup(element) {
    (true ? invariant(
      ReactElement.isValidElement(element),
      'renderToStaticMarkup(): You must pass a valid ReactElement.'
    ) : invariant(ReactElement.isValidElement(element)));
  
    var transaction;
    try {
      var id = ReactInstanceHandles.createReactRootID();
      transaction = ReactServerRenderingTransaction.getPooled(true);
  
      return transaction.perform(function() {
        var componentInstance = instantiateReactComponent(element, null);
        return componentInstance.mountComponent(id, transaction, emptyObject);
      }, null);
    } finally {
      ReactServerRenderingTransaction.release(transaction);
    }
  }
  
  module.exports = {
    renderToString: renderToString,
    renderToStaticMarkup: renderToStaticMarkup
  };


/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactServerRenderingTransaction
   * @typechecks
   */
  
  'use strict';
  
  var PooledClass = __webpack_require__(22);
  var CallbackQueue = __webpack_require__(67);
  var ReactPutListenerQueue = __webpack_require__(113);
  var Transaction = __webpack_require__(53);
  
  var assign = __webpack_require__(4);
  var emptyFunction = __webpack_require__(25);
  
  /**
   * Provides a `CallbackQueue` queue for collecting `onDOMReady` callbacks
   * during the performing of the transaction.
   */
  var ON_DOM_READY_QUEUEING = {
    /**
     * Initializes the internal `onDOMReady` queue.
     */
    initialize: function() {
      this.reactMountReady.reset();
    },
  
    close: emptyFunction
  };
  
  var PUT_LISTENER_QUEUEING = {
    initialize: function() {
      this.putListenerQueue.reset();
    },
  
    close: emptyFunction
  };
  
  /**
   * Executed within the scope of the `Transaction` instance. Consider these as
   * being member methods, but with an implied ordering while being isolated from
   * each other.
   */
  var TRANSACTION_WRAPPERS = [
    PUT_LISTENER_QUEUEING,
    ON_DOM_READY_QUEUEING
  ];
  
  /**
   * @class ReactServerRenderingTransaction
   * @param {boolean} renderToStaticMarkup
   */
  function ReactServerRenderingTransaction(renderToStaticMarkup) {
    this.reinitializeTransaction();
    this.renderToStaticMarkup = renderToStaticMarkup;
    this.reactMountReady = CallbackQueue.getPooled(null);
    this.putListenerQueue = ReactPutListenerQueue.getPooled();
  }
  
  var Mixin = {
    /**
     * @see Transaction
     * @abstract
     * @final
     * @return {array} Empty list of operation wrap proceedures.
     */
    getTransactionWrappers: function() {
      return TRANSACTION_WRAPPERS;
    },
  
    /**
     * @return {object} The queue to collect `onDOMReady` callbacks with.
     */
    getReactMountReady: function() {
      return this.reactMountReady;
    },
  
    getPutListenerQueue: function() {
      return this.putListenerQueue;
    },
  
    /**
     * `PooledClass` looks for this, and will invoke this before allowing this
     * instance to be resused.
     */
    destructor: function() {
      CallbackQueue.release(this.reactMountReady);
      this.reactMountReady = null;
  
      ReactPutListenerQueue.release(this.putListenerQueue);
      this.putListenerQueue = null;
    }
  };
  
  
  assign(
    ReactServerRenderingTransaction.prototype,
    Transaction.Mixin,
    Mixin
  );
  
  PooledClass.addPoolingTo(ReactServerRenderingTransaction);
  
  module.exports = ReactServerRenderingTransaction;


/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule SVGDOMPropertyConfig
   */
  
  /*jslint bitwise: true*/
  
  'use strict';
  
  var DOMProperty = __webpack_require__(29);
  
  var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
  
  var SVGDOMPropertyConfig = {
    Properties: {
      clipPath: MUST_USE_ATTRIBUTE,
      cx: MUST_USE_ATTRIBUTE,
      cy: MUST_USE_ATTRIBUTE,
      d: MUST_USE_ATTRIBUTE,
      dx: MUST_USE_ATTRIBUTE,
      dy: MUST_USE_ATTRIBUTE,
      fill: MUST_USE_ATTRIBUTE,
      fillOpacity: MUST_USE_ATTRIBUTE,
      fontFamily: MUST_USE_ATTRIBUTE,
      fontSize: MUST_USE_ATTRIBUTE,
      fx: MUST_USE_ATTRIBUTE,
      fy: MUST_USE_ATTRIBUTE,
      gradientTransform: MUST_USE_ATTRIBUTE,
      gradientUnits: MUST_USE_ATTRIBUTE,
      markerEnd: MUST_USE_ATTRIBUTE,
      markerMid: MUST_USE_ATTRIBUTE,
      markerStart: MUST_USE_ATTRIBUTE,
      offset: MUST_USE_ATTRIBUTE,
      opacity: MUST_USE_ATTRIBUTE,
      patternContentUnits: MUST_USE_ATTRIBUTE,
      patternUnits: MUST_USE_ATTRIBUTE,
      points: MUST_USE_ATTRIBUTE,
      preserveAspectRatio: MUST_USE_ATTRIBUTE,
      r: MUST_USE_ATTRIBUTE,
      rx: MUST_USE_ATTRIBUTE,
      ry: MUST_USE_ATTRIBUTE,
      spreadMethod: MUST_USE_ATTRIBUTE,
      stopColor: MUST_USE_ATTRIBUTE,
      stopOpacity: MUST_USE_ATTRIBUTE,
      stroke: MUST_USE_ATTRIBUTE,
      strokeDasharray: MUST_USE_ATTRIBUTE,
      strokeLinecap: MUST_USE_ATTRIBUTE,
      strokeOpacity: MUST_USE_ATTRIBUTE,
      strokeWidth: MUST_USE_ATTRIBUTE,
      textAnchor: MUST_USE_ATTRIBUTE,
      transform: MUST_USE_ATTRIBUTE,
      version: MUST_USE_ATTRIBUTE,
      viewBox: MUST_USE_ATTRIBUTE,
      x1: MUST_USE_ATTRIBUTE,
      x2: MUST_USE_ATTRIBUTE,
      x: MUST_USE_ATTRIBUTE,
      y1: MUST_USE_ATTRIBUTE,
      y2: MUST_USE_ATTRIBUTE,
      y: MUST_USE_ATTRIBUTE
    },
    DOMAttributeNames: {
      clipPath: 'clip-path',
      fillOpacity: 'fill-opacity',
      fontFamily: 'font-family',
      fontSize: 'font-size',
      gradientTransform: 'gradientTransform',
      gradientUnits: 'gradientUnits',
      markerEnd: 'marker-end',
      markerMid: 'marker-mid',
      markerStart: 'marker-start',
      patternContentUnits: 'patternContentUnits',
      patternUnits: 'patternUnits',
      preserveAspectRatio: 'preserveAspectRatio',
      spreadMethod: 'spreadMethod',
      stopColor: 'stop-color',
      stopOpacity: 'stop-opacity',
      strokeDasharray: 'stroke-dasharray',
      strokeLinecap: 'stroke-linecap',
      strokeOpacity: 'stroke-opacity',
      strokeWidth: 'stroke-width',
      textAnchor: 'text-anchor',
      viewBox: 'viewBox'
    }
  };
  
  module.exports = SVGDOMPropertyConfig;


/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule SelectEventPlugin
   */
  
  'use strict';
  
  var EventConstants = __webpack_require__(12);
  var EventPropagators = __webpack_require__(40);
  var ReactInputSelection = __webpack_require__(109);
  var SyntheticEvent = __webpack_require__(30);
  
  var getActiveElement = __webpack_require__(119);
  var isTextInputElement = __webpack_require__(124);
  var keyOf = __webpack_require__(28);
  var shallowEqual = __webpack_require__(285);
  
  var topLevelTypes = EventConstants.topLevelTypes;
  
  var eventTypes = {
    select: {
      phasedRegistrationNames: {
        bubbled: keyOf({onSelect: null}),
        captured: keyOf({onSelectCapture: null})
      },
      dependencies: [
        topLevelTypes.topBlur,
        topLevelTypes.topContextMenu,
        topLevelTypes.topFocus,
        topLevelTypes.topKeyDown,
        topLevelTypes.topMouseDown,
        topLevelTypes.topMouseUp,
        topLevelTypes.topSelectionChange
      ]
    }
  };
  
  var activeElement = null;
  var activeElementID = null;
  var lastSelection = null;
  var mouseDown = false;
  
  /**
   * Get an object which is a unique representation of the current selection.
   *
   * The return value will not be consistent across nodes or browsers, but
   * two identical selections on the same node will return identical objects.
   *
   * @param {DOMElement} node
   * @param {object}
   */
  function getSelection(node) {
    if ('selectionStart' in node &&
        ReactInputSelection.hasSelectionCapabilities(node)) {
      return {
        start: node.selectionStart,
        end: node.selectionEnd
      };
    } else if (window.getSelection) {
      var selection = window.getSelection();
      return {
        anchorNode: selection.anchorNode,
        anchorOffset: selection.anchorOffset,
        focusNode: selection.focusNode,
        focusOffset: selection.focusOffset
      };
    } else if (document.selection) {
      var range = document.selection.createRange();
      return {
        parentElement: range.parentElement(),
        text: range.text,
        top: range.boundingTop,
        left: range.boundingLeft
      };
    }
  }
  
  /**
   * Poll selection to see whether it's changed.
   *
   * @param {object} nativeEvent
   * @return {?SyntheticEvent}
   */
  function constructSelectEvent(nativeEvent) {
    // Ensure we have the right element, and that the user is not dragging a
    // selection (this matches native `select` event behavior). In HTML5, select
    // fires only on input and textarea thus if there's no focused element we
    // won't dispatch.
    if (mouseDown ||
        activeElement == null ||
        activeElement !== getActiveElement()) {
      return null;
    }
  
    // Only fire when selection has actually changed.
    var currentSelection = getSelection(activeElement);
    if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
      lastSelection = currentSelection;
  
      var syntheticEvent = SyntheticEvent.getPooled(
        eventTypes.select,
        activeElementID,
        nativeEvent
      );
  
      syntheticEvent.type = 'select';
      syntheticEvent.target = activeElement;
  
      EventPropagators.accumulateTwoPhaseDispatches(syntheticEvent);
  
      return syntheticEvent;
    }
  }
  
  /**
   * This plugin creates an `onSelect` event that normalizes select events
   * across form elements.
   *
   * Supported elements are:
   * - input (see `isTextInputElement`)
   * - textarea
   * - contentEditable
   *
   * This differs from native browser implementations in the following ways:
   * - Fires on contentEditable fields as well as inputs.
   * - Fires for collapsed selection.
   * - Fires after user input.
   */
  var SelectEventPlugin = {
  
    eventTypes: eventTypes,
  
    /**
     * @param {string} topLevelType Record from `EventConstants`.
     * @param {DOMEventTarget} topLevelTarget The listening component root node.
     * @param {string} topLevelTargetID ID of `topLevelTarget`.
     * @param {object} nativeEvent Native browser event.
     * @return {*} An accumulation of synthetic events.
     * @see {EventPluginHub.extractEvents}
     */
    extractEvents: function(
        topLevelType,
        topLevelTarget,
        topLevelTargetID,
        nativeEvent) {
  
      switch (topLevelType) {
        // Track the input node that has focus.
        case topLevelTypes.topFocus:
          if (isTextInputElement(topLevelTarget) ||
              topLevelTarget.contentEditable === 'true') {
            activeElement = topLevelTarget;
            activeElementID = topLevelTargetID;
            lastSelection = null;
          }
          break;
        case topLevelTypes.topBlur:
          activeElement = null;
          activeElementID = null;
          lastSelection = null;
          break;
  
        // Don't fire the event while the user is dragging. This matches the
        // semantics of the native select event.
        case topLevelTypes.topMouseDown:
          mouseDown = true;
          break;
        case topLevelTypes.topContextMenu:
        case topLevelTypes.topMouseUp:
          mouseDown = false;
          return constructSelectEvent(nativeEvent);
  
        // Chrome and IE fire non-standard event when selection is changed (and
        // sometimes when it hasn't).
        // Firefox doesn't support selectionchange, so check selection status
        // after each key entry. The selection changes after keydown and before
        // keyup, but we check on keydown as well in the case of holding down a
        // key, when multiple keydown events are fired but only one keyup is.
        case topLevelTypes.topSelectionChange:
        case topLevelTypes.topKeyDown:
        case topLevelTypes.topKeyUp:
          return constructSelectEvent(nativeEvent);
      }
    }
  };
  
  module.exports = SelectEventPlugin;


/***/ },
/* 253 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ServerReactRootIndex
   * @typechecks
   */
  
  'use strict';
  
  /**
   * Size of the reactRoot ID space. We generate random numbers for React root
   * IDs and if there's a collision the events and DOM update system will
   * get confused. In the future we need a way to generate GUIDs but for
   * now this will work on a smaller scale.
   */
  var GLOBAL_MOUNT_POINT_MAX = Math.pow(2, 53);
  
  var ServerReactRootIndex = {
    createReactRootIndex: function() {
      return Math.ceil(Math.random() * GLOBAL_MOUNT_POINT_MAX);
    }
  };
  
  module.exports = ServerReactRootIndex;


/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule SimpleEventPlugin
   */
  
  'use strict';
  
  var EventConstants = __webpack_require__(12);
  var EventPluginUtils = __webpack_require__(68);
  var EventPropagators = __webpack_require__(40);
  var SyntheticClipboardEvent = __webpack_require__(255);
  var SyntheticEvent = __webpack_require__(30);
  var SyntheticFocusEvent = __webpack_require__(258);
  var SyntheticKeyboardEvent = __webpack_require__(260);
  var SyntheticMouseEvent = __webpack_require__(52);
  var SyntheticDragEvent = __webpack_require__(257);
  var SyntheticTouchEvent = __webpack_require__(261);
  var SyntheticUIEvent = __webpack_require__(42);
  var SyntheticWheelEvent = __webpack_require__(262);
  
  var getEventCharCode = __webpack_require__(81);
  
  var invariant = __webpack_require__(2);
  var keyOf = __webpack_require__(28);
  var warning = __webpack_require__(6);
  
  var topLevelTypes = EventConstants.topLevelTypes;
  
  var eventTypes = {
    blur: {
      phasedRegistrationNames: {
        bubbled: keyOf({onBlur: true}),
        captured: keyOf({onBlurCapture: true})
      }
    },
    click: {
      phasedRegistrationNames: {
        bubbled: keyOf({onClick: true}),
        captured: keyOf({onClickCapture: true})
      }
    },
    contextMenu: {
      phasedRegistrationNames: {
        bubbled: keyOf({onContextMenu: true}),
        captured: keyOf({onContextMenuCapture: true})
      }
    },
    copy: {
      phasedRegistrationNames: {
        bubbled: keyOf({onCopy: true}),
        captured: keyOf({onCopyCapture: true})
      }
    },
    cut: {
      phasedRegistrationNames: {
        bubbled: keyOf({onCut: true}),
        captured: keyOf({onCutCapture: true})
      }
    },
    doubleClick: {
      phasedRegistrationNames: {
        bubbled: keyOf({onDoubleClick: true}),
        captured: keyOf({onDoubleClickCapture: true})
      }
    },
    drag: {
      phasedRegistrationNames: {
        bubbled: keyOf({onDrag: true}),
        captured: keyOf({onDragCapture: true})
      }
    },
    dragEnd: {
      phasedRegistrationNames: {
        bubbled: keyOf({onDragEnd: true}),
        captured: keyOf({onDragEndCapture: true})
      }
    },
    dragEnter: {
      phasedRegistrationNames: {
        bubbled: keyOf({onDragEnter: true}),
        captured: keyOf({onDragEnterCapture: true})
      }
    },
    dragExit: {
      phasedRegistrationNames: {
        bubbled: keyOf({onDragExit: true}),
        captured: keyOf({onDragExitCapture: true})
      }
    },
    dragLeave: {
      phasedRegistrationNames: {
        bubbled: keyOf({onDragLeave: true}),
        captured: keyOf({onDragLeaveCapture: true})
      }
    },
    dragOver: {
      phasedRegistrationNames: {
        bubbled: keyOf({onDragOver: true}),
        captured: keyOf({onDragOverCapture: true})
      }
    },
    dragStart: {
      phasedRegistrationNames: {
        bubbled: keyOf({onDragStart: true}),
        captured: keyOf({onDragStartCapture: true})
      }
    },
    drop: {
      phasedRegistrationNames: {
        bubbled: keyOf({onDrop: true}),
        captured: keyOf({onDropCapture: true})
      }
    },
    focus: {
      phasedRegistrationNames: {
        bubbled: keyOf({onFocus: true}),
        captured: keyOf({onFocusCapture: true})
      }
    },
    input: {
      phasedRegistrationNames: {
        bubbled: keyOf({onInput: true}),
        captured: keyOf({onInputCapture: true})
      }
    },
    keyDown: {
      phasedRegistrationNames: {
        bubbled: keyOf({onKeyDown: true}),
        captured: keyOf({onKeyDownCapture: true})
      }
    },
    keyPress: {
      phasedRegistrationNames: {
        bubbled: keyOf({onKeyPress: true}),
        captured: keyOf({onKeyPressCapture: true})
      }
    },
    keyUp: {
      phasedRegistrationNames: {
        bubbled: keyOf({onKeyUp: true}),
        captured: keyOf({onKeyUpCapture: true})
      }
    },
    load: {
      phasedRegistrationNames: {
        bubbled: keyOf({onLoad: true}),
        captured: keyOf({onLoadCapture: true})
      }
    },
    error: {
      phasedRegistrationNames: {
        bubbled: keyOf({onError: true}),
        captured: keyOf({onErrorCapture: true})
      }
    },
    // Note: We do not allow listening to mouseOver events. Instead, use the
    // onMouseEnter/onMouseLeave created by `EnterLeaveEventPlugin`.
    mouseDown: {
      phasedRegistrationNames: {
        bubbled: keyOf({onMouseDown: true}),
        captured: keyOf({onMouseDownCapture: true})
      }
    },
    mouseMove: {
      phasedRegistrationNames: {
        bubbled: keyOf({onMouseMove: true}),
        captured: keyOf({onMouseMoveCapture: true})
      }
    },
    mouseOut: {
      phasedRegistrationNames: {
        bubbled: keyOf({onMouseOut: true}),
        captured: keyOf({onMouseOutCapture: true})
      }
    },
    mouseOver: {
      phasedRegistrationNames: {
        bubbled: keyOf({onMouseOver: true}),
        captured: keyOf({onMouseOverCapture: true})
      }
    },
    mouseUp: {
      phasedRegistrationNames: {
        bubbled: keyOf({onMouseUp: true}),
        captured: keyOf({onMouseUpCapture: true})
      }
    },
    paste: {
      phasedRegistrationNames: {
        bubbled: keyOf({onPaste: true}),
        captured: keyOf({onPasteCapture: true})
      }
    },
    reset: {
      phasedRegistrationNames: {
        bubbled: keyOf({onReset: true}),
        captured: keyOf({onResetCapture: true})
      }
    },
    scroll: {
      phasedRegistrationNames: {
        bubbled: keyOf({onScroll: true}),
        captured: keyOf({onScrollCapture: true})
      }
    },
    submit: {
      phasedRegistrationNames: {
        bubbled: keyOf({onSubmit: true}),
        captured: keyOf({onSubmitCapture: true})
      }
    },
    touchCancel: {
      phasedRegistrationNames: {
        bubbled: keyOf({onTouchCancel: true}),
        captured: keyOf({onTouchCancelCapture: true})
      }
    },
    touchEnd: {
      phasedRegistrationNames: {
        bubbled: keyOf({onTouchEnd: true}),
        captured: keyOf({onTouchEndCapture: true})
      }
    },
    touchMove: {
      phasedRegistrationNames: {
        bubbled: keyOf({onTouchMove: true}),
        captured: keyOf({onTouchMoveCapture: true})
      }
    },
    touchStart: {
      phasedRegistrationNames: {
        bubbled: keyOf({onTouchStart: true}),
        captured: keyOf({onTouchStartCapture: true})
      }
    },
    wheel: {
      phasedRegistrationNames: {
        bubbled: keyOf({onWheel: true}),
        captured: keyOf({onWheelCapture: true})
      }
    }
  };
  
  var topLevelEventsToDispatchConfig = {
    topBlur:        eventTypes.blur,
    topClick:       eventTypes.click,
    topContextMenu: eventTypes.contextMenu,
    topCopy:        eventTypes.copy,
    topCut:         eventTypes.cut,
    topDoubleClick: eventTypes.doubleClick,
    topDrag:        eventTypes.drag,
    topDragEnd:     eventTypes.dragEnd,
    topDragEnter:   eventTypes.dragEnter,
    topDragExit:    eventTypes.dragExit,
    topDragLeave:   eventTypes.dragLeave,
    topDragOver:    eventTypes.dragOver,
    topDragStart:   eventTypes.dragStart,
    topDrop:        eventTypes.drop,
    topError:       eventTypes.error,
    topFocus:       eventTypes.focus,
    topInput:       eventTypes.input,
    topKeyDown:     eventTypes.keyDown,
    topKeyPress:    eventTypes.keyPress,
    topKeyUp:       eventTypes.keyUp,
    topLoad:        eventTypes.load,
    topMouseDown:   eventTypes.mouseDown,
    topMouseMove:   eventTypes.mouseMove,
    topMouseOut:    eventTypes.mouseOut,
    topMouseOver:   eventTypes.mouseOver,
    topMouseUp:     eventTypes.mouseUp,
    topPaste:       eventTypes.paste,
    topReset:       eventTypes.reset,
    topScroll:      eventTypes.scroll,
    topSubmit:      eventTypes.submit,
    topTouchCancel: eventTypes.touchCancel,
    topTouchEnd:    eventTypes.touchEnd,
    topTouchMove:   eventTypes.touchMove,
    topTouchStart:  eventTypes.touchStart,
    topWheel:       eventTypes.wheel
  };
  
  for (var type in topLevelEventsToDispatchConfig) {
    topLevelEventsToDispatchConfig[type].dependencies = [type];
  }
  
  var SimpleEventPlugin = {
  
    eventTypes: eventTypes,
  
    /**
     * Same as the default implementation, except cancels the event when return
     * value is false. This behavior will be disabled in a future release.
     *
     * @param {object} Event to be dispatched.
     * @param {function} Application-level callback.
     * @param {string} domID DOM ID to pass to the callback.
     */
    executeDispatch: function(event, listener, domID) {
      var returnValue = EventPluginUtils.executeDispatch(event, listener, domID);
  
      (true ? warning(
        typeof returnValue !== 'boolean',
        'Returning `false` from an event handler is deprecated and will be ' +
        'ignored in a future release. Instead, manually call ' +
        'e.stopPropagation() or e.preventDefault(), as appropriate.'
      ) : null);
  
      if (returnValue === false) {
        event.stopPropagation();
        event.preventDefault();
      }
    },
  
    /**
     * @param {string} topLevelType Record from `EventConstants`.
     * @param {DOMEventTarget} topLevelTarget The listening component root node.
     * @param {string} topLevelTargetID ID of `topLevelTarget`.
     * @param {object} nativeEvent Native browser event.
     * @return {*} An accumulation of synthetic events.
     * @see {EventPluginHub.extractEvents}
     */
    extractEvents: function(
        topLevelType,
        topLevelTarget,
        topLevelTargetID,
        nativeEvent) {
      var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
      if (!dispatchConfig) {
        return null;
      }
      var EventConstructor;
      switch (topLevelType) {
        case topLevelTypes.topInput:
        case topLevelTypes.topLoad:
        case topLevelTypes.topError:
        case topLevelTypes.topReset:
        case topLevelTypes.topSubmit:
          // HTML Events
          // @see http://www.w3.org/TR/html5/index.html#events-0
          EventConstructor = SyntheticEvent;
          break;
        case topLevelTypes.topKeyPress:
          // FireFox creates a keypress event for function keys too. This removes
          // the unwanted keypress events. Enter is however both printable and
          // non-printable. One would expect Tab to be as well (but it isn't).
          if (getEventCharCode(nativeEvent) === 0) {
            return null;
          }
          /* falls through */
        case topLevelTypes.topKeyDown:
        case topLevelTypes.topKeyUp:
          EventConstructor = SyntheticKeyboardEvent;
          break;
        case topLevelTypes.topBlur:
        case topLevelTypes.topFocus:
          EventConstructor = SyntheticFocusEvent;
          break;
        case topLevelTypes.topClick:
          // Firefox creates a click event on right mouse clicks. This removes the
          // unwanted click events.
          if (nativeEvent.button === 2) {
            return null;
          }
          /* falls through */
        case topLevelTypes.topContextMenu:
        case topLevelTypes.topDoubleClick:
        case topLevelTypes.topMouseDown:
        case topLevelTypes.topMouseMove:
        case topLevelTypes.topMouseOut:
        case topLevelTypes.topMouseOver:
        case topLevelTypes.topMouseUp:
          EventConstructor = SyntheticMouseEvent;
          break;
        case topLevelTypes.topDrag:
        case topLevelTypes.topDragEnd:
        case topLevelTypes.topDragEnter:
        case topLevelTypes.topDragExit:
        case topLevelTypes.topDragLeave:
        case topLevelTypes.topDragOver:
        case topLevelTypes.topDragStart:
        case topLevelTypes.topDrop:
          EventConstructor = SyntheticDragEvent;
          break;
        case topLevelTypes.topTouchCancel:
        case topLevelTypes.topTouchEnd:
        case topLevelTypes.topTouchMove:
        case topLevelTypes.topTouchStart:
          EventConstructor = SyntheticTouchEvent;
          break;
        case topLevelTypes.topScroll:
          EventConstructor = SyntheticUIEvent;
          break;
        case topLevelTypes.topWheel:
          EventConstructor = SyntheticWheelEvent;
          break;
        case topLevelTypes.topCopy:
        case topLevelTypes.topCut:
        case topLevelTypes.topPaste:
          EventConstructor = SyntheticClipboardEvent;
          break;
      }
      (true ? invariant(
        EventConstructor,
        'SimpleEventPlugin: Unhandled event type, `%s`.',
        topLevelType
      ) : invariant(EventConstructor));
      var event = EventConstructor.getPooled(
        dispatchConfig,
        topLevelTargetID,
        nativeEvent
      );
      EventPropagators.accumulateTwoPhaseDispatches(event);
      return event;
    }
  
  };
  
  module.exports = SimpleEventPlugin;


/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule SyntheticClipboardEvent
   * @typechecks static-only
   */
  
  'use strict';
  
  var SyntheticEvent = __webpack_require__(30);
  
  /**
   * @interface Event
   * @see http://www.w3.org/TR/clipboard-apis/
   */
  var ClipboardEventInterface = {
    clipboardData: function(event) {
      return (
        'clipboardData' in event ?
          event.clipboardData :
          window.clipboardData
      );
    }
  };
  
  /**
   * @param {object} dispatchConfig Configuration used to dispatch this event.
   * @param {string} dispatchMarker Marker identifying the event target.
   * @param {object} nativeEvent Native browser event.
   * @extends {SyntheticUIEvent}
   */
  function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  
  SyntheticEvent.augmentClass(SyntheticClipboardEvent, ClipboardEventInterface);
  
  module.exports = SyntheticClipboardEvent;


/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule SyntheticCompositionEvent
   * @typechecks static-only
   */
  
  'use strict';
  
  var SyntheticEvent = __webpack_require__(30);
  
  /**
   * @interface Event
   * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
   */
  var CompositionEventInterface = {
    data: null
  };
  
  /**
   * @param {object} dispatchConfig Configuration used to dispatch this event.
   * @param {string} dispatchMarker Marker identifying the event target.
   * @param {object} nativeEvent Native browser event.
   * @extends {SyntheticUIEvent}
   */
  function SyntheticCompositionEvent(
    dispatchConfig,
    dispatchMarker,
    nativeEvent) {
    SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  
  SyntheticEvent.augmentClass(
    SyntheticCompositionEvent,
    CompositionEventInterface
  );
  
  module.exports = SyntheticCompositionEvent;


/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule SyntheticDragEvent
   * @typechecks static-only
   */
  
  'use strict';
  
  var SyntheticMouseEvent = __webpack_require__(52);
  
  /**
   * @interface DragEvent
   * @see http://www.w3.org/TR/DOM-Level-3-Events/
   */
  var DragEventInterface = {
    dataTransfer: null
  };
  
  /**
   * @param {object} dispatchConfig Configuration used to dispatch this event.
   * @param {string} dispatchMarker Marker identifying the event target.
   * @param {object} nativeEvent Native browser event.
   * @extends {SyntheticUIEvent}
   */
  function SyntheticDragEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  
  SyntheticMouseEvent.augmentClass(SyntheticDragEvent, DragEventInterface);
  
  module.exports = SyntheticDragEvent;


/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule SyntheticFocusEvent
   * @typechecks static-only
   */
  
  'use strict';
  
  var SyntheticUIEvent = __webpack_require__(42);
  
  /**
   * @interface FocusEvent
   * @see http://www.w3.org/TR/DOM-Level-3-Events/
   */
  var FocusEventInterface = {
    relatedTarget: null
  };
  
  /**
   * @param {object} dispatchConfig Configuration used to dispatch this event.
   * @param {string} dispatchMarker Marker identifying the event target.
   * @param {object} nativeEvent Native browser event.
   * @extends {SyntheticUIEvent}
   */
  function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  
  SyntheticUIEvent.augmentClass(SyntheticFocusEvent, FocusEventInterface);
  
  module.exports = SyntheticFocusEvent;


/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule SyntheticInputEvent
   * @typechecks static-only
   */
  
  'use strict';
  
  var SyntheticEvent = __webpack_require__(30);
  
  /**
   * @interface Event
   * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
   *      /#events-inputevents
   */
  var InputEventInterface = {
    data: null
  };
  
  /**
   * @param {object} dispatchConfig Configuration used to dispatch this event.
   * @param {string} dispatchMarker Marker identifying the event target.
   * @param {object} nativeEvent Native browser event.
   * @extends {SyntheticUIEvent}
   */
  function SyntheticInputEvent(
    dispatchConfig,
    dispatchMarker,
    nativeEvent) {
    SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  
  SyntheticEvent.augmentClass(
    SyntheticInputEvent,
    InputEventInterface
  );
  
  module.exports = SyntheticInputEvent;


/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule SyntheticKeyboardEvent
   * @typechecks static-only
   */
  
  'use strict';
  
  var SyntheticUIEvent = __webpack_require__(42);
  
  var getEventCharCode = __webpack_require__(81);
  var getEventKey = __webpack_require__(271);
  var getEventModifierState = __webpack_require__(82);
  
  /**
   * @interface KeyboardEvent
   * @see http://www.w3.org/TR/DOM-Level-3-Events/
   */
  var KeyboardEventInterface = {
    key: getEventKey,
    location: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    repeat: null,
    locale: null,
    getModifierState: getEventModifierState,
    // Legacy Interface
    charCode: function(event) {
      // `charCode` is the result of a KeyPress event and represents the value of
      // the actual printable character.
  
      // KeyPress is deprecated, but its replacement is not yet final and not
      // implemented in any major browser. Only KeyPress has charCode.
      if (event.type === 'keypress') {
        return getEventCharCode(event);
      }
      return 0;
    },
    keyCode: function(event) {
      // `keyCode` is the result of a KeyDown/Up event and represents the value of
      // physical keyboard key.
  
      // The actual meaning of the value depends on the users' keyboard layout
      // which cannot be detected. Assuming that it is a US keyboard layout
      // provides a surprisingly accurate mapping for US and European users.
      // Due to this, it is left to the user to implement at this time.
      if (event.type === 'keydown' || event.type === 'keyup') {
        return event.keyCode;
      }
      return 0;
    },
    which: function(event) {
      // `which` is an alias for either `keyCode` or `charCode` depending on the
      // type of the event.
      if (event.type === 'keypress') {
        return getEventCharCode(event);
      }
      if (event.type === 'keydown' || event.type === 'keyup') {
        return event.keyCode;
      }
      return 0;
    }
  };
  
  /**
   * @param {object} dispatchConfig Configuration used to dispatch this event.
   * @param {string} dispatchMarker Marker identifying the event target.
   * @param {object} nativeEvent Native browser event.
   * @extends {SyntheticUIEvent}
   */
  function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  
  SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent, KeyboardEventInterface);
  
  module.exports = SyntheticKeyboardEvent;


/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule SyntheticTouchEvent
   * @typechecks static-only
   */
  
  'use strict';
  
  var SyntheticUIEvent = __webpack_require__(42);
  
  var getEventModifierState = __webpack_require__(82);
  
  /**
   * @interface TouchEvent
   * @see http://www.w3.org/TR/touch-events/
   */
  var TouchEventInterface = {
    touches: null,
    targetTouches: null,
    changedTouches: null,
    altKey: null,
    metaKey: null,
    ctrlKey: null,
    shiftKey: null,
    getModifierState: getEventModifierState
  };
  
  /**
   * @param {object} dispatchConfig Configuration used to dispatch this event.
   * @param {string} dispatchMarker Marker identifying the event target.
   * @param {object} nativeEvent Native browser event.
   * @extends {SyntheticUIEvent}
   */
  function SyntheticTouchEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  
  SyntheticUIEvent.augmentClass(SyntheticTouchEvent, TouchEventInterface);
  
  module.exports = SyntheticTouchEvent;


/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule SyntheticWheelEvent
   * @typechecks static-only
   */
  
  'use strict';
  
  var SyntheticMouseEvent = __webpack_require__(52);
  
  /**
   * @interface WheelEvent
   * @see http://www.w3.org/TR/DOM-Level-3-Events/
   */
  var WheelEventInterface = {
    deltaX: function(event) {
      return (
        'deltaX' in event ? event.deltaX :
        // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
        'wheelDeltaX' in event ? -event.wheelDeltaX : 0
      );
    },
    deltaY: function(event) {
      return (
        'deltaY' in event ? event.deltaY :
        // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
        'wheelDeltaY' in event ? -event.wheelDeltaY :
        // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
        'wheelDelta' in event ? -event.wheelDelta : 0
      );
    },
    deltaZ: null,
  
    // Browsers without "deltaMode" is reporting in raw wheel delta where one
    // notch on the scroll is always +/- 120, roughly equivalent to pixels.
    // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
    // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
    deltaMode: null
  };
  
  /**
   * @param {object} dispatchConfig Configuration used to dispatch this event.
   * @param {string} dispatchMarker Marker identifying the event target.
   * @param {object} nativeEvent Native browser event.
   * @extends {SyntheticMouseEvent}
   */
  function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  
  SyntheticMouseEvent.augmentClass(SyntheticWheelEvent, WheelEventInterface);
  
  module.exports = SyntheticWheelEvent;


/***/ },
/* 263 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule adler32
   */
  
  /* jslint bitwise:true */
  
  'use strict';
  
  var MOD = 65521;
  
  // This is a clean-room implementation of adler32 designed for detecting
  // if markup is not what we expect it to be. It does not need to be
  // cryptographically strong, only reasonably good at detecting if markup
  // generated on the server is different than that on the client.
  function adler32(data) {
    var a = 1;
    var b = 0;
    for (var i = 0; i < data.length; i++) {
      a = (a + data.charCodeAt(i)) % MOD;
      b = (b + a) % MOD;
    }
    return a | (b << 16);
  }
  
  module.exports = adler32;


/***/ },
/* 264 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule camelize
   * @typechecks
   */
  
  var _hyphenPattern = /-(.)/g;
  
  /**
   * Camelcases a hyphenated string, for example:
   *
   *   > camelize('background-color')
   *   < "backgroundColor"
   *
   * @param {string} string
   * @return {string}
   */
  function camelize(string) {
    return string.replace(_hyphenPattern, function(_, character) {
      return character.toUpperCase();
    });
  }
  
  module.exports = camelize;


/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule camelizeStyleName
   * @typechecks
   */
  
  "use strict";
  
  var camelize = __webpack_require__(264);
  
  var msPattern = /^-ms-/;
  
  /**
   * Camelcases a hyphenated CSS property name, for example:
   *
   *   > camelizeStyleName('background-color')
   *   < "backgroundColor"
   *   > camelizeStyleName('-moz-transition')
   *   < "MozTransition"
   *   > camelizeStyleName('-ms-transition')
   *   < "msTransition"
   *
   * As Andi Smith suggests
   * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
   * is converted to lowercase `ms`.
   *
   * @param {string} string
   * @return {string}
   */
  function camelizeStyleName(string) {
    return camelize(string.replace(msPattern, 'ms-'));
  }
  
  module.exports = camelizeStyleName;


/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule createArrayFromMixed
   * @typechecks
   */
  
  var toArray = __webpack_require__(286);
  
  /**
   * Perform a heuristic test to determine if an object is "array-like".
   *
   *   A monk asked Joshu, a Zen master, "Has a dog Buddha nature?"
   *   Joshu replied: "Mu."
   *
   * This function determines if its argument has "array nature": it returns
   * true if the argument is an actual array, an `arguments' object, or an
   * HTMLCollection (e.g. node.childNodes or node.getElementsByTagName()).
   *
   * It will return false for other array-like objects like Filelist.
   *
   * @param {*} obj
   * @return {boolean}
   */
  function hasArrayNature(obj) {
    return (
      // not null/false
      !!obj &&
      // arrays are objects, NodeLists are functions in Safari
      (typeof obj == 'object' || typeof obj == 'function') &&
      // quacks like an array
      ('length' in obj) &&
      // not window
      !('setInterval' in obj) &&
      // no DOM node should be considered an array-like
      // a 'select' element has 'length' and 'item' properties on IE8
      (typeof obj.nodeType != 'number') &&
      (
        // a real array
        (// HTMLCollection/NodeList
        (Array.isArray(obj) ||
        // arguments
        ('callee' in obj) || 'item' in obj))
      )
    );
  }
  
  /**
   * Ensure that the argument is an array by wrapping it in an array if it is not.
   * Creates a copy of the argument if it is already an array.
   *
   * This is mostly useful idiomatically:
   *
   *   var createArrayFromMixed = require('createArrayFromMixed');
   *
   *   function takesOneOrMoreThings(things) {
   *     things = createArrayFromMixed(things);
   *     ...
   *   }
   *
   * This allows you to treat `things' as an array, but accept scalars in the API.
   *
   * If you need to convert an array-like object, like `arguments`, into an array
   * use toArray instead.
   *
   * @param {*} obj
   * @return {array}
   */
  function createArrayFromMixed(obj) {
    if (!hasArrayNature(obj)) {
      return [obj];
    } else if (Array.isArray(obj)) {
      return obj.slice();
    } else {
      return toArray(obj);
    }
  }
  
  module.exports = createArrayFromMixed;


/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule createFullPageComponent
   * @typechecks
   */
  
  'use strict';
  
  // Defeat circular references by requiring this directly.
  var ReactClass = __webpack_require__(13);
  var ReactElement = __webpack_require__(5);
  
  var invariant = __webpack_require__(2);
  
  /**
   * Create a component that will throw an exception when unmounted.
   *
   * Components like <html> <head> and <body> can't be removed or added
   * easily in a cross-browser way, however it's valuable to be able to
   * take advantage of React's reconciliation for styling and <title>
   * management. So we just document it and throw in dangerous cases.
   *
   * @param {string} tag The tag to wrap
   * @return {function} convenience constructor of new component
   */
  function createFullPageComponent(tag) {
    var elementFactory = ReactElement.createFactory(tag);
  
    var FullPageComponent = ReactClass.createClass({
      tagName: tag.toUpperCase(),
      displayName: 'ReactFullPageComponent' + tag,
  
      componentWillUnmount: function() {
        (true ? invariant(
          false,
          '%s tried to unmount. Because of cross-browser quirks it is ' +
          'impossible to unmount some top-level components (eg <html>, <head>, ' +
          'and <body>) reliably and efficiently. To fix this, have a single ' +
          'top-level component that never unmounts render these elements.',
          this.constructor.displayName
        ) : invariant(false));
      },
  
      render: function() {
        return elementFactory(this.props);
      }
    });
  
    return FullPageComponent;
  }
  
  module.exports = createFullPageComponent;


/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule createNodesFromMarkup
   * @typechecks
   */
  
  /*jslint evil: true, sub: true */
  
  var ExecutionEnvironment = __webpack_require__(7);
  
  var createArrayFromMixed = __webpack_require__(266);
  var getMarkupWrap = __webpack_require__(121);
  var invariant = __webpack_require__(2);
  
  /**
   * Dummy container used to render all markup.
   */
  var dummyNode =
    ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
  
  /**
   * Pattern used by `getNodeName`.
   */
  var nodeNamePattern = /^\s*<(\w+)/;
  
  /**
   * Extracts the `nodeName` of the first element in a string of markup.
   *
   * @param {string} markup String of markup.
   * @return {?string} Node name of the supplied markup.
   */
  function getNodeName(markup) {
    var nodeNameMatch = markup.match(nodeNamePattern);
    return nodeNameMatch && nodeNameMatch[1].toLowerCase();
  }
  
  /**
   * Creates an array containing the nodes rendered from the supplied markup. The
   * optionally supplied `handleScript` function will be invoked once for each
   * <script> element that is rendered. If no `handleScript` function is supplied,
   * an exception is thrown if any <script> elements are rendered.
   *
   * @param {string} markup A string of valid HTML markup.
   * @param {?function} handleScript Invoked once for each rendered <script>.
   * @return {array<DOMElement|DOMTextNode>} An array of rendered nodes.
   */
  function createNodesFromMarkup(markup, handleScript) {
    var node = dummyNode;
    (true ? invariant(!!dummyNode, 'createNodesFromMarkup dummy not initialized') : invariant(!!dummyNode));
    var nodeName = getNodeName(markup);
  
    var wrap = nodeName && getMarkupWrap(nodeName);
    if (wrap) {
      node.innerHTML = wrap[1] + markup + wrap[2];
  
      var wrapDepth = wrap[0];
      while (wrapDepth--) {
        node = node.lastChild;
      }
    } else {
      node.innerHTML = markup;
    }
  
    var scripts = node.getElementsByTagName('script');
    if (scripts.length) {
      (true ? invariant(
        handleScript,
        'createNodesFromMarkup(...): Unexpected <script> element rendered.'
      ) : invariant(handleScript));
      createArrayFromMixed(scripts).forEach(handleScript);
    }
  
    var nodes = createArrayFromMixed(node.childNodes);
    while (node.lastChild) {
      node.removeChild(node.lastChild);
    }
    return nodes;
  }
  
  module.exports = createNodesFromMarkup;


/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule dangerousStyleValue
   * @typechecks static-only
   */
  
  'use strict';
  
  var CSSProperty = __webpack_require__(103);
  
  var isUnitlessNumber = CSSProperty.isUnitlessNumber;
  
  /**
   * Convert a value into the proper css writable value. The style name `name`
   * should be logical (no hyphens), as specified
   * in `CSSProperty.isUnitlessNumber`.
   *
   * @param {string} name CSS property name such as `topMargin`.
   * @param {*} value CSS property value such as `10px`.
   * @return {string} Normalized style value with dimensions applied.
   */
  function dangerousStyleValue(name, value) {
    // Note that we've removed escapeTextForBrowser() calls here since the
    // whole string will be escaped when the attribute is injected into
    // the markup. If you provide unsafe user data here they can inject
    // arbitrary CSS which may be problematic (I couldn't repro this):
    // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
    // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
    // This is not an XSS hole but instead a potential CSS injection issue
    // which has lead to a greater discussion about how we're going to
    // trust URLs moving forward. See #2115901
  
    var isEmpty = value == null || typeof value === 'boolean' || value === '';
    if (isEmpty) {
      return '';
    }
  
    var isNonNumeric = isNaN(value);
    if (isNonNumeric || value === 0 ||
        isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
      return '' + value; // cast to string
    }
  
    if (typeof value === 'string') {
      value = value.trim();
    }
    return value + 'px';
  }
  
  module.exports = dangerousStyleValue;


/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule flattenChildren
   */
  
  'use strict';
  
  var traverseAllChildren = __webpack_require__(125);
  var warning = __webpack_require__(6);
  
  /**
   * @param {function} traverseContext Context passed through traversal.
   * @param {?ReactComponent} child React child component.
   * @param {!string} name String name of key path to child.
   */
  function flattenSingleChildIntoContext(traverseContext, child, name) {
    // We found a component instance.
    var result = traverseContext;
    var keyUnique = !result.hasOwnProperty(name);
    if (true) {
      (true ? warning(
        keyUnique,
        'flattenChildren(...): Encountered two children with the same key, ' +
        '`%s`. Child keys must be unique; when two children share a key, only ' +
        'the first child will be used.',
        name
      ) : null);
    }
    if (keyUnique && child != null) {
      result[name] = child;
    }
  }
  
  /**
   * Flattens children that are typically specified as `props.children`. Any null
   * children will not be included in the resulting object.
   * @return {!object} flattened children keyed by name.
   */
  function flattenChildren(children) {
    if (children == null) {
      return children;
    }
    var result = {};
    traverseAllChildren(children, flattenSingleChildIntoContext, result);
    return result;
  }
  
  module.exports = flattenChildren;


/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule getEventKey
   * @typechecks static-only
   */
  
  'use strict';
  
  var getEventCharCode = __webpack_require__(81);
  
  /**
   * Normalization of deprecated HTML5 `key` values
   * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
   */
  var normalizeKey = {
    'Esc': 'Escape',
    'Spacebar': ' ',
    'Left': 'ArrowLeft',
    'Up': 'ArrowUp',
    'Right': 'ArrowRight',
    'Down': 'ArrowDown',
    'Del': 'Delete',
    'Win': 'OS',
    'Menu': 'ContextMenu',
    'Apps': 'ContextMenu',
    'Scroll': 'ScrollLock',
    'MozPrintableKey': 'Unidentified'
  };
  
  /**
   * Translation from legacy `keyCode` to HTML5 `key`
   * Only special keys supported, all others depend on keyboard layout or browser
   * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
   */
  var translateToKey = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4', 116: 'F5', 117: 'F6',
    118: 'F7', 119: 'F8', 120: 'F9', 121: 'F10', 122: 'F11', 123: 'F12',
    144: 'NumLock',
    145: 'ScrollLock',
    224: 'Meta'
  };
  
  /**
   * @param {object} nativeEvent Native browser event.
   * @return {string} Normalized `key` property.
   */
  function getEventKey(nativeEvent) {
    if (nativeEvent.key) {
      // Normalize inconsistent values reported by browsers due to
      // implementations of a working draft specification.
  
      // FireFox implements `key` but returns `MozPrintableKey` for all
      // printable characters (normalized to `Unidentified`), ignore it.
      var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
      if (key !== 'Unidentified') {
        return key;
      }
    }
  
    // Browser does not implement `key`, polyfill as much of it as we can.
    if (nativeEvent.type === 'keypress') {
      var charCode = getEventCharCode(nativeEvent);
  
      // The enter-key is technically both printable and non-printable and can
      // thus be captured by `keypress`, no other non-printable key should.
      return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
    }
    if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
      // While user keyboard layout determines the actual meaning of each
      // `keyCode` value, almost all function keys have a universal value.
      return translateToKey[nativeEvent.keyCode] || 'Unidentified';
    }
    return '';
  }
  
  module.exports = getEventKey;


/***/ },
/* 272 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule getNodeForCharacterOffset
   */
  
  'use strict';
  
  /**
   * Given any node return the first leaf node without children.
   *
   * @param {DOMElement|DOMTextNode} node
   * @return {DOMElement|DOMTextNode}
   */
  function getLeafNode(node) {
    while (node && node.firstChild) {
      node = node.firstChild;
    }
    return node;
  }
  
  /**
   * Get the next sibling within a container. This will walk up the
   * DOM if a node's siblings have been exhausted.
   *
   * @param {DOMElement|DOMTextNode} node
   * @return {?DOMElement|DOMTextNode}
   */
  function getSiblingNode(node) {
    while (node) {
      if (node.nextSibling) {
        return node.nextSibling;
      }
      node = node.parentNode;
    }
  }
  
  /**
   * Get object describing the nodes which contain characters at offset.
   *
   * @param {DOMElement|DOMTextNode} root
   * @param {number} offset
   * @return {?object}
   */
  function getNodeForCharacterOffset(root, offset) {
    var node = getLeafNode(root);
    var nodeStart = 0;
    var nodeEnd = 0;
  
    while (node) {
      if (node.nodeType === 3) {
        nodeEnd = nodeStart + node.textContent.length;
  
        if (nodeStart <= offset && nodeEnd >= offset) {
          return {
            node: node,
            offset: offset - nodeStart
          };
        }
  
        nodeStart = nodeEnd;
      }
  
      node = getLeafNode(getSiblingNode(node));
    }
  }
  
  module.exports = getNodeForCharacterOffset;


/***/ },
/* 273 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule getReactRootElementInContainer
   */
  
  'use strict';
  
  var DOC_NODE_TYPE = 9;
  
  /**
   * @param {DOMElement|DOMDocument} container DOM element that may contain
   *                                           a React component
   * @return {?*} DOM element that may have the reactRoot ID, or null.
   */
  function getReactRootElementInContainer(container) {
    if (!container) {
      return null;
    }
  
    if (container.nodeType === DOC_NODE_TYPE) {
      return container.documentElement;
    } else {
      return container.firstChild;
    }
  }
  
  module.exports = getReactRootElementInContainer;


/***/ },
/* 274 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule getUnboundedScrollPosition
   * @typechecks
   */
  
  "use strict";
  
  /**
   * Gets the scroll position of the supplied element or window.
   *
   * The return values are unbounded, unlike `getScrollPosition`. This means they
   * may be negative or exceed the element boundaries (which is possible using
   * inertial scrolling).
   *
   * @param {DOMWindow|DOMElement} scrollable
   * @return {object} Map with `x` and `y` keys.
   */
  function getUnboundedScrollPosition(scrollable) {
    if (scrollable === window) {
      return {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop
      };
    }
    return {
      x: scrollable.scrollLeft,
      y: scrollable.scrollTop
    };
  }
  
  module.exports = getUnboundedScrollPosition;


/***/ },
/* 275 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule hyphenate
   * @typechecks
   */
  
  var _uppercasePattern = /([A-Z])/g;
  
  /**
   * Hyphenates a camelcased string, for example:
   *
   *   > hyphenate('backgroundColor')
   *   < "background-color"
   *
   * For CSS style names, use `hyphenateStyleName` instead which works properly
   * with all vendor prefixes, including `ms`.
   *
   * @param {string} string
   * @return {string}
   */
  function hyphenate(string) {
    return string.replace(_uppercasePattern, '-$1').toLowerCase();
  }
  
  module.exports = hyphenate;


/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule hyphenateStyleName
   * @typechecks
   */
  
  "use strict";
  
  var hyphenate = __webpack_require__(275);
  
  var msPattern = /^ms-/;
  
  /**
   * Hyphenates a camelcased CSS property name, for example:
   *
   *   > hyphenateStyleName('backgroundColor')
   *   < "background-color"
   *   > hyphenateStyleName('MozTransition')
   *   < "-moz-transition"
   *   > hyphenateStyleName('msTransition')
   *   < "-ms-transition"
   *
   * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
   * is converted to `-ms-`.
   *
   * @param {string} string
   * @return {string}
   */
  function hyphenateStyleName(string) {
    return hyphenate(string).replace(msPattern, '-ms-');
  }
  
  module.exports = hyphenateStyleName;


/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule isTextNode
   * @typechecks
   */
  
  var isNode = __webpack_require__(123);
  
  /**
   * @param {*} object The object to check.
   * @return {boolean} Whether or not the object is a DOM text node.
   */
  function isTextNode(object) {
    return isNode(object) && object.nodeType == 3;
  }
  
  module.exports = isTextNode;


/***/ },
/* 278 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule mapObject
   */
  
  'use strict';
  
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  
  /**
   * Executes the provided `callback` once for each enumerable own property in the
   * object and constructs a new object from the results. The `callback` is
   * invoked with three arguments:
   *
   *  - the property value
   *  - the property name
   *  - the object being traversed
   *
   * Properties that are added after the call to `mapObject` will not be visited
   * by `callback`. If the values of existing properties are changed, the value
   * passed to `callback` will be the value at the time `mapObject` visits them.
   * Properties that are deleted before being visited are not visited.
   *
   * @grep function objectMap()
   * @grep function objMap()
   *
   * @param {?object} object
   * @param {function} callback
   * @param {*} context
   * @return {?object}
   */
  function mapObject(object, callback, context) {
    if (!object) {
      return null;
    }
    var result = {};
    for (var name in object) {
      if (hasOwnProperty.call(object, name)) {
        result[name] = callback.call(context, object[name], name, object);
      }
    }
    return result;
  }
  
  module.exports = mapObject;


/***/ },
/* 279 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule memoizeStringOnly
   * @typechecks static-only
   */
  
  'use strict';
  
  /**
   * Memoizes the return value of a function that accepts one string argument.
   *
   * @param {function} callback
   * @return {function}
   */
  function memoizeStringOnly(callback) {
    var cache = {};
    return function(string) {
      if (!cache.hasOwnProperty(string)) {
        cache[string] = callback.call(this, string);
      }
      return cache[string];
    };
  }
  
  module.exports = memoizeStringOnly;


/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule onlyChild
   */
  'use strict';
  
  var ReactElement = __webpack_require__(5);
  
  var invariant = __webpack_require__(2);
  
  /**
   * Returns the first child in a collection of children and verifies that there
   * is only one child in the collection. The current implementation of this
   * function assumes that a single child gets passed without a wrapper, but the
   * purpose of this helper function is to abstract away the particular structure
   * of children.
   *
   * @param {?object} children Child collection structure.
   * @return {ReactComponent} The first and only `ReactComponent` contained in the
   * structure.
   */
  function onlyChild(children) {
    (true ? invariant(
      ReactElement.isValidElement(children),
      'onlyChild must be passed a children with exactly one child.'
    ) : invariant(ReactElement.isValidElement(children)));
    return children;
  }
  
  module.exports = onlyChild;


/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule performance
   * @typechecks
   */
  
  "use strict";
  
  var ExecutionEnvironment = __webpack_require__(7);
  
  var performance;
  
  if (ExecutionEnvironment.canUseDOM) {
    performance =
      window.performance ||
      window.msPerformance ||
      window.webkitPerformance;
  }
  
  module.exports = performance || {};


/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule performanceNow
   * @typechecks
   */
  
  var performance = __webpack_require__(281);
  
  /**
   * Detect if we can use `window.performance.now()` and gracefully fallback to
   * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
   * because of Facebook's testing infrastructure.
   */
  if (!performance || !performance.now) {
    performance = Date;
  }
  
  var performanceNow = performance.now.bind(performance);
  
  module.exports = performanceNow;


/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule quoteAttributeValueForBrowser
   */
  
  'use strict';
  
  var escapeTextContentForBrowser = __webpack_require__(55);
  
  /**
   * Escapes attribute value to prevent scripting attacks.
   *
   * @param {*} value Value to escape.
   * @return {string} An escaped string.
   */
  function quoteAttributeValueForBrowser(value) {
    return '"' + escapeTextContentForBrowser(value) + '"';
  }
  
  module.exports = quoteAttributeValueForBrowser;


/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule setTextContent
   */
  
  'use strict';
  
  var ExecutionEnvironment = __webpack_require__(7);
  var escapeTextContentForBrowser = __webpack_require__(55);
  var setInnerHTML = __webpack_require__(86);
  
  /**
   * Set the textContent property of a node, ensuring that whitespace is preserved
   * even in IE8. innerText is a poor substitute for textContent and, among many
   * issues, inserts <br> instead of the literal newline chars. innerHTML behaves
   * as it should.
   *
   * @param {DOMElement} node
   * @param {string} text
   * @internal
   */
  var setTextContent = function(node, text) {
    node.textContent = text;
  };
  
  if (ExecutionEnvironment.canUseDOM) {
    if (!('textContent' in document.documentElement)) {
      setTextContent = function(node, text) {
        setInnerHTML(node, escapeTextContentForBrowser(text));
      };
    }
  }
  
  module.exports = setTextContent;


/***/ },
/* 285 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule shallowEqual
   */
  
  'use strict';
  
  /**
   * Performs equality by iterating through keys on an object and returning
   * false when any key has values which are not strictly equal between
   * objA and objB. Returns true when the values of all keys are strictly equal.
   *
   * @return {boolean}
   */
  function shallowEqual(objA, objB) {
    if (objA === objB) {
      return true;
    }
    var key;
    // Test for A's keys different from B.
    for (key in objA) {
      if (objA.hasOwnProperty(key) &&
          (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
        return false;
      }
    }
    // Test for B's keys missing from A.
    for (key in objB) {
      if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
  
  module.exports = shallowEqual;


/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule toArray
   * @typechecks
   */
  
  var invariant = __webpack_require__(2);
  
  /**
   * Convert array-like objects to arrays.
   *
   * This API assumes the caller knows the contents of the data type. For less
   * well defined inputs use createArrayFromMixed.
   *
   * @param {object|function|filelist} obj
   * @return {array}
   */
  function toArray(obj) {
    var length = obj.length;
  
    // Some browse builtin objects can report typeof 'function' (e.g. NodeList in
    // old versions of Safari).
    (true ? invariant(
      !Array.isArray(obj) &&
      (typeof obj === 'object' || typeof obj === 'function'),
      'toArray: Array-like object expected'
    ) : invariant(!Array.isArray(obj) &&
    (typeof obj === 'object' || typeof obj === 'function')));
  
    (true ? invariant(
      typeof length === 'number',
      'toArray: Object needs a length property'
    ) : invariant(typeof length === 'number'));
  
    (true ? invariant(
      length === 0 ||
      (length - 1) in obj,
      'toArray: Object should have keys for indices'
    ) : invariant(length === 0 ||
    (length - 1) in obj));
  
    // Old IE doesn't give collections access to hasOwnProperty. Assume inputs
    // without method will throw during the slice call and skip straight to the
    // fallback.
    if (obj.hasOwnProperty) {
      try {
        return Array.prototype.slice.call(obj);
      } catch (e) {
        // IE < 9 does not support Array#slice on collections objects
      }
    }
  
    // Fall back to copying key by key. This assumes all keys have a value,
    // so will not preserve sparsely populated inputs.
    var ret = Array(length);
    for (var ii = 0; ii < length; ii++) {
      ret[ii] = obj[ii];
    }
    return ret;
  }
  
  module.exports = toArray;


/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

  var refs = 0;
  var dispose;
  var content = __webpack_require__(196);
  if(typeof content === 'string') content = [[module.id, content, '']];
  exports.use = exports.ref = function() {
  	if(!(refs++)) {
  		exports.locals = content.locals;
  		dispose = __webpack_require__(15)(content);
  	}
  	return exports;
  };
  exports.unuse = exports.unref = function() {
  	if(!(--refs)) {
  		dispose();
  		dispose = null;
  	}
  };
  if(false) {
  	var lastRefs = module.hot.data && module.hot.data.refs || 0;
  	if(lastRefs) {
  		exports.ref();
  		if(!content.locals) {
  			refs = lastRefs;
  		}
  	}
  	if(!content.locals) {
  		module.hot.accept();
  	}
  	module.hot.dispose(function(data) {
  		data.refs = content.locals ? 0 : refs;
  		if(dispose) {
  			dispose();
  		}
  	});
  }

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

  var refs = 0;
  var dispose;
  var content = __webpack_require__(197);
  if(typeof content === 'string') content = [[module.id, content, '']];
  exports.use = exports.ref = function() {
  	if(!(refs++)) {
  		exports.locals = content.locals;
  		dispose = __webpack_require__(15)(content);
  	}
  	return exports;
  };
  exports.unuse = exports.unref = function() {
  	if(!(--refs)) {
  		dispose();
  		dispose = null;
  	}
  };
  if(false) {
  	var lastRefs = module.hot.data && module.hot.data.refs || 0;
  	if(lastRefs) {
  		exports.ref();
  		if(!content.locals) {
  			refs = lastRefs;
  		}
  	}
  	if(!content.locals) {
  		module.hot.accept();
  	}
  	module.hot.dispose(function(data) {
  		data.refs = content.locals ? 0 : refs;
  		if(dispose) {
  			dispose();
  		}
  	});
  }

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

  var refs = 0;
  var dispose;
  var content = __webpack_require__(198);
  if(typeof content === 'string') content = [[module.id, content, '']];
  exports.use = exports.ref = function() {
  	if(!(refs++)) {
  		exports.locals = content.locals;
  		dispose = __webpack_require__(15)(content);
  	}
  	return exports;
  };
  exports.unuse = exports.unref = function() {
  	if(!(--refs)) {
  		dispose();
  		dispose = null;
  	}
  };
  if(false) {
  	var lastRefs = module.hot.data && module.hot.data.refs || 0;
  	if(lastRefs) {
  		exports.ref();
  		if(!content.locals) {
  			refs = lastRefs;
  		}
  	}
  	if(!content.locals) {
  		module.hot.accept();
  	}
  	module.hot.dispose(function(data) {
  		data.refs = content.locals ? 0 : refs;
  		if(dispose) {
  			dispose();
  		}
  	});
  }

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

  var refs = 0;
  var dispose;
  var content = __webpack_require__(199);
  if(typeof content === 'string') content = [[module.id, content, '']];
  exports.use = exports.ref = function() {
  	if(!(refs++)) {
  		exports.locals = content.locals;
  		dispose = __webpack_require__(15)(content);
  	}
  	return exports;
  };
  exports.unuse = exports.unref = function() {
  	if(!(--refs)) {
  		dispose();
  		dispose = null;
  	}
  };
  if(false) {
  	var lastRefs = module.hot.data && module.hot.data.refs || 0;
  	if(lastRefs) {
  		exports.ref();
  		if(!content.locals) {
  			refs = lastRefs;
  		}
  	}
  	if(!content.locals) {
  		module.hot.accept();
  	}
  	module.hot.dispose(function(data) {
  		data.refs = content.locals ? 0 : refs;
  		if(dispose) {
  			dispose();
  		}
  	});
  }

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

  var refs = 0;
  var dispose;
  var content = __webpack_require__(200);
  if(typeof content === 'string') content = [[module.id, content, '']];
  exports.use = exports.ref = function() {
  	if(!(refs++)) {
  		exports.locals = content.locals;
  		dispose = __webpack_require__(15)(content);
  	}
  	return exports;
  };
  exports.unuse = exports.unref = function() {
  	if(!(--refs)) {
  		dispose();
  		dispose = null;
  	}
  };
  if(false) {
  	var lastRefs = module.hot.data && module.hot.data.refs || 0;
  	if(lastRefs) {
  		exports.ref();
  		if(!content.locals) {
  			refs = lastRefs;
  		}
  	}
  	if(!content.locals) {
  		module.hot.accept();
  	}
  	module.hot.dispose(function(data) {
  		data.refs = content.locals ? 0 : refs;
  		if(dispose) {
  			dispose();
  		}
  	});
  }

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

  var refs = 0;
  var dispose;
  var content = __webpack_require__(201);
  if(typeof content === 'string') content = [[module.id, content, '']];
  exports.use = exports.ref = function() {
  	if(!(refs++)) {
  		exports.locals = content.locals;
  		dispose = __webpack_require__(15)(content);
  	}
  	return exports;
  };
  exports.unuse = exports.unref = function() {
  	if(!(--refs)) {
  		dispose();
  		dispose = null;
  	}
  };
  if(false) {
  	var lastRefs = module.hot.data && module.hot.data.refs || 0;
  	if(lastRefs) {
  		exports.ref();
  		if(!content.locals) {
  			refs = lastRefs;
  		}
  	}
  	if(!content.locals) {
  		module.hot.accept();
  	}
  	module.hot.dispose(function(data) {
  		data.refs = content.locals ? 0 : refs;
  		if(dispose) {
  			dispose();
  		}
  	});
  }

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

  var refs = 0;
  var dispose;
  var content = __webpack_require__(202);
  if(typeof content === 'string') content = [[module.id, content, '']];
  exports.use = exports.ref = function() {
  	if(!(refs++)) {
  		exports.locals = content.locals;
  		dispose = __webpack_require__(15)(content);
  	}
  	return exports;
  };
  exports.unuse = exports.unref = function() {
  	if(!(--refs)) {
  		dispose();
  		dispose = null;
  	}
  };
  if(false) {
  	var lastRefs = module.hot.data && module.hot.data.refs || 0;
  	if(lastRefs) {
  		exports.ref();
  		if(!content.locals) {
  			refs = lastRefs;
  		}
  	}
  	if(!content.locals) {
  		module.hot.accept();
  	}
  	module.hot.dispose(function(data) {
  		data.refs = content.locals ? 0 : refs;
  		if(dispose) {
  			dispose();
  		}
  	});
  }

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

  var refs = 0;
  var dispose;
  var content = __webpack_require__(203);
  if(typeof content === 'string') content = [[module.id, content, '']];
  exports.use = exports.ref = function() {
  	if(!(refs++)) {
  		exports.locals = content.locals;
  		dispose = __webpack_require__(15)(content);
  	}
  	return exports;
  };
  exports.unuse = exports.unref = function() {
  	if(!(--refs)) {
  		dispose();
  		dispose = null;
  	}
  };
  if(false) {
  	var lastRefs = module.hot.data && module.hot.data.refs || 0;
  	if(lastRefs) {
  		exports.ref();
  		if(!content.locals) {
  			refs = lastRefs;
  		}
  	}
  	if(!content.locals) {
  		module.hot.accept();
  	}
  	module.hot.dispose(function(data) {
  		data.refs = content.locals ? 0 : refs;
  		if(dispose) {
  			dispose();
  		}
  	});
  }

/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

  var refs = 0;
  var dispose;
  var content = __webpack_require__(204);
  if(typeof content === 'string') content = [[module.id, content, '']];
  exports.use = exports.ref = function() {
  	if(!(refs++)) {
  		exports.locals = content.locals;
  		dispose = __webpack_require__(15)(content);
  	}
  	return exports;
  };
  exports.unuse = exports.unref = function() {
  	if(!(--refs)) {
  		dispose();
  		dispose = null;
  	}
  };
  if(false) {
  	var lastRefs = module.hot.data && module.hot.data.refs || 0;
  	if(lastRefs) {
  		exports.ref();
  		if(!content.locals) {
  			refs = lastRefs;
  		}
  	}
  	if(!content.locals) {
  		module.hot.accept();
  	}
  	module.hot.dispose(function(data) {
  		data.refs = content.locals ? 0 : refs;
  		if(dispose) {
  			dispose();
  		}
  	});
  }

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

  var refs = 0;
  var dispose;
  var content = __webpack_require__(205);
  if(typeof content === 'string') content = [[module.id, content, '']];
  exports.use = exports.ref = function() {
  	if(!(refs++)) {
  		exports.locals = content.locals;
  		dispose = __webpack_require__(15)(content);
  	}
  	return exports;
  };
  exports.unuse = exports.unref = function() {
  	if(!(--refs)) {
  		dispose();
  		dispose = null;
  	}
  };
  if(false) {
  	var lastRefs = module.hot.data && module.hot.data.refs || 0;
  	if(lastRefs) {
  		exports.ref();
  		if(!content.locals) {
  			refs = lastRefs;
  		}
  	}
  	if(!content.locals) {
  		module.hot.accept();
  	}
  	module.hot.dispose(function(data) {
  		data.refs = content.locals ? 0 : refs;
  		if(dispose) {
  			dispose();
  		}
  	});
  }

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

  var refs = 0;
  var dispose;
  var content = __webpack_require__(206);
  if(typeof content === 'string') content = [[module.id, content, '']];
  exports.use = exports.ref = function() {
  	if(!(refs++)) {
  		exports.locals = content.locals;
  		dispose = __webpack_require__(15)(content);
  	}
  	return exports;
  };
  exports.unuse = exports.unref = function() {
  	if(!(--refs)) {
  		dispose();
  		dispose = null;
  	}
  };
  if(false) {
  	var lastRefs = module.hot.data && module.hot.data.refs || 0;
  	if(lastRefs) {
  		exports.ref();
  		if(!content.locals) {
  			refs = lastRefs;
  		}
  	}
  	if(!content.locals) {
  		module.hot.accept();
  	}
  	module.hot.dispose(function(data) {
  		data.refs = content.locals ? 0 : refs;
  		if(dispose) {
  			dispose();
  		}
  	});
  }

/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Module dependencies.
   */
  
  var Emitter = __webpack_require__(299);
  var reduce = __webpack_require__(300);
  
  /**
   * Root reference for iframes.
   */
  
  var root = 'undefined' == typeof window
    ? (this || self)
    : window;
  
  /**
   * Noop.
   */
  
  function noop(){};
  
  /**
   * Check if `obj` is a host object,
   * we don't want to serialize these :)
   *
   * TODO: future proof, move to compoent land
   *
   * @param {Object} obj
   * @return {Boolean}
   * @api private
   */
  
  function isHost(obj) {
    var str = {}.toString.call(obj);
  
    switch (str) {
      case '[object File]':
      case '[object Blob]':
      case '[object FormData]':
        return true;
      default:
        return false;
    }
  }
  
  /**
   * Determine XHR.
   */
  
  request.getXHR = function () {
    if (root.XMLHttpRequest
        && (!root.location || 'file:' != root.location.protocol
            || !root.ActiveXObject)) {
      return new XMLHttpRequest;
    } else {
      try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
      try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
      try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
      try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
    }
    return false;
  };
  
  /**
   * Removes leading and trailing whitespace, added to support IE.
   *
   * @param {String} s
   * @return {String}
   * @api private
   */
  
  var trim = ''.trim
    ? function(s) { return s.trim(); }
    : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };
  
  /**
   * Check if `obj` is an object.
   *
   * @param {Object} obj
   * @return {Boolean}
   * @api private
   */
  
  function isObject(obj) {
    return obj === Object(obj);
  }
  
  /**
   * Serialize the given `obj`.
   *
   * @param {Object} obj
   * @return {String}
   * @api private
   */
  
  function serialize(obj) {
    if (!isObject(obj)) return obj;
    var pairs = [];
    for (var key in obj) {
      if (null != obj[key]) {
        pairs.push(encodeURIComponent(key)
          + '=' + encodeURIComponent(obj[key]));
      }
    }
    return pairs.join('&');
  }
  
  /**
   * Expose serialization method.
   */
  
   request.serializeObject = serialize;
  
   /**
    * Parse the given x-www-form-urlencoded `str`.
    *
    * @param {String} str
    * @return {Object}
    * @api private
    */
  
  function parseString(str) {
    var obj = {};
    var pairs = str.split('&');
    var parts;
    var pair;
  
    for (var i = 0, len = pairs.length; i < len; ++i) {
      pair = pairs[i];
      parts = pair.split('=');
      obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    }
  
    return obj;
  }
  
  /**
   * Expose parser.
   */
  
  request.parseString = parseString;
  
  /**
   * Default MIME type map.
   *
   *     superagent.types.xml = 'application/xml';
   *
   */
  
  request.types = {
    html: 'text/html',
    json: 'application/json',
    xml: 'application/xml',
    urlencoded: 'application/x-www-form-urlencoded',
    'form': 'application/x-www-form-urlencoded',
    'form-data': 'application/x-www-form-urlencoded'
  };
  
  /**
   * Default serialization map.
   *
   *     superagent.serialize['application/xml'] = function(obj){
   *       return 'generated xml here';
   *     };
   *
   */
  
   request.serialize = {
     'application/x-www-form-urlencoded': serialize,
     'application/json': JSON.stringify
   };
  
   /**
    * Default parsers.
    *
    *     superagent.parse['application/xml'] = function(str){
    *       return { object parsed from str };
    *     };
    *
    */
  
  request.parse = {
    'application/x-www-form-urlencoded': parseString,
    'application/json': JSON.parse
  };
  
  /**
   * Parse the given header `str` into
   * an object containing the mapped fields.
   *
   * @param {String} str
   * @return {Object}
   * @api private
   */
  
  function parseHeader(str) {
    var lines = str.split(/\r?\n/);
    var fields = {};
    var index;
    var line;
    var field;
    var val;
  
    lines.pop(); // trailing CRLF
  
    for (var i = 0, len = lines.length; i < len; ++i) {
      line = lines[i];
      index = line.indexOf(':');
      field = line.slice(0, index).toLowerCase();
      val = trim(line.slice(index + 1));
      fields[field] = val;
    }
  
    return fields;
  }
  
  /**
   * Return the mime type for the given `str`.
   *
   * @param {String} str
   * @return {String}
   * @api private
   */
  
  function type(str){
    return str.split(/ *; */).shift();
  };
  
  /**
   * Return header field parameters.
   *
   * @param {String} str
   * @return {Object}
   * @api private
   */
  
  function params(str){
    return reduce(str.split(/ *; */), function(obj, str){
      var parts = str.split(/ *= */)
        , key = parts.shift()
        , val = parts.shift();
  
      if (key && val) obj[key] = val;
      return obj;
    }, {});
  };
  
  /**
   * Initialize a new `Response` with the given `xhr`.
   *
   *  - set flags (.ok, .error, etc)
   *  - parse header
   *
   * Examples:
   *
   *  Aliasing `superagent` as `request` is nice:
   *
   *      request = superagent;
   *
   *  We can use the promise-like API, or pass callbacks:
   *
   *      request.get('/').end(function(res){});
   *      request.get('/', function(res){});
   *
   *  Sending data can be chained:
   *
   *      request
   *        .post('/user')
   *        .send({ name: 'tj' })
   *        .end(function(res){});
   *
   *  Or passed to `.send()`:
   *
   *      request
   *        .post('/user')
   *        .send({ name: 'tj' }, function(res){});
   *
   *  Or passed to `.post()`:
   *
   *      request
   *        .post('/user', { name: 'tj' })
   *        .end(function(res){});
   *
   * Or further reduced to a single call for simple cases:
   *
   *      request
   *        .post('/user', { name: 'tj' }, function(res){});
   *
   * @param {XMLHTTPRequest} xhr
   * @param {Object} options
   * @api private
   */
  
  function Response(req, options) {
    options = options || {};
    this.req = req;
    this.xhr = this.req.xhr;
    // responseText is accessible only if responseType is '' or 'text' and on older browsers
    this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
       ? this.xhr.responseText
       : null;
    this.statusText = this.req.xhr.statusText;
    this.setStatusProperties(this.xhr.status);
    this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
    // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
    // getResponseHeader still works. so we get content-type even if getting
    // other headers fails.
    this.header['content-type'] = this.xhr.getResponseHeader('content-type');
    this.setHeaderProperties(this.header);
    this.body = this.req.method != 'HEAD'
      ? this.parseBody(this.text ? this.text : this.xhr.response)
      : null;
  }
  
  /**
   * Get case-insensitive `field` value.
   *
   * @param {String} field
   * @return {String}
   * @api public
   */
  
  Response.prototype.get = function(field){
    return this.header[field.toLowerCase()];
  };
  
  /**
   * Set header related properties:
   *
   *   - `.type` the content type without params
   *
   * A response of "Content-Type: text/plain; charset=utf-8"
   * will provide you with a `.type` of "text/plain".
   *
   * @param {Object} header
   * @api private
   */
  
  Response.prototype.setHeaderProperties = function(header){
    // content-type
    var ct = this.header['content-type'] || '';
    this.type = type(ct);
  
    // params
    var obj = params(ct);
    for (var key in obj) this[key] = obj[key];
  };
  
  /**
   * Parse the given body `str`.
   *
   * Used for auto-parsing of bodies. Parsers
   * are defined on the `superagent.parse` object.
   *
   * @param {String} str
   * @return {Mixed}
   * @api private
   */
  
  Response.prototype.parseBody = function(str){
    var parse = request.parse[this.type];
    return parse && str && (str.length || str instanceof Object)
      ? parse(str)
      : null;
  };
  
  /**
   * Set flags such as `.ok` based on `status`.
   *
   * For example a 2xx response will give you a `.ok` of __true__
   * whereas 5xx will be __false__ and `.error` will be __true__. The
   * `.clientError` and `.serverError` are also available to be more
   * specific, and `.statusType` is the class of error ranging from 1..5
   * sometimes useful for mapping respond colors etc.
   *
   * "sugar" properties are also defined for common cases. Currently providing:
   *
   *   - .noContent
   *   - .badRequest
   *   - .unauthorized
   *   - .notAcceptable
   *   - .notFound
   *
   * @param {Number} status
   * @api private
   */
  
  Response.prototype.setStatusProperties = function(status){
    // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
    if (status === 1223) {
      status = 204;
    }
  
    var type = status / 100 | 0;
  
    // status / class
    this.status = status;
    this.statusType = type;
  
    // basics
    this.info = 1 == type;
    this.ok = 2 == type;
    this.clientError = 4 == type;
    this.serverError = 5 == type;
    this.error = (4 == type || 5 == type)
      ? this.toError()
      : false;
  
    // sugar
    this.accepted = 202 == status;
    this.noContent = 204 == status;
    this.badRequest = 400 == status;
    this.unauthorized = 401 == status;
    this.notAcceptable = 406 == status;
    this.notFound = 404 == status;
    this.forbidden = 403 == status;
  };
  
  /**
   * Return an `Error` representative of this response.
   *
   * @return {Error}
   * @api public
   */
  
  Response.prototype.toError = function(){
    var req = this.req;
    var method = req.method;
    var url = req.url;
  
    var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
    var err = new Error(msg);
    err.status = this.status;
    err.method = method;
    err.url = url;
  
    return err;
  };
  
  /**
   * Expose `Response`.
   */
  
  request.Response = Response;
  
  /**
   * Initialize a new `Request` with the given `method` and `url`.
   *
   * @param {String} method
   * @param {String} url
   * @api public
   */
  
  function Request(method, url) {
    var self = this;
    Emitter.call(this);
    this._query = this._query || [];
    this.method = method;
    this.url = url;
    this.header = {};
    this._header = {};
    this.on('end', function(){
      var err = null;
      var res = null;
  
      try {
        res = new Response(self);
      } catch(e) {
        err = new Error('Parser is unable to parse the response');
        err.parse = true;
        err.original = e;
        return self.callback(err);
      }
  
      self.emit('response', res);
  
      if (err) {
        return self.callback(err, res);
      }
  
      if (res.status >= 200 && res.status < 300) {
        return self.callback(err, res);
      }
  
      var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
      new_err.original = err;
      new_err.response = res;
      new_err.status = res.status;
  
      self.callback(err || new_err, res);
    });
  }
  
  /**
   * Mixin `Emitter`.
   */
  
  Emitter(Request.prototype);
  
  /**
   * Allow for extension
   */
  
  Request.prototype.use = function(fn) {
    fn(this);
    return this;
  }
  
  /**
   * Set timeout to `ms`.
   *
   * @param {Number} ms
   * @return {Request} for chaining
   * @api public
   */
  
  Request.prototype.timeout = function(ms){
    this._timeout = ms;
    return this;
  };
  
  /**
   * Clear previous timeout.
   *
   * @return {Request} for chaining
   * @api public
   */
  
  Request.prototype.clearTimeout = function(){
    this._timeout = 0;
    clearTimeout(this._timer);
    return this;
  };
  
  /**
   * Abort the request, and clear potential timeout.
   *
   * @return {Request}
   * @api public
   */
  
  Request.prototype.abort = function(){
    if (this.aborted) return;
    this.aborted = true;
    this.xhr.abort();
    this.clearTimeout();
    this.emit('abort');
    return this;
  };
  
  /**
   * Set header `field` to `val`, or multiple fields with one object.
   *
   * Examples:
   *
   *      req.get('/')
   *        .set('Accept', 'application/json')
   *        .set('X-API-Key', 'foobar')
   *        .end(callback);
   *
   *      req.get('/')
   *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
   *        .end(callback);
   *
   * @param {String|Object} field
   * @param {String} val
   * @return {Request} for chaining
   * @api public
   */
  
  Request.prototype.set = function(field, val){
    if (isObject(field)) {
      for (var key in field) {
        this.set(key, field[key]);
      }
      return this;
    }
    this._header[field.toLowerCase()] = val;
    this.header[field] = val;
    return this;
  };
  
  /**
   * Remove header `field`.
   *
   * Example:
   *
   *      req.get('/')
   *        .unset('User-Agent')
   *        .end(callback);
   *
   * @param {String} field
   * @return {Request} for chaining
   * @api public
   */
  
  Request.prototype.unset = function(field){
    delete this._header[field.toLowerCase()];
    delete this.header[field];
    return this;
  };
  
  /**
   * Get case-insensitive header `field` value.
   *
   * @param {String} field
   * @return {String}
   * @api private
   */
  
  Request.prototype.getHeader = function(field){
    return this._header[field.toLowerCase()];
  };
  
  /**
   * Set Content-Type to `type`, mapping values from `request.types`.
   *
   * Examples:
   *
   *      superagent.types.xml = 'application/xml';
   *
   *      request.post('/')
   *        .type('xml')
   *        .send(xmlstring)
   *        .end(callback);
   *
   *      request.post('/')
   *        .type('application/xml')
   *        .send(xmlstring)
   *        .end(callback);
   *
   * @param {String} type
   * @return {Request} for chaining
   * @api public
   */
  
  Request.prototype.type = function(type){
    this.set('Content-Type', request.types[type] || type);
    return this;
  };
  
  /**
   * Set Accept to `type`, mapping values from `request.types`.
   *
   * Examples:
   *
   *      superagent.types.json = 'application/json';
   *
   *      request.get('/agent')
   *        .accept('json')
   *        .end(callback);
   *
   *      request.get('/agent')
   *        .accept('application/json')
   *        .end(callback);
   *
   * @param {String} accept
   * @return {Request} for chaining
   * @api public
   */
  
  Request.prototype.accept = function(type){
    this.set('Accept', request.types[type] || type);
    return this;
  };
  
  /**
   * Set Authorization field value with `user` and `pass`.
   *
   * @param {String} user
   * @param {String} pass
   * @return {Request} for chaining
   * @api public
   */
  
  Request.prototype.auth = function(user, pass){
    var str = btoa(user + ':' + pass);
    this.set('Authorization', 'Basic ' + str);
    return this;
  };
  
  /**
  * Add query-string `val`.
  *
  * Examples:
  *
  *   request.get('/shoes')
  *     .query('size=10')
  *     .query({ color: 'blue' })
  *
  * @param {Object|String} val
  * @return {Request} for chaining
  * @api public
  */
  
  Request.prototype.query = function(val){
    if ('string' != typeof val) val = serialize(val);
    if (val) this._query.push(val);
    return this;
  };
  
  /**
   * Write the field `name` and `val` for "multipart/form-data"
   * request bodies.
   *
   * ``` js
   * request.post('/upload')
   *   .field('foo', 'bar')
   *   .end(callback);
   * ```
   *
   * @param {String} name
   * @param {String|Blob|File} val
   * @return {Request} for chaining
   * @api public
   */
  
  Request.prototype.field = function(name, val){
    if (!this._formData) this._formData = new root.FormData();
    this._formData.append(name, val);
    return this;
  };
  
  /**
   * Queue the given `file` as an attachment to the specified `field`,
   * with optional `filename`.
   *
   * ``` js
   * request.post('/upload')
   *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
   *   .end(callback);
   * ```
   *
   * @param {String} field
   * @param {Blob|File} file
   * @param {String} filename
   * @return {Request} for chaining
   * @api public
   */
  
  Request.prototype.attach = function(field, file, filename){
    if (!this._formData) this._formData = new root.FormData();
    this._formData.append(field, file, filename);
    return this;
  };
  
  /**
   * Send `data`, defaulting the `.type()` to "json" when
   * an object is given.
   *
   * Examples:
   *
   *       // querystring
   *       request.get('/search')
   *         .end(callback)
   *
   *       // multiple data "writes"
   *       request.get('/search')
   *         .send({ search: 'query' })
   *         .send({ range: '1..5' })
   *         .send({ order: 'desc' })
   *         .end(callback)
   *
   *       // manual json
   *       request.post('/user')
   *         .type('json')
   *         .send('{"name":"tj"})
   *         .end(callback)
   *
   *       // auto json
   *       request.post('/user')
   *         .send({ name: 'tj' })
   *         .end(callback)
   *
   *       // manual x-www-form-urlencoded
   *       request.post('/user')
   *         .type('form')
   *         .send('name=tj')
   *         .end(callback)
   *
   *       // auto x-www-form-urlencoded
   *       request.post('/user')
   *         .type('form')
   *         .send({ name: 'tj' })
   *         .end(callback)
   *
   *       // defaults to x-www-form-urlencoded
    *      request.post('/user')
    *        .send('name=tobi')
    *        .send('species=ferret')
    *        .end(callback)
   *
   * @param {String|Object} data
   * @return {Request} for chaining
   * @api public
   */
  
  Request.prototype.send = function(data){
    var obj = isObject(data);
    var type = this.getHeader('Content-Type');
  
    // merge
    if (obj && isObject(this._data)) {
      for (var key in data) {
        this._data[key] = data[key];
      }
    } else if ('string' == typeof data) {
      if (!type) this.type('form');
      type = this.getHeader('Content-Type');
      if ('application/x-www-form-urlencoded' == type) {
        this._data = this._data
          ? this._data + '&' + data
          : data;
      } else {
        this._data = (this._data || '') + data;
      }
    } else {
      this._data = data;
    }
  
    if (!obj || isHost(data)) return this;
    if (!type) this.type('json');
    return this;
  };
  
  /**
   * Invoke the callback with `err` and `res`
   * and handle arity check.
   *
   * @param {Error} err
   * @param {Response} res
   * @api private
   */
  
  Request.prototype.callback = function(err, res){
    var fn = this._callback;
    this.clearTimeout();
    fn(err, res);
  };
  
  /**
   * Invoke callback with x-domain error.
   *
   * @api private
   */
  
  Request.prototype.crossDomainError = function(){
    var err = new Error('Origin is not allowed by Access-Control-Allow-Origin');
    err.crossDomain = true;
    this.callback(err);
  };
  
  /**
   * Invoke callback with timeout error.
   *
   * @api private
   */
  
  Request.prototype.timeoutError = function(){
    var timeout = this._timeout;
    var err = new Error('timeout of ' + timeout + 'ms exceeded');
    err.timeout = timeout;
    this.callback(err);
  };
  
  /**
   * Enable transmission of cookies with x-domain requests.
   *
   * Note that for this to work the origin must not be
   * using "Access-Control-Allow-Origin" with a wildcard,
   * and also must set "Access-Control-Allow-Credentials"
   * to "true".
   *
   * @api public
   */
  
  Request.prototype.withCredentials = function(){
    this._withCredentials = true;
    return this;
  };
  
  /**
   * Initiate request, invoking callback `fn(res)`
   * with an instanceof `Response`.
   *
   * @param {Function} fn
   * @return {Request} for chaining
   * @api public
   */
  
  Request.prototype.end = function(fn){
    var self = this;
    var xhr = this.xhr = request.getXHR();
    var query = this._query.join('&');
    var timeout = this._timeout;
    var data = this._formData || this._data;
  
    // store callback
    this._callback = fn || noop;
  
    // state change
    xhr.onreadystatechange = function(){
      if (4 != xhr.readyState) return;
  
      // In IE9, reads to any property (e.g. status) off of an aborted XHR will
      // result in the error "Could not complete the operation due to error c00c023f"
      var status;
      try { status = xhr.status } catch(e) { status = 0; }
  
      if (0 == status) {
        if (self.timedout) return self.timeoutError();
        if (self.aborted) return;
        return self.crossDomainError();
      }
      self.emit('end');
    };
  
    // progress
    var handleProgress = function(e){
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }
      self.emit('progress', e);
    };
    if (this.hasListeners('progress')) {
      xhr.onprogress = handleProgress;
    }
    try {
      if (xhr.upload && this.hasListeners('progress')) {
        xhr.upload.onprogress = handleProgress;
      }
    } catch(e) {
      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  
    // timeout
    if (timeout && !this._timer) {
      this._timer = setTimeout(function(){
        self.timedout = true;
        self.abort();
      }, timeout);
    }
  
    // querystring
    if (query) {
      query = request.serializeObject(query);
      this.url += ~this.url.indexOf('?')
        ? '&' + query
        : '?' + query;
    }
  
    // initiate request
    xhr.open(this.method, this.url, true);
  
    // CORS
    if (this._withCredentials) xhr.withCredentials = true;
  
    // body
    if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
      // serialize stuff
      var serialize = request.serialize[this.getHeader('Content-Type')];
      if (serialize) data = serialize(data);
    }
  
    // set header fields
    for (var field in this.header) {
      if (null == this.header[field]) continue;
      xhr.setRequestHeader(field, this.header[field]);
    }
  
    // send stuff
    this.emit('request', this);
    xhr.send(data);
    return this;
  };
  
  /**
   * Expose `Request`.
   */
  
  request.Request = Request;
  
  /**
   * Issue a request:
   *
   * Examples:
   *
   *    request('GET', '/users').end(callback)
   *    request('/users').end(callback)
   *    request('/users', callback)
   *
   * @param {String} method
   * @param {String|Function} url or callback
   * @return {Request}
   * @api public
   */
  
  function request(method, url) {
    // callback
    if ('function' == typeof url) {
      return new Request('GET', method).end(url);
    }
  
    // url first
    if (1 == arguments.length) {
      return new Request('GET', method);
    }
  
    return new Request(method, url);
  }
  
  /**
   * GET `url` with optional callback `fn(res)`.
   *
   * @param {String} url
   * @param {Mixed|Function} data or fn
   * @param {Function} fn
   * @return {Request}
   * @api public
   */
  
  request.get = function(url, data, fn){
    var req = request('GET', url);
    if ('function' == typeof data) fn = data, data = null;
    if (data) req.query(data);
    if (fn) req.end(fn);
    return req;
  };
  
  /**
   * HEAD `url` with optional callback `fn(res)`.
   *
   * @param {String} url
   * @param {Mixed|Function} data or fn
   * @param {Function} fn
   * @return {Request}
   * @api public
   */
  
  request.head = function(url, data, fn){
    var req = request('HEAD', url);
    if ('function' == typeof data) fn = data, data = null;
    if (data) req.send(data);
    if (fn) req.end(fn);
    return req;
  };
  
  /**
   * DELETE `url` with optional callback `fn(res)`.
   *
   * @param {String} url
   * @param {Function} fn
   * @return {Request}
   * @api public
   */
  
  request.del = function(url, fn){
    var req = request('DELETE', url);
    if (fn) req.end(fn);
    return req;
  };
  
  /**
   * PATCH `url` with optional `data` and callback `fn(res)`.
   *
   * @param {String} url
   * @param {Mixed} data
   * @param {Function} fn
   * @return {Request}
   * @api public
   */
  
  request.patch = function(url, data, fn){
    var req = request('PATCH', url);
    if ('function' == typeof data) fn = data, data = null;
    if (data) req.send(data);
    if (fn) req.end(fn);
    return req;
  };
  
  /**
   * POST `url` with optional `data` and callback `fn(res)`.
   *
   * @param {String} url
   * @param {Mixed} data
   * @param {Function} fn
   * @return {Request}
   * @api public
   */
  
  request.post = function(url, data, fn){
    var req = request('POST', url);
    if ('function' == typeof data) fn = data, data = null;
    if (data) req.send(data);
    if (fn) req.end(fn);
    return req;
  };
  
  /**
   * PUT `url` with optional `data` and callback `fn(res)`.
   *
   * @param {String} url
   * @param {Mixed|Function} data or fn
   * @param {Function} fn
   * @return {Request}
   * @api public
   */
  
  request.put = function(url, data, fn){
    var req = request('PUT', url);
    if ('function' == typeof data) fn = data, data = null;
    if (data) req.send(data);
    if (fn) req.end(fn);
    return req;
  };
  
  /**
   * Expose `request`.
   */
  
  module.exports = request;


/***/ },
/* 299 */
/***/ function(module, exports) {

  
  /**
   * Expose `Emitter`.
   */
  
  module.exports = Emitter;
  
  /**
   * Initialize a new `Emitter`.
   *
   * @api public
   */
  
  function Emitter(obj) {
    if (obj) return mixin(obj);
  };
  
  /**
   * Mixin the emitter properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */
  
  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }
    return obj;
  }
  
  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */
  
  Emitter.prototype.on =
  Emitter.prototype.addEventListener = function(event, fn){
    this._callbacks = this._callbacks || {};
    (this._callbacks[event] = this._callbacks[event] || [])
      .push(fn);
    return this;
  };
  
  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */
  
  Emitter.prototype.once = function(event, fn){
    var self = this;
    this._callbacks = this._callbacks || {};
  
    function on() {
      self.off(event, on);
      fn.apply(this, arguments);
    }
  
    on.fn = fn;
    this.on(event, on);
    return this;
  };
  
  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */
  
  Emitter.prototype.off =
  Emitter.prototype.removeListener =
  Emitter.prototype.removeAllListeners =
  Emitter.prototype.removeEventListener = function(event, fn){
    this._callbacks = this._callbacks || {};
  
    // all
    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    }
  
    // specific event
    var callbacks = this._callbacks[event];
    if (!callbacks) return this;
  
    // remove all handlers
    if (1 == arguments.length) {
      delete this._callbacks[event];
      return this;
    }
  
    // remove specific handler
    var cb;
    for (var i = 0; i < callbacks.length; i++) {
      cb = callbacks[i];
      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    }
    return this;
  };
  
  /**
   * Emit `event` with the given args.
   *
   * @param {String} event
   * @param {Mixed} ...
   * @return {Emitter}
   */
  
  Emitter.prototype.emit = function(event){
    this._callbacks = this._callbacks || {};
    var args = [].slice.call(arguments, 1)
      , callbacks = this._callbacks[event];
  
    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }
  
    return this;
  };
  
  /**
   * Return array of callbacks for `event`.
   *
   * @param {String} event
   * @return {Array}
   * @api public
   */
  
  Emitter.prototype.listeners = function(event){
    this._callbacks = this._callbacks || {};
    return this._callbacks[event] || [];
  };
  
  /**
   * Check if this emitter has `event` handlers.
   *
   * @param {String} event
   * @return {Boolean}
   * @api public
   */
  
  Emitter.prototype.hasListeners = function(event){
    return !! this.listeners(event).length;
  };


/***/ },
/* 300 */
/***/ function(module, exports) {

  
  /**
   * Reduce `arr` with `fn`.
   *
   * @param {Array} arr
   * @param {Function} fn
   * @param {Mixed} initial
   *
   * TODO: combatible error handling?
   */
  
  module.exports = function(arr, fn, initial){  
    var idx = 0;
    var len = arr.length;
    var curr = arguments.length == 3
      ? initial
      : arr[idx++];
  
    while (idx < len) {
      curr = fn.call(null, curr, arr[idx], ++idx, arr);
    }
    
    return curr;
  };

/***/ },
/* 301 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACrRJREFUeNqcWAlQlFcSnosBhmFmBAaVG0RAEBQVUUh2jRKjiKJGEfFE8YisGkw066rrmd2o5bWaaIyaQuMRo/EAiRG8SojxwAMFEQWEkUMYkBlmmHtmu//9f+rtXzhFQlXXPN7r192vX/fX/X4+x/4fF4gHxAcSADnQvwJ6jksThxhz6TU+zU/u4RH8dv/43TCKMUhIkyP9y2cZx+Z3ZPGTh/nThpFKGOFOBAlp5Xyaj+1Vht+Z4O/KMNu7DBPYMZoxDJU4i739xe/96+BIB1epXFtf+7p4x9p7quoKLayZgUxAFuKw1PVJA0NcBn+2JcbFy8/H1K5qLvzHwmuauhoNbRwaZaWpS8+8y5NC+rSiPhPSfOM2f3NY4OwSzjBYLea3bRWlh36dl3hc39JkJBTwnNw9hR8dyZshC4nI4PEFPZg9Zp227Pb6pRkvzx+rhX87gPRARuJQdq+SuUZHmkSjD+duAk9Flh/fn1mweNJ2LpdbiB6UBvSdEzZ94QhQ+Kz58V30mnP47L/1HbX/7D5xb9/xHU0N1yt+PPTV1cwp2/lCx0J59LCpntGx3qVHdl+ljbHSHrd1x2Nc2lsYHyJZnzC3iZce33n7/En2heQhh0nXx67dNThk6ryNPAcHSVn23i04Fz5n6VqryaSu+OnI+jtbsorJ0JiY82C+rG/EnPPjBsS2VZa30l7T0V6zsePILkyEpMwP4PJ4opbShw/p0xlpMoHikivzxy0ztLUqIuYu34iEY5zDNTr2GH4zePUhygpJyQgkEof7rgB/l2GUcc4ePakY0b6pa6dPxQQtrgve3C/Uvzjz/UUun++I9PzHQxdwjk4cLs1L7etobkQZHGcPTxlhFPePZGUnSJp1HdSEk8xdyuKnsi8wMcU/Iv3TJR3NDdU4GZnxWWbbizJFdd5pDWEcpctR5ib53yHr9SwctOsxNspT+NV4v7ANFx1lPXrDjwtJrj4BkrhNX6+2mk3G/PlJ+5BwjHO4xuIXOcncUAZHWXJPQwC2oKtr5XWB2gw4Ur/VOafUoKxd7BOIUOEKJIPrlQeNnx764eFLWUKJzKfl6YPf+89fEYWEY5zDNeRBXtwDJBF7B/RDWbX5Fzro5HJkVYZOe9i1jTmFC22EBLBLOqWgfJfAWSTVKZsUzp69Ah1EYo/ulhaMLVOHRqlraqyG2PKF0FCdSQjLAohRwZoaCONOSyQJwoiFSxRYIVFyRKGpC/qGz14629UvKAEwCE/M6XhT97JdUV1lUL1V+Y1Mmqypr31y64t5Bw1tLUZNvQKFc8Revi6OMnfh+1uPLBR7+UXWXsv92VHaQ+rqGxgk6ukdjDwWo6GtvbaqoOzo3qPPT333ggBbBnDNfFZtE/mOTPIceyx/U9C4aeuEUpl/e01lUX1RQUGP0MiYF2ezT9/4NC0/In35MGd5T+9bK9O3wVqzvqXZaDUarEgwNkHZ0amrKyoCk1ISTJr2lkupfzkFRurlA2OHVOWc3A8HbZcEBI/0Gzl+Zmhqhr/61csHwG8is55PFFrR8PV7Bw/+/MtsBxfXUOWT4oNXP5m85eGeDYU1V87VAKK/J5L3loC3GsJnZabX3bpy9uHeTQ/wSoOSUv1j1+xIDJ40K8pqNmveVjxVq2tedsijYmy9Y0ckqaqe3wtJmTcSMMycOyV+D1SQm4pruWfcw6PbwMBJAWM+ngSyH72++UszAUdUYHoHjJ0ydM4znXLmo7fPgifOGgtz0UCDEOCBRo0+fCl7brnBlHKzqhR4Wpzc5HNhPjV62fptc5/pTekVJhsSjqOXb9iOa3Clc4C3GffgXpSBsmiZKDsadaFO1I02oC1oUyc8DMxcm8Ll8lxv/zNzJRTZRhq19XTJ0BXvWJPDsdksLr19wxVXc87oW5sxLmxhMxanArB24huOw9IWTcM1iD0d8P6Me2CvtXjXulxGHi3bhLpQJ+pGGxj46ExPoavE12LQ11VePNFM9EpWJktayh6pda1NL9C4h3s3/8bUNiG0Qew0JOZsFC/swb0AJSpGHlEROKgTdYMNPky28xgDdMo3pQAJ/tA/hbDQn8pav4RkL5FHr36AMPyhq7ePZjBH19xYzTZM19TAzPEoXtgDe8NQRhetOQd1om6woYyJLx7T6EHanwVsqQSQ3Dl8w76BdLZSHQb+Ri74PBnA0QCB/ZtXfEKyrG84lihO8c51P9CYxPRcquLd64+hUuQB3gm4B/o3Q9SiVcmkTNSBulAn6kYb6BBCmygmdyC/kKnp8TOKlXcgiC0pNypz+s1ckobBCnGTjEE84dzdm5DyWRCohqSfin7FAEeC8jMfWqDdSDhm5pEHeXEP7gUZSpSFMlE26kBdoPMu6kYbaFtEXKIkUJABqC5KPHkjHU67gCdwkEJ3Wgqg+gqEJwF07Hz09ZdlCQfOjfX9YNzE2xuXris/8W0l09SS9RcayCDwxhYA2HMAO5cHZq4Jh2xd0fzoTi6AbQB0uRFwAyoo+N/lTR/xPVSHDrKr5RL3TT46RNKgUI+Yv2+b4B4RPQbioz/GCQjSQxzUAIi+cQ8fGG9QtdaVnzx4wmY2WyFLNVQX4iYXcwUCHhiW5ih184GkKXRyl/eEmukPB3XCROhQNj6F/u7yva9WXQCMayEMMjBlqat3oJC+XglNrqlFit0AjkLoOp9AS+0PWecpcBF7QD/vZK9IQlzpzVqN0tiuaoJqUAPdcKTNajWcivfNIuqkmjbMSDxqLAI6Ky2sVwuPKejQKTiBF/q8KS46/cvMUSfIKxtzND+t97ARsxQ38k7XFlwsx0m/hAlhviMSUxp+v3Hs8uwP/49/7PFr03sOipsGMk1GdZueqI962ihGv43HwiymdTYwG+CFJMPOFAp4BX06FU3qgkUTj2sbX5d4xyeMh67BZtJqbDjGufyMpB/Y/PDse46yoB6LCB3M9ZlJbOOxHp82AgApIz0iB1NdJ7Q8DTRiM0GqgxTXQWBvA3BUx23clxm/+ZtMHFNzRoOOza9vVaIMjnzAUAn76gj9dnv+TgO5PD715oOs0RKIbaGFmiCIW0sObj/gIJZ4IOEY51gPYWoPyNBRlUEs4bPRv7s9P7PBqm1QoBKOxC/Ig04Q8jFigRbIa8Anq5dY9DqKD8fQ/rx+emRXC6s75tEyOLRMK9lJdPeV1FknS77dVg3Z1SYfEBtHwgqkvhCCeVLMqq3/sVnM2qK1i1cUrlmUBWPNkJX/3oNryEO2zh5RQ4ejLJBZxbrCbnmMTASzSdtu0NYrzgMozgBlNVCIK9z6DQj2iBryMYBxCAR63lV4nQNeUc8pVeWz9FEHzq3sFfP+F2n3myYrS+6faX32+KV7/0Eh4LGp7a9fHQeZTLC/8zrtfbtwYL7YyIL7uY3JvrLVWd4rkfkgYlS9vVt/+9qh68tSi4iM6vwY88Gek3FecaMyhNIescweKPh5+YuSV8PhlGTr09W3C66ddyX5SYnqcqEI+8mCwz0V1/Nq4d3YQgS4mfW1h+kg8N3p7vPXj/wA4ZvgCmuJHs9A7LX9EcPYb0zyicUhIMXUlceIL4l8IqHITwx2r5LfnecXK+7I7xFGAo/MREBbWIaTfORB3gkX3THMShhFKjN1cWobq7SZCTLZA9Q/YxjbaxbWr81OZlu74LV2R+F/BRgA2E9xgXp3xzgAAAAASUVORK5CYII="

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map