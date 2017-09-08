import { makeMap } from 'shared/util'

// attributes that should be using props for binding
// 需要用props来绑定的属性
const acceptValue = makeMap('input,textarea,option,select')
export const mustUseProp = (tag, type, attr) => {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
}

export const isFalsyAttrValue = (val) => {
  return val == null || val === false
}