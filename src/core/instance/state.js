import Watcher from '../observer/watcher'

import {
  set,
  del,
  observe
} from '../observer/index'

import {
  warn,
  hasOwn,
  isReserved,
  isPlainObject,
  bind,
  noop
} from '../util/index'

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

export function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

export function initState (vm) {
  vm._watchers = []
  const opts = vm.$options

  if (opts.methods) initMethods(vm, opts.methods)

  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, vm)
  }

  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch) initWatch(vm, opts.watch)
}


function initData (vm) {
  let data = vm.$options.data
  // 把 data 所有属性代理到 vm._data 上
  // data可以是一个函数：组件的data不应该是静态的obj，应该是一个function，避免组件共享同一个data
  data = vm._data = typeof data === 'function'
    ? data.call(vm)
    : data || {}

  if (!isPlainObject(data)) {
    data = {}
    warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  const keys = Object.keys(data)
  const props = vm.$options.props
  let i = keys.length
  while (i--) {
    if (!isReserved(keys[i])) { // vm._xx vm.$xxx 都是vm的内部/外部方法，所以不能代理到data上
      proxy(vm, `_data`, keys[i]) // 把 vm.abc 代理到 vm._data.abc
    }
  }
  observe(data, this)
}

function initComputed (vm, computed) {
  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get

    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') { // computed传入function的话，不可写
    sharedPropertyDefinition.get = function () { return userDef.call(target) }
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get ? userDef.get : noop
    sharedPropertyDefinition.set = userDef.set ? userDef.set : noop
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

function initMethods (vm, methods) {
  for (const key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm)
  }
}

function initWatch (vm, watch) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      // 为什么这里会是数组
      // Sub = Vue.extend({ watch: {a:funcA }}), subvm = new Sub({ watch: {a:funcB })
      // 最终subvm的options.watch = { "a": [funcA, funcB] }
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher (vm, key, handler) {
  let options
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  vm.$watch(key, handler, options)
}

export function stateMixin (Vue) {
  Vue.prototype.$set = set
  Vue.prototype.$delete = del

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    const vm = this
    options = options || {}
    options.user = true // 标记用户主动监听的Watcher
    const watcher = new Watcher(vm, expOrFn, cb, options)
    if (options.immediate) {
      cb.call(vm, watcher.value)
    }
    return function unwatchFn () { // 返回取消watch的接口
      watcher.teardown()
    }
  }
}