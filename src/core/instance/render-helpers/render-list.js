import { isObject } from 'core/util/index'
// v-for="(item, index) in list"
// alias = item, iterator1 = index

// v-for="(value, key, index) in object"
// alias = value, iterator1 = key, iterator2 = index

// val = list
// render = function (alias, iterator1, iterator2) { return VNode }
export function renderList (val, render) {
  let ret, i, l, keys, key
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length)
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i)
    }
  } else if (typeof val === 'number') { // 支持 v-for="n in 10"
    ret = new Array(val)
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i)
    }
  } else if (isObject(val)) {
    keys = Object.keys(val)
    ret = new Array(keys.length)
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i]
      ret[i] = render(val[key], key, i)
    }
  }
  return ret
}
