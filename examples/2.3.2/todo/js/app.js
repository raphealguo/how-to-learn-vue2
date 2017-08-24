/*global Vue, todoStorage */

(function (exports) {

  'use strict';

  todoStorage.save([
    { "title": "item 1", "completed": true },
    { "title": "item 2", "completed": false },
    { "title": "item 3", "completed": true },
    { "title": "item 4", "completed": false }
  ])

  var filters = {
    all: function (todos) {
      return todos;
    },
    active: function (todos) {
      return todos.filter(function (todo) {
        return !todo.completed;
      });
    },
    completed: function (todos) {
      return todos.filter(function (todo) {
        return todo.completed;
      });
    }
  };

  var vm = exports.app = new Vue({

    template: document.getElementById("tmpl").innerHTML,

    // app initial state
    data: {
      todos: todoStorage.fetch(),
      newTodo: '',
      editedTodo: null,
      visibility: 'all'
    },
    computed: {
      filteredTodos: function () {
        return filters[this.visibility](this.todos);
      },
      remaining: function () {
        return filters.active(this.todos).length;
      }
    },
  });

  vm.$mount("todoapp")

})(window);
