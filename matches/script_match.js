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
<div class="card shadow-sm border-0 rounded-4 p-3">
    <div class="card-body">

        <h5 class="card-title text-center placeholder-glow">
            <span class="placeholder col-8"></span>
        </h5>

        <p class="text-center placeholder-glow">
            <span class="placeholder col-4"></span>
        </p>

        <div class="text-center">
            <span class="btn btn-secondary disabled placeholder col-6"></span>
        </div>

    </div>
</div>
`;
            container.append(row);
        })

        setTimeout(() => {
            container.innerHTML = "";
            matches.forEach(match => {
                const row = document.createElement("div");
                row.classList.add("col");

                row.innerHTML = `
<div class="card shadow-sm border-0 rounded-4 h-100">

    <div class="card-body text-center">

        <h5 class="fw-bold mb-3">
            ${match.adversaire1}
            <span class="text-danger mx-2">VS</span>
            ${match.adversaire2}
        </h5>

        <button type="button"
            class="btn btn-outline-dark btn-sm mb-2"
            data-bs-toggle="modal"
            data-bs-target="#details_match"
            data-id="${match.id}">
            Voir les détails
        </button>

        <div class="admin-actions mt-2"></div>

    </div>

</div>
`;
                if (sessionStorage.getItem('user') === "ROLE_ADMIN") {

                    const actions = row.querySelector(".admin-actions");

                    actions.innerHTML = `
        <a href="modifier.html?id=${match.id}"
           class="btn btn-warning btn-sm me-2">
           Modifier
        </a>

        <form class="form_suppression d-inline" data-id="${match.id}">
            <button type="submit" class="btn btn-danger btn-sm">
                Supprimer
            </button>
        </form>
    `;
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

//Récupérer et afficher les données du match dans le modal
document.addEventListener("DOMContentLoaded", () => {
    chargerMatches();

    const modal = document.getElementById("details_match");

    modal.addEventListener("show.bs.modal", async function (event) {

        const button = event.relatedTarget; // bouton cliqué
        const id = button.getAttribute("data-id");

        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const match = await response.json();

            if(match.adversaire1 === match.gagnant) {
                document.getElementById("athlete_1").innerHTML = `
                                                                            Athlète #1: <br>
                                                                            ${match.adversaire1}
                                                                            <br> <span class="badge text-bg-primary">Gagnant</span>`;
            }
            else{
                document.getElementById("athlete_1").innerHTML = `Athlète #1: <br> ${match.adversaire1}`;
            }


            if(match.adversaire2 === match.gagnant) {
                document.getElementById("athlete_2").innerHTML = `
                                                                            Athlète #2: <br>
                                                                            ${match.adversaire2}
                                                                            <br> <span class="badge text-bg-primary">Gagnant</span>`;
            }
            else{
                document.getElementById("athlete_2").innerHTML = `Athlète #2: <br> ${match.adversaire2}`;
            }

            document.getElementById("date_heure").innerHTML =
                `Date: ${match.datetime}`;

            document.getElementById("stade").innerHTML =
                `Stade: ${match.stadium}`;

        } catch (error) {
            console.log("Erreur chargement détails :", error);
        }
    });
});

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