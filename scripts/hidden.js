const cardcontainer = document.getElementById("cardcontainer");
const words = document.getElementById("words");

document.addEventListener("DOMContentLoaded", function() {
  hotelDisplay();
});

function hotelDisplay() {
  if (cardcontainer && cardcontainer.style.display === "none") {
    cardcontainer.style.display = "block";
  } else if (cardcontainer) {
    cardcontainer.style.display = "none";
  }
}

function detailDisplay() {
  if (words && words.style.display === "none") {
    words.style.display = "block";
  } else if (words) {
    words.style.display = "none";
  }
}

function closeHotel(){
  cardcontainer.style.display = "none";
}

function closeDetail(){
  words.style.display = "none";
}