const lienzo = document.querySelector(".canvas")
const contexto = lienzo.getContext("2d")//en canvas se pueden tener y dibujar de varias formas 3d y demas en esta lo vamos a hacer con 2d

const tamanyo_bloque = 20;
const ancho_lienzo = 14
const alto_lienzo = 30  //vale como vamos a diseñar un lienzo interactivo esto querra decir que 14 sera el numero de 1 que hay en lo ancho y 30 en lo alto, y el tamaño de bloque es el numero de pixeles que tendra cada uno de esos 1

lienzo.width = tamanyo_bloque*ancho_lienzo;
lienzo.height = alto_lienzo*tamanyo_bloque;

contexto.scale(tamanyo_bloque,tamanyo_bloque)//escala el tamaño respecto al original por lo que 1 pixel ahora sera del tamaño de 20 pixeles
//esto es el while(true) de toda la vida
function jugando(){
    draw()
    window.requestAnimationFrame(jugando)//esto es pseudorecursivo, cuando acaba un frame pide que vuelva a ejecutarse
    
}
//Esta funcion dibuja el estado actual del lienzo , osea lo mas importante
function draw(){
    contexto.fillStyle = "#000" 
    contexto.fillRect(0,0,lienzo.width,lienzo.height) // esto dibuja el fondo negro se usa para fondos no para los bordes de momento sera negro
}

jugando()

//hacemos el tablero de 30 de alto * 14 de ancho

const tablero = []
for(let i = 0; i < alto_lienzo; i++){
    tablero[i] = []
    for(let j = 0; j < ancho_lienzo; j++){
        tablero[i][j] = 0
    }
}
console.log(tablero)