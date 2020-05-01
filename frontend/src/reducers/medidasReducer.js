import {GET_MEDIDAS, ADD_MEDIDA, EDIT_MEDIDA, DELETE_MEDIDA} from '../actions/medidasActions'        

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_MEDIDAS:
            return {
                ...state,
                lista: action.payload 
            }

        case ADD_MEDIDA:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            }
        case EDIT_MEDIDA:
            return {
                ...state,
                lista: [ ...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            }   
        case DELETE_MEDIDA:
            return {
                ...state,
                lista: state.lista.filter(item => item.id !== action.payload)
            }
     
        default:{
            return state;
            }
    }
}

 