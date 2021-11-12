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
            let heightMin = parseInt(e.height.metric.split(' -')[0]);
            let heightMax = parseInt(e.height.metric.split('- ')[1]);
            let weightMin = parseInt(e.weight.metric.split(' -')[0]); 
            let weightMax = parseInt(e.weight.metric.split('- ')[1]);
            return {
                id: e.id,
                name: e.name,
                image: e.image.url,
                temperaments: 
                e.temperament ?
                             e.temperament.split(', ').map((e) => {
                                 return {
                                     name: e,
                                 }
                             }) :
                             e.temperament, 
                life_span: e.life_span,
                weight_min: weightMin, 
                weight_max: weightMax,
                height_min: heightMin,
                height_max: heightMax,
            }
        });

        return apiInfo;
        
    } catch (err) {
        console.error(err);
    }
}

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
        const {name} = req.query;
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
        name, life_span, image, height_min, height_max, weight_min, weight_max, temperaments, createdInDb
    } = req.body;

    const breedCreated = await Breed.create({
        name, life_span, image, height_min, height_max, weight_min, weight_max, temperaments, createdInDb
    })

    const breedDb = await Temperament.findAll({
        where: {
            name: temperaments
        }
    });
    
    breedCreated.addTemperaments(breedDb);
    res.send('Dog created!');
}


module.exports = {
    getApiInfo,
    getDbInfo,
    getAllBreeds,
    getBreeds,
    getBreedById,
    createBreed,
}
