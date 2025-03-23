document.addEventListener("DOMContentLoaded", () => {       //animacion al cargar
    setTimeout(() => {  
        document.body.classList.add("aparecer");
    }, 50);
});

function redirigir(url) {                                   //navegacion entre paginas
    window.location.href = url;
}