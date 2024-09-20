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

// 2. Ecouteur d'évènement pour le changement de filtre
filterSelect.addEventListener("change", () => {
  selectedFilter = filterSelect.value;
  updateTasksList();
});

// 3. Délégation d'événements sur la liste des tâches (pour la suppression et le changement de statut d'une tâche)
tasksListUl.addEventListener("click", (event) => {
  const target = event.target;
  const index = target.closest("li").dataset.index; // Récupère l'index via l'attribut 'data-index' sur l'élément <li>

  if (target.classList.contains("delete-button")) {
    deleteTask(index);
  }

  if (target.classList.contains("task-status")) {
    toggleStatus(index);
  }
});


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

  // Ajout de la nouvelle tâche et enregistrement dans le localStorage
  tasks.push(newTask);
  saveTasksToStorage();

  // Ajout direct de la nouvelle tâche dans le DOM sans tout réactualiser
  addTaskToDOM(newTask, tasks.length - 1);

  // Réinitialisation du champ de saisie d'une nouvelle tâche
  newTaskInput.value = "";
}

// Fonction pour l'ajout d'une tâche dans le DOM sans réactualisation de toute la liste
function addTaskToDOM(task, index) {
  if (selectedFilter === "all" || selectedFilter === task.status) {
    const taskHtml = `
      <li class="task-list-li" data-index="${index}">
        <input type="checkbox" id="task-status-${index}" class="task-status" ${task.status === "done" ? "checked" : ""}>
        <label for="task-status-${index}" class="task-list-label">${task.name}</label>
        <button class="delete-button">x</button>
      </li>
    `;
    tasksListUl.insertAdjacentHTML("beforeend", taskHtml);
  }
}

// Fonction pour le changement de statut d'une tâche ("todo" / "done")
function toggleStatus(index) {
  tasks[index].status = tasks[index].status === "todo" ? "done" : "todo";
  saveTasksToStorage();
  updateTasksList(); // Met à jour la liste en fonction du filtre
}

// Fonction pour la suppression définitive d'une tâche
function deleteTask(index) {
  const taskItem = tasksListUl.querySelector(`[data-index="${index}"]`);
  taskItem.classList.add("fade-out");

  // Délai avant suppression pour permettre l'animation CSS
  setTimeout(() => {
    tasks.splice(index, 1);
    saveTasksToStorage();
    updateTasksList(); // Met à jour la liste des tâches en fonction du filtre
  }, 300);
}

// Fonction pour la mise à jour de la liste des tâches
function updateTasksList() {
  tasksListUl.innerHTML = ""; // Efface la liste existante

  tasks.forEach((task, index) => {
    addTaskToDOM(task, index); // Ajoute chaque tâche en fonction du filtre
  });
}

// Fonction pour la sauvegarde des tâches dans le localStorage
function saveTasksToStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}