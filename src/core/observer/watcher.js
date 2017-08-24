
import Dep, { pushTarget, popTarget } from './dep'

import {
  warn,
  remove,
  isObject,
  parsePath,
  _Set as Set
} from '../util/index'

let uid = 0

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
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
 */
export default class Watcher {
  /*
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  lazy: boolean;
  dirty: boolean;
  active: boolean;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: Set;
  newDepIds: Set;
  getter: Function;
  value: any;
  */

  constructor (vm, expOrFn, cb, options) {
    this.vm = vm
    vm._watchers.push(this)
    // options
    // https://cn.vuejs.org/v2/api/#vm-watch-expOrFn-callback-options
    if (options) {
      this.lazy = !!options.lazy //computed是
    } else {
      this.lazy = false
    }
    this.cb = cb
    this.id = ++uid             // uid for batching
    this.active = true
    this.dirty = this.lazy      // for lazy watchers

    // 在收集依赖的时候会使用 newDeps来收集。
    // 收集结束的时候会把newDeps覆盖到deps里
    this.deps = []              // WatcherM.deps = [DepA, DepB]
    this.newDeps = []

    this.depIds = new Set()     // 对应this.dep的所有id set，避免重复添加同个Dep
    this.newDepIds = new Set()

    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      // vm.$watch("a.b", function(){ blabla; })
      // "a.b" 的上下文是在 vm对象上，所以需要parsePath返回一个getter函数，在调用getter的时候，上下文绑定vm即可： this.gette.call(vm)
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = function () {}
        warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }

    this.value = this.lazy
      ? undefined
      : this.get()
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get () {
    //开始收集依赖
    pushTarget(this)
    let value
    const vm = this.vm
    value = this.getter.call(vm, vm)

    //结束收集依赖
    popTarget()

    // 在收集依赖的时候会使用 newDeps来收集。
    // 收集结束的时候会把newDeps覆盖到deps里
    this.cleanupDeps()
    return value
  }

  /**
   * Add a dependency to this directive.
   */
  addDep (dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep) // WatcherM.deps.push(DepA) // WatcherM.deps = [DepA, DepB]
      if (!this.depIds.has(id)) {
        dep.addSub(this)  //  DepA.subs.push(WatcherM) // DepA.subs = [WatcherM, WatcherN, WatcherX]
      }
    }
  }

  /**
   * Clean up for dependency collection.
   */
  // 在收集依赖的时候会使用 newDeps来收集。
  // 收集结束的时候会把newDeps覆盖到deps里
  cleanupDeps () {
    let i = this.deps.length
    while (i--) { // 把旧依赖处理好
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    // 把新依赖 newDeps 更新到 deps
    // newDeps 更新成初始状态，方便下次收集依赖
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  update () {
    if (this.lazy) {
      this.dirty = true
    } else {
      this.run()
    }
  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  run () {
    if (this.active) {
      const value = this.get()
      if (
        value !== this.value ||
        isObject(value)
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
        this.cb.call(this.vm, value, oldValue)
      }
    }
  }

  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
  evaluate () {
    this.value = this.get()
    this.dirty = false
  }

  /**
   * Depend on all deps collected by this watcher.
   */
  depend () {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }

  /**
   * Remove self from all dependencies' subscriber list.
   */
  // 销毁watcher之后，把dep也从目标队列删掉
  teardown () {
    if (this.active) {
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
    }
  }
}
