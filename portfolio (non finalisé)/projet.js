document.addEventListener("DOMContentLoaded", function () {
    // Récupérer l'élément contenant les projets
    var projetContainer = document.getElementById("projetContainer");

    // Charger les données à partir du fichier JSON
    fetch("projets.json")
        .then(response => response.json())
        .then(data => {
            // Boucler à travers les projets et créer des éléments HTML
            data.forEach(function (projet) {
                var projetElement = document.createElement("div");
                projetElement.classList.add("json.projet");

                var titreElement = document.createElement("h2");
                titreElement.textContent = projet.titre;

                var descriptionElement = document.createElement("p");
                descriptionElement.textContent = projet.description;

                projetElement.appendChild(titreElement);
                projetElement.appendChild(descriptionElement);

                projetContainer.appendChild(projetElement);
            });
        })
        .catch(error => console.error("Erreur de chargement du fichier JSON:", error));
});