import {getDB} from '../config/database.mjs'

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
    }
}

export async function buscarUsuarios(username) {
    try {
        let db = getDB()
        // `%${username}%` los % hacen que busque coincidencias parciales
        // luc% => startsWith %luc => endsWith %luc% => includes
        const [rows] = await db.query("SELECT * FROM usuario WHERE nombre LIKE ?", [`${username}%`])
        
        return rows
    } catch (error) {
        console.log("Error al conseguir usuarios: ", error)
    }
}

export async function eliminarUsuario(userId) {
    try {
        let db = getDB()
        const [result] = await db.query("DELETE FROM usuario WHERE id = ?", [userId]);

        if (result.affectedRows > 0) {
            console.log("Usuario eliminado correctamente");
            return {
                userId
            }
        } else {
            console.log("No se encontró el usuario con ese ID");
        }

    } catch (error) {
        console.log("Error al conseguir usuarios: ", error)
    }
}

export async function actualizarUsuario(userId, nombre, bio, avatarUrl) {
    try {
        let db = getDB()
        const [result] = await db.query(
            "UPDATE usuario SET nombre = ?, bio = ?, avatarUrl = ? WHERE id = ?",
            [nombre, bio, avatarUrl, userId]
        );

        if (result.affectedRows > 0) {
            console.log("Usuario actualizado correctamente");
        } else {
            console.log("No se encontró el usuario con ese ID");
        }
    } catch (error) {
        console.log("Error al actualizar usuario: ", error);
    }
}

