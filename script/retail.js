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



const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".flex-item");

filters.forEach(filter => {
  filter.addEventListener("change", () => {
    const activeFilters = {
      brand: Array.from(filters)
        .filter(f => f.checked && f.value !== "Under 200")
        .map(f => f.value),
      price: Array.from(filters).some(f => f.checked && f.value === "Under 200"),
    };

    products.forEach(product => {
      const brand = product.dataset.brand;
      const price = parseFloat(product.dataset.price);

      if (
        (activeFilters.brand.length === 0 || activeFilters.brand.includes(brand)) &&
        (!activeFilters.price || price <= 200)
      ) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });
});