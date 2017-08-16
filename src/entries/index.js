import VNode from 'core/vdom/vnode'
import patch from 'core/vdom/patch'
import parse from 'compiler/index'
import generate from 'compiler/codegen/index'

window.VNode = VNode
window.patch = patch
window.parse = parse
window.generate = generate
