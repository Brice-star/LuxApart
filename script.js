// Main JavaScript functionality for LuxApart

// Global variables
let currentFilter = 'all';
const apartmentImages = {
    studio1: [
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg',
        'https://images.pexels.com/photos/2029670/pexels-photo-2029670.jpeg'
    ],
    studio2: [
        'https://images.pexels.com/photos/2029670/pexels-photo-2029670.jpeg',
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg'
    ],

    '3pieces1': [
        'public/pictures/a2.jpeg',
        'public/pictures/a3.jpeg',
        'public/pictures/a4.jpeg',
        'public/pictures/a5.jpeg',
    ],

    '2pieces2': [
        'public/pictures/b1.jpg',
        'public/pictures/b2.jpg',
        'public/pictures/b3.jpeg',
        'public/pictures/b4.jpeg',
    ],

    luxury1: [
        'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg',
        'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg',
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ]
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupNavbar();
    setupSmoothScrolling();
    setupFilterButtons();
    setupBookingModal();
    setupGalleryModal();
    setupAnimations();
    setupContactForm();
    
    // Set minimum date for booking to today
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

// Navbar functionality
function setupNavbar() {
    const navbar = document.getElementById('mainNav');
    
    // Handle navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Handle mobile menu close on link click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarToggle = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                navbarToggle.click();
            }
        });
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('mainNav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Filter functionality
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const apartmentCards = document.querySelectorAll('.apartment-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter apartments with animation
            apartmentCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            currentFilter = filter;
        });
    });
}

// Booking modal functionality
function setupBookingModal() {
    const bookingModal = document.getElementById('bookingModal');
    const bookingButtons = document.querySelectorAll('[data-bs-target="#bookingModal"]');
    
    bookingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const apartmentName = this.getAttribute('data-apartment');
            const apartmentPrice = this.getAttribute('data-price');
            
            // Update modal content
            document.getElementById('selectedApartment').textContent = apartmentName;
            document.getElementById('selectedPrice').textContent = apartmentPrice + '€/mois';
        });
    });
}

// Gallery modal functionality  
function setupGalleryModal() {
    const galleryModal = document.getElementById('galleryModal');
    const galleryButtons = document.querySelectorAll('[data-bs-target="#galleryModal"]');
    
    galleryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const apartmentId = this.getAttribute('data-apartment');
            const images = apartmentImages[apartmentId] || [];
            
            // Populate carousel
            const carouselInner = document.getElementById('carouselInner');
            carouselInner.innerHTML = '';
            
            images.forEach((image, index) => {
                const carouselItem = document.createElement('div');
                carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                carouselItem.innerHTML = `<img src="${image}" class="d-block w-100" alt="Apartment Image ${index + 1}">`;
                carouselInner.appendChild(carouselItem);
            });
        });
    });
}

// Animation setup
function setupAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe apartment cards for scroll animations
    const cards = document.querySelectorAll('.apartment-card, .service-card, .contact-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Contact form setup
function setupContactForm() {
    const newsletterForm = document.querySelector('.input-group');
    const emailInput = newsletterForm?.querySelector('input[type="email"]');
    const submitButton = newsletterForm?.querySelector('button');
    
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (emailInput && emailInput.value) {
                // Show success message
                showNotification('Merci ! Vous êtes maintenant abonné à notre newsletter.', 'success');
                emailInput.value = '';
            } else {
                showNotification('Veuillez entrer une adresse email valide.', 'warning');
            }
        });
    }
}

// Booking form submission
function submitBooking() {
    const form = document.getElementById('bookingForm');
    const formData = new FormData(form);
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Validate required fields
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    if (isValid) {
        // Simulate booking submission
        const submitButton = document.querySelector('#bookingModal .btn-primary');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Traitement...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            // Hide modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
            modal.hide();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Show success message
            showNotification('Votre demande de réservation a été envoyée ! Nous vous contacterons sous 24h.', 'success');
            
            // Reset form
            form.reset();
        }, 2000);
    } else {
        showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification-toast');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification-toast alert alert-${getBootstrapAlertClass(type)} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 10px 15px rgba(0,0,0,0.1);
        border-radius: 12px;
        border: none;
    `;
    
    notification.innerHTML = `
        ${getNotificationIcon(type)}
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 150);
        }
    }, 5000);
}

// Helper functions for notifications
function getBootstrapAlertClass(type) {
    const classMap = {
        'success': 'success',
        'error': 'danger',
        'warning': 'warning',
        'info': 'info'
    };
    return classMap[type] || 'info';
}

function getNotificationIcon(type) {
    const iconMap = {
        'success': '<i class="bi bi-check-circle-fill me-2"></i>',
        'error': '<i class="bi bi-exclamation-circle-fill me-2"></i>',
        'warning': '<i class="bi bi-exclamation-triangle-fill me-2"></i>',
        'info': '<i class="bi bi-info-circle-fill me-2"></i>'
    };
    return iconMap[type] || iconMap['info'];
}

// Search functionality (future enhancement)
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const apartmentCards = document.querySelectorAll('.apartment-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            apartmentCards.forEach(card => {
                const apartmentName = card.querySelector('h4').textContent.toLowerCase();
                const apartmentLocation = card.querySelector('.apartment-location').textContent.toLowerCase();
                
                if (apartmentName.includes(searchTerm) || apartmentLocation.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Performance optimization
function optimizeImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Could implement error reporting here
});

// Mobile-specific optimizations
function setupMobileOptimizations() {
    // Optimize touch events for mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Optimize hover effects for touch devices
        const cards = document.querySelectorAll('.apartment-item, .service-card, .contact-card');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            });
        });
    }
}

// Initialize mobile optimizations
document.addEventListener('DOMContentLoaded', setupMobileOptimizations);

// Accessibility improvements
function setupAccessibility() {
    // Keyboard navigation for modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                const modal = bootstrap.Modal.getInstance(openModal);
                modal?.hide();
            }
        }
    });
    
    // Focus management
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        modal.addEventListener('shown.bs.modal', function() {
            const firstFocusable = modal.querySelector(focusableElements);
            firstFocusable?.focus();
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', setupAccessibility);

// Export functions for global access
window.submitBooking = submitBooking;
window.showNotification = showNotification;