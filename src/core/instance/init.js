import { initState } from './state'
import { initRender } from './render'
import { initEvents } from './events'
import { initLifecycle, callHook } from './lifecycle'
import { extend, mergeOptions } from '../util/index'

let uid = 0

export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    const template = options.template

    vm._uid = uid++

    // a flag to avoid this being observed
    // 避免 vm对象 被注入订阅
    vm._isVue = true

    // merge options
    // 针对: Sub = Vue.extend(options1); subvm = new Sub(options2);
    // 需要merge静态的 options1 和动态的 options2 到 subvm 上
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    )

    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')  // see: https://cn.vuejs.org/v2/api/?#beforeCreate
    initState(vm)
    callHook(vm, 'created')       // see: https://cn.vuejs.org/v2/api/?#created

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}

export function resolveConstructorOptions (Ctor) {
  let options = Ctor.options
  if (Ctor.super) { // 如果有父类
    // 需要把父类的options拿出来 重新merge一下
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions

    // 对比一下看看父类的options有没有做过更新
    if (superOptions !== cachedSuperOptions) { // 如果有更新过
      // super option changed,
      // need to resolve new options.
      // 更新一下cache options
      Ctor.superOptions = superOptions

      // 重新merge一下options
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
    }
  }
  return options
}