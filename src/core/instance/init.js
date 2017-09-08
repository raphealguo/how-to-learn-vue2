import { initState } from './state'
import { initLifecycle, callHook } from './lifecycle'

let uid = 0

export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    const template = options.template

    vm._uid = uid++

    // a flag to avoid this being observed
    // 避免 vm对象 被注入订阅
    vm._isVue = true

    vm.$options = options

    initLifecycle(vm)

    callHook(vm, 'beforeCreate')  // see: https://cn.vuejs.org/v2/api/?#beforeCreate
    initState(vm)
    callHook(vm, 'created')       // see: https://cn.vuejs.org/v2/api/?#created

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

}