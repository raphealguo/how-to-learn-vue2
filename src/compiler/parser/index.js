import { parseHTML } from './html-parser'
import { parseText } from './text-parser'
import { warn } from 'core/util/debug'

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
export function parse (template) {
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
    warn,
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

      element.plain = !element.key && !attrs.length
      processAttrs(element)

      if (!root) {
        root = element
      } else if (!stack.length) { // 根节点只能有一个，否则给出warn
        warn(
          `Component template should contain exactly one root element. `
        )
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
        if (text === template) { // 传入的template不应该是纯文本节点
          warn(
            'Component template requires a root element, rather than just text.'
          )
        }
        return
      }
      const children = currentParent.children
      text = inPre || text.trim() ?
        decode(text) :
        (children.length ? ' ' : '') // 如果文本节点为多个空格，同时所在的父亲节点含有其他孩子节点，那么要生成一个单空格的文本节点
      if (text) {
        let expression
        if (text !== ' ' && (expression = parseText(text))) { // 表达式节点
          children.push({
            type: 2,
            expression,
            text
          })
        } else { // 文本节点
          children.push({
            type: 3,
            text
          })
        }
      }
    }
  })
  return root
}

function processAttrs (el) {
  const list = el.attrsList
  let i, l, name, value
  for (i = 0, l = list.length; i < l; i++) {
    name  = list[i].name
    value = list[i].value
    addAttr(el, name, JSON.stringify(value))
  }
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name, value })
}
