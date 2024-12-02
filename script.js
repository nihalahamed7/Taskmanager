// Global task array to track tasks
let tasks = [];

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const taskDueDate = document.getElementById('taskDueDate').value;
    const taskPriority = document.getElementById('taskPriority').value;
    const taskCategory = document.getElementById('taskCategory').value;

    if (taskText !== "") {
        const task = {
            text: taskText,
            dueDate: taskDueDate || "No Due Date",
            priority: taskPriority,
            category: taskCategory,
            completed: false,
        };

        tasks.push(task);

        // Update UI
        renderTasks();
        taskInput.value = ""; // Clear input fields
        document.getElementById('taskDueDate').value = "";
        document.getElementById('taskPriority').value = "low";
        document.getElementById('taskCategory').value = "work";
    } else {
        alert("Please enter a task.");
    }
}

// Function to render tasks on the page
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `${task.text} (Due: ${task.dueDate}, Priority: ${task.priority}, Category: ${task.category})`;

        // Add buttons (Complete, Edit, Delete)
        li.appendChild(createCompleteButton(index));
        li.appendChild(createEditButton(index));
        li.appendChild(createDeleteButton(index));

        if (task.completed) {
            li.classList.add('completed');
        }

        taskList.appendChild(li);
    });

    updateTaskCount();
}

// Function to create Complete button
function createCompleteButton(index) {
    const completeButton = document.createElement('button');
    completeButton.textContent = "Complete";
    completeButton.classList.add('complete');
    completeButton.onclick = () => toggleComplete(index);
    return completeButton;
}

// Function to toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Function to create Edit button
function createEditButton(index) {
    const editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.classList.add('edit');
    editButton.onclick = () => editTask(index);
    return editButton;
}

// Function to edit task
function editTask(index) {
    const task = tasks[index];
    const newText = prompt("Edit your task:", task.text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText;
        renderTasks();
    }
}

// Function to create Delete button
function createDeleteButton(index) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.classList.add('delete');
    deleteButton.onclick = () => deleteTask(index);
    return deleteButton;
}

// Function to delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Function to search tasks
function searchTasks() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const filteredTasks = tasks.filter(task => {
        return task.text.toLowerCase().includes(searchQuery) ||
               task.dueDate.toLowerCase().includes(searchQuery) ||
               task.priority.toLowerCase().includes(searchQuery) ||
               task.category.toLowerCase().includes(searchQuery);
    });
    renderFilteredTasks(filteredTasks);
}

// Function to render filtered tasks based on search
function renderFilteredTasks(filteredTasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = "";

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `${task.text} (Due: ${task.dueDate}, Priority: ${task.priority}, Category: ${task.category})`;

        // Add buttons (Complete, Edit, Delete)
        li.appendChild(createCompleteButton(index));
        li.appendChild(createEditButton(index));
        li.appendChild(createDeleteButton(index));

        if (task.completed) {
            li.classList.add('completed');
        }

        taskList.appendChild(li);
    });

    updateTaskCount();
}

// Function to sort tasks by priority
function sortTasksByPriority() {
    tasks.sort((a, b) => {
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    renderTasks();
}

// Function to sort tasks by due date
function sortTasksByDueDate() {
    tasks.sort((a, b) => {
        if (a.dueDate === "No Due Date") return 1;
        if (b.dueDate === "No Due Date") return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
    });
    renderTasks();
}

// Function to update task count
function updateTaskCount() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
}

// Function to clear all tasks
function clearAllTasks() {
    tasks = [];
    renderTasks();
}
