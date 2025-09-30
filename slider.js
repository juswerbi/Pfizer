// Ten skrypt steruje działaniem slidera.
// Zapewnia automatyczne przewijanie (3.5s). Logika kropek nawigacyjnych została usunięta.

document.addEventListener('DOMContentLoaded', () => {
    // === 1. POBIERANIE ELEMENTÓW DOM ===
    const headerElement = document.querySelector('.slider-header');
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    
    // Sprawdzenie, czy kluczowe elementy zostały znalezione, aby zapobiec błędom
    if (!sliderContainer || slides.length === 0 || !headerElement) {
        console.error("Błąd: Nie znaleziono wszystkich wymaganych elementów slidera. Upewnij się, że używasz klas: .slider-header, .slider-container, .slide.");
        return; 
    }

    // === 2. KONFIGURACJA ===
    const slideCount = slides.length;
    let currentSlide = 0;
    const slideDuration = 3500; // 3.5 sekundy
    let sliderInterval;

    // === 3. FUNKCJE STERUJĄCE SLIDEREM ===

    /**
     * Aktualizuje widok slidera (przesunięcie).
     */
    function updateSlider() {
        // Używamy currentSlide do obliczenia przesunięcia (0%, -100%, -200%, itd.)
        const offset = -currentSlide * 100; 
        sliderContainer.style.transform = `translateX(${offset}%)`;
    }

    /**
     * Przechodzi do następnego slajdu.
     */
    function nextSlide() {
        // Zapętlenie: jeśli jesteśmy na ostatnim slajdzie, wracamy do 0.
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }
    
    /**
     * Uruchamia automatyczne przełączanie slajdów.
     */
    function startSlider() {
        stopSlider(); // Zawsze czyścimy poprzedni interwał przed uruchomieniem nowego
        sliderInterval = setInterval(nextSlide, slideDuration);
    }
    
    /**
     * Zatrzymuje automatyczne przełączanie slajdów.
     */
    function stopSlider() {
        clearInterval(sliderInterval);
    }

    // === 4. INICJALIZACJA I OBSŁUGA INTERAKCJI UŻYTKOWNIKA ===
    
    // Zatrzymanie slajdów, gdy kursor najedzie na nagłówek, i wznowienie po opuszczeniu
    headerElement.addEventListener('mouseenter', stopSlider);
    headerElement.addEventListener('mouseleave', startSlider);
    
    // Uruchomienie slidera przy ładowaniu strony
    updateSlider(); 
    startSlider();
});
