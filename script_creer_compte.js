//Lien de l'API
const API_URL = "http://localhost:8080/api/auth";

async function enregistrerUtilisateur(event){
    event.preventDefault();

    //récupérer les données dans le formulaire
    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;
    const email = document.getElementById("courriel").value;
    const password = document.getElementById("password").value;

    //Créer l'objet Utilisateur
    const user = {prenom,nom,email,password};

    //Envoyer la requête POST vers le serveur
    try{
        const response = await fetch(`${API_URL}/register`,{
            method:"POST",
            body:JSON.stringify(user),
            headers:{"content-type":"application/json"}
        });
        if(!response.ok){
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        console.log("Succès");
        window.location.href="connexion.html";
    }
    catch(error){
        console.log("Erreur lors de la création d'un compte: ",error);
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    const form = document.getElementById("form_inscription");
    form.addEventListener("submit", enregistrerUtilisateur);
});