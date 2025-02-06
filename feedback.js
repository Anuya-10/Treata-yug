async function submitFeedback() {
    const feedbackInput = document.getElementById("feedbackInput");
    const feedback = feedbackInput.value;

    if (!feedback.trim()) {
        alert("Please enter your feedback.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5001/submit-feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ feedback })
        });

        const result = await response.json();
        alert(result.message);  // Show success message

        feedbackInput.value = ""; // Clear the input field after submission
    } catch (error) {
        alert("Error submitting feedback. Please try again.");
    }
}
async function fetchFeedback() {
    const response = await fetch("http://localhost:5001/get-feedbacks");
    const feedbacks = await response.json();

    const feedbackList = document.getElementById("feedbackList");
    feedbackList.innerHTML = ""; // Clear old data

    feedbacks.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.text;
        feedbackList.appendChild(li);
    });
}
fetchFeedback();

