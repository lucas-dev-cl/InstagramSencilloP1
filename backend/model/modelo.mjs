import {initDB, db} from '../config/database.mjs'

async function crearTablaUsuario() {
    try {
        await initDB()
    
        const query = `
            CREATE TABLE IF NOT EXISTS usuario (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) UNIQUE,
                bio VARCHAR(255),
                avatarURL VARCHAR(255) DEFAULT NULL
            )
        `

        // Variable modificada y conectada a la base de datos
        await db.query(query)
        console.log("Tabla 'usuarios' creada")    
    
    } catch (error) {
        console.log(`Ocurrio un error: `, error)   
    }
}

async function crearTablaPost() {
    try {
        await initDB()
    
        // ON DELETE CASCADE, es cuando eliminamos al usuario eliminamos todos sus posts
        const query = `
            CREATE TABLE IF NOT EXISTS post (
                id INT AUTO_INCREMENT PRIMARY KEY,
                description VARCHAR(255),
                imageUrl VARCHAR(255) UNIQUE,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                userId INT NOT NULL,
                FOREIGN KEY (userId) REFERENCES usuario(id) ON DELETE CASCADE
            )
        `

        // Variable modificada y conectada a la base de datos
        await db.query(query)
        console.log("Tabla 'posts' creada")    
    
    } catch (error) {
        console.log(`Ocurrio un error: `, error)   
    }
}

crearTablaUsuario()
crearTablaPost()