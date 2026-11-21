// parte Marquez
import { Jugador } from './Jugador.js';

export class JugadorAccion extends Jugador {
  #ratio; // privado el ratio como pide el diagrama

  constructor(gamertag, edad, partidasGanadas, ratio) {
    super(gamertag, edad, partidasGanadas);
    this.#ratio = ratio;
  }

  ratioEliminaciones() { // se agrega el metodo para el ratio
    return this.#ratio;
  }

  calcularMMR() {
    return (10 * this.getPartidasGanadas()) + Number(this.#ratio);
  }
}
