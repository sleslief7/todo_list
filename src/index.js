import "./style.css";
import "./state.js";
import { format } from "date-fns";
import { clearTaskForm, refresh } from "./updateDisplay.js";

const navBarIcon = document.getElementById("nav-bars");
const navBar = document.getElementById("nav-bar");
const addTaskIcon = document.getElementById("add-task");
const taskModal = document.getElementById("task-modal");
const closeTaskModal = document.getElementById("close-modal");
const projectModal = document.getElementById("project-dialog");
const addProjectIcon = document.getElementById("add-project-icon");
const closeProjectModal = document.getElementById("close-project-modal");
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

const defaultInbox = document.getElementById("inbox");
const defaultToday = document.getElementById("today");

defaultInbox.addEventListener("click", () => {
  updateProjectTitleDisplay("Inbox");
  refresh((t) => t.taskProject === "Inbox");
});

defaultToday.addEventListener("click", () => {
  updateProjectTitleDisplay("Today");
  refresh((t) => t.taskDueDate === format(new Date(), "yyyy/MM/dd"));
});

function updateProjectTitleDisplay(projectTitle) {
  const projectTitleElement = document.getElementById("project-title");
  projectTitleElement.textContent = projectTitle;
}
