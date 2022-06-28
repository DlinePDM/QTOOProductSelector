// A script for running an image slideshow upon loading the page
window.addEventListener("load", function() {

// Array of slideshow image sources
const images = [
    "https://qtoobath.com/wp-content/uploads/2020/04/qtoo_stainless-steel-tap-bathtub_armatur-i-rustfrit-st%C3%A5l_kar_1.jpg",
    "https://qtoobath.com/wp-content/uploads/2020/04/qtoo_stainless-steel-tap-shower_armatur-i-rustfrit-st%C3%A5l_brus_3-2-scaled.jpg", 
    "https://qtoobath.com/wp-content/uploads/2020/04/qtoo_stainless-steel-tap-shower_armatur-i-rustfrit-st%C3%A5l_brus_6-2-scaled.jpg",
    "https://qtoobath.com/wp-content/uploads/2021/11/Dobbeltbruser.jpg"
  ];


const imageEl = document.getElementById("fadingImage");

// Slide changing loop
window.setInterval(changePicture, 5000);

let i = 0;
function changePicture() {
  i++;
  if (i > images.length - 1) i = 0;
  imageEl.style.backgroundImage = `url(${images[i]})`;
}
});