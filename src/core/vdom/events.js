import { warn } from 'core/util/index'


let target

function add (event, handler, capture) {
  target.addEventListener(event, handler, capture)
}

function remove (event, handler, capture, _target) {
  (_target || target).removeEventListener(event, handler, capture)
}


function createFnInvoker (fns) {
  function invoker () {
    const fns = invoker.fns
    if (Array.isArray(fns)) {
      for (let i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments)
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns
  return invoker
}

function updateListeners (on, oldOn) {
  let name, cur, old, event
  for (name in on) {
    cur = on[name]
    old = oldOn[name]
    event = { name, capture: false }
    if (!cur) { // v-on:click="clickme" 找不到clickme同名方法定义
      warn(
        `Invalid handler for event "${event.name}": got ` + String(cur)
      )
    } else if (!old) { // 旧vnode没有on此事件
      if (!cur.fns) { // 下次 patch 时就不用重新再包装 listenerCb
        cur = on[name] = createFnInvoker(cur)
      }
      add(event.name, cur, event.capture)
    } else if (cur !== old) { // 旧vnode和新vnode都有on同个事件，并且listenerCb指向不同，只要把当前的listenerCb指向cur的即可
      old.fns = cur
      on[name] = old
    }
  }

  // 把旧的监听移除掉
  for (name in oldOn) {
    if (!on[name]) {
      event = { name, capture: false }
      remove(event.name, oldOn[name], event.capture)
    }
  }
}

export function updateDOMListeners (oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return
  }
  const on = vnode.data.on || {}
  const oldOn = oldVnode.data.on || {}
  target = vnode.elm
  updateListeners(on, oldOn)
}