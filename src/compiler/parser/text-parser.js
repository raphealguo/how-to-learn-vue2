const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g

export function parseText (text) { // text = "abc{{a}}xxx{{b}}def"  ->   tokens = ["abc", _s(a)", "xx", "_s(b)", "def"]
  const tagRE = defaultTagRE
  if (!tagRE.test(text)) {
    return
  }
  const tokens = []
  let lastIndex = tagRE.lastIndex = 0
  let match, index
  while ((match = tagRE.exec(text))) {
    index = match.index
    // push text token
    // push("abc")  push("xxx")
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)))
    }
    // tag token
    // push("_s(a)")  push("_s(b)")
    const exp = match[1].trim()
    tokens.push(`_s(${exp})`)
    lastIndex = index + match[0].length
  }
  if (lastIndex < text.length) { // push("def")
    tokens.push(JSON.stringify(text.slice(lastIndex)))
  }
  return tokens.join('+')
}
