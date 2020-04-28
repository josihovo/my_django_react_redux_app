import axios from 'axios'
import {createMessage, returnErrors} from './messages'
import { tokenConfig} from './auth'

export const GET_MEDIDAS = 'GET_MEDIDAS';
export const ADD_MEDIDA = 'ADD_MEDIDA';
export const DELETE_MEDIDA = 'DELETE_MEDIDA';

//get medidas
export const getMedidas = () => (dispatch, getState) =>{
    axios.get('/api/medidas/', tokenConfig(getState))
         .then( res => {
             dispatch({
                 type: GET_MEDIDAS,
                 payload: res.data 
             })             
        })  
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
}


//add medida
export const addMedida = (medida) => (dispatch, getState) => {
    
    axios.post('/api/medidas/', medida, tokenConfig(getState))
        .then(res => {

            dispatch({
                type: ADD_MEDIDA,
                payload: res.data
            })

            dispatch(createMessage({addLead:'medida Added'}));
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//delete medida
export const deleteMedida = (id) => (dispatch, getState) => {
    axios.delete(`/api/medidas/${id}`, tokenConfig(getState))
        .then( res => {
            dispatch ({
                type: DELETE_MEDIDA,
                payload: id
            })     
            
            dispatch(createMessage({deleteLead:'medida Deleted'}));
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));

}