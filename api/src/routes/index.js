const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogame = require('./videogame');
const videogames = require('./videogames');
const genres = require('./genres');
const createVideogame = require('./createVideogames');

const router = Router();

// Busco un videogame por su ID
router.use('/videogame', videogame);
// Busco los 100 primeros videogames o ?name="nemo" busco los de ese nombre
router.use('/videogames', videogames);
// Busco todos los genres
router.use('/genres', genres);
// Creo un video juego POST
router.use('/videogame', createVideogame);

module.exports = router;
