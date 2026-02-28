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
        const lst = [1, 2, 3];

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
                row.classList.add("col","border", "border-1", "rounded", "text-center", "p-1");
                row.innerHTML = `
                    <h2>${match.adversaire1} VS ${match.adversaire2}</h2>
                    <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#details_match" data-id="${match.id}">
                        Détails du match
                    </button>`
                    if (sessionStorage.getItem('user') === "ROLE_ADMIN") {
                        row.innerHTML +=
                            `<a href="modifier.html?id=${match.id}">Modifier</a>
                            <form class="form_suppression" method="POST" data-id="${match.id}">
                                <button type="submit" class="btn btn-danger">Supprimer</button>
                            </form>`
                }
                container.appendChild(row);
            });
        }, 1500)
        // Attacher les écouteurs aux formulaires créés dynamiquement
        if (sessionStorage.getItem('user') === "ROLE_ADMIN") {
            document.querySelectorAll(".form_suppression").forEach(form => {
                form.addEventListener("submit", supprimerMatch);
            });

            document.getElementById("link_match_ajouter").classList.remove("d-none");
        }
    } catch (error) {
        console.error(error);
    }
}

//Fonction pour aller chercher les données du match
async function details_match(){
    //Récupérer le ID
    const id = event.currentTarget.getAttribute("data-id");

    try{
        const response = await fetch(`${URL_API}/${id}`);
        if(!response.ok){
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const match = await response.json();

        //Afficher les informations du matches
        const athlete_1 = document.getElementById("athlete_1");
        const athlete_2 = document.getElementById("athlete_2");
        const date_heure = document.getElementById("date_heure");
        const stade = document.getElementById("stade");

        athlete_1.innerHTML = `Athlète #1: <br> ${match.adversaire1}`;
        athlete_2.innerHTML = `Athlète #2: <br> ${match.adversaire2}`;
        date_heure.innerHTML = `Date: ${match.datetime}`;
        stade.innerHTML = `Stade: ${match.stadium}`

    }
    catch(error){
        console.log('Erreur lors du chargement des informations du match: ',error)
    }
}

//Charger les données lorsque c'est prêt
document.addEventListener("DOMContentLoaded", chargerMatches, details_match);

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