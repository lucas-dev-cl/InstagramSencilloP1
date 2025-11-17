import express from 'express'
import {crearUsuario, buscarUsuariosDB, eliminarUsuario, actualizarUsuario, buscarUsuarioDB, buscarUsuarioPorId} from '../controller/controller.mjs'

const route = express.Router()

/* 
   Crear un usuario
   POST /crearUsuario
*/
route.post("/crearUsuario", async (req, res) => {
    try {
        const {nombre, bio, avatarUrl} = req.body
        const nuevoUsuario = await crearUsuario(nombre, bio, avatarUrl)

        res.status(201).json({
            message: "Usuario creado con éxito",
            usuario: nuevoUsuario
        })
        
    } catch (error) {
        /* ER_DUP_ENTRY → error de clave duplicada (usuario ya existe) */
        if (error.code === "ER_DUP_ENTRY") {
            res.status(409).json({ messageError: "El usuario ya existe" });
        } else {
            res.status(500).json({ messageError: "Error interno del servidor" });
        }
    }
})

/* 
   Buscar usuarios por nombre (con límite)
   GET /users?nombre=algo&limit=5
*/
route.get("/users", async (req, res) => {
    try {
        // parametro
        //const userId = req.params.username
        const {nombre, limit} = req.query
        let limiteSeguro = Number(limit) || 5
        const users = await buscarUsuariosDB(nombre, limiteSeguro)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({"messageError": error})
    }    
})

/* 
   Buscar usuario por ID
   GET /usersId/:id
*/
route.get("/usersId/:id", async (req, res) => {
    try {
        const userId = req.params.id
        const user = await buscarUsuarioPorId(userId)
    
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({
                messageError: `No se encontró el usuario con ese id`
            })
        }
    } catch (error) {
        res.status(500).json({"messageError": error})
    }
})

/* 
   Buscar usuario por nombre exacto
   GET /users/:nombre
*/
route.get("/users/:nombre", async (req, res) => {
    try {
        const username = req.params.nombre
        const user = await buscarUsuarioDB(username)
    
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({
                messageError: `No se encontró el usuario con el nombre ${username}`
            })
        }
    } catch (error) {
        res.status(500).json({"messageError": error})
    }
})

/* 
   Eliminar usuario por nombre
   DELETE /users/:deleteUser
*/
route.delete("/users/:deleteUser", async (req, res) => {
    try {
        const user = req.params.deleteUser
        const usuarioEliminado = await eliminarUsuario(user)

        if (usuarioEliminado.encontrado) {
            res.status(200).json({
                message: "Usuario eliminado", 
                usuarioId: usuarioEliminado.userId
            })
        } else {
            res.status(404).json({
                messageError: `No se encontró el usuario con id ${user}`
            })
        }
        
    } catch (error) {
        res.status(500).json({"messageError": error})
    }   
})

/* 
   Actualizar un usuario por nombre
   PUT /users/:nombreUsuario
*/
route.put("/users/:nombreUsuario", async (req, res) => {
    try {
        const usuario = req.params.nombreUsuario
        const { nombre, bio, avatarUrl } = req.body

        const resUsuario = await actualizarUsuario(usuario, nombre, bio, avatarUrl)

        if(resUsuario.encontrado){
            res.status(200).json({ message: "Usuario actualizado" })
        }
        else {
            res.status(404).json({
                messageError: `No se encontró el usuario con el nombre '${usuario}'`
            })
        }
    } catch (error) {
        res.status(500).json({ messageError: error })
    }
})

export default route


