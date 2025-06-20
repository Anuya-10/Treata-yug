// ✅ Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ✅ Utility function to show alerts and color feedback
function showFeedback(button, message, isError = true) {
  button.style.backgroundColor = isError ? 'red' : 'green';
  alert(message);
  setTimeout(() => {
    button.style.backgroundColor = '';
  }, 500);
}

// ✅ Login handler
// ✅ Login handler (FINAL FIXED VERSION)
document.querySelector("#login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const email = form.querySelector("input[name='email']").value.trim();
  const password = form.querySelector("input[name='password']").value.trim();
  const button = form.querySelector("input[type='submit']");

  if (!email || !password) return showFeedback(button, "Please fill in all fields.");
  if (!isValidEmail(email)) return showFeedback(button, "Enter a valid email.");

  try {
    const response = await fetch("http://127.0.0.1:3001/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("authToken", data.token);
      showFeedback(button, "Login successful!", false);
      window.location.href = "front.html";
    } else if (data.requireVerification) {
      // Show OTP input
      const code = prompt("Enter the 6-digit verification code sent to your email:");

      if (!code || code.length !== 6) {
        return showFeedback(button, "Invalid verification code.");
      }

      // Call /verify-email to complete the process
      const verifyRes = await fetch("http://127.0.0.1:3001/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationCode: code }), // FIXED KEY HERE
      });

      const verifyData = await verifyRes.json();

      if (verifyRes.ok) {
        alert("Email verified. Please login again.");
        // Optionally log the user in here again
      } else {
        showFeedback(button, verifyData.message || "OTP verification failed.");
      }
    } else {
      showFeedback(button, data.message || "Login failed.");
    }

  } catch (err) {
    console.error("Login error:", err);
    showFeedback(button, "An error occurred. Try again.");
  }
});


// ✅ Signup handler
// ✅ Signup handler with email verification
document.querySelector("#signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const email = form.querySelector("input[name='email']").value.trim();
  const password = form.querySelector("input[name='password']").value.trim();
  const confirmPassword = form.querySelector("input[name='confirmPassword']").value.trim();
  const button = form.querySelector("input[type='submit']");

  if (!email || !password || !confirmPassword) return showFeedback(button, "Please fill in all fields.");
  if (!isValidEmail(email)) return showFeedback(button, "Enter a valid email.");
  if (password !== confirmPassword) return showFeedback(button, "Passwords do not match.");

  try {
    const response = await fetch("http://127.0.0.1:3001/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok || data.requireVerification) {
      // Ask for verification code even if user existed but was unverified
      const verificationCode = prompt("A 6-digit code has been sent to your email. Please enter it to verify your account:");
    
      if (!verificationCode || verificationCode.length !== 6) {
        showFeedback(button, "Invalid code. Try again.");
        return;
      }
    
      // Send code to backend for verification
      const verifyResponse = await fetch("http://127.0.0.1:3001/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationCode }),
      });
    
      const verifyData = await verifyResponse.json();
    
      if (verifyResponse.ok) {
        showFeedback(button, "Email verified successfully!", false);
        window.location.href = "front.html"; // or redirect to login if preferred
      } else {
        showFeedback(button, verifyData.message || "Verification failed.");
      }
    } else {
      showFeedback(button, data.message || "Signup failed.");
    }
    

  } catch (error) {
    console.error("Signup Error:", error);
    showFeedback(button, "An error occurred. Try again.");
  }
});

// ✅ Toggle between login and signup
function toggleForm() {
  document.getElementById("login-form").classList.toggle("hidden");
  document.getElementById("signup-form").classList.toggle("hidden");
}
