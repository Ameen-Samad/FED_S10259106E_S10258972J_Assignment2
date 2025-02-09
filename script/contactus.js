/* Initialize Dropdown Menu */
document.addEventListener('DOMContentLoaded', () => {
    initializeDropdown(); 
});
function initializeDropdown() {
    const dropdown = document.querySelector('.dropdown'); 
    const dropdownContent = document.getElementById('dropdownContent'); 

    if (dropdown && dropdownContent) {
        dropdown.addEventListener('mouseenter', () => dropdownContent.classList.add('show'));
        dropdown.addEventListener('mouseleave', () => dropdownContent.classList.remove('show'));
    }
}

/* navbar menu */
window.onload = function() {
    const menuToggle = document.getElementById("toggleMenu")
    const navbar = document.getElementById("nav");

    function toggleMenu() {
        if (navbar.style.display === 'flex'){
            navbar.style.display = 'none';
            menuToggle.textContent = "☰ Menu";
        } else {
            navbar.style.display = 'flex';
            menuToggle.textContent = "✖ Close"; 
        }
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 650) {
            nav.style.display = "flex";
        } else {
            nav.style.display = "none";
        }
    });
    menuToggle.addEventListener('click', toggleMenu)
}


/* Contact Form */
document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("form-message");

    if (!name) {
        formMessage.textContent = "Please enter your name.";
        formMessage.style.color = "#ff6600";
        return;
    }

    if (!validateEmail(email)) {
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.style.color = "#ff6600";
        return;
    }

    if (!message) {
        formMessage.textContent = "Please enter a message.";
        formMessage.style.color = "#ff6600";
        return;
    }

    const contactData = {
        name: name,
        email: email,
        message: message,
    };

    try {
        const BASE_URL = 'https://loginid-056f.restdb.io/rest/contactus'; 
        const API_KEY = '6785c5c5630e8a5f6d0b141f'; 

        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': API_KEY,
            },
            body: JSON.stringify(contactData),
        });

        if (response.ok) {
            formMessage.textContent = "Thank you for contacting us! Your message has been saved.";
            formMessage.style.color = "black";
            document.getElementById("contactForm").reset();
        } else {
            formMessage.textContent = "Failed to send your message. Please try again later.";
            formMessage.style.color = "#ff6600";
        }
    } catch (error) {
        console.error("Error saving contact data:", error);
        formMessage.textContent = "An error occurred. Please try again later.";
        formMessage.style.color = "#ff6600";
    }
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const menuToggle = document.getElementById("toggleMenu");
const navbar = document.getElementById("nav");

function toggleMenu() {
    if (navbar.style.display === 'flex') {
        navbar.style.display = 'none';
        menuToggle.textContent = "☰ Menu";
    } else {
        navbar.style.display = 'flex';
        menuToggle.textContent = "✖ Close";
    }
}

window.addEventListener("resize", () => {
    if (window.innerWidth >= 650) {
        navbar.style.display = "flex";
    } else {
        navbar.style.display = "none";
    }
});

menuToggle.addEventListener('click', toggleMenu);
