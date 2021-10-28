require('dotenv').config();
const {
    API_KEY,
    URL_BASE_API,
} = process.env;
const axios = require ('axios');
const { Breed, Temperament } = require('../db.js');

const getApiInfo = async () => {
    try {
        const apiUrl = await axios.get(`${URL_BASE_API}?api_key=${API_KEY}`);
        const apiInfo = await apiUrl.data.map( e => {
            // let heightMin = parseInt(e.height.metric.split(' -'));
            // let heightMax = parseInt(e.height.metric.split('- '));
            // let weightMin = parseInt(e.weight.metric.split(' -')); 
            // let weightMax = parseInt(e.weight.metric.split('- '));
            return {
                id: e.id,
                name: e.name,
                image: e.image.url,
                temperaments: 
                e.temperament?.split(', ').map(e => e),
                life_span: e.life_span,
                weight: e.weight.metric,
                height: e.height.metric,
            }
        });

        return apiInfo;
        
    } catch (err) {
        console.error(err);
    }
}
// weight and height: "23 - 29"
// dentro del map fuera del return:
// let heightMin = parseInt(e.height.metric.split(' -'));
// let heightMax = parseInt(e.height.metric.split('- '));
// let weightMin = parseInt(e.weight.metric.split(' -')); 
// let weightMax = parseInt(e.weight.metric.split('- '));
// dentro del return:
// heigth =  (heightMin + heightMax) / 2,
// weight =  (weightMin + weightMax) / 2

const getDbInfo = async() => {
    try {
        return await Breed.findAll({
            include:{
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }
        })
    } catch (err) {
        console.error(err);
    }
}

const getAllBreeds = async() => {
    try {
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbInfo();
        const info = [...apiInfo, ...dbInfo];
        return info;
    } catch (err) {
        console.error(err);
    }
}

const getBreeds = async(req, res) => {
    try {
        const name = req.query.name;
        const allbreeds = await getAllBreeds();

        if(name){
            const breedName = await allbreeds.filter( e => e.name.toLowerCase().includes(name.toLowerCase()));
            breedName.length ?
            res.status(200).send(breedName) :
            res.status(404).send('Dog Not Found')
        } else {
            res.status(200).send(allbreeds);
        }

    } catch (err) {
        console.error(err);
    }
}

const getBreedById = async (req, res) => {
    try {
        const { id } = req.params;
        const allBreeds = await getAllBreeds();
        
        if (id) {
            let breedId = await allBreeds.filter( e => e.id == id);

            breedId.length ?
            res.status(200).json(breedId) :
            res.status(404).send('Dog not found');
        }

    } catch (err) {
        console.error(err);
    }
}

const createBreed = async (req, res) => {
    const {
        name, life_span, image, height, weight, temperaments, createdInDb
    } = req.body;

    const breedCreated = await Breed.create({
        name, life_span, image, height, weight, temperaments, createdInDb
    })

    const breedDb = await Temperament.findAll({
        where: {
            name: temperaments
        }
    });
    
    breedCreated.addTemperaments(breedDb);
    res.send('Dog created!');
}

// createBreed no trae temperamentos

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllBreeds,
    getBreeds,
    getBreedById,
    createBreed,
}
