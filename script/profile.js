const API_BASE_URL = 'https://loginid-056f.restdb.io/rest';
const API_KEY = '6785c5c5630e8a5f6d0b141f';

document.addEventListener('DOMContentLoaded', async () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        alert('No user logged in. Redirecting to login page...');
        window.location.href = 'login.html';
        return;
    }

    try {
        document.getElementById('user-name').textContent = loggedInUser.username;
        document.getElementById('user-info').textContent = `Email: ${loggedInUser.email}`;

        await fetchUserListings(loggedInUser._id);

        document.getElementById('user-profits').textContent = `$${loggedInUser.profits || 0.0}`;
        document.getElementById('user-sales').textContent = `${loggedInUser.sales || 0} items sold`;
    } catch (error) {
        console.error('Error loading profile data:', error);
        alert('Failed to load profile data.');
    }
});

async function fetchUserListings(userId) {
    const API_URL = `${API_BASE_URL}/listings`;
    const userListingsElement = document.getElementById('user-listings');

    try {
        const response = await fetch(`${API_URL}?q={"userId":"${userId}"}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': API_KEY,
            },
        });

        if (!response.ok) throw new Error(`Error fetching listings: ${response.status}`);

        const listings = await response.json();
        userListingsElement.innerHTML = '';

        if (listings.length === 0) {
            userListingsElement.innerHTML = '<p>No listings available.</p>';
        } else {
            listings.forEach(listing => {
                const listingCard = document.createElement('div');
                listingCard.classList.add('listing-card');

                listingCard.innerHTML = `
                    <img src="${listing.image}" alt="${listing.name}">
                    <h4>${listing.name}</h4>
                    <p>${listing.description}</p>
                    <p><strong>Price:</strong> $${listing.price}</p>
                    <p><strong>Gender:</strong> ${listing.gender}</p>
                `;

                userListingsElement.appendChild(listingCard);
            });
        }
    } catch (error) {
        console.error('Error fetching listings:', error);
        alert('Failed to load listings.');
    }
}

document.addEventListener('DOMContentLoaded', () => initializeDropdown());

function initializeDropdown() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.getElementById('dropdownContent');

    if (dropdown && dropdownContent) {
        dropdown.addEventListener('mouseenter', () => dropdownContent.classList.add('show'));
        dropdown.addEventListener('mouseleave', () => dropdownContent.classList.remove('show'));
    }
}

window.onload = function () {
    const menuToggle = document.getElementById("toggleMenu");
    const navbar = document.getElementById("nav");

    function toggleMenu() {
        if (navbar.style.display === 'flex') {
            navbar.style.display = 'none';
            menuToggle.textContent = "☰ Menu";
        } else {
            navbar.style.display = 'flex';
            menuToggle.textContent = "✖ Close";
        }
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 650) {
            navbar.style.display = "flex";
        } else {
            navbar.style.display = "none";
        }
    });

    menuToggle.addEventListener('click', toggleMenu);
};

