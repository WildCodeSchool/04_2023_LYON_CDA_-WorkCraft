const data = {
  title: "Entretien",
  owner: "api/users/1",
  lists: [
    {
      title: "Cuisine",
      tasks: [
        {
          title: "Planning repas",
          description: "Je prépare mes repas de la semaine",
          modules: [
            {
              title: "Création de la semaine",
              isDone: true,
            },
            {
              title: "Mise à jour de la semaine",
              isDone: false,
            },
          ]
        },
        {
          title: "Ménage",
          description: "Propreté de la cuisine",
          modules: [
            {
              title: "Nettoyer l'evier",
              isDone: true,
            },
            {
              title: "Nettoyer la plaque",
              isDone: true,
            },
            {
              title: "Nettoyer le frigo",
              isDone: true,
            },
            {
              title: "Nettoyer le sol",
              isDone: true,
            },
            {
              title: "Sortir les poubelles",
              isDone: false,
            },
          ]
        }
      ]
    },
    {
      title: "Salle de Bain",
      tasks: [
        {
          title: "Ménage",
          description: "Propreté de la salle de bain",
          modules: [
            {
              title: "Nettoyer l'evier",
              isDone: true,
            },
            {
              title: "Nettoyer la douche",
              isDone: true,
            },
            {
              title: "Nettoyer les toilettes",
              isDone: true,
            },
            {
              title: "Nettoyer le sol",
              isDone: true,
            },
            {
              title: "Sortir les poubelles",
              isDone: false,
            },
          ]
        },
        {
          title: "Entretien",
          description: "Je m'occupe des consommables",
          modules: [
            {
              title: "Changer les joints de douches",
              isDone: true,
            },
            {
              title: "Changer le robinet",
              isDone: false,
            },
          ]
        },
      ]
    },
    {
      title: "Chambre",
      tasks: [
        {
          title: "Ménage",
          description: "Propreté de la chambre",
          modules: [
            {
              title: "Faire son lit",
              isDone: true,
            },
            {
              title: "Ranger la chambre",
              isDone: true,
            },
            {
              title: "Nettoyer le sol",
              isDone: true,
            },
            {
              title: "Aérer",
              isDone: true,
            },
          ]
        },
      ]
    },
    {
      title: "Jardin",
      tasks: [
        {
          title: "Entretien",
          description: "Je m'occupe du jardin",
          modules: [
            {
              title: "Entretien de la tondeuse",
              isDone: true,
            },
            {
              title: "Entretien de la piscine",
              isDone: true,
            },
            {
              title: "Végétaux",
              isDone: false,
            },
          ]
        },
        {
          title: "Végétaux",
          description: "Entretien végétaux",
          modules: [
            {
              title: "Tondre la pelouse",
              isDone: false,
            },
            {
              title: "Changer les plantes",
              isDone: false,
            },
          ]
        },
        {
          title: "Piscine",
          description: "Entretien piscine",
          modules: [
            {
              title: "Chlore",
              isDone: true,
            },
            {
              title: "Nettoyer la piscine",
              isDone: true,
            },
          ]
        },
      ]
    },
    {
      title: "Garage",
      tasks: [
        {
          title: "Entretien",
          description: "Je m'occupe du garage",
          modules: [
            {
              title: "Entretien de la porte de garage",
              isDone: true,
            },
            {
              title: "Ranger le garage",
              isDone: true,
            },
          ]
        },
      ]
    }
  ]
}

export default data;
