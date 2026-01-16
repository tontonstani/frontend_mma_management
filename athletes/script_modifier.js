//Lien de l'API
const API_URL = "http://localhost:8080/api/athlete";//Lien de l'API

//Charger l'athlètes à modifier
async function getAthlete(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    //Faire une requête GET pour chercher l'athlète selon son ID
    try{
        const response = await fetch(`${API_URL}/${id}`);
        if(!response.ok){
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const athlete = await response.json();

        //ajouter les résultats dans les balises dans le formulaire
        document.getElementById("titre").innerText = `Modifier les informations de ${athlete.prenom} ${athlete.nom}`;
        document.getElementById("id").value = athlete.id;
        document.getElementById("prenom").value = athlete.prenom;
        document.getElementById("nom").value = athlete.nom;
        document.getElementById("alias").value = athlete.alias;
        document.getElementById("origine").value = athlete.origine;
        document.getElementById("taille").value = athlete.taille;
        document.getElementById("poids").value = athlete.poids;
        document.getElementById("sexe").value = athlete.sexe;
        if(athlete.actif){
            document.getElementById("actif_vrai").checked=true;
        }
        else{
            document.getElementById("actif_faux").checked=true;
        }
        document.getElementById("date_naissance").value = athlete.date_naissance;
        document.getElementById("force").value = athlete.pts_force;
        document.getElementById("endurance").value = athlete.pts_endurance;
        document.getElementById("vitesse").value = athlete.pts_vitesse;
        document.getElementById("agilete").value = athlete.pts_agilete;
        document.getElementById("resilience").value = athlete.pts_resilience;
    }
    catch(error){
        console.log('Erreur lors du chargement des informations de l\'athlètes: ',error);
    }
}

async function creerAthletes(event){
    event.preventDefault();
    //Chercher les informations du formulaire
    const id = document.getElementById("id").value;
    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;
    const alias = document.getElementById("alias").value;
    const origine = document.getElementById("origine").value;
    const taille = document.getElementById("taille").value;
    const poids = document.getElementById("poids").value;
    const sexe = document.getElementById("sexe").value;
    const actif = document.getElementsByClassName("actif").value;
    const date_naissance = document.getElementById("date_naissance").value;
    const pts_force = parseInt(document.getElementById("force").value);
    const pts_endurance = parseInt(document.getElementById("endurance").value);
    const pts_vitesse = parseInt(document.getElementById("vitesse").value);
    const pts_agilete = parseInt(document.getElementById("agilete").value);
    const pts_resilience = parseInt(document.getElementById("resilience").value);

    //Créer l'objet Athlete
    const nouv_Athlete = {id,prenom, nom, alias, origine, taille,poids,
        sexe, actif, date_naissance, pts_force, pts_endurance,
        pts_vitesse, pts_agilete, pts_resilience};

    //Faire une requête POST pour envoyer l'objet
    try{
        const response = await fetch(`${API_URL}/modifier`,
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
        console.log("Erreur lors de la modification de l'athlète: ",error);
    }
}
//Charger les données losrque c'est prêt
document.addEventListener("DOMContentLoaded", async () => {
    await getAthlete();
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", creerAthletes);
});
