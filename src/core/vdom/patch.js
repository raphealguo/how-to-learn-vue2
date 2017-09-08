import * as nodeOps from 'web/runtime/node-ops'
import VNode from './vnode'
import platformModules from 'web/runtime/modules/index'
import { registerRef } from './modules/ref'

export const emptyNode = new VNode('', {}, [])

const hooks = ['create', 'update']

function isUndef (s) {
  return s == null
}

function isDef (s) {
  return s != null
}

function sameVnode (vnode1, vnode2) {
  return (
    vnode1.key === vnode2.key &&
    vnode1.tag === vnode2.tag &&
    vnode1.isComment === vnode2.isComment &&
    !vnode1.data === !vnode2.data
  )
}

// 把所有钩子都放在这里
let i, j
const cbs = {}

const modules = platformModules

for (i = 0; i < hooks.length; ++i) {
  cbs[hooks[i]] = []
  for (j = 0; j < modules.length; ++j) {
    if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]])
  }
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}

function emptyNodeAt (elm) {
  return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
}

function removeNode (el) {
  const parent = nodeOps.parentNode(el)
  if (parent) {
    nodeOps.removeChild(parent, el)
  }
}

function createElm (vnode, parentElm, refElm) {
  if (createComponent(vnode, parentElm, refElm)) {// 如果vnode是特殊的自定义组件节点！
    return
  }

  const children = vnode.children
  const tag = vnode.tag
  if (isDef(tag)) {
    vnode.elm = nodeOps.createElement(tag)

    createChildren(vnode, children)

    // 属性
    /*
    updateAttrs(emptyNode, vnode)
    updateClass(emptyNode, vnode)
    updateDOMProps(emptyNode, vnode)
    updateDOMListeners(emptyNode, vnode)
    */
    invokeCreateHooks(vnode)

    insert(parentElm, vnode.elm, refElm)
  } else if (vnode.isComment) {
    vnode.elm = nodeOps.createComment(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  } else { // 文本节点
    vnode.elm = nodeOps.createTextNode(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  }
}

function createComponent (vnode, parentElm, refElm) {
  let i = vnode.data
  if (isDef(i)) {
    if (isDef(i = i.hook) && isDef(i = i.init)) {
      i(vnode, parentElm, refElm)

      if (isDef(vnode.componentInstance)) {
        // 绑定事件
        initComponent(vnode)
        return true
      }
    }
  }
}

function initComponent (vnode) {
  vnode.elm = vnode.componentInstance.$el
  if (isPatchable(vnode)) {
    /*
    updateAttrs(emptyNode, vnode)
    updateClass(emptyNode, vnode)
    updateDOMProps(emptyNode, vnode)
    updateDOMListeners(emptyNode, vnode)
    */
    invokeCreateHooks(vnode)
  } else {
    registerRef(vnode)
  }
}
function insert (parent, elm, ref) {
  if (parent) {
    if (ref) {
      nodeOps.insertBefore(parent, elm, ref)
    } else {
      nodeOps.appendChild(parent, elm)
    }
  }
}

function isPatchable (vnode) {
  while (vnode.componentInstance) {
    vnode = vnode.componentInstance._vnode
  }
  return isDef(vnode.tag)
}

function invokeCreateHooks (vnode) {
  for (let i = 0; i < cbs.create.length; ++i) {
    cbs.create[i](emptyNode, vnode)
  }
  i = vnode.data.hook // Reuse variable
  if (isDef(i)) {
    if (i.create) i.create(emptyNode, vnode)
  }
}

function createChildren (vnode, children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; ++i) {
      createElm(children[i], vnode.elm, null)
    }
  }
}

function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    createElm(vnodes[startIdx], parentElm, refElm)
  }
}

function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx]
    if (isDef(ch)) {
      removeNode(ch.elm)
    }
  }
}

