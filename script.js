// ==========================================
// JAVASCRIPT FOR WEDDING PAGE
// ==========================================

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // ACTIVE NAVIGATION
    // ==========================================
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add click event to each link to close mobile menu if it exists
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove 'active' class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add 'active' class to the clicked link
            this.classList.add('active');
        });
    });
    
    // ==========================================
    // SHOW/HIDE GUESTS FIELD
    // ==========================================
    
    // Get the attendance select and the guests group
    const attendanceSelect = document.getElementById('attendance');
    const guestsGroup = document.getElementById('guestsGroup');
    
    // Listen for changes on the attendance select
    attendanceSelect.addEventListener('change', function() {
        // If "Yes, I will attend" is selected, show the guest count field
        if (this.value === 'yes') {
            guestsGroup.style.display = 'block';
        } else {
            // If "No" is selected, hide the field
            guestsGroup.style.display = 'none';
            // Reset the value to 0
            document.getElementById('guests').value = 0;
        }
    });
    
    // ==========================================
    // RSVP FORM HANDLING
    // ==========================================
    
    const rsvpForm = document.getElementById('rsvpForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    
    rsvpForm.addEventListener('submit', function(e) {
        // Prevent the traditional form submission
        e.preventDefault();
        
        // Get all form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            attendance: document.getElementById('attendance').value,
            guests: document.getElementById('guests').value,
            dietary: document.getElementById('dietary').value,
            message: document.getElementById('message').value,
            song: document.getElementById('song').value
        };
        
        // Here you can add logic to send data to a server
        // For example, using fetch() for a POST request:
        /*
        fetch('your-endpoint-here.com/rsvp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        */
        
        // For now, just log to console and show confirmation message
        console.log('Form data:', formData);
        
        // Hide the form
        rsvpForm.style.display = 'none';
        
        // Show the confirmation message
        confirmationMessage.style.display = 'block';
        
        // Scroll smoothly to the confirmation message
        confirmationMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Optional: Send email notification (requires backend)
        // sendEmailNotification(formData);
    });
    
    // ==========================================
    // FADE-IN ANIMATION ON SCROLL
    // ==========================================
    
    // Function to check if an element is visible in the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to add animation to visible elements
    function handleScrollAnimation() {
        // (We already removed .polaroid from here, which is correct)
        const animatedElements = document.querySelectorAll('.timeline-item, .info-card');
        
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configure initial styles for the animation
    document.querySelectorAll('.timeline-item, .info-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    // Run once on page load
    handleScrollAnimation();
    
    // ==========================================
    // ADDITIONAL FORM VALIDATION
    // ==========================================
    
    // Validate email format in real-time
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value) && this.value !== '') {
            this.style.borderColor = 'red';
            // You could add an error message here
        } else {
            this.style.borderColor = '';
        }
    });
    
    // Validate phone number (only numbers, spaces, dashes)
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^\d\s\-()]/g, '');
    });
    
    // ==========================================
    // GIFT REGISTRY BUTTONS
    // ==========================================
    
    // You can customize the registry URLs here
    const registryButtons = document.querySelectorAll('.registry-button');
    registryButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Change these URLs to your actual registry URLs
            const registryUrls = [
                'https://www.amazon.com/wedding/your-registry-1',
                'https://www.liverpool.com.mx/tienda/mesa-de-regalos/your-registry-2'
            ];
            
            if (registryUrls[index]) {
                window.open(registryUrls[index], '_blank');
            }
        });
    });
    
    // ==========================================
    // COUNTDOWN (OPTIONAL)
    // ==========================================
    
    // If you want to add a countdown, you can use this function
    function updateCountdown() {
        // Wedding Date - CHANGE THIS DATE
        const weddingDate = new Date('2025-08-08T16:00:00').getTime();
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // If an element with id "countdown" exists, update its content
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            if (distance > 0) {
                // --- TRANSLATED TEXT ---
                countdownElement.innerHTML = `
                    <div class="countdown-item">
                        <span class="countdown-number">${days}</span>
                        <span class="countdown-label">Days</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${hours}</span>
                        <span class="countdown-label">Hours</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${minutes}</span>
                        <span class="countdown-label">Minutes</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${seconds}</span>
                        <span class="countdown-label">Seconds</span>
                    </div>
                `;
            } else {
                // --- TRANSLATED TEXT ---
                countdownElement.innerHTML = "The big day is here!";
            }
        }
    }
    
    // Update the counter every second (only if the element exists)
    if (document.getElementById('countdown')) {
        setInterval(updateCountdown, 1000);
        updateCountdown(); // Call once immediately
    }
    
    // ==========================================
    // SMOOTH SCROLL FOR NAVIGATION
    // ==========================================
    
    // Already implemented with CSS (scroll-behavior: smooth)
    // But here's a JavaScript alternative if you need it
    /*
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    */
    
    // ==========================================
    // FUNCTION TO SEND DATA TO A SERVER
    // ==========================================
    
    // This is an example function you can customize
    function sendFormToServer(formData) {
        // Example using fetch API
        fetch('https://your-server.com/api/rsvp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error in server response');
            }
            return response.json();
        })
        .then(data => {
            console.log('Server response:', data);
            // You can handle the successful response here
        })
        .catch(error => {
            console.error('Error sending form:', error);
            // --- TRANSLATED TEXT ---
            // Here you can show an error message to the user
            alert('There was an error sending your confirmation. Please try again.');
        });
    }
    
    // ==========================================
    // PRELOADER (OPTIONAL)
    // ==========================================
    
    // If you want to add a preloader while the page loads
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
    
    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================
    
    // Function to capitalize names
    function capitalizeName(name) {
        return name
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    
    // Apply capitalization to the name field when the user leaves the field
    document.getElementById('name').addEventListener('blur', function() {
        this.value = capitalizeName(this.value);
    });
    
});

// ==========================================
// GLOBAL FUNCTIONS
// ==========================================

// Function to reset the form (useful if you want to add a reset button)
function resetRSVPForm() {
    document.getElementById('rsvpForm').reset();
    document.getElementById('rsvpForm').style.display = 'block';
    document.getElementById('confirmationMessage').style.display = 'none';
    document.getElementById('guestsGroup').style.display = 'none';
}

// Function to print the page (if you want to add a print button)
function printPage() {
    window.print();
}

// ==========================================
// GLOBAL ERROR HANDLING
// ==========================================

window.addEventListener('error', function(e) {
    // --- TRANSLATED TEXT ---
    console.error('Error detected:', e.message);
    // You can add logic here to report errors if you wish
});

// ==========================================
// DEBUGGING CONSOLE LOG
// ==========================================

// --- TRANSLATED TEXT ---
console.log('Wedding script loaded successfully');
console.log('Remember to customize the gift registry URLs');
console.log('Remember to configure the server endpoint for the RSVP form');