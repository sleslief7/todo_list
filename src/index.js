import "./style.css";

const navBarIcon = document.getElementById("nav-bars");
const navBar = document.getElementById("nav-bar");

navBarIcon.addEventListener("click", () => {
  navBar.classList.toggle("hidden");
});

function changeTitle(currentTab) {
  const title = document.getElementById("title");
  title.textContent = "";
  title.textContent = currentTab;
}

const addTask = document.getElementById("add-task");
const modal = document.getElementById("modal");

addTask.addEventListener("click", () => {
  modal.showModal();
});

const closeModal = document.getElementById("close-modal");
closeModal.addEventListener("click", () => {
  modal.close();
});
