import patch from 'core/vdom/patch'
import compile from 'compiler/index'
import generate from 'compiler/codegen/index'

import { _toString } from '../util/index'
import { createTextVNode, createElementVNode, createEmptyVNode, renderList } from '../vdom/vnode'
import {
  set,
  del,
  observe
} from '../observer/index'
import Watcher from '../observer/watcher'

import {
  warn,
  hasOwn,
  isReserved,
  isPlainObject,
  bind,
  noop
} from '../util/index'

export default function Vue (options) {
  if (!(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this.$options = options
  this._init(options)
}

Vue.prototype._c = createElementVNode
Vue.prototype._v = createTextVNode
Vue.prototype._s = _toString
Vue.prototype._l = renderList
Vue.prototype._e = createEmptyVNode

Vue.prototype._init = function (options) {
  const vm = this
  const template = options.template

  // a flag to avoid this being observed
  // 避免 vm对象 被注入订阅
  vm._isVue = true

  vm._watchers = []

  if (options.methods) initMethods(vm, options.methods)

  if (options.data) {
    this._initData()
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }

  if (options.computed) initComputed(vm, options.computed)

  const compiled = compile(template)

  vm._render = () => {
    return compiled.render.call(vm);
  }
}

Vue.prototype._initData = function () {
  const vm = this
  let data = vm.$options.data
  data = vm._data = data || {} // 把 data 所有属性代理到 vm._data 上

  if (!isPlainObject(data)) {
    data = {}
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

Vue.prototype._update = function () {
  const vm = this
  const vnode = vm._render()
  const prevVnode = vm._vnode

  vm._vnode = vnode
  patch(prevVnode, vnode)
}

/*
// 废弃
Vue.prototype.setData = function (data) {
  this._initData(data)
  this._update()
}
*/

Vue.prototype.$mount = function (el) {
  const vm = this
  vm._vnode = document.getElementById(el)

  let updateComponent = () => {
    vm._update()
  }

  // vm 作为 root 开始收集依赖
  // 通过vm._update()调用，开始收集整个vm组件内部的依赖
  vm._watcher = new Watcher(vm, updateComponent, noop)

  // 之后只要有 vm.a = "xxx" 的set动作，自然就会触发到整条依赖链的watcher，最后触发updateComponent的调用

  return vm
}


const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initComputed(vm, computed) {
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

function initMethods(vm, methods) {
  for (const key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm)
  }
}

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

Vue.set = set
Vue.delete = del