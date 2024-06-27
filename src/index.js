import "./style.css";
import { addTask, addProject } from "./state.js";
import { clearProjectForm, clearTaskForm } from "./updateDisplay.js";

const navBarIcon = document.getElementById("nav-bars");
const navBar = document.getElementById("nav-bar");
const taskForm = document.getElementById("task-form");
const addTaskIcon = document.getElementById("add-task");
const taskModal = document.getElementById("task-modal");
const closeTaskModal = document.getElementById("close-modal");
const projectModal = document.getElementById("project-dialog");
const addProjectIcon = document.getElementById("add-project-icon");
const closeProjectModal = document.getElementById("close-project-modal");
const projectForm = document.getElementById("project-form");
const saveTaskBtn = document.getElementById("save-task");
const saveProjectBtn = document.getElementById("save-project");

navBarIcon.addEventListener("click", () => {
  navBar.classList.toggle("hidden");
});

addTaskIcon.addEventListener("click", () => {
  saveTaskBtn.innerText = "Add";
  taskModal.showModal();
});

addProjectIcon.addEventListener("click", () => {
  saveProjectBtn.innerText = "Add";
  projectModal.showModal();
});

closeTaskModal.addEventListener("click", () => {
  clearTaskForm();
  taskModal.close();
});

closeProjectModal.addEventListener("click", () => {
  projectModal.close();
});
