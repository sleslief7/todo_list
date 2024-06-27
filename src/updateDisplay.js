import buildCard from "./buildCard.js";
import { createProjectItemDiv } from "./projects.js";
import { format } from "date-fns";
import {
  tasks,
  projects,
  updateStorageItem,
  formToTaskObj,
  formToProjectObj,
} from "./state.js";

const taskModal = document.getElementById("task-modal");
const taskForm = document.getElementById("task-form");
const projectModal = document.getElementById("project-dialog");
const projectForm = document.getElementById("project-form");
const saveTaskBtn = document.getElementById("save-task");
const saveProjectBtn = document.getElementById("save-project");
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
      tasks[index] = modifiedTask;
      updateStorageItem("tasks");
      refreshTasks();
    });
  });
}
function edit(editItem, index) {
  let editModalToOpen =
    editItem === "tasks" ? openTaskEditModal : openProjectEditModal;
  editModalToOpen(index);
  let formObj = editItem === "tasks" ? formToTaskObj : formToProjectObj;
  let editItemObj = editItem === "tasks" ? tasks[index] : projects[index];
  let refresh = editItem === "tasks" ? refreshTasks : refreshProjects;
  editItemObj = formObj();
  updateStorageItem(editItem);
  refresh();
}
function updateTaskForm(currentTask) {
  let formatedDate = format(currentTask.taskDueDate, "yyyy-MM-dd");
  taskForm.taskTitle.value = currentTask.taskTitle;
  taskForm.taskDescription.value = currentTask.taskDescription;
  taskForm.dueDate.value = formatedDate;
  taskForm.priorityDropDown.value = currentTask.taskPriority;
  taskForm.projectsDropDown.value = currentTask.taskProject;
}
function updateProjectForm(currentTask) {
  projectForm.projectTitle.value = currentTask.projectTitle;
}
export function openTaskEditModal(index) {
  isEditMode = true;
  changeTaskAddBtn();
  updateTaskForm(tasks[index]);
  taskModal.showModal();
}
export function changeTaskAddBtn() {
  const addBtn = document.getElementById("submit-task");
  changeBtnCondition(saveTaskBtn, addBtn);
}
export function changeProjectAddBtn() {
  const addBtn = document.getElementById("add-btn");
  changeBtnCondition(saveProjectBtn, addBtn);
}
function changeBtnCondition(saveBtn, addBtn) {
  if (isEditMode) {
    saveBtn.classList.remove("hidden");
    saveBtn.classList.add("show");
    addBtn.classList.add("hidden");
    addBtn.classList.remove("show");
    isEditMode = false;
  } else {
    addBtn.classList.remove("hidden");
    addBtn.classList.add("show");
    saveBtn.classList.add("hidden");
    saveBtn.classList.remove("show");
  }
}
function updateTask(index) {
  tasks[index] = formToTaskObj();
  updateStorageItem("tasks");
  refreshTasks();
}
function updateProject(index) {
  projects[index] = formToProjectObj();
  updateStorageItem("projects");
  refreshProjects();
}

saveProjectBtn.addEventListener("click", (e) => {
  const target = e.currentTarget;
  let index = Number(target.getAttribute("data-index"));
  updateProject(index);
  projectModal.close();
  clearProjectForm();
});
saveTaskBtn.addEventListener("click", (e) => {
  const target = e.currentTarget;
  let index = Number(target.getAttribute("data-index"));
  updateTask(index);
  taskModal.close();
  clearTaskForm();
});
export function openProjectEditModal(index) {
  isEditMode = true;
  changeProjectAddBtn();
  updateProjectForm(projects[index]);
  projectModal.showModal();
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
