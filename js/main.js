const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = formulario.nombre.value.trim();
  const email = formulario.email.value.trim();
  const mensaje = formulario.mensaje.value.trim();

  if (nombre === "" || email === "" || mensaje === "") {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const cuerpo = `${nombre}\n${email}\n${mensaje}`;
  const asunto = "Esto es una prueba";
  const para = "jjguevarag@gmail.com"; 

  alert("Formulario enviado exitosamente.");
  formulario.reset();
});

