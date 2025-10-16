import mysql2 from 'mysql2/promise'

let db;

async function initDB() {
    try {
        // Conexion temporal para poder crear despues la bd
        // Es para acceder al servidor de mysql
        const conn = await mysql2.createConnection({
            user: "root",
            password: "Lucas123BC$21",
            host: "localhost",
        })

        await conn.query("CREATE DATABASE IF NOT EXISTS instragramSimple")
        console.log("Base de datos creada")


        // CreatePool es nuestra conexion principal, no funciona si no tenemos una base de datos como propiedad
        // Tambien tiene mejor rendimiento a muchas solicitudes simultaneas
        db = mysql2.createPool({
            user: "root",
            password: "Lucas123BC$21",
            host: "localhost",
            database: "instagramSimple"
        })
        
        return db

    } catch (error) {
        console.log(`Ocurrio un error: `, error)
    }
}

export {initDB, db} 
