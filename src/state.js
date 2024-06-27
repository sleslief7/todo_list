import { Task, Project } from "./models.js";
import { refresh } from "./updateDisplay.js";

const taskForm = document.getElementById("task-form");
const projectForm = document.getElementById("project-form");

export const getStorageItem = (item) => {
  const serializedList = localStorage.getItem(item);
  if (serializedList === null) return [];
  return JSON.parse(serializedList);
};

export const tasks = getStorageItem("task");
export const projects = getStorageItem("project");
refresh();

export const updateStorageItem = (item) => {
  let itemSerialized = JSON.stringify(item === "task" ? tasks : projects);
  localStorage.setItem(item, itemSerialized);
};

export function formToTaskObj() {
  return new Task(
    taskForm.taskTitle.value,
    taskForm.taskDescription.value,
    taskForm.dueDate.value.replaceAll("-", "/"),
    taskForm.priorityDropDown.value,
    taskForm.projectsDropDown.value
  );
}

export function formToProjectObj() {
  return new Project(projectForm.projectTitle.value);
}

export function addTask() {
  const task = formToTaskObj();
  tasks.push(task);
  updateStorageItem("task");
  refresh();
}

export function addProject() {
  const project = formToProjectObj();
  projects.push(project);
  updateStorageItem("project");
  refresh();
}
