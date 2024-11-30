(function () {
    let activeCard = null;

    function showCard(card) {
        if (card.classList.contains('active')) return;

        if (activeCard) {
            activeCard.classList.remove('active');
            const back = activeCard.querySelector('.back');
            back.style.transform = 'rotateY(180deg)';
        }

        card.classList.add('active');
        const back = card.querySelector('.back');
        back.style.transform = 'rotateY(0deg)';

        activeCard = card;

        setTimeout(() => {
            card.classList.remove('active');
            const back = card.querySelector('.back');
            back.style.transform = 'rotateY(180deg)';
        }, 5000);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('carousel-container');
        if (!container) return;

        const cards = container.querySelectorAll('.card');
        cards.forEach((card) => {
            card.addEventListener('click', () => showCard(card));
        });
    });
})();
