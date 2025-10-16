import {initDB, db} from '../config/database.mjs'

async function crearUsuario(nombre, bio, avatarUrl) {
    try {
        // query devuelve un array de 2 elementos, rows y fields, en este caso nos interesa agarrar el primer parametro para poder agregar un elemento
        const [result] = await db.query("INSERT INTO usuario (nombre, bio, avatarUrl) VALUES (?, ?, ?)", [nombre, bio, avatarUrl])

        console.log("Usuario creado: ", result)
    } catch (error) {
        console.log("Error al crear usuario: ", error)
    }
}

async function conseguirTodosLosPostDeUsuario(userId) {
    try {
        const [rows] = await db.query("SELECT * FROM post WHERE userId = ? ORDER BY createdAt DESC", [userId])

        return rows

    } catch (error) {
       console.log("Error al conseguir usuarios: ", error) 
    }    
}

export {crearUsuario, conseguirTodosLosPostDeUsuario}