// Menu mobile
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("show");
    }
  });
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

// Formulaire de contact (démo front uniquement)
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (formStatus) {
      formStatus.textContent =
        "Merci pour votre message ! Ceci est une démo : sur la version finale, le formulaire sera connecté à une boîte mail ou une API.";
    }
    contactForm.reset();
  });
}

// Année dynamique du footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
