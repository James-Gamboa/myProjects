// Flujo del programa:
// 1. El programa debe de recibir tres parámetros.
// a. El tamaño que va a poseer la matriz.
// b. La cantidad de células vivas.
// c. La cantidad de turnos que se van a ejecutar.
// 2. La ejecución debe de realizarse así:
// $ node proyecto1.js 10 50 15

// - proyecto.js → script a ejecutar
// - 10 → matriz de 10x10
// - 50 → de las 100 casillas disponibles(10x10) 50 van a estar vivas
// - 15 → ejecutar y mostrar 15 turnos
// 3. Validaciones:
// a. El primer parámetro debe de ser un número mayor a cero.
// b. El segundo parámetro debe de ser un número mayor a cero y menor que el
// límite creado por el primer parámetro Ej. si el primer parámetro es 10, el
// número mayor será 100 (10x10).
// c. El tercer parámetro debe de ser un número mayor a cero.
// 4. Generación de la matriz:
// a. La matriz debe colocar la cantidad de células vivas según el segundo
// parámetro insertado en lugares al azar.

// 5. Impresión de los turnos:
// a. Cada turno debe de imprimirse mostrando su número y debe de mostrar la
// matriz correspondiente para ese turno.


function juegoDeLaVida(matriztamano, celulasvivas, turnos) {
  if(matriztamano <= 0 || celulasvivas <= 0 || turnos <= 0) {
    throw new Error("Los parámetros deben ser mayores a cero");
  }

  if(celulasvivas > matriztamano * matriztamano) {
    throw new Error("La cantidad de células vivas no puede ser mayor que el tamaño de la matriz");
  }

  let matriz = generarMatrizInicial(matriztamano, celulasvivas);
  console.log('Turno 0');
  imprimirMatriz(matriz);

  for(let i = 1; i <= turnos; i++) {
    matriz = actualizarMatriz(matriz);
    console.log(`Turno ${i}`);
    imprimirMatriz(matriz);
  }
}

function generarMatrizInicial(matriztamano, celulasvivas) {
  let matriz = [];
  for(let i = 0; i < matriztamano; i++) {
    matriz[i] = [];
    for(let j = 0; j < matriztamano; j++) {
      // @ts-ignore
      matriz[i][j] = 0;
    }
  }

  for(let i = 0; i < celulasvivas; i++) {
    let x = Math.floor(Math.random() * matriztamano);
    let y = Math.floor(Math.random() * matriztamano);
    // @ts-ignore
    matriz[x][y] = 1;
  }

  return matriz;
}

function imprimirMatriz(matriz) {
  for(let i = 0; i < matriz.length; i++) {
    console.log(matriz[i].join(' '));
  }
  console.log();
}

function actualizarMatriz(matriz) {
  let nuevaMatriz = [];
  for(let i = 0; i < matriz.length; i++) {
    nuevaMatriz[i] = [];
    for(let j = 0; j < matriz.length; j++) {
      // @ts-ignore
      nuevaMatriz[i][j] = 0;
    }
  }

  for(let i = 0; i < matriz.length; i++) {
    for(let j = 0; j < matriz.length; j++) {
      let celulasvecinas = obtenerVecinas(i, j, matriz);
      let estadoActual = matriz[i][j];
      let nuevoEstado = reglasJuego(estadoActual, celulasvecinas);
      // @ts-ignore
      nuevaMatriz[i][j] = nuevoEstado;
    }
  }

  return nuevaMatriz;
}

function obtenerVecinas(i, j, matriz) {
  let celulasvecinas = 0;
  for(let x = Math.max(i - 1, 0); x <= Math.min(i + 1, matriz.length - 1); x++) {
    for(let y = Math.max(j - 1, 0); y <= Math.min(j + 1, matriz.length - 1); y++) {
      if(x != i || y != j) {
        celulasvecinas += matriz[x][y];
      }
    }
  }

  return celulasvecinas;
}

function reglasJuego(estadoActual, celulasvecinas) {
  if(estadoActual == 0 && celulasvecinas == 3) {
    return 1;
  } else if(estadoActual == 1 && (celulasvecinas < 2 || celulasvecinas > 3)) {
    return 0;
  } else {
    return estadoActual;
  }
}

// ingresar datos para empezar el juego
juegoDeLaVida(10, 50, 15);
