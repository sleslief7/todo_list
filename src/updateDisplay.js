import buildCard from "./buildCard.js";
import { createProjectItemDiv } from "./projects.js";
import {
  tasks,
  projects,
  updateStorageItem,
  formToTaskObj,
  formToProjectObj,
} from "./state.js";

const taskModal = document.getElementById("task-modal");
const taskForm = document.getElementById("task-form");
let isEditMode = false;

export function refreshProjects() {
  const projectsList = document.getElementById("projects-list");
  projectsList.innerHTML = "";
  for (let i = 0; i < projects.length; i++) {
    projectsList.appendChild(createProjectItemDiv(projects[i], i));
  }
  addDeleteProjectListeners();
  addEditProjectListeners();
}
export function refreshTasks() {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    cardsContainer.appendChild(buildCard(tasks[i], i));
  }
  addDeleteTaskListeners();
  addEditTaskListeners();
  addCheckboxListeners();
}
function addDeleteProjectListeners() {
  const deleteBtns = document.querySelectorAll(".delete-project-icon");
  deleteBtns.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      let index = Number(e.target.getAttribute("data-index"));
      removeProject(index);
    });
  });
}
function addEditProjectListeners() {
  const editBtns = document.querySelectorAll(".edit-project-icon");
  editBtns.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      let index = Number(e.target.getAttribute("data-index"));
      edit("projects", index);
    });
  });
}
function addEditTaskListeners() {
  const editBtns = document.querySelectorAll(".edit-icon");
  editBtns.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      let index = Number(e.target.getAttribute("data-index"));
      edit("tasks", index);
    });
  });
}
function addDeleteTaskListeners() {
  const deleteBtns = document.querySelectorAll(".delete-icon");
  deleteBtns.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      let index = Number(e.target.getAttribute("data-index"));
      removeTask(index);
    });
  });
}

function addCheckboxListeners() {
  const checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      let index = Number(e.target.getAttribute("data-index"));
      let modifiedTask = tasks[index];
      modifiedTask.completed = checkbox.checked;
      edit("tasks", index);
    });
  });
}
function edit(editItem, index) {
  openTaskEditModal(index);
  let formObj = editItem === "tasks" ? formToTaskObj : formToProjectObj;
  let editItemObj = editItem === "tasks" ? tasks[index] : projects[index];
  let refresh = editItem === "tasks" ? refreshTasks : refreshProjects;
  editItemObj = formObj();
  updateStorageItem(editItem);
  refresh();
}
function updateTaskForm(currentTask) {
  taskForm.taskTitle.value = currentTask.taskTitle;
  taskForm.taskDescription.value = currentTask.taskDescription;
  taskForm.dueDate.value = currentTask.dueDate;
  taskForm.priorityDropDown.value = currentTask.priorityDropDown;
  taskForm.projectsDropDown.value = currentTask.projectsDropDown;
}
export function openTaskEditModal(index) {
  isEditMode = true;
  const currentTask = tasks[index];
  updateTaskForm(currentTask);
  taskModal.showModal();
}
const removeTask = (index) => {
  tasks.splice(index, 1);
  updateStorageItem("tasks");
  refreshTasks();
};

function removeProject(index) {
  projects.splice(index, 1);
  updateStorageItem("projects");
  refreshProjects();
}
