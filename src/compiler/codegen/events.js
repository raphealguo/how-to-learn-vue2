// v-on:click="function(){}"
// v-on:click="() => {}"
const fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/

// v-on:click="xxx" // xxx为vm的一个方法名字
const simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/

//else : // v-on:click="console.log(xxx);xxxx;" // 要被包裹成 function($event) { console.log(xxx);xxxx; }

// keyCode aliases
const keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
}

const genGuard = condition => `if(${condition})return null;`
// 生成的代码就变成
/*
  function ($event) {
    if ($event.target !== $event.currentTarget) return null;
    if ($event.keyCode !== 13) return null;
  }
*/

const modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard(`$event.target !== $event.currentTarget`),
  ctrl: genGuard(`!$event.ctrlKey`),
  shift: genGuard(`!$event.shiftKey`),
  alt: genGuard(`!$event.altKey`),
  meta: genGuard(`!$event.metaKey`),
  left: genGuard(`$event.button !== 0`),
  middle: genGuard(`$event.button !== 1`),
  right: genGuard(`$event.button !== 2`)
}

export function genHandlers (events) {
  let res = 'on:{'
  for (const name in events) {
    res += `"${name}":${genHandler(name, events[name])},`
  }
  return res.slice(0, -1) + '}'
}

// v-on:click="clickme"
// name='click'   handler="clickme"
function genHandler (name, handler) {
  if (!handler) {
    return 'function(){}'
  } else if (Array.isArray(handler)) {
    return `[${handler.map(handler => genHandler(name, handler)).join(',')}]`
  } else if (!handler.modifiers) { // 没有修饰符的话  .stop .prevent .self
    //支持：v-on:click="removeTodo(todo)" 和 v-on:click="xx"
    return fnExpRE.test(handler.value) || simplePathRE.test(handler.value)
      ? handler.value
      : `function($event){${handler.value}}`
  } else {
    let code = ''
    const keys = []
    for (const key in handler.modifiers) {
      if (modifierCode[key]) {
        code += modifierCode[key]
      } else {
        keys.push(key)
      }
    }

    /* genKeyFilter(keys) 生成前缀判断条件:
        {
          if ($event.keyCode !== 13 && _k($event.keyCode,"enter", 13)) return null;
        }
    */
    if (keys.length) {
      code = genKeyFilter(keys) + code
    }
    const handlerCode = simplePathRE.test(handler.value)
      ? handler.value + '($event)'  // v-on:click="xxx" // 生成 xxx($event)
      : handler.value               // v-on:click="console.log(xxx);xxxx;"
    return `function($event){${code}${handlerCode}}`
  }
}

function genKeyFilter (keys) {
  return `if(${keys.map(genFilterCode).join('&&')})return null;`
}

function genFilterCode (key) {
  const keyVal = parseInt(key, 10)
  if (keyVal) { // v-on:keydown.10
    return `$event.keyCode!==${keyVal}`
  }
  // v-on:keydown.enter
  const alias = keyCodes[key]
  //
  return `_k($event.keyCode,${JSON.stringify(key)}${alias ? ',' + JSON.stringify(alias) : ''})`
}