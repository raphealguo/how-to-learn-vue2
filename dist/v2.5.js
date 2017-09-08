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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(1);

Object.keys(_util).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _util[key];
    }
  });
});

var _lang = __webpack_require__(24);

Object.keys(_lang).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _lang[key];
    }
  });
});

var _env = __webpack_require__(23);

Object.keys(_env).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _env[key];
    }
  });
});

var _debug = __webpack_require__(2);

Object.keys(_debug).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _debug[key];
    }
  });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports._toString = _toString;
exports.makeMap = makeMap;
exports.remove = remove;
exports.hasOwn = hasOwn;
exports.bind = bind;
exports.isObject = isObject;
exports.isPlainObject = isPlainObject;
exports.noop = noop;
/**
 * Convert a value to a string that is actually rendered.
 */
function _toString(val) {
  return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? JSON.stringify(val, null, 2) : String(val);
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}

/**
 * Remove an item from an array
 */
function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * Simple bind, faster than native
 */
function bind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn;
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject(obj) {
  return toString.call(obj) === OBJECT_STRING;
}

/**
 * Perform no operation.
 */
function noop() {}

/**
 * Always return false.
 */
var no = exports.no = function no() {
  return false;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warn = warn;
var hasConsole = typeof console !== 'undefined';

function warn(msg, vm) {
  if (hasConsole) {
    console.error('[Vue warn]: ' + msg + ' ');
  }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dep = __webpack_require__(7);

var _dep2 = _interopRequireDefault(_dep);

var _index = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uid = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
/*

  computed : {
    m: function(){
      return this.a + this.b
    },
    n: function(){
      return this.a + this.c
    },
    x: function(){
      return this.a + this.b + this.c
    }
  }

  DepA.subs = [WatcherM, WatcherN, WatcherX]
  DepB.subs = [WatcherM, WatcherX]
  DepC.subs = [WatcherN, WatcherX]

  WatcherM.deps = [DepA, DepB]
  WatcherN.deps = [DepA, DepC]
  WatcherX.deps = [DepA, DepB, DepC]
 */

var Watcher = function () {
  /*
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  lazy: boolean;
  dirty: boolean;
  active: boolean;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: Set;
  newDepIds: Set;
  getter: Function;
  value: any;
  */

  function Watcher(vm, expOrFn, cb, options) {
    _classCallCheck(this, Watcher);

    this.vm = vm;
    vm._watchers.push(this);
    // options
    // https://cn.vuejs.org/v2/api/#vm-watch-expOrFn-callback-options
    if (options) {
      this.deep = !!options.deep;
      this.lazy = !!options.lazy; //computed是
    } else {
      this.deep = this.lazy = false;
    }
    this.cb = cb;
    this.id = ++uid; // uid for batching
    this.active = true;
    this.dirty = this.lazy; // for lazy watchers

    // 在收集依赖的时候会使用 newDeps来收集。
    // 收集结束的时候会把newDeps覆盖到deps里
    this.deps = []; // WatcherM.deps = [DepA, DepB]
    this.newDeps = [];

    this.depIds = new _index._Set(); // 对应this.dep的所有id set，避免重复添加同个Dep
    this.newDepIds = new _index._Set();

    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      // vm.$watch("a.b", function(){ blabla; })
      // "a.b" 的上下文是在 vm对象上，所以需要parsePath返回一个getter函数，在调用getter的时候，上下文绑定vm即可： this.gette.call(vm)
      this.getter = (0, _index.parsePath)(expOrFn);
      if (!this.getter) {
        this.getter = function () {};
        (0, _index.warn)('Failed watching path: "' + expOrFn + '" ' + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
      }
    }

    this.value = this.lazy ? undefined : this.get();
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */


  _createClass(Watcher, [{
    key: 'get',
    value: function get() {
      //开始收集依赖
      (0, _dep.pushTarget)(this);
      var value = void 0;
      var vm = this.vm;
      value = this.getter.call(vm, vm);

      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value);
      }

      //结束收集依赖
      (0, _dep.popTarget)();

      // 在收集依赖的时候会使用 newDeps来收集。
      // 收集结束的时候会把newDeps覆盖到deps里
      this.cleanupDeps();
      return value;
    }

    /**
     * Add a dependency to this directive.
     */

  }, {
    key: 'addDep',
    value: function addDep(dep) {
      var id = dep.id;
      if (!this.newDepIds.has(id)) {
        this.newDepIds.add(id);
        this.newDeps.push(dep); // WatcherM.deps.push(DepA) // WatcherM.deps = [DepA, DepB]
        if (!this.depIds.has(id)) {
          dep.addSub(this); //  DepA.subs.push(WatcherM) // DepA.subs = [WatcherM, WatcherN, WatcherX]
        }
      }
    }

    /**
     * Clean up for dependency collection.
     */
    // 在收集依赖的时候会使用 newDeps来收集。
    // 收集结束的时候会把newDeps覆盖到deps里

  }, {
    key: 'cleanupDeps',
    value: function cleanupDeps() {
      var i = this.deps.length;
      while (i--) {
        // 把旧依赖处理好
        var dep = this.deps[i];
        if (!this.newDepIds.has(dep.id)) {
          dep.removeSub(this);
        }
      }
      // 把新依赖 newDeps 更新到 deps
      // newDeps 更新成初始状态，方便下次收集依赖
      var tmp = this.depIds;
      this.depIds = this.newDepIds;
      this.newDepIds = tmp;
      this.newDepIds.clear();
      tmp = this.deps;
      this.deps = this.newDeps;
      this.newDeps = tmp;
      this.newDeps.length = 0;
    }

    /**
     * Subscriber interface.
     * Will be called when a dependency changes.
     */

  }, {
    key: 'update',
    value: function update() {
      if (this.lazy) {
        this.dirty = true;
      } else {
        this.run();
      }
    }

    /**
     * Scheduler job interface.
     * Will be called by the scheduler.
     */

  }, {
    key: 'run',
    value: function run() {
      if (this.active) {
        var value = this.get();
        if (value !== this.value || (0, _index.isObject)(value) || this.deep) {
          // set new value
          var oldValue = this.value;
          this.value = value;
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }

    /**
     * Evaluate the value of the watcher.
     * This only gets called for lazy watchers.
     */

  }, {
    key: 'evaluate',
    value: function evaluate() {
      this.value = this.get();
      this.dirty = false;
    }

    /**
     * Depend on all deps collected by this watcher.
     */

  }, {
    key: 'depend',
    value: function depend() {
      var i = this.deps.length;
      while (i--) {
        this.deps[i].depend();
      }
    }

    /**
     * Remove self from all dependencies' subscriber list.
     */
    // 销毁watcher之后，把dep也从目标队列删掉

  }, {
    key: 'teardown',
    value: function teardown() {
      if (this.active) {
        var i = this.deps.length;
        while (i--) {
          this.deps[i].removeSub(this);
        }
        this.active = false;
      }
    }
  }]);

  return Watcher;
}();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */


exports.default = Watcher;
var seenObjects = new _index._Set();
function traverse(val) {
  // 目的是触发里边所有value的get操作，让外边收集依赖
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse(val, seen) {
  var i = void 0,
      keys = void 0;
  var isA = Array.isArray(val);
  if (!isA && !(0, _index.isObject)(val)) {
    // 只有数组和对象需要递归监听
    return;
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEmptyVNode = undefined;
exports.createElementVNode = createElementVNode;
exports.createTextVNode = createTextVNode;

var _index = __webpack_require__(28);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VNode = function VNode(tag, // 标签名
data, // data = { attrs: 属性key-val }
children, // 孩子 [VNode, VNode]
text, // 文本节点
elm // 对应的真实dom对象
) {
  _classCallCheck(this, VNode);

  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.key = data && data.key;
};

exports.default = VNode;
function createElementVNode(tag, data, children) {
  if (!tag) {
    return createEmptyVNode();
  }

  return new VNode(tag, data, (0, _index.simpleNormalizeChildren)(children), undefined, undefined);
}

var createEmptyVNode = exports.createEmptyVNode = function createEmptyVNode() {
  var node = new VNode();
  node.text = '';
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compile;

var _index = __webpack_require__(14);

var _debug = __webpack_require__(2);

var _util = __webpack_require__(1);

var _index2 = __webpack_require__(12);

function makeFunction(code, errors) {
  try {
    return new Function(code);
  } catch (err) {
    errors.push({ err: err, code: code });
    return _util.noop;
  }
}

function compile(template) {
  var ast = (0, _index.parse)(template.trim());
  var code = (0, _index2.generate)(ast);
  return {
    ast: ast,
    render: makeFunction(code.render)
  };
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.proxy = proxy;
exports.initState = initState;
exports.stateMixin = stateMixin;

var _watcher = __webpack_require__(3);

var _watcher2 = _interopRequireDefault(_watcher);

var _index = __webpack_require__(8);

var _index2 = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: _index2.noop,
  set: _index2.noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;

  if (opts.methods) initMethods(vm, opts.methods);

  if (opts.data) {
    initData(vm);
  } else {
    (0, _index.observe)(vm._data = {}, vm);
  }

  if (opts.computed) initComputed(vm, opts.computed);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = data || {}; // 把 data 所有属性代理到 vm._data 上

  if (!(0, _index2.isPlainObject)(data)) {
    data = {};
  }
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (!(0, _index2.isReserved)(keys[i])) {
      // vm._xx vm.$xxx 都是vm的内部/外部方法，所以不能代理到data上
      proxy(vm, '_data', keys[i]); // 把 vm.abc 代理到 vm._data.abc
    }
  }
  (0, _index.observe)(data, this);
}


function initComputed(vm, computed) {
  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;

    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    }
  }
}

function defineComputed(target, key, userDef) {
  if (typeof userDef === 'function') {
    // computed传入function的话，不可写
    sharedPropertyDefinition.get = function () {
      return userDef.call(target);
    };
    sharedPropertyDefinition.set = _index2.noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? userDef.get : _index2.noop;
    sharedPropertyDefinition.set = userDef.set ? userDef.set : _index2.noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initMethods(vm, methods) {
  for (var key in methods) {
    vm[key] = methods[key] == null ? _index2.noop : (0, _index2.bind)(methods[key], vm);
  }
}

function stateMixin(Vue) {
  Vue.prototype.$set = _index.set;
  Vue.prototype.$delete = _index.del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;
    options = options || {};
    options.user = true; // 标记用户主动监听的Watcher
    var watcher = new _watcher2.default(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn() {
      // 返回取消watch的接口
      watcher.teardown();
    };
  };
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* @flow */

exports.pushTarget = pushTarget;
exports.popTarget = popTarget;

var _watcher = __webpack_require__(3);

var _watcher2 = _interopRequireDefault(_watcher);

var _index = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
/*

  computed : {
    m: function(){
      return this.a + this.b
    },
    n: function(){
      return this.a + this.c
    },
    x: function(){
      return this.a + this.b + this.c
    }
  }

  DepA.subs = [WatcherM, WatcherN, WatcherX]
  DepB.subs = [WatcherM, WatcherX]
  DepC.subs = [WatcherN, WatcherX]

  WatcherM.deps = [DepA, DepB]
  WatcherN.deps = [DepA, DepC]
  WatcherX.deps = [DepA, DepB, DepC]

  当getA发生的时候，需要通过 depend 添加WatcherM/WatcherN/WatcherX的依赖deps, WatcherN.subs.push()
  当setA发生的时候，需要通过 notify 广播 DepA.subs，让他们通知对应的watcher
 */

var Dep = function () {
  /*
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;
  */

  function Dep() {
    _classCallCheck(this, Dep);

    this.id = uid++;
    this.subs = [];
  }

  _createClass(Dep, [{
    key: 'addSub',
    value: function addSub(sub) {
      this.subs.push(sub);
    }
  }, {
    key: 'removeSub',
    value: function removeSub(sub) {
      (0, _index.remove)(this.subs, sub);
    }
  }, {
    key: 'depend',
    value: function depend() {
      if (Dep.target) {
        Dep.target.addDep(this);
      }
    }
  }, {
    key: 'notify',
    value: function notify() {
      // 广播
      var subs = this.subs.slice();
      for (var i = 0, l = subs.length; i < l; i++) {
        subs[i].update();
      }
    }
  }]);

  return Dep;
}();

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.

// js是单线程，所以全局只会有一个watcher在被执行
// 在收集依赖的时候只需要维护一个全局的target堆栈即可


exports.default = Dep;
Dep.target = null;
var targetStack = [];

function pushTarget(_target) {
  if (Dep.target) targetStack.push(Dep.target);
  Dep.target = _target;
}

function popTarget() {
  Dep.target = targetStack.pop();
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.observe = observe;
exports.defineReactive = defineReactive;
exports.set = set;
exports.del = del;

var _dep = __webpack_require__(7);

var _dep2 = _interopRequireDefault(_dep);

var _array = __webpack_require__(22);

var _index = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var arrayKeys = Object.getOwnPropertyNames(_array.arrayMethods);

/*

  computed : {
    m: function(){
      return this.a + this.b
    },
    n: function(){
      return this.a + this.c
    },
    x: function(){
      return this.a + this.b + this.c
    }
  }

  DepA.subs = [WatcherM, WatcherN, WatcherX]
  DepB.subs = [WatcherM, WatcherX]
  DepC.subs = [WatcherN, WatcherX]

  WatcherM.deps = [DepA, DepB]
  WatcherN.deps = [DepA, DepC]
  WatcherX.deps = [DepA, DepB, DepC]

  当getA发生的时候，需要通过 depend 添加WatcherM/WatcherN/WatcherX的依赖deps, WatcherN.subs.push()
  当setA发生的时候，需要通过 notify 广播 DepA.subs，让他们通知对应的watcher

 */

var Observer = exports.Observer = function () {
  /*
  value: any;
  dep: Dep;
  */
  function Observer(value) {
    _classCallCheck(this, Observer);

    this.value = value;
    this.dep = new _dep2.default();
    (0, _index.def)(value, '__ob__', this); // 把当前Observer对象 绑定在value.__ob__上

    // 将value深度遍历，订阅里边所有值的get set
    if (Array.isArray(value)) {
      // 由于数组原生的push/shift等方法也是写操作
      // 需要在这里勾住
      var augment = _index.hasProto ? protoAugment : copyAugment;
      augment(value, _array.arrayMethods, arrayKeys);
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  /**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */


  _createClass(Observer, [{
    key: 'walk',
    value: function walk(obj) {
      var keys = Object.keys(obj);
      for (var i = 0; i < keys.length; i++) {
        defineReactive(obj, keys[i], obj[keys[i]]);
      }
    }

    /**
     * Observe a list of Array items.
     */

  }, {
    key: 'observeArray',
    value: function observeArray(items) {
      for (var i = 0, l = items.length; i < l; i++) {
        observe(items[i]);
      }
    }
  }]);

  return Observer;
}();

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */


function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    (0, _index.def)(target, key, src[key]);
  }
}

function observe(value) {
  if (!(0, _index.isObject)(value)) {
    return;
  }

  var ob = void 0;
  if ((0, _index.hasOwn)(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if ((Array.isArray(value) || (0, _index.isPlainObject)(value)) && !value._isVue // vm对象不作订阅
  ) {
      ob = new Observer(value);
    }

  return ob;
}

function defineReactive(obj, key, val) {
  var dep = new _dep2.default();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  /*
      m: function(){
      return this.a + this.b
    },
      当getA发生的时候，需要通过 depend 添加WatcherM/WatcherN/WatcherX的依赖deps, WatcherN.subs.push()
    当setA发生的时候，需要通过 notify 广播 DepA.subs，让他们通知对应的watcher
  */
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (_dep2.default.target) {
        // getA发生的时候，Dep.target == DepM
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return val;
    },
    set: function reactiveSetter(newVal) {
      var value = val;

      if (newVal === value) {
        return;
      }

      // console.log("newVal = ", newVal)
      val = newVal;

      childOb = observe(newVal);
      dep.notify();

      // vm._update at core/instance/index.js
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set(obj, key, val) {
  if (Array.isArray(obj)) {
    obj.length = Math.max(obj.length, key);
    obj.splice(key, 1, val);
    return val;
  }
  if ((0, _index.hasOwn)(obj, key)) {
    obj[key] = val;
    return;
  }
  var ob = obj.__ob__;
  if (!ob) {
    // 不是订阅对象，直接set了返回
    obj[key] = val;
    return;
  }
  // 递归订阅set进去的value
  // ob.value 可以认为就是 obj
  defineReactive(ob.value, key, val);

  // set操作要notify deps
  ob.dep.notify();
  return val;
}

/**
 * Delete a property and trigger change if necessary.
 */
function del(obj, key) {
  if (Array.isArray(obj)) {
    obj.splice(key, 1);
    return;
  }
  var ob = obj.__ob__;
  if (!(0, _index.hasOwn)(obj, key)) {
    return;
  }
  delete obj[key];
  if (!ob) {
    return;
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(value) {
  for (var e, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFalsyAttrValue = exports.mustUseProp = undefined;
exports.updateAttrs = updateAttrs;

var _util = __webpack_require__(1);

function updateAttrs(oldVnode, vnode) {
  if (!oldVnode.data.attrs && !vnode.data.attrs) {
    return;
  }
  var key = void 0,
      cur = void 0,
      old = void 0;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }

  for (key in oldAttrs) {
    if (attrs[key] == null) {
      elm.removeAttribute(key);
    }
  }
}

// attributes that should be using props for binding
// 需要用props来绑定的属性
var acceptValue = (0, _util.makeMap)('input,textarea,option,select');
var mustUseProp = exports.mustUseProp = function mustUseProp(tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isFalsyAttrValue = exports.isFalsyAttrValue = function isFalsyAttrValue(val) {
  return val == null || val === false;
};

function setAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    el.setAttribute(key, value);
  }
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(17);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _index3.initGlobalAPI)(_index2.default);

_index2.default.version = '2.2.0';

exports.default = _index2.default;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genHandlers = genHandlers;
// v-on:click="function(){}"
// v-on:click="() => {}"
var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;

// v-on:click="xxx" // xxx为vm的一个方法名字
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

//else : // v-on:click="console.log(xxx);xxxx;" // 要被包裹成 function($event) { console.log(xxx);xxxx; }

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

var genGuard = function genGuard(condition) {
  return 'if(' + condition + ')return null;';
};
// 生成的代码就变成
/*
  function ($event) {
    if ($event.target !== $event.currentTarget) return null;
    if ($event.keyCode !== 13) return null;
  }
*/

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard('$event.target !== $event.currentTarget'),
  ctrl: genGuard('!$event.ctrlKey'),
  shift: genGuard('!$event.shiftKey'),
  alt: genGuard('!$event.altKey'),
  meta: genGuard('!$event.metaKey'),
  left: genGuard('$event.button !== 0'),
  middle: genGuard('$event.button !== 1'),
  right: genGuard('$event.button !== 2')
};

function genHandlers(events) {
  var res = 'on:{';
  for (var name in events) {
    res += '"' + name + '":' + genHandler(name, events[name]) + ',';
  }
  return res.slice(0, -1) + '}';
}

// v-on:click="clickme"
// name='click'   handler="clickme"
function genHandler(name, handler) {
  if (!handler) {
    return 'function(){}';
  } else if (Array.isArray(handler)) {
    return '[' + handler.map(function (handler) {
      return genHandler(name, handler);
    }).join(',') + ']';
  } else if (!handler.modifiers) {
    // 没有修饰符的话  .stop .prevent .self
    //支持：v-on:click="removeTodo(todo)" 和 v-on:click="xx"
    return fnExpRE.test(handler.value) || simplePathRE.test(handler.value) ? handler.value : 'function($event){' + handler.value + '}';
  } else {
    var code = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        code += modifierCode[key];
      } else {
        keys.push(key);
      }
    }

    /* genKeyFilter(keys) 生成前缀判断条件:
        {
          if ($event.keyCode !== 13 && _k($event.keyCode,"enter", 13)) return null;
        }
    */
    if (keys.length) {
      code = genKeyFilter(keys) + code;
    }
    var handlerCode = simplePathRE.test(handler.value) ? handler.value + '($event)' // v-on:click="xxx" // 生成 xxx($event)
    : handler.value; // v-on:click="console.log(xxx);xxxx;"
    return 'function($event){' + code + handlerCode + '}';
  }
}

function genKeyFilter(keys) {
  return 'if(' + keys.map(genFilterCode).join('&&') + ')return null;';
}

function genFilterCode(key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    // v-on:keydown.10
    return '$event.keyCode!==' + keyVal;
  }
  // v-on:keydown.enter
  var alias = keyCodes[key];
  //
  return '_k($event.keyCode,' + JSON.stringify(key) + (alias ? ',' + JSON.stringify(alias) : '') + ')';
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generate = generate;

var _events = __webpack_require__(11);

var _index = __webpack_require__(5);

var _index2 = _interopRequireDefault(_index);

var _vnode = __webpack_require__(4);

var _vnode2 = _interopRequireDefault(_vnode);

var _debug = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  <div>
    <span name="test">abc{{a}}xxx{{b}}def</span>
    <div v-if="a">a</div>
    <div v-if="b">b</div>
    <ul>
      <li v-for="(item, index) in list">{{index}} : {{item}}</li>
    </ul>
    <button v-on:click="clickme">click me</button>
    <button v-on:click.stop="console.log(1)">click me</button>
    <button v-on:click.stop="clickme">click me</button>
    <button v-on:keydown.enter.10="click">click me</button>
  </div>

  生成函数：

  this == Vue实例 == vm

  function render() {
    with (this) {
      return _c('div', undefined, [
        _c('span', {
          attrs: { name : 'test' }
        }, [
          _v("abc" + _s(a) + "xxx" + _s(b) + "def")
        ]),

        // v-if 语句
        a ? _c('div', undefined, [ _v("a") ]) : _e(),
        b ? _c('div', undefined, [ _v("b") ]) : _e(),

        // v-for
        _c('ul',
          _l(
            (list),
            function(item, index) {
              return _c(
                'li',[ _v(_s(index)+" : "+_s(item)) ]
              )
            })
        )

        // v-click    clickme == vm["clickme"].bind(vm)
        _c('button', { on:{"click":clickme} }, [_v("click me")])

        // v-on:click.stop="console.log(1)"
        // click 需要产生一个闭包的handler，.stop等修饰符会作为这个handler的前置条件
        _c('button', { on:{"click": function($event){ $event.stopPropagation(); console.log(1) }}}, [_v("click me")])

        // v-on:click.stop="click"
        // 这种和上边例子的区别在于，click是一个vm的method名字，需要生成$event参数给他
        _c('button', { on:{"click": function($event){ $event.stopPropagation(); click($event) }}}, [_v("click me")])

        // v-on:keydown.enter.10="click"
        // 新增_k方法，用于判断
        _c('button',{on:{"keydown": function($event){
          if($event.keyCode!==10 &&_k($event.keyCode,"enter",13)) return null;
          click($event)
        }}},[_v("click me")])

      ])
    }
  }
*/
function generate(ast) {
  var code = ast ? genElement(ast) : '_c("div")';

  return {
    render: "with(this){return " + code + "}"
  };
}

function genElement(el) {
  if (el.for && !el.forProcessed) {
    // 为了v-for和v-if的优先级： <ul v-for="(item, index) in list" v-if="index==0">，需要先处理for语句
    return genFor(el);
  }if (el.if && !el.ifProcessed) {
    return genIf(el);
  } else {
    var code = void 0;
    var children = genChildren(el) || '[]';
    var data = genData(el);

    code = '_c(\'' + el.tag + '\'' + (',' + data // data
    ) + (children ? ',' + children : '' // children
    ) + ')';

    return code;
  }
}

function genIf(el) {
  el.ifProcessed = true; // 标记已经处理过当前这个if节点了，避免递归死循环
  return genIfConditions(el.ifConditions.slice());
}

function genIfConditions(conditions) {
  if (!conditions.length) {
    return '_e()';
  }

  var condition = conditions.shift(); // 因为我们并没有去真正删除 el.ifConditions 队列的元素，所以需要有el.ifProcessed = true来结束递归
  if (condition.exp) {
    return '(' + condition.exp + ')?' + genTernaryExp(condition.block) + ':' + genIfConditions(conditions);
  } else {
    return '' + genTernaryExp(condition.block);
  }

  function genTernaryExp(el) {
    return genElement(el);
  }
}

function genFor(el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ',' + el.iterator1 : '';
  var iterator2 = el.iterator2 ? ',' + el.iterator2 : '';

  if (!el.key) {
    // v-for 最好声明key属性
    (0, _debug.warn)('<' + el.tag + ' v-for="' + alias + ' in ' + exp + '">: component lists rendered with ' + 'v-for should have explicit keys. ' + 'See https://vuejs.org/guide/list.html#key for more info.', true /* tip */
    );
  }

  // v-for="(item, index) in list"
  // alias = item, iterator1 = index

  // v-for="(value, key, index) in object"
  // alias = value, iterator1 = key, iterator2 = index


  // _l(val, render)
  // val = list
  // render = function (alias, iterator1, iterator2) { return genElement(el) }
  el.forProcessed = true; // avoid recursion
  return '_l((' + exp + '),' + ('function(' + alias + iterator1 + iterator2 + '){') + ('return ' + genElement(el)) + '})';
}

function genData(el) {
  var data = '{';

  // key
  if (el.key) {
    data += 'key:' + el.key + ',';
  }
  if (el.attrs) {
    data += 'attrs:{' + genProps(el.attrs) + '},';
  }
  // DOM props
  if (el.props) {
    data += 'domProps:{' + genProps(el.props) + '},';
  }
  // event handlers
  if (el.events) {
    data += (0, _events.genHandlers)(el.events) + ',';
  }

  // class
  if (el.staticClass) {
    data += 'staticClass:' + el.staticClass + ',';
  }
  if (el.classBinding) {
    data += 'class:' + el.classBinding + ',';
  }

  data = data.replace(/,$/, '') + '}';

  return data;
}

function genChildren(el) {
  var children = el.children;
  if (children.length) {
    var _el = children[0];

    // 对v-for的情况做处理
    // _c('ul', undefined, [_l(xxx)])  需要把_l提出来外层
    // 还有一些复杂的情况：_c('ul', undefined, [_c('div'), _l(xxx), _c('div')]) 只能在_c里边处理
    if (children.length === 1 && _el.for) {
      return genElement(_el);
    }
    return '[' + children.map(genNode).join(',') + ']';
  }
}

function genNode(node) {
  if (node.type === 1) {
    return genElement(node);
  } else {
    return genText(node);
  }
}

function genText(text) {
  return '_v(' + (text.type === 2 ? text.expression // no need for () because already wrapped in _s()
  : JSON.stringify(text.text)) + ')';
}

function genProps(props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += '"' + prop.name + '":' + prop.value + ',';
  }
  return res.slice(0, -1); // 去掉尾巴的逗号
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNonPhrasingTag = exports.canBeLeftOpenTag = exports.isUnaryTag = undefined;
exports.parseHTML = parseHTML;

var _util = __webpack_require__(1);

var isUnaryTag = exports.isUnaryTag = (0, _util.makeMap)('area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' + 'link,meta,param,source,track,wbr', true);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = exports.canBeLeftOpenTag = (0, _util.makeMap)('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source', true);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = exports.isNonPhrasingTag = (0, _util.makeMap)('address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' + 'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' + 'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' + 'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' + 'title,tr,track', true);

var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
// attr value double quotes
/"([^"]*)"+/.source,
// attr value, single quotes
/'([^']*)'+/.source,
// attr value, no quotes
/([^\s"'=<>`]+)/.source];
var attribute = new RegExp('^\\s*' + singleAttrIdentifier.source + '(?:\\s*(' + singleAttrAssign.source + ')' + '\\s*(?:' + singleAttrValues.join('|') + '))?');

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isScriptOrStyle = (0, _util.makeMap)('script,style', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

// check whether current browser encodes a char inside attribute values
function shouldDecode(content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = '<div a="' + content + '">';
  return div.innerHTML.indexOf(encoded) > 0;
}

var shouldDecodeNewlines = shouldDecode('\n', '&#10;');

function decodeAttr(value) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) {
    return decodingMap[match];
  });
}

function parseHTML(html, options) {
  /*
    options = {
      chars:  解析到文本的回调
      start:  解析到标签起始的回调
      end:    解析到标签结束的回调
    }
  */
  var stack = [];
  var index = 0;
  var last = void 0,
      lastTag = void 0;

  // advance(N) 负责把当前指向html字符串的指针往后挪动N个位置
  while (html) {
    last = html;
    // 不在style/script标签里边
    if (!lastTag || !isScriptOrStyle(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // 注释
        if (comment.test(html)) {
          // 把指针挪到 "<!-- xxx -->" 后边的位置
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            advance(commentEnd + 3);
            continue;
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        // 条件注释
        if (conditionalComment.test(html)) {
          // 把指针挪到 "<![if expression]> xxx <![endif]>" 后边的位置
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue;
          }
        }

        // Doctype
        var doctypeMatch = html.match(doctype); // doctypeMatch = []
        if (doctypeMatch) {
          // 把指针挪到 "<!DOCTYPE xxxx>" 后边的位置
          advance(doctypeMatch[0].length);
          continue;
        }

        // 标签结束
        var endTagMatch = html.match(endTag); // endTagMatch = []
        if (endTagMatch) {
          // 把指针挪到 "</xxx>" 后边的位置
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index); // 处理一下堆栈信息，回调上层
          continue;
        }

        // 标签起始：<xxx attr="xx">
        var startTagMatch = parseStartTag(); // 处理：标签名字/属性  startTagMatch = { tagName, attrs, start, end, unarySlash }
        if (startTagMatch) {
          handleStartTag(startTagMatch); // 处理：堆栈信息/HTML容错，回调上层
          continue;
        }
      }

      // 到这里就是处理文本节点了。
      var text = void 0,
          _rest = void 0,
          next = void 0;
      if (textEnd >= 0) {
        // 如果之后的字符串还包含 '<' ， 那么把当前指针到textEnd位置的字符串生成文本节点，回调上层
        _rest = html.slice(textEnd);
        while (!endTag.test(_rest) && !startTagOpen.test(_rest) && !comment.test(_rest) && !conditionalComment.test(_rest)) {
          next = _rest.indexOf('<', 1);
          if (next < 0) break;
          textEnd += next;
          _rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        // 之后的字符串不包含 '<' ，那剩余整个字符串都是文本节点了
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      // lastTag 要么是 script style noscript
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var endTagLength = 0;
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (options.chars) {
          options.chars(text);
        }
        return '';
      });
      index += html.length - rest.length;
      html = rest;
      parseEndTag(stackedTag, index - endTagLength, index); // 闭合一下 script style noscript 标签
    }

    if (html === last) {
      // 如果处理完毕之后 字符串指针仍然没有挪动，那就把剩余字符串作为文本节点 跳出解析
      options.chars && options.chars(html);
      if (!stack.length && options.warn) {
        // 如果栈顶存在元素，说明没有闭合，给出warn
        options.warn('Mal-formatted tag at end of template: "' + html + '"');
      }
      break;
    }
  }

  // 把堆栈里边没闭合的标签闭合
  parseEndTag();

  function advance(n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag() {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);

      // 解析属性
      var end = void 0,
          attr = void 0;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match;
      }
    }
  }

  function handleStartTag(match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
      // p标签里边不允许嵌某些标签，如果遇到这种情况，p标签就提前闭合
      parseEndTag(lastTag);
    }
    if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
      // 像li这种可以可以忽略闭合标签，例如 <li>xx<li>abc</li> 等同于 <li>xx</li><li>abc</li>
      parseEndTag(tagName);
    }

    var unary = isUnaryTag(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash; // 单标签

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') {
          delete args[3];
        }
        if (args[4] === '') {
          delete args[4];
        }
        if (args[5] === '') {
          delete args[5];
        }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value)
      };
    }

    if (!unary) {
      // 不是单标签的话 就压入堆栈
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag(tagName, start, end) {
    var pos = void 0,
        lowerCasedTagName = void 0;
    if (start == null) start = index;
    if (end == null) end = index;

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    if (tagName) {
      // 从堆栈中找到和当前结束标签匹配的起始标签。
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break;
        }
      }
    } else {
      // 准备清理所有堆栈
      pos = 0;
    }

    if (pos >= 0) {
      // 把还没闭合的标签 全部闭合处理
      for (var i = stack.length - 1; i >= pos; i--) {
        if ((i > pos || !tagName) && options.warn) {
          // 存在没闭合标签，给出warn
          options.warn('tag <' + stack[i].tag + '> has no matching end tag.');
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      // 单独出现 </br> 标签 直接处理成 <br>
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      // 单独出现 </p> 标签 直接处理成 <p></p>
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    } else {
      // 如果找不到匹配的起始标签，那么就直接忽略此结束标签
    }
  }
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forIteratorRE = exports.forAliasRE = exports.dirRE = undefined;
exports.parse = parse;

var _htmlParser = __webpack_require__(13);

var _textParser = __webpack_require__(15);

var _debug = __webpack_require__(2);

var _attrs = __webpack_require__(9);

var dirRE = exports.dirRE = /^v-|^@|^:/;
var forAliasRE = exports.forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = exports.forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;
var bindRE = /^:|^v-bind:/;
var onRE = /^@|^v-on:/;
var modifierRE = /\.[^.]+/g;

function makeAttrsMap(attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    map[attrs[i].name] = attrs[i].value;
  }
  return map;
}

function decode(html) {
  var decoder = document.createElement('div');
  decoder.innerHTML = html;
  return decoder.textContent;
}

var isPreTag = function isPreTag(tag) {
  return tag === 'pre';
};

/**
 * 把HTML字符串转成AST结构
 * ast = { attrsList, attrsMap, children, parent, tag, type=1 } // 非文本节点
 * ast = { text, type=3 } // 文本节点
 *
 * 在AST树 ： if else-if else的多个token节点会合成一个节点，if节点里边包含 [{exp:'if判断条件', block:<if的ast节点>}, {exp:'else-if判断条件', block:<else-if的ast节点>, {block:<else的ast节点>}]
 */
function parse(template) {
  var stack = [];
  var root = void 0; // ast的根节点
  var currentParent = void 0; // 当前节点的父亲节点
  var inPre = false;

  function endPre(element) {
    if (isPreTag(element.tag)) {
      inPre = false;
    }
  }

  (0, _htmlParser.parseHTML)(template, {
    warn: _debug.warn,
    start: function start(tag, attrs, unary) {
      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };

      if (isPreTag(element.tag)) {
        inPre = true;
      }

      element.plain = !element.key && !attrs.length;

      processFor(element);
      processIf(element);
      processKey(element);

      processClass(element);
      processAttrs(element);

      if (!root) {
        root = element;
      } else if (!stack.length) {
        if (root.if && (element.elseif || element.else)) {
          // root = <div v-if=""></div><div v-else-if=""></div><div v-else></div>
          // 允许root是由if else-if else组织的多节点
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else {
          // 否则根节点只能有一个，给出warn
          (0, _debug.warn)('Component template should contain exactly one root element. ' + 'If you are using v-if on multiple elements, ' + 'use v-else-if to chain them instead.');
        }
      }
      if (currentParent) {
        if (element.elseif || element.else) {
          // 处理非root节点的 else-if else
          processIfConditions(element, currentParent);
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        // 如果不是单标签，就压入堆栈
        currentParent = element;
        stack.push(element);
      } else {
        // 闭合一下pre标签
        endPre(element);
      }
    },
    end: function end() {
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        // 把孩子节点中最后一个空白节点删掉
        element.children.pop();
      }

      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },
    chars: function chars(text) {
      if (!currentParent) {
        if (text === template) {
          // 传入的template不应该是纯文本节点
          (0, _debug.warn)('Component template requires a root element, rather than just text.');
        }
        return;
      }
      var children = currentParent.children;
      text = inPre || text.trim() ? decode(text) : children.length ? ' ' : ''; // 如果文本节点为多个空格，同时所在的父亲节点含有其他孩子节点，那么要生成一个单空格的文本节点
      if (text) {
        var expression = void 0;
        if (text !== ' ' && (expression = (0, _textParser.parseText)(text))) {
          // 表达式节点
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else {
          // 文本节点
          children.push({
            type: 3,
            text: text
          });
        }
      }
    }
  });
  return root;
}

function processKey(el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    el.key = exp;
  }
}

function processFor(el) {
  var exp = void 0;
  if (exp = getAndRemoveAttr(el, 'v-for')) {
    var inMatch = exp.match(forAliasRE);
    // v-for="item in list"             =>     ["item in list", "item", "list"]
    // v-for="(item, index) in list"    =>     ["(item, index) in list", "(item, index)", "list"]
    // v-for="(value, key, index) in object"    =>     ["(value, key, index) in object", "(value, key, index)", "object"]

    if (!inMatch) {
      // v-for语法有错误的时候，提示编译错误
      (0, _debug.warn)('Invalid v-for expression: ' + exp);
      return;
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      // v-for="(item, index) in list"  或者 // v-for="(value, key, index) in object"
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias; // alias = "item"
    }
  }
}

function processIf(el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

// v-else-if v-else要找到上一个if节点
// 把当前的表达式插入到
function processIfConditions(el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    //上个节点是if节点，把表达式插入到该节点的ifCondition队列去
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    // 找不到上一个if节点，需要报错
    (0, _debug.warn)('v-' + (el.elseif ? 'else-if="' + el.elseif + '"' : 'else') + ' ' + ('used on element <' + el.tag + '> without corresponding v-if.'));
  }
}

function findPrevElement(children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i];
    } else {
      if (children[i].text !== ' ') {
        // 在if和else几点中间不要有其他非空白的文本节点
        (0, _debug.warn)('text "' + children[i].text.trim() + '" between v-if and v-else(-if) ' + 'will be ignored.');
      }
      children.pop();
    }
  }
}

