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

/* Filter */
document.addEventListener("DOMContentLoaded", function () {
    const filters = document.querySelectorAll(".filter");
    const products = document.querySelectorAll(".flex-item");
  
    filters.forEach(filter => {
        filter.addEventListener("change", applyFilters);
    });
  
    function applyFilters() {
        const selectedGenders = getSelectedFilters("gender");
        const selectedPrices  = getSelectedFilters("price");
        const selectedBrands  = getSelectedFilters("brand");
  
        products.forEach(product => {
            const productName = product.querySelector("p").textContent;

            let productPrice = product.dataset.price
                ? parseFloat(product.dataset.price)
                : parseFloat(product.querySelector("p:nth-of-type(2)").textContent.replace("SG$", ""));

            const productBrand = product.dataset.brand;
            
            const productGender = productName.includes("(W)") ? "women" : "men";

            const matchesPrice = selectedPrices.length === 0 ||
                                 selectedPrices.includes("") ||
                                 selectedPrices.includes(getPriceRange(productPrice));

            const matchesGender = selectedGenders.length === 0 ||
                                  selectedGenders.includes("all") ||
                                  selectedGenders.includes(productGender);
            const matchesBrand = selectedBrands.length === 0 ||
                                 selectedBrands.includes(productBrand);

            if (matchesGender && matchesPrice && matchesBrand) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    }

    function getSelectedFilters(filterName) {
        return Array.from(document.querySelectorAll(`input[name='${filterName}']:checked`))
                    .map(input => input.value);
    }

    function getPriceRange(price) {
        if (price < 100) return "below100";
        if (price >= 100 && price <= 200) return "100to200";
        if (price > 200 && price <= 300) return "200to300";
        return "over300";
    }
  });

  