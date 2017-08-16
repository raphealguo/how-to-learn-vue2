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
  }
}

export function createElementVNode(tag, data, children) {
  if (!tag) {
    return createEmptyVNode()
  }

  let vnode = new VNode(tag, data, children, undefined, undefined)
  return vnode
}

export const createEmptyVNode = () => {
  const node = new VNode()
  node.text = ''
  return node
}

export function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}