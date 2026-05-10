// Menu mobile
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  // accessibility: expose expanded state
  navToggle.setAttribute('aria-expanded', 'false');

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // close menu when a link is clicked
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("show");
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // close on Escape and click outside
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!navLinks.contains(target) && target !== navToggle && navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Hero slider
const heroSlider = document.getElementById("heroSlider");

if (heroSlider) {
  const slides = Array.from(heroSlider.querySelectorAll(".hero-slide"));
  const dots = Array.from(heroSlider.querySelectorAll(".hero-slider-dot"));
  const prevButton = heroSlider.querySelector('[data-direction="prev"]');
  const nextButton = heroSlider.querySelector('[data-direction="next"]');
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let currentSlide = slides.findIndex((slide) => slide.classList.contains("is-active"));
  let autoplayId = null;

  if (currentSlide < 0) {
    currentSlide = 0;
  }

  const revealSlideContent = (slide) => {
    slide
      .querySelectorAll(".hero-text, .hero-card")
      .forEach((item) => item.classList.add("is-visible"));
  };

  const updateSlider = (nextIndex) => {
    currentSlide = (nextIndex + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      const isActive = index === currentSlide;
      slide.classList.toggle("is-active", isActive);
      if (isActive) {
        revealSlideContent(slide);
      }
    });

    dots.forEach((dot, index) => {
      const isActive = index === currentSlide;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  };

  const stopAutoplay = () => {
    if (autoplayId) {
      window.clearInterval(autoplayId);
      autoplayId = null;
    }
  };

  const startAutoplay = () => {
    if (reduceMotion || slides.length < 2) {
      return;
    }

    stopAutoplay();
    autoplayId = window.setInterval(() => {
      updateSlider(currentSlide + 1);
    }, 6500);
  };

  prevButton?.addEventListener("click", () => {
    updateSlider(currentSlide - 1);
    startAutoplay();
  });

  nextButton?.addEventListener("click", () => {
    updateSlider(currentSlide + 1);
    startAutoplay();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      updateSlider(index);
      startAutoplay();
    });
  });

  heroSlider.addEventListener("mouseenter", stopAutoplay);
  heroSlider.addEventListener("mouseleave", startAutoplay);
  heroSlider.addEventListener("focusin", stopAutoplay);
  heroSlider.addEventListener("focusout", startAutoplay);

  revealSlideContent(slides[currentSlide]);
  updateSlider(currentSlide);
  startAutoplay();
}

// Filtrage des services
const filterButtons = document.querySelectorAll(".filter-btn");
const serviceCards = document.querySelectorAll(".service-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    serviceCards.forEach((card) => {
      const categories = (card.getAttribute("data-category") || "").split(" ");
      if (filter === "all" || categories.includes(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// -------------------------------
// FORMULAIRE DE CONTACT EmailJS
// -------------------------------
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
    formStatus.textContent = "Envoi en cours...";
    formStatus.classList.remove('success','error');

        // Identifiants EmailJS ✔ OFFICIELS
        const SERVICE_ID = "service_f7gnu9n";
        const TEMPLATE_ID = "template_83jmosw";

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm)
            .then(() => {
        formStatus.textContent = "Message envoyé !";
        formStatus.classList.add('success');
        contactForm.reset();
        setTimeout(() => { formStatus.textContent = ''; formStatus.classList.remove('success'); }, 6000);
            })
            .catch(error => {
        formStatus.textContent = "Erreur lors de l'envoi. Veuillez réessayer plus tard.";
        formStatus.classList.add('error');
        console.error("Erreur EmailJS :", error);
        setTimeout(() => { formStatus.classList.remove('error'); }, 6000);
            });
    });
}

// Année dynamique du footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Simple reveal-on-scroll animation
const revealItems = document.querySelectorAll(
  ".hero-text, .hero-card, .card, .highlight, .process-step, .chip, .contact-form, .footer-grid > div"
);

if ("IntersectionObserver" in window && revealItems.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 40, 240)}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
