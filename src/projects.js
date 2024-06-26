export function createProjectItemDiv(project, index) {
  const { projectTitle } = project;
  const listItem = document.createElement("div");
  listItem.classList.add("project-item");
  listItem.innerHTML = `
            <div class="project-list-item" data-index="${index}">
              <i class="fa-solid fa-hashtag"></i> ${projectTitle}
            </div>
            <div class="project-icons">
              <i class="fa-regular fa-pen-to-square edit-project-icon" data-index="${index}"></i>
              <i class="fa-solid fa-xmark delete-project-icon" data-index="${index}"></i>
            </div>
  `;
  return listItem;
}
