import {buscarUsuario} from "../scripts/fetchs/CRUDsUsuario.js"
import {crearPost} from "../scripts/fetchs/CRUDsPost.js"

/* Contenedor donde se mostrará el mensaje de éxito o error */
const resultadoCrearPost = document.getElementById("resultadoCrearPost")

/* Evento del formulario para crear un post */
document.getElementById("formularioCrearPost").addEventListener("submit", async (e) => {
    e.preventDefault()
    
    /* Tomamos los valores del formulario */
    const nombre = document.getElementById("nombreUsuarioCrearPost").value
    const descripcion = document.getElementById("descripcionCrearPost").value
    const imageUrl = document.getElementById("imagenCrearPost").value
    try {
        /* Buscamos el usuario por nombre para obtener su ID */
        const datosUsuarios = await buscarUsuario(nombre)

        /* Armamos el objeto que va al backend */
        const object = {description: descripcion, imageUrl: imageUrl, userId: datosUsuarios.id}
        const data = await crearPost(object)

        /* Reseteamos el formulario después de crear el post */
        document.getElementById("formularioCrearPost").reset()

        /* Mostramos mensaje de éxito */
        resultadoCrearPost.classList.remove("hidden")
        resultadoCrearPost.innerHTML = `
            <div class="mt-4 p-3 rounded-md bg-green-600/30 border border-green-500 text-green-200 flex items-start gap-3">
                <p class="text-sm">
                    ${data.message}
                </p>
            </div>`

        /* Ocultamos el mensaje después de unos segundos */
        ocultar(resultadoCrearPost)
    } catch (error) {
        /* Mostramos mensaje de error si algo falla */
        resultadoCrearPost.classList.remove("hidden")
        resultadoCrearPost.innerHTML = `
            <div class="mt-4 p-3 rounded-md bg-red-600/30 border border-red-500 text-red-200 flex items-start gap-3">
                <p class="text-sm">
                    ${error || error.message}
                </p>
            </div>`
            
        /* Ocultamos el mensaje después de unos segundos */
        ocultar(resultadoCrearPost)
    }  
})

function ocultar(resultado){
    setTimeout(() => {resultado.classList.add("hidden")}, 4000)
}