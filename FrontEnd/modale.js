document.addEventListener("DOMContentLoaded", async () => {

        const token = localStorage.getItem("token");

        // Vérifier si un token est présent
		if (token) {
    		// Changer le login to logout
            const authLink = document.getElementById("authLink");
            authLink.innerHTML = "logout";	

            const modeEdition = document.querySelector(".modeEdition"); 
            modeEdition.style.display = "flex";

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


              
  //Partie 1 - Modale


          //Fonction Ouvrir la modale
            const openModal1 = function (event) {
            event.preventDefault();
            
            const modal1Section = document.getElementById("modal1");
            modal1Section.style.display = "flex";
            console.log("Modal 1 has been opened");
        }

        
        champsEdition.addEventListener("click", openModal1);
          
  		}         

        // Récupération des pièces depuis le serveur 
        const reponse = await fetch("http://localhost:5678/api/works");
        const works = await reponse.json();

        const sectionModal = document.querySelector("#grid-modal");


        // Création des éléments du portfolio à partir de l'API
        async function afficherProjets(works) {
            
            for (let i = 0; i < works.length; i++) {
                const portfolio = works[i];
                
                // Créer le conteneur d'image
                const imageContainer = document.createElement("div");
                imageContainer.classList.add("image-container");

                // Créer le bouton "delete"
                const deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-button");
                deleteButton.textContent = "Delete";
                deleteButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="5" height="7" viewBox="0 0 9 11" fill="none">
                <path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
                </svg>`;

                // Créer l'image
                const imageElementmodal = document.createElement("img");
                imageElementmodal.src = portfolio.imageUrl;
                imageElementmodal.classList.add("img-modal");
                imageElementmodal.id = portfolio.id;

                // Ajout des éléments au DOM
                imageContainer.appendChild(deleteButton);
                imageContainer.appendChild(imageElementmodal);
                sectionModal.appendChild(imageContainer);

                // Au click, Récupérer l'id du projet 
                deleteButton.addEventListener("click", function (event) {

                    const imageElementmodal = document.querySelector(".img-modal");

                    clickedImageId = imageElementmodal.id;
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
                })
             }
        } 

        // Afficher tous les projets au chargement de la page
        afficherProjets(works);


        // Fermer la modale
        const closeModal1 = function (event) {
            event.preventDefault();

            const modal1Section = document.getElementById("modal1");
            modal1Section.style.display = "none";
            console.log("Modal 1 has been closed");
        }

        const closeButton = document.querySelector(".btn-close svg");
        closeButton.addEventListener("click", closeModal1);


//Partie 2 - Modale 2

        //Fonction Ouvrir la modale 2
        const openModal2 = function (event) {
            event.preventDefault();

            const modal2Section = document.getElementById("modal2");
            modal2Section.style.display = "flex";
            console.log("Modal 2 has been opened");

        }
        
        const btnAjouterImage = document.getElementById("button-modal");
        btnAjouterImage.addEventListener("click", function(event) {
            closeModal1(event); // Ferme la modal 1
            openModal2(event);  // Ouvre la modal 2
        });

        
        // Fonction Fermeture de la modale 2
        const closeModal2 = function (event) {
            event.preventDefault();

            const modal2Section = document.getElementById("modal2");
            modal2Section.style.display = "none";
            console.log("Modal 2 has been closed");
            
             // Réinitialiser les champs 
             const form = document.querySelector(".ajoutPhoto");
             form.reset();

            // Réinitialiser l'aperçu de l'image 
            const preview = document.getElementById("file-preview");
            preview.src = "";

            // Réafficher les éléments masqués
            const icon = document.querySelector(".iconPhoto");
            const description = document.getElementById("descriptionUpload");
            const requirements = document.getElementById("requirementUpload");
            icon.style.display = "flex"; 
            description.style.display = "flex";
            requirements.style.display = "flex"; 
           
        };

        const closeButton2 = document.querySelector(".btn-close2 svg");
        closeButton2.addEventListener("click", closeModal2);


        const handleReturnButtonClick = function (event) {
            event.preventDefault();
            console.log("Return button clicked");
            closeModal2(event);
            openModal1(event);
        };

        const returnButton = document.querySelector(".btn-previous svg");
        returnButton.addEventListener("click", handleReturnButtonClick);



        // Affichage de la preview de l'image uploadé
        const showPreview = function (event) {
            const fileInput = document.getElementById('button-modal2Ajout');
            const preview = document.getElementById('file-preview');
            const file = fileInput.files[0];
            const icon = document.querySelector(".iconPhoto");
            const description = document.getElementById("descriptionUpload");
            const requirements = document.getElementById("requirementUpload");

            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    preview.src = e.target.result;
                }
                reader.readAsDataURL(file);
                icon.style.display = "none";
                description.style.display = "none";
                requirements.style.display = "none";         

            } else {
                preview.src = ""; // Clear the preview if no file is selected
            }
        };
    
        // Event listener sur le input 
        const fileInput = document.getElementById('button-modal2Ajout');
        fileInput.addEventListener('change', showPreview);

        // Activation du bouton Valider une fois les champs remplis
        

        //  Vérification du remplissage du formulaire 
        const checkFields = function () {
            const title = document.getElementById("title-project").value;
            const imageUrl = document.getElementById("button-modal2Ajout").files[0];
            const categoryId = document.getElementById("category-project").value;
            const boutonValider = document.getElementById("button-modal2"); 

            if (title !== "" && imageUrl !== "" && categoryId !== "") {
                boutonValider.disabled = false;
                console.log("bouton valider actif");
            } else {
                boutonValider.disabled = true;
                console.log("bouton valider inactif");
            }}

        // Activation bouton valider 
        document.getElementById("title-project").addEventListener("input", checkFields);
        document.getElementById("button-modal2Ajout").addEventListener("change", checkFields);
        document.getElementById("category-project").addEventListener("change", checkFields);


        // Envoi du formulaire avec le projet vers l'API 
        const boutonValider = document.getElementById("button-modal2"); 

        boutonValider.addEventListener("click",  async (event) => {
            event.preventDefault();

            const title = document.getElementById("title-project").value;
            const imageUrl = document.getElementById("button-modal2Ajout").files[0];
            const categoryId = document.getElementById("category-project").value;
            
            console.log(imageUrl, title, categoryId); 

            const formData = new FormData ();
               formData.append("image", imageUrl);
               formData.append("title", title);
               formData.append("category", categoryId);
            
            console.log(formData);    

            fetch("http://localhost:5678/api/works", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            }) 
            console.log("Le formulaire a été envoyé");         
        })
        

        const logout = function(event){
            event.preventDefault();
            
            const authLink = document.getElementById("authLink");
            authLink.innerHTML = "login";
            localStorage.removeItem("token");
            window.location.href = "login.html";
        }

        document.getElementById("authLink").addEventListener("click",logout);
   

});





