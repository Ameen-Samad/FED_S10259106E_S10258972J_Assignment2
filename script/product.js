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



document.addEventListener('DOMContentLoaded', () => {
    // --- For Each Product Container (Multiple Items on Page) ---
    const productContainers = document.querySelectorAll('.product-container');
    productContainers.forEach(container => {
      // Get the "Add to Cart" button within this container
      const addToCartBtn = container.querySelector('#add-to-cart-btn');
      // Get all size buttons within this container
      const sizeButtons = container.querySelectorAll('.size-btn');
      // Get the product image (assumes the first image in the container is the main image)
      const mainImage = container.querySelector('img');
      // Get the product name and price from the container
      const productName = container.querySelector('.product-details h1').textContent;
      const priceText = container.querySelector('.price').textContent;
      // Remove any non-numeric characters (like "$") and parse the price
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    
      let selectedSize = null;
    
      // --- Size Selection for This Product ---
      sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Remove the "selected" class from all buttons in this container
          sizeButtons.forEach(btn => btn.classList.remove('selected'));
          // Mark the clicked button as selected
          button.classList.add('selected');
          selectedSize = button.dataset.size;
          // Enable the "Add to Cart" button once a size is chosen
          addToCartBtn.disabled = false;
        });
      });
    
      // --- Add to Cart for This Product ---
      addToCartBtn.addEventListener('click', () => {
        if (!selectedSize) return; // Safety check
    
        const product = {
          name: productName,
          price: price,
          size: selectedSize,
          image: mainImage.src
        };
    
        addToCart(product);
    
        // Optionally, reset the selection after adding the product
        addToCartBtn.disabled = true;
        sizeButtons.forEach(btn => btn.classList.remove('selected'));
        selectedSize = null;
      });
    });
    
    // --- Cart Popup Event Listeners ---
    const cartButton = document.getElementById("cart-button");
    const cartPopup = document.getElementById("cart-popup");
    const closeCartButton = document.getElementById("close-cart-button");
    const removeAllButton = document.getElementById("remove-all");
    
    // When clicking "View Cart", update and toggle the popup's visibility
    cartButton.addEventListener("click", () => {
      updateCartDisplay();
      cartPopup.classList.toggle("visible");
      cartPopup.classList.toggle("hidden");
    });
    
    // Hide the cart popup when clicking the "Close" button
    closeCartButton.addEventListener("click", () => {
      cartPopup.classList.add("hidden");
      cartPopup.classList.remove("visible");
    });
    
    // Clear the entire cart when clicking "Remove All"
    removeAllButton.addEventListener("click", () => {
      localStorage.removeItem("cart");
      updateCartDisplay();
    });
  });
    
  // --- Add a Product to the Cart ---
  function addToCart(product) {
    // Retrieve existing cart from localStorage (or use an empty array)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartDisplay();
    
    // Show a temporary confirmation message
    const confirmation = document.createElement('div');
    confirmation.className = 'add-confirmation';
    confirmation.textContent = 'Added to cart!';
    document.body.appendChild(confirmation);
    
    setTimeout(() => {
      confirmation.remove();
    }, 2000);
  }
    
  // --- Update the Cart Popup Display ---
  function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (!cartItemsContainer || !cartTotalDisplay) return;
    
    // Clear any existing items
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    // Loop through each item in the cart and create its display element
    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
      itemDiv.innerHTML = `
        <div>
            <p>${item.name}</p>
            <p>Size: US ${item.size}</p>
            <p>$${item.price.toFixed(2)}</p>
        </div>
        <button class="remove-from-cart" data-index="${index}">Remove</button>
      `;
      cartItemsContainer.appendChild(itemDiv);
      total += item.price;
    });
    
    cartTotalDisplay.textContent = `$${total.toFixed(2)}`;
    
    // Attach event listeners for each "Remove" button
    document.querySelectorAll('.remove-from-cart').forEach(button => {
      button.addEventListener('click', () => {
        removeCartItem(button.dataset.index);
      });
    });
  }
    
  // --- Remove an Item from the Cart ---
  function removeCartItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }
  
  
  