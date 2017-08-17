# VNode render

## 1. render code

### 1.1. 非文本 VNode 节点

html:

```html
<div></div>
```

render code:

```javascript
_c("div", {}, [])
```

### 1.2. 文本 VNode 节点

html:

```html
<div>text</div>
```

render code:

```javascript
_c("div", {}, [
  _v("text")
])
```

### 1.3. 文本节点带表达式

html:

```html
<div>{{ first }} and {{ secend }}</div>
```

render code:

```javascript
_c("div", {}, [
  _v( _s(first) + "and" + _s(secend) )
])
```

### 1.4. 节点的attrs和props

html:

```html
<input class="warn" value="default text" :style="innerStyle">
```

render code:

```javascript
_c("input", {
  attrs: { "class": "warn", "style": innerStyle },
  domProps: { "value": "default text" }
}, [])
```

## 2. renderHelpersFunc

1. _c (tag, data, children)  创建一个非文本 VNode 节点
2. _v (text)  创建一个文本VNode节点
3. _s (exp)  把 exp 输出成字符串