// static/js/main.js

document.addEventListener('DOMContentLoaded', function() {
  const welcomeScreen = document.getElementById('welcomeScreen');
  const body = document.body;
  const html = document.documentElement;
  
  // Ensure the welcome screen is visible and blocks everything
  welcomeScreen.style.display = 'flex';
  welcomeScreen.style.position = 'fixed';
  welcomeScreen.style.zIndex = '99999';
  
  // Disable scrolling completely while welcome screen is active
  body.style.overflow = 'hidden';
  html.style.overflow = 'hidden';
  body.style.position = 'fixed';
  body.style.width = '100%';
  body.style.height = '100%';
  
  // Hide welcome screen after all animations complete
  setTimeout(() => {
    welcomeScreen.style.display = 'none';
    // Re-enable scrolling
    body.style.overflow = 'auto';
    html.style.overflow = 'auto';
    body.style.position = 'static';
    body.style.width = 'auto';
    body.style.height = 'auto';
  }, 3500); // 3.5 seconds total
});

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

