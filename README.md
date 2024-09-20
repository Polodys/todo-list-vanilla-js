# TODO list (JavaScript Vanilla)

## Description

Cette application web permet de créer, gérer et supprimer des tâches.
L'affichage apparaît sous la forme d'une liste, dans laquelle il est possible de marquer les tâches comme étant faites ou non, et de les supprimer.
Un filtre permet de sélectionner le type d'affichage souhaité (toutes les tâches, uniquement les tâches à faire ou uniquement les tâches faites).
Les tâches sont sauvegardées localement à l'aide du localStorage, ce qui assure une persistance des données.


## Fonctionnalités

- Ajouter des tâches
- Changer le statut des tâches ("à faire" ou "faite")
- Supprimer des tâches (avec une animation de disparition)
- Filtrer les tâches ("Tout afficher", "A faire", "Faites")
- Persistance des données via le localStorage


## Technologies

- **HTML5** : pour la structure de l'application
- **CSS3** : pour le style et l'animation
- **JavaScript** : pour la logique de gestion des tâches et l'interaction avec le DOM
- **localStorage** : pour la sauvegarde des données dans le navigateur


## Installation

1. Cloner le projet :

    ```
    git clone https://github.com/Polodys/todo-list-vanilla-js.git
    ```

2. Ouvrir le fichier index.html dans un navigateur.