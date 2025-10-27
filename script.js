const taskInput = document.getElementById("taskInput")
const addBtn = document.getElementById("addBtn")
const taskList = document.getElementById("taskList")

document.addEventListener("DOMContentLoaded", loadTasks)
addBtn.addEventListener("click", addTask)

function addTask() {
  const taskText = taskInput.value.trim()
  if (taskText === "") return
  const task = { text: taskText, completed: false }
  const tasks = getTasks()
  tasks.push(task)
  localStorage.setItem("tasks", JSON.stringify(tasks))
  taskInput.value = ""
  displayTasks()
}

function displayTasks() {
  taskList.innerHTML = ""
  const tasks = getTasks()
  tasks.forEach((task, index) => {
    const li = document.createElement("li")
    li.textContent = task.text
    if (task.completed) li.classList.add("completed")

    li.addEventListener("click", () => toggleComplete(index))
    const delBtn = document.createElement("button")
    delBtn.textContent = "Delete"
    delBtn.classList.add("delete")
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      deleteTask(index)
    })

    li.appendChild(delBtn)
    taskList.appendChild(li)
  })
}

function toggleComplete(index) {
  const tasks = getTasks()
  tasks[index].completed = !tasks[index].completed
  localStorage.setItem("tasks", JSON.stringify(tasks))
  displayTasks()
}

function deleteTask(index) {
  const tasks = getTasks()
  tasks.splice(index, 1)
  localStorage.setItem("tasks", JSON.stringify(tasks))
  displayTasks()
}

function loadTasks() {
  displayTasks()
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || []
}
