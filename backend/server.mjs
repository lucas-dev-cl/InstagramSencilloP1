import express from 'express'
import generalRoute from './route/route.mjs'
import cors from 'cors'
import {initDB} from './config/database.mjs'

const app = express()
const PORT = 3000

app.use(cors())

// Inicializamos la base de datos antes de arrancar el servidor
await initDB();

// Middleware para poder leer JSON en req.body
app.use(express.json())

// Usar la ruta
app.use('/api', generalRoute)

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/api`)
})