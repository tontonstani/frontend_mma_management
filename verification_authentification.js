async function deconnexion(event){
    event.preventDefault();

    //Enlever les token, username et le rôle enregistrés dans le sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("user");

}
document.addEventListener("DOMContentLoaded",()=>{
    if(sessionStorage.getItem("user")!= null){
        const user = sessionStorage.getItem("user");
        const auth_section = document.getElementById("case_auth_intro");
        auth_section.innerHTML = `<p>Bonjour <strong>${user}</strong></p>`;
    }

    const form = document.querySelector("form");
    form.addEventListener("submit", deconnexion);
});