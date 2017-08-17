/*global Vue, todoStorage */

(function (exports) {

  'use strict';

  var vm = exports.app = new Vue({

    template: document.getElementById("tmpl").innerHTML,

    // app initial state
    data: {
      todos: todoStorage.fetch(),
      newTodo: 'default newTodo text',
      editedTodo: null,
      visibility: 'all'
    },
  });

  vm.$mount("todoapp")

})(window);
