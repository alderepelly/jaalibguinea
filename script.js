// Fade-in animations on scroll
const elements = document.querySelectorAll(".fade-in, .fade-up");

function reveal() {
    let windowHeight = window.innerHeight;

    elements.forEach(el => {
        let position = el.getBoundingClientRect().top;

        if (position < windowHeight - 50) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", reveal);
reveal();