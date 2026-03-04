//Lien de l'API
const API_URL = "http://localhost:8080/api";

//Fonction pour appeler les résultats des classements des athlètes
async function getClassement() {
    try {
        const response = await fetch(`${API_URL}/athlete/classement`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        // Récupérer la liste de données de l'API
        const classements = await response.json();
        const lst = [1, 2, 3];

        //Afficher les classements
        const tbody = document.getElementById("body");
        tbody.innerHTML = "";

        //Simuler un chargement de données avec des placeholder
        lst.forEach(athlete => {
            const tr = document.createElement("tr");
            tr.innerHTML =
                `
             <td class="placeholder-glow">
                <span class="placeholder col-1"
             </td>
             <td class="placeholder-glow">
                <span class="placeholder col-2"
             </td>
             <td class="placeholder-glow">
                <span class="placeholder col-1"
             </td>
             <td class="placeholder-glow">
                <span class="placeholder col-1"
             </td>
            `;
            tbody.appendChild(tr);
        });

        //Faire afficher les données après 1.5 secondes
        setTimeout(() => {
            tbody.innerHTML = "";
            classements.forEach(athlete => {
                const tr = document.createElement("tr");
                tr.innerHTML =
                    `
             <td><strong>${athlete.prenom} ${athlete.nom}</strong></td>
             <td><strong class="text-success">${athlete.victoires}</strong></td>
             <td><strong class="text-danger">${athlete.defaites}</strong></td>
             <td><strong>${athlete.differences}</strong></td>
            `;
                tbody.appendChild(tr);
            });
        }, 1500);

    } catch (error) {
        console.error("Erreur lors du chargement des classemenrs d'athlètes: ", error);
    }
}

//Charger les données
document.addEventListener("DOMContentLoaded", getClassement);