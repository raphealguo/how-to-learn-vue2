import { createComponent } from './create-component'
import { simpleNormalizeChildren } from './helpers/index'
import { warn, resolveAsset, isPrimitive } from '../util/index'
import { isReservedTag } from '../util/element'

export default class VNode {
  constructor (
    tag,      // 标签名
    data,     // data = { attrs: 属性key-val }
    children, // 孩子 [VNode, VNode]
    text,     // 文本节点
    elm,      // 对应的真实dom对象
    context,  // 绑定的vm对象
    componentOptions,// 自定义组件的配置
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.context = context
    this.key = data && data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined  // 自定义组件的vm实例
  }
}

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

export const createEmptyVNode = () => {
  const node = new VNode()
  node.text = ''
  return node
}

export function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}
