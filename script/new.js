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



document.addEventListener("DOMContentLoaded", function () {
    const filters = document.querySelectorAll(".filter");
    const products = document.querySelectorAll(".flex-item");
  
    // Attach change events to all filter checkboxes
    filters.forEach(filter => {
        filter.addEventListener("change", applyFilters);
    });
  
    function applyFilters() {
        // Retrieve selected filter values
        const selectedGenders = getSelectedFilters("gender");
        const selectedPrices  = getSelectedFilters("price");
        const selectedBrands  = getSelectedFilters("brand");
  
        products.forEach(product => {
            // Get the product name from the first <p> element
            const productName = product.querySelector("p").textContent;
  
            // Retrieve the product price from the data attribute if available; else, parse from text.
            let productPrice = product.dataset.price
                ? parseFloat(product.dataset.price)
                : parseFloat(product.querySelector("p:nth-of-type(2)").textContent.replace("SG$", ""));
  
            // Get the product brand using the data-brand attribute exclusively.
            const productBrand = product.dataset.brand;
            
            // Identify gender: products with "(W)" in the name are for women.
            const productGender = productName.includes("(W)") ? "women" : "men";
  
            // For the price filter, if the "All Prices" checkbox is checked (value is ""), then ignore filtering.
            const matchesPrice = selectedPrices.length === 0 ||
                                 selectedPrices.includes("") ||
                                 selectedPrices.includes(getPriceRange(productPrice));
  
            // Check if the product matches the gender and brand filters.
            const matchesGender = selectedGenders.length === 0 ||
                                  selectedGenders.includes("all") ||
                                  selectedGenders.includes(productGender);
            const matchesBrand = selectedBrands.length === 0 ||
                                 selectedBrands.includes(productBrand);
  
            // Show the product if it matches all active filters.
            if (matchesGender && matchesPrice && matchesBrand) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    }
  
    // Helper: Returns all selected filter values for the given filter name.
    function getSelectedFilters(filterName) {
        return Array.from(document.querySelectorAll(`input[name='${filterName}']:checked`))
                    .map(input => input.value);
    }
  
    // Helper: Categorize a numeric price into a price range.
    function getPriceRange(price) {
        if (price < 100) return "below100";
        if (price >= 100 && price <= 200) return "100to200";
        if (price > 200 && price <= 300) return "200to300";
        return "over300";
    }
  });
  

