//Lien de l'api
const API_URL = "http://localhost:8080/api";

async function creerMatch(event) {
    event.preventDefault();
    //Chercher les informations du formulaire
    const adversaire1_id = parseInt(document.getElementById("adversaire1").value);
    const adversaire2_id = parseInt(document.getElementById("adversaire2").value);
    const gagnant_id = parseInt(document.getElementById("gagnant").value);
    const dateTime = document.getElementById("dateTime").value;
    const stadium = document.getElementById("stadium").value;

    //Créer l'objet Match
    const nouv_Match = {adversaire1_id, adversaire2_id, gagnant_id, dateTime, stadium};

    //Faire une requête POST pour envoyer l'objet
    try {
        const response = await fetch(`${API_URL}/match/ajouter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nouv_Match)
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        console.log("Succès");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Erreur lors de la création du match");
    }
}

//Chercher tous les athlètes
async function tousAthlete() {
    try {
        const response = await fetch(`${API_URL}/athlete/listeDTO`)
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const athletes = await response.json();

        //Liste pour le champ adversaire 1
        const container_adversaire1 = document.getElementById('adversaire1');
        container_adversaire1.innerHTML = "";
        athletes.forEach(athlete => {
            const option = document.createElement("option");
            option.value = athlete.id;
            option.innerText = `${athlete.prenom} ${athlete.nom}`;
            container_adversaire1.appendChild(option);
        });

        //Liste pour le champ adversaire 2
        const container_adversaire2 = document.getElementById('adversaire2');
        container_adversaire2.innerHTML = "";
        athletes.forEach(athlete => {
            const option = document.createElement("option");
            option.value = athlete.id;
            option.innerText = `${athlete.prenom} ${athlete.nom}`;
            container_adversaire2.appendChild(option);
        });

        //Liste pour le champ gagnant
        const container_gagnant = document.getElementById('gagnant');
        container_gagnant.innerHTML = "";
        athletes.forEach(athlete => {
            const option = document.createElement("option");
            option.value = athlete.id;
            option.innerText = `${athlete.prenom} ${athlete.nom}`;
            container_gagnant.appendChild(option);
        });
    } catch (error) {
        console.log("Erreur lors du chargement des athlètes:", error);
    }
}
document.addEventListener("DOMContentLoaded", tousAthlete);


document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", creerMatch);
});