/* @flow */
import { warn, extend, mergeOptions, isPlainObject } from '../util/index'

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

    // 缓存起来，避免后续又生成一个新的构造器
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    const Sub = function VueComponent (options) { // see core/indestance/index.js 和Vue构造器逻辑一致
      this._init(options)
    }

    var name = extendOptions.name || Super.options.name; // 自定义组件的名字
    {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    // 继承
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++

    // 把默认的extendOptions和父亲的options merge之后 记录在当前的构造器上，等真正 _init调用的时候再动态merge options
    Sub.options = mergeOptions(Super.options, extendOptions)

    // 记录基类
    Sub['super'] = Super

    // 子类依旧可以继续生成子类 extend
    Sub.extend = Super.extend

    // enable recursive self-lookup
    // 把组件名字注册进去
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // 防止父类的options有更新，需要在_init的时候再检查一次是否有update
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions

    // 缓存起来，避免后续又生成一个新的构造器
    cachedCtors[SuperId] = Sub;
    return Sub
  }


  Vue.component = function (name, extendOptions) {
    if (isPlainObject(extendOptions)) {
      extendOptions.name = extendOptions.name || name
      Vue.extend(extendOptions)
    }
  }
}
