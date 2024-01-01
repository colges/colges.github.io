 document.addEventListener("DOMContentLoaded", function () {
    // Récupérer l'élément contenant les projets
    var projetContainer = document.getElementById("projetContainer");

    // Charger les données à partir du fichier JSON
    fetch("json/projet.json") // Utilisez un chemin relatif pour le fichier JSON
        .then(response => response.json())
        .then(data => {
            // Boucler à travers les projets et créer des éléments HTML
            data.forEach(function (projet) {
                var projetElement = document.createElement("div");
                projetElement.classList.add("projet");

                var imageElement = document.createElement("img");
                imageElement.src = projet.imageURL;
                imageElement.alt = projet.titre;

                var titreElement = document.createElement("h2");
                titreElement.textContent = projet.titre;

                var descriptionElement = document.createElement("p");
                descriptionElement.textContent = projet.description;

                projetElement.appendChild(imageElement);
                projetElement.appendChild(titreElement);
                projetElement.appendChild(descriptionElement);

                projetContainer.appendChild(projetElement);
            });
        })
        .catch(error => console.error("Erreur de chargement du fichier JSON:", error));
});




/*
document.addEventListener("DOMContentLoaded", function () {
    // Récupérer l'élément contenant les projets
    var projetContainer = document.getElementById("projetContainer");

    // Exemple de données JSON pour les projets
    var projets = [
        { titre: "Projet 1", description: "Description du Projet 1" },
        { titre: "Projet 2", description: "Description du Projet 2" },
        { titre: "Projet 3", description: "Description du Projet 3" },
        // Ajoutez d'autres projets selon vos besoins
    ];

    // Boucler à travers les projets et créer des éléments HTML
    projets.forEach(function (projet) {
        var projetElement = document.createElement("div");
        projetElement.classList.add("projet");

        var titreElement = document.createElement("h2");
        titreElement.textContent = projet.titre;

        var descriptionElement = document.createElement("p");
        descriptionElement.textContent = projet.description;

        projetElement.appendChild(titreElement);
        projetElement.appendChild(descriptionElement);

        projetContainer.appendChild(projetElement);
    });
});

*/
