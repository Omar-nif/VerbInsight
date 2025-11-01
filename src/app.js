import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"; 
import { fileURLToPath } from "url"; 
import verbRoutes from "./routes/verbs.js";

// Configuración de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- Configuración para rutas y archivos ---
app.use(cors());
app.use(express.json());

// ---  Servir archivos estáticos del frontend ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Esto sirve los archivos dentro de /public
app.use(express.static(path.join(__dirname, "public")));

// ---  Rutas de la API ---
app.use("/api/verbs", verbRoutes);

app.get(/^\/.*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ---  Iniciar servidor ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
