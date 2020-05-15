import axios from 'axios'
import {createMessage, returnErrors} from './messages'
import { tokenConfig } from './auth'

export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';

//get posts
export const getPosts = () => (dispatch, getState) =>{
    axios.get('/api/posts/', tokenConfig(getState))
         .then( res => {
 
            let newArray = res.data.map (item => {
               // let url = item.imageA
                //let pathname = new URL(url).pathname;

                let urlA = item.imageA.split('/')
                let urlB = item.imageB.split('/')
                let urlC = item.imageC.split('/')
                 

                let car = {
                    ...item
                    , imageA: '/' + urlA[urlA.length - 4] + '/' + urlA[urlA.length - 3] + '/' + urlA[urlA.length - 2] + '/' + urlA[urlA.length - 1]
                    , imageB: '/' + urlB[urlB.length - 4] + '/' + urlB[urlC.length - 3] + '/' + urlB[urlB.length - 2] + '/' + urlB[urlB.length - 1]
                    , imageC: '/' + urlC[urlC.length - 4] + '/' + urlB[urlC.length - 3] + '/' + urlC[urlC.length - 2] + '/' + urlC[urlC.length - 1]
                }
                return car 

                
            })
             
            dispatch({
                 type: GET_POSTS,
                 payload: newArray 
             })             
        })  
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//add post
export const addPost = (post) => (dispatch, getState) => {
    
    axios.post('/api/posts/', post, tokenConfig(getState))
        .then(res => {

            //dispatch({
            //    type: ADD_POST,
            //    payload: res.data
            //})

            dispatch(getPosts());

            dispatch(createMessage({msg:'El post fue agregado satisfactoriamente'}));
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//update post 
export const editPost = (post,id) => (dispatch, getState) => {
    axios.put(`/api/posts/${id}/`,post, tokenConfig(getState))
        .then ( res => {           

                dispatch({
                   type: EDIT_POST,
                    payload: res.data
                })
             

                dispatch(createMessage({msg:'El post fue actualizado satisfactoriamente'}));
        }) 
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));

}
//delete post
export const deletePost = (id) => (dispatch, getState) => {
    axios.delete(`/api/posts/${id}`, tokenConfig(getState))
        .then( res => {
            dispatch ({
                type: DELETE_POST,
                payload: id
            })     
            
            dispatch(createMessage({msg:'El registro ha sido eliminado'}));
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));

}

export const orderPost = (lista) =>  (dispatch) => {
    dispatch({
        type: GET_POSTS,
        payload: lista 
    })
}

 