import {getDB} from '../config/database.mjs'

// Crea un usuario en la base de datos
export async function crearUsuario(nombre, bio, avatarUrl) {
    try {
        let db = getDB() // Agarramos la conexion ya inicializada

        // query devuelve un array de 2 elementos que son objetos, rows y fields, en este caso nos interesa agarrar el primer parametro para poder agregar un elemento
        // en rows 'result' tenemos los datos de las filas mientras que en fields tenemos los metadatos, en este caso nos interesa la informacion por eso usamos el primer parametro
        const [result] = await db.query("INSERT INTO usuario (nombre, bio, avatarUrl) VALUES (?, ?, ?)", [nombre, bio, avatarUrl])

        console.log("Usuario creado con el ID: ", result.insertId)

        // Para devolver algo al cliente
        return {
            nombre
        }
    } catch (error) {
        console.log("Error al crear usuario: ", error)
        throw error
    }
}

// Busca usuarios según prefijo de nombre
export async function buscarUsuariosDB(username, limit) {
    try {
        let db = getDB()
        // Buscamos usuarios que coincidan con el nombre o empiecen de forma similar, con un limite de 5
        // `%${username}%` los % hacen que busque coincidencias parciales
        // luc% => startsWith %luc => endsWith %luc% => includes
        const [usuarios] = await db.query("SELECT * FROM usuario WHERE nombre LIKE ? LIMIT ?", [`${username}%`, limit])
        // Contamos los usuario que empiecen con ese nombre, a la funcion la llamamos "total", es la clave del objeto que va a retornar
        const [totalUsuairios] = await db.query("SELECT COUNT(*) AS total FROM usuario WHERE nombre LIKE ?", [`${username}%`])        
        
        return {
            usuariosLista: usuarios,
            totalUsuarios : totalUsuairios[0].total // Como devuelve una lista, agarramos el primer elemento (en este caso es el unico objeto con solo una clave), y agarramos la propiedad 
        }
    } catch (error) {
        console.log("Error al conseguir usuarios: ", error)
    }
}

// Busca un usuario por coincidencia exacta (insensible a mayúsculas/minúsculas)
export async function buscarUsuarioDB(nombre) {
    try {
        let db = getDB()

        const [row] = await db.query("SELECT * FROM usuario WHERE LOWER(nombre) = LOWER(?)", [String(nombre)]) 
        
        // Al devolver una lista de objetos, agarramos al primero, deberia de ser el unico
        return row[0]
    } catch (error) {
        console.log("Error al conseguir usuario: ", error)
    }
}

// Elimina un usuario por nombre
export async function eliminarUsuario(username) {
    try {
        let db = getDB()
        const [result] = await db.query("DELETE FROM usuario WHERE nombre = ?", [username])

        if (result.affectedRows > 0) {
            console.log("Usuario eliminado correctamente")
            return {
                username,
                encontrado: true
            }
        } else {
            console.log("No se encontró el usuario con ese ID")
            return{
                username,
                encontrado: false
            }
        }

    } catch (error) {
        console.log("Error al eliminar usuarios: ", error)
    }
}

// Busca un usuario por ID numérico
export async function buscarUsuarioPorId(userId) {
    try {
        let db = getDB()

        const [row] = await db.query("SELECT * FROM usuario WHERE id = ?", [userId])

        return row[0]
        
    } catch (error) {
        console.log("Error al conseguir usuario: ", error)
    }
}

// Actualiza un usuario por nombre actual
export async function actualizarUsuario(nombre, nuevoNombre, bio, avatarUrl) {
    try {
        let db = getDB()
        const [result] = await db.query(
            "UPDATE usuario SET nombre = ?, bio = ?, avatarUrl = ? WHERE nombre = ?",
            [nuevoNombre, bio, avatarUrl, nombre]
        );

        if (result.affectedRows > 0) {
            console.log("Usuario actualizado correctamente")
            return {
                encontrado: true
            }
        } else {
            console.log("No se encontró el usuario con ese nombre")
            return{
                encontrado: false
            }
        }
    } catch (error) {
        console.log("Error al actualizar usuario: ", error)
    }
}

