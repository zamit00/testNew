// אנימציה כאשר הגולל מגיע לחלקים שונים של האתר
window.addEventListener('scroll', function() {
    const services = document.querySelectorAll('.service');
    const testimonials = document.querySelectorAll('.testimonial');
    
    services.forEach(service => {
        if (isInViewport(service)) {
            service.classList.add('visible');
        } else {
            service.classList.remove('visible');
        }
    });

    testimonials.forEach(testimonial => {
        if (isInViewport(testimonial)) {
            testimonial.classList.add('visible');
        } else {
            testimonial.classList.remove('visible');
        }
    });
});

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}
