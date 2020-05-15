import {GET_POSTS, ADD_POST,EDIT_POST,DELETE_POST} from '../actions/postActions'        

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_POSTS:
            return {
                ...state,
                lista: action.payload 
            }

        case ADD_POST:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            }
        case EDIT_POST:
            return {
                ...state,
                lista: [ ...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            }   
        case DELETE_POST:
            return {
                ...state,
                lista: state.lista.filter(item => item.id !== action.payload)
            }
     
        default:{
            return state;
            }
    }
}

 