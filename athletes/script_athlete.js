//Lien de l'API
const API_URL = "http://localhost:8080/api/athlete";

//Fonction pour charger tous les athletes de l'API
async function chargerAthletes() {
    try {
        const response = await fetch(`${API_URL}/listeDTO`)
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        //Les données de l'API
        const athletes = await response.json();
        const lst = [1, 2, 3];

        //Chercher le container pour afficher les données dans la page
        const container = document.getElementById("affichage");
        container.innerHTML = "";

        //Ajouter un placeholder pour simuler un chargement de données
        lst.forEach(element => {
            const row = document.createElement("div");
            row.classList.add("col");
            row.innerHTML = `
                <h2 class="placeholder-glow">
                    <span class="placeholder col-6"></span>
                </h2>
                <div class="placeholder-glow">
                    <span class="placeholder col-5"></span>
                    <span class="placeholder col-7"></span>
                </div>
                <a class="btn disabled placeholder col-4"></a>
                `;
            container.append(row);
        });

        //Afficher les données après 3 secondes
        setTimeout(() => {
                container.innerHTML = "";
                athletes.forEach(athlete => {
                    const row = document.createElement("div");
                    row.classList.add("col");
                    row.innerHTML = `
            <div class="border border-1 rounded text-center p-1">
            <h2>${athlete.prenom} ${athlete.nom}</h2>
            <p class="fw-bolder">${athlete.origine}</p>
            <p class="fw-bold"><span class="text-success">${athlete.victoires}</span> - <span class="text-danger">${athlete.defaites}</span></p>
            <a class="btn btn-outline-dark" href="details.html?id=${athlete.id}">Profil</a>`;

                    //Afficher si l'utilisateur connecté a les permissions ADMIN
                    if (sessionStorage.getItem("user") === "ROLE_ADMIN") {
                        row.innerHTML +=
                            `
                    <a href="modifier.html?id=${athlete.id}">Modifier</a>
                    <form class="form_suppression" method="POST" data-id="${athlete.id}">
                        <button type="submit">Supprimer</button>
                    </form></div>`
                    }
                    container.append(row);
                });
            },
            1500);
        // Attacher les écouteurs aux formulaires créés dynamiquement
        if (sessionStorage.getItem("user") === "ROLE_ADMIN") {
            document.querySelectorAll(".form_suppression").forEach(form => {
                form.addEventListener("submit", supprimerAthlete);
            });

            document.getElementById("link_ajouter_athlete").classList.remove("d-none");
        }

    } catch (error) {
        console.log("Erreur lors du chargement des athlètes:", error);
    }
}

async function supprimerAthlete(event) {
    event.preventDefault();
    //Récupérer le id de l'athlète à supprimer
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
        chargerAthletes();
    } catch (error) {
        console.log("Erreur lors de la suppression")
    }
}

//Charger les données losrque c'est prêt
document.addEventListener("DOMContentLoaded", chargerAthletes);