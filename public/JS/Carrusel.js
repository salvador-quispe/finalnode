const carousel = document.querySelector('#aquatic-carousel .carousel');
const slides = document.querySelectorAll('#aquatic-carousel .slide');
const dots = document.querySelectorAll('#aquatic-carousel .dot');

let currentIndex = 0;

// Función para mostrar la diapositiva actual
function showSlide(index) {
  if (index < 0) {
    currentIndex = slides.length - 1;
  } else if (index >= slides.length) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  // Mover el carrusel
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Actualizar los puntos
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

// Evento para los puntos
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showSlide(index));
});

// Evento para mover el carrusel con la rueda del mouse
document.addEventListener('wheel', (e) => {
  if (e.deltaY > 0) {
    // Desplazamiento hacia abajo
    showSlide(currentIndex + 1);
  } else {
    // Desplazamiento hacia arriba
    showSlide(currentIndex - 1);
  }
});

// Mostrar la primera diapositiva
showSlide(currentIndex);
