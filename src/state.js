import { Task, Project } from "./models.js";
import buildCard from "./buildCard.js";
import { createProjectItemDiv } from "./projects.js";

const form = document.getElementById("modal-form");
let isEditMode = false;

export const getStorageItem = (item) => {
  const serializedList = localStorage.getItem(item);
  if (serializedList === null) return [];
  return JSON.parse(serializedList);
};

const tasks = getStorageItem("tasks");
const projects = getStorageItem("projects");
refreshTasks();

const updateStorageItem = (item) => {
  let itemSerialized = JSON.stringify(item === "tasks" ? tasks : projects);
  localStorage.setItem(item, itemSerialized);
};

function formToTaskObj() {
  return new Task(
    form.taskTitle.value,
    form.taskDescription.value,
    form.dueDate.value.replaceAll("-", "/"),
    form.priorityDropDown.value,
    form.projectsDropDown.value
  );
}

export function addTasks() {
  const task = formToTaskObj();
  tasks.push(task);
  updateStorageItem("tasks");
  refreshTasks();
}

function refreshTasks() {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    cardsContainer.appendChild(buildCard(tasks[i], i));
  }
  addDeleteListeners();
  addCheckboxListeners();
}

export const removeTask = (index) => {
  tasks.splice(index, 1);
  updateStorageItem("tasks");
  refreshTasks();
};

function refreshProjects() {
  // const projectsList = document.getElementById("projects-list");
  // projectsList.innerHTML = "";
  // if (projects.length === 0) return;
  // for (let i = 0; i < projects.length; i++) {
  //   projectsList.appendChild(createProjectItemDiv(projects[i], i));
  // }
}

function addDeleteListeners() {
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
      editTask(modifiedTask, index);
    });
  });
}

function addEditListeners() {
  isEditMode = true;
  if (isEditMode) {
  }
}

function editTask(modifiedTask, index) {
  tasks[index] = modifiedTask;
  updateStorageItem("tasks");
  refreshTasks();
}
