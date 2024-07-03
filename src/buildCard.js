import { format, getYear } from 'date-fns';

export default function buildCard(task, index) {
  const { taskTitle, taskDescription, taskDueDate, completed, taskPriority } =
    task;
  let priorityColor =
    taskPriority === 'Low'
      ? 'text-yellow-400'
      : taskPriority === 'Medium'
      ? 'text-orange-400'
      : 'text-red-400';
  let checked = completed ? 'checked' : '';
  let doneTask = completed ? 'doneTask' : '';
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');
  cardDiv.innerHTML = `
    <input type="checkbox" name="checkbox" class="checkbox" data-index="${index}" ${checked}/>
    <div class="card-right-side">
      <div class="card-header">
        <h3 class="task-title ${doneTask} font-extrabold text-lg" data-index="${index}">${taskTitle}</h3>
        <div class="header-icons">
        <div class='${priorityColor}'>${taskPriority}</div>
          <i class="fa-regular fa-pen-to-square edit-icon" data-index="${index}"></i>
          <i class="fa-solid fa-xmark delete-icon" data-index="${index}"></i>
        </div>
      </div>
      <div class="card-body">
        <div class="task-description ${doneTask}" data-index="${index}">${taskDescription}</div>
        <div class="due-date ${doneTask}">By: ${format(
    taskDueDate,
    GetDateFormat(taskDueDate)
  )} </div>
      
      </div>
    </div>
  </div>
  `;

  return cardDiv;
}

function GetDateFormat(taskDueDate) {
  const enteredYear = getYear(taskDueDate);
  const currentYear = new Date().getFullYear();
  const formattedDate =
    enteredYear !== currentYear ? 'EEE MMM dd, yyyy' : 'EEE MMM dd';
  return formattedDate;
}
