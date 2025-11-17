import {getDB} from '../config/database.mjs'

/**
 * Crear un nuevo post
 * Recibe: descripción, URL de imagen y el ID del usuario.
 */

export async function crearPost(description, imageUrl, userId) {    
    try {
        let db = getDB()

        const [result] = await db.query(`INSERT INTO post (description, imageUrl, userId) VALUES (?, ?, ?)`, [description, imageUrl, userId])
        
        console.log(`Post creado: `, result.insertId)

        return {
            userId
        }
    } catch (error) {
        console.log("Error al crear post: ", error)
    }
}

/**
 * Buscar posts según una descripción.
 * Si no se envía descripción → devuelve todos (limitados).
 */

export async function conseguirPosts(descripcion, limit) {
    try {
        let db = getDB()
        
        if (!descripcion || descripcion.trim() === "") {
            // devolver todos
            const [result] = await db.query(`SELECT * FROM post LIMIT ?`, [limit])

            return result
        }

        // Devolver por coincidencia
        // Sacamos los espacios en ambos, tanto en la descripcion de la base de datos como en el parametro de busqueda
        const [result] = await db.query(`SELECT * FROM post WHERE REPLACE(description, " ", "") LIKE ? LIMIT ?`, [`${descripcion.replace(/\s+/g, "")}%`, limit])
        
        return result
    } catch (error) {
        console.log("Error al conseguir posts: ", error)
    }    
}

/**
 * Conseguir todos los posts de un usuario específico,
 * ordenados por fecha descendente.
*/

export async function conseguirPostUsuario(userId) {
    try {
        let db = getDB()

        const [result] = await db.query(`SELECT * FROM post WHERE userId = ? ORDER BY createdAt DESC`, userId)
        
        return result
    } catch (error) {
        console.log("Error al conseguir posts: ", error)
    }    
}

/**
 * Eliminar un post según su ID.
*/
export async function eliminarPost(postId) {
    try {
        let db = getDB()

        const [result] = await db.query(`DELETE FROM post WHERE id = ?`, [postId])

         if (result.affectedRows > 0) {
            console.log("Post eliminado correctamente");
            return true
        } else {
            console.log("No se encontró el post con ese ID");
        }

    } catch (error) {
        console.log("Error al eliminar post: ", error)
    }    
}