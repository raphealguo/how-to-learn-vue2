import { _toString } from '../util/index'
import { createTextVNode, createElementVNode, createEmptyVNode } from '../vdom/vnode'

import { renderList } from './render-helpers/render-list'
import { checkKeyCodes } from './render-helpers/check-keycodes'

export function renderMixin (Vue) {
  Vue.prototype._c = createElementVNode
  Vue.prototype._v = createTextVNode
  Vue.prototype._s = _toString
  Vue.prototype._l = renderList
  Vue.prototype._k = checkKeyCodes
  Vue.prototype._e = createEmptyVNode
}