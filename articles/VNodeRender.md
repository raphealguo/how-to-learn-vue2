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

### 1.5 v-if v-else-if v-else语法

html:

```html
<div>
	<div v-if="a > 0">Item 1</div>
	<div v-else-if="b > 0">Item 2</div>
	<div v-else>Item 3</div>
</div>
```

render code:

```javascript
_c('div', {}, [ /* 留意children数组只有一个元素 */
	(a > 0) ?  // if
		_c('div', {}, [ _v("Item 1") ]) :
	(b > 0) ?  // elseif
		_c('div', {}, [ _v("Item 2") ]) :
				 // else
		_c('div', {}, [ _v("Item 3") ])
])
```

### 1.6 仅有 v-if 语法

html:

```html
<div>
	<div v-if="a > 0">Item 1</div>
</div>
```

render code:

```javascript
_c('div', {}, [ /* 留意children数组只有一个元素 */
	(a > 0) ?  // if
		_c('div', {}, [ _v("Item 1") ]) :
						// else
		_e()  // 产生一个空 VNode
])
```

### 1.7 v-for 基本语法

html:

```html
<ul>
	<li v-for="(item, index) in items">{{ index }} - {{ item }}</li>
</ul>
```
render code:

```javascript
_c('ul', {},
	_l((items), function(item, index) {
		return _c('li', {}, [ _v( _s(index) + " - " + _s(item) ) ])
	}
))
```

### 1.8 v-for 与 v-if 同时声明

html:

```html
<ul>
	<li v-for="(item, index) in items" v-if="index == 0">{{ index }} - {{ item }}</li>
</ul>
```
render code:

```javascript
_c('ul', {},
  _l((items), function(item, index) {
    // if 语法编译在 _l 里边，所以 if 里边的表达式可以引用 item 等变量
    return (index == 0) ?
          _c('li', {}, [ _v( _s(index) + " - " + _s(item) ) ]) :
          _e()
  }
))
```

## 2. renderHelpersFunc

1. _c (tag, data, children)  创建一个非文本 VNode 节点
2. _v (text)  创建一个文本VNode节点
3. _s (exp)  把 exp 输出成字符串
4. _e() 创建一个空的 VNode
5. _l (list, render) 渲染一个 VNode 列表