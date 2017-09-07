/**
 * Runtime helper for checking keyCodes from config.
 */
// _k($event.keyCode,"enter",13)
export function checkKeyCodes (eventKeyCode, key, builtInAlias) {
  const keyCodes = builtInAlias
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}
