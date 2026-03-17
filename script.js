let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const slidesContainer = document.getElementById('slides');
        const dotsContainer = document.getElementById('dotsContainer');
        let autoplayInterval;
        let isAutoplay = true;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            dot.onclick = () => goToSlide(index);
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updateSlide() {
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function changeSlide(direction) {
            currentSlide += direction;
            
            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            } else if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            
            updateSlide();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlide();
        }

        function toggleAutoplay() {
            isAutoplay = !isAutoplay;
            const btn = document.getElementById('autoplayBtn');
            
            if (isAutoplay) {
                btn.textContent = '▶️ Auto Play ON';
                btn.classList.add('active');
                startAutoplay();
            } else {
                btn.textContent = '⏸️ Auto Play OFF';
                btn.classList.remove('active');
                stopAutoplay();
            }
        }

        function startAutoplay() {
            stopAutoplay(); // Clear any existing interval
            autoplayInterval = setInterval(() => {
                changeSlide(1);
            }, 3000);
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
            }
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                changeSlide(-1);
            } else if (e.key === 'ArrowRight') {
                changeSlide(1);
            }
        });

        // Pause autoplay on hover
        slidesContainer.addEventListener('mouseenter', () => {
            if (isAutoplay) stopAutoplay();
        });

        slidesContainer.addEventListener('mouseleave', () => {
            if (isAutoplay) startAutoplay();
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        slidesContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slidesContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                changeSlide(1);
            }
            if (touchEndX > touchStartX + 50) {
                changeSlide(-1);
            }
        }

        // Start autoplay on load
        startAutoplay();
