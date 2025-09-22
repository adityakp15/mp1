// Array of background images for the carousel
const backgroundImages = [
    'assets/travels.jpg',
    'assets/travels2.jpg',
    'assets/travels3.jpeg',
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

// keyboard navigation
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


const modalBtns = document.querySelectorAll(".modal-btn");

modalBtns.forEach((btn) => {
  const modal = btn.nextElementSibling; // modal is right after the button
  const closeBtn = modal.querySelector(".close");

  // Open modal
  btn.addEventListener("click", () => {
    modal.classList.add("open");
  });

  // Close modal when clicking X
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
  });

  // Close modal when clicking outside modal-content
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("open");
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('div[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('#nav-container');

  const getNavbarHeight = () => navbar.offsetHeight || 80;

  function updateActiveLink() {
    let scrollPos = window.scrollY + getNavbarHeight() + window.innerHeight / 2;
    let currentSection = sections[0].id;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const bottom = top + section.offsetHeight;

      if (scrollPos >= top && scrollPos < bottom) {
        currentSection = section.id;
      }
    });

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      currentSection = sections[sections.length - 1].id;
    }

    navLinks.forEach(link => {
      if (link.hash === `#${currentSection}`) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink);
  window.addEventListener('resize', updateActiveLink);
});

window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {      
    navbar.classList.add('shrink');
  } else {
    navbar.classList.remove('shrink');
  }
});