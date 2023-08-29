const chalk = require("chalk");

function multiplicar(a, b) {
  const resultado = a * b;
  console.log(chalk.keyword("orange")(`El resultado de la multiplicación es: ${resultado}`));
}

module.exports = multiplicar;