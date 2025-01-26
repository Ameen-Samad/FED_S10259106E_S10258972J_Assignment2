document.getElementById("contact-form").addEventListener("submit", async function(event) {
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
        const BASE_URL = 'https://loginid-056f.restdb.io/rest/contactus?max=2'; 
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
            formMessage.style.color = "green";
            document.getElementById("contact-form").reset();
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


/* Initialize Dropdown Menu */
document.addEventListener('DOMContentLoaded', () => {
    initializeDropdown(); // Initialize dropdown menu functionality
});
function initializeDropdown() {
    const dropdown = document.querySelector('.dropdown'); // Select the dropdown element
    const dropdownContent = document.getElementById('dropdownContent'); // Select the dropdown content element

    // Check if both dropdown and dropdownContent exist
    if (dropdown && dropdownContent) {
        // Show dropdown content on mouse enter
        dropdown.addEventListener('mouseenter', () => dropdownContent.classList.add('show'));
        // Hide dropdown content on mouse leave
        dropdown.addEventListener('mouseleave', () => dropdownContent.classList.remove('show'));
    }
}