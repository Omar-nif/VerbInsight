import express from "express";
import dotenv from "dotenv"; //sirve para leer cosas del .env
import cors from "cors";
import verbRoutes from "./routes/verbs.js";

dotenv.config(); //configuracion (o lectura) del .env, no nesesita que le pases nada, 

const app = express(); //app es un objeto para usar express
const PORT = process.env.PORT || 3000; // aqui se dice que el puerto sera igual a el .PORT del .env si no sera 3000

app.use(cors());

app.use(express.json());

app.use(express.json()); // Esto convierte peticiones JSON a un objeto javascript dentro de req.body
app.use("/api/verbs", verbRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); 
});

