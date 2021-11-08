import {
    GET_BREEDS,
    GET_TEMPERAMENTS,
    FILTER_BY_TEMPERAMENTS,
} from "../constants";

const initialState = {
    breeds: [],
    temperaments: [],
}

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case GET_BREEDS:
            return {
                ...state,
                breeds: action.payload,
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload,
            }
        case FILTER_BY_TEMPERAMENTS:
            const allBreeds = state.breeds;
            const filteredBreeds = 
            allBreeds.filter((e) => {
                return e.temperaments?.find((e) => {
                    return e.name === action.payload;
                });
            });
            return {
                ...state,
                breeds: filteredBreeds,
            }

        default:
            return state;
    }
}
export default rootReducer;