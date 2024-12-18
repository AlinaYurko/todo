document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    const filterAll = document.getElementById("filterAll");
    const filterCompleted = document.getElementById("filterCompleted");
    const filterUncompleted = document.getElementById("filterUncompleted");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks(filter) {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            if (filter === "all" || (filter === "completed" && task.completed) || (filter === "uncompleted" && !task.completed)) {
                const li = document.createElement("li");
                li.textContent = task.text;

                if (task.completed) {
                    li.classList.add("completed");
                }

                const completeBtn = document.createElement("button");
                completeBtn.textContent = task.completed ? "Не выполнено" : "Выполнено";
                completeBtn.onclick = () => toggleTaskCompletion(index);

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Удалить";
                deleteBtn.onclick = () => deleteTask(index);
                li.appendChild(completeBtn);
                li.appendChild(deleteBtn);
                taskList.appendChild(li);
            }
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = "";
            saveTasks();
            renderTasks(getCurrentFilter());
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks(getCurrentFilter());
    }

    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks(getCurrentFilter());
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function getCurrentFilter() {
        if (filterAll.classList.contains("active")) return "all";
        if (filterCompleted.classList.contains("active")) return "completed";
        return "uncompleted";
    }

    addTaskBtn.addEventListener("click", addTask);

    filterAll.addEventListener("click", () => {
        setActiveFilter(filterAll);
        renderTasks("all");
    });

    filterCompleted.addEventListener("click", () => {
        setActiveFilter(filterCompleted);
        renderTasks("completed");
    });

    filterUncompleted.addEventListener("click", () => {
        setActiveFilter(filterUncompleted);
        renderTasks("uncompleted");
    });

    function setActiveFilter(activeButton) {
        [filterAll, filterCompleted, filterUncompleted].forEach(button => {
            button.classList.remove("active");
        });
        activeButton.classList.add("active");
    }

    renderTasks(getCurrentFilter());
});
