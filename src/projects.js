export function createProjectItemDiv(project, index) {
  const { projectTitle } = project;
  const listItem = document.createElement("div");
  listItem.classList.add("project-item");
  listItem.setAttribute("data-index", index);
  listItem.innerHTML = `
            <div class="project-list-item" data-index="${index}">
              <i class="fa-solid fa-hashtag"></i> <span class="project-title">${projectTitle}</span>
            </div>
            <div class="project-icons">
              <i class="fa-regular fa-pen-to-square edit-project-icon" data-index="${index}"></i>
              <i class="fa-solid fa-xmark delete-project-icon" data-index="${index}"></i>
            </div>
  `;
  return listItem;
}

export function createOption(project) {
  const { projectTitle } = project;
  const option = document.createElement("option");
  option.value = projectTitle.toLowerCase().replaceAll(" ", "-");
  option.textContent = projectTitle;

  return option;
}
