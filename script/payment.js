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



/* Pop up and lottie */
const modal = document.getElementById('paymentSuccessModal');
    const closeButton = document.querySelector('.modal .close');
    const paymentForm = document.querySelector('.payment-form');
    const lottieContainer = document.getElementById('lottieContainer');
    const paymentContainer = document.querySelector('.payment-container');
    let modalRedirectTimeout; 

    paymentForm.addEventListener('submit', function(e) {
      e.preventDefault(); 

      paymentContainer.style.display = 'none';

      lottieContainer.style.display = 'flex';

      setTimeout(function() {
        lottieContainer.style.display = 'none';
        modal.style.display = 'block';

        modalRedirectTimeout = setTimeout(function() {
          window.location.href = 'index.html';
        }, 3000);
      }, 3000);
    });

    function closeModalAndRedirect() {
      modal.style.display = 'none';
      clearTimeout(modalRedirectTimeout); 
      window.location.href = 'index.html';
    }

    closeButton.addEventListener('click', closeModalAndRedirect);

    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeModalAndRedirect();
      }
    });