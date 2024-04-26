import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbUri : string = process.env.DB_URI!;

const pool = mysql.createPool({
    uri: dbUri,
    waitForConnections: true,
    connectionLimit: 4,
    maxIdle: 4,
    enableKeepAlive: true
});

pool.getConnection()
    .then( connection => {
        console.log("Conexión con la base de datos exitosa!");
        connection.release();
    })
    .catch( error => {
        console.error("Error al conectar con la base de datos:", error);
    } )

export default pool;


