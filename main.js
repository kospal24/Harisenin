document.addEventListener("DOMContentLoaded", function () {
  loadTask();
});

function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();

  if (!taskText) {
    return;
  }

  let li = document.createElement("li");
  li.innerHTML = `<span onclick="toggleComplete(this)">${taskText}</span><button onclick="removeTask(this, '${taskText}')">Remove</button>`;
  document.getElementById("taskList").appendChild(li);
  saveTask(taskText);

  input.value = "";
}

function removeTask(button, taskText) {
  let tasks = getTaskFromStorage();
  tasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  button.parentElement.remove();
}

function toggleComplete(tasks) {
  tasks.classList.toggle("completed");
  updateTask(tasks);
}

function saveTask(taskText) {
  // Corrected line: use getTaskFromStorage to retrieve tasks from local storage
  let tasks = getTaskFromStorage();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log("Task:", tasks);
}

function getTaskFromStorage() {
  let tasks = localStorage.getItem("tasks");
  try {
    tasks = JSON.parse(tasks) || [];
  } catch (error) {
    tasks = [];
  }

  return tasks;
}

function loadTask() {
  let tasks = getTaskFromStorage();
  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.innerHTML = `<span class="${
      task.completed ? "completed" : ""
    }" onclick="toggleComplete(this)">${
      task.text
    }</span><button onclick="removeTask(this, '${task.text}')">Remove</button>`; // Changed taskText to task.text
    document.getElementById("taskList").appendChild(li);
  });
}

function updateTask(taskText) {
  console.log("updating task:", taskText.innerHTML);
  let tasks = getTaskFromStorage(); // Corrected variable name
  tasks.forEach((task) => {
    if (task.text === taskText.innerHTML) {
      task.completed = !task.completed;
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log("Task:", tasks);
}
