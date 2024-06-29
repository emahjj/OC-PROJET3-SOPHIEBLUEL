// Création des filtres portfolio à partir de l'API
async function afficherFiltres() {

    // Récupération des catégories de filtres depuis le serveur 
    const reponseFiltres = await fetch("http://localhost:5678/api/categories");
    const categories = await reponseFiltres.json();


    // Création des catégories & boutons filtres
    const categoriesFiltres = document.querySelector(".filters");
    const btnTous = document.createElement("button")

    // Création du bouton tous
    btnTous.innerText = "Tous";
    btnTous.setAttribute("data-category", "Tous");
    btnTous.classList.add("btn-filtrer");
    categoriesFiltres.appendChild(btnTous);

    // Création des filtres à partir de la liste des filtres via l'API
    for (let i = 0; i < categories.length; i++) {

        const filtresListe = categories[i];

        // Création du bouton filtre dans le DOM
        const btnFiltre = document.createElement("button");

        // Ajout du texte dans le bouton filtre
        btnFiltre.innerText = filtresListe.name;

        // categories.push({"name": "Tous"})

        // Ajout des paramètres des filtres
        btnFiltre.setAttribute("data-category", filtresListe.name);
        btnFiltre.classList.add("btn-filtrer");

        // Ajout dans catégorie filtre
        categoriesFiltres.appendChild(btnFiltre);

    }

    const btnFiltres = document.querySelectorAll(".btn-filtrer");

    for (let i = 0; i < btnFiltres.length; i++) {

        btnFiltres[i].addEventListener("click", function () {

            const categoryFiltre = btnFiltres[i].getAttribute("data-category");
            let projetsFiltres;

            if (categoryFiltre === "Tous") {
                projetsFiltres = works;
            } else {
                projetsFiltres = works.filter(work => work.category.name === categoryFiltre);
            }

            console.log(projetsFiltres);

            // Vider la galerie avant d'afficher les projets filtrés
            sectionGallery.innerHTML = "";

            // Ajouter les projets filtrés à la galerie
            afficherProjets(projetsFiltres);

        });
    }
}

// Afficher tous les filtres au chargement de la page
afficherFiltres();



// Récupération des pièces depuis le serveur 
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

const sectionGallery = document.querySelector(".gallery");

// Création des éléments du portfolio à partir de l'API
async function afficherProjets(works) {


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

