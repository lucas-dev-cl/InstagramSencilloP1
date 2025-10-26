import {getDB} from '../config/database.mjs'

export async function crearPost(description, imageUrl, userId) {    
    try {
        let db = getDB()

        const [result] = db.query(`INSERT INTO post (description, imageUrl, userId) VALUES (?, ?, ?)`, [description, imageUrl, userId])
        
        console.log(`Post creado: `, result.insertId)

        return {
            userId
        }
    } catch (error) {
        console.log("Error al crear post: ", error)
    }
}

export async function conseguirPostUsuario(userId) {
    try {
        let db = getDB()

        const [result] = db.query(`SELECT * FROM post WHERE userId = ? ORDER BY createdAt DESC`, userId)
        
        return result
    } catch (error) {
        console.log("Error al conseguir posts: ", error)
    }    
}

export async function eliminarPost(postId) {
    try {
        let db = getDB()

        const [result] = db.query(`DELETE FROM post WHERE id = ?`, [postId])

         if (result.affectedRows > 0) {
            console.log("Post eliminado correctamente");
            return {
                userId
            }
        } else {
            console.log("No se encontró el post con ese ID");
        }

    } catch (error) {
        console.log("Error al eliminar post: ", error)
    }    
}