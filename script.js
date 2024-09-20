// **Déclaration des variables**

const form = document.querySelector("form");
const tasksListUl = document.getElementById("tasks-list-ul");
// Récupération des tâches dans le localStorage ou création d'un tableau vide
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filterSelect = document.getElementById("filter-select");
let selectedFilter = filterSelect.value;


// **Mise à jour de la liste des tâches au démarrage**
updateTasksList(selectedFilter);


// **Ecouteurs d'évènements**

// 1. Ecouteur d'évènement pour l'ajout d'une nouvelle tâche
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
});

// 2. Ecouteur d'évènements "change" pour la mise à jour de l'affichage en cas de changement de valeur du filtre
filterSelect.addEventListener("change", () => {
  selectedFilter = filterSelect.value;
  updateTasksList(selectedFilter);
})


// **Définition des fonctions**

// Fonction pour l'ajout d'une tâche
function addTask() {
  const newTaskInput = document.getElementById("new-task-input");
  if (newTaskInput.value.trim() === "") {
    alert("La tâche ne peut pas être vide !");
    return;
  }
  const newTask = {
    name: newTaskInput.value,
    status: "todo", // Statut par défaut
  };

  // Ajout d'une nouvelle tâche et enregistrement dans le localStorage sous forme de chaîne JSON
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Réinitialisation du champ de saisie d'une nouvelle tâche et mise à jour de l'affichage de la liste des tâches
  newTaskInput.value = "";
  updateTasksList(selectedFilter);
}

// Fonction pour le changement du statut d'une tâche ("todo" / "done")
function toggleStatus(task, index) {
  let toggleStatus = document.getElementById("task-status-" + index);
  toggleStatus.addEventListener("change", () => {
    task.status = toggleStatus.checked ? "done" : "todo";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTasksList(selectedFilter);
  });
}

// Fonction pour la suppression définitive d'une tâche
function deleteTask(index, selectedFilter) {
  let deleteButton = document.getElementById("delete-button-" + index);
  deleteButton.addEventListener("click", () => {
    const taskItem = deleteButton.parentElement;
    taskItem.classList.add("fade-out"); // Ajout de la classe 'fade-out' qui permettra l'animation CSS de disparition 

    // Délai avant suppression du DOM pour permettre l'animation
    setTimeout(() => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      updateTasksList(selectedFilter);
    }, 300);
  });
}

// Fonction de mise à jour de la liste des tâches
function updateTasksList(selectedFilter) {
  tasksListUl.innerHTML = "";

  // Boucle sur les tâches pour les afficher
  tasks.forEach((task, index) => {
    if (selectedFilter === "all" || selectedFilter === task.status) {
      tasksListUl.insertAdjacentHTML(
        "beforeend",
        `
          <li class="task-list-li">
              <input type="checkbox" id="task-status-${index}" class="task-status" ${task.status === "done" ? "checked" : ""
        }>
              <label for="task-status-${index}" class="task-list-label">${task.name}</label>
              <button id="delete-button-${index}" class="delete-button">x</button>
          </li>
          `
      );

      toggleStatus(task, index);

      deleteTask(index, selectedFilter);
    }
  });
}
