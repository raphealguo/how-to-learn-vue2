/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
// 在_c('my-component')的时候把children的slot都记录到vm.$slots = resolveSlots(renderChildren, parentVnode.context)
// 当递归去渲染孩子vm的时候，_t调用就会找到当前vm的$slots对应的vnode 然后返回
export function resolveSlots (children, context) {
  const slots = {}
  // slots = { "a":[], "b":[], "default":[]}
  if (!children) {
    return slots
  }
  const defaultSlot = []
  let name, child
  for (let i = 0, l = children.length; i < l; i++) {
    child = children[i]
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if (child.context === context &&
        child.data && (name = child.data.slot)) {
      const slot = (slots[name] || (slots[name] = []))
      slot.push(child)
    } else {
      defaultSlot.push(child)
    }
  }
  // ignore single whitespace
  // 去掉一些空白的vnode节点
  if (defaultSlot.length && !(
    defaultSlot.length === 1 &&
    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
  )) {
    slots.default = defaultSlot
  }
  return slots
}