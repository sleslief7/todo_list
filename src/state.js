import { Task, Project } from "./models.js";
import buildCard from "./buildCard.js";

const form = document.getElementById("modal-form");

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
}
