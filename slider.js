// Ten skrypt steruje działaniem slidera i jest poprawiony, aby używać klas zdefiniowanych w pliku style.css.
// Zapewnia automatyczne przewijanie (3.5s) oraz obsługę klikania w kropki nawigacyjne.

document.addEventListener('DOMContentLoaded', () => {
    // === 1. POBIERANIE ELEMENTÓW DOM ===
    const headerElement = document.querySelector('.slider-header');
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    
    // Sprawdzenie, czy kluczowe elementy zostały znalezione, aby zapobiec błędowi 'null is not an object'
    if (!sliderContainer || slides.length === 0 || !dotsContainer || !headerElement) {
        console.error("Błąd: Nie znaleziono wszystkich wymaganych elementów slidera. Upewnij się, że używasz klas: .slider-header, .slider-container, .slide, .slider-dots.");
        // Skrypt kończy działanie, jeśli brakuje kluczowych elementów.
        return; 
    }

    // === 2. KONFIGURACJA ===
    const slideCount = slides.length;
    let currentSlide = 0;
    const slideDuration = 3500; // 3.5 sekundy
    let sliderInterval;

    // === 3. GENEROWANIE I OBSŁUGA KROPEK ===
    // Czyścimy container kropek i generujemy je dynamicznie (jeśli ich nie ma w HTML)
    // Jeśli kropki są już w HTML (jak w zaktualizowanym index.html), po prostu je pobieramy.
    
    // Pobranie istniejących kropek lub ich wygenerowanie
    let dots = document.querySelectorAll('.dot');

    if (dots.length === 0) {
        // Jeśli nie ma kropek w HTML, generujemy je:
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.slide = i; // Używamy data-slide zamiast data-index
            dotsContainer.appendChild(dot);
        }
        dots = document.querySelectorAll('.dot');
    }

    // Dodanie nasłuchiwania na kliknięcie kropki
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlider();
            currentSlide = index;
            updateSlider();
            startSlider();
        });
    });

    // === 4. FUNKCJE STERUJĄCE SLIDEREM ===

    /**
     * Aktualizuje widok slidera (przesunięcie i kropki).
     */
    function updateSlider() {
        // Używamy currentSlide do obliczenia przesunięcia (0%, -100%, -200%, itd.)
        const offset = -currentSlide * 100; 
        sliderContainer.style.transform = `translateX(${offset}%)`;

        // Aktualizacja klasy 'active' na kropkach
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
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

    // === 5. INICJALIZACJA I OBSŁUGA INTERAKCJI UŻYTKOWNIKA ===
    
    // Zapobieganie przesuwaniu podczas interakcji myszą/dotykiem
    headerElement.addEventListener('mouseenter', stopSlider);
    headerElement.addEventListener('mouseleave', startSlider);
    
    // Uruchomienie slidera przy ładowaniu strony
    updateSlider(); 
    startSlider();
});
