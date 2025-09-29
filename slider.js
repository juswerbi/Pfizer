document.addEventListener('DOMContentLoaded', () => {
    // 1. Selektory
    // KLUCZOWY ELEMENT: kontener, który będziemy przesuwać w poziomie
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // Ustawienia
    const intervalTime = 3500; // 3.5 sekundy
    const totalSlides = slides.length;
    let slideIndex = 0;
    let slideInterval;

    if (!slidesWrapper || totalSlides === 0) {
        console.error("Slider components not found. Check if .slides-wrapper and .slide elements are in HTML.");
        return; // Zakończ, jeśli nie ma elementów
    }

    // Funkcja do przesuwania karuzeli do określonego indeksu
    function showSlide(index) {
        // Obliczenie nowego indeksu z zapętleniem
        const newIndex = (index + totalSlides) % totalSlides;
        
        // Obliczenie wartości przesunięcia w procentach
        // Slajd 0: 0%; Slajd 1: -100%; Slajd 2: -200%
        const offset = newIndex * -100; 

        // Zastosowanie transformacji do przesunięcia CAŁEGO KONTENERA
        slidesWrapper.style.transform = `translateX(${offset}%)`;

        // Aktualizacja indeksu
        slideIndex = newIndex;

        // Aktualizacja nawigacji kropkowej (active state)
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        if (dots[slideIndex]) {
            dots[slideIndex].classList.add('active');
        }
    }

    // Funkcja do przełączania do następnego slajdu
    function nextSlide() {
        showSlide(slideIndex + 1);
    }

    // Ustawienie nasłuchu kliknięć na kropki
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== slideIndex) {
                // Czyszczenie i restart interwału, aby użytkownik miał czas na przeczytanie slajdu po kliknięciu
                clearInterval(slideInterval); 
                showSlide(index);
                // Uruchom auto-przewijanie ponownie
                slideInterval = setInterval(nextSlide, intervalTime);
            }
        });
    });

    // Uruchomienie automatycznego przełączania slajdów
    slideInterval = setInterval(nextSlide, intervalTime);

    // Upewnienie się, że karuzela startuje z pierwszego slajdu
    showSlide(0);
});
