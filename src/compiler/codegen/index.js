import parse from 'compiler/parser/index'
import VNode from 'core/vdom/vnode'

export default function generate (ast) {
  return genElement(ast)
}

function genElement (el){
  let vnode = null

  if (el) {
    if (el.type == 1) {
      vnode = new VNode(el.tag, genChildren(el), undefined, null)
    }else if (el.type == 3) {
      vnode = new VNode(null, [], el.text, null)
    }
  }
  return vnode
}

function genChildren (el) {
  const children = el.children
  const childrenVnode = []

  if (children.length) {
    children.forEach((c) =>{
      childrenVnode.push(genElement(c))
    })
  }
  return childrenVnode
}