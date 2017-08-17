import parse from 'compiler/index'
import VNode from 'core/vdom/vnode'

/*
  <div>
    <span name="test">abc{{a}}xxx{{b}}def</span>
    <div v-if="a">a</div>
    <div v-if="b">b</div>
  </div>

  生成函数：

  this == Vue实例 == vm

  function render() {
    with (this) {
      return _c('div', undefined, [
        _c('span', {
          attrs: { name : 'test'}
        }, [
          _v("abc" + _s(a) + "xxx" + _s(b) + "def")
        ]),
        a ? _c('div', undefined, [ _v("a") ]) : _e(),
        b ? _c('div', undefined, [ _v("b") ]) : _e(),
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
  if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else {
    let code
    const children = genChildren(el)
    const data = genData(el)

    code = `_c('${el.tag}'${
        `,${data}` // data
      }${
      children ? `,${children}` : '' // children
    })`

    return code
  }
}

function genIf (el) {
  el.ifProcessed = true // 标记已经处理过当前这个if节点了，避免递归死循环
  return genIfConditions(el.ifConditions.slice())
}

function genIfConditions (conditions) {
  if (!conditions.length) {
    return '_e()'
  }

  const condition = conditions.shift() // 因为我们并没有去真正删除 el.ifConditions 队列的元素，所以需要有el.ifProcessed = true来结束递归
  if (condition.exp) {
    return `(${condition.exp})?${genTernaryExp(condition.block)}:${genIfConditions(conditions)}`
  } else {
    return `${genTernaryExp(condition.block)}`
  }

  function genTernaryExp (el) {
    return genElement(el)
  }
}

function genData (el) {
  let data = '{'

  if (el.attrs) {
    data += `attrs:{${genProps(el.attrs)}},`
  }
  // DOM props
  if (el.props) {
    data += `domProps:{${genProps(el.props)}},`
  }

  data = data.replace(/,$/, '') + '}'

  return data
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

function genProps (props) {
  let res = ''
  for (let i = 0; i < props.length; i++) {
    const prop = props[i]
    res += `"${prop.name}":${prop.value},`
  }
  return res.slice(0, -1) // 去掉尾巴的逗号
}