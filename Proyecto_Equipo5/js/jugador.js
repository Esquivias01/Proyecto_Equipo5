export class Jugador {
  #gamertag;
  #edad;
  #partidasGanadas;
  constructor(gamertag, edad, partidasGanadas) {
    this.setGamertag(gamertag);
    this.setEdad(edad);
    this.setPartidasGanadas(partidasGanadas);
  }
  getGamertag() {
    return this.#gamertag;
  }
  getEdad() {
    return this.#edad;
  }
  getPartidasGanadas() {
    return this.#partidasGanadas;
  }
  setGamertag(gamertag) {
    if (typeof gamertag !== "string" || gamertag.trim() === "") {
      throw new Error("El gamertag debe ser un texto y no puede estar vacío");
    }
    this.#gamertag = gamertag;
  }

  setEdad(edad) {
    if (!Number.isInteger(edad)) {
      throw new Error("La edad debe ser un número entero");
    }
    if (edad < 15) {
      throw new Error("La edad mínima es de 15 años");
    }
    this.#edad = edad;
  }
  setPartidasGanadas(partidasGanadas) {
    if (!Number.isInteger(partidasGanadas)) {
      throw new Error("Las partidas ganadas deben ser un número entero");
    }
    if (partidasGanadas < 0) {
      throw new Error("Las partidas ganadas no pueden ser negativas");
    }
    this.#partidasGanadas = partidasGanadas;
  }
  registrarVictoria() {
    this.#partidasGanadas = this.#partidasGanadas + 1;
  }
  calcularMMR() {
    return this.#partidasGanadas * 10;
  }
}