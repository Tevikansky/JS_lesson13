const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const toDo = JSON.parse(localStorage.getItem('toDo')) || [];

const render = function () {
  todoList.innerHTML = '';
  todoCompleted.innerHTML = '';
  toDo.forEach(function (item, index) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector('.todo-complete').addEventListener('click', function () {
      item.completed = !item.completed;
      render();
    });
    li.querySelector('.todo-remove').addEventListener('click', function () {
      toDo.splice(index, 1);
      render();
    });
  });
  localStorage.setItem('toDo', JSON.stringify(toDo));
};


todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  const newToDo = {
    id: toDo.lenght,
    text: headerInput.value,
    completed: false
  };
  if (newToDo.text !== '') {
    toDo.push(newToDo);
    headerInput.value = '';
  }
  render();
});
render();