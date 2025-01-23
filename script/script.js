/* menu */
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

/* cart */
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalDisplay = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");


const cartButton = document.getElementById("cart-button");
const cartPopup = document.getElementById("cart-popup");
const closeCartButton = document.getElementById("close-cart-button");

cartButton.addEventListener("click", () => {
    cartPopup.classList.toggle("visible");
    cartPopup.classList.toggle("hidden");
});

closeCartButton.addEventListener("click", () => {
    cartPopup.classList.add("hidden");
    cartPopup.classList.remove("visible");
});


let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button class="remove-from-cart" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
        total += item.price; 
    });
    cartTotalDisplay.textContent = `Total: $${total.toFixed(2)}`;
    localStorage.setItem("cart", JSON.stringify(cart)); 
}

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        cart.push({ name, price });
        updateCart();
    });
});

cartItemsContainer.addEventListener("click", event => {
    if (event.target.classList.contains("remove-from-cart")) {
        const index = event.target.dataset.index;
        cart.splice(index, 1);
        updateCart();
    }
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
});

const removeAllButton = document.getElementById("remove-all");
removeAllButton.addEventListener("click", () => {
    cart = []; 
    updateCart(); 
});
updateCart();


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


/** Initialize Image Slider */
document.addEventListener('DOMContentLoaded', () => {
    initializeCardSlider(); // Initialize card slider functionality
});

document.addEventListener('DOMContentLoaded', () => {
    initializeImageSlider();
});

function initializeImageSlider() {
    const images = [
        { src: "../picts/nb banner.webp", link: "./products.html" },
        { src: "../picts/asic banner.webp", link: "./products.html" },
        { src: "../picts/adidas banner.webp", link: "./products.html" }
    ]; 

    let currentIndex = 0; 
    const slideContainer = document.querySelector('.Himg'); 
    const leftBtn = document.querySelector('.left-btn'); 
    const rightBtn = document.querySelector('.right-btn'); 

    // Check if slideContainer exists
    if (!slideContainer) return;

    // Function to show an image based on the index
    const showImage = (index) => {
        slideContainer.innerHTML = `<a href="${images[index].link}"><img src="${images[index].src}" class="slide-img" alt="Slide ${index + 1}"></a>`;
    };

    // Function to cycle through images automatically
    const cycleImage = () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    };

    // Event listener for left button click
    leftBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    // Event listener for right button click
    rightBtn?.addEventListener('click', cycleImage);

    // Automatically cycle images every 5 seconds
    setInterval(cycleImage, 5000);

    // Show the first image initially
    showImage(currentIndex);
}

/* Product slider*/
function initializeCardSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    const products = document.querySelectorAll('.flex-item');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    const controls = document.querySelector('.controls');
    const productsPerPage = 7;

    let currentPage = 0;
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Generate dots dynamically
    controls.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        controls.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    const updateSlider = () => {
        sliderContainer.style.transform = `translateX(${-currentPage * 100}%)`;
        dots.forEach((dot, index) => dot.classList.toggle('active', index === currentPage));
    };

    nextBtn.addEventListener('click', () => {
        currentPage = (currentPage + 1) % totalPages;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentPage = (currentPage - 1 + totalPages) % totalPages;
        updateSlider();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentPage = index;
            updateSlider();
        });
    });

    updateSlider();
}

document.addEventListener('DOMContentLoaded', initializeCardSlider);


