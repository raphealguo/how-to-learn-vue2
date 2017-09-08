import { initExtend } from './extend'
import { set, del } from '../observer/index'

import {
  warn,
} from '../util/index'

export function initGlobalAPI (Vue) {

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn,
  }

  Vue.set = set
  Vue.delete = del

  Vue.options = Object.create(null)
  Vue.options.components = Object.create(null)  // 当前vm类所注册的组件名字

  initExtend(Vue)
}