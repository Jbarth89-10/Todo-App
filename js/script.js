
let taskInput = document.getElementById("taskInput");
let addTaskBtn = document.getElementById("addTaskBtn");
let taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}



addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});


function addTask() {
  let taskText = taskInput.value;

  if (taskText === "") return;

  tasks.push(taskText);
  taskInput.value = "";

  saveTasks();
  displayTasks();
}


function displayTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = "<li>No tasks yet 🎉</li>";
    return;
  }

  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement("li");

    
    let taskText = document.createElement("span");
    taskText.textContent = (i + 1) + ". " + tasks[i];

    
    let editBtn = document.createElement("button");
    editBtn.textContent = "📝edit";
    editBtn.style.marginLeft = "10px";

    editBtn.addEventListener("click", function () {
      startEditTask(i);
    });

    
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌␡";
    deleteBtn.style.marginLeft = "5px";

    deleteBtn.addEventListener("click", function () {
      removeTask(i);
    });

    li.appendChild(taskText);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }
}

function startEditTask(index) {
  let li = taskList.children[index];

  let input = document.createElement("input");
  input.type = "text";
  input.value = tasks[index];

  let saveBtn = document.createElement("button");
  saveBtn.textContent = "💾save";
  saveBtn.style.marginLeft = "5px";

  
  function saveEdit() {
    if (input.value !== "") {
      tasks[index] = input.value;
      saveTasks();
      displayTasks();
    }
  }

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      saveEdit();
    }
    if (event.key === "Escape") {
      displayTasks();
    }
  });

  saveBtn.addEventListener("click", saveEdit);

  li.innerHTML = "";
  li.appendChild(input);
  li.appendChild(saveBtn);
  input.focus();
}



function editTask(index) {
  let newTask = prompt("Edit your task:", tasks[index]);

  if (newTask !== null && newTask !== "") {
    tasks[index] = newTask;
    displayTasks();
  }
}


function removeTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}
displayTasks();
