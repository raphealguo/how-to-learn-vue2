import attrs from './attrs'
import klass from './class'
import events from './events'
import domProps from './dom-props'

import baseModules from 'core/vdom/modules/index'

const platformModules = [
  attrs,
  klass,
  events,
  domProps,
]

const modules = platformModules.concat(baseModules)

export default modules