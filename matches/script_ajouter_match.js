//Lien de l'api
const API_URL="http://localhost:8080/api/match";

async function creerMatch(event){
    event.preventDefault();
    //Chercher les informations du formulaire
    const adversaire1_id = parseInt(document.getElementById("adversaire1").value);
    const adversaire2_id = parseInt(document.getElementById("adversaire2").value);
    const gagnant_id = parseInt(document.getElementById("gagnant").value);
    const dateTime = document.getElementById("dateTime").value;
    const stadium  = document.getElementById("stadium").value;

    //Créer l'objet Match
    const nouv_Match={adversaire1_id,adversaire2_id,gagnant_id,dateTime, stadium};

    //Faire une requête POST pour envoyer l'objet
    try{
        const response = await fetch(`${API_URL}/ajouter`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nouv_Match)
        });

        if(!response.ok){
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        console.log("Succès");
        window.location.href="index.html";
    }
    catch(error){
        console.error("Erreur lors de la création du match");
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.querySelector("form");
    form.addEventListener("submit", creerMatch);
});