import {GET_GRUPOS, ADD_GRUPO, DELETE_GRUPO} from '../actions/gruposActions'

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_GRUPOS:{
            return {
                ...state,
                lista: action.payload
            }
        }
        case ADD_GRUPO:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            }

        case DELETE_GRUPO:
            return {
                ...state,
                lista: state.lista.filter(item => item.id !== action.payload)
            }

        default:{
            return state;
            }
    }
}