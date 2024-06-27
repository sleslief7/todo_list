import buildCard from "./buildCard.js";
import { createProjectItemDiv } from "./projects.js";
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

export function refresh() {
  refreshProjects();
  refreshTasks();
  addEditListeners();
}

function refreshProjects() {
  const projectsList = document.getElementById("projects-list");
  projectsList.innerHTML = "";
  for (let i = 0; i < projects.length; i++) {
    projectsList.appendChild(createProjectItemDiv(projects[i], i));
  }
  addDeleteProjectListeners();
}

function refreshTasks() {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    cardsContainer.appendChild(buildCard(tasks[i], i));
  }
  addDeleteTaskListeners();
  addCheckboxListeners();
}

function addDeleteProjectListeners() {
  const deleteBtns = document.querySelectorAll(".delete-project-icon");
  deleteBtns.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      let index = grabIndex(e);
      removeEntity("project", index);
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
        taskModal.showModal();
      } else {
        updateProjectForm(projects[index]);
        saveProjectBtn.innerText = "Save";
        projectModal.showModal();
      }
    });
  });
}

function addDeleteTaskListeners() {
  const deleteBtns = document.querySelectorAll(".delete-icon");
  deleteBtns.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      let index = grabIndex(e);
      removeEntity("task", index);
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

saveProjectBtn.addEventListener("click", (e) => {
  if (e.currentTarget.innerText.includes("Add")) {
    addProject();
  } else {
    editEntity(formToProjectObj(), "project", grabIndex(e));
  }
  projectModal.close();
  clearProjectForm();
});

saveTaskBtn.addEventListener("click", (e) => {
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

function grabIndex(e) {
  return Number(e.currentTarget.getAttribute("data-index"));
}
