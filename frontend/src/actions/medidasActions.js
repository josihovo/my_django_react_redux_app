import axios from 'axios'
import {createMessage, returnErrors} from './messages'
import { tokenConfig} from './auth'

export const GET_MEDIDAS = 'GET_MEDIDAS';
export const ADD_MEDIDA = 'ADD_MEDIDA';
export const EDIT_MEDIDA = 'EDIT_MEDIDA';
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

            dispatch(createMessage({msg:'La medida ' + medida.nombre + ' fue agregada satisfactoriamente'}));
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//update medida 
export const editMedida = (medida,id) => (dispatch, getState) => {
    axios.put(`/api/medidas/${id}/`,medida, tokenConfig(getState))
        .then ( res => {           

                dispatch({
                    type: EDIT_MEDIDA,
                    payload: res.data
                })

                dispatch(createMessage({msg:'La medida ' + medida.nombre + ' fue actualizada satisfactoriamente'}));
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
            
            dispatch(createMessage({msg:'El registro ha sido eliminado'}));
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));

}