// Récupération des pièces depuis le serveur 
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

const sectionGallery = document.querySelector(".gallery");

// Création des éléments du portfolio à partir de l'API
function afficherProjets(works) {
    
for (let i = 0; i < works.length; i++) {
    const portfolio = works[i];

    const figure = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = portfolio.imageUrl;

    const nomElement = document.createElement("figcaption");
    nomElement.innerText = portfolio.title;

    // Ajout des éléments au DOM
    figure.appendChild(imageElement);
    figure.appendChild(nomElement);

    sectionGallery.appendChild(figure);
    }
}

// Afficher tous les projets au chargement de la page
afficherProjets(works);

// Ajout des filtres
const btnFiltres = document.querySelectorAll(".btn-filtrer");
for (let i = 0; i < btnFiltres.length; i++) {

btnFiltres[i].addEventListener("click", function () {
    const categoryFiltre  = btnFiltres[i].getAttribute("data-category").toLowerCase();
    let projetsFiltres;

    if (categoryFiltre === "tous") {
        projetsFiltres = works;
    } else {
        projetsFiltres = works.filter(works => works.category.name.toLowerCase()=== categoryFiltre);
    }

    console.log(projetsFiltres);

    // Vider la galerie avant d'afficher les projets filtrés
    sectionGallery.innerHTML = '';
            
    // Ajouter les projets filtrés à la galerie
    afficherProjets(projetsFiltres);
    });

}