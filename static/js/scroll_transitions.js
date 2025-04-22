/**
 * Scroll Transitions and Animations
 * Enhanced scrolling experience for portfolio website
 */

document.addEventListener('DOMContentLoaded', function() {
  // Create scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  // Create back to top button
  const backToTop = document.createElement('a');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '&uarr;';
  backToTop.setAttribute('href', '#home');
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);

  // Add reveal classes to sections
  document.querySelectorAll('section').forEach((section, index) => {
    if (index > 0) { // Skip hero section
      section.classList.add('reveal');
    }
  });

  // Add stagger reveal to grid containers
  document.querySelectorAll('.projects-grid, .skills-container').forEach(grid => {
    grid.classList.add('stagger-reveal');
  });

  // Add reveal-left and reveal-right to alternating content blocks
  document.querySelectorAll('.section-title').forEach(title => {
    title.classList.add('reveal-left');
  });

  // Update scroll progress bar
  function updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.scrollY;
    const progress = (scrollTop / documentHeight) * 100;
    
    progressBar.style.width = progress + '%';
    
    // Show/hide back to top button
    if (scrollTop > windowHeight / 2) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  // Reveal elements on scroll
  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150; // Distance from bottom of viewport to trigger animation
    
    // Handle standard reveal animations
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-reveal').forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
    
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Add a subtle highlight animation to the target section
        targetElement.classList.add('highlight');
        setTimeout(() => {
          targetElement.classList.remove('highlight');
        }, 1000);
        
        // If the target is '#home', scroll all the way to top. Otherwise, apply a fixed header offset.
        let targetPosition = targetId === '#home' ? 0 : targetElement.offsetTop - 70;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  

  // Parallax effect for hero section
  function parallaxEffect() {
    const hero = document.querySelector('.hero');
    if (hero) {
      const scrollPosition = window.pageYOffset;
      hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
  }

  // Initialize scroll animations
  function init() {
    updateScrollProgress();
    revealOnScroll();
    parallaxEffect();
    
    // Initial check for elements in viewport on page load
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-reveal').forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight) {
        element.classList.add('active');
      }
    });
  }

  // Event listeners
  window.addEventListener('scroll', function() {
    updateScrollProgress();
    revealOnScroll();
    parallaxEffect();
  });

  window.addEventListener('resize', init);

  // Initialize on page load
  init();

  // Preload animations
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 300);
});
