import { parseHTML } from './html-parser'

function makeAttrsMap (attrs){
  const map = {}
  for (let i = 0, l = attrs.length; i < l; i++) {
    map[attrs[i].name] = attrs[i].value
  }
  return map
}

function decode (html) {
  let decoder = document.createElement('div')
  decoder.innerHTML = html
  return decoder.textContent
}

/**
 * 把HTML字符串转成AST结构
 * ast = { attrsList, attrsMap, children, parent, tag, type=1 } // 非文本节点
 * ast = { text, type=3 } // 文本节点
 */
export default function parse (template) {
  const stack = []
  let root // ast的根节点
  let currentParent // 当前节点的父亲节点

  parseHTML(template, {
    start (tag, attrs, unary) {
      const element = {
        type: 1,
        tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      }
      if (!root) {
        root = element
      }
      if (currentParent) {
        currentParent.children.push(element)
      }
      if (!unary) { // 如果不是单标签，就压入堆栈
        currentParent = element
        stack.push(element)
      }
    },
    end () {
      stack.length -= 1
      currentParent = stack[stack.length - 1]
    },
    chars (text) {
      if (!currentParent) {
        return
      }
      const children = currentParent.children
      if (text) { // 文本节点
        children.push({
          type: 3,
          text
        })
      }
    }
  })
  return root
}