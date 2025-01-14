// Toggle between login and signup forms
document.getElementById('toggle-login').addEventListener('click', () => {
  document.getElementById('login-container').classList.remove('hidden');
  document.getElementById('signup-container').classList.add('hidden');
});

document.getElementById('toggle-signup').addEventListener('click', () => {
  document.getElementById('signup-container').classList.remove('hidden');
  document.getElementById('login-container').classList.add('hidden');
});

// Login functionality
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const errorElement = document.getElementById('login-error');

  try {
    const response = await fetch('https://loginid-056f.restdb.io/rest/account', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-apikey': '6785c5c5630e8a5f6d0b141f',
      },
    });

    const users = await response.json();
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      alert('Login successful!');
      window.location.href = 'profile.html';
    } else {
      errorElement.textContent = 'Invalid email or password';
      errorElement.style.display = 'block';
    }
  } catch (error) {
    console.error('Error:', error);
    errorElement.textContent = 'An error occurred. Please try again.';
    errorElement.style.display = 'block';
  }
});

// Signup functionality
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const successElement = document.getElementById('signup-success');
  const errorElement = document.getElementById('signup-error');

  try {
    const response = await fetch('https://loginid-056f.restdb.io/rest/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-apikey': '6785c5c5630e8a5f6d0b141f',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      successElement.textContent = 'Signup successful!';
      successElement.style.display = 'block';
      errorElement.style.display = 'none';
      document.getElementById('signup-form').reset();
    } else {
      const error = await response.json();
      errorElement.textContent = error.message || 'Signup failed.';
      errorElement.style.display = 'block';
      successElement.style.display = 'none';
    }
  } catch (error) {
    console.error('Error:', error);
    errorElement.textContent = 'An error occurred. Please try again.';
    errorElement.style.display = 'block';
    successElement.style.display = 'none';
  }
});