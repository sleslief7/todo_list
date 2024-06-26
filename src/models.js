export function Task(
  taskTitle,
  taskDescription,
  taskDueDate,
  taskPriority = "low",
  taskProject = "inbox",
  completed = false
) {
  this.taskTitle = taskTitle;
  this.taskDescription = taskDescription;
  this.taskDueDate = taskDueDate;
  this.taskPriority = taskPriority;
  this.taskProject = taskProject;
  this.completed = completed;
}

export function Project(title) {
  this.title = title;
}
