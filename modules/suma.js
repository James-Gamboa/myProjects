const chalk = require("chalk");

function sumar(a, b) {
  const resultado = a + b;
  console.log(chalk.keyword("red")("El resultado de la suma es: " + resultado));
}

module.exports = sumar;