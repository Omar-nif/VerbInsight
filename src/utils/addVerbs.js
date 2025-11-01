import db from "../config/db.js";

const newVerb = {
  base_form: "go",
  past_simple: "went",
  past_participle: "gone",
  translation: "ir",
};

db.run(
  `INSERT INTO verbs (base_form, past_simple, past_participle, translation)
   VALUES (?, ?, ?, ?)`,
  [newVerb.base_form, newVerb.past_simple, newVerb.past_participle, newVerb.translation],
  (err) => {
    if (err) {
      console.error("Error al insertar el verbo:", err.message);
    } else {
      console.log("Verbo agregado correctamente:", newVerb.base_form);
    }
    db.close();
  }
);
