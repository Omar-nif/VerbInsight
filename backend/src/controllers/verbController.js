import db from "../config/db.js";

// Obtener información de un verbo
export const getVerbInfo = (req, res) => {
    const verb = req.params.verb.toLowerCase(); // Tomamos el verbo desde la URL

    // Consulta SQL: busca el verbo en cualquiera de sus formas
    const query = `
        SELECT * FROM verbs
        WHERE base_form = ? OR past_simple = ? OR past_participle = ? OR translation = ?
    `;

    db.get(query, [verb, verb, verb, verb], (err, row) => {
        if (err) {
            console.error("Error al buscar el verbo:", err.message);
            res.status(500).json({ error: "Error interno del servidor" });
        } else if (!row) {
            res.status(404).json({ message: "Verbo no encontrado" });
        } else {
            res.json({
                base_form: row.base_form,
                past_simple: row.past_simple,
                past_participle: row.past_participle,
                translation: `
                    El verbo "${row.base_form}" significa 
                    "${row.translation}". 
                    Su pasado simple es "${row.past_simple}" 
                    y su participio pasado es "${row.past_participle}".
                `
            });
        }
    });
};


