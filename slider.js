// Logika slidera do automatycznego przełączania slajdów co 3.5 sekundy.
document.addEventListener('DOMContentLoaded', () => {
    // Pobranie kluczowych elementów DOM
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // Konfiguracja slidera
    const totalSlides = slides.length;
    let currentSlide = 0;
    const slideDuration = 3500; // 3500ms = 3.5 sekundy
    let sliderInterval;

    // Walidacja - upewnienie się, że elementy istnieją przed rozpoczęciem operacji
    if (!sliderContainer || totalSlides === 0) {
        console.error("Nie znaleziono kontenera slidera lub slajdów. Sprawdź, czy elementy .slider-container i .slide istnieją w HTML.");
        return;
    }

    /**
     * Aktualizuje widok slidera, przesuwając kontener i podświetlając aktywną kropkę.
     * Przesunięcie o -100% * index aktualnego slajdu.
     */
    function updateSlider() {
        const offset = -currentSlide * 100; 
        sliderContainer.style.transform = `translateX(${offset}%)`;

        // Aktualizacja kropek nawigacyjnych
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentSlide) {
                dot.classList.add('active');
            }
        });
    }

    /**
     * Przechodzi do następnego slajdu, zapętlając go (looping).
     */
    function nextSlide() {
        // Obliczenie następnego slajdu (jeśli jesteśmy na ostatnim, wracamy na pierwszy za pomocą operatora modulo %)
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    /**
     * Uruchamia automatyczne przełączanie slajdów.
     */
    function startSlider() {
        sliderInterval = setInterval(nextSlide, slideDuration);
    }
    
    /**
     * Zatrzymuje automatyczne przełączanie slajdów.
     */
    function stopSlider() {
        clearInterval(sliderInterval);
    }

    // Dodanie obsługi klikania w kropki nawigacyjne
    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideIndex = parseInt(event.target.getAttribute('data-slide'));
            
            // Zatrzymanie automatu, aby uniknąć natychmiastowego przeskoku po kliknięciu
            stopSlider();
            
            currentSlide = slideIndex;
            updateSlider();

            // Uruchomienie automatu ponownie
            startSlider();
        });
    });

    // Inicjalizacja: Ustawienie slidera w początkowym stanie i uruchomienie automatu
    updateSlider(); 
    startSlider();
});
