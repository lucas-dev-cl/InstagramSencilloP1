const PORT = 3000
const baseUrl = `http://localhost`

/**
 * Crear un post (frontend → backend)
 * Recibe un objeto con: description, imageUrl, userId
 * Hace un POST a /api/crearPost
 */

export async function crearPost(data) {
    const res = await fetch(`${baseUrl}:${PORT}/api/crearPost`, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(data)       
    })

    // Si el backend devuelve un error (status 4xx o 5xx)
    if(!res.ok){
        const err = await res.json()
        throw new Error(err.messageError) 
    }

    // Devuelve la respuesta parseada como JSON
    return await res.json()
}

/**
 * Buscar o listar posts
 * GET → /api/post?description=...&limit=...
 *
 * - descripcion: texto que el usuario escribe
 * - limit: cuántos posts mostrar
 */

export async function buscarPosts(descripcion, limit) {
    const res = await fetch(`${baseUrl}:${PORT}/api/post?description=${descripcion}&limit=${limit}`)

    if(!res.ok){
        const err = await res.json()
        throw new Error(err.messageError) 
    }

    return await res.json()
}

/**
 * Eliminar un post
 * DELETE → /api/post/:id
 *
 * NO retornamos nada porque el backend devuelve 204 No Content.
 * Si quisieras, podrías validar res.ok igual que en las otras funciones.
 */

export async function eliminarPost(postId) {
    await fetch(`${baseUrl}:${PORT}/api/post/${postId}`, {
        method: "DELETE"
    })
}
