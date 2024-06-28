import buildCard from "./buildCard.js";
import { createProjectItemDiv, createOption } from "./projects.js";
import { format } from "date-fns";
import {
  tasks,
  projects,
  updateStorageItem,
  formToTaskObj,
  formToProjectObj,
  addTask,
  addProject,
} from "./state.js";

const taskModal = document.getElementById("task-modal");
const taskForm = document.getElementById("task-form");
const projectModal = document.getElementById("project-dialog");
const projectForm = document.getElementById("project-form");
const saveTaskBtn = document.getElementById("save-task");
const saveProjectBtn = document.getElementById("save-project");

export function refresh(toDisplay) {
  refreshProjects();
  refreshTasks(toDisplay);
  addEditListeners();
  addDeleteListeners();
}

function refreshProjects() {
  const projectsList = document.getElementById("projects-list");
  const selectInput = document.getElementById("projects-select-input");
  projectsList.innerHTML = "";
  selectInput.innerHTML = "";
  const inbox = document.createElement("option");
  inbox.value = "Inbox";
  inbox.textContent = "Inbox";
  selectInput.appendChild(inbox);
  for (let i = 0; i < projects.length; i++) {
    projectsList.appendChild(createProjectItemDiv(projects[i], i));
    selectInput.appendChild(createOption(projects[i]));
  }
  AddProjectSelectListeners();
}

function AddProjectSelectListeners() {
  document.querySelectorAll(".project-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      let projectName = projects[grabIndex(e)].projectTitle;
      document.getElementById("project-title").textContent = projectName;
      refresh((t) => t.taskProject === projectName);
    });
  });
}

function refreshTasks(toDisplay) {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    if (!toDisplay || toDisplay(tasks[i])) {
      cardsContainer.appendChild(buildCard(tasks[i], i));
    }
  }
  addCheckboxListeners();
}

function addDeleteListeners() {
  const deleteProjectBtns = document.querySelectorAll(".delete-project-icon");
  const deleteTaskBtns = document.querySelectorAll(".delete-icon");
  const deleteBtns = [...deleteTaskBtns, ...deleteProjectBtns];
  deleteBtns.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      let index = grabIndex(e);
      const entityType = icon.className.includes("delete-icon")
        ? "task"
        : "project";
      if (entityType === "task") {
        updateTaskForm(tasks[index]);
        removeEntity("task", index);
      } else {
        updateProjectForm(projects[index]);
        removeEntity("project", index);
      }
    });
  });
}

function addEditListeners() {
  const editTaskBtns = Array.from(document.querySelectorAll(".edit-icon"));
  const editProjectBtns = Array.from(
    document.querySelectorAll(".edit-project-icon")
  );
  const editBtns = [...editTaskBtns, ...editProjectBtns];
  editBtns.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      const index = grabIndex(e);
      const entityType = icon.className.includes("edit-icon")
        ? "task"
        : "project";
      if (entityType === "task") {
        updateTaskForm(tasks[index]);
        saveTaskBtn.innerText = "Save";
        taskForm.setAttribute("data-index", index);
        taskModal.showModal();
      } else {
        updateProjectForm(projects[index]);
        saveProjectBtn.innerText = "Save";
        projectForm.setAttribute("data-index", index);
        projectModal.showModal();
      }
    });
  });
}

function addCheckboxListeners() {
  const checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      let index = grabIndex(e);
      let modifiedTask = tasks[index];
      modifiedTask.completed = checkbox.checked;
      editEntity(modifiedTask, "task", index);
    });
  });
}

function editEntity(entity, entityType, index) {
  if (entityType === "task") {
    tasks[index] = entity;
  } else {
    projects[index] = entity;
  }
  updateStorageItem(entityType);
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

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.currentTarget.innerText.includes("Add")) {
    addProject();
  } else {
    editEntity(formToProjectObj(), "project", grabIndex(e));
  }
  projectModal.close();
  clearProjectForm();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.currentTarget.innerText.includes("Add")) {
    addTask();
  } else {
    editEntity(formToTaskObj(), "task", grabIndex(e));
  }
  taskModal.close();
  clearTaskForm();
});

function removeEntity(entityType, index) {
  entityType === "task" ? tasks.splice(index, 1) : projects.splice(index, 1);
  updateStorageItem(entityType);
  clearProjectForm();
  clearTaskForm();
  refresh();
}

export function clearTaskForm() {
  taskForm.taskTitle.value = "";
  taskForm.taskDescription.value = "";
  taskForm.dueDate.value = "";
  taskForm.priorityDropDown.value = "low";
  taskForm.projectsDropDown.value = "inbox";
}

export function clearProjectForm() {
  projectForm.projectTitle.value = "";
}

export function grabIndex(e) {
  return Number(e.currentTarget.getAttribute("data-index"));
}
