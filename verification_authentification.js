async function deconnexion(event){
    event.preventDefault();

    //Enlever les token, username et le rôle enregistrés dans le sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("user");

}
document.addEventListener("DOMContentLoaded",()=>{
    if(sessionStorage.getItem("user")!= null){
        //Faire disparaître la case de connexion et créer un compte
        document.getElementById("case_auth_intro").classList.add("d-none");

        document.getElementById("case_connecte").classList.remove("d-none");


        const user = sessionStorage.getItem("user");

        //Faire afficher le message de bienvenue
        const message = document.getElementById("message_connexion");
        message.innerHTML = "Bonjour <strong>"+user+"</strong>";
    }
    else{
        document.getElementById("case_connecte").classList.add("d-none");
    }

    const form = document.querySelector("form");
    form.addEventListener("submit", deconnexion);
});