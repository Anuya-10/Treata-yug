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
    window.location.href='bhajan.html';
    
})