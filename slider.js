document.addEventListener('DOMContentLoaded', () => {
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const intervalTime = 3500; // 3.5 sekundy
    const totalSlides = slides.length;
    let slideIndex = 0;
    let slideInterval;

    // Funkcja do przesuwania karuzeli
    function showSlide(index) {
        // Obliczenie indeksu z zapętleniem (0, 1, 2, 0, 1, 2...)
        const newIndex = (index + totalSlides) % totalSlides;
        
        // Obliczenie wartości przesunięcia w procentach
        const offset = newIndex * -100; // Slajd 0: 0%; Slajd 1: -100%; Slajd 2: -200%

        // Zastosowanie transformacji do przesunięcia całego kontenera
        slidesWrapper.style.transform = `translateX(${offset}%)`;

        // Aktualizacja indeksu
        slideIndex = newIndex;

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

    // Ustawienie nasłuchu kliknięć na kropki
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== slideIndex) {
                clearInterval(slideInterval); // Zatrzymaj auto-przewijanie
                showSlide(index);
                // Uruchom auto-przewijanie ponownie
                slideInterval = setInterval(nextSlide, intervalTime);
            }
        });
    });

    // Uruchomienie automatycznego przełączania slajdów
    slideInterval = setInterval(nextSlide, intervalTime);

    // Upewnienie się, że pierwszy slajd jest na pozycji 0 przy starcie
    showSlide(0);
});
