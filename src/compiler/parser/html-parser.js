import { makeMap, no } from 'shared/util'

export const isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr',
  true
)

// Elements that you can, intentionally, leave open
// (and which close themselves)
export const canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source',
  true
)

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
export const isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track',
  true
)

const singleAttrIdentifier = /([^\s"'<>/=]+)/
const singleAttrAssign = /(?:=)/
const singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
]
const attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
)

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
const ncname = '[a-zA-Z_][\\w\\-\\.]*'
const qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')'
const startTagOpen = new RegExp('^<' + qnameCapture)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>')
const doctype = /^<!DOCTYPE [^>]+>/i
const comment = /^<!--/
const conditionalComment = /^<!\[/

let IS_REGEX_CAPTURING_BROKEN = false
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === ''
})

// Special Elements (can contain anything)
const isScriptOrStyle = makeMap('script,style', true)
const reCache = {}

const decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
}
const encodedAttr = /&(?:lt|gt|quot|amp);/g
const encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  const div = document.createElement('div')
  div.innerHTML = `<div a="${content}">`
  return div.innerHTML.indexOf(encoded) > 0
}

const shouldDecodeNewlines = shouldDecode('\n', '&#10;')

function decodeAttr (value) {
  const re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr
  return value.replace(re, match => decodingMap[match])
}

export function parseHTML (html, options) {
  /*
    options = {
      chars:  解析到文本的回调
      start:  解析到标签起始的回调
      end:    解析到标签结束的回调
    }
  */
  const stack = []
  let index = 0
  let last, lastTag

  // advance(N) 负责把当前指向html字符串的指针往后挪动N个位置
  while (html) {
    last = html
    // 不在style/script标签里边
    if (!lastTag || !isScriptOrStyle(lastTag)) {
      let textEnd = html.indexOf('<')
      if (textEnd === 0) {
        // 注释
        if (comment.test(html)) { // 把指针挪到 "<!-- xxx -->" 后边的位置
          const commentEnd = html.indexOf('-->')

          if (commentEnd >= 0) {
            advance(commentEnd + 3)
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        // 条件注释
        if (conditionalComment.test(html)) { // 把指针挪到 "<![if expression]> xxx <![endif]>" 后边的位置
          const conditionalEnd = html.indexOf(']>')

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2)
            continue
          }
        }

        // Doctype
        const doctypeMatch = html.match(doctype) // doctypeMatch = []
        if (doctypeMatch) { // 把指针挪到 "<!DOCTYPE xxxx>" 后边的位置
          advance(doctypeMatch[0].length)
          continue
        }

        // 标签结束
        const endTagMatch = html.match(endTag) // endTagMatch = []
        if (endTagMatch) { // 把指针挪到 "</xxx>" 后边的位置
          const curIndex = index
          advance(endTagMatch[0].length)
          parseEndTag(endTagMatch[1], curIndex, index) // 处理一下堆栈信息，回调上层
          continue
        }

        // 标签起始：<xxx attr="xx">
        const startTagMatch = parseStartTag() // 处理：标签名字/属性  startTagMatch = { tagName, attrs, start, end, unarySlash }
        if (startTagMatch) {
          handleStartTag(startTagMatch) // 处理：堆栈信息/HTML容错，回调上层
          continue
        }
      }

      // 到这里就是处理文本节点了。
      let text, rest, next
      if (textEnd >= 0) { // 如果之后的字符串还包含 '<' ， 那么把当前指针到textEnd位置的字符串生成文本节点，回调上层
        rest = html.slice(textEnd)
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          next = rest.indexOf('<', 1)
          if (next < 0) break
          textEnd += next
          rest = html.slice(textEnd)
        }
        text = html.substring(0, textEnd)
        advance(textEnd)
      }

      if (textEnd < 0) { // 之后的字符串不包含 '<' ，那剩余整个字符串都是文本节点了
        text = html
        html = ''
      }

      if (options.chars && text) {
        options.chars(text)
      }
    } else {
      // lastTag 要么是 script style noscript
      var stackedTag = lastTag.toLowerCase()
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'))
      var endTagLength = 0
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length
        if (options.chars) {
          options.chars(text)
        }
        return ''
      })
      index += html.length - rest.length
      html = rest
      parseEndTag(stackedTag, index - endTagLength, index) // 闭合一下 script style noscript 标签
    }

    if (html === last) { // 如果处理完毕之后 字符串指针仍然没有挪动，那就把剩余字符串作为文本节点 跳出解析
      options.chars && options.chars(html)
      break
    }
  }

  // 把堆栈里边没闭合的标签闭合
  parseEndTag()

  function advance (n) {
    index += n
    html = html.substring(n)
  }

  function parseStartTag () {
    const start = html.match(startTagOpen)
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
        start: index
      }
      advance(start[0].length)

      // 解析属性
      let end, attr
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length)
        match.attrs.push(attr)
      }
      if (end) {
        match.unarySlash = end[1]
        advance(end[0].length)
        match.end = index
        return match
      }
    }
  }

  function handleStartTag (match) {
    const tagName = match.tagName
    const unarySlash = match.unarySlash

    if (lastTag === 'p' && isNonPhrasingTag(tagName)) { // p标签里边不允许嵌某些标签，如果遇到这种情况，p标签就提前闭合
      parseEndTag(lastTag)
    }
    if (canBeLeftOpenTag(tagName) && lastTag === tagName) { // 像li这种可以可以忽略闭合标签，例如 <li>xx<li>abc</li> 等同于 <li>xx</li><li>abc</li>
      parseEndTag(tagName)
    }

    const unary = isUnaryTag(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash // 单标签

    const l = match.attrs.length
    const attrs = new Array(l)
    for (let i = 0; i < l; i++) {
      const args = match.attrs[i]
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3] }
        if (args[4] === '') { delete args[4] }
        if (args[5] === '') { delete args[5] }
      }
      const value = args[3] || args[4] || args[5] || ''
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value)
      }
    }

    if (!unary) { // 不是单标签的话 就压入堆栈
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs })
      lastTag = tagName
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end)
    }
  }

  function parseEndTag (tagName, start, end) {
    let pos, lowerCasedTagName
    if (start == null) start = index
    if (end == null) end = index

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase()
    }

    if (tagName) { // 从堆栈中找到和当前结束标签匹配的起始标签。
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // 准备清理所有堆栈
      pos = 0
    }

    if (pos >= 0) {
      // 把还没闭合的标签 全部闭合处理
      for (let i = stack.length - 1; i >= pos; i--) {
        if (options.end) {
          options.end(stack[i].tag, start, end)
        }
      }

      stack.length = pos
      lastTag = pos && stack[pos - 1].tag
    } else if (lowerCasedTagName === 'br') { // 单独出现 </br> 标签 直接处理成 <br>
      if (options.start) {
        options.start(tagName, [], true, start, end)
      }
    } else if (lowerCasedTagName === 'p') {// 单独出现 </p> 标签 直接处理成 <p></p>
      if (options.start) {
        options.start(tagName, [], false, start, end)
      }
      if (options.end) {
        options.end(tagName, start, end)
      }
    } else {
      // 如果找不到匹配的起始标签，那么就直接忽略此结束标签
    }
  }
}
