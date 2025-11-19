document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const pauseBtn = document.getElementById('pause-slider');
    const sliderRegion = document.getElementById('slider-region');
    
    let currentSlide = 0;
    let slideInterval;
    let isPlaying = true;
    const slideDuration = 7000;

    // Funkcja inicjująca
    function init() {
        updateSlides(0);
        startSlider();
    }

    function updateSlides(index) {
        // Reset
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.setAttribute('aria-hidden', 'true');
            
            // Wyłącz interaktywne elementy w nieaktywnych slajdach
            const focusables = slide.querySelectorAll('a, button');
            focusables.forEach(el => el.setAttribute('tabindex', '-1'));
            
            dots[i].classList.remove('active');
            dots[i].setAttribute('aria-selected', 'false');
        });

        // Set Active
        slides[index].classList.add('active');
        slides[index].setAttribute('aria-hidden', 'false');
        
        // Włącz interaktywne elementy w aktywnym slajdzie
        const activeFocusables = slides[index].querySelectorAll('a, button');
        activeFocusables.forEach(el => el.setAttribute('tabindex', '0'));

        dots[index].classList.add('active');
        dots[index].setAttribute('aria-selected', 'true');
        
        currentSlide = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        updateSlides(nextIndex);
    }

    function startSlider() {
        if (!isPlaying) return;
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    function togglePlayState() {
        if (isPlaying) {
            stopSlider();
            isPlaying = false;
            pauseBtn.innerHTML = "▶";
            pauseBtn.setAttribute('aria-label', "Wznów automatyczne przewijanie");
        } else {
            isPlaying = true;
            startSlider();
            pauseBtn.innerHTML = "❚❚";
            pauseBtn.setAttribute('aria-label', "Zatrzymaj automatyczne przewijanie");
        }
    }

    // --- Event Listeners ---

    // 1. Dots click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlider(); // Użytkownik przejmuje kontrolę
            updateSlides(index);
            // Opcjonalnie: wznów po chwili lub zostaw zatrzymane
        });
    });

    // 2. Pause Button
    if(pauseBtn) {
        pauseBtn.addEventListener('click', togglePlayState);
    }

    // 3. Accessibility: Stop on hover AND Focus
    // WCAG 2.2.2 Pause, Stop, Hide
    const sliderHeader = document.querySelector('.header-slider');
    
    sliderHeader.addEventListener('mouseenter', stopSlider);
    sliderHeader.addEventListener('mouseleave', () => {
        if (isPlaying) startSlider();
    });

    sliderHeader.addEventListener('focusin', stopSlider);
    sliderHeader.addEventListener('focusout', (e) => {
        // Wznów tylko jeśli focus opuścił cały slider
        if (!sliderHeader.contains(e.relatedTarget) && isPlaying) {
            startSlider();
        }
    });

    // Start
    init();
});