function addIfCondition(el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processClass(el) {
  var staticClass = getAndRemoveAttr(el, 'class');
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function processAttrs(el) {
  var list = el.attrsList;
  var i = void 0,
      l = void 0,
      name = void 0,
      value = void 0,
      modifiers = void 0;
  for (i = 0, l = list.length; i < l; i++) {
    name = list[i].name;
    value = list[i].value;

    if (dirRE.test(name)) {
      // v-xxx :xxx 开头的
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }

      if (bindRE.test(name)) {
        // :xxx 或者 v-bind:xxx
        name = name.replace(bindRE, '');

        if ((0, _attrs.mustUseProp)(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) {
        // v-on开头  v-on:click="xxxx"
        name = name.replace(onRE, ''); // name='click'  value="xxxx"
        addHandler(el, name, value, modifiers);
      }
    } else {
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function addProp(el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr(el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function getBindingAttr(el, name, getStatic) {
  var dynamicValue = getAndRemoveAttr(el, ':' + name);
  if (dynamicValue != null) {
    return dynamicValue;
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue);
    }
  }
}

function getAndRemoveAttr(el, name) {
  var val = void 0;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break;
      }
    }
  }
  return val;
}

function addHandler(el, name, value, modifiers) {
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }

  var events = void 0;
  events = el.events || (el.events = {});
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    handlers.push(newHandler);
  } else if (handlers) {
    events[name] = [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function parseModifiers(name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) {
      ret[m.slice(1)] = true;
    });
    return ret;
  }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseText = parseText;
var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;

function parseText(text) {
  // text = "abc{{a}}xxx{{b}}def"  ->   tokens = ["abc", _s(a)", "xx", "_s(b)", "def"]
  var tagRE = defaultTagRE;
  if (!tagRE.test(text)) {
    return;
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match = void 0,
      index = void 0;
  while (match = tagRE.exec(text)) {
    index = match.index;
    // push text token
    // push("abc")  push("xxx")
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    // push("_s(a)")  push("_s(b)")
    var exp = match[1].trim();
    tokens.push('_s(' + exp + ')');
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    // push("def")
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+');
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initGlobalAPI = initGlobalAPI;

var _index = __webpack_require__(0);

var _index2 = __webpack_require__(8);

function initGlobalAPI(Vue) {

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: _index.warn
  };

  Vue.set = _index2.set;
  Vue.delete = _index2.del;
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _init = __webpack_require__(18);

var _state = __webpack_require__(6);

var _render2 = __webpack_require__(21);

var _index = __webpack_require__(0);

var _watcher = __webpack_require__(3);

var _watcher2 = _interopRequireDefault(_watcher);

var _patch = __webpack_require__(31);

var _patch2 = _interopRequireDefault(_patch);

var _index2 = __webpack_require__(5);

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var idToTemplate = function idToTemplate(id) {
  var el = query(id);
  return el && el.innerHTML;
};

function Vue(options) {
  if (!(this instanceof Vue)) {
    (0, _index.warn)('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

(0, _init.initMixin)(Vue);
(0, _state.stateMixin)(Vue);
(0, _render2.renderMixin)(Vue);

Vue.prototype._update = function () {
  var vm = this;
  var vnode = vm._render();
  var prevVnode = vm._vnode;

  vm._vnode = vnode;

  if (!prevVnode) {
    (0, _patch2.default)(vm.$el, vnode);
  } else {
    (0, _patch2.default)(prevVnode, vnode);
  }
};

Vue.prototype.$mount = function (el) {
  // vm._vnode = document.getElementById(el)

  el = el ? query(el) : undefined;

  var vm = this;
  var options = vm.$options;
  var template = options.template;
  var _render = vm._render;
  if (!_render) {
    //还没有render时，要去编译模板
    if (template) {
      // 直接有字符串模板传进来
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          // template = "#id"
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (!template) {
            (0, _index.warn)('Template element not found or is empty: ' + options.template, this);
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        (0, _index.warn)('invalid template option:' + template, this);
        return this;
      }
    } else if (el) {
      // 从dom节点里边取
      template = getOuterHTML(el);
    }

    if (template) {
      var compiled = (0, _index3.default)(template);

      vm._render = function () {
        return compiled.render.call(vm);
      };
    }
  }

  options.template = template;
  return mountComponent(this, el);
};

/**
 * Query an element selector if it's not an element already.
 */
function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      (0, _index.warn)('Cannot find element: ' + el);
      return document.createElement('div');
    }
    return selected;
  } else {
    return el;
  }
}

function mountComponent(vm, el) {
  vm.$el = el;

  // 之后只要有 vm.a = "xxx" 的set动作，自然就会触发到整条依赖链的watcher，最后触发updateComponent的调用
  var updateComponent = function updateComponent() {
    vm._update();
  };

  // vm 作为 root 开始收集依赖
  // 通过vm._update()调用，开始收集整个vm组件内部的依赖
  vm._watcher = new _watcher2.default(vm, updateComponent, _index.noop);

  return vm;
}

function getOuterHTML(el) {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
}

exports.default = Vue;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initMixin = initMixin;

var _state = __webpack_require__(6);

var uid = 0;

function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        var vm = this;
        var template = options.template;

        vm._uid = uid++;

        // a flag to avoid this being observed
        // 避免 vm对象 被注入订阅
        vm._isVue = true;

        vm.$options = options;

        (0, _state.initState)(vm);

        if (vm.$options.el) {
            vm.$mount(vm.$options.el);
        }
    };
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkKeyCodes = checkKeyCodes;
/**
 * Runtime helper for checking keyCodes from config.
 */
// _k($event.keyCode,"enter",13)
function checkKeyCodes(eventKeyCode, key, builtInAlias) {
  var keyCodes = builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1;
  } else {
    return keyCodes !== eventKeyCode;
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderList = renderList;

var _index = __webpack_require__(0);

// v-for="(item, index) in list"
// alias = item, iterator1 = index

// v-for="(value, key, index) in object"
// alias = value, iterator1 = key, iterator2 = index

// val = list
// render = function (alias, iterator1, iterator2) { return VNode }
function renderList(val, render) {
  var ret = void 0,
      i = void 0,
      l = void 0,
      keys = void 0,
      key = void 0;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    // 支持 v-for="n in 10"
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if ((0, _index.isObject)(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  return ret;
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderMixin = renderMixin;

var _index = __webpack_require__(0);

var _vnode = __webpack_require__(4);

var _renderList = __webpack_require__(20);

var _checkKeycodes = __webpack_require__(19);

function renderMixin(Vue) {
  Vue.prototype._c = _vnode.createElementVNode;
  Vue.prototype._v = _vnode.createTextVNode;
  Vue.prototype._s = _index._toString;
  Vue.prototype._l = _renderList.renderList;
  Vue.prototype._k = _checkKeycodes.checkKeyCodes;
  Vue.prototype._e = _vnode.createEmptyVNode;
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayMethods = undefined;

var _index = __webpack_require__(0);

var arrayProto = Array.prototype; /*
                                   * not type checking this file because flow doesn't play well with
                                   * dynamically accessing methods on Array prototype
                                   */

var arrayMethods = exports.arrayMethods = Object.create(arrayProto)

/**
 * Intercept mutating methods and emit events
 */
;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  (0, _index.def)(arrayMethods, method, function mutator() {
    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments[i];
    }
    var result = original.apply(this, args); // 调用原方法
    var ob = this.__ob__;
    var inserted = void 0;
    switch (method) {
      case 'push':
        inserted = args;
        break;
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) ob.observeArray(inserted);
    // notify change
    // set操作要 notify
    ob.dep.notify();
    return result;
  });
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.isNative = isNative;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// can we use __proto__?
var hasProto = exports.hasProto = '__proto__' in {};

/* istanbul ignore next */
function isNative(Ctor) {
  return (/native code/.test(Ctor.toString())
  );
}

var _Set = void 0;
if (typeof Set !== 'undefined' && isNative(Set)) {
  exports._Set = _Set = Set;
} else {
  // Set polyfill
  // 搞个简单的Set polyfill
  exports._Set = _Set = function () {
    function Set() {
      _classCallCheck(this, Set);

      this.set = Object.create(null);
    }

    _createClass(Set, [{
      key: 'has',
      value: function has(key) {
        return this.set[key] === true;
      }
    }, {
      key: 'add',
      value: function add(key) {
        this.set[key] = true;
      }
    }, {
      key: 'clear',
      value: function clear() {
        this.set = Object.create(null);
      }
    }]);

    return Set;
  }();
}

exports._Set = _Set;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isReserved = isReserved;
exports.def = def;
exports.parsePath = parsePath;
/**
 * Check if a string starts with $ or _
 */
function isReserved(str) {
  // '$' (charCode) 0x24
  // '_' (charCode) 0x5F
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}

/**
 * Define a property.
 */
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  } else {
    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) return;
        obj = obj[segments[i]];
      }
      return obj;
    };
  }
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateClass = updateClass;

var _util = __webpack_require__(1);

// 支持class表达式：
/*
  <!-- class 绑定 -->
  <div :class="{ red: isRed }"></div>
  <div :class="[classA, classB]"></div>
  <div :class="[classA, { classB: isB, classC: isC }]">

  支持class :class同时存在   class对应vNode节点的data.staticClass  :class对应vNode节点的data.class
*/
function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (!data.staticClass && !data.class && (!oldData || !oldData.staticClass && !oldData.class)) {
    return;
  }

  var cls = genClassForVnode(vnode);

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

function genClassForVnode(vnode) {
  return genClassFromData(vnode.data);
}

function genClassFromData(data) {
  var dynamicClass = data.class; // <div class="a b c">
  var staticClass = data.staticClass; // <div :class="{ d: true, e:false}">
  if (staticClass || dynamicClass) {
    // merge class & :class
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */
  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  var res = '';
  if (!value) {
    return res;
  }
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    var stringified = void 0;
    for (var i = 0, l = value.length; i < l; i++) {
      if (value[i]) {
        if (stringified = stringifyClass(value[i])) {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1); // 去除尾巴的空格
  }
  if ((0, _util.isObject)(value)) {
    for (var key in value) {
      if (value[key]) res += key + ' ';
    }
    return res.slice(0, -1); // 去除尾巴的空格
  }
  return res;
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDOMProps = updateDOMProps;
function updateDOMProps(oldVnode, vnode) {
  if (!oldVnode.data.domProps && !vnode.data.domProps) {
    return;
  }
  var key = void 0,
      cur = void 0;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};

  var props = vnode.data.domProps || {};

  for (key in oldProps) {
    if (props[key] == null) {
      elm[key] = '';
    }
  }
  for (key in props) {
    elm[key] = props[key];
  }
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDOMListeners = updateDOMListeners;

var _index = __webpack_require__(0);

var target = void 0;

function add(event, _handler, once, capture) {
  if (once) {
    var oldHandler = _handler;
    var _target = target; // save current target element in closure
    _handler = function handler(ev) {
      var res = arguments.length === 1 ? oldHandler(ev) : oldHandler.apply(null, arguments);

      if (res !== null) {
        // 执行一次之后就remove掉
        // 但是有个例外，例如存在keydown等keyCode的修饰符时：
        // oldHandler = function($event) { if($event.keyCode != 13) return null; blabla($event); }
        // 在没触发过的话真正的handler:blabla前，我们不应该移除监听，于是加多一个null的返回值干扰流程
        remove(event, _handler, capture, _target);
      }
    };
  }
  target.addEventListener(event, _handler, capture);
}

function remove(event, handler, capture, _target) {
  (_target || target).removeEventListener(event, handler, capture);
}

function createFnInvoker(fns) {
  function invoker() {
    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments);
    }
  }
  invoker.fns = fns;
  return invoker;
}

// name = "~!click"  其中 ~表示once ， !表示capture
var normalizeEvent = function normalizeEvent(name) {
  var once = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once,
    capture: capture
  };
};

function updateListeners(on, oldOn) {
  var name = void 0,
      cur = void 0,
      old = void 0,
      event = void 0;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (!cur) {
      // v-on:click="clickme" 找不到clickme同名方法定义
      (0, _index.warn)('Invalid handler for event "' + event.name + '": got ' + String(cur));
    } else if (!old) {
      // 旧vnode没有on此事件
      if (!cur.fns) {
        // 下次 patch 时就不用重新再包装 listenerCb
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture);
    } else if (cur !== old) {
      // 旧vnode和新vnode都有on同个事件，并且listenerCb指向不同，只要把当前的listenerCb指向cur的即可
      old.fns = cur;
      on[name] = old;
    }
  }

  // 把旧的监听移除掉
  for (name in oldOn) {
    if (!on[name]) {
      event = normalizeEvent(name);
      remove(event.name, oldOn[name], event.capture);
    }
  }
}

function updateDOMListeners(oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return;
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target = vnode.elm;
  updateListeners(on, oldOn);
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _normalizeChildren = __webpack_require__(29);

Object.keys(_normalizeChildren).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _normalizeChildren[key];
    }
  });
});

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simpleNormalizeChildren = simpleNormalizeChildren;

