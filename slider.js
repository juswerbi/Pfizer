document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const intervalTime = 3500; // 3.5 sekundy
    let slideIndex = 0;
    let slideInterval;

    // Funkcja do zarządzania klasami i animacją
    function showSlide(newIndex) {
        // Określenie, który slajd jest aktualnie wyświetlany (przed zmianą)
        const currentSlide = slides[slideIndex];
        
        // Obliczenie nowego indeksu w zapętleniu
        const nextIndex = (newIndex + slides.length) % slides.length;
        
        // Zresetowanie klas dla wszystkich slajdów
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });
        
        // 1. Oznaczenie poprzedniego slajdu jako 'prev' (aby przesunął się w lewo)
        // Dzieje się to natychmiast, ale animacja trwa 0.7s
        currentSlide.classList.add('prev');
        
        // 2. Oznaczenie nowego slajdu jako 'active' (aby wjechał na ekran z prawej)
        slides[nextIndex].classList.add('active');

        // Zaktualizowanie indeksu dla następnego cyklu
        slideIndex = nextIndex;

        // Aktualizacja nawigacji kropkowej
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        dots[slideIndex].classList.add('active');
    }

    // Funkcja do przełączania do następnego slajdu
    function nextSlide() {
        showSlide(slideIndex + 1);
    }

    // Ustawienie nasłuchu kliknięć na kropki (z zachowaniem funkcjonalności animacji)
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== slideIndex) { // Zmień slajd tylko, jeśli jest inny
                clearInterval(slideInterval); // Zatrzymaj auto-przewijanie
                showSlide(index);
                // Uruchom auto-przewijanie ponownie po ręcznej zmianie
                slideInterval = setInterval(nextSlide, intervalTime);
            }
        });
    });

    // Uruchomienie automatycznego przełączania slajdów
    slideInterval = setInterval(nextSlide, intervalTime);

    // Pokaż pierwszy slajd po załadowaniu bez animacji wejścia
    // Zapewniamy, że pierwszy slajd jest wyświetlany poprawnie od razu.
    slides[0].classList.add('active');
    slides[0].style.transform = 'translateX(0)'; 
    dots[0].classList.add('active');
});
