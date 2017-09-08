// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  const div = document.createElement('div')
  div.innerHTML = `<div a="${content}">`
  return div.innerHTML.indexOf(encoded) > 0
}

export const shouldDecodeNewlines = shouldDecode('\n', '&#10;')