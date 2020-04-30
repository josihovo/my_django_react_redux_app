import {GET_DEPARTAMENTOS, ADD_DEPARTAMENTO, DELETE_DEPARTAMENTO} from '../actions/departamentosActions'        

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_DEPARTAMENTOS:
            return {
                ...state,
                lista: action.payload 
            }

        case ADD_DEPARTAMENTO:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            }

        case DELETE_DEPARTAMENTO:
            return {
                ...state,
                lista: state.lista.filter(item => item.id !== action.payload)
            }
     
        default:{
            return state;
            }
    }
}

 