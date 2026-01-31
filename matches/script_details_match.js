//Url de l'API
const URL_API = "http://localhost:8080/api"

//Fonction pour aller chercher les données du match
async function details_match(){
    //Récupérer le ID
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    try{
        const response = await fetch(`${URL_API}/match/${id}`);
        if(!response.ok){
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const match = await response.json();

        //Afficher les informations du matches
        const container = document.getElementById("information");
        container.innerHTML = `
            <p>Combattant #1: ${match.adversaire1}</p>
            <p>Combattant #2: ${match.adversaire2}</p>
            <p>Gagnant: ${match.gagnant}</p>
            <p>Date: ${match.datetime}</p>
            <p>Stadium: ${match.stadium}</p>
        `;
    }
    catch(error){
        console.log('Erreur lors du chargement des informations du match: ',error)
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await details_match();
})