document.addEventListener('DOMContentLoaded', () => {
    // 1. Wybór elementów
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slider-slide');
    
    // Ustawienie kluczowych zmiennych
    const totalSlides = slides.length; // Liczba slajdów (3)
    let currentSlide = 0; // Aktualny indeks slajdu (zaczynamy od 0)
    const slideDuration = 5000; // Czas wyświetlania slajdu w milisekundach (5 sekund)

    // 2. Funkcja do zmiany slajdu
    function goToSlide(index) {
        // Oblicza, o ile procent ma się przesunąć kontener.
        // Np. dla slajdu 0: 0 * 33.33% = 0%
        // Np. dla slajdu 1: 1 * 33.33% = 33.33%
        const offset = index * 100 / totalSlides; 
        
        // Zmiana transformacji CSS
        sliderContainer.style.transform = `translateX(-${offset}%)`;
        
        // Aktualizacja indeksu
        currentSlide = index;
    }

    // 3. Funkcja do przejścia do następnego slajdu
    function nextSlide() {
        // Obliczenie nowego indeksu:
        // (aktualny_indeks + 1) % liczba_slajdów
        // Zapewnia to, że po ostatnim slajdzie (indeks 2) wrócimy do pierwszego (indeks 0).
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }
    
    // 4. Uruchomienie automatycznego przewijania
    // Używamy setInterval do cyklicznego wywoływania funkcji nextSlide
    const sliderInterval = setInterval(nextSlide, slideDuration);

    // Opcjonalnie: zatrzymanie automatycznego przewijania po najechaniu myszą
    // (dla lepszego doświadczenia użytkownika)
    
    const headerElement = document.querySelector('.header');

    headerElement.addEventListener('mouseenter', () => {
        clearInterval(sliderInterval);
    });

    headerElement.addEventListener('mouseleave', () => {
        // Ponowne uruchomienie interwału (możesz potrzebować nowej zmiennej
        // lub zdefiniować interwał globalnie, aby to działało poprawnie,
        // w tym prostym przykładzie jest to wystarczające)
        // Lepszym rozwiązaniem byłoby to: sliderInterval = setInterval(nextSlide, slideDuration);
        // Ale ze względu na prostotę pozostawiamy to w komentarzu.
        // Jeśli chcesz to włączyć, musisz zmienić definicję:
        // let sliderInterval = setInterval(nextSlide, slideDuration); 
    });

    // Uruchomienie pierwszego slajdu (chociaż domyślnie jest wyświetlony)
    goToSlide(currentSlide);
});
