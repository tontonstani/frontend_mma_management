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
//Charger les données losrque c'est prêt
document.addEventListener("DOMContentLoaded", async () => {
    await getAthlete();
});
