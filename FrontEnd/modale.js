document.addEventListener("DOMContentLoaded", async () => {

        const token = localStorage.getItem('token');

        // Vérifier si un token est présent
		if (token) {
    		// Changer le login to logout
            const authLink = document.getElementById("authLink");

            authLink.innerHTML = "logout";	
            
  		}
        


        // Sélectionner l'élément où ajouter le bouton d'édition
        const headersEdition = document.querySelector("#portfolio h2");
            
        // Créer le bouton d'édition
         const champsEdition = document.createElement("div");
         champsEdition.classList.add("champsEdition");

         const editIcon = document.createElement("button");
         editIcon.classList.add("edit-button");	
         editIcon.innerHTML = `
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
         <path d="M13.5229 1.68576L13.8939 2.05679C14.1821 2.34503 14.1821 2.81113 13.8939 3.0963L13.0016 3.99169L11.5879 2.57808L12.4803 1.68576C12.7685 1.39751 13.2346 1.39751 13.5198 1.68576H13.5229ZM6.43332 7.73578L10.5484 3.61759L11.9621 5.03121L7.84387 9.14633C7.75494 9.23525 7.64455 9.29964 7.52496 9.33337L5.73111 9.84546L6.2432 8.05162C6.27693 7.93203 6.34133 7.82164 6.43025 7.73271L6.43332 7.73578ZM11.4408 0.646245L5.39074 6.6932C5.12397 6.95998 4.93078 7.28808 4.82959 7.64685L3.9526 10.7133C3.879 10.9708 3.94953 11.2468 4.13965 11.4369C4.32977 11.627 4.60574 11.6976 4.86332 11.624L7.92973 10.747C8.29156 10.6427 8.61967 10.4495 8.88338 10.1858L14.9334 4.13888C15.7951 3.27722 15.7951 1.87894 14.9334 1.01728L14.5624 0.646245C13.7007 -0.215415 12.3024 -0.215415 11.4408 0.646245ZM2.69844 1.84214C1.20816 1.84214 0 3.05031 0 4.54058V12.8812C0 14.3715 1.20816 15.5796 2.69844 15.5796H11.0391C12.5293 15.5796 13.7375 14.3715 13.7375 12.8812V9.44683C13.7375 9.039 13.4094 8.71089 13.0016 8.71089C12.5937 8.71089 12.2656 9.039 12.2656 9.44683V12.8812C12.2656 13.5589 11.7167 14.1078 11.0391 14.1078H2.69844C2.02076 14.1078 1.47188 13.5589 1.47188 12.8812V4.54058C1.47188 3.86291 2.02076 3.31402 2.69844 3.31402H6.13281C6.54065 3.31402 6.86875 2.98591 6.86875 2.57808C6.86875 2.17025 6.54065 1.84214 6.13281 1.84214H2.69844Z" fill="black"/>
         </svg>`; 
       
         const btnEditionDescription = document.createElement("p");
         btnEditionDescription.classList.add("edit-button-text");;
         btnEditionDescription.innerText = "Modifier";


		// Ajouter le bouton d'édition à l'élément approprié
		champsEdition.appendChild(editIcon);
		champsEdition.appendChild(btnEditionDescription);
		headersEdition.appendChild(champsEdition);	


        //Fonction Ouvrir la modale
        const openModal = function (event) {
            event.preventDefault();
            
            const modalSection = document.getElementById("modal1");
            modalSection.style.display = "flex";
            console.log("Modal has been opened");
        }

        
        champsEdition.addEventListener("click", openModal);
        



        // Récupération des pièces depuis le serveur 
        const reponse = await fetch("http://localhost:5678/api/works");
        const works = await reponse.json();

        const sectionModal = document.querySelector("#grid-modal");


        // Création des éléments du portfolio à partir de l'API
        async function afficherProjets(works) {
            
            for (let i = 0; i < works.length; i++) {
                const portfolio = works[i];
                
                const imageElementmodal = document.createElement("img");
                imageElementmodal.src = portfolio.imageUrl;
                imageElementmodal.classList.add("img-modal");
                imageElementmodal.id = portfolio.id;

                // Ajout des éléments au DOM
                sectionModal.appendChild(imageElementmodal);

                // Au click, Récupérer l'id du projet 
                imageElementmodal.addEventListener("click", function (event) {
                    const clickedImageId = event.target.id;
                    console.log(clickedImageId); 

                    // Construire l'URL de l'API avec l'ID cliqué
                    const apiUrl = `http://localhost:5678/api/works/${clickedImageId}`;

                    fetch(apiUrl, {
                        method: 'DELETE', // HTTP method: POST
                        headers: {
                        'Content-Type': 'application/json',// Set the content type to JSON
                        'Authorization': `Bearer ${token}` // Ajouter le token d'authentification
                        },
                        body: JSON.stringify({ id: clickedImageId }) // Convert id to a JSON string
                    })     
                    console.log(workdeleted)      
                })
             }
        } 

        // Afficher tous les projets au chargement de la page
        afficherProjets(works);

            
        // Fermer la modale
        const closeModal = function (event) {
            event.preventDefault();
            const modalSection = document.getElementById("modal1");
            modalSection.style.display = "none";
            console.log("Modal has been closed");
        }

        const closeButton = document.querySelector(".btn-close");
        closeButton.addEventListener("click", closeModal);
        
});




