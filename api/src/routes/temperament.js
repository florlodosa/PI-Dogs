const { Router } = require('express');

const router = Router();

const { getTemperaments } = require('../controllers/temperament.js');

router.get('/', getTemperaments);



module.exports = router;

// [ ] GET /temperament:
// Obtener todos los temperamentos posibles
// En una primera instancia deberán obtenerlos desde la 
// API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí