//Lien de l'API
const API_URL = "http://localhost:8080/api";

//Charger les informations du match à modifier
async function getMatch(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    //Faire une requête GET pour chercher le match selon son ID
    try{
        const response = await fetch(`${API_URL}/match/modifier/${id}`);
        if(!response.ok){
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const match = await response.json();

        //Ajouter les informations dans les balises du formulaire
        document.getElementById("titre").innerText = `Modifier #${match.id}`;
        document.getElementById("adversaire1").value = match.adversaire1_id.toString();
        document.getElementById("adversaire2").value = match.adversaire2_id.toString();
        document.getElementById("gagnant").value = match.gagnant_id.toString();
        document.getElementById("id").value = match.id;
        document.getElementById("dateTime").value = match.dateTime;
        document.getElementById("stadium").value = match.stadium;
    }
    catch(error){
        console.log('Erreur lors du chargement des informations du match: ',error);
    }
}


//Fonction pour modifier un match
async function modifierMatch(event){
    event.preventDefault();

    //Récupérer les données dans le formulaire
    const id = document.getElementById("id").value;
    const adversaire1_id = parseInt(document.getElementById("adversaire1").value);
    const adversaire2_id = parseInt(document.getElementById("adversaire2").value);
    const gagnant_id = parseInt(document.getElementById("gagnant").value);
    const dateTime = document.getElementById("dateTime").value;
    const stadium = document.getElementById("stadium").value;

    //Créer l'objet MAtch
    const Match = {id, adversaire1_id,adversaire2_id,gagnant_id, dateTime, stadium};

    //Faire la requête POST pour envoyer l'objet
    try{
        const response = await fetch(`${API_URL}/match/modifier`, {
            method:'POST',
            headers:{"content-type":"application/json"},
            body:JSON.stringify(Match),
        });
        if(!response.ok){
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        console.log("Succèes");
        window.location.href="index.html";
    }
    catch(error){
        console.log("Erreur lors de la modification du match: ",error);
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

//Charger les données losrque c'est prêt
document.addEventListener("DOMContentLoaded", async () => {
    await tousAthlete();
    await getMatch();
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", modifierMatch);
});