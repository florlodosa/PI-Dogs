require('dotenv').config();
const {
    API_KEY,
    URL_BASE_API,
} = process.env;
const axios = require ('axios');
const { Breed, Temperament } = require('../db.js');

const getApiInfo = async (req, res, next) => {
    try {
        const apiUrl = await axios.get(`${URL_BASE_API}?api_key=${API_KEY}`);
        const apiInfo = await apiUrl.data.map( e => (
            {
                id: e.id,
                name: e.name,
                image: e.image.url,
                temperaments: e.temperament.split(', ').map(e => e),
                life_span: e.life_span,

            }
        ))
        
    } catch (err) {
        next(err);
    }
}
// Imagen
// Nombre
// Temperamento
// Peso
// Altura
// Años de vida

// weight": {

//     "imperial": "6 - 13",
//     "metric": "3 - 6"

// },
// "height": {

//     "imperial": "9 - 11.5",
//     "metric": "23 - 29"

// },


module.exports = {
    getApiInfo,
    getDbInfo,
    
}

// [ ] GET /dogs:
// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta principal
// [ ] GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado
// [ ] GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados
// [ ] POST /dog:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
// Crea una raza de perro en la base de datos