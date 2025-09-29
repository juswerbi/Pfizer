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
        
        // Timeout jest potrzebny, aby przeglądarka zdążyła zresetować animację
        setTimeout(() => {
            // 2. Startuj animację bieżącego paska
            progressBars[index].classList.add('active');
        }, 10);
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

    // Funkcja startująca automatyczne przewijanie
    function startSlider() {
        if (isPaused) {
            isPaused = false;
            pausePlayButton.classList.remove('paused');
            // Wznów animację paska dla aktualnego slajdu
            startBarAnimation(slideIndex); 
            slideInterval = setInterval(nextSlide, intervalTime);
        }
    }

    // Funkcja zatrzymująca automatyczne przewijanie
    function pauseSlider() {
        if (!isPaused) {
            isPaused = true;
            clearInterval(slideInterval);
            pausePlayButton.classList.add('paused');

            // Zatrzymanie animacji paska (usuwamy klasę active, co powoduje zatrzymanie animacji w CSS)
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
            // Natychmiast zatrzymujemy automat, aby uniknąć przeskoku
            clearInterval(slideInterval); 
            
            // Przełączamy do wybranego slajdu
            showSlide(newIndex);
            
            // Restartujemy automat, jeśli nie jest w trybie 'paused'
            if (!isPaused) {
                 slideInterval = setInterval(nextSlide, intervalTime);
            }
        }
    });

    // --- Inicjalizacja ---
    
    // Uruchomienie automatycznego przełączania slajdów
    slideInterval = setInterval(nextSlide, intervalTime);

    // Upewnienie się, że karuzela startuje z pierwszego slajdu i paska
    showSlide(0);
});
