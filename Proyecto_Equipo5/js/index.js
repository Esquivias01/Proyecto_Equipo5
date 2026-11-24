import { JugadorEstrategia } from "./jugadorEstrategia.js";
import { JugadorAccion } from "./jugadorAccion.js";
import { Escuadra } from "./escuadra.js";

const $ = (id) => document.getElementById(id);

const jugadores = [];
let escuadra = new Escuadra("Mi escuadra");

// redondea a 1 decimal
function redondear(n) {
  return Math.round(n * 10) / 10;
}

function mensaje(id, texto) {
  $(id).textContent = texto;
}

// crea un elemento con texto y clase
function crear(etiqueta, texto, clase) {
  const el = document.createElement(etiqueta);
  el.textContent = texto;
  if (clase) el.className = clase;
  return el;
}

// muestra objetivos o ratio según el rol
function mostrarCampoPorRol() {
  const rol = $("rol").value;
  $("campo-objetivos").classList.toggle("oculto", rol !== "estrategia");
  $("campo-ratio").classList.toggle("oculto", rol !== "accion");
}

$("rol").addEventListener("change", mostrarCampoPorRol);

// registrar jugador
$("form-jugador").addEventListener("submit", (e) => {
  e.preventDefault();
  mensaje("mensaje-registro", "");

  try {
    const gamertag = $("gamertag").value.trim();
    const edad = Number($("edad").value);
    const victorias = Number($("victorias").value);
    const rol = $("rol").value;

    // no repetir gamertags
    const repetido = jugadores.some(
      (j) => j.getGamertag().toLowerCase() === gamertag.toLowerCase()
    );
    if (repetido) throw new Error("Ese gamertag ya está registrado");

    let jugador;

    if (rol === "estrategia") {
      const objetivos = Number($("objetivos").value);
      if (!Number.isInteger(objetivos) || objetivos < 0) {
        throw new Error("Los objetivos deben ser un número entero de 0 o más");
      }
      jugador = new JugadorEstrategia(gamertag, edad, victorias);
      // la clase solo suma de uno en uno
      for (let i = 0; i < objetivos; i++) {
        jugador.setMisionesCumplidas();
      }
    } else if (rol === "accion") {
      jugador = new JugadorAccion(gamertag, edad, victorias, Number($("ratio").value));
    } else {
      throw new Error("Elige un rol");
    }

    jugadores.push(jugador);
    $("form-jugador").reset();
    mostrarCampoPorRol();
    dibujarJugadores();
  } catch (err) {
    // también salen aquí los errores de las clases
    mensaje("mensaje-registro", err.message);
  }
});

// tarjetas de jugadores
function dibujarJugadores() {
  const contenedor = $("lista-jugadores");
  contenedor.replaceChildren();

  if (jugadores.length === 0) {
    contenedor.append(crear("p", "Registra tu primer jugador para verlo aquí.", "vacio"));
    return;
  }

  const enEscuadra = escuadra.getJugadores();

  jugadores.forEach((jugador) => {
    const esEstrategia = jugador instanceof JugadorEstrategia;

    const tarjeta = document.createElement("article");
    tarjeta.className = "jugador";

    const rol = crear(
      "span",
      esEstrategia ? "Estrategia" : "Acción",
      "insignia " + (esEstrategia ? "estrategia" : "accion")
    );
    const nombre = crear("h3", jugador.getGamertag());
    const datos = crear(
      "p",
      "Edad: " + jugador.getEdad() + " · Victorias: " + jugador.getPartidasGanadas()
    );
    const extra = crear(
      "p",
      esEstrategia
        ? "Objetivos: " + jugador.getMisionesCumplidas()
        : "Ratio de eliminaciones: " + jugador.getRadio()
    );

    const mmr = document.createElement("p");
    mmr.className = "mmr";
    mmr.append("MMR ", crear("strong", redondear(jugador.calcularMMR())));

    const boton = crear("button", "Agregar a escuadra", "boton boton-sec");
    boton.type = "button";
    boton.disabled = enEscuadra.includes(jugador);
    boton.addEventListener("click", () => agregarAEscuadra(jugador));

    tarjeta.append(rol, nombre, datos, extra, mmr, boton);
    contenedor.append(tarjeta);
  });
}

function agregarAEscuadra(jugador) {
  mensaje("mensaje-escuadra", "");

  if (escuadra.getJugadores().length >= 5) {
    mensaje("mensaje-escuadra", "La escuadra ya tiene 5 jugadores");
    return;
  }

  // agregarJugador devuelve true o false
  if (!escuadra.agregarJugador(jugador)) {
    mensaje("mensaje-escuadra", "No se pudo agregar al jugador");
    return;
  }

  dibujarEscuadra();
  dibujarJugadores();
}

function quitarDeEscuadra(jugador) {
  mensaje("mensaje-escuadra", "");

  // Escuadra no tiene quitar, así que se arma otra con los que quedan
  const restantes = escuadra.getJugadores().filter((j) => j !== jugador);
  escuadra = new Escuadra("Mi escuadra");
  restantes.forEach((j) => escuadra.agregarJugador(j));

  dibujarEscuadra();
  dibujarJugadores();
}

function dibujarEscuadra() {
  const lista = $("lista-escuadra");
  const miembros = escuadra.getJugadores();
  lista.replaceChildren();

  $("cupo-escuadra").textContent = miembros.length;
  $("mmr-promedio").textContent = redondear(escuadra.calcularPromedioMMR());

  if (miembros.length === 0) {
    lista.append(crear("li", "Aún no hay jugadores en la escuadra.", "vacio"));
    return;
  }

  miembros.forEach((jugador) => {
    const li = document.createElement("li");
    const info = crear("span", jugador.getGamertag() + " · MMR " + redondear(jugador.calcularMMR()));
    const quitar = crear("button", "Quitar", "btn-quitar");
    quitar.type = "button";
    quitar.addEventListener("click", () => quitarDeEscuadra(jugador));
    li.append(info, quitar);
    lista.append(li);
  });
}

// al cargar la página
mostrarCampoPorRol();
dibujarJugadores();
dibujarEscuadra();