import { parseHTML } from './parser/html-parser'

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

const isPreTag = (tag) => tag === 'pre'

/**
 * 把HTML字符串转成AST结构
 * ast = { attrsList, attrsMap, children, parent, tag, type=1 } // 非文本节点
 * ast = { text, type=3 } // 文本节点
 */
export default function parse (template) {
  const stack = []
  let root // ast的根节点
  let currentParent // 当前节点的父亲节点
  let inPre = false

  function endPre (element) {
    if (isPreTag(element.tag)) {
      inPre = false
    }
  }

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

      if (isPreTag(element.tag)) {
        inPre = true
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
      } else { // 闭合一下pre标签
        endPre(element)
      }
    },
    end () {
      const element = stack[stack.length - 1]
      const lastNode = element.children[element.children.length - 1]
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) { // 把孩子节点中最后一个空白节点删掉
        element.children.pop()
      }

      stack.length -= 1
      currentParent = stack[stack.length - 1]
      endPre(element)
    },
    chars (text) {
      if (!currentParent) {
        return
      }
      const children = currentParent.children
      text = inPre || text.trim() ?
        decode(text) :
        (children.length ? ' ' : '') // 如果文本节点为多个空格，同时所在的父亲节点含有其他孩子节点，那么要生成一个单空格的文本节点
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