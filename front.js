const images=document.querySelectorAll('.image-gallery img');
let currentIndex=0;
document.addEventListener("DOMContentLoaded", function () {
    var fluteSound = document.getElementById("fluteSound");
    var playButton = document.getElementById("playAudio");

    // Function to autoplay audio
    function tryToPlayAudio() {
        fluteSound.play().then(() => {
            console.log("Autoplay successful 🎶");
            playButton.textContent = "Stop Flute Music ⏹️"; // Change button to stop
        }).catch(error => {
            console.log("Autoplay blocked 🚫");
        });
    }

    // Try autoplay on page load
    tryToPlayAudio();

    // Toggle Play/Pause on Button Click
    playButton.addEventListener("click", function () {
        if (fluteSound.paused) {
            fluteSound.play();
            playButton.textContent = "Stop Flute Music ⏹️"; // Change button text
        } else {
            fluteSound.pause();
            fluteSound.currentTime = 0; // Reset audio to start
            playButton.textContent = "Play Flute Music 🎶"; // Change button text
        }
    });
});

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
    window.location.href='learnpage.html';
    
})
document.querySelector('.one').addEventListener('click',function(){
    window.location.href='sl.html';
    
})
document.querySelector('.three').addEventListener('click',function(){
    window.location.href='gamepage.html';
    
})
document.querySelector('.four').addEventListener('click',function(){
    window.location.href='blog.html';
    
})
document.querySelector('.five').addEventListener('click',function(){
    window.location.href='bhajans.html';
    
})