// 对v-for的复杂的情况做处理 _c('ul', undefined, [_c('div'), _l(xxx), _c('div')])
// _l(xxx) 返回是一个 [VNode, VNode] 数组
function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createElement = createElement;
exports.createTextNode = createTextNode;
exports.createComment = createComment;
exports.insertBefore = insertBefore;
exports.removeChild = removeChild;
exports.appendChild = appendChild;
exports.parentNode = parentNode;
exports.nextSibling = nextSibling;
exports.tagName = tagName;
exports.setTextContent = setTextContent;
exports.setAttribute = setAttribute;
// 真实的dom操作

function createElement(tagName) {
  return document.createElement(tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setAttribute(node, key, val) {
  node.setAttribute(key, val);
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emptyNode = undefined;
exports.default = patch;

var _nodeOps = __webpack_require__(30);

var nodeOps = _interopRequireWildcard(_nodeOps);

var _vnode = __webpack_require__(4);

var _vnode2 = _interopRequireDefault(_vnode);

var _attrs = __webpack_require__(9);

var _class = __webpack_require__(25);

var _domProps = __webpack_require__(26);

var _events = __webpack_require__(27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var emptyNode = exports.emptyNode = new _vnode2.default('', {}, []);

function isUndef(s) {
  return s == null;
}

function isDef(s) {
  return s != null;
}

function sameVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key && vnode1.tag === vnode2.tag && !vnode1.data === !vnode2.data;
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i = void 0,
      key = void 0;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}

function emptyNodeAt(elm) {
  return new _vnode2.default(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
}

function removeNode(el) {
  var parent = nodeOps.parentNode(el);
  if (parent) {
    nodeOps.removeChild(parent, el);
  }
}

function createElm(vnode, parentElm, refElm) {
  var children = vnode.children;
  var tag = vnode.tag;
  if (isDef(tag)) {
    vnode.elm = nodeOps.createElement(tag);

    createChildren(vnode, children);

    // 属性
    (0, _attrs.updateAttrs)(emptyNode, vnode);
    (0, _class.updateClass)(emptyNode, vnode);
    (0, _domProps.updateDOMProps)(emptyNode, vnode);
    (0, _events.updateDOMListeners)(emptyNode, vnode);

    insert(parentElm, vnode.elm, refElm);
  } else {
    // 文本节点
    vnode.elm = nodeOps.createTextNode(vnode.text);
    insert(parentElm, vnode.elm, refElm);
  }
}

function insert(parent, elm, ref) {
  if (parent) {
    if (ref) {
      nodeOps.insertBefore(parent, elm, ref);
    } else {
      nodeOps.appendChild(parent, elm);
    }
  }
}

function createChildren(vnode, children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; ++i) {
      createElm(children[i], vnode.elm, null);
    }
  }
}

function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    createElm(vnodes[startIdx], parentElm, refElm);
  }
}

