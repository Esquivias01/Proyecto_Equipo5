export class Escuadra {
  #nombre
  #jugadores
  constructor(nombre) {
    this.#nombre = nombre
    this.#jugadores = []
  }

  getNombre() {
    return this.#nombre
  }

  getJugadores() {
    return this.#jugadores
  }

  agregarJugador(jugador) {
    if (this.#jugadores.length < 5) {
      if (jugador.getEdad() >= 15) {
        this.#jugadores.push(jugador)
        return true;
      } else {
        console.error("Error: El jugador debe tener al menos 15 años.")
        return false
      }
    } else {
      console.error("Error: La escuadra ya alcanzó el cupo máximo de 5 jugadores.")
      return false
    }
  }

  calcularPromedioMMR() {
    if (this.#jugadores.length === 0) {
      return 0
    }

    let sumaMMR = 0;
    for (let i = 0; i < this.#jugadores.length; i++) {
      sumaMMR += this.#jugadores[i].calcularMMR()
    }

    return sumaMMR / this.#jugadores.length
  }
}