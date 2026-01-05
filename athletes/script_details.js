//Lien de l'API
const API_URL = "http://localhost:8080/api/athlete";

async function getInfoAthlete(){
    //Récupérer le ID
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    //Faire la requête GET pour récupérer les informations de l'athlète
    try{
        const response = await fetch(`${API_URL}/${id}`);
        if(!response.ok){
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const athlete = await response.json();

        //Afficher les informations dans la pages
        const container = document.getElementById('information');
        container.innerHTML = `
            <h1>${athlete.prenom} ${athlete.nom} ALIAS ${athlete.alias}</h1>
            <p>${athlete.origine}</p>
            <p>${athlete.poids} kg / ${athlete.taille} cm</p>
            <p>${athlete.sexe}</p>
            <p>${athlete.date_naissance}</p>
            <p>${athlete.style_combat}</p>
            <p>Stats:</p>
            <p>Force: ${athlete.pts_force}</p>
            <p>Vitesse: ${athlete.pts_vitesse}</p>
            <p>️Agileté: ${athlete.pts_agilete}</p>
            <p>Endurance ${athlete.pts_endurance}</p>
            <p>Résilience: ${athlete.pts_resilience}</p>
        `;
    }
    catch(error){
        console.log('Erreur lors du chargement des informations de l\'athlètes: ',error)
    }
}
//Charger les données losrque c'est prêt
document.addEventListener("DOMContentLoaded", async () => {
    await getInfoAthlete();
});