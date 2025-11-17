const PORT = 3000
const baseUrl = `http://localhost`

// CREA UN USUARIO EN LA BASE DE DATOS
export async function crearUsuario(data) {
    const res = await fetch(`${baseUrl}:${PORT}/api/crearUsuario`, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(data)
    })

    // Se usa junto con throw para detener la ejecución normal y pasar el control a un catch superior.
    if(!res.ok){
        const err = await res.json()
        throw new Error(err.messageError || "Error al crear usuario")
    }

    return await res.json()
}

// BUSCA UN USUARIO POR NOMBRE (ruta /users/:nombre)
export async function buscarUsuario(nombre) {
    const res = await fetch(`${baseUrl}:${PORT}/api/users/${nombre}`)

    if(!res.ok){
        const err = await res.json()
        throw new Error(err.messageError || "Error al buscar usuario")
    }

    return await res.json()
}

// BUSCA VARIOS USUARIOS (usa query params ?nombre=...&limit=...)
export async function buscarUsuarios(nombre, limit) {
    const res = await fetch(`${baseUrl}:${PORT}/api/users?nombre=${nombre}&limit=${limit}`)

    return await res.json()
}

// BUSCA UN USUARIO POR ID (ruta /usersId/:id)
export async function buscarUsuarioPorId(id) {
    const res = await fetch(`${baseUrl}:${PORT}/api/usersId/${id}`)

    if(!res.ok){
        const err = await res.json()
        throw new Error(err.messageError || "Error al buscar usuario")
    }

    return await res.json()
}

// ELIMINA UN USUARIO POR NOMBRE (DELETE /users/:nombre)
export async function eliminarUsuario(nombre) {
    const res = await fetch(`${baseUrl}:${PORT}/api/users/${nombre}`, {
        method: "DELETE"
    })

    return await res.json()
}

// MODIFICA UN USUARIO EXISTENTE (PUT /users/:nombre)
export async function modificarUsuario(nombre, data) {
    const res = await fetch(`${baseUrl}:${PORT}/api/users/${nombre}`, {
        method: "PUT",
        headers: {"content-type":"application/json"},
        body: JSON.stringify(data)
    })
    
    if(!res.ok){
        const err = await res.json()
        throw new Error(err.messageError || "Error al modificar usuario")
    }

    return await res.json()
}

