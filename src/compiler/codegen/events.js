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
  } else {
    return handler.value
  }
}