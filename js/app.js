document.addEventListener("DOMContentLoaded", () => {
        
    // navegacion
    let navOpen = document.getElementById('navOpen');
    let navClose = document.getElementById('navClose');
    let navMenu = document.getElementById('navMenu');

    navOpen.addEventListener('click', ()=> navMenu.classList.add('active'));
    navClose.addEventListener('click', ()=> navMenu.classList.remove("active"));




});

