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

const API_URL = "https://loginid-056f.restdb.io/rest/account";
const API_KEY = "6785c5c5630e8a5f6d0b141f";


async function fetchProducts() {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": API_KEY
            }
        });

        const products = await response.json();

        if (products.length === 0) {
            document.getElementById("product-list").innerHTML = "<p>No products available.</p>";
            return;
        }

        const featured = products[0];
        document.getElementById("featured-product").innerHTML = `
            <h3>${featured.name}</h3>
            <img src="${featured.image}" alt="Product Image">
            <p class="price">$${featured.price}</p>
        `;
        document.getElementById("text-info").innerHTML = `
            <h2>${featured.name}</h2>
            <p>${featured.description || "No description available."}</p>
        `;

        const productList = document.getElementById("product-list");
        productList.innerHTML = ""; 
        products.slice(1, 4).forEach(product => {
            const productCard = document.createElement("div");
            productCard.className = "small-box";
            productCard.innerHTML = `
                <img src="${product.image}" alt="Product">
                <h4>${product.name}</h4>
                <p class="price">$${product.price}</p>
            `;
            productList.appendChild(productCard);
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        document.getElementById("product-list").innerHTML = "<p>Failed to load products.</p>";
    }
}


fetchProducts();