const lienzo = document.querySelector(".canvas")
const contexto = lienzo.getContext("2d")//en canvas se pueden tener y dibujar de varias formas 3d y demas en esta lo vamos a hacer con 2d

const tamanyo_bloque = 20;
const ancho_lienzo = 14
const alto_lienzo = 30  //vale como vamos a diseñar un lienzo interactivo esto querra decir que 14 sera el numero de 1 que hay en lo ancho y 30 en lo alto, y el tamaño de bloque es el numero de pixeles que tendra cada uno de esos 1
