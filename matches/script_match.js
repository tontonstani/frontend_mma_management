//Lien de l'API
const API_URL = "http://localhost:8080/api/match";

//Fonction pour charger tous les matches enregistré dans la base de données
async function chargerMatches() {
    try {
        const response = await fetch(`${API_URL}/liste`)
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
                <p>${match.date_evenement}</p>
                <p>${match.lieu}</p>
                <a href="modifier.html?id=${match.id}">Modifier</a>
                <form method="POST">
                    <button type="submit">Supprimer</button>
                </form>`;
            container.appendChild(row);
        });
    }
    catch (error) {
        console.error(error);
    }
}

//Charger les données lorsque c'est prêt
document.addEventListener("DOMContentLoaded", chargerMatches);