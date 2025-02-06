// script.js
let currentIndex = 0;

const slides = document.querySelectorAll('.slides img');
const totalSlides = slides.length;

function changeSlide() {
    currentIndex++;

    if (currentIndex >= totalSlides) {
        currentIndex = 0; // Loop back to the first image
    }

    updateSlider();
}

function updateSlider() {
    const slidesContainer = document.querySelector('.slides');
    const slideWidth = slides[0].clientWidth; // Get the width of the first image
    const offset = -currentIndex * slideWidth; // Calculate the correct offset based on image width
    slidesContainer.style.transform = `translateX(${offset}px)`; // Use px to slide correctly
}

// Set interval to change slides automatically every 3 seconds
setInterval(changeSlide, 3000);

// Optional: Resize handler to adjust the slider when the window size changes
window.addEventListener('resize', updateSlider);
document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('open-review-modal');
    const modal = document.getElementById('review-modal');
    const closeModalBtn = document.getElementsByClassName('close-btn')[0];
    const reviewForm = document.getElementById('review-form');
    const reviewContent = document.getElementById('review-content');
    const reviewsDisplay = document.getElementById('reviews-display');

    // Array to hold the reviews
    let reviews = [];

    // Function to open the modal
    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Function to close the modal
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Function to close the modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Function to handle review submission
    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form from reloading the page

        const reviewText = reviewContent.value.trim();

        if (reviewText) {
            reviews.push(reviewText); // Save the review to the array
            reviewContent.value = ''; // Clear the textarea
            modal.style.display = 'none'; // Close the modal after submission
            renderReviews(); // Render the updated reviews list
        } else {
            alert('Please write a review!');
        }
    });

    // Function to render the reviews dynamically
    function renderReviews() {
        reviewsDisplay.innerHTML = ''; // Clear previous reviews

        reviews.forEach((review) => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.innerHTML = `<p>${review}</p>`;
            reviewsDisplay.appendChild(reviewElement);
        });
    }
});
// Load reviews from localStorage when the page is loaded
let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

// Display reviews on the page
const reviewsDisplay = document.getElementById('reviews-display');

// Function to render reviews as square boxes
function renderReviews() {
    reviewsDisplay.innerHTML = ''; // Clear previous reviews

    reviews.forEach((review, index) => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
            <p>${review}</p>
            <button class="delete-review">Delete</button>
        `;

        // Delete review functionality
        const deleteBtn = reviewElement.querySelector('.delete-review');
        deleteBtn.addEventListener('click', () => {
            reviews.splice(index, 1); // Remove the review from the array
            localStorage.setItem('reviews', JSON.stringify(reviews)); // Save updated reviews to localStorage
            renderReviews(); // Re-render the updated reviews list
        });

        reviewsDisplay.appendChild(reviewElement);
    });
}

// Handle the review form submission
const reviewForm = document.getElementById('review-form');
const reviewContent = document.getElementById('review-content');

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newReview = reviewContent.value.trim();
    if (newReview) {
        reviews.push(newReview); // Add new review to array
        localStorage.setItem('reviews', JSON.stringify(reviews)); // Save to localStorage
        reviewContent.value = ''; // Clear the review content field
        renderReviews(); // Re-render reviews
    } else {
        alert('Please write a review!');
    }
});

// Initially render reviews when the page loads
renderReviews();


