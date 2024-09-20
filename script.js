const form = document.querySelector("form");
let tasksListUl = document.getElementById("tasksListUl");

// Récupération des tâches dans le localStorage ou création d'un tableau vide si le localStorage ne contient aucune tâche
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Mise à jour de l'affichage de la liste des tâches lors du lancement initial de l'appli
updateTasksList();

// Ajout d'une nouvelle tâche
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const newTaskInput = document.getElementById("newTaskInput");
    const newTask = {
        name: newTaskInput.value,
        status: "todo", // Statut par défaut au moment de la création d'une tâche (la tâche est "à faire")
    };

    // Ajout de la nouvelle tâche à la liste des tâches
    tasks.push(newTask);
    // Stockage dans le localStorage (transformation en chaîne de caractères, car dans localStorage, la valeur ne peut être qu'une chaîne de caractères)
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Réinitialisation du champ de saisie d'une nouvelle tâche et mise à jour de l'affichage de la liste des tâches
    newTaskInput.value = "";
    updateTasksList();
});

function updateTasksList() {
    // Vidage de la liste des tâches affichées
    tasksListUl.innerHTML = "";

    // Boucle sur les tâches pour les afficher
    tasks.forEach((task, index) => {
        tasksListUl.insertAdjacentHTML(
            "beforeend",
            `
        <li class="taskListLi">
            <input type="checkbox" id="task-status-${index}" class="task-status" ${task.status === "done" ? "checked" : ""}>
            <label for="task-status-${index}">${task.name}</label>
            <button id="delete-button-${index}" class="deleteButton">x</button>
        </li>
        `
        );

        // Gestion du changement de statut d'une tâche
        let toggleStatus = document.getElementById("task-status-" + index);
        toggleStatus.addEventListener("change", () => {
            task.status = toggleStatus.checked ? "done" : "todo";
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });

        // Gestion de la suppression définitive d'une tâche
        let deleteButton = document.getElementById("delete-button-" + index);
        deleteButton.addEventListener("click", () => {
            const taskItem = deleteButton.parentElement;
            taskItem.classList.add('fade-out'); // Ajout de la classe 'fade-out' pour exécuter une animation de disparition

            // Délai pour l'animation avant la suppression du DOM et la mise à jour du stockage
            setTimeout(() => {
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                updateTasksList();
            }, 400);
        });

    });
}