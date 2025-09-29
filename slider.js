document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const intervalTime = 3500; // 3.5 sekundy
    let slideIndex = 0;
    let slideInterval;

    // Funkcja do pokazywania określonego slajdu
    function showSlide(index) {
        // Usuń 'active' ze wszystkich slajdów i kropek
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Dodaj 'active' do bieżącego slajdu i kropki
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        slideIndex = index;
    }

    // Funkcja do przełączania do następnego slajdu
    function nextSlide() {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }

    // Ustawienie nasłuchu kliknięć na kropki
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval); // Zatrzymaj auto-przewijanie
            showSlide(index);
            // Uruchom auto-przewijanie ponownie po ręcznej zmianie
            slideInterval = setInterval(nextSlide, intervalTime);
        });
    });

    // Uruchomienie automatycznego przełączania slajdów
    slideInterval = setInterval(nextSlide, intervalTime);

    // Pokaż pierwszy slajd po załadowaniu
    showSlide(0);
});
