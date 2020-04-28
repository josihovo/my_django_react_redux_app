import axios from 'axios'
import {createMessage, returnErrors} from './messages'
import { tokenConfig} from './auth'

export const GET_GRUPOS = 'GET_GRUPOS';
export const ADD_GRUPO = 'ADD_GRUPO';
export const DELETE_GRUPO = 'DELETE_GRUPO';

export const getGrupos = () => (dispatch,getState) => {
    axios.get('/api/grupos/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_GRUPOS,
                payload: res.data
            });
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addGrupo = (grupo) => (dispatch, getState)=> {
    axios.post('api/grupos/', grupo, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: ADD_GRUPO,
                payload: res.data
            })

            dispatch (createMessage({addLead:'se ha agregado el grupo'}))
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const deleteGrupo =(id)=> (dispatch,getState)=>{
    axios.delete(`api/grupos/${id}`,tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_GRUPO,
                payload: id
            })
            dispatch(createMessage({deleteLead:'Grupo eliminado'}))
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
}
