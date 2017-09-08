import { extend, warn } from 'core/util/index'

/**
 * Runtime helper for rendering <slot>
 */
export function renderSlot (name, fallback) {
  const slotNodes = this.$slots[name] //从当前的vm.$slots找到父亲里边声明的 <div slot="xxx">等vnode
  // warn duplicate slot usage
  if (slotNodes) {
    slotNodes._rendered && warn(
      `Duplicate presence of slot "${name}" found in the same render tree ` +
      `- this will likely cause render errors.`,
      this
    )
    slotNodes._rendered = true
  }

  // <div slot="a"><xx></xxx><abc></abc></div>
  // _t("a", [xxx, abc])
  // 如果上边找不到a对应的slot，直接就用默认的children，也即是fallback
  return slotNodes || fallback
}
