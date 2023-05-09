const data = {
  title: "WorkCraft",
  owner: "api/users/1",
  lists: [
    {
      title: "BrainStorm Features",
      tasks: [
        {
          title: "Planning par semaine",
          description: "Je peux avoir un visuel graphique du temps à passer sur les tâches",
          modules: [
            {
              title: "Création d'un graphique",
              isDone: false,
            },
            {
              title: "Modification directement dans le graphique",
              isDone: false,
            },
          ]
        },
        {
          title: "Deployement",
          description: "Je peux avoir le site directement sur un serveur",
          modules: [
            {
              title: "Deployement du projet",
              isDone: false,
            },
            {
              title: "Maintenance",
              isDone: false,
            },
          ]
        }
      ]
    },
    {
      title: "To Do",
      tasks: [
        {
          title: "Timer Général",
          description: "En tant qu’utilisateur je peux avoir l’information du temps passé sur le projet",
          modules: [
            {
              title: "J'affiche la date de création et de fin de projet",
              isDone: false,
            },
            {
              title: "J'affiche un timer pour indiquer combien de temps il reste",
              isDone: false,
            },
          ]
        },
        {
          title: "Assigner un utilisateur à une task",
          description: "En tant qu’utilisateur je peux avoir assigner des personnes sur une task",
          modules: [
            {
              title: "J'affiche les personnes concernées",
              isDone: false,
            },
            {
              title: "Je peux voir qui est assigné aux différentes tasks",
              isDone: false,
            },
          ]
        },
      ]
    },
    {
      title: "On Task",
      tasks: [
        {
          title: "Drag & Drop",
          description: "Je peux déplacer des listes et des tâches grâce à un drag & drop de la souris",
          modules: [
            {
              title: "Déplacer une tâche",
              isDone: true,
            },
            {
              title: "Déplacer une liste",
              isDone: false,
            },
          ]
        },
        {
          title: "Home Page",
          description: "Un page d'accueil quand aucun projet n'est séléctionner où quand un projet est supprimé",
          modules: [
            {
              title: "Page d'accueil",
              isDone: true,
            },
            {
              title: "Redirection vers la page quand suppression du projet",
              isDone: false,
            },
          ]
        },
        {
          title: "Dark Mode",
          description: "Avoir un thème moins coloré",
          modules: [
            {
              title: "Implémentation",
              isDone: true,
            },
            {
              title: "Choix des couleurs",
              isDone: true,
            },
            {
              title: "Application sur tout le site",
              isDone: false,
            },
          ]
        },
      ]
    },
    {
      title: "Check",
      tasks: [
        {
          title: "CRUD Project",
          description: "Création des différentes fonctions pour modifier la table Project",
          modules: [
            {
              title: "Create",
              isDone: true,
            },
            {
              title: "Read",
              isDone: true,
            },
            {
              title: "Update",
              isDone: true,
            },
            {
              title: "Delete",
              isDone: true,
            }
          ]
        },
        {
          title: "CRUD List",
          description: "Création des différentes fonctions pour modifier la table ProjectList",
          modules: [
            {
              title: "Create",
              isDone: true,
            },
            {
              title: "Read",
              isDone: true,
            },
            {
              title: "Update",
              isDone: true,
            },
            {
              title: "Delete",
              isDone: true,
            }
          ]
        },
        {
          title: "CRUD Task",
          description: "Création des différentes fonctions pour modifier la table Task",
          modules: [
            {
              title: "Create",
              isDone: true,
            },
            {
              title: "Read",
              isDone: true,
            },
            {
              title: "Update",
              isDone: true,
            },
            {
              title: "Delete",
              isDone: true,
            }
          ]
        },
        {
          title: "CRUD Modules",
          description: "Création des différentes fonctions pour modifier la table Modules",
          modules: [
            {
              title: "Create",
              isDone: true,
            },
            {
              title: "Read",
              isDone: true,
            },
            {
              title: "Update",
              isDone: true,
            },
            {
              title: "Delete",
              isDone: true,
            }
          ]
        },
      ]
    },
    {
      title: "Done",
      tasks: [
        {
          title: "Création de l'API",
          description: "Création d'une api pour la gestion des données sur le projet",
          modules: [
            {
              title: "Création de l'API via Symfony",
              isDone: true,
            },
            {
              title: "Configurer API Platform",
              isDone: true,
            },
            {
              title: "Connexion de l'API au projet",
              isDone: true,
            }
          ]
        },
        {
          title: "React Router",
          description: "Création des différents chemin pour naviguer sur le site",
          modules: [
            {
              title: "Implémenter le module",
              isDone: true,
            },
            {
              title: "Créer les différentes routes",
              isDone: true,
            }
          ]
        },
        {
          title: "Dynamic Background Image",
          description: "Avoir une image différente en background sur le dashboard",
          modules: [
            {
              title: "Changement d'image en fonction du projet",
              isDone: true,
            }
          ]
        },
        {
          title: "List + Task",
          description: "En tant qu’utilisateur je peux voir les différentes tasks dans des listes prédéfinies",
          modules: [
            {
              title: "Affichage des listes",
              isDone: true,
            },
            {
              title: "Faire les cartes pour les tasks",
              isDone: true,
            }
          ]
        },
      ]
    }
  ]
}

export default data;
