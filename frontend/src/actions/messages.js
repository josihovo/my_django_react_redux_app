import  { CREATE_MESSAGE, GET_ERRORS } from './types'

export const createMessage = msg => {
    return {
        type: CREATE_MESSAGE, 
        payload: msg
    };
}

//return errors

export const returnErrors = (msg)  => {
    return {
        type: GET_ERRORS,
        payload: {msg, status } 
    }
}