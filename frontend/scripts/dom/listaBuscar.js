import { eliminarUsuario } from "../fetchs/CRUDsUsuario.js"
import { buscarUsuario } from "../fetchs/CRUDsUsuario.js"

const contenedorResultado = document.getElementById("contenedorResultadosBusqueda")
const detalleUsuario = document.getElementById("detalleUsuario")
const infoUsuario = document.getElementById("infoUsuario")
const volver = document.getElementById("volver")

export function renderUsuarios(listaUsuarios, resultado) {
  resultado.innerHTML = ""

  if (listaUsuarios.length === 0) {
    resultado.innerHTML = `<li>No se encontró ningún usuario</li>`
    return
  }

  listaUsuarios.forEach(usuario => {
    const li = document.createElement("li")
    li.className = `
      flex items-center justify-between gap-4
      bg-gray-800 px-4 py-3 rounded
      cursor-pointer hover:bg-gray-700 transition
    `


    li.innerHTML = `
      <div class="flex items-center gap-3 flex-1">
        <img src="${usuario.avatarURL}" class="w-12 h-12 rounded-full object-cover">
        <span class="text-white">${usuario.nombre}</span>
      </div>
    `
    
    // Botón mostrar detalles
    const btnMostrarDetalles = document.createElement("button")
    btnMostrarDetalles.textContent = "Mostrar Info"
    btnMostrarDetalles.className = `
    bg-blue-600 hover:bg-blue-700 
    text-white text-sm 
    px-3 py-1 rounded 
    transition
    `
    
    btnMostrarDetalles.addEventListener("click", () => {
      mostrarDetallesUsuario(usuario.nombre)
      contenedorResultado.classList.add("hidden")
    })

    // Botón eliminar
    const btnEliminar = document.createElement("button")
    btnEliminar.textContent = "Eliminar"
    btnEliminar.className = `
    bg-red-600 hover:bg-red-700 
    text-white text-sm 
    px-3 py-1 rounded 
    transition
    `
    
    btnEliminar.addEventListener("click", (e) => {
      e.stopPropagation() // evita abrir detalles
      eliminarUsuario(usuario.nombre) // eliminamos por nombre
      li.remove()
    })
    
    // Añadimos los botones al li
    li.appendChild(btnMostrarDetalles)
    li.appendChild(btnEliminar)

    // Añadimos los li al div del resultado que muestra la busqueda
    resultado.appendChild(li)
  })

  contenedorResultado.classList.remove("hidden")
}

async function mostrarDetallesUsuario(nombre) {
  const data = await buscarUsuario(nombre)
    
  infoUsuario.innerHTML = `
    <div class="bg-gray-800 rounded-lg p-6 shadow-md flex flex-col items-center text-center gap-4">
      <img src="${data.avatarURL}" 
          class="w-28 h-28 rounded-full object-cover border-4 border-indigo-500" 
          alt="Avatar de ${data.nombre || 'usuario'}">
      
      <h3 class="text-2xl font-semibold text-white">${data.nombre}</h3>

      <p class="text-gray-300 text-sm max-w-sm">
        ${data.bio || "Sin descripción disponible."}
      </p>
    </div>
  `

  detalleUsuario.classList.toggle("hidden")
}

volver.addEventListener("click", () => {
  detalleUsuario.classList.toggle("hidden")
})