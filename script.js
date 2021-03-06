// The main javascript file for the todo list. Older versions are available for viewing in the repository to allow for a clear development in ideas to be seen.

// Modify the todo list.
var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var completedTodos = 0;
    var totalTodos = this.todos.length;

    // Get number of completed todos.
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });

    this.todos.forEach(function(todo) {
      // Case 1: If all true, make all false.
      if (completedTodos === totalTodos) {
        todo.completed = false;
      // Case 2: If all or some are false, make all true.
      } else {
        todo.completed = true;
      }
    });
  }
};

// Handle user interactions.
var handlers = {
  addTodo: function () {
    var addTodoInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoInput.value);
    addTodoInput.value = '';
    view.displayTodos();
  },
  changeTodo: function () {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function (position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function () {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function () {
    todoList.toggleAll();
    view.displayTodos();
  }
};

// Display the todo list to the user.
var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    todoList.todos.forEach(function(todo, position){
      var todoLi = document.createElement('li');
      var TodoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = '(X) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }

      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);

    }, this);
  },
  createDeleteButton: function() {
  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'deleteButton';
  return deleteButton;
  },
  setUpEventListeners:  function() {
      var todosUl = document.querySelector('ul');
      todosUl.addEventListener('click', function(event) {
      // console.log(event.target.parentNode.id);
      var elementClicked = event.target;

      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();
