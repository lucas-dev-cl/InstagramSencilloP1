import express from 'express'
import {crearPost, eliminarPost, conseguirPostUsuario, eliminarPost} from '../controller/controllerPosts.mjs'

const route = express.Router()

route.post("/crearPost", async (req, res) => {
    try {
        const {description, imageUrl, userId} = req.body
        const nuevoPost = await crearPost(description, imageUrl, userId)
        res.status(201).json({
            message: "Post creado correctamente", 
            post: nuevoPost
        })
    } catch (error) {
        console.log(`Error al crear post: `, error)
    }
})

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

route.delete("/post/:id", async (req, res) => {
    try {
        const postId = req.params.id
        const postEliminado = await eliminarPost(postId) 
        res.status(200).json({
            message: "Post eliminado correctamente",
            post: postEliminado
        })

    } catch (error) {
        console.log(`Error al eliminar post: `, error)
    }
})