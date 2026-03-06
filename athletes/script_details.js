//Lien de l'API
const API_URL = "http://localhost:8080/api/athlete";

function calculateAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    // Adjust age if the current date is before the birthday this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

async function getInfoAthlete() {
    //Récupérer le ID
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    //Faire la requête GET pour récupérer les informations de l'athlète
    try {
        const response = await fetch(`${API_URL}/DTO/${id}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const athlete = await response.json();
        var age = calculateAge(athlete.date_naissance);

        //Message pour afficher si l'athlète est actif
        var actif = "";
        if (athlete.actif) {
            actif = "Actif";
        } else {
            actif = "Retraité";
        }

        //Liste des matches
        const row = document.createElement("ul");
        row.classList.add("list-group", "list-group-flush");

        athlete.lst_matches.forEach(match => {

            const element = document.createElement("li");

            element.classList.add(
                "list-group-item",
                "d-flex",
                "justify-content-between",
                "align-items-center"
            );

            element.innerHTML = `
        <span>${match}</span>
        <span class="badge bg-dark">Match</span>
    `;

            row.appendChild(element);

        });
        //Afficher les informations dans la pages
        const container = document.getElementById('information');
        container.innerHTML = `
<div class="container mt-5">

    <div class="row g-4 justify-content-center">

        <!-- Carte profil -->
        <div class="col-lg-4">
            <div class="card shadow-lg border-0 h-100">

                <div class="card-header bg-dark text-white text-center">
                    <h3 class="mb-0">
                        ${athlete.prenom} "${athlete.alias}" ${athlete.nom}
                    </h3>
                    <span class="badge bg-${athlete.actif ? "success" : "secondary"} mt-2">
                        ${actif}
                    </span>
                </div>

                <div class="card-body text-center">

                    <img src="../logo/LOGO_MMA.png"
                         class="rounded-circle mb-3 shadow"
                         width="120">

                    <h4 class="fw-bold">
                        ${athlete.victoires} - ${athlete.defaites}
                    </h4>

                    <p class="text-muted mb-3">
                        Record (Victoires - Défaites)
                    </p>

                    <div class="row text-start">

                        <div class="col-6">
                            <p><strong>Pays</strong><br>${athlete.origine}</p>
                        </div>

                        <div class="col-6">
                            <p><strong>Style</strong><br>${athlete.style_combat}</p>
                        </div>

                        <div class="col-6">
                            <p><strong>Poids</strong><br>${athlete.poids} kg</p>
                        </div>

                        <div class="col-6">
                            <p><strong>Taille</strong><br>${athlete.taille} cm</p>
                        </div>

                        <div class="col-6">
                            <p><strong>Sexe</strong><br>${athlete.sexe}</p>
                        </div>

                        <div class="col-6">
                            <p><strong>Âge</strong><br>${age} ans</p>
                        </div>

                    </div>

                </div>
            </div>
        </div>


        <!-- Radar Chart -->
        <div class="col-lg-6">
            <div class="card shadow-lg border-0 h-100">

                <div class="card-header bg-dark text-white text-center">
                    <h4 class="mb-0">Statistiques de combat</h4>
                </div>

                <div class="card-body bg-black">
                    <canvas id="chart_athlete"></canvas>
                </div>

            </div>
        </div>


        <!-- Liste des matchs -->
        <div class="col-lg-10">

            <div class="card shadow border-0">

                <div class="card-header bg-dark text-white text-center">
                    <h4 class="mb-0">Historique des matchs</h4>
                </div>

                <div class="card-body">

                    <div id="matchList"></div>

                </div>

            </div>

        </div>

    </div>

</div>
`;
        document.getElementById("matchList").appendChild(row);

        //Faire afficher un diagramme des données de l'athlète
        const ctx = document.getElementById("chart_athlete");

        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [`Force (${athlete.pts_force})`,
                    `Endurance (${athlete.pts_endurance})`,
                    `Vitesse (${athlete.pts_vitesse})`,
                    `Agilité (${athlete.pts_agilete})`,
                    `Résilience (${athlete.pts_resilience})`],
                datasets: [{
                    label: `${athlete.prenom} ${athlete.nom}`,
                    data: [
                        athlete.pts_force,
                        athlete.pts_endurance,
                        athlete.pts_vitesse,
                        athlete.pts_agilete,
                        athlete.pts_resilience,
                    ],
                    fill: true,
                    backgroundColor: 'rgba(153,0,237,0.75)',
                    borderColor: 'rgba(153,0,237,1)',
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: "white",
                            font: {
                                size: 17,
                                weight: 'bold'
                            }
                        }
                    }
                },
                elements: {
                    line: {
                        borderWidth: 1
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            color: 'white'
                        },
                        grid: {
                            color: 'white',
                        },
                        suggestedMin: 0,
                        suggestedMax: 10,
                        pointLabels: {
                            display: 'true',
                            centerPointLabels: 'true',
                            color: 'white',
                            font: {
                                size: 15
                            }
                        },
                    }
                }
            }
        })
        ;
    } catch (error) {
        console.log('Erreur lors du chargement des informations de l\'athlètes: ', error)
    }
}

//Charger les données losrque c'est prêt
document.addEventListener("DOMContentLoaded", async () => {
    await getInfoAthlete();
});