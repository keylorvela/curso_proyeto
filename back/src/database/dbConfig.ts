import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbUri : string = process.env.DB_URI!;

export default mysql.createPool(dbUri);


