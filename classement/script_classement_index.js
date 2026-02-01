//Lien de l'API
const API_URL = "http://localhost:8080/api";

//Fonction pour appeler les résultats des classements des athlètes
async function getClassement(){
    try{
        const response = await fetch(`${API_URL}/athlete/classement`);
        if(!response.ok){
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const classements = await response.json();

        //Afficher les classements
        const tbody = document.getElementById("body");
        tbody.innerHTML = "";
        classements.forEach(athlete => {
            const tr = document.createElement("tr");
            tr.innerHTML=
            `
             <td>${athlete.prenom} ${athlete.nom}</td>
             <td>${athlete.victoires}</td>
             <td>${athlete.defaites}</td>
             <td>${athlete.differences}</td>
            `;
            tbody.appendChild(tr);
        });
    }
    catch(error){
        console.error("Erreur lors du chargement des classemenrs d'athlètes: ",error);
    }
}

//Charger les données
document.addEventListener("DOMContentLoaded", getClassement);