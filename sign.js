function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
    return emailRegex.test(email);
}
document.querySelector(".sign").addEventListener("click", async () => {
    const email = document.querySelector("input[type='email']").value.trim();
    const password = document.querySelector("input[type='password']").value.trim();
  
    document.querySelector(".sign").style.backgroundColor = 'red';

    setTimeout(() => {
    document.querySelector(".sign").style.backgroundColor = ''; // Reset to default
    }, 500); // 2000 milliseconds = 2 seconds


    
    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    console.log("Sign In details submitted");
    try {
        const response = await fetch("http://127.0.0.1:3001/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
  
      if (response.ok) {
        alert(data.message);
        console.log("Token:", data.token); 
        if(data.token){
          localStorage.setItem("authToken",data.token);
          console.log("token saved to local storage");
        }
        window.location.href="front.html";// Use token for further authentication
      } 
      else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });


document.querySelector(".hi").addEventListener("click", async () => {
    const email = document.querySelector("input[type='email']").value.trim();
    const password = document.querySelector("input[type='password']").value.trim();
  
    document.querySelector(".hi").style.backgroundColor = 'red';

    setTimeout(() => {
    document.querySelector(".hi").style.backgroundColor = ''; // Reset to default
    }, 500); // 2000 milliseconds = 2 seconds

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    console.log("Hi button clicked, email and password validated");
    try {
        const response = await fetch("http://localhost:3001/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          alert(data.message);
        
        if(data.token){
          localStorage.setItem("authToken",data.token);
          console.log("token saved to local storage");
        }
        alert("sign in succesfull");
        window.location.href="front.html";
      }
  
         else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
    });

