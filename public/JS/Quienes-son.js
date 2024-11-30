function toggleDetail(detailId, button) {
    const detailText = document.getElementById(detailId);
    if (detailText.style.display === "none" || detailText.style.display === "") {
        detailText.style.display = "inline"; // Mostrar texto adicional
        button.textContent = "Ver menos"; // Cambiar texto del botón
    } else {
        detailText.style.display = "none"; // Ocultar texto adicional
        button.textContent = "Ver más"; // Cambiar texto del botón
    }
}
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
