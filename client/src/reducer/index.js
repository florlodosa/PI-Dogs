import {
    GET_BREEDS,
    GET_TEMPERAMENTS,
    FILTER_BY_TEMPERAMENTS,
    FILTER_BY_EXISTENCE,
    ORDER_BY_NAME,
    ORDER_BY_WEIGTH,
    GET_NAME_BREEDS,
} from "../constants";

const initialState = {
    breeds: [],
    temperaments: [],
    allBreeds: [],
}

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case GET_BREEDS:
            return {
                ...state,
                breeds: action.payload,
                allBreeds: action.payload,
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload,
            }
        case FILTER_BY_TEMPERAMENTS:
            const allBreeds = state.allBreeds;
            const filteredBreeds =
            action.payload === "All"
            ? state.allBreeds
            : allBreeds.filter(e => 
                e.temperaments?.find(e => 
                    e.name === action.payload
                )
            );
            return {
                ...state,
                breeds: filteredBreeds,
            }
        case FILTER_BY_EXISTENCE:
            const all = state.allBreeds;
            const filtered = action.payload === "Created" ?
            all.filter( e => e.createdInDb)
            : all.filter( e => !e.createdInDb)
            return {
                ...state,
                breeds: action.payload === "All" ? state.allBreeds : filtered,
            }
        case ORDER_BY_NAME:
            const orderedArray = action.payload === "asc" ?
            state.breeds.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) :
            state.breeds.sort(function (a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                breeds: orderedArray,
            }
        case ORDER_BY_WEIGTH:
            const orderedArr = action.payload === "0to1" ?
            state.breeds.sort((a, b) => a.weight - b.weight)
            : state.breeds.sort((a, b) => b.weight - a.weight);
            return {
                ...state,
                breeds: orderedArr,
            }
        case GET_NAME_BREEDS:
            return {
                ...state,
                breeds: action.payload,
            }
        default:
            return state;
    }
}

export default rootReducer;