function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    var ch = vnodes[startIdx];
    if (isDef(ch)) {
      removeNode(ch.elm);
    }
  }
}

function updateChildren(parentElm, oldCh, newCh, removeOnly) {
  var oldStartIdx = 0;
  var newStartIdx = 0;
  var oldEndIdx = oldCh.length - 1;
  var oldStartVnode = oldCh[0];
  var oldEndVnode = oldCh[oldEndIdx];
  var newEndIdx = newCh.length - 1;
  var newStartVnode = newCh[0];
  var newEndVnode = newCh[newEndIdx];
  var oldKeyToIdx = void 0,
      idxInOld = void 0,
      elmToMove = void 0,
      refElm = void 0;

  var canMove = !removeOnly;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode);
      canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode);
      canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
      if (isUndef(idxInOld)) {
        // 当前元素在旧VNode里边找不到相同的key
        createElm(newStartVnode, parentElm, oldStartVnode.elm);
        newStartVnode = newCh[++newStartIdx];
      } else {
        elmToMove = oldCh[idxInOld]; // 找到同key的元素

        if (!elmToMove) {
          warn('It seems there are duplicate keys that is causing an update error. ' + 'Make sure each v-for item has a unique key.');
        }
        if (sameVnode(elmToMove, newStartVnode)) {
          patchVnode(elmToMove, newStartVnode); // 先patch这个节点
          oldCh[idxInOld] = undefined;
          canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm); // 然后开始移动
          newStartVnode = newCh[++newStartIdx];
        } else {
          // 虽然是同个key，但是标签等不一致。同样不能复用
          createElm(newStartVnode, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
  }
  if (oldStartIdx > oldEndIdx) {
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx);
  } else if (newStartIdx > newEndIdx) {
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
  }
}

