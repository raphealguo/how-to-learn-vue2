import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (!(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)

export default Vue
