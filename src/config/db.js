import sqlite3 from "sqlite3";

// Creamos una base de datos
const db = new sqlite3.Database("../verbs.db", (err) => {
    if (err) {
        console.error("Error al conectar con la base de datos:", err.message);
    } else {
        console.log("Conectado a la base de datos SQLite");
    }
});

// Exportamos la conexion
export default db;

// Creamos la tabla verbs
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS verbs( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        base_form TEXT NOT NULL,
        past_simple TEXT,
        past_participle TEXT,
        translation TEXT
        )
    `);
});