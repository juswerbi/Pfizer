document.addEventListener('DOMContentLoaded', () => {
    // 1. Selektory
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const slides = document.querySelectorAll('.slide');
    const barsContainer = document.querySelector('.progress-bars-container');
    const progressBars = document.querySelectorAll('.progress-bar');
    const pausePlayButton = document.querySelector('.pause-play-button');
    
    // Ustawienia
    const intervalTime = 3500; // 3.5 sekundy
    const totalSlides = slides.length;
    let slideIndex = 0;
    let slideInterval;
    let isPaused = false;

    if (!slidesWrapper || totalSlides === 0) {
        console.error("Slider components not found. Check if .slides-wrapper and .slide elements are in HTML.");
        return; 
    }

    // --- Funkcje Kontrolne ---

    // Funkcja resetująca i startująca animację paska
    function startBarAnimation(index) {
        // 1. Resetuj wszystkie paski
        progressBars.forEach(bar => {
            bar.classList.remove('active');
        });
        
        // Zapewniamy, że przeglądarka zdąży odczytać usunięcie klasy 'active' (reset paska)
        // przed jej ponownym dodaniem (start animacji). Użycie setTimeout 10ms jest bardziej 
        // niezawodne w różnych przeglądarkach niż requestAnimationFrame dla tego konkretnego problemu.
        setTimeout(() => {
            if (!isPaused) {
                // 2. Startuj animację bieżącego paska
                progressBars[index].classList.add('active');
            }
        }, 10); // Czas resetu
    }

    // Funkcja do przesuwania karuzeli do określonego indeksu
    function showSlide(index) {
        const newIndex = (index + totalSlides) % totalSlides;
        const offset = newIndex * -100; 

        slidesWrapper.style.transform = `translateX(${offset}%)`;
        slideIndex = newIndex;

        if (!isPaused) {
            startBarAnimation(slideIndex);
        }
    }

    // Funkcja do przełączania do następnego slajdu
    function nextSlide() {
        showSlide(slideIndex + 1);
    }
    
    // Funkcja restartująca interwał i animację paska
    function restartSlider() {
        clearInterval(slideInterval);
        
        // Upewniamy się, że pierwszy slajd jest natychmiast poprawnie wyświetlony
        // i jego pasek startuje od razu.
        if (!isPaused) {
            startBarAnimation(slideIndex); 
            // Restart interwału
            slideInterval = setInterval(nextSlide, intervalTime);
        }
    }

    // Funkcja startująca automatyczne przewijanie (używana po pauzie)
    function startSlider() {
        if (isPaused) {
            isPaused = false;
            pausePlayButton.classList.remove('paused');
            restartSlider(); // Używamy nowej funkcji do restartu
        }
    }

    // Funkcja zatrzymująca automatyczne przewijanie
    function pauseSlider() {
        if (!isPaused) {
            isPaused = true;
            clearInterval(slideInterval);
            pausePlayButton.classList.add('paused');

            // Zatrzymanie animacji paska w CSS
            progressBars.forEach(bar => {
                bar.classList.remove('active');
            });
        }
    }

    // --- Nasłuchiwacze Zdarzeń ---

    // 1. Kliknięcie na przycisk Play/Pause
    pausePlayButton.addEventListener('click', () => {
        if (isPaused) {
            startSlider();
        } else {
            pauseSlider();
        }
    });

    // 2. Kliknięcie na pasek postępu (nawigacja)
    barsContainer.addEventListener('click', (e) => {
        const bar = e.target.closest('.progress-bar');
        if (!bar) return;

        const newIndex = parseInt(bar.dataset.index);
        if (newIndex !== slideIndex) {
            
            // Przełączamy slajd natychmiast
            showSlide(newIndex);
            
            // Restartujemy timer i animację paska (jeśli nie jest w trybie 'paused')
            restartSlider();
        }
    });

    // --- Inicjalizacja ---
    
    // Ustawienie pierwszego slajdu i paska
    showSlide(0);

    // Uruchomienie automatycznego przełączania slajdów po raz pierwszy
    slideInterval = setInterval(nextSlide, intervalTime);
});
