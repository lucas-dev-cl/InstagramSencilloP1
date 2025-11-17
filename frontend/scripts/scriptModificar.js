import {buscarUsuario, modificarUsuario} from "../scripts/fetchs/CRUDsUsuario.js"

/* Contenedor donde mostraremos los mensajes del resultado */
const resultadoModificar = document.getElementById("resultadoModificar")

/* Variable externa para recordar el nombre del usuario que buscamos,
   ya que luego lo necesitaremos para hacer la modificación */
let nombreBuscarUsuario = ""

/* Evento del formulario para buscar un usuario */
document.getElementById("formularioBuscarUsuario").addEventListener("submit", async (e) => {
    e.preventDefault()

    /* Guardamos el nombre ingresado para usarlo luego en la modificación */
    nombreBuscarUsuario = document.getElementById("nombreBuscarUsuario").value
    try {
        /* Buscamos el usuario por su nombre */
        const data = await buscarUsuario(nombreBuscarUsuario)
        // Llenamos los inputs del formulario de modificación
        document.getElementById("nombreModificar").value = data.nombre
        document.getElementById("bioModificar").value = data.bio || ""
        document.getElementById("avatarUrlModificar").value = data.avatarURL || "" 
        
        /* Mostramos mensaje de éxito */
        resultadoModificar.innerHTML = `  
            <div class="p-4 rounded-xl bg-blue-100 text-blue-800 border border-blue-300 shadow-sm">
                <p class="font-semibold">
                Usuario "<span class="text-blue-900">${data.nombre}</span>" encontrado.
                </p>
                <p class="text-sm opacity-80">Puedes modificarlo.</p>
            </div>`
    } catch (error) {   
        /* Si algo falla, mostramos el error en pantalla */
        resultadoModificar.innerHTML = `
            <div class="mt-4 p-3 rounded-md bg-red-600/30 border border-red-500 text-red-200 flex items-start gap-3">
                <p class="text-sm">
                    ${error.message}
                </p>
            </div>`
    }
})

/* Evento del formulario para modificar al usuario */
document.getElementById("formularioModificar").addEventListener("submit", async (e) => {
    e.preventDefault()

    /* Obtenemos los valores modificados del formulario */
    const nombreNuevo = document.getElementById("nombreModificar").value
    const bio = document.getElementById("bioModificar").value
    const avatarURL = document.getElementById("avatarUrlModificar").value || 'https://www.gravatar.com/avatar/?d=mp&s=150'
    
    /* Objeto con los nuevos datos que mandaremos al backend */
    const dataObject = {nombre: nombreNuevo, bio: bio, avatarUrl: avatarURL}
 
    try {
        /* Llamamos al fetch que modifica al usuario */
        const data = await modificarUsuario(nombreBuscarUsuario, dataObject)

        /* Mostramos mensaje de modificación exitosa */
        resultadoModificar.innerHTML = `
        <div class="p-4 rounded-xl bg-green-100 text-green-800 border border-green-300 shadow-sm">
            <p class="font-semibold">
            ${data.message}
            </p>
        </div>
        `    
    } catch (error) {
        resultadoModificar.innerHTML = `${error}`
    }
    
})