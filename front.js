// Set profile letter from email stored in localStorage
const email = localStorage.getItem("userEmail");
if (email) {
  document.getElementById("profileLetter").innerText = email[0].toUpperCase();
}

// Toggle dropdown on click
document.getElementById("profileLetter").addEventListener("click", () => {
  const menu = document.getElementById("profileMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// Optional: hide dropdown if clicked outside
document.addEventListener("click", (e) => {
  const menu = document.getElementById("profileMenu");
  if (!e.target.closest(".profile-container")) {
    menu.style.display = "none";
  }
});

function viewProfile() {
  alert("Profile page coming soon!");
}

function logout() {
  localStorage.removeItem("userEmail");
  window.location.href = "signin.html"; // or your actual sign-in page
}

const images=document.querySelectorAll('.image-gallery img');
let currentIndex=0;

function display(){
    images[currentIndex].classList.remove('active');
    currentIndex=(currentIndex+1)%images.length;
    images[currentIndex].classList.add('active'); 
    console.log("hi"); 
}

setInterval(display,2000);
document.querySelector('.two').addEventListener('click',function(){
    window.location.href='episodes.html';
    
})
document.querySelector('.six').addEventListener('click',function(){
    window.location.href='sl.html';
    
})
document.querySelector('.one').addEventListener('click',function(){
    window.location.href='learnpage.html';
    
})
document.querySelector('.three').addEventListener('click',function(){
    window.location.href='gamepage.html';
    
})
document.querySelector('.four').addEventListener('click',function(){
    window.location.href='blog.html';
    
})
document.querySelector('.five').addEventListener('click',function(){
    window.location.href='bhajan.html';
    
})