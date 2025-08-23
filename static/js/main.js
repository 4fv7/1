// static/js/main.js
document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const body = document.body;
  const html = document.documentElement;
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const contactForm = document.getElementById("contact-form");
  const hex = document.querySelector(".hexagon-path");

  /* Welcome screen lock */
  if (welcomeScreen) {
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.width = "100%";
    body.style.height = "100%";

    // CSS fadeOut ends at 4s (delay 3s + 1s). Hide after 4s to avoid abrupt cut.
    setTimeout(() => {
      welcomeScreen.style.display = "none";
      body.style.overflow = "auto";
      html.style.overflow = "auto";
      body.style.position = "static";
      body.style.width = "auto";
      body.style.height = "auto";
    }, 3500);
  }

  /* Mobile nav */
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    navLinks.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* Contact form */
  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      if (!contactForm.name.value.trim() ||
          !contactForm.email.value.trim() ||
          !contactForm.message.value.trim()) {
        alert("Please fill in all fields.");
        return;
      }
      emailjs.sendForm("service_l2iv37h", "template_ii62d1m", contactForm)
        .then(() => {
          alert("Message sent successfully!");
          contactForm.reset();
        })
        .catch(err => {
          console.error("EmailJS error:", err);
          alert("Failed to send message. Please try again later.");
        });
    });
  }

  /* Hex path length */
  if (hex && hex.getTotalLength) {
    hex.style.setProperty("--hex-length", hex.getTotalLength());
  }
});
