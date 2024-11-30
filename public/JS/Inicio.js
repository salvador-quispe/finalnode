document.addEventListener('DOMContentLoaded', function () {
    const iconGrid = document.getElementById('iconGrid');
    const showMoreBtn = document.getElementById('showMoreBtnCustom');
    const showLessBtn = document.getElementById('showLessBtnCustom');

    // Iconos con enlaces
    const icons = [
        { src: '/public/IMG/E_SDG_Icons_NoText-01.jpg', text: 'Fin de la pobreza', link: 'https://sostenibilidad.cientifica.edu.pe/ods-1-fin-de-la-pobreza/' },
        { src: '/public/IMG/E_SDG_Icons_NoText-02.jpg', text: 'Hambre cero', link: 'https://sostenibilidad.cientifica.edu.pe/ods-2-hambre-cero/' },
        { src: '/public/IMG/E_SDG_Icons_NoText-03_0.jpg', text: 'Salud y bienestar', link: 'https://sostenibilidad.cientifica.edu.pe/ods-3-salud-y-bienestar/' },
        { src: '/public/IMG/E_SDG_Icons_NoText-04.jpg', text: 'Educación de calidad', link: 'https://sostenibilidad.cientifica.edu.pe/ods-4-educacion-de-calidad/' },
        { src: '/public/IMG/E_SDG_Icons_NoText-05.jpg', text: 'Igualdad de género', link: 'https://sostenibilidad.cientifica.edu.pe/ods-5-igualdad-de-genero/' },
        { src: '/public/IMG/E_SDG_Icons_NoText-06.jpg', text: 'Agua limpia y saneamiento', link: 'https://sostenibilidad.cientifica.edu.pe/ods-6-agua-limpia-y-saneamiento/' },
        { src: '/public/IMG/E_SDG_Icons_NoText-07.jpg', text: 'Energía asequible y no contaminante', link: 'https://sostenibilidad.cientifica.edu.pe/ods-7-energia-asequible-y-no-contaminante/' },
        { src: '/public/IMG/E_SDG_Icons_NoText-08.jpg', text: 'Trabajo decente y crecimiento económico', link: 'https://sostenibilidad.cientifica.edu.pe/ods-8-trabajo-decente-y-crecimiento-economico/' },
        { src: '/public/IMG/E_SDG_Icons_NoText-09.jpg', text: 'Industria, innovación e infraestructura', link: 'https://sostenibilidad.cientifica.edu.pe/ods-9-industria-innovacion-e-infraestructura/' },
        { src: '/public/IMG/E_SDG_Icons_NoText-10.jpg', text: 'Reducción de las desigualdades', link: 'https://sostenibilidad.cientifica.edu.pe/ods-10-reduccion-de-las-desigualdades/' },
        { src: '/public/IMG/E_SDG_Icons_NoText-11.jpg', text: 'Ciudades y comunidades sostenibles', link: 'https://sostenibilidad.cientifica.edu.pe/ods-11-ciudades-y-comunidades-sostenibles/' },
        { src: '/public/IMG/E_SDG_Icons_NoText-12.jpg', text: 'Producción y consumo responsables', link: 'https://sostenibilidad.cientifica.edu.pe/ods-12-produccion-y-consumo-responsable/' },
        { src: '/public/IMG/E_SDG_Icons_NoText-13.jpg', text: 'Acción por el clima', link: 'https://sostenibilidad.cientifica.edu.pe/ods-13-accion-por-el-clima/' },
        { src: '/public/IMG/E_SDG_Icons_NoText-14.jpg', text: 'Vida submarina', link: 'https://sostenibilidad.cientifica.edu.pe/ods-14-vida-submarina/' },
        { src: '/public/IMG/E_SDG_Icons_NoText-15.jpg', text: 'Vida de ecosistemas terrestres', link: 'https://sostenibilidad.cientifica.edu.pe/ods-15-vida-de-ecosistemas-terrestres/' },
        { src: '/public/IMG/E_SDG_Icons_NoText-16.jpg', text: 'Paz, justicia e instituciones sólidas', link: 'https://sostenibilidad.cientifica.edu.pe/ods-16-paz-justicia-e-instituciones-solidas/' },
        { src: '/public/IMG/E_SDG_Icons_NoText-17.jpg', text: 'Alianzas para lograr los objetivos', link: 'https://sostenibilidad.cientifica.edu.pe/ods-17-alianzas-para-lograr-los-objetivos/' }
    ];

    function renderIcons(visibleIcons) {
        iconGrid.innerHTML = '';
        visibleIcons.forEach(icon => {
            const iconDiv = document.createElement('div');
            iconDiv.classList.add('icon-item');

            const img = document.createElement('img');
            img.src = icon.src;
            img.alt = icon.text;

            const caption = document.createElement('p');
            caption.textContent = icon.text;

            iconDiv.appendChild(img);
            iconDiv.appendChild(caption);

            // Redirección al hacer clic
            iconDiv.addEventListener('click', () => {
                window.location.href = icon.link;
            });

            iconGrid.appendChild(iconDiv);
        });
    }

    let iconsToShow = 6; // Número de iconos visibles inicialmente

    renderIcons(icons.slice(0, iconsToShow));

    showMoreBtn.addEventListener('click', () => {
        iconsToShow = icons.length;
        renderIcons(icons);
        showMoreBtn.style.display = 'none';
        showLessBtn.style.display = 'inline-block';
    });

    showLessBtn.addEventListener('click', () => {
        iconsToShow = 6;
        renderIcons(icons.slice(0, iconsToShow));
        showMoreBtn.style.display = 'inline-block';
        showLessBtn.style.display = 'none';
    });
});


