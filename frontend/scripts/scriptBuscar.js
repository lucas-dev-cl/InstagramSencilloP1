import { buscarUsuarios } from "./fetchs/CRUDsUsuario.js"
import { renderUsuarios } from "./dom/listaBuscar.js"

const resultado = document.getElementById("resultadoBuscar")
const mostrarMas = document.getElementById("mostrarMas")
const mostrarMenos = document.getElementById("mostrarMenos")
let nombreBuscado = ""
let totalUsuarios = 0
let limit = 5

export async function buscarUsuariosFront(nombre, resultado, limit) {
  try {    
    const usuarios = await buscarUsuarios(nombre, limit) // Solo obtiene
    totalUsuarios = usuarios.totalUsuarios
    renderUsuarios(usuarios.usuariosLista, resultado) // Solo muestra
    actualizarBotones()
  } catch (error) {
    resultado.innerHTML = `<li>Error: ${error}</li>`
  }
}

// Evento "submit" ahora sólo llama a la función
document.getElementById("formularioBuscar").addEventListener("submit", (e) => {
  e.preventDefault()
  let nombre = document.getElementById("nombreBuscar").value
  nombreBuscado = nombre 
  buscarUsuariosFront(nombre, resultado, limit)
})

// == Logica de botones == 
mostrarMas.addEventListener("click", () => {
  // Nuevo limite
  limit += 5
  if(limit >= totalUsuarios) limit = totalUsuarios // Para no excedernos
  buscarUsuariosFront(nombreBuscado, resultado, limit)
})

mostrarMenos.addEventListener("click", () => {
  limit -= 5
  // Evitamos que baje demasiado
  if (limit < 5) limit = 5
  buscarUsuariosFront(nombreBuscado, resultado, limit)
})

function actualizarBotones() {
  // Mostrar menos solo si el limite actual es mayor al mínimo
  if (limit > 5) {
    mostrarMenos.classList.remove("hidden")
  } else {
    mostrarMenos.classList.add("hidden")
  }

  // Mostrar más solo si todavía hay usuarios por cargar
  if (limit < totalUsuarios) {
    mostrarMas.classList.remove("hidden")
  } else {
    mostrarMas.classList.add("hidden")
  }
}
