import {crearUsuario} from "./fetchs/CRUDsUsuario.js"

/* Elemento donde se mostrará el mensaje de éxito o error */
const resultadoUsuario = document.getElementById("resultadoUsuario")

/* 
   Función para mostrar mensajes de feedback al usuario
   texto → mensaje a mostrar
   tipo  → "exito" | "error"
*/
function mostrarMensaje(texto, tipo) {
    /* Insertamos el texto del mensaje */
    resultadoUsuario.textContent = texto

    /* Reiniciamos todas las clases del mensaje */
    resultadoUsuario.className = "mt-4 px-4 py-2 rounded border font-medium"

    /* Estilos según el tipo de mensaje */
    if (tipo === "exito") {
        resultadoUsuario.classList.add("border-green-400", "bg-green-200/60", "text-green-900")
        document.getElementById("formularioCrearUsuario").reset()
    } else {
        resultadoUsuario.classList.add("border-red-400", "bg-red-200/60", "text-red-900")
    }

    // Se elimina después de 4 segundos
    setTimeout(() => {
        resultadoUsuario.textContent = ""
        resultadoUsuario.className = "mt-4" // limpio
    }, 4000)
}

/* 
   Evento del formulario de creación de usuario
   Hace la request al backend y muestra el resultado
*/
document.getElementById("formularioCrearUsuario").addEventListener("submit", async (e) => {
    e.preventDefault()
        
    /* Tomamos los valores del formulario */
    const nombre = document.getElementById("nombreCrear").value
    const bio = document.getElementById("bio").value
    let avatar = document.getElementById("avatarUrl").value || 'https://www.gravatar.com/avatar/?d=mp&s=150'
    
    try {
        const object = {nombre: nombre, bio: bio, avatarUrl: avatar}

        // Obtenemos la respuesta del crear usuario
        const data = await crearUsuario(object)

        mostrarMensaje(`Usuario "${data.usuario.nombre}" fue creado exitosamente`, "exito")

    } catch (error) {
        // El catch recibe justamente error.message, el texto que vos pusiste en new Error().
        mostrarMensaje(error.message, "error")
    }
})