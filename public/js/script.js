document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('bg-video');
    const slideshow = document.getElementById('bg-slideshow');
    const slides = document.querySelectorAll('.slide');
    
    let currentSlide = 0;

    // Función para rotar imágenes
    function startSlideshow() {
        video.style.opacity = '0';
        slideshow.style.opacity = '1';
        
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Cambio cada 5 segundos
    }

    // Intentar reproducir video
    video.play().then(() => {
        // Video funciona, ocultamos slideshow
        slideshow.style.opacity = '0';
    }).catch((error) => {
        // Falló el video (ahorro de datos, error de carga, etc), iniciamos fotos
        console.log("Video failed, switching to slideshow.");
        startSlideshow();
    });
});