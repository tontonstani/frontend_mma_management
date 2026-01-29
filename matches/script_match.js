//Lien de l'API
const API_URL = "http://localhost:8080/api/match";

//Fonction pour charger tous les matches enregistré dans la base de données
async function chargerMatches() {
    try {
        const response = await fetch(`${API_URL}/listeDTO`)
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const matches = await response.json();

        const container = document.getElementById("affichage");
        container.innerHTML = "";
        matches.forEach(match => {
            const row = document.createElement("div");
            row.classList.add("col");
            row.innerHTML = `
                <h2>${match.adversaire1} VS ${match.adversaire2}</h2>
                <p>${match.datetime}</p>
                <p>${match.stadium}</p>
                <a href="modifier.html?id=${match.id}">Modifier</a>
                <form class="form_suppression" method="POST">
                    <button type="submit">Supprimer</button>
                </form>`;
            container.appendChild(row);
        });
        // Attacher les écouteurs aux formulaires créés dynamiquement
        /*document.querySelectorAll(".form_suppression").forEach(form => {
            form.addEventListener("submit", supprimerMatch);
        });*/
    }
    catch (error) {
        console.error(error);
    }
}

//Charger les données lorsque c'est prêt
document.addEventListener("DOMContentLoaded", chargerMatches);

async function supprimerMatch(event){
    event.preventDefault();
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
        chargerMatches();
    }
    catch(error){
        console.log("Erreur lors de la suppression")
    }
}