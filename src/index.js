import "./style.css";

import { addTasks } from "./state.js";

const navBarIcon = document.getElementById("nav-bars");
const navBar = document.getElementById("nav-bar");
const form = document.getElementById("modal-form");
const addTask = document.getElementById("add-task");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");

navBarIcon.addEventListener("click", () => {
  navBar.classList.toggle("hidden");
});

addTask.addEventListener("click", () => {
  clearForm();
  modal.showModal();
});

closeModal.addEventListener("click", () => modal.close());

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // TODO: Validate form values
  addTasks();
  clearForm();
  modal.close();
});

function clearForm() {
  form.taskTitle.value = "";
  form.taskDescription.value = "";
  form.dueDate.value = "";
  form.priorityDropDown.value = "low";
  form.projectsDropDown.value = "inbox";
}

function changeTitle(currentTab) {
  const title = document.getElementById("title");
  title.textContent = currentTab;
}
