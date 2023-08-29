const formulario = document.getElementById("form-content");

document.addEventListener("DOMContentLoaded", function() {
  formDisplay();
});


function formDisplay() {
  if (formulario && formulario.style.display === "none") {
    formulario.style.display = "block";
  } else if (formulario) {
    formulario.style.display = "none";
  }
}

function hotelRooms() {
  if (hotel && hotel.style.display === "none") {
    hotel.style.display = "block";
  } else if (hotel) {
    hotel.style.display = "none";
  }
}

function closeForm(){
  formulario.style.display = "none";
}

function closeDescription(){
  hotel.style.display = "none";
}