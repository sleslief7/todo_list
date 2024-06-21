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
