//Lien de l'api
const API_URL="http://localhost:8080/api/match";

async function creerMatch(event){
    event.preventDefault();
    //Chercher les informations du formulaire
    const date_evenement = document.getElementById("date_evenement").value;
    const lieu  = document.getElementById("lieu").value;

    //Créer l'objet Match
    const nouv_Match={date_evenement, lieu};

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