const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const showAllBtn = document.getElementById('showAll');
const showCompletedBtn = document.getElementById('showCompleted');
const showIncompleteBtn = document.getElementById('showIncomplete');
const filterBtn = document.getElementById('filterBtn');
const cancelBtn = document.getElementById('cancelBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

document.addEventListener('DOMContentLoaded', renderTasks);


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

addTaskBtn.addEventListener('click', addNewTask);


function addNewTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const newTask = {
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        taskInput.value = '';
        renderTasks();
    } else {
        alert('Please write something!');
    }
}


function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.classList.add('list_item')
        li.innerHTML = ` 
      <span>${task.text}</span> 
      <button onclick="editTask(event)">Edit</button> 
      <button class="btn--edit" onclick="markAsComplete(this)">Done</button> 
      <button class="btn--cancel" onclick="deleteTask(this)">Delete</button> `;

        if (task.completed) {
            const span = li.querySelector('span');
            span.classList.add('completed');
        }


        li.querySelector('span').addEventListener('dblclick', event => {
            event.preventDefault(); 
            editTask(event);
        });

        taskList.appendChild(li);
    });
}


function editTask(event) {
    const target = event.target.closest('li');
    const span = target.querySelector('span');
    let currentText = span.textContent;

    const newText = prompt('Edit Task:', currentText);

    if (newText !== null && newText.trim() !== '') {
        span.textContent = newText.trim();

        const index = Array.from(target.parentNode.children).indexOf(target);

        tasks[index].text = newText.trim();

        saveTasks();
    }
}



function markAsComplete(button) {
    const li = button.parentElement;
    const span = li.querySelector('span');

    const index = Array.from(li.parentNode.children).indexOf(li);

    tasks[index].completed = !tasks[index].completed;

    span.classList.toggle('completed', tasks[index].completed);

    saveTasks();
}


function deleteTask(button) {
    const li = button.parentElement;
    const index = Array.from(li.parentNode.children).indexOf(li);

    tasks.splice(index, 1);
    li.remove();
    saveTasks();
}

function filterTasks() {
    const filterInput = document.getElementById('filterInput');
    const filterText = filterInput.value.toLowerCase();
    console.log(filterInput)

    const taskList = document.getElementById('taskList');

    Array.from(taskList.children).forEach(li => {
        const taskText = li.querySelector('span').textContent.toLowerCase();
        if (taskText.includes(filterText)) {
            li.style.display = 'flex';
        } else {
            li.style.display = 'none';
        }
    });
}

filterBtn.addEventListener('click', filterTasks);

cancelBtn.addEventListener('click', renderTasks);


showAllBtn.addEventListener('click', () => {
    renderTasks();
});


showCompletedBtn.addEventListener('click', () => {
 
    const tasks = taskList.querySelectorAll('li');
    
        tasks.forEach(task => {
    
    const span = task.querySelector('span')
    
            if (span.className !== 'completed') {
               task.className = 'hidden';
            } else {
                task.className = 'list_item';
            }
          });
        
        });
    
    
    
    showIncompleteBtn.addEventListener('click', () => {
        const tasks = taskList.querySelectorAll('li');
    
        tasks.forEach(task => {
    
    const span = task.querySelector('span')
    
            if (span.className === 'completed') {
               task.className = 'hidden';
            } else {
                task.className = 'list_item';
            }
          });
    });
