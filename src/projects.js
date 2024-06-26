export function createProjectItemDiv(projectName, index) {
  const listItem = document.createElement("div");
  listItem.classList.add("project-list-item");
  listItem.innerHTML = `
            <div class="project-list-item"  data-index="${index}">
              <i class="fa-solid fa-hashtag"></i> ${projectName}
            </div>
            <div class="project-icons">
              <i class="fa-regular fa-pen-to-square edit-icon" data-index="${index}"></i>
              <i class="fa-solid fa-xmark delete-icon" data-index="${index}"></i>
            </div>
  `;
  return listItem;
}
