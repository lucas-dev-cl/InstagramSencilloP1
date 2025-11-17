import {buscarPosts, eliminarPost} from "../scripts/fetchs/CRUDsPost.js"
import {buscarUsuarioPorId} from "../scripts/fetchs/CRUDsUsuario.js"

// Contenedor donde se van a mostrar todos los posts encontrados
const contenedorPost = document.getElementById("contenedorPosts")

/**
 * Evento del formulario de búsqueda de posts
 * Cuando el usuario envía el formulario, se hace una búsqueda al backend.
 */

document.getElementById("buscarPostForm").addEventListener("submit", async (e) => {
    e.preventDefault()

    // Valor ingresado en el input de búsqueda
    const descripcion = document.getElementById("buscadorPost").value.trim()

    try {

        // Limpia los resultados anteriores
        contenedorPost.innerHTML = ""

        // Busca los posts según la descripción y limit de 10        
        const posts = await buscarPosts(descripcion, 10)
        
        // RENDERIZAR RESULTADOS
        posts.forEach(async (post) => {
            let user = await buscarUsuarioPorId(post.userId)
            contenedorPost.innerHTML += `
            <article id="post-${post.id}" class="relative overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg mb-4 bg-white">
                <!-- Botones arriba a la derecha -->
                <div class="absolute top-2 right-2 flex gap-2 z-10">
                    <button 
                        onclick="modificarPost(${post.id})" 
                        class="px-2 py-3 text-xs text-white bg-blue-600/90 rounded-md hover:bg-blue-700 transition"
                    >
                        Modificar
                    </button>

                    <button 
                        onclick="handlerEliminarPost(${post.id})" 
                        class="px-2 py-3 text-xs text-white bg-red-600/90 rounded-md hover:bg-red-700 transition"
                    >
                        Eliminar
                    </button>
                </div>

                <img alt="" src="${post.imageUrl}" class="h-56 w-full object-cover">

                <div class="p-4 sm:p-6">
                    <h3 class="mt-0.5 text-lg text-gray-900">${user.nombre}</h3>
                    <p class="text-gray-700 mb-2">${post.description}</p>
                </div>
            </article>`
        })
    } catch (error) {
        console.log(error)
    }
})

/**
 * Función global para eliminar un post
 * Se llama desde el botón "Eliminar" de cada card.
 */

window.handlerEliminarPost = async function (postId) {
    try {
        // Llama al backend para eliminarlo
        await eliminarPost(postId)
        
        // Seleccionamos la card del DOM
        const card = document.getElementById(`post-${postId}`)

        // Si existe, la eliminamos visualmente
        if (card) card.remove()
    } catch (error) {
        console.error("Error al eliminar:", error);
    }
}
