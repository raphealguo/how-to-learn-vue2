import { toArray } from '../util/index'
import { updateListeners } from 'web/runtime/modules/events'

export function initEvents (vm) {
  vm._events = Object.create(null)

  //如果是孩子组件
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}

let target

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn)
  } else {
    target.$on(event, fn)
  }
}

function remove (event, fn) {
  target.$off(event, fn)
}

export function updateComponentListeners (vm, listeners, oldListeners) {
  target = vm
  // 由于自定义事件的add 和remove 和 原来的dom event有差别(不再是dom.addEventListener)
  // 因此要把之前的add remove抽象出来
  updateListeners(listeners, oldListeners || {}, add, remove, vm)
}

export function eventsMixin (Vue) {
  Vue.prototype.$on = function (event, fn) {
    const vm = this
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.$on(event[i], fn)
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn)
    }
    return vm
  }

  Vue.prototype.$once = function (event, fn) {
    const vm = this
    function on () {
      vm.$off(event, on)
      fn.apply(vm, arguments)
    }
    on.fn = fn
    vm.$on(event, on)
    return vm
  }

  Vue.prototype.$off = function (event, fn) {
    const vm = this
    // 移除所有监听
    if (!arguments.length) {
      vm._events = Object.create(null)
      return vm
    }
    // specific event
    const cbs = vm._events[event]
    if (!cbs) {
      return vm
    }
    // $off("abc") 移除所有abc的handler
    if (arguments.length === 1) {
      vm._events[event] = null
      return vm
    }

    // 移除特定某个handler
    let cb
    let i = cbs.length
    while (i--) {
      cb = cbs[i]
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1)
        break
      }
    }
    return vm
  }

  Vue.prototype.$emit = function (event) { // 孩子vm触发事件，_events是在init的时候调用updateComponentListeners监听父亲的handler
    const vm = this
    let cbs = vm._events[event]
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs
      const args = toArray(arguments, 1)
      for (let i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args)
      }
    }
    return vm
  }
}
