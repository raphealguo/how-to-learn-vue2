import { isObject } from 'shared/util'

export function genClassForVnode (vnode) {
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

export function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

export function stringifyClass (value) {
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
