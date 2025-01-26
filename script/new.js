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

const updateGenderLabel = (product, gender) => {
  const nameElement = product.querySelector("p:nth-child(2)");
  const currentText = nameElement.textContent;
  
  if (gender === "women") {
    if (!currentText.startsWith("(W) ")) {
      nameElement.textContent = "(W) " + currentText;
    }
  } else {
    nameElement.textContent = currentText.replace(/^\(W\) /, "");
  }
};

products.forEach(product => {
  const gender = product.dataset.gender;
  updateGenderLabel(product, gender);
});

filters.forEach(filter => {
  filter.addEventListener("change", () => {
    const activeFilters = {
      gender: Array.from(filters)
        .filter(f => f.checked && f.name === "gender")
        .map(f => f.value),
      price: Array.from(filters)
        .filter(f => f.checked && f.name === "price")
        .map(f => f.value),
      brand: Array.from(filters)
        .filter(f => f.checked && f.name !== "gender" && f.name !== "price")
        .map(f => f.value),
    };

    products.forEach(product => {
      const brand = product.dataset.brand;
      const price = parseFloat(product.dataset.price);
      const gender = product.dataset.gender;

      updateGenderLabel(product, gender);

      const genderMatch = activeFilters.gender.length === 0 || 
                          activeFilters.gender.includes("all") || 
                          activeFilters.gender.includes(gender);
      
      const priceMatch = activeFilters.price.length === 0 || 
                         activeFilters.price.includes(product.dataset.price);
      
      const brandMatch = activeFilters.brand.length === 0 || 
                         activeFilters.brand.includes(brand);

      product.style.display = (genderMatch && priceMatch && brandMatch) 
        ? "block" 
        : "none";
    });
  });
});
