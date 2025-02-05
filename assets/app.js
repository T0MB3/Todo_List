//import './bootstrap.js';
document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById('add-task-btn');
    const popup = document.getElementById('task-popup');
    const overlay = document.querySelector('.popup-overlay');
    const cancelPopup = document.getElementById('cancel-popup');
    const confirmPopup = document.getElementById('confirm-popup');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Ouvrir la pop-up
    addTaskBtn.addEventListener('click', function() {
        openPopup();
    });

    // Fermer la pop-up
    cancelPopup.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);

    function openPopup() {
        popup.style.display = 'block';
        overlay.style.display = 'block';
        document.getElementById('popup-title').value = '';
        document.getElementById('popup-description').value = '';
    }

    function closePopup() {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }

    // Ajouter une tâche
    confirmPopup.addEventListener('click', function() {
        const title = document.getElementById('popup-title').value.trim();
        const description = document.getElementById('popup-description').value.trim();

        if (title) {
            addTask(title, description);
            closePopup();
        }
    });

    function addTask(title, description) {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <div class="task-details">
                <input type="checkbox" class="task-checkbox">
                <span class="task-title">${title}</span>
            </div>
            <div class="task-description">${description || "Aucune description"}</div>
            <button class="delete-btn">Supprimer</button>
        `;
        taskList.appendChild(taskItem);
    }

    //Action sur les tâches (supprimer, cocher)
    taskList.addEventListener('click', function(event) {
        const taskItem = event.target.closest('li');

        if (event.target.classList.contains('delete-btn')) {
            taskItem.remove();
        } else if (event.target.classList.contains('task-checkbox')) {
            taskItem.classList.toggle('completed');
        }
    });

    // Filtrer les tâches
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            filterTasks(filter);
        });
    });

    function filterTasks(filter) {
        const tasks = taskList.querySelectorAll('li');
        tasks.forEach(task => {
            const isCompleted = task.classList.contains('completed');
            switch (filter) {
                case 'all':
                    task.style.display = 'flex';
                    break;
                case 'completed':
                    task.style.display = isCompleted ? 'flex' : 'none';
                    break;
                case 'pending':
                    task.style.display = isCompleted ? 'none' : 'flex';
                    break;
            }
        });
    }
});

//import './styles/app.css';

console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉');
