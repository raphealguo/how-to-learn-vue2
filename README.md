# 如何学习Vue2源码

## 背景

近期我们把微信公众平台管理端的前端框架切成 MVVM 架构，框架层面最终我们选择了 [Vue](https://github.com/vuejs/vue)，为了更了解 Vue，阅读Vue源码是必要的。

我参考的 Vue 版本是 [2.2.0](https://github.com/vuejs/vue/tree/v2.2.0)，整个项目的代码1万2千行，如果不搞清楚原理，直接每一行看下来肯定会漏掉不少细节，或者对作者为什么这样写代码感到莫名其妙。

如此庞大的项目要啃下来并非易事，里边涉及到非常多的概念：Virtual Dom; 条件/列表渲染; 自定义组件; 双向绑定; 指令等等。

按照经验，编写这么庞大的系统，我们总是从第1行代码开始写起，慢慢写到第1万行，逐步构造出整个系统/框架。

所以我也会按照这个思路，从零开始构造出一个完整的Vue框架。

## 如何运行

从 [how-to-learn-vue2项目](https://github.com/raphealguo/how-to-learn-vue2) 下载各个分支代码

使用 webpack 进行打包，源码采用ES6风格编写。

构建:  `npm install; webpack`

统计当前分支源码行数: `npm run line`

运行 Demo: 直接使用 Chrome 打开 examples 目录里边的实例代码即可

## 如何阅读

建议按照下边顺序阅读，同时参考 [官方的教程](https://cn.vuejs.org/v2/guide/index.html) 配合理解。

我会把每个章节的 **源码行数** 以及 **对应的分支** 标记出来，方便大家可以看到每次源码变更的行数。

1. 第一章 基础概念

	* [1.1 Virtual DOM](https://github.com/raphealguo/how-to-learn-vue2-blob/blob/master/articles/1.1.md) (源码总共 231 行，[查看代码](https://github.com/raphealguo/how-to-learn-vue2/tree/1.1/src))

		整个Vue的底层渲染机制是依赖VD的实现，因此先写一个极简的VD算法是非常不错的开头。

	* [1.2 HTML parser](https://github.com/raphealguo/how-to-learn-vue2-blob/blob/master/articles/1.2.md) (源码总共 639 行，[查看代码](https://github.com/raphealguo/how-to-learn-vue2/tree/1.2/src)，[查看新增代码](https://github.com/raphealguo/how-to-learn-vue2/compare/1.1...1.2))

		每次手工构造一个 VNode 树效率非常低，而且可读性差，因此这一节会构造一个解释器，能把 HTML 字符串转化成 VNode树。

		还可以阅读一下番外篇: [1.2.1 一个兼容性更佳的HTML parser](https://github.com/raphealguo/how-to-learn-vue2-blob/blob/master/articles/1.2.1.md)

	* [1.3 构建一个最简单的数据绑定的 Vue](https://github.com/raphealguo/how-to-learn-vue2-blob/blob/master/articles/1.3.md) (源码总共 945 行，[查看代码](https://github.com/raphealguo/how-to-learn-vue2/tree/1.3/src)，[查看新增代码](https://github.com/raphealguo/how-to-learn-vue2/compare/1.2.1...1.3))

		前边2节的代码已经让我们有足够的基础可以构造一个简单的 Vue 类，在这一篇文章会介绍如何在 Vue 模板语法新增语法糖的流程。

2. 第二章 Vue雏形

	* [2.1 VNode 的属性 attrs 和 props](https://github.com/raphealguo/how-to-learn-vue2-blob/blob/master/articles/2.1.md) (源码总共 1112 行，[查看代码](https://github.com/raphealguo/how-to-learn-vue2/tree/2.1/src)，[查看新增代码](https://github.com/raphealguo/how-to-learn-vue2/compare/1.3...2.1))

		在前边我们忽略了 Dom 元素的属性，我们这一节就把这个补齐，同时从这一节开始我们来逐步完善一个 Vue 的 todo 案例。

	* 2.2 控制语句

		* [2.2.1 条件渲染 v-if, v-else-if, v-else](https://github.com/raphealguo/how-to-learn-vue2-blob/blob/master/articles/2.2.1.md) (源码总共 1237 行，[查看代码](https://github.com/raphealguo/how-to-learn-vue2/tree/2.2.1/src)，[查看新增代码](https://github.com/raphealguo/how-to-learn-vue2/compare/2.1...2.2.1))

			往往我们需要通过控制某个状态显示或者隐藏界面的某部分，这里就需要用到 if else 的控制语句。

		* [2.2.2 列表渲染 v-for](https://github.com/raphealguo/how-to-learn-vue2-blob/blob/master/articles/2.2.2.md) (源码总共 1371 行，[查看代码](https://github.com/raphealguo/how-to-learn-vue2/tree/2.2.2/src)，[查看新增代码](https://github.com/raphealguo/how-to-learn-vue2/compare/2.2.1...2.2.2))

			这一节我们更新了 todo 的案例，支持 v-for 语法，可以传递一个数组进行列表渲染。

			想了解如何改善 VNode 的 patch 算法减少列表 DOM 大规模重绘，还可以阅读番外篇: [2.2.2.1 列表渲染 v-for 的 key](https://github.com/raphealguo/how-to-learn-vue2-blob/blob/master/articles/2.2.2.1.md)。

	* 2.3 数据绑定

		* [2.3.1 响应式原理](https://github.com/raphealguo/how-to-learn-vue2-blob/blob/master/articles/2.3.1.md) (源码总共 1547 行，[查看代码](https://github.com/raphealguo/how-to-learn-vue2/tree/2.3.1/src)，[查看新增代码](https://github.com/raphealguo/how-to-learn-vue2/compare/2.2.2.1...2.3.1))

			在之前的例子中，我们总是通过 vm.setData( { a:1, b:2 /* 需要填写整个完整的 data */} ) 来改变数据，从而引起界面的响应式变化。为了提高开发效率和可读性，我们更希望使用 vm.a = 3 来修改值，从而更新视图。

		* [2.3.2 深度追踪依赖变化](https://github.com/raphealguo/how-to-learn-vue2-blob/blob/master/articles/2.3.2.md) (源码总共 2245 行，[查看代码](https://github.com/raphealguo/how-to-learn-vue2/tree/2.3.2/src)，[查看新增代码](https://github.com/raphealguo/how-to-learn-vue2/compare/2.3.1...2.3.2))

			在 2.3.1 节中，只要任何数据变化都一定会引起 VNode 树的更新计算，显然不是最高效的，因为界面不一定绑定了所有 vm 的所有属性，那些没被绑定的属性的更新不应该引起整个 vm 的 VNode 树计算，所以我们要追踪整个 VNode 树依赖的变化。

	* 2.4 事件处理器

		* [2.4.1 事件处理](https://github.com/raphealguo/how-to-learn-vue2-blob/blob/master/articles/2.4.1.md) (源码总共 2391 行，[查看代码](https://github.com/raphealguo/how-to-learn-vue2/tree/2.4.1/src)，[查看新增代码](https://github.com/raphealguo/how-to-learn-vue2/compare/2.3.2...2.4.1))

			前边一直在介绍如何渲染界面，当你需要和界面做交互的时候，就需要涉及到 Dom 的事件处理，所以在这一节，我们也要往之前的模型里边加上监听事件的语法。

		* [2.4.2 完善事件语法以及事件修饰符](https://github.com/raphealguo/how-to-learn-vue2-blob/blob/master/articles/2.4.2.md) (源码总共 2563 行，[查看代码](https://github.com/raphealguo/how-to-learn-vue2/tree/2.4.2/src)，[查看新增代码](https://github.com/raphealguo/how-to-learn-vue2/compare/2.4.1...2.4.2))

			2.4.1节设计的 v-on 语法仅接受方法名: ```v-on:dblclick="editTodo"``` ，由于语法过于局限，所以没法在触发 editTodo 事件的时候知道当前元素映射的数据，更好的语法应该是 ```v-on:dblclick="editTodo(todo)"``` ，此外这一节也新增点语法糖: Vue 的事件修饰符。

	* 2.5 完成todo案例 (源码总共 2832 行，[查看代码](https://github.com/raphealguo/how-to-learn-vue2/tree/2.5/src)，[查看新增代码](https://github.com/raphealguo/how-to-learn-vue2/compare/2.4.2...2.5))

		基本的 Vue 雏形就完成了，我们把一些代码重新组织了一下，新增了一点点语法糖([绑定-HTML-Class](https://cn.vuejs.org/v2/guide/class-and-style.html#绑定-HTML-Class))，完善了整个 todo 的案例([查看代码](https://github.com/raphealguo/how-to-learn-vue2/tree/2.5/examples/2.5/todo))。到这一节结束，Vue 的工作原理已经剖析清楚了。

3. 第三章 Vue进阶

	* 3.1 生命周期

	* 3.2 自定义组件

		* 3.2.1 Vue.extend

		* 3.2.2 简单的自定义组件

		* 3.2.3 组件的prop

		* 3.2.4 组件的事件与原生事件

		* 3.2.5 slot

	* 3.3 nextTick

	* 3.4 指令

		* 3.4.1 自定义指令，内置 v-show 指令

		* 3.4.2 内置 v-text v-html 指令

	* 3.5 双向绑定 v-model 指令

## 附录

1. [VNode render](https://github.com/raphealguo/how-to-learn-vue2-blob/blob/master/articles/VNodeRender.md)

## 关于我

博客：[http://rapheal.sinaapp.com/](http://rapheal.sinaapp.com/)

微博：[@raphealguo](http://weibo.com/p/1005051628949221)