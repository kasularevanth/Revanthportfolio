document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const targetSection = document.querySelector(link.getAttribute('href'));
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.textContent = '⬆';
    scrollToTopBtn.id = 'go-top';
    scrollToTopBtn.style.display = 'none';
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '20px';
    scrollToTopBtn.style.right = '20px';
    scrollToTopBtn.style.padding = '10px';
    scrollToTopBtn.style.background = '#ff0057';
    scrollToTopBtn.style.color = '#fff';
    scrollToTopBtn.style.border = 'none';
    scrollToTopBtn.style.borderRadius = '50%';
    scrollToTopBtn.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.5)';
    scrollToTopBtn.style.cursor = 'pointer';
    scrollToTopBtn.style.zIndex = '1000';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
