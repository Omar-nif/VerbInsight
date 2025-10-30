import sqlite3 from 'sqlite3';
import fs from "fs";

// conexion con base de datos
const db = new sqlite3.Database("./verbs.db", (err) => {
    if (err) {
        console.error("Error al conectar con la base de datos:", err.message);
    } else {
        console.log("Cpnectado a la base de datos SQLite");
    }
});

// leemos el json
const verbsData = JSON.parse(fs.readFileSync("./src/utils/verbs_data.json", "utf-8"));

db.serialize(() => {
    const stmt = db.prepare(`
        INSERT INTO verbs (base_form, past_simple, past_participle)
        VALUES (?,?,?)
    `);

    verbsData.forEach((verb) => {
        stmt.run(verb.base_form, verb.past_simple, verb.past_participle, (err) =>{
            if (err) {
                console.error("Error al insertar verbo:", verb.base_form, err.message);
            }
        });
    });

    stmt.finalize(() => {
        console.log(`Se insertaaron ${verbsData.length} verbos en la base de datos`);
    });
});

db.close();