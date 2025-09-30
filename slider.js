/**
 * Funkcja animateIndicators
 * Odpowiada za animację kół progresu SVG (pie charts) na Slajdzie 3.
 * Wykorzystuje właściwość stroke-dashoffset do płynnego wypełniania pierścienia.
 */
function animateIndicators() {
    // Obwód koła o promieniu r=15.91549430918954 wynosi dokładnie 100,
    // co ułatwia mapowanie procentów (np. 50% = offset 50).
    const circumference = 100;

    document.querySelectorAll('.pie-chart-svg').forEach(container => {
        const percent = container.getAttribute('data-percent');
        // Obliczenie docelowego offsetu. Np. dla 50% -> offset = 100 - 50 = 50.
        const offset = circumference - (percent / 100) * circumference;
        
        const progressCircle = container.querySelector('.pie-progress-circle');
        
        if (progressCircle) {
            // Ustawienie initial state (pełny offset, ukryty progres)
            progressCircle.style.strokeDashoffset = circumference;
            
            // Wymuszenie reflow dla restartu animacji po zmianie offsetu
            // Gwarantuje, że przejście będzie animowane po powrocie na slajd 3
            progressCircle.getBoundingClientRect(); 
            
            // Docelowy offset - rozpoczęcie animacji z CSS transition
            progressCircle.style.strokeDashoffset = offset;
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // --- Konfiguracja Slajdera ---
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slider-slide');
    const totalSlides = slides.length; // Liczba slajdów: 3
    let currentSlide = 0; 
    const slideDuration = 5000; // Czas wyświetlania slajdu (5 sekund)
    let sliderInterval; 

    /**
     * Ustawia pozycję kontenera slajdów i aktualizuje stan.
     * @param {number} index - Indeks slajdu, do którego należy przejść.
     */
    function goToSlide(index) {
        // Logika pętli: (0 + 1) % 3 = 1; (2 + 1) % 3 = 0 (powrót na początek)
        currentSlide = index % totalSlides;
        
        // Obliczenie przesunięcia w procentach (np. 0%, 33.33%, 66.66%)
        const offset = currentSlide * 100 / totalSlides; 
        
        sliderContainer.style.transform = `translateX(-${offset}%)`;

        // WYWOŁANIE ANIMACJI TYLKO NA SLAJDZIE 3 (index 2)
        if (currentSlide === 2) {
            animateIndicators();
        }
    }

    /**
     * Przechodzi do następnego slajdu w pętli.
     */
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    /**
     * Startuje automatyczny slajder.
     */
    function startSlider() {
        if (sliderInterval) clearInterval(sliderInterval);
        sliderInterval = setInterval(nextSlide, slideDuration);
    }

    /**
     * Zatrzymuje automatyczny slajder.
     */
    function stopSlider() {
        clearInterval(sliderInterval);
    }

    const headerElement = document.querySelector('.header');

    // Pauza slajdera przy najechaniu myszą
    headerElement.addEventListener('mouseenter', stopSlider);
    headerElement.addEventListener('mouseleave', startSlider);

    // Inicjalizacja: Uruchom slajder po załadowaniu strony
    startSlider(); 
    goToSlide(currentSlide); 
});
