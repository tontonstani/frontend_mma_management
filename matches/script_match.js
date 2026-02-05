//Lien de l'API
const API_URL = "http://localhost:8080/api/match";

//Fonction pour charger tous les matches enregistré dans la base de données
async function chargerMatches() {
    try {
        const response = await fetch(`${API_URL}/listeDTO`)
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        //Récupérer la liste de données venus de l'API
        const matches = await response.json();
        const lst = [1,2,3];

        const container = document.getElementById("affichage");
        container.innerHTML = "";

        lst.forEach(element => {
            const row = document.createElement("div");
            row.classList.add("col");
            row.innerHTML = `
                <h2 class="placeholder-glow">
                    <span class="placeholder col-3"></span>
                </h2>
                <div class="placeholder-glow">
                    <span class="placeholder col-1"></span><br>
                    <span class="placeholder col-3"></span><br>
                    <span class="placeholder col-2"></span>
                </div>
                <a class="btn disabled placeholder col-2"></a>
                `;
            container.append(row);
        })

        setTimeout(() => {
            container.innerHTML = "";
            matches.forEach(match => {
                const row = document.createElement("div");
                row.classList.add("col");
                row.innerHTML = `
                <h2>${match.adversaire1} VS ${match.adversaire2}</h2>
                <p>${match.datetime}</p>
                <p>${match.stadium}</p>
                <a href="modifier.html?id=${match.id}">Modifier</a>
                <form class="form_suppression" method="POST" data-id="${match.id}">
                    <button type="submit">Supprimer</button>
                </form>
                <a href="details.html?id=${match.id}">Détails du match</a>`;
                container.appendChild(row);
            });
        }, 1500)
        // Attacher les écouteurs aux formulaires créés dynamiquement
        document.querySelectorAll(".form_suppression").forEach(form => {
            form.addEventListener("submit", supprimerMatch);
        });
    } catch (error) {
        console.error(error);
    }
}

//Charger les données lorsque c'est prêt
document.addEventListener("DOMContentLoaded", chargerMatches);

async function supprimerMatch(event) {
    event.preventDefault();
    const id = event.currentTarget.getAttribute("data-id");

    //Faire la requête POST pour supprimer
    try {
        const response = await fetch(`${API_URL}/supprimer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parseInt(id))
        });
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        console.log("Succès de suppression")
        chargerMatches();
    } catch (error) {
        console.log("Erreur lors de la suppression")
    }
}