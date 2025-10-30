import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

const URL = "https://www.ejemplos.co/300-ejemplos-de-verbos-en-ingles-y-espanol/";

async function scrapeVerbs() {
  try {
    const { data } = await axios.get(URL);
    const $ = cheerio.load(data);

    const verbs = [];

    // Buscar cada fila dentro de la tabla principal
    $("table tbody tr").each((i, el) => {
      const columns = $(el).find("td");

      // Primera columna: verbo base y traducción
      const baseAndTranslation = $(columns[0]).text().trim().split("\n").map(x => x.trim()).filter(x => x);

      const base_form = baseAndTranslation[0] || "";
      const translation = baseAndTranslation[1] || "";

      const past_simple = $(columns[1]).text().trim();
      const past_participle = $(columns[2]).text().trim();

      // Evitamos agregar filas vacías
      if (base_form && past_simple && past_participle) {
        verbs.push({ base_form, past_simple, past_participle, translation });
      }
    });

    console.log(`✅ Se extrajeron ${verbs.length} verbos`);

    fs.writeFileSync("./verbs_data.json", JSON.stringify(verbs, null, 2), "utf-8");
    console.log("📁 Archivo verbs_data.json creado correctamente.");

  } catch (err) {
    console.error("❌ Error durante el scraping:", err.message);
  }
}

scrapeVerbs();
