const loginform = document.getElementById("loginform");

loginform.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the email and password values
  const email = document.getElementById("email").value;
  const password = document.getElementById("mdp").value;

  console.log(email);
  console.log(password);

  // Send POST request to login API
  fetch("http://localhost:5678/api/users/login", {
    method: 'POST', // HTTP method: POST
    headers: {
      'Content-Type': 'application/json' // Set the content type to JSON
    },
    body: JSON.stringify({ email, password }) // Convert email and password to a JSON string
  })

  .then (response => 
    response.json().then(data => ({
      status: response.status,
      body: data
    }))
  )
  .then(({ status, body }) => {
    
    // Effacer les messages d'erreur d'avant


    // Check response status and display messages
    if (status === 404) {
      let erreurMessage = document.createElement("p");
      erreurMessage.innerText = "Erreur dans l'identifiant ou le mot de passe";
      erreurMessage.className = "error-message";
      loginform.appendChild(erreurMessage);

    } else if (status === 200) {
      let successMessage = document.createElement("p");
      successMessage.innerText = "Login réussi";
      successMessage.className = "success-message";
      loginform.appendChild(successMessage);

        // afficher et stocker le jeton d'authentification
        console.log(body.token); 
        localStorage.setItem("token", body.token);

        // Rediriger vers la page projets editable
        window.location.href = "index.html";

    }
  });
});


