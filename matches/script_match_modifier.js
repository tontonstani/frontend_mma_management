//Lien de l'API
const API_URL = "http://localhost:8080/api/match";

//Charger les informations du match à modifier
async function getMatch(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    //Faire une requête GET pour chercher le match selon son ID
    try{
        const response = await fetch(`${API_URL}/${id}`);
        if(!response.ok){
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const match = await response.json();

        //Ajouter les informations dans les balises du formulaire
        document.getElementById("titre").innerText = `Modifier #${match.id}`;
        document.getElementById("id").value = match.id;
        document.getElementById("date_evenement").value = match.date_evenement;
        document.getElementById("lieu").value = match.lieu;
    }
    catch(error){
        console.log('Erreur lors du chargement des informations du match: ',error);
    }
}

//Charger les données losrque c'est prêt
document.addEventListener("DOMContentLoaded", async () => {
    await getMatch();
});

//Fonction pour modifier un match
async function modifierMatch(event){
    event.preventDefault();

    //Récupérer les données dans le formulaire
    const id = document.getElementById("id").value;
    const date_evenement = document.getElementById("date_evenement").value;
    const lieu = document.getElementById("lieu").value;

    //Créer l'objet MAtch
    const Match = {id, date_evenement, lieu};

    //Faire la requête POST pour envoyer l'objet
    try{
        const response = await fetch(`${API_URL}/modifier`, {
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

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", modifierMatch);
});