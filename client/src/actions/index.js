import axios from 'axios';
import {
    GET_BREEDS,
    GET_TEMPERAMENTS,
    FILTER_BY_TEMPERAMENTS,
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
