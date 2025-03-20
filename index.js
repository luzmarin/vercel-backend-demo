import express from 'express';
import { Router } from 'express';

// --- ini config.js --- //
import dotenv from 'dotenv';
dotenv.config();        //inicializar lectura de variables
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "HTTP://localhost"
const NOMBRE = process.env.NOMBRE || "Mundo"
// --- Fin config.js -----//

const app = express();

//Middlewares
app.use(express.json());        // Process el JSON BODY para leer con req.body()
app.use(express.urlencoded({extended: false}));


//Contenido estático
//app.use("origen", express.static("destino"));
app.use("/uploads", express.static('public/uploads'));
app.use("/web", express.static('public') );



app.get("/", (req, res, next) => {
    res.setHeader("Content-Type", "text/html");

    const landingHtml = `
        <h1>Hola ${NOMBRE}</h1>
        <p>Bienvenidos a nuestro Backend en Express</p>
        `;
        res.send(landingHtml)
})

//--- routes/index.routes.js ------//
// Rutas de mi API
const router = Router();
router.get("/", (req, res, next) => {
    res.json({Message: "Bienvenidos a nuestra API"});
})
router.get("/users", (req, res, next) => {
    res.json({Message:"Ruta para obtener usuarios"});
})
// --- routes/index.routes.js ----//
app.use('/api/v1', router);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${HOST}:${PORT}`);
});