import { isObject } from 'shared/util'

// 支持class表达式：
/*
  <!-- class 绑定 -->
  <div :class="{ red: isRed }"></div>
  <div :class="[classA, classB]"></div>
  <div :class="[classA, { classB: isB, classC: isC }]">

  支持class :class同时存在   class对应vNode节点的data.staticClass  :class对应vNode节点的data.class
*/
export function updateClass (oldVnode, vnode) {
  const el = vnode.elm
  const data = vnode.data
  const oldData = oldVnode.data
  if (!data.staticClass && !data.class &&
      (!oldData || (!oldData.staticClass && !oldData.class))) {
    return
  }

  let cls = genClassForVnode(vnode)

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls)
    el._prevClass = cls
  }
}

function genClassForVnode (vnode) {
  return genClassFromData(vnode.data)
}

function genClassFromData (data) {
  const dynamicClass = data.class // <div class="a b c">
  const staticClass = data.staticClass// <div :class="{ d: true, e:false}">
  if (staticClass || dynamicClass) {  // merge class & :class
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  let res = ''
  if (!value) {
    return res
  }
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    let stringified
    for (let i = 0, l = value.length; i < l; i++) {
      if (value[i]) {
        if ((stringified = stringifyClass(value[i]))) {
          res += stringified + ' '
        }
      }
    }
    return res.slice(0, -1) // 去除尾巴的空格
  }
  if (isObject(value)) {
    for (const key in value) {
      if (value[key]) res += key + ' '
    }
    return res.slice(0, -1) // 去除尾巴的空格
  }
  return res
}

