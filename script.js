const taskContainer = document.getElementById('task-container');
const addTaskButton = document.getElementById('add-task');
const backgroundCanvas = document.getElementById('background');
const clockElement = document.getElementById('clock');
const ctx = backgroundCanvas.getContext('2d');
backgroundCanvas.width = window.innerWidth;
backgroundCanvas.height = window.innerHeight;

let currentConnection = null;

// Ask for notifications permission
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

// Clock functionality
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  clockElement.querySelector('span').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();

// Add task functionality
addTaskButton.addEventListener('click', () => {
  const task = document.createElement('div');
  task.classList.add('task');
  task.style.left = `${window.innerWidth / 2 - 125}px`; // Center task horizontally
  task.style.top = `${window.innerHeight / 2 - 125}px`; // Center task vertically

  const taskHeader = document.createElement('div');
  taskHeader.className = 'task-header';

  const headerText = document.createElement('input');
  headerText.className = 'task-header-text';
  headerText.value = 'Task Title';
  headerText.setAttribute('placeholder', 'Task Title');
  taskHeader.appendChild(headerText);

  const taskButtons = document.createElement('div');
  taskButtons.classList.add('task-buttons');

  // Complete task button (checkmark circle)
  const completeButton = document.createElement('button');
  completeButton.classList.add('circle-button');
  completeButton.innerHTML = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" fill="none" stroke="#fff" stroke-width="2"/><path d="M6 10l3 3 6-6" fill="none" stroke="#fff" stroke-width="2"/></svg>';
  completeButton.addEventListener('click', () => {
    task.style.backgroundColor = '#4CAF50'; // Completed color
  });
  taskButtons.appendChild(completeButton);

  // Delete task button (cross circle)
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('circle-button');
  deleteButton.innerHTML = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" fill="none" stroke="#fff" stroke-width="2"/><path d="M6 6l8 8M14 6l-8 8" fill="none" stroke="#fff" stroke-width="2"/></svg>';
  deleteButton.addEventListener('click', () => {
    task.remove();
  });
  taskButtons.appendChild(deleteButton);

  taskHeader.appendChild(taskButtons);
  task.appendChild(taskHeader);

  const timeInput = document.createElement('input');
  timeInput.type = 'time';
  task.appendChild(timeInput);

  const notesArea = document.createElement('textarea');
  notesArea.placeholder = 'Notes...';
  task.appendChild(notesArea);

  task.style.left = `${Math.random() * (window.innerWidth - 200)}px`;
  task.style.top = `${Math.random() * (window.innerHeight - 200)}px`;

  task.addEventListener('mousedown', dragStart);
  taskContainer.appendChild(task);
});

// Dragging functionality
let currentTask = null;
let offsetX, offsetY;

function dragStart(event) {
  currentTask = event.target;
  offsetX = event.clientX - currentTask.offsetLeft;
  offsetY = event.clientY - currentTask.offsetTop;
  document.addEventListener('mousemove', dragMove);
  document.addEventListener('mouseup', dragEnd);
}

function dragMove(event) {
  if (!currentTask) return;
  currentTask.style.left = `${event.clientX - offsetX}px`;
  currentTask.style.top = `${event.clientY - offsetY}px`;
}

function dragEnd() {
  currentTask = null;
  document.removeEventListener('mousemove', dragMove);
  document.removeEventListener('mouseup', dragEnd);
}
