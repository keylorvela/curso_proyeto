const mysql = require('mysql2');
require('dotenv').config();

const dbUri = process.env.DB_URI;

const dbConnection = mysql.createConnection(dbUri);

dbConnection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.message);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
  }
});
module.exports = dbConnection;

