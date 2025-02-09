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


/* Cart */
document.addEventListener('DOMContentLoaded', () => {
    const productContainers = document.querySelectorAll('.product-container');
    productContainers.forEach(container => {
      const addToCartBtn = container.querySelector('#add-to-cart-btn');
      const sizeButtons = container.querySelectorAll('.size-btn');
      const mainImage = container.querySelector('img');
      const productName = container.querySelector('.product-details h1').textContent;
      const priceText = container.querySelector('.price').textContent;
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    
      let selectedSize = null;
    
  
      sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
          sizeButtons.forEach(btn => btn.classList.remove('selected'));
          button.classList.add('selected');
          selectedSize = button.dataset.size;
          addToCartBtn.disabled = false;
        });
      });
    
      addToCartBtn.addEventListener('click', () => {
        if (!selectedSize) return; 
    
        const product = {
          name: productName,
          price: price,
          size: selectedSize,
          image: mainImage.src
        };
    
        addToCart(product);
    
        addToCartBtn.disabled = true;
        sizeButtons.forEach(btn => btn.classList.remove('selected'));
        selectedSize = null;
      });
    });
    
    const cartButton = document.getElementById("cart-button");
    const cartPopup = document.getElementById("cart-popup");
    const closeCartButton = document.getElementById("close-cart-button");
    const removeAllButton = document.getElementById("remove-all");
    
    cartButton.addEventListener("click", () => {
      updateCartDisplay();
      cartPopup.classList.toggle("visible");
      cartPopup.classList.toggle("hidden");
    });
  
    closeCartButton.addEventListener("click", () => {
      cartPopup.classList.add("hidden");
      cartPopup.classList.remove("visible");
    });
  
    removeAllButton.addEventListener("click", () => {
      localStorage.removeItem("cart");
      updateCartDisplay();
    });
  
    const checkoutButton = document.getElementById("checkout-button");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            cartPopup.classList.add("hidden");
            cartPopup.classList.remove("visible");
  
            const checkoutAnimation = document.getElementById("checkout-animation");
            checkoutAnimation.classList.remove("hidden");
  
            const script = document.createElement("script");
            script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
            script.type = "module";
            document.head.appendChild(script);
  
            setTimeout(() => {
                window.location.href = "./payment.html";
            }, 6000);
        });
    }
  });
  
  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartDisplay();
  
    const confirmation = document.createElement('div');
    confirmation.className = 'add-confirmation';
    confirmation.textContent = 'Added to cart!';
    document.body.appendChild(confirmation);
    
    setTimeout(() => {
      confirmation.remove();
    }, 2000);
  }
  
  function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (!cartItemsContainer || !cartTotalDisplay) return;
  
    cartItemsContainer.innerHTML = '';
    let total = 0;
  
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
  
    document.querySelectorAll('.remove-from-cart').forEach(button => {
      button.addEventListener('click', () => {
        removeCartItem(button.dataset.index);
      });
    });
  }
  
  function removeCartItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }


/* Image Slider */
document.addEventListener('DOMContentLoaded', () => {
    initializeCardSlider(); 
});

document.addEventListener('DOMContentLoaded', () => {
    initializeImageSlider();
});

function initializeImageSlider() {
    const images = [
        { src: "picts/nb banner.webp", link: "./new.html" },
        { src: "picts/asic banner.webp", link: "./new.html" },
        { src: "picts/adidas banner.webp", link: "./new.html" }
    ]; 

    let currentIndex = 0; 
    const slideContainer = document.querySelector('.Himg'); 
    const leftBtn = document.querySelector('.left-btn'); 
    const rightBtn = document.querySelector('.right-btn'); 


    if (!slideContainer) return;

    const showImage = (index) => {
        slideContainer.innerHTML = `<a href="${images[index].link}"><img src="${images[index].src}" class="slide-img" alt="Slide ${index + 1}"></a>`;
    };

    const cycleImage = () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    };

    leftBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    rightBtn?.addEventListener('click', cycleImage);
    setInterval(cycleImage, 5000);
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
    const totalPages = 2;

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


