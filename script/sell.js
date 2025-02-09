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

const API_URL = "https://loginid-056f.restdb.io/rest/listings";
const API_KEY = "6785c5c5630e8a5f6d0b141f";

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

    document.querySelectorAll(".condition-btn").forEach((button) => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".condition-btn").forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            selectedCondition = button.getAttribute("data-value");
        });
    });

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

    document.getElementById('listItemBtn').addEventListener('click', async () => {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            alert('You must be logged in to list an item.');
            return;
        }
    
        const name = document.getElementById('name').value.trim();
        const description = document.getElementById('description').value.trim();
        const price = parseFloat(document.getElementById('price').value);
        const gender = document.getElementById('gender').value;
    
        if (!name || !description || !price || isNaN(price)) {
            alert('Please fill in all fields correctly.');
            return;
        }
    
        const newListing = {
            name: name,
            description: description,
            price: price,
            gender: gender,
            userId: loggedInUser._id, // Link to the user
            createdAt: new Date().toISOString(),
        };
    
        try {
            const response = await fetch('https://loginid-056f.restdb.io/rest/listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-apikey': '6785c5c5630e8a5f6d0b141f',
                },
                body: JSON.stringify(newListing),
            });
    
            if (response.ok) {
                alert('Listing added successfully!');
                window.location.reload();
            } else {
                alert('Error adding listing.');
            }
        } catch (error) {
            console.error('Error:', error);
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
