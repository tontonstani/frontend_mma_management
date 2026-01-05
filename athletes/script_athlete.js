//Lien de l'API
const API_URL = "http://localhost:8080/api/athlete";

//Fonction pour charger tous les athletes de l'API
async function chargerAthletes(){
    try{
        const response = await fetch(`${API_URL}/liste`)
        if(!response.ok){
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const athletes = await response.json();

        const container = document.getElementById("affichage");
        container.innerHTML = "";
        athletes.forEach(athlete => {
            const row = document.createElement("div");
            row.classList.add("col");
            row.innerHTML = `
            <a href="details.html?id=${athlete.id}">
            <h2>${athlete.prenom} ${athlete.nom}</h2>
            <p>${athlete.origine}</p>
            <p>Force: ${athlete.pts_force}</p>
            <p>Endurance: ${athlete.pts_endurance}</p>
            <p>Vitesse: ${athlete.pts_vitesse}</p>
            <p>Agileté: ${athlete.pts_agilete}</p>
            <p>Résilience: ${athlete.pts_resilience}</p>
            <a href="modifier.html?id=${athlete.id}">Modifier</a>
            <form class="form_suppression" method="POST" data-id="${athlete.id}">
                <button type="submit">Supprimer</button>
            </form>
            </a>
            `;
            container.append(row);
        });
        // Attacher les écouteurs aux formulaires créés dynamiquement
        document.querySelectorAll(".form_suppression").forEach(form => {
            form.addEventListener("submit", supprimerAthlete);
        });
    }
    catch (error) {
        console.log("Erreur lors du chargement des athlètes:",error);
    }
}

async function supprimerAthlete(event){
    event.preventDefault();
    //Récupérer le id de l'athlète à supprimer
    const id = event.currentTarget.getAttribute("data-id");

    //Faire la requête POST pour supprimer
    try{
        const response = await fetch(`${API_URL}/supprimer`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parseInt(id))
        });
        if(!response.ok){
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        console.log("Succès de suppression")
        chargerAthletes();
    }
    catch(error){
        console.log("Erreur lors de la suppression")
    }
}

//Charger les données losrque c'est prêt
document.addEventListener("DOMContentLoaded", chargerAthletes);