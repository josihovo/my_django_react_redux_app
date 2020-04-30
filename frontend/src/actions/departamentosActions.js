import axios from 'axios'
import {createMessage, returnErrors} from './messages'
import { tokenConfig} from './auth'

export const GET_DEPARTAMENTOS = 'GET_DEPARTAMENTOS';
export const ADD_DEPARTAMENTO = 'ADD_DEPARTAMENTO';
export const DELETE_DEPARTAMENTO = 'DELETE_DEPARTAMENTO';

//get departamento
export const getDepartamentos = () => (dispatch, getState) =>{
    axios.get('/api/departamentos/', tokenConfig(getState))
         .then( res => {
             dispatch({
                 type: GET_DEPARTAMENTOS,
                 payload: res.data 
             })             
        })  
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
}


//add departamento
export const addDepartamento = (departamento) => (dispatch, getState) => {
    
    axios.post('/api/departamentos/', departamento, tokenConfig(getState))
        .then(res => {

            dispatch({
                type: ADD_DEPARTAMENTO,
                payload: res.data
            })

            dispatch(createMessage({msg:'El departamento ' + departamento.nombre + 'fue agregado satisfactoriamente'}));
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//delete medida
export const deleteDepartamento = (id) => (dispatch, getState) => {
    axios.delete(`/api/departamentos/${id}`, tokenConfig(getState))
        .then( res => {
            dispatch ({
                type: DELETE_DEPARTAMENTO,
                payload: id
            })     
            
            dispatch(createMessage({msg:'El registro ha sido eliminado'}));
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));

}