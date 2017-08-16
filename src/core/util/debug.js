const hasConsole = typeof console !== 'undefined'

export function warn (msg, vm) {
  if (hasConsole) {
    console.error(`[Vue warn]: ${msg} `)
  }
}
