/* @flow */
import { warn, extend } from '../util/index'

export function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0 // 类id
  let cid = 1

  /**
   * Class inheritance
   */

  /*
     var Sub = Vue.extend(options1)
     var subvm = new Sub(options2)

     subvm.options = merge options2 into options1
  */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {}
    const Super = this
    const SuperId = Super.cid

    const Sub = function VueComponent (options) { // see core/indestance/index.js 和Vue构造器逻辑一致
      this._init(options)
    }

    // 继承
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++

    // 把默认的extendOptions和父亲的options merge之后 记录在当前的构造器上，等真正 _init调用的时候再动态merge options
    Sub.options = extend(Super.options, extendOptions)

    // 记录基类
    Sub['super'] = Super

    // 子类依旧可以继续生成子类 extend
    Sub.extend = Super.extend

    // 防止父类的options有更新，需要在_init的时候再检查一次是否有update
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions

    return Sub
  }
}
