/*global Vue, todoStorage */

(function (exports) {

  'use strict';

  todoStorage.save([
    { "title": "item 1", "completed": true },
    { "title": "item 2", "completed": false },
    { "title": "item 3", "completed": true },
    { "title": "item 4", "completed": false }
  ])

  var vm = exports.app = new Vue({

    template: document.getElementById("tmpl").innerHTML,

    // app initial state
    data: {
      todos: todoStorage.fetch(),
      newTodo: '',
      editedTodo: null,
      visibility: 'all'
    },
  });

  vm.$mount("todoapp")

})(window);