function patchVnode(oldVnode, vnode, removeOnly) {
  if (oldVnode === vnode) {
    return;
  }

  var data = vnode.data;
  var hasData = isDef(data);
  var elm = vnode.elm = oldVnode.elm;
  var oldCh = oldVnode.children;
  var ch = vnode.children;

  // 更新属性
  if (hasData) {
    (0, _attrs.updateAttrs)(oldVnode, vnode);
    (0, _class.updateClass)(oldVnode, vnode);
    (0, _domProps.updateDOMProps)(oldVnode, vnode);
    (0, _events.updateDOMListeners)(oldVnode, vnode);
  }

  if (isUndef(vnode.text)) {
    if (isDef(oldCh) && isDef(ch)) {
      if (oldCh !== ch) updateChildren(elm, oldCh, ch, removeOnly);
    } else if (isDef(ch)) {
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '');
      addVnodes(elm, null, ch, 0, ch.length - 1);
    } else if (isDef(oldCh)) {
      removeVnodes(elm, oldCh, 0, oldCh.length - 1);
    } else if (isDef(oldVnode.text)) {
      nodeOps.setTextContent(elm, '');
    }
  } else if (oldVnode.text !== vnode.text) {
    nodeOps.setTextContent(elm, vnode.text);
  }
}

function patch(oldVnode, vnode) {
  var isInitialPatch = false;

  var isRealElement = isDef(oldVnode.nodeType);
  if (!isRealElement && sameVnode(oldVnode, vnode)) {
    // 如果两个vnode节点根一致
    patchVnode(oldVnode, vnode);
  } else {
    if (isRealElement) {
      oldVnode = emptyNodeAt(oldVnode);
    }
    //既然到了这里 就说明两个vnode的dom的根节点不一样
    //只是拿到原来的dom的容器parentElm，把当前vnode的所有dom生成进去
    //然后把以前的oldVnode全部移除掉
    var oldElm = oldVnode.elm;
    var parentElm = nodeOps.parentNode(oldElm);
    createElm(vnode, parentElm, nodeOps.nextSibling(oldElm));

    if (parentElm !== null) {
      removeVnodes(parentElm, [oldVnode], 0, 0);
    }
  }

  return vnode.elm;
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(10);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Vue = _index2.default;

/***/ })
/******/ ]);