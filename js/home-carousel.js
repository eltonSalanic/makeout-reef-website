function initHomeCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('next-btn');
    const prevButton = document.getElementById('prev-btn');
    const dotsNav = document.querySelector('.carousel-dots');
    const dots = Array.from(dotsNav.children);

    let currentIndex = 0;

    const updateCarousel = (index) => {
        // Loop back to start/end
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        const currentSlide = track.querySelector('.current-slide');
        const targetSlide = slides[index];
        const currentDot = dotsNav.querySelector('.active');
        const targetDot = dots[index];

        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');

        currentDot.classList.remove('active');
        targetDot.classList.add('active');

        currentIndex = index;
    };

    nextButton.addEventListener('click', () => {
        updateCarousel(currentIndex + 1);
    });

    prevButton.addEventListener('click', () => {
        updateCarousel(currentIndex - 1);
    });

    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        const targetIndex = dots.indexOf(targetDot);
        updateCarousel(targetIndex);
    });

    // Auto play (optional, every 5 seconds)
    setInterval(() => {
        updateCarousel(currentIndex + 1);
    }, 5000);
}

document.addEventListener('DOMContentLoaded', initHomeCarousel);
