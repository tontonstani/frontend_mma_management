//Lien de l'API
const API_URL = "http://localhost:8080/api/auth";

//Fonction pour se connecter
async function connexion(event) {
    event.preventDefault();

    //Récupérer les données du formulaire
    const username = document.getElementById("courriel").value;
    const password = document.getElementById("password").value;

    //Créer l'objet Connexion
    const connexion = {username,password};

    //Faire la requête POST vers le serveur
    try{
        const response = await fetch(`${API_URL}/login`,{
            method: "POST",
            body: JSON.stringify(connexion),
            headers: {"content-type": "application/json"}
        });
        if(!response.ok){
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log('Succès');

        //Enregistrer les données dans le cookie et session
        const token = data.token;
        const user = data.username;
        const role = data.roles[0];

        // Enregistrer le username et role
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("user", user);

        window.location.href = "index.html";
    }
    catch(error){
        console.log("Erreur lors de la connexion: ",error);
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.querySelector("form");
    form.addEventListener("submit",connexion);
});