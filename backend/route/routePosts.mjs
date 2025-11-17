import express from 'express'
import {crearPost, eliminarPost, conseguirPostUsuario, conseguirPosts} from '../controller/controllerPosts.mjs'

const route = express.Router()

/**
 * Crear un post nuevo
 * Método: POST
 * Ruta: /crearPost
 * Recibe: description, imageUrl, userId por body (JSON)
 */

route.post("/crearPost", async (req, res) => {
    try {
        const {description, imageUrl, userId} = req.body
        const nuevoPost = await crearPost(description, imageUrl, userId)
        res.status(201).json({
            message: "Post creado correctamente", 
            post: nuevoPost
        })
    } catch (error) {
        res.status(500).json({
            messageError: "Error al crear el post"
        })
    }
})

/**
 * Obtener posts
 * Método: GET
 * Ruta: /post
 * Query params:
 *      - description: para buscar por coincidencia
 *      - limit: cuántos mostrar
 */

route.get("/post", async (req, res) => {
    try {
        const {description, limit} = req.query
        let limiteSeguro = Number(limit)
        const posts = await conseguirPosts(description, limiteSeguro)
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({"messageError": error})
    }
})

/**
 * Obtener todos los posts de un usuario
 * Método: GET
 * Ruta: /post/:id
 * Param: id → userId
 */

route.get("/post/:id", async (req, res) => {
    try {
        const userId = req.params.id
        const posts = await conseguirPostUsuario(userId)

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No se encontraron posts" });
        }

        res.status(200).json(posts)
    } catch (error) {
        console.log(`Error al buscar posts: `, error)        
    }
})

/**
 * Eliminar un post por ID
 * Método: DELETE
 * Ruta: /post/:id
 * Param: id → postId
 */

route.delete("/post/:id", async (req, res) => {
    try {
        const postId = req.params.id
        // Llamamos al controlador que elimina el post
        const postEliminado = await eliminarPost(postId) 

        if (!postEliminado) {
            return res.status(404).json({ error: "No se encontró el post" });
        }

        // 204 → No Content (perfecto cuando solo eliminás sin devolver datos)
        res.status(204).send()
    } catch (error) {
        console.log(`Error al eliminar post: `, error)
    }
})

export default route