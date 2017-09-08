import { warn } from './debug'
import { set } from '../observer/index'
import {
  extend,
  isPlainObject,
  hasOwn,
} from 'shared/util'

const strats = Object.create(null)

strats.el = function (parent, child, vm, key) {
  if (!vm) {
    warn(
      `option "${key}" can only be used during instance ` +
      'creation with the `new` keyword.'
    )
  }
  return defaultStrat(parent, child)
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) return to
  let key, toVal, fromVal
  const keys = Object.keys(from)
  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    toVal = to[key]
    fromVal = from[key]
    if (!hasOwn(to, key)) {
      set(to, key, fromVal)
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal)
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (parentVal, childVal, vm) {
  if (!vm) { // Vue.extend(options) 时候进入此分支merge
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') { // Vue.extend的options.data必须是一个函数
      warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      )
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // 返回依旧是一个 data()
    // 组件共享了同一个 data，所以需要data工厂方法来生成不同的data
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) { // new Sub(option1) 的时候会mergeOption进入此分支merge
    return function mergedInstanceDataFn () {
      // instance merge
      const instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal
      const defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
// 需要把watcher都合并到一起
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) return Object.create(parentVal || null)
  if (!parentVal) return childVal
  const ret = {}
  extend(ret, parentVal)
  for (const key in childVal) {
    let parent = ret[key]
    const child = childVal[key]
    if (parent && !Array.isArray(parent)) {
      parent = [parent]
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child]
  }
  return ret
}

/**
 * Other object hashes.
 */
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) return Object.create(parentVal || null)
  if (!parentVal) return childVal
  const ret = Object.create(null)
  extend(ret, parentVal)
  extend(ret, childVal)
  return ret
}

/**
 * Default strategy.
 */
const defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
}


/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
export function mergeOptions (parent, child, vm) {

  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) { // 特殊的key需要特殊的拷贝方法 拷贝方法放置在strats里边
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}


/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
// 从options里边找到对应的值
export function resolveAsset (options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }

  // options 有继承关系

  const assets = options[type]
  // check local registration variations first
  if (hasOwn(assets, id)) return assets[id]
  // fallback to prototype chain
  const res = assets[id]
  if (warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    )
  }
  return res
}
