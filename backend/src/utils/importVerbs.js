import sqlite3 from "sqlite3";
import fs from "fs";

// Abrimos la conexión con la base de datos existente
const db = new sqlite3.Database("../../verbs.db", (err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err.message);
  } else {
    console.log("Conectado a la base de datos SQLite");
  }
});

// Leemos el archivo JSON generado con los verbos
const verbsData = JSON.parse(fs.readFileSync("./verbs_data.json", "utf-8"));

// Función para insertar los verbos
db.serialize(() => {
  const stmt = db.prepare(`
    INSERT INTO verbs (base_form, past_simple, past_participle, translation)
    VALUES (?, ?, ?, ?)
  `);

  verbsData.forEach((verb) => {
    stmt.run(
        verb.base_form, 
        verb.past_simple, 
        verb.past_participle,
        verb.translation, 
        (err) => {
      if (err) {
        console.error("Error al insertar verbo:", verb.base_form, err.message);
      }
    });
  });

  stmt.finalize(() => {
    console.log(`Se insertaron ${verbsData.length} verbos en la base de datos`);
  });
});

db.close();