function updateChildren (parentElm, oldCh, newCh, removeOnly) {
  let oldStartIdx = 0
  let newStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let oldStartVnode = oldCh[0]
  let oldEndVnode = oldCh[oldEndIdx]
  let newEndIdx = newCh.length - 1
  let newStartVnode = newCh[0]
  let newEndVnode = newCh[newEndIdx]
  let oldKeyToIdx, idxInOld, elmToMove, refElm

  const canMove = !removeOnly

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode)
      canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode)
      canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
      idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null
      if (isUndef(idxInOld)) { // 当前元素在旧VNode里边找不到相同的key
        createElm(newStartVnode, parentElm, oldStartVnode.elm)
        newStartVnode = newCh[++newStartIdx]
      } else {
        elmToMove = oldCh[idxInOld] // 找到同key的元素

        if (!elmToMove) {
          warn(
            'It seems there are duplicate keys that is causing an update error. ' +
            'Make sure each v-for item has a unique key.'
          )
        }
        if (sameVnode(elmToMove, newStartVnode)) {
          patchVnode(elmToMove, newStartVnode) // 先patch这个节点
          oldCh[idxInOld] = undefined
          canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm) // 然后开始移动
          newStartVnode = newCh[++newStartIdx]
        } else {
          // 虽然是同个key，但是标签等不一致。同样不能复用
          createElm(newStartVnode, parentElm, oldStartVnode.elm)
          newStartVnode = newCh[++newStartIdx]
        }
      }
    }
  }
  if (oldStartIdx > oldEndIdx) {
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx)
  } else if (newStartIdx > newEndIdx) {
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
  }
}

function patchVnode (oldVnode, vnode, removeOnly) {
  if (oldVnode === vnode) {
    return
  }

  let i
  const data = vnode.data
  const hasData = isDef(data)
  const elm = vnode.elm = oldVnode.elm
  const oldCh = oldVnode.children
  const ch = vnode.children

  if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
    i(oldVnode, vnode)
  }
  // 更新属性
  if (hasData && isPatchable(vnode)) {
    /*
    updateAttrs(oldVnode, vnode)
    updateClass(oldVnode, vnode)
    updateDOMProps(oldVnode, vnode)
    updateDOMListeners(oldVnode, vnode)
    */
    for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
  }

  if (isUndef(vnode.text)) {
    if (isDef(oldCh) && isDef(ch)) {
      if (oldCh !== ch) updateChildren(elm, oldCh, ch, removeOnly)
    } else if (isDef(ch)) {
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
      addVnodes(elm, null, ch, 0, ch.length - 1)
    } else if (isDef(oldCh)) {
      removeVnodes(elm, oldCh, 0, oldCh.length - 1)
    } else if (isDef(oldVnode.text)) {
      nodeOps.setTextContent(elm, '')
    }
  } else if (oldVnode.text !== vnode.text) {
    nodeOps.setTextContent(elm, vnode.text)
  }
}

export default function patch (oldVnode, vnode, parentElm, refElm) {
  if (!vnode) { // 销毁vm的时候 vnode=null
    return
  }
  let isInitialPatch = false
  if (!oldVnode) { // 说明之前都没挂在过
    // empty mount (likely as component), create new root element
    isInitialPatch = true
    // 此时vnode这个自定义组件内部生成的root就是 vnode挂在的elm
    // 绑定的原生事件就绑在这个elm上
    createElm(vnode, parentElm, refElm)
  } else { // 原来的逻辑
    const isRealElement = isDef(oldVnode.nodeType)
    if (!isRealElement && sameVnode(oldVnode, vnode)) {// 如果两个vnode节点根一致
      patchVnode(oldVnode, vnode)
    } else {
      if (isRealElement) {
        oldVnode = emptyNodeAt(oldVnode)
      }
      //既然到了这里 就说明两个vnode的dom的根节点不一样
      //只是拿到原来的dom的容器parentElm，把当前vnode的所有dom生成进去
      //然后把以前的oldVnode全部移除掉
      const oldElm = oldVnode.elm
      const parentElm = nodeOps.parentNode(oldElm)
      createElm(
        vnode,
        parentElm,
        nodeOps.nextSibling(oldElm)
      )

      if (parentElm !== null) {
        removeVnodes(parentElm, [oldVnode], 0, 0)
      }
    }
  }

  return vnode.elm
}
