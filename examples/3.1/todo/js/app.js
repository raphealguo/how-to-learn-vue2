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

    // the root element that will be compiled
    el: '.todoapp',

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
      },
      allDone: {
        get: function () {
          return this.remaining === 0;
        },
        set: function (value) {
          this.todos.forEach(function (todo) {
            todo.completed = value;
          });
        }
      }
    },
    watch: {
      "todos": {
        handler: todoStorage.save,
        deep: true
      }
    },
    methods: {
      inputTodo: function($event){
        this.newTodo = $event.target.value;
      },
      inputEditTodo: function($event, todo){
        todo.title = $event.target.value;
      },
      addTodo: function () {
        var value = this.newTodo && this.newTodo.trim();
        if (!value) {
          return;
        }
        this.todos.push({ title: value, completed: false });
        this.newTodo = '';
      },

      removeTodo: function (todo) {
        var todos = this.todos;
        if (!todos.length) return
        var index = todos.indexOf(todo)
        if (index > -1) {
          todos.splice(index, 1);
        }
      },

      editTodo: function (todo) {
        this.beforeEditCache = todo.title;
        this.editedTodo = todo;
      },

      changeTodo: function (todo) {
        todo.completed = !todo.completed
      },

      doneEdit: function (todo) {
        if (!this.editedTodo) {
          return;
        }
        this.editedTodo = null;
        todo.title = todo.title.trim();
        if (!todo.title) {
          this.removeTodo(todo);
        }
      },

      cancelEdit: function (todo) {
        this.editedTodo = null;
        todo.title = this.beforeEditCache;
      },

      removeCompleted: function () {
        this.todos = filters.active(this.todos);
      }
    }
  });
})(window);
