document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});


// ==============================
// Highlight Active Navigation Link
// ==============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


// ==============================
// Navbar Shadow on Scroll
// ==============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 5px 15px rgba(0,0,0,0.15)";

    } else {

        header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";

    }

});


// ==============================
// Contact Form - EmailJS
// ==============================

// Your EmailJS public configuration.
// These values are safe to use in frontend JavaScript.
//
// DO NOT put:
// - Gmail password
// - EmailJS private key
// - SMTP password
// - Any other secret credentials
//
// EmailJS setup:
// https://www.emailjs.com/docs/tutorial/creating-contact-form/

const EMAILJS_PUBLIC_KEY = "pkHrUM7IfzGltk2fj";
const EMAILJS_SERVICE_ID = "service_q4noejk";
const EMAILJS_TEMPLATE_ID = "template_d4c9lvl";


const form = document.getElementById("contact-form");
const submitButton = document.getElementById("contact-submit");
const statusMessage = document.getElementById("contact-status");


// Initialize EmailJS only when the contact form exists.
if (form && typeof emailjs !== "undefined") {

    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY,

        // Extra protection against automated/headless submissions.
        blockHeadless: true,

        // Prevent rapid repeated submissions.
        limitRate: {
            id: "contact-form",
            throttle: 10000
        }
    });


    form.addEventListener("submit", async function (e) {

        e.preventDefault();


        // Clear previous status.
        statusMessage.textContent = "";
        statusMessage.className = "contact-status";


        // ==============================
        // Basic Form Validation
        // ==============================

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }


        // ==============================
        // Honeypot Anti-Spam Check
        // ==============================

        const honeypot = form.elements.website;

        if (honeypot && honeypot.value.trim() !== "") {

            statusMessage.textContent =
                "Unable to send this message.";

            statusMessage.classList.add("error");

            return;
        }


        // ==============================
        // Check EmailJS Configuration
        // ==============================

        if (
            !EMAILJS_PUBLIC_KEY ||
            !EMAILJS_SERVICE_ID ||
            !EMAILJS_TEMPLATE_ID
        ) {

            statusMessage.textContent =
                "The contact form is not configured yet. Please try again later.";

            statusMessage.classList.add("error");

            console.error("EmailJS configuration is missing.");

            return;
        }


        // ==============================
        // Sending State
        // ==============================

        const originalButtonText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";


        try {

            // EmailJS automatically reads the form fields
            // according to their name attributes:
            //
            // name
            // email
            // message

            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                form
            );


            // ==============================
            // SUCCESS
            // ==============================

            statusMessage.textContent =
                "✅ Thank you! Your message has been sent successfully.";

            statusMessage.classList.add("success");


            // Clear form after successful sending.
            form.reset();


        } catch (error) {

            // ==============================
            // ERROR
            // ==============================

            console.error("EmailJS error:", error);

            statusMessage.textContent =
                "❌ Sorry, your message could not be sent. Please try again or email me directly.";

            statusMessage.classList.add("error");


        } finally {

            // Restore button.
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;

        }

    });


} else {

    console.error(
        "EmailJS or the contact form could not be loaded."
    );

}


// ==============================
// Simple Fade Animation
// ==============================

const cards = document.querySelectorAll(
    ".service-card, .portfolio-card, .testimonial"
);

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.2
});


cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "0.8s ease";

    observer.observe(card);

});


// ==============================
// AOS Animation
// ==============================

AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
    offset: 100,
    easing: "ease-in-out"
});


// ==============================
// Reel Popup
// ==============================

function openReel(video) {

    const popup = document.getElementById("reelPopup");
    const popupVideo = document.getElementById("popupVideo");

    popup.style.display = "flex";

    popupVideo.src =
        video.querySelector("source").src;

    popupVideo.load();
    popupVideo.play();

}


function closeReel() {

    const popup = document.getElementById("reelPopup");
    const popupVideo = document.getElementById("popupVideo");

    popup.style.display = "none";

    popupVideo.pause();
    popupVideo.currentTime = 0;
    popupVideo.removeAttribute("src");

}


// Close when clicking outside the video.
document.getElementById("reelPopup").addEventListener(
    "click",
    function (e) {

        if (e.target === this) {
            closeReel();
        }

    }
);