import db from "../config/db";

// obtener informacion de un verbo
export const getVerbInfo = (req, res) => {
    const verb = req.params.verb.toLowerCase(); //tomamos el verbo desde la url

    // Consulta SQL: Buscar el verbo en cualquiera de sus formas
    const query = `
    SELECT * FROM verbs
    WHERE base_form = ? OR past_simple = ? OR past_participle = ?
    `;
}

db.get(query, [verb, verb, verb], (err, row) => {
    if (err) {
        console.error("Error al buscar el verbo", err,message);
        res.status(500).json({error: "Error interno del servidor" });
    } else if (!row) {
        res.status(400).json({ message: "Verbo no encontrado"});
    } else {
        res.json({
            base_form: row.base_form,
            past_simple: row.past_simple,
            past_participle: row.past_participle,
            description: `El verbo "${row.base_form}" significa [traduccion pendiente]. Su pasado simple es "${row.past_simple} y su pasado participio es "${row.past_participle}".`
        });
    }
});

