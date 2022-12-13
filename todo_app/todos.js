// todos.js
function tasks() {
  let toDoList = localStorage.getItem("tasks");
  if (toDoList == "null") {
    toDoList = [];
  } else {
    toDoList = JSON.parse(toDoList);
  }
  return toDoList;
}

function renderTasksFiltered(filter) {
  let toDoList = null;
  if (filter == 'all')
    toDoList = tasks();
  else {
    const completed = filter == 'active' ? false : true;
    toDoList = tasks().filter((task) => task.completed == completed);
  }
  renderTasks(toDoList);

  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    if (button.dataset.function === `filter-${filter}`)
      button.classList.add("active");
    else
      button.classList.remove("active");
  });
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(tasks) {
  const listElement = document.querySelector("#todoList");
  listElement.innerHTML = "";

  if (tasks.length > 0) {
    tasks.forEach((task) => {
      listElement.innerHTML += `
      <li>
        <div class="task">
          <span class="icon ${task.completed ? '' : 'incomplete'}" data-function="complete">
            ${task.completed ? "✅" : "🔲"}
          </span>
          <p ${task.completed ? 'class="strike"' : ""}>${task.content}</p>
        </div>
        <div>
          <span class="icon" data-function="delete">𐄂</span>
        </div>
      </li>`;
    });

    let tasksLeft = tasks.filter((task) => task.completed != true);
    listElement.innerHTML += `
    <li class="summary">
      <span>${tasksLeft.length} tasks left</span>
      <div>
        <button class="active" data-function="filter-all">All</button>
        <button data-function="filter-active">Active</button>
        <button data-function="filter-completed">Completed</button>
      </div>
    </li>
    `;
  } else {
    listElement.innerHTML += `<li class="empty">No tasks</li>`;
  }
}

function newTask() {
  const taskField = document.querySelector("#todo");
  const task = taskField.value;
  if (task != '') {
    const currentTime = new Date().getTime();
    let toDoList = tasks();

    toDoList.push({ id: currentTime, content: task, completed: false });
    saveTasks(toDoList);

    taskField.value = '';
    taskField.focus();
    renderTasks(toDoList);
  } else {
    alert('Enter a task');
    taskField.focus();
  }
}

function removeTask(taskElement) {
  let toDoList = tasks().filter(
    (task) => task.content != taskElement.childNodes[1].childNodes[3].innerText
  );
  saveTasks(toDoList)

  renderTasks(toDoList);
}

function completeTask(taskElement) {
  let toDoList = tasks();

  const taskIndex = toDoList.findIndex(
    (task) => task.content === taskElement.childNodes[1].childNodes[3].innerText
  );

  toDoList[taskIndex].completed = toDoList[taskIndex].completed ? false : true;
  saveTasks(toDoList)

  renderTasks(toDoList);
}

function manageTasks(e) {
  const parent = e.target.closest("li");
  if (e.target.dataset.function === "delete") {
    removeTask(parent);
  }
  if (e.target.dataset.function === "complete") {
    completeTask(parent);
  }
  if (e.target.dataset.function === "filter-all") {
    renderTasksFiltered('all');
  }
  if (e.target.dataset.function === "filter-active") {
    renderTasksFiltered('active');
  }
  if (e.target.dataset.function === "filter-completed") {
    renderTasksFiltered('completed');
  }
}

document.querySelector("#submitTask").addEventListener("click", newTask);
document.querySelector("#todoList").addEventListener("click", manageTasks);

renderTasks(tasks());