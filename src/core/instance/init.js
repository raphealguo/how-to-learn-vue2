import { initState } from './state'

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

    initState(vm)

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

}