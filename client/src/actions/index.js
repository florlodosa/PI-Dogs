import axios from 'axios';
import {
    GET_BREEDS,
    GET_TEMPERAMENTS,
    FILTER_BY_TEMPERAMENTS,
    FILTER_BY_EXISTENCE,
    ORDER_BY_NAME,
    ORDER_BY_WEIGTH,
    GET_NAME_BREEDS,
} from "../constants";

export function getBreeds () {
    return async function (dispach){
        var res = await axios.get('http://localhost:3001/dogs');

        return dispach({
            type: GET_BREEDS,
            payload: res.data
        })
    }
}

export function getTemperaments() {
    return async function (dispatch) {
      var res = await axios.get('http://localhost:3001/temperament');
  
      return dispatch({
        type: GET_TEMPERAMENTS,
        payload: res.data,
      })
    }
}

export function filterBreedsByTemperaments(payload) {
    return {
        type: FILTER_BY_TEMPERAMENTS,
        payload,
    }
}

export function filterBreedsByExistence(payload) {
    return {
        type: FILTER_BY_EXISTENCE,
        payload,
    }
}

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload,
    }
}

export function orderByWeigth(payload){
    return {
        type: ORDER_BY_WEIGTH,
        payload,
    }
}

export function getBreedsByName(name){
    return async function (dispach) {
        try{
            var res = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            return dispach ({
                type: GET_NAME_BREEDS,
                payload: res.data,
            })
        }catch(err){
            console.error(err);
        }
    }
}