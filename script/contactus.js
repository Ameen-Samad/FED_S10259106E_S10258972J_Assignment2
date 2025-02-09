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

