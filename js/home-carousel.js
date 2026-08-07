import flyerImages from 'url:../assets/flyers/*.webp';

function initHomeCarousel() {
    console.log('Flyer Images Glob Raw:', flyerImages);
    
    const track = document.querySelector('.carousel-track');
    const dotsNav = document.querySelector('.carousel-dots');
    
    // Clear existing hardcoded content
    track.innerHTML = '';
    dotsNav.innerHTML = '';

    // Recursively find strings in the glob object
    const findUrls = (obj) => {
        let urls = [];
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                urls.push(obj[key]);
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                urls = urls.concat(findUrls(obj[key]));
            }
        }
        return urls;
    };

    const flyerUrls = findUrls(flyerImages);
    console.log('Detected Flyer URLs:', flyerUrls);
    
    if (flyerUrls.length === 0) return;

    const carouselContainer = document.querySelector('.carousel-container');
    const nextButton = document.getElementById('next-btn');
    const prevButton = document.getElementById('prev-btn');
    const hasMultipleFlyers = flyerUrls.length > 1;

    if (hasMultipleFlyers) {
        carouselContainer.classList.add('carousel-container--multiple');
    }

    // Build slides and dots dynamically
    flyerUrls.forEach((url, index) => {
        // Create Slide
        const li = document.createElement('li');
        li.className = `carousel-slide ${index === 0 ? 'current-slide' : ''}`;
        li.innerHTML = `
            <a href="/tour.html">
                <img src="${url}" alt="Tour Flyer" class="tour-flyer-image">
            </a>
        `;
        track.appendChild(li);

        if (hasMultipleFlyers) {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dotsNav.appendChild(dot);
        }
    });

    const slides = Array.from(track.children);
    const dots = Array.from(dotsNav.children);

    let currentIndex = 0;

    const updateCarousel = (index) => {
        if (!hasMultipleFlyers) return;

        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        const currentSlide = track.querySelector('.current-slide');
        const targetSlide = slides[index];
        const currentDot = dotsNav.querySelector('.active');
        const targetDot = dots[index];

        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');

        if (currentDot && targetDot) {
            currentDot.classList.remove('active');
            targetDot.classList.add('active');
        }

        currentIndex = index;
    };

    if (hasMultipleFlyers) {
        nextButton.addEventListener('click', () => updateCarousel(currentIndex + 1));
        prevButton.addEventListener('click', () => updateCarousel(currentIndex - 1));

        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('button');
            if (!targetDot) return;
            const targetIndex = dots.indexOf(targetDot);
            updateCarousel(targetIndex);
        });

        setInterval(() => updateCarousel(currentIndex + 1), 5000);
    }
}

document.addEventListener('DOMContentLoaded', initHomeCarousel);

