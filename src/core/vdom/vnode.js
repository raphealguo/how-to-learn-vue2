import { simpleNormalizeChildren } from './helpers/index'

export default class VNode {
  constructor (
    tag,      // 标签名
    data,     // data = { attrs: 属性key-val }
    children, // 孩子 [VNode, VNode]
    text,     // 文本节点
    elm       // 对应的真实dom对象
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.key = data && data.key
  }
}

export function createElementVNode(tag, data, children) {
  if (!tag) {
    return createEmptyVNode()
  }

  return new VNode(tag, data, simpleNormalizeChildren(children), undefined, undefined)
}

export const createEmptyVNode = () => {
  const node = new VNode()
  node.text = ''
  return node
}

export function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}
