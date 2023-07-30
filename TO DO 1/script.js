// Load tasks from local storage if available
window.onload = function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        for (const taskText of savedTasks) {
            addTaskToDOM(taskText);
        }
    }
};

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a valid task.');
        return;
    }

    addTaskToDOM(taskText);

    // Save tasks to local storage
    saveTasksToLocalStorage();

    taskInput.value = '';
}

function addTaskToDOM(taskText) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.textContent = taskText;

    // Add a checkbox to mark tasks as completed
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onchange = function() {
        li.classList.toggle('completed', checkbox.checked);
        saveTasksToLocalStorage();
    };

    li.appendChild(checkbox);

    // Add a delete button to each task
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        li.remove();
        saveTasksToLocalStorage();
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

function clearCompleted() {
    const completedTasks = document.querySelectorAll('.completed');
    for (const task of completedTasks) {
        task.remove();
    }

    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const taskList = document.getElementById('taskList');
    const tasks = Array.from(taskList.children).map(li => li.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
