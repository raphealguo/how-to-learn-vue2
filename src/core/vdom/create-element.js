import VNode, { createEmptyVNode } from './vnode'
import { createComponent } from './create-component'
import { simpleNormalizeChildren } from './helpers/index'
import { warn, resolveAsset, isPrimitive } from '../util/index'
import { isReservedTag } from 'web/util/element'

// 如果放在vnode.js里边容易引起循环依赖
export function createElementVNode(context, tag, data, children) {
  if (!tag) {
    return createEmptyVNode()
  }

  children = simpleNormalizeChildren(children)

  let vnode
  let Ctor
  if (isReservedTag(tag)) { // 如果是html原生标签（自定义组件标签不能覆盖原生标签）
    // platform built-in elements
    vnode = new VNode(tag, data, children, undefined, undefined, context)
  } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
    // 取出该标签对应的构造器，生成VNode
    // 因此需要当前子类构造器的基类，所以要新增context字段
    // 生成组件
    vnode = createComponent(Ctor, data, context, children, tag)
  } else {
    // unknown or unlisted namespaced elements
    // check at runtime because it may get assigned a namespace when its
    // parent normalizes children
    // 其他自定义标签（交由浏览器自己解析） 例如 <abc></abc>
    vnode = new VNode(tag, data, children, undefined, undefined, context)
  }

  if (vnode) {
    return vnode
  } else {
    return createEmptyVNode()
  }
}