import "./style.css";

import { addTasks, addProjects } from "./state.js";

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

navBarIcon.addEventListener("click", () => {
  navBar.classList.toggle("hidden");
});

addTaskIcon.addEventListener("click", () => taskModal.showModal());

closeTaskModal.addEventListener("click", () => {
  clearTaskForm();
  taskModal.close();
});

addProjectIcon.addEventListener("click", () => {
  projectModal.showModal();
});

closeProjectModal.addEventListener("click", () => {
  projectModal.close();
});

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addProjects();
  clearProjectForm();
  projectModal.close();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // TODO: Validate form values
  addTasks();
  clearTaskForm();
  taskModal.close();
});

function clearTaskForm() {
  taskForm.taskTitle.value = "";
  taskForm.taskDescription.value = "";
  taskForm.dueDate.value = "";
  taskForm.priorityDropDown.value = "low";
  taskForm.projectsDropDown.value = "inbox";
}

function clearProjectForm() {
  projectForm.projectTitle.value = "";
}

function changeTitle(currentTab) {
  const title = document.getElementById("title");
  title.textContent = currentTab;
}
