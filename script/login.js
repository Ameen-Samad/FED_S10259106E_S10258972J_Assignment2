const API_URL = "https://loginid-056f.restdb.io/rest/account?max=2";
const API_KEY = "6785c5c5630e8a5f6d0b141f";

document.getElementById("signupForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("signupUsername").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": API_KEY,
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password, 
      }),
    });

    if (response.ok) {
      alert("Signup successful!");
      document.getElementById("signupForm").reset();
    } else {
      alert("Signup failed. Please try again.");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert("Something went wrong!");
  }
});

document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch(`${API_URL}?q={"email":"${email}"}`, {
      headers: {
        "Content-Type": "application/json",
        "x-apikey": API_KEY,
      },
    });

    const users = await response.json();

    if (users.length === 0) {
      alert("User not found!");
    } else if (users[0].password === password) {
      alert("Login successful!");
    } else {
      alert("Incorrect password!");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Something went wrong!");
  }
});