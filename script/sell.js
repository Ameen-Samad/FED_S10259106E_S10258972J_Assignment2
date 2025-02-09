/* Initialize Dropdown Menu */
document.addEventListener("DOMContentLoaded", () => {
    initializeDropdown();
});

function initializeDropdown() {
    const dropdown = document.querySelector(".dropdown");
    const dropdownContent = document.getElementById("dropdownContent");

    if (dropdown && dropdownContent) {
        dropdown.addEventListener("mouseenter", () => dropdownContent.classList.add("show"));
        dropdown.addEventListener("mouseleave", () => dropdownContent.classList.remove("show"));
    }
}

/* API Configuration */
const API_URL = "https://loginid-056f.restdb.io/rest/listings";
const API_KEY = "6785c5c5630e8a5f6d0b141f";

/* Form Elements */
document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("fileInput");
    const uploadedImages = document.getElementById("uploadedImages");
    const dropArea = document.getElementById("drop-area");
    const listItemBtn = document.getElementById("listItemBtn");
    const statusMessage = document.getElementById("statusMessage");

    const nameInput = document.getElementById("name");
    const descriptionInput = document.getElementById("description");
    const priceInput = document.getElementById("price");
    const genderSelect = document.getElementById("gender");

    let selectedCondition = "";
    let imageFiles = [];

    // Condition selection
    document.querySelectorAll(".condition-btn").forEach((button) => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".condition-btn").forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            selectedCondition = button.getAttribute("data-value");
        });
    });

    // Image upload handling
    fileInput.addEventListener("change", (event) => handleFiles(event.target.files));
    
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => e.preventDefault());
    });

    dropArea.addEventListener("dragover", () => (dropArea.style.borderColor = "#008060"));
    dropArea.addEventListener("dragleave", () => (dropArea.style.borderColor = "#3e3e3e"));

    dropArea.addEventListener("drop", (event) => {
        dropArea.style.borderColor = "#3e3e3e";
        handleFiles(event.dataTransfer.files);
    });

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith("image/") && imageFiles.length < 10) {
                imageFiles.push(file);
                previewImage(file);
            }
        });
    }

    function previewImage(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const imgContainer = document.createElement("div");
            imgContainer.classList.add("img-preview");

            const img = document.createElement("img");
            img.src = reader.result;

            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "❌";
            deleteBtn.classList.add("delete-btn");

            deleteBtn.addEventListener("click", () => {
                imageFiles = imageFiles.filter(imgFile => imgFile !== file);
                imgContainer.remove();
            });

            imgContainer.appendChild(img);
            imgContainer.appendChild(deleteBtn);
            uploadedImages.appendChild(imgContainer);
        };
    }

    // Listing submission
    listItemBtn.addEventListener("click", async () => {
        const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        if (!loggedInUser) {
            alert("You must be logged in to list an item.");
            return;
        }

        const name = nameInput.value.trim();
        const description = descriptionInput.value.trim();
        const price = priceInput.value.trim();
        const gender = genderSelect.value;

        if (!name || !description || !price || isNaN(price) || price <= 0 || !selectedCondition) {
            alert("Please fill in all fields correctly.");
            return;
        }

        if (imageFiles.length === 0) {
            alert("Please upload at least one image.");
            return;
        }

        // Convert images to Base64
        const imageBase64Array = await Promise.all(imageFiles.map(fileToBase64));

        const newListing = {
            name,
            description,
            price: parseFloat(price),
            gender,
            condition: selectedCondition,
            userId: loggedInUser._id, // Link listing to user
            createdAt: new Date().toISOString(),
            image: imageBase64Array, // Correct field name
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": API_KEY,
                },
                body: JSON.stringify(newListing),
            });

            if (response.ok) {
                alert("Listing added successfully!");
                clearForm();
                window.location.reload();
            } else {
                const errorText = await response.json();
                alert(`Error adding listing: ${JSON.stringify(errorText)}`);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    function clearForm() {
        nameInput.value = "";
        descriptionInput.value = "";
        priceInput.value = "";
        genderSelect.value = "unisex";
        uploadedImages.innerHTML = "";
        imageFiles = [];
        selectedCondition = "";
        document.querySelectorAll(".condition-btn").forEach(btn => btn.classList.remove("selected"));
    }
});

/* Navbar menu */
window.onload = function () {
    const menuToggle = document.getElementById("toggleMenu");
    const navbar = document.getElementById("nav");

    function toggleMenu() {
        if (navbar.style.display === "flex") {
            navbar.style.display = "none";
            menuToggle.textContent = "☰ Menu";
        } else {
            navbar.style.display = "flex";
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

    menuToggle.addEventListener("click", toggleMenu);
};
