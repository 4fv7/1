// static/js/main.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile menu toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks  = document.querySelector('.nav-links');
  
    menuToggle.addEventListener('click', function() {
      const isOpen = this.classList.toggle('active');
      navLinks.classList.toggle('active', isOpen);
      this.setAttribute('aria-expanded', isOpen);
      this.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
  
    // Close menu when a nav link is clicked
    document.querySelectorAll('.nav-links a').forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  
    // --- Contact form (EmailJS) ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // basic validation
      if (!this.name.value.trim() ||
          !this.email.value.trim() ||
          !this.message.value.trim()) {
        return alert('Please fill in all fields.');
      }
  
      emailjs.sendForm('service_l2iv37h', 'template_ii62d1m', this)
        .then(() => {
          alert('Message sent successfully!');
          this.reset();
        })
        .catch(err => {
          console.error('EmailJS error:', err);
          alert('Failed to send message. Please try again later.');
        });
    });
  });

document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.querySelector('.welcome-screen');
    
    // Hide welcome screen after animation
    setTimeout(() => {
        welcomeScreen.style.opacity = '0';
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
        }, 500);
    }, 2500);
});
