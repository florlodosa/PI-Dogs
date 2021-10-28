require('dotenv').config();
const {
    API_KEY,
    URL_BASE_API,
} = process.env;
const axios = require ('axios');
const { Breed, Temperament } = require('../db.js');

const { getApiInfo } = require('./breed');

const getTemperaments = async (req, res) => {
    try {
        const apiInfo = await getApiInfo();
        console.log(apiInfo);

        const temperaments = apiInfo.map(e => e.temperaments).flat();
        console.log(temperaments);

        temperaments.forEach(async (e) => {
            if(!(e === undefined)) {
                await Temperament.findOrCreate({
                    where: { 
                        name: e
                    },
                })
            };
        })
    
        const allTemperaments = await Temperament.findAll();
        console.log(allTemperaments);

        if (allTemperaments.length) {
            res.status(200).send(allTemperaments);
        }else{
            res.status(400).send('Your request could not be processed')
    }
    } catch (err) {
        console.error(err);
    }
}


module.exports = {
    getTemperaments,
}



// const getTemperaments = async (req, res) => {
//     const apiUrl = await axios.get(`${URL_BASE_API}?api_key=${API_KEY}`);
//     const apiInfo = await apiUrl.data.map(e => e.temperament);
//     console.log("api info: " + apiInfo);
    
//     const temperaments = apiInfo.flat();
//     console.log("Temperaments: " + temperaments)

//     temperaments.forEach(e => {
//         Temperament.findOrCreate({
//             where: {
//                 name: e,
//             }
//         })
//     }); 
    
//     const allTemperaments = await Temperament.findAll();
//     console.log(allTemperaments);

//     if (allTemperaments.length) {
//         res.status(200).send(allTemperaments);
//     }else{
//         res.status(400).send('Your request could not be processed')
//     }
// }