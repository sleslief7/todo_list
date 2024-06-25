export function Task(
  taskTitle,
  taskDescription,
  taskDueDate,
  taskPriority = "low",
  taskProject = "inbox"
) {
  this.taskTitle = taskTitle;
  this.taskDescription = taskDescription;
  this.taskDueDate = taskDueDate;
  this.taskPriority = taskPriority;
  this.taskProject = taskProject;
}

export function Project(name) {
  this.name = name;
}
