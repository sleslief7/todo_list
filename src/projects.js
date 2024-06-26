export function createProjectItemDiv(projectName, index) {
  const listItem = document.createElement("div");
  listItem.classList.add("project-list-item");
  listItem.innerHTML = `
  <div class="project-list-item"  data-index="${index}">
              <i class="fa-solid fa-hashtag"></i> ${projectName}
            </div>
  `;
  return listItem;
}
