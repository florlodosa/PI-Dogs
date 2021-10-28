import axios from 'axios';
import {
    GET_BREEDS,
  } from "../constants";

export function getBreeds () {
    return async function (dispach){
        var json = await axios.get('http://localhost:3001/dogs');

        return dispach({
            type: GET_BREEDS,
            payload: json.data
        })
    }
}