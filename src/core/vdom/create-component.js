import VNode from './vnode'
import { resolveConstructorOptions } from '../instance/init'
import {
  warn,
  isObject,
  hasOwn,
} from '../util/index'

// 在_c('my-component')时调用createComponent生成vnode
// 通过Vue.extend出来的孩子构造器生成vnode
export function createComponent (Ctor, data, context, children, tag) {
  if (!Ctor) {
    return
  }

  if (typeof Ctor !== 'function') {
    warn(`Invalid Component definition: ${String(Ctor)}`, context)
    return
  }

  // 重新merge一下options
  resolveConstructorOptions(Ctor)

  // return a placeholder vnode
  const name = Ctor.options.name || tag

  // 生成一个特殊的vnode 带有
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, context,
    { Ctor, tag, children }
  )
  return vnode
}

export function createComponentInstanceForVnode (
  vnode,
  parentElm,
  refElm
) {
  const vnodeComponentOptions = vnode.componentOptions
  const options = {
    _isComponent: true,
    _componentTag: vnodeComponentOptions.tag,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  }

  // 通过构造器生成子组件vm实例
  return new vnodeComponentOptions.Ctor(options)
}

// 在patch createElem的时候创建组件
export function initComponentAndMount (vnode, parentElm, refElm) {
  if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
    const child = vnode.componentInstance = createComponentInstanceForVnode(
      vnode,
      parentElm,
      refElm
    )
    // 可以看到 createComponentInstanceForVnode 已经把要塞入的parentElem 和相对位置 refElme都放到构造器的options参数
    // 这个时候直接 $mount 会触发 子组件vm对象收集依赖 同时触发 _update去patch vnode生成
    // 见 patch.js patch函数的 if (!oldVode) 逻辑。
    child.$mount(vnode.elm || undefined)
  }
}
