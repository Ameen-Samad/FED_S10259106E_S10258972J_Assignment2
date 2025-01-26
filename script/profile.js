document.addEventListener('DOMContentLoaded', async () => {
    const BASE_URL = 'https://loginid-056f.restdb.io/rest/account';
    const API_KEY = '6785c5c5630e8a5f6d0b141f';

    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      alert('No user logged in. Redirecting to login page...');
      window.location.href = 'login.html';
      return;
    }
  
    try {
      const userNameElement = document.getElementById('user-name');
      const userInfoElement = document.getElementById('user-info');
      const userListingsElement = document.getElementById('user-listings');
      const userProfitsElement = document.getElementById('user-profits');
      const userSalesElement = document.getElementById('user-sales');
  
      if (userNameElement) userNameElement.textContent = loggedInUser.username;
      if (userInfoElement) userInfoElement.textContent = `Email: ${loggedInUser.email}`;

      const listingsResponse = await fetch(`${BASE_URL}?q={"userId":"${loggedInUser._id}"}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': API_KEY,
        },
      });
  
      if (!listingsResponse.ok) {
        throw new Error(`Error fetching listings: ${listingsResponse.status}`);
      }
  
      const listings = await listingsResponse.json();
  
      if (userListingsElement) {
        userListingsElement.innerHTML = '';
        if (listings.length === 0) {
          userListingsElement.innerHTML = '<p>No listings available.</p>';
        } else {
          listings.forEach((listing) => {
            const listingElement = document.createElement('p');
            listingElement.textContent = `${listing.title} - ${listing.price}`;
            userListingsElement.appendChild(listingElement);
          });
        }
      }

      if (userProfitsElement) userProfitsElement.textContent = `$${loggedInUser.profits || 0.0}`;
      if (userSalesElement) userSalesElement.textContent = `${loggedInUser.sales || 0} items sold`;
    } catch (error) {
      console.error('Error loading profile data:', error);
      alert('Failed to load profile data. Please try again later.');
    }
  });


  async function addListing(userId, newListing) {
    const BASE_URL = 'https://loginid-056f.restdb.io/rest/account';
    const API_KEY = '6785c5c5630e8a5f6d0b141f';
  
    try {
      const response = await fetch(`${BASE_URL}/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': API_KEY,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching user data: ${response.status}`);
      }
  
      const user = await response.json();

      const updatedListings = user.listings || [];
      updatedListings.push(newListing);

      const updateResponse = await fetch(`${BASE_URL}/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': API_KEY,
        },
        body: JSON.stringify({ listings: updatedListings }),
      });
  
      if (updateResponse.ok) {
        console.log('Listing added successfully!');
      } else {
        console.error('Failed to update listings:', updateResponse.status);
      }
    } catch (error) {
      console.error('Error adding listing:', error);
    }
  }

  const userId = 'user123'; 
  const newListing = {
    title: 'Gaming Laptop',
    description: 'High-performance gaming laptop, 16GB RAM, 1TB SSD.',
    price: 1200.0,
    createdAt: new Date().toISOString(),
  };
  addListing(userId, newListing);


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