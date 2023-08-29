const chalk = require("chalk");

function restar(a, b) {
  const resultado = a - b;
  console.log(chalk.keyword("yellow")("El resultado de la resta es: " + resultado));
}

module.exports = restar;
