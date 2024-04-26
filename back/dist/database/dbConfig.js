"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbUri = process.env.DB_URI;
const pool = promise_1.default.createPool({
    uri: dbUri,
    waitForConnections: true,
    connectionLimit: 4,
    maxIdle: 4,
    enableKeepAlive: true
});
pool.getConnection()
    .then(connection => {
    console.log("Conexión con la base de datos exitosa!");
    connection.release();
})
    .catch(error => {
    console.error("Error al conectar con la base de datos:", error);
});
exports.default = pool;
//# sourceMappingURL=dbConfig.js.map