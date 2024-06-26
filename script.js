const openFormButton = document.getElementById('openForm');
const closeFormButton = document.getElementById('closeForm');
const overlay = document.getElementById('overlay');
const popupForm = document.getElementById('popupForm');

openFormButton.addEventListener('click', function() {
    overlay.style.display = 'block';
    popupForm.style.display = 'block';
});

closeFormButton.addEventListener('click', function() {
    overlay.style.display = 'none';
    popupForm.style.display = 'none';
});


    function scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        const navLinks = document.querySelectorAll('.pill-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1); // Убираем "#" из строки
                scrollToElement(targetId);
            });
        });
    });


    window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollToTopBtn").style.display = "block";
    } else {
        document.getElementById("scrollToTopBtn").style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0; // Для Safari
    document.documentElement.scrollTop = 0; // Для других браузеров
}