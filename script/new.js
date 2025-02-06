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

  // Add change event to all filter checkboxes
  filters.forEach(filter => {
      filter.addEventListener("change", applyFilters);
  });

  function applyFilters() {
      // Retrieve all selected filters from each group
      const selectedGenders = getSelectedFilters("gender");
      const selectedPrices  = getSelectedFilters("price");
      const selectedBrands  = getSelectedFilters("brand");

      products.forEach(product => {
          // Get the product name from the first <p> element
          const productName = product.querySelector("p").textContent;

          // Get product price from data-price attribute if available, else extract it from the text content.
          let productPrice = product.dataset.price
              ? parseFloat(product.dataset.price)
              : parseFloat(product.querySelector("p:nth-of-type(2)").textContent.replace("SG$", ""));

          // Determine the product brand using data-brand attribute if present.
          const productBrand = product.dataset.brand ? product.dataset.brand : getProductBrandFromName(productName);
          
          // Identify gender: products with "(W)" in the name are women's products.
          const productGender = productName.includes("(W)") ? "women" : "men";

          // Check if the product matches each of the selected filters.
          const matchesGender = selectedGenders.length === 0 || selectedGenders.includes("all") || selectedGenders.includes(productGender);
          const matchesPrice  = selectedPrices.length  === 0 || selectedPrices.includes(getPriceRange(productPrice));
          const matchesBrand  = selectedBrands.length  === 0 || selectedBrands.includes(productBrand);

          // Display product if it matches all filters; otherwise, hide it.
          if (matchesGender && matchesPrice && matchesBrand) {
              product.style.display = "block";
          } else {
              product.style.display = "none";
          }
      });
  }

  // Helper function to return all selected values for a given filter name.
  function getSelectedFilters(filterName) {
      return Array.from(document.querySelectorAll(`input[name='${filterName}']:checked`)).map(input => input.value);
  }

  // Determine the price range based on the product price.
  function getPriceRange(price) {
      if (price < 100) return "below100";
      if (price >= 100 && price <= 200) return "100to200";
      if (price > 200 && price <= 300) return "200to300";
      return "over300";
  }

  // Fallback to determine the product brand based on its name, if no data-brand is present.
  function getProductBrandFromName(name) {
      if (name.includes("Nike")) return "Nike";
      if (name.includes("Adidas")) return "Adidas";
      if (name.includes("NB")) return "New Balance";
      return "Other";
  }
});

