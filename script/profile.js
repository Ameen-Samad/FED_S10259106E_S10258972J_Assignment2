document.addEventListener('DOMContentLoaded', async () => {
  const API_BASE_URL = 'https://loginid-056f.restdb.io/rest';
  const API_KEY = '6785c5c5630e8a5f6d0b141f';

  // Get the logged-in user from session storage
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

  if (!loggedInUser) {
      alert('No user logged in. Redirecting to login page...');
      window.location.href = 'login.html';
      return;
  }

  try {
      // Set user details
      document.getElementById('user-name').textContent = loggedInUser.username;
      document.getElementById('user-info').textContent = `Email: ${loggedInUser.email}`;

      // Fetch and display user listings
      await fetchUserListings(loggedInUser._id);

      // Display profits and sales (if available)
      document.getElementById('user-profits').textContent = `$${loggedInUser.profits || 0.0}`;
      document.getElementById('user-sales').textContent = `${loggedInUser.sales || 0} items sold`;
  } catch (error) {
      console.error('Error loading profile data:', error);
      alert('Failed to load profile data.');
  }
});

// Fetch listings associated with the logged-in user
async function fetchUserListings(userId) {
  const API_URL = 'https://loginid-056f.restdb.io/rest/listings';
  const API_KEY = '6785c5c5630e8a5f6d0b141f';
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
      userListingsElement.innerHTML = ''; // Clear previous content

      if (listings.length === 0) {
          userListingsElement.innerHTML = '<p>No listings available.</p>';
      } else {
          listings.forEach((listing) => {
              const listingCard = document.createElement('div');
              listingCard.classList.add('listing-card');

              listingCard.innerHTML = `
                  <img src="${listing.image || 'default-image.jpg'}" alt="${listing.name}">
                  <h4>${listing.name}</h4>
                  <p>${listing.description}</p>
                  <p><strong>Price:</strong> $${listing.price}</p>
              `;

              userListingsElement.appendChild(listingCard);
          });
      }
  } catch (error) {
      console.error('Error fetching listings:', error);
      alert('Failed to load listings.');
  }
}

// Initialize dropdown menu
document.addEventListener('DOMContentLoaded', () => initializeDropdown());

function initializeDropdown() {
  const dropdown = document.querySelector('.dropdown');
  const dropdownContent = document.getElementById('dropdownContent');

  if (dropdown && dropdownContent) {
      dropdown.addEventListener('mouseenter', () => dropdownContent.classList.add('show'));
      dropdown.addEventListener('mouseleave', () => dropdownContent.classList.remove('show'));
  }
}

