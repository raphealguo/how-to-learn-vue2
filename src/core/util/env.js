// can we use __proto__?
export const hasProto = '__proto__' in {}

/* istanbul ignore next */
export function isNative (Ctor) {
  return /native code/.test(Ctor.toString())
}

let _Set
if (typeof Set !== 'undefined' && isNative(Set)) {
  _Set = Set
} else {
  // Set polyfill
  // 搞个简单的Set polyfill
  _Set = class Set {
    constructor () {
      this.set = Object.create(null)
    }
    has (key) {
      return this.set[key] === true
    }
    add (key) {
      this.set[key] = true
    }
    clear () {
      this.set = Object.create(null)
    }
  }
}

export { _Set }