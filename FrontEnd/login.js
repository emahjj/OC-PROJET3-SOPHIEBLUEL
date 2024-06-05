loginform.addEventListener("submit", async (event) =>{
    event.preventDefault();

    // On récupère les deux champs et on affiche leur valeur
    const username = document.getElementById("email").value;

    const password = document.getElementById("mdp").value;

    console.log(username);
    console.log(password);

    // Récupération des idenfiants mdp depuis le serveur 
    const reponse = await fetch("http://localhost:5678/api/users/login");
    const logins = await reponse.json();

    if (username === logins.email & password === logins.password ) {
        let erreurMessage = document.createElement("p")
        erreurMessage.innerText = "Login réussi"
        loginform.appendchild = (erreurMessage)
        
    } else {
        let erreurMessage = document.createElement("p")
        erreurMessage.innerText = "Erreur dans l identifiant ou le mot de passe"
        loginform.appendchild = (erreurMessage)
        // rediriger vers la page d'acceuil éditable
    }

});