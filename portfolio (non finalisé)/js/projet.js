

// Charger le fichier JSON localement

fetch('json/projects.json')
    .then(response => response.json())
    .then(data => {
        // Assigner les données JSON à la variable projects
        projects = data;

        // Trier les projets du plus récent au plus ancien selon la date
        projects.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Appeler la fonction displayProjects avec les données JSON
        displayProjects(data);
    })
    .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));



function displayProjects(projects) {
    const projectContainer = document.getElementById('project-container');
    projectContainer.innerHTML = '';

    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        projectDiv.dataset.category = project.category.toLowerCase();

        const projectImage = document.createElement('img');
        projectImage.src = project.image;
        projectDiv.appendChild(projectImage);

        const projectTitle = document.createElement('span');
        projectTitle.innerText = project.title;
        projectDiv.appendChild(projectTitle);

        projectDiv.addEventListener('click', () => showProjectDetails(project));

        projectContainer.appendChild(projectDiv);
    });
}

function showProjectDetails(project) {
    const projectTitle = document.getElementById('project-title');
    const projectDescription = document.getElementById('project-description');
    const projectInfo = document.getElementById('project-info');
    const projectResources = document.getElementById('project-resources');
    const projectDetails = document.getElementById('project-details');
    const listImg = document.getElementById('list_img');

    projectTitle.innerText = project.title;
    projectDescription.innerHTML = `<h2>Description :</h2> ${project.description}`;
    projectInfo.innerHTML = `<h2>Info :</h2> <strong>Date du Projet:</strong> ${project.date}<br>`;

    if (project.software != "") {
        projectInfo.innerHTML += `<strong>Logiciel Utilisé:</strong> ${project.software}`;
    }

   // projectResources.innerHTML = `<strong>Lien vers le Projet:</strong> <a href="${project.projectLink}" target="_blank">${project.projectLink}</a><br><strong>Rapport du Projet:</strong> <a href="${project.reportLink}" target="_blank">${project.reportLink}</a>`;
  //  projectResources.innerHTML = '';
/*
    if (project.plink != "") {
        projectResources.innerHTML = `<strong>Lien vers le Projet:</strong> <a href="${project.plink}" target="_blank">${project.plink}</a><br>`;
    }

    if (project.rlink != "") {
        projectResources.innerHTML += `<strong>Rapport du Projet:</strong> <a href="${project.rlink}" target="_blank">${project.rlink}</a>`;
    }
*/

    // Efface les anciennes photos
    listImg.innerHTML = '';

    // mes la photo principal
    const imgSelected = document.getElementById('img_selected');
    imgSelected.src = project.image;

    // Ajoute les nouvelles photos
    project.photos.forEach(photo => {
        const slideImg = document.createElement('img');
        slideImg.classList.add("switchable_img");
        slideImg.setAttribute('id', 'lisimg');

        const newItem = document.createElement('li');
        slideImg.src = photo;
        newItem.appendChild(slideImg);
        listImg.appendChild(newItem);
    });

    // Affiche les détails du projet
    projectDetails.style.display = 'block';

    document.body.classList.add('no-scroll'); // Ajoutez la classe pour empêcher le scroll
   // document.querySelector('.background-overlay').style.display = 'block'; // Affichez l'arrière-plan sombre




}


// Écouteur d'événement pour cliquer sur les images ajoutées dynamiquement
document.getElementById("list_img").addEventListener("click", function(event) {
    if (event.target && event.target.nodeName == "IMG") {
        // Appeler la fonction switch_img avec la source de l'image cliquée
        switch_img(event.target.src);
    }
});



/// Fonction pour changer l'image sélectionnée
function switch_img(newSrc) {
    // Mettre à jour la source de l'image sélectionnée
    document.getElementById("img_selected").src = newSrc;
}




function closeProjectDetails() {
    const projectDetails = document.getElementById('project-details');

    // Masquer les détails du projet
    projectDetails.style.display = 'none';

   
}

function filterProjects(category) {
    const projectContainer = document.getElementById('project-container');
    const projectsToShow = category === 'all' ?
        projects :
        projects.filter(project => project.category.toLowerCase() === category);

    displayProjects(projectsToShow);
}