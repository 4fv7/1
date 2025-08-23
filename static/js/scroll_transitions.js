document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  document.querySelectorAll('section').forEach((s,i)=> {
    if (i>0) s.classList.add('reveal');
  });
  document.querySelectorAll('.projects-grid, .skills-container')
    .forEach(g => g.classList.add('stagger-reveal'));
  document.querySelectorAll('.section-title')
    .forEach(t => t.classList.add('reveal-left'));

  function updateScrollProgress() {
    const windowH = innerHeight;
    const docH = document.documentElement.scrollHeight - windowH;
    const scrollTop = scrollY;
    const progress = docH ? (scrollTop / docH) * 100 : 0;
    progressBar.style.width = progress + '%';
  }

  function revealOnScroll() {
    const windowH = innerHeight;
    const trigger = 150;
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-reveal')
      .forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < windowH - trigger) el.classList.add('active');
      });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';
    sections.forEach(sec => {
      if (pageYOffset >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
  }

  // Removed highlight effect (no CSS defined); smooth scroll only
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const id = anchor.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      const top = id === '#home' ? 0 : target.offsetTop - 70;
      scrollTo({ top, behavior: 'smooth' });
    });
  });

  function init() {
    updateScrollProgress();
    revealOnScroll();
    // Removed parallaxEffect (unused background)
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-reveal')
      .forEach(el => {
        if (el.getBoundingClientRect().top < innerHeight) el.classList.add('active');
      });
  }

  addEventListener('scroll', () => {
    updateScrollProgress();
    revealOnScroll();
  });

  addEventListener('resize', init);

  init();
  setTimeout(()=> document.body.classList.add('loaded'), 300);
});
