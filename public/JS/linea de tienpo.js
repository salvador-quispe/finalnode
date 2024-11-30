// linea de tiempo

document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const revealItem = (item) => {
        item.classList.add('reveal');
    };

    const checkItems = () => {
        timelineItems.forEach((item) => {
            if (isElementInViewport(item)) {
                revealItem(item);
            }
        });
    };

    // Revelar elementos visibles al cargar la página
    checkItems();

    // Revelar elementos al hacer scroll
    window.addEventListener('scroll', checkItems);
});


