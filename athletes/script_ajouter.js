//Lien de l'API
const API_URL = "http://localhost:8080/api/athlete";

async function creerAthletes(event){
    event.preventDefault();
    //Chercher les informations du formulaire
    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;
    const alias = document.getElementById("alias").value;
    const origine = document.getElementById("origine").value;
    const taille = document.getElementById("taille").value;
    const poids = document.getElementById("poids").value;
    const sexe = document.getElementById("sexe").value;
    const actif = document.getElementById("actif").checked;
    const date_naissance = document.getElementById("date_naissance").value;
    const pts_force = parseInt(document.getElementById("force").value);
    const pts_endurance = parseInt(document.getElementById("endurance").value);
    const pts_vitesse = parseInt(document.getElementById("vitesse").value);
    const pts_agilete = parseInt(document.getElementById("agilete").value);
    const pts_resilience = parseInt(document.getElementById("resilience").value);

    //Créer l'objet Athlete
    const nouv_Athlete = {prenom, nom, alias, origine, taille,poids,
        sexe, actif, date_naissance, pts_force, pts_endurance,
        pts_vitesse, pts_agilete, pts_resilience};

    //Faire une requête POST pour envoyer l'objet
    try{
        const response = await fetch(`${API_URL}/ajouter`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nouv_Athlete),
            });
        if(!response.ok){
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        console.log("Succèes");
        window.location.href = "index.html";
    }
    catch(error){
        console.log("Erreur lors de la création de l'athlète: ",error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form_athlete_ajouter");
    form.addEventListener("submit", creerAthletes);
});