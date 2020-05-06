import axios from 'axios'
import {createMessage, returnErrors} from './messages'
import { tokenConfig} from './auth'

export const GET_PRODUCTOS = 'GET_PRODUCTOS'
export const ADD_PRODUCTO = 'ADD_PRODUCTO'
export const EDIT_PRODUCTO = 'EDIT_PRODUCTO'
export const DELETE_PRODUCTO = 'DELETE_PRODUCTO'



//get productos
export const getProductos = () => (dispatch, getState) =>{
    axios.get('/api/productos/', tokenConfig(getState))
         .then( res => {
             dispatch({
                 type: GET_PRODUCTOS,
                 payload: res.data 
             })             
        })  
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//add producto
export const addProducto = (producto) => (dispatch, getState) => {
    
    axios.post('/api/productos/', producto, tokenConfig(getState))
        .then(res => {

            dispatch({
                type: ADD_PRODUCTO,
                payload: res.data
            })

            dispatch(createMessage({msg:'El producto ' + producto.nombre + ' fue agregado satisfactoriamente'}));
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//update producto 
export const editProducto = (producto,id) => (dispatch, getState) => {
    axios.put(`/api/productos/${id}/`,producto, tokenConfig(getState))
        .then ( res => {           

                dispatch({
                    type: EDIT_PRODUCTO,
                    payload: res.data
                })

                dispatch(createMessage({msg:'El producto ' + producto.nombre + ' fue actualizado satisfactoriamente'}));
        }) 
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));

}
//delete producto
export const deleteProducto = (id) => (dispatch, getState) => {
    axios.delete(`/api/productos/${id}`, tokenConfig(getState))
        .then( res => {
            dispatch ({
                type: DELETE_PRODUCTO,
                payload: id
            })     
            
            dispatch(createMessage({msg:'El registro ha sido eliminado'}));
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));

}