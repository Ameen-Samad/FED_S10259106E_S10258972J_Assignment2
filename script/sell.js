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

    listItemBtn.addEventListener("click", async () => {
        const name = nameInput.value.trim();
        const description = descriptionInput.value.trim();
        const price = parseFloat(priceInput.value);
        const gender = genderSelect.value;

        if (!name || !price || imageFiles.length === 0 || !selectedCondition) {
            statusMessage.innerText = "⚠️ Please fill all required fields and upload at least one image.";
            statusMessage.style.color = "red";
            return;
        }

        statusMessage.innerText = "Uploading... Please wait.";
        statusMessage.style.color = "blue";

        const imagesBase64 = await Promise.all(imageFiles.map(fileToBase64));

        const listingData = {
            name,
            description,
            price,
            gender,
            condition: selectedCondition,
            image: imagesBase64
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": API_KEY
                },
                body: JSON.stringify(listingData)
            });

            if (!response.ok) throw new Error("Failed to submit listing.");

            statusMessage.innerText = "✅ Listing submitted successfully!";
            statusMessage.style.color = "green";
            clearForm();
        } catch (error) {
            console.error("Error submitting listing:", error);
            statusMessage.innerText = "❌ Failed to submit listing.";
            statusMessage.style.color = "red";
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
