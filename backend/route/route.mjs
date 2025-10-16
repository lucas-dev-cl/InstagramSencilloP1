import express from 'express'
import {crearUsuario, conseguirTodosLosPostDeUsuario} from '../controller/controller.mjs'

const route = express.Router()

route.post("/crearU", async (req, res) => {
    try {
        const {nombre, bio, avatarUrl} = req.body
        await crearUsuario(nombre, bio, avatarUrl)
        res.status(201).json({"message": "Usuario creado"})
    } catch (error) {
        res.status(500).json({"messageError": error})
    }
})

route.get("/posts/:userId", async (req, res) => {
    try {
        const userId = req.params.userId
        const posts = await conseguirTodosLosPostDeUsuario(userId)

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No se encontraron posts" });
        }

        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({"messageError": error})
    }
})



