import { Jugador } from "../fhernando/jugador"
class JugadorEstrategia extends Jugador{
  #misiones
    constructor(gamertag, edad, partidasGanadas){
        super(gamertag, edad, partidasGanadas)
        this.#misiones = 0
    }

  setMisionesCumplidas(){
    this.#misiones+=1
  }

  getMisionesCumplidas(){
    return this.#misiones
  }

  calcularMMR(){
    let MMR = (super.getPartidasGanadas() * 10) + (this.#misiones * 5)
    return MMR
  }
}
