const readline = require("readline");
const sumar = require("./modules/suma.js");
const restar = require("./modules/resta.js");
const multiplicar = require("./modules/multiplicacion.js");
const dividir = require("./modules/division.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Hola");
rl.question("¿Qué operación deseas realizar? (suma, resta, multiplicacion, division): ", (operacion) => {
  rl.question("Ingrese el primer número: ", (num1) => {
    rl.question("Ingrese el segundo número: ", (num2) => {
      const a = parseFloat(num1);
      const b = parseFloat(num2);
      switch (operacion) {
        case "suma":
          sumar(a, b);
          break;
        case "resta":
          restar(a, b);
          break;
        case "multiplicacion":
          multiplicar(a, b);
          break;
        case "division":
          dividir(a, b);
          break;
        default:
          console.log("Operación no válida.");
      }
      rl.close();
    });
  });
});
