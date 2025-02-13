//import {puntuacion} from mostrarCosas.js

const puntuacionMostrar = document.querySelector("#tablaPuntuaciones");
const puntTotal = document.querySelector("#puntTotal");

const lienzo = document.querySelector("canvas");
const contexto = lienzo.getContext("2d"); //en canvas se pueden tener y dibujar de varias formas 3d y demas en esta lo vamos a hacer con 2d

lienzo.width = tamanyo_bloque * ancho_lienzo;
lienzo.height = alto_lienzo * tamanyo_bloque;

//hacemos el tablero de 30 de alto * 14 de ancho

const tablero = [];
for (let i = 0; i < alto_lienzo; i++) {
  tablero.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

contexto.scale(tamanyo_bloque, tamanyo_bloque); //escala el tamaño respecto al original por lo que 1 pixel ahora sera del tamaño de 20 pixeles
//esto es el while(true) de toda la vida

//Hacemos la piezas , empezamos por un bloque que es la mas facil

//vale ahora vamos a hacer todas las fichas

const cuadrado = {
  posicion: { x: ancho_lienzo / 2, y: 0 },
  forma: [
    [1, 1],
    [1, 1],
  ],
  color: "green", //Esto aprovecha la posicion de los elementos en los arrays, por ejemplo aqui el primer el emento seria el [0][0] que literalmente coincide en como estamos moviendonos por el canvas
};

const zeta = {
  posicion: { x: ancho_lienzo / 2, y: 0 },
  forma: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  color: "yellow",
};

const zetaInv = {
  posicion: { x: ancho_lienzo / 2, y: 0 },
  forma: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  color: "red",
};
//comentario cambiado
const palo = {
  posicion: { x: ancho_lienzo / 2, y: 0 },
  forma: [
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
  ],
  color: "blue",
};

const cruz = {
  posicion: { x: ancho_lienzo / 2, y: 0 },
  forma: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  color: "brown",
};

const caballo = {
  posicion: { x: ancho_lienzo / 2, y: 0 },
  forma: [
    [1, 1],
    [0, 1],
    [0, 1],
  ],
  color: "orange",
};

const caballoInv = {
  posicion: { x: ancho_lienzo / 2, y: 0 },
  forma: [
    [1, 1],
    [1, 0],
    [1, 0],
  ],
  color: "purple",
};

const arrayPiezas = [cuadrado, zeta, zetaInv, palo, cruz, caballo, caballoInv];
//una vez tenemos todas las piezas generamos la funcion para generarlas aleatoriamente

const fichaLeatoria = () => {
  let numAleatorio = Math.floor(Math.random() * 7);
  return arrayPiezas[numAleatorio];
};

let pieza = fichaLeatoria();

  //autodrop jugando con tiempo

let dropContador = 0;
let tiempoAnterior = 0;
const fps = 60; //

function jugando() {
  const tiempoActual = performance.now();
  const deltaTime = tiempoActual - tiempoAnterior;
  tiempoAnterior = tiempoActual;
  dropContador += deltaTime;
  if (dropContador > 40000 / fps) {
    fichaBaja();
    dropContador = 0;
  }

  draw();
  window.requestAnimationFrame(jugando);
}
window.requestAnimationFrame(jugando);

//Esta funcion dibuja el estado actual del lienzo , osea lo mas importante
function draw() {
  contexto.fillStyle = "#000";
  contexto.fillRect(0, 0, lienzo.width, lienzo.height); // esto dibuja el fondo negro se usa para fondos no para los bordes de momento sera negro
  //pintamos el tablero
  tablero.forEach((fila, y) => {
    //vale , esto no es lioso, simplemente el cambas el lugar de origen es el margen de arriba izquierdo el 0,0, entonces cuando recorremos el tablero lo recorremos bidimensionalmente primero cogiendo la y y despues cogiendo la x
    fila.forEach((valor, x) => {
      if (valor) {
        contexto.fillStyle = valor;
        contexto.fillRect(x, y, 1, 1);
      }
    });
  });

  //pintamos las fichas
  pieza.forma.forEach((fila, y) => {
    fila.forEach((valor, x) => {
      if (valor) {
        contexto.fillStyle = pieza.color;
        contexto.fillRect(x + pieza.posicion.x, y + pieza.posicion.y, 1, 1); //es dificil de entender sin dibujar, si no le sumasemos la x e y simplemente estariamos sobrepintando un mismo pixel
      }
    });
  });
}

//vamos a mover las fichas

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    if (!checkColisiones(-1, 0)) pieza.posicion.x--;
  }
  if (event.key === "ArrowRight") {
    if (!checkColisiones(1, 0)) {
      pieza.posicion.x++;
    }
  }
  if (event.key === "ArrowDown") {
    if (!checkColisiones(0, 1)) {
      pieza.posicion.y++;
    } else {
      solidificar();
      eliminaLinea();
    }
  }

  if (event.key === "ArrowUp") {
    gira();
  }
});

