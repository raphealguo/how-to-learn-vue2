export default class VNode {
  constructor (
    tag,      // 标签名
    children, // 孩子 [VNode, VNode]
    text,     // 文本节点
    elm       // 对应的真实dom对象
  ) {
    this.tag = tag
    this.children = children
    this.text = text
    this.elm = elm
  }
}