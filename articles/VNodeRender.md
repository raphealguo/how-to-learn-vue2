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



## 2. renderHelpersFunc

1. _c (tag, data, children)  创建一个非文本 VNode 节点
2. _v (text)  创建一个文本VNode节点
3. _s (exp)  把 exp 输出成字符串
4. _e() 创建一个空的 VNode