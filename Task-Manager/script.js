let taskList = document.getElementById("task-list");
let taskInput = document.getElementById("taskInput");

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert("Please enter a task");
        return;
    }

    const listItem = document.createElement("li");
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    const completeButton = document.createElement("button");
    completeButton.innerHTML = "✔";
    completeButton.className = "complete-btn";
    completeButton.onclick = () => {
        taskSpan.classList.toggle('completed');
    };

    const removeButton = document.createElement("button");
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';
    removeButton.onclick = () => {
        taskList.removeChild(listItem);
    };


    listItem.appendChild(completeButton);
    listItem.appendChild(taskSpan);
    listItem.appendChild(removeButton);

    taskList.appendChild(listItem);

    taskInput.value = ''; // Clear input field
}
