import parse from 'compiler/index'
import VNode from 'core/vdom/vnode'

/*
  <div>
    <span name="test">abc{{a}}xxx{{b}}def</span>
    <div v-if="a">a</div>
    <div v-if="b">b</div>
    <ul>
      <li v-for="(item, index) in list">{{index}} : {{item}}</li>
    </ul>
  </div>

  生成函数：

  this == Vue实例 == vm

  function render() {
    with (this) {
      return _c('div', undefined, [
        _c('span', {
          attrs: { name : 'test' }
        }, [
          _v("abc" + _s(a) + "xxx" + _s(b) + "def")
        ]),

        // v-if 语句
        a ? _c('div', undefined, [ _v("a") ]) : _e(),
        b ? _c('div', undefined, [ _v("b") ]) : _e(),

        //v-for
        _c('ul',
          _l(
            (list),
            function(item, index) {
              return _c(
                'li',[ _v(_s(index)+" : "+_s(item)) ]
              )
            })
        )
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
  if (el.for && !el.forProcessed) { // 为了v-for和v-if的优先级： <ul v-for="(item, index) in list" v-if="index==0">，需要先处理for语句
    return genFor(el)
  } if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else {
    let code
    const children = genChildren(el) || '[]'
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

function genFor (el) {
  const exp = el.for
  const alias = el.alias
  const iterator1 = el.iterator1 ? `,${el.iterator1}` : ''
  const iterator2 = el.iterator2 ? `,${el.iterator2}` : ''

  // v-for="(item, index) in list"
  // alias = item, iterator1 = index

  // v-for="(value, key, index) in object"
  // alias = value, iterator1 = key, iterator2 = index


  // _l(val, render)
  // val = list
  // render = function (alias, iterator1, iterator2) { return genElement(el) }
  el.forProcessed = true // avoid recursion
  return `_l((${exp}),` +
    `function(${alias}${iterator1}${iterator2}){` +
      `return ${genElement(el)}` +
    '})'
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
    const el = children[0]

    // 对v-for的情况做处理
    // _c('ul', undefined, [_l(xxx)])  需要把_l提出来外层
    // 还有一些复杂的情况：_c('ul', undefined, [_c('div'), _l(xxx), _c('div')]) 只能在_c里边处理
    if (children.length === 1 && el.for) {
      return genElement(el)
    }
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