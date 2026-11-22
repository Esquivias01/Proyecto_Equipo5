// parte Marquez
import { Jugador } from './Jugador.js';

export class JugadorAccion extends Jugador {
  #ratio;

  constructor(gamertag, edad, partidasGanadas, ratio) {
    super(gamertag, edad, partidasGanadas);
    this.setRadio(ratio);
  }

  getRadio() {
    return this.#ratio;
  }

  setRadio(ratio) {
    if (ratio < 0) {
      throw new Error("El ratio no puede ser menor a 0");
    }
    this.#ratio = Number(ratio);
  }

  ratioEliminaciones() {
    return this.#ratio;
  }

  calcularMMR() {
    return (10 * this.getPartidasGanadas()) + this.#ratio;
  }
}
