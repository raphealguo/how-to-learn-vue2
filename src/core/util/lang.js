/**
 * Check if a string starts with $ or _
 */
export function isReserved (str) {
  // '$' (charCode) 0x24
  // '_' (charCode) 0x5F
  const c = (str + '').charCodeAt(0)
  return c === 0x24 || c === 0x5F
}
