import "./style.css";
import { projects } from "./state.js";
import { clearTaskForm, grabIndex, refresh } from "./updateDisplay.js";

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
const projectListItems = Array.from(document.querySelectorAll(".project-item"));

defaultInbox.addEventListener("click", (e) => {
  updateProjectTitleDisplay("Inbox");
});

defaultToday.addEventListener("click", (e) => {
  let date = new Date();
  updateProjectTitleDisplay("Today");
});

projectListItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    let index = grabIndex(e);
    updateProjectTitleDisplay(projects[index].projectTitle);
  });
});

function updateProjectTitleDisplay(projectTitle) {
  const projectTitleElement = document.getElementById("project-title");
  projectTitleElement.textContent = projectTitle;
}