//como ya lo movemos vamos a ver lo chungo. LAS COLisiones, no me gusta como lo ha hecho el chico asique voy a intentar hacerlo a mi manera

function checkColisiones(ladoD = 0, alto = 0) {
  return pieza.forma.find((fila, y) => {
    return fila.find((valor, x) => {
      return (
        valor !== 0 &&
        tablero[y + pieza.posicion.y + alto]?.[x + pieza.posicion.x + ladoD] !==
          0
      );
    });
  });
}

//una vez ya nos podemos mover bien ahora tenemos que solidificar la pieza

const solidificar = () => {
  //vale, la cosa es que como he cambiado lo de las colisiones esto tambien cambia, lo que tendria que hacer aqui, cuando colisione, moverme a la posicion anterior de la ficha y solidificar en esa posicion, por lo que a la y le deberia restar 1

  pieza.forma.forEach((fila, y) => {
    fila.forEach((valor, x) => {
      if (valor === 1) {
        tablero[y + pieza.posicion.y][x + pieza.posicion.x] = pieza.color;
      }
    });
  });
  pieza = fichaLeatoria();
  pieza.posicion.x = ancho_lienzo / 2;
  pieza.posicion.y = 0;

  //final del partido
  if (tablero[2].some((value) => value != 0)) {
    //el metodo some comprueba alguna condicion
    window.alert("Game OVER SE FINI");
    tablero.forEach((fila) => fila.fill(0));
  }
};

//una vez ya se solidifican las piezas deberiamos hacer el comprueba linea y borrar? funsiona ole

const eliminaLinea = () => {
  const filasEliminar = [];
  tablero.forEach((fila, y) => {
    if (!fila.includes(0)) {
      filasEliminar.push(y);
      puntuacion = parseInt(puntuacion) + 100;
      puntTotal.innerHTML = puntuacion;
    }
  });
  filasEliminar.forEach((numFila) => {
    tablero.splice(numFila, 1);
    tablero.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
};

//Vale ahora el movimiento de bajada

const fichaBaja = () => {
  if (!checkColisiones(0, 1)) {
    pieza.posicion.y++;
  } else {
    solidificar();
    eliminaLinea();
  }
};

//Giramos la pieza

const gira = () => {
  const piezaGirada = [];
  for (let i = 0; i < pieza.forma[0].length; i++) {
    const partePieza = [];
    for (let j = pieza.forma.length - 1; j >= 0; j--) {
      partePieza.push(pieza.forma[j][i]);
    }
    piezaGirada.push(partePieza);
  }

  const formaAnterior = pieza.forma;
  pieza.forma = piezaGirada;

  //comentario idx

  if (checkColisiones()) {
    pieza.forma = formaAnterior;
  }
};

const seccion = document.querySelector("section");

seccion.addEventListener("click", () => {
  jugando();
  seccion.remove();
  const audio = new window.Audio("./audioImagenes/tetris.mp3");
  audio.volume = 0.5;
  audio.loop = true;
  audio.play();
});
