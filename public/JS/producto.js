// JavaScript para el botón de Volver al Inicio
document.addEventListener('DOMContentLoaded', function () {
    const backToTopBtn = document.getElementById('backToTopBtn');

    // Muestra el botón cuando se hace scroll hacia abajo
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Vuelve al inicio al hacer clic en el botón
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
// Configurar carrusel para funcionar en pantallas pequeñas
const carouselElement = document.getElementById('carouselExample');

// Inicializar el carrusel con cambio automático cada 3 segundos
const bootstrapCarousel = new bootstrap.Carousel(carouselElement, {
    interval: 3000, // Cambiar cada 3 segundos
    ride: 'carousel'
});
