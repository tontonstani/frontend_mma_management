document.addEventListener("DOMContentLoaded",()=>{
    const user = sessionStorage.getItem("user");
    const auth_section = document.getElementById("case_auth_intro");
    auth_section.innerHTML = `<p>Bonjour <strong>${user}</strong></p>`;
});