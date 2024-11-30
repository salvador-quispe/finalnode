// Mostrar el botón cuando el usuario se desplaza hacia abajo 100px
window.onscroll = function() { showButtonOnScroll() };

function showButtonOnScroll() {
    const button = document.getElementById("backToTopBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
}

// Función para desplazarse suavemente hacia arriba
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