let visibleIcons = [];
let hiddenIcons = [...icons];
let iconsPerPage = window.innerWidth <= 768 ? 4 : icons.length;

function createIconElement(src, text) {
    const div = document.createElement('div');
    div.className = 'icon';

    // Front face (image)
    const front = document.createElement('div');
    front.className = 'front';
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'SDG Icon';
    front.appendChild(img);

    // Back face (text)
    const back = document.createElement('div');
    back.className = 'back';
    back.innerText = text;

    // Append the faces to the icon
    div.appendChild(front);
    div.appendChild(back);
    return div;
}

function showIcons(count) {
    for (let i = 0; i < count && hiddenIcons.length > 0; i++) {
        const { src, text } = hiddenIcons.shift();
        visibleIcons.push({ src, text });
        iconGrid.appendChild(createIconElement(src, text));
    }
    updateButtonVisibility();
}

function hideIcons(count) {
    for (let i = 0; i < count && visibleIcons.length > iconsPerPage; i++) {
        visibleIcons.pop();
        iconGrid.removeChild(iconGrid.lastChild);
    }
    updateButtonVisibility();
}

function updateButtonVisibility() {
    showMoreBtn.style.display = hiddenIcons.length > 0 ? 'inline-block' : 'none';
    showLessBtn.classList.toggle('d-none', visibleIcons.length <= iconsPerPage);
}

function adjustIconDisplay() {
    const newIconsPerPage = window.innerWidth <= 768 ? 4 : icons.length;
    if (newIconsPerPage !== iconsPerPage) {
        hiddenIcons = [...icons];
        visibleIcons = [];
        iconGrid.innerHTML = '';
        showIcons(newIconsPerPage);
        iconsPerPage = newIconsPerPage;
    }
}

showMoreBtn.addEventListener('click', function () {
    showIcons(iconsPerPage);
});

showLessBtn.addEventListener('click', function () {
    hideIcons(visibleIcons.length - iconsPerPage);
});

// Initial display
showIcons(iconsPerPage);

// Adjust display on window resize
window.addEventListener('resize', adjustIconDisplay);
;



//Navbar
document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            const menu = dropdown.querySelector('.dropdown-menu');
            menu.classList.add('show');
        });

        dropdown.addEventListener('mouseleave', () => {
            const menu = dropdown.querySelector('.dropdown-menu');
            menu.classList.remove('show');
        });
    });
});




// Mostrar el botón cuando el usuario se desplaza hacia abajo 100px
window.onscroll = function () { showButtonOnScroll() };

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
window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading-screen");
    const content = document.getElementById("content");

    setTimeout(() => {
        loadingScreen.style.display = "none"; // Oculta la pantalla de carga
        content.style.display = "block"; // Muestra el contenido de la página
    }, 2000); // 3000 ms de retraso para coincidir con el tiempo de la animación
});

// Función para obtener los eventos desde la base de datos
async function getEventos() {
    try {
        const response = await fetch('/api/eventos'); // Nueva ruta
        if (!response.ok) throw new Error('Error al obtener los eventos');

        const { hoy } = await response.json();

        // Seleccionar elementos del DOM
        const eventoHoy = document.getElementById('eventoHoyMensaje');
        const eventoHoySection = document.getElementById('eventoHoy');

        if (hoy.length > 0) {
            // Mostrar el evento de hoy con animación
            const evento = hoy[0]; // Tomar el primer evento de hoy
            eventoHoy.innerHTML = `
                🎉 ¡Hoy celebramos: <strong>${evento.nombre_evento}</strong>! 🎉 
                Relacionado con: ${evento.ods_relacionado}`;

            eventoHoySection.style.display = 'block'; // Mostrar sección de hoy

            // Agregar clase para animación
            eventoHoySection.classList.add('celebracion');
        } else {
            // Mostrar mensaje si no hay eventos para celebrar hoy
            eventoHoy.innerText = 'Por el momento no hay fechas para celebrar.';
            eventoHoySection.style.display = 'block';
        }
    } catch (error) {
        console.error('Error al obtener los eventos:', error);
        document.getElementById('eventoHoyMensaje').innerText = 'Error al cargar los eventos.';
        document.getElementById('eventoHoy').style.display = 'block';
    }
}

// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', function () {
    getEventos(); // Obtener los eventos
});


