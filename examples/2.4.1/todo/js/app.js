/*global Vue, todoStorage */

(function (exports) {

  'use strict';

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
    methods: {
      inputTodo: function($event){
        this.newTodo = $event.target.value;
      },
      addTodo: function ($event) {
        if ($event.which !== 13) { return }
        var value = this.newTodo && this.newTodo.trim();
        if (!value) {
          return;
        }
        this.todos.push({ title: value, completed: false });
        this.newTodo = '';
      },
      removeCompleted: function () {
        this.todos = filters.active(this.todos);
      }
    }
  });

  vm.$mount("todoapp")

  vm.$watch("todos", function(todos){
    todoStorage.save(todos);
  }, {
    deep: true
  })
})(window);
