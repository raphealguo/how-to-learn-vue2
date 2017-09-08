

import patch from 'core/vdom/patch'
import compile from 'compiler/index'
import generate from 'compiler/codegen/index'

import { _toString } from '../util/index'
import { createTextVNode, createElementVNode, createEmptyVNode, renderList } from '../vdom/vnode'
import {
  set,
  del,
  observe
} from '../observer/index'
import Watcher from '../observer/watcher'

import {
  warn,
  hasOwn,
  isReserved,
  isPlainObject,
  bind,
  noop
} from '../util/index'

/*
// 废弃
Vue.prototype.setData = function (data) {
  this._initData(data)
  this._update()
}
*/




