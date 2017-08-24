/* @flow */

import Watcher from './watcher'
import { remove } from '../util/index'

let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
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

  当getA发生的时候，需要通过 depend 添加WatcherM/WatcherN/WatcherX的依赖deps, WatcherN.subs.push()
  当setA发生的时候，需要通过 notify 广播 DepA.subs，让他们通知对应的watcher
 */
export default class Dep {
  /*
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;
  */

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub) {
    this.subs.push(sub)
  }

  removeSub (sub) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    // 广播
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.

// js是单线程，所以全局只会有一个watcher在被执行
// 在收集依赖的时候只需要维护一个全局的target堆栈即可
Dep.target = null
const targetStack = []

export function pushTarget (_target) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

export function popTarget () {
  Dep.target = targetStack.pop()
}
