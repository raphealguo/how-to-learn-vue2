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

export const createEmptyVNode = () => {
  const node = new VNode()
  node.text = ''
  return node
}

export function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}
