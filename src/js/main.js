// Array of background images for the carousel
const backgroundImages = [
    'assets/travels.jpg',
    'assets/travels2.jpg',
    'assets/travels3.jpeg',
    // 'assets/travels4.mp4'
];

let currentImageIndex = 0;

// Function to update the background image
function updateBackground() {
    const fixedBg = document.querySelector('.fixed-bg');
    if (!fixedBg) return;
    
    // Add a fade-out effect
    fixedBg.style.opacity = '0';
    
    // Change the background image after a short delay
    setTimeout(() => {
        fixedBg.style.backgroundImage = `url(${backgroundImages[currentImageIndex]})`;
        fixedBg.style.opacity = '1';
    }, 300);
}

// Function to move to the next image
function nextBackground() {
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    updateBackground();
}

// Function to move to the previous image
function prevBackground() {
    currentImageIndex = (currentImageIndex - 1 + backgroundImages.length) % backgroundImages.length;
    updateBackground();
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevBackground();
    } else if (e.key === 'ArrowRight') {
        nextBackground();
    }
});

// Initialize the carousel
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers for the navigation buttons
    document.getElementById('prevBtn').addEventListener('click', prevBackground);
    document.getElementById('nextBtn').addEventListener('click', nextBackground);

    updateBackground(); // Set initial background
    
    // Add touch support for mobile
    let touchStartX = 0;
    const carousel = document.querySelector('.bg-container');
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, false);
    
    carousel.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextBackground(); // Swipe left
            } else {
                prevBackground(); // Swipe right
            }
        }
    }, false);
});

