
// 对v-for的复杂的情况做处理 _c('ul', undefined, [_c('div'), _l(xxx), _c('div')])
// _l(xxx) 返回是一个 [VNode, VNode] 数组
export function simpleNormalizeChildren (children) {
  for (let i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}
