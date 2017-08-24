import Dep from './dep'
import { arrayMethods } from './array'
import {
  def,
  isObject,
  isPlainObject,
  hasProto,
  hasOwn,
} from '../util/index'

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

/*

  computed : {
    m: function(){
      return this.a + this.b
    },
    n: function(){
      return this.a + this.c
    },
    x: function(){
      return this.a + this.b + this.c
    }
  }

  DepA.subs = [WatcherM, WatcherN, WatcherX]
  DepB.subs = [WatcherM, WatcherX]
  DepC.subs = [WatcherN, WatcherX]

  WatcherM.deps = [DepA, DepB]
  WatcherN.deps = [DepA, DepC]
  WatcherX.deps = [DepA, DepB, DepC]

  当getA发生的时候，需要通过 depend 添加WatcherM/WatcherN/WatcherX的依赖deps, WatcherN.subs.push()
  当setA发生的时候，需要通过 notify 广播 DepA.subs，让他们通知对应的watcher

 */

export class Observer {
  /*
  value: any;
  dep: Dep;
  */
  constructor (value) {
    this.value = value
    this.dep = new Dep()
    def(value, '__ob__', this) // 把当前Observer对象 绑定在value.__ob__上

    // 将value深度遍历，订阅里边所有值的get set
    if (Array.isArray(value)) {
      // 由于数组原生的push/shift等方法也是写操作
      // 需要在这里勾住
      const augment = hasProto
        ? protoAugment
        : copyAugment
      augment(value, arrayMethods, arrayKeys)
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  /**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray (items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}


export function observe (value) {
  if (!isObject(value)) {
    return
  }

  let ob
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (
    (Array.isArray(value) || isPlainObject(value)) &&
    !value._isVue // vm对象不作订阅
  ) {
    ob = new Observer(value)
  }

  return ob
}

export function defineReactive (obj, key, val) {
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set

  let childOb = observe(val)
  /*

    m: function(){
      return this.a + this.b
    },

    当getA发生的时候，需要通过 depend 添加WatcherM/WatcherN/WatcherX的依赖deps, WatcherN.subs.push()
    当setA发生的时候，需要通过 notify 广播 DepA.subs，让他们通知对应的watcher
  */
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        // getA发生的时候，Dep.target == DepM
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
        if (Array.isArray(value)) {
          dependArray(value)
        }
      }
      return val
    },
    set: function reactiveSetter (newVal) {
      const value = val

      if (newVal === value) {
        return
      }

      // console.log("newVal = ", newVal)
      val = newVal

      childOb = observe(newVal)
      dep.notify()

      // vm._update at core/instance/index.js
    }
  })
}


/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
export function set (obj, key, val) {
  if (Array.isArray(obj)) {
    obj.length = Math.max(obj.length, key)
    obj.splice(key, 1, val)
    return val
  }
  if (hasOwn(obj, key)) {
    obj[key] = val
    return
  }
  const ob = obj.__ob__
  if (!ob) { // 不是订阅对象，直接set了返回
    obj[key] = val
    return
  }
  // 递归订阅set进去的value
  // ob.value 可以认为就是 obj
  defineReactive(ob.value, key, val)

  // set操作要notify deps
  ob.dep.notify()
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
export function del (obj, key) {
  if (Array.isArray(obj)) {
    obj.splice(key, 1)
    return
  }
  const ob = obj.__ob__
  if (!hasOwn(obj, key)) {
    return
  }
  delete obj[key]
  if (!ob) {
    return
  }
  ob.dep.notify()
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}
