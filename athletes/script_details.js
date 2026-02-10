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
console.log(calculateAge('1990-05-15')); // Output: Age as an integer

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
        var age = calculateAge(athlete.date_naissance);

        //Message pour afficher si l'athlète est actif
        var actif = "";
        if(athlete.actif){
            actif = "Actif";
        }
        else{
            actif = "Retraité";
        }

        //Afficher les informations dans la pages
        const container = document.getElementById('information');
        container.innerHTML = `
            <div class="bg-secondary w-50 text-white p-1 border rounded-1">
                <h1>${athlete.prenom} "${athlete.alias}" ${athlete.nom} <span class="badge text-bg-dark">${actif}</span></h1>
                <p class="fw-semibold">${athlete.victoires} - ${athlete.defaites} (Victoires - Défaites)</p>
                <p>Pays: ${athlete.origine}</p>
                <p>Poids: ${athlete.poids} kg</p>
                <p>Taille: ${athlete.taille} cm</p>
                <p>Sexe: ${athlete.sexe}</p>
                <p>Âge: ${age} ans (${athlete.date_naissance})</p>
                <p>Style: ${athlete.style_combat}</p>
            </div>
                <h2>Stats</h2>
                        <div class="w-25 border rounded-3 p-2 bg-black">
                            <canvas id="chart_athlete"></canvas>
                        </div>`;

                    //Faire afficher un diagramme des données de l'athlète
                    const ctx = document.getElementById("chart_athlete");

                    new Chart(ctx, {
                        type:'radar',
                        data:{
                            labels:[`Force (${athlete.pts_force})`,
                                `Endurance (${athlete.pts_endurance})`,
                                `Vitesse (${athlete.pts_vitesse})`,
                                `Agilité (${athlete.pts_agilete})`,
                                `Résilience (${athlete.pts_resilience})`],
                            datasets:[{
                                label:`${athlete.prenom} ${athlete.nom}`,
                                data:[
                                    athlete.pts_force,
                                    athlete.pts_endurance,
                                    athlete.pts_vitesse,
                                    athlete.pts_agilete,
                                    athlete.pts_resilience,
                                ],
                                fill:true,
                                backgroundColor:'rgba(153,0,237,0.75)',
                                borderColor:'rgba(153,0,237,1)',
                            }]
                        },
                        options: {
                            plugins: {
                                legend: {
                                    labels: {
                                        color:"white",
                                        font:{
                                            size: 17,
                                            weight:'bold'
                                        }
                                    }
                                }
                            },
                            elements:{
                                line:{
                                    borderWidth:1
                                }
                            },
                            scales:{
                                r:{
                                    angleLines:{
                                        color:'white'
                                    },
                                    grid:{
                                        color:'white',
                                    },
                                    suggestedMin:0,
                                    suggestedMax:10,
                                    pointLabels:{
                                        display:'true',
                                        centerPointLabels:'true',
                                        color:'white',
                                        font:{
                                            size:15
                                        }
                                    },
                                }
                            }
                        }
                    })
        ;
    }
    catch(error){
        console.log('Erreur lors du chargement des informations de l\'athlètes: ',error)
    }
}
//Charger les données losrque c'est prêt
document.addEventListener("DOMContentLoaded", async () => {
    await getInfoAthlete();
});