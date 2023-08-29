const chalk = require("chalk");

function dividir(a, b) {
  if (b !== 0) {
    const resultado = a / b;
    console.log(
      chalk.keyword("white")(`El resultado de la división es: ${resultado}`)
    );
  } else {
    console.log(chalk.keyword("white")("¡No se puede dividir entre cero!"));
  }
}

module.exports = dividir;
