# VNode render

## render code

### 1. 非文本 VNode 节点

html:

```html
<div></div>
```

render code:

```javascript
_c("div", [])
```

## 2. 文本 VNode 节点

html:

```html
<div>text</div>
```

render code:

```javascript
_c("div", [
  _v("text")
])
```

## 3. 文本节点带表达式

html:

```html
<div>{{ first }} and {{ secend }}</div>
```

render code:

```javascript
_c("div", [
  _v( _s(first) + "and" + _s(secend) )
])
```

## renderHelpersFunc

1. _c (tag, children)  创建一个非文本 VNode 节点
2. _v (text)  创建一个文本VNode节点
3. _s (exp)  把 exp 输出成字符串