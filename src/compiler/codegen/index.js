import parse from 'compiler/index'
import VNode from 'core/vdom/vnode'

/*
  <div>
    <span>abc{{a}}xxx{{b}}def</span>
  </div>

  生成函数：

  this == Vue实例 == vm

  function render() {
    with (this) {
      return _c('div', [
        _c('span', [
          _v("abc" + _s(a) + "xxx" + _s(b) + "def")
        ]),
      ])
    }
  }
*/
export function generate (ast) {
  const code = ast ? genElement(ast) : '_c("div")'

  return {
    render: ("with(this){return " + code + "}")
  }
}

function genElement (el){
  let code
  const children = genChildren(el)
  code = `_c('${el.tag}'${
    children ? `,${children}` : '' // children
  })`

  return code
}

function genChildren (el) {
  const children = el.children
  if (children.length) {
    return `[${children.map(genNode).join(',')}]`
  }
}

function genNode (node) {
  if (node.type === 1) {
    return genElement(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return `_v(${text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : JSON.stringify(text.text)
  })`
}
