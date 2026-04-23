class Controlador {
  #bola;
  #velTop = -2;
  #velLeft = -3;
  #divWidth;
  #divHeight;

  constructor() {
    this.#bola = document.querySelector(".bola");
    let contentor = document.querySelector("div");
    let computedStyle = window.getComputedStyle(contentor);
    this.#divWidth = parseInt(computedStyle.width);
    this.#divHeight = parseInt(computedStyle.height);
    setInterval(this.#mover.bind(this), 5);
  }

  #mover() {
    // Como vais mover a bola?
    let computedStyle = window.getComputedStyle(this.#bola);
    let posLeft = parseInt(computedStyle.left);
    let posTop = parseInt(computedStyle.top);
    console.log(posLeft, posTop);
    //Detetar colisão
    if (posLeft <= 0) this.#velLeft = this.#velLeft * -1;
    if (posLeft + 50 >= this.#divWidth) this.#velLeft = this.#velLeft * -1;
    if (posTop <= 0) this.#velTop = this.#velTop * -1;
    if (posTop + 50 >= this.#divHeight) this.#velTop = this.#velTop * -1;
    //if (posLeft <= 0 || posLeft + 50 >= this.#divWidth) this.#velLeft *= -1;
    //if (posTop <= 0 || posTop + 50 >= this.#divHeight) this.#velTop *= -1;

    posLeft += this.#velLeft;
    posTop += this.#velTop;
    this.#bola.style.left = posLeft + "px";
    this.#bola.style.top = posTop + "px";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Controlador();
  console.log("Iniciando");
});
