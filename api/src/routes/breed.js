const { Router } = require('express');

const router = Router();

const { getBreeds, getBreedById, createBreed } = require('../controllers/breed.js');


router.get('/dogs', getBreeds);
router.get('/dogs/:id', getBreedById);
router.post('/dog', createBreed);
//post no trae temperamentos

module.exports = router;


// [ ] POST /dog:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
// Crea una raza de perro en la base de